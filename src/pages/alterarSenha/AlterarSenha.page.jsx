import React, { useState, useEffect } from 'react';
import { verify } from 'jsonwebtoken';
import './alterarSenha.styles.scss';

import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';

const initialFormData = {
  senha: '',
};

const initialError = {
  novaSenha: false,
  senhaAtual: false,
};

const initialPassword = {
  senhaAtual: '',
  novaSenha: '',
  confirmacao: '',
};

const AlterarSenha = ({ user }) => {
  const [senha, setSenha] = useState(initialPassword);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSenha((state) => ({ ...state, [name]: value }));
    setError((state) => ({ ...state, senhaAtual: false }));
  };

  const trimWhiteSpace = (e) => {
    const { value, name } = e.target;
    setSenha((state) => ({ ...state, [name]: value.trim() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { novaSenha, senhaAtual } = error;

    if (novaSenha || senhaAtual) return;

    const urlLogin = 'https://dutchman-backend-prod.herokuapp.com/login';
    const urlAlteracao = `https://dutchman-backend-prod.herokuapp.com/usuario/${user.id}/senha`;

    Axios.post(urlLogin, { usuario: user.email, senha: senha.senhaAtual })
      .then(({ data }) => {
        try {
          verify(data.jwtToken, process.env.REACT_APP_JWT_KEY);
        } catch (e) {
          setError((state) => ({ ...state, senhaAtual: true }));
          return;
        }
        Axios.patch(urlAlteracao, formData)
          .then((res) => {
            console.log(res.data ? 'senha alterada com sucesso' : 'falha na operacao');
            setSenha(initialPassword);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  // valida se o campo senha e a confirmacao sao iguais
  useEffect(() => {
    if (senha.novaSenha === senha.confirmacao) {
      setError((state) => ({ ...state, novaSenha: false }));
      setFormData((state) => ({ ...state, senha: senha.novaSenha }));
    } else {
      setError((state) => ({ ...state, novaSenha: true }));
    }
  }, [senha]);

  return (
    <main className="senha-page">
      <div>
        <h1 className="form-title">Altere sua senha</h1>
        <form onSubmit={handleSubmit}>
          <div className="senha-container">
            <TextField
              label="Senha Atual"
              name="senhaAtual"
              value={senha.senhaAtual}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              type="password"
              error={error.senhaAtual}
              helperText={error.senhaAtual ? 'Senha inválida' : ''}
              fullWidth
            />
            <TextField
              label="Nova Senha"
              name="novaSenha"
              value={senha.novaSenha}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              type="password"
              error={error.novaSenha}
              helperText={error.novaSenha ? 'Nova Senha e Confirmação devem ser iguais' : ''}
              fullWidth
            />
            <TextField
              label="Confirme Sua Senha"
              name="confirmacao"
              value={senha.confirmacao}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              type="password"
              error={error.novaSenha}
              helperText={error.novaSenha ? 'Nova Senha e Confirmação devem ser iguais' : ''}
              fullWidth
            />
            <div className="form-group">
              <Button type="submit" variant="contained" fullWidth>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Alterar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AlterarSenha;
