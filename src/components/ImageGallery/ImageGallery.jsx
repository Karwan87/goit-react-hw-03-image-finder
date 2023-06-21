import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onItemClick }) => {
  return (
    <ul className={styles.gallery}>
      <div className={styles.galleryContainer}>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onItemClick={onItemClick}
            selectedIndex={index}
          />
        ))}
      </div>
    </ul>
  );
};

export default ImageGallery;
