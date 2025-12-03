import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ["React.js", "GSAP", "Zustand", "Strapi", "Tailwind", "Three.js"];

const SpaceSkills = () => {
  const containerRef = useRef();
  const starsRef = useRef([]);
  const textsRef = useRef([]);

  // دالة مساعدة عشان نطلع أرقام عشوائية لمكان النجوم
  const random = (min, max) => Math.random() * (max - min) + min;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // يبدأ لما السكشن يلمس سقف الشاشة
        end: "+=300%", // مدة السكرول (3 أضعاف طول الشاشة) عشان نلحق نستمتع بالرحلة
        scrub: 1, // نعومة الحركة مع السكرول
        pin: true, // يثبت الشاشة عشان نحس إننا بنطير لجوه
      }
    });

    // 1. حركة النجوم (بتطير ناحيتنا)
    starsRef.current.forEach((star, i) => {
       // سرعة مختلفة لكل نجمة عشان الواقعية (Parallax)
      const speed = random(0.5, 2); 
      tl.to(star, {
        z: random(100, 500) * speed, // تتحرك على محور العمق Z
        opacity: 0, // تختفي لما تقرب اوي
        scale: speed * 2, // تكبر وهي بتقرب
        duration: 3,
        ease: "none"
      }, 0); // الـ 0 دي عشان كلهم يبدأوا مع بعض في بداية التايم لاين
    });

    // 2. حركة كلمات المهارات (بتظهر واحدة ورا التانية وتكبر)
    textsRef.current.forEach((text, i) => {
      tl.fromTo(text, 
        { scale: 0, opacity: 0, z: -100 }, // البداية: بعيدة وصغيرة ومخفية
        { 
          scale: 3, // النهاية: كبيرة جداً
          opacity: 1, // ظاهرة
          z: 200, // قريبة من الشاشة
          duration: 1, 
          ease: "power1.inOut",
          // عشان يختفوا لما يعدوا مننا
          onComplete: () => gsap.to(text, { opacity: 0, duration: 0.2 })
        }, 
        i * 0.5 // تأخير (Stagger) عشان ميظهروش كلهم مرة واحدة
      );
    });

  }, { scope: containerRef });

  return (
    // perspective: مهم جداً عشان يعمل تأثير الـ 3D
    <section ref={containerRef} className="h-screen w-full bg-black relative overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* --- طبقة النجوم --- */}
      {/* بنعمل 100 نجمة بـ loop */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          ref={el => starsRef.current[i] = el} // بنخزن مرجع للنجمة عشان نحركها
          className="absolute bg-white rounded-full"
          style={{
            // مكان وحجم عشوائي في البداية
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
            width: `${random(1, 3)}px`,
            height: `${random(1, 3)}px`,
            opacity: random(0.3, 0.8),
            // بنحطهم بعيد شوية في الـ Z عشان يبدأوا الحركة من جوه
            transform: `translateZ(${random(-200, -500)}px)` 
          }}
        ></div>
      ))}

      {/* --- طبقة المهارات --- */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10">
        {skills.map((skill, i) => (
          <h2
            key={i}
            ref={el => textsRef.current[i] = el}
            className="text-white font-bold text-5xl md:text-7xl absolute opacity-0 tracking-tighter"
            style={{
                // لمسة جمالية: ظل نيون خفيف حوالين الكلمة
                textShadow: '0 0 20px rgba(0, 243, 255, 0.5)' 
            }}
          >
            {skill}
          </h2>
        ))}
      </div>

      {/* عنوان صغير ثابت */}
       <div className="absolute bottom-10 w-full text-center z-20">
          <p className="text-[#00f3ff] uppercase tracking-[0.3em] text-sm animate-pulse">
              Warp Speed to Future Skills
          </p>
       </div>

    </section>
  );
};

export default SpaceSkills;