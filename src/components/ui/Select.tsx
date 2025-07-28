/**
 * Select UI Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Custom select dropdown component with keyboard navigation and accessibility
 */

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'error';
  size?: 'sm' | 'default' | 'lg';
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = 'Select an option',
      variant = 'default',
      size = 'default',
      label,
      description,
      error,
      disabled = false,
      required = false,
      className,
      id,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listboxRef = React.useRef<HTMLUListElement>(null);

    const generatedId = React.useId();
    const selectId = id || generatedId;
    const descriptionId = description ? `${selectId}-description` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

    const selectedOption = options.find(option => option.value === value);

    const sizeClasses = {
      sm: 'h-9 px-3 py-2 text-sm',
      default: 'h-10 px-4 py-2.5',
      lg: 'h-12 px-5 py-3 text-base',
    };

    const variantClasses = {
      default:
        'border-border/60 bg-background/80 backdrop-blur-sm hover:border-border/80 focus:border-primary focus:ring-primary/10 focus:bg-background',
      error:
        'border-destructive/60 bg-destructive/5 hover:border-destructive/80 focus:border-destructive focus:ring-destructive/10',
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setFocusedIndex(-1);
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (!option.disabled && onChange) {
        onChange(option.value);
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            const option = options[focusedIndex];
            if (!option.disabled) {
              handleSelect(option);
            }
          } else {
            setIsOpen(true);
            setFocusedIndex(0);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            const nextIndex = Math.min(focusedIndex + 1, options.length - 1);
            setFocusedIndex(nextIndex);
            // Scroll into view
            if (listboxRef.current) {
              const element = listboxRef.current.children[
                nextIndex
              ] as HTMLElement;
              if (element) {
                element.scrollIntoView({ block: 'nearest' });
              }
            }
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(options.length - 1);
          } else {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
            // Scroll into view
            if (listboxRef.current) {
              const element = listboxRef.current.children[
                prevIndex
              ] as HTMLElement;
              if (element) {
                element.scrollIntoView({ block: 'nearest' });
              }
            }
          }
          break;
      }
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div className="space-y-1.5" ref={ref}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative" ref={containerRef}>
          <button
            type="button"
            id={selectId}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border bg-background text-foreground shadow-sm transition-all duration-200',
              'focus:outline-none focus:ring-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'min-w-[120px]',
              sizeClasses[size],
              variantClasses[error ? 'error' : variant],
              className
            )}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            aria-describedby={cn(descriptionId, errorId)}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={required}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
          >
            <span
              className={cn(
                'truncate flex-1 min-w-0',
                !selectedOption && 'text-muted-foreground/70'
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground transition-transform duration-200 ml-3 flex-shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 animate-in fade-in-0 zoom-in-95 duration-150">
              <ul
                ref={listboxRef}
                className="max-h-60 overflow-auto rounded-lg border border-border/60 bg-background/95 backdrop-blur-sm shadow-lg py-1 min-w-[120px]"
                role="listbox"
                aria-labelledby={label ? `${selectId}-label` : undefined}
              >
                {options.map((option, index) => (
                  <li
                    key={option.value}
                    className={cn(
                      'relative flex cursor-pointer select-none items-center px-4 py-2.5 text-sm transition-colors duration-150',
                      'hover:bg-muted/60 focus:bg-muted/60 focus:outline-none',
                      focusedIndex === index && 'bg-muted/60',
                      option.disabled &&
                        'cursor-not-allowed opacity-50 hover:bg-transparent',
                      option.value === value && 'bg-primary/10 text-primary'
                    )}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    role="option"
                    aria-selected={option.value === value}
                    aria-disabled={option.disabled}
                    tabIndex={-1}
                  >
                    <span className="flex-1 truncate min-w-0">
                      {option.label}
                    </span>
                    {option.value === value && (
                      <Check className="h-4 w-4 text-primary ml-3 flex-shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {description && !error && (
          <p id={descriptionId} className="text-sm text-muted-foreground/80">
            {description}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
