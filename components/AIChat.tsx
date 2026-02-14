
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS, EXPERIENCES } from '../constants';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I am John Kendric\'s AI twin. Want to know about his projects at Tech Giant Inc or his React expertise? Ask away!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        Bio: John Kendric is a Senior Frontend Developer specializing in React, TypeScript, and UI/UX.
        Skills: ${SKILLS.map(s => `${s.name} (${s.percentage}%)`).join(', ')}.
        Work History: ${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period}): ${e.description}`).join(' | ')}.
      `;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are John Kendric's professional AI representative. 
          Use this context: ${context}. 
          Always be helpful, concise, and enthusiastic. If you don't know something specifically, 
          invite them to use the contact form or email John directly at john@kendric.dev.`,
        },
      });

      let fullText = '';
      setMessages(prev => [...prev, { role: 'ai', text: '' }]);
      
      for await (const chunk of responseStream) {
        fullText += chunk.text || '';
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'ai', text: fullText };
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having a bit of a brain freeze. Could you try asking that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#323946] w-[90vw] md:w-96 h-[500px] rounded-3xl shadow-2xl flex flex-col border border-[#0ef]/30 overflow-hidden mb-20"
          >
            <div className="bg-[#1f242d] p-5 flex justify-between items-center border-b border-[#0ef]/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#0ef]/20 flex items-center justify-center text-[#0ef]">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-none">John's AI</h3>
                  <span className="text-[10px] text-[#0ef] uppercase font-bold">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 scrollbar-hide bg-[#1f242d]/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-[85%]`}>
                    {m.role === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-[#0ef] flex-shrink-0 flex items-center justify-center text-[#1f242d]">
                        <Bot size={14} />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-[#0ef] text-[#1f242d] font-medium rounded-tr-none shadow-lg' 
                        : 'bg-[#323946] text-white rounded-tl-none border border-[#0ef]/10'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length-1].role !== 'ai' && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#0ef] flex items-center justify-center text-[#1f242d]">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="bg-[#323946] px-4 py-2 rounded-2xl rounded-tl-none border border-[#0ef]/10 italic text-xs text-gray-400">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#1f242d] border-t border-[#0ef]/20 flex items-center space-x-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about John's experience..."
                className="flex-grow bg-[#323946] border border-[#0ef]/10 outline-none rounded-full px-5 py-3 text-sm text-white focus:border-[#0ef] transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#0ef] text-[#1f242d] p-3 rounded-full hover:scale-110 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-[#0ef]/20"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#0ef] rounded-full shadow-2xl flex items-center justify-center text-[#1f242d] neon-glow relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <MessageSquare size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIChat;
