let axios = require('axios');
let moment = require('moment');
let {scheduleDailyTask} = require('../utils/utils');
const qs = require('qs');

const appName = 'vrfav';

async function myTask() {
    try {
        let response = await axios({
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
        const cookies = response.headers['set-cookie'];
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
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求结果-签到', JSON.stringify(result.data?.data || result.data));
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), appName, '请求异常-登录', e.response.data);
    }
}

async function mainRequest() {
    scheduleDailyTask(myTask, appName, false);
}

module.exports = {mainRequest, myTask}