import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Eyes3D from './Eyes3D';
import CustomInput from './CustomInput';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import SocialLoginButtons from './SocialLoginButtons';
import { calculateCardTilt } from '../utils/eyeTracking';

/**
 * LoginCard Component
 * Master glassmorphic card featuring interactive 3D eyes, real-time password strength,
 * 3D card tilt, shimmer button, click ripple, social auth, and animated success/error states.
 */
const LoginCard = ({ onLoginSuccess, signupPath = '/signup', mousePos = { x: 0, y: 0 } }) => {
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rippleStyle, setRippleStyle] = useState(null);
  const [cardTilt, setCardTilt] = useState({ tiltX: 0, tiltY: 0 });

  // Handle card 3D tilt on mouse movement
  const handleMouseMoveOnCard = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const { tiltX, tiltY } = calculateCardTilt(e.clientX, e.clientY, cardRef.current, 5);
      setCardTilt({ tiltX, tiltY });
    },
    []
  );

  const handleMouseLeaveCard = useCallback(() => {
    setCardTilt({ tiltX: 0, tiltY: 0 });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (isError) {
      setIsError(false);
      setErrorMessage('');
    }
  };

  // Button click ripple handler
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    setRippleStyle({
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
    });

    setTimeout(() => {
      setRippleStyle(null);
    }, 600);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username or Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsError(true);
      setErrorMessage('Please fill in all required fields correctly.');
      setTimeout(() => setIsError(false), 800);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setIsError(false);

    // Simulate API Auth Request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(formData);
        } else {
          alert(`🎉 Logged in successfully! Welcome, ${formData.username}!`);
        }
      }, 1200);
    }, 1800);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMoveOnCard}
      onMouseLeave={handleMouseLeaveCard}
      style={{
        transform: `perspective(1000px) rotateX(${cardTilt.tiltX}deg) rotateY(${cardTilt.tiltY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative z-10 w-full max-w-[430px] p-6 sm:p-8 md:p-9 glass-card rounded-[22px] sm:rounded-[25px] shadow-2xl backdrop-blur-[20px] transition-all duration-300 ${
        isError ? 'animate-shake border-red-400/60 shadow-[0_0_35px_rgba(248,113,113,0.4)]' : ''
      } ${isSuccess ? 'animate-bounce border-emerald-400/60 shadow-[0_0_40px_rgba(52,211,153,0.4)]' : ''}`}
    >
      {/* 3D EYES ANIMATION - CENTER TOP OF LOGIN CARD */}
      <Eyes3D
        isPasswordFocused={isPasswordFocused}
        isSuccess={isSuccess}
        isError={isError}
        mousePos={mousePos}
      />

      {/* Heading "Login" */}
      <div className="text-center mb-4 sm:mb-5 animate-fade-top" style={{ animationDelay: '0.3s' }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg hover:text-cyan-200 transition-colors duration-300 cursor-default">
          Login
        </h1>
        {/* Subtitle */}
        <p className="text-[rgba(255,255,255,0.7)] text-xs sm:text-sm mt-1 font-normal animate-fade-top" style={{ animationDelay: '0.4s' }}>
          Please sign in to continue
        </p>
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="mb-3 p-2.5 rounded-xl bg-red-500/20 border border-red-400/40 text-red-200 text-xs text-center animate-fade-top font-medium flex items-center justify-center gap-2">
          <span>⚠️</span> {errorMessage}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
        {/* Form Group 1: Username / Email */}
        <div className="animate-fade-bottom" style={{ animationDelay: '0.5s' }}>
          <CustomInput
            label="Username or Email"
            name="username"
            id="login-username"
            value={formData.username}
            onChange={handleChange}
            placeholder="e.g. alex@example.com"
            error={errors.username}
            required
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </div>

        {/* Form Group 2: Password + Eyelids close trigger */}
        <div className="animate-fade-bottom" style={{ animationDelay: '0.6s' }}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.85)]">
              Password <span className="text-red-400">*</span>
            </span>
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link sent to your registered email!');
              }}
              className="text-xs text-[#9bb0ff] hover:text-white transition-colors duration-200"
            >
              Forgot password?
            </a>
          </div>

          <CustomInput
            name="password"
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="••••••••"
            error={errors.password}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.043 10.043 0 013.682-.963c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            }
          />

          {/* REAL-TIME PASSWORD STRENGTH INDICATOR */}
          <PasswordStrengthIndicator password={formData.password} />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1 animate-fade-bottom" style={{ animationDelay: '0.65s' }}>
          <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#667eea] focus:ring-0 cursor-pointer accent-[#667eea]"
            />
            <span>Remember me on this device</span>
          </label>
        </div>

        {/* Login Button with Continuous Shimmer & Ripple */}
        <div className="pt-2 animate-fade-bottom" style={{ animationDelay: '0.7s' }}>
          <button
            type="submit"
            onClick={handleButtonClick}
            disabled={isLoading || isSuccess}
            className={`relative w-full py-3 sm:py-3.5 px-5 btn-gradient shimmer-effect text-white font-bold text-sm sm:text-base rounded-[12px] sm:rounded-[14px] shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              isSuccess ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : ''
            }`}
          >
            {/* Click Ripple effect */}
            {rippleStyle && <span className="ripple-element" style={rippleStyle} />}

            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2 tracking-wide text-white animate-fade-top font-extrabold">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
                Success!
              </span>
            ) : (
              <span className="flex items-center gap-2 tracking-wide font-bold">
                Login
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>
        </div>

        {/* Social Login Options */}
        <div className="animate-fade-bottom" style={{ animationDelay: '0.75s' }}>
          <SocialLoginButtons onSocialSelect={(provider) => alert(`Logging in with ${provider}...`)} />
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-2 animate-fade-bottom" style={{ animationDelay: '0.8s' }}>
          <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.7)] font-normal">
            Don't have an account?{' '}
            <Link
              to={signupPath}
              className="text-[#8ba2ff] font-semibold underline underline-offset-4 decoration-[#667eea] hover:decoration-[#764ba2] hover:text-white transition-all duration-200"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
