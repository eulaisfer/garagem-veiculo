const express = require('express');
const fs = require('fs'); // módulo para abrir arquivo
const bodyParser = require('body-parser');

const app = express();

// configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// arquivos estáticos da pasta 'src/pages'
app.use(express.static('src/pages'));

// importação das rotas
const veiculoRotas = require('./src/routes/veiculo');

// definição de parâmetros do servidor
const hostname = '127.0.0.1';
const port = 8080;

// rota raiz (página web com listagem de veículos)
app.get('/', (req, res) => {
    const arquivoHtml = fs.readFileSync('./src/pages/index.html');
    res.status(200).end(arquivoHtml);
});

// rota para /veiculo
app.use('/veiculo', veiculoRotas);

// rodar a aplicação
app.listen(port, hostname, () => {
    console.log('Servidor rodando...');
});
