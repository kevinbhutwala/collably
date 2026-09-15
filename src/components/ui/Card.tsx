import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  className,
  glass = false,
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden bg-white dark:bg-[#12121A] border-[#E7E7E4] dark:border-white/10 shadow-xs text-[#111111] dark:text-[#F4F4F8]",
        hoverEffect && "hover:border-[#111111] dark:hover:border-white/30 hover:shadow-editorial hover:-translate-y-0.5",
        glass && "bg-white/90 dark:bg-[#12121A]/90 backdrop-blur-xl border-[#E7E7E4] dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 sm:p-6 pb-3 border-b border-[#E7E7E4] dark:border-white/10", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base sm:text-lg font-bold text-[#111111] dark:text-[#F4F4F8] tracking-tight font-display", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs sm:text-sm text-[#6B6B6B] dark:text-[#8E8EA4] mt-1 font-sans", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 sm:p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 sm:p-6 pt-3 border-t border-[#E7E7E4] dark:border-white/10 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}
