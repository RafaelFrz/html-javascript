const formulario = document.getElementById('formulario');
const dados = document.getElementById('dados')

tabelaSalva();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    console.log(evento);

    let registro = $('#formulario').serializeArray();
    let cadastro = arrayToObject(registro);

    adicionarRegistro(cadastro);

    //SET - Setar, definir, salvar
    //GET - Pegar, buscar

    //recuperar os registros já cadastrados no banco
    //como no banco ta cadastrado como string, precisamos do JSON.parse()
    //para forçar a ser um objeto/array
    let clientes = JSON.parse(localStorage.getItem('clientes')) || []

    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    clientes.push(JSON.stringify(cadastro));

    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    localStorage.setItem('clientes', JSON.stringify(clientes));
})

// o parametro "array" deve ser gerado a partir da funcao
// .serializeArray() do jQuery para funcionar corretamente
function arrayToObject(array) {
    let object = {};
    array.forEach(campo => {
        object[campo.name] = campo.value;
    });
    return object;
}

function adicionarRegistro(cadastro) {
    //cria um novo elemento <tr></tr> e atribui a variavel tr
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
            <td>${cadastro.nome} ${cadastro.sobrenome}</td>
            <td>${cadastro.email}</td>
            <td>${cadastro.bairro}, ${cadastro.rua}, ${cadastro.numeroCasa} ${cadastro.complemento} </td>
            <td>${cadastro.estado}</td>
            <td>${cadastro.cidade} </td>
            <td>${cadastro.cep} </td>
        </tr>
    `;
    dados.appendChild(tr);
}

function tabelaSalva() {
    let tabelaSalva = JSON.parse(localStorage.getItem('clientes')) || [];
    tabelaSalva.forEach(cliente => {
        cliente = JSON.parse(cliente);
        adicionarRegistro(cliente);
    })
}