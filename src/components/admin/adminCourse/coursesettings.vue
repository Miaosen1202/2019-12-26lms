<template>
    <!--eslint-disable-->
    <div style="margin-left: 10%">
        <!-- 右侧操作栏 -->
        <div class="setting-right">
            <el-button
                v-if="!courseConcludedDisabled"
                class="course-handle"
                type="plain"
                icon="el-icon-goods"
                @click="concludeCourse"
            >
                {{ $t("message.Conclude_this_Course") }}
            </el-button>
            <el-button
                v-if="courseConcludedDisabled"
                class="course-handle"
                type="plain"
                icon="el-icon-goods"
                @click="unconcludeCourse"
            >
                {{ $t("message.unConclude_this_Course") }}
            </el-button>
            <el-button
                class="course-handle"
                type="plain"
                icon="el-icon-delete"
                @click="deleteCourse"
            >
                {{ $t("message.Delete_this_Course") }}
            </el-button>
        </div>

        <!-- 中间内容区 -->
        <div style="width: 70%;">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('message.Course_Details')" name="first">
                    <!--课程详细信息-->
                    <v-course-detail
                        :course-handle-type="courseHandleType"
                        @courseLoaded="courseLoaded"
                    />
                </el-tab-pane>
                <el-tab-pane :label="$t('message.Sections')" name="second">
                    <!--班级-->
                    <v-section />
                </el-tab-pane>
            </el-tabs>

            <v-goTop />
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapState, mapMutations, mapGetters } from "vuex";
import goTop from "@/utils/goTop.vue";

import courseDetail from "../../course/setting/courseDetail.vue";
import section from "../../course/setting/section.vue";
// import nav from './setting/nav.vue';
// import app from './setting/app.vue'
// import feature from './setting/feature.vue'

import utilMethods from "@/utils/utilMethods";
import { formatDate } from "@/utils/date";

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
    computed: {
        ...mapState(["curLanguage"]),

        ...mapGetters(["userInfoData"]),

        currentUserId() {
            return this.userInfoData.id;
        }
    },
    components: {
        "v-goTop": goTop,
        "v-course-detail": courseDetail,
        "v-section": section
        // "v-nav": nav,
        // "v-app": app,
        // "v-feature": feature
    },
    data() {
        return {
            activeName: "first",
            courseHandleType: "",
            courseConcludedDisabled: true,
            courseId: this.$route.query.courseId
        };
    },
    created() {},
    methods: {
        courseLoaded(course) {
            this.courseConcludedDisabled = course.isConcluded == 1;
        },
        unconcludeCourse() {
            this.courseConcludedDisabled = false;
            this.$http
                .post(`${process.env.NODE_ENV}/course/unConclude/edit`, {
                    id: this.courseId
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("Un-conclude succeeded!");
                        this.courseConcludedDisabled = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // this.$confirm(this.$t('message.concludeTip'), '', {
            //   confirmButtonText: this.$t('message.Common_confirm'),
            //   cancelButtonText: this.$t('message.Cancel'),
            //   showClose:false,
            //   type: 'warning'
            // }).then(() => {
            //   this.courseConcludedDisabled = false;
            //   this.$http.post(`${process.env.NODE_ENV}/course/unConclude/edit`, {id:this.courseId})
            //     .then((res) => {
            //       if (res.data.code == 200) {
            //         this.$message.success('ok');
            //         this.courseConcludedDisabled = false;
            //       } else {
            //         this.$message.error(res.data.message);
            //       }
            //     }).catch((err) => {
            //     console.log(err);
            //   });
            // }).catch(() => {
            // });
        },
        concludeCourse() {
            this.$confirm(
                this.$t("message.concludeTip"),
                "Confirm Conclude Course",
                {
                    confirmButtonText: this.$t("message.Common_confirm"),
                    cancelButtonText: this.$t("message.Cancel"),
                    showClose: false,
                    type: "warning"
                }
            )
                .then(() => {
                    this.courseConcludedDisabled = true;
                    this.courseHandleType = "conclude";
                })
                .catch(() => {});
        },

        deleteCourse() {
            const _this = this;
            this.$confirm(
                _this.$t("message.deletes"),
                "Confirm Course Deletion",
                {
                    confirmButtonText: this.$t("message.Common_confirm"),
                    cancelButtonText: this.$t("message.Cancel"),
                    showClose: false,
                    type: "warning"
                }
            )
                .then(() => {
                    this.deleteCourseExec();
                    // this.courseHandleType = 'delete';
                })
                .catch(() => {});
        },
        deleteCourseExec() {
            this.$http
                .post(`${process.env.NODE_ENV}/course/deletes`, [this.courseId])
                .then(result => {
                    if (result.data.code == 200) {
                        this.$message.success(
                            this.$t(
                                "message.COURSE_SETTING.delete_course_success"
                            )
                        );

                        this.$router.push({
                            path: "/adminHomePage/adminCourseAll"
                        });
                    } else {
                        this.$message.error(result.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped="">
.el-form-item__content {
    margin-left: 150px;
}

.course-button {
    border-bottom: 1px solid #409eff;
    padding: 0px;
    border-radius: 0px;
}

.setting-right {
    float: right;
    display: block;
    width: 22%;
    /*position: absolute;
    top:0;
    right: 1%;*/
}
.setting-right .el-button {
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    display: block;
}
.current_users {
    margin-top: 10%;
}
.current_users ul li {
    border-bottom: 1px solid #ccc;
    padding: 3% 1%;
}
.current_users ul li span {
    width: 50%;
    display: inline-block;
}

.setting-right .course-handle:nth-child(n + 1) {
    margin-top: 1em;
    width: 200px;
}
</style>
