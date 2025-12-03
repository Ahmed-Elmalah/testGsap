import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RocketDream = () => {
  const container = useRef();
  const rocketRef = useRef();
  const expanderRef = useRef(); // الدايرة اللي هتكبر
  const contentRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=200%", // قللنا المسافة شوية عشان ننجز
        pin: true,
        scrub: 1, 
      }
    });

    // 1. الصاروخ يطير
    tl.to(rocketRef.current, {
      y: -300,
      scale: 0.6,
      duration: 2,
      ease: "power2.in"
    });

    // 2. الانفجار الأبيض (بدل السحب التقيلة)
    // بنكبر دايرة عادية جداً بس بتأدي الغرض وأخف بكتير
    tl.to(expanderRef.current, {
      scale: 50, // تكبر تغطي الشاشة
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut"
    }, "<+0.5");

    // 3. الكلام يظهر
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center">
      
      {/* الخلفية */}
      <div className="absolute inset-0 z-0 opacity-30">
         {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute bg-white rounded-full w-1 h-1" 
                 style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}></div>
         ))}
      </div>

      {/* --- الصاروخ --- */}
      <div ref={rocketRef} className="relative z-30">
        <svg width="100" height="180" viewBox="0 0 150 250" fill="none">
            <path d="M75 0C75 0 150 70 150 160H0C0 70 75 0 75 0Z" fill="#E63946"/>
            <path d="M75 0C75 0 35 70 35 160H115C115 70 75 0 75 0Z" fill="#FFF" fillOpacity="0.2"/>
            <circle cx="75" cy="80" r="25" fill="#A8DADC" stroke="#1D3557" strokeWidth="5"/>
            <path d="M0 160L-20 220H30L10 160H0Z" fill="#1D3557"/>
            <path d="M150 160L170 220H120L140 160H150Z" fill="#1D3557"/>
            <path className="animate-pulse" d="M50 160H100L75 230L50 160Z" fill="#FFB703"/>
        </svg>
      </div>

      {/* --- الدايرة اللي هتعمل الانفجار الأبيض (الأداء العالي) --- */}
      <div 
        ref={expanderRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#f8f9fa] rounded-full z-20 opacity-0 pointer-events-none"
      ></div>

      {/* --- المحتوى --- */}
      <div ref={contentRef} className="absolute inset-0 z-40 flex flex-col justify-center items-center opacity-0 text-center">
        
        <h2 className="text-[10vw] font-black text-[#1a1a1a] leading-none tracking-tighter">
            BUILD THE<br/>
            <span className="text-blue-600">IMPOSSIBLE</span>
        </h2>

        <p className="mt-6 text-gray-500 text-xl font-medium max-w-lg px-4">
            Turning caffeine into code, and complex problems into simple solutions.
        </p>

        <div className="mt-8 px-8 py-3 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform cursor-pointer shadow-lg">
            Let's Create ⚡
        </div>

      </div>

    </section>
  );
};

export default RocketDream;