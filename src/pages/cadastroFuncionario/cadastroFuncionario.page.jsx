import React, { useState } from 'react';

import './cadastroFuncionario.style.scss';

import { TextField, Button, MenuItem } from '@material-ui/core';
import { useEffect } from 'react';
import Axios from 'axios';

const initialFormData = {
  nome: '',
  cpf: '',
  email: '',
  senha: '',
  cargo: '',
};

const senhaInicial = {
  senha: '',
  confirmacaoSenha: '',
};

const initialErrorState = {
  nome: false,
  cpf: false,
  email: false,
  senha: false,
};

const CadastroFuncionario = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [senha, setSenha] = useState(senhaInicial);
  const [error, setError] = useState(initialErrorState);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cpf, nome, email, senha } = error;

    if (cpf || nome || email || senha) return;

    const url = 'https://dutchman-backend-prod.herokuapp.com/usuario';

    Axios.post(url, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setFormData(initialFormData);
        setSenha(senhaInicial);
      });
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
    if ((cpf.length === 11 || cpf.trim() === '') && !/[^1-9]/.test(cpf)) {
      setError((state) => ({ ...state, cpf: false }));
    } else {
      setError((state) => ({ ...state, cpf: true }));
    }
  }, [formData.cpf]);

  // valida se o campo nome não possui numeros e tem mais de 5 caracteres
  useEffect(() => {
    const { nome } = formData;
    if ((nome.length >= 5 || nome.trim() === '') && !/[0-9]/.test(nome)) {
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
    <main className="pagina-cadastro-funcionario">
      <h1 className="form-title">Cadastro de Funcionários</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <TextField
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleChange}
            onBlur={trimWhiteSpace}
            error={error.nome}
            helperText={error.nome ? 'Nome deve conter 5 ou mais caracteres alfabéticos' : ''}
            required
            fullWidth
          />
          <TextField
            name="cpf"
            label="CPF"
            value={formData.cpf}
            onChange={handleChange}
            onBlur={trimWhiteSpace}
            error={error.cpf}
            helperText={error.cpf ? 'CPF inválido' : ''}
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
            required
            fullWidth
          />
          <TextField
            name="cargo"
            label="Cargo"
            value={formData.cargo}
            onChange={handleChange}
            onBlur={trimWhiteSpace}
            select
            required
            fullWidth
          >
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="estoquista">Estoquista</MenuItem>
          </TextField>
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
          <div className="form-group">
            <Button type="button" variant="contained" fullWidth>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CadastroFuncionario;
