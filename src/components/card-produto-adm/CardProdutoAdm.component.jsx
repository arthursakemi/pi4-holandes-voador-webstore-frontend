import React, { useState } from 'react';

import './cardProdutoAdm.style.scss';

import Alert from '../alert/Alert.component';

import { Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import EstoqueAlert from '../estoque-alert/EstoqueAlert.component';

const ProdutoSimples = ({ produto, handleDelete, setReload }) => {
  const [id] = useState(produto.id);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEstoque, setOpenEstoque] = useState(false);

  const handleEstoqueClick = () => {
    setOpenEstoque(true);
  };

  const closeEstoque = () => {
    setOpenEstoque(false);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteAlert(false);
    handleDelete(id);
  };

  const handleDeleteClick = () => {
    setOpenDeleteAlert(true);
  };

  const handleCancel = () => {
    setOpenDeleteAlert(false);
  };

  return (
    <>
      <Card>
        <CardActionArea>
          <Carousel>
            {produto.imagens.map(({ imagem }, index) => (
              <CardMedia key={index} className="card-image" image={imagem} title={produto.nome} interval="2000" />
            ))}
          </Carousel>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {produto.nome}
            </Typography>
            <Typography color="textSecondary" variant="h6" component="p">
              {`R$: ${produto.valor.toFixed(2)}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: 'center' }}>
          <CardContent className="action-container">
            <Button type="button" onClick={handleEstoqueClick} variant="contained" color="primary">
              Estoque
            </Button>
            <Button type="button" variant="contained" color="primary">
              Editar
            </Button>
            <Button type="button" onClick={handleDeleteClick} variant="contained" color="secondary">
              Excluir
            </Button>
          </CardContent>
        </CardActions>
      </Card>
      <Alert
        open={openDeleteAlert}
        handleClose={handleCancel}
        handleConfirm={handleConfirmDelete}
        title="Confirmar exclusão de produto"
        text={`Tem certeza que deseja excluir o produto: ${produto.nome}`}
        danger
      />
      <EstoqueAlert
        open={openEstoque}
        handleClose={closeEstoque}
        idProduto={produto.id}
        disponivel={{ p: produto.p, m: produto.m, g: produto.g, unico: produto.unico }}
        setReload={setReload}
      />
    </>
  );
};

export default ProdutoSimples;
