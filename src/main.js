// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/
import Vue from "vue";
import ElementUI, { DatePicker } from "element-ui";
import "./assets/style/theme.scss";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-vue";
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/locale/zh-cn";
import "fullcalendar/dist/fullcalendar.css";
import echarts from "echarts";
import VideoPlayer from "vue-video-player";
import { getData } from "@/utils/getData";
import i18n from "./i18n/i18n";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import * as filters from "./common/filters/index";
import { ToFixed } from "@/utils/date";

Vue.use(VideoPlayer);
Vue.prototype.$echarts = echarts;
Vue.use(FullCalendar);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(CKEditor);

Vue.prototype.$http = axios;
Vue.prototype.$getData = getData;
Vue.prototype.GlobalUrl = `${process.env.FILE_PRE_SERVER}`;
// Vue.prototype.$ToFixed = ToFixed;
// Vue.prototype.$http =$http;
/* eslint-disable no-new */
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
const vm = new Vue({
    el: "#app",
    router,
    i18n,
    store,
    components: {
        App
        // InfiniteLoading,
    },
    template: "<App/>"
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        getData("/getUserInfo").then(({ data }) => {
            if (Number(data.code) === 200 && data.entity && data.entity.id) {
                const userInfo = data.entity;
                if (
                    (userInfo.id !== store.state.userInfo.id ||
                        userInfo.type !== store.state.userInfo.type) &&
                    store.state.hasUserInfo
                ) {
                    tip();
                }
            }
            function tip() {
                // 检测到账号或者 账号类型变化
                vm.$alert(
                    "We have detected that your ID is not that of your account. Please refresh the page to get back to your account.",
                    "Notice",
                    {
                        callback: () => {
                            window.location.reload();
                        }
                    }
                );
            }
        });
    }
});
