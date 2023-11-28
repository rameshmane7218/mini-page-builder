import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Resolver } from "../types/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { sampleBlockLayout, validateItemStructure } from "@/utils/validator";
interface EditorContextProps {
  resolver: Resolver;
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
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
  const [localBlocks, setLocalBlocks] = useState<Record<string, any>[]>(storedValue);
  const [isValidated, setIsValidated] = useState(false);

  const handleOnChangeBlock = useCallback(
    (value: Record<string, any>[]) => {
      setValue(value);
      onChange(value);
      setLocalBlocks(value);
    },
    [storedValue, onChange, setValue, setLocalBlocks],
  );
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
      value={{ resolver, blocks: localBlocks, onChange: handleOnChangeBlock }}>
      {isValidated ? children : null}
    </EditorContext.Provider>
  );
};
