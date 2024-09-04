let axios = require('axios');
let fs = require('fs');
let moment = require('moment');
let { scheduleDailyTask } = require('./utils');
const path = require('path');
const qs = require('qs');


// const appName1 = '阿水AI6.0';
// function myTask1 () {
//     let authorization = fs.readFileSync(path.resolve('cookies1'), 'utf8').toString().trim();
//     axios({
//         url: 'https://api22.xiabb.chat/chatapi/marketing/signin',
//         method: 'post',
//         headers: {
//             'Authorization': 'Bearer ' + authorization
//         },
//         data: {}
//     }).then(result => {
//         console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName1, '请求结果', result.data);
//     }).catch(error => {
//         console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName1, '请求异常', error.response.data);
//     });
// }
// scheduleDailyTask(myTask1, appName1);

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
scheduleDailyTask(myTask2, appName2, false);

const appName3 = 'vrfav';
function myTask3 () {
    axios({
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
    }).then(result => {
        const cookies = result.headers['set-cookie'];
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
        axios({
            url: 'https://www.vrfav.com/index.php/user/qiandao.html',
            method: 'get',
            headers: {
                'cookie': reqCookies,
            },
        }).then(result => {
            console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName3, '请求结果-签到', result.data);
        }).catch(error => {
            console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName3, '请求异常-签到', error.response.data);
        });
    }).catch(error => {
        console.log(moment().format('YYY-MM-DD HH:mm:ss'), appName3, '请求异常-登录', error.response.data);
    });


}
scheduleDailyTask(myTask3, appName3, false);
