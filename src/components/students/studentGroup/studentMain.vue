<template>
    <!--eslint-disable-->
    <div>
        <header>
            <a class="stretch">
                <i class="iconfont icon-navicon" /> &nbsp;&nbsp;{{
                    courseName
                }}
                > {{ groupName }}</a
            >
        </header>
        <div>
            <div class="allCourse-tabs">
                <ul>
                    <!-- <li :class="{active : activeFlag == 'studentHome' ? activeFlag : ''}" @click="studentHome('studentHome')">
            <el-tooltip class="item" popper-class="test" content="Home" placement="right-start">
              <i style="font-size: 16px">{{$t('message.Home')}}</i>
            </el-tooltip>
          </li> -->
                    <li
                        :class="{
                            active:
                                activeFlag == 'groupPeople' ? activeFlag : ''
                        }"
                        @click="studentPeople('groupPeople')"
                    >
                        <el-tooltip
                            class="item"
                            popper-class="test"
                            content="People"
                            placement="right-start"
                        >
                            <i style="font-size: 16px">{{
                                $t("message.People")
                            }}</i>
                        </el-tooltip>
                    </li>
                    <li
                        :class="{
                            active:
                                activeFlag == 'studentDiscussions'
                                    ? activeFlag
                                    : ''
                        }"
                        @click="studentDiscussions('studentDiscussions')"
                    >
                        <el-tooltip
                            class="item"
                            popper-class="test"
                            content="Discussions"
                            placement="right-start"
                        >
                            <i style="font-size: 16px">{{
                                $t("message.Discussions")
                            }}</i>
                        </el-tooltip>
                    </li>
                    <li
                        :class="{
                            active:
                                activeFlag == 'studentFiles' ? activeFlag : ''
                        }"
                        @click="studentFiles('studentFiles')"
                    >
                        <el-tooltip
                            class="item"
                            popper-class="test"
                            content="Files"
                            placement="right-start"
                        >
                            <i style="font-size: 16px">{{
                                $t("message.Files")
                            }}</i>
                        </el-tooltip>
                    </li>
                    <li
                        :class="{
                            active:
                                activeFlag == 'studentAnnouncement'
                                    ? activeFlag
                                    : ''
                        }"
                        @click="studentAnnouncement('studentAnnouncement')"
                    >
                        <el-tooltip
                            class="item"
                            popper-class="test"
                            content="Announcements"
                            placement="right-start"
                        >
                            <i style="font-size: 16px">{{
                                $t("message.Announcements")
                            }}</i>
                        </el-tooltip>
                    </li>
                </ul>
            </div>
            <div class="course_router_view">
                <router-view />
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";

export default {
    name: "StudentGroup",
    data() {
        return {
            activeFlag: "",
            groupId: "",
            courseName: "",
            groupCourse: {},
            groupName: "",
            courseId: "",
            type: ""
        };
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type;
        }
    },
    watch: {
        $route: {
            handler(newVal, oldVal) {
                this.activeFlag = newVal.name.split("_")[2];
                console.log(newVal);
            },
            immediate: true,
            deep: true
        }
    },

    created() {
        this.groupId = this.$route.query.groupId;
        this.courseId = this.$route.query.courseId;
        this.getCourseIdByGroup();

        // this.activeFlag = localStorage.getItem('activePage') ? localStorage.getItem('activePage') : 'groupPeople'
    },
    mounted() {},

    methods: {
        // 根据小组id获取信息
        async getCourseIdByGroup() {
            const params = { data: this.groupId };
            const res = await this.$getData("/studyGroup/get", params, "get");
            if (res.data.code == 200) {
                const resObj = res.data.entity;
                this.groupCourse = resObj;
                this.courseName = resObj.course.name;
                this.groupName = resObj.name;
            }
        },
        // studentHome(s){
        //   this.activeFlag = s
        // },
        studentPeople(s) {
            this.activeFlag = s;
            if (this.roleType == 4) {
                // 学生
                this.$router.push({
                    path: "/studentHomePage/studentMain/groupPeople",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupPeople",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            }
        },
        studentDiscussions(s) {
            this.activeFlag = s;
            if (this.roleType == 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMain/groupDiscussionCreateList",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupDiscussionCreateList",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            }
        },
        studentAnnouncement(s) {
            this.activeFlag = s;
            if (this.roleType == 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMain/groupAnnouncementCreate",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupAnnouncementCreate",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            }
        },
        studentFiles(s) {
            this.activeFlag = s;
            if (this.roleType == 4) {
                this.$router.push({
                    path: "/studentHomePage/studentMain/groupFiles",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
                // this.$router.push({path: "/studentHomePage/studentAllCourse/studentFiles",query: {groupId:this.groupId}});
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupFiles",
                    query: { groupId: this.groupId, courseId: this.courseId }
                });
            }
        }
    },
    components: {}
};
/*eslint-disable no-new*/
</script>

<style lang="less" scoped>
@import "./studentGroup.less";
</style>
