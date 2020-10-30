import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';

const senhaInicial = {
  senha: '',
  confirmacaoSenha: '',
};

const ClientForm = ({ formData, setFormData, error, setError, edicao }) => {
  const [senha, setSenha] = useState(senhaInicial);

  const handleChange = (e) => {
    let { value, name } = e.target;
    if (name === 'nome') {
      value = capitalize(value);
    }
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const capitalize = (text) => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handlePasswordChange = (e) => {
    const { value, name } = e.target;
    setSenha((state) => ({ ...state, [name]: value }));
  };

  const trimWhiteSpace = (e) => {
    const { value, name } = e.target;
    setFormData((state) => ({ ...state, [name]: value.trim() }));
  };

  // valida o campo email
  useEffect(() => {
    const { email } = formData;
    const emailRegex = /\S+@\S+\.[a-z]+/;

    if (email.trim() === '' || emailRegex.test(email)) {
      setError((state) => ({ ...state, email: false }));
    } else {
      setError((state) => ({ ...state, email: true }));
    }
  }, [formData.email]);

  // valida se o campo cpf tem 11 caracteres numericos
  useEffect(() => {
    const { cpf } = formData;
    if (cpf.length === 11 || cpf === '') {
      setError((state) => ({ ...state, cpf: false }));
    } else {
      setError((state) => ({ ...state, cpf: true }));
    }
  }, [formData.cpf]);

  // valida se o campo nome não possui numeros e tem mais de 5 caracteres
  useEffect(() => {
    const { nome } = formData;
    if (((nome.length >= 5 && nome.split(' ').length >= 2) || nome.trim() === '') && !/[0-9]/.test(nome)) {
      setError((state) => ({ ...state, nome: false }));
    } else {
      setError((state) => ({ ...state, nome: true }));
    }
  }, [formData.nome]);

  // valida se o campo senha e a confirmacao sao iguais
  useEffect(() => {
    if (senha.senha === senha.confirmacaoSenha) {
      setError((state) => ({ ...state, senha: false }));
      setFormData((state) => ({ ...state, senha: senha.senha }));
    } else {
      setError((state) => ({ ...state, senha: true }));
    }
  }, [senha]);

  return (
    <>
      <TextField
        name="nome"
        label="Nome"
        value={formData.nome}
        onChange={handleChange}
        onBlur={trimWhiteSpace}
        error={error.nome}
        helperText={error.nome ? 'Campo deve conter nome e sobrenome e no mínimo 5 caracteres não numéricos' : ''}
        required
        fullWidth
      />
      <TextField
        name="cpf"
        label="CPF"
        type="number"
        value={formData.cpf}
        onChange={handleChange}
        onBlur={trimWhiteSpace}
        error={error.cpf}
        helperText={error.cpf ? 'CPF inválido' : ''}
        disabled={!!edicao}
        required
        fullWidth
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        onBlur={trimWhiteSpace}
        error={error.email}
        helperText={error.email ? 'Email inválido!' : ''}
        disabled={!!edicao}
        required
        fullWidth
      />
      {edicao ? (
        ''
      ) : (
        <>
          <TextField
            name="senha"
            label="Senha"
            type="password"
            value={senha.senha}
            onChange={handlePasswordChange}
            error={error.senha}
            required
            fullWidth
          />
          <TextField
            name="confirmacaoSenha"
            label="Confirme sua Senha"
            type="password"
            value={senha.confirmacaoSenha}
            onChange={handlePasswordChange}
            error={error.senha}
            helperText={error.senha ? 'As senhas informadas devem ser iguais!' : ''}
            required
            fullWidth
          />
        </>
      )}
    </>
  );
};

export default ClientForm;
