const fs = require('fs').promises;
const path = require('path');

// 递归查找空文件夹
async function findEmptyFolders(dir) {
    try {
        // 读取当前目录内容
        const entries = await fs.readdir(dir, { withFileTypes: true });

        // 过滤出子目录
        const subDirs = entries.filter(entry => entry.isDirectory());

        // 如果没有子目录且当前目录为空，则返回当前目录
        if (subDirs.length === 0 && entries.length === 0) {
            return [dir];
        }

        // 递归检查所有子目录
        let emptyDirs = [];
        for (const subDir of subDirs) {
            const subDirPath = path.join(dir, subDir.name);
            const emptySubDirs = await findEmptyFolders(subDirPath);
            emptyDirs = [...emptyDirs, ...emptySubDirs];
        }

        // 如果当前目录没有文件且所有子目录都是空的，则当前目录也是空的
        if (entries.length === subDirs.length && emptyDirs.length === subDirs.length) {
            emptyDirs = [dir, ...emptyDirs];
        }

        return emptyDirs;
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return [];
    }
}

// 主函数
async function main() {
    const currentDir = process.cwd();
    const emptyFolders = await findEmptyFolders(currentDir);

    if (emptyFolders.length === 0) {
        console.log('没有找到空文件夹');
    } else {
        console.log('找到以下空文件夹:');
        emptyFolders.forEach(folder => console.log(folder));
    }
}

// 执行主函数
main();
