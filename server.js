// server.js - Backend para servir archivos estáticos y cifrado simétrico y asimétrico en el puerto 8080
const express = require('express'); // Framework para crear el servidor
const path = require('path'); // Módulo para manejar rutas de archivos
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las solicitudes
const CryptoJS = require('crypto-js'); // Librería para cifrado simétrico (AES)
const forge = require('node-forge'); // Librería para cifrado asimétrico (RSA)

const app = express(); // Crear la aplicación de Express
const port = 8080; // Puerto en el que se ejecutará el servidor

// Middleware para parsear el contenido en formato JSON
app.use(bodyParser.json());

// Middleware para servir archivos estáticos de la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta raíz para redirigir a la carpeta frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Enviar el archivo index.html de la carpeta frontend
});

// ------------------------ Rutas para Cifrado Simétrico y Asimétrico ------------------------

// Ruta para cifrar mensajes con clave simétrica (AES como simulación de IDEA)
app.post('/encrypt-symmetric', (req, res) => {
  const { message, key } = req.body;
  const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
  res.send({ encryptedMessage });
});

// Ruta para descifrar mensajes con clave simétrica (AES como simulación de IDEA)
app.post('/decrypt-symmetric', (req, res) => {
  const { encryptedMessage, key } = req.body;
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
  res.send({ decryptedMessage });
});

// Generación de claves para cifrado asimétrico (clave pública y privada)
const keypair = forge.pki.rsa.generateKeyPair(2048); // Genera un par de claves RSA de 2048 bits
const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey); // Convertir clave pública a formato PEM
const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey); // Convertir clave privada a formato PEM

// Ruta para cifrar mensajes con la clave pública (RSA como simulación de MQV)
app.post('/encrypt-asymmetric', (req, res) => {
  const { message } = req.body;
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(message, 'RSA-OAEP'); // Cifrado usando RSA-OAEP
  const encryptedMessage = forge.util.encode64(encrypted); // Codificar a base64
  res.send({ encryptedMessage });
});

// Ruta para descifrar mensajes con la clave privada (RSA como simulación de MQV)
app.post('/decrypt-asymmetric', (req, res) => {
  const { encryptedMessage } = req.body;
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const decoded = forge.util.decode64(encryptedMessage); // Decodificar de base64
  const decryptedMessage = privateKey.decrypt(decoded, 'RSA-OAEP'); // Descifrado usando RSA-OAEP
  res.send({ decryptedMessage });
});

// ------------------------ Arranque del servidor en el puerto 8080 ------------------------

// Iniciar el servidor en el puerto 8080
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
