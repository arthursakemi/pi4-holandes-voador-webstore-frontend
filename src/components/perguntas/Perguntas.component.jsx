import React from 'react';

import './perguntas.styles.scss';

import { CancelOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const Pergunta = ({ id, pergunta, resposta, handleRemove }) => {
  return (
    <div className="container-perguntas">
      <div className="flex-box">
        <IconButton className="faq-add-btn" name={id} type="button" color="secondary" onClick={handleRemove}>
          <CancelOutlined />
        </IconButton>
      </div>
      <div className="group">
        <h3>{`P: ${pergunta}`}</h3>
        <p>{`R: ${resposta}`}</p>
      </div>
    </div>
  );
};

export default Pergunta;
