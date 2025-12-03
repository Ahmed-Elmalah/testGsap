import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = () => {
  const container = useRef();
  const counterRef = useRef();
  const textRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. نمنع السكرول أثناء التحميل
    document.body.style.overflow = 'hidden';

    // 2. حركة العداد من 0 لـ 100
    tl.to(counterRef.current, {
      innerText: 100,
      duration: 3,
      snap: { innerText: 1 }, // عشان يعد أرقام صحيحة مش كسور
      ease: "power2.inOut",
      onUpdate: function() {
        // تحديث النص مع علامة %
        counterRef.current.innerHTML = Math.round(this.targets()[0].innerText) + "%";
      }
    });

    // 3. حركة ظهور واختفاء جملة تحت العداد
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, repeat: 1, yoyo: true, ease: "power2.out" },
      "-=2.5" // تبدأ قبل العداد ما يخلص
    );

    // 4. حركة الستارة (تطلع لفوق وتختفي)
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
        // نرجع السكرول تاني لما يخلص
        document.body.style.overflow = 'auto';
      }
    });

  }, { scope: container });

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-9999 bg-[#0a0a0a] flex flex-col justify-center items-center text-white"
    >
      {/* العداد العملاق */}
      <div className="overflow-hidden">
        <h1 
          ref={counterRef} 
          className="text-[15vw] md:text-[20vw] font-bold leading-none font-sans tracking-tighter text-[#00f3ff]"
        >
          0%
        </h1>
      </div>

      {/* نص شيك تحت العداد */}
      <p ref={textRef} className="text-xl md:text-2xl font-mono text-gray-400 mt-4 uppercase tracking-widest">
        Loading Experience...
      </p>

    </div>
  );
};

export default Preloader;