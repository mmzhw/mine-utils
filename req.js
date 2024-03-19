let axios = require('axios')
let fs = require('fs')
let authorization = fs.readFileSync('./cookies1', 'utf8').toString().trim()
axios({
    url: 'https://api.xiabb.chat/chatapi/marketing/signin',
    method: 'post',
    headers: {
        'Authorization': 'Bearer ' + authorization
    },
    data: {}
}).then(result => {
    console.log('请求结果', result.data)
}).catch(error => {
    console.log('请求异常', error)
})
