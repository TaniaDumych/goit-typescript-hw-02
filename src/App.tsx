import css from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "./imageApi";
import ModalComponent from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { BeatLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

import type { ImageData } from "./types";

function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchImage, setSearchImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const openModal = (image: ImageData): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
  const handleImageClick = (image: ImageData): void => {
    openModal(image);
  };
  useEffect(() => {
    if (searchImage === "") {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(searchImage, currentPage);
        if (data.images.length === 0 && currentPage === 1) {
          setError(true);
          return;
        }
        if (currentPage === 1) {
          setImages(data.images);
         

        } else {
          setImages((prevImages) => [...prevImages, ...data.images]);
        }

        setTotal(data.total);
      } catch (error) {
        setError(true);
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchImage, currentPage]);

  const handleSearch = async (query: string) => {
    setSearchImage(query);
    setCurrentPage(1);
    setError(false);
  };
  const nextPage = () => {
    setCurrentPage((prevPage): number => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}

      {!error && (
        <>
          {loading && currentPage === 1 ? (
            <div className={css.loaderContainer}>
              <BeatLoader color="#132c20" size={50} />
            </div>
          ) : images.length > 0 ? (
            <ImageGallery imagesData={images} onImageClick={handleImageClick} />
          ) : null}

          {images.length > 0 && images.length < total && !loading && (
            <LoadMoreBtn onClick={nextPage} />
          )}

          {loading && currentPage > 1 && (
            <div className={css.loaderContainer}>
              <BeatLoader color="#132c20" size={30} />
            </div>
          )}
        </>
      )}
      
      {isModalOpen && selectedImage && (
  <ModalComponent
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    image={selectedImage}
  />
)}
     <Toaster position="top-center" />

    </div>
  );
}
export default App;