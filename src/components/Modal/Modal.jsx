import React, { useEffect } from 'react';
import { BiX, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      } else if (event.code === 'ArrowLeft') {
        onPrev();
      } else if (event.code === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <BiX size={30} />
        </button>
        <img src={imageUrl} alt="" className={styles.image} />
        <div className={styles.navigator}>
          <button className={styles.prevButton} onClick={onPrev}>
            <BiChevronLeft size={30} />
          </button>
          <button className={styles.nextButton} onClick={onNext}>
            <BiChevronRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
