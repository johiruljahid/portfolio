
import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-[#1f242d]">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Working <span className="text-[#0ef]">History</span></h2>
        
        <div className="relative border-l-2 border-[#0ef] ml-4 md:ml-0 md:left-1/2">
          {EXPERIENCES.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:left-[-100%] md:pr-12 md:text-right' : 'md:left-0 md:pl-12 text-left'}`}
            >
              {/* Timeline Dot */}
              <div className="absolute top-2 -left-2 md:left-auto md:right-[-9px] w-4 h-4 bg-[#0ef] rounded-full shadow-[0_0_10px_#0ef] z-10" style={index % 2 !== 0 ? { left: '-9px', right: 'auto' } : {}}></div>
              
              <div className="bg-[#323946] p-8 rounded-2xl shadow-xl hover:shadow-[#0ef]/20 transition-all border-l-4 border-[#0ef]">
                <span className="text-[#0ef] font-bold block mb-2">{exp.period}</span>
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                <h4 className="text-lg text-gray-300 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
