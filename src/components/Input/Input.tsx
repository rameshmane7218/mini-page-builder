import { cn } from "@/utils/cn";
import React, { FC, forwardRef } from "react";
import styles from "./Input.module.css";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSelected?: boolean;
}
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={cn(styles.label, className)} {...rest} />;
  },
);

export { Input };
