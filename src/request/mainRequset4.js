let axios = require('axios');
let moment = require('moment');
let {scheduleDailyTask} = require('../utils/utils');
const qs = require('qs');
const fs = require("fs");
const path = require("path");

const appName = 'www.52damu.com';

async function myTask() {
    try {
        let authorization = fs.readFileSync(path.resolve(__dirname, './cookies4'), 'utf8').toString().trim();
        let response = await axios.get('https://www.52damu.com/user/', {
            headers: {
                'Cookie': authorization,
            },
        })
        const regex = /"ajax_nonce":"(.*?)"/;
        const match = response.data.match(regex);

        let nonce = ''

        if (match && match[1]) {
            nonce = match[1];
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '找到 ajax_nonce 的值：', nonce);
        } else {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '未找到 ajax_nonce 的值');
            return
        }

        let formData = new FormData();
        formData.append('nonce', nonce);
        formData.append('action', 'zb_user_qiandao');

        let result = await axios.post('https://www.52damu.com/wp-admin/admin-ajax.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': authorization,
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', String(result.data?.data || result.data));
    } catch (error) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-签到', error.message);
    }
}

async function mainRequest() {
    scheduleDailyTask(myTask, appName, false);
}

module.exports = {mainRequest, myTask}


// myTask()
