let axios = require('axios');
let moment = require('moment');
let {scheduleDailyTask} = require('../utils/utils');
const qs = require('qs');
const fs = require("fs");
const path = require("path");

const appName = 'www.52damu.com';

async function myTask() {
    try {
        let formData = new FormData();
        formData.append('nonce', 'ffe839b950');
        formData.append('action', 'zb_user_qiandao');
        let authorization = fs.readFileSync(path.resolve('./cookies4'), 'utf8').toString().trim();

        let result = await axios.post('https://www.52damu.com/wp-admin/admin-ajax.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': authorization,
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', result.data);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-签到', e.response.data);
    }
}

async function scheduleDailyTask3() {
    scheduleDailyTask(myTask, appName, false);
}

module.exports = scheduleDailyTask3
