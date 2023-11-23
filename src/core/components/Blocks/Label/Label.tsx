import { UserComponent } from "@/core/types/types";
import React from "react";
interface props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  text: string;
  isSelected?: boolean;
}
const Label: UserComponent<props> = (props) => {
  const { text = "This is a Label", isSelected, style, ...rest } = props;
  return (
    <label style={{ ...style, cursor: isSelected ? "inherit" : style?.cursor }} {...rest}>
      {text}
    </label>
  );
};

export { Label };
