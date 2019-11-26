<template>
    <div class="allCourse">
        <el-scrollbar style="height: 100%;">
            <div>
                <el-button
                    size="mini"
                    type="text"
                    style="border: none"
                    @click="cuttle"
                >
                    <i class="iconfont icon-navicon" />
                </el-button>
                <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    style="display: inline-block"
                    class="myBread"
                >
                    <!-- <el-breadcrumb-item :to="{ path: '/homePage/controlPanel' }">HomePage</el-breadcrumb-item> -->
                    <el-breadcrumb-item
                        :to="{
                            path: '/homePage/allCourse/home',
                            query: { courseId: courseId }
                        }"
                    >
                        <span class="name-bread">{{ curCourseName }}</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        {{ curModuleName }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="hasName">
                        <span class="name-bread"> {{ curName }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mainContain">
                <div v-show="isShow" class="allCourse-tabs">
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
// import goTop from '../../utils/goTop.vue';
// import eventBus from '../../eventBus';
import utilMethods from "@/utils/utilMethods";

export default {
    /* components: {
        'v-goTop': goTop,

    }, */
    data() {
        return {
            courseId: this.$route.query.courseId,
            isOpen: false,
            isShow: true,
            tabPosition: "left",
            activeFlag: "home",
            defaultProps: {
                children: "children",
                label: "label"
            },
            curCourseName: "",
            curModuleName: "",
            hasName: false,
            curName: "",
            courseRouteList: [
                {
                    activeName: "home",
                    content: this.$t("message.Home"),
                    path: "/homePage/allCourse/home"
                },
                {
                    activeName: "modules",
                    content: this.$t("message.Modules"),
                    path: "/homePage/allCourse/modules"
                },
                {
                    activeName: "assignments",
                    content: this.$t("message.Assignments"),
                    path: "/homePage/allCourse/assignments"
                },
                {
                    activeName: "quizzes",
                    content: this.$t("message.Quizzes"),
                    path: "/homePage/allCourse/quizzList"
                },
                {
                    activeName: "syllabus",
                    content: this.$t("message.Syllabus"),
                    path: "/homePage/allCourse/syllabus"
                },
                {
                    activeName: "discussions",
                    content: this.$t("message.Discussions"),
                    path: "/homePage/allCourse/discussionCreateList"
                },
                {
                    activeName: "announcements",
                    content: this.$t("message.Announcements"),
                    path: "/homePage/allCourse/announcementCreate"
                },
                {
                    activeName: "people",
                    content: this.$t("message.People"),
                    path: "/homePage/allCourse/people"
                },
                {
                    activeName: "Lives",
                    content: this.$t("message.LIVE.lives"),
                    path: "/homePage/allCourse/liveMain"
                },
                // {
                //   activeName: 'pages',
                //   content: this.$t('message.Pages'),
                //   path: 'pages'
                // },
                {
                    activeName: "files",
                    content: this.$t("message.Files"),
                    path: "/homePage/allCourse/files"
                },
                {
                    activeName: "grades",
                    content: this.$t("message.Grades"),
                    path: "/homePage/allCourse/grades"
                },
                {
                    activeName: "settings",
                    content: this.$t("message.Settings"),
                    path: "/homePage/allCourse/settings"
                }
            ]
        };
    },
    watch: {
        /* eslint-disable */
        $route: {
            handler(val, oldVal) {
                //console.log('11',val);
                this.activeFlag = val.name.split("_")[2];
                this.curModuleName = utilMethods.setFirstWordUpper(
                    val.name.split("_")[2]
                );
                this.curCourseName = localStorage.getItem("curCourseName");
                if (val.query.name) {
                    this.hasName = true;
                    this.curName = val.query.name;
                } else {
                    this.hasName = false;
                }
            },

            // 深度观察监听
            deep: true,
            immediate: true
        }
        /* eslint-disable no-new */
    },
    created() {},
    methods: {
        jumpPage(item) {
            this.activeFlag = item.activeName;
            this.$router.push({
                path: item.path,
                query: { courseId: this.courseId }
            });
        },
        cuttle() {
            this.isShow = !this.isShow;
            if (this.isShow) {
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
.course_router_view {
    padding-top: 1%;
    /* float: left; */
    width: 86%;
    height: 100%;
    margin-bottom: 2%;
    padding-right: 30px;
    box-sizing: border-box;
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

.name-bread {
    max-width: 200px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
}
.myBread.el-breadcrumb {
    line-height: 1.5 !important;
    height: 18px !important;
}
</style>
