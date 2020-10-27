import React, { useState, useEffect } from 'react';

import { TextField } from '@material-ui/core';

import Axios from 'axios';

const EnderecoFaturamentoForm = ({ formData, setFormData, error, setError }) => {
  const [endereco, setEndereco] = useState(formData.enderecoFaturamento);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((state) => ({ ...state, [name]: value }));
  };

  const getAddressViaCep = (e) => {
    const cep = e.target.value;

    if (cep === '') {
      return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json`;

    Axios.get(url)
      .then(({ data }) => {
        if (!data.erro) {
          setEndereco({
            cep: cep,
            endereco: data.logradouro,
            numero: endereco.numero,
            complemento: endereco.enderecoFaturamento,
            cidade: data.localidade,
            uf: data.uf,
            bairro: data.bairro,
          });
          setError((state) => ({ ...state, cep: false }));
        } else {
          setError((state) => ({ ...state, cep: true }));
        }
      })
      .catch((e) => {
        console.log(e);
        setError((state) => ({ ...state, cep: true }));
      });
  };

  useEffect(() => {
    setFormData((state) => ({ ...state, enderecoFaturamento: endereco }));
  }, [endereco]);

  return (
    <>
      <TextField
        name="cep"
        label="CEP"
        type="number"
        value={formData.enderecoFaturamento.cep}
        onChange={handleChange}
        onBlur={getAddressViaCep}
        error={error.cep}
        helperText={error.cep ? 'CEP inválido' : ''}
        required
        fullWidth
      />
      <TextField
        name="endereco"
        label="Endereço"
        value={formData.enderecoFaturamento.endereco}
        onChange={handleChange}
        onBlur={''}
        disabled
        required
        fullWidth
      />
      <div className="form-flex">
        <TextField
          name="numero"
          label="Número"
          type="number"
          value={formData.enderecoFaturamento.numero}
          onChange={handleChange}
          onBlur={''}
          error={error.email}
          helperText={error.email ? 'Email inválido!' : ''}
          required
          fullWidth
        />
        <TextField
          name="complemento"
          label="Complemento"
          value={formData.enderecoFaturamento.complemento}
          onChange={handleChange}
          onBlur={''}
          error={error.email}
          helperText={error.email ? 'Email inválido!' : ''}
          fullWidth
        />
        <TextField
          name="cidade"
          label="Cidade"
          value={formData.enderecoFaturamento.cidade}
          onChange={handleChange}
          onBlur={''}
          disabled
          required
          fullWidth
        />
        <TextField
          name="uf"
          label="UF"
          value={formData.enderecoFaturamento.uf}
          onChange={handleChange}
          onBlur={''}
          disabled
          required
          fullWidth
        />
      </div>
      <TextField
        name="bairro"
        label="Bairro"
        value={formData.enderecoFaturamento.bairro}
        onChange={handleChange}
        onBlur={''}
        disabled
        required
        fullWidth
      />
    </>
  );
};

export default EnderecoFaturamentoForm;
