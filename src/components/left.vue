<template>
    <div id="left">
        <ul>
            <li
                v-for="(item, index) in routerData"
                :key="index"
                :class="{ active: activeFlag == item.activeName }"
                @click="jumpPage(item)"
            >
                <el-tooltip
                    v-if="!isCollapse"
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
                    v-if="isCollapse"
                    :class="['iconfont', item.iconName]"
                    style="font-size: 26px"
                />
                <p
                    v-if="isCollapse"
                    :class="{ active: activeFlag == item.activeName }"
                >
                    {{ item.content }}
                </p>
            </li>
        </ul>
        <a
            :class="{ 'bottom-arrow': true, 'reverse-arrow': isCollapse }"
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
            msg: "左部",
            activeFlag: "Dashboard",
            dialogVisible: false,
            unreadAmount: "",
            routerData: [
                {
                    activeName: "account",
                    content: this.$t("message.left.Account"),
                    iconName: "icon-account",
                    path: "/homePage/personalHomepage"
                },
                {
                    activeName: "Dashboard",
                    content: this.$t("message.left.Dashboard"),
                    iconName: "icon-tabbarhome",
                    path: "/homePage/controlPanel"
                },
                {
                    activeName: "Course",
                    content: this.$t("message.left.Course"),
                    iconName: "icon-shu",
                    path: "/homePage/homeCourse"
                },
                {
                    activeName: "Calendar",
                    content: this.$t("message.left.Calendar"),
                    iconName: "icon-calendar_icon",
                    path: "/homePage/caleadarWatch"
                },
                {
                    activeName: "Resource",
                    content: this.$t("message.left.Resource"),
                    iconName: "icon-resource_icon",
                    path: "/homePage/resourceMain"
                },
                {
                    activeName: "Message",
                    content: this.$t("message.left.Message"),
                    iconName: "icon-xinfeng",
                    path:
                        "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                },
                {
                    activeName: "Certification",
                    content: this.$t("message.left.Certification"),
                    iconName: "icon-certification",
                    path: "/homePage/certificationList"
                }
            ]
        };
    },
    computed: {
        ...mapState(["isCollapse"])
    },
    watch: {
        $route: {
            handler(val) {
                const routerName = val.name.split("_")[0];
                this.activeFlag = routerName;
            },
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
    created() {
        this.unread();
    },
    methods: {
        ...mapMutations(["changeWidth"]),
        jumpPage(item) {
            this.activeFlag = item.activeName;
            this.$router.push({ path: item.path });

            // this.$emit('changeWidth', this.isCollapse);
        },
        switchSide() {
            // 切换侧边栏
            // this.isCollapse = !this.isCollapse;
            const bb = !this.isCollapse;
            this.changeWidth(bb);
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
    height: 22px;
    /*height: 20%;*/
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
    /*padding-left: 30%;*/
    /*background: url("../../static/images/home.png")no-repeat 10%;*/
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
    transition: transform 0.5s linear;
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
    margin-top: -100px;
    margin-left: 31px;
}
</style>
