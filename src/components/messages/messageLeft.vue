<template>
    <div class="message">
        <el-row>
            <el-col :span="4">
                <el-button
                    class="el-icon-edit"
                    style="width:100%;"
                    @click="messageadd"
                >
                    {{ $t("message.Messages.New_Message") }}
                </el-button>
                <div class="left-box" style="position: relative">
                    <div class="select-box">
                        <div>
                            <el-tabs
                                v-model="activeName"
                                :tab-position="tabPosition"
                                @tab-click="messageList"
                            >
                                <el-tab-pane
                                    :label="$t('message.Messages.Inbox')"
                                    name="inbox"
                                />
                                <el-tab-pane
                                    :label="$t('message.Messages.Stared')"
                                    name="star"
                                />
                                <el-tab-pane
                                    :label="$t('message.Messages.Sent')"
                                    name="sent"
                                />
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </el-col>
            <div class="message-right-main">
                <el-col :span="19" style="margin-left: 1%">
                    <router-view />
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "MessageLeft",
    data() {
        return {
            activeName: "",
            tabPosition: "right",
            value: "",
            course: "",
            // paths: '',
            courseId: "",
            pageIndex: 1,
            roleType: ""
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    watch: {
        $route: {
            handler(newName) {
                this.activeName = newName.query.activeName;
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.getCourseData();
        this.routerpath();
    },
    methods: {
        routerpath() {
            this.roleType = this.userInfoData.type;
        },
        messageadd() {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: { activeName: this.activeName }
                });
            } else {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageAdmit",
                    query: { activeName: this.activeName }
                });
            }
        },
        messageList(val) {
            // 第一个·tab页
            this.activeName = val.name;
            if (Number(this.roleType) === 4) {
                if (Number(val.index) === 0) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentMessageLeft/studentMessageList",
                        query: { messagetype: 0, activeName: val.name }
                    });
                }
            }
            if (Number(this.roleType) === 2) {
                if (Number(val.index) === 0) {
                    this.$router.push({
                        path: "/homePage/messageLeft/messageList",
                        query: { messagetype: 0, activeName: val.name }
                    });
                }
            }
            // 第二个·tab页
            if (Number(this.roleType) === 4) {
                if (Number(val.index) === 1) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentMessageLeft/studentMessageList",
                        query: { messagetype: 1, activeName: val.name }
                    });
                }
            }
            if (Number(this.roleType) === 2) {
                if (Number(val.index) === 1) {
                    this.$router.push({
                        path: "/homePage/messageLeft/messageList",
                        query: { messagetype: 1, activeName: val.name }
                    });
                }
            }
            // 第三个·tab页
            if (Number(this.roleType) === 4) {
                if (Number(val.index) === 2) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentMessageLeft/studentMessageList",
                        query: { messagetype: 2, activeName: val.name }
                    });
                }
            }
            if (Number(this.roleType) === 2) {
                if (Number(val.index) === 2) {
                    this.$router.push({
                        path: "/homePage/messageLeft/messageList",
                        query: { messagetype: 2, activeName: val.name }
                    });
                }
            }
        },
        async getCourseData() {
            const result = await this.$getData(
                "/course/joined/query",
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.course = result.data.entity.currentEnrollments;
                this.course.unshift({
                    name: this.$t("message.Messages.All_course"),
                    id: 0,
                    type: 1
                });
                console.log(this.course);
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

<style scoped lang="less">
.message {
    .left-box {
        background: #eeeeee;
        height: 50vh;
        padding: 5% 4%;
        margin-top: 5%;
        position: relative;
    }
    /deep/ .el-tabs--right .el-tabs__header.is-right {
        float: right;
        margin-bottom: 0;
        width: 100%;
        margin-top: 5%;
    }
    /deep/.is-active {
        background-color: #cfd7ef;
    }
    /deep/.el-tabs__item {
        height: auto;
        line-height: normal;
        font-size: 15px;
        padding-top: 10%;
        padding-bottom: 7%;
    }
    /deep/.el-tabs__active-bar .is-right {
        height: 12%;
    }
    .message-ammount {
        float: right;
        margin-top: -76%;
        background: #9fafe0;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        line-height: 20px;
        text-align: center;
        span {
            color: rgba(255, 255, 255, 1);
            font-size: 12px;
        }
    }
}
</style>
