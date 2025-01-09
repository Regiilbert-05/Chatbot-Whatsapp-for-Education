// login.js
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Menggunakan LocalAuth untuk menyimpan sesi secara lokal
const client = new Client({
    authStrategy: new LocalAuth() // Menggunakan LocalAuth untuk menyimpan sesi
});

client.on('qr', (qr) => {
    // Tampilkan QR code di terminal
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Ekspor client untuk digunakan di file lain
module.exports = client;