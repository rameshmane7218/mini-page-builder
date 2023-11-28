import { ChangeEvent, RefObject, SyntheticEvent, useRef, useState } from "react";
import styles from "./Header.module.css";
import { Button } from "@/components/Button/Button";
import { FaFileExport, FaFileImport } from "react-icons/fa6";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/Modal/Modal";
import { CloseIcon } from "../Icons/CloseIcon";
import { Divider } from "@/components/Divider/Divider";
import { Input } from "@/components/Input/Input";
import { useDisclosure } from "@/hooks/useDisclosure";
import { LuDownload } from "react-icons/lu";
import { validateItemStructure } from "@/utils/validator";

const Header = ({
  blocks,
  onChange,
}: {
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
}) => {
  return (
    <header className={styles.header}>
      {/* Header  */}
      <div className={styles.heading_container}>
        <h1 className={styles.heading}>Mini Page Builder</h1>
      </div>
      <div className={styles.header_buttons}>
        <ImportLayout onChange={onChange} blocks={blocks} />
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(blocks),
          )}`}
          download="page-layout.json"
          className={styles.export_layout}>
          <Button>
            Export Layout <FaFileExport />
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Header;

const ImportLayout = ({
  blocks,
  onChange,
}: {
  blocks: Record<string, any>[];
  onChange: (blocks: Record<string, any>[]) => void;
}) => {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);

  const [uploadedData, setUploadedData] = useState<Record<string, any>[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleOnSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    if (blocks?.length > 0) {
      const confirm = window.confirm(
        "Uploading a new file will delete the previous data. \nAre you sure you want to proceed?",
      );
      if (confirm) {
        onChange([...uploadedData]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onClose();
      }
    } else {
      onChange(uploadedData);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    }
  };
  const handleOnChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          // Parse the JSON data
          const parsedData = JSON.parse(e.target.result);

          // Check if the structure matches the expected structure
          if (
            Array.isArray(parsedData) &&
            parsedData.every((item) => validateItemStructure(item, sampleBlockLayout[0]))
          ) {
            setUploadedData(parsedData);
          } else {
            console.error("Invalid JSON structure");
            alert("Invalid Page layout");
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Error parsing uploaded file");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      };

      // Read the contents of the file as text
      reader.readAsText(file);
    }
  };
  return (
    <div className={styles.import_layout}>
      <Button className={styles.import_layout_button} variant="outline" onClick={onOpen}>
        Import Layout <FaFileImport />
      </Button>
      <form onSubmit={handleOnSubmitForm}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader className={styles.form_header}>
            <h2>Upload Page Layout</h2>
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

          <ModalBody className={styles.form_body}>
            <Input
              ref={fileInputRef}
              name={"upload_layout"}
              type={"file"}
              accept="application/json"
              onChange={handleOnChangeUploadFile}
              required={true}
            />
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(sampleBlockLayout),
              )}`}
              download="sample-page-layout.json"
              className={styles.sample_download}>
              <span>Download Sample Block Layout</span> <LuDownload />
            </a>
          </ModalBody>

          <ModalFooter className={styles.form_footer}>
            <Button type="submit">Upload</Button>
          </ModalFooter>
        </Modal>
      </form>
    </div>
  );
};

const sampleBlockLayout = [
  {
    blockType: "Label",
    settings: {
      text: "This is a Label",
      x: 448,
      y: 128.5,
      fontSize: "",
      fontWeight: "",
    },
    id: "e7f7d007-68a8-4bac-ba04-a99a3a295c27",
  },
  {
    blockType: "Button",
    settings: {
      text: "Button",
      x: 446,
      y: 230,
      fontSize: "",
      fontWeight: "",
    },
    id: "5406c6ce-94fc-45d7-8ed3-6ee61b0fcdad",
  },
  {
    blockType: "Input",
    settings: {
      defaultValue: "This is a Input box",
      x: 446,
      y: 166.5,
      fontSize: "",
      fontWeight: "",
    },
    id: "668f1f77-8d05-4578-9e08-81bfad25eaec",
  },
];
