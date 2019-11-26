<template>
    <!--eslint-disable-->
    <div class="controlPanel">
        <el-scrollbar style="height: 100%;">
            <div class="courseMain">
                <div class="courseList">
                    <div
                        v-for="(item, index) in invite"
                        v-show="index == 0"
                        :key="index"
                        class="section"
                    >
                        <div class="sectionImg" style="">
                            <img
                                src="../../../static/images/join.png"
                                style="margin-top: 28%"
                            />
                        </div>
                        <div class="sectionSpan">
                            {{ $t("message.You_Have_been_invited_to_join") }}
                            <el-tooltip
                                effect="dark"
                                placement="top"
                                :content="
                                    item.course.name + ',' + item.section.name
                                "
                            >
                                <span
                                    style="color: #0e38b1;width: 436px; display: inline-block;overflow: hidden;
                                            text-overflow: ellipsis; white-space: nowrap; position: relative;top: 5px;"
                                    >{{ item.course.name }},{{
                                        item.section.name
                                    }}</span
                                >
                            </el-tooltip>

                            {{ $t("message.as_a") }} {{ item.pRole.roleName }}
                        </div>
                        <br />
                        <div class="sectionButton">
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
                            src="../../../static/images/no_people.png"
                            style="margin-top: 7%;"
                        />
                        <p
                            style="font-size: 24px; padding-top: 2em;line-height:36px;color:#666;width:60%;margin:0 auto;font-weight:600;padding-bottom: 20px;"
                        >
                            {{ $t("message.Dashboard_no_course_tip") }}
                        </p>
                        <router-link
                            to="/homePage/homeCourse"
                            style="font-size: 24px; padding-top: 20px;color:#00f;width:60%;margin:0 auto;font-weight:600;text-decoration: underline;"
                        >
                            {{ $t("message.HomeCourse.Create_course_now") }}
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
                                    v-model="course.coverColor"
                                    size="small"
                                    class="color"
                                    @change="coverColorChanged(course)"
                                />
                            </p>
                            <div class="topicList">
                                <div class="nameBox">
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
                                    :value="
                                        course.favoriteExt.assignmentTodoNumber
                                    "
                                    class="item"
                                    :hidden="
                                        course.favoriteExt
                                            .assignmentTodoNumber === 0
                                    "
                                >
                                    <el-button
                                        type="text"
                                        @click="
                                            gotoAssignmentPage(
                                                course.id,
                                                course
                                            )
                                        "
                                    >
                                        <i class="iconfont icon-icon-edit " />
                                    </el-button>
                                </el-badge>
                                <el-badge
                                    :value="
                                        course.favoriteExt.discussionTodoNumber
                                    "
                                    class="item"
                                    :hidden="
                                        course.favoriteExt
                                            .discussionTodoNumber === 0
                                    "
                                >
                                    <el-button
                                        type="text"
                                        @click="
                                            gotoDiscussionPage(
                                                course.id,
                                                course
                                            )
                                        "
                                    >
                                        <i class="iconfont icon-liaotian" />
                                    </el-button>
                                </el-badge>
                                <el-badge
                                    :value="course.favoriteExt.quizTodoNumber"
                                    class="item"
                                    :hidden="
                                        course.favoriteExt.quizTodoNumber == 0
                                    "
                                >
                                    <el-button
                                        type="text"
                                        @click="gotoQuizPage(course.id, course)"
                                    >
                                        <i
                                            class="iconfont icon--xiugaineirong"
                                        />
                                    </el-button>
                                </el-badge>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="courseRight">
                    <controlRight />
                </div>
            </div>
        </el-scrollbar>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/date";
import controlRight from "./controlRight.vue";

export default {
    filters: {
        formatDate(time) {
            if (time) {
                const date = new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm:ss");
            }
            return "";
        }
    },
    data() {
        return {
            courses: [],
            courseCoverColors: {},
            invite: {},
            userId: ""
        };
    },
    computed: {
        ...mapGetters(["userInfoData", "instituteList"])
    },
    mounted() {
        this.getFavoriteCourses();
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
                            c.coverColor = c.coverColor;
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
            // console.log("colorChange", course);
            const { coverColor } = course;
            // if (!coverColor) {
            //     course.coverColor = this.courseCoverColors[course.id];
            //     return;
            // }
            // this.$set(course, 'coverColor', course.coverColor)
            const data = {
                courseId: course.id,
                alias: course.courseAlias,
                coverColor
            };
            this.$http
                .post(`${process.env.NODE_ENV}/course/alias/edit`, data)
                .then(res => {
                    if (res.data.code != 200) {
                        this.$message.error(res.data.message);
                    } else {
                        this.courseCoverColors[course.id] = coverColor;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        goCourse(course) {
            localStorage.setItem("curCourseName", course.name);
            this.$router.push({
                path: "/homePage/allCourse/home",
                query: { courseId: course.id }
            });
        },

        gotoAssignmentPage(courseId, course) {
            localStorage.setItem("curCourseName", course.name);
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: { courseId }
            });
        },

        gotoDiscussionPage(courseId, course) {
            localStorage.setItem("curCourseName", course.name);
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: { courseId }
            });
        },

        gotoQuizPage(courseId, course) {
            localStorage.setItem("curCourseName", course.name);
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: { courseId }
            });
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
    },
    components: { controlRight }
};
/*eslint-disable no-new*/
</script>

<style lang="less" scoped>
@import "./controlPanel.less";
</style>
