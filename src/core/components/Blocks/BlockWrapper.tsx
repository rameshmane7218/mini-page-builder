import type { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";

const style: CSSProperties = {
  display: "inline-block",
  border: "1px solid transparent",
  //   backgroundColor: "white",
  //   cursor: "move",
  //   float: "left",
  //   position: "absolute",
  borderRadius: 4,
  overflow: "hidden",
};

export interface BoxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  type: string;
  isNew?: Boolean;
  isSelected?: Boolean;
  blockId?: string | number;
}

interface DropResult {
  type: string;
  isNew: Boolean | undefined;
}

export const BlockWrapper: FC<BoxProps> = function Box({
  children,
  type,
  blockId,
  isSelected,
  isNew = true,
  style: wrapperStyle = {},
  ...rest
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { type, isNew, blockId },
      options: {
        dropEffect: isNew ? "copy" : "move",
      },
      //   end: (item, monitor) => {
      //     const dropResult = monitor.getDropResult<DropResult>();
      //   },
      previewOptions: {
        captureDraggingState: true,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [type]
  );

  const opacity = isDragging && !isNew ? 0.4 : 1;
  const cursor = isDragging ? "grabbing" : "grab";
  const borderRadius = isDragging ? "4px" : wrapperStyle.borderRadius;
  return (
    <>
      <div
        // ref={!isNew && !isSelected ? undefined : drag}
        ref={drag}
        style={{
          ...style,
          opacity,
          cursor: cursor,
          ...wrapperStyle,
          borderRadius,
          border: isSelected
            ? "1px solid red"
            : !isNew
            ? "1px solid transparent"
            : "none",
        }}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};
