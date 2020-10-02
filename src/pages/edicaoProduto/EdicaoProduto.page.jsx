import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TextField, Button, MenuItem } from '@material-ui/core';
import Axios from 'axios';

import './EdicaoProduto.styles.scss';

import ListaPerguntas from '../../components/lista-perguntas/ListaPerguntas.component';

const initialDataState = {
  nome: '',
  marca: '',
  categoria: '',
  valor: 0,
  descricao: '',
  palavrasChave: '',
  imagens: [],
  perguntas: [],
};

const initialPergunta = {
  pergunta: '',
  resposta: '',
};

const categorias = ['Acessórios', 'Casacos', 'Calçados', 'Masculino', 'Feminino'];

const EdicaoProduto = () => {
  const [id] = useState(useParams().id);
  const [produto, setProduto] = useState(initialDataState);
  const [newPergunta, setNewPergunta] = useState(initialPergunta);

  useEffect(() => {
    const url = `https://dutchman-backend-prod.herokuapp.com/produto/${id}`;
    Axios.get(url)
      .then((res) => {
        const newProduto = res.data;
        setProduto(newProduto);
        console.log(newProduto);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduto((state) => ({ ...state, [name]: value }));
  };

  const handleChangeQuestion = (e) => {
    const { value, name } = e.target;
    setNewPergunta((state) => ({ ...state, [name]: value }));
  };

  const handleAddQuestion = (e) => {
    if (newPergunta.pergunta.trim() === '' || newPergunta.resposta.trim() === '') {
      alert('Preencha ambos os campos antes de adicionar.');
      return;
    }
    newPergunta.idProduto = produto.id;

    const url = 'https://dutchman-backend-prod.herokuapp.com/pergunta';

    Axios.post(url, newPergunta)
      .then(({ data }) => {
        newPergunta.id = data.id;
        setProduto((state) => ({ ...state, perguntas: [...state.perguntas, newPergunta] }));
        setNewPergunta({ pergunta: '', resposta: '' });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteQuestion = (e) => {
    const index = Number(e.currentTarget.name);
    const idPergunta = produto.perguntas[index].id;
    const url = `https://dutchman-backend-prod.herokuapp.com/pergunta/${idPergunta}`;

    Axios.delete(url)
      .then(() => {
        const perguntasFiltradas = produto.perguntas.filter((pergunta, idx) => index !== idx);
        setProduto((state) => ({ ...state, perguntas: perguntasFiltradas }));
      })
      .catch((e) => console.log(e));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://dutchman-backend-prod.herokuapp.com/produto/${id}`;
    Axios.patch(url, produto)
      .then((res) => {
        console.log(res.status, res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const trimWhiteSpace = (e) => {
    const { value, name } = e.target;
    setProduto((state) => ({ ...state, [name]: value.trim() }));
  };

  return (
    <main className="edicao-page">
      <h1 className="form-title">Edição de Produto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <TextField type="text" onChange={handleChange} label="Nome:" name="nome" value={produto.nome} required onBlur={trimWhiteSpace} />
          <TextField
            type="text"
            onChange={handleChange}
            label="Marca:"
            name="marca"
            value={produto.marca}
            required
            onBlur={trimWhiteSpace}
          />
          <TextField
            onChange={handleChange}
            label="Categoria:"
            name="categoria"
            value={produto.categoria}
            required
            onBlur={trimWhiteSpace}
            select
          >
            {categorias.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            onChange={handleChange}
            label="Valor:"
            name="valor"
            value={produto.valor}
            required
            onBlur={trimWhiteSpace}
          />
          <TextField
            type="text"
            onChange={handleChange}
            label="Descrição:"
            name="descricao"
            value={produto.descricao}
            required
            onBlur={trimWhiteSpace}
            multiline
          />
          <TextField
            type="text"
            onChange={handleChange}
            label="Palavras Chave:"
            name="palavrasChave"
            value={produto.palavrasChave}
            required
            onBlur={trimWhiteSpace}
            multiline
          />
          <ListaPerguntas
            listaPerguntas={produto.perguntas}
            pergunta={newPergunta.pergunta}
            resposta={newPergunta.resposta}
            handleChange={handleChangeQuestion}
            handleAdd={handleAddQuestion}
            handleRemove={handleDeleteQuestion}
          />
          <div className="form-group">
            <Button type="button" variant="contained" fullWidth>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Atualizar Produto
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EdicaoProduto;
