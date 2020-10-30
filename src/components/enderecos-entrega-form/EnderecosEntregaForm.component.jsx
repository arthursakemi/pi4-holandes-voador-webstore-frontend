import React, { useEffect, useState } from 'react';

import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';

import { isEqual } from 'lodash';
import Axios from 'axios';
import GaleriaEnderecos from '../galeria-enderecos/GaleriaEnderecos.component';

const initialAddress = {
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  cidade: '',
  uf: '',
  bairro: '',
};

const initialError = {
  cep: false,
  numero: false,
};

const EnderecosEntregaForm = ({ formData, setFormData, edicao }) => {
  const [endereco, setEndereco] = useState(initialAddress);
  const [enderecosCadastrados, setEnderecosCadastrados] = useState(formData.enderecosEntrega);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(initialError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((state) => ({ ...state, [name]: value }));
  };

  const getAddressViaCep = (e) => {
    const cep = e.target.value;
    if (cep === '') {
      setError((state) => ({ ...state, cep: false }));
      return;
    }
    if (cep.length !== 8) {
      setError((state) => ({ ...state, cep: true }));
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
            complemento: endereco.complemento,
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

  const trimWhiteSpace = (e) => {
    const { value, name } = e.target;
    setEndereco((state) => ({ ...state, [name]: value.trim() }));
  };

  // Adiciona ou remove o endereco de faturamento da lista de enderecos de entrega
  useEffect(() => {
    if (isSameAddress) {
      setEnderecosCadastrados([formData.enderecoFaturamento, ...enderecosCadastrados]);
    } else {
      setEnderecosCadastrados((state) => state.filter((endereco) => !isEqual(endereco, formData.enderecoFaturamento)));
    }
  }, [isSameAddress]);

  useEffect(() => {
    setFormData((state) => ({ ...state, enderecosEntrega: enderecosCadastrados }));
  }, [enderecosCadastrados]);

  const getAddressForm = () => (
    <>
      <TextField
        name="cep"
        label="CEP"
        type="number"
        value={endereco.cep}
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
        value={endereco.endereco}
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
          value={endereco.numero}
          onChange={handleChange}
          error={error.numero}
          helperText={error.numero ? 'Número inválido' : ''}
          onBlur={''}
          required
          fullWidth
        />
        <TextField
          name="complemento"
          label="Complemento"
          value={endereco.complemento}
          onChange={handleChange}
          onBlur={trimWhiteSpace}
          fullWidth
        />
        <TextField name="cidade" label="Cidade" value={endereco.cidade} onChange={handleChange} disabled required fullWidth />
        <TextField name="uf" label="UF" value={endereco.uf} onChange={handleChange} disabled required fullWidth />
      </div>
      <TextField name="bairro" label="Bairro" value={endereco.bairro} onChange={handleChange} disabled required fullWidth />
      <div className="form-flex">
        <Button type="button" variant="contained" onClick={hideForm} fullWidth>
          Cancelar
        </Button>
        <Button type="button" variant="contained" color="primary" onClick={addAddress} fullWidth>
          Adicionar
        </Button>
      </div>
    </>
  );

  const hideForm = () => {
    setIsFormVisible(false);
  };

  const addAddress = (e) => {
    if (endereco.cep === '') {
      setError((state) => ({ ...state, cep: true }));
      return;
    }
    if (endereco.numero === '') {
      setError((state) => ({ ...state, numero: true }));
      return;
    }
    if (error.cep) {
      return;
    }
    if (edicao) {
      postAddress(formData.id, endereco);
    }
    setEnderecosCadastrados((state) => [...state, endereco]);
    setEndereco(initialAddress);
    setIsFormVisible(false);
    setError(initialError);
  };

  const postAddress = (idCliente, endereco) => {
    const url = `https://dutchman-backend-prod.herokuapp.com/endereco/${idCliente}`;

    Axios.post(url, endereco)
      .then((res) => {
        console.log(res.data);
        getCurrentClient();
      })
      .catch((e) => console.log(e));
  };

  const getCurrentClient = () => {
    const url = `https://dutchman-backend-prod.herokuapp.com/cliente/${formData.id}`;

    Axios.get(url)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {edicao ? (
        ''
      ) : (
        <FormControlLabel
          control={<Checkbox checked={isSameAddress} onChange={() => setIsSameAddress((state) => !state)} color="primary" />}
          label="Usar o endereço de faturamento."
        />
      )}
      {isFormVisible ? (
        getAddressForm()
      ) : (
        <Button type="button" variant="contained" onClick={() => setIsFormVisible(true)} fullWidth>
          Adicionar Novo Endereço
        </Button>
      )}
      <GaleriaEnderecos
        enderecos={enderecosCadastrados}
        setEnderecos={setEnderecosCadastrados}
        edicao={edicao}
        getCurrentClient={getCurrentClient}
      ></GaleriaEnderecos>
    </>
  );
};

export default EnderecosEntregaForm;
