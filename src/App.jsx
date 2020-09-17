import React from 'react';

import './app.css';

import { Switch, Route } from 'react-router-dom';

import Header from './components/header/Header.component';
import HomePage from './pages/homepage/Home.page';
import CadastroProduto from './pages/cadastroProduto/CadastroProduto.page';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/produto/cadastro" component={CadastroProduto} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
