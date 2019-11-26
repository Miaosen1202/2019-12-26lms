<template>
    <div style="padding-right:2%">
        <!--课程列表页-->
        <div class="more-header">
            <el-input
                v-model="query.name"
                style="width: 180px"
                :placeholder="$t('message.Search_Course_Name')"
                prefix-icon="el-icon-search"
                @keyup.enter.native="loadPublicCourses"
            />
            <!--<el-checkbox-group style="display: inline-block;margin-left:20px">-->
            <!---->
            <!--</el-checkbox-group>-->
            <div style="display: inline-block;margin-left:20px">
                <el-checkbox
                    v-model="query.filterPublic"
                    :label="$t('message.Public_Course')"
                    @change="loadPublicCourses"
                />
                <el-checkbox
                    v-model="query.filterOpenRegistry"
                    :label="$t('message.Enrollment_Courses')"
                    @change="loadPublicCourses"
                />
            </div>
        </div>

        <div class="courseList">
            <div
                v-show="publicCourseList.length == 0"
                style="text-align: center; font-size: 1.5em; padding-top: 2em;"
            >
                {{ $t("message.No_more_course_tip") }}
            </div>
            <ul v-show="publicCourseList.length > 0" class="clearfix">
                <li v-for="(item, index) in publicCourseList" :key="index">
                    <div
                        class="img-box"
                        :style="getCoverStyle(item.coverFileUrl)"
                    >
                        <el-button
                            v-if="showJoinBtn(item)"
                            class="join-btn"
                            @click="goJoinCourse(item)"
                        >
                            {{ $t("message.Join_Course") }}
                        </el-button>
                        <el-button
                            v-if="item.joinedStudentNum > 0"
                            class="joined-btn"
                            disabled
                        >
                            {{ $t("message.Course_joined_tip") }}
                        </el-button>
                    </div>
                    <h1 class="dTitle">
                        {{ item.name }}
                    </h1>
                </li>
            </ul>
        </div>

        <!--join课程弹窗-->
        <el-dialog
            :title="$t('message.eport.Course_enroll_title')"
            :visible.sync="joinCourseConfigDialogVisible"
        >
            <p>{{ $t("message.HomeCourse.Student_teaching_materia") }}</p>

            <!-- <el-dialog
          width="30%"
          :visible.sync="joinCourseSuccessDialogVisible"
          append-to-body>
          <p>
            You have successfully join in course {{wantJoinCourse.name }} as a Student
            Please manually switch to the student side for viewing
          </p>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goCourseHome">
              {{$t('message.To_Course')}}
            </el-button>
          </div>
        </el-dialog> -->

            <div slot="footer" class="dialog-footer">
                <el-button @click="joinCourseConfigDialogVisible = false">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button type="primary" @click="joinCourse">
                    {{ $t("message.HomeCourse.Import_now") }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/*eslint-disable*/
import { mapState, mapGetters } from "vuex";

export default {
    computed: {
        ...mapState(["curLanguage", "userInfo"]),
        ...mapGetters(["userInfoData", "instituteList"]),

        userRole() {
            return this.userInfoData.username;
        },

        userPic() {
            if (this.userInfoData.avatarUrl) {
                return this.userInfoData.avatarUrl;
                // }else {
                //   return defaultPic
            }
        },

        HasAdmin() {
            if (this.instituteList.length == 0) {
                return false;
            }
            return true;
        }
    },

    data() {
        return {
            isStudent: this.$route.query.student === "true",
            publicCourseList: [],

            query: {
                name: "",
                filterPublic: false,
                filterOpenRegistry: false
            },
            joinCourseConfigDialogVisible: false,
            joinCourseSuccessDialogVisible: false,

            wantJoinCourse: {}
        };
    },
    created() {
        this.loadPublicCourses();
    },
    methods: {
        goJoinCourse(course) {
            this.wantJoinCourse = course;
            this.joinCourseConfigDialogVisible = true;
        },

        goCourseHome() {
            this.joinCourseSuccessDialogVisible = false;
            this.$router.push({
                path: "/homePage/allCourse/home",
                query: { courseId: this.wantJoinCourse.id }
            });
        },

        async joinCourse() {
            const result = await this.$getData(
                "/course/publicRegistry/edit",
                { courseId: this.wantJoinCourse.id },
                "post"
            );
            if (result.data.code == 200) {
                this.wantJoinCourse.joinedStudentNum++;
                // this.joinCourseSuccessDialogVisible = true;
                this.joinCourseConfigDialogVisible = false;
                this.$message({
                    message: this.$t("message.HomeCourse.Import_succedd"),
                    showClose: true,
                    duration: 10000
                });
            } else {
                this.$message.error(result.data.message);
            }
        },

        showJoinBtn(course) {
            // if (!this.isStudent) {
            //   return false;
            // }

            // if (course.joinedStudentNum > 0) {
            //   return false;
            // }

            // return course.allowJoin == 1;
            return true;
        },

        getCoverStyle(fileUrl) {
            let style;
            if (fileUrl) {
                style = {
                    "background-image": `${"url(" +
                        `${process.env.FILE_PRE_SERVER}`}${fileUrl}?s=thumb&a=500x300)`,
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    "background-size": "cover"
                };
            }

            return style;
        },

        async loadPublicCourses() {
            const result = await this.$getData(
                "/course/public/query",
                this.query
            );
            if (result.data.code == 200) {
                this.publicCourseList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
@import "./homeCourse.less";
</style>
