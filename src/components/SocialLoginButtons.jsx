import React from 'react';

/**
 * SocialLoginButtons Component
 * Renders glassmorphic social login buttons (Google, GitHub, Apple) with hover glow animations.
 */
const SocialLoginButtons = ({ onSocialSelect }) => {
  const providers = [
    {
      id: 'google',
      name: 'Google',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
          />
        </svg>
      ),
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: (
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: (
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.17.67-2.87 1.49-.6.7-1.13 1.83-.98 2.95 1.12.09 2.21-.52 2.86-1.32z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full space-y-3 pt-2">
      <div className="relative flex items-center justify-center">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-[#1e1e32]/80 backdrop-blur-md px-3 text-[11px] font-semibold text-white/50 uppercase tracking-widest absolute">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        {providers.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSocialSelect && onSocialSelect(p.name)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/12 border border-white/10 hover:border-white/25 rounded-[12px] text-white text-xs font-semibold shadow-md hover:shadow-[0_0_15px_rgba(102,126,234,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {p.icon}
            <span className="hidden sm:inline">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SocialLoginButtons);
