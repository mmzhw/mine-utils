const videoRenameAndDeleteOtherFile = require('./src/video/vRename.js');
const videoMerge = require('./src/video/vMerge.js');
const videoResolutionName = require('./src/video/vResolution.js');
const deleteEmptyFolders = require('./src/video/vDeleteEmpty.js');
const videoTranscodingH265 = require('./src/video/vH265.js');

const readline = require('readline');
// 创建接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function endAndRestart(){
    console.log('')
    console.log('已完成操作,请重新开始！')
    console.log('')
    promptUser()
}

// 子选择方法
function promptSubChoice1() {
    console.log('')
    console.log('已选择路径为：',global.targetDirectory)
    console.log('')
    console.log("请继续选择功能：");
    console.log("1. 重命名文件并删除非视频文件");
    console.log("2. 合并文件夹中视频文件");
    console.log("3. 视频文件名称增加分辨率");
    console.log("4. 删除空文件夹");
    console.log("5. 视频转成H.265(不完善)");

    rl.question("请输入你的选择 (1 或 2 或 3 或 4 或 5): ", (answer) => {

        let targetDirectory = global.targetDirectory
        if (answer === '1') {
            videoRenameAndDeleteOtherFile(targetDirectory)
            endAndRestart()
        } else if (answer === '2') {
            videoMerge(targetDirectory)
            endAndRestart()
        } else if (answer === '3') {
            videoResolutionName(targetDirectory)
            endAndRestart()
        } else if (answer === '4') {
            deleteEmptyFolders(targetDirectory)
            endAndRestart()
        } else if (answer === '5') {
            videoTranscodingH265(targetDirectory)
            endAndRestart()
        } else {
            console.log("无效的选择，请重新输入。");
            promptSubChoice1(); // 重新提示用户
        }
    });
}

// 提示用户选择
function promptUser() {
    console.log("请选择一个路径：");
    console.log("1. D:/code/mine-utils/static/video");
    console.log("2. D:/Merge");
    console.log("3. /share/CACHEDEV3_DATA/AV/VR-AV/");

    rl.question("请输入你的选择 (1 或 2 或 3): ", (answer) => {
        if (answer === '1') {
            global.targetDirectory = 'D:/code/mine-utils/static/video'
            promptSubChoice1();
        } else if (answer === '2') {
            global.targetDirectory = 'D:/Merge'
            promptSubChoice1();
        } else if (answer === '3') {
            global.targetDirectory = '/share/CACHEDEV3_DATA/AV/VR-AV/'
            promptSubChoice1();
        } else {
            console.log("无效的选择，请重新输入。");
            promptUser(); // 重新提示用户
        }
    });
}

// 启动提示
promptUser();
