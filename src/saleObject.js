const sale = {
  cliente: {
    id: 3,
  },
  data: '2020-11-05 10:10:10',
  enderecoEntrega: {
    id: 8,
  },
  pagamento: 'boleto',
  desconto: 0,
  total: 299.0,
  status: 'Aguardando Pagamento',
  produtos: [
    {
      produto: {
        id: 2,
      },
      tamanho: 'p',
      quantidade: 1,
    },
    {
      produto: {
        id: 8,
      },
      tamanho: 'unico',
      quantidade: 1,
    },
  ],
};

const cart = [
  {
    idProduto: 2,
    nome: '',
    imagem: 'link',
    tamanho: 'p',
    quantidade: 1,
    preco: 199.0,
  },
];

const Cartao = {
  parcelas: '0',
  numeroCartao: '',
  vencimento: '',
  codigo: '',
};
