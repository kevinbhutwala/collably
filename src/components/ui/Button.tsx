import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "accent" | "danger" | "carbon" | "micro";
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
      "inline-flex items-center justify-center font-semibold transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] font-sans";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 rounded-[9px] gap-1.5",
      md: "text-xs px-4 py-2.5 rounded-[9px] gap-2",
      lg: "text-sm px-6 py-3.5 rounded-[9px] gap-2.5",
      icon: "p-2.5 rounded-[9px]",
    };

    const variantStyles = {
      primary:
        "bg-[#111111] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] shadow-xs",
      secondary:
        "bg-[#FFFFFF] hover:bg-[#F4F4F0] text-[#111111] border border-[#E7E7E4] shadow-xs",
      outline:
        "bg-transparent text-[#111111] border border-[#E7E7E4] hover:bg-[#F4F4F0]",
      ghost:
        "bg-transparent text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F4F4F0]",
      glass:
        "bg-white/80 backdrop-blur-md text-[#111111] border border-[#E7E7E4] hover:bg-white shadow-xs",
      accent:
        "bg-[#B7FF3C] text-[#111111] hover:bg-[#9EE61C] border border-[#9EE61C] shadow-xs font-bold",
      carbon:
        "bg-[#111111] text-[#FAFAF8] hover:bg-[#262626]",
      micro:
        "bg-[#B7FF3C] text-[#111111] hover:bg-[#9EE61C] font-bold shadow-xs",
      danger:
        "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] hover:bg-[#FCA5A5]",
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
