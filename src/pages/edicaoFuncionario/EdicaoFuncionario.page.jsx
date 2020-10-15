import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TextField, Button, MenuItem } from '@material-ui/core';
import Axios from 'axios';

import './edicaoFuncionario.styles.scss'

const initialFormData = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    cargo: '',
};

const initialErrorState = {
    nome: false,
    cpf: false,
    email: false,
  };

const EdicaoFuncionario = () => {
    const history = useHistory();
    const [id] = useState(useParams().id);
    const [funcionario, setFuncionario] = useState(initialFormData)
    const [error, setError] = useState(initialErrorState);

    const capitalize = (text) => {
        return text
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };

    const trimWhiteSpace = (e) => {
        const { value, name } = e.target;
        setFuncionario((state) => ({ ...state, [name]: value.trim() }));
    };

    // carrega os dados da conta do funcionário
    useEffect(() => {
        const url = `https://dutchman-backend-prod.herokuapp.com/usuario/${id}`
        Axios.get(url).then((res) => {
            setFuncionario(res.data);
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { cpf, nome, email } = error;
    
        if (cpf || nome || email) return;
    
        const url = `https://dutchman-backend-prod.herokuapp.com/usuario/${funcionario.id}`;
    
        Axios.patch(url, funcionario)
          .then((res) => {
            console.log(res);
        })
          .catch((e) => console.log(e))
          .finally(() => {
            setFuncionario(initialFormData);
        });
    };

    const handleChange = (e) => {
        let { value, name } = e.target;
        if (name === 'nome') {
          value = capitalize(value);
        }
        setFuncionario((state) => ({ ...state, [name]: value }));
    };

    const handleCancelEdicao = () => {
        history.push('/backoffice/funcionarios')
    };

    return (
        <main className="pagina-edicao-funcionario">
        <h1 className="form-title">Edição de Funcionário</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <TextField
              name="nome"
              label="Nome"
              value={funcionario.nome}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              helperText={error.nome ? 'Nome deve conter 5 ou mais caracteres alfabéticos' : ''}
              required
              fullWidth
            />
            <TextField
              name="cpf"
              label="CPF"
              value={funcionario.cpf}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              helperText={error.cpf ? 'CPF inválido' : ''}
              required
              fullWidth
              disabled="true"
            />
            <TextField
              name="email"
              label="Email"
              value={funcionario.email}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              helperText={error.email ? 'Email inválido!' : ''}
              required
              fullWidth
              disabled="true"
            />
            <TextField
              name="cargo"
              label="Cargo"
              value={funcionario.cargo}
              onChange={handleChange}
              select
              required
              fullWidth
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="estoquista">Estoquista</MenuItem>
            </TextField>
            <div className="form-group">
              <Button type="button" variant="contained" onClick={handleCancelEdicao} fullWidth>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Atualizar
              </Button>
            </div>
          </div>
        </form>
      </main>
    )
    
}

export default EdicaoFuncionario