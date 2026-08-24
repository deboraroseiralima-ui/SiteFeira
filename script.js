// 1. Controle de Tamanho da Fonte
let currentFontSize = 1.25;

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

// 2. Modo Alto Contraste
const btnContrast = document.getElementById('btn-contrast');

btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const isContrastActive = document.body.classList.contains('high-contrast');
    btnContrast.setAttribute('aria-pressed', isContrastActive);
});

// 3. Alternância entre Abas
function openTab(event, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 4. Leitor por Voz (Sintetizador Web Speech)
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
