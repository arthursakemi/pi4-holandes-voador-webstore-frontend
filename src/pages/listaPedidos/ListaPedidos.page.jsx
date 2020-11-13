import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './listaPedidos.styles.scss';

import Axios from 'axios';
import { Paper, Typography, Modal, Divider, CardMedia, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const PedidoResumo = ({ pedido, index, onClick }) => {
  return (
    <Paper className="pedido" data-id={index} onClick={onClick}>
      <Typography variant="h6" component="span">{`#${pedido.id}`}</Typography>
      <Typography variant="body1">{`${pedido.data.split(' ')[0]}`}</Typography>
      <Typography variant="body1">{`R$ ${pedido.total.toFixed(2)}`}</Typography>
      <Typography className="status" variant="body1">{`${pedido.status}`}</Typography>
    </Paper>
  );
};

const PedidoDetalhe = ({ pedido, handleClose }) => {
  const { endereco, numero, bairro, complemento, cidade, uf, cep } = pedido.enderecoEntrega;
  return (
    <Paper className="modal-paper">
      <div className="flex-box modal-button">
        <Typography variant="h6">{`Pedido #${pedido.id}`}</Typography>
        <Typography variant="subtitle1">{`${pedido.data.split(' ')[0]}`}</Typography>
        <IconButton type="button" color="default" onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <Divider style={{ marginBottom: '10px' }} />
      <Typography variant="subtitle1">{`Forma de Pagamento: ${pedido.pagamento.split(' ')[0]}`}</Typography>
      {pedido.pagamento !== 'boleto' ? (
        <Typography variant="subtitle1">{`${pedido.pagamento.split(' ')[1]}x R$ ${(pedido.total / pedido.pagamento.split(' ')[1]).toFixed(
          2
        )}`}</Typography>
      ) : null}
      <Typography variant="body2">{`Frete: R$ ${pedido.frete.toFixed(2)}`}</Typography>
      <Typography variant="h6">{`Total: R$ ${pedido.total.toFixed(2)}`}</Typography>
      <Typography variant="subtitle1">{`Status do pedido: ${pedido.status}`}</Typography>
      <Divider style={{ margin: '10px 0' }} />
      <Typography variant="h6">Entrega</Typography>
      <Typography variant="body2">{`${endereco}, ${numero} - ${bairro}`}</Typography>
      <Typography variant="body2">{`${complemento}`}</Typography>
      <Typography variant="body2">{`${cidade}, ${uf.toUpperCase()} - ${cep}`}</Typography>
      <Divider style={{ margin: '10px 0' }} />
      <Typography variant="h6">Produtos</Typography>
      {pedido.produtos.map(({ produto, quantidade, tamanho }) => (
        <ProdutoCompra produto={produto} quantidade={quantidade} tamanho={tamanho} />
      ))}
    </Paper>
  );
};

const ProdutoCompra = ({ produto, tamanho, quantidade }) => {
  const { nome, imagens, valor } = produto;
  return (
    <div className="cart-item card">
      <CardMedia className="cart-img" image={imagens[0].imagem} />
      <div className="cart-text">
        <div>
          <h2 className="cart-product-name">{nome}</h2>
          <h3>{`Tam: ${tamanho.toUpperCase()} Qt: ${quantidade}`}</h3>
        </div>
        <h3 className="cart-product-price">{`R$ ${valor.toFixed(2)}`}</h3>
      </div>
    </div>
  );
};

const ListaPedidosPage = ({ user }) => {
  const userId = useParams().id;
  const [pedidos, setPedidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const history = useHistory();

  const handleClose = () => setOpen(false);

  const handleClick = (e) => {
    const id = e.currentTarget.dataset.id;
    setSelected(id);
    setOpen(true);
  };

  useEffect(() => {
    if (user.cargo !== 'cliente') {
      history.push('/login');
    }
  });

  useEffect(() => {
    const url = `https://dutchman-backend-prod.herokuapp.com/venda/${userId}`;
    Axios.get(url)
      .then((res) => setPedidos(res.data))
      .catch((e) => console.log(e));
  }, [userId]);

  return (
    <main className="lista-pedidos-page">
      <h1 className="form-title">Meus Pedidos</h1>
      {pedidos.map((pedido, index) => (
        <PedidoResumo key={index} index={index} pedido={pedido} onClick={handleClick} />
      ))}
      <Modal className="pedido-modal" open={open} onClose={handleClose}>
        <PedidoDetalhe pedido={pedidos[selected]} handleClose={handleClose} />
      </Modal>
    </main>
  );
};

export default ListaPedidosPage;
