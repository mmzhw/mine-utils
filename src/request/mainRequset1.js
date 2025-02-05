let axios = require('axios');
let fs = require('fs');
let moment = require('moment');
let { scheduleDailyTask } = require('../utils/utils');
const path = require('path');

const appName = '阿水AI6.0';

async function myTask() {
    try {
        let authorization = fs.readFileSync(path.resolve(__dirname, './cookies1'), 'utf8').toString().trim();
        let result = await axios({
            url: 'https://api-10086.rcouyi.com/chatapi/marketing/signin',
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + authorization,
            },
            data: {},
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果', result.data);
    } catch (error) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常', error.message);
    }
}

async function mainRequest() {
    scheduleDailyTask(myTask, appName, false);
}

module.exports = {mainRequest,myTask}