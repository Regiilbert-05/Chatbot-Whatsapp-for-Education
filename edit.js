// edit.js
const { templates, editTemplates, saveTemplates } = require('./templates');

const handleEditCommand = async (message, userStates, userId, command) => {
    switch (true) {
        case userStates[userId] && userStates[userId].step === 2.1:
            const commandNameEdit = command.trim();
            if (templates[commandNameEdit]) {
                userStates[userId].commandName = commandNameEdit; // Simpan nama perintah
                userStates[userId].step = 2.2; // Pindah ke langkah 2
                message.reply(`Template untuk perintah "${commandNameEdit}" ditemukan. Silakan masukkan isi baru untuk template.`);
            } else {
                message.reply(`Perintah "${commandNameEdit}" tidak ditemukan.`);
                delete userStates[userId]; // Reset status pengguna
            }
            break;

        case userStates[userId] && userStates[userId].step === 2.2:
            const newTemplateContent = command.trim();
            const commandNameEditFinal = userStates[userId].commandName;

            // Memeriksa apakah template ada
            if (templates[commandNameEditFinal]) {
                // Mengganti isi template yang ada dengan yang baru
                templates[commandNameEditFinal].splice(0, commandNameEditFinal.length, newTemplateContent);
                message.reply(`Template "${commandNameEditFinal}" telah diperbarui: "${newTemplateContent}"`);
            } else {
                message.reply(`Template "${commandNameEditFinal}" tidak ditemukan.`);
            }

            await saveTemplates(); // Simpan perubahan ke file setelah semua perubahan selesai
            delete userStates[userId]; // Reset status pengguna setelah selesai
            break;
    }
};

module.exports = { handleEditCommand };