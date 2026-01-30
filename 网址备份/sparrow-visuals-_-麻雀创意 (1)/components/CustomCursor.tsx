
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { CursorType, CursorState } from '../types';

interface Props {
  state: CursorState;
}

const CustomCursor: React.FC<Props> = ({ state }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  const variants = {
    [CursorType.DEFAULT]: { width: 8, height: 8, backgroundColor: "#F5F5F3" },
    [CursorType.PLAY]: { 
      width: 80, 
      height: 80, 
      backgroundColor: "rgba(245, 245, 243, 0.9)",
      mixBlendMode: 'normal' as const
    },
    [CursorType.VIEW]: { 
      width: 12, 
      height: 12, 
      backgroundColor: "#F5F5F3",
    }
  };

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center overflow-visible"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={variants[state.type]}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        {state.type === CursorType.PLAY && (
          <span className="text-black font-mono text-[8px] font-bold tracking-widest uppercase">Play Reel</span>
        )}
        
        <AnimatePresence>
          {state.type === CursorType.VIEW && state.label && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 25 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute left-0 flex flex-col whitespace-nowrap"
            >
              <span className="text-h2 uppercase text-[24px] tracking-tight leading-none mb-1">{state.label}</span>
              {state.category && (
                <span className="text-label opacity-40 text-[10px]">{state.category}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
