import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const scrollSectionRef = useRef();
  const scrollContainerRef = useRef();

  useGSAP(() => {
    const cards = gsap.utils.toArray('.skill-card');
    
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollSectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => "+=" + scrollSectionRef.current.offsetWidth,
      }
    });
  }, { scope: scrollSectionRef });

  const renderCard = (title, num, color) => (
    <div className="skill-card min-w-[80vw] md:min-w-[40vw] h-[60vh] md:h-[70vh] flex flex-col justify-center items-center p-8 mx-4 bg-[#111] border border-gray-800 rounded-3xl relative overflow-hidden group hover:border-[#00f3ff] transition-colors duration-500">
      <h2 className="absolute top-0 right-4 text-[15rem] font-bold text-white opacity-5 select-none font-sans">{num}</h2>
      <div className="z-10 text-center">
        <div className={`w-20 h-20 rounded-full mb-6 mx-auto bg-linear-to-br ${color} blur-md group-hover:blur-xl transition-all duration-500`}></div>
        <h3 className="text-4xl font-bold mb-4">{title}</h3>
        <p className="text-gray-400">تصميم وبرمجة متطورة.</p>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-[#00f3ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );

  return (
    <section ref={scrollSectionRef} className="h-screen w-full bg-[#0a0a0a] relative flex items-center overflow-hidden">
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-2xl font-bold text-[#00f3ff]">MY SKILLS</h2>
        <p className="text-gray-500 text-sm">Scroll Down</p>
      </div>
      <div ref={scrollContainerRef} className="flex items-center pl-10 md:pl-20">
        {renderCard("WEB DESIGN", "01", "from-blue-500 to-cyan-400")}
        {renderCard("MOBILE APPS", "02", "from-purple-500 to-pink-500")}
        {renderCard("UI/UX", "03", "from-yellow-400 to-orange-500")}
        {renderCard("BACKEND", "04", "from-green-400 to-emerald-600")}
      </div>
    </section>
  );
};

export default SkillsSection;