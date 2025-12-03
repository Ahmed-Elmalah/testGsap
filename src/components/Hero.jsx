import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HackerText from './HackerText';

const Hero = () => {
  const container = useRef();
  const titleRef = useRef();
  const subTitleRef = useRef();
  const btnRef = useRef();
  const circleRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(circleRef.current, { duration: 1.5, scale: 0, opacity: 0, ease: "elastic.out(1, 0.3)" });
    tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=1");
    tl.from(subTitleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5");
    tl.from(btnRef.current, { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");
    gsap.to(circleRef.current, { y: 20, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full flex flex-col justify-center items-center z-10">
      <div ref={circleRef} className="absolute w-96 h-96 bg-linear-to-r from-[#00f3ff] to-[#bc13fe] rounded-full blur-[100px] opacity-30 -z-10 top-1/4"></div>
      <div className="z-10 text-center px-4">
        {/* هنا التعديل: استخدمنا HackerText */}
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-gray-500 flex flex-col items-center"
        >
          <HackerText text="CREATIVE" className="cursor-pointer text-white hover:text-[#00f3ff] transition-colors" />
          <HackerText text="DEVELOPER" className="cursor-pointer text-white hover:text-[#bc13fe] transition-colors" />
        </h1>

        <p ref={subTitleRef} className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
          بنعمل عظمة بـ React و GSAP عشان نغير قواعد اللعبة.
        </p>
        <button ref={btnRef} className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-[#00f3ff] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)]">
          ابدأ الرحلة 🚀
        </button>
      </div>
    </section>
  );
};

export default Hero;