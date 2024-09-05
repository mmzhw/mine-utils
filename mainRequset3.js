let axios = require('axios');
let moment = require('moment');
let { scheduleDailyTask } = require('./utils');
const qs = require('qs');

const appName3 = 'vrfav';

async function myTask3() {
    try {
        let result = await axios({
            method: 'post',
            url: 'https://www.vrfav.com/index.php/user/login.html',
            data: qs.stringify({
                user_name: 'mmzhw51',
                user_pwd: '112233',
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'path': '/index.php/user/login.html',
                'Authorization': 'www.vrfav.com',
            },
        });
        await myTask3_extra(result);
    } catch (e) {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName3, '请求异常-登录', e.response.data);
    }
}

async function myTask3_extra(data) {
    try {
        const cookies = data.headers['set-cookie'];
        let reqCookies = '';
        cookies.forEach(cookie => {
            cookie.split(';').forEach(item => {
                if (item.match('user_id')) {
                    reqCookies += `;${item}`;
                } else if (item.match('user_name')) {
                    reqCookies += `;${item}`;
                } else if (item.match('user_check')) {
                    reqCookies += `;${item}`;
                }
            });
        });
        let result = await axios({
            url: 'https://www.vrfav.com/index.php/user/qiandao.html',
            method: 'get',
            headers: {
                'cookie': reqCookies,
            },
        });
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName3, '请求结果-签到', result.data);
    } catch (e) {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName3, '请求异常-签到', e.response.data);
    }
}

async function scheduleDailyTask3() {
    scheduleDailyTask(myTask3, appName3, false);
}

module.exports = {
    myTask3: myTask3,
    scheduleDailyTask3: scheduleDailyTask3,
};
