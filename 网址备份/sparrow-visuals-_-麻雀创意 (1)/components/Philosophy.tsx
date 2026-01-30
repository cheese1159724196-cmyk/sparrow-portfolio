
import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section id="about" className="py-32 md:py-80 px-6 md:px-24 bg-black overflow-hidden border-t border-fine">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24">
        
        {/* Left Column: Vertical Label & Index */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            <div className="w-8 h-[1px] bg-white opacity-20"></div>
            <span className="text-label">01 / Our Philosophy</span>
          </motion.div>
          
          <div className="hidden md:block mt-32">
            <span className="text-display text-[8rem] opacity-[0.03] select-none" style={{ letterSpacing: '0.2em' }}>VISION</span>
          </div>
        </div>

        {/* Right Column: High Impact Typography */}
        <div className="md:col-start-6 md:col-span-7">
          <div className="reveal-wrapper mb-8 md:mb-16 overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-h1 leading-[0.95] tracking-tight text-white/90"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', letterSpacing: '0.05em' }}
            >
              Greatness <br/> starts small.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            <p className="text-body text-[14px] md:text-[16px]">
              We bridge the gap between imagination and reality. Every pixel is a calculated breath, every frame a deliberate heartbeat. We don't just create visuals; we architect digital experiences that resonate.
            </p>
            <p className="text-body italic text-[14px]">
              Specializing in high-end CGI, abstract motion design, and brand vision for the next generation of creative leaders.
            </p>
          </motion.div>
          
          {/* Capabilities Grid */}
          <div className="mt-16 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-fine">
            {['CGI', 'Motion', 'VFX', '3D Design'].map((skill, i) => (
              <motion.div 
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col"
              >
                <span className="text-label opacity-40 mb-2">0{i+1}</span>
                <span className="text-label text-white/80">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
