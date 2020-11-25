import React, { useState } from 'react';

import './statusUpdateForm.styles.scss';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Typography } from '@material-ui/core';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const status = ['Aguardando Pagamento', 'Pagamento Rejeitado', 'Pagamento Aceito', 'Aguardando Retirada', 'Em Transito', 'Entregue'];

const StatusUpdateForm = ({ idVenda, currentStatus, open, handleClose, reload }) => {
  const [nextStatus, setNextStatus] = useState(currentStatus);
  const history = useHistory();

  const handleChange = (e) => {
    setNextStatus(e.target.value);
  };

  const onClose = (e) => {
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://dutchman-backend-prod.herokuapp.com/venda/${idVenda}`;
    Axios.patch(url, { status: nextStatus })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        handleClose();
        reload((n) => n + 1);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Atualizar Status</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="update-container">
          <Typography>{`Pedido #${idVenda}`}</Typography>
          <TextField name="status" label="Status" value={nextStatus} onChange={handleChange} select required fullWidth>
            {status.map((s) => (
              <MenuItem value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <div className="form-group">
            <Button onClick={onClose} color="primary" autoFocus>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              OK
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StatusUpdateForm;
