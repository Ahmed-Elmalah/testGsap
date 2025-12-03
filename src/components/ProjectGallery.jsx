import { useRef, useState } from 'react';
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

  useGSAP(() => {
    // 1. إعدادات أولية:
    // شيلنا hidden فبقا لازم نضمن إنهم مخفيين بـ Opacity من البداية
    gsap.set(modalContainer.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    gsap.set(cursorLabel.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });

    // 2. دوال الحركة
    const xMoveContainer = gsap.quickTo(modalContainer.current, "x", {duration: 0.8, ease: "power3"});
    const yMoveContainer = gsap.quickTo(modalContainer.current, "y", {duration: 0.8, ease: "power3"});
    
    const xMoveCursor = gsap.quickTo(cursorLabel.current, "x", {duration: 0.5, ease: "power3"});
    const yMoveCursor = gsap.quickTo(cursorLabel.current, "y", {duration: 0.5, ease: "power3"});

    // 3. دالة تحريك الماوس
    const handleMouseMove = (e) => {
      xMoveContainer(e.clientX);
      yMoveContainer(e.clientY);
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. ScrollTrigger للمراقبة
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => {
        setActiveImage(null);
        gsap.to([modalContainer.current, cursorLabel.current], { scale: 0, opacity: 0, duration: 0.2, overwrite: true });
      },
      onLeaveBack: () => {
        setActiveImage(null);
        gsap.to([modalContainer.current, cursorLabel.current], { scale: 0, opacity: 0, duration: 0.2, overwrite: true });
      }
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, { scope: containerRef });

  // 5. مراقبة الهوفر
  useGSAP(() => {
    if (activeImage) {
      gsap.to(modalContainer.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(cursorLabel.current, { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out", overwrite: "auto" });
    } else {
      gsap.to(modalContainer.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: "auto" });
      gsap.to(cursorLabel.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: "auto" });
    }
  }, [activeImage]);

  return (
    <section ref={containerRef} className="py-32 w-full bg-[#0a0a0a] relative z-10">
      
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-sm font-bold text-[#00f3ff] mb-2 uppercase tracking-widest">Selected Works</h2>
        <p className="text-4xl text-gray-400">شوف أخر إبداعاتنا.</p>
      </div>

      <div className="flex flex-col w-full border-t border-gray-800">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="group flex justify-between items-center py-16 px-4 md:px-20 border-b border-gray-800 cursor-pointer hover:bg-[#111] transition-colors duration-300 relative"
            onMouseEnter={() => setActiveImage(project.image)}
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

      {/* التعديل هنا: شيلنا hidden و md:block 
         وخليناها موجودة دايماً بس GSAP هو اللي بيتحكم في ظهورها
      */}
      <div 
        ref={modalContainer} 
        className="fixed top-0 left-0 h-[300px] w-[400px] bg-white pointer-events-none overflow-hidden z-20 rounded-lg shadow-2xl"
      >
        <div className="relative h-full w-full">
           {activeImage && (
             <img 
              src={activeImage} 
              alt="project"
              className="h-full w-full object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-500"
             />
           )}
        </div>
      </div>

      <div 
        ref={cursorLabel}
        className="fixed top-0 left-0 w-20 h-20 bg-[#00f3ff] text-black rounded-full flex items-center justify-center pointer-events-none z-30 font-bold shadow-lg"
      >
        VIEW
      </div>

    </section>
  );
};

export default ProjectGallery;