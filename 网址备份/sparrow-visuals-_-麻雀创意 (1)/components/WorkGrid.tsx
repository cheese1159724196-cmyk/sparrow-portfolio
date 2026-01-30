
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS, getUnsplashUrl } from '../constants';
import { Project } from '../types';

interface GridItemProps {
  project: Project;
  index: number;
}

// 1. Item Animation
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: 'blur(10px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// 2. Text Variants
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const GridItem: React.FC<GridItemProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const yShift = useTransform(scrollYProgress, [0, 1], [isEven ? 20 : 60, isEven ? -20 : -60]);

  // Generate placeholder URL
  const placeholderUrl = getUnsplashUrl(project.coverImage, 50, 20, 50);
  const highResUrl = getUnsplashUrl(project.coverImage, 1200, 90, 0);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.load();
    }
  }, [isHovered]);

  const handleProjectClick = () => {
    if (window.lenis) {
       sessionStorage.setItem('home_scroll_pos', window.lenis.animatedScroll.toString());
    } else {
       sessionStorage.setItem('home_scroll_pos', window.scrollY.toString());
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      style={{ y: yShift }}
      className={`relative mb-20 md:mb-56 ${
        isEven 
          ? 'w-full md:w-[85%] mr-auto' 
          : 'w-full md:w-[85%] ml-auto'
      }`}
    >
      <motion.div variants={itemVariants} className="w-full">
        <Link 
          to={`/project/${project.id}`}
          onClick={handleProjectClick}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setVideoLoaded(false);
          }}
          className="relative block group"
        >
          {/* Media Container */}
          <div 
            className="relative overflow-hidden bg-[#0D0D0D] border-fine border-white/5 group-hover:border-white/10 transition-colors duration-1000"
          >
            <div className="aspect-[16/9] w-full relative overflow-hidden">
              
              {/* Layers: Placeholder -> Image -> Video */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
                <img 
                  src={placeholderUrl} 
                  alt="" 
                  className="w-full h-full object-cover filter blur-xl scale-110"
                />
              </div>

              <motion.img 
                src={highResUrl} 
                alt={project.title}
                onLoad={() => setImgLoaded(true)}
                animate={{ 
                  scale: isHovered ? 1.05 : 1,
                  opacity: (isHovered && videoLoaded) ? 0 : (imgLoaded ? 1 : 0)
                }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
              
              <AnimatePresence>
                {isHovered && (
                  <motion.video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={() => setVideoLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: videoLoaded ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover z-20"
                  >
                    <source src={project.videoPreview} type="video/mp4" />
                  </motion.video>
                )}
              </AnimatePresence>

              {/* Aesthetic Grain */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none z-30" />
            </div>
          </div>
          
          {/* Detail Bar - Typography System Applied */}
          <div className="mt-6 border-t border-fine pt-6 flex justify-between items-start opacity-80 group-hover:opacity-100 transition-opacity duration-500">
             {/* Left: Metadata & Title */}
             <div className="flex flex-col">
                <div className="flex items-center space-x-3 mb-3">
                   <span className="text-label text-white/50">WORK</span>
                   <span className="w-8 h-[1px] bg-white/20"></span>
                   <span className="text-label text-white/30">{project.year}</span>
                </div>
                {/* Heading: Archivo, Bold */}
                <h3 className="text-h2 text-xl md:text-3xl text-white uppercase whitespace-pre-wrap">{project.title.split('\n')[0]}</h3>
             </div>
             
             {/* Right: Description & Tags */}
             <div className="hidden md:block text-right max-w-[350px]">
                {/* Body: Inter, High Leading, Small */}
                <p className="text-body text-white/60 mb-4">
                  {project.tagline || project.description.slice(0, 100) + '...'}
                </p>
                {/* Metadata: Mono */}
                <div className="text-label text-white/30">
                  {project.category}
                </div>
             </div>
             
             {/* Mobile Only Category */}
             <div className="md:hidden text-right">
               <span className="text-label text-white/40">{project.category}</span>
             </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const WorkGrid: React.FC = () => {
  return (
    <section id="work" className="px-6 md:px-24 pt-20 pb-32 md:pt-32 md:pb-48 bg-[#0A0A0A]">
      <div className="max-w-[1920px] mx-auto">
        {/* Header Section */}
        <motion.div 
          className="mb-20 md:mb-36 flex flex-col items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
             visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <div className="w-full">
            {/* Removed Small Label Here */}
            
            <motion.h2 variants={textVariants} className="text-display text-[2.5rem] md:text-[4rem] leading-none text-white/90">
              Selected Works
            </motion.h2>

            <motion.div variants={textVariants} className="mt-8 max-w-3xl">
               <span className="text-body text-lg md:text-2xl text-white/60 block leading-relaxed font-light">
                 A CURATED COLLECTION OF VISUAL EXPERIMENTS, COMMERCIAL PROJECTS, AND DIGITAL ART.
               </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Project List */}
        <motion.div 
          className="relative flex flex-col"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }} 
        >
          {PROJECTS.map((project, index) => (
            <GridItem 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkGrid;
