const fs = require('fs');
const path = require('path');

// 目录名称改大写
// 目录下视频文件改为目录名
// 目录名称去掉-C

// 指定要处理的目录
const targetDir = './'; // 替换为你的目标目录

// 获取指定目录下的所有子目录
fs.readdir(targetDir, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error('读取目录失败:', err);
        return;
    }
    files.forEach(file => {
        if (file.isDirectory()) {
            const oldDirPath = path.join(targetDir, file.name);
            const newDirName = file.name.toUpperCase();
            const newDirPath = path.join(targetDir, newDirName);

            // 重命名目录
            fs.rename(oldDirPath, newDirPath, (err) => {
                if (err) {
                    console.error(`重命名目录失败: ${oldDirPath} -> ${newDirPath}`, err);
                    return;
                }
                console.log(`重命名目录: ${oldDirPath} -> ${newDirPath}`);

                // 处理视频文件
                fs.readdir(newDirPath, (err, files) => {
                    if (err) {
                        console.error('读取子目录失败:', err);
                        return;
                    }

                    files.forEach(file => {
                        const ext = path.extname(file).toLowerCase();
                        const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', 'wmv']; // 根据需要添加其他视频格式

                        if (videoExtensions.includes(ext)) {
                            const oldFilePath = path.join(newDirPath, file);
                            const newFileName = `${newDirName}${ext}`;
                            const newFilePath = path.join(newDirPath, newFileName);

                            // 重命名视频文件
                            fs.rename(oldFilePath, newFilePath, (err) => {
                                if (err) {
                                    console.error(`重命名文件失败: ${oldFilePath} -> ${newFilePath}`, err);
                                    return;
                                }
                                console.log(`重命名文件: ${oldFilePath} -> ${newFilePath}`);
                            });
                        }
                    });
                });
            });

        }
    });
    // files.forEach(file => {
    //     if (file.isDirectory()) {
    //         // 创建新的文件名
    //         const newFileName = file.name.replace(/-C/g, '').replace(/-U/g, '').replace(/-UC/g, '');
    //         const oldFilePath = path.join(targetDir, file.name);
    //         const newFilePath = path.join(targetDir, newFileName);
    //
    //         // 重命名文件
    //         fs.rename(oldFilePath, newFilePath, (err) => {
    //             if (err) {
    //                 return console.error('重命名文件失败: ' + err);
    //             }
    //             console.log(`已将 ${file} 重命名为 ${newFileName}`);
    //         });
    //     }
    // });
});
