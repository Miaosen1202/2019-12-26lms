import { getData } from "@/utils/getData";

export const addEport = data => {
    // 新增电子学档
    const res = getData("/ePortfolio/add", data, "post");
    return res;
};
export const eportList = () => {
    // 查询当前人员所有的电子学档
    const res = getData("/ePortfolio/list", {}, "get");
    return res;
};
export const getCollections = data => {
    // 查询单个电子学档信息
    const res = getData("/ePortfolio/get", data, "get");
    return res;
};
export const addCollection = data => {
    // 新增页面集
    const res = getData("/ePortfolioColumn/add", data, "post");
    return res;
};
export const modifyEport = data => {
    // 编辑页面集，包括名称和背景色
    const res = getData("/ePortfolioColumn/modify", data, "post");
    return res;
};
export const delCollect = data => {
    // 删除页面集
    const res = getData("/ePortfolioColumn/deletes", data, "post");
    return res;
};
export const copyCollect = data => {
    // 复制页面集
    const res = getData("/ePortfolioColumn/copy/edit", data, "post");
    return res;
};
export const shareEport = data => {
    // 分享电子学档
    const res = getData("/ePortfolio/share/edit", data, "post");
    return res;
};
export const renameEport = data => {
    // 电子学档重命名
    const res = getData("/ePortfolio/modify", data, "post");
    return res;
};
export const deleteEport = data => {
    // 删除电子学档
    const res = getData("/ePortfolio/deletes", data, "post");
    return res;
};
export const getCollect = data => {
    // 查询单个页面集
    const res = getData("/ePortfolioColumn/get", data, "get");
    return res;
};
export const savePageContent = data => {
    // 保存电子学档页面内容
    const res = getData("/ePortfolioPageContent/modify", data, "post");
    return res;
};
export const addEportPage = data => {
    // 新增电子学档页面
    const res = getData("/ePortfolioPage/add", data, "post");
    return res;
};
export const getEportContent = data => {
    // 获取电子学档页面内容
    const res = getData("/ePortfolioPageContent/get", data, "get");
    return res;
};
export const delEportPage = data => {
    // 删除电子学档页面
    const res = getData("/ePortfolioPage/deletes", data, "post");
    return res;
};
export const modifyEportPage = data => {
    // 编辑电子学档页面
    const res = getData("/ePortfolioPage/modify", data, "post");
    return res;
};
export const copyEportPage = data => {
    // 复制页面
    const res = getData("/ePortfolioPage/copy/edit", data, "post");
    return res;
};
export const moveEportPage = data => {
    // 移动页面
    const res = getData("/ePortfolioPage/move/edit", data, "post");
    return res;
};
export const movePageCollect = data => {
    // 移动页面集
    const res = getData("/ePortfolioColumn/move/edit", data, "post");
    return res;
};
