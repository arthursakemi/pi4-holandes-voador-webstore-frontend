import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './cadastroCliente.styles.scss';

import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';

const initialFormData = {
  nome: '',
  cpf: '',
  email: '',
  enderecoFaturamento: {
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    uf: '',
    bairro: '',
  },
  enderecosEntrega: [],
  senha: '',
  cargo: 'cliente',
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
  cep: false,
};

const CadastroCliente = () => {
  const history = useHistory();
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

  const handleAdressChange = (e) => {
    let { value, name } = e.target;
    setFormData((state) => ({ ...state, enderecoFaturamento: { ...formData.enderecoFaturamento, [name]: value } }));
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
    const { cpf, nome, email, senha, cep } = error;

    if (cpf || nome || email || senha || cep) return;

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

  const getAddressViaCep = (e) => {
    const cep = e.target.value;
    const url = `https://viacep.com.br/ws/${cep}/json`;

    Axios.get(url)
      .then(({ data }) => {
        if (!data.erro) {
          setFormData((state) => ({
            ...state,
            enderecoFaturamento: {
              cep: cep,
              endereco: data.logradouro,
              numero: '',
              complemento: '',
              cidade: data.localidade,
              uf: data.uf,
              bairro: data.bairro,
            },
          }));
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

  const handleCancelCadastro = () => {
    history.push('/backoffice/funcionarios');
  };

  return (
    <main className="pagina-cadastro-funcionario">
      <h1 className="form-title">Cadastro de Cliente</h1>
      <form onSubmit={''}>
        <div className="form-container">
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
          <TextField
            name="cep"
            label="CEP"
            type="number"
            value={formData.enderecoFaturamento.cep}
            onChange={handleAdressChange}
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
            onChange={handleAdressChange}
            onBlur={''}
            disabled
            required
            fullWidth
          />
          <div className="form-group">
            <TextField
              name="numero"
              label="Número"
              value={formData.enderecoFaturamento.numero}
              onChange={handleAdressChange}
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
              onChange={handleAdressChange}
              onBlur={''}
              error={error.email}
              helperText={error.email ? 'Email inválido!' : ''}
              fullWidth
            />
            <TextField
              name="cidade"
              label="Cidade"
              value={formData.enderecoFaturamento.cidade}
              onChange={handleAdressChange}
              onBlur={''}
              disabled
              required
              fullWidth
            />
            <TextField
              name="uf"
              label="UF"
              value={formData.enderecoFaturamento.uf}
              onChange={handleAdressChange}
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
            onChange={handleAdressChange}
            onBlur={''}
            disabled
            required
            fullWidth
          />

          <div className="form-group">
            <Button type="button" variant="contained" onClick={handleCancelCadastro} fullWidth>
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

export default CadastroCliente;
