
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github, X, Code, Layout, Globe } from 'lucide-react';

const Portfolio: React.FC = () => {
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

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
                className="relative rounded-2xl overflow-hidden group h-80 shadow-2xl bg-[#1f242d] cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay with project summary */}
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#1f242d] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,238,255,0.1)] max-h-[90vh] flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#0ef] hover:text-[#1f242d] transition-all"
              >
                <X size={24} />
              </button>

              {/* Project Image Panel */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1f242d]/40" />
              </div>

              {/* Content Panel */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto scrollbar-hide flex flex-col">
                <div className="mb-2">
                  <span className="text-[#0ef] font-bold uppercase tracking-tighter text-sm px-3 py-1 bg-[#0ef]/10 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                
                <h3 className="text-4xl font-bold mb-6 text-white">{selectedProject.title}</h3>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>

                <div className="mb-8">
                  <h5 className="text-white font-bold mb-4 flex items-center">
                    <Code size={18} className="mr-2 text-[#0ef]" /> 
                    Technologies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map(tech => (
                      <span key={tech} className="bg-[#323946] text-gray-300 px-4 py-1.5 rounded-lg text-sm border border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-grow flex items-center justify-center space-x-2 bg-[#0ef] text-[#1f242d] font-bold py-4 rounded-2xl hover:shadow-[0_0_20px_#0ef] transition-all transform hover:scale-[1.02]"
                  >
                    <Globe size={20} />
                    <span>Live Demo</span>
                  </a>
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-grow flex items-center justify-center space-x-2 bg-white/5 text-white border border-white/10 font-bold py-4 rounded-2xl hover:bg-white/10 transition-all transform hover:scale-[1.02]"
                    >
                      <Github size={20} />
                      <span>Source Code</span>
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
