import React, { useState, useEffect } from 'react';

import './pagamentoForm.styles.scss';

import { TextField, Radio, FormControl, FormControlLabel, RadioGroup, FormLabel, MenuItem } from '@material-ui/core';
const Cartao = {
  parcelas: '0',
  numeroCartao: '',
  vencimento: '',
  codigo: '',
};
const PagamentoForm = ({ pedido, setPedido, cartao, setCartao }) => {
  const [pagamento, setPagamento] = useState('boleto');

  const handleChange = (e) => setPagamento(e.target.value);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCartao((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => {
    setPedido((state) => ({ ...state, pagamento: pagamento }));
  }, [pagamento]);

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Método de Pagamento</FormLabel>
        <RadioGroup aria-label="pagamento" name="pagamento" value={pagamento} onChange={handleChange}>
          <FormControlLabel value="boleto" control={<Radio />} label="Boleto" />
          <FormControlLabel value="cartão" control={<Radio />} label="Cartão de Crédito" />
        </RadioGroup>
      </FormControl>
      {pagamento === 'cartão' ? (
        <div className="form-group">
          <TextField
            label="Parcelas"
            name="parcelas"
            type="number"
            value={cartao.parcelas}
            onChange={handleCardChange}
            select
            required
            fullWidth
          >
            <MenuItem value="1">{`1x de R$ ${pedido.total.toFixed(2)}`}</MenuItem>
            <MenuItem value="2">{`2x de R$ ${(pedido.total / 2).toFixed(2)}`}</MenuItem>
            <MenuItem value="3">{`3x de R$ ${(pedido.total / 3).toFixed(2)}`}</MenuItem>
            <MenuItem value="4">{`4x de R$ ${(pedido.total / 4).toFixed(2)}`}</MenuItem>
          </TextField>
          <TextField
            label="Número do Cartão"
            name="numeroCartao"
            value={cartao.numeroCartao}
            onChange={handleCardChange}
            type="number"
            required
            fullWidth
          />
          <TextField
            label="Data de Vencimento"
            name="vencimento"
            value={cartao.vencimento}
            onChange={handleCardChange}
            type="text"
            required
            fullWidth
          />
          <TextField
            label="Código Verificador"
            name="codigo"
            value={cartao.codigo}
            onChange={handleCardChange}
            type="number"
            required
            fullWidth
          />
        </div>
      ) : null}
    </div>
  );
};

export default PagamentoForm;
