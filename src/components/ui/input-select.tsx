'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface InputSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
}

const InputSelect: React.FC<InputSelectProps> = ({
  id,
  name,
  label,
  placeholder = 'Select an option',
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = false,
  error,
  className,
  size = 'md',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ''
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  useEffect(() => {
    const updateSelectedValue = () => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    };

    updateSelectedValue();
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-[1.125rem] w-[1.125rem]',
    lg: 'h-5 w-5',
  };

  const baseClasses = cn(
    'relative w-full cursor-pointer rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    sizeClasses[size],
    variant === 'default'
      ? 'border-gray-300 bg-white hover:border-primaryHover'
      : 'border-grey400 bg-white hover:border-primaryHover',
    disabled && 'cursor-not-allowed opacity-50 hover:border-gray-300',
    error && 'border-statusError focus:ring-statusError',
    isOpen && 'border-primary ring-2 ring-primary ring-offset-2'
  );

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'mb-2 block text-sm font-medium text-gray-700',
            required && "after:text-statusError after:ml-1 after:content-['*']",
            disabled && 'text-gray-400'
          )}
        >
          {label}
        </label>
      )}

      <div ref={selectRef} className="relative">
        <div
          id={id}
          className={baseClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          aria-label={label || placeholder}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={e => {
            if (disabled) return;

            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              if (!isOpen) {
                setIsOpen(true);
              }
            }
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'block truncate',
                !selectedOption && 'text-gray-500'
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div
              className={cn(
                'transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            >
              <svg
                className={cn(iconSizeClasses[size], 'text-gray-400')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <ul
              id={`${id}-listbox`}
              className="max-h-60 overflow-auto py-1"
              role="listbox"
              aria-label={`${label || placeholder} options`}
            >
              {options.map(option => (
                <li
                  key={option.value}
                  className={cn(
                    'cursor-pointer px-3 py-2 text-sm transition-colors duration-150',
                    'hover:bg-primary/10 hover:text-primaryHover',
                    option.value === selectedValue &&
                      'bg-primary/20 text-primary font-medium',
                    option.disabled &&
                      'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-gray-500'
                  )}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  aria-roledescription="option"
                >
                  <div className="flex items-center justify-between">
                    <span className="block truncate">{option.label}</span>
                    {option.value === selectedValue && (
                      <svg
                        className="text-primary size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={selectedValue} />
      </div>

      {error && <p className="text-statusError mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default InputSelect;
