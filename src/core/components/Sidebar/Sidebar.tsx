import React from "react";
import styles from "./Sidebar.module.css";
import { Resolver } from "@/core/types/types";
import { BlockWrapper } from "../Blocks/BlockWrapper";
import { GripVertical } from "../Icons/GripVertical";
const Sidebar = ({ resolver }: { resolver: Resolver }) => {
  //   console.log("blocks", Object.values(resolver));
  return (
    <aside className={styles.sidebar}>
      {/* Sidebar */}
      <h2 className={styles.sidebar_header}>BLOCKS</h2>
      <div className={styles.sidebar_blocks_container}>
        {blocks.map((block, index) => (
          <BlockWrapper key={index} isNew={true} type={block.name}>
            <div className={styles.sidebar_block}>
              <GripVertical fill="#D4D4D4" />
              <div>{block.name}</div>
            </div>
          </BlockWrapper>
        ))}
      </div>
    </aside>
  );
};

export { Sidebar };

const blocks = [
  {
    name: "Label",
  },
  {
    name: "Input",
  },
  {
    name: "Button",
  },
];
