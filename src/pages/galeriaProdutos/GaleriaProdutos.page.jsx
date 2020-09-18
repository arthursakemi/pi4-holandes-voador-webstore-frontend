import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import './galeriaProdutos.styles.scss';

import DoneOverlay from '../../components/done-overlay/DoneOverlay.component';
import LoadingOverlay from '../../components/loading-overlay/LoadingOverlay.component';
import ProdutoCard from '../../components/card-produto-adm/CardProdutoAdm.component';

const GaleriaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [overlayMsg, setOverlayMsg] = useState('');
  const [reload, setReload] = useState(0);

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

  useEffect(() => {
    getAllProdutos();
  }, [reload]);

  return (
    <main className="galeria-page">
      {produtos.map((produto, index) => (
        <ProdutoCard key={index} produto={produto} handleDelete={handleDelete} setReload={setReload} />
      ))}
      {done ? <DoneOverlay msg={overlayMsg} success={success} setDone={setDone} /> : ''}
      {loading ? <LoadingOverlay loadingText={loadingMsg} /> : ''}
    </main>
  );
};

export default GaleriaProdutos;
