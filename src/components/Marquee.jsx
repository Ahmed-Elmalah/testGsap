import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Marquee = () => {
  const marqueeRef = useRef();

  useGSAP(() => {
    gsap.to(marqueeRef.current, { xPercent: -50, repeat: -1, duration: 10, ease: "none" });
  });

  return (
    <div className="w-full bg-[#00f3ff] py-4 overflow-hidden rotate-2 border-y-4 border-black relative z-20 mb-20">
      <div ref={marqueeRef} className="flex whitespace-nowrap text-black font-bold text-4xl uppercase tracking-widest">
        <span className="mx-8">React JS</span> • <span className="mx-8">GSAP Animations</span> • <span className="mx-8">Creative Design</span> • <span className="mx-8">Web Development</span> • 
        <span className="mx-8">React JS</span> • <span className="mx-8">GSAP Animations</span> • <span className="mx-8">Creative Design</span> • <span className="mx-8">Web Development</span> • 
      </div>
    </div>
  );
};

export default Marquee;