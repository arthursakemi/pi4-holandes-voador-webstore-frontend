import React from 'react';

import './listaPerguntas.styles.scss';

import Pergunta from '../perguntas/Perguntas.component';

import { AddCircleOutline } from '@material-ui/icons';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';

const ListaPerguntas = ({ listaPerguntas, pergunta, resposta, handleChange, handleAdd, handleRemove }) => {
  return (
    <>
      <h3>FAQ</h3>

      <div className="faq-group">
        <div className="input-group">
          <TextField
            name="pergunta"
            value={pergunta}
            fullWidth
            multiline
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">P:</InputAdornment>,
            }}
          />
          <TextField
            name="resposta"
            value={resposta}
            fullWidth
            multiline
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">R:</InputAdornment>,
            }}
          />
        </div>
        <div className="flex-box">
          <IconButton className="faq-add-btn" type="button" color="primary" onClick={handleAdd}>
            <AddCircleOutline />
          </IconButton>
        </div>
      </div>
      <div className="perguntas">
        {listaPerguntas.length === 0
          ? 'Nenhuma pergunta adicionada.'
          : listaPerguntas.map(({ pergunta, resposta }, index) => (
              <Pergunta key={`pergunta${index}`} id={index} pergunta={pergunta} resposta={resposta} handleRemove={handleRemove} />
            ))}
      </div>
    </>
  );
};

export default ListaPerguntas;
