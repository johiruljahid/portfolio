
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Appointment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: ''
  });

  const services = [
    { id: 'dev', title: 'Web Development', desc: 'Discuss your next big web project.', icon: <Briefcase size={20} /> },
    { id: 'uiux', title: 'UI/UX Design', desc: 'Visual strategy and user experience.', icon: <CheckCircle size={20} /> },
    { id: 'consult', title: 'Consultancy', desc: '1-on-1 technical advice.', icon: <Calendar size={20} /> }
  ];

  const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await addDoc(collection(db, "appointments"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setStep(4); // Success step
    } catch (err) {
      console.error("Error booking appointment: ", err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <section id="appointment" className="py-24 px-6 bg-[#1f242d]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book <span className="text-[#0ef]">Appointment</span></h2>
          <p className="text-gray-400">Schedule a dedicated session to bring your ideas to life.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#323946] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#0ef]/10 min-h-[500px] flex flex-col">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 -z-0"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-500 ${
                  step >= s ? 'bg-[#0ef] text-[#1f242d] scale-110 shadow-[0_0_15px_#0ef]' : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step > s ? <CheckCircle size={20} /> : s}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                <h3 className="text-2xl font-bold mb-8 text-center">Select a Service</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setFormData({ ...formData, service: s.title }); handleNext(); }}
                      className={`p-6 rounded-2xl border-2 transition-all text-left hover:scale-105 ${
                        formData.service === s.title ? 'border-[#0ef] bg-[#0ef]/5' : 'border-gray-700 bg-[#1f242d]/50 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-[#0ef] mb-4">{s.icon}</div>
                      <h4 className="font-bold mb-2">{s.title}</h4>
                      <p className="text-sm text-gray-400">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                <h3 className="text-2xl font-bold mb-8 text-center">Pick Date & Time</h3>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="block text-gray-400 font-medium ml-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0ef]" size={20} />
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#1f242d] border border-gray-700 p-4 pl-12 rounded-xl text-white focus:border-[#0ef] outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-gray-400 font-medium ml-1">Available Slots</label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                            formData.time === time ? 'bg-[#0ef] text-[#1f242d] border-[#0ef] shadow-lg shadow-[#0ef]/20' : 'bg-[#1f242d] border-gray-700 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <Clock className="inline mr-2" size={14} />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-12">
                  <button onClick={handleBack} className="px-8 py-3 rounded-full border border-gray-600 font-bold hover:bg-gray-700 transition-all">Back</button>
                  <button 
                    onClick={handleNext} 
                    disabled={!formData.date || !formData.time}
                    className="px-10 py-3 bg-[#0ef] text-[#1f242d] font-bold rounded-full shadow-lg hover:shadow-[#0ef]/30 disabled:opacity-50 transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow">
                <h3 className="text-2xl font-bold mb-8 text-center">Your Information</h3>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl flex items-center text-sm">
                      <AlertCircle className="mr-2" size={16} />
                      {error}
                    </div>
                  )}
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1f242d] border border-gray-700 p-4 rounded-xl text-white focus:border-[#0ef] outline-none"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1f242d] border border-gray-700 p-4 rounded-xl text-white focus:border-[#0ef] outline-none"
                  />
                  <div className="bg-[#1f242d] p-4 rounded-xl border border-gray-700 space-y-2">
                    <p className="text-sm font-bold text-[#0ef] uppercase">Booking Summary</p>
                    <p className="text-sm"><span className="text-gray-400">Service:</span> {formData.service}</p>
                    <p className="text-sm"><span className="text-gray-400">When:</span> {formData.date} at {formData.time}</p>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={handleBack} className="px-8 py-3 rounded-full border border-gray-600 font-bold hover:bg-gray-700 transition-all">Back</button>
                    <button 
                      type="submit" 
                      disabled={loading || !formData.name || !formData.email}
                      className="px-10 py-3 bg-[#0ef] text-[#1f242d] font-bold rounded-full shadow-lg hover:shadow-[#0ef]/30 disabled:opacity-50 transition-all flex items-center"
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                      {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10 flex-grow flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-[#0ef] rounded-full flex items-center justify-center text-[#1f242d] mb-6 shadow-[0_0_30px_#0ef]">
                  <CheckCircle size={50} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Appointment Confirmed!</h3>
                <p className="text-gray-400 mb-8 max-w-sm">We've saved your booking. You'll receive a confirmation email at <span className="text-white font-medium">{formData.email}</span> shortly.</p>
                <button 
                  onClick={() => { setStep(1); setFormData({ service: '', date: '', time: '', name: '', email: '' }); }} 
                  className="px-8 py-3 bg-[#1f242d] text-[#0ef] border border-[#0ef] rounded-full font-bold hover:bg-[#0ef] hover:text-[#1f242d] transition-all"
                >
                  Back to Services
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
