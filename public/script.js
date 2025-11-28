console.log("script carregado");

// Seleciona elementos da página
const lista = document.getElementById('listacadastro');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const btn = document.getElementById('adicionarBtn');
const form = document.querySelector('form');


// Função para listar usuários
function listarcadastro() {
    fetch('/cadastro')
        .then(res => res.json())
        .then(data => {
            lista.innerHTML = '';
            data.forEach(u => {
                const li = document.createElement('li');
                li.textContent = `${u.id} - ${u.nome} (${u.email})`;
                lista.appendChild(li);
            });
        });
}

if(btn) {
    console.log("existe");
} else {
    console.log("nao existe");
}

// Função para adicionar cadastro
btn.addEventListener('click', (event) => {    
    event.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;

    if (!nome || !email) {
        alert('Preencha nome e email!');
        return;
    }

    console.log("ok1")

    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        alert('Usuário cadastrado com sucesso!');
        console.log(data);       // Mostra resposta do servidor
        nomeInput.value = '';    // Limpa campos
        emailInput.value = '';
        listarcadastro();        // Atualiza lista
    });
});

// Carrega lista de usuários ao abrir a página
listarcadastro();
btn.addEventListener('click', () => {
    const nome = nomeInput.value;
    const email = emailInput.value;

    fetch('/cadastrope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);       // mensagem do servidor
        nomeInput.value = '';    // limpa campos
        emailInput.value = '';
        listarcadastro();        // atualiza lista
    });
});
