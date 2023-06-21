import React from 'react';
import { Rings } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <Rings type="ThreeDots" color="#00BFFF" height={80} width={80} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
