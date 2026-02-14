
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "messages"), data);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err) {
      console.error("Error sending message: ", err);
      setStatus('error');
      setErrorMessage("Something went wrong. Please try again later.");
    }
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
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-2xl flex items-center">
                  <AlertCircle className="mr-3" size={20} />
                  {errorMessage}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name" 
                  required
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  required
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone (Optional)" 
                  className="w-full bg-[#1f242d] border border-[#0ef]/10 outline-none p-4 rounded-2xl text-white focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] transition-all"
                />
              </div>

              <textarea 
                rows={6} 
                name="message"
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
                    <Loader2 className="animate-spin" size={24} />
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

export default Contact;
