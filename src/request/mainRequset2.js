let axios = require('axios');
let moment = require('moment');
let { scheduleDailyTask } = require('../utils/utils');

const appName = '520vr';

async function myTask() {
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
        let cookies = response.headers['set-cookie'];
        cookies = [
            cookies[1].replace('path=/wp-content/plugins; HttpOnly', ''),
            cookies[0].replace('path=/', ''),
            'cao_notice_cookie=1;',
            cookies[3].replace('path=/; HttpOnly', ''),
        ];
        let cookiesStr = cookies.join('');
        let formData2 = new FormData();
        formData2.append('action', 'user_qiandao');
        let result = await axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData2, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': cookiesStr,
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', JSON.stringify(result.data?.data || result.data));
    } catch (error) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-登录', error.message);

    }
}

async function mainRequest() {
    scheduleDailyTask(myTask, appName, false);
}

module.exports = {mainRequest,myTask}