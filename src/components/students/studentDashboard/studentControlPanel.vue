<template>
    <!--eslint-disable-->
    <div class="controlPanel">
        <el-scrollbar style="height: 100%;">
            <div class="courseList">
                <div
                    v-for="(item, index) in invite"
                    v-show="index == 0"
                    :key="index"
                    class="section"
                >
                    <div class="sectionImg" style="">
                        <img
                            src="../../../../static/images/join.png"
                            style="margin-top: 28%"
                        />
                    </div>
                    <div class="sectionSpan" style="">
                        {{ $t("message.You_Have_been_invited_to_join") }}
                        <el-tooltip
                            effect="dark"
                            placement="top"
                            :content="item.course.name"
                        >
                            <span
                                style="color: #0e38b1;max-width: 200px;
                  display: inline-block;overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  position: relative;
                  top: 5px;"
                                >{{ item.course.name }}</span
                            >
                        </el-tooltip>
                        <span>,</span>
                        <el-tooltip
                            effect="dark"
                            placement="top"
                            :content="item.section.name"
                        >
                            <span
                                style="color: #0e38b1;max-width: 200px;
                  display: inline-block;overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  position: relative;
                  top: 5px;"
                                >{{ item.section.name }}</span
                            >
                        </el-tooltip>

                        {{ $t("message.as_a") }} {{ item.pRole.roleName }}
                    </div>
                    <br />
                    <div class="sectionButton" style="">
                        <el-button
                            size="small"
                            @click="
                                inviteDecline(
                                    item.id,
                                    item.courseId,
                                    item.userId,
                                    item.sectionId,
                                    item.roleId
                                )
                            "
                        >
                            {{ $t("message.Decline") }}
                        </el-button>
                        <el-button
                            class="sectionButtonPrimary"
                            size="small"
                            type="primary"
                            @click="
                                inviteAccept(
                                    item.id,
                                    item.courseId,
                                    item.userId,
                                    item.sectionId,
                                    item.roleId
                                )
                            "
                        >
                            {{ $t("message.Accept") }}
                        </el-button>
                    </div>
                </div>
                <div
                    v-show="courses.length == 0"
                    class="no-data-tip"
                    style="height: 100px; text-align: center;"
                >
                    <img
                        src="../../../../static/images/no_people.png"
                        style="margin-top: 7%;"
                    />
                    <p
                        style="font-size: 24px; padding-top: 2em;line-height:36px;color:#666;width:60%;margin:0 auto;font-weight:600;padding-bottom: 20px;"
                    >
                        {{ $t("message.Dashboard_student_no_course_tip") }}
                    </p>
                    <router-link
                        to="/studentHomePage/studentHomeCourse"
                        style="font-size: 24px; padding-top: 20px;color:#00f;width:60%;margin:0 auto;font-weight:600px;text-decoration: underline;"
                    >
                        Add Courses now
                    </router-link>
                </div>
                <div class="show">
                    <div
                        v-for="(course, index) in courses"
                        :key="index"
                        class="courseItem"
                    >
                        <p class="cover-image">
                            <span
                                class="cover-panel"
                                :style="getCoverStyle(course)"
                                @click="goCourse(course)"
                            />
                            <el-color-picker
                                :disabled="
                                    course.statusToUser == 0 ||
                                        course.statusToUser == 1
                                "
                                v-model="course.coverColor"
                                size="small"
                                class="color"
                                @change="coverColorChanged(course)"
                            />
                        </p>
                        <div class="topicList">
                            <div>
                                <span
                                    style="cursor: pointer"
                                    class="topic"
                                    @click="goCourse(course)"
                                >
                                    {{ course.courseAlias }}
                                </span>
                                <span
                                    style="cursor: pointer"
                                    class="topic"
                                    @click="goCourse(course)"
                                >
                                    {{ course.name }}
                                </span>
                            </div>
                            <el-badge
                                :value="course.favoriteExt.assignmentTodoNumber"
                                class="item"
                                :hidden="
                                    course.favoriteExt.assignmentTodoNumber ===
                                        0
                                "
                            >
                                <el-button
                                    type="text"
                                    @click="
                                        gotoAssignmentPage(course.id, course)
                                    "
                                >
                                    <i class="iconfont icon-icon-edit" />
                                </el-button>
                            </el-badge>
                            <el-badge
                                :value="course.favoriteExt.discussionTodoNumber"
                                class="item"
                                :hidden="
                                    course.favoriteExt.discussionTodoNumber ===
                                        0
                                "
                            >
                                <el-button
                                    type="text"
                                    @click="
                                        gotoDiscussionPage(course.id, course)
                                    "
                                >
                                    <i class="iconfont icon-liaotian" />
                                </el-button>
                            </el-badge>
                            <el-badge
                                :value="course.favoriteExt.quizTodoNumber"
                                class="item"
                                :hidden="course.favoriteExt.quizTodoNumber == 0"
                            >
                                <el-button
                                    type="text"
                                    @click="gotoQuizPage(course.id, course)"
                                >
                                    <i class="iconfont icon--xiugaineirong" />
                                </el-button>
                            </el-badge>
                        </div>
                    </div>
                </div>
            </div>

            <div class="courseRight">
                <controlRight />
            </div>
        </el-scrollbar>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/date";
