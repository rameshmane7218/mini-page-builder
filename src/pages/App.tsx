import React from "react";
import "@/styles/App.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Editor } from "@/core/components/Editor/Editor";
import { Label } from "@/core/components/Blocks/Label/Label";
import { Button } from "@/core/components/Blocks/Button/Button"

function App() {
  const [value, setValue] = useLocalStorage<Record<string, any>[]>("data", [])

  return (
    <div className="App">
      <Editor resolver={{ Label, Button }} blocks={value} onChange={(blocks) => {
        setValue(blocks)
      }}></Editor>
    </div>
  );
}

export default App;
