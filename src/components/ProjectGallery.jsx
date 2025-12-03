import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "CYBER PUNK",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "NEON CITY",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "AI BRAIN",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "SPACE X",
    category: "3D Modeling",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  }
];

const ProjectGallery = () => {
  const [activeImage, setActiveImage] = useState(null);
  const containerRef = useRef(null);
  const modalContainer = useRef(null);
  const cursorLabel = useRef(null);
  
  // حفظ إحداثيات الماوس (Target)
  const mouse = useRef({ x: 0, y: 0 });
  // حفظ إحداثيات الصورة الحالية (Current)
  const delayedMouse = useRef({ x: 0, y: 0 });

  // 1. إدارة حركة الماوس وحلقة الأنيميشن (Ticker)
  useEffect(() => {
    // دالة تحديث مكان الماوس فقط
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // دالة التحريك الناعم (Lerp) - بتشتغل 60 مرة في الثانية
    const animate = () => {
      // معادلة النعومة: بنحرك العنصر مسافة 10% بس ناحية الماوس في كل فريم
      // ده اللي بيعمل الـ Smooth Delay
      const ease = 0.1; // قلل الرقم ده لو عايزها أبطأ وأنعم (مثلاً 0.05)
      
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * ease;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * ease;

      // تطبيق الحركة مباشرة على العناصر لو موجودة
      if (modalContainer.current) {
        gsap.set(modalContainer.current, { 
            x: delayedMouse.current.x, 
            y: delayedMouse.current.y,
            xPercent: -50, 
            yPercent: -50 
        });
      }
      if (cursorLabel.current) {
        gsap.set(cursorLabel.current, { 
            x: delayedMouse.current.x, 
            y: delayedMouse.current.y,
            xPercent: -50, 
            yPercent: -50 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    // بنضيف الدالة للـ Ticker بتاع GSAP
    gsap.ticker.add(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(animate);
    };
  }, []);

  // 2. إدارة الظهور والاختفاء (Scale & Opacity)
  useGSAP(() => {
    if (activeImage) {
      gsap.to(modalContainer.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: true });
      gsap.to(cursorLabel.current, { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out", overwrite: true });
    } else {
      gsap.to(modalContainer.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
      gsap.to(cursorLabel.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true });
    }
  }, [activeImage]);

  // 3. منع القفزة عند دخول الماوس
  const handleMouseEnter = (image) => {
    setActiveImage(image);
    // حركة ذكية: بنخلي العنصر "ينط" لمكان الماوس الحالي فوراً عشان ميبدأش من الصفر
    delayedMouse.current.x = mouse.current.x;
    delayedMouse.current.y = mouse.current.y;
  };

  return (
    <section ref={containerRef} className="py-32 w-full bg-[#0a0a0a] relative z-10">
      
      {/* Preload للصور عشان متهنجش */}
      <div className="hidden">
        {projects.map((p, i) => <img key={i} src={p.image} alt="" />)}
      </div>

      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-sm font-bold text-[#00f3ff] mb-2 uppercase tracking-widest">Selected Works</h2>
        <p className="text-4xl text-gray-400">شوف أخر إبداعاتنا.</p>
      </div>

      <div className="flex flex-col w-full border-t border-gray-800">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="group flex justify-between items-center py-16 px-4 md:px-20 border-b border-gray-800 cursor-pointer hover:bg-[#111] transition-colors duration-300 relative"
            onMouseEnter={() => handleMouseEnter(project.image)}
            onMouseLeave={() => setActiveImage(null)}
          >
            <h2 className="text-4xl md:text-7xl font-bold text-gray-300 group-hover:text-white group-hover:-translate-x-4 transition-all duration-500 ease-in-out">
              {project.title}
            </h2>
            <p className="text-gray-500 group-hover:text-[#00f3ff] transition-colors duration-300">
              {project.category}
            </p>
          </div>
        ))}
      </div>

      {/* العناصر العائمة */}
      <div 
        ref={modalContainer} 
        className="fixed top-0 left-0 h-[300px] w-[400px] bg-white pointer-events-none overflow-hidden z-20 rounded-lg shadow-2xl will-change-transform"
      >
        <div className="relative h-full w-full">
           {activeImage && (
             <img 
              src={activeImage} 
              alt="project"
              className="h-full w-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
             />
           )}
        </div>
      </div>

      <div 
        ref={cursorLabel}
        className="fixed top-0 left-0 w-20 h-20 bg-[#00f3ff] text-black rounded-full flex items-center justify-center pointer-events-none z-30 font-bold shadow-lg will-change-transform"
      >
        VIEW
      </div>

    </section>
  );
};

export default ProjectGallery;