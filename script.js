// Alteração de Tamanho da Fonte
let currentFontSize = 1.25; // Base rem

document.getElementById('btn-increase').addEventListener('click', () => {
    if (currentFontSize < 1.85) {
        currentFontSize += 0.15;
        document.body.style.fontSize = `${currentFontSize}rem`;
    }
});

document.getElementById('btn-decrease').addEventListener('click', () => {
    if (currentFontSize > 0.95) {
        currentFontSize -= 0.15;
        document.body.style.fontSize = `${currentFontSize}rem`;
    }
});

// Transição entre Abas
function openTab(event, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Leitor de Tela (Sintetizador de Voz Web Speech API)
const synth = window.speechSynthesis;

document.getElementById('btn-speak').addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }

    const activeSection = document.querySelector('.tab-content.active');
    const textToRead = activeSection ? activeSection.innerText : document.body.innerText;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    synth.speak(utterance);
});

document.getElementById('btn-stop').addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }
});
