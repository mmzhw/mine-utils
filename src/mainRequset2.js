let axios = require('axios');
let moment = require('moment');
let { scheduleDailyTask } = require('./utils');

const appName2 = '520vr';

async function myTask2() {
    try {
        let formData = new FormData();
        formData.append('action', 'user_login');
        formData.append('username', 'Augus');
        formData.append('password', '112233');
        let response = await axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        await myTask2_extra(response);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName2, '请求异常-登录', e.response.data);

    }
}

async function myTask2_extra(data) {
    try {
        let cookies = data.headers['set-cookie'];
        cookies = [
            cookies[1].replace('path=/wp-content/plugins; HttpOnly', ''),
            cookies[0].replace('path=/', ''),
            'cao_notice_cookie=1;',
            cookies[3].replace('path=/; HttpOnly', ''),
        ];
        let cookiesSstr = cookies.join('');
        let formData = new FormData();
        formData.append('action', 'user_qiandao');
        let result = await axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': cookiesSstr,
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName2, '请求结果-签到', result.data);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName2, '请求异常-签到', e.response.data);

    }
}

async function scheduleDailyTask2() {
    scheduleDailyTask(myTask2, appName2, false);
}

// module.exports = {
//     myTask2: myTask2,
//     scheduleDailyTask2: scheduleDailyTask2,
// };
scheduleDailyTask2()
