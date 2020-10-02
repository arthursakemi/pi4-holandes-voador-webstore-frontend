import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import './cadastroProduto.styles.scss';

import { isEqual } from 'lodash';

import { TextField, MenuItem, Button } from '@material-ui/core';

import formFields from './fields';
import UploadGallery from '../../components/upload-gallery/UploadGallery.component';
import ListaPerguntas from '../../components/lista-perguntas/ListaPerguntas.component';
import DoneOverlay from '../../components/done-overlay/DoneOverlay.component';
import LoadingOverlay from '../../components/loading-overlay/LoadingOverlay.component';

const initialDataState = {
  nome: '',
  marca: '',
  categoria: '',
  valor: '',
  descricao: '',
  p: 0,
  m: 0,
  g: 0,
  unico: 0,
  palavrasChave: '',
  perguntas: [],
  imagens: [],
};

const CadastroProduto = () => {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [overlayMsg, setOverlayMsg] = useState('');
  const [success, setSuccess] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState(initialDataState);
  const [newPergunta, setNewPergunta] = useState({ pergunta: '', resposta: '' });
  const [image, setImage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://dutchman-backend-prod.herokuapp.com/produto';
    setSubmitting(true);
    Axios.post(url, formData)
      .then((res) => {
        setSubmitting(false);
        setSuccess(true);
        setOverlayMsg('Produto cadastrado com sucesso!');
        resetForm();
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        setSuccess(false);
        setOverlayMsg('Falha ao cadastrar produto!');
        setDone(true);
      })
      .finally(() => {
        setDone(true);
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleChangeQuestion = (e) => {
    const { value, name } = e.target;
    setNewPergunta((state) => ({ ...state, [name]: value }));
  };

  const handleImgSelection = (e) => {
    const { files } = e.target;
    setImage(files);
  };

  const handleAddQuestion = (e) => {
    if (newPergunta.pergunta.trim() === '' || newPergunta.resposta.trim() === '') {
      alert('Preencha ambos os campos antes de adicionar.');
      return;
    }

    setFormData((state) => ({ ...state, perguntas: [...state.perguntas, newPergunta] }));
    setNewPergunta({ pergunta: '', resposta: '' });
  };

  const handleDeleteQuestion = (e) => {
    const index = Number(e.currentTarget.name);
    const perguntasFiltradas = formData.perguntas.filter((pergunta, idx) => index !== idx);
    setFormData((state) => ({ ...state, perguntas: perguntasFiltradas }));
  };

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
        console.log(res.data);
        setFormData((state) => ({ ...state, imagens: [...state.imagens, { imagem: src }] }));
        setImage({});
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setUploading(false);
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
            loading={uploading}
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
              {child
                ? child.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))
                : ''}
            </TextField>
          ))}
          <div className="estoque-container">
            <h4>Estoque</h4>
            <div className="estoque-input-container">
              <TextField label="p" name="p" onChange={handleChange} value={formData.p} onBlur={trimWhiteSpace} type="number" />
              <TextField label="m" name="m" onChange={handleChange} value={formData.m} onBlur={trimWhiteSpace} type="number" />
              <TextField label="g" name="g" onChange={handleChange} value={formData.g} onBlur={trimWhiteSpace} type="number" />
              <TextField label="unico" name="unico" onChange={handleChange} value={formData.unico} onBlur={trimWhiteSpace} type="number" />
            </div>
          </div>
          <ListaPerguntas
            listaPerguntas={formData.perguntas}
            pergunta={newPergunta.pergunta}
            resposta={newPergunta.resposta}
            handleChange={handleChangeQuestion}
            handleAdd={handleAddQuestion}
            handleRemove={handleDeleteQuestion}
          />
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
      {done ? <DoneOverlay msg={overlayMsg} success={success} setDone={setDone} /> : ''}
      {submitting ? <LoadingOverlay loadingText={'Enviando...'} /> : ''}
    </main>
  );
};

export default CadastroProduto;
