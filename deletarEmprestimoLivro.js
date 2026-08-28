async function carregarEmprestimos() {
    const response = await fetch('http://localhost:3000/emprestimoLivro');
    const emprestimos = await response.json();

    let html = '<table><tr><th>ID</th><th>Título</th><th>Preço</th><th>ISBN</th><th>Data Emprestimo</th><th>Ação</th></tr>';

    emprestimos.forEach(emprestimos => {
        html += `<tr id="emprestimos-${emprestimos.id}">
        <td>${emprestimos.id}</td>
        <td>${emprestimos.titulo}</td>
        <td>${emprestimos.preco}</td>
        <td>${emprestimos.isbn}</td>
        <td>${emprestimos.data_emprestimo}</td>
        <td><button class="btn-deletar" onclick="deletarEmprestimos(${emprestimos.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaEmprestimos').innerHTML = html;
}

async function deletarEmprestimos(id) {
    if (!confirm(`Excluir emprestimo ID ${id}?`)) return;

    await fetch(`http://localhost:3000/emprestimoLivro/${id}`, { method: 'DELETE' });
    document.getElementById(`emprestimos-${id}`).remove();
}

window.onload = carregarEmprestimos;
