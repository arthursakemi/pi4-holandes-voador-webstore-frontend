import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@material-ui/core';
import Axios from 'axios';
import { isEqual } from 'lodash';

import UploadGallery from '../../components/upload-gallery/UploadGallery.component'

import './EdicaoProduto.styles.scss';

const initialDataState = {
    nome: '',
    marca: '',
    categoria: '',
    valor: 0,
    descricao: '',
    palavrasChave: '',
    imagens: [],
};

const categorias = ['Acessórios', 'Casacos', 'Calçados', 'Masculino', 'Feminino']

const EdicaoProduto = () => {
    const [id] = useState(useParams().id);
    const [produto, setProduto] = useState(initialDataState);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState({});
    

    const uploadImage = async () => {
        if (isEqual(image, {})) {
          return;
        }
        setUploading(true);
        const data = new FormData();
        data.append('image', image[0]);
    
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
          },
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
            console.log(percentCompleted);
          },
        };

        Axios.post('https://api.imgur.com/3/image', data, config)
          .then((res) => {
            const src = res.data.data.link;

            Axios.post(`https://dutchman-backend-prod.herokuapp.com/imagem/`, { imagem: src, idProduto: produto.id }).then(() => {
                setProduto((state) => ({ ...state, imagens: [...state.imagens, { imagem: src, idProduto: produto.id }] }));
                setImage({})
            })
        })
          .catch((e) => console.log(e))
          .finally(() => {
            setUploading(false);
          });
      };

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

    useEffect(() => {
        uploadImage();
    }, [image])

    const handleChange = (e) => {
        const { value, name } = e.target;
        setProduto((state) => ({ ...state, [name]: value }));
    };

    const handleImgSelection = (e) => {
        const { files } = e.target;
        setImage(files);
    };

    const handleImageDelete = (e) => {
        const targetIndex = Number(e.currentTarget.name);
        const imageToDeleteId = produto.imagens[targetIndex].id
        
        Axios.delete(`https://dutchman-backend-prod.herokuapp.com/imagem/${imageToDeleteId}`).then((res) => {
            if(res.data) {
                const filteredImages = produto.imagens.filter((img, index) => index !== targetIndex);
                setProduto((state) => ({ ...state, imagens: filteredImages }));
            } else {
                console.log(res.data)
            }
        }).catch((error) => {
            console.log('Request Failed', error)
        })
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `https://dutchman-backend-prod.herokuapp.com/produto/${id}`;
        Axios.patch(url, produto)
          .then((res) => {
            console.log(res.status, res.data);
        })
          .catch((e) => {
            console.log(e);
        })
    };

    const trimWhiteSpace = (e) => {
        const { value, name } = e.target;
        setProduto((state) => ({ ...state, [name]: value.trim() }));
    };

    return (
        <main className="edicao-page">
            <h1 className="form-title">Edição de Produto</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <UploadGallery
                        loading={uploading}
                        progress={progress}
                        imgList={produto.imagens}
                        handleClick={handleImageDelete}
                        handleImgSelection={handleImgSelection}
                    />
                    <TextField type="text" onChange={handleChange} label="Nome:" name="nome" value={produto.nome} required onBlur={trimWhiteSpace} />
                    <TextField type="text" onChange={handleChange} label="Marca:" name="marca" value={produto.marca} required onBlur={trimWhiteSpace} />
                    <TextField onChange={handleChange} label="Categoria:" name="categoria" value={produto.categoria} required onBlur={trimWhiteSpace} select>
                        {categorias.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField type="number" onChange={handleChange} label="Valor:" name="valor" value={produto.valor} required onBlur={trimWhiteSpace} />
                    <TextField type="text" onChange={handleChange} label="Descrição:" name="descricao" value={produto.descricao} required onBlur={trimWhiteSpace} multiline />
                    <TextField type="text" onChange={handleChange} label="Palavras Chave:" name="palavrasChave" value={produto.palavrasChave} required onBlur={trimWhiteSpace} multiline />
                    <div className="form-group">
                        <Button type="button" variant="contained" fullWidth>
                          Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                          Atualizar Produto
                        </Button>
                    </div>
                </div>
            </form>
        </main>
      );
}

export default EdicaoProduto;