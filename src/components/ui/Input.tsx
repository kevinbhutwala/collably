import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, icon, rightElement, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 font-sans text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-[#0A0A0E] tracking-tight"
          >
            {label}
          </label>
        )}

        <div className="relative rounded-2xl">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A7A8A]">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-2xl bg-[#F8F8FC] border border-black/10 px-3.5 py-3 text-sm text-[#0A0A0E] placeholder:text-[#8A8A98] transition-all",
              "focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/30 focus:bg-white shadow-2xs",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon ? "pl-10" : "",
              rightElement ? "pr-10" : "",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30" : "",
              className
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && <p className="text-[11px] font-semibold text-red-600">{error}</p>}
        {hint && !error && <p className="text-[11px] text-[#6A6A78]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 font-sans text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-bold text-[#0A0A0E] tracking-tight"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full rounded-2xl bg-[#F8F8FC] border border-black/10 px-3.5 py-3 text-sm text-[#0A0A0E] placeholder:text-[#8A8A98] transition-all",
            "focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/30 focus:bg-white shadow-2xs",
            "disabled:opacity-50 disabled:cursor-not-allowed resize-y",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30" : "",
            className
          )}
          {...props}
        />

        {error && <p className="text-[11px] font-semibold text-red-600">{error}</p>}
        {hint && !error && <p className="text-[11px] text-[#6A6A78]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
