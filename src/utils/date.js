/*eslint-disable*/
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
        );
    }
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = `${o[k]}`;
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return `00${str}`.substr(str.length);
}
export function isYesterday(dayCount) {
    let datas = "";
    const createtime = new Date(dayCount);
    const year = createtime.getFullYear();
    const month = createtime.getMonth() + 1;
    const day = createtime.getDate(); // 几号
    const week = createtime.getDay(); // 星期几
    const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const data = new Date();
    const year1 = data.getFullYear();
    const month1 = data.getMonth() + 1;
    const day1 = data.getDate();
    if (year == year1 && day1 == day && month == month1) {
        datas = "Today";
    } else if (year == year1 && day1 - day == 1 && month == month1) {
        datas = "Yesterday";
    } else {
        datas = weekday[week];
    }
    return datas;
}
export function dateFormdate(val) {
    if (typeof val === "undefined" || val === "") {
        return "";
    }
    let res = "";
    const nowDate = new Date();
    const curYear = nowDate.getFullYear();
    const curMontn =
        nowDate.getMonth() + 1 > 9
            ? nowDate.getMonth() + 1
            : `0${nowDate.getMonth() + 1}`;
    const curDay =
        nowDate.getDate() > 9 ? nowDate.getDate() : `0${nowDate.getDate()}`;
    const date = new Date(val);
    const year = date.getFullYear();
    const month =
        date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minutes =
        date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    const seconds =
        date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
    if (curYear === year && curMontn === month && curDay === day) {
        res = `${hours}:${minutes}:${seconds}`;
    } else {
        res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return res;
}
export function ToFixed(data, val) {
    var numbers = "";
    for (var i = 0; i < val; i++) {
        numbers += "0";
    }
    var s = 1 + numbers;
    var spot = "." + numbers;
    var value = Math.round(parseFloat(data) * s) / s;
    var d = value.toString().split(".");
    if (d.length == 1) {
        value = value.toString() + spot;
        return value;
    }
    if (d.length > 1) {
        if (d[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}

/*eslint-disable no-new*/
