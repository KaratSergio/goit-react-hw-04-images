import { Gallery } from './ImageGallery.module';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ galleryItems, keyExtractor, onImageClick }) => {
  return (
    <Gallery className="gallery">
      {galleryItems.map(item => (
        <ImageGalleryItem
          key={keyExtractor(item)}
          galleryItem={item}
          onImageClick={onImageClick}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
