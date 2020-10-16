import React from 'react';
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
import { useState } from 'react';
import { useEffect } from 'react';
import UserBar from './components/user-bar/UserBar.component';

const initialUser = { nome: '', email: '', cpf: '', cargo: '' };

function App() {
  const [jwt, setJwt] = useState(sessionStorage.getItem('jwtToken'));
  const [user, setUser] = useState(initialUser);

  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setJwt(null);
    setUser(initialUser);
  };

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
      <UserBar user={user} handleLogOut={handleLogOut} />
      <Header />
      <Switch>
        <Route exact path="/produtos/cadastro" render={(props) => <CadastroProduto {...appProps} {...props} />} />
        <Route exact path="/produtos/:id" render={(props) => <DetalheProduto {...appProps} {...props} />} />
        <Route exact path="/produtos/editar/:id" render={(props) => <EdicaoProduto {...appProps} {...props} />} />
        <Route exact path="/produtos/categoria/:categoria" render={(props) => <GaleriaProdutos {...appProps} {...props} />} />
        <Route path="/produtos" render={(props) => <GaleriaProdutos {...appProps} {...props} />} />
        <Route exact path="/backoffice/login" render={(props) => <LoginPage {...appProps} {...props} />} />
        <Route exact path="/backoffice/cadastro" render={(props) => <CadastroFuncionario {...appProps} {...props} />} />
        <Route exact path="/backoffice/usuarios" />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
