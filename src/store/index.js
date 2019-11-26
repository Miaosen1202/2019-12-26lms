/*eslint-disable*/
import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/user";

Vue.use(Vuex);
const state = {
    curLanguage: "",
    userInfo: {},
    hasUserInfo: false,
    isCollapse: false,
    sCollapse: false,
    aCollapse: false
};

const mutations = {
    changeLanguage(state, lan) {
        state.curLanguage = lan;
    },
    setUserInfo(state, infoObj) {
        state.userInfo = infoObj;
        state.hasUserInfo = true;
    },
    logout(state) {
        state.userInfo = {};
        state.hasUserInfo = false;
    },
    setId(state, id) {
        state.id = id;
    },
    changeWidth(state, isCollapse) {
        localStorage.setItem("isCollapse", isCollapse);
        state.isCollapse = isCollapse
            ? isCollapse
            : localStorage.setItem("isCollapse", isCollapse);
    },
    sChangeWidth(state, sCollapse) {
        localStorage.setItem("sCollapse", sCollapse);
        state.sCollapse = sCollapse
            ? sCollapse
            : localStorage.setItem("sCollapse", sCollapse);
    },
    aChangeWidth(state, aCollapse) {
        localStorage.setItem("aCollapse", aCollapse);
        state.aCollapse = aCollapse
            ? aCollapse
            : localStorage.setItem("aCollapse", aCollapse);
    }
};

const actions = {
    getUserInfo({ commit }) {
        return api.getUserInfo().then(data => {
            if (
                data.code == 200 &&
                data.entity &&
                data.entity.id !== undefined
            ) {
                // console.log('popo', data.entity)
                commit("setUserInfo", data.entity);
            } else {
                commit("logout");
            }
            return data;
        });
    }
};

const getters = {
    userInfoData: state => state.userInfo,
    instituteList: state => {
        let tempUserInfo = {};
        let orgList = [];

        tempUserInfo = state.userInfo;
        if (tempUserInfo.orgs) {
            orgList = tempUserInfo.orgs;
        }
        return orgList;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
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
/*eslint-disable no-new*/
