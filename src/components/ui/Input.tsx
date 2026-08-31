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
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-slate-400 pointer-events-none shrink-0">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-white border text-slate-900 placeholder:text-slate-400 text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all duration-200 shadow-sm",
              "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-rose-300 focus:border-rose-500 focus:ring-rose-100",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-slate-400 shrink-0">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
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
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full bg-white border text-slate-900 placeholder:text-slate-400 text-sm rounded-xl p-3.5 outline-none transition-all duration-200 resize-y shadow-sm",
            "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100",
            error && "border-rose-300 focus:border-rose-500 focus:ring-rose-100",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
