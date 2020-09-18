import React, { useState } from 'react';

import './estoqueAlert.style.scss';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import Axios from 'axios';

const EstoqueAlert = ({ open, handleClose, idProduto, disponivel, setReload }) => {
  const [estoque, setEstoque] = useState(disponivel);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEstoque((state) => ({ ...state, [name]: value }));
  };

  const onClose = (e) => {
    setEstoque(disponivel);
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://dutchman-backend-prod.herokuapp.com/estoque/${idProduto}`;
    Axios.patch(url, estoque)
      .then((res) => {
        console.log(res);
        setReload((state) => state + 1);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Alterar Estoque</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="form-container">
          <TextField label="p" name="p" value={estoque.p} type="number" onChange={handleChange} required />
          <TextField label="m" name="m" value={estoque.m} type="number" onChange={handleChange} required />
          <TextField label="g" name="g" value={estoque.g} type="number" onChange={handleChange} required />
          <TextField label="unico" name="unico" value={estoque.unico} type="number" onChange={handleChange} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EstoqueAlert;
