import { useCallback, useState } from "react";

export function useDisclosure(defaultValue = false): {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
} {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

  /**
   * Info: onOpen is used to open modal/drawer
   */
  const onOpen = useCallback(() => {
    setIsOpen((pre) => (pre ? pre : !pre));
  }, [isOpen]);

  /**
   * Info: onClose is used to close modal/drawer
   */
  const onClose = useCallback(() => {
    setIsOpen((pre) => (pre ? !pre : pre));
  }, [isOpen]);

  /**
   * Info: toggle is used to toggle modal/drawer
   */
  const toggle = useCallback(() => {
    setIsOpen((pre) => !pre);
  }, [isOpen]);

  return { isOpen, onOpen, onClose, toggle };
}
