
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  src: string;
  placeholderSrc?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  onLoad?: () => void;
}

const ProgressiveImage: React.FC<Props> = ({ 
  src, 
  placeholderSrc, 
  alt = "", 
  className = "", 
  imageClassName = "",
  onLoad 
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start loading high-res image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
      if (onLoad) onLoad();
    };
  }, [src, onLoad]);

  return (
    <div className={`relative overflow-hidden bg-[#0D0D0D] ${className}`}>
      {/* Blurred Placeholder */}
      {placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover filter blur-xl scale-110 transition-opacity duration-700 ease-out ${imageClassName}`}
        />
      )}

      {/* Main Image - Crossfade In */}
      <motion.img
        src={src} // Ensure src is always passed to render correctly once loaded
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full h-full object-cover ${imageClassName}`}
      />
    </div>
  );
};

export default ProgressiveImage;
