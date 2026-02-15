
import React, { useEffect, useState } from 'react';
import { EXPERIENCES as DEFAULT_EXPERIENCES } from '../constants';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<any[]>(DEFAULT_EXPERIENCES);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const snap = await getDocs(query(collection(db, "experience"), orderBy("order", "asc")));
        if (!snap.empty) {
          setExperiences(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (err) { console.error(err); }
    };
    fetchExp();
  }, []);

  return (
    <section id="experience" className="py-24 px-6 bg-[#1f242d]">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Working <span className="text-[#0ef]">History</span></h2>
        
        <div className="relative border-l-2 border-[#0ef] ml-4 md:ml-0 md:left-1/2">
          {experiences.map((exp, index) => (
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              key={exp.id || index} 
              className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:left-[-100%] md:pr-12 md:text-right' : 'md:left-0 md:pl-12 text-left'}`}
            >
              <div className="absolute top-2 -left-2 md:left-auto md:right-[-9px] w-4 h-4 bg-[#0ef] rounded-full shadow-[0_0_10px_#0ef] z-10" style={index % 2 !== 0 ? { left: '-9px', right: 'auto' } : {}}></div>
              
              <div className="bg-[#323946] p-8 rounded-2xl shadow-xl hover:shadow-[#0ef]/20 transition-all border-l-4 border-[#0ef]">
                <span className="text-[#0ef] font-bold block mb-2">{exp.period}</span>
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                <h4 className="text-lg text-gray-300 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
