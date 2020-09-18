const DetalheProduto = () => {
  const [id, setId] = useState(useParams().id);
  const [produto, setProduto] = useState(initialDataState);

  useEffect(() => {
    const url = `https://dutchman-backend-prod.herokuapp.com/produto/${id}`;
    Axios.get(url).then((res) => {
      console.log(res);
      setProduto(res.data);
    });
  }, [id]);

  useEffect(() => {
    console.log(
      produto.imagens.map(({ imagem }, index) => {
        return <CardMedia key={index} className="detalhe-card-image" image={imagem} title={produto.nome} interval="2000" />;
      })
    );
  }, [produto]);

  return (
    <main className="detalhe-page">
      <h2 className="page-title">Detalhes do Produto</h2>
      <Carousel>
        {produto.imagens.map(({ imagem }, index) => {
          return <CardMedia key={index} className="detalhe-card-image" image={imagem} title={produto.nome} interval="2000" />;
        })}
      </Carousel>
      <Paper>
        <Typography gutterBottom variant="h5" component="h2">
          {produto.nome}
        </Typography>
        <Typography color="textSecondary" variant="h6" component="p">
          {`R$: ${produto.valor.toFixed(2)}`}
        </Typography>
      </Paper>
    </main>
  );
};
