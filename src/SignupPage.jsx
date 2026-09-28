import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';

/**
 * SignupPage Component
 * Matches the glassmorphism design system of LoginCard with dark gradient background,
 * floating particle system, and smooth CSS animations.
 */
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Account created successfully for ${formData.username}!`);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans selection:bg-[#667eea] selection:text-white">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f172a] to-[#1e0e34]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.25) 0%, transparent 45%),
            linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1d0f36 100%)
          `
        }}
      />

      {/* Floating Particles */}
      <ParticleBackground />

      {/* Ambient Orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#764ba2]/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 glass-card rounded-[20px] animate-card-entry shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8 animate-fade-top" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            Create Account
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-sm sm:text-base mt-2 font-normal animate-fade-top" style={{ animationDelay: '0.3s' }}>
            Join us today! Enter your details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Username */}
          <div className="animate-fade-bottom" style={{ animationDelay: '0.4s' }}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.8)] mb-1.5">
              Username
            </label>
            <div className="input-group relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className={`w-full px-4 py-3 text-white placeholder-[rgba(255,255,255,0.35)] glass-input text-sm font-medium ${
                  errors.username ? 'border-red-400' : ''
                }`}
              />
              <span className="input-underline" />
            </div>
            {errors.username && <p className="mt-1 text-xs text-red-300">⚠️ {errors.username}</p>}
          </div>

          {/* Email */}
          <div className="animate-fade-bottom" style={{ animationDelay: '0.5s' }}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.8)] mb-1.5">
              Email Address
            </label>
            <div className="input-group relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 text-white placeholder-[rgba(255,255,255,0.35)] glass-input text-sm font-medium ${
                  errors.email ? 'border-red-400' : ''
                }`}
              />
              <span className="input-underline" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-300">⚠️ {errors.email}</p>}
          </div>

          {/* Password */}
          <div className="animate-fade-bottom" style={{ animationDelay: '0.6s' }}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.8)] mb-1.5">
              Password
            </label>
            <div className="input-group relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-4 pr-11 py-3 text-white placeholder-[rgba(255,255,255,0.35)] glass-input text-sm font-medium ${
                  errors.password ? 'border-red-400' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[rgba(255,255,255,0.6)] hover:text-white"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              <span className="input-underline" />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-300">⚠️ {errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2 animate-fade-bottom" style={{ animationDelay: '0.7s' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 btn-gradient shimmer-effect text-white font-bold text-base rounded-[12px] shadow-lg flex items-center justify-center transition-all cursor-pointer"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center pt-2 animate-fade-bottom" style={{ animationDelay: '0.8s' }}>
            <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.7)] font-normal">
              Already have an account?{' '}
              <Link
                to="/"
                className="text-white font-semibold underline underline-offset-4 decoration-[#667eea] hover:decoration-[#764ba2] hover:text-[#c4b5fd]"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
