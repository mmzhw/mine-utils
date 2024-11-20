let axios = require('axios');
let fs = require('fs');
let moment = require('moment');
let { scheduleDailyTask } = require('../utils/utils');
const path = require('path');

const appName1 = '阿水AI6.0';

async function myTask1() {
    try {
        let authorization = fs.readFileSync(path.resolve('./cookies1'), 'utf8').toString().trim();
        let result = await axios({
            url: 'https://api22.xiabb.chat/chatapi/marketing/signin',
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + authorization,
            },
            data: {},
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName1, '请求结果', result.data);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName1, '请求异常', e.response.data);
    }
}

async function scheduleDailyTask1() {
    scheduleDailyTask(myTask1, appName1, false);
}

// module.exports = {
//     myTask1: myTask1,
//     scheduleDailyTask1: scheduleDailyTask1,
// };
// scheduleDailyTask1()
module.exports = scheduleDailyTask1