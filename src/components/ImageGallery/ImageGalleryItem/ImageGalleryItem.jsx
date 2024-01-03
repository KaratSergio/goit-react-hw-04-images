import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.module';

export const ImageGalleryItem = ({ galleryItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  const { webformatURL, largeImageURL, tags } = galleryItem;

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <GalleryImg src={webformatURL} alt={tags} />
      </GalleryItem>
      {isModalOpen && (
        <Modal
          imageUrl={largeImageURL}
          alt={tags}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
