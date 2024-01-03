import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { ImageApiService } from '../../services/pixabay_api';

import { AppContent } from './App.module';

const apiService = new ImageApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [error, setError] = useState(false);
  const [setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async (query, page) => {
      setLoading(true);
      setError(false);

      apiService.setSearchTerm(query);

      try {
        const data = await apiService.getImages(page);
        const newData = data.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        const currentData = newData.map(item => ({
          ...item,
          key: uuidv4(),
        }));

        setGalleryItems(prevGalleryItems => [
          ...prevGalleryItems,
          ...currentData,
        ]);

        if (!data.length) {
          setLoading(false);
          setError(true);
          setIsButtonShow(false);
          toast.warn('Sorry, there are no images. Please try again.');
        } else {
          const currentPage = galleryPage;
          const totalPages = Math.ceil(
            apiService.totalResults / apiService.perPage
          );

          if (currentPage >= totalPages) {
            setLoading(false);
            setIsButtonShow(false);
            setError(false);
          } else {
            if (page === 1) {
              toast.success(
                `Hooray! We found ${apiService.totalResults} images.`
              );
            }

            setLoading(false);
            setIsButtonShow(true);
            setError(false);
          }
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        toast.error('Oops! Something went wrong. Please try again later.');
      }
    };

    if (searchQuery) {
      fetchGalleryItems(searchQuery, galleryPage);
    }
  }, [searchQuery, galleryPage]);

  const toggleModal = imageUrl => {
    setSelectedImage(prevSelectedImage =>
      prevSelectedImage === imageUrl ? null : imageUrl
    );
  };

  const handleFormSubmit = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setGalleryPage(1);
    setGalleryItems([]);
    setIsButtonShow(false);
    setError(false);
  };

  const onLoadMore = () => {
    setGalleryPage(prevGalleryPage => prevGalleryPage + 1);
  };

  return (
    <AppContent>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <div>Something went wrong!</div>}
      {!error && (
        <ImageGallery
          galleryItems={galleryItems}
          keyExtractor={item => item.key}
          onImageClick={imageUrl => toggleModal(imageUrl)}
        />
      )}
      {loading && <Loader />}
      {isButtonShow && <Button onClick={onLoadMore} />}

      <ToastContainer autoClose={3000} theme="colored" />
    </AppContent>
  );
};

export default App;
