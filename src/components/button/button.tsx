"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./button.module.css";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClass: Record<string, string> = {
  default: styles["variant-default"],
  outline: styles["variant-outline"],
  ghost: styles["variant-ghost"],
};

const sizeClass: Record<string, string> = {
  sm: styles["size-sm"],
  md: "", // base already medium
  lg: styles["size-lg"],
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild,
      loading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          styles.buttonBase,
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        {...props}>
        {loading && (
          <Loader2
            className={cn("animate-spin", styles["icon-left"])}
            size={16}
          />
        )}
        {!loading && leftIcon && (
          <span className={styles["icon-left"]}>{leftIcon}</span>
        )}
        <span>{children}</span>
        {rightIcon && <span className={styles["icon-right"]}>{rightIcon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;
