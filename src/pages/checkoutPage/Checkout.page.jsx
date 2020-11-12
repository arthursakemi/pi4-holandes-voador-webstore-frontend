import React, { useState } from 'react';

import './checkout.styles.scss';

import { Stepper, Step, StepLabel, Button } from '@material-ui/core';

const CheckoutPage = ({ cart }) => {
  const [passo, setPasso] = useState(0);
  const steps = ['Endereço de Envio', 'Método de Pagamento', 'Fechar Compra'];

  const getStepPage = (step) => {
    switch (step) {
      case 0:
        return '<ClientForm {...formProps} />';
      case 1:
        return '<EnderecoFaturamentoForm {...formProps} />';
      case 2:
        return '<EnderecosEntregaForm {...formProps} />';
      default:
        return;
    }
  };
  return (
    <main className="checkout-page">
      <Stepper activeStep={passo} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepPage(passo)}
    </main>
  );
};

export default CheckoutPage;
