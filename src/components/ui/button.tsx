import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center cursor-pointer justify-center rounded-[.75rem] font-medium transition-all focus:outline-none disabled:cursor-not-allowed  disabled:opacity-50 disabled:pointer-events-none !leading-6 gap-2.5';

    const variants = {
      primary: 'bg-background border border-foreground hover:opacity-50 focus:ring-gray-500',
      secondary: 'bg-black border border-black text-white hover:opacity-60 focus:ring-gray-500',
      success: 'bg-success border border-success text-white hover:opacity-60 focus:ring-gray-500',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
