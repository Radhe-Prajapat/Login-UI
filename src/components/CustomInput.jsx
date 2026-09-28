import React, { forwardRef } from 'react';

/**
 * CustomInput Component
 * Styled glassmorphic input with animated gradient underline, focus ring glow,
 * icon slot, and accessible error message handling.
 */
const CustomInput = forwardRef(
  (
    {
      label,
      type = 'text',
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      icon,
      rightElement,
      error,
      id,
      autoComplete,
      required = false,
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id || name} className="block text-xs font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.85)]">
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}

        <div className="input-group relative w-full">
          {/* Left Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgba(255,255,255,0.5)]">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={id || name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={`w-full py-2.5 sm:py-3 text-white text-xs sm:text-sm font-medium placeholder-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.08)] border rounded-[12px] transition-all duration-300 outline-none ${
              icon ? 'pl-10' : 'pl-3.5'
            } ${rightElement ? 'pr-10' : 'pr-3.5'} ${
              error
                ? 'border-red-400/80 focus:border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.3)]'
                : 'border-[rgba(255,255,255,0.12)] focus:bg-[rgba(255,255,255,0.15)] focus:border-[rgba(102,126,234,0.8)] focus:shadow-[0_0_20px_rgba(102,126,234,0.4)_inset,0_0_15px_rgba(102,126,234,0.3)]'
            }`}
          />

          {/* Right Action (e.g. Eye toggle) */}
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {rightElement}
            </div>
          )}

          {/* Gradient Underline Animation on Focus */}
          <span className="input-underline" />
        </div>

        {/* Error Feedback */}
        {error && (
          <p className="text-xs text-red-300 font-medium flex items-center gap-1.5 animate-fade-top pl-1">
            <span>⚠️</span> {error}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default React.memo(CustomInput);
