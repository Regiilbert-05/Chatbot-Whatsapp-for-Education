// delete.js
const { templates, saveTemplates } = require('./templates');

const handleDeleteCommand = async (message, userStates, userId, command) => {
 // Mengambil nama command yang ingin dihapus
    switch (true) {
        case userStates[userId] && userStates[userId].step === 3.1:
            const commandNameToDelete = command.trim();
            if (templates[commandNameToDelete]) {
                console.log('masuk ke delete!(3)');
                userStates[userId].commandName = commandNameToDelete; // Simpan nama perintah
                delete templates[commandNameToDelete]; // Menghapus command dari templates
                await saveTemplates(); // Simpan perubahan ke file setelah semua perubahan selesai
                message.reply(`Command "${commandNameToDelete}" telah dihapus.`);
            } else {
                 message.reply(`Command "${commandNameToDelete}" tidak ditemukan.`);
    }

    delete userStates[userId]; // Reset status pengguna setelah selesai
};
};
module.exports = { handleDeleteCommand };