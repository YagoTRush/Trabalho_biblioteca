const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar emprestimos dos livros
app.post('/emprestimoLivro', (req, res) => {
    const { titulo, preco, isbn, data_emprestimo } = req.body;

    const codigoDoMySQL = 'INSERT INTO livros (titulo, preco, isbn, data_emprestimo) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [titulo, preco, isbn, data_emprestimo], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Empréstimo de livro cadastrado!' });
    });
});

// Listar emprestimos dos livros
app.get('/emprestimoLivro', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM livros';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

// Deletar emprestimo dos livros
app.delete('/vendaCombustivel/:id', (req, res) => {
    const id = req.params.id;
    const codigoDoMySQL = 'DELETE FROM livros WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar venda' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }

        res.json({ message: 'Venda excluída com sucesso!' });
    });
});

// Atualizar emprestimo dos livros
app.put('/vendaCombustivel/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, preco, isbn, data_abastecimento } = req.body;

    const codigoDoMySQL = 'UPDATE livros SET titulo = ?, preco = ?, isbn = ?, data_abastecimento = ? WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [titulo, preco, isbn, data_abastecimento, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar venda' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }

        res.json({ message: 'Venda atualizada com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
