let axios = require('axios');

async function start(goodid) {
    for (let i = 0; i < 1; i++) {
        console.log(i)
        await axios({
            method: 'get',
            url: `http://110.40.83.202:81/bi/create_order.php?statistics_name=SZ_A5_tt_mjdx&uin=546616&goodid=${goodid}&platformid=0&worldid=999&channel=SZ_A5_tt_mjdx&device_id=unknown&real_channel=hnlddkj_v2&pid=0&roleid=4555786533921948216`,
        });
        // await axios({
        //     method: 'get',
        //     url: `http://110.40.83.202:81/bi/create_order.php?statistics_name=SZ_A5_tt_mjdx&uin=546617&goodid=${goodid}&platformid=0&worldid=999&channel=SZ_A5_tt_mjdx&device_id=unknown&real_channel=hnlddkj_v2&pid=0&roleid=4555786533932827449`,
        // });
    }
}


// start('180006');
start('390001');