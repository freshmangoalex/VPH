import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const glowButtonVariants = cva(
  "relative overflow-hidden group inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        purple: "bg-purple-700 text-white hover:bg-purple-800",
        pink: "bg-pink-600 text-white hover:bg-pink-700",
        blue: "bg-blue-600 text-white hover:bg-blue-700",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      glow: {
        default: "",
        subtle: "",
        strong: "",
        pulse: "",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      glow: "default",
    },
    compoundVariants: [
      // Purple glow variants
      {
        variant: "purple",
        glow: "default",
        className: "shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]",
      },
      {
        variant: "purple",
        glow: "subtle",
        className: "shadow-[0_0_10px_rgba(147,51,234,0.3)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]",
      },
      {
        variant: "purple",
        glow: "strong",
        className: "shadow-[0_0_20px_rgba(147,51,234,0.7)] hover:shadow-[0_0_35px_rgba(147,51,234,0.9)] transition-shadow duration-400",
      },
      {
        variant: "purple",
        glow: "pulse",
        className: "animate-glow-pulse-purple shadow-[0_0_20px_rgba(147,51,234,0.7)]",
      },

      // Pink glow variants
      {
        variant: "pink",
        glow: "default",
        className: "shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]",
      },
      {
        variant: "pink",
        glow: "subtle",
        className: "shadow-[0_0_10px_rgba(236,72,153,0.3)] hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
      },
      {
        variant: "pink",
        glow: "strong",
        className: "shadow-[0_0_20px_rgba(236,72,153,0.7)] hover:shadow-[0_0_35px_rgba(236,72,153,0.9)] transition-shadow duration-400",
      },
      {
        variant: "pink",
        glow: "pulse",
        className: "animate-glow-pulse-pink shadow-[0_0_20px_rgba(236,72,153,0.7)]",
      },

      // Blue glow variants
      {
        variant: "blue",
        glow: "default",
        className: "shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]",
      },
      {
        variant: "blue",
        glow: "subtle",
        className: "shadow-[0_0_10px_rgba(37,99,235,0.3)] hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]",
      },
      {
        variant: "blue",
        glow: "strong",
        className: "shadow-[0_0_20px_rgba(37,99,235,0.7)] hover:shadow-[0_0_35px_rgba(37,99,235,0.9)] transition-shadow duration-400",
      },
      {
        variant: "blue",
        glow: "pulse",
        className: "animate-glow-pulse-blue shadow-[0_0_20px_rgba(37,99,235,0.7)]",
      },

      // Default primary glow variants
      {
        variant: "primary",
        glow: "default",
        className: "shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]",
      },
      {
        variant: "primary",
        glow: "subtle",
        className: "shadow-[0_0_10px_rgba(147,51,234,0.3)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]",
      },
      {
        variant: "primary",
        glow: "strong",
        className: "shadow-[0_0_20px_rgba(147,51,234,0.7)] hover:shadow-[0_0_35px_rgba(147,51,234,0.9)] transition-shadow duration-400",
      },
      {
        variant: "primary",
        glow: "pulse",
        className: "animate-glow-pulse-purple shadow-[0_0_20px_rgba(147,51,234,0.7)]",
      },
    ],
  }
);

export interface GlowButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {
  asChild?: boolean;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, glow, children, ...props }, ref) => {
    return (
      <button
        className={cn(glowButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      >
        {children}
        <span className="absolute inset-0 rounded-md pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.5)_0%,_rgba(255,255,255,0)_70%)]" />
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton, glowButtonVariants };
