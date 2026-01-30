
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollY } = useScroll();

  // 1. Scroll Interaction Logic (Internal)
  // These transforms control the visual state based on scroll position
  const navOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const navY = useTransform(scrollY, [0, 200], [0, -20]);
  const navPointerEvents = useTransform(scrollY, (y) => y > 150 ? 'none' : 'auto');

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    // If user explicitly clicks the Logo, they expect to go to the Top of Home.
    // So we clear any saved scroll position that might be lingering.
    sessionStorage.removeItem('home_scroll_pos');
  };

  // Determine if we should show the global navbar
  // We use this boolean to trigger the AnimatePresence exit animation instead of returning null immediately
  const isProjectPage = location.pathname.includes('/project/');

  return (
    <>
      <AnimatePresence>
        {!isProjectPage && (
          <>
            {/* --- STATE 1: FULL NAVBAR --- */}
            {/* Wrapper Div: Handles Entry/Exit Animation (Route Changes) */}
            <motion.div
              key="navbar-wrapper"
              className="fixed top-0 left-0 w-full z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "breathing" feel
              }}
            >
              {/* Inner Nav: Handles Scroll Interaction */}
              <motion.nav 
                style={{ opacity: navOpacity, y: navY, pointerEvents: navPointerEvents }}
                className="w-full flex justify-between items-center px-6 md:px-12 py-8 mix-blend-difference"
              >
                <Link 
                  to="/" 
                  onClick={handleLogoClick}
                  className="group flex items-center space-x-5"
                >
                  {/* Interactive Viewfinder Logo */}
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {/* Central Core */}
                    <motion.div 
                      className="w-1.5 h-1.5 bg-white rounded-full z-10"
                      variants={{
                        initial: { scale: 1 },
                        hover: { scale: 0.8, backgroundColor: "#8E8E8E" }
                      }}
                      initial="initial"
                      whileHover="hover"
                    />
                    
                    {/* Corner Marks - Viewfinder effect */}
                    {[
                      "top-0 left-0 border-t border-l",
                      "top-0 right-0 border-t border-r",
                      "bottom-0 left-0 border-b border-l",
                      "bottom-0 right-0 border-b border-r"
                    ].map((style, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 border-white opacity-0 ${style}`}
                        variants={{
                          initial: { opacity: 0, scale: 0.5, x: 0, y: 0 },
                          hover: { 
                            opacity: 1, 
                            scale: 1,
                            x: style.includes('left') ? -3 : 3,
                            y: style.includes('top') ? -3 : 3
                          }
                        }}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    ))}
                  </div>

                  <span className="text-[18px] tracking-[0.3em] font-medium transition-all duration-500 group-hover:tracking-[0.4em] text-white/60 group-hover:text-white" style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif' }}>
                    麻雀创意
                  </span>
                </Link>
                
                {/* Desktop Links */}
                <div className="hidden md:flex space-x-12 mr-24">
                  {['WORK', 'CONTACT'].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`} 
                      className="text-[18px] font-medium tracking-[0.3em] text-white/60 hover:text-white transition-colors font-sans uppercase"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.nav>
            </motion.div>

            {/* --- STATE 2: HAMBURGER MENU BUTTON --- */}
            {/* Also animated out when on project page to keep UI clean */}
            <motion.div
              key="menu-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-5 right-6 md:right-12 z-50 mix-blend-difference"
            >
               <button 
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className="relative w-12 h-12 flex items-center justify-center outline-none group cursor-pointer"
               >
                  {/* SIGNAL LIGHT: Dot - Appears on Hover */}
                  <motion.div 
                      initial={{ opacity: 0, scale: 0.5, x: 10 }}
                      animate={{ 
                          opacity: (isHovered && !isMenuOpen) ? 1 : 0,
                          scale: (isHovered && !isMenuOpen) ? 1 : 0.5,
                          x: (isHovered && !isMenuOpen) ? 0 : 5, 
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute right-[40px] w-1.5 h-1.5 rounded-full bg-[#30C5A3] shadow-[0_0_8px_rgba(48,197,163,0.8)]"
                  />

                  <div className="flex flex-col items-end justify-center space-y-[5px]">
                      {/* Top Line */}
                      <motion.div 
                         animate={isMenuOpen 
                           ? { rotate: 45, y: 7, width: "24px" } 
                           : { rotate: 0, y: 0, width: "24px" }
                         }
                         className="h-[1.5px] bg-white origin-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      
                      {/* Middle Line */}
                      <motion.div 
                         animate={isMenuOpen 
                           ? { opacity: 0, x: 10, width: "24px" } 
                           : { opacity: 1, x: 0, width: isHovered ? "24px" : "16px" }
                         }
                         className="h-[1.5px] bg-white origin-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />

                      {/* Bottom Line */}
                      <motion.div 
                         animate={isMenuOpen 
                           ? { rotate: -45, y: -7, width: "24px" } 
                           : { rotate: 0, y: 0, width: isHovered ? "24px" : "24px" }
                         }
                         className="h-[1.5px] bg-white origin-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                  </div>
               </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MENU OVERLAY (Always renderable, state controlled) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#30C5A3] flex flex-col items-center justify-center"
          >
             {/* Background Noise/Grain */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
             
             <div className="flex flex-col space-y-2 md:space-y-4 text-center relative z-10">
                {['WORK', 'ABOUT', 'PLAYGROUND', 'CAREERS', 'CONTACT'].map((item, i) => (
                   <motion.div
                     key={item}
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 20, opacity: 0 }}
                     transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                   >
                     <a 
                       href={`#${item.toLowerCase()}`}
                       onClick={() => setIsMenuOpen(false)}
                       className="text-display text-[3rem] md:text-[5rem] text-black hover:text-white transition-colors uppercase cursor-pointer block leading-none"
                     >
                        {item}
                     </a>
                   </motion.div>
                ))}
             </div>

             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="absolute bottom-12 text-label text-black/30 text-[10px]"
             >
                ©2025 Sparrow Visuals
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
