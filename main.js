let axios = require('axios')
let fs = require('fs')
let moment = require('moment')

// 定义你的任务函数
function myTask() {
    let authorization = fs.readFileSync('./authorization', 'utf8').toString().trim()
    axios({
        url: 'https://api.xiabb.chat/chatapi/marketing/signin',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + authorization
        },
        data: {}
    }).then(result => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), '请求结果', result.data)
    }).catch(error => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), '请求异常', error)
    })
}

const schedule = require('node-schedule');

function calculateNextExecutionTime() {
    const now = new Date();
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 次日
        randomHour,
        randomMinute,
        randomSecond
    );
}

// 使用 node-schedule 安排定时任务
function scheduleDailyTask() {
    const nextExecutionTime = calculateNextExecutionTime();

    schedule.scheduleJob(nextExecutionTime, () => {
        myTask();
        scheduleDailyTask(); // 递归调用，安排下一次任务
    });
}

// 启动定时任务
scheduleDailyTask();
