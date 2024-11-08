const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

// 检查视频文件格式的正则表达式，可以根据需要添加其他格式
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

// 合并视频文件
// 合并视频文件
function mergeVideos(folderPath, outputFileName) {
    const files = fs.readdirSync(folderPath)
        .filter(file => videoExtensions.includes(path.extname(file).toLowerCase()))
        .map(file => `file '${path.join(folderPath, file).replace(/'/g, "'\\''")}'`); // 添加路径并转义引号

    if (files.length === 0) {
        console.log(`No video files found in ${folderPath}`);
        return;
    }

    // 提取第一个视频文件的路径，并使用它来获取扩展名
    const firstFilePath = files[0].match(/file '(.*)'/)[1];
    const outputFilePath = path.join(folderPath, `${outputFileName}${path.extname(firstFilePath)}`);

    const fileListPath = path.join(folderPath, 'filelist.txt');
    fs.writeFileSync(fileListPath, files.join('\n')); // 将文件列表写入一个文本文件

    const ffmpegCommand = `ffmpeg -f concat -safe 0 -i "${fileListPath}" -c:v hevc_nvenc -c copy "${outputFilePath}"`; //h.265
    // const ffmpegCommand = `ffmpeg -f concat -safe 0 -i "${fileListPath}" -c:v h264_nvenc -c copy "${outputFilePath}"`; //h.264

    try {
        execSync(ffmpegCommand, { stdio: 'inherit' }); // 同步执行 FFmpeg 命令
        console.log(`Merged videos in ${folderPath} into ${outputFilePath}`);
    } catch (error) {
        console.error(`Error merging videos in ${folderPath}:`, error);
        // return;
    } finally {
        fs.unlinkSync(fileListPath); // 删除临时的文件列表
    }

    // // 删除原始视频文件
    // for (const file of files) {
    //     const filePath = file.match(/file '(.*)'/)[1]; // 提取实际文件路径
    //     try {
    //         fs.unlinkSync(filePath); // 同步删除文件
    //         console.log(`Deleted original file: ${filePath}`);
    //     } catch (err) {
    //         console.error(`Failed to delete ${filePath}:`, err);
    //     }
    // }
}


// 遍历当前目录并处理每个文件夹
function processFolders() {
    const currentDir = __dirname;

    const folders = fs.readdirSync(currentDir).filter(file =>
        fs.statSync(path.join(currentDir, file)).isDirectory()
    );

    for (const folder of folders) {
        const folderPath = path.join(currentDir, folder);
        mergeVideos(folderPath, folder); // 使用文件夹名称作为输出文件名
    }

    console.log('All folders processed.');
}

processFolders();
