import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="w-12 h-12 relative mx-auto my-20">
    <div className="w-full h-full absolute left-0 top-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin-donut"></div>
  </div>
  );
};

export default LoadingSpinner;