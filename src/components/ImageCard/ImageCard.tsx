import React from "react";
import css from "./ImageCard.module.css";
import type { ImageData } from "../../types";

interface ImageCardProps {
  imageData: ImageData;
  onClick: () => void;
}

export default function ImageCard({ imageData, onClick }: ImageCardProps) {
  return (
    <div className={css.imageCard} onClick={onClick}>
      <img
        className={css.image}
        src={imageData.urls.small}
        alt={imageData.alt_description || "Unsplash Image"}
      />
    </div>
  );
}