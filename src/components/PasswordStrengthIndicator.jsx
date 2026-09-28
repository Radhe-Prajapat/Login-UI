import React, { useMemo } from 'react';

/**
 * PasswordStrengthIndicator Component
 * Analyzes password length, uppercase, lowercase, numbers, and special characters.
 * Renders a color-coded strength bar and label with smooth CSS width transitions.
 */
const PasswordStrengthIndicator = ({ password = '' }) => {
  const strengthInfo = useMemo(() => {
    if (!password) return { score: 0, label: '', color: 'bg-transparent', width: '0%' };

    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
      case 2:
        return {
          score: 1,
          label: 'Weak password',
          color: 'bg-red-400',
          textColor: 'text-red-300',
          width: '25%',
        };
      case 3:
        return {
          score: 2,
          label: 'Medium strength',
          color: 'bg-amber-400',
          textColor: 'text-amber-300',
          width: '55%',
        };
      case 4:
        return {
          score: 3,
          label: 'Strong password',
          color: 'bg-sky-400',
          textColor: 'text-sky-300',
          width: '80%',
        };
      case 5:
        return {
          score: 4,
          label: 'Excellent & secure! 🔒',
          color: 'bg-emerald-400',
          textColor: 'text-emerald-300',
          width: '100%',
        };
      default:
        return {
          score: 0,
          label: '',
          color: 'bg-transparent',
          textColor: 'text-white/50',
          width: '0%',
        };
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1 animate-fade-top">
      {/* Visual Bar Track */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className={`h-full ${strengthInfo.color} transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]`}
          style={{ width: strengthInfo.width }}
        />
      </div>

      {/* Label text */}
      <div className="flex justify-between items-center text-[11px]">
        <span className={`font-medium ${strengthInfo.textColor}`}>
          {strengthInfo.label}
        </span>
        <span className="text-white/40 font-mono">
          {password.length} chars
        </span>
      </div>
    </div>
  );
};

export default React.memo(PasswordStrengthIndicator);
