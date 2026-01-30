
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GLOBAL_ASSETS } from '../constants';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[115vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale, borderRadius }}
          className="relative w-full h-full overflow-hidden bg-[#050505] border-fine mx-0 group"
        >
          {/* Hero Video Background */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              poster={GLOBAL_ASSETS.HERO_POSTER}
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            >
              <source src={GLOBAL_ASSETS.HERO_VIDEO} type="video/mp4" />
            </video>
            
            {/* Dynamic Black Overlay for Readability */}
            {/* UPDATED: Changed transition-opacity to transition-colors and set duration to 0.8s (800ms) for smoother breathing effect */}
            <div className="absolute inset-0 bg-black/60 z-[1] transition-colors duration-[800ms] ease-out group-hover:bg-black/40" />
          </div>

          {/* Main Title Content */}
          <motion.div 
            style={{ opacity }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none px-4"
          >
            <div className="flex flex-col items-center">
              
              {/* TYPOGRAPHY REDESIGN */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center mb-12"
              >
                {/* 1. SPARROW: Low Stance, Heavy, Wide */}
                <h1 
                  className="text-white uppercase leading-[0.8] text-center mix-blend-overlay opacity-90"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900, // Black weight
                    fontSize: 'clamp(3.5rem, 14vw, 13rem)',
                    letterSpacing: '-0.02em', // Slightly tight for solidity
                    transform: 'scaleX(1.1)', // Artificial expansion for "Porsche Chassis" look
                  }}
                >
                  SPARROW
                </h1>

                {/* 2. VISUALS: Thin, Airy, Expanded */}
                <span 
                  className="text-white/70 uppercase block mt-4 md:mt-6 pl-[0.5em]" // pl to visually center with letter spacing
                  style={{ 
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 200, // ExtraLight/Thin
                    fontSize: 'clamp(10px, 1.2vw, 14px)', // Small size
                    letterSpacing: '0.8em', // Extreme spacing
                  }}
                >
                  VISUALS
                </span>
              </motion.div>

              {/* Morphing Showreel Button (Pill -> Circle on Hover) - RESIZED by 1/3 */}
              <motion.button
                initial={{ width: 188, height: 64, opacity: 0 }}
                animate={{ 
                  width: isHovered ? 106 : 188, 
                  height: isHovered ? 106 : 64,
                  opacity: 1
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="pointer-events-auto relative flex items-center justify-center outline-none group/btn rounded-full cursor-pointer overflow-hidden"
              >
                 {/* 1. Fluid Background & Glass Effect & Glow */}
                 <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-white/30 overflow-hidden transition-all duration-500 group-hover/btn:bg-white/10 group-hover/btn:border-[#30C5A3]/60 group-hover/btn:shadow-[0_0_25px_rgba(48,197,163,0.3),inset_0_0_10px_rgba(48,197,163,0.1)]">
                    {/* Simulated Fluid Internal Glow */}
                    <motion.div 
                        animate={{ 
                          rotate: 360, 
                          scale: isHovered ? [1, 1.2, 1] : 1
                        }}
                        transition={{ 
                          rotate: { duration: isHovered ? 3 : 10, ease: "linear", repeat: Infinity },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 blur-2xl transition-all duration-500"
                        style={{
                           background: isHovered 
                            ? 'conic-gradient(from 0deg, transparent 0deg, rgba(48,197,163,0.6) 180deg, transparent 360deg)'
                            : 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.2) 180deg, transparent 360deg)'
                        }}
                    />
                 </div>

                 {/* 2. Content Layer - Centered */}
                 <div className="relative z-20 flex items-center justify-center w-full h-full">
                    
                    {/* State A: Text Only (Visible in Pill) */}
                    <motion.div
                        animate={{ 
                            opacity: isHovered ? 0 : 1,
                            scale: isHovered ? 0.8 : 1,
                            display: isHovered ? "none" : "flex"
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute flex items-center space-x-3"
                    >
                         <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                         <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium whitespace-nowrap">
                             View Showreel
                         </span>
                         <span className="text-white text-[10px] opacity-70">→</span>
                    </motion.div>

                    {/* State B: Icon Only (Visible in Circle) */}
                    <motion.div
                        animate={{ 
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.5
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute flex items-center justify-center"
                    >
                        {/* Breathing Play Icon */}
                         <motion.div
                            animate={{ scale: isHovered ? 1.2 : 1 }}
                            transition={{ duration: 0.4 }}
                            className="w-6 h-6 flex items-center justify-center text-[#30C5A3]"
                        >
                             <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_12px_rgba(48,197,163,0.8)]">
                                <path d="M8 5v14l11-7z" />
                             </svg>
                        </motion.div>
                    </motion.div>

                 </div>
                 
                 {/* Lens Distortion Ring */}
                 <motion.div 
                    animate={{ scale: isHovered ? 1.4 : 1.1, opacity: isHovered ? 0 : 0.2 }}
                    className={`absolute inset-0 rounded-full border pointer-events-none transition-colors duration-500 ${isHovered ? 'border-[#30C5A3]/30' : 'border-white/40'}`}
                    transition={{ duration: 1 }}
                 />

              </motion.button>
            </div>
          </motion.div>

          {/* UI Corner Elements */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block z-20">
            <div className="flex flex-col space-y-20 opacity-20">
              <span className="text-label vertical-text -rotate-90">Studio ©2024</span>
              <span className="text-label vertical-text -rotate-90">London / SH</span>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
