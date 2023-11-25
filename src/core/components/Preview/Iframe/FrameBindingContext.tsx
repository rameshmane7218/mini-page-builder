import { memo, useContext, useEffect } from "react";
import { DndContext } from "react-dnd";
import { FrameContext } from "react-frame-component";

const FrameBindingContext = memo(({ children }: { children: React.ReactNode }) => {
  const { dragDropManager } = useContext(DndContext);
  //@ts-ignore
  const { window } = useContext(FrameContext);
  useEffect(() => {
    //@ts-ignore
    dragDropManager?.getBackend().addEventListeners(window);
  }, [dragDropManager, window]);

  useEffect(() => {
    if (window && window.document.head) {
      const iframeHead = window.document.head;
      // Get all child nodes of the main window head
      const mainHeadChildNodes = document.head.childNodes;

      if (iframeHead.children.length <= 2) {
        // Append each child node to the iframe head
        mainHeadChildNodes.forEach((node) => {
          iframeHead.appendChild(node.cloneNode(true));
        });
      }
    }
  }, [window]);

  return <>{children}</>;
});

export { FrameBindingContext };
