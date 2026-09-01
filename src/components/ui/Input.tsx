import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#101010]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[#626262] pointer-events-none shrink-0">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] placeholder:text-[#8A8A8A] text-sm rounded-[9px] px-3.5 py-2.5 outline-none transition-all duration-150 shadow-xs",
              "focus:border-[#101010] focus:ring-1 focus:ring-[#101010] hover:border-[#D6D6D2]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 text-[#626262] shrink-0">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-[#FF3B30] font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#626262]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#101010]">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] placeholder:text-[#8A8A8A] text-sm rounded-[9px] p-3.5 outline-none transition-all duration-150 resize-y shadow-xs",
            "focus:border-[#101010] focus:ring-1 focus:ring-[#101010] hover:border-[#D6D6D2]",
            error && "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#FF3B30] font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#626262]">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
