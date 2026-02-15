
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const About: React.FC = () => {
  const [data, setData] = useState({
    heading: 'About Me',
    subheading: 'Frontend Developer!',
    description1: 'I have always been passionate about the intersection of art and technology. My journey started with a simple HTML file and has evolved into building complex enterprise applications.',
    description2: "When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through technical blogging.",
    imageUrl: 'https://picsum.photos/seed/kendric-about/800/800'
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const snap = await getDoc(doc(db, "content", "about"));
        if (snap.exists()) setData(snap.data() as any);
      } catch (err) {
        console.error("Error fetching about content:", err);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-24 px-6 bg-[#323946]">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 hexagon-clip bg-[#0ef] p-1 flex items-center justify-center neon-glow">
            <div className="w-full h-full hexagon-clip bg-[#1f242d] overflow-hidden">
               <img 
                src={data.imageUrl} 
                alt="About John Kendric" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{data.heading.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="text-[#0ef]">{word}</span> : word + ' ')}</h2>
          <h3 className="text-2xl font-semibold mb-6">{data.subheading}</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {data.description1}
          </p>
          <p className="text-gray-400 mb-10 leading-relaxed">
            {data.description2}
          </p>
          <a 
            href="#portfolio" 
            className="inline-block px-10 py-3 bg-[#0ef] text-[#1f242d] font-bold rounded-full shadow-lg hover:shadow-[#0ef] transition-all transform hover:scale-105"
          >
            See My Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
