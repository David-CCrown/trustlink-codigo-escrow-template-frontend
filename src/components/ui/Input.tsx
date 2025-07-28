/**
 * Input UI Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Reusable input component with validation, icons, and accessibility features
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search' | 'error';
  size?: 'sm' | 'default' | 'lg';
  label?: string;
  description?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'default',
      size = 'default',
      label,
      description,
      error,
      startIcon,
      endIcon,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const sizeClasses = {
      sm: 'h-9 px-3 py-2 text-sm',
      default: 'h-10 px-4 py-2.5',
      lg: 'h-12 px-5 py-3 text-base',
    };

    const variantClasses = {
      default:
        'border-border/60 bg-background/80 backdrop-blur-sm focus:border-primary focus:ring-primary/10 focus:bg-background',
      search:
        'border-border/40 bg-background/60 backdrop-blur-sm focus:border-primary/60 focus:ring-primary/10 focus:bg-background',
      error:
        'border-destructive/60 bg-destructive/5 focus:border-destructive focus:ring-destructive/10',
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              'flex w-full rounded-lg border bg-background text-foreground shadow-sm transition-all duration-200',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground/70',
              'focus:outline-none focus:ring-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'hover:border-border/80',
              sizeClasses[size],
              variantClasses[error ? 'error' : variant],
              startIcon && 'pl-11',
              endIcon && 'pr-11',
              className
            )}
            ref={ref}
            aria-describedby={cn(descriptionId, errorId)}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={props.required}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {endIcon}
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

Input.displayName = 'Input';

export default Input;
