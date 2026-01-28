'use client';
import {
  Toast,
  ToastContext,
  ToastContextType,
  ToastVariant,
} from '@/lib/hooks/useToast';
import React, { ReactNode, useCallback, useState } from 'react';
import ToastContainer from '../ui/ToastContainer';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, variant: ToastVariant, duration = 5000) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newToast: Toast = { id, message, variant, duration };

      setToasts(prev => [...prev, newToast]);

      // Auto remove toast after duration
      // if (duration > 0) {
      //   setTimeout(() => {
      //     removeToast(id);
      //   }, duration);
      // }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
