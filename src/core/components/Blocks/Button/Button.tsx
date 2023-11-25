import { UserComponent } from "@/core/types/types";
import React, { CSSProperties } from "react";
interface props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  isSelected?: boolean;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
}
const Button: UserComponent<props> = (props) => {
  const { text = "Button", fontSize, fontWeight, isSelected, style, ...rest } = props;
  return (
    <button
      style={{
        ...style,
        cursor: isSelected ? "inherit" : style?.cursor,
        background: "var(--blue)",
        padding: "12px",
        border: "none",
        color: "white",
        fontSize,
        fontWeight,
      }}
      {...rest}>
      {text}
    </button>
  );
};

Button.craft = {
  props: {
    text: "Button",
    fontSize: "",
    fontWeight: "",
  },
};

export { Button };
