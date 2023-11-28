import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/Modal/Modal";
import { Resolver } from "@/core/types/types";
import React, { ChangeEvent, SyntheticEvent, memo, useEffect, useState } from "react";
import { CloseIcon } from "../../Icons/CloseIcon";

import styles from "./SettingsModal.module.css";
import { Label } from "@/components/Label/Label";
import { Input } from "@/components/Input/Input";
import { cn } from "@/utils/cn";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  resolver: Resolver;
  currentBlock: Record<string, any>;
  onChange: (block: Record<string, any>) => void;
  dropDimentions: { width?: number; height?: number };
}
const SettingsModal = memo(
  ({
    isOpen,
    onClose,
    resolver,
    currentBlock,
    onChange,
    dropDimentions,
  }: SettingsModalProps) => {
    const [blockSettings, setBlockSettings] = useState<Record<string, any>>({
      ...(currentBlock?.settings || {}),
    });

    const handleOnChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = event.target;

      setBlockSettings((prev) => {
        return { ...prev, [name]: type === "number" ? Number(value) : value };
      });
    };

    const handleOnSubmitForm = (event: SyntheticEvent) => {
      event.preventDefault();
      onChange({ ...currentBlock, settings: { ...blockSettings } });
    };

    useEffect(() => {
      if (isOpen) {
        let defaultSettings =
          (resolver[currentBlock.blockType] as any).craft?.props || {};
        console.log("current", defaultSettings);
        let initialBlockSettings = {
          ...defaultSettings,
          ...(currentBlock?.settings || {}),
        };
        const reorderedObj = Object.fromEntries(
          order
            .filter((key) => initialBlockSettings.hasOwnProperty(key))
            .map((key) => [key, initialBlockSettings[key]]),
        );
        setBlockSettings(reorderedObj);
      }
    }, [currentBlock, isOpen, resolver]);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleOnSubmitForm}>
          <ModalHeader className={styles.form_header}>
            <h2>
              {currentBlock.id !== undefined ? "Edit" : "Add"}{" "}
              {currentBlock?.blockType || ""}
            </h2>
            <Button
              variant="icon"
              onClick={() => {
                onClose();
              }}
              style={{ fontSize: "21px" }}>
              <CloseIcon />
            </Button>
          </ModalHeader>
          <Divider style={{ opacity: "0.07" }} />

          <ModalBody className={cn(styles.form_body)}>
            {Object.entries(blockSettings || {}).map(([name, value], index) => (
              <InputWrapper key={index}>
                <Label>{getInputName[name]}</Label>
                <Input
                  name={name as string}
                  type={inputTypeFromName[name] || "text"}
                  value={value as string}
                  onChange={handleOnChangeForm}
                  {...(name === "x" && dropDimentions.width
                    ? { min: 0, max: dropDimentions.width }
                    : name === "y" && dropDimentions.height
                    ? { min: 0, max: dropDimentions.height }
                    : {})}
                />
              </InputWrapper>
            ))}
          </ModalBody>

          <ModalFooter className={styles.form_footer}>
            <Button type="submit">Save Changes</Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  },
);

export { SettingsModal };

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}
const InputWrapper = ({ children, className, ...rest }: InputWrapperProps) => {
  return (
    <div className={cn(styles.form_input_wrapper, className)} {...rest}>
      {children}
    </div>
  );
};

const inputTypeFromName = {
  x: "number",
  y: "number",
  fontSize: "number",
  fontWeight: "number",
  defaultValue: "text",
  text: "text",
} as Record<string, string>;

const getInputName = {
  x: "X",
  y: "Y",
  text: "Text",
  fontSize: "Font Size",
  fontWeight: "Font Weight",
  color: "Color",
  defaultValue: "Input Text",
} as Record<string, string>;

const order = ["text", "defaultValue", "x", "y", "fontSize", "fontWeight"];
