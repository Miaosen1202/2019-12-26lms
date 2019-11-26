/*eslint-disable*/
const gradeBookPub = {
    getLetter(letter) {
        if (letter >= 94 && letter < 100) {
            return "A";
        }
        if (letter < 94 && letter >= 90) {
            return "A-";
        }
        if (letter < 90 && letter >= 87) {
            return "B+";
        }
        if (letter < 87 && letter >= 84) {
            return "B";
        }
        if (letter < 84 && letter >= 80) {
            return "B-";
        }
        if (letter < 80 && letter >= 77) {
            return "C+";
        }
        if (letter < 77 && letter >= 74) {
            return "C";
        }
        if (letter < 74 && letter >= 70) {
            return "C-";
        }
        if (letter < 70 && letter >= 67) {
            return "D+";
        }
        if (letter < 67 && letter >= 64) {
            return "D";
        }
        if (letter < 64 && letter >= 61) {
            return "D-";
        }
        if (letter < 61 && letter >= 0) {
            return "F";
        }
    },
    // uniqObjInArray(objarray) { //数组对象去重
    //   let len = objarray.length;
    //   let tempJson = {};
    //   let res = [];
    //   for (let i = 0; i < len; i++) {
    //     //取出每一个对象
    //     tempJson[JSON.stringify(objarray[i])] = true;
    //   }
    //   let keyItems = Object.keys(tempJson);
    //   // console.log(keyItems)
    //   for (let j = 0; j < keyItems.length; j++) {
    //     res.push(JSON.parse(keyItems[j]));
    //   }
    //   return res;
    // },
    uniqObjInArray(array, fn) {
        const hash = {};
        const ret = [];
        for (let i = 0, len = array.length; i < len; i++) {
            const uniqId = fn(array[i]);
            if (!hash[uniqId]) {
                ret.push(array[i]);
            }
            hash[uniqId] = 1;
        }
        return ret;
    },
    sum(arr) {
        return arr.reduce((sum, a) => (sum += a), 0);
    }
};
export default gradeBookPub;
/*eslint-disable no-new*/
