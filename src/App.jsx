import { useState, useEffect } from 'react';
import './App.css';
import { fetchImages } from './imageApi';
import { Toaster } from 'react-hot-toast';

import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import ImageCard from './components/ImageCard/ImageCard';

import React from 'react';


function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [noResults, setNoResults] = useState(false);


  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        setNoResults(false);

        const data = await fetchImages(query, page);

        if (data.results.length === 0 && page === 1) {
      setNoResults(true);
      return;
        }
        setTotalPages(data.total_pages);
        setImages(prev => (page === 1 ? data.results : [...prev, ...data.results]));
      
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Something went wrong...');
      } finally {
          setLoading(false);
          
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
       <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {(error || noResults) && (
  <ErrorMessage message={error || 'No results found. Please try another search term.'} />
)}

<ImageGallery images={images} onImageClick={setSelectedImage} />
      {loading && <Loader />}
      {images.length > 0 && !loading && page < totalPages && (
  <LoadMoreBtn onClick={handleLoadMore} />
)}

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </>
  );
}

  

export default App;

