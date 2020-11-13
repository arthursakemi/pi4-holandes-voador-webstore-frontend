import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';

import './galeriaProdutos.styles.scss';

import { Card, CardActionArea, IconButton } from '@material-ui/core';

import DoneOverlay from '../../components/done-overlay/DoneOverlay.component';
import LoadingOverlay from '../../components/loading-overlay/LoadingOverlay.component';
import ProdutoCard from '../../components/card-produto-adm/CardProdutoAdm.component';
import { Add } from '@material-ui/icons';

const GaleriaProdutos = ({ user }) => {
  const [categoria] = useState(useParams().categoria);
  const [showAdd, setShowAdd] = useState(user.cargo === 'admin' || user.cargo === 'estoquista');
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
        if (categoria) {
          setProdutos(res.data.filter((el) => el.categoria.toLowerCase() === categoria.toLowerCase()));
        } else {
          setProdutos(res.data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setShowAdd(user.cargo === 'admin' || user.cargo === 'estoquista');
  }, [user]);

  useEffect(() => {
    getAllProdutos();
  }, [reload]);

  return (
    <main className="galeria-page">
      {showAdd ? (
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
        <ProdutoCard key={index} produto={produto} handleDelete={handleDelete} setReload={setReload} cargo={user.cargo} />
      ))}
      {done ? <DoneOverlay msg={overlayMsg} success={success} setDone={setDone} /> : ''}
      {loading ? <LoadingOverlay loadingText={loadingMsg} /> : ''}
    </main>
  );
};

export default GaleriaProdutos;
