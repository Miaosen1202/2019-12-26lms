<template>
    <div class="allCourse">
        <el-scrollbar style="height: 100%;">
            <div>
                <el-button size="mini" type="text" @click="cuttle">
                    <i class="iconfont icon-navicon" />
                </el-button>
                <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    style="display: inline-block"
                    class="myBread"
                >
                    <!-- <el-breadcrumb-item :to="{
                    path: '/studentHomePage/studentControlPanel' }
                    ">HomePage</el-breadcrumb-item> -->
                    <el-breadcrumb-item
                        :to="{
                            path:
                                '/studentHomePage/studentAllCourse/studentHome',
                            query: { courseId: courseId }
                        }"
                    >
                        <span class="name-bread">
                            {{ studentCurCourseName }}</span
                        >
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        {{ studentCurModule }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="hasName">
                        <span class="name-bread"> {{ curName }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mainContain">
                <div v-show="tabShow" class="allCourse-tabs">
                    <ul>
                        <li
                            v-for="(item, index) in courseRouteList"
                            :key="index"
                            :class="{ active: activeFlag == item.activeName }"
                            @click="jumpPage(item)"
                        >
                            <el-tooltip
                                class="item"
                                popper-class="test"
                                :content="item.content"
                                placement="right-start"
                            >
                                <i style="font-size: 16px">{{
                                    item.content
                                }}</i>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
                <div ref="courseView" class="course_router_view">
                    <router-view />
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
// import goTop from '../../../utils/goTop.vue';
// import eventBus from '../../../eventBus';
// import utilMethods from '@/utils/utilMethods';

export default {
    /* components: {
        'v-goTop': goTop,
    }, */
    data() {
        return {
            studentCurCourseName: "",
            studentCurModule: "",
            courseId: this.$route.query.courseId,
            tabShow: true,
            activeFlag: "studentHome",
            hasName: false,
            curName: "",
            courseRouteList: [
                {
                    activeName: "studentHome",
                    content: this.$t("message.Home"),
                    path: "/studentHomePage/studentAllCourse/studentHome"
                },
                {
                    activeName: "studentModules",
                    content: this.$t("message.Modules"),
                    path: "/studentHomePage/studentAllCourse/studentModules"
                },
                {
                    activeName: "studentAssignments",
                    content: this.$t("message.Assignments"),
                    path: "/studentHomePage/studentAllCourse/studentAssignments"
                },
                {
                    activeName: "studentQuizzes",
                    content: this.$t("message.Quizzes"),
                    path: "/studentHomePage/studentAllCourse/studentQuizzess"
                },
                {
                    activeName: "studentsyllabus",
                    content: this.$t("message.Syllabus"),
                    path: "/studentHomePage/studentAllCourse/studentsyllabus"
                },
                {
                    activeName: "studentDiscussions",
                    content: this.$t("message.Discussions"),
                    path:
                        "/studentHomePage/studentAllCourse/studentCourseDiscussionCreateList"
                },
                {
                    activeName: "studentAnnouncement",
                    content: this.$t("message.Announcements"),
                    path:
                        "/studentHomePage/studentAllCourse/studentAnnouncementCreateList"
                },
                {
                    activeName: "studentPeople",
                    content: this.$t("message.People"),
                    path: "/studentHomePage/studentAllCourse/studentPeople"
                },
                {
                    activeName: "studentLives",
                    content: this.$t("message.LIVE.lives"),
                    path: "/studentHomePage/studentAllCourse/liveMain"
                },
                // {
                //   activeName: 'studentPages',
                //   content: this.$t('message.Pages'),
                //   path: '/studentHomePage/studentAllCourse/studentPages'
                // },
                // {
                //   activeName: 'studentPages',
                //   content: this.$t('message.Pages'),
                //   path: '/studentHomePage/studentAllCourse/studentPages'
                // },
                {
                    activeName: "studentFiles",
                    content: this.$t("message.Files"),
                    path: "/studentHomePage/studentAllCourse/studentFiles"
                },
                {
                    activeName: "studentGrades",
                    content: this.$t("message.Grades"),
                    path: "/studentHomePage/studentAllCourse/studentGrades"
                }
                // {
                //   activeName: 'settings',
                //   content: this.$t('message.Settings'),
                //   path: '/studentHomePage/studentAllCourse/settings'
                // }
            ]
        };
    },
    watch: {
        $route: {
            /* eslint-disable */
            handler(val, oldVal) {
                this.studentCurCourseName = localStorage.getItem(
                    "studentCourseName"
                );
                this.studentCurModule = val.name.split("_")[2].slice(7);
                // this.studentCurModule = val.name.split('_')[2];
                this.activeFlag = val.name.split("_")[2];
                /* eslint-disable no-new */
                if (val.query.name) {
                    this.hasName = true;
                    this.curName = val.query.name;
                } else {
                    this.hasName = false;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        jumpPage(item) {
            this.activeFlag = item.activeName;
            this.$router.push({
                path: item.path,
                query: { courseId: this.courseId }
            });
        },
        cuttle() {
            this.tabShow = !this.tabShow;
            if (this.tabShow) {
                this.$refs.courseView.style.width = "80%";
            } else {
                this.$refs.courseView.style.width = "100%";
            }
        }
    }
};
</script>

<style scoped="">
.mainContain {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}
.allCourse-tabs {
    padding-top: 1%;
    /* float: left; */
    width: 14%;
    height: 100%;
    margin-bottom: 2%;
    margin-left: 1%;
}
.allCourse-tabs ul li {
    padding-left: 4%;
    padding-top: 10%;
    font-size: 16px;
    cursor: pointer;
}
ul li {
    background-color: #fff;
    color: #ccc;
}
ul li.active {
    background-color: #fff;
    color: #000;
    font-weight: 600;
    /*padding-bottom: 14%;*/
    /*padding-top: 14%;*/
}
.course_router_view {
    padding-top: 1%;
    /* float: left; */
    width: 86%;
    height: 100%;
    margin-bottom: 2%;
    padding-right: 30px;
    box-sizing: border-box;
}

.myBread.el-breadcrumb {
    line-height: 1.5 !important;
    height: 18px !important;
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
