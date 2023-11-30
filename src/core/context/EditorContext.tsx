import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Resolver } from "../types/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { sampleBlockLayout, validateItemStructure } from "@/utils/validator";
interface EditorContextProps {
  resolver: Resolver;
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
  handleUndo: () => void;
  handleRedo: () => void;
}

interface EditorData {
  mainData: Array<Record<string, any>[]>;
  currentIndex: number;
}

export interface EditorProviderProps {
  children: React.ReactNode;
  resolver?: Resolver;
  blocks?: Record<string, any>[];
  onChange?: (blocks: Record<string, any>[]) => void;
}

const defaultEditorContext = {
  blocks: [],
  onChange: () => undefined,
  resolver: {},
  handleUndo: () => undefined,
  handleRedo: () => undefined,
};
export const EditorContext =
  createContext<Omit<EditorContextProps, "children">>(defaultEditorContext);

export const useEditor = () => useContext(EditorContext);

export const EditorContextProvider = ({
  children,
  blocks = [],
  onChange = () => undefined,
  resolver = {},
}: EditorProviderProps): JSX.Element => {
  const { storedValue, setValue } = useLocalStorage<Record<string, any>[]>(
    "data",
    Array.isArray(blocks) ? blocks : [],
  );
  const { storedValue: editorData, setValue: setEditorData } =
    useLocalStorage<EditorData>("editorData", {
      mainData: [storedValue],
      currentIndex: 0,
    });

  const [localBlocks, setLocalBlocks] = useState<Record<string, any>[]>(storedValue);
  const [isValidated, setIsValidated] = useState(false);

  const handleOnChangeBlock = useCallback(
    (value: Record<string, any>[]) => {
      setValue(value);
      onChange(value);
      setLocalBlocks(value);
      setEditorData({
        ...editorData,
        mainData: [...editorData.mainData, value],
        currentIndex: editorData.currentIndex + 1,
      });
    },
    [storedValue, onChange, setValue, setLocalBlocks],
  );

  const handleUndo = () => {
    if (editorData.currentIndex > 0) {
      setEditorData({
        ...editorData,
        currentIndex: editorData.currentIndex - 1,
      });
    }
  };
  const handleRedo = () => {
    if (editorData.currentIndex < editorData.mainData.length - 1) {
      setEditorData({
        ...editorData,
        currentIndex: editorData.currentIndex + 1,
      });
    }
  };
  useEffect(() => {
    if (
      !(
        Array.isArray(storedValue) &&
        storedValue.every((item) => validateItemStructure(item, sampleBlockLayout[0]))
      )
    ) {
      setValue([]);
      setLocalBlocks([]);
    }
    setIsValidated(true);
    return () => {
      setIsValidated(false);
    };
  }, [setValue]);
  console.log("value", storedValue);
  return (
    <EditorContext.Provider
      value={{
        resolver,
        blocks: editorData?.mainData[editorData?.currentIndex] || [],
        onChange: handleOnChangeBlock,
        handleUndo,
        handleRedo,
      }}>
      {isValidated ? children : null}
    </EditorContext.Provider>
  );
};

const editorData = {
  mainData: [{}, {}, {}],
  currentIndex: 3,
};
