import React from 'react';

import './app.css';

import { Switch, Route } from 'react-router-dom';

import Header from './components/header/Header.component';
import HomePage from './pages/homepage/Home.page';
import CadastroProduto from './pages/cadastroProduto/CadastroProduto.page';
import GaleriaProdutos from './pages/galeriaProdutos/GaleriaProdutos.page';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/produtos/cadastro" component={CadastroProduto} />
        <Route path="/produtos" component={GaleriaProdutos} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
