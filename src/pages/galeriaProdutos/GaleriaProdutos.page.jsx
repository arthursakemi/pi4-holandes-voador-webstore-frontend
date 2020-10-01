import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import './galeriaProdutos.styles.scss';

import { Card, CardActionArea, IconButton, Switch } from '@material-ui/core';

import DoneOverlay from '../../components/done-overlay/DoneOverlay.component';
import LoadingOverlay from '../../components/loading-overlay/LoadingOverlay.component';
import ProdutoCard from '../../components/card-produto-adm/CardProdutoAdm.component';
import { Add } from '@material-ui/icons';

const GaleriaProdutos = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [overlayMsg, setOverlayMsg] = useState('');
  const [reload, setReload] = useState(0);

  const history = useHistory();

  const handleDelete = (idProduto) => {
    const url = `https://dutchman-backend-prod.herokuapp.com/produto/${idProduto}`;
    Axios.delete(url)
      .then((res) => {
        console.log(res);
        getAllProdutos();
      })
      .catch((e) => console.log(e));
  };

  const getAllProdutos = () => {
    const url = 'https://dutchman-backend-prod.herokuapp.com/produto';
    setLoadingMsg('Carregando');
    setLoading(true);
    Axios.get(url)
      .then((res) => {
        console.log(res);
        setProdutos(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const toogleCheck = (e) => {
    setIsAdmin(e.target.checked);
  };

  useEffect(() => {
    getAllProdutos();
  }, [reload]);

  return (
    <main className="galeria-page">
      <Switch className="admin-toogle" checked={isAdmin} onChange={toogleCheck} size="small" />
      {isAdmin ? (
        <Card>
          <CardActionArea className="add-product" onClick={() => history.push(`/produtos/cadastro`)}>
            <IconButton>
              <Add className="add-product-icon" />
            </IconButton>
          </CardActionArea>
        </Card>
      ) : (
        ''
      )}
      {produtos.map((produto, index) => (
        <ProdutoCard key={index} produto={produto} handleDelete={handleDelete} setReload={setReload} isAdmin={isAdmin} />
      ))}
      {done ? <DoneOverlay msg={overlayMsg} success={success} setDone={setDone} /> : ''}
      {loading ? <LoadingOverlay loadingText={loadingMsg} /> : ''}
    </main>
  );
};

export default GaleriaProdutos;
