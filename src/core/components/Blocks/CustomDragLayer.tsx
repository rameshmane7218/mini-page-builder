import { Resolver } from "@/core/types/types";
import type { CSSProperties, FC } from "react";
import type { XYCoord } from "react-dnd";
import { useDragLayer } from "react-dnd";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    display: "inline-block",
    border: "2px solid var(--border-block-active)",
    cursor: "grabbing",
  };
}

export interface CustomDragLayerProps {
  resolver: Resolver;
}

export const CustomDragLayer: FC<CustomDragLayerProps> = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  function renderItem() {
    if (item.blockPreview) {
      return <item.blockPreview />;
    } else if (props.resolver[itemType as any]) {
      let Element = props.resolver[itemType as any];

      return <Element />;
    }
    return null;
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>{renderItem()}</div>
    </div>
  );
};
