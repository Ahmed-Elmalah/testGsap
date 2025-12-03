import { useState } from 'react';
import Magnetic from './Magnetic'; // هنستخدم المغناطيس بتاعنا

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <header className="fixed top-0 right-0 p-8 z-50 mix-blend-difference text-white">
      <Magnetic>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full border border-white flex flex-col gap-1.5 justify-center items-center group hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden"
        >
          {/* الخط اللي فوق */}
          <div 
            className={`w-8 h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[5px]" : ""}`}
          ></div>
          
          {/* الخط اللي تحت */}
          <div 
            className={`w-8 h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
          ></div>
          
          {/* خلفية بتملى الزرار لما تقف عليه */}
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10"></div>
        </button>
      </Magnetic>
    </header>
  );
};

export default Header;