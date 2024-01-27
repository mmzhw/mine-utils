let axios = require('axios');
let fs = require('fs');
let moment = require('moment');
let { scheduleDailyTask } = require('./utils');


const appName1 = '阿水AI6.0';

function myTask1 () {
    let authorization = fs.readFileSync('./cookies1', 'utf8').toString().trim();
    axios({
        url: 'https://api.xiabb.chat/chatapi/marketing/signin',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + authorization
        },
        data: {}
    }).then(result => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName1, '请求结果', result.data);
    }).catch(error => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName1, '请求异常', error.response.data);
    });
}

const appName2 = '520vrvr';

function myTask2 () {
    let authorization = fs.readFileSync('./cookies2', 'utf8').toString().trim();
    let formData = new FormData();
    formData.append('action', 'user_qiandao');
    // 使用 Axios 发送 POST 请求
    axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Cookie': authorization
        }
    }).then(result => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求结果', result.data);
    }).catch(error => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求异常', error.response.data);
    });

}

scheduleDailyTask(myTask1, appName1);
scheduleDailyTask(myTask2, appName2);
