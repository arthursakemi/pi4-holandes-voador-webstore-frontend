import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './app.css';

import Header from './components/header/Header.component';
import HomePage from './pages/homepage/Home.page';
import CadastroProduto from './pages/cadastroProduto/CadastroProduto.page';
import GaleriaProdutos from './pages/galeriaProdutos/GaleriaProdutos.page';
import DetalheProduto from './pages/detalhe-produto/DetalheProduto.page';
import EdicaoProduto from './pages/edicaoProduto/EdicaoProduto.page';
import CadastroFuncionario from './pages/cadastroFuncionario/cadastroFuncionario.page';
import ListaFuncionario from './pages/listaFuncionario/ListaFuncionario.page';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/produtos/cadastro" component={CadastroProduto} />
        <Route exact path="/produtos/:id" component={DetalheProduto} />
        <Route exact path="/produtos/editar/:id" component={EdicaoProduto} />
        <Route exact path="/produtos/categoria/:categoria" component={GaleriaProdutos} />
        <Route path="/produtos" component={GaleriaProdutos} />
        <Route exact path="/backofice/login" />
        <Route exact path="/backofice/cadastro" component={CadastroFuncionario} />
        <Route exact path="/backofice/funcionarios" component={ListaFuncionario}/>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
