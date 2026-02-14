
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#323946]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact <span className="text-[#0ef]">Me!</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Have a project in mind or just want to say hi? Feel free to reach out. I'll get back to you within 24 hours.</p>
        </motion.div>
        
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit} 
          className="max-w-3xl mx-auto space-y-6"
        >
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0ef]/10 border border-[#0ef] p-12 rounded-3xl text-center space-y-4"
            >
              <div className="flex justify-center text-[#0ef]">
                <CheckCircle size={64} />
              </div>
              <h3 className="text-2xl font-bold">Message Sent Successfully!</h3>
              <p className="text-gray-400">Thanks for reaching out, John will contact you soon.</p>
              <button 
                type="button"
                onClick={() => setStatus('idle')}
                className="text-[#0ef] font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Phone (Optional)" 
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
              </div>

              <textarea 
                rows={6} 
                placeholder="How can I help you?" 
                required
                className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-5 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all resize-none"
              ></textarea>

              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="group relative px-12 py-4 bg-[#0ef] text-[#1f242d] font-bold rounded-full shadow-lg hover:shadow-[#0ef]/40 transition-all transform hover:scale-105 disabled:opacity-70 disabled:scale-100 flex items-center justify-center space-x-2 mx-auto"
                >
                  {status === 'loading' ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <Loader2 size={24} />
                    </motion.div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
};

const Loader2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);

export default Contact;
