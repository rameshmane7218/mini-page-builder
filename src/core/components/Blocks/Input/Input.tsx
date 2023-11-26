import { UserComponent } from "@/core/types/types";
import React, { CSSProperties } from "react";
interface props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isSelected?: boolean;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
}
const Input: UserComponent<props> = (props) => {
  const { isSelected, defaultValue = "", fontSize, fontWeight, style, ...rest } = props;
  return (
    <input
      style={{
        ...style,
        cursor: isSelected ? "inherit" : style?.cursor,
        background: "white",
        padding: "12px",
        border: "none",
        outline: "none",
        fontSize: fontSize || 16,
        fontWeight,
      }}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

Input.craft = {
  props: {
    defaultValue: "This is a Input box",
    fontSize: "",
    fontWeight: "",
  },
};

export { Input };
