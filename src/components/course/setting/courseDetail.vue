<template>
    <!--eslint-disable-->
    <div class="course-detail">
        <div>
            <h3 style="display: inline-block">
                {{ $t("message.Course_Details") }}
            </h3>

            <!-- 发布状态 -->
            <p v-if="courseConfig.course.status" style="float: right">
                {{ $t("message.Course_is_Published") }}
                <img
                    src="../../../../static/images/published.png"
                    alt=""
                    style="vertical-align: middle;"
                />
            </p>

            <div
                v-if="courseConfig.allowOpenRegistry == 1"
                style="width: 200px;float: right;clear: right;margin-top: 1em;"
            >
                <h3 style="margin-bottom: 1em;">
                    {{ $t("message.COURSE_SETTING.self_enrollment_method") }}:
                </h3>
                <p>
                    {{ $t("message.COURSE_SETTING.open_enrollment_desc") }}:
                    {{ openRegistryPath + courseConfig.openRegistryCode }}.
                    <!--Alternatively, they can sign up at http://xxx/register {{ openRegistryPath + "" }}-->
                    <!--and use the following join code: {{ courseConfig.openRegistryCode }}-->
                </p>
            </div>
        </div>
        <div class="courseDetails">
            <el-form
                ref="courseDetailForm"
                label-position="right"
                label-width="80px"
                :model="courseConfig"
            >
                <!--<el-form-item>-->
                <!--{{ getCoverStyle }}-->
                <!--<div class="seting_image cover-image">-->
                <!--<img :src="coverFileUrl"/>-->
                <!--</div>-->
                <!--</el-form-item>-->
                <!-- 课程封面 -->
                <el-form-item :label="$t('message.Image')">
                    <div
                        class="seting_image cover-image"
                        :style="'background-image: url(' + coverUrl + ')'"
                    >
                        <el-upload
                            class="avatar-uploader"
                            :action="getUploadAddress()"
                            name="file"
                            accept="image/jpeg,image/jpg,image/png"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button
                                v-show="!courseConfig.course.coverFileUrl"
                                class="update_imag"
                                size="small"
                                round
                            >
                                {{ $t("message.Choose_Image") }}
                            </el-button>
                            <el-button
                                v-show="courseConfig.course.coverFileUrl"
                                class="update_image"
                                size="small"
                                round
                            >
                                {{ $t("message.Choose_Image") }}
                            </el-button>
                        </el-upload>
                    </div>
                </el-form-item>

                <!-- 课程名称 -->
                <el-form-item
                    :label="$t('message.COURSE_SETTING.course_name')"
                    prop="course.name"
                    :rules="[
                        {
                            required: true,
                            trigger: 'blur',
                            message: $t('message.Common_rule_cannot_be_empty')
                        },
                        {
                            max: 200,
                            trigger: 'blur',
                            message: $t('message.Course_name_length_tip')
                        }
                    ]"
                >
                    <el-input
                        v-model="courseConfig.course.name"
                        style="width: 100%"
                    />
                </el-form-item>

                <!-- 课程编码 -->
                <el-form-item
                    :label="$t('message.COURSE_SETTING.course_code')"
                    prop="course.code"
                    :rules="[
                        {
                            max: 200,
                            trigger: 'blur',
                            message: $t('message.Course_name_length_tip')
                        }
                    ]"
                >
                    <el-input
                        v-model="courseConfig.course.code"
                        style="width: 100%"
                    />
                </el-form-item>

                <el-form-item
                    :label="$t('message.COURSE_SETTING.course_sisId')"
                >
                    <span v-show="courseConfig.course.sisId">{{
                        courseConfig.course.sisId
                    }}</span>
                    <span v-show="!courseConfig.course.sisId">--</span>
                </el-form-item>

                <!-- 课程机构 -->
                <el-form-item :label="$t('message.COURSE_SETTING.sub_account')">
                    <!--<el-button type="text"
                     style="border-bottom: 1px solid #409EFF;padding: 0px;border-radius: 0px">
            {{ courseConfig.org.name }}
          </el-button>-->
                    <span>{{ courseConfig.org.name }}</span>
                </el-form-item>

                <!-- 课程学期 -->
                <el-form-item :label="$t('message.Term')">
                    {{ courseConfig.term.name }}
                    <!--<p>-->
                    <!--{{$t('message.Changing_course_dates')}}-->
                    <!--</p>-->
                </el-form-item>

                <!-- 课程开始时间 -->
                <el-form-item :label="$t('message.Starts')">
                    <div class="block">
                        <span class="demonstration" />
                        <el-date-picker
                            v-model="courseConfig.course.startTime"
                            style="width: 100%"
                            :picker-options="courseStartTimePickOptions"
                            type="date"
                        />
                    </div>
                </el-form-item>

                <!-- 课程结束时间 -->
                <el-form-item :label="$t('message.Ends')">
                    <div class="block">
                        <span class="demonstration" />
                        <el-date-picker
                            v-model="courseConfig.course.endTime"
                            style="width: 100%"
                            :picker-options="courseEndTimePickOptions"
                            type="date"
                        />
                    </div>
                    <em class="tip">
                        {{
                            $t(
                                "message.COURSE_SETTING.student_participate_time_tip"
                            )
                        }}
                    </em>
                </el-form-item>

                <!-- 课程语言 -->
                <el-form-item :label="$t('message.Language')">
                    <el-select
                        v-model="courseConfig.course.language"
                        :clearable="true"
                        disabled="disabled"
                        placeholder="English"
                    >
                        :placeholder="$t('message.Common_please_select')"
                        <!--<el-option label="简体中文" value="zh"/>-->
                        <el-option label="English" value="en" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <em class="tip">
                        {{ $t("message.COURSE_SETTING.language_set_tip") }}
                    </em>
                </el-form-item>

                <!-- 课程可见性 -->
                <el-form-item :label="$t('message.Visibility')">
                    <el-select
                        v-model="courseConfig.course.visibility"
                        :placeholder="$t('message.Common_please_select')"
                    >
                        <el-option
                            :key="1"
                            :label="$t('message.Course_visible_public')"
                            :value="1"
                        />
                        <el-option
                            :key="2"
                            :label="$t('message.Course_visible_course')"
                            :value="2"
                        />
                        <el-option
                            :key="3"
                            :label="$t('message.Course_visible_institution')"
                            :value="3"
                        />
                    </el-select>
                </el-form-item>

                <!-- 关联到公共课程索引 暂时注掉-->
                <!-- <el-form-item>
                    <el-checkbox
                        v-model="courseConfig.course.includePublishIndex"
                        :false-label="0"
                        :true-label="1"
                    >
                        {{
                            $t(
                                "message.COURSE_SETTING.include_course_to_public_index"
                            )
                        }}
                    </el-checkbox>
                </el-form-item> -->

                <!-- 课程格式 -->
                <el-form-item :label="$t('message.COURSE_SETTING.format')">
                    <el-select
                        v-model="courseConfig.format"
                        :placeholder="$t('message.Common_please_select')"
                    >
                        <el-option
                            :key="'1'"
                            :label="$t('message.COURSE_SETTING.format_campus')"
                            :value="1"
                        />
                        <el-option
                            :key="'2'"
                            :label="$t('message.COURSE_SETTING.format_online')"
                            :value="2"
                        />
                        <el-option
                            :key="'3'"
                            :label="$t('message.COURSE_SETTING.format_blended')"
                            :value="3"
                        />
                    </el-select>
                </el-form-item>
                <!--评分方式-->
                <el-form-item
                    :label="$t('message.COURSE_SETTING.Grading_scheme')"
                >
                    <span class="Scheme" @click="gradeTable">{{
                        $t("message.COURSE_SETTING.Scheme")
                    }}</span>
                </el-form-item>

                <!-- 课程描述 -->
                <el-form-item :label="$t('message.COURSE_SETTING.description')">
                    <el-input
                        v-model="courseConfig.course.description"
                        type="textarea"
                        rows="10"
                    />
                </el-form-item>

                <el-form-item>
                    <el-checkbox
                        v-model="courseConfig.allowOpenRegistry"
                        :true-label="1"
                        :false-label="0"
                    >
                        {{ $t("message.COURSE_SETTING.allow_sign_up_by_code") }}
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button
                        style="float: right;"
                        :disabled="courseConfig.course.isConcluded == 1"
                        type="primary"
                        @click="updateCourseConfig('courseDetailForm')"
                    >
                        {{ $t("message.Update_Course_Details") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-dialog
                :title="$t('message.COURSE_SETTING.Grading_Scheme')"
                :visible.sync="dialogTableVisible"
                style="min-width: 39%"
                class="dialogTableVisibleDegree"
            >
                <span class="discription">
                    {{
                        $t(
                            "message.COURSE_SETTING.This_grading_scheme_is_applied"
                        )
                    }}
                </span>
                <el-table :data="gridData">
                    <el-table-column
                        property="code"
                        :label="$t('message.COURSE_SETTING.Name')"
                        width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        property="rangeEnd"
                        :label="$t('message.COURSE_SETTING.Range')"
                        width="200"
                    >
                    </el-table-column>
                    <el-table-column property="rangeStart" label="">
                    </el-table-column>
                </el-table>
                <el-button
                    type="primary"
                    style="margin-left: 80%;margin-top: 20px"
                    @click="editForm"
                >
                    <span class="el-icon-edit"></span>
                    <span>{{ $t("message.COURSE_SETTING.Edit") }}</span>
                </el-button>
            </el-dialog>
            <el-dialog
                :title="$t('message.COURSE_SETTING.Grading_Scheme')"
                :visible.sync="dialogFormVisible"
                class="dialogFormVisibleDegree"
            >
                <span class="discription">
                    {{ $t("message.COURSE_SETTING.If_changed_all_later") }}
                </span>
                <el-form :model="forms" ref="forms" :rules="rules">
                    <el-table
                        :data="forms.voList"
                        width="100%"
                        class="range-table"
                    >
                        <el-table-column
                            :label="$t('message.COURSE_SETTING.Name')"
                            min-width="110"
                        >
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'voList.' + scope.$index + '.code'"
                                >
                                    <el-input
                                        v-model="scope.row.code"
                                        style="width: 75%"
                                    ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('message.COURSE_SETTING.Range')"
                            min-width="150"
                        >
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="
                                        'voList.' + scope.$index + '.rangeEnd'
                                    "
                                    :rules="rules.rangeEnd"
                                >
                                    <span class="range-span" style="">
                                        <span class="range-span-span"><</span>
                                    </span>

                                    <el-input
                                        class="range-input"
                                        v-model="scope.row.rangeEnd"
                                        style=""
                                    ></el-input>
                                    <span style="margin-left: 3px">%</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="" min-width="130">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="
                                        'voList.' + scope.$index + '.rangeStart'
                                    "
                                    :rules="rules.rangeStart"
                                >
                                    <span class="to-span" style="">{{
                                        $t("message.COURSE_SETTING.to")
                                    }}</span>
                                    <el-input
                                        class="to-input"
                                        v-model="scope.row.rangeStart"
                                        style=""
                                    ></el-input>
                                    <span style="margin-left: 10px">%</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="">
                            <template slot-scope="scope">
                                <span
                                    class="iconfont icon-delete"
                                    @click="deleteDomain(scope.$index)"
                                ></span>
                                <span
                                    class="iconfont icon-add1"
                                    @click="addDomain(scope.$index)"
                                ></span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button
                        style="margin-left: 60%;margin-top: 20px"
                        @click="dialogFormVisible = false"
                        >{{ $t("message.Cancel") }}</el-button
                    >
                    <el-button
                        style="margin-top: 20px"
                        type="primary"
                        @click="gradeSchemeAdd('forms')"
                        >{{ $t("message.Save") }}</el-button
                    >
                </el-form>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
export default {
    props: {
        courseHandleType: {
            type: Object,
            default() {
                return {};
            }
        }
    },

    data() {
        const rangeEnd = (rule, value, callback) => {
            //小数点保留一位小数
            const boolean = new RegExp("^\\d+(\\.\\d{1})?$").test(value);
            if (!value) {
                this.$message({
                    message:
                        this.$t(
                            "message.COURSE_SETTING.Some_ranges_are_incorrect"
                        ) +
                        this.$t(
                            "message.COURSE_SETTING.Please_check_this_grading_scheme_again"
                        ),
                    type: "error"
                });
                callback(new Error(" "));
            } else if (!boolean) {
                this.$message({
                    message:
                        this.$t(
                            "message.COURSE_SETTING.Some_ranges_are_incorrect"
                        ) +
                        this.$t(
                            "message.COURSE_SETTING.Please_check_this_grading_scheme_again"
                        ),
                    type: "error"
                });
                callback(new Error(" "));
            } else if (Number(value) < 0 || Number(value) > 100) {
                this.$message({
                    message:
                        this.$t(
                            "message.COURSE_SETTING.Some_ranges_are_incorrect"
                        ) +
                        this.$t(
                            "message.COURSE_SETTING.Please_check_this_grading_scheme_again"
                        ),
                    type: "error"
                });
                callback(new Error(" "));
            } else {
                callback();
            }
        };
        const rangeStart = (rule, value, callback) => {
            //小数点保留一位小数
            const boolean = new RegExp("^\\d+(\\.\\d{1})?$").test(value);
            if (!value && (Number(value) < 0 || Number(value) > 100)) {
                this.$message({
                    message:
                        this.$t(
                            "message.COURSE_SETTING.Some_ranges_are_incorrect"
                        ) +
                        this.$t(
                            "message.COURSE_SETTING.Please_check_this_grading_scheme_again"
                        ),
                    type: "error"
                });
                callback(new Error(" "));
            } else if (!boolean) {
                this.$message({
                    message:
                        this.$t(
                            "message.COURSE_SETTING.Some_ranges_are_incorrect"
                        ) +
                        this.$t(
                            "message.COURSE_SETTING.Please_check_this_grading_scheme_again"
                        ),
                    type: "error"
                });
                callback(new Error(" "));
            } else {
                callback();
            }
        };
        return {
            openRegistryPath: `${window.location.origin}/#/enrollment?code=`,
            courseId: this.$route.query.courseId,
            visibilityOptions: [
                {
                    label: this.$t("message.Course_visible_public"),
                    value: 1
                },
                {
                    label: this.$t("message.Course_visible_course"),
                    value: 2
                },
                {
                    label: this.$t("message.Course_visible_institution"),
                    value: 3
                }
            ],
            courseStartTimePickOptions: {
                disabledDate: time => {
                    if (this.courseConfig.course.endTime) {
                        return time >= this.courseConfig.course.endTime;
                    }
                    return false;
                }
            },
            courseEndTimePickOptions: {
                disabledDate: time => {
                    if (this.courseConfig.course.startTime) {
                        return time <= this.courseConfig.course.startTime;
                    }
                    return false;
                }
            },
            showMoreOption: true,
            courseConfig: {
                org: {
                    name: ""
                },
                term: {
                    name: ""
                },
                coverColor: "",
                alias: "",
                isFavorite: 0,
                fileStorageLimit: "",
                course: {
                    id: "",
                    name: "",
                    code: "",
                    status: "",
                    visibility: "",
                    isEnd: 0,
                    coverFileId: "",
                    coverFileUrl: "",
                    description: "",
                    termId: "",
                    startTime: "",
                    endTime: "",
                    homepage: "",
                    includePublishIndex: 0
                },
                format: "",
                enableGrade: "",
                gradeSchemeId: "",
                allowViewBeforeStartTime: 1,
                allowViewAfterEndTime: 1,
                allowOpenRegistry: 0,
                openRegistryCode: "",
                enableHomepageAnnounce: 0,
                homepageAnnounceNumber: "",
                allowStudentCreateStudyGroup: 0,
                hideTotalInStudentGradeSummary: 0,
                hideGradeDistributionGraphs: 0,
                allowAnnounceComment: 0,
                coursePageEditType: "",
                timeZone: "",
                subAccount: "",
                userConfig: {
                    allowMarkPostStatus: 0
                },
                discussionConfig: {
                    allowDiscussionAttachFile: 0,
                    allowStudentCreateDiscussion: 0,
                    allowStudentEditDiscussion: 0
                }
            },
            coverUrl: "",
            gridData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            forms: {
                voList: []
            },
            rules: {
                rangeStart: [
                    { required: true, validator: rangeStart, trigger: "blur" }
                ],
                rangeEnd: [
                    { required: true, validator: rangeEnd, trigger: "blur" }
                ]
            },
            codes: "",
            everys: null,
            startTime: [],
            endTimeGreater: []
        };
    },
    watch: {
        courseHandleType(newVal) {
            switch (newVal) {
                case "conclude":
                    this.concludeCourse();
                    break;
                case "delete":
                    this.deleteCourse();
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {
        this.loadCourseConfig();
    },
    methods: {
        async loadCourseConfig() {
            const result = await this.$getData("/course/config/query", {
                courseId: this.courseId
            });
            if (Number(result.data.code) === 200) {
                this.courseConfig = result.data.entity;
                this.setCoverImage();
            } else {
                this.$message.error(result.data.message);
            }
            this.$emit("courseLoaded", this.courseConfig.course);
        },
        setCoverImage() {
            this.coverUrl = `${process.env.FILE_PRE_SERVER}${this.courseConfig.course.coverFileUrl}?s=thumb&a=300x400`;
        },
        ourseStartTimeChanged() {
            if (
                this.courseConfig.course.startTime >=
                this.courseConfig.course.endTime
            ) {
                this.courseConfig.course.endTime = "";
            }
        },
        getUploadAddress() {
            return `${process.env.NODE_ENV}/upload`;
        },
        updateCourseConfig(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/course/config/edit`,
                            this.courseConfig
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.$message.success(
                                    this.$t("message.Common_update_success")
                                );
                                this.$router.push({
                                    path: "/homePage/homeCourse"
                                });
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
            });
        },
        handleAvatarSuccess(res) {
            if (Number(res.code) === 200 && res.entity.length > 0) {
                const fileInfo = res.entity[0];
                this.courseConfig.course.coverFileUrl = fileInfo.fileId;
                this.courseConfig.coverFileUrl = fileInfo.fileId;

                this.setCoverImage();
            }
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error(
                    this.$t("message.COURSE_SETTING.Upload_the_profile")
                );
            }
            return isLt2M;
        },
        concludeCourse() {
            if (Number(this.courseConfig.course.isConcluded) === 1) {
                return;
            }
            this.$http
                .post(`${process.env.NODE_ENV}/course/conclude/edit`, {
                    id: this.courseConfig.course.id
                })
                .then(result => {
                    if (Number(result.data.code) === 200) {
                        this.courseConfig.course.isConcluded = 1;
                        this.$message.success(
                            this.$t(
                                "message.COURSE_SETTING.conclude_course_success"
                            )
                        );
                    } else {
                        this.$message.error(result.data.message);
                    }
                    this.$emit("courseLoaded", this.courseConfig.course);
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        deleteCourse() {
            this.$http
                .post(`${process.env.NODE_ENV}/course/deletes`, [
                    this.courseConfig.course.id
                ])
                .then(result => {
                    if (Number(result.data.code) === 200) {
                        this.$message.success(
                            this.$t(
                                "message.COURSE_SETTING.delete_course_success"
                            )
                        );
                        this.$router.push({ path: "/homePage/homeCourse" });
                    } else {
                        this.$message.error(result.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        gradeTable() {
            this.dialogTableVisible = true;
            this.gradeSchemeList();
        },
        editForm() {
            this.dialogTableVisible = false;
            this.dialogFormVisible = true;
        },
        addDomain(indexs) {
            this.forms.voList.forEach((item, index) => {
                if (Number(indexs) === Number(index)) {
                    this.forms.voList.splice(index + 1, 0, {
                        code: "",
                        rangeStart: "",
                        rangeEnd: ""
                    });
                }
            });
        },
        deleteDomain(indexs) {
            this.forms.voList.forEach((item, index) => {
                if (Number(indexs) === Number(index)) {
                    console.log(item);
                    this.forms.voList.splice(index, 1);
                }
            });
        },
        isRangeIn(minnum, maxnum) {
            if (minnum != maxnum) {
                return true;
            }
            return "";
        },
        async gradeSchemeAdd(forms) {
            this.endTimeGreater = [];
            this.$refs[forms].validate(async valid => {
                if (valid) {
                    if (Number(this.forms.voList.length) - 1 > 0) {
                        this.startTime = [];
                        this.forms.voList.every((currentValue, index, arr) => {
                            if (
                                Number(arr[index].rangeEnd) >
                                Number(arr[index].rangeStart)
                            ) {
                                this.endTimeGreater.push(
                                    Number(arr[index].rangeStart)
                                );
                            }
                            if (
                                Number(this.forms.voList.length) >
                                Number(index + 1)
                            ) {
                                if (
                                    Number(arr[index].rangeStart) ===
                                    Number(arr[index + 1].rangeEnd)
                                ) {
                                    this.startTime.push(
                                        Number(arr[index].rangeStart)
                                    );
                                    return true;
                                }
                            }
                        });
                    }
                    if (
                        Number(this.startTime.length) ===
                            Number(this.forms.voList.length) - 1 &&
                        Number(this.endTimeGreater.length) ===
                            Number(this.forms.voList.length)
                    ) {
                        const params = {
                            courseId: this.courseId,
                            schemeItems: this.forms.voList
                        };
                        const result = await this.$getData(
                            "/gradeScheme/add",
                            params,
                            "post"
                        );
                        if (Number(result.data.code) === 200) {
                            this.dialogFormVisible = false;
                            this.dialogTableVisible = true;
                            this.gradeSchemeList();
                        } else {
                            this.$message.error(result.data.message);
                        }
                    } else {
                        this.$message({
                            message:
                                this.$t(
                                    "message.COURSE_SETTING.Some_ranges_are_incorrect"
                                ) +
                                this.$t(
                                    "message.COURSE_SETTING.Please_check_this_grading_scheme_again"
                                ),
                            type: "error"
                        });
                    }
                }
            });
        },

        async gradeSchemeList() {
            const params = {
                data: Number(this.courseId)
            };
            const result = await this.$getData(
                "/gradeScheme/get",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                if (result.data.entity.length > 0) {
                    const data = [];
                    result.data.entity.forEach(item => {
                        data.push({
                            rangeStart: item.rangeStart + "%",
                            rangeEnd: item.rangeEnd + "%",
                            code: item.code
                        });
                    });
                    this.gridData = data;
                    this.forms.voList = result.data.entity;
                } else {
                    this.gridData = [
                        {
                            code: "A",
                            rangeStart: "94%",
                            rangeEnd: "100%"
                        },
                        {
                            code: "A-",
                            rangeStart: "90%",
                            rangeEnd: "94%"
                        },
                        {
                            code: "B+",
                            rangeStart: "87%",
                            rangeEnd: "90%"
                        },
                        {
                            code: "B",
                            rangeStart: "84%",
                            rangeEnd: "87%"
                        },
                        {
                            code: "B-",
                            rangeStart: "80%",
                            rangeEnd: "84%"
                        },
                        {
                            code: "C+",
                            rangeStart: "77%",
                            rangeEnd: "80%"
                        },
                        {
                            code: "C",
                            rangeStart: "74%",
                            rangeEnd: "77%"
                        },
                        {
                            code: "C-",
                            rangeStart: "70%",
                            rangeEnd: "74%"
                        },
                        {
                            code: "D+",
                            rangeStart: "67%",
                            rangeEnd: "70%"
                        },
                        {
                            code: "D",
                            rangeStart: "64%",
                            rangeEnd: "67%"
                        },
                        {
                            code: "D-",
                            rangeStart: "61%",
                            rangeEnd: "64%"
                        },
                        {
                            code: "F",
                            rangeStart: "0%",
                            rangeEnd: "61%"
                        }
                    ];
                    this.forms.voList = [
                        {
                            code: "A",
                            rangeStart: "94",
                            rangeEnd: "100"
                        },
                        {
                            code: "A-",
                            rangeStart: "90",
                            rangeEnd: "94"
                        },
                        {
                            code: "B+",
                            rangeStart: "87",
                            rangeEnd: "90"
                        },
                        {
                            code: "B",
                            rangeStart: "84",
                            rangeEnd: "87"
                        },
                        {
                            code: "B-",
                            rangeStart: "80",
                            rangeEnd: "84"
                        },
                        {
                            code: "C+",
                            rangeStart: "77",
                            rangeEnd: "80"
                        },
                        {
                            code: "C",
                            rangeStart: "74",
                            rangeEnd: "77"
                        },
                        {
                            code: "C-",
                            rangeStart: "70",
                            rangeEnd: "74"
                        },
                        {
                            code: "D+",
                            rangeStart: "67",
                            rangeEnd: "70"
                        },
                        {
                            code: "D",
                            rangeStart: "64",
                            rangeEnd: "67"
                        },
                        {
                            code: "D-",
                            rangeStart: "61",
                            rangeEnd: "64"
                        },
                        {
                            code: "F",
                            rangeStart: "0",
                            rangeEnd: "61"
                        }
                    ];
                }
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable no-new*/
</script>
<style scoped lang="less">
.course-detail {
    .seting_image {
        background-color: #cccccc;
        border: 1px solid #999999;
        width: 300px;
        height: 200px;
        display: inline-block;
        text-align: center;
        line-height: 200px;
    }

    .el-select {
        width: 100%;
    }

    .cover-image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }

    .courseDetails {
        width: 74%;
        margin-bottom: 4%;
    }

    .update_image {
        opacity: 0;
    }

    .seting_image:hover .update_image {
        opacity: 1;
    }

    .Scheme {
        color: #0e38b1;
        cursor: pointer;
        font-weight: normal;
    }

    .discription {
        font-size: 16px;
        font-family: ArialMT;
        color: rgba(153, 153, 153, 1);
    }
    .dialogTableVisibleDegree {
        /deep/ .el-dialog {
            width: 39%;
        }
    }
    .dialogFormVisibleDegree {
        /deep/ .el-dialog {
            width: 39%;
        }

        /deep/ .el-table .cell {
            line-height: 54px;
        }
    }

    /deep/ .el-table th.is-leaf {
        border-bottom: none;
    }

    /deep/ .el-table td {
        border-bottom: none;
    }

    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: white;
    }
    .range-table tr:first-child .range-span-span {
        display: none;
    }
    .range-span {
        position: absolute;
        left: -11px;
    }

    .range-input {
        position: relative;
        left: 3px;
        width: 70%;
    }
    .to-span {
        position: absolute;
        left: -11px;
    }
    .to-input {
        position: relative;
        left: 10px;
        width: 70%;
    }
    .icon-delete {
        font-size: 20px;
        position: relative;
        bottom: 10px;
        cursor: pointer;
    }
    .icon-add1 {
        font-size: 20px;
        position: relative;
        bottom: 10px;
        cursor: pointer;
    }
}
</style>
