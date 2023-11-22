import { UserComponent } from "@/core/types/types";
import React, { CSSProperties } from "react";
import { BlockWrapper } from "../BlockWrapper";
interface props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  wrapperStyle?: CSSProperties;
  text: string;
  isNew?: Boolean;
  isSelected?: Boolean;
  blockId?: string | number;
}
const Input: UserComponent<props> = (props) => {
  const {
    type,
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
      type="Input"
      isNew={isNew}
      blockId={blockId}
      isSelected={isSelected}
      style={wrapperStyle}>
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
        type={type}
        {...rest}
      />
    </BlockWrapper>
  );
};

export { Input };
