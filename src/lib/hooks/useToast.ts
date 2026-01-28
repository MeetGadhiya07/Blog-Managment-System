import { createContext, useContext } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, variant: ToastVariant, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Usage examples throughout your app:
/*
import { useToast } from '@/hooks/useToast';

const { addToast } = useToast();

// Success toast
addToast('Profile updated successfully!', 'success');

// Error toast
addToast('Failed to save changes', 'error');

// Warning toast
addToast('Please fill all required fields', 'warning');

// Info toast
addToast('New features available!', 'info');

// Custom duration (default is 5000ms)
addToast('Quick message', 'success', 3000);
*/
