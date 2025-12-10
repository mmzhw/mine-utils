let axios = require('axios');

const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
let items = [
    // {url: 'http://222.186.56.197:82/SDK/kdjx_DjqCallBack.php?param=681b2e897264774ffb7133d1_681b2e8b7264774ff671598c1746612628_mzhw53', num: 50, label: '升星礼包'},
    {url: 'http://222.186.56.197:82/SDK/kdjx_DjqCallBack.php?param=681b2e897264774ffb7133d1_681b2e8b7264774ff671598c1746611918_mzhw53', num: 15, label: '超梦'},
]
async function start() {
    // for (let i = 0; i < 100; i++) {
    //     console.log(i)
    //     await axios({
    //         method: 'get',
    //         url: `http://222.186.56.197:82/SDK/kdjx_DjqCallBack.php?param=681b129a7264776790be8d9d_681b129c726477676fc33d821746604747_mzhw51`,
    //     });
    //     await sleep(2000)
    // }
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        for (let j = 1; j < item.num; j++) {
            console.log(item.label,j)
            await axios({
                method: 'get',
                url: item.url,
            });
            // await sleep(500)
        }
    }
}


// start('180006');
start();

//http://222.186.56.197:82/pay.php?accountId=681b129a7264776790be8d9d&orderId=681b129c726477676fc33d821746612322
//http://222.186.56.197:82/pay.php?accountId=681b2e897264774ffb7133d1&orderId=681b2e8b7264774ff671598c1746611918  超梦
// http://222.186.56.197:82/SDK/kdjx_DjqCallBack.php?param=681b2e897264774ffb7133d1_681b2e8b7264774ff671598c1746611918_mzhw53
// http://222.186.56.197:82/SDK/kdjx_DjqCallBack.php?param=681b2e897264774ffb7133d1_681b2e8b7264774ff671598c1746611918_mzhw51