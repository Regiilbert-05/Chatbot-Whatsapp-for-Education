const client = require('./login'); // Mengimpor client dari login.js
const { loadTemplates } = require('./templates'); // Mengimpor fungsi loadTemplates dari templates.js
const { editItem } = require('./edit'); // Mengimpor fungsi editItem dari edit.js
const { deleteItem } = require('./delete'); // Mengimpor fungsi deleteItem dari delete.js
require('./messages'); // Mengimpor file messages.js yang menangani logika pesan

// Memuat template saat aplikasi dimulai
loadTemplates().then(() => {
    console.log('Templates loaded successfully.');
}).catch(err => {
    console.error('Failed to load templates:', err);
});

// Mulai client
client.initialize();