import React from 'react';

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, required, className = '', ...props }, ref) => {
    return (
      <div className="relative mb-4">
        {label && (
          <label className="mb-1 block text-sm font-medium">
            {label} {required && <span className="text-statusError">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <textarea
            ref={ref}
            className={`text-secondary focus:ring-primary max-h-[100px] min-h-[100px] w-full resize-y rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none ${error ? 'border-statusError' : 'border-grey400'} ${className}`}
            {...props}
          />
        </div>
        {error && <div className="text-statusError mt-0.5 text-xs">{error}</div>}
      </div>
    );
  },
);

TextareaField.displayName = 'TextareaField';

export default TextareaField;
