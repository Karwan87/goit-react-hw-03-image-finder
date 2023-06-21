import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onItemClick }) => {
  const handleClick = () => {
    onItemClick(image.largeImageURL, image.selectedIndex);
  };

  return (
    <li className={styles.galleryItem}>
      <img
        src={image.webformatURL}
        alt=""
        className={styles.galleryItemImage}
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
