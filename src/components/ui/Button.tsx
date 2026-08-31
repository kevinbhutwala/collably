import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "accent" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5 font-medium",
      md: "text-sm px-4 py-2.5 rounded-xl gap-2 font-medium",
      lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold",
      icon: "p-2.5 rounded-xl",
    };

    const variantStyles = {
      primary:
        "bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200/80 border border-slate-200",
      outline:
        "bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 shadow-sm",
      ghost:
        "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
      glass:
        "bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm",
      accent:
        "bg-gradient-to-r from-brand-accent to-orange-500 text-white hover:opacity-95 shadow-md shadow-brand-accent/25",
      danger:
        "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
