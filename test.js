const checkArraysInObjects = (arr) => {
    // 判断是否有至少两个非空数组
    let nonEmptyCount = 0;

    for (let i = 0; i < arr.length; i++) {
        const list = arr[i].list;

        // 判断list是否为空数组
        if (list.length === 0) {
            continue;  // 如果是空数组，继续下一次循环
        }

        nonEmptyCount++;

        if (nonEmptyCount > 1) {
            return false;  // 如果有两个以上非空数组，返回false
        }
    }

    // 所有list都是空数组或只有一个不为空，返回true
    return true;
}

console.log(checkArraysInObjects([
    {list:[1]},
    {list:[1]},
    {list:[]},
    {list:[]},
]))
