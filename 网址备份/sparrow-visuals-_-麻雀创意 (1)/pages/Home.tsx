
import React, { useState, useLayoutEffect } from 'react';
import Hero from '../components/Hero';
import WorkGrid from '../components/WorkGrid';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  
  // Restore scroll position logic
  useLayoutEffect(() => {
    const savedScrollPos = sessionStorage.getItem('home_scroll_pos');
    
    if (savedScrollPos && window.lenis) {
      // 1. Force instant scroll to saved position (bypass smooth animation)
      window.lenis.scrollTo(parseFloat(savedScrollPos), { immediate: true, force: true });
      
      // 2. Clear storage immediately so that a hard refresh or Logo click starts at top
      sessionStorage.removeItem('home_scroll_pos');
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }} // Added exit prop to ensure smooth unmount before next page loads
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#0A0A0A]"
    >
      <Hero />
      
      <WorkGrid />
      
      {/* Footer / Contact Section */}
      <footer id="contact" className="px-6 md:px-24 pt-24 pb-24 md:pb-32 bg-[#050505] border-t border-fine flex flex-col justify-between min-h-screen md:min-h-[80vh]">
        <div className="max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 flex-grow content-between">
          
          {/* Left Column: Brand Core & Action (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full w-full">
             <div className="mt-0"> 
                <motion.h4 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-display leading-[0.85] text-white"
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
                >
                  LET'S BUILD<br/>VISION
                </motion.h4>
             </div>
             
             {/* Showreel Button - RESIZED by 1/3 */}
             <div className="mb-12 lg:mb-0">
               <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative flex items-center justify-center outline-none group/btn rounded-full cursor-pointer w-[188px] h-[64px]"
              >
                 {/* 1. Fluid Background & Glass Effect & Glow */}
                 <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-white/30 overflow-hidden transition-all duration-500 group-hover/btn:bg-white/10 group-hover/btn:border-[#30C5A3]/60 group-hover/btn:shadow-[0_0_25px_rgba(48,197,163,0.3),inset_0_0_10px_rgba(48,197,163,0.1)]">
                    {/* Simulated Fluid Internal Glow */}
                    <motion.div 
                        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 blur-2xl transition-all duration-500 group-hover/btn:opacity-60"
                        style={{
                           background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.2) 180deg, transparent 360deg)'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    />
                    {/* Green Glow Layer on Hover */}
                     <motion.div 
                        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-0 blur-2xl transition-all duration-500 group-hover/btn:opacity-50"
                        style={{
                           background: 'conic-gradient(from 0deg, transparent 0deg, rgba(48,197,163,0.6) 180deg, transparent 360deg)'
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    />
                 </div>

                 {/* 2. Content Layer - Always Visible */}
                 <div className="relative z-20 flex items-center justify-center w-full h-full space-x-3">
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse group-hover/btn:bg-[#30C5A3] transition-colors" />
                     <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium whitespace-nowrap group-hover/btn:text-[#30C5A3] transition-colors">
                         View Showreel
                     </span>
                     <span className="text-white text-[10px] opacity-70 group-hover/btn:text-[#30C5A3] group-hover/btn:translate-x-1 transition-all">→</span>
                 </div>
                 
                 {/* Lens Distortion Ring */}
                 <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none transition-all duration-500 group-hover/btn:border-[#30C5A3]/30 group-hover/btn:scale-105" />

              </motion.button>
             </div>
          </div>

          {/* Right Section: Visual Block Counterbalance */}
          <div className="lg:col-span-7 flex flex-col h-full">
             <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-8 md:p-14 rounded w-full relative overflow-hidden h-full flex flex-col justify-between">
                {/* Decorative Technical Corner Marks */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 rounded-tr"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 rounded-bl"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br"></div>
                
                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                   {/* Contact Block */}
                   <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="flex items-center justify-center">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30C5A3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30C5A3]"></span>
                          </span>
                        </div>
                        <span className="text-label !text-[11px] !md:text-[13px] text-[#888888] font-medium tracking-[0.25em]">CONTACT</span>
                      </div>
                      <a href="mailto:hello@sparrowvisuals.art" className="text-lg md:text-xl text-[#DEDEDE] font-light hover:text-gray-400 transition-colors block leading-tight">
                         hello@sparrowvisuals.art
                      </a>
                   </div>

                   {/* Follow Block */}
                   <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="flex items-center justify-center">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30C5A3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30C5A3]"></span>
                          </span>
                        </div>
                        <span className="text-label !text-[11px] !md:text-[13px] text-[#888888] font-medium tracking-[0.25em]">FOLLOW</span>
                      </div>
                      <div className="flex flex-col space-y-3">
                         {['Instagram', 'Vimeo', 'Behance'].map(social => (
                            <a 
                              key={social} 
                              href="#" 
                              className="group flex items-center space-x-3 text-lg md:text-xl text-[#DEDEDE] font-light hover:text-gray-400 transition-all duration-300 w-fit"
                            >
                              <div className="w-1.5 h-1.5 border border-white/40 rotate-45 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:rotate-90"></div>
                              <span className="group-hover:translate-x-1 transition-transform duration-300">{social}</span>
                            </a>
                         ))}
                      </div>
                   </div>
                </div>

                {/* THE HORIZONTAL ANCHOR */}
                <div className="w-full h-px bg-white/10 my-12 relative">
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between">
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                   </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                   {/* Phone Block */}
                   <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="flex items-center justify-center">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30C5A3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30C5A3]"></span>
                          </span>
                        </div>
                        <span className="text-label !text-[11px] !md:text-[13px] text-[#888888] font-medium tracking-[0.25em]">PHONE</span>
                      </div>
                      <span className="text-lg md:text-xl text-[#DEDEDE] font-light block leading-tight">
                         +86 15001031266
                      </span>
                   </div>

                   {/* Studio Block */}
                   <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="flex items-center justify-center">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30C5A3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30C5A3]"></span>
                          </span>
                        </div>
                        <span className="text-label !text-[11px] !md:text-[13px] text-[#888888] font-medium tracking-[0.25em]">STUDIO</span>
                      </div>
                      <span className="text-lg md:text-xl text-[#DEDEDE] font-light block leading-tight">Beijing, China</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1800px] w-full mx-auto border-t border-fine pt-8 flex justify-between items-center mt-24">
           <span className="text-[10px] tracking-widest uppercase text-white/20">©2025 Sparrow Visuals</span>
           
           <motion.div 
             className="group flex items-center justify-center cursor-pointer" 
             onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
             initial="initial"
             whileHover="hover"
           >
             <motion.div 
                className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden bg-[#050505]"
                animate={{
                    boxShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 15px rgba(255,255,255,0.2)",
                        "0 0 0px rgba(255,255,255,0)"
                    ],
                    borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.2)"],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 25px rgba(255,255,255,0.4)",
                    borderColor: "rgba(255,255,255,0.8)",
                    transition: { duration: 0.3 }
                }}
             >
                <motion.div
                   className="relative w-full h-full"
                   variants={{
                      initial: { y: 0 },
                      hover: { y: "-100%" }
                   }}
                   transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                           <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                    </div>
                    <div className="absolute top-full left-0 w-full h-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                           <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                    </div>
                </motion.div>
             </motion.div>
           </motion.div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
