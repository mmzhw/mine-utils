const { exec } = require('child_process');
const iconv = require('iconv-lite');

// process.env.LANG ='zh_CN.GBK';
process.stdout.setEncoding('utf8');

// 定义关闭两个进程的命令
let commands = [];

if (process.platform === 'win32') {
    commands = [
        'taskkill /IM PgyVisitorEnt.exe /F',  // 关闭 PgyVisitorEnt.exe
        // 'taskkill /IM WeChat.exe /F'  // 关闭 WeChat.exe
    ];
} else if (process.platform === 'darwin') {
    commands = [
        'killall PgyVisitorEnt',  // 关闭 PgyVisitorEnt (macOS)
        'killall WeChat'  // 关闭 WeChat (macOS)
    ];
} else if (process.platform === 'linux') {
    commands = [
        'pkill PgyVisitorEnt',  // 关闭 PgyVisitorEnt (Linux)
        'pkill WeChat'  // 关闭 WeChat (Linux)
    ];
}

// 执行关闭命令
commands.forEach((command) => {
    exec(command, { encoding: 'buffer' }, (err, stdout, stderr) => {
        if (err) {
            // console.error(`执行关闭命令时出错: ${iconv.decode(err.message, 'gbk')}`);
            console.error(`执行关闭命令时出错: ${err.message}`);
            return;
        }
        if (stderr) {
            // console.error(`关闭进程时遇到错误: ${iconv.decode(stderr, 'cp936')}`);
            console.error(`关闭进程时遇到错误: ${stderr}`);
            return;
        }
        // console.log(`进程已成功关闭: ${iconv.decode(stdout, 'cp936')}`);
        console.log(`进程已成功关闭: ${stdout}`);
    });
});
