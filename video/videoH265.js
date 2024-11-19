const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 视频文件扩展名
const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.flv'];

// 获取原视频的比特率
function getOriginalBitrate(filePath) {
    try {
        const output = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
        return parseInt(output.toString().trim(), 10);
    } catch (error) {
        console.error(`无法获取比特率: ${filePath}`, error);
        return null;
    }
}

// 遍历目录并处理文件
function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && isVideoFile(filePath)) {
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

    // 获取原视频的比特率
    const originalBitrate = getOriginalBitrate(filePath);
    if (!originalBitrate) {
        console.error(`跳过文件: 无法获取比特率 ${filePath}`);
        return;
    }

    try {
        console.log(`正在转换: ${filePath}，原始比特率: ${originalBitrate} bps`);

        // 调用 FFmpeg，使用 NVENC 进行 H.265 转换，保持原有比特率
        const ffmpegCommand = `ffmpeg -y -i "${filePath}" -c:v hevc_nvenc -b:v ${Math.floor(originalBitrate / 1024)}k -maxrate ${Math.floor(originalBitrate / 1024)}k -bufsize ${Math.floor(originalBitrate / 512)}k -preset p5 -c:a copy -c:s copy -map 0 "${tempFilePath}"`;
        execSync(ffmpegCommand, { stdio: 'inherit' });

        // 替换原文件
        fs.unlinkSync(filePath);
        fs.renameSync(tempFilePath, filePath);

        console.log(`转换完成: ${filePath}`);
    } catch (error) {
        console.error(`转换失败: ${filePath}`, error);
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
    }
}

// 执行脚本
const targetDirectory = process.argv[2] || '.';
processDirectory(targetDirectory);
console.log('处理完成');
