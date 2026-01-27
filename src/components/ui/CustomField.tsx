import SVGIcon from '@/lib/SVGIcons/Icon';
import React, { useState } from 'react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  type?: InputType;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="relative mb-4">
        {label && (
          <label className="mb-1 block text-sm font-medium">
            {label} {required && <span className="text-statusError">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={inputType}
            className={`text-secondary focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-300 disabled:text-gray-700 disabled:select-none ${error ? 'border-statusError' : 'border-grey400'} ${className} ${isPassword ? 'pr-12' : ''}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-grey500 hover:text-primary absolute inset-y-0 right-3 flex items-center justify-center p-1 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {/* <SVGIcon
                name={showPassword ? "eye" : "eyeOff"}
                width={22}
                height={22}
              /> */}
            </button>
          )}
        </div>
        {error && <div className="text-statusError mt-0.5 text-xs">{error}</div>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
