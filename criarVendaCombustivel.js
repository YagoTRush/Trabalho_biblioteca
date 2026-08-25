document.getElementById('formEmprestimoLivro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const preco = document.getElementById('preco').value;
    const isbn = document.getElementById('isbn').value;
    const data_abastecimento = document.getElementById('data_abastecimento').value;

    const response = await fetch('http://localhost:3000/vendaCombustivel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, preco, isbn, data_abastecimento })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Empréstimo cadastrado!';
        document.getElementById('formEmprestimoLivro').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});


