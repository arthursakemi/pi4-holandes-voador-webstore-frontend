import React, { useState } from 'react';
import Axios from 'axios';

import './cadastroProduto.styles.scss';

import formFields from './fields';
import { TextField, MenuItem, Button } from '@material-ui/core';

const initialDataState = {
  nome: '',
  marca: '',
  categoria: '',
  preco: '',
  descricao: '',
  palavras_chave: '',
  imagens: [],
};

const CadastroProduto = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialDataState);
  const [files, setFiles] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('foi');
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleImgSelection = (e) => {
    const { files } = e.target;
    setFiles(files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', files[0]);

    Axios.post('https://api.imgur.com/3/image', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
      },
    })
      .then((res) => {
        const src = res.data.data.link;
        console.log(res.data);
        setFormData((state) => ({ ...state, ['imagens']: [...state.imagens, src] }));
        formData.imagens.push(src);
      })
      .catch((e) => console.log(e));
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    setFormData((state) => ({ ...state, [name]: value.trim() }));
  };

  const resetForm = () => {
    setFormData(initialDataState);
  };

  return (
    <main className="pagina-cadastro">
      <h1 className="form-title">Cadastro de Produto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {formFields.map(({ name, child, ...props }) => (
            <TextField
              key={name}
              id={`${name}-input`}
              name={name}
              value={formData[name]}
              {...props}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            >
              {child ? child.map((item) => <MenuItem value={item}>{item}</MenuItem>) : ''}
            </TextField>
          ))}
          <div className="img-container">
            {formData.imagens.map((imagem, index) => (
              <img key={index} className="uploaded-img" src={imagem} alt="" srcset="" />
            ))}
          </div>
          <div className="form-group">
            <input id="upload-btn" type="file" onChange={handleImgSelection} accept="image/*" files={files} style={{ display: 'none' }} />
            <label htmlFor="upload-btn" style={{ width: '100%' }}>
              <Button variant="contained" component="span" fullWidth>
                Selecionar fotos
              </Button>
            </label>
            <Button type="button" onClick={handleUpload} variant="contained" fullWidth>
              Carregar Fotos
            </Button>
            <Button type="button" onClick={resetForm} variant="contained" fullWidth>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CadastroProduto;
