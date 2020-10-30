import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './edicaoCliente.styles.scss';

import { Button, Stepper, Step, StepLabel } from '@material-ui/core';
import ClientForm from '../../components/cliente-form/ClientForm.component';
import EnderecoFaturamentoForm from '../../components/endereco-faturamento-form/EnderecoFaturamentoForm.component';
import EnderecosEntregaForm from '../../components/enderecos-entrega-form/EnderecosEntregaForm.component';

import Axios from 'axios';
import DoneOverlay from '../../components/done-overlay/DoneOverlay.component';

const initialFormData = {
  nome: '',
  cpf: '',
  email: '',
  enderecoFaturamento: {
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    uf: '',
    bairro: '',
  },
  enderecosEntrega: [],
  senha: '',
  cargo: 'cliente',
};

const initialErrorState = {
  nome: false,
  cpf: false,
  email: false,
  senha: false,
  cep: false,
};

const EdicaoCliente = ({ user }) => {
  const history = useHistory();
  const userId = useParams().id;
  const [formData, setFormData] = useState(initialFormData);
  const [passo, setPasso] = useState(0);
  const [error, setError] = useState(initialErrorState);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cpf, nome, email, senha, cep } = error;

    if (cpf || nome || email || senha || cep) return;

    switch (passo) {
      case 0:
        updateClienteInfo(userId, formData);
        break;
      case 1:
        const { id } = formData.enderecoFaturamento;
        console.log(id);
        updateAddress(id, formData.enderecoFaturamento);
        break;
      case 2:
        break;
      default:
        break;
    }

    if (passo != 2) {
      setPasso((state) => state + 1);
      return;
    }

    history.push('/');
  };

  const updateClienteInfo = (id, cliente) => {
    const url = `https://dutchman-backend-prod.herokuapp.com/cliente/${id}`;

    Axios.patch(url, cliente)
      .then((res) => {
        setFormData(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const updateAddress = (id, endereco) => {
    const url = `https://dutchman-backend-prod.herokuapp.com/endereco/${id}`;

    Axios.patch(url, endereco)
      .then((res) => {
        console.log(res.data);
        getCurrentClient();
      })
      .catch((e) => console.log(e));
  };

  const handleCancelCadastro = () => {
    if (passo === 0) {
      history.push('/backoffice/funcionarios');
    } else {
      setPasso((state) => state - 1);
    }
  };

  const formProps = { formData, setFormData, error, setError, edicao: true };

  const steps = ['Dados Pessoais', 'Endereço de Faturamento', 'Endereços de Entrega'];

  const getStepPage = (step) => {
    switch (step) {
      case 0:
        return <ClientForm {...formProps} />;
      case 1:
        return <EnderecoFaturamentoForm {...formProps} />;
      case 2:
        return <EnderecosEntregaForm {...formProps} />;
      default:
        return;
    }
  };

  useEffect(() => {
    getCurrentClient();
  }, []);

  useEffect(() => {
    if (user.cargo !== 'cliente') {
      history.push('/');
    }
  }, []);

  const getCurrentClient = () => {
    const url = `https://dutchman-backend-prod.herokuapp.com/cliente/${userId}`;

    Axios.get(url)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <main className="pagina-cadastro-funcionario">
      <h1 className="form-title">Edição de Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <Stepper activeStep={passo} alternativeLabel>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepPage(passo)}

          <div className="form-group">
            <Button type="button" variant="contained" onClick={handleCancelCadastro} fullWidth>
              {passo === 0 ? 'Cancelar' : 'Voltar'}
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {passo === 2 ? 'Salvar' : 'Avançar'}
            </Button>
          </div>
        </div>
      </form>
      {showModal ? <DoneOverlay success={success} msg={overlayMessage} setDone={setShowModal} /> : ''}
    </main>
  );
};

export default EdicaoCliente;
