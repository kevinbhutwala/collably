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
        "rounded-2xl border transition-all duration-200 overflow-hidden bg-[#120c16] border-white/10 shadow-card text-white",
        hoverEffect && "hover:border-[hsl(327,100%,50%)]/40 hover:shadow-glow hover:-translate-y-0.5",
        glass && "bg-[#120c16]/80 backdrop-blur-xl border-white/10",
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
    <div className={cn("p-6 pb-3 border-b border-white/10", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-bold text-white tracking-tight font-display", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-slate-400 mt-1", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-3 border-t border-white/10 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}
