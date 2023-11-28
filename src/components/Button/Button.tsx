import React, { FC, forwardRef } from "react";
import styles from "./Button.module.css";
import { cn } from "@/utils/cn";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "icon" | "outline";
}
const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className = "", type = "button", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, styles[`button_${variant}`], className)}
        type={type}
        {...rest}>
        {children}
      </button>
    );
  },
);

export { Button };
