const fs = require('fs');
const path = require('path');

function renameFilesInFolders() {
    // 获取当前目录路径
    const currentDir = process.cwd();

    try {
        // 同步读取当前目录下的文件和文件夹
        const items = fs.readdirSync(currentDir);

        items.forEach((item) => {
            const itemPath = path.join(currentDir, item);

            // 检查是否为文件夹
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                // 获取文件夹中的所有文件
                const files = fs.readdirSync(itemPath);

                if (files.length === 1) {
                    // 仅有一个文件，重命名为文件夹名称，保留扩展名
                    const oldPath = path.join(itemPath, files[0]);
                    const fileExt = path.extname(files[0]);
                    const newPath = path.join(itemPath, `${item}${fileExt}`);

                    try {
                        fs.renameSync(oldPath, newPath);
                        console.log(`Renamed ${files[0]} to ${item}${fileExt}`);
                    } catch (err) {
                        console.error("Error renaming file:", files[0], err);
                    }
                } else {
                    // 多个文件，按格式 {文件夹名称}-cd{序号} 重命名，保留扩展名
                    files.forEach((file, index) => {
                        const oldPath = path.join(itemPath, file);
                        const fileExt = path.extname(file);
                        const newFileName = `${item}-cd${index + 1}${fileExt}`;
                        const newPath = path.join(itemPath, newFileName);

                        try {
                            fs.renameSync(oldPath, newPath);
                            console.log(`Renamed ${file} to ${newFileName}`);
                        } catch (err) {
                            console.error("Error renaming file:", file, err);
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.error("Error reading directory:", err);
    }
}

renameFilesInFolders();
