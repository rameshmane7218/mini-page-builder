import styles from "./Editor.module.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { Resolver } from "@/core/types/types";
import { Preview } from "../Preview/Preview";
import Header from "../Header/Header";
const Editor = ({
  resolver,
  blocks,
  onChange,
}: {
  resolver: Resolver;
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
}) => {
  return (
    <div className={styles.editor}>
      <Header onChange={onChange} blocks={blocks} />
      <div className={styles.pannel}>
        {/* Preview Pannel */}
        <Preview resolver={resolver} onChange={onChange} blocks={blocks} />
        <Sidebar resolver={resolver}></Sidebar>
      </div>
    </div>
  );
};

export { Editor };
