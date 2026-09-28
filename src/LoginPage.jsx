import React, { useState, useEffect } from "react";
import ParticleBackground from "./components/ParticleBackground";
import LoginCard from "./components/LoginCard";

/**
 * LoginPage Component
 * Full-screen viral container featuring mouse cursor glow tracking,
 * 8-second animated background gradient shift (#0f0f1e to #1a0933),
 * 3D Eyes LoginCard component, and Instagram Reels (9:16 portrait display) frame toggle.
 */
const LoginPage = () => {
  const [mousePos, setMousePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [isReelsPreview, setIsReelsPreview] = useState(false);

  // Global mouse position tracking for pupil 3D eyes & cursor glow follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLoginSuccess = (data) => {
    // Action after success animation completes
    console.log("Logged in user:", data);
  };

  return (
    <div className="relative h-screen max-h-screen h-[100dvh] max-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0f0f1e] font-sans selection:bg-[#667eea] selection:text-white p-2 sm:p-4">
      {/* Animated Dark Gradient Shift (#0f0f1e navy to #1a0933 dark purple) */}
      <div
        className="absolute inset-0 z-0 animate-bg-shift"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(102, 126, 234, 0.28) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(118, 75, 162, 0.32) 0%, transparent 45%),
            linear-gradient(135deg, #0f0f1e 0%, #150c2a 50%, #1a0933 100%)
          `,
        }}
      />

      {/* Floating Particles System */}
      <ParticleBackground />

      {/* Mouse Cursor Follower Glow Effect */}
      <div
        className="fixed w-72 h-72 rounded-full bg-[rgba(102,126,234,0.22)] blur-[60px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Reel Creator Header Banner / Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#1e1e32]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-white shadow-xl">
          <span className="font-semibold text-xs text-cyan-300">
            📱 Reels Mode (9:16)
          </span>
          <button
            type="button"
            onClick={() => setIsReelsPreview(!isReelsPreview)}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isReelsPreview ? "bg-[#667eea]" : "bg-white/20"
            }`}
            role="switch"
            aria-checked={isReelsPreview}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                isReelsPreview ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Instagram Reel Audio & Caption Overlay (shown in Reels preview mode) */}
      {isReelsPreview && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white text-xs max-w-sm text-center shadow-2xl animate-fade-top">
          <p className="font-bold text-cyan-300 flex items-center justify-center gap-1.5">
            👀 Eyes close when you type password! 🔐
          </p>
          <p className="text-[11px] text-white/70 mt-0.5">
            #UIAnimation #ReactJS #WebDesign #ViralsLimit
          </p>
        </div>
      )}

      {/* Main Container - Supports normal responsive layout & 9:16 Reels Frame */}
      <div
        className={`relative z-10 w-full flex items-center justify-center p-2 sm:p-4 transition-all duration-500 scale-[0.85] sm:scale-95 md:scale-100 origin-center ${
          isReelsPreview
            ? "max-w-[390px] reels-aspect-container border-[6px] border-white/20 rounded-[40px] shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto bg-slate-950/60"
            : "max-w-lg"
        }`}
      >
        <LoginCard
          onLoginSuccess={handleLoginSuccess}
          signupPath="/signup"
          mousePos={mousePos}
        />
      </div>
    </div>
  );
};

export default LoginPage;
