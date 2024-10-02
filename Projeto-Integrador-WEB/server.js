const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para artigos sobre cuidados com diferentes espécies
app.get('/artigos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'artigos.html'));
});

// Rota para guias de alimentação, saúde e treinamento
app.get('/guias', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'guias.html'));
});

// Rota para fóruns de discussão entre os usuários
app.get('/forum', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

// Rota para a seção de adoção e resgate de animais
app.get('/adocao', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adocao.html'));
});

// Rota para a aba de doações
app.get('/doacoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'doacoes.html'));
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




