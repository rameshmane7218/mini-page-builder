import { cn } from "@/utils/cn";
import React, { FC, forwardRef } from "react";
import styles from "./Input.module.css";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSelected?: boolean;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, step = "any", ...rest }, ref) => {
    return (
      <input ref={ref} className={cn(styles.input, className)} step={step} {...rest} />
    );
  },
);

export { Input };
