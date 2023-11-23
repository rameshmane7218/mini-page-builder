import { Resolver } from "@/core/types/types";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DndContext, useDrop } from "react-dnd";
import Frame, { FrameContext } from "react-frame-component";
import styles from "./Preview.module.css";
import { v4 as uuidv4 } from "uuid";
import { BlockWrapper } from "../Blocks/BlockWrapper";
import { iframeInitialContent } from "./iframeInitialContent";
const Preview = ({
  resolver,
  blocks,
  onChange,
}: {
  resolver: Resolver;
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
}) => {
  const [isDraggingBlock, setIsDraggingBlock] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const iframeRef: React.RefObject<HTMLIFrameElement> = useRef(null);
  const [, drop] = useDrop(
    () => ({
      accept: Object.keys(resolver),
      drop: (item: any, monitor) => {
        if (item != undefined && item?.blockType && item?.isNew) {
          /**
           * If Block is new then it will add
           */
          onChange([
            ...blocks,
            {
              id: uuidv4(),
              blockType: item?.blockType,
              settings: {
                ...(monitor.getSourceClientOffset()
                  ? monitor.getSourceClientOffset()
                  : {}),
              },
            },
          ]);
        } else {
          /**
           * If Block is not new and it has blockId then it will update that block
           */
          let updatedBlocks = [...blocks].map((block) => {
            if (block?.id == item.blockId) {
              block = {
                ...block,
                settings: {
                  ...(block?.settings || {}),
                  ...(monitor.getSourceClientOffset()
                    ? monitor.getSourceClientOffset()
                    : {}),
                },
              };
            }
            return block;
          });
          onChange([...updatedBlocks]);
        }
        // return { name: "Preview" };
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [blocks, onChange],
  );

  const handleSetIsDraggingBlock = useCallback(
    (value: boolean) => {
      setIsDraggingBlock(value);
    },
    [isDraggingBlock],
  );

  const handleDeleteElement = useCallback(
    (blockId: number | null) => {
      let updatedBlocks = [...blocks].filter((block) => block?.id !== blockId);
      onChange([...updatedBlocks]);
      setSelected(null);
    },
    [selected, blocks, onChange],
  );


  useEffect(() => {
    if (iframeRef.current) {
      const contentDocument = iframeRef.current.contentDocument;
      if (isDraggingBlock) {
        contentDocument?.body.classList.add("grabbing");
      } else {
        contentDocument?.body.classList.remove("grabbing");
      }
      return () => {
        contentDocument?.body.classList.remove("grabbing");
      };
    }
  }, [isDraggingBlock]);

  return (
    <div className={styles.preview}>
      <Frame
        ref={iframeRef}
        style={{ width: "100%", height: "100%" }}
        className={styles.frame}
        initialContent={iframeInitialContent}>
        <FrameBindingContext>
          <div
            style={{
              overflow: "hidden",
              clear: "both",
              height: "100%",
              width: "100%",
            }}>
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
                  setSelected(null);
                }
              }}>
              {blocks.map((block, index) => {
                const Element = resolver[
                  block?.blockType
                ] as React.FunctionComponent<any>;
                return (
                  <BlockWrapper
                    key={index}
                    isNew={false}
                    blockType={block.blockType}
                    blockId={block.id}
                    isSelected={selected === block.id}
                    style={{
                      position: "absolute",
                      top: block?.settings?.y,
                      left: block?.settings?.x,
                    }}
                    onMouseDown={() => {
                      setSelected(block.id);
                    }}
                    handleSetIsDraggingBlock={handleSetIsDraggingBlock}
                    onKeyDown={(event) => {
                      console.log("onKeyDown", event);
                      if (
                        (event.metaKey && event.key === "Backspace") ||
                        event.key == "Delete"
                      ) {
                        handleDeleteElement(selected);
                      } else {
                        //   TODO: Handle Edit
                      }
                    }}
                    tabIndex={0}>
                    <Element isSelected={selected === block.id} />
                  </BlockWrapper>
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
