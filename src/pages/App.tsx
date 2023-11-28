import { useEffect, useState } from "react";
import "@/styles/App.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Editor } from "@/core/components/Editor/Editor";
import { Label } from "@/core/components/Blocks/Label/Label";
import { Button } from "@/core/components/Blocks/Button/Button";
import { Input } from "@/core/components/Blocks/Input/Input";
import { sampleBlockLayout, validateItemStructure } from "@/utils/validator";

function App() {
  const { storedValue, setValue } = useLocalStorage<Record<string, any>[]>("data", []);
  const [isValidated, setIsValidated] = useState(false);
  useEffect(() => {
    if (
      !(
        Array.isArray(storedValue) &&
        storedValue.every((item) => validateItemStructure(item, sampleBlockLayout[0]))
      )
    ) {
      setValue([]);
    }
    setIsValidated(true);
    return () => {
      setIsValidated(false);
    };
  }, [setValue]);

  return (
    <div className="App">
      {isValidated && (
        <Editor
          resolver={{ Label, Button, Input }}
          blocks={storedValue}
          onChange={(blocks) => {
            setValue(blocks);
          }}></Editor>
      )}
    </div>
  );
}

export default App;
