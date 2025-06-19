import React from "react";
import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import type { ImageData } from "../../types";

interface ImageGalleryProps {
  imagesData: ImageData[];

  onImageClick: (image: ImageData) => void;
}
export default function ImageGallery({
  imagesData,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <>
      <ul className={css.imageGallery}>
        {imagesData.map((image) => (
          <li key={image.id} className={css.imageCard}>
            <ImageCard imageData={image} onClick={() => onImageClick(image)} />
          </li>
        ))}
      </ul>
    </>
  );
}