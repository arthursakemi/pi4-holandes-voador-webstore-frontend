import React from 'react';

import './galeriaEnderecos.styles.scss';

import { IconButton } from '@material-ui/core';
import { CancelOutlined } from '@material-ui/icons';

const GaleriaEnderecos = ({ enderecos, setEnderecos }) => {
  const handleRemove = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    setEnderecos((state) => state.filter((el, index) => index !== id));
  };

  if (enderecos.length === 0) {
    return <div className="galeria-vazia">'Nenhum endereço de entrega adicionado!'</div>;
  }
  return (
    <div className="galeria-enderecos">
      {enderecos.map((endereco, index) => (
        <>
          <div key={index} className="card-endereco">
            <div className="endereco-container">
              <span>{endereco.cep}</span>
              <span>{`${endereco.endereco}, ${endereco.numero}`}</span>
              <span>{endereco.complemento}</span>
              <span>{endereco.bairro}</span>
              <span>{`${endereco.cidade} - ${endereco.uf}`}</span>
            </div>
            <div className="flex-box">
              <IconButton className="faq-add-btn" data-id={index} type="button" color="secondary" onClick={handleRemove}>
                <CancelOutlined />
              </IconButton>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default GaleriaEnderecos;
