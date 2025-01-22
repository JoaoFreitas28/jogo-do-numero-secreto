// Modificando o título do html - linha 22 
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

// Modificando o texto do paragrafo - linha 23
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Forma simplificada para modificar >>>>
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Narração de textos
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

// Modificando funções (interação com botão) - linha 27
function verificarChute() {
    let chute = document.querySelector ('input').value;
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1','Acertou!'); // modificando texto no título
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // consulta de ID - linha 28
    } else{
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p','O número secreto é menor');
        } else{
            exibirTextoNaTela('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ // verificar se número está incluido na lista
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido); // adicionar item ao final da lista
        console.log(listaDeNumerosSorteados); // checar o comportamento do código
        return numeroEscolhido;

    }
}

// Limpar campo escrito
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true) // deixar desabilitado o botão "novo jogo"
}