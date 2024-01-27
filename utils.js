const schedule = require('node-schedule');

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
    console.log(appName, '开启定时时间', nextExecutionTime);

    schedule.scheduleJob(nextExecutionTime, () => {
        myTask();
        scheduleDailyTask(); // 递归调用，安排下一次任务
    });
}

// 导出 greet 函数
module.exports = {
    scheduleDailyTask: scheduleDailyTask
};
