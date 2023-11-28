import styles from "./Editor.module.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { Preview } from "../Preview/Preview";
import Header from "../Header/Header";
import { EditorContextProvider, EditorProviderProps } from "@/core/context/EditorContext";
const Editor = ({ resolver }: Omit<EditorProviderProps, "children">) => {
  return (
    <EditorContextProvider resolver={resolver}>
      <div className={styles.editor}>
        <Header />
        <div className={styles.pannel}>
          {/* Preview Pannel */}
          <Preview />
          <Sidebar />
        </div>
      </div>
    </EditorContextProvider>
  );
};

export { Editor };
