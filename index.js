const primeiroTitulo = document.querySelector('#titulo');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    let aluno = prompt('Informe o nome do aluno:');

    if (!aluno) {
        return alert('E preciso informar o nome do aluno para calcular a media')
    }

    let somaNotas = 0;
    let somaPesos = 0;
    let nota = 0;
    let peso = 0;
    let media = 0;
    
    while (confirm('Deseja lancar uma nota?')) {
        nota = Number(prompt('Informe a nota:'));
        peso = Number(prompt('Informe o peso:'));
        somaNotas += nota * peso;
        somaPesos += peso;
    }

    if (somaPesos > 0) {
        media = somaNotas / somaPesos;
        alert(`A media do ${aluno} foi de ${media.toFixed(2)}`)
    } else {
        alert('Nenhuma nota informada');
    }
})