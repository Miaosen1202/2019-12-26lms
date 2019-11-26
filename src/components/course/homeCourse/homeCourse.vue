<template>
    <div style="padding-right:2%">
        <!--当前加入课程列表页-->
        <div>
            <div class="course-header">
                <h1 class="course-header-title">
                    {{ $t("message.All_Course") }}
                </h1>
                <div class="course-header-btns">
                    <!-- <el-button @click="goToViewMoreCourse">{{$t('message.More_Course')}}</el-button> -->
                    <el-button
                        icon="el-icon-circle-plus-outline"
                        @click="showCreateCourseDialog = true"
                    >
                        {{ $t("message.Create_a_Course") }}
                    </el-button>
                </div>
            </div>
            <el-table
                v-loading="courseListIsLoading"
                :data="currentCourseList"
                :empty-text="$t('message.Common_no_data_show_now_tip')"
                :header-cell-style="headerCellStyle"
                style="width: 100%"
            >
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer; display: inline-block; vertical-align: 21px"
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
                            @click="jumpToAllCourse(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.Course')">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="jumpToAllCourse(scope.row)"
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
                <el-table-column label="Term" align="center">
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

                <el-table-column :label="$t('message.Settings')" align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="gotoCourseSetting(scope.row.id)"
                        >
                            <i
                                class="iconfont icon-shezhi"
                                style="font-size:22px"
                            />
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 即将开始课程列表页 -->
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
                :empty-text="$t('message.Common_no_data_show_now_tip')"
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
                            @click="jumpToAllCourse(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.Course')">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="jumpToAllCourse(scope.row)"
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
                <el-table-column label="Term" align="center">
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

                <el-table-column :label="$t('message.Settings')" align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="gotoCourseSetting(scope.row.id)"
                        >
                            <i
                                class="iconfont icon-shezhi"
                                style="font-size:22px"
                            />
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 已经结束课程列表页 -->
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
                :empty-text="$t('message.Common_no_data_show_now_tip')"
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
                            @click="jumpToAllCourse(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.Course')">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="jumpToAllCourse(scope.row)"
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
                <el-table-column label="Term" align="center">
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

                <el-table-column :label="$t('message.Settings')" align="center">
                    <template slot-scope="scope">
                        <a
                            style="cursor: pointer"
                            @click="gotoCourseSetting(scope.row.id)"
                        >
                            <i
                                class="iconfont icon-shezhi"
                                style="font-size:22px"
                            />
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--创建课程弹窗-->
        <el-dialog
            :title="$t('message.Create_New_Course')"
            :visible.sync="showCreateCourseDialog"
            width="32%"
            @closed="createCourseDialogClosed"
        >
            <el-form
                ref="createCourseForm"
                :model="newCourse"
                :rules="courseRule"
                label-width="120px"
            >
                <el-form-item :label="$t('message.Course_Name')" prop="name">
                    <el-input
                        v-model="newCourse.name"
                        maxlength="200"
                        show-word-limit
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Nick_Name')" prop="alias">
                    <el-input
                        v-model="newCourse.alias"
                        maxlength="200"
                        show-word-limit
                    />
                </el-form-item>

                <el-form-item
                    :label="$t('message.Date_starts')"
                    prop="startTime"
                >
                    <el-date-picker
                        v-model="newCourse.startTime"
                        type="date"
                        :picker-options="startTimePickerOptions"
                    />
                    <!-- style="width: 100%;" -->
                </el-form-item>
                <el-form-item :label="$t('message.Date_Ends')" prop="endTime">
                    <el-date-picker
                        v-model="newCourse.endTime"
                        type="date"
                        :picker-options="endTimePickerOptions"
                    />
                    <!-- style="width: 100%;" -->
                </el-form-item>

                <el-form-item label="Visibility" prop="visibility">
                    <!-- style="width: 80%;" -->
                    <el-select v-model="newCourse.visibility">
                        <el-option
                            :label="$t('message.Course_visible_public')"
                            :value="1"
                        />
                        <el-option
                            :label="$t('message.Course_visible_course')"
                            :value="2"
                        />
                        <el-option
                            :label="$t('message.Course_visible_institution')"
                            :value="3"
                        />
                    </el-select>
                    <el-popover
                        placement="top-start"
                        width="270"
                        trigger="hover"
                    >
                        <div class="pop-box">
                            <dl>
                                <dt>{{ $t("message.Public") }}</dt>
                                <dd>{{ $t("message.Public_Text") }}</dd>
                            </dl>
                            <dl>
                                <dt>{{ $t("message.Course") }}</dt>
                                <dd>
                                    {{
                                        $t("message.All_Users_associate_course")
                                    }}
                                </dd>
                            </dl>
                            <dl>
                                <dt>{{ $t("message.Institution") }}</dt>
                                <dd>
                                    {{
                                        $t(
                                            "message.All_Users_associate_institution"
                                        )
                                    }}
                                </dd>
                            </dl>
                        </div>
                        <span slot="reference"
                            ><i
                                class="iconfont icon-help-copy"
                                style="font-size: 20px"
                        /></span>
                    </el-popover>
                    <br />
                    <p class="form-tip">
                        {{
                            Number(newCourse.visibility) === 1
                                ? $t("message.Public_Text")
                                : Number(newCourse.visibility) === 2
                                ? $t("message.All_Users_associate_course")
                                : $t("message.All_Users_associate_institution")
                        }}
                    </p>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('createCourseForm')">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button
                        type="primary"
                        :disabled="courseSubmitting"
                        @click="onSubmitFrom('createCourseForm')"
                    >
                        {{ $t("message.Creat_Course") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courseSubmitting: false,
            courseListIsLoading: true,
            currentCourseList: [],
            futureCourseList: [],
            pastCourseList: [],
            showCreateCourseDialog: false,
            newCourse: {
                name: "",
                alias: "",
                visibility: 1,
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
                        max: 200,
                        message: this.$t("message.Nick_Beyond_Tip"),
                        trigger: "blur"
                    }
                ]
            },

            startTimePickerOptions: {
                disabledDate: time => {
                    if (this.newCourse.endTime) {
                        return time >= this.newCourse.endTime;
                    }
                    return false;
                }
            },

            endTimePickerOptions: {
                disabledDate: time => {
                    if (this.newCourse.startTime) {
                        return time <= this.newCourse.startTime;
                    }
                    return false;
                }
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
            if (Number(obj.rowIndex) === 0) {
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
                { courseId: course.id, favorite },
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
        async toggleCoursePublishStatus(course) {
            const status = Number(course.status) === 1 ? 0 : 1;
            const result = await this.$getData(
                "/course/statusToggle/edit",
                { id: course.id, status },
                "post"
            );
            if (Number(result.data.code) === 200) {
                Object.assign(course, { status });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.showCreateCourseDialog = false;
        },
        // 提交表单
        onSubmitFrom(formName) {
            this.courseSubmitting = true;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const result = await this.$getData(
                        "/course/add",
                        JSON.stringify(this.newCourse),
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.showCreateCourseDialog = false;
                        this.getCourseData();
                    } else {
                        this.$message.error(result.data.message);
                    }
                }

                this.courseSubmitting = false;
            });
        },
        jumpToAllCourse(course) {
            localStorage.setItem("curCourseName", course.name);
            this.$router.push({
                path: "/homePage/allCourse/home",
                query: { courseId: course.id }
            });
        },
        goToViewMoreCourse() {
            this.$router.push({ path: "homeCourseList" });
        },
        gotoCourseSetting(courseId) {
            this.$router.push({
                path: "/homePage/allCourse/settings",
                query: { courseId }
            });
        },

        createCourseDialogClosed() {
            this.resetForm("createCourseForm");
            this.courseSubmitting = false;
        }
    }
};
</script>

<style lang="less" scoped>
@import "./homeCourse.less";
</style>
