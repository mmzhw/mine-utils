const fs = require('fs');
const path = require('path');

// 定义视频文件的扩展名
const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.flv', '.wmv'];

/**
 * 判断文件是否为视频文件
 * @param {string} filename
 * @returns {boolean}
 */
function isVideoFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return VIDEO_EXTENSIONS.includes(ext);
}

/**
 * 获取文件夹内的视频文件
 * @param {string} folderPath
 * @returns {Array<string>}
 */
function getVideoFiles(folderPath) {
    return fs.readdirSync(folderPath)
        .filter(file => fs.statSync(path.join(folderPath, file)).isFile())
        .filter(file => isVideoFile(file));
}

/**
 * 删除文件夹内非视频文件
 * @param {string} folderPath
 */
function deleteNonVideoFiles(folderPath) {
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isFile() && !isVideoFile(file)) {
            fs.unlinkSync(filePath);
        }
    });
}

/**
 * 重命名视频文件
 * @param {string} folderPath
 */
function renameVideoFiles(folderPath) {
    const folderName = path.basename(folderPath).toUpperCase();
    const videoFiles = getVideoFiles(folderPath);

    // 如果没有视频文件，直接返回
    if (videoFiles.length === 0) return;

    // 只有一个视频文件的情况
    if (videoFiles.length === 1) {
        const videoFile = videoFiles[0];
        const videoExt = path.extname(videoFile);
        let newFileName = `${folderName}${videoExt}`;

        // 检测是否为 "文件夹名称-U", "文件夹名称-UC", "文件夹名称-C"（不区分大小写）
        const regex = new RegExp(`^${folderName}-(U|UC|C)$`, 'i');
        if (regex.test(path.basename(videoFile, videoExt))) {
            newFileName = `${path.basename(videoFile, videoExt).toUpperCase()}${videoExt}`;
        }

        // 重命名文件
        const oldPath = path.join(folderPath, videoFile);
        const newPath = path.join(folderPath, newFileName);
        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
        }
    } else {
        // 多个视频文件的情况
        videoFiles.forEach((file, index) => {
            const videoExt = path.extname(file);
            const newFileName = `${folderName}-cd${index + 1}${videoExt}`; // 保持 cd 小写
            const oldPath = path.join(folderPath, file);
            const newPath = path.join(folderPath, newFileName);
            if (oldPath !== newPath) {
                fs.renameSync(oldPath, newPath);
            }
        });
    }
}

/**
 * 递归遍历文件夹
 * @param {string} folderPath
 */
function videoRenameFolder(folderPath) {
    const entries = fs.readdirSync(folderPath);

    entries.forEach(entry => {
        const entryPath = path.join(folderPath, entry);
        const stats = fs.statSync(entryPath);

        if (stats.isDirectory()) {
            // 递归处理子文件夹
            videoRenameFolder(entryPath);
            deleteNonVideoFiles(entryPath);
            renameVideoFiles(entryPath);
        }
    });

    // 在遍历完子文件夹后处理当前文件夹
    deleteNonVideoFiles(folderPath);
    renameVideoFiles(folderPath);
}

/**
 * 遍历多层级目录，将所有文件夹名称转换为大写
 * @param {string} dirPath - 需要处理的根目录路径
 */
function folderNamesToUppercase(dirPath) {
    try {
        // 读取当前目录的内容
        const items = fs.readdirSync(dirPath);
        for (const item of items) {
            const currentPath = path.join(dirPath, item);

            // 获取文件信息
            const stats = fs.statSync(currentPath);

            // 如果是文件夹，则递归处理
            if (stats.isDirectory()) {
                const upperCaseName = item.toUpperCase();
                const newPath = path.join(dirPath, upperCaseName);

                // 重命名文件夹为大写
                if (item !== upperCaseName) {
                    fs.renameSync(currentPath, newPath);
                    console.log(`重命名文件夹: ${currentPath} -> ${newPath}`);
                }

                // 递归处理子目录
                folderNamesToUppercase(newPath);
            }
        }
    } catch (err) {
        console.error(`处理目录 ${dirPath} 时出错: ${err.message}`);
    }
}

/**
 * 递归遍历目录，将文件名中的小写字母改为大写
 * @param {string} dirPath - 需要遍历的目录路径
 */
function fileNamesToUppercase(dirPath) {
    // 读取当前目录中的所有文件和子目录
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            // 如果是目录，则递归遍历
            fileNamesToUppercase(itemPath);
        } else if (stats.isFile()) {
            // 如果是文件，则修改文件名
            const ext = path.extname(item);
            const baseName = path.basename(item, ext);
            const upperBaseName = baseName.toUpperCase(); // 将文件名改为大写

            // 如果修改后的文件名与原文件名不同，则重命名文件
            if (baseName !== upperBaseName) {
                const newFilePath = path.join(dirPath, `${upperBaseName}${ext}`);
                try {
                    fs.renameSync(itemPath, newFilePath);
                    console.log(`重命名文件: ${itemPath} -> ${newFilePath}`);
                } catch (error) {
                    console.error(`重命名失败: ${itemPath}`, error);
                }
            }
        }
    });
}

function videoRenameAndDeleteOtherFile(targetDirectory) {
    folderNamesToUppercase(targetDirectory)
    videoRenameFolder(targetDirectory)
    fileNamesToUppercase(targetDirectory)
}


module.exports = videoRenameAndDeleteOtherFile