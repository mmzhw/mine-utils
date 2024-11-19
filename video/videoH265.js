const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 视频文件扩展名
const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.flv'];

// 遍历目录并处理文件
function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 如果是目录，则递归处理
            processDirectory(filePath);
        } else if (stat.isFile() && isVideoFile(filePath)) {
            // 如果是视频文件，则进行转换
            convertToH265(filePath);
        }
    }
}

// 检查文件是否是视频文件
function isVideoFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return videoExtensions.includes(ext);
}

// 使用 FFmpeg 将视频转换为 H.265
function convertToH265(filePath) {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const fileName = path.basename(filePath, ext);
    const tempFilePath = path.join(dir, `${fileName}_temp.mp4`);

    try {
        console.log(`正在转换: ${filePath}`);

        // 调用 FFmpeg，使用独立显卡 (NVENC) 进行 H.265 编码
        const ffmpegCommand = `ffmpeg -y -i "${filePath}" -c:v hevc_nvenc -preset medium -b:v 0 -c:a copy "${tempFilePath}"`;
        execSync(ffmpegCommand, { stdio: 'inherit' });

        // 替换原文件
        fs.unlinkSync(filePath);
        fs.renameSync(tempFilePath, filePath);

        console.log(`转换完成: ${filePath}`);
    } catch (error) {
        console.error(`转换失败: ${filePath}`, error);
        // 清理临时文件
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
    }
}

// 执行脚本
const targetDirectory = process.argv[2] || '.';
processDirectory(targetDirectory);
console.log('处理完成');
