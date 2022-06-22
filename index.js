const formulario = document.getElementById('formulario');
const dados = document.getElementById('dados')

tabelaSalva();
adicionarEventosBotoesExclusao();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    console.log(evento);

    let registro = $('#formulario').serializeArray();
    let cadastro = arrayToObject(registro);

    //SET - Setar, definir, salvar
    //GET - Pegar, buscar

    //recuperar os registros já cadastrados no banco
    //como no banco ta cadastrado como string, precisamos do JSON.parse()
    //para forçar a ser um objeto/array
    let clientes = JSON.parse(localStorage.getItem('clientes')) || []

    let clienteCadastrado = clientes
        .map(cliente => (JSON.parse(cliente)).cpf)
        .includes(cadastro.cpf)

    console.log(clienteCadastrado)


    if (clienteCadastrado) {
        alert('CPF não disponível');
        return;
    }

    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    clientes.push(JSON.stringify(cadastro));

    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    localStorage.setItem('clientes', JSON.stringify(clientes));

    adicionarRegistro(cadastro);
    adicionarEventosBotoesExclusao();
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
            <td>
                <button class="btn btn-outline-danger exclusao" type="button" data-cadastro="${cadastro.cpf}">
                    Excluir
                </button>
            </td>
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

function adicionarEventosBotoesExclusao(){
    //para garantir (possibilidade de exceder o limite de memoria), a gente remove os eventos de todos os botões
    $('.exclusao').toArray().forEach(botaoExclusao => {
        botaoExclusao.removeEventListener('click', (evento) => excluirRegistro(evento))
    });

    //cria eventos novamente para os botoes
    $('.exclusao').toArray().forEach(botaoExclusao => {
        botaoExclusao.addEventListener('click', (evento) => excluirRegistro(evento));
    })

    function excluirRegistro(evento) {
        let exclusaoCadastroCliente = evento.target.dataset.cadastro;
        if(confirm(`Deseja excluir o cadastro de CPF ${exclusaoCadastroCliente}?`)) {
            //buscamos todos os produtos cadastrador
            let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

            //percorremos o array de produtos cadastrados e transformamos
            //cada produto em um objeto (JSON.parse()) por que a gente precisa
            //acessar as propriedades do produto. sem o JSON.parse() o produto seria
            //uma string.
            clientes = clientes.map(cliente => JSON.parse(cliente));

            //findIndex
            // é um laço que percorre todo o array ATÉ QUE a condição seja TRUE
            let index = clientes.findIndex(cliente => cliente.codigo == exclusaoCadastroCliente);

            //remove do array com base no index ATÉ QUE a condição seja TRUE
            clientes.splice(index, 1);

            clientes = clientes.map(cliente => JSON.stringify(cliente));
            localStorage.setItem('clientes', JSON.stringify(clientes));
            document.location.reload(true);
        }
    }
}