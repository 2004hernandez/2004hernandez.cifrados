// script.js - Cifrado César
document.getElementById('cesarFormCifrar').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('textCifrar').value;
    const shift = parseInt(document.getElementById('shiftCifrar').value);
    const resultText = cesarCipher(text, shift);
    document.getElementById('resultTextCifrar').innerText = resultText;
});

document.getElementById('copyCifradoBtn').addEventListener('click', function () {
    const textoCifrado = document.getElementById('resultTextCifrar').innerText;
    navigator.clipboard.writeText(textoCifrado).then(() => {
        alert("Texto copiado al portapapeles.");
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});

document.getElementById('cesarFormDescifrar').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('textDescifrar').value;
    const shift = parseInt(document.getElementById('shiftDescifrar').value);
    const resultText = cesarCipher(text, -shift);
    document.getElementById('resultTextDescifrar').innerText = resultText;
});

document.getElementById('copyDescifradoBtn').addEventListener('click', function () {
    const textoDescifrado = document.getElementById('resultTextDescifrar').innerText;
    navigator.clipboard.writeText(textoDescifrado).then(() => {
        alert("Texto copiado al portapapeles.");
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});

// Función de Cifrado César
function cesarCipher(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i].toUpperCase();
        if (alphabet.includes(char)) {
            let newIndex = (alphabet.indexOf(char) + shift) % 26;
            if (newIndex < 0) newIndex += 26; // Ajuste para valores negativos
            result += alphabet[newIndex];
        } else {
            result += char; // Mantener los caracteres que no son letras
        }
    }
    return result;
}
