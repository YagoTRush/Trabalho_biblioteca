async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/emprestimoLivro');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>id</th><th>Título</th><th>Preço</th><th>ISBN</th><th>Data Emprestimo</th></tr>';

    respostaObtida.forEach(emprestimoLivro => {
        html += `<tr>
        <td>${emprestimoLivro.id}</td>
        <td>${emprestimoLivro.titulo}</td>
        <td>${emprestimoLivro.preco}</td>
        <td>${emprestimoLivro.isbn}</td>
        <td>${emprestimoLivro.data_emprestimo}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
