import styles from "./Sidebar.module.css";
import { BlockWrapper } from "../Blocks/BlockWrapper";
import { GripVertical } from "../Icons/GripVertical";
import { useEditor } from "@/core/context/EditorContext";
const Sidebar = () => {
  const { resolver } = useEditor();

  return (
    <aside className={styles.sidebar}>
      {/* Sidebar */}
      <h2 className={styles.sidebar_header}>BLOCKS</h2>
      <div className={styles.sidebar_blocks_container}>
        {Object.values(resolver)
          .sort((a, b) => {
            if (a.craft?.order !== undefined && b.craft?.order !== undefined) {
              return a.craft?.order - b.craft?.order;
            }
            return 0;
          })
          .map((block, index) => {
            const blockName = block?.craft?.name || "";

            return (
              <BlockWrapper key={index} isNew={true} blockType={blockName}>
                <div className={styles.sidebar_block}>
                  <GripVertical fill="#D4D4D4" />
                  <div>{blockName}</div>
                </div>
              </BlockWrapper>
            );
          })}
      </div>
    </aside>
  );
};

export { Sidebar };
