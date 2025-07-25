import { error } from 'console';
import fs from 'fs';

 

function createDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (error) => {
            if (error) reject(error);
            else resolve(`Directory '${dirPath}' created successfully`);
        });
    });
}

function createFile(filePath, content = '') {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(`File '${filePath}' created successfully`);
            }
        });
    });
}

function listFiles(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (error, files) => {
            if (error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    });
}

function readFile(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(dirPath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (error) => {
            if (error) {
                reject(error);
            } else {
                resolve('File written successfully');
            }
        });
    });
}

function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve('File deleted successfully');
            }
        });
    });
}

export default { createDirectory, createFile, listFiles, readFile, writeFile, deleteFile };
