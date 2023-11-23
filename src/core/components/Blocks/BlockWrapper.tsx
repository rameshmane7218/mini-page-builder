import { memo, type CSSProperties, type FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import styles from "./BlockWrapper.module.css";
const style: CSSProperties = {
  display: "inline-block",
  border: "1px solid transparent",
  overflow: "hidden",
};

export interface BlockWrapperProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  blockType: string;
  isNew?: boolean;
  isSelected?: boolean;
  blockId?: string | number;
  handleSetIsDraggingBlock?: (value: boolean) => void;
}

export const BlockWrapper: FC<BlockWrapperProps> = memo(function ({
  children,
  blockType,
  blockId,
  isSelected,
  isNew = false,
  style: wrapperStyle = {},
  handleSetIsDraggingBlock = () => undefined,
  className = "",
  ...rest
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: blockType,
      item: { blockType, isNew, blockId },
      collect: (monitor) => {
        const isDragging = monitor.isDragging();

        return {
          isDragging: isDragging,
          handlerId: monitor.getHandlerId(),
        };
      },
    }),
    [blockType, isNew, blockId],
  );

  const opacity = isDragging && !isNew ? 0.4 : 1;
  const cursor = isDragging ? "grabbing" : "grab";

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add("grabbing");
      handleSetIsDraggingBlock(true);
    } else {
      document.body.classList.remove("grabbing");
      handleSetIsDraggingBlock(false);
    }
    return () => {
      handleSetIsDraggingBlock(false);
    };
  }, [isDragging]);

  return (
    <div
      ref={drag}
      className={`${styles.block_wrapper} ${className}`}
      role="button"
      style={{
        ...style,
        opacity,
        cursor: cursor,
        ...wrapperStyle,
        border: isSelected
          ? "2px solid var(--border-block-active)"
          : !isNew
          ? "2px solid transparent"
          : "none",
      }}
      {...rest}>
      {children}
    </div>
  );
});
