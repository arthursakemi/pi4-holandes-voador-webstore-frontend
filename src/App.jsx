import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { verify } from 'jsonwebtoken';

import './app.css';

import Header from './components/header/Header.component';
import HomePage from './pages/homepage/Home.page';
import CadastroProduto from './pages/cadastroProduto/CadastroProduto.page';
import GaleriaProdutos from './pages/galeriaProdutos/GaleriaProdutos.page';
import DetalheProduto from './pages/detalhe-produto/DetalheProduto.page';
import EdicaoProduto from './pages/edicaoProduto/EdicaoProduto.page';
import CadastroFuncionario from './pages/cadastroFuncionario/cadastroFuncionario.page';
import LoginPage from './pages/login/Login.page';
import UserBar from './components/user-bar/UserBar.component';
import AlterarSenha from './pages/alterarSenha/AlterarSenha.page';
import ListaFuncionario from './pages/listaFuncionario/ListaFuncionario.page';
import EdicaoFuncionario from './pages/edicaoFuncionario/EdicaoFuncionario.page';
import CadastroCliente from './pages/cadastroCliente/cadastroCliente.page';
import EdicaoCliente from './pages/edicaoCliente/edicaoCliente.page';
import Carrinho from './pages/carrinhoPage/Carrinho.page';
import CheckoutPage from './pages/checkoutPage/Checkout.page';
import ListaPedidosPage from './pages/listaPedidos/ListaPedidos.page';
import PedidosBackoffice from './pages/pedidosBackoffice/PedidosBackoffice.page';

const initialUser = { id: 0, nome: '', email: '', cpf: '', cargo: '' };

function App() {
  const [jwt, setJwt] = useState(sessionStorage.getItem('jwtToken'));
  const [user, setUser] = useState(initialUser);
  const [cart, setCart] = useState([]);

  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setJwt(null);
    setUser(initialUser);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    try {
      const jwtPayload = verify(jwt, process.env.REACT_APP_JWT_KEY);
      setUser(jwtPayload);
    } catch (e) {}
    sessionStorage.setItem('jwtToken', jwt);
  }, [jwt]);

  const appProps = { jwt, setJwt, user };

  return (
    <div className="App">
      <UserBar user={user} handleLogOut={handleLogOut} cart={cart} setCart={setCart} />
      <Header />
      <Switch>
        <Route exact path="/produtos/cadastro" render={(props) => <CadastroProduto {...appProps} {...props} />} />
        <Route exact path="/produtos/:id" render={(props) => <DetalheProduto cart={cart} setCart={setCart} {...appProps} {...props} />} />
        <Route exact path="/produtos/editar/:id" render={(props) => <EdicaoProduto {...appProps} {...props} />} />
        <Route exact path="/produtos/categoria/:categoria" render={(props) => <GaleriaProdutos {...appProps} {...props} />} />
        <Route path="/produtos" render={(props) => <GaleriaProdutos {...appProps} {...props} />} />
        <Route exact path="/login" render={(props) => <LoginPage {...appProps} {...props} />} />
        <Route exact path="/cliente/cadastro" render={(props) => <CadastroCliente {...appProps} {...props} />} />
        <Route exact path="/cliente/editar/:id" render={(props) => <EdicaoCliente {...appProps} {...props} />} />
        <Route exact path="/backoffice/cadastro" render={(props) => <CadastroFuncionario {...appProps} {...props} />} />
        <Route exact path="/backoffice/funcionarios" render={(props) => <ListaFuncionario {...appProps} {...props} />} />
        <Route exact path="/backoffice/funcionarios/:id" render={(props) => <EdicaoFuncionario {...appProps} {...props} />} />
        <Route exact path="/backoffice/senha" render={(props) => <AlterarSenha {...appProps} {...props} />} />
        <Route exact path="/backoffice/vendas" render={(props) => <PedidosBackoffice {...appProps} {...props} />} />
        <Route exact path="/carrinho" render={(props) => <Carrinho cart={cart} setCart={setCart} {...appProps} {...props} />} />
        <Route exact path="/checkout" render={(props) => <CheckoutPage cart={cart} setCart={setCart} {...appProps} {...props} />} />
        <Route exact path="/compras/:id" render={(props) => <ListaPedidosPage {...appProps} {...props} />} />

        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
