const axios = require("axios");
const moment = require("moment/moment");

async function getGoods(data) {
    try {
        let formData = new FormData();
        formData.append('type', 'dfreg');
        formData.append('amount', '500006');
        formData.append('checknum', '1');
        formData.append('role_id', '4357627640898213966');
        let result = await axios.post('http://123.60.82.113:81/bi/charge1.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), result.data);
    } catch (e) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'), e.response.data);

    }
}

setInterval(async ()=>{
    await getGoods()
},200)