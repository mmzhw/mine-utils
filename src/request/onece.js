let axios = require('axios');
let moment = require('moment');
const fs = require("fs");
const path = require("path");

const appName = '';

async function myTask() {
    try {
        let formData = new FormData();
        formData.append('nonce', 'ffe839b950');
        formData.append('action', 'zb_user_qiandao');
        let authorization = fs.readFileSync(path.resolve('./cookies5'), 'utf8').toString().trim();

        let result = await axios.post('https://www.caijihao.com/wp-json/b2/v1/userMission', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': authorization,
                'authorization': 'Bearer ' + authorization,
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', result.data);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-签到', e);
    }
}

myTask()