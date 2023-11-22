import { Resolver } from "@/core/types/types";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DndContext, useDrop } from "react-dnd";
import Frame, { FrameContext } from "react-frame-component";
import styles from "./Preview.module.css";
import { v4 as uuidv4 } from "uuid";
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
  const [, drop] = useDrop(
    () => ({
      accept: Object.keys(resolver),
      drop: (item: any, monitor) => {
        if (item != undefined && item?.type && item?.isNew) {
          onChange([
            ...blocks,
            {
              id: uuidv4(),
              blockType: item?.type,
              settings: {
                ...(monitor.getSourceClientOffset()
                  ? monitor.getSourceClientOffset()
                  : {}),
              },
            },
          ]);
        } else {
          let updatedBlocks = [...blocks];
          if (updatedBlocks[item.blockId]) {
            updatedBlocks[item.blockId] = {
              ...updatedBlocks[item.blockId],
              settings: {
                ...(updatedBlocks[item.blockId]?.settings || {}),
                ...(monitor.getSourceClientOffset()
                  ? monitor.getSourceClientOffset()
                  : {}),
              },
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
    [selected, blocks, onChange],
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
              :root {
                --sidebar: 326px;
              
                --black: #000000;
                --white: #ffffff;
                --gray-1: #f3f3f3;
                --gray-2: #d4d4d4;
                --gray-5: #d9d9d9;
                --gray-8: #595959;
                --gray-9: #262626;
                --gray-10: #2d2d2d;
                --blue: #0044c1;
                --border-block-active: #d95409;
              }
              html {
                font-size: 16px;
                font-style: normal;
                scroll-behavior: smooth;
              }
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                margin: 0;
              }
              
              @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,500;1,600;1,700;1,800&display=swap");
              html,body,.frame-content {
                height: 100%;
                width: 100%;
                margin: 0;
              } 
              body{
                background: var(--gray-1);
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
                const Element = resolver[
                  block?.blockType
                ] as React.FunctionComponent<any>;
                return (
                  <Element
                    key={index}
                    isNew={false}
                    blockId={index}
                    isSelected={selected == index}
                    wrapperStyle={{
                      position: "absolute",
                      top: block?.settings?.y,
                      left: block?.settings?.x,
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
  }, [dragDropManager, window]);

  return <>{children}</>;
};
