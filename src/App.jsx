import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './app.css';

import Header from './components/header/Header.component';
import HomePage from './pages/homepage/Home.page';
import CadastroProduto from './pages/cadastroProduto/CadastroProduto.page';
import GaleriaProdutos from './pages/galeriaProdutos/GaleriaProdutos.page';
import EdicaoProduto from './pages/ediçãoProduto/EdicaoProduto.page';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/produtos/cadastro" component={CadastroProduto} />
        <Route exact path="/produtos/editar/:id" component={EdicaoProduto} />
        <Route path="/produtos" component={GaleriaProdutos} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
