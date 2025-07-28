/**
 * Button UI Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Reusable button component with multiple variants, sizes, and accessibility features
 */

import React, { forwardRef } from 'react';
import type {
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  JSX,
} from 'react';

interface ButtonProps {
  // Core Props
  label?: string;
  children?: ReactNode;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
  ) => void;

  // Button Types and States
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  autoFocus?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  value?: string | number;

  // Styling and Appearance - Updated with Solana variants
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'ghost'
    | 'link'
    | 'solana'
    | 'escrow'
    | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  gradient?: boolean; // New prop for gradient effects

  // HTML Attributes
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  tabIndex?: number;
  role?: string;

  // WAI-ARIA Attributes
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-haspopup'?:
    | boolean
    | 'false'
    | 'true'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog';
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-activedescendant'?: string;
  'aria-atomic'?: boolean;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  'aria-busy'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colspan'?: number;
  'aria-current'?:
    | boolean
    | 'false'
    | 'true'
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time';
  'aria-details'?: string;
  'aria-disabled'?: boolean;
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
  'aria-errormessage'?: string;
  'aria-flowto'?: string;
  'aria-grabbed'?: boolean;
  'aria-hidden'?: boolean;
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
  'aria-keyshortcuts'?: string;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-modal'?: boolean;
  'aria-multiline'?: boolean;
  'aria-multiselectable'?: boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-placeholder'?: string;
  'aria-posinset'?: number;
  'aria-pressed'?: boolean | 'mixed';
  'aria-readonly'?: boolean;
  'aria-relevant'?:
    | 'additions'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'text';
  'aria-required'?: boolean;
  'aria-roledescription'?: string;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowspan'?: number;
  'aria-selected'?: boolean;
  'aria-setsize'?: number;
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;

  // Event Handlers
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (event: MouseEvent<HTMLButtonElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchMove?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchCancel?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onContextMenu?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDrag?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnter?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragExit?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragStart?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLButtonElement>) => void;

  // Advanced Props
  as?: keyof JSX.IntrinsicElements;
  href?: string; // For when used as a link
  target?: string;
  rel?: string;
  download?: string;
  tooltip?: string;
  badge?: string | number;
  pulse?: boolean;
  animate?: boolean;
  focusRing?: boolean;
  allowFocusWhenDisabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      // Core Props
      label,
      children,
      onClick,

      // Button Types and States
      type = 'button',
      disabled = false,
      autoFocus = false,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      name,
      value,

      // Styling and Appearance
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      rounded = 'lg',
      loading = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      gradient = false,

      // HTML Attributes
      id,
      className = '',
      style,
      title,
      tabIndex,
      role,

      // WAI-ARIA Attributes
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-controls': ariaControls,
      'aria-owns': ariaOwns,
      'aria-activedescendant': ariaActivedescendant,
      'aria-atomic': ariaAtomic,
      'aria-autocomplete': ariaAutocomplete,
      'aria-busy': ariaBusy,
      'aria-checked': ariaChecked,
      'aria-colcount': ariaColcount,
      'aria-colindex': ariaColindex,
      'aria-colspan': ariaColspan,
      'aria-current': ariaCurrent,
      'aria-details': ariaDetails,
      'aria-disabled': ariaDisabled,
      'aria-dropeffect': ariaDropeffect,
      'aria-errormessage': ariaErrormessage,
      'aria-flowto': ariaFlowto,
      'aria-grabbed': ariaGrabbed,
      'aria-hidden': ariaHidden,
      'aria-invalid': ariaInvalid,
      'aria-keyshortcuts': ariaKeyshortcuts,
      'aria-live': ariaLive,
      'aria-modal': ariaModal,
      'aria-multiline': ariaMultiline,
      'aria-multiselectable': ariaMultiselectable,
      'aria-orientation': ariaOrientation,
      'aria-placeholder': ariaPlaceholder,
      'aria-posinset': ariaPosinset,
      'aria-pressed': ariaPressed,
      'aria-readonly': ariaReadonly,
      'aria-relevant': ariaRelevant,
      'aria-required': ariaRequired,
      'aria-roledescription': ariaRoledescription,
      'aria-rowcount': ariaRowcount,
      'aria-rowindex': ariaRowindex,
      'aria-rowspan': ariaRowspan,
      'aria-selected': ariaSelected,
      'aria-setsize': ariaSetsize,
      'aria-sort': ariaSort,
      'aria-valuemax': ariaValuemax,
      'aria-valuemin': ariaValuemin,
      'aria-valuenow': ariaValuenow,
      'aria-valuetext': ariaValuetext,

      // Event Handlers
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseOut,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      onTouchCancel,
      onContextMenu,
      onDoubleClick,
      onDrag,
      onDragEnd,
      onDragEnter,
      onDragExit,
      onDragLeave,
      onDragOver,
      onDragStart,
      onDrop,

      // Advanced Props
      as,
      href,
      target,
      rel,
      download,
      tooltip,
      badge,
      pulse = false,
      animate = true,
      focusRing = true,
      allowFocusWhenDisabled = false,

      ...rest
    },
    ref
  ) => {
    // Generate variant classes with Solana theming
    const getVariantClasses = () => {
      const baseGradient = gradient
        ? 'bg-gradient-solana hover:shadow-solana-lg'
        : '';

      switch (variant) {
        case 'primary':
          return gradient
            ? `${baseGradient} text-primary-foreground border-0`
            : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-solana hover:shadow-solana-lg border-0';
        case 'solana':
          return 'bg-solana hover:bg-solana/90 text-solana-foreground shadow-solana hover:shadow-solana-lg border-0';
        case 'escrow':
          return gradient
            ? `${baseGradient} text-white border-0`
            : 'bg-primary hover:bg-solana text-primary-foreground shadow-solana hover:shadow-solana-lg border-0 transition-all duration-300';
        case 'secondary':
          return 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/50';
        case 'tertiary':
          return 'bg-transparent hover:bg-muted text-foreground border border-border';
        case 'success':
          return 'bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl border-0';
        case 'warning':
          return 'bg-warning hover:bg-warning/90 text-warning-foreground shadow-lg hover:shadow-xl border-0';
        case 'danger':
          return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl border-0';
        case 'outline':
          return 'bg-transparent hover:bg-primary/5 text-primary border-2 border-primary hover:border-primary/80 hover:text-primary/90';
        case 'ghost':
          return 'bg-transparent hover:bg-accent/10 text-foreground';
        case 'link':
          return 'bg-transparent hover:underline text-primary p-0 shadow-none';
        default:
          return 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-solana hover:shadow-solana-lg border-0';
      }
    };

    const getSizeClasses = () => {
      if (variant === 'link') return '';
      switch (size) {
        case 'xs':
          return 'px-3 py-1.5 text-xs font-medium min-h-[28px]';
        case 'sm':
          return 'px-4 py-2 text-sm font-medium min-h-[32px]';
        case 'md':
          return 'px-3 py-2.5 text-sm font-semibold min-h-[40px]';
        case 'lg':
          return 'px-8 py-3 text-base font-semibold min-h-[44px]';
        case 'xl':
          return 'px-10 py-4 text-lg font-semibold min-h-[52px]';
        default:
          return 'px-6 py-2.5 text-sm font-semibold min-h-[40px]';
      }
    };

    const getRoundedClasses = () => {
      switch (rounded) {
        case 'none':
          return 'rounded-none';
        case 'sm':
          return 'rounded-sm';
        case 'md':
          return 'rounded-md';
        case 'lg':
          return 'rounded-lg';
        case 'full':
          return 'rounded-full';
        default:
          return 'rounded-lg';
      }
    };

    const baseClasses = [
      'inline-flex items-center justify-center relative overflow-hidden',
      'transition-all duration-200 ease-out',
      'font-medium tracking-tight',
      'cursor-pointer',
      focusRing &&
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
      animate && 'transform hover:scale-[1.02] active:scale-[0.98]',
      pulse && 'animate-pulse',
      fullWidth && 'w-full',
      disabled &&
        !allowFocusWhenDisabled &&
        'opacity-50 cursor-not-allowed pointer-events-none',
      loading && 'cursor-wait',
      'select-none',
      getVariantClasses(),
      getSizeClasses(),
      getRoundedClasses(),
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Enhanced loading spinner with Solana styling
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Content with improved icon spacing
    const content = (
      <>
        {loading && <LoadingSpinner />}
        {leftIcon && !loading && (
          <span className={`${!iconOnly ? 'mr-2' : ''} flex-shrink-0`}>
            {leftIcon}
          </span>
        )}
        {!iconOnly && (children || label)}
        {iconOnly && !leftIcon && !rightIcon && (children || label)}
        {rightIcon && (
          <span className={`${!iconOnly ? 'ml-2' : ''} flex-shrink-0`}>
            {rightIcon}
          </span>
        )}
        {badge && (
          <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-destructive text-destructive-foreground rounded-full min-w-[18px] h-[18px]">
            {badge}
          </span>
        )}
      </>
    );

    // Create wrapper event handlers for anchor element to avoid type errors
    const handleAnchorFocus = onFocus
      ? (event: React.FocusEvent<HTMLAnchorElement>) => {
          onFocus(event as unknown as FocusEvent<HTMLButtonElement>);
        }
      : undefined;

    const handleAnchorBlur = onBlur
      ? (event: React.FocusEvent<HTMLAnchorElement>) => {
          onBlur(event as unknown as FocusEvent<HTMLButtonElement>);
        }
      : undefined;

    // If used as a link
    if (as === 'a' || href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          download={download}
          className={baseClasses}
          style={style}
          title={tooltip || title}
          id={id}
          role={role}
          tabIndex={disabled && !allowFocusWhenDisabled ? -1 : tabIndex}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-disabled={disabled || ariaDisabled}
          onClick={
            disabled
              ? undefined
              : (onClick as React.MouseEventHandler<HTMLAnchorElement>)
          }
          onBlur={handleAnchorBlur}
          onFocus={handleAnchorFocus}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled && !allowFocusWhenDisabled}
        autoFocus={autoFocus}
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        name={name}
        value={value}
        className={baseClasses}
        style={style}
        title={tooltip || title}
        id={id}
        role={role}
        tabIndex={disabled && !allowFocusWhenDisabled ? -1 : tabIndex}
        // WAI-ARIA Attributes
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        aria-controls={ariaControls}
        aria-owns={ariaOwns}
        aria-activedescendant={ariaActivedescendant}
        aria-atomic={ariaAtomic}
        aria-autocomplete={ariaAutocomplete}
        aria-busy={ariaBusy || loading}
        aria-checked={ariaChecked}
        aria-colcount={ariaColcount}
        aria-colindex={ariaColindex}
        aria-colspan={ariaColspan}
        aria-current={ariaCurrent}
        aria-details={ariaDetails}
        aria-disabled={disabled || ariaDisabled}
        aria-dropeffect={ariaDropeffect}
        aria-errormessage={ariaErrormessage}
        aria-flowto={ariaFlowto}
        aria-grabbed={ariaGrabbed}
        aria-hidden={ariaHidden}
        aria-invalid={ariaInvalid}
        aria-keyshortcuts={ariaKeyshortcuts}
        aria-live={ariaLive}
        aria-modal={ariaModal}
        aria-multiline={ariaMultiline}
        aria-multiselectable={ariaMultiselectable}
        aria-orientation={ariaOrientation}
        aria-placeholder={ariaPlaceholder}
        aria-posinset={ariaPosinset}
        aria-pressed={ariaPressed}
        aria-readonly={ariaReadonly}
        aria-relevant={ariaRelevant}
        aria-required={ariaRequired}
        aria-roledescription={ariaRoledescription}
        aria-rowcount={ariaRowcount}
        aria-rowindex={ariaRowindex}
        aria-rowspan={ariaRowspan}
        aria-selected={ariaSelected}
        aria-setsize={ariaSetsize}
        aria-sort={ariaSort}
        aria-valuemax={ariaValuemax}
        aria-valuemin={ariaValuemin}
        aria-valuenow={ariaValuenow}
        aria-valuetext={ariaValuetext}
        // Event Handlers
        onClick={disabled ? undefined : onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchCancel}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragExit={onDragExit}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDrop={onDrop}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
