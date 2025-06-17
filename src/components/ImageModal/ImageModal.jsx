import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Image Modal">
      <div onClick={onClose}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
        <p>Description: {image.alt_description}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;