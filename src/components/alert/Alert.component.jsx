import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const Alert = ({ open, handleClose, handleConfirm, title, text, danger }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color={danger ? 'secondary' : 'primary'}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
