<template>
    <div id="left">
        <ul>
            <li
                v-for="(item, index) in routerDataList"
                v-show="item.canShow ? isShow : true"
                :key="index"
                :class="{ active: activeFlag == item.activeName }"
                @click="jumpPage(item)"
            >
                <el-tooltip
                    v-show="!aCollapse"
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
                    v-show="aCollapse"
                    :class="['iconfont', item.iconName]"
                    style="font-size: 26px"
                />
                <p
                    v-show="aCollapse"
                    :class="{ active: activeFlag == item.activeName }"
                >
                    {{ item.content }}
                </p>
            </li>
        </ul>
        <a
            :class="{ 'bottom-arrow': true, 'reverse-arrow': aCollapse }"
            @click="switchSide"
        >
            <i class="iconfont icon-jiantouyou" style="font-size:20px" />
        </a>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            msg: "左部",
            isShow: false,
            activeFlag: "Aaccount" /* 进入admin显示的页面 */,
            dialogVisible: false,
            routerDataList: [
                {
                    activeName: "Aaccount",
                    content: this.$t("message.left.Account"),
                    iconName: "icon-account",
                    path: "/adminHomePage/account"
                },
                {
                    activeName: "ACourse",
                    content: this.$t("message.left.Course"),
                    iconName: "icon-shu",
                    path: "/adminHomePage/adminCourseAll"
                },
                {
                    activeName: "Apeople",
                    content: this.$t("message.left.People"),
                    iconName: "icon-user",
                    path: "/adminHomePage/adminPeople"
                },
                {
                    activeName: "AsubAccount",
                    content: this.$t("message.left.Sub_Account"),
                    iconName: "icon-zuzhiguanli-",
                    path: "/adminHomePage/subAccount"
                },
                {
                    activeName: "Aterms",
                    content: this.$t("message.left.Terms"),
                    iconName: "icon-term",
                    path: "/adminHomePage/terms",
                    canShow: true
                },
                {
                    activeName: "sisImport",
                    content: this.$t("message.left.SIS_Import"),
                    iconName: "icon-sis",
                    path: "/adminHomePage/sisImport",
                    canShow: true
                },
                {
                    activeName: "aResource",
                    content: this.$t("message.left.Resource"),
                    iconName: "icon-resource_icon",
                    path: "/adminHomePage/adminResource"
                },
                {
                    activeName: "aSettings",
                    content: this.$t("message.left.Settings"),
                    iconName: "icon-shezhi",
                    path: "/adminHomePage/adminSettings"
                },
                {
                    activeName: "adminCertificationList",
                    content: this.$t("message.left.Certification"),
                    iconName: "icon-certification",
                    path: "/adminHomePage/adminCertificationList"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        ...mapState(["aCollapse"])
    },
    watch: {
        $route: {
            handler(val) {
                const routerName = val.name.split("_")[0];
                this.activeFlag = routerName;
                // this.activeFlag = val.name.split('_')[0];
                // console.log(this.activeFlag);
                for (let i = 0; i < this.userInfoData.orgs.length; i += 1) {
                    if (
                        Number(this.userInfoData.orgs[i].id) ===
                            Number(this.userInfoData.orgId) &&
                        Number(this.userInfoData.orgs[i].type) === 1
                    ) {
                        this.isShow = true;
                        break;
                    } else {
                        this.isShow = false;
                    }
                }
            },
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
    created() {},
    methods: {
        ...mapMutations(["aChangeWidth"]),
        jumpPage(item) {
            this.activeFlag = item.activeName;
            this.$router.push({ path: item.path });
        },
        switchSide() {
            // 切换侧边栏
            const bb = !this.aCollapse;
            this.aChangeWidth(bb);
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
    /*padding-top: 15%;*/
    /*margin-top: 10%;*/
    /*padding-bottom: 15%;*/
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

/*ul li p.active{*/
/*padding-left: 30%;*/
/*background: url("../../static/images/home-blue.png")no-repeat 10%;*/
/*}*/
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
</style>
