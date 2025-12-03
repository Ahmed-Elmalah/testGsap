import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HackerText from './HackerText';

const links = [
  { path: "/", label: "Home" },
  { path: "#work", label: "Work" },
  { path: "#about", label: "About" },
  { path: "#contact", label: "Contact" }
];

const Menu = ({ isOpen, setIsOpen }) => {
  const container = useRef();

  useGSAP(() => {
    // لو المنيو اتفتحت (isOpen = true)
    if (isOpen) {
      const tl = gsap.timeline();

      // 1. نزل الخلفية السودا الأول
      tl.to(container.current, {
        top: 0,
        duration: 0.8,
        ease: "power4.inOut",
      });

      // 2. حرك الكلام (الحركة اللي كانت بايظة)
      // استخدمنا fromTo عشان نضمن إنه يبدأ من تحت كل مرة
      tl.fromTo(".menu-link", 
        { 
          y: 150,    // نقطة البداية (تحت)
          rotate: 5, // لفة بسيطة بتدي شكل جامد
          opacity: 0 // مخفي
        },
        { 
          y: 0,       // نقطة النهاية (مكانه الطبيعي)
          rotate: 0,  // يعدل اللفة
          opacity: 1, // يظهر
          duration: 0.7, 
          stagger: 0.1, // التأخير بين كل كلمة والتانية
          ease: "power3.out" 
        },
        "-=0.4" // يبدأ قبل ما الخلفية تخلص شوية
      );
    } 
    
    // لو المنيو اتقفلت (isOpen = false)
    else {
      const tl = gsap.timeline();

      // اخفي الكلام الأول بسرعة
      tl.to(".menu-link", {
        y: -50, // يطلع لفوق وهو بيختفي
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
      });

      // ارفع الخلفية السودا
      tl.to(container.current, {
        top: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      }, "-=0.2");
    }

  }, { scope: container, dependencies: [isOpen] }); // مهم جداً: الـ dependency على isOpen

  return (
    <div 
      ref={container} 
      className="fixed -top-full left-0 w-full h-screen bg-[#1a1a1a] z-40 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-4 text-center">
        {links.map((link, index) => (
          // الـ div ده مهم عشان بيعمل Mask للكلام وهو طالع
          <div key={index} className="overflow-hidden p-2"> 
            <a 
              href={link.path} 
              className="menu-link block text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600 hover:to-[#00f3ff] transition-all duration-300 uppercase tracking-tighter cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <HackerText text={link.label} />
            </a>
          </div>
        ))}
      </div>

      {/* روابط السوشيال اللي تحت */}
      <div className="absolute bottom-10 flex gap-10 overflow-hidden">
        <div className="flex gap-10 menu-link text-gray-500 uppercase text-sm tracking-widest opacity-0">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Dribbble</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;