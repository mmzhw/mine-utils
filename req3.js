//微博-微博取消关注

let axios = require('axios');
let Cookie = 'SINAGLOBAL=9715724036503.098.1705391028929; ULV=1705391028931:1:1:1:9715724036503.098.1705391028929:; XSRF-TOKEN=r9aFkQYGCYYxCU8Wj-q_E8eZ; ALF=1708923966; SUB=_2A25IsP9sDeRhGedO7FYQ-C7EzDmIHXVrzH6krDV8PUJbkNAbLUPXkW1NXP240ANjav8RxXFlktdcELE6H2ESE1ZX; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhXD8RKIvKu8C6-X3GKLSi75JpX5KMhUgL.Fo27S0Bp1h5RS0-2dJLoIEBLxKqLBKzLBo-LxK-LB.qL1heLxK.L1h2L1KeLxK-LBKzL1het; WBPSESS=ECw-eHKb1eorpbapgYKFLloN3__9K-fscTVHHIgV_MbUAZjL7vyeIB56yaxStG6FiD8YpqyTNdieWs8_zBcn18ImSAosAN1wjQxI3nwauRwsWw46h3dLRp3YoWndPYZSMCZIEWld8c7QldXqnCMNRQ==';

async function getList () {
    try {
        let result = await axios({
            url: `https://weibo.com/ajax/profile/followContent?sortType=all`,
            method: 'get',
            headers: {
                'Cookie': Cookie
            },
            data: {}
        });
        let list = result.data.data.follows.users;
        console.log('请求结果数量', list.map(i => i.idstr));
        for (let i = 0; i < list.length; i++) {
            await delItem(list[i].idstr);
        }
    } catch (e) {
        console.log(e.message);
    }
}

async function delItem (uid) {
    await axios({
        url: `https://weibo.com/ajax/friendships/destory`,
        method: 'post',
        headers: {
            'Cookie': Cookie,
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Xsrf-Token': 'r9aFkQYGCYYxCU8Wj-q_E8eZ',
        },
        data: { uid: uid }
    });
    console.log('取消关注id', uid);
}

async function loop () {
    for (let i = 0; i < 50; i++) {
        await getList();
    }
}

loop();
