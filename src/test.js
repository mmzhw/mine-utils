let axios = require('axios');
const qs = require("qs");

async function start() {
    let response = await axios({
        method: 'post',
        url: 'http://110.42.38.172:81/gm/api.php',
        data: {
            account: "4555786514768085118",
            amount: "180006",
            gmcode: "nyzm123",
        },
    })
    console.log(response?.data)
}
start()