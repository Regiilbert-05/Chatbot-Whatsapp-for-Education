// templates.js
const fs = require('fs').promises;

const path = './templates.json'; // Path untuk file JSON
const templates = {};

// Fungsi untuk menyimpan templat ke file secara asynchronous
async function saveTemplates() {
    try {
        await fs.writeFile(path, JSON.stringify(templates, null, 2));
    } catch (err) {
        console.error('Error saving templates:', err);
    }
}

// Fungsi untuk memuat templat dari file
async function loadTemplates() {
    try {
        if (await fs.stat(path)) {
            const data = await fs.readFile(path);
            Object.assign(templates, JSON.parse(data));
        }
    } catch (err) {
        console.error('Error loading templates:', err);
    }
}

// Memuat templat saat aplikasi dimulai
loadTemplates();

// Ekspor fungsi dan objek yang diperlukan
module.exports = { templates, saveTemplates, loadTemplates };