import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import './cadastroProduto.styles.scss';

import formFields from './fields';
import UploadGallery from '../../components/upload-gallery/UploadGallery.component';
import { TextField, MenuItem, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Add, HighlightOff } from '@material-ui/icons';

const initialDataState = {
  nome: '',
  marca: '',
  categoria: '',
  preco: '',
  descricao: '',
  palavras_chave: '',
  perguntas: [{ pergunta: '', resposta: '' }],
  imagens: [],
};

const CadastroProduto = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState(initialDataState);
  const [image, setImage] = useState({});

  const handleAddQuestion = (e) => {
    e.preventDefault();
  };

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
    setImage(files);
  };

  const uploadImage = async () => {
    setLoading(true);
    if (image.length === 0) {
      setLoading(false);
      return;
    }

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
        console.log(res.data);
        setFormData((state) => ({ ...state, imagens: [...state.imagens, src] }));
        setImage([]);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    uploadImage();
    // eslint-disable-next-line
  }, [image]);

  const handleImageDelete = (e) => {
    const targetIndex = Number(e.currentTarget.name);
    const filteredImages = formData.imagens.filter((img, index) => index !== targetIndex);

    setFormData((state) => ({ ...state, imagens: filteredImages }));
  };

  const trimWhiteSpace = (e) => {
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
          <UploadGallery
            loading={loading}
            progress={progress}
            imgList={formData.imagens}
            handleClick={handleImageDelete}
            handleImgSelection={handleImgSelection}
          />
          {formFields.map(({ name, child, ...props }) => (
            <TextField
              key={name}
              id={`${name}-input`}
              name={name}
              value={formData[name]}
              {...props}
              onChange={handleChange}
              onBlur={trimWhiteSpace}
              fullWidth
            >
              {child ? child.map((item) => <MenuItem value={item}>{item}</MenuItem>) : ''}
            </TextField>
          ))}
          <div className="perguntas">
            <h3>FAQ</h3>

            {formData.perguntas.map(({ pergunta, resposta }, index) => (
              <div className="faq-group">
                <div className="input-group">
                  <TextField
                    value={pergunta}
                    name="pergunta"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">P:</InputAdornment>,
                    }}
                  />
                  <TextField
                    value={resposta}
                    name="resposta"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R:</InputAdornment>,
                    }}
                  />
                </div>
                <div className="flex-box">
                  <IconButton className="faq-delete-btn" name={index} type="button" color="secondary">
                    <HighlightOff />
                  </IconButton>
                </div>
              </div>
            ))}

            <IconButton className="add-faq-btn">
              <Add />
            </IconButton>
          </div>

          <div className="form-group">
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
