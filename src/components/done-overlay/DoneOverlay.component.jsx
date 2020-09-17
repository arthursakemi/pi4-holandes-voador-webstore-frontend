import React, { useEffect } from 'react';

import './doneOverlay.styles.css';

import successIcon from './success.svg';
import failIcon from './fail.svg';

const DoneOverlay = ({ success, msg, setDone }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(false);
    }, 2000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="loading-overlay">
      <img className="icon" src={success ? successIcon : failIcon} alt="Spinner" />
      <p className="loading-text">{msg}</p>
    </div>
  );
};

export default DoneOverlay;
