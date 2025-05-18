let axios = require('axios');

function getFormData(uid, item, num) {
    let formData = new FormData();
    formData.append('type', 'daoju');
    formData.append('uid', uid);
    formData.append('item', item);
    formData.append('num', num);
    formData.append('qu', '10001');
    formData.append('checknum', '123456');
    return formData
}

async function loopMoney(goodid, loop = 1) {
    let url = `http://110.40.83.151:81/gm/api.php`
    let gmcode = "fuliba"
    for (let i = 0; i < loop; i++) {
        console.log(i)
        let response1 = await axios({method: 'post', url, data: {account: "4555786550362769000", amount: goodid, gmcode,}});
        let response2 = await axios({method: 'post', url, data: {account: "4555786550362768745", amount: goodid, gmcode,}});
        console.log(`清路尘:${response1.data}；倚香雪:${response2.data}`);
    }
}

async function loopItems(loop, num = 1) {
    async function getItems(item, num) {
        let url = 'http://110.40.83.151:81/gm/ht/user/gmquery.php'
        for (let i = 0; i < loop; i++) {
            console.log(i)
            let response1 = await axios.post(url, getFormData('清路尘', item, num), {headers: {'Content-Type': 'multipart/form-data'}});
            let response2 = await axios.post(url, getFormData('倚香雪', item, num), {headers: {'Content-Type': 'multipart/form-data'}})
            console.log(`清路尘:${response1.data}；倚香雪:${response2.data}`);
        }
    }

    let list = [
        'addmoney 1',
        // 'additem 200051',
        // 'additem 500014',
        // 'additem 500015',
        // 'additem 500016',
        // 'additem 500017',
        // 'additem 500054',
        // 'additem 500055',
        // 'additem 500056',
        // 'additem 500057',
        // 'additem 500064',
        // 'additem 500065',
        // 'additem 500066',
        // 'additem 500067',
        // 'additem 500074',
        // 'additem 500075',
        // 'additem 500076',
        // 'additem 500077',
        // 'additem 900010'
    ]
    for (let i = 0; i < list.length; i++) {
        await getItems(list[i], num)
    }
}


loopMoney('180008', 1000);
// loopItems(1, 10000);


