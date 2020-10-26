import React from 'react';

import './login.styles.scss';

import { TextField, Button, FormControlLabel, Switch } from '@material-ui/core';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const initialFormData = { usuario: '', senha: '' };

const LoginPage = ({ user, setJwt }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isEmployee, setIsEmployee] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const url = `https://dutchman-backend-prod.herokuapp.com/login/${isEmployee ? 'funcionario' : 'cliente'}`;
    Axios.post(url, formData)
      .then((res) => {
        setJwt(res.data.jwtToken);
      })
      .catch((e) => {
        console.log(e);
        setJwt('');
      });
  };

  const trimWhiteSpace = (e) => {
    const { value, name } = e.target;
    setFormData((state) => ({ ...state, [name]: value.trim() }));
  };

  useEffect(() => {
    if (user.nome) history.push('/');
  }, [user]);

  return (
    <main className="login-page">
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="login-container">
          <FormControlLabel control={<Switch checked={isEmployee} onChange={() => setIsEmployee(!isEmployee)} />} label="Funcionário" />
          <TextField label="usuario" name="usuario" value={formData.usuario} onChange={handleChange} onBlur={trimWhiteSpace} fullWidth />
          <TextField
            label="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            onBlur={trimWhiteSpace}
            type="password"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
};
export default LoginPage;
