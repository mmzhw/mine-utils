const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 获取视频文件的分辨率（同步方法）
 * @param {string} filePath - 视频文件路径
 * @returns {string|null} - 返回分辨率（如 "1920x1080"），如果获取失败则返回 null
 */
function getVideoResolution(filePath) {
    try {
        const cmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "${filePath}"`;
        const output = execSync(cmd, { encoding: 'utf-8' }).trim();
        return output || null;
    } catch (error) {
        console.error(`获取分辨率失败: ${filePath} - ${error.message}`);
        return null;
    }
}

/**
 * 重命名文件（同步方法）
 * @param {string} oldPath - 原文件路径
 * @param {string} newPath - 新文件路径
 */
function renameFile(oldPath, newPath) {
    if (oldPath !== newPath && !fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`重命名: ${oldPath} -> ${newPath}`);
    }
}

/**
 * 递归遍历目录，查找视频文件并重命名
 * @param {string} dir - 目标目录
 */
function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 如果是目录，则递归调用
            traverseDirectory(filePath);
        } else if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            // 判断是否是视频文件（可以根据需要扩展文件类型）
            if (['.mp4', '.mkv', '.avi', '.mov', '.flv'].includes(ext)) {
                const resolution = getVideoResolution(filePath);
                if (resolution) {
                    const newName = `${path.basename(file, ext)}_${resolution}${ext}`;
                    const newPath = path.join(dir, newName);
                    renameFile(filePath, newPath);
                }
            }
        }
    }
}

// 示例用法
// const targetDirectory = process.cwd();
// const targetDirectory = 'D:/code/req-test/video';
const targetDirectory = 'D:/Merge';
traverseDirectory(targetDirectory);
console.log('处理完成');
