import { UserComponent } from "@/core/types/types";
import React, { CSSProperties } from "react";
import { BlockWrapper } from "../BlockWrapper";
interface props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  wrapperStyle?: CSSProperties;
  text: string;
  isNew?: Boolean;
  isSelected?: Boolean;
  blockId?: string | number;
}
const Button: UserComponent<props> = (props) => {
  const {
    text = "Button",
    wrapperStyle,
    blockId,
    isSelected,
    isNew,
    style,
    ...rest
  } = props;
  return (
    <BlockWrapper
      type="Button"
      isNew={isNew}
      blockId={blockId}
      isSelected={isSelected}
      style={wrapperStyle}>
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
    </BlockWrapper>
  );
};

export { Button };
