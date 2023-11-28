import { UserComponent } from "@/core/types/types";
import React, { CSSProperties } from "react";
interface props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  text: string;
  isSelected?: boolean;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
}
const Label: UserComponent<props> = (props) => {
  const {
    text = "This is a Label",
    fontSize,
    fontWeight,
    isSelected,
    style,
    ...rest
  } = props;
  return (
    <label
      style={{
        ...style,
        cursor: isSelected ? "inherit" : style?.cursor,
        fontSize: fontSize || 16,
        fontWeight,
      }}
      {...rest}>
      {text}
    </label>
  );
};

Label.craft = {
  props: {
    text: "This is a Label",
    fontSize: "",
    fontWeight: "",
  },
  name: "Label",
  order: 1,
};

export { Label };
