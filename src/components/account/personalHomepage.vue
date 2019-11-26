<template>
    <div class="account-home-page">
        <el-scrollbar style="height: 100%;">
            <div>
                <el-button size="mini" type="text" @click="tabExtend">
                    <i class="iconfont icon-navicon" />
                </el-button>
                <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    style="display: inline-block"
                >
                    <el-breadcrumb-item>
                        {{ $t("message.Account") }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item
                        v-if="curAccount == 'ePortfolios'"
                        style="cursor:pointer; font-weight: bold"
                        @click.native="toEportIndex"
                    >
                        {{ curAccount }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-else>
                        {{ curAccount }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="isThird">
                        <span class="name-bread">{{ thirdName }}</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="isFourth">
                        <span class="name-bread">{{ fourthName }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="allCourse-tabs">
                <ul v-show="isShow" class="left-nav">
                    <li v-for="(item, index) in navList" :key="index">
                        <a
                            :class="{ active: activeFlag === item.name }"
                            @click="tabPage(item)"
                        >
                            {{ item.title }}
                        </a>
                    </li>
                </ul>
                <div class="count-right" :style="{ width: rightWidth }">
                    <div>
                        <router-view />
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            curAccount: "",
            activeFlag: "Profile",
            navList: [
                {
                    name: "Profile",
                    title: this.$t("message.profile"),
                    teacherPath: "/homePage/personalHomepage/profile",
                    studentPath: "/studentHomePage/studentPersonal/profile",
                    adminPath: "/adminHomePage/account/profile"
                },
                {
                    name: "Settings",
                    title: this.$t("message.Settings"),
                    teacherPath: "/homePage/personalHomepage/setting",
                    studentPath: "/studentHomePage/studentPersonal/setting",
                    adminPath: "/adminHomePage/account/setting"
                },
                {
                    name: "Files",
                    title: this.$t("message.Files"),
                    teacherPath: "/homePage/personalHomepage/file",
                    studentPath: "/studentHomePage/studentPersonal/file",
                    adminPath: "/adminHomePage/account/file"
                },
                {
                    name: "ePortfolios",
                    title: this.$t("message.ePortfolios"),
                    teacherPath: "/homePage/personalHomepage/ePortfolios",
                    studentPath: "/studentHomePage/studentPersonal/ePortfolios",
                    adminPath: "/adminHomePage/account/ePortfolios"
                }
            ],
            isShow: true,
            thirdName: "",
            isThird: false,
            isFourth: false,
            fourthName: "",
            rightWidth: ""
        };
    },
    watch: {
        $route: {
            handler(val) {
                this.activeFlag = val.name.split("_")[1];
                this.curAccount = val.name.split("_")[1];
                if (val.query.eportName) {
                    this.isThird = true;
                    this.thirdName = val.query.eportName;
                    this.isShow = false;
                } else {
                    this.isThird = false;
                    this.thirdName = "";
                }
                if (val.query.collectName) {
                    this.isFourth = true;
                    this.fourthName = val.query.collectName;
                    this.isShow = false;
                } else {
                    this.isFourth = false;
                    this.fourthName = "";
                }
            },
            // 深度观察监听
            deep: true,
            immediate: true
        },
        isShow: {
            handler(val) {
                if (val) {
                    this.rightWidth = "calc(100% - 154px)";
                } else {
                    this.rightWidth = "100%";
                }
            },
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type;
        }
    },

    created() {},
    methods: {
        toEportIndex() {
            if (this.roleType == 2 || this.roleType == 3) {
                this.$router.push({
                    path: "/homePage/personalHomepage/ePortfolios/ePortIndex"
                });
            } else if (this.roleType == 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentPersonal/ePortfolios/ePortIndex"
                });
            } else if (this.roleType == 1) {
                this.$router.push({
                    path: "/adminHomePage/account/ePortfolios/ePortIndex"
                });
            }
        },
        tabExtend() {
            this.isShow = !this.isShow;
        },
        tabPage(data) {
            this.activeFlag = data.name;
            if (this.roleType == 2 || this.roleType == 3) {
                this.$router.push({ path: data.teacherPath });
            } else if (this.roleType == 4) {
                this.$router.push({ path: data.studentPath });
            } else if (this.roleType == 1) {
                this.$router.push({ path: data.adminPath });
            }
        }
    }
};
/* eslint-disable */
</script>

<style lang="less" scoped>
.account-home-page {
    height: 100%;

    .el-tabs--left .el-tabs__item.is-left {
        padding-left: 0;
        text-align: left;
    }
    .el-tabs__item {
        color: #999;
    }
    .el-tabs__item.is-active {
        color: #333;
        font-weight: bold;
    }
    .el-tabs__active-bar {
        display: none;
    }
}
.allCourse-tabs {
    overflow: hidden;
}
.left-nav {
    margin-top: 10px;
    float: left;
    width: 152px;
    li {
        height: 40px;
        a {
            display: inline-block;
            line-height: 40px;
            color: #999;
            font-size: 14px;
            height: 40px;
            cursor: pointer;
        }
        .active {
            color: #333;
            font-weight: 700;
        }
    }
}
.count-right {
    float: left;
    // width: calc(100% - 154px);
    margin-top: 10px;
}
.name-bread {
    max-width: 200px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
}
</style>
