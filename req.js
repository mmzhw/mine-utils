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

//
// axios({
//     url: 'https://api22.xiabb.chat/chatapi/auth/login',
//     method: 'post',
//     data: {
//         account: "jsdtzhw123@126.com",
//         code: "{\"captcha_output\":\"g3ublJU_6xIB7XzCcE9JxBxRWBJ6whoQyB3gffZwHuBJ79IBSuD82XBuQbwVOqa_j7xG5D449SaR3fv6CDuV8Ss4bN4kClJyCq4sLrDRb9fR3SXEfRqpSmWkLYo-23CeICieFrrkFFdAOitA7SEcs4gquBKpuk9I1qGolVXKm6YzDXK_fsOaxUc-RYllQJsQ0paZzpxyfD3tmo_xe__nEyH0TgyIMEy5FLlf2RREelOw0RsoXsulPkw71r_2x4MlIkMlTtrsYFJcXW-qXPODV6J4FAPufoE3IYZvEWH3v1AoRF9hVtqETdhtI_kYNhS5K2MrH25Km83J4WTEtZz-67m7dSuwA-s4xW6WBHIzws93QHQ10WMGDK5HPJ75p3WPzm6iDGM294-CHC0rkcHs2aAzl8JZpNt1y5XWy3NqF6JLZv8tCrCz6UIo81I3BDiG\",\"pass_token\":\"4d1e7728d6ffeb9f5f726800842cb445385de37238a66f9386fc84437cf28d8a\",\"gen_time\":\"1725357344\"}",
//         codeId: "5e518dbf24f74658a96271df0545696f",
//         password: "112233",
//         verCode: ""
//     }
// }).then(result => {
//     console.log('请求结果', result.data)
// }).catch(error => {
//     console.log('请求异常', error)
// })

axios({
    url: 'https://gcaptcha4.geetest.com/verify?callback=geetest_1725357534915&captcha_id=272f2dac1a7ea5f6363d81a23e026af4&client_type=web&lot_number=fa01a021fc76444fb7a6685a42beae3c&payload=_b-sD20eax9oEJvmoMxvFNAazByT4gu1kjFofNEpSajR-CWZ2UuE1Wm43aaYzZn_kshSMcBqFHxkI-QadPP28giC5bS0rPr6ZwsfVWHdLSs4hXMFxajSuK2_bbOp01S2Tdm_xcMoIU5l7fvjbCFhyx4Ll3qkKT18yQHzmLUn6jf2fdra-Ne58mh0KM_uMJVKl5MV_eyHjR0VoeZZSO1-shzP5rGnDqX1XlvoMoiRF6bcmqOODoA4wxXp5yA98x5syy4hols49bFFkI8lGMlivhviQ-4HbUl71XjcEbCEmY7sHygYKSGFSudHRecHuWYHaUByUpIQsY3jzP3miT6shYjiAjXD__ydfnIc56MmRrEsawvvarfc8HCxjpZvEL17fZpF24CPd0VXTohAJaAOrWhaCYkYKUxVB-HcNoIXv0SzjBq3jslSXxWzzx0Fby6B3ZtCB7YZrY8gXW9aiMuoue-KMt6XcJgmXZe98D84f_2xv1RfdAEgDBgZaLnCcZvJdSb-8LeBvYvyoYHk9Prwu7p8LV-2MUuHnDL7dAP8kwv8S4iL5uVmDXTGEYGRgVTfGRjnWa5_mt3Xkg251uJlzpkoiBoO22VPX1YVPzTN0mDEWXijVFRbYVs0K_6ut5vIRau2ELWkzlLncMN35fV-FBTI6hnIzrSlQIdzjPckS87ht1ouS6vcwmOe0G4BORMDDh9xedKyyp6mQfFgYQQ9_qbaB8btdI4GP0Zm2TChAEAf1Pm_gj0hJvkss1a6WCB-&process_token=c7be006c54a87d15f1b7176ddeb2778b4a8ac0137dc95dd5f364e53999d40e6f&payload_protocol=1&pt=1&w=b9172daad3f584ecf318ecc01b0ce6ff14e9ad6f2f8d77b6abacf31cf84717d91c3034faa6c93452a8489070ae5e4025e56730d411364aeedb5ba75631a0a65866846718760b9f3705218e83fa79bb345cbf06168bfa263b749340c0971de8dfa1a33dad5bfce6216bd61d4fcee72cbe266ca1f9444c88bcc2684e888860dcea55310d711fed2740e1263a1dc97e87e908dc4281556bbf3e47d64aa5ee83c79525892daff3af26b6ca65997d09fc15142eac7a165e419466cc665390e521e6e4d8ac407245c589d8f79b363ca39bf509f0f6805c971745685a967de1413f35e7261902b3ed69c6eae06b9cf48b799aee2af932994ddb17f45db118946d981cada37bd8c346bd2d3d19d3fc06b9e76e64cff08b84d07dd08b36638ca0ddd7d366025e13dcf5fe7a4171befcec83e7a6e4aee5cff0870b4f4bef8a3b9ac1999d0b540ea96ff8eecb641c9bdfc1d9a30190a072245f3e7ed9e89c086508c16c0402ea2796a6f5fbd76e6bfea66b3eba23a645270734cbfffcdf9fdb5deff6fa67693a8ea2efd9f5d4444696a329ec7a99d39d6635011c6220145db6ac289d6aaf21e409e4d81898c7756f2a9dec3d3a2ab241017788db29b9a3bd6410b45391d194ce1be13f06fa1d6d63abda20be1c61a3ff9e0dffedc244839792820e94cf6a50333c2512e850b9617e22742b27c65a1d2c6b46e8f0c8636d64f4908d68f832b6',
    method: 'get',
}).then(result => {
    let str = result.data
    console.log('请求结果', str)

    const captcha_output = str.match(/"process_token":"([^"]+)"/)[0];
    const gen_time = str.match(/"gen_time":"([^"]+)"/)[0];
    const pass_token = str.match(/"gen_time":"([^"]+)"/)[0];
    console.log('请求结果', captcha_output,gen_time,pass_token)
}).catch(error => {
    console.log('请求异常', error)
})