import controlRight from "./studentControlRight.vue";

export default {
    components: { controlRight },
    filters: {
        formatDate(time) {
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    data() {
        return {
            courses: [],
            courseCoverColors: {},
            // todoList: [],
            // upcomingList: [],
            // todoPageIndex: 1,
            // upcomingPageIndex: 1,
            pageSize: 5,
            hasMoreTodo: true,
            hasMoreUpcoming: true,
            invite: {},
            userId: ""
        };
    },
    watch: {
        courseCoverColors() {}
    },
    computed: {
        ...mapGetters(["userInfoData", "instituteList"])
    },
    mounted() {
        // console.log("get courses")
        this.getFavoriteCourses();
        // this.getTodoList(this.todoPageIndex);
        // this.getUpcomingList(this.upcomingPageIndex);
        this.classInvite();
    },
    methods: {
        getCoverStyle(course) {
            if (course.coverFileUrl) {
                return {
                    "background-image": `${"url(" +
                        `${process.env.FILE_PRE_SERVER}`}${
                        course.coverFileUrl
                    }?s=thumb&a=600x400)`,
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    "background-size": "cover",
                    width: "100%",
                    height: "100%",
                    display: "inline-block",
                    cursor: "pointer"
                };
            }
            return {
                "background-color": course.coverColor,
                width: "100%",
                height: "100%",
                display: "inline-block",
                cursor: "pointer"
            };
        },
        getFavoriteCourses() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/course/favorite/query?includeExt=1&isSort=1`
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.courses = res.data.entity;
                        for (let i = 0; i < this.courses.length; i++) {
                            if (this.courses[i].coverColor) {
                                this.courses[i].coverColor = this.courses[
                                    i
                                ].coverColor;
                            } else {
                                this.$set(
                                    this.courses[i],
                                    "coverColor",
                                    "#4168D7"
                                );
                            }
                            const c = this.courses[i];
                            this.courseCoverColors[c.id] = c.coverColor;
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        coverColorChanged(course) {
            if (!course.coverColor) {
                course.coverColor = this.courseCoverColors[course.id];
                return;
            }
            const color = course.coverColor;

            const data = {
                courseId: course.id,
                alias: course.courseAlias,
                coverColor: color
            };
            this.$http
                .post(`${process.env.NODE_ENV}/course/alias/edit`, data)
                .then(res => {
                    if (res.data.code != 200) {
                        this.$message.error(res.data.message);
                    } else {
                        this.courseCoverColors[course.id] = color;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        goCourse(course) {
            if (
                course.hasOwnProperty("statusToUser") &&
                Number(course.statusToUser) !== 2
            ) {
                this.$message({
                    message: this.$t("message.COURSE.course_limit_text"),
                    type: "error"
                });
                return;
            } else {
                localStorage.setItem("studentCourseName", course.name);
                this.$router.push({
                    path: "/studentHomePage/studentAllCourse/studentHome",
                    query: { courseId: course.id }
                });
            }
        },
        getTodoList(pageIndex) {
            pageIndex = pageIndex || 1;
            this.$http
                .get(`${process.env.NODE_ENV}/todo/pageList`, {
                    params: {
                        pageIndex,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        const resultNumber = res.data.entity.list.length;
                        if (resultNumber < this.pageSize) {
                            this.hasMoreTodo = false;
                        }
                        if (pageIndex === 1) {
                            this.todoList = res.data.entity.list;
                        } else {
                            this.arrayPush(this.todoList, res.data.entity.list);
                        }
                        this.todoPageIndex = res.data.entity.pageIndex;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },

        getUpcomingList(pageIndex) {
            pageIndex = pageIndex || 1;
            this.$http
                .get(`${process.env.NODE_ENV}/upcoming/pageList`, {
                    params: {
                        pageIndex,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        const resultNumber = res.data.entity.list.length;
                        if (resultNumber < this.pageSize) {
                            this.hasMoreUpcoming = false;
                        }
                        if (pageIndex === 1) {
                            this.upcomingList = res.data.entity.list;
                        } else {
                            this.arrayPush(
                                this.upcomingList,
                                res.data.entity.list
                            );
                        }
                        this.upcomingPageIndex = res.data.entity.pageIndex;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },

        gotoAssignmentPage(courseId, course) {
            if (
                course.hasOwnProperty("statusToUser") &&
                Number(course.statusToUser) !== 2
            ) {
                this.$message({
                    message: this.$t("message.COURSE.course_limit_text"),
                    type: "error"
                });
                return;
            } else {
                localStorage.setItem("studentCourseName", course.name);
                this.$router.push({
                    path:
                        "/studentHomePage/studentAllCourse/studentAssignments",
                    query: { courseId }
                });
            }
        },

        gotoDiscussionPage(courseId, course) {
            if (
                course.hasOwnProperty("statusToUser") &&
                Number(course.statusToUser) !== 2
            ) {
                this.$message({
                    message: this.$t("message.COURSE.course_limit_text"),
                    type: "error"
                });
                return;
            } else {
                localStorage.setItem("studentCourseName", course.name);
                this.$router.push({
                    path:
                        "/studentHomePage/studentAllCourse/studentCourseDiscussionCreateList",
                    query: { courseId }
                });
            }
        },

        gotoQuizPage(courseId, course) {
            if (
                course.hasOwnProperty("statusToUser") &&
                Number(course.statusToUser) !== 2
            ) {
                this.$message({
                    message: this.$t("message.COURSE.course_limit_text"),
                    type: "error"
                });
                return;
            } else {
                localStorage.setItem("studentCourseName", course.name);
                this.$router.push({
                    path: "/studentHomePage/studentAllCourse/studentQuizzess",
                    query: { courseId }
                });
            }
        },

        arrayPush(tarArr, srcArr) {
            tarArr = tarArr || [];
            srcArr = srcArr || [];

            for (let i = 0; i < srcArr.length; i++) {
                tarArr.push(srcArr[i]);
            }
            return tarArr;
        },
        classInvite() {
            (this.userId = this.userInfoData.id),
                this.$http
                    .get(`${process.env.NODE_ENV}/userJoinPending/list`, {
                        params: { userId: this.userId }
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.invite = res.data.entity;
                            this.getUpcomingList();
                        } else {
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
        },
        inviteDecline(id, courseId, userId, sectionId, roleId) {
            const params = {
                id,
                courseId,
                userId,
                sectionId,
                roleId,
                registryStatus: 0
            };
            this.$http
                .post(`${process.env.NODE_ENV}/userJoinPending/add`, params)
                .then(res => {
                    // console.log(res);
                    if (res.data.code == 200) {
                        // console.log(res.data.entity);
                        this.classInvite();
                    }
                });
        },
        inviteAccept(id, courseId, userId, sectionId, roleId) {
            const params = {
                id,
                courseId,
                userId,
                sectionId,
                roleId,
                registryStatus: 1
            };
            this.$http
                .post(`${process.env.NODE_ENV}/userJoinPending/add`, params)
                .then(res => {
                    // console.log(res);
                    if (res.data.code == 200) {
                        // console.log(res.data.entity);
                        this.classInvite();
                        this.getFavoriteCourses();
                    }
                });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped="" lang="less">
.controlPanel {
    height: 100%;
    width: 100%;
}

.courseList {
    float: left;
    width: 78%;
    .section {
        width: 95%;
        border: 2px solid #55c21f;
        height: 90px;
        border-radius: 4px;
    }
    .sectionImg {
        vertical-align: center;
        text-align: center;
        width: 10%;
        background: #55c21f;
        height: 100%;
        display: inline-block;
        float: left;
    }
    .sectionSpan {
        display: inline-block;
        margin-left: 20px;
        margin-top: 10px;
    }
    .sectionButton {
        display: inline-block;
        margin-left: 20px;
        margin-top: 10px;
    }
    .sectionButtonPrimary {
        background: #55c21f;
        border: 1px solid #55c21f;
    }
}

.courseRight {
    float: left;
    width: 20%;
    // border-left: 1px solid #cf9236;
    margin-top: 1%;
}

.topicList {
    padding: 3%;
}

.topic {
    overflow: hidden;
    overflow-wrap: break-word;
    display: inline-block;
    white-space: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}

.show {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .courseItem {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid #eee;
        overflow: hidden;
        position: relative;
        width: 300px;
        box-sizing: border-box;
        margin: 10px;
    }
}

.show:hover {
    // box-shadow: 0 0 10px -1px #000;
}

.courseItem p {
    box-sizing: border-box;
    height: 210px;
    overflow: hidden;
    border: none;
    border-bottom: 1px solid #eee;
}

img {
    max-width: 100%;
    height: auto;
}

.iconfont {
    font-size: 20px;
}

.item {
    margin: 10px 30px 0 10px;
    /*float: right;*/
}
/deep/ .el-badge__content.is-fixed {
    top: 10px !important;
}
.color {
    position: absolute;
    top: 1px;
    right: 2px;
}

.todo {
    border-bottom: 1px solid #ccc;
}

.todo h3 {
    display: inline-block;
    font-weight: 700;
}

.todo span {
    display: inline-block;
    padding-left: 40%;
}

.todoStyle {
    display: inline-block;
    padding-top: 4%;
}

.todoStyle ul li {
    padding-top: 4%;
}

.todoStyle ul li:nth-child(n + 2) {
    padding-left: 16%;
}

.todoStyle ul li i {
    padding: 0 4%;
}

.moreToDo {
    padding-left: 20%;
}

.todoStyle ul li p {
    /*padding-left: 4%;*/
    display: inline-block;
    color: #0138b1;
    cursor: pointer;
}

.todoStyle ul li p:active {
    color: #0147ff;
    cursor: pointer;
}
</style>
