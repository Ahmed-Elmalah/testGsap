import { useState, useEffect, useRef } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
    let iteration = 0;
    
    // لو في انيميشن شغال، نوقفه الأول عشان ميعلقش
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((letter, index) => {
            // لو الحرف ده وصلناله في الترتيب، نرجعه لأصله
            if (index < iteration) {
              return text[index];
            }
            // غير كده، رجع حرف عشوائي من الرموز
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      // شرط التوقف: لما نخلص كل الحروف
      if (iteration >= text.length) { 
        clearInterval(intervalRef.current);
      }
      
      // سرعة فك الشفرة (كل ما قللت الرقم، بقى أبطأ)
      iteration += 1 / 3; 
    }, 30); // كل 30 ملي ثانية يغير الحروف
  };

  return (
    <span 
      className={className} 
      onMouseEnter={scramble} // أول ما الماوس يلمس
      onMouseLeave={scramble} // (اختياري) ممكن تشيل دي لو عايزها تشتغل بس لما يدخل
    >
      {displayText}
    </span>
  );
};

export default HackerText;