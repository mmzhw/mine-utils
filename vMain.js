const videoRenameAndDeleteOtherFile = require('./src/video/vRename.js');
const videoMerge = require('./src/video/vMerge.js');
const videoResolutionName = require('./src/video/vResolution.js');
const deleteEmptyFolders = require('./src/video/vDeleteEmpty.js');
const videoTranscodingH265 = require('./src/video/vH265.js');


const targetDirectory = 'D:/code/mine-utils/static/video';
// const targetDirectory = 'D:/Merge';
// const targetDirectory = '/share/CACHEDEV3_DATA/AV/VR-AV/';


const functionName = process.argv[2];
console.log('开始执行', functionName, targetDirectory)
if (functionName === '1') {
    videoRenameAndDeleteOtherFile(targetDirectory)
} else if (functionName === '2') {
    videoMerge(targetDirectory)
} else if (functionName === '3') {
    videoResolutionName(targetDirectory)
} else if (functionName === '4') {
    deleteEmptyFolders(targetDirectory)
} else if (functionName === '5') {
    videoTranscodingH265(targetDirectory)
}