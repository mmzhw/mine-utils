const fs = require('fs');
const path = require('path');

// 指定要读取的目录
const directoryPath = './'; // 替换为你的目录路径

// 视频文件扩展名
const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv'];

// 获取指定目录下所有视频文件名
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('无法读取目录: ' + err);
    }

    // 过滤出视频文件
    const videoFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return videoExtensions.includes(ext);
    });

    // 将文件名放入数组
    const videoFileNames = videoFiles.map(file => path.basename(file, path.extname(file)));

    // 将数组写入到 name.txt 文件
    fs.writeFile('name.txt', JSON.stringify(videoFileNames, null, 2), (err) => {
        if (err) {
            return console.error('写入文件失败: ' + err);
        }
        console.log('文件名已成功写入 name.txt');
    });
});
