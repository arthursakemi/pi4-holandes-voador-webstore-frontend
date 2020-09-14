const formFields = [
  { name: 'nome', label: 'Nome do Produto', type: 'text', required: true },
  { name: 'marca', label: 'Marca', type: 'text', required: true },
  {
    name: 'categoria',
    label: 'Categoria',
    select: true,
    child: ['Acessórios', 'Casacos', 'Calçados', 'Masculino', 'Feminino'],
    required: true,
  },
  { name: 'preco', label: 'Preço', type: 'number', required: true },
  { name: 'descricao', label: 'Descrição', type: 'text', multiline: true },
  { name: 'palavras_chave', label: 'Palavras Chave', type: 'text', multiline: true },
];

export default formFields;
