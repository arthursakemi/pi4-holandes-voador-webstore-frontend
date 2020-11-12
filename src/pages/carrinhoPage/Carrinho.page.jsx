import { CardMedia } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './carrinho.styles.scss';

import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const Carrinho = ({ user, cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const [frete, setFrete] = useState(0);
  const history = useHistory();

  const incrementQuantity = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const updatedCart = [...cart];
    updatedCart[id].quantidade += 1;
    setCart(updatedCart);
  };

  const decrementQuantity = (e) => {
    const index = Number(e.currentTarget.dataset.id);
    const updatedCart = [...cart];
    updatedCart[index].quantidade -= 1;

    if (updatedCart[index].quantidade === 0) {
      setCart(updatedCart.filter((_, i) => i !== index));
    } else {
      setCart(updatedCart);
    }
  };

  const CartItem = ({ item, itemIndex }) => {
    const { idProduto, nome, imagem, tamanho, quantidade, preco } = item;
    return (
      <div className="cart-item">
        <CardMedia className="cart-img" image={imagem.imagem} />
        <div className="cart-text">
          <div>
            <h2 className="cart-product-name">{nome}</h2>
            <h3>{`Tam: ${tamanho.toUpperCase()}`}</h3>
          </div>

          <div className="quantidade-container">
            <KeyboardArrowUp onClick={incrementQuantity} data-id={itemIndex} />
            <h2 className="quantidade">{quantidade}</h2>
            <KeyboardArrowDown onClick={decrementQuantity} data-id={itemIndex} />
          </div>
          <h3 className="cart-product-price">{`R$ ${preco.toFixed(2)}`}</h3>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const newTotal = cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <main className="checkout-page">
      <h1 className="form-title">Carrinho</h1>
      <div className="cart-container">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} itemIndex={index} />
        ))}
      </div>
      <div class="cart-label">
        <h3>Total :</h3>
        <h3 id="total">{`R$ ${total.toFixed(2)}`}</h3>
      </div>
      <Button type="button" onClick={() => history.push('/')} color="primary">
        Continuar Comprando
      </Button>
      <div class="form-group">
        <Button type="button" variant="contained" onClick={() => setCart([])} fullWidth>
          esvaziar carrinho
        </Button>
        <Button type="submit" variant="contained" onClick={() => history.push('/checkout')} color="primary" fullWidth>
          fechar pedido
        </Button>
      </div>
    </main>
  );
};

export default Carrinho;
