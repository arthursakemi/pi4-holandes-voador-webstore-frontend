import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import './listaFuncionario.styles.scss';

import Alert from '../../components/alert/Alert.component';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Delete, AccountCircle, AddCircleOutline } from '@material-ui/icons';

const ListaFuncionario = ({ user }) => {
  const history = useHistory();
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [alertDelete, setAlertDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);

  useEffect(() => {
    getAllAccounts();
  }, []);

  useEffect(() => {
    if (!user.nome) {
      history.push('/');
    }
  }, [user]);

  const getAllAccounts = () => {
    const url = 'https://dutchman-backend-prod.herokuapp.com/usuario';
    Axios.get(url)
      .then((res) => {
        const funcionariosList = res.data;
        setListaFuncionarios(funcionariosList);
        console.log(listaFuncionarios);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddAccountClick = () => {
    history.push('/backoffice/cadastro');
  };

  const handleEditAccountClick = (e) => {
    const id = e.currentTarget.dataset.id;
    history.push(`/backoffice/funcionarios/${id}`);
  };

  const handleDeleteAccountClick = (e) => {
    const id = e.currentTarget.dataset.id;
    if (id == user.id) return;

    setIdToDelete(id);
    setAlertDelete(true);
  };

  const handleCancelDeleteConfirmation = () => {
    setAlertDelete(false);
  };

  const deleteAccount = () => {
    const url = `https://dutchman-backend-prod.herokuapp.com/usuario/${idToDelete}`;
    Axios.delete(url)
      .then((res) => {
        setAlertDelete(false);
        getAllAccounts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="funcionarios-list">
      <div className="funcionarios-list-head">
        <Typography className="texto-detalhe" variant="h4" component="h2">
          Funcionarios
        </Typography>
        <AddCircleOutline onClick={handleAddAccountClick} className="accountAdd" />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Cargo</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaFuncionarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell component="th" scope="row">
                  {usuario.nome}
                </TableCell>
                <TableCell align="right">{usuario.email}</TableCell>
                <TableCell align="right">{usuario.cargo}</TableCell>
                <TableCell align="right">
                  <AccountCircle data-id={usuario.id} className="accountInfo" onClick={handleEditAccountClick} />
                </TableCell>
                <TableCell align="center">
                  <Delete data-id={usuario.id} className="accountDelete" onClick={handleDeleteAccountClick} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Alert
        open={alertDelete}
        handleClose={handleCancelDeleteConfirmation}
        handleConfirm={deleteAccount}
        title="Confirmar exclusão de conta"
        text={`Tem certeza que deseja excluir esta conta?`}
        danger
      />
    </main>
  );
};

export default ListaFuncionario;
