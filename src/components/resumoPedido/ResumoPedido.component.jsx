import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

import './resumoPedido.styles.scss';

const Item = ({ item }) => (
  <div className="resumo-item">
    <div>
      <Typography variant="h6">{item.nome}</Typography>
      <Typography variant="subtitle1">{`tam: ${item.tamanho.toUpperCase()}`}</Typography>
      <Typography variant="subtitle1">{`quantidade: ${item.quantidade}`}</Typography>
    </div>
    <div className="subtotal">
      <Typography variant="h6">{`R$ ${(item.quantidade * item.preco).toFixed(2)}`}</Typography>
    </div>
  </div>
);

const ResumoPedido = ({ pedido, cart, cartao }) => {
  return (
    <>
      <Paper className="resumo">
        {cart.map((item) => (
          <Item item={item} />
        ))}
      </Paper>
      <Paper className="resumo">
        <Typography variant="subtitle1">{`Método de Pagamento: ${pedido.pagamento.split(' ')[0]}`}</Typography>
        {pedido.pagamento === 'cartão' ? (
          <>
            <Typography>{`Número: ${cartao.numeroCartao}`}</Typography>
            <Typography>{`Parcelas: ${cartao.parcelas} x R$ ${(pedido.total / cartao.parcelas).toFixed(2)}`}</Typography>
          </>
        ) : null}
      </Paper>
      <Paper className="resumo">
        <Typography className="frete-total" variant="h6">{`Frete: R$ ${pedido.frete.toFixed(2)}`}</Typography>
      </Paper>
      <Paper className="resumo">
        <Typography className="frete-total" variant="h6">{`Total: R$ ${pedido.total.toFixed(2)}`}</Typography>
      </Paper>
    </>
  );
};

export default ResumoPedido;
