
import React, { useEffect, useState } from 'react';
import { SKILLS as DEFAULT_SKILLS } from '../constants';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<any[]>(DEFAULT_SKILLS);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const snap = await getDocs(query(collection(db, "skills"), orderBy("percentage", "desc")));
        if (!snap.empty) {
          setSkills(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (err) { console.error(err); }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">My <span className="text-[#0ef]">Skills</span></h2>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {skills.map((skill, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              key={index} className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-xl font-semibold">{skill.name}</span>
                </div>
                <span className="text-[#0ef] font-bold">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-[#323946] h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-[#0ef] h-full rounded-full shadow-[0_0_10px_#0ef]"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
