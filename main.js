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
    let formData = new FormData();
    formData.append('action', 'user_login');
    formData.append('username', 'Augus');
    formData.append('password', '112233');
    axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(response => {
        let cookies = response.headers['set-cookie']
        //console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求结果-登录', response.data);
        //console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求结果-cookies', cookies);

        cookies = [
            cookies[1].replace('path=/wp-content/plugins; HttpOnly', ''),
            cookies[0].replace('path=/', ''),
            'cao_notice_cookie=1;',
            cookies[3].replace('path=/; HttpOnly', '')
        ]
        let cookiesSstr = cookies.join('')

        let formData = new FormData();
        formData.append('action', 'user_qiandao');
        axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': cookiesSstr
            }
        }).then(result => {
            console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求结果-签到', result.data);
        }).catch(error => {
            console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求异常-签到', error.response.data);
        });

    }).catch(error => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName2, '请求异常-登录', error.response.data);
    });
}

scheduleDailyTask(myTask1, appName1);
scheduleDailyTask(myTask2, appName2);
