
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#323946]">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center items-center">
          <div className="w-64 h-64 md:w-96 md:h-96 hexagon-clip bg-[#0ef] p-1 flex items-center justify-center neon-glow">
            <div className="w-full h-full hexagon-clip bg-[#1f242d] overflow-hidden">
               <img 
                src="https://picsum.photos/seed/kendric-about/800/800" 
                alt="About John Kendric" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-[#0ef]">Me</span></h2>
          <h3 className="text-2xl font-semibold mb-6">Frontend Developer!</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            I have always been passionate about the intersection of art and technology. My journey started with a simple HTML file and has evolved into building complex enterprise applications. I believe in writing clean code and creating intuitive user experiences.
          </p>
          <p className="text-gray-400 mb-10 leading-relaxed">
            When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through technical blogging. My goal is to bridge the gap between imagination and digital reality.
          </p>
          <a 
            href="#" 
            className="inline-block px-10 py-3 bg-[#0ef] text-[#1f242d] font-bold rounded-full shadow-lg hover:shadow-[#0ef] transition-all transform hover:scale-105"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
