import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
  const magnetic = useRef(null);

  useEffect(() => {
    const element = magnetic.current;
    
    // بنستخدم quickTo عشان الحركة تكون ناعمة جداً مع الماوس
    const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // بنحسب مكان الماوس بالنسبة لنص الزرار
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // بنحرك الزرار بجزء من حركة الماوس (عشان ميبعدش اوي)
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      // لما الماوس يسيب الزرار، يرجع مكانه الاصلي
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // بنرجع العنصر بس بنستنسخه عشان نقدر نتحكم فيه
  return (
    <div ref={magnetic} className="inline-block">
      {children}
    </div>
  );
};

export default Magnetic;