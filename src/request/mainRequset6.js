let axios = require('axios');
let moment = require('moment');
let {scheduleDailyTask} = require('../utils/utils');
const cookie = require('cookie');

const appName = '咸鱼单机';

async function myTask() {
    try {
        let formData = new FormData();
        formData.append('action', 'user_login');
        formData.append('username', 'mmzhw51');
        formData.append('password', '112233');
        formData.append('rememberme', '1');
        let response = await axios.post('https://www.xianyudanji.ai/wp-admin/admin-ajax.php\n', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        let cookies = response.headers['set-cookie'];
        cookies = cookies.map(i => {
            i = i.replace('path=/wp-content/plugins; HttpOnly', '')
            i = i.replace('path=/', '')
            i = i.replace('path=/; HttpOnly', '')
            i = i.replace('HttpOnly', '')
            i = i.replace('wp-admin;', '')
            i = i.replace('path=/wp-content/plugins;', '')
            i = i.replace('secure;', '')
            i = i.replace('wp-content/plugins;', '')
            i = i.replace('; ;', ';')
            i = i.trim()
            return i
        })
        // 1. 筛选、提取WordPress相关Cookie（去重）
        const wordpressCookies = {};
        cookies.forEach(cookie => {
            if (cookie.startsWith('wordpress')) { // 只保留WordPress相关Cookie
                const keyValuePart = cookie.split(';')[0]; // 截取 "key=value" 部分（去掉后续属性）
                const [key, value] = keyValuePart.split('='); // 分割键和值
                // 去重：若键已存在，保留首次出现的值（或根据需求改保留末次）
                if (!wordpressCookies[key]) {
                    wordpressCookies[key] = value; // 注意：此处不解码，保持原始编码（Cookie传输需编码）
                }
            }
        });

        // 2. 拼接为标准Cookie字符串（格式：key1=value1; key2=value2）
        const wordpressCookieStr = Object.entries(wordpressCookies)
            .map(([key, value]) => `${key}=${value}`) // 键值对拼接
            .join('; '); // 用 "; " 分隔多个Cookie

        // 输出结果
        console.log('WordPress相关Cookie字符串：');
        console.log(wordpressCookieStr);

        let formData2 = new FormData();
        formData2.append('action', 'user_qiandao');
        formData2.append('nonce', 'afcda4b412');
        let result = await axios.post('https://www.xianyudanji.ai/wp-admin/admin-ajax.php', formData2, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': wordpressCookieStr,
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

module.exports = {mainRequest, myTask}
