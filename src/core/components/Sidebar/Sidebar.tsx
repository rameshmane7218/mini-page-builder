import React from "react";
import styles from "./Sidebar.module.css";
import { Resolver } from "@/core/types/types";
import { BlockWrapper } from "../Blocks/BlockWrapper";
import { GripVertical } from "../Icons/GripVertical";
const Sidebar = ({ resolver }: { resolver: Resolver }) => {
  return (
    <aside className={styles.sidebar}>
      {/* Sidebar */}
      <h2 className={styles.sidebar_header}>BLOCKS</h2>
      <div className={styles.sidebar_blocks_container}>
        {Object.values(resolver).map((block, index) => {
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
