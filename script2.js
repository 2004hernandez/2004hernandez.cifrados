// script2.js
const backendUrl = 'http://localhost:3000'; // URL del backend

// Cifrado Simétrico (Simulación de IDEA con AES)
document.getElementById('symmetricEncryptBtn').addEventListener('click', () => {
    const message = document.getElementById('symmetricMessage').value;
    const key = document.getElementById('symmetricKey').value;

    fetch(`${backendUrl}/encrypt-symmetric`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, key })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('symmetricResultText').innerText = data.encryptedMessage;
    });
});

document.getElementById('symmetricDecryptBtn').addEventListener('click', () => {
    const encryptedMessage = document.getElementById('symmetricResultText').innerText;
    const key = document.getElementById('symmetricDecryptKey').value;

    fetch(`${backendUrl}/decrypt-symmetric`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedMessage, key })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('symmetricDecryptResultText').innerText = data.decryptedMessage;
    });
});

// Cifrado Asimétrico (Simulación de MQV con RSA)
document.getElementById('asymmetricEncryptBtn').addEventListener('click', () => {
    const message = document.getElementById('asymmetricMessage').value;

    fetch(`${backendUrl}/encrypt-asymmetric`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('asymmetricResultText').innerText = data.encryptedMessage;
    });
});

document.getElementById('asymmetricDecryptBtn').addEventListener('click', () => {
    const encryptedMessage = document.getElementById('asymmetricResultText').innerText;

    fetch(`${backendUrl}/decrypt-asymmetric`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedMessage })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('asymmetricDecryptResultText').innerText = data.decryptedMessage;
    });
});
