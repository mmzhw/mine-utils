let axios = require('axios');
let fs = require('fs');
let qs = require('qs');
const moment = require('moment/moment');
// let authorization = fs.readFileSync('./cookies1', 'utf8').toString().trim()
// axios({
//     url: 'https://api22.xiabb.chat/chatapi/marketing/signin',
//     method: 'post',
//     headers: {
//         'Authorization': 'Bearer ' + authorization
//     },
//     data: {}
// }).then(result => {
//     console.log('请求结果', result.data)
// }).catch(error => {
//     console.log('请求异常', error)
// })


// https://api22.xiabb.chat/chatapi/config


// axios({
//     url: 'https://api22.xiabb.chat/chatapi/config',
//     method: 'get',
// }).then(result => {
//    let appId = result.data.result.verifyCode.tposConfig.appId
//     console.log('请求结果', appId);
//     axios({
//         url: 'https://api22.xiabb.chat/chatapi/auth/login',
//         method: 'post',
//
//         data: {
//             'account': 'jsdtzhw123@126.com',
//             'codeId': appId,
//             'code': '{"captcha_output":"g3ublJU_6xIB7XzCcE9JxBxRWBJ6whoQyB3gffZwHuBJ79IBSuD82XBuQbwVOqa_kmdqVakt8TcOJLKCNOuIdoN0rIsG83iEqaZ55hjpfPZzNtxoGVU4s7a1BYBYLsojpWUEBnXVsg5UQ10A9wUC0WVqiNz-9Rs8icklkqvjj7hLLGV0OtxgB6t4C3nALzBMSmUPLBWZvWlf3_1f07_4WfkmIqPSYBfioYkoxfonGcrjo9Na83RB6TyflwzuyDO2BGiIZhjRKbighY6gs6PKLJhvZS0EirvMIt3tBkBibtRaF871PRPgVgr5uBk5cf4m0sOVkJQDKgzPxVIruivEjGvr3Ijp_wxWQVJVV_0BSVL4C0WUlxEvsyMbtbQHyCrQxMKd5fIaOVRtp6g149U5031YBcnTlFKwcH4A4ouQFGK_3WKxsdU_Skxi9b7Y9R7Q","pass_token":"46ef260b772dcd163e257cf91c8dfe05e695ad66752ea2794d281532ad8e90f3","gen_time":"1716971051"}',
//             'password': '112233',
//             'verCode': ''
//         },
//     }).then(result => {
//         console.log('请求结果', result.data);
//     }).catch(error => {
//         console.log('请求异常', error);
//     });
//
//
// }).catch(error => {
//     console.log('请求异常', error);
// });


// axios({
//     method: 'post',
//     url: 'https://www.vrfav.com/index.php/user/login.html',
//     data: qs.stringify({
//         user_name: 'mmzhw51',
//         user_pwd: '112233',
//     }),
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//         'path': '/index.php/user/login.html',
//         'Authorization': 'www.vrfav.com',
//     },
// }).then(result => {
//     console.log('请求结果', result.data);
//     const cookies = result.headers['set-cookie'];
//     let reqCookies = '';
//     cookies.forEach(cookie => {
//         cookie.split(';').forEach(item => {
//             if (item.match('user_id')) {
//                 reqCookies += `;${item}`;
//             } else if (item.match('user_name')) {
//                 reqCookies += `;${item}`;
//             } else if (item.match('user_check')) {
//                 reqCookies += `;${item}`;
//             }
//         });
//     });
//     axios({
//         url: 'https://www.vrfav.com/index.php/user/qiandao.html',
//         method: 'get',
//         headers: {
//             'cookie': reqCookies,
//         },
//     }).then(result => {
//         console.log('请求结果', result.data);
//     }).catch(error => {
//         console.log('请求异常', error);
//     });
// }).catch(error => {
//     console.log('请求异常', error);
// });
//
