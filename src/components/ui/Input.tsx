import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, icon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-white/80"
          >
            {label}
          </label>
        )}

        <div className="relative rounded-xl">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-xl bg-white/[0.05] border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 transition-all",
              "focus:outline-none focus:border-[#2A5CFF] focus:ring-1 focus:ring-[#2A5CFF] focus:bg-white/[0.08]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon ? "pl-9" : "",
              error ? "border-red-500/80 focus:border-red-500 focus:ring-red-500" : "",
              className
            )}
            {...props}
          />
        </div>

        {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
        {hint && !error && <p className="text-[11px] text-white/50">{hint}</p>}
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
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-white/80"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full rounded-xl bg-white/[0.05] border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 transition-all",
            "focus:outline-none focus:border-[#2A5CFF] focus:ring-1 focus:ring-[#2A5CFF] focus:bg-white/[0.08]",
            "disabled:opacity-50 disabled:cursor-not-allowed resize-y",
            error ? "border-red-500/80 focus:border-red-500 focus:ring-red-500" : "",
            className
          )}
          {...props}
        />

        {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
        {hint && !error && <p className="text-[11px] text-white/50">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
