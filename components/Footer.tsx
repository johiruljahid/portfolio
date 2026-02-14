
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-[#1f242d] border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-gray-400">
          Copyright &copy; 2024 by <span className="text-[#0ef]">Codehal</span> | All Rights Reserved.
        </p>
        
        <a 
          href="#home" 
          className="w-12 h-12 bg-[#0ef] flex items-center justify-center rounded-xl text-[#1f242d] shadow-lg hover:shadow-[#0ef] transition-all transform hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
