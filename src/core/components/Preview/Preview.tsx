import { Resolver } from "@/core/types/types";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DndContext, useDrop } from "react-dnd";
import Frame, { FrameContext } from "react-frame-component";
import styles from "./Preview.module.css";
import { v4 as uuidv4 } from "uuid";
import { BlockWrapper } from "../Blocks/BlockWrapper";
import { iframeInitialContent } from "./Iframe/iframeInitialContent";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/Modal/Modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Divider } from "@/components/Divider/Divider";
import { Button } from "@/components/Button/Button";
import { FrameBindingContext } from "./Iframe/FrameBindingContext";
import { FaTimes } from "react-icons/fa";
import { SettingsModal } from "./SettingsModal/SettingsModal";

const Preview = ({
  resolver,
  blocks,
  onChange,
}: {
  resolver: Resolver;
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
}) => {
  const [currentBlock, setCurrentBlock] = useState<Record<string, any>>({});
  const { isOpen, onOpen, onClose } = useDisclosure(false);
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
          const newBlock = {
            id: uuidv4(),
            blockType: item?.blockType,
            settings: {
              ...(monitor.getSourceClientOffset() ? monitor.getSourceClientOffset() : {}),
            },
          };
          onChange([...blocks, newBlock]);
          setCurrentBlock(newBlock);
          onOpen();
        } else {
          /**
           * If Block is not new and it has blockId then it will update that block
           */
          // handleUpdateBlock(item.blockId)
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

  const handleSaveBlock = useCallback(
    (block: Record<string, any>) => {
      onChange([...blocks, { ...block, id: uuidv4() }]);
    },
    [blocks, onChange],
  );
  const handleUpdateBlock = useCallback(
    (updatedBlock: Record<string, any>) => {
      let updatedBlocks = [...blocks].map((block) => {
        if (block?.id == updatedBlock.id) {
          block = {
            ...updatedBlock,
          };
        }
        return block;
      });
      onChange([...updatedBlocks]);
    },
    [blocks, onChange],
  );

  const handleDeleteBlock = useCallback(
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
      <Button onClick={onOpen}>Open Modal</Button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted form");
        }}>
        <button type="button">normal click</button>
        <div
          onClick={() => {
            console.log("div click");
          }}>
          normal div click
        </div>
        <button type="submit">click</button>
      </form>
      <SettingsModal
        onClose={onClose}
        isOpen={isOpen}
        resolver={resolver}
        currentBlock={currentBlock}
        onChange={(block: Record<string, any>) => {
          if (block.id) {
            handleUpdateBlock(block);
          } else {
            handleSaveBlock(block);
          }
        }}
      />
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
            <Button onClick={() => onOpen()}>Open Modal</Button>
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
                        handleDeleteBlock(selected);
                      } else {
                        setCurrentBlock({ ...block });
                        onOpen();
                        //   TODO: Handle Edit
                      }
                    }}
                    tabIndex={selected === block.id && !isOpen ? 0 : -1}>
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
