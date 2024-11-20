const videoRenameAndDeleteOtherFile = require('./srcVideo/vRename.js');
const videoMerge = require('./srcVideo/vMerge.js');
const videoResolutionName = require('./srcVideo/vResolution.js');
const deleteEmptyFolders = require('./srcVideo/vDeleteEmpty.js');
const videoTranscodingH265 = require('./srcVideo/vH265.js');


const targetDirectory = 'D:/code/req-test/static/video';
// const targetDirectory = 'D:/Merge';
// const targetDirectory = '/share/CACHEDEV3_DATA/AV/VR-AV/';


const functionName = process.argv[2];
if (functionName === '1'){
    videoRenameAndDeleteOtherFile(targetDirectory)
} else if (functionName === '2'){
    videoMerge(targetDirectory)
} else if (functionName === '3'){
    videoResolutionName(targetDirectory)
} else if (functionName === '4'){
    deleteEmptyFolders(targetDirectory)
} else if (functionName === '5'){
    videoTranscodingH265(targetDirectory)
}