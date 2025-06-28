
const fs = require('fs');
const path = require('path');

// 获取当前目录
const currentDir = process.cwd();

// 读取当前目录下的所有文件
fs.readdir(currentDir, (err, files) => {
    if (err) {
        console.error('读取目录失败:', err);
        return;
    }

    files.forEach(file => {
        // 检查文件名是否包含目标字符串
        if (file.includes('52damu.com')) {
            const oldPath = path.join(currentDir, file);
            const newName = file.replace(/52damu\.com/g, '');
            const newPath = path.join(currentDir, newName);

            // 重命名文件
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(`重命名文件 ${file} 失败:`, err);
                } else {
                    console.log(`已重命名: ${file} -> ${newName}`);
                }
            });
        }
    });
});
