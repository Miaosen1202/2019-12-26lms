import { getData } from "@/utils/getData";

export const addLive = data => {
    // 添加直播
    const res = getData("/live/add", data, "post");
    return res;
};
export const liveList = data => {
    // 获取直播列表
    const res = getData("/live/list", data, "get");
    return res;
};
export const delList = data => {
    // 删除直播
    const res = getData("/live/deletes", data, "post");
    return res;
};
export const getLiveById = data => {
    // 根据Id获取直播信息
    const res = getData("/live/get", data, "get");
    return res;
};
export const modifyLive = data => {
    // 修改直播
    const res = getData("/live/modify", data, "post");
    return res;
};
export const queryLive = data => {
    // 直播用户统计
    const res = getData("/live/history/query", data, "get");
    return res;
};
