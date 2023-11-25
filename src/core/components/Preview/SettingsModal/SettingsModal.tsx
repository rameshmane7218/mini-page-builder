import { Button } from "@/components/Button/Button";
import { Divider } from "@/components/Divider/Divider";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/Modal/Modal";
import { Resolver } from "@/core/types/types";
import React, { SyntheticEvent, memo, useCallback, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
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
}
const SettingsModal = memo(
  ({ isOpen, onClose, resolver, currentBlock, onChange }: SettingsModalProps) => {
    const handleOnSubmitForm = (event: SyntheticEvent) => {
      event.preventDefault();
      console.log("formSubmitted");
    };

    useEffect(() => {
      console.log("block Item", currentBlock);
    }, [currentBlock]);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleOnSubmitForm}>
          <ModalHeader className={styles.header}>
            <h2>Edit Label</h2>
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

          <ModalBody>
            <InputWrapper>
              <Label>X</Label>
              <Input type="text" />
            </InputWrapper>
          </ModalBody>

          <ModalFooter className={styles.footer}>
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
    <div className={cn(styles.input_wrapper, className)} {...rest}>
      {children}
    </div>
  );
};
