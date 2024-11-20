const fs = require('fs');
const path = require('path');

function deleteEmptyFolders(dir) {
    // 读取目录中的所有文件和文件夹
    const files = fs.readdirSync(dir);

    // 遍历每个文件和文件夹
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // 如果是文件夹，递归调用
        if (stat.isDirectory()) {
            deleteEmptyFolders(filePath);
        }
    }

    // 再次读取目录，检查是否为空
    const remainingFiles = fs.readdirSync(dir);
    if (remainingFiles.length === 0) {
        // 如果目录为空，删除该目录
        fs.rmdirSync(dir);
        console.log(`已删除空文件夹: ${dir}`);
    }
}

module.exports = deleteEmptyFolders