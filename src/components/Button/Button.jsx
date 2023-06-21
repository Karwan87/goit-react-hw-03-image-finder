import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={styles.btnContainer}>
      <button type="button" className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;
