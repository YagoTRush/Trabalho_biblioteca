let editandoId = null;

async function carregarEmprestimos() {
    const response = await fetch('http://localhost:3000/emprestimoLivro');
    const emprestimos = await response.json();

    let html = '<table><tr><th>ID</th><th>Título</th><th>Preço</th><th>ISBN</th><th>Data Emprestimo</th><th>Ação</th></tr>';

    emprestimos.forEach(emprestimos => {
        const data = emprestimos.data_emprestimo.split('T')[0];
        html += `<tr id="emprestimos-${emprestimos.id}">
        <td>${emprestimos.id}</td>
        <td id="c-${emprestimos.id}-0">${emprestimos.titulo}</td>
        <td id="c-${emprestimos.id}-1">${emprestimos.preco}</td>
        <td id="c-${emprestimos.id}-2">${emprestimos.isbn}</td>
        <td id="c-${emprestimos.id}-3" data-val="${data}">${data}</td>
        <td><button class="btn-editar" onclick="editarEmprestimo(${emprestimos.id})">✏️</button></td>
        </tr>`;
    });

    document.getElementById('tabelaEmprestimos').innerHTML = html + '</table>';
}

function editarEmprestimo(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input type="number" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).getAttribute('data-val')}">`;

    document.querySelector(`#emprestimos-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarEmprestimo(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarEmprestimo(id) {
    const response = await fetch(`http://localhost:3000/emprestimoLivro/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: document.getElementById(`i-${id}-0`).value,
            preco: document.getElementById(`i-${id}-1`).value,
            isbn: document.getElementById(`i-${id}-2`).value,
            data_emprestimo: document.getElementById(`i-${id}-3`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarEmprestimos();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarEmprestimos();
}

window.onload = carregarEmprestimos;