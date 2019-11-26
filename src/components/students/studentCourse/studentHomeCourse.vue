<template>
    <div style="padding-right:2%">
        <!--当前加入课程列表页-->
        <div>
            <div class="course-header" style="margin-bottom: 15px">
                <h1 class="course-header-title">
                    {{ $t("message.All_Course") }}
                </h1>
                <!--<div class="course-header-btns">-->
                <!--<el-button @click="goToViewMoreCourse">{{$t('message.More_Course')}}</el-button>-->
                <!--</div>-->
            </div>
            <el-table
                v-loading="courseListIsLoading"
                :data="currentCourseList"
                :empty-text="$t('message.HOME.No_data_to_be_shown_now')"
                :header-cell-style="headerCellStyle"
                style="width: 100%"
            >
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer; vertical-align: 21px"
                            :title="
                                scope.row.isFavorite
                                    ? $t('message.Course_remove_favorite_tip')
                                    : $t('message.Course_add_favorite_tip')
                            "
                            @click="toggleFavorite(scope.row)"
                        >
                            <i
                                :class="{
                                    'plus-green': scope.row.isFavorite === 1,
                                    iconfont: true,
                                    'icon-plus': true
                                }"
                                :data-favorite="scope.row.isFavorite"
                            />
                        </a>
                        <a
                            :style="getCoverStyle(scope.row)"
                            class="color-block"
                            @click="jumpToAllCourse(scope.row.id, scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.Course')">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="jumpToAllCourse(scope.row.id, scope.row)"
                            >{{ scope.row.name }}</a
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.Nick_Name')"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{
                            scope.row.courseAlias
                                ? scope.row.courseAlias
                                : scope.row.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.HOME.Term')"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.term ? scope.row.term.name : "" }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="openRegistryCode"
                    :label="$t('message.Course_Code')"
                    align="center"
                />

                <el-table-column :label="$t('message.Publish')" align="center">
                    <template slot-scope="scope">
                        <span class="switch-box">
                            <i
                                v-if="scope.row.gradeTaskSubmittedCount > 0"
                                class="el-icon-close switch-close"
                            />
                            <el-switch
                                :title="
                                    scope.row.gradeTaskSubmittedCount > 0
                                        ? $t(
                                              'message.Course_forbid_unpublish_by_submission_tip'
                                          )
                                        : $t(
                                              'message.Course_publish_status_toggle_tip'
                                          )
                                "
                                class="course-switch"
                                :disabled="
                                    scope.row.gradeTaskSubmittedCount > 0
                                "
                                active-color="#55C21F"
                                :value="isCoursePublish(scope.row)"
                                @change="toggleCoursePublishStatus(scope.row)"
                            />
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 将来加入课程列表页 -->
        <div v-if="futureCourseList.length > 0">
            <!--将来开始的课程列表页-->
            <div class="course-header">
                <h1 class="course-header-title">
                    {{ $t("message.Course_future_enrollment") }}
                </h1>
            </div>
            <el-table
                v-loading="courseListIsLoading"
                :data="futureCourseList"
                :empty-text="$t('message.HOME.No_data_to_be_shown_now')"
                :header-cell-style="headerCellStyle"
                style="width: 100%"
            >
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer; vertical-align: 21px"
                            :title="
                                scope.row.isFavorite
                                    ? $t('message.Course_remove_favorite_tip')
                                    : $t('message.Course_add_favorite_tip')
                            "
                            @click="toggleFavorite(scope.row)"
                        >
                            <i
                                :class="{
                                    'plus-green': scope.row.isFavorite === 1,
                                    iconfont: true,
                                    'icon-plus': true
                                }"
                                :data-favorite="scope.row.isFavorite"
                            />
                        </a>
                        <a
                            :style="getCoverStyle(scope.row)"
                            class="color-block"
                            @click="jumpToAllCourse(scope.row.id, scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.Course')">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="jumpToAllCourse(scope.row.id, scope.row)"
                            >{{ scope.row.name }}</a
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.Nick_Name')"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{
                            scope.row.courseAlias
                                ? scope.row.courseAlias
                                : scope.row.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.HOME.Term')"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.term ? scope.row.term.name : "" }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="openRegistryCode"
                    :label="$t('message.Course_Code')"
                    align="center"
                />

                <el-table-column :label="$t('message.Publish')" align="center">
                    <template slot-scope="scope">
                        <span class="switch-box">
                            <i
                                v-if="scope.row.gradeTaskSubmittedCount > 0"
                                class="el-icon-close switch-close"
                            />
                            <el-switch
                                :title="
                                    scope.row.gradeTaskSubmittedCount > 0
                                        ? $t(
                                              'message.Course_forbid_unpublish_by_submission_tip'
                                          )
                                        : $t(
                                              'message.Course_publish_status_toggle_tip'
                                          )
                                "
                                class="course-switch"
                                :disabled="
                                    scope.row.gradeTaskSubmittedCount > 0
                                "
                                active-color="#55C21F"
                                :value="isCoursePublish(scope.row)"
                                @change="toggleCoursePublishStatus(scope.row)"
                            />
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 过去加入课程列表页 -->
        <div v-if="pastCourseList.length > 0">
            <!--过去的课程列表页-->
            <div class="course-header">
                <h1 class="course-header-title">
                    {{ $t("message.Course_past_enrollment") }}
                </h1>
            </div>
            <el-table
                v-loading="courseListIsLoading"
                :data="pastCourseList"
                :empty-text="$t('message.HOME.No_data_to_be_shown_now')"
                :header-cell-style="headerCellStyle"
                style="width: 100%"
            >
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer; vertical-align: 21px"
                            :title="
                                scope.row.isFavorite
                                    ? $t('message.Course_remove_favorite_tip')
                                    : $t('message.Course_add_favorite_tip')
                            "
                            @click="toggleFavorite(scope.row)"
                        >
                            <i
                                :class="{
                                    'plus-green': scope.row.isFavorite === 1,
                                    iconfont: true,
                                    'icon-plus': true
                                }"
                                :data-favorite="scope.row.isFavorite"
                            />
                        </a>
                        <a
                            :style="getCoverStyle(scope.row)"
                            class="color-block"
                            @click="jumpToAllCourse(scope.row.id, scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.Course')">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="jumpToAllCourse(scope.row.id, scope.row)"
                            >{{ scope.row.name }}</a
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.Nick_Name')"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{
                            scope.row.courseAlias
                                ? scope.row.courseAlias
                                : scope.row.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.HOME.Term')"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.term ? scope.row.term.name : "" }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="openRegistryCode"
                    :label="$t('message.Course_Code')"
                    align="center"
                />

                <el-table-column :label="$t('message.Publish')" align="center">
                    <template slot-scope="scope">
                        <span class="switch-box">
                            <i
                                v-if="scope.row.gradeTaskSubmittedCount > 0"
                                class="el-icon-close switch-close"
                            />
                            <el-switch
                                :title="
                                    scope.row.gradeTaskSubmittedCount > 0
                                        ? $t(
                                              'message.Course_forbid_unpublish_by_submission_tip'
                                          )
                                        : $t(
                                              'message.Course_publish_status_toggle_tip'
                                          )
                                "
                                class="course-switch"
                                :disabled="
                                    scope.row.gradeTaskSubmittedCount > 0
                                "
                                active-color="#55C21F"
                                :value="isCoursePublish(scope.row)"
                                @change="toggleCoursePublishStatus(scope.row)"
                            />
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
export default {
    data() {
        return {
            courseListIsLoading: true,
            currentCourseList: [],
            futureCourseList: [],
            pastCourseList: [],
            showCreateCourseDialog: false,
            startEndTime: ["", ""],
            newCourse: {
                name: "",
                alias: "",
                visibility: "",
                startTime: "",
                endTime: ""
            },
            courseRule: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Course_Empty_Tip"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t("message.Course_Beyond_Tip"),
                        trigger: "blur"
                    }
                ],
                alias: [
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.Nick_Beyond_Tip"),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getCourseData();
    },
    methods: {
        getCoverStyle(course) {
            if (course.coverFileUrl) {
                return {
                    "background-image": `${"url(" +
                        `${process.env.FILE_PRE_SERVER}`}${
                        course.coverFileUrl
                    }?s=thumb&a=128x50)`,
                    "background-repeat": "no-repeat",
                    "background-position": "center center",
                    "background-size": "cover",
                    width: "50px",
                    height: "50px",
                    display: "inline-block",
                    cursor: "pointer",
                    border: "1px solid rgba(211, 211, 211, 0.5)"
                };
            }
            return {
                "background-color": course.coverColor,
                width: "50px",
                height: "50px",
                display: "inline-block",
                cursor: "pointer",
                border: "1px solid rgba(211, 211, 211, 0.5)"
            };
        },
        isCoursePublish(course) {
            return Number(course.status) === 1;
        },
        async getCourseData() {
            const result = await this.$getData(
                "/course/joined/query",
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.currentCourseList =
                    result.data.entity.currentEnrollments || [];
                this.pastCourseList = result.data.entity.priorEnrollments || [];
                this.futureCourseList =
                    result.data.entity.futureEnrollments || [];
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
            this.courseListIsLoading = false;
        },
        // 设置表格头部背景颜色
        headerCellStyle(obj) {
            if (obj.rowIndex === 0) {
                return `background-color: #eee;
                  color:#333; font-size:14px;
                  font-weight:bold`;
            }
            return false;
        },
        // 点击加号
        async toggleFavorite(course) {
            const favorite = Number(course.isFavorite) === 1 ? 0 : 1;
            const result = await this.$getData(
                "/course/favorite/edit",
                {
                    courseId: course.id,
                    favorite
                },
                "post"
            );
            if (Number(result.data.code) === 200) {
                Object.assign(course, { isFavorite: favorite });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        toggleCoursePublishStatus(course) {},
        jumpToAllCourse(courseId, course) {
            if (
                course.hasOwnProperty("statusToUser") &&
                Number(course.statusToUser) !== 2
            ) {
                this.$message({
                    message: this.$t("message.COURSE.course_limit_text"),
                    type: "error"
                });
            } else if (Number(course.status) === 1) {
                localStorage.setItem("studentCourseName", course.name);
                this.$router.push({
                    path: "/studentHomePage/studentAllCourse",
                    query: { courseId }
                });
            }
        },
        goToViewMoreCourse() {
            this.$router.push({
                path: "studentCourseList",
                query: { student: "true" }
            });
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
@import "../../../components/course/homeCourse/homeCourse.less";
</style>
