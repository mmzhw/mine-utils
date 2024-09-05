const schedule = require('node-schedule');
let moment = require('moment');

function calculateNextExecutionTime(isNextDay) {
    const now = new Date();
    // 获取当前的小时、分钟、秒
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();
    let currentSeconds = now.getSeconds();
    // 随机生成比当前时间晚的小时、分钟、秒
    let futureHours = currentHours + Math.floor(Math.random() * (24 - currentHours));
    let futureMinutes = currentMinutes + Math.floor(Math.random() * (60 - currentMinutes));
    let futureSeconds = currentSeconds + Math.floor(Math.random() * (60 - currentSeconds));
    // 校正时间
    if (futureSeconds >= 60) {
        futureSeconds -= 60;
        futureMinutes += 1;
    }
    if (futureMinutes >= 60) {
        futureMinutes -= 60;
        futureHours += 1;
    }
    if (futureHours >= 24) {
        futureHours -= 24; // 下一天的时间
    }

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (isNextDay ? 1 : 0), // 次日
        futureHours,
        futureMinutes,
        futureSeconds,
    );
}

// 使用 node-schedule 安排定时任务
function scheduleDailyTask(myTask, appName, isNextDay) {
    const nextExecutionTime = calculateNextExecutionTime(isNextDay);
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '开启任务,触发时间为', moment(nextExecutionTime).format('YYYY-MM-DD HH:mm:ss'));

    schedule.scheduleJob(nextExecutionTime, () => {
        myTask();
        scheduleDailyTask(myTask, appName, true); // 递归调用，安排下一次任务
    });
}

// 导出 greet 函数
module.exports = {
    calculateNextExecutionTime: calculateNextExecutionTime,
    scheduleDailyTask: scheduleDailyTask,
};
