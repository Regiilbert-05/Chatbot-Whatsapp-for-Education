// messages.js
const client = require('./login');
const { templates, saveTemplates } = require('./templates');
const { handleEditCommand } = require('./edit');
const { handleDeleteCommand } = require('./delete');
const userStates = {}; // Menyimpan status pengguna

client.on('message', async (message) => {
    const command = message.body.toLowerCase();
    const userId = message.from; // Menggunakan ID pengirim untuk menyimpan status

    switch (true) {
        case command === '.list':
            const commandNames = Object.keys(templates);
            if (commandNames.length > 0) {
                message.reply(`Daftar perintah yang telah dibuat:\n.${commandNames.join('\n.')}`);
            } else {
                message.reply('Belum ada perintah yang dibuat.');
            }
            break;

        case command === '.reset':
            // Mengosongkan isi templates
            for (const key in templates) {
                delete templates[key]; // Menghapus semua entri dalam templates
            }
            await saveTemplates(); // Simpan perubahan ke file
            message.reply('Semua template telah direset.');
            break;

        case command === '.buat':
            userStates[userId] = { step: 1.1 };
            message.reply('Silakan masukkan nama perintah untuk template.');
            break;

        case userStates[userId] && userStates[userId].step === 1.1:
            const newCommandName = command.trim();
            userStates[userId].commandName = newCommandName; // Simpan nama perintah
            userStates[userId].step = 1.2; // Langsung ke langkah 3
            message.reply('Silakan masukkan isi templat untuk perintah "' + newCommandName + '".');
            break;

        case userStates[userId] && userStates[userId].step === 1.2:
            const templateContent = command.trim();
            const commandNameFinal = userStates[userId].commandName;

            if (!templates[commandNameFinal]) {
                templates[commandNameFinal] = []; // Jika belum ada, buat array baru
            }
            templates[commandNameFinal].push(templateContent); // Menambahkan isi templat ke dalam array
            message.reply(`Template "${commandNameFinal}" telah disimpan: "${templateContent}"`);

            await saveTemplates(); // Simpan templat ke file

            delete userStates[userId]; // Reset status pengguna setelah selesai
            break;

        case command.startsWith('.edit'):
            userStates[userId] = { step: 2.1 };
            console.log('masuk ke edit!(1)');
            message.reply('Silakan masukkan nama perintah yang ingin diedit.');
            break;
    
        // Panggil fungsi handleEditCommand
        case userStates[userId] && userStates[userId].step === 2.1:
            console.log('masuk ke edit!(2)');
            await handleEditCommand(message, userStates, userId, command);
            break;

        case command === '.delete':
            userStates[userId] = { step: 3.1 }; // Menyimpan status untuk penghapusan
            message.reply('Silakan masukkan nama command yang ingin dihapus.');
            console.log('masuk ke delete!');
            break;
        
        // Panggil fungsi handleDeleteCommand
        case userStates[userId] && userStates[userId].step === 3.1:
            console.log('masuk ke delete!(2)');
            await handleDeleteCommand(message, userStates, userId, command);
            break;

        case command.startsWith('.'):
            const commandNameShow = command.slice(1).trim(); // Menghapus '.' dari awal
            const userTemplates = templates[commandNameShow];

            if (userTemplates && userTemplates.length > 0) {
                const response = userTemplates.join('\n'); // Menggabungkan semua isi templat
                message.reply(`${response}`);
            } else {
                message.reply(`Command ".${commandNameShow}". tidak ditemukan`);
            }
            break;

    }
});