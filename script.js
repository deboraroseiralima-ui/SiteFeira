// --- 1. LÓGICA DE AUMENTAR E DIMINUIR FONTE ---
let currentFontSize = 100; // Porcentagem do tamanho da fonte

document.getElementById('btn-increase').addEventListener('click', () => {
    if (currentFontSize < 160) { // Limite máximo
        currentFontSize += 10;
        document.body.style.fontSize = currentFontSize + '%';
    }
});

document.getElementById('btn-decrease').addEventListener('click', () => {
    if (currentFontSize > 80) { // Limite mínimo
        currentFontSize -= 10;
        document.body.style.fontSize = currentFontSize + '%';
    }
});

// --- 2. LÓGICA DE NAVEGAÇÃO POR ABAS ---
function openTab(event, tabId) {
    // Esconde todas as abas
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Desativa o estado ativo de todos os botões de abas
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => button.classList.remove('active'));

    // Mostra a aba selecionada e ativa o botão clicado
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Se a voz estiver lendo ao trocar de aba, para a leitura antiga
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}

// --- 3. LÓGICA DO LEITOR DE VOZ (ACESSIBILIDADE PARA VISÃO DEBILITADA) ---
const speakBtn = document.getElementById('btn-speak');

speakBtn.addEventListener('click', () => {
    // Verifica se o navegador já está falando
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Para a leitura
        speakBtn.textContent = '🔊 Ouvir Página';
        return;
    }

    // Pega o conteúdo de texto da aba visível no momento
    const activeSection = document.querySelector('.tab-content.active');
    if (activeSection) {
        const textToRead = activeSection.innerText;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR'; // Configura o idioma para Português do Brasil
        utterance.rate = 1.0;     // Velocidade normal da fala

        utterance.onend = () => {
            speakBtn.textContent = '🔊 Ouvir Página';
        };

        window.speechSynthesis.speak(utterance);
        speakBtn.textContent = '⏹️ Parar Leitura';
    }
});