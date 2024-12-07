const express = require('express');
const router = express.Router();

// nossos veículos
let veiculos = [
    { id: 1, nome: 'Fusion', fabricante: 'Ford', ano: 2020, combustivel: 'Flex', cor: 'Preto', preco: 75000, img: 'fusion.png' },
    { id: 2, nome: 'Omega', fabricante: 'Chevrolet', ano: 2019, combustivel: 'Gasolina', cor: 'Prata', preco: 60000, img: 'omega.png' },
    { id: 3, nome: 'HB20', fabricante: 'Hyundai', ano: 2021, combustivel: 'Flex', cor: 'Azul', preco: 45000, img: 'hb20.png' },
    { id: 4, nome: 'Voyage', fabricante: 'Volkswagen', ano: 2018, combustivel: 'Flex', cor: 'Branco', preco: 35000, img: 'voyage.png' },
    { id: 5, nome: 'Jetta', fabricante: 'Volkswagen', ano: 2022, combustivel: 'Diesel', cor: 'Preto', preco: 95000, img: 'jetta.png' }
];

// GET para listar veículos
router.get('/', (req, res) => {
    res.status(200).json(veiculos);
});

// POST para adicionar um novo veículo
router.post('/', (req, res) => {
    const { nome, fabricante, ano, combustivel, cor, preco } = req.body;
    const novoVeiculo = { 
        id: veiculos.length + 1, 
        nome, 
        fabricante, 
        ano, 
        combustivel, 
        cor, 
        preco, 
        img: 'default.png' // imagem padrão para novos veículos
    };
    veiculos.push(novoVeiculo);
    res.status(201).json(novoVeiculo);
});

// PUT para atualizar o preço de um veículo
router.put('/', (req, res) => {
    const { id, preco } = req.body;
    const veiculo = veiculos.find(v => v.id === id);
    
    if (veiculo) {
        veiculo.preco = preco;
        res.status(200).send(`Preço do veículo de ID ${id} atualizado para R$ ${preco}`);
    } else {
        res.status(404).send(`Veículo de ID ${id} não encontrado`);
    }
});

// DELETE para excluir um veículo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    veiculos = veiculos.filter(v => v.id !== parseInt(id));
    res.status(202).send(`O veículo de ID ${id} foi excluído com sucesso`);
});

module.exports = router;
