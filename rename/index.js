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
 * 主函数：遍历当前文件夹，执行操作
 */
function processCurrentFolder() {
    const currentFolder = process.cwd();
    const subFolders = fs.readdirSync(currentFolder).filter(sub => {
        return fs.statSync(path.join(currentFolder, sub)).isDirectory();
    });

    subFolders.forEach(folder => {
        const folderPath = path.join(currentFolder, folder);
        deleteNonVideoFiles(folderPath);
        renameVideoFiles(folderPath);
    });

    console.log('操作完成！');
}

/**
 * 遍历当前目录，修改文件夹名称为大写
 * @param {string} dirPath - 当前目录路径
 */
function renameFoldersToUpper(dirPath) {
    try {
        // 获取当前目录下的所有文件和文件夹
        const items = fs.readdirSync(dirPath);

        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = fs.statSync(itemPath);

            // 检查是否为文件夹
            if (stats.isDirectory()) {
                const newName = item.toUpperCase();

                // 如果文件夹名称已经是大写，跳过
                if (newName !== item) {
                    const newPath = path.join(dirPath, newName);

                    // 修改文件夹名称
                    fs.renameSync(itemPath, newPath);
                    console.log(`Renamed folder: ${item} -> ${newName}`);

                    // 递归处理子文件夹
                    renameFoldersToUpper(newPath);
                } else {
                    // 递归处理子文件夹
                    renameFoldersToUpper(itemPath);
                }
            }
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}


// 执行
renameFoldersToUpper('.');
processCurrentFolder();
