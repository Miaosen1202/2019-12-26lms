import { getData } from "@/utils/getData";

export const getAssign = data => {
    const res = getData("/assign/get", data, "get");
    return res;
};
export const tearcherUserList = data => {
    const res = getData("/teacherUser/list", data, "get");
    return res;
};
