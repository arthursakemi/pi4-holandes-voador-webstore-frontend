import React, { useState, useEffect } from 'react';

import './checkout.styles.scss';

import dayjs from 'dayjs';
import Axios from 'axios';

import AddressBox from '../../components/addressBox/AddressBox.component';

import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PagamentoForm from '../../components/pagamentoForm/PagamentoForm.component';
import ResumoPedido from '../../components/resumoPedido/ResumoPedido.component';

const pedidoInicial = {
  cliente: {
    id: 0,
  },
  data: '',
  enderecoEntrega: {
    id: 0,
  },
  pagamento: '',
  desconto: 0,
  frete: 10,
  total: 0,
  status: '',
  produtos: [],
};

const initialUser = {
  nome: '',
  cpf: '',
  email: '',
  enderecoFaturamento: {
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    uf: '',
    bairro: '',
  },
  enderecosEntrega: [],
  senha: '',
  cargo: 'cliente',
};

const Cartao = {
  parcelas: '0',
  numeroCartao: '',
  vencimento: '',
  codigo: '',
};

const CheckoutPage = ({ cart, setCart, user }) => {
  const [passo, setPasso] = useState(0);
  const [pedido, setPedido] = useState(pedidoInicial);
  const [cliente, setCliente] = useState(initialUser);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [cartao, setCartao] = useState(Cartao);
  const history = useHistory();

  const steps = ['Endereço de Envio', 'Método de Pagamento', 'Fechar Compra'];

  const handleAddressSelection = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    setSelectedAddress(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passo < 2) {
      setPasso((state) => state + 1);
      return;
    }

    const url = `https://dutchman-backend-prod.herokuapp.com/venda`;
    Axios.post(url, pedido)
      .then((res) => {
        console.log(res);
        setCart([]);
      })
      .then(() => history.push('/'))
      .catch((e) => console.log(e));
  };

  const back = () => {
    if (passo === 0) {
      history.push('/');
    } else {
      setPasso((state) => state - 1);
    }
  };

  const getCurrentUser = () => {
    const url = `https://dutchman-backend-prod.herokuapp.com/cliente/${user.id}`;
    Axios.get(url)
      .then((res) => {
        if (res.data) {
          setCliente(res.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const getCartItems = (cart) => {
    return cart.map(({ idProduto, tamanho, quantidade }) => ({
      produto: {
        id: idProduto,
      },
      tamanho,
      quantidade,
    }));
  };

  const getTotal = (cart, frete) => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0) + frete;
  };

  useEffect(() => {
    if (cliente.enderecosEntrega.length < 1) return;
    setPedido((state) => ({ ...state, enderecoEntrega: { id: cliente.enderecosEntrega[selectedAddress].id } }));
  }, [selectedAddress]);

  useEffect(() => {
    const enderecoEntrega = cliente.enderecosEntrega[selectedAddress];
    setPedido((state) => {
      const newState = { ...state };
      newState.cliente.id = cliente.id;
      newState.data = dayjs().format('YYYY-MM-DD HH:mm:ss');
      newState.total = getTotal(cart, pedido.frete);
      newState.produtos = getCartItems(cart);
      newState.status = 'Aguardando Pagamento';
      newState.enderecoEntrega = { id: !!enderecoEntrega ? enderecoEntrega.id : null };
      return newState;
    });
  }, [cliente]);

  useEffect(() => {
    getCurrentUser();
  }, [user]);

  const getStepPage = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <h2>Selecione o endereco de entrega</h2>
            {cliente.enderecosEntrega.map((endereco, index) => (
              <AddressBox
                key={index}
                index={index}
                endereco={endereco}
                selected={index === selectedAddress}
                onClick={handleAddressSelection}
              />
            ))}
            <div className="total">
              <h3>{`Frete: R$ ${pedido.frete.toFixed(2)}`}</h3>
              <h2>{`Total: R$ ${getTotal(cart, pedido.frete).toFixed(2)}`}</h2>
            </div>
          </>
        );
      case 1:
        return <PagamentoForm pedido={pedido} setPedido={setPedido} cartao={cartao} setCartao={setCartao} />;
      case 2:
        return <ResumoPedido pedido={pedido} cart={cart} cartao={cartao} />;
      default:
        return;
    }
  };

  return (
    <main className="checkout-page">
      <Stepper activeStep={passo} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepPage(passo)}

      <div className="form-group">
        <Button type="button" variant="contained" onClick={back} fullWidth>
          {passo === 0 ? 'Cancelar' : 'Voltar'}
        </Button>
        <Button type="button" variant="contained" onClick={handleSubmit} color="primary" fullWidth>
          {passo === 2 ? 'Fechar Pedido' : 'Avançar'}
        </Button>
      </div>
    </main>
  );
};

export default CheckoutPage;
