import { UserComponent } from "@/core/types/types";
import React from "react";
interface props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isSelected?: boolean;
}
const Input: UserComponent<props> = (props) => {
  const { isSelected, style, ...rest } = props;
  return (
    <input
      style={{
        ...style,
        cursor: isSelected ? "inherit" : style?.cursor,
        background: "white",
        padding: "12px",
        border: "none",
        outline: "none",
        //   color: "white",
      }}
      {...rest}
    />
  );
};

export { Input };
