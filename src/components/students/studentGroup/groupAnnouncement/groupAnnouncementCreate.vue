<template>
    <!--eslint-disable-->
    <div v-show="annnouncementStepOne" class="annnouncementStepOne">
        <el-row>
            <el-col :span="12">
                <div style="">
                    <el-form
                        ref="form"
                        :model="form"
                        style="display: inline-block"
                    >
                        <el-form-item
                            label=""
                            style="width: 35%;display: inline-block"
                        >
                            <el-input
                                v-model="form.name"
                                :placeholder="$t('message.Search')"
                                prefix-icon="el-icon-search"
                                disabled="disabled"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            label=""
                            style="display: inline-block;width: 35%;margin-left: 18px"
                        >
                            <el-select
                                v-model="form.region"
                                :placeholder="$t('message.All')"
                                disabled
                            >
                                <el-option label="全部" value="2">2</el-option>
                                <el-option label="未读" value="0">0</el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="float: right;margin-right: 16%">
                    <!--<el-button icon="el-icon-delete" @click="centerDialogVisible = true"></el-button>-->
                    <!--<el-button @click="addAnnoucement" icon="el-icon-circle-plus-outline" type="primary"-->
                    <!--style="display: inline-block;width: 100%">Announcement-->
                    <!--</el-button>-->
                    <el-button
                        @click="addAnnoucement"
                        type="primary"
                        style="display: inline-block;vertical-align: -3px;padding: 8px 13px;"
                    >
                        <i
                            class="iconfont icon-add"
                            style="font-size: 22px;margin-top: 5px"
                        ></i>
                        <span
                            style="float: right;font-size: 17px;margin-top: 3px"
                            >{{ $t("message.ANNOUNCE.ANNOUNCEMENT") }}</span
                        >
                    </el-button>
                    <!--<el-button icon="el-icon-setting" @click="centerDialogVisible = true"></el-button>-->
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22" style="margin-top: -20px">
                <div class="disMain">
                    <div class="disMainImg">
                        <img
                            src="../../../../../static/images/stu_announce.png"
                            alt=""
                            @click="gotolist"
                        />
                        <p>
                            {{
                                $t(
                                    "message.ANNOUNCE.There_are_no_announcements_to_show_in_this_section"
                                )
                            }}
                        </p>
                        <a @click="addAnnoucement">{{
                            $t(
                                "message.ANNOUNCE.Click_here_to_add_an_announcement"
                            )
                        }}</a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
export default {
    name: "groupAnnouncementCreate",
    computed: {
        // uploadDisabled:function() {
        //   return this.fileList.length >= 1;
        //   this.$message.error('只支持单文件上传')
        // },
        ...mapGetters(["userInfoData"])
    },
    data() {
        return {
            courseId: this.$route.query.courseId,
            groupId: this.$route.query.groupId,
            annnouncementStepOne: true,
            activeName: "first",
            form: {
                name: "",
                region: ""
            },
            ruleform: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            type: ""
        };
    },
    mounted() {
        this.announceList();
        this.routerpath();
    },
    methods: {
        addAnnoucement() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
            this.$router.push({
                path: "/homePage/allCourse/announcementAdmit",
                query: { courseId: this.courseId }
            });
        },
        routerpath() {
            this.type = this.userInfoData.type;
        },
        async announceList() {
            var paramsJson = {
                courseId: this.courseId,
                isRead: 2,
                studyGroupId: this.groupId
            };
            let result = await this.$getData(
                "/announce/list",
                paramsJson,
                "get"
            );
            if (result.data.code == 200) {
                var list = result.data.entity;
                if (list.length > 0) {
                    var queryJson = {
                        courseId: this.courseId,
                        groupId: this.groupId
                    };
                    if (this.type == 4) {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentMain/groupAnnouncementCreateList",
                            query: queryJson
                        });
                    } else {
                        this.$router.push({
                            path:
                                "/homePage/teacherMain/groupAnnouncementCreateList",
                            query: queryJson
                        });
                    }
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        handleClick() {},
        addAnnoucement() {
            var queryJson = {
                courseId: this.courseId,
                groupId: this.groupId
            };
            if (this.type == 4) {
                this.$router.push({
                    path: "/studentHomePage/studentMain/groupAnnouncementAdmit",
                    query: queryJson
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupAnnouncementAdmit",
                    query: queryJson
                });
            }
        },
        gotolist() {}
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
.annnouncementStepOne {
    .disMain {
        margin-top: 25px;
        /*height: 650px;*/
        border: 1px solid #e7ebf7;
        padding-top: 16%;
        padding-bottom: 30%;

        .disMainImg {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .disMainImg img {
            width: 190px;
            height: 200px;
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .disMainImg p {
            /*font-size: 18px;*/
            /*color: gray;*/
            /*position: absolute;*/
            /*top: 57%;*/
            /*left: 50%;*/
            /*transform: translate(-50%, -50%);*/
            font-size: 18px;
            color: gray;
            position: absolute;
            margin-top: 15%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .disMainImg a {
            /*text-decoration: underline;*/
            /*color: #0e38b1;*/
            /*font-size: 18px;*/
            /*cursor: pointer;*/
            /*position: absolute;*/
            /*top: 62%;*/
            /*left: 50%;*/
            /*transform: translate(-50%, -50%);*/
            text-decoration: underline;
            color: #0e38b1;
            font-size: 18px;
            cursor: pointer;
            position: absolute;
            margin-top: 19%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
