import React from 'react';

import './loadingOverlay.styles.css';

import { CircularProgress } from '@material-ui/core';

const LoadingOverlay = ({ loadingText }) => {
  return (
    <div className="loading-overlay">
      <CircularProgress size="10rem" />
      <p className="loading-text">{loadingText}</p>
    </div>
  );
};

export default LoadingOverlay;
