import { CardMedia } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './checkout.styles.scss';

import { Button } from '@material-ui/core';

const CartItem = ({ item }) => {
  const { idProduto, nome, imagem, tamanho, quantidade, preco } = item;
  return (
    <div className="cart-item">
      <CardMedia className="cart-img" image={imagem.imagem} />
      <div className="cart-text">
        <h2 className="cart-product-name">{nome}</h2>
        <h2>{quantidade}</h2>
        <h3 className="cart-product-price">{`R$ ${preco.toFixed(2)}`}</h3>
      </div>
    </div>
  );
};

const Checkout = ({ user, cart }) => {
  const [total, setTotal] = useState(0);
  const [frete, setFrete] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const newTotal = cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <main className="checkout-page">
      <h1 className="form-title">Carrinho</h1>
      <div className="cart-container">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div class="cart-label">
        <h3>Total :</h3>
        <h3 id="total">{`R$ ${total.toFixed(2)}`}</h3>
      </div>
      <Button type="button" onClick={() => history.push('/produtos')} color="primary">
        Continuar Comprando
      </Button>
      <div class="form-group">
        <Button type="button" variant="contained" onClick={'handleCancelCadastro'} fullWidth>
          esvaziar carrinho
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          fechar pedido
        </Button>
      </div>
    </main>
  );
};

export default Checkout;
