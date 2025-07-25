import fileManager from './fileManager.js';
import readlineSync from 'readline-sync';
import path from 'path';
import fs from 'fs';
import urld, { fileURLToPath } from 'url';

async function main() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const baseDir = path.join(__dirname, "my_files");

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    while (true) {
        console.log("\nMenu");
        console.log("1. Criar arquivo");
        console.log("2. Listar arquivo");
        console.log("3. Ler arquivo");
        console.log("4. Escrever arquivo");
        console.log("5. Deletar arquivo");
        console.log("6. Sair");

        const choice = readlineSync.question('Escolha uma opção: ');

        try {
            switch (choice) {
                case '1': {
                    const fileName = readlineSync.question('Digite o nome do arquivo: ');
                    const fileContent = readlineSync.question("Digite o conteúdo do novo arquivo (ou deixe em branco): ");
                    const createFilePath = path.join(baseDir, fileName);
                    const fileMessage = await fileManager.createFile(createFilePath, fileContent);
                    console.log(fileMessage);
                    break;
                }

                case '2': {
                    const files = await fileManager.listFiles(baseDir);
                    console.log("Arquivos no diretório:");
                    console.log(files.join('\n') || "Nenhum arquivo encontrado.");
                    break;
                }

                case '3': {
                    const readFileName = readlineSync.question('Digite o nome e extensão do arquivo para ler: ');
                    const filePath = path.join(baseDir, readFileName);
                    const content = await fileManager.readFile(filePath);
                    console.log("Conteúdo do arquivo:");
                    console.log(content);
                    break;
                }

                case '4': {
                    const writeFileName = readlineSync.question('Digite o nome do arquivo para escrever: ');
                    const writeFilePath = path.join(baseDir, writeFileName);
                    const newContent = readlineSync.question("Digite o conteúdo a ser escrito: ");
                    const messageWrite = await fileManager.writeFile(writeFilePath, newContent);
                    console.log(messageWrite);
                    break;
                }

                case '5': {
                    const deleteFileName = readlineSync.question('Digite o nome do arquivo para deletar: ');
                    const deleteFilePath = path.join(baseDir, deleteFileName);
                    const messageDelete = await fileManager.deleteFile(deleteFilePath);
                    console.log(messageDelete);
                    break;
                }

                case '6':
                    console.log('Saindo...');
                    return;

                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

main();
