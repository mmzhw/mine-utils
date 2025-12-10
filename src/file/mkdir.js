const fs = require('fs');
const path = require('path');

// 视频文件放到以视频文件名称命名的目录里

// 指定要检查的目录
const directoryPath = 'D:\\merge'; // 替换为你的目录路径

// 视频文件扩展名
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('无法读取目录: ' + err);
    }

    files.forEach(file => {
        const fileExtension = path.extname(file).toLowerCase();

        // 检查文件是否是视频文件
        if (videoExtensions.includes(fileExtension)) {
            const filePath = path.join(directoryPath, file);
            const newDirPath = path.join(directoryPath, path.basename(file, fileExtension));

            // 创建以文件名命名的目录
            fs.mkdir(newDirPath, { recursive: true }, (err) => {
                if (err) {
                    return console.error('无法创建目录: ' + err);
                }

                // 移动文件到新目录
                const newFilePath = path.join(newDirPath, file);
                fs.rename(filePath, newFilePath, (err) => {
                    if (err) {
                        return console.error('无法移动文件: ' + err);
                    }
                    console.log(`已将文件 ${file} 移动到 ${newDirPath}`);
                });
            });
        }
    });
});
