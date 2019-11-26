<template>
    <div id="left">
        <ul>
            <li
                v-for="(item, index) in routerDataList"
                :key="index"
                :class="{
                    active: activeFlag == item.activeName ? activeFlag : ''
                }"
                @click="jumpPage(item)"
            >
                <el-tooltip
                    v-show="!sCollapse"
                    class="item"
                    popper-class="test"
                    :content="item.content"
                    placement="right-start"
                >
                    <i
                        :class="['iconfont', item.iconName]"
                        style="font-size: 26px"
                    />
                </el-tooltip>
                <i
                    v-show="sCollapse"
                    :class="['iconfont', item.iconName]"
                    style="font-size: 26px"
                />
                <p
                    v-show="sCollapse"
                    :class="{ active: activeFlag == item.activeName }"
                >
                    {{ item.content }}
                </p>
            </li>
        </ul>
        <a
            :class="{ 'bottom-arrow': true, 'reverse-arrow': sCollapse }"
            @click="switchSide"
        >
            <i class="iconfont icon-jiantouyou" style="font-size:20px" />
        </a>
        <div v-if="unreadAmount > 0" class="unread" />
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            unreadAmount: "",
            msg: "左部",
            activeFlag: "saccount",
            dialogVisible: false,
            routerDataList: [
                {
                    activeName: "saccount",
                    content: this.$t("message.left.Account"),
                    iconName: "icon-account",
                    path: "/studentHomePage/studentPersonal"
                },
                {
                    activeName: "sDashboard",
                    content: this.$t("message.left.Dashboard"),
                    iconName: "icon-tabbarhome",
                    path: "/studentHomePage/studentControlPanel"
                },
                {
                    activeName: "sCourse",
                    content: this.$t("message.left.Course"),
                    iconName: "icon-shu",
                    path: "/studentHomePage/studentHomeCourse"
                },
                {
                    activeName: "sCalendar",
                    content: this.$t("message.left.Calendar"),
                    iconName: "icon-calendar_icon",
                    path: "/studentHomePage/studentCalendarWatch"
                },
                {
                    activeName: "sGroup",
                    content: this.$t("message.left.Group"),
                    iconName: "icon-user",
                    path: "/studentHomePage/studentGroup"
                },
                // {  资源模块
                //   activeName: 'Resources',
                //   content: 'Resources',
                //   iconName: 'icon-resource_icon',
                //   path: '/studentHomePage/studentResourceList'
                // }
                // 消息模块
                {
                    activeName: "sMessage",
                    content: this.$t("message.left.Message"),
                    iconName: "icon-xinfeng",
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                },
                // 认证模块
                {
                    activeName: "sCertification",
                    content: this.$t("message.left.Certification"),
                    iconName: "icon-certification",
                    path: "/studentHomePage/studentCertificationList"
                }
            ]
        };
    },
    computed: {
        ...mapState(["sCollapse"])
    },
    watch: {
        $route: {
            handler(newVal) {
                const tempArr = newVal.name.split("_");
                this.activeFlag = tempArr[0].toString();
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.unread();
    },
    methods: {
        ...mapMutations(["sChangeWidth"]),
        jumpPage(item) {
            this.activeFlag = item.activeName;
            this.$router.push({ path: item.path });
        },
        switchSide() {
            // 切换侧边栏
            const bb = !this.sCollapse;
            this.sChangeWidth(bb);
        },
        // 消息部分未读数量的显示
        async unread() {
            const result = await this.$getData(
                "/message/unread/query",
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.unreadAmount = result.data.entity;
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        }
    }
};
</script>

<style scoped="">
ul {
    min-width: 57px;
    padding-top: 10px;
}
ul li {
    text-align: left;
    display: block;
    width: 100%;
    /*height: 20%;*/
    height: 22px;
    margin-right: 10%;
    /*margin-bottom: 10%;*/
    cursor: pointer;
    color: #c3c7d5;
    padding: 15px 0;
}
ul li > i {
    vertical-align: bottom;
    display: inline-block;
    margin-left: 10px;
}
ul li p {
    display: inline-block;
    margin-left: 5px;
}
ul li span.active {
    border-left: 4px solid #0e38b1;
    position: absolute;
    height: 26px;
    width: 5px;
    left: 0;
    display: inline-block;
    margin-top: -3px;
}
ul li.active {
    background-color: #fff;
    color: #0e38b1;
    /*padding-bottom: 14%;*/
    /*padding-top: 14%;*/
}

.bottom-arrow {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 3;
    cursor: pointer;
    transform: rotateY(0deg);
    transition: transform 0.5s ease;
}
.reverse-arrow {
    transform: rotateY(180deg);
}
.unread {
    width: 14px;
    height: 14px;
    background: #f56c6c;
    border-radius: 7px;
    float: left;
    margin-top: -97px;
    margin-left: 31px;
}
</style>
