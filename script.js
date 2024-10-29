// Seleciona elementos do DOM
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");

// Cria novos objetos de áudio para diferentes sons
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");

// Seleciona o elemento que mostra o estado do botão e o timer
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const tempoNaTela = document.querySelector("#timer");

// Define o tempo inicial em segundos (25 minutos)
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// Configura a música para tocar em loop
musica.loop = true;

// Adiciona um evento ao botão para alternar a música
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play(); // Toca a música se estiver pausada
  } else {
    musica.pause(); // Pausa a música se estiver tocando
  }
});

// Evento para o botão de foco
focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500; // Define o tempo para foco
  alterarContexto("foco"); // Muda o contexto da aplicação
  focoBt.classList.add("active"); // Marca o botão como ativo
});

// Evento para o botão de descanso curto
curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300; // Define o tempo para descanso curto
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

// Evento para o botão de descanso longo
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900; // Define o tempo para descanso longo
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

// Função para alterar o contexto da aplicação
function alterarContexto(contexto) {
  mostrarTempo(); // Atualiza o tempo na tela
  botoes.forEach(function (botao) {
    botao.classList.remove("active"); // Remove a classe ativa de todos os botões
  });
  html.setAttribute("data-contexto", contexto); // Define o contexto no HTML
  banner.setAttribute("src", `/imagens/${contexto}.png`); // Altera a imagem do banner
  // Atualiza o título com base no contexto
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `;
      break;
    default:
      break;
  }
}

// Função para a contagem regressiva
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play(); // Toca som de finalização
    alert("Tempo finalizado!"); // Alerta que o tempo acabou
    zerar(); // Chama a função para zerar o timer
    return;
  }
  tempoDecorridoEmSegundos -= 1; // Decrementa o tempo
  mostrarTempo(); // Atualiza o tempo na tela
};

// Evento para o botão de iniciar/pausar
startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play(); // Toca som de pausa
    zerar(); // Zera o timer
    return;
  }
  audioPlay.play(); // Toca som de início
  intervaloId = setInterval(contagemRegressiva, 1000); // Inicia a contagem regressiva a cada segundo
  iniciarOuPausarBt.textContent = "Pausar"; // Atualiza o texto do botão
}

// Função para zerar o timer e resetar o estado
function zerar() {
  clearInterval(intervaloId); // Para a contagem regressiva
  iniciarOuPausarBt.textContent = "Começar"; // Reseta o texto do botão
  intervaloId = null; // Reseta o ID do intervalo
}

// Função para mostrar o tempo formatado na tela
function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000); // Converte segundos para milissegundos
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  }); // Formata o tempo
  tempoNaTela.innerHTML = `${tempoFormatado}`; // Atualiza a tela com o tempo formatado
}

// Chama a função para mostrar o tempo inicial ao carregar a aplicação
mostrarTempo();
