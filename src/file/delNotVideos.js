const fs = require('fs');
const path = require('path');

const videoExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv']; // 可根据需要添加更多视频格式
const sizeLimit = 1 * 1024 * 1024 * 1024; // 1GB

function isVideoFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return videoExtensions.includes(ext);
}

function deleteFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`无法读取目录 ${dir}: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`无法获取文件 ${filePath} 的信息: ${err}`);
                    return;
                }

                if (stats.isDirectory()) {
                    // 如果是目录，递归调用
                    deleteFiles(filePath);
                } else {
                    // 如果是文件，检查条件
                    if (!isVideoFile(filePath) || (isVideoFile(filePath) && stats.size < sizeLimit)) {
                        // 删除文件
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(`无法删除文件 ${filePath}: ${err}`);
                            } else {
                                console.log(`已删除文件: ${filePath}`);
                            }
                        });
                    }
                }
            });
        });
    });
}

// 使用示例
const targetDirectory = './'; // 替换为你的目标目录
deleteFiles(targetDirectory);
