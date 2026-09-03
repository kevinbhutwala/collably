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
      "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD21F] focus-visible:ring-offset-2 font-sans";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
      md: "text-xs px-4 py-2.5 rounded-full gap-2",
      lg: "text-sm px-6 py-3.5 rounded-full gap-2.5",
      icon: "p-2.5 rounded-full",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:-translate-y-0.5 hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold shadow-[0_5px_16px_rgba(255,210,31,0.32)] hover:shadow-[0_9px_24px_rgba(255,210,31,0.42)] border border-black/10",
      secondary:
        "bg-gradient-to-r from-[#1E1E28] to-[#12121A] hover:from-[#282836] hover:to-[#1A1A24] text-white border border-[#FFD21F]/30 shadow-md",
      outline:
        "bg-white text-[#0A0A0E] border border-black/10 hover:border-[#D7A900] hover:bg-[#FFFDF4]",
      ghost:
        "bg-transparent text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/[0.045]",
      glass:
        "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/15 shadow-md",
      accent:
        "bg-[#FFD21F] text-[#0A0A0E] hover:bg-[#FFE052] border border-white/40 shadow-[0_0_15px_rgba(255,210,31,0.4)] font-bold",
      carbon:
        "bg-[#12121A] text-white hover:bg-[#1A1A24] border border-white/10",
      micro:
        "bg-[#FFD21F] text-[#0A0A0E] hover:bg-[#FFE052] font-bold shadow-xs",
      danger:
        "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
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
