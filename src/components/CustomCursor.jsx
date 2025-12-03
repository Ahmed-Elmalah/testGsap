import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef();

  useEffect(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", {duration: 0.5, ease: "power3"});
    const yTo = gsap.quickTo(cursorRef.current, "y", {duration: 0.5, ease: "power3"});

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
    ></div>
  );
};

export default CustomCursor;