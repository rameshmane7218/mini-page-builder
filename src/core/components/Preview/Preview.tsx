import { Resolver } from "@/core/types/types";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DndContext, XYCoord, useDrop } from "react-dnd";
import Frame, { FrameContext } from "react-frame-component";
import styles from "./Preview.module.css";
const Preview = ({
  resolver,
  blocks,
  onChange,
}: {
  resolver: Resolver;
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
}) => {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const iframeRef: React.RefObject<HTMLIFrameElement> = useRef(null);
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: Object.keys(resolver),
      drop: (item: any, monitor) => {
        if (item != undefined && item?.type && item?.isNew) {
          onChange([
            ...blocks,
            {
              name: item?.type,
              ...(monitor.getSourceClientOffset() ? monitor.getSourceClientOffset() : {}),
            },
          ]);
        } else {
          let updatedBlocks = [...blocks];
          if (updatedBlocks[item.blockId]) {
            updatedBlocks[item.blockId] = {
              ...updatedBlocks[item.blockId],
              ...(monitor.getSourceClientOffset() ? monitor.getSourceClientOffset() : {}),
            };
            onChange([...updatedBlocks]);
          }
        }
        return { name: "Preview" };
      },
      collect: (monitor) => {
        // console.log("monitor", monitor.getItem(), monitor.getClientOffset());
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [blocks],
  );

  const handleDeleteElement = useCallback(
    (blockId: number | undefined) => {
      if (blockId != undefined && blocks[blockId] != undefined) {
        let newBlocks = [...blocks];
        newBlocks.splice(blockId, 1);
        onChange([...newBlocks]);
        setSelected(undefined);
      }
    },
    [selected, blocks],
  );

  return (
    <div className={styles.preview}>
      <Frame
        ref={iframeRef}
        style={{ width: "100%", height: "100%" }}
        className={styles.frame}
        initialContent={`<!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,500;1,600;1,700;1,800&display=swap");
              html,body,.frame-content {
                height: 100%;
                width: 100%;
                margin: 0;
              } 
              body{
                background: #F3F3F3;
                font-family: "Open Sans", sans-serif;
              }
            </style>
          </head>
          <body><div id="mountHere" style="height:100%"></div></body>
        </html>`}>
        <FrameBindingContext>
          <div
            style={{ overflow: "hidden", clear: "both", height: "100%" }}
            onKeyDown={(event) => {
              if ((event.metaKey && event.key === "Backspace") || event.key == "Delete") {
                handleDeleteElement(selected);
              } else {
                //   TODO: Handle Edit
              }
            }}
            tabIndex={0}>
            <div
              ref={drop}
              id="previewPannel"
              style={{
                position: "relative",
                height: "100%",
                minHeight: "100px",
              }}
              onClick={(e) => {
                let target = e.target as typeof e.target & {
                  id: string;
                };
                if (target.id == "previewPannel") {
                  setSelected(undefined);
                }
              }}>
              {blocks.map((block, index) => {
                const Element = resolver[block?.name] as React.FunctionComponent<any>;
                return (
                  <Element
                    key={index}
                    isNew={false}
                    blockId={index}
                    isSelected={selected == index}
                    wrapperStyle={{
                      position: "absolute",
                      top: block.y,
                      left: block.x,
                    }}
                    onMouseDown={(e: any) => {
                      setSelected(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </FrameBindingContext>
      </Frame>
    </div>
  );
};

export { Preview };

const FrameBindingContext = ({ children }: { children: React.ReactNode }) => {
  const { dragDropManager } = useContext(DndContext);
  //@ts-ignore
  const { window } = useContext(FrameContext);
  useEffect(() => {
    //@ts-ignore
    dragDropManager?.getBackend().addEventListeners(window);
  }, []);

  return <>{children}</>;
};
