const express = require('express');
const path = require('path');
const multer = require('multer'); // Importa o multer

const app = express();
const port = 3000;

// Configuração do multer para armazenar os arquivos enviados
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Usa o nome original do arquivo
    }
});

const upload = multer({ storage: storage }); // Inicializa o multer com a configuração de armazenamento

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analisar JSON no corpo da requisição
app.use(express.json()); 
// Middleware para analisar dados URL-encoded
app.use(express.urlencoded({ extended: true }));

// Rota para a página inicial
app.get('/', (req, res) => {
    const formHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao Node.js!</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>Bem-vindo ao Node.js!</h1>
        <p>Esta é a página inicial.</p>

        <!-- Formulário para upload de arquivos -->
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <label for="file">Escolha um arquivo:</label>
            <input type="file" id="file" name="file" required>
            <br>
            <button type="submit">Enviar Arquivo</button>
        </form>
    </body>
    </html>
    `;
    res.send(formHTML); // Envia o HTML com o formulário
});

// Rota para a página "Sobre"
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html')); // Envia o arquivo about.html
});

// Rota com texto simples
app.get('/hello', (req, res) => {
    res.send('Bem vindo ao servidor mais top do mercado atual!'); // Envia uma resposta de texto simples
});

// Rota com JSON
app.get('/api/data', (req, res) => {
    res.json({ message: 'Seus dados estão aqui camarada!', data: [1, 2, 3, 4] }); // Envia uma resposta JSON
});

// Rota POST para receber dados do formulário
app.post('/submit', (req, res) => {
    const { name, message } = req.body; // Acessa os dados enviados
    res.json({ message: `Recebido com sucesso! Nome: ${name}, Mensagem: ${message}` }); // Responde com uma mensagem
});

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    // 'file' deve corresponder ao nome do campo no formulário
    res.json({ message: 'Chegou o arquivo aqui meu bom!', file: req.file }); // Responde com uma mensagem de sucesso
});

// Rota para exibir a imagem
app.get('/imagem', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'imagem.html')); // Envia o arquivo imagem.html
});

// Rota 404 para páginas não encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));  // Envia um arquivo HTML personalizado de 404
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem ao iniciar o servidor
});




