const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

// 获取当前时间
function getCurrentTimeWithLocale() {
    return new Date().toLocaleString('zh-CN', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-');
};

/**
 * 检查是否是视频文件
 * @param {string} fileName 文件名
 * @returns {boolean}
 */
function isVideoFile(fileName) {
    const videoExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.flv', '.wmv'];
    return videoExtensions.includes(path.extname(fileName).toLowerCase());
}

/**
 * 获取文件夹中的所有文件和文件夹
 * @param {string} dirPath 目录路径
 * @returns {Array}
 */
function getFilesAndDirs(dirPath) {
    return fs.readdirSync(dirPath).map(file => path.join(dirPath, file));
}

/**
 * 检查文件夹内是否只有视频文件
 * @param {string} dirPath 目录路径
 * @returns {boolean}
 */
function isAllVideos(dirPath) {
    const files = getFilesAndDirs(dirPath);
    return files.every(file => fs.statSync(file).isFile() && isVideoFile(file));
}

/**
 * 合并视频文件，并保存在原文件夹内
 * @param {string} dirPath 包含视频文件的文件夹路径
 */
function mergeVideos(dirPath) {
    const files = getFilesAndDirs(dirPath).filter(file => isVideoFile(file));
    if (files.length < 2) return;

    // 创建临时文件列表
    const fileListPath = path.join(dirPath, 'filelist.txt');
    const fileListContent = files.map(file => `file '${file}'`).join('\n');
    fs.writeFileSync(fileListPath, fileListContent);

    // 输出文件路径，以当前文件夹名称命名
    const folderName = path.basename(dirPath);
    const outputVideoPath = path.join(dirPath, `${folderName}.mp4`);

    try {
        console.log(getCurrentTimeWithLocale(), `：开始合并`);
        // 使用 FFmpeg 合并视频
        execSync(`ffmpeg -f concat -safe 0 -i "${fileListPath}" -c copy "${outputVideoPath}"`, {stdio: 'inherit'});
        console.log(getCurrentTimeWithLocale(), `：合并完成: ${outputVideoPath}`);

        // 删除原视频文件和临时文件
        files.forEach(file => fs.unlinkSync(file));
        fs.unlinkSync(fileListPath);
    } catch (error) {
        console.error(`合并失败: ${error.message}`);
    }
}

/**
 * 递归遍历文件夹
 * @param {string} dirPath 目录路径
 */
function traverseFolders(dirPath) {
    const items = getFilesAndDirs(dirPath);
    const directories = items.filter(item => fs.statSync(item).isDirectory());

    if (directories.length === 0 && isAllVideos(dirPath)) {
        // 当前文件夹全是视频文件
        mergeVideos(dirPath);
        console.log(dirPath)
    } else {
        directories.forEach(subDir => traverseFolders(subDir));
    }
}

// 入口函数
// const targetDirectory = process.cwd();
// const targetDirectory = 'D:/code/req-test/video';
const targetDirectory = 'D:/Merge';
traverseFolders(targetDirectory);
