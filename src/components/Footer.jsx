import Magnetic from './Magnetic';

const Footer = () => {
  return (
    <footer className="relative h-screen bg-[#050505] text-white flex flex-col justify-center items-center overflow-hidden">
      
      {/* خلفية خفيفة */}
      <div className="absolute inset-0 bg-linear-to-t from-[#00f3ff]/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center z-10">
        <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm md:text-base">
          Got an idea? Let's build it.
        </p>

        {/* العنوان الكبير - خليته يفتح الإيميل برضه */}
        <Magnetic>
          <a 
            href="mailto:ahmedelmala7@icloud.com"
            className="block text-[12vw] font-bold leading-none hover:text-[#00f3ff] transition-colors duration-500 cursor-pointer mix-blend-screen"
          >
            LET'S TALK
          </a>
        </Magnetic>

        <div className="mt-20 flex flex-col md:flex-row gap-10 items-center justify-center">
          
          {/* زرار الإيميل */}
          <Magnetic>
            <a 
              href="mailto:ahmedelmala7@icloud.com"
              className="px-10 py-4 border border-gray-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-lg group relative overflow-hidden inline-block"
            >
              <span className="relative z-10">ahmedelmala7@icloud.com</span>
              {/* حركة تعبئة الزرار */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </a>
          </Magnetic>

          {/* زرار اللينكدان */}
          <Magnetic>
            <a 
              /* 👇 حط لينك بروفايلك هنا */
              href="https://www.linkedin.com/in/ahmed-elmalah-70a13b392/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-4 border border-gray-700 rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 text-lg inline-block"
            >
              LinkedIn
            </a>
          </Magnetic>

          {/* زرار الجيت هب */}
          <Magnetic>
            <a 
              /* 👇 حط لينك بروفايلك هنا */
              href="https://github.com/Ahmed-Elmalah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-4 border border-gray-700 rounded-full hover:bg-[#333] hover:text-white hover:border-[#333] transition-all duration-300 text-lg inline-block"
            >
              GitHub
            </a>
          </Magnetic>

        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center text-gray-600 text-sm">
        <p>© 2025 Ahmed Khaled. Coded with ❤️ & React.</p>
      </div>

    </footer>
  );
};

export default Footer;