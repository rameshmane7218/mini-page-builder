import React from "react";
import styles from "./Modal.module.css";
import { cn } from "@/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
}
interface ModalItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, closeOnOverlayClick, children }: ModalProps) => {
  return (
    <>
      <div
        aria-label="modal"
        className={cn(styles.modal, isOpen && styles.modal_open)}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const target = e.target as HTMLDivElement;
          if (target.getAttribute("aria-label") == "modal" && closeOnOverlayClick) {
            onClose();
          }
        }}>
        <div
          tabIndex={-1}
          aria-label="modal_content"
          className={cn(styles.modal_content, isOpen && styles.modal_content_open)}>
          {children}
        </div>
      </div>
    </>
  );
};

const ModalBody = ({ children, className, ...rest }: ModalItemProps) => {
  return (
    <div aria-label="modal_body" className={cn(styles.modal_body, className)} {...rest}>
      {children}
    </div>
  );
};
const ModalHeader = ({ children, className, ...rest }: ModalItemProps) => {
  return (
    <div
      aria-label="modal_header"
      className={cn(styles.modal_header, className)}
      {...rest}>
      {children}
    </div>
  );
};
const ModalFooter = ({ children, className, ...rest }: ModalItemProps) => {
  return (
    <div
      aria-label="modal_footer"
      className={cn(styles.modal_footer, className)}
      {...rest}>
      {children}
    </div>
  );
};

export { Modal, ModalHeader, ModalFooter, ModalBody };
