import React from 'react';

import './uploadGallery.style.scss';

import { IconButton, CircularProgress } from '@material-ui/core';
import { HighlightOff, AddAPhoto } from '@material-ui/icons';

const UploadGallery = ({ imgList, handleClick, loading, progress, handleImgSelection }) => {
  if (imgList.length === 0 && !loading) {
    return (
      <div className="gallery">
        <div className="progress-container">
          <input id="upload-btn" type="file" onChange={handleImgSelection} accept="image/*" style={{ display: 'none' }} />
          <label htmlFor="upload-btn">
            <IconButton component="span">
              <AddAPhoto />
            </IconButton>
          </label>
        </div>
        Você ainda não selecionou nenhuma imagem.
      </div>
    );
  }

  return (
    <div className="upload-gallery gallery">
      {imgList.map((imagem, index) => (
        <div key={index} className="uploaded-img" style={{ backgroundImage: `url(${imagem})` }}>
          <IconButton className="delete-btn" name={index} type="button" onClick={handleClick} color="inherit">
            <HighlightOff />
          </IconButton>
        </div>
      ))}
      {loading ? (
        <div className="progress-container">
          <CircularProgress variant="static" value={progress} />
        </div>
      ) : (
        <div className="progress-container">
          <input id="upload-btn" type="file" onChange={handleImgSelection} accept="image/*" style={{ display: 'none' }} />
          <label htmlFor="upload-btn">
            <IconButton component="span">
              <AddAPhoto />
            </IconButton>
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadGallery;
