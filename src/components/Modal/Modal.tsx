import { useEffect } from "react";
import type { Photo } from "../../types/photo";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  photo: Photo;
  onClose: () => void;
}

export default function Modal({ photo, onClose }: ModalProps) {
  const handleBackdropClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (ev.target === ev.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={photo.src.large} alt={photo.alt} className={styled.image} />
        <div className={styled.content}>
          <h2>{photo.alt}</h2>
        </div>
      </div>
    </div>,
    document.body
  );
}
