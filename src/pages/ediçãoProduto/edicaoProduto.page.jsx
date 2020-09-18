import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import './edicaoProduto.styles.scss';

const initialDataState = {
    nome: '',
    marca: '',
    categoria: '',
    valor: 0,
    descricao: '',
    p: 0,
    m: 0,
    g: 0,
    unico: 0,
    palavrasChave: '',
    perguntas: [],
    imagens: [],
};

const EdicaoProduto = () => {
    const [id, setId] = useState(useParams().id);
    const [produto, setProduto] = useState(initialDataState);

    useEffect(() => {
        const url = `https://dutchman-backend-prod.herokuapp.com/produto/${id}`;
        Axios.get(url)
            .then((res) => {
            const newProduto = res.data;
            setProduto(newProduto);
            console.log(newProduto);
        })
        .catch((e) => {
            console.log(e);
        });
    }, [id]);

    return (
        <main className="edicao-page">
            
            {done ? <DoneOverlay msg={overlayMsg} success={success} setDone={setDone} /> : ''}
            {loading ? <LoadingOverlay loadingText={loadingMsg} /> : ''}
        </main>
      );
}

export default EdicaoProduto;