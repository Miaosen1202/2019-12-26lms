<template>
    <div class="homeContain">
        <div class="homeLeft">
            <assignments v-if="isAssign" />
            <module v-if="isModule" />
            <homeStream v-if="isStream" role-type="teacher" />
            <div v-if="syllabus" class="syllabus_top">
                <div class="Course_Syllabus">
                    {{ $t("message.Course_Syllabus") }}
                </div>
                <div v-show="edit" class="Syllabus">
                    <el-button
                        class="group-set"
                        type="primary"
                        style="height: 40px;margin-bottom: 20px"
                        @click="CommentsShow"
                    >
                        <i class="iconfont icon-edit" />
                        <span style="font-size: 17px">{{
                            $t("message.Edit")
                        }}</span>
                    </el-button>
                </div>
                <div
                    v-show="isShow"
                    v-if="!titleContent.comments"
                    style="height: 100px;padding-top: 30px"
                >
                    <p>{{ $t("message.The_syllabus_page") }}</p>
                    <p style="padding-top: 20px">
                        {{ $t("message.To_add_some_comments") }}
                    </p>
                </div>
                <div v-show="EditShow" style="padding-top: 20px">
                    <div class="messagetext">
                        <ckeditor
                            v-model="titleContent.comments"
                            :editor="editor"
                            :config="editorConfig"
                        />
                    </div>
                    <div style="text-align: right;;margin-bottom: 10px">
                        <el-button @click="cancel">
                            <span>{{ $t("message.Cancel") }}</span>
                        </el-button>
                        <el-button type="primary" @click="SyllabusAdd">
                            <span>{{ $t("message.Update_Syllabus") }}</span>
                        </el-button>
                    </div>
                </div>
                <!--eslint-disable -->
                <div v-show="edit" class="syllabus_style">
                    <p
                        v-if="titleContent.comments"
                        @click="richTextClick($event)"
                        v-html="titleContent.comments"
                    />
                    <!--eslint-disable no-new-->
                </div>
                <div>
                    <div class="Course_Syllabus" style="margin-bottom: 10px">
                        {{ $t("message.Course_Summary") }}
                    </div>
                </div>
                <div class="syllabus_list">
                    <el-table
                        ref="singleTable"
                        v-loading="loading"
                        :data="syllabusList"
                        style="width: 100%"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                            data-placement="auto"
                            :show-overflow-tooltip="true"
                            :label="$t('message.Date')"
                            width="120"
                        >
                            <template slot-scope="scope">
                                {{ scope.row.limitTime | formatDate }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            :label="$t('message.Details')"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="goReply(scope.row)"
                                >
                                    <i
                                        v-if="scope.row.syllabusType === 1"
                                        class="iconfont icon-icon-edit"
                                    >
                                        {{ scope.row.title }}</i
                                    >
                                    <i
                                        v-if="scope.row.syllabusType === 2"
                                        class="iconfont icon-calendar_icon"
                                    >
                                        {{ scope.row.title }}</i
                                    >
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column width="220" label="">
                            <template slot-scope="scope">
                                <span
                                    v-if="
                                        scope.row.syllabusType !== 2 &&
                                            scope.row.limitTime
                                    "
                                >
                                    {{ $t("message.due_by") }}</span
                                >
                                <span
                                    v-show="
                                        scope.row.syllabusType !== 1 &&
                                            scope.row.startTime
                                    "
                                >
                                    {{ scope.row.startTime | formatterDatemm }}
                                    -
                                </span>
                                {{ scope.row.limitTime | formatterDatemm }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="homeRight">
            <div class="rightContain">
                <el-button-group
                    v-show="showPublish"
                    style="width:100%;box-sizing:border-box"
                >
                    <el-button
                        :type="unActive"
                        :disabled="isUnDisable"
                        style="width:50%; box-sizing:border-box"
                        @click="changeState(0)"
                    >
                        {{ $t("message.Unpublished") }}
                    </el-button>
                    <el-button
                        :type="publisActive"
                        :disabled="isPuDisable"
                        style="width:50%; box-sizing:border-box"
                        @click="changeState(1)"
                    >
                        {{ $t("message.Published") }}
                    </el-button>
                </el-button-group>
                <el-button
                    plain
                    size="medium"
                    class="btnItem"
                    @click="goAnnouce"
                >
                    {{ $t("message.New_Announcement") }}
                </el-button>
                <!-- <el-button plain size='medium' class='btnItem'>Course Analytics</el-button> -->
                <el-button
                    plain
                    size="medium"
                    class="btnItem"
                    @click="dialogVisible = true"
                    >{{ $t("message.Choose_Home_Page") }}
                </el-button>
                <!-- <el-button plain size='medium' class='btnItem'>Import from Commons</el-button> -->
                <div class="list-item">
                    <controlRight :course-id="courseId" />
                </div>
                <div v-if="syllabus">
                    <div class="back" @click="demo">
                        <i
                            style="border-bottom: 2px solid #0E38B1;
                 cursor: pointer"
                        >
                            {{ $t("message.Back_to_tody") }}
                        </i>
                    </div>
                    <div style="margin-top: 10px;">
                        <calendar
                            ref="calendar"
                            :mark-date-more="arr"
                            :mark-date="arr2"
                            ago-day-hide="1530115221"
                            @isToday="clickToday"
                            @choseDay="clickDay"
                            @changeMonth="changeDate"
                            :sundayStart="true"
                            :textTop="[
                                this.$t('message.Su'),
                                this.$t('message.Mo'),
                                this.$t('message.Tu'),
                                this.$t('message.We'),
                                this.$t('message.Th'),
                                this.$t('message.Fr'),
                                this.$t('message.Sa')
                            ]"
                        />
                    </div>
                    <div class="assignGroup">
                        <p
                            v-show="AssigmentGroup.isWeightGrade === 1"
                            class="titleAssignment"
                        >
                            {{
                                $t("message.Assignments_are_weighted_by_group")
                            }}:
                        </p>
                        <p
                            v-if="AssigmentGroup.isWeightGrade === 0"
                            class="titleAssignment"
                        >
                            {{ $t("message.Course_assignments") }}
                        </p>
                        <template>
                            <el-table
                                v-if="AssigmentGroup.isWeightGrade === 1"
                                v-loading="loading"
                                :data="AssigmentGroup.weights"
                                style="width: 100%;margin-top: 10px"
                            >
                                <el-table-column
                                    prop="name"
                                    :label="$t('message.Group')"
                                />
                                <el-table-column
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    :label="$t('message.Weight')"
                                    width="100"
                                >
                                    <template slot-scope="scope">
                                        <i v-if="scope.row.weight"
                                            >{{ scope.row.weight }}%</i
                                        >
                                        <i v-else-if="!scope.row.weight">0%</i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            :title="$t('message.Choose_Course_Home_Page')"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <div class="select-box">
                <p>{{ $t("message.Select_what") }}</p>
                <el-radio-group v-model="currentPro">
                    <p>
                        <el-radio label="ACTIVE_STREAM">
                            {{ $t("message.ACTIVE_STREAM") }}
                        </el-radio>
                    </p>
                    <p>
                        <el-radio label="MODULE">
                            {{ $t("message.MODULE") }}
                        </el-radio>
                    </p>
                    <p>
                        <el-radio label="ASSIGNMENTS">
                            {{ $t("message.ASSIGNMENTS") }}
                        </el-radio>
                    </p>
                    <p>
                        <el-radio label="SYLLABUS">
                            {{ $t("message.SYLLABUS") }}
                        </el-radio>
                    </p>
                </el-radio-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{
                    $t("message.Cancel")
                }}</el-button>
                <el-button type="primary" @click="setCurPro">{{
                    $t("message.Save")
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Calendar from "../../../../static/vue-calendar-component";
import { formatDate } from "@/utils/date";
import utilMethods from "@/utils/utilMethods";
import controlRight from "@/components/dashboard/controlRight.vue";
import module from "@/components/course/modules.vue";
// import syllabus from '@/components/course/syllabus.vue';
import assignments from "@/components/course/assignments2.vue";
import homeStream from "@/components/course/home/homeStream.vue";

export default {
    components: {
        Calendar,
        controlRight,
        module,
        assignments,
        homeStream
        // syllabus,
    },
    filters: {
        // formatDate(time) {
        //     const date = new Date(time);
        //     return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        // },
        formatDate(time) {
            if (typeof time === "undefined") {
                return "";
            }
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd");
        },
        formatterDate(val) {
            if (!val) {
                return "";
            }
            return utilMethods.formatDate(val);
        },
        formatterDatemm(time) {
            if (typeof time === "undefined") {
                return "";
            }
            const date = new Date(time);
            return formatDate(date, "hh:mm:ss");
        }
    },

    data() {
        return {
            syllabus: false,
            isAssign: false,
            isModule: false,
            isStream: true,
            currentPro: "ACTIVE_STREAM",
            dialogVisible: false,
            isUnDisable: false,
            isPuDisable: false,
            unActive: "primary",
            publisActive: "",
            showPublish: true,
            isPublic: true,
            activeName: "first",
            // courseId: '',
            dialogPageIndex: 1,
            messagePageIndex: 1,
            dialogList: [],
            messageList: [],
            pageSize: 5,
            courseData: [],
            loading: true,
            edit: true,
            courseId: this.$route.query.courseId,
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            titleContent: {},
            AssigmentGroup: {},
            comments: "",
            SyllabusId: "",
            isShow: true,
            EditShow: false,
            syllabusList: [],
            dates: [],
            y: "",
            m: "",
            arr2: [],
            arr: [
                {
                    date: "",
                    className: ""
                }
            ]
        };
    },
    mounted() {
        this.Assigmentquery();
        this.syllabusEntry();
        this.calendarquery();
        this.syllabusdetailed();
        const myDate = new Date();
        this.clickDay(myDate.toLocaleDateString());
    },
    created() {
        this.courseId = this.$route.query.courseId;
        this.getCourseData();
    },

    methods: {
        /* 大纲 */
        tableRowClassName({ row }) {
            if (row.isBule === 1) {
                return "warning-row";
            }
            if (row.isBule === 0) {
                return "success-row";
            }
            return "";
        },
        CommentsShow() {
            this.edit = false;
            this.isShow = false;
            this.EditShow = true;
        },
        cancel() {
            this.isShow = true;
            this.EditShow = false;
            this.edit = true;
        },
        SyllabusAdd() {
            const quizzes = {
                id: this.titleContent.id,
                courseId: this.courseId,
                comments: this.titleContent.comments
            };
            this.$http
                .post(`${process.env.NODE_ENV}/syllabus/add`, quizzes)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.SyllabusId = res.data.message;
                        this.syllabusdetailed();
                        this.syllabusEntry();
                        this.edit = true;
                        this.EditShow = false;
                        this.isShow = false;
                        this.loading = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        syllabusEntry() {
            const myDate = new Date();
            const param = {
                courseId: this.courseId,
                date: myDate.toLocaleDateString()
            };
            this.$http
                .get(`${process.env.NODE_ENV}/syllabus/list/query`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.syllabusList = res.data.entity;
                        this.loading = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        syllabusdetailed() {
            const param = {
                data: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/syllabus/get`, { params: param })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        if (res.data.entity) {
                            this.titleContent = res.data.entity;
                            this.loading = false;
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goReply(item) {
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    this.$http
                        .get(
                            `${process.env.NODE_ENV}/assignmentGroupItem/get?data=${targetId}`
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.$router.push({
                                    path: "assignmentPreView",
                                    query: {
                                        courseId,
                                        assignmentId: targetId,
                                        assignmentGroupId:
                                            res.data.entity.assignmentGroupId,
                                        assignmentGroupItemId: res.data.id,
                                        name: item.title
                                    }
                                });
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });

                    break;
                case 2:
                    this.$router.push({
                        path: "/homePage/allCourse/discussionDeatilCourse",
                        query: {
                            discussionId: targetId,
                            courseId,
                            name: item.title
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/homePage/allCourse/courseQuizz",
                        query: {
                            data: targetId,
                            name: item.title,
                            courseId: this.courseId
                        }
                    });
                    break;
                case 15:
                    this.$router.push({
                        path: "/homePage/calanederDetail",
                        query: {
                            eventId: item.eventId,
                            name: item.title,
                            courseId: this.courseId
                        }
                    });
                    break;
                default:
            }
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
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        },
        /* 日历 */
        clickDay(data) {
            // console.log('选中了', data); // 选中某天
            // const myDate = new Date();
            const param = {
                courseId: this.courseId,
                date: data
            };
            this.$http
                .get(`${process.env.NODE_ENV}/syllabus/list/query`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.calendarquery();
                        this.syllabusList = res.data.entity;
                        this.loading = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        clickToday(data) {
            const myDate = new Date(data);
            this.m = myDate.getMonth() + 1;
            this.y = data.slice(0, 4);
            // this.m = data.slice(5, 6);
            // console.log('aaaaaa', this.m); // 跳到了本月
        },
        async changeDate(data) {
            const myDate = new Date(data);
            this.y = data.slice(0, 4);
            // this.m = data.slice(5, 6);
            this.m = myDate.getMonth() + 1;
            // console.log('左右点击切换月份', this.m); // 左右点击切换月份
            this.calendarquery();
        },
        demo() {
            const myDate = new Date();
            // myDate.toLocaleDateString();
            // this.clickToday(myDate.toLocaleDateString())
            this.$refs.calendar.ChoseMonth(myDate.toLocaleDateString()); // 跳到12月12日选中12月12日
        },
        calendarquery() {
            const param = {
                courseId: this.courseId,
                year: this.y,
                month: this.m
            };
            this.$http
                .get(`${process.env.NODE_ENV}/syllabus/calendar/query`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        // this.dates = res.data.entity;
                        res.data.entity.forEach(item => {
                            // const date = item.replace(/-/g, '/');
                            const date = `${this.y}/${this.m}/${item}`;
                            // this.arr2=[2019/713,2019/7/14,2019/7/18];
                            this.arr.push({
                                date,
                                className: "mark1"
                            });
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        Assigmentquery() {
            const param = {
                courseId: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/weight/query`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.AssigmentGroup = res.data.entity;
                        this.loading = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /* home */

        handleClick() {},
        async setCurPro() {
            const pramas = {
                courseId: this.courseId,
                homepage: this.currentPro
            };
            const res = await this.$getData(
                "/course/homepage/edit",
                pramas,
                "post"
            );
            if (Number(res.data.code) === 200) {
                if (String(this.currentPro) === "ACTIVE_STREAM") {
                    this.isStream = true;
                    this.isAssign = false;
                    this.isModule = false;
                    this.syllabus = false;
                } else if (String(this.currentPro) === "MODULE") {
                    this.isStream = false;
                    this.isAssign = false;
                    this.isModule = true;
                    this.syllabus = false;
                } else if (String(this.currentPro) === "ASSIGNMENTS") {
                    this.isStream = false;
                    this.isAssign = true;
                    this.isModule = false;
                    this.syllabus = false;
                } else if (String(this.currentPro) === "SYLLABUS") {
                    this.isStream = false;
                    this.isAssign = false;
                    this.isModule = false;
                    this.syllabus = true;
                }
            }
            this.dialogVisible = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        async changeState(state) {
            const params = { id: this.courseId, status: Number(state) };
            const res = await this.$getData(
                "/course/statusToggle/edit",
                params,
                "post"
            );
            if (Number(res.data.code) === 200) {
                this.getCourseData();
            }
        },
        // 查询课程数据
        async getCourseData() {
            const params = { courseId: this.courseId };
            const res = await this.$getData(
                "/course/homepage/query",
                params,
                "get"
            );
            if (Number(res.data.code) === 200) {
                this.courseData = res.data.entity;
                this.currentPro = this.courseData.homepage;
                if (String(this.currentPro) === "ACTIVE_STREAM") {
                    this.isStream = true;
                    this.isAssign = false;
                    this.isModule = false;
                    this.syllabus = false;
                } else if (String(this.currentPro) === "MODULE") {
                    this.isStream = false;
                    this.isAssign = false;
                    this.isModule = true;
                    this.syllabus = false;
                } else if (String(this.currentPro) === "ASSIGNMENTS") {
                    this.isStream = false;
                    this.isAssign = true;
                    this.isModule = false;
                    this.syllabus = false;
                } else if (String(this.currentPro) === "SYLLABUS") {
                    this.isStream = false;
                    this.isAssign = false;
                    this.isModule = false;
                    this.syllabus = true;
                } else {
                    this.isStream = true;
                    this.isAssign = false;
                    this.isModule = false;
                }
                if (Number(this.courseData.isConcluded) === 1) {
                    this.showPublish = false;
                } else if (Number(this.courseData.isConcluded) === 0) {
                    if (Number(this.courseData.status) === 0) {
                        this.publisActive = "";
                        this.unActive = "primary";
                        this.isUnDisable = false;
                        this.isPuDisable = false;
                    } else if (Number(this.courseData.status) === 1) {
                        this.publisActive = "primary";
                        this.unActive = "";
                        if (this.courseData.gradeTaskSubmittedCount > 0) {
                            this.isUnDisable = true;
                            this.isPuDisable = true;
                        } else {
                            this.isUnDisable = false;
                            this.isPuDisable = false;
                        }
                    }
                }
            }
        },
        // 新建公告
        goAnnouce() {
            localStorage.setItem("activeFlag", "announcements");
            this.$router.push({
                path: "announcementAdmit",
                query: { courseId: this.courseId }
            });
        }
    }
};
/*eslint-disable no-new*/
</script>
<style lang="less" scoped>
@import "./home.less";
</style>
<style scoped>
.syllabus_style {
    padding: 0px 0;
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
    margin-bottom: 20px;
}

.syllabus_top {
    width: 100%;
    display: inline-block;
}

.back {
    font-size: 18px;
    font-family: ArialMT;
    color: rgba(14, 56, 177, 1);
    line-height: 21px;
}

.Course_Syllabus {
    display: inline-block;
    font-size: 20px;
    font-family: ArialMT;
    color: rgba(51, 51, 51, 1);
    line-height: 23px;
}

.Syllabus {
    float: right;
    /*margin-bottom: 2%;*/
}

.messagetext {
    border-radius: 6px;
    margin-top: 2%;
    margin-bottom: 2%;
}

.titleAssignment {
    font-size: 14px;
    font-family: Arial-BoldMT;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    margin-top: 30px;
}

/*.success{*/
/*background:rgba(14,56,177,0.2);*/
/*}*/

/*.fail{*/
/*background-color:transparent;*/
/*}*/
.wh_container >>> .mark1 {
    background-color: #eee;
    border-radius: 26px;
    color: #333;
}

.wh_content_item > .wh_isMark {
    background: #f17e26;
}

.wh_container >>> .wh_content_all {
    background-color: red;
}
</style>
<style>
.wh_container >>> .mark1 {
    background-color: #eee;
    border-radius: 26px;
    color: #333;
}

/*.wh_content_item .wh_isToday{
                                    background: #0e38b1!important;
                                }
                                .wh_container {
                                    background-color: #fff!important;
                                }
                                .wh_content_all {
                                    background-color: #fff!important;
                                }
                                .wh_container >>> .mark1 {
                                    background-color: orange;
                                }

                                .wh_container >>> .mark2 {
                                    background-color: blue;
                                }

                                .wh_content_item > .wh_isMark {
                                    background: #0e38b1;
                                }

                                .wh_container >>> .wh_content_all {
                                    !* background-color: red; *!
                                }
                                .wh_content_item {

                                }*/
.el-table .success-row {
    background: transparent;
}

.el-table .warning-row {
    background: rgba(14, 56, 177, 0.2);
}

.wh_item_date {
    width: 26px !important;
    height: 26px !important;
    line-height: 26px !important;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wh_content_all {
    background-color: #fff !important;
    overflow: hidden;
    color: #333;
    border: 1px solid rgba(238, 238, 238, 1);
}

.wh_top_changge li {
    color: #0e38b1 !important;
}

.wh_content_item {
    color: #333 !important;
}

.wh_jiantou1 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #999999 !important;
    border-left: 2px solid #999999 !important;
    transform: rotate(-45deg);
}

.wh_jiantou2 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #999999 !important;
    border-right: 2px solid #999999 !important;
    transform: rotate(45deg);
}

.wh_content_item .wh_isToday {
    background: #f17e26 !important;
    border-radius: 100px;
    color: #fff !important;
}

.wh_content_item .wh_chose_day {
    background-color: #0e38b1 !important;
    border-radius: 100px;
    color: #fff !important;
}

.wh_item_date,
.wh_top_tag {
    width: 26px !important;
    height: 26px !important;
    line-height: 26px !important;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.assignGroup .el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #eee !important;
    color: #333333ab;
    font-weight: 600 !important;
}

.syllabus_list .el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #fafafa !important;
    color: #333333ab;
    font-weight: 600 !important;
}
</style>
