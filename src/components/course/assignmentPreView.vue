<template>
    <div style="margin-top: 2%" class="assignmentPreView_box">
        <span
            v-show="Number(form.isIncludeGrade) === 0"
            class="isIncludeGradeWarning"
            >{{ $t("message.IsIncludeGradeWarn") }}</span
        >
        <el-row :gutter="20" class="header_hide">
            <el-col :span="16">
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="form.title"
                    placement="top"
                >
                    <el-button class="border_none">
                        {{ form.title }}
                    </el-button>
                </el-tooltip>
            </el-col>
            <el-col :span="8">
                <div>
                    <el-button
                        v-if="Number(form.status) === 0"
                        type="info"
                        @click="moduleItemPushHandler()"
                    >
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="$t('message.ASSIGNMENT.Publish')"
                            placement="top"
                        >
                            <span class="modules-success">
                                <i class="iconfont icon-Group-" />
                                {{ $t("message.ASSIGNMENT.UnPublished") }}
                            </span>
                        </el-tooltip>
                    </el-button>
                    <el-button
                        v-else
                        type="success"
                        @click="moduleItemPushHandler()"
                    >
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="$t('message.ASSIGNMENT.UnPublish')"
                            placement="top"
                        >
                            <span class="modules-success">
                                <i class="el-icon-success" />
                                {{ $t("message.ASSIGNMENT.Published") }}
                            </span>
                        </el-tooltip>
                    </el-button>
                    <el-button @click="goTo">
                        <i class="iconfont icon-edit" />
                        {{ $t("message.Edit") }}
                    </el-button>

                    <el-dropdown trigger="click" class="className_more">
                        <span
                            class="el-dropdown-link"
                            style="width: 10px;display: inline-block;cursor: pointer"
                        >
                            <img
                                src="../../../static/images/spread-big.png"
                                alt=""
                                style="vertical-align: baseline"
                            />
                        </span>
                        <el-dropdown-menu class="className_maskkuang">
                            <el-dropdown-item @click.native="goCourseResource">
                                <i class="iconfont icon-fenxiang1" />
                                {{ $t("message.share_resource") }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <hr />
        <el-row :gutter="20">
            <el-col :span="24">
                <!--eslint-disable-->
                <p
                    style="word-wrap: break-word;
                    word-break: break-all;
                    overflow: auto;"
                    @click="richTextClick($event)"
                    v-html="form.description"
                />
                <!--eslint-disable no-new-->
                <br />
                <span>
                    <b>Display grade as: </b>
                    <span>{{ form.gradeType }}</span>
                    <b> {{ $t("message.ASSIGNMENT.score") }}:</b>
                    {{ form.score / 100 }}
                </span>
                <!--<span>--><!--不知为何重复-->
                <!--<span>{{ form.gradeType }}</span>-->
                <!--<b> {{ $t("message.ASSIGNMENT.score") }}:</b>-->
                <!--{{ form.score / 100 }}-->
                <!--</span>-->
                <br />
                <span v-if="Number(form.submissionType) === 1">
                    <span>
                        <b>{{ $t("message.ASSIGNMENT.submitting") }} : </b>
                    </span>
                    <span v-if="form.allowText">
                        {{ $t("message.ASSIGNMENT.text") }}
                    </span>
                    <span
                        v-if="
                            form.allowText &&
                                (form.allowFile ||
                                    form.allowUrl ||
                                    form.allowMedia)
                        "
                        >,</span
                    >
                    <span v-if="form.allowFile">{{
                        $t("message.ASSIGNMENT.file")
                    }}</span>
                    <span
                        v-if="
                            form.allowFile && (form.allowUrl || form.allowMedia)
                        "
                        >,</span
                    >
                    <span v-if="form.allowUrl">{{
                        $t("message.ASSIGNMENT.url")
                    }}</span>
                    <span v-if="form.allowUrl && form.allowMedia">,</span>
                    <span v-if="form.allowMedia">{{
                        $t("message.ASSIGNMENT.media")
                    }}</span>
                </span>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column :label="$t('message.Due')" width="180">
                        <template slot-scope="scope">
                            {{ scope.row.limitTime | formatterDate }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.For')" width="180">
                        <template slot-scope="scope">
                            {{ idToName(scope.row, sections, users) }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.Available_from')">
                        <template slot-scope="scope">
                            {{ scope.row.startTime | formatterDate }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.Until')">
                        <template slot-scope="scope">
                            {{ scope.row.endTime | formatterDate }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div v-if="data">
            <nextPrevious />
        </div>
        <div class="quizzesPublish-right">
            <div>
                <p>{{ $t("message.Related_items") }}</p>
                <!--<div class="importIntoCourse">
          <el-button plain class="quizzes-right">
            <img src="../../../../static/images/shezhi.png" alt="">
            {{$t('message.Moderate_This_Quiz')}}
          </el-button>
        </div>
        <div class="importIntoCourse">
          <el-button class="quizzes-right" style="color: #00eb00;border: 1px solid #00eb00;">
            <img src="../../../../static/images/UPLOAD.png" alt="">
            {{$t('message.Download_All_Files')}}
          </el-button>
        </div>-->
                <div class="importIntoCourse">
                    <el-button plain class="quizzes-right">
                        <!--<img src="../../../../static/images/jifen.png" alt="">-->
                        <a href="javascript:;" @click="gotoGrade">{{
                            $t("message.GradeNow")
                        }}</a
                        ><!--立即评分-->
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utilMethods from "@/utils/utilMethods";
import nextPrevious from "../../utils/nextPrevious.vue";

export default {
    filters: {
        formatterDate(val) {
            if (!val) {
                return "-";
            }
            return utilMethods.formatDate(val);
        }
    },
    components: {
        nextPrevious
    },
    data() {
        return {
            tableData: [],
            isone: null,
            form: {
                courseId: "",
                title: "",
                description: "",
                score: "",
                assignmentGroupId: "",
                gradeType: 5,
                gradeSchemeId: "",
                isIncludeGrade: "",
                submissionType: 4,
                studyGroupSetId: "",
                toolUrl: "",
                isEmbedTool: "",
                allowText: "",
                allowUrl: "",
                allowMedia: "",
                allowFile: "",
                fileLimit: "",
                status: ""
            },
            sections: [], // 所有班级
            users: [], // 所有用户
            courseId: this.$route.query.courseId,
            assignmentId: this.$route.query.assignmentId,
            assignmentGroupId: this.$route.query.assignmentGroupId,
            assignmentGroupItemId: this.$route.query.assignmentGroupItemId,
            data: this.$route.query.modulesData // 单元跳转使用
        };
    },
    mounted() {
        this.getAssignment();
    },
    methods: {
        isSubmitGrade() {},
        gotoGrade() {
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: {
                    courseId: this.courseId
                }
            });
        },
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            return false;
        },
        goCourseResource() {
            this.$router.push({
                path: "/homePage/courseResource",
                query: {
                    originType: 1,
                    id: this.form.id,
                    resourceTitle: this.form.title
                }
            });
        },
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2:
                    for (let i = 0; i < sections.length; i += 1) {
                        const v = sections[i];
                        if (Number(v.id) === Number(assign.assignId)) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < users.length; i += 1) {
                        const v = users[i];
                        if (Number(v.id) === Number(assign.assignId)) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                default:
                    if (this.isone < 2) {
                        data = this.$t("message.Everyone");
                    } else {
                        data = this.$t("message.Everyelse");
                    }
            }

            return data;
        },
        goTo() {
            this.$router.push({
                path: "assignmentDetail",
                query: {
                    courseId: this.courseId,
                    assignmentId: this.assignmentId,
                    assignmentGroupId: this.assignmentGroupId,
                    assignmentGroupItemId: this.assignmentGroupItemId
                }
            });
        },
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignment() {
            const result = await this.$getData("/assignment/get", {
                data: this.assignmentId
            });
            if (Number(result.data.code) === 200) {
                this.form = result.data.entity;
                this.isone = result.data.entity.assigns.length;
                this.getAssignDataList();
                this.getAssignList();
                if (Number(result.data.entity.showScoreType) === 2) {
                    this.form.gradeType = this.$t("message.ASSIGNMENT.points");
                } else if (Number(result.data.entity.showScoreType) === 1) {
                    this.form.gradeType = this.$t(
                        "message.ASSIGNMENT.percentage"
                    );
                } else if (Number(result.data.entity.showScoreType) === 3) {
                    this.form.gradeType = this.$t(
                        "message.ASSIGNMENT.Complete_Incomplete"
                    );
                } else if (Number(result.data.entity.showScoreType) === 4) {
                    this.form.gradeType = this.$t(
                        "message.ASSIGNMENT.Letter_Grade"
                    );
                } else if (Number(result.data.entity.showScoreType) === 5) {
                    this.form.gradeType = this.$t(
                        "message.ASSIGNMENT.Not_Graded"
                    );
                } else {
                    // this.$message.error(result.data.message);
                }
            }
        },
        async getAssignList() {
            let data = `courseId=${this.courseId}`;
            data += `&originId=${this.assignmentId}`;
            data += `&originType=${1}`;
            const result = await this.$getData(
                `/moduleItemAssign/list?${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.tableData = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async moduleItemPushHandler() {
            const data = {};
            data.originId = this.assignmentId;
            data.originType = 1;
            data.status = Number(this.form.status) === 0 ? 1 : 0;
            const result = await this.$getData(
                "/publish/status/edit",
                data,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.form.status = Number(this.form.status) === 0 ? 1 : 0;
            } else {
                this.$message.error(result.data.message);
            }
        },
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        }
    }
};
</script>

<style scoped>
.multiple-assign {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 86%;
    word-break: break-all;
    word-wrap: break-word;
}

.addto {
    padding: 2%;
    margin-bottom: 2%;
}

.homework_detail {
    width: 80%;

    line-height: 50px;
}

.homework_form {
    width: 80%;
    margin-left: 103px;
}

.homework_form p {
    display: flex;
}

.homework_form p .label {
    width: 137px;
}

.homework_border {
    display: flex;
    margin-bottom: 15px;
}

.homework_border .label {
    width: 137px;
}

.homework_border_ff {
    width: 80%;
    border: 1px solid #ccc;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
}

.dess {
    text-align: center;
}

.checkblue {
    color: #0e38b1;
}

.homework_select {
    width: 100%;
}

.pro {
    margin-left: 10px;
}

.homework_text {
    line-height: 25px;
}

.homework_find {
    position: relative;
}

.find_right {
    position: absolute;
    right: 0;
    top: 5px;
}

.button_b1 {
    margin: 10px 0;
}

.homework_border_father {
    display: flex;
    justify-content: space-between;
}

.homework_border_left {
    width: 49%;
}

.homework_border_right {
    width: 49%;
}

.homework_border_p1 {
    position: relative;
}

.homework_border_p1 span {
    position: absolute;
    right: 0;
    top: 6px;
    border: 1px solid #ccc;
    height: 28px;
    padding: 0 5px;
}

.el_checkbox {
}

.text_right {
    text-align: right;
}

.button_father {
    display: flex;
    justify-content: space-between;
    padding-left: 182px;
}

.button_father:nth-child(1) {
}

.button_father:nth-child(2) {
}

.homework_border_data {
    width: 100%;
}

.homework_name {
    width: 80%;
    margin-left: 103px;
}

.mini {
    width: 50px;
}

.newsgroup {
}

.newsgroup p {
}

.newsgroup p label {
    display: inline-block;
    width: 90px;
    margin-right: 10px;
    text-align: right;
}

.groupname {
    width: 300px;
}

.margin_right {
    margin-right: 10px;
}

.typemarginleft {
    margin-left: 30px;
}

.Tips {
    color: #969896;
    margin-left: 7px;
}

.isIncludeGradeWarning {
    width: 100%;
    display: inline-block;
    color: #62aad5;
    padding: 10px;
    margin-bottom: 40px;
    text-align: center;
    border: 1px solid #55c21f;
    background: #eaffea;
    color: #55c21f;
    font-weight: bold;
}

.noRed {
    color: #666666;
}

.breakwrap {
    width: 100%;
    word-wrap: break-word;
    overflow: scroll;
}

.item {
    width: 650px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.border_none {
    border: none;
    background: #ffffff;
    color: #333333;
    text-align: left;
    font-size: 20px;
}

.border_none:hover {
    background: none;
    color: #333333;
    background: #ffffff;
    cursor: auto;
}

.el-icon-success {
    margin-left: 10px;
}

.header_hide {
    margin-bottom: 15px;
}

.assignmentPreView_box {
    position: relative;
    padding-right: 160px;
}

.quizzesPublish-right {
    position: absolute;
    right: 0px;
    top: 0px;
}

.quizzesPublish-right .quizzes-right {
    color: #0138b1;
}

.quizzes-right {
    border: 1px solid #0138b1;
}

.className_more {
    position: relative;
    top: 12px;
    margin-left: 5px;
}

.className_maskkuang {
    width: 250px;
    overflow: hidden;
}

.iconfont {
    font-size: 14px !important;
}
</style>
