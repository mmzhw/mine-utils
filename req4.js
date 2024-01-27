//520vr

let axios = require('axios');


let formData = new FormData();
formData.append('action', 'user_qiandao');

// 使用 Axios 发送 POST 请求
axios.post('https://520vr.cn/wp-admin/admin-ajax.php', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Cookie': 'wordpress_201c22c5f4cfe4d2a9bfd7d1c638abc6=Augus%7C1706511971%7CdpKZhy7nNpFyGWaFolVgzbAgoUkLXfT6gVsRmmML6dw%7C201303e22b3b333a9d2663ea0b85f0a21195020ef65e478ae2f4962fdf8db5f9; PHPSESSID=4s1apmedbgvm0dnt33nedcv38m; cao_notice_cookie=1; wordpress_logged_in_201c22c5f4cfe4d2a9bfd7d1c638abc6=Augus%7C1706511971%7CdpKZhy7nNpFyGWaFolVgzbAgoUkLXfT6gVsRmmML6dw%7Ce275540c581b905c3bca3295fb615053d86e2956ef86bb595aba65273710b5c0'
    }
}).then(result => {
    console.log('请求结果', result.data);
}).catch(error => {
    console.log('请求异常', error.response.data);
});
