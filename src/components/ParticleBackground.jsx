import React, { useMemo } from 'react';

/**
 * ParticleBackground Component
 * Renders 25-30 floating particles with random opacity (0.2-0.8),
 * sine wave movement, mixed white and light-blue colors, and background bokeh circles.
 */
const ParticleBackground = () => {
  // Generate 26 floating particles with varied sizes, positions, and sine-wave trajectories
  const particles = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => {
      const left = ((i / 26) * 100 + (Math.random() * 6 - 3)).toFixed(2);
      const top = (Math.random() * 90 + 5).toFixed(2);
      const size = Math.floor(Math.random() * 6) + 3; // 3px to 8px
      const duration = (12 + Math.random() * 6).toFixed(1); // 12-18s cycle
      const delay = (Math.random() * 6).toFixed(1);
      const opacity = (0.2 + Math.random() * 0.6).toFixed(2);
      const floatX = (Math.random() * 50 - 25).toFixed(0); // sine wave side movement
      const floatY = (-70 - Math.random() * 60).toFixed(0); // upward drift
      const isBlue = i % 3 === 0;

      return {
        id: i,
        size,
        left: `${left}%`,
        top: `${top}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        opacity,
        floatX: `${floatX}px`,
        floatY: `${floatY}px`,
        color: isBlue ? 'bg-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]',
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Bokeh Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#667eea]/15 blur-[90px] animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute bottom-12 right-12 w-80 h-80 rounded-full bg-[#764ba2]/20 blur-[100px] animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px]" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            animation: `sineWaveFloat ${p.duration} ease-in-out infinite ${p.delay}`,
            '--float-x': p.floatX,
            '--float-y': p.floatY,
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(ParticleBackground);
