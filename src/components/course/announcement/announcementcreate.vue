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
                                disabled="disabled"
                            >
                                <el-option label="全部" value="2">2</el-option>
                                <el-option label="未读" value="0">0</el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="float: right;margin-right: 17%">
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
                            src="../../../../static/images/stu_announce.png"
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
export default {
    name: "announcementcreate",
    data() {
        return {
            courseId: this.$route.query.courseId,
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
            }
        };
    },
    mounted() {
        this.announceList();
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
        async announceList() {
            console.log("2222222222");
            var paramsJson = {
                courseId: this.courseId,
                isRead: 2,
                studyGroupId: null
            };
            let result = await this.$getData(
                "/announce/list",
                paramsJson,
                "get"
            );
            if (result.data.code == 200) {
                var list = result.data.entity;
                if (list.length > 0) {
                    this.$router.push({
                        path: "/homePage/allCourse/announcementlist",
                        query: { courseId: this.courseId }
                    });
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        handleClick() {},
        // this.$route.query.courseId
        addAnnoucement() {
            this.$router.push({
                path: "/homePage/allCourse/announcementAdmit",
                query: { courseId: this.$route.query.courseId }
            });
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
            font-size: 18px;
            color: gray;
            position: absolute;
            margin-top: 15%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .disMainImg a {
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
