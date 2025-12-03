import { useState, useRef, useEffect } from 'react';

const TerminalContact = () => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([
    { type: 'system', text: 'Welcome to Ahmed OS v1.0' },
    { type: 'system', text: 'Initializing connection...' },
    { type: 'success', text: 'Connected successfully.' },
    { type: 'question', text: 'Please enter your Name to start:' }
  ]);
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // Ref للصندوق اللي بيعمل سكرول (منطقة الكود)
  const scrollAreaRef = useRef(null);

  // التعديل هنا: بنحرك السكرول بتاع الديف نفسه لأخر نقطة فيه
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth' // حركة ناعمة
      });
    }
  }, [lines]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // بيمنع أي حركة افتراضية للمتصفح
      processInput();
    }
  };

  const processInput = () => {
    if (!input.trim()) return;

    const newLines = [...lines, { type: 'user', text: `> ${input}` }];
    const value = input.trim();
    setInput('');

    setTimeout(() => {
        if (step === 0) {
            setFormData({ ...formData, name: value });
            setLines(prev => [...prev, { type: 'question', text: `Hello ${value}, enter your Email:` }]);
            setStep(1);
        } else if (step === 1) {
            if(value.includes('@')) {
                setFormData({ ...formData, email: value });
                setLines(prev => [...prev, { type: 'question', text: 'System accepted email. Type your message:' }]);
                setStep(2);
            } else {
                setLines(prev => [...prev, { type: 'error', text: 'Error: Invalid email format. Try again:' }]);
            }
        } else if (step === 2) {
            setFormData({ ...formData, message: value });
            setLines(prev => [...prev, 
                { type: 'system', text: 'Encrypting message...' },
                { type: 'system', text: 'Sending packet to server...' },
                { type: 'success', text: 'MESSAGE SENT SUCCESSFULLY! 🚀' },
                { type: 'system', text: 'Ahmed will contact you soon.' }
            ]);
            setStep(3); 
        }
    }, 500);

    setLines(newLines);
  };

  return (
    <section className="py-20 bg-[#0a0a0a] flex justify-center items-center px-4">
      
      <div className="w-full max-w-3xl bg-[#0c0c0c] rounded-lg border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm md:text-base relative group">
        
        {/* شريط العنوان */}
        <div className="bg-[#1a1a1a] p-3 flex items-center justify-between border-b border-gray-800">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-500 text-xs tracking-widest">bash — ahmed@portfolio ~ contact</div>
            <div className="w-10"></div> 
        </div>

        {/* منطقة الكود - ضفنا الـ ref هنا */}
        <div 
            ref={scrollAreaRef} 
            className="p-6 h-[400px] overflow-y-auto custom-scrollbar flex flex-col gap-2"
        >
            
            {lines.map((line, i) => (
                <div key={i} className={`
                    ${line.type === 'system' ? 'text-gray-500' : ''}
                    ${line.type === 'question' ? 'text-[#00f3ff]' : ''}
                    ${line.type === 'success' ? 'text-green-400' : ''}
                    ${line.type === 'error' ? 'text-red-400' : ''}
                    ${line.type === 'user' ? 'text-white font-bold' : ''}
                `}>
                    {line.text}
                </div>
            ))}

            {step < 3 && (
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#bc13fe]">➜</span>
                    <span className="text-[#00f3ff]">~</span>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-white w-full caret-[#00f3ff]"
                        placeholder="Type here..."
                        autoFocus
                    />
                </div>
            )}
            
            {/* شيلنا الـ bottomRef من هنا خلاص مش محتاجينه */}
        </div>

        {/* CRT Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] pointer-events-none opacity-20"></div>

      </div>
    </section>
  );
};

export default TerminalContact;