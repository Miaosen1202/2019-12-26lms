import { getData } from "@/utils/getData";

export const resAllSearch = data => {
    // all资源
    const res = getData("/resSearch/pageList/query", data, "get");
    return res;
};
export const resDupSearch = data => {
    // duplicate 资源
    const res = getData("/resImportSearch/pageList/query", data, "get");
    return res;
};

export const resShareSearch = data => {
    // share 资源
    const res = getData("/resShareSearch/pageList/query", data, "get");
    return res;
};
export const resFavSearch = data => {
    // favoriate资源
    const res = getData("/resFavoriteSearch/pageList/query", data, "get");
    return res;
};

export const getResDetail = data => {
    // 获取资源详情数据
    const res = getData("/resSearch/get", data, "get");
    return res;
};
export const addResFavorite = data => {
    // 添加收藏资源
    const res = getData("/resFavorite/add", data, "post");
    return res;
};
export const getResVersion = data => {
    // 资源版本信息
    const res = getData("/resVersion/list", data, "get");
    return res;
};
export const getResList = data => {
    // 获取资源列表
    const res = getData("/resSearch/list", data, "get");
    return res;
};
export const addRes = data => {
    // 添加分享资源
    const res = getData("/resource/add", data, "post");
    return res;
};
export const getResImportStatus = data => {
    // 资源导入分页日志-- Duplicating status
    const res = getData("/resImportStatus/pageList/query", data, "get");
    return res;
};
export const getResShareStatus = data => {
    // 资源分享日志 -- Sharing status
    const res = getData("/resShareStatus/pageList/query", data, "get");
    return res;
};
export const getAdminStatus = data => {
    // 资源管理员日志分页 --  Revised by Admin
    const res = getData("/resAdminLog/pageList/query", data, "get");
    return res;
};

export const delResource = data => {
    // 删除资源
    const res = getData("/resource/deletes", data, "post");
    return res;
};
export const modifyResource = data => {
    // 编辑资源
    const res = getData("/resource/modify", data, "post");
    return res;
};
export const getVersionList = data => {
    // 查询资源版本信息
    const res = getData("/resVersion/list", data, "get");
    return res;
};
export const getImportCourse = data => {
    // 查询可导入或更新的课程
    const res = getData("/resImportCourse/get", data, "get");
    return res;
};
export const modifyImport = data => {
    // 更新资源
    const res = getData("/resImport/modify", data, "post");
    return res;
};
export const addImport = data => {
    // 导入资源
    const res = getData("/resImport/add", data, "post");
    return res;
};
export const getListDetail = data => {
    // 查询课程资源下的单个资源详情
    const res = getData("/resCourseItem/detail/query", data, "get");
    return res;
};

export const getCourseItem = data => {
    // 课程资源下的列表查询
    const res = getData("/resCourseItem/list", data, "get");
    return res;
};
export const resEditSearch = data => {
    // 编辑资源详情
    const res = getData("/resEditSearch/get", data, "get");
    return res;
};

export const delFavorite = data => {
    // 将收藏的资源移除
    const res = getData("/resFavorite/deletes", data, "post");
    return res;
};
//= =================
export const versionIgnore = data => {
    // 忽略当前最新资源版本的提醒
    const res = getData("/resVersionIgnore/modify", data, "post");
    return res;
};

export const modifyShareSetting = data => {
    // 资源分享设置
    const res = getData("/resShareSettings/modify", data, "post");
    return res;
};

export const resSearchAdmin = data => {
    // 管理员资源查询分页
    const res = getData("/resSearchAdmin/pageList", data, "get");
    return res;
};

export const getResRange = () => {
    // 查询管理员设置的资源分享范围
    const res = getData("/resShareSettings/shareRange/query", {}, "get");
    return res;
};
