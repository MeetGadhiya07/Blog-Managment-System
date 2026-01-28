'use client';
import { Toast, useToast } from '@/lib/hooks/useToast';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ToastItemProps {
  toast: Toast;
  position?: ToastPosition;
}

const TOAST_CONFIG = {
  variants: {
    success: {
      classes: 'border-success bg-success-light text-success',
      icon: <CheckCircle className="size-5" />,
    },
    error: {
      classes: 'border-error bg-error-light text-error',
      icon: <AlertCircle className="size-5" />,
    },
    warning: {
      classes: 'border-warning bg-yellow-50 text-warning',
      icon: <AlertTriangle className="size-5" />,
    },
    info: {
      classes: 'border-primary bg-muted text-primary',
      icon: <Info className="size-5" />,
    },
    default: {
      classes: 'border-border bg-background text-secondary',
      icon: <Info className="size-5" />,
    },
  },
  positions: {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  },
  animation: {
    enter: 'opacity-100 translate-x-0',
    exit: 'opacity-0 translate-x-full',
  },
  baseStyles:
    'flex items-center gap-3 p-4 max-w-sm w-full rounded-10 shadow-lg border transition-all duration-300 ease-in-out font-sans text-sm',
  dismissDelay: 5000,
  animationDelay: 50,
  closeAnimationDuration: 300,
};

const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  position = 'bottom-right',
}) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      removeToast(toast.id);
    }, TOAST_CONFIG.closeAnimationDuration);
  }, [removeToast, toast.id]);

  useEffect(() => {
    // Show toast with slight delay for animation
    const showTimer = setTimeout(
      () => setIsVisible(true),
      TOAST_CONFIG.animationDelay
    );
    // Auto-dismiss after configured delay
    const dismissTimer = setTimeout(() => {
      handleClose();
    }, TOAST_CONFIG.dismissDelay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [handleClose]);

  const variantConfig =
    TOAST_CONFIG.variants[toast.variant] || TOAST_CONFIG.variants.default;
  const positionClasses = TOAST_CONFIG.positions[position];

  return (
    <div
      className={cn(
        TOAST_CONFIG.baseStyles,
        variantConfig.classes,
        positionClasses,
        isVisible && !isExiting
          ? TOAST_CONFIG.animation.enter
          : TOAST_CONFIG.animation.exit
      )}
    >
      <div className="shrink-0">{variantConfig.icon}</div>
      <div className="flex-1">{toast.message}</div>
      <button
        onClick={handleClose}
        className="hover:bg-muted shrink-0 rounded-full p-1 transition-colors"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};

export default ToastItem;
