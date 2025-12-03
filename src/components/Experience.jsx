import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: "I-Tech School",
    role: "Student (IBM P-TECH)",
    date: "2022 - 2027",
    desc: "دراسة تقنية مكثفة، بنتعلم فيها أساسيات الـ CS وتطوير الويب عملياً.",
    side: "left" // يظهر علي الشمال
  },
  {
    id: 2,
    title: "Pzone International",
    role: "Help Desk Intern",
    date: "Jun '25 - Aug '25",
    desc: "تجربة عملية في بيئة العمل، اتعلمت فيها الالتزام وحل المشاكل التقنية.",
    side: "right" // يظهر علي اليمين
  },
  {
    id: 3,
    title: "Freelance",
    role: "Front-End Developer",
    date: "Present",
    desc: "شغال مع نفسي ببنـي مواقع بـ React و Strapi، وبطور مهاراتي كل يوم.",
    side: "left"
  }
];

const Experience = () => {
  const container = useRef();
  const lineRef = useRef();
  const planeRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top center", // يبدأ لما السكشن يوصل نص الشاشة
        end: "bottom center",
        scrub: 1.5, // نعومة الحركة
      }
    });

    // 1. حركة الخط اللي بيطول (الليزر)
    tl.to(lineRef.current, {
      height: "100%", 
      ease: "none"
    });

    // 2. حركة الطيارة وهي نازلة مع الخط
    tl.to(planeRef.current, {
      top: "100%",
      ease: "none"
    }, "<"); // تشتغل مع نفس وقت حركة الخط

    // 3. ظهور العناصر (Floating Items)
    experiences.forEach((exp) => {
      gsap.from(`.exp-item-${exp.id}`, {
        opacity: 0,
        y: 50, // يجو من تحت
        scale: 0.8,
        rotate: exp.side === "left" ? -5 : 5, // ميلة بسيطة كأنهم طايرين
        scrollTrigger: {
          trigger: `.exp-item-${exp.id}`,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full py-40 bg-[#0a0a0a] overflow-hidden">
      
      <div className="container mx-auto px-4 relative">
        
        {/* العنوان */}
        <div className="text-center mb-32 relative z-10">
          <h2 className="text-[#00f3ff] text-sm tracking-[0.5em] uppercase mb-4 animate-pulse">Flight Log</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-white">MY JOURNEY</h3>
        </div>

        {/* --- خط المسار (الليزر) --- */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2 h-full">
            {/* الخط المضئ اللي بيتحرك */}
            <div 
                ref={lineRef} 
                className="w-full bg-linear-to-b from-[#00f3ff] to-[#bc13fe] h-0 shadow-[0_0_20px_#00f3ff]"
            ></div>
            
            {/* الطيارة/الصاروخ */}
            <div 
                ref={planeRef} 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-[#00f3ff]"
            >
                {/* أيقونة طيارة SVG */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] rotate-180">
                    <path d="M12 2L2 22L12 18L22 22L12 2Z" />
                </svg>
            </div>
        </div>

        {/* --- العناصر --- */}
        <div className="relative z-10">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className={`exp-item-${exp.id} flex items-center justify-between mb-24 w-full ${
                exp.side === "left" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              
              {/* الكونتنت (اللوح الزجاجي) */}
              <div className={`w-[45%] md:w-[40%] p-8 rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden
                ${exp.side === "left" ? "text-right" : "text-left"}
              `}>
                
                {/* لمعة (Glow) بتتحرك ورا */}
                <div className="absolute -inset-1 bg-linear-to-r from-[#00f3ff]/20 to-[#bc13fe]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <span className="text-[#00f3ff] font-mono text-sm mb-2 block">{exp.date}</span>
                <h4 className="text-2xl md:text-4xl font-bold text-white mb-2">{exp.title}</h4>
                <p className="text-gray-300 font-bold mb-4">{exp.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{exp.desc}</p>
              </div>

              {/* النقطة اللي علي الخط */}
              <div className="w-[10%] flex justify-center relative">
                 <div className="w-4 h-4 bg-[#0a0a0a] border-2 border-[#00f3ff] rounded-full shadow-[0_0_10px_#00f3ff] z-10 relative">
                    <div className="absolute inset-0 bg-[#00f3ff] rounded-full animate-ping opacity-75"></div>
                 </div>
              </div>

              {/* مساحة فاضية عشان التوازن */}
              <div className="w-[45%] md:w-[40%]"></div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;