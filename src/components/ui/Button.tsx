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
      sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5 font-medium",
      md: "text-sm px-4 py-2.5 rounded-xl gap-2 font-medium",
      lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold",
      icon: "p-2.5 rounded-xl",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-lg shadow-[hsl(327,100%,50%)]/25 hover:shadow-xl hover:shadow-[hsl(327,100%,50%)]/35 hover:brightness-110",
      secondary:
        "bg-white/10 text-white hover:bg-white/15 border border-white/10 shadow-xs",
      outline:
        "bg-transparent text-slate-200 border border-white/20 hover:border-[hsl(327,100%,50%)]/40 hover:text-white hover:bg-white/[0.04] shadow-xs",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.06]",
      glass:
        "bg-white/[0.06] backdrop-blur-md text-white border border-white/10 hover:bg-white/[0.12] hover:border-pink-500/30 shadow-xs",
      accent:
        "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white hover:brightness-110 shadow-lg shadow-pink-500/25",
      danger:
        "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
