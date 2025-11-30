import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Only allow navigation if not zoomed to avoid conflict with scrolling
      if (!isZoomed) {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isZoomed]);

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col"
    >
      {/* Header / Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="text-white/80 font-mono text-sm pointer-events-auto bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
          {currentIndex + 1} / {images.length}
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
        >
          <X size={32} />
        </button>
      </div>

      {/* Main Image Area */}
      <div 
        className={`flex-1 flex items-center justify-center w-full h-full relative ${isZoomed ? 'overflow-auto cursor-zoom-out' : 'overflow-hidden cursor-zoom-in'}`}
        onClick={toggleZoom}
      >
        <img 
          src={images[currentIndex]} 
          alt={`View ${currentIndex + 1}`}
          className={`
            transition-all duration-300 ease-in-out select-none
            ${isZoomed 
              ? 'w-auto h-auto min-w-[150%] max-w-none m-auto' 
              : 'max-w-full max-h-full object-contain p-4'
            }
          `}
        />
        
        {/* Navigation Arrows (Only visible when NOT zoomed) */}
        {!isZoomed && images.length > 1 && (
          <>
            <button 
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-40 hidden md:flex items-center justify-center"
            >
              <ChevronLeft size={40} />
            </button>
            <button 
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-40 hidden md:flex items-center justify-center"
            >
              <ChevronRight size={40} />
            </button>
          </>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-slate-900/80 text-slate-200 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md flex items-center gap-3 border border-white/10 shadow-xl pointer-events-auto">
          {isZoomed ? (
            <>
              <ZoomOut size={18} />
              <span>Reduzir</span>
            </>
          ) : (
            <>
              <ZoomIn size={18} />
              <span>Ampliar Detalhes</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};