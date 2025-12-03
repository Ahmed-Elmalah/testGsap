import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import Header from './components/Header';
import Menu from './components/Menu';

import { useEffect , useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual"; // يمنع المتصفح إنه ينزلك تحت
    window.scrollTo(0, 0);
    
    const lenis = new Lenis({
      duration: 1.2, // مدة الزحلقة (كل ما زاد الرقم بقت أنعم)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // معادلة النعومة
      smoothWheel: true,
    });

    // دالة التحديث مع كل فريم
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="bg-[#0a0a0a] text-white cursor-none min-h-screen relative">
      <Preloader />
      <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <CustomCursor />
      <Home />
      
      <Footer />
    </main>
  );
}

export default App;
