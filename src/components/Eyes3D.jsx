import React, { useEffect, useRef, useState } from 'react';
import { calculatePupilPosition } from '../utils/eyeTracking';

/**
 * Eyes3D Component
 * Interactive 3D eyes with CSS perspective transforms, smooth pupil cursor tracking,
 * full eyelid close animation on password focus, periodic blinking, eyelashes, wet gloss highlight,
 * and reactive wide-open (success) / anxious jitter (error) states.
 */
const Eyes3D = ({ isPasswordFocused = false, isSuccess = false, isError = false, mousePos = { x: 0, y: 0 } }) => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const [pupilLeft, setPupilLeft] = useState({ x: 0, y: 0 });
  const [pupilRight, setPupilRight] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Mouse cursor pupil tracking (smooth RAF updates)
  useEffect(() => {
    if (isPasswordFocused || isSuccess) {
      // Center pupils when password field is focused or when eyes are popping open on success
      setPupilLeft({ x: 0, y: 0 });
      setPupilRight({ x: 0, y: 0 });
      return;
    }

    let animationFrameId;

    const updatePupils = () => {
      if (leftEyeRef.current && rightEyeRef.current) {
        const leftPos = calculatePupilPosition(mousePos.x, mousePos.y, leftEyeRef.current, 13);
        const rightPos = calculatePupilPosition(mousePos.x, mousePos.y, rightEyeRef.current, 13);

        setPupilLeft(leftPos);
        setPupilRight(rightPos);
      }
      animationFrameId = requestAnimationFrame(updatePupils);
    };

    updatePupils();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, isPasswordFocused, isSuccess]);

  // Periodic subtle blink while eyes are open or closed
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 240);
    }, 3500);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative flex justify-center items-center mb-3 sm:mb-4 py-1 select-none z-20">
      {/* 3D Perspective Container */}
      <div
        className="flex items-center gap-8 sm:gap-10 filter drop-shadow-[0_12px_24px_rgba(102,126,234,0.35)]"
        style={{ perspective: '1000px' }}
      >
        {/* Ambient shadow beneath eyes for 3D depth */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-5 bg-black/40 blur-md rounded-full pointer-events-none" />

        {/* --- LEFT EYE --- */}
        <div
          ref={leftEyeRef}
          className={`relative w-[52px] h-[72px] sm:w-[60px] sm:h-[80px] bg-gradient-to-b from-white via-[#f0f4ff] to-[#dbe4ff] rounded-[50%] overflow-hidden border border-white/60 shadow-[inset_0_4px_10px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 ${
            isSuccess ? 'scale-115 animate-bounce' : isError ? 'animate-shake' : 'hover:scale-105'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(8deg) rotateY(-4deg)',
          }}
        >
          {/* Eyeball Inner Depth Ring */}
          <div className="absolute inset-0 rounded-[50%] border-2 border-indigo-100/50 pointer-events-none" />

          {/* Pupil & Iris Group */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `translate3d(${pupilLeft.x}px, ${pupilLeft.y}px, 0px)`,
            }}
          >
            {/* Iris (Gradient from Light Blue to Dark Blue) */}
            <div className="relative w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] rounded-full bg-[radial-gradient(circle,#4db8ff_0%,#0066cc_70%,#002b66_100%)] flex items-center justify-center shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] border border-sky-300/40">
              {/* Dark Pupil Center */}
              <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full bg-[#090d16] shadow-inner flex items-center justify-center">
                {/* Tiny pupil highlight */}
                <div className="w-1 h-1 rounded-full bg-white opacity-80" />
              </div>

              {/* Eye Gloss / Reflection Highlight (Wet look) */}
              <div className="absolute top-1 left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/90 blur-[0.4px]" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/50 blur-[0.4px]" />
            </div>
          </div>

          {/* Sclera Top Reflection */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

          {/* --- EYELID (Smooth Slide Down on Password Focus / Blink) --- */}
          <div
            className={`absolute inset-x-0 top-0 bg-gradient-to-b from-[#2d344a] via-[#38415c] to-[#252b3d] border-b-2 border-indigo-300/40 transition-all duration-500 cubic-bezier(0.25,1,0.5,1) pointer-events-none flex flex-col justify-end items-center ${
              isPasswordFocused ? 'h-full' : isBlinking ? 'h-full duration-150' : 'h-0'
            }`}
          >
            {/* Eyelid Wrinkle Crease */}
            <div className="w-4/5 h-[1.5px] bg-white/20 mb-2 rounded-full" />
            {/* Top Eyelash Details */}
            <div className="w-full flex justify-around px-1.5 pb-0.5">
              <span className="w-1 h-2 bg-indigo-200/90 rounded-full transform -rotate-12" />
              <span className="w-1 h-2.5 bg-indigo-200/90 rounded-full transform -rotate-6" />
              <span className="w-1 h-2.5 bg-indigo-200/90 rounded-full transform rotate-6" />
              <span className="w-1 h-2 bg-indigo-200/90 rounded-full transform rotate-12" />
            </div>
          </div>

          {/* Bottom Eyelid Detail */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-900/30 border-t border-indigo-400/20 pointer-events-none" />
        </div>

        {/* --- RIGHT EYE --- */}
        <div
          ref={rightEyeRef}
          className={`relative w-[52px] h-[72px] sm:w-[60px] sm:h-[80px] bg-gradient-to-b from-white via-[#f0f4ff] to-[#dbe4ff] rounded-[50%] overflow-hidden border border-white/60 shadow-[inset_0_4px_10px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 ${
            isSuccess ? 'scale-115 animate-bounce' : isError ? 'animate-shake' : 'hover:scale-105'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(8deg) rotateY(4deg)',
          }}
        >
          {/* Eyeball Inner Depth Ring */}
          <div className="absolute inset-0 rounded-[50%] border-2 border-indigo-100/50 pointer-events-none" />

          {/* Pupil & Iris Group */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `translate3d(${pupilRight.x}px, ${pupilRight.y}px, 0px)`,
            }}
          >
            {/* Iris */}
            <div className="relative w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] rounded-full bg-[radial-gradient(circle,#4db8ff_0%,#0066cc_70%,#002b66_100%)] flex items-center justify-center shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] border border-sky-300/40">
              {/* Pupil */}
              <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full bg-[#090d16] shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white opacity-80" />
              </div>

              {/* Gloss Highlight */}
              <div className="absolute top-1 left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/90 blur-[0.4px]" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/50 blur-[0.4px]" />
            </div>
          </div>

          {/* Sclera Top Reflection */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

          {/* --- EYELID (Smooth Slide Down on Password Focus / Blink) --- */}
          <div
            className={`absolute inset-x-0 top-0 bg-gradient-to-b from-[#2d344a] via-[#38415c] to-[#252b3d] border-b-2 border-indigo-300/40 transition-all duration-500 cubic-bezier(0.25,1,0.5,1) pointer-events-none flex flex-col justify-end items-center ${
              isPasswordFocused ? 'h-full' : isBlinking ? 'h-full duration-150' : 'h-0'
            }`}
          >
            {/* Eyelid Wrinkle Crease */}
            <div className="w-4/5 h-[1.5px] bg-white/20 mb-2 rounded-full" />
            {/* Top Eyelash Details */}
            <div className="w-full flex justify-around px-1.5 pb-0.5">
              <span className="w-1 h-2 bg-indigo-200/90 rounded-full transform -rotate-12" />
              <span className="w-1 h-2.5 bg-indigo-200/90 rounded-full transform -rotate-6" />
              <span className="w-1 h-2.5 bg-indigo-200/90 rounded-full transform rotate-6" />
              <span className="w-1 h-2 bg-indigo-200/90 rounded-full transform rotate-12" />
            </div>
          </div>

          {/* Bottom Eyelid Detail */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-900/30 border-t border-indigo-400/20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Eyes3D);
