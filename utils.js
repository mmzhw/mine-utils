const schedule = require('node-schedule');
let moment = require('moment');

function calculateNextExecutionTime () {
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
function scheduleDailyTask (myTask, appName) {
    const nextExecutionTime = calculateNextExecutionTime();
    console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName, '开启任务,触发时间为' ,moment(nextExecutionTime).format('YYY-MM-DD HH:mm:ss') );

    schedule.scheduleJob(nextExecutionTime, () => {
        myTask();
        scheduleDailyTask(myTask, appName); // 递归调用，安排下一次任务
    });
}

// 导出 greet 函数
module.exports = {
    scheduleDailyTask: scheduleDailyTask
};
