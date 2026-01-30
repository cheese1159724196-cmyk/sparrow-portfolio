
import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PROJECTS, GITHUB_IMAGE_BASE, getUnsplashUrl } from '../constants';
import ProgressiveImage from '../components/ProgressiveImage';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Parallax Logic for Hero Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax movement: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Fade out content as user scrolls down
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Next Project Logic
  const currentIndex = PROJECTS.findIndex(p => p.id === id);
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextIndex];

  // --- GALLERY LOGIC ---
  const PROJECT_1_VIDEOS = [
    'https://res.cloudinary.com/dfsa4xnkh/video/upload/v1766727680/030_qdnxqn.mp4',
    'https://res.cloudinary.com/dfsa4xnkh/video/upload/v1766727680/027_ez4d1p.mp4',
    'https://res.cloudinary.com/dfsa4xnkh/video/upload/v1766727679/020_dpom2v.mp4'
  ];

  // Generate mixed media items
  const galleryItems = Array.from({ length: 8 }).map((_, i) => {
    const defaultImg = `${GITHUB_IMAGE_BASE}/project${(i % 9) + 1}.png`;

    // Special case for Project 01: Inject specific Cloudinary videos
    if (id === '01') {
      if (i === 1) return { type: 'video', src: PROJECT_1_VIDEOS[0] }; // Vertical
      if (i === 3) return { type: 'video', src: PROJECT_1_VIDEOS[2] }; // Box
      if (i === 5) return { type: 'video', src: PROJECT_1_VIDEOS[1] }; // Wide
      return { type: 'image', src: defaultImg };
    }

    // Default behavior for other projects: Use preview video for indices 1 & 5
    if (i === 1 || i === 5) {
      return { type: 'video', src: project?.videoPreview || '' };
    }
    
    return { type: 'image', src: defaultImg };
  });

  // Bento Grid Spans Pattern
  const getBentoClass = (i: number) => {
     const patterns = [
       'md:col-span-8 md:row-span-2', // 0: Hero (Top Left)
       'md:col-span-4 md:row-span-2', // 1: Vertical (Top Right) - Video
       'md:col-span-4 md:row-span-1', // 2: Box
       'md:col-span-4 md:row-span-1', // 3: Box
       'md:col-span-4 md:row-span-1', // 4: Box
       'md:col-span-6 md:row-span-2', // 5: Wide - Video
       'md:col-span-6 md:row-span-2', // 6: Wide
       'md:col-span-12 md:row-span-1', // 7: Footer Strip
     ];
     return patterns[i] || 'md:col-span-4';
  };

  // Decorative overlays for the "System" look
  const OVERLAYS = [
    { label: "HERO_RENDER", sub: "Final Pass" },
    { label: "SIMULATION", sub: "Physics Loop" }, // Video
    { label: "WIREFRAME", sub: "Geo Node" },
    { label: "TEXTURE", sub: "4K Map" }, // Video (if id=01, i=3)
    { label: "LIGHTING", sub: "Lumen" },
    { label: "COMPOSITE", sub: "Layer 04" }, // Video
    { label: "ASSET_LIB", sub: "Ref" },
    { label: "TIMELINE", sub: "Sequence" },
  ];

  if (!project) return <div className="h-screen w-full flex items-center justify-center text-label">Project not found</div>;

  const heroPlaceholder = getUnsplashUrl(project.coverImage, 50, 20, 50);
  const heroHighRes = getUnsplashUrl(project.coverImage, 2400, 95, 0);
  
  const nextProjectPlaceholder = getUnsplashUrl(nextProject.coverImage, 50, 20, 50);
  const nextProjectHighRes = getUnsplashUrl(nextProject.coverImage, 2000, 90, 0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A0A0A] min-h-screen"
    >
      {/* Immersive Static Header with Parallax & Progressive Loading */}
      <section ref={containerRef} className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black">
        {/* Back Button */}
        <div className="absolute top-8 left-6 md:left-12 z-50">
          <Link 
            to="/" 
            className="group flex items-center space-x-3 text-label text-white hover:text-white transition-all py-3 px-6 bg-black/30 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black"
          >
            <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[11px] tracking-[0.2em] font-medium">BACK</span>
          </Link>
        </div>

        {/* Parallax Image Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Placeholder Background */}
          <div 
            className="absolute inset-0 w-full h-[120%] -mt-[5%] bg-cover bg-center filter blur-xl scale-105"
            style={{ 
              backgroundImage: `url(${heroPlaceholder})`,
            }}
          />
          
          {/* Hero Image */}
          <motion.img 
            layoutId={`hero-image-${id}`}
            src={heroHighRes}
            alt={project.title}
            className="absolute inset-0 w-full h-[120%] -mt-[5%] object-cover"
            style={{ y }} 
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/40 z-20" />
        
        {/* Hero Content */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-0 left-0 w-full p-6 md:p-24 z-30 flex flex-col justify-end"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <div className="max-w-[1000px]">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex items-center space-x-4 mb-4 md:mb-6"
              >
                <span className="text-label text-white/60 bg-white/10 px-3 py-1 rounded backdrop-blur-sm">{project.category}</span>
                <span className="text-label text-white/40">{project.year}</span>
              </motion.div>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-display text-white mb-4 md:mb-8 leading-[0.85] whitespace-pre-wrap"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)', letterSpacing: '-0.03em' }}
              >
                {project.title}
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content Sections */}
      <section className="relative z-30 bg-[#0A0A0A] pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
          
          {/* 1. Narrative & Credits */}
          <div className="px-0 md:px-12 mb-24 md:mb-40 max-w-[1600px] mx-auto">
            <div className="flex flex-col xl:flex-row xl:justify-between items-start">
             
             {/* Left Column: Narrative */}
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full xl:max-w-[45%] mb-16 xl:mb-0"
             >
                <span className="text-label opacity-40 block mb-6 md:mb-12">01 / Narrative</span>
                
                {project.tagline && (
                  <h3 className="text-h2 text-[20px] md:text-[32px] leading-tight mb-6 md:mb-8 text-white">
                    {project.tagline}
                  </h3>
                )}
                
                <p className="text-body text-white/80 text-[16px] md:text-[22px] font-light leading-[1.6]">
                  {project.description}
                </p>
             </motion.div>

             {/* Right Column: Credits */}
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full xl:w-auto xl:min-w-[400px] xl:pl-[120px]" 
             >
                {/* Client Name */}
                {project.client && (
                  <div className="border-t border-white/10 pt-8 mb-8">
                     <h3 className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">Client</h3>
                     <span className="text-[14px] md:text-[16px] font-medium text-white tracking-[0.1em] uppercase block leading-relaxed">{project.client}</span>
                  </div>
                )}
                
                {/* Services/Tags */}
                <div className="border-t border-white/10 pt-8 mb-8">
                   <h3 className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-5">Services</h3>
                   <div className="flex flex-wrap gap-3">
                     {project.category.split(' / ').map(tag => (
                       <span key={tag} className="border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-medium text-white/80 tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors cursor-default">{tag}</span>
                     ))}
                   </div>
                </div>
                
                {/* Credits */}
                <div className="border-t border-white/10 pt-8">
                   <h3 className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-6">Credits</h3>
                   <div className="flex flex-col space-y-5">
                      {project.credits.map((credit, i) => (
                        <div key={i} className="group flex justify-between items-end border-b border-white/5 pb-2 hover:border-white/20 transition-colors">
                          <span className="font-mono text-[10px] text-white/40 tracking-[0.1em] uppercase group-hover:text-white/60 transition-colors">{credit.role}</span>
                          <span className="text-[12px] md:text-[13px] font-medium text-white/90 tracking-[0.15em] uppercase group-hover:text-white transition-colors">{credit.name}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
            </div>
          </div>

          {/* 2. Media Content */}
          <div className="space-y-16 md:space-y-32">
             
             {/* Main Film */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#050505] overflow-hidden border border-white/10 relative group shadow-2xl"
             >
                <div className="relative w-full h-full bg-black overflow-hidden">
                  <video 
                    ref={videoRef}
                    src={project.fullVideo} 
                    poster={heroHighRes} 
                    className="w-full h-full object-cover" 
                    controls={!isPlaying}
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[4px] group-hover:bg-black/30 transition-all duration-500 z-10 pointer-events-none"
                      >
                         {/* Play Button UI (Same as before) */}
                         <div className="relative flex items-center justify-center">
                           <motion.div 
                              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute w-24 h-24 md:w-48 md:h-48 rounded-full border border-white/30"
                           />
                           <motion.div 
                             onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                             whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                             whileTap={{ scale: 0.9 }}
                             className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 pointer-events-auto cursor-pointer"
                           >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1 md:w-8 md:h-8"><path d="M8 5v14l11-7z" /></svg>
                           </motion.div>
                           <div className="absolute w-full h-full pointer-events-none">
                              <span className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 text-label text-[8px] md:text-[10px] tracking-[0.4em] opacity-40 whitespace-nowrap uppercase">WATCH FILM</span>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             </motion.div>
             
             {/* BENTO GRID PROCESS GALLERY */}
             <div className="pt-8 md:pt-16">
               <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-[1px] bg-[#30C5A3]"></div>
                    <span className="text-label text-white">VISUAL_LOG</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#30C5A3] animate-pulse">● LIVE SYNC</span>
               </div>
               
               {/* Grid Container: Tight Gaps for Bento Feel */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-1 auto-rows-fr">
                 {galleryItems.map((item, index) => {
                   const spanClass = getBentoClass(index);
                   
                   return (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-10%" }}
                       transition={{ duration: 0.5, delay: index * 0.05 }}
                       className={`relative group overflow-hidden bg-[#0D0D0D] border border-white/5 hover:border-white/20 transition-colors duration-500 ${spanClass} min-h-[200px] md:min-h-[280px]`}
                     >
                       {/* Media Layer */}
                       <div className="absolute inset-0 w-full h-full">
                           {item.type === 'video' ? (
                              <video 
                                src={item.src} 
                                autoPlay muted loop playsInline 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-lighten" 
                              />
                           ) : (
                              <ProgressiveImage
                                src={item.src}
                                alt={`Gallery ${index}`}
                                className="w-full h-full"
                                imageClassName="opacity-100 transition-all duration-700 group-hover:scale-105"
                              />
                           )}
                           
                           {/* Dark Gradient Overlay for Text Readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />
                           
                           {/* Noise Overlay */}
                           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
                       </div>

                       {/* Data/UI Overlay Layer */}
                       <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                          
                          {/* Top Bar: ID & Status */}
                          <div className="flex justify-between items-start">
                             <div className="flex flex-col items-start">
                               <span className="text-[9px] font-mono text-white/50 bg-black/40 backdrop-blur px-1 border border-white/10 mb-1">
                                 CAM_0{index + 1}
                               </span>
                               <span className="text-[2rem] font-black text-white/10 leading-none group-hover:text-white/30 transition-colors">
                                 0{index + 1}
                               </span>
                             </div>
                             
                             {/* Corner Bracket */}
                             <div className="w-2 h-2 border-t border-r border-white/40"></div>
                          </div>

                          {/* Center: Bold Title (Visible on Hover) */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center overflow-hidden">
                             <motion.div 
                               initial={{ y: 20, opacity: 0 }}
                               whileInView={{ y: 0, opacity: 1 }} // Needs 'hover' variant on parent or layout logic
                               className="hidden md:block group-hover:block" // Force block on hover
                             >
                                <span className="block text-[1.5rem] md:text-[2.5rem] font-black uppercase text-white leading-none mix-blend-overlay">
                                   {OVERLAYS[index]?.label}
                                </span>
                             </motion.div>
                          </div>

                          {/* Bottom Bar: Metadata */}
                          <div className="flex justify-between items-end">
                             <div>
                                <span className="block text-[8px] font-mono text-[#30C5A3] uppercase tracking-widest mb-1">
                                   {OVERLAYS[index]?.sub}
                                </span>
                                <div className="h-[2px] w-12 bg-white/20 overflow-hidden">
                                   <div className={`h-full bg-white/60 w-1/2 ${item.type === 'video' ? 'animate-[pulse_1s_infinite]' : 'animate-[pulse_2s_infinite]'}`}></div>
                                </div>
                             </div>
                             
                             {/* Corner Bracket */}
                             <div className="w-2 h-2 border-b border-l border-white/40"></div>
                          </div>
                       </div>
                     </motion.div>
                   );
                 })}
               </div>
             </div>

          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <footer className="bg-black py-24 md:py-48 border-t border-fine relative overflow-hidden group">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 scale-110 group-hover:scale-100">
           <ProgressiveImage 
              src={nextProjectHighRes} 
              placeholderSrc={nextProjectPlaceholder}
              className="w-full h-full"
              imageClassName="w-full h-full object-cover blur-3xl"
           />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <Link to={`/project/${nextProject.id}`} className="inline-block" onClick={() => window.scrollTo(0,0)}>
            <span className="text-label block mb-6 md:mb-8 text-white/50">Next Project</span>
            <h2 
              className="text-display text-white mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
              style={{ fontSize: 'clamp(2.5rem, 12vw, 10rem)' }}
            >
              {nextProject.title}
            </h2>
            <div className="mt-12 md:mt-16 inline-flex items-center space-x-3 text-white/50 border-b border-white/20 pb-2 group-hover:text-white group-hover:border-white transition-colors">
              <span className="text-[12px] uppercase tracking-widest">View Case</span>
              <span className="text-xl">→</span>
            </div>
          </Link>
        </div>
      </footer>
    </motion.div>
  );
};

export default ProjectDetail;
