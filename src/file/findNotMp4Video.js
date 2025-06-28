const fs = require('fs');
const path = require('path');

// 指定要查找的目录
const directoryPath = './'; // 替换为你的目录路径

// 定义视频文件扩展名
const videoExtensions = ['.avi', '.mov', '.wmv', '.mkv', '.flv', '.webm'];

// 递归查找目录
function findNonMp4Videos(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.error(`无法读取目录: ${err}`);
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.error(`无法获取文件状态: ${err}`);
                }

                if (stats.isDirectory()) {
                    // 如果是目录，递归查找
                    findNonMp4Videos(filePath);
                } else {
                    // 如果是文件，检查扩展名
                    const ext = path.extname(file).toLowerCase();
                    if (videoExtensions.includes(ext)) {
                        console.log(`找到非 MP4 视频文件: ${filePath}`);
                    }
                }
            });
        });
    });
}

// 开始查找
findNonMp4Videos(directoryPath);
