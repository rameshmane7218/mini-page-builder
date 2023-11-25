import React, { CSSProperties } from "react";
interface DividerProps {
  height?: CSSProperties["height"];
  color?: CSSProperties["background"];
  style?: CSSProperties;
  className?: string;
}
const Divider = ({
  height = "1px",
  color: background = "black",
  style = {},
  className = "",
  ...rest
}: DividerProps) => {
  return (
    <div
      style={{ ...style, height, background: background }}
      className={className}
      {...rest}></div>
  );
};

export { Divider };
