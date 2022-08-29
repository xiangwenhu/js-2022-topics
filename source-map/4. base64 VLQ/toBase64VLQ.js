
const PADDING_MAP = {
    1: '0000',
    2: '000',
    3: '00',
    4: '0'
}
const BASE64_CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * 整数转为 VLQ的二进制
 * @param {} intNum 
 * @returns 
 */
function toBase64VLQBinary(intNum) {
    // 转为二进制
    let str = Math.abs(intNum).toString(2);
    // 最低位填充符号为
    str += intNum >= 0 ? '0' : '1';

    // 高位补0， 长度变为5的整数倍
    const paddingLength = str.length % 5;
    if (paddingLength != 0) {
        str = PADDING_MAP[paddingLength] + str;
    }

    const gCount = str.length / 5;
    const groups = [];
    // 5个分组， 同时颠倒顺序 并填充连续位
    // 从后往前截取
    for (let i = gCount; i > 0; i--) {
        // 连续位
        const c = i === 1 ? '0' : '1';
        groups.push(c + str.substring(5 * (i - 1), 5 * i));
    }
    return {
        binary: groups.join(''), //  二进制字符串
        groups // 分组信息
    };
}

/**
 * 整数转为base64 VLQ
 * @param {*} intNum 
 * @returns 
 */
function toBase64VLQString(intNum) {
    const { groups } = toBase64VLQBinary(intNum);
    return groups.map(g => BASE64_CHARTS[parseInt(g, 2)]).join('');
}

// console.log(toBase64VLQString(37))  //qC
// console.log(toBase64VLQString(139)) //2I


/**
 * 整数数组转为base64 VLQ 字符串
 * @param {*} intNumArr 
 * @returns 
 */
function toBase64VLQStringFromArray(intNumArr) {
    return intNumArr.map(num => toBase64VLQString(num)).join('');
}

const print = console.log;
// print(toBase64VLQStringFromArray([0, 0, 1, 0]))
// print(toBase64VLQStringFromArray([4, 0, 0, 4, 0]))
// print(toBase64VLQStringFromArray([8, 0, 1, -12, 1]))

print(toBase64VLQString(-2666))


