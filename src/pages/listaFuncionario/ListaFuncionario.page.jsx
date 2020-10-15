import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Axios from 'axios'

import './listaFuncionario.styles.scss'

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { Delete, AccountCircle, AddCircleOutline } from '@material-ui/icons'

const ListaFuncionario = () => {
    const history = useHistory();
    const [ listaFuncionarios, setListaFuncionarios ] = useState([]);

    useEffect(() => {
        const url = 'https://dutchman-backend-prod.herokuapp.com/usuario';
        Axios.get(url).then((res) => {
            const funcionariosList = res.data;
            setListaFuncionarios(funcionariosList);
            console.log(listaFuncionarios);
        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const handleAddAccountClick = () => {
        history.push('/backoffice/cadastro');
    }

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
                        {listaFuncionarios.map((el) => (
                            <TableRow key={el.id}>
                                <TableCell component="th" scope="row">
                                    {el.nome}
                                </TableCell>
                                <TableCell align="right">{el.email}</TableCell>
                                <TableCell align="right">{el.cargo}</TableCell>
                                <TableCell align="right">
                                    <AccountCircle className="accountInfo" />
                                </TableCell>
                                <TableCell align="center">
                                    <Delete className="accountDelete" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    )
}

export default ListaFuncionario