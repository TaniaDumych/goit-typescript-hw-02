import css from "./ImageModal.module.css";
import type { ImageData } from "../../types";
import Modal from "react-modal";
import { IoMdCloseCircle } from "react-icons/io";


interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: ImageData | null;
}
export default function ModalComponent({
  isOpen,
  onRequestClose,
  image,
}: ModalComponentProps) {
  if (!image) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      closeTimeoutMS={300}
    >
       <button onClick={onRequestClose} className={css.closeButton}>
       <IoMdCloseCircle />
      </button>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={css.image}
      />
    </Modal>
  );
}