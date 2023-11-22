import { UserComponent } from "@/core/types/types";
import React, { CSSProperties } from "react";
import { BlockWrapper } from "../BlockWrapper";
interface props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  wrapperStyle?: CSSProperties;
  text: string;
  isNew?: Boolean;
  isSelected?: Boolean;
  blockId?: string | number;
}
const Label: UserComponent<props> = (props) => {
  const {
    text = "This is Label",
    isSelected,
    wrapperStyle,
    blockId,
    isNew,
    style,
    ...rest
  } = props;
  return (
    <BlockWrapper
      type="Label"
      isNew={isNew}
      blockId={blockId}
      isSelected={isSelected}
      style={wrapperStyle}
    >
      <label
        style={{ ...style, cursor: isSelected ? "inherit" : style?.cursor }}
        {...rest}
      >
        {text}
      </label>
    </BlockWrapper>
  );
};

export { Label };
