import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import './detalheProduto.style.scss';

import { CardMedia, Paper, Typography } from '@material-ui/core';
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

const DetalheProduto = () => {
  const [id] = useState(useParams().id);
  const [produto, setProduto] = useState(initialDataState);

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
        </div>
        <div className="perguntas-container">
          <Typography className="texto-detalhe pergunta" variant="h5" component="p">
            Perguntas:
          </Typography>
          {produto.perguntas.map(({ pergunta, resposta }) => (
            <>
              <Typography className="texto-detalhe" gutterBottom variant="h6" component="p">
                {`P: ${pergunta}`}
              </Typography>
              <Typography className="texto-detalhe" component="p">
                {`R: ${resposta}`}
              </Typography>
            </>
          ))}
        </div>
      </Paper>
    </main>
  );
};

export default DetalheProduto;
