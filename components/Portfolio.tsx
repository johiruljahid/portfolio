
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS as DEFAULT_PROJECTS } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github, X, Code, Layout, Globe, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS as any);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        if (!snap.empty) {
          const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() })) as any;
          setProjects(fetched);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setActiveGalleryIndex(0); // Reset gallery index on open
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const galleryImages = selectedProject ? [selectedProject.image, ...(selectedProject.gallery || [])] : [];

  const nextGallery = () => setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  const prevGallery = () => setActiveGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section id="portfolio" className="py-24 px-6 bg-[#323946] relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Latest <span className="text-[#0ef]">Projects</span></h2>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all transform active:scale-95 ${
                  activeCategory === cat 
                    ? 'bg-[#0ef] text-[#1f242d] shadow-lg shadow-[#0ef]/20' 
                    : 'bg-[#1f242d] text-white hover:bg-[#1f242d]/80 border border-[#0ef]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="relative rounded-2xl overflow-hidden group h-80 shadow-2xl bg-[#1f242d] cursor-pointer border border-white/5 hover:border-[#0ef]/30 transition-all"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f242d] via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6 group-hover:bottom-1/2 group-hover:translate-y-1/2 transition-all duration-500">
                   <span className="text-xs font-bold uppercase tracking-widest text-[#0ef] mb-2 block">
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-300 text-sm line-clamp-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    {project.description}
                  </p>
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="px-6 py-2 border-2 border-[#0ef] text-[#0ef] font-bold rounded-full transform scale-90 group-hover:scale-100 transition-all">View Details</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Smart Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-[#1f242d] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,238,255,0.2)] max-h-[95vh] flex flex-col md:flex-row border border-white/5"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#0ef] hover:text-[#1f242d] transition-all hover:rotate-90"
              >
                <X size={24} />
              </button>

              {/* Project Image Panel / Gallery */}
              <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-black group/gallery">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeGalleryIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={galleryImages[activeGalleryIndex]} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {galleryImages.length > 1 && (
                  <>
                    <button onClick={prevGallery} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#0ef] hover:text-[#1f242d] transition-all opacity-0 group-hover/gallery:opacity-100">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextGallery} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#0ef] hover:text-[#1f242d] transition-all opacity-0 group-hover/gallery:opacity-100">
                      <ChevronRight size={24} />
                    </button>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {galleryImages.map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveGalleryIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${activeGalleryIndex === i ? 'bg-[#0ef] w-8' : 'bg-white/30'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold border border-white/10 flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#0ef]"/> {activeGalleryIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Content Panel */}
              <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto scrollbar-hide flex flex-col bg-[#1f242d]">
                <div className="mb-4">
                  <span className="text-[#0ef] font-black uppercase tracking-widest text-[10px] px-3 py-1.5 bg-[#0ef]/10 rounded-full border border-[#0ef]/20">
                    {selectedProject.category}
                  </span>
                </div>
                
                <h3 className="text-4xl font-black mb-6 text-white leading-tight">{selectedProject.title}</h3>
                
                <div className="space-y-6 flex-grow">
                  <div>
                    <h5 className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-2">The Concept</h5>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-3 flex items-center">
                      <Code size={12} className="mr-2 text-[#0ef]" /> 
                      Core Engine
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(typeof selectedProject.techStack === 'string' ? selectedProject.techStack.split(',') : selectedProject.techStack).map((tech: string) => (
                        <span key={tech} className="bg-[#323946] text-[#0ef] px-4 py-2 rounded-xl text-xs font-bold border border-white/5">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-grow flex items-center justify-center space-x-3 bg-[#0ef] text-[#1f242d] font-black py-5 rounded-2xl hover:shadow-[0_0_30px_#0ef] transition-all transform hover:scale-[1.03] active:scale-95 uppercase tracking-widest text-sm"
                  >
                    <Globe size={20} />
                    <span>Launch App</span>
                  </a>
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-grow flex items-center justify-center space-x-3 bg-white/5 text-white border border-white/10 font-black py-5 rounded-2xl hover:bg-white/10 transition-all transform hover:scale-[1.03] active:scale-95 uppercase tracking-widest text-sm"
                    >
                      <Github size={20} />
                      <span>Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
