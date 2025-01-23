let axios = require('axios');
let moment = require('moment');
let {scheduleDailyTask} = require('../utils/utils');
const qs = require('qs');
const fs = require("fs");
const path = require("path");

const appName = 'www.caijihao.com';

async function myTask() {
    try {
        // let formData = new FormData();
        // formData.append('nonce', 'ffe839b950');
        // formData.append('action', 'zb_user_qiandao');
        let authorization = fs.readFileSync(path.resolve(__dirname, './cookies5'), 'utf8').toString().trim();

        let result = await axios.post('https://www.caijihao.com/wp-json/b2/v1/userMission', {}, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Cookie': authorization,
                'authorization': 'Bearer ' + authorization,
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', result.data?.data || result.data);
    } catch (error) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-签到', error.message);
    }
}

async function mainRequest() {
    scheduleDailyTask(myTask, appName, false);
}

module.exports = {mainRequest, myTask}
// myTask()