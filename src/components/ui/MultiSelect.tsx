import { useEffect, useRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  placeholder: string;
  required?: boolean;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  disabled?: boolean;
}

const MultiSelect = ({
  label,
  placeholder,
  required = false,
  options,
  selectedValues,
  onChange,
  error,
  disabled = false,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleSelectAll = () => {
    const filteredOptions = getFilteredOptions();
    const allFilteredValues = filteredOptions.map(opt => opt.value);
    const hasAllSelected = allFilteredValues.every(val =>
      selectedValues.includes(val)
    );

    if (hasAllSelected) {
      // Deselect all filtered options
      const newValues = selectedValues.filter(
        val => !allFilteredValues.includes(val)
      );
      onChange(newValues);
    } else {
      // Select all filtered options
      const newValues = [...new Set([...selectedValues, ...allFilteredValues])];
      onChange(newValues);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.value === selectedValues[0]);
      return option?.label || '';
    }
    return `${selectedValues.length} selected`;
  };

  const getFilteredOptions = () => {
    if (!searchTerm) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredOptions = getFilteredOptions();
  const hasAllFilteredSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every(opt => selectedValues.includes(opt.value));

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>

      <div
        className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 transition-colors ${
          disabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-50'
            : isOpen
              ? 'border-primary ring-primary ring-1'
              : error
                ? 'border-red-500'
                : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span
          className={`truncate ${selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}
        >
          {getDisplayText()}
        </span>
        <div className="flex items-center space-x-2">
          {selectedValues.length > 0 && !disabled && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleClearAll();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <svg
            className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-gray-400' : 'text-gray-600'}`}
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

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          {/* Search input */}
          <div className="border-b border-gray-200 p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="focus:border-primary focus:ring-primary w-full rounded border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Select/Deselect all */}
          {filteredOptions.length > 1 && (
            <div className="border-b border-gray-200 p-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-primary hover:text-primaryHover w-full text-left text-sm"
              >
                {hasAllFilteredSelected ? 'Deselect All' : 'Select All'}
                {searchTerm && ` (${filteredOptions.length})`}
              </button>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className="flex cursor-pointer items-center px-3 py-2 hover:bg-gray-50"
                  onClick={() => handleToggleOption(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => {}}
                    className="text-primary accent-primary mr-3 size-4"
                  />
                  <span className="flex-1 text-sm">{option.label}</span>
                </div>
              ))
            )}
          </div>

          {/* Footer with selection count */}
          {selectedValues.length > 0 && (
            <div className="border-t border-gray-200 px-3 py-2">
              <div className="text-xs text-gray-500">
                {selectedValues.length} of {options.length} selected
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default MultiSelect;
