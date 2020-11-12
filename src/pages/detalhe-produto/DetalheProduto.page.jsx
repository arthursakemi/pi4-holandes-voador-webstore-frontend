import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import './detalheProduto.style.scss';

import { Button, CardMedia, Paper, Typography, TextField, MenuItem } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';

const initialDataState = {
  nome: '',
  marca: '',
  categoria: '',
  valor: 0,
  descricao: '',
  p: 0,
  m: 0,
  g: 0,
  unico: 0,
  palavrasChave: '',
  perguntas: [],
  imagens: [],
};

const DetalheProduto = ({ cart, setCart, user }) => {
  const [id] = useState(useParams().id);
  const [produto, setProduto] = useState(initialDataState);
  const [tamanho, setTamanho] = useState('');
  const [erro, setErro] = useState(false);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (!tamanho) {
      setErro(true);
      return;
    }
    const index = cart.findIndex((item) => item.idProduto === id && item.tamanho === tamanho);
    if (index === -1) {
      setCart((state) => [
        ...state,
        { idProduto: id, nome: produto.nome, imagem: produto.imagens[0], tamanho, quantidade: 1, preco: produto.valor },
      ]);
    } else {
      const currentCart = [...cart];
      currentCart[index].quantidade += 1;
      setCart(currentCart);
    }
    history.push('/carrinho');
  };

  const handleChange = (e) => {
    setTamanho(e.target.value);
  };

  useEffect(() => {
    const url = `https://dutchman-backend-prod.herokuapp.com/produto/${id}`;
    Axios.get(url)
      .then((res) => {
        const newProduto = res.data;
        setProduto(newProduto);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <main className="detalhe-page">
      <Paper className="produto-container">
        {!!produto.imagens.length ? (
          <Carousel className="carousel">
            {produto.imagens.map(({ imagem }, index) => (
              <CardMedia key={index} className="detalhe-card-image" image={imagem} />
            ))}
          </Carousel>
        ) : (
          ''
        )}
        <div className="produto-info">
          <Typography className="texto-detalhe" variant="h4" component="h2">
            {produto.nome}
          </Typography>
          <Typography className="texto-detalhe" gutterBottom variant="h6" component="p">
            {produto.marca}
          </Typography>
          <Typography className="texto-detalhe" gutterBottom variant="h5" component="p">
            {`R$: ${produto.valor.toFixed(2)}`}
          </Typography>
          <Typography className="texto-detalhe" variant="h5" component="p">
            Estoque:
          </Typography>
          <Typography className="texto-detalhe" gutterBottom component="p">
            {`P: ${produto.p}  M: ${produto.m}  G: ${produto.g} Unico: ${produto.unico} `}
          </Typography>
          <Typography className="texto-detalhe" variant="h5" component="p">
            Descrição:
          </Typography>
          <Typography className="texto-detalhe" gutterBottom component="p">
            {`R$: ${produto.descricao}`}
          </Typography>
          {user.cargo === 'cliente' || user.cargo === '' ? (
            <form className="form-group">
              <TextField
                name="tamanho"
                value={tamanho}
                onChange={handleChange}
                label="Tamanho"
                error={erro}
                helperText={erro ? 'Selecione o tamanho' : ''}
                select
                required
                fullWidth
              >
                {produto.p > 0 ? <MenuItem value="p">P</MenuItem> : null}
                {produto.m > 0 ? <MenuItem value="m">M</MenuItem> : null}
                {produto.g > 0 ? <MenuItem value="g">G</MenuItem> : null}
                {produto.unico > 0 ? <MenuItem value="unico">Unico</MenuItem> : null}
              </TextField>
              <Button type="submit" onClick={handleClick} variant="contained" color="primary" fullWidth>
                Comprar
              </Button>
            </form>
          ) : null}
        </div>
        <div className="perguntas-container">
          <Typography className="texto-detalhe pergunta" variant="h5" component="p">
            Perguntas:
          </Typography>
          {produto.perguntas.map(({ pergunta, resposta }, index) => (
            <span key={`${index}p`}>
              <Typography className="texto-detalhe" gutterBottom variant="h6" component="p">
                {`P: ${pergunta}`}
              </Typography>
              <Typography className="texto-detalhe" component="p">
                {`R: ${resposta}`}
              </Typography>
            </span>
          ))}
        </div>
      </Paper>
    </main>
  );
};

export default DetalheProduto;
