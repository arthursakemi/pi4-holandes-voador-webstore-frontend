import React from 'react';

import './AddressBox.component';

import { Paper, Radio } from '@material-ui/core';

const AddressBox = ({ endereco, selected, onClick, index }) => {
  return (
    <Paper className="box-endereco" data-id={index} onClick={onClick}>
      <div className="endereco-container">
        <span>{endereco.cep}</span>
        <span>{`${endereco.endereco}, ${endereco.numero}`}</span>
        <span>{endereco.complemento}</span>
        <span>{endereco.bairro}</span>
        <span>{`${endereco.cidade} - ${endereco.uf}`}</span>
      </div>
      <div>
        <Radio checked={selected} color="primary" />
      </div>
    </Paper>
  );
};

export default AddressBox;
