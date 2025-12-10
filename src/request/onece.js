let axios = require('axios');
let moment = require('moment');
const fs = require("fs");
const path = require("path");

const appName = '';

async function myTask() {
    try {
        let formData = new FormData();
        formData.append('type', 'mail');
        // formData.append('checknum', 'ltzy.vip');
        // formData.append('uid', 'mmzhw51');
        formData.append('item', '399');
        formData.append('num', '1');
        // formData.append('qu', '2');

        let result = await axios.post('http://103.236.74.161:81/gm/user/playerquery.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': 'game_account=mmzhw51; PHPSESSID=t54nb38p1s2l2m4pc69o0gr65o'
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', result.data);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-签到', e);
    }
}

myTask()
