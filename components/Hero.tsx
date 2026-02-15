
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Hero: React.FC = () => {
  const [data, setData] = useState({
    greeting: "Hello, It's Me",
    name: "John Kendric",
    title: "Frontend Developer",
    bio: "I specialize in crafting high-performance, visually stunning web experiences. With a focus on modern frameworks and cutting-edge design, I help brands stand out in the digital landscape.",
    imageUrl: "https://picsum.photos/seed/kendric/800/800",
    facebook: "#", twitter: "#", instagram: "#", linkedin: "#"
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const snap = await getDoc(doc(db, "content", "hero"));
        if (snap.exists()) setData(snap.data() as any);
      } catch (err) { console.error(err); }
    };
    fetchHero();
  }, []);

  const scrollToAppointment = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('appointment');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">{data.greeting}</h3>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.name}</h1>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            And I'm a <span className="text-[#0ef]">{data.title}</span>
          </h3>
          <p className="text-gray-400 max-w-lg mb-8 mx-auto md:mx-0 leading-relaxed text-lg">
            {data.bio}
          </p>
          
          <div className="flex space-x-4 justify-center md:justify-start mb-8">
            {[
              { id: 'facebook', link: data.facebook },
              { id: 'twitter', link: data.twitter },
              { id: 'instagram', link: data.instagram },
              { id: 'linkedin', link: data.linkedin }
            ].map((social) => (
              <a 
                key={social.id} 
                href={social.link} 
                target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border-2 border-[#0ef] rounded-full text-[#0ef] hover:bg-[#0ef] hover:text-[#1f242d] transition-all shadow-sm hover:shadow-[#0ef]"
              >
                <i className={`fab fa-${social.id} text-xl`}></i>
              </a>
            ))}
          </div>

          <a 
            href="#appointment" 
            onClick={scrollToAppointment}
            className="inline-block px-10 py-4 bg-[#0ef] text-[#1f242d] font-bold text-lg rounded-full shadow-lg hover:shadow-[#0ef] transition-all transform hover:scale-105 active:scale-95"
          >
            Book an Appointment
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 flex justify-center items-center relative"
        >
          <div className="w-72 h-72 md:w-[450px] md:h-[450px] hexagon-clip bg-[#0ef] p-1.5 flex items-center justify-center float-animation neon-glow">
            <div className="w-full h-full hexagon-clip bg-[#1f242d] overflow-hidden flex items-center justify-center">
              <img 
                src={data.imageUrl} 
                alt={data.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ef] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0ef] opacity-5 rounded-full blur-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
