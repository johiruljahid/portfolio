
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Calendar, Settings } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Portfolio', href: 'portfolio' },
    { name: 'Experience', href: 'experience' },
    { name: 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [...navItems, { href: 'appointment' }].forEach((item) => {
      const element = document.getElementById(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
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
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1f242d]/80 backdrop-blur-xl border-b border-[#0ef]/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-2xl font-extrabold text-white tracking-tighter group"
          >
            KENDRIC<span className="text-[#0ef] group-hover:animate-pulse">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={`#${item.href}`} 
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                      activeSection === item.href ? 'text-[#0ef]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#0ef]/10 border border-[#0ef]/20 rounded-full -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={onAdminClick}
                className="p-2 text-white/5 hover:text-[#0ef]/40 transition-colors rounded-lg"
                title="Admin"
              >
                <Settings size={14} />
              </button>
              <a 
                href="#appointment" 
                onClick={(e) => scrollToSection(e, 'appointment')}
                className="bg-[#0ef] text-[#1f242d] px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-[#0ef]/40 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Calendar size={16} />
                <span>Book Now</span>
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={onAdminClick}
              className="p-2 text-white/5"
            >
              <Settings size={14} />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#323946] text-[#0ef] shadow-lg"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[80%] h-full bg-[#1f242d] z-[70] p-10 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                 <span className="text-xl font-bold">MENU<span className="text-[#0ef]">.</span></span>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#0ef] bg-[#323946] p-2 rounded-lg">
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col space-y-4">
                {[...navItems, { name: 'Book Appointment', href: 'appointment' }].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={`#${item.href}`} 
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`text-2xl font-bold block py-2 transition-all ${
                        activeSection === item.href ? 'text-[#0ef] translate-x-4' : 'text-gray-500'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10 border-t border-gray-800">
                <p className="text-sm text-gray-500">Direct Contact</p>
                <a href="mailto:john@kendric.dev" className="text-[#0ef] font-bold text-lg">john@kendric.dev</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
