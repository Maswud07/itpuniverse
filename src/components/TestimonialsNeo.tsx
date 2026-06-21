import React from 'react';

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`w-12 h-12 text-white drop-shadow-[1px_2px_0px_rgba(0,0,0,1)] ${className}`}
  >
    <path 
      d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" 
      fill="white" 
      stroke="black" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const DotGrid = () => (
  <div className="grid grid-cols-6 gap-2 opacity-25 select-none">
    {Array.from({ length: 18 }).map((_, i) => (
      <span key={i} className="w-1 h-1 rounded-full bg-slate-800" />
    ))}
  </div>
);

export default function TestimonialsNeo() {
  return (
    <div className="w-full bg-[#FAF9F6] py-16 px-4 md:px-8 relative overflow-hidden flex flex-col items-center border border-slate-200/50 rounded-[40px] shadow-xs" id="custom-neo-testimonials">
      
      {/* Curved background line vector */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0">
        <svg className="w-full h-full text-slate-300" viewBox="0 0 1440 800" fill="none">
          <path d="M-100 200 C300 400, 800 100, 1500 500" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 6" />
          <path d="M-50 450 C400 200, 1000 600, 1600 300" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Decorative dot grids */}
      <div className="absolute top-12 left-[12%] z-0 hidden sm:block">
        <DotGrid />
      </div>
      <div className="absolute bottom-16 left-[8%] z-0 hidden sm:block">
        <DotGrid />
      </div>
      <div className="absolute top-20 right-[10%] z-0 hidden sm:block">
        <DotGrid />
      </div>
      <div className="absolute bottom-12 right-[14%] z-0 hidden sm:block">
        <DotGrid />
      </div>

      {/* Title block */}
      <div className="text-center z-10 max-w-xl mb-16 relative">
        <p className="text-[#a1a1a9] uppercase text-xs tracking-widest font-black mb-2 select-none">
          Student Testimonial
        </p>
        <h2 className="text-4xl sm:text-[45px] font-extrabold text-[#231F20] tracking-tight font-sans">
          What They Say?
        </h2>
      </div>

      {/* Testimonial Cards Workspace */}
      <div className="w-full max-w-4xl z-10 mx-auto flex flex-col space-y-16 lg:space-y-0 lg:relative lg:h-[620px] pt-4 select-none">
        
        {/* ================= CARD 1: GREEN PROFILE (TILTED LEFT) ================= */}
        <div className="relative group w-full max-w-[340px] mx-auto lg:absolute lg:top-4 lg:left-[5%] lg:rotate-[-6deg] transition-all duration-300 hover:rotate-[-2deg] hover:scale-105 z-10">
          
          {/* Flat solid black replica shadow */}
          <div className="absolute inset-0 bg-[#000000] border-2 border-black rounded-[28px] translate-x-3 translate-y-3 z-0" />
          
          {/* Main Card */}
          <div className="relative bg-[#A2F294] border-2 border-black rounded-[28px] p-6 text-left flex flex-col justify-between min-h-[300px] z-10 overflow-visible">
            
            {/* Sparkle overlay */}
            <div className="absolute -top-7 right-12 z-20">
              <SparkleIcon className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-4">
              {/* Star group */}
              <div className="flex space-x-1 text-[#000000] text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              
              {/* Body message */}
              <p className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed tracking-tight">
                "ITP Universe didn't just help me pass the IELTS — it helped me master real English expression. I've never felt more confident and fluent speaking under pressure."
              </p>
            </div>

            {/* Profile bottom footer */}
            <div className="pt-5 mt-4 border-t border-black/10 flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120" 
                alt="Neha D."
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full border-2 border-black object-cover bg-slate-100"
              />
              <div>
                <h4 className="font-extrabold text-[#231F20] text-sm">Neha D.</h4>
                <p className="text-xs text-slate-800 font-bold">Academic Advisor</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= CARD 2: PINK PROFILE (TILTED RIGHT) ================= */}
        <div className="relative group w-full max-w-[340px] mx-auto lg:absolute lg:top-8 lg:right-[6%] lg:rotate-[4deg] transition-all duration-300 hover:rotate-[1deg] hover:scale-105 z-10">
          
          {/* Flat solid black replica shadow */}
          <div className="absolute inset-0 bg-[#000000] border-2 border-black rounded-[28px] translate-x-3 translate-y-3 z-0" />
          
          {/* Main Card */}
          <div className="relative bg-[#FFA2C9] border-2 border-black rounded-[28px] p-6 text-left flex flex-col justify-between min-h-[300px] z-10 overflow-visible">
            
            {/* Sparkle overlay bottom right */}
            <div className="absolute -bottom-6 right-6 z-20">
              <SparkleIcon className="w-10 h-10" />
            </div>

            <div className="space-y-4">
              {/* Star group */}
              <div className="flex space-x-1 text-[#000000] text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              
              {/* Body message */}
              <p className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed tracking-tight">
                "From zero preparation to an absolute band score boost on TOEFL in 30 days! The realistic mock systems and expert study plan made the entire process stress-free."
              </p>
            </div>

            {/* Profile bottom footer */}
            <div className="pt-5 mt-4 border-t border-black/10 flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120" 
                alt="Jay K."
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full border-2 border-black object-cover bg-slate-100"
              />
              <div>
                <h4 className="font-extrabold text-[#231F20] text-sm">Jay K.</h4>
                <p className="text-xs text-slate-800 font-bold">Graduate Student</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= CARD 3: WHITE PROFILE (CENTER FRONT) ================= */}
        <div className="relative group w-full max-w-[380px] mx-auto lg:absolute lg:bottom-4 lg:left-[24%] lg:rotate-[-2deg] transition-all duration-300 hover:rotate-[0deg] hover:scale-105 z-20">
          
          {/* Flat solid black replica shadow */}
          <div className="absolute inset-0 bg-[#000000] border-2 border-black rounded-[28px] translate-x-3.5 translate-y-3.5 z-0" />
          
          {/* Main Card */}
          <div className="relative bg-white border-2 border-black rounded-[28px] p-7 text-left flex flex-col justify-between min-h-[320px] z-10 overflow-visible">
            
            {/* Sparkle overlay bottom right area */}
            <div className="absolute -bottom-6 right-8 z-20 animate-pulse">
              <SparkleIcon className="w-10 h-10" />
            </div>

            <div className="space-y-4">
              {/* Star group */}
              <div className="flex space-x-1 text-[#000000] text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              
              {/* Body message */}
              <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed tracking-tight">
                "I never imagined I'd hit my target PTE score on the first attempt — let alone top the charts! I was overwhelmed searching for mock structures, but ITP Universe guided me with its smart dynamic resources, interactive lessons, and realistic simulator."
              </p>
            </div>

            {/* Profile bottom footer */}
            <div className="pt-6 mt-4 border-t border-black/10 flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120" 
                alt="Fatima S."
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full border-2 border-black object-cover bg-slate-100"
              />
              <div>
                <h4 className="font-extrabold text-[#231F20] text-sm">Fatima S.</h4>
                <p className="text-xs text-slate-500 font-bold">Corporate Scholar, UAE</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
