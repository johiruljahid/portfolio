
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">My <span className="text-[#0ef]">Skills</span></h2>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {SKILLS.map((skill, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-xl font-semibold">{skill.name}</span>
                </div>
                <span className="text-[#0ef] font-bold">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-[#323946] h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0ef] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
