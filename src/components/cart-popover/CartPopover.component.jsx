import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './cartPopover.styles.scss';

import { CardMedia } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const CarrinhoVazio = () => <div className="carrinho-vazio">Carrinho Vazio</div>;

const CartItem = ({ produto, removeItem, hover }) => {
  const { idProdudo, nome, imagem, tamanho, quantidade, preco } = produto;
  return (
    <div className="cart-item">
      <CardMedia className="cart-item-image" image={imagem.imagem} />
      <div className="cart-item-description">
        <p className="cart-item-name">{nome}</p>
        <p>{`tam: ${tamanho.toUpperCase()} qt: ${quantidade}`}</p>
      </div>
      <div className="subtotal">{`R$ ${(preco * quantidade).toFixed(2)}`}</div>{' '}
    </div>
  );
};

const CartPopover = ({ cartItems, removeItem }) => {
  const [total, setTotal] = useState(0);
  const history = useHistory();

  const handleClick = () => {
    history.push('/carrinho');
  };

  useEffect(() => {
    const newTotal = cartItems.reduce((total, item) => total + item.preco * item.quantidade, 0);
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <div className="cart-popover">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => <CartItem key={index} produto={item} removeItem={removeItem} />)
      ) : (
        <CarrinhoVazio />
      )}
      <div className="total">
        <span>{`Total:`}</span>
        <span>{`R$ ${total.toFixed(2)}`}</span>
      </div>
      <Button type="button" onClick={handleClick} variant="contained" color="primary" fullWidth>
        Checkout
      </Button>
    </div>
  );
};

export default CartPopover;
