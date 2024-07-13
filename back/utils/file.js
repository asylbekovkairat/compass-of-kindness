const fs = require('fs');

const exists = async (filePath) =>
    !!(await fs.promises.stat(filePath).catch((e) => {
        if (process.env.DEBUG_MODE === 'true') {
            console.debug(e);
        }
        return false;
    }));

const deleteFile = async (filePath) =>
    await fs.promises.unlink(filePath).catch((e) => {
        if (process.env.DEBUG_MODE === 'true') {
            console.debug(e);
        }
        return false;
    });

const listDir = async (dirPath) =>
    await fs.promises.readdir(dirPath).catch((e) => {
        if (process.env.DEBUG_MODE === 'true') {
            console.debug(e);
        }
        return [];
    });

const write = async (filePath, content) => await fs.promises.writeFile(filePath, content, 'utf8');
const read = async (filePath) => await fs.promises.readFile(filePath, 'utf8');

// require("fs").readFile("FILE.TXT", "utf8", (err, data) => { console.log(data); });

module.exports = { exists, deleteFile, listDir, write, read };
