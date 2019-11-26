<template>
    <div>
        <div class="homeContain">
            <div class="homeLeft">
                <homeStream v-if="isStream" role-type="student" />
                <assignments v-if="isAssign" class="assignment_item" />
                <modules v-if="isModule" />
                <!--<studentsyllabus v-if="isyllabus"/>-->
                <div v-if="isyllabus" class="syllabus_top">
                    <div class="Course_Syllabus">
                        {{ $t("message.Course_Syllabus") }}
                    </div>
                    <div class="syllabus_style">
                        <!--eslint-disable-->
                        <p
                            v-if="titleContent.comments"
                            @click="richTextClick($event)"
                            v-html="titleContent.comments"
                        ></p>
                        <!--eslint-disable no-new-->
                    </div>
                    <div>
                        <div class="Course_Syllabus">
                            {{ $t("message.Course_Summary") }}
                        </div>
                    </div>
                    <div class="syllabus_list">
                        <el-table
                            ref="singleTable"
                            :data="syllabusList"
                            style="width: 100%"
                            highlight-current-row
                            :row-class-name="tableRowClassName"
                        >
                            <el-table-column
                                align="center"
                                data-placement="auto"
                                :show-overflow-tooltip="true"
                                :label="$t('message.Date')"
                                width="120"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.limitTime | formatDate }}
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('message.Details')">
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
                                        {{
                                            scope.row.startTime
                                                | formatterDatemm
                                        }}
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
                    <el-button
                        plain
                        size="medium"
                        class="btnItem"
                        @click="goCalendar"
                    >
                        <i class="iconfont icon-calendar1" /> &nbsp;
                        {{ $t("message.View_Course_Calendar") }}
                    </el-button>
                    <div class="list-item">
                        <controlRight :course-id="courseId" />
                    </div>
                    <div v-if="isyllabus">
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
                                    $t(
                                        "message.Assignments_are_weighted_by_group"
                                    )
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
                                    :data="AssigmentGroup.weights"
                                    style="width: 100%;margin-top: 10px"
                                >
                                    <el-table-column
                                        prop="name"
                                        :label="$t('message.Group')"
                                    />
                                    <el-table-column
                                        :label="$t('message.Weight')"
                                        width="100"
                                    >
                                        <template slot-scope="scope">
                                            <i v-if="scope.row.weight"
                                                >{{ scope.row.weight }}%</i
                                            >
                                            <i v-else-if="!scope.row.weight"
                                                >0%</i
                                            >
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Calendar from "../../../../static/vue-calendar-component";
import { formatDate } from "@/utils/date";
import utilMethods from "@/utils/utilMethods";
// import {formatDate} from '@/utils/date';
import controlRight from "@/components/students/studentDashboard/studentControlRight.vue";
import homeStream from "@/components/course/home/homeStream.vue";
import assignments from "@/components/students/studentCourse/studentAssignments.vue";
import modules from "@/components/students/studentCourse/studentModules.vue";
// import studentsyllabus from '@/components/students/studentCourse/studentsyllabus.vue';

export default {
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
    components: {
        Calendar,
        controlRight,
        homeStream,
        assignments,
        modules
        // studentsyllabus,
        /* assignmentdata */
    },
    data() {
        return {
            activeName: "first",
            // courseId: '',
            dialogPageIndex: 1,
            messagePageIndex: 1,
            dialogList: [],
            messageList: [],
            pageSize: 5,
            courseData: [],
            isStream: false,
            isAssign: false,
            isModule: false,
            isyllabus: false,
            value: "1",
            loading: true,
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
            this.isShow = false;
            this.EditShow = true;
        },
        cancel() {
            this.isShow = true;
            this.EditShow = false;
        },
        // 添加大纲说明
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
        // 大纲事件列表
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
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 点击列表进入
        goReply(item) {
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                // 进入作业模块
                case 1:
                    this.$router.push({
                        path: "studentAssignmentSubmit",
                        query: {
                            courseId,
                            assignmentId: targetId,
                            name: item.title,
                            modulesData: item.id
                        }
                    });
                    break;
                // 进入讨论模块
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
                // 进入测验模块
                case 3:
                    this.$router.push({
                        path: "/studentHomePage/studentAllCourse/quizzDetail",
                        query: {
                            quizDetailId: targetId,
                            // data: targetId,
                            name: item.title,
                            courseId: this.courseId
                        }
                    });
                    break;
                // 进入日历模块
                case 15:
                    this.$router.push({
                        path: "/studentHomePage/studentCalanederDetail",
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
        changeDate(data) {
            const myDate = new Date(data);
            this.y = data.slice(0, 4);
            this.m = myDate.getMonth() + 1;
            // this.m = data.slice(5, 6);
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
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        handleClick() {},
        // 新建公告
        goAnnouce() {
            localStorage.setItem("activeFlag", "announcements");
            this.$router.push({
                path: "announcementCreate",
                query: { courseId: this.courseId }
            });
        },
        homeLeftSelect(value) {
            if (Number(value) === 1) {
                this.isAssign = true;
            } else if (Number(value) === 2) {
                this.isAssign = false;
            }
        },
        goCalendar() {
            this.$router.push({
                path: "/studentHomePage/studentCalendarWatch"
            });
        },
        // 查询课程数据
        async getCourseData() {
            const params = { courseId: this.courseId };
            const res = await this.$getData(
                "/course/homepage/query",
                params,
                "get"
            );
            // console.log('res111', res)
            if (Number(res.data.code) === 200) {
                const tempCurrentPage = res.data.entity.homepage;
                if (String(tempCurrentPage) === "ACTIVE_STREAM") {
                    this.isStream = true;
                    this.isAssign = false;
                    this.isModule = false;
                    this.isyllabus = false;
                } else if (String(tempCurrentPage) === "MODULE") {
                    this.isStream = false;
                    this.isAssign = false;
                    this.isyllabus = false;
                    this.isModule = true;
                } else if (String(tempCurrentPage) === "ASSIGNMENTS") {
                    this.isStream = false;
                    this.isAssign = true;
                    this.isModule = false;
                    this.isyllabus = false;
                } else if (String(tempCurrentPage) === "SYLLABUS") {
                    this.isStream = false;
                    this.isyllabus = true;
                    this.isAssign = false;
                    this.isModule = false;
                } else {
                    this.isStream = true;
                    this.isAssign = false;
                    this.isModule = false;
                }
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style lang="less" scoped>
@import "../../course/home/home.less";
</style>
<style scoped>
.syllabus_style {
    padding: 20px 0;
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
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
    /* margin-bottom: 2%;*/
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
    padding-bottom: 8px;
    color: #333;
    border: 1px solid rgba(238, 238, 238, 1);
    padding-bottom: 10px;
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
</style>
