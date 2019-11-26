/*eslint-disable*/
import axios from "axios";
import querystring from "querystring";
import { Message } from "element-ui";
import Router from "../router";

axios.interceptors.request.use(
    config => config,
    err => {
        // Message.error('请求超时!')
        Message.error("The request timed out!");
        return Promise.resolve(err);
    }
);
const myInterceptor = axios.interceptors.response.use(
    data => {
        // 下载文件时特殊处理
        if (data.config.responseType && data.data.code !== 200) {
            return data;
        }
        if (data.status && data.status == 200 && data.data.code !== 200) {
            Message.error(data.data.message);
        }
        return data;
    },
    err => {
        if (err.response.status == 504 || err.response.status == 404) {
            // Message.error('服务器被吃了⊙﹏⊙∥||在重启稍等片刻')
            Message.error(
                "There was a problem connecting to the server. Please try again"
            );
        } else if (err.response.status == 403) {
            // Message.error('权限不足,请联系管理员!')
            Message.error(
                "Insufficient Permission, Please contact your WELMS administrator"
            );
        } else if (err.response.status == 400) {
            // Message.error('所查数据为空，请重新选择筛选条件!')
            Message.error(
                "No eligible data was found, please try again with another filter condition"
            );
        } else if (err.response.status == 401) {
            Router.push({ path: "/login?force=1" });
        } else {
            // Message.error('未知错误!')
            Message.error("An unknown network error has occurred");
        }
        return Promise.resolve(err);
    }
);
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// 处理req data
const opera_req = data => querystring.stringify(data);
const postData = data => {
    const params = new URLSearchParams();
    let i;
    for (i in data) {
        params.append(i, data[i]);
    }
    return params;
};
// 处理res data
const opera_res = data => data;
// 通过axios发送请求
const getData = async (path, queryData, type = "get") => {
    const str = `${process.env.NODE_ENV}`;
    const url = str.concat(path);
    let result;
    if (type == "get") {
        if (queryData) {
            result = await axios.get(url, {
                params: queryData
            });
        } else {
            result = await axios(url);
        }
    } else {
        // queryData = postData(queryData)
        result = await axios({
            method: "post",
            url,
            data: queryData
        });
    }
    const resdata = opera_res(result);
    return new Promise((resolve, reject) => {
        resolve(resdata);
    }).catch(error => {
        console.log(`error: ${error}`);
    });
};

export { getData };
/*eslint-disable no-new*/
