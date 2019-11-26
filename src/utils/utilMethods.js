const utilMethods = {
    fileTypeData: {
        docList: ["doc", "docx"],
        imgList: ["png", "jpg", "jpeg", "bmp", "gif"],
        excelList: ["xls", "xlsx"],
        mp4List: ["mp4"],
        pdfList: ["pdf"],
        pptList: ["ppt", "pptx"]
    },
    gradeList: [
        { id: 0, name: "Kindergarten" },
        { id: 1, name: "1st Grade" },
        { id: 2, name: "2nd Grade" },
        { id: 3, name: "3rd Grade" },
        { id: 4, name: "4th Grade" },
        { id: 5, name: "5th Grade" },
        { id: 6, name: "6th Grade" },
        { id: 7, name: "7th Grade" },
        { id: 8, name: "8th Grade" },
        { id: 9, name: "9th Grade" },
        { id: 10, name: "10th Grade" },
        { id: 11, name: "11th Grade" },
        { id: 12, name: "12th Grade" },
        { id: 13, name: "Undergraduate" },
        { id: 14, name: "Graduate" }
    ],
    licenceList: [
        {
            id: 1,
            name: "Public Domain",
            image: "publicdomain.png",
            link: "https://creativecommons.org/publicdomain/mark/1.0/"
        },
        {
            id: 2,
            name: "CC-Attribution",
            image: "by.png",
            link: "https://creativecommons.org/licenses/by/4.0/"
        },
        {
            id: 3,
            name: "CC-Attribution ShareAlike",
            image: "by-sa.png",
            link: "https://creativecommons.org/licenses/by-sa/4.0/s"
        },
        {
            id: 4,
            name: "CC-Attribution NoDerive",
            image: "by-nd.png",
            link: "https://creativecommons.org/licenses/by-nd/4.0/"
        },
        {
            id: 5,
            name: "CC-Attribution NonCommercial",
            image: "by-nc.png",
            link: "https://creativecommons.org/licenses/by-nc/4.0/"
        },
        {
            id: 6,
            name: "CC-Attribution NonCommercial ShareAlike",
            image: "by-nc-sa.png",
            link: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
        },
        {
            id: 7,
            name: "CC-Attribution NonCommercial NoDerives",
            image: "by-nc-nd.png",
            link: " https://creativecommons.org/licenses/by-nc-nd/4.0/"
        }
    ],
    // 对象/数组  深复制
    deepClone(obj) {
        function checkType(target) {
            return Object.prototype.toString.call(target).slice(8, -1);
        }
        let result;
        const objType = checkType(obj);
        if (objType === "Object") {
            result = {};
        } else if (objType === "Array") {
            result = [];
        }
        Object.keys(obj).forEach(i => {
            if (Object.prototype.hasOwnProperty.call(obj, i)) {
                const value = obj[i];
                if (
                    checkType(value) === "Object" ||
                    checkType(value) === "Array"
                ) {
                    result[i] = utilMethods.deepClone(value);
                } else {
                    result[i] = value;
                }
            }
        });
        return result;
    },
    // 格式化日历时间
    calenderFormate(time) {
        const tempTime = Number(time);
        let tempMonth;
        let tempDay;
        let tempHour;
        let tempMiute;
        let tempSeconds;
        const tempDate = new Date(tempTime);
        // console.log('tempDate', tempDate)
        const tempYear = tempDate.getFullYear();
        tempMonth = tempDate.getMonth() + 1;
        tempMonth = tempMonth > 9 ? tempMonth : `0${tempMonth}`;
        tempDay = tempDate.getDate();
        tempDay = tempDay > 9 ? tempDay : `0${tempDay}`;
        tempHour = tempDate.getHours();
        tempHour = tempHour > 9 ? tempHour : `0${tempHour}`;
        tempMiute = tempDate.getMinutes();
        tempMiute = tempMiute > 9 ? tempMiute : `0${tempMiute}`;
        tempSeconds = tempDate.getSeconds();
        tempSeconds = tempSeconds > 9 ? tempSeconds : `0${tempSeconds}`;
        const result = `${tempYear}-${tempMonth}-${tempDay}T${tempHour}:${tempMiute}:${tempSeconds}`;
        return result;
    },
    formDetialDate(time) {
        let tempMonth;
        let tempDay;
        let tempHour;
        let tempMiute;
        let tempSeconds;
        const tempDate = new Date(time);
        const tempYear = tempDate.getFullYear();
        tempMonth = tempDate.getMonth() + 1;
        tempMonth = tempMonth > 9 ? tempMonth : `0${tempMonth}`;
        tempDay = tempDate.getDate();
        tempDay = tempDay > 9 ? tempDay : `0${tempDay}`;
        tempHour = tempDate.getHours();
        tempHour = tempHour > 9 ? tempHour : `0${tempHour}`;
        tempMiute = tempDate.getMinutes();
        tempMiute = tempMiute > 9 ? tempMiute : `0${tempMiute}`;
        tempSeconds = tempDate.getSeconds();
        tempSeconds = tempSeconds > 9 ? tempSeconds : `0${tempSeconds}`;
        const result = `${tempYear}-${tempMonth}-${tempDay}  ${tempHour}:${tempMiute}:${tempSeconds}`;
        // console.log('result', result)
        return result;
    },
    // 获取当月第一天的10位单位秒
    get_firstDaySecond_ofMonth() {
        const tempSartDate = new Date();
        tempSartDate.setDate(1);
        tempSartDate.setHours(0);
        tempSartDate.setSeconds(0);
        tempSartDate.setMinutes(0);
        const time = Number(
            tempSartDate
                .getTime()
                .toString()
                .substr(0, 10)
        );
        return time;
    },
    // 获取指定月份日期的10位单位秒
    get_particu_monthSecond(year, month, day) {
        const tempMonth = Number(month) - 1;
        const tempDate = new Date(year, tempMonth, day);
        const result = Number(
            tempDate
                .getTime()
                .toString()
                .substr(0, 10)
        );
        return result;
    },
    // 获取
    formatDate(val) {
        if (typeof val === "undefined") {
            return "";
        }
        let date = val;
        date = new Date(val);
        let month = date.getMonth() + 1;
        month = (month > 9 ? "" : "0") + month;
        let day = date.getDate();
        day = (day > 9 ? "" : "0") + day;
        let hours = date.getHours();
        hours = (hours > 9 ? "" : "0") + hours;
        let minutes = date.getMinutes();
        minutes = (minutes > 9 ? "" : "0") + minutes;
        let seconds = date.getSeconds();
        seconds = (seconds > 9 ? "" : "0") + seconds;

        const res = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        if (res) {
            return res;
        }
        return "";
    },
    defaultAvatar(val) {
        // TODO 国际化时间方式
        if (val) {
            return `${process.env.FILE_PRE_SERVER}${val}`;
        }
        // TODO 更换默认头像
        // return 'static/images/xing.png';
        return "static/images/touxiang.png";
    },
    // 格式化文件大小
    formatFileSize(fileSize) {
        let temp = "";
        if (typeof fileSize === "undefined") {
            return "";
        }
        if (fileSize < 1024) {
            return `${fileSize}B`;
        }
        if (fileSize < 1024 * 1024) {
            temp = fileSize / 1024;
            temp = temp.toFixed(0);
            return `${temp}KB`;
        }
        if (fileSize < 1024 * 1024 * 1024) {
            temp = fileSize / (1024 * 1024);
            temp = temp.toFixed(0);
            return `${temp}MB`;
        }
        temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(0);
        return `${temp}GB`;
    },
    downloadFile(url) {
        window.open(url, "_blank");
    },

    // 数组克隆
    clone(arr) {
        const a = [];
        for (let i = 0, l = arr.length; i < l; i += 1) {
            a.push(arr[i]);
        }
        return a;
    },
    // 判断文件是否可以查看
    getIsView(fileType) {
        const tempList = [];
        let isView = false;
        Object.keys(this.fileTypeData).forEach(attr => {
            if (Object.prototype.hasOwnProperty.call(this.fileTypeData, attr)) {
                const tempBoolean = this.fileTypeData[attr].indexOf(fileType);
                tempList.push(tempBoolean);
            }
        });
        isView = tempList.some(el => el > -1);
        return isView;
    },

    // 处理文件的树形控件数据
    dealTreeList(totalTree) {
        let tempTotalTree = totalTree;
        const list = [];
        list.push(tempTotalTree.slice(0, 8));
        tempTotalTree = tempTotalTree.substr(8);
        while (tempTotalTree.length > 0) {
            let tempStr = tempTotalTree.slice(0, 4);
            tempTotalTree = tempTotalTree.substr(4);
            tempStr = `${list[list.length - 1]}${tempStr}`;
            list.push(tempStr);
        }
        return list;
    },
    // 实现单词首字母大写
    setFirstWordUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // 根据某个属性对对象数组去重
    uniq(array, attr) {
        const temp = {};
        const r = [];
        const len = array.length;
        let val;
        let type;
        for (let i = 0; i < len; i += 1) {
            val = array[i];
            type = typeof val[attr];
            if (!temp[val[attr]]) {
                temp[val[attr]] = [type];
                r.push(val[attr]);
            } else if (temp[val[attr]].indexOf(type) < 0) {
                temp[val[attr]].push(type);
                r.push(val[attr]);
            }
        }
        return r;
    }
};

export default utilMethods;
