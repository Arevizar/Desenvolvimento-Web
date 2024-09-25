const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página "Sobre"
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// Rota para a página "Contato"
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));  // Certifique-se de que contact.html está na pasta public
});

// Middleware para tratar rota 404 (Página não encontrada)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,  '404.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
