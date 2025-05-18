const fs = require('fs');
const path = require('path');

// 指定要读取的目录
const directoryPath = './'; // 替换为你的目录路径

// 已知数组
const knownArray = [
    "ADN-004",
    "ADN-023",
    "ADN-031",
    "ADN-158",
    "BF-479",
    "BF-524",
    "BTH-028",
    "CESD-312",
    "CESD-325",
    "CESD-360",
    "CESD-396",
    "CESD-412",
    "CJOD-052",
    "CJOD-101",
    "DASD-353",
    "DPMI-020",
    "EBOD-318",
    "ECB-106",
    "GANA-1131",
    "GVG-365",
    "GVG-601",
    "HMPD-10045",
    "HND-509",
    "HND-522",
    "JBD-186",
    "JUFD-588",
    "JUFD-715",
    "JUFD-854",
    "JUFD-923",
    "JUFD-968",
    "JUFD-983",
    "JUFD-994",
    "JUFE-047",
    "JUFE-062",
    "JUX-496",
    "JUX-518",
    "JUX-544",
    "JUX-612",
    "JUX-657",
    "JUX-729",
    "JUY-522",
    "JUY-576",
    "MEYD-226",
    "MEYD-248",
    "MEYD-273",
    "MEYD-329",
    "MEYD-336",
    "MEYD-347",
    "MEYD-365",
    "MEYD-439",
    "MEYD-512",
    "MIAD-987",
    "MIAE-096",
    "MIAE-117",
    "MIAE-141",
    "MIAE-178",
    "NAFI-006",
    "ONEZ-037",
    "PGD-919",
    "PPPD-531",
    "PPPD-575",
    "PRED-087",
    "PRTD-006",
    "PRTD-011",
    "RBD-525",
    "RBD-545",
    "RBD-573",
    "RBD-625",
    "RBD-636",
    "RBD-643",
    "SDDE-491",
    "SUPA-147",
    "TAAK-017",
    "TYOD-344",
    "URE-044",
    "VENU-324",
    "VENU-649",
    "WANZ-569",
    "WANZ-577",
    "WANZ-693"
]

// 读取目录
fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        return console.error('无法读取目录: ' + err);
    }

    // 过滤出目录名称
    const directories = files
        .filter(file => file.isDirectory())
        .map(dir => dir.name);

    // 检查哪些已知目录不在当前目录中
    const missingDirectories = knownArray.filter(dir => !directories.includes(dir));

    // 打印不存在的目录
    if (missingDirectories.length > 0) {
        console.log('以下目录不存在:', missingDirectories);
    } else {
        console.log('所有已知目录都存在于指定目录中。');
    }
});
