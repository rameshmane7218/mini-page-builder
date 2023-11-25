import { cn } from "@/utils/cn";
import React, { FC } from "react";
import styles from "./Label.module.css";
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isSelected?: boolean;
}
const Label: FC<LabelProps> = ({ children, className, ...rest }) => {
  return (
    <label className={cn(styles.label, className)} {...rest}>
      {children}
    </label>
  );
};

export { Label };
