import { UserComponent } from "@/core/types/types";
import React from "react";
interface props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  isSelected?: boolean;
}
const Button: UserComponent<props> = (props) => {
  const { text = "Button", isSelected, style, ...rest } = props;
  return (
    <button
      style={{
        ...style,
        cursor: isSelected ? "inherit" : style?.cursor,
        background: "var(--blue)",
        padding: "12px",
        border: "none",
        color: "white",
      }}
      {...rest}>
      {text}
    </button>
  );
};

export { Button };
