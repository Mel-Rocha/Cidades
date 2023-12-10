const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Dados fictícios de endereços (substitua pelos seus próprios dados)
const enderecos = [
  { cidade: 'São Paulo', estado: 'SP', dados: { populacao: 1234567, area: 1500 } },
  { cidade: 'Rio de Janeiro', estado: 'RJ', dados: { populacao: 987654, area: 800 } },
  // Adicione mais dados conforme necessário
];

app.use(bodyParser.json());

// Rota para listar cidades de um estado específico
app.get('/cidades/:estado', (req, res) => {
  const estado = req.params.estado.toUpperCase();
  const cidadesDoEstado = enderecos.filter(endereco => endereco.estado === estado).map(endereco => endereco.cidade);
  res.json(cidadesDoEstado);
});

// Rota para consultar dados de uma cidade específica
app.get('/cidade/:nome', (req, res) => {
  const nomeCidade = req.params.nome.toLowerCase();
  const cidade = enderecos.find(endereco => endereco.cidade.toLowerCase() === nomeCidade);
  if (cidade) {
    res.json(cidade.dados);
  } else {
    res.status(404).json({ message: 'Cidade não encontrada.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
