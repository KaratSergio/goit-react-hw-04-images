import { useEffect, useCallback } from 'react';
import { CustomOverlay, CustomModalContent } from './Modal.module';

export const Modal = ({ imageUrl, alt, onClose }) => {
  const handleKeyPress = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [onClose, handleKeyPress]);

  return (
    <CustomOverlay id="overlay" onClick={handleOverlayClick}>
      <CustomModalContent onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt={alt} />
      </CustomModalContent>
    </CustomOverlay>
  );
};

export default Modal;
