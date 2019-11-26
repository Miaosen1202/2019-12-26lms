<template>
    <!--eslint-disable-->
    <div class="assignment-admit">
        <el-row>
            <el-col :span="18">
                <el-form
                    ref="form"
                    :model="form"
                    :label-width="labelWidth"
                    :rules="assignmentdetail"
                >
                    <el-form-item
                        :label="$t('message.Assignment_Name')"
                        prop="title"
                    >
                        <el-input v-model="form.title" maxlength="200" />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.ASSIGNMENT.description')"
                        prop="description"
                    >
                        <ckeditor
                            v-model="form.description"
                            :editor="editor"
                            :config="editorConfig"
                        />
                    </el-form-item>
                    <el-form-item
                        v-if="form.showScoreType != '5'"
                        :label="$t('message.Points')"
                        prop="score"
                    >
                        <el-input
                            v-model="form.score"
                            type="text"
                            step="0.00001"
                            class="assignment_point"
                            @mousewheel.native.prevent
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Assignment_Group')"
                        prop="assignmentGroupId"
                    >
                        <el-select
                            v-model="form.assignmentGroupId"
                            :popper-class="assignment_select"
                            :placeholder="$t('message.pls_select')"
                            @change="change()"
                        >
                            <el-tooltip
                                v-for="item in assignmentGroupList"
                                :key="item.id"
                                class="item"
                                effect="dark"
                                :content="item.name"
                                placement="top"
                                :disabled="item.name.length < 12"
                            >
                                <el-option
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-tooltip>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.gradeType')"
                        prop="gradeType"
                    >
                        <el-select
                            v-model="form.showScoreType"
                            :placeholder="$t('message.pls_select')"
                            @change="letterGrade"
                        >
                            <el-option
                                :label="$t('message.points')"
                                :value="2"
                            />
                            <el-option
                                :label="$t('message.percentage')"
                                :value="1"
                            />
                            <!--三四暂时不做-->
                            <el-option :label="$t('message.gpa')" :value="3" />
                            <el-option
                                :label="$t('message.letter')"
                                :value="4"
                            />
                            <el-option
                                :label="$t('message.notGrade')"
                                :value="5"
                            />
                        </el-select>
                        <span
                            class="grade-scheme"
                            v-if="gradeScheme"
                            @click="letterGradeScheme"
                            >{{ $t("message.ASSIGNMENT.Grading_Scheme") }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-show="form.showScoreType != '5'"
                        prop="isIncludeGrade"
                    >
                        <el-checkbox
                            v-model="form.isIncludeGrade"
                            :true-label="0"
                            :false-label="1"
                            :label="$t('message.Towards_Final')"
                        />
                    </el-form-item>
                    <el-form-item
                        v-show="form.showScoreType != '5'"
                        :label="$t('message.Submission_Type_Assignment')"
                        prop="submissionType"
                    >
                        <el-select
                            v-model="form.submissionType"
                            :placeholder="$t('message.pls_select')"
                            @change="submissionChange"
                        >
                            <el-option
                                :label="$t('message.On-line')"
                                :value="1"
                            />
                            <el-option
                                :label="$t('message.On_Paper')"
                                :value="2"
                            />
                            <el-option
                                :label="$t('message.No_submit')"
                                :value="4"
                            />
                        </el-select>
                        <div v-if="form.submissionType == 1">
                            <p style="font-weight: 600">
                                {{
                                    $t(
                                        "message.ASSIGNMENT.Online_Entry_Options"
                                    )
                                }}
                            </p>
                            <el-checkbox
                                v-model="form.allowText"
                                :true-label="1"
                                :false-label="0"
                                :label="$t('message.Text_input')"
                            />
                            <br />
                            <el-checkbox
                                v-model="form.allowUrl"
                                :true-label="1"
                                :false-label="0"
                                :label="$t('message.Website_URL')"
                            />
                            <br />
                            <el-checkbox
                                v-model="form.allowMedia"
                                :true-label="1"
                                :false-label="0"
                                :label="$t('message.Media_recording')"
                            />
                            <br />
                            <el-checkbox
                                v-model="form.allowFile"
                                :true-label="1"
                                :false-label="0"
                                :label="$t('message.File_upload')"
                            />
                            <div v-if="form.allowFile" class="checkbox_right">
                                <el-checkbox
                                    v-model="form.isSelectOfFile"
                                    :true-label="1"
                                    :false-label="0"
                                    :label="$t('message.Limit_upload')"
                                />
                                <div v-if="form.isSelectOfFile">
                                    <el-form-item prop="fileLimit">
                                        <el-input v-model="form.fileLimit" />
                                    </el-form-item>
                                    <span class="type_example">{{
                                        $t("message.selectFileTypeWarning")
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <!--如果是编辑 不允许换组-->
                    <el-form-item
                        v-show="form.showScoreType != '5'"
                        :label="$t('message.Group_Assignment')"
                    >
                        <el-checkbox
                            v-model="form.studyGroupSetIdChecked"
                            :label="$t('message.This_is_Group_Assignment')"
                            :disabled="!studyGroupEdited"
                            @change="studyGroupSetCheck"
                        />
                        <br />
                        <span v-if="!studyGroupEdited" style="color: red">{{
                            $t("message.This_is_Assignment_not_edit")
                        }}</span>
                        <div v-if="form.studyGroupSetIdChecked">
                            <el-select
                                v-model="form.studyGroupSetId"
                                :placeholder="$t('message.pls_select')"
                            >
                                <el-option
                                    v-for="(item, index) in studyGroupSetList"
                                    :key="index"
                                    :label="item.name"
                                    :disabled="!studyGroupEdited"
                                    :value="item.id"
                                />
                            </el-select>
                            <br />
                            <el-button
                                v-if="studyGroupEdited"
                                class="Create_Group_Set"
                                @click="createGroupSetHandler"
                            >
                                {{ $t("message.Create_Group_Set") }}
                            </el-button>
                            <v-group-set
                                :course-id="courseId"
                                :visible="studyGroupSetDialogVisible"
                                @closed="studyGroupSetClosed"
                                @added="loadStudyGroupSetList"
                            />
                        </div>
                    </el-form-item>
                    <div style="width: 80%">
                        <v-assign-to
                            :course-id="courseId"
                            :assign-list="assignList"
                            @removeAssignForm="removeAssignForm"
                            @sendToSelect="sendToSelect"
                            @addAssignForm="addAssignForm"
                        />
                    </div>
                    <el-form-item class="footer_father">
                        <el-button @click="callback">
                            {{ $t("message.Common_cancel") }}
                        </el-button>
                        <p class="footer_right">
                            <el-button
                                type="primary"
                                @click="Record('form', 1)"
                            >
                                {{ $t("message.Save_Publish") }}
                            </el-button>
                            <el-button type="primary" @click="Record('form')">
                                {{ $t("message.Save") }}
                            </el-button>
                        </p>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog
            title="Attention!"
            :visible.sync="dialogVisible3"
            width="30%"
            :before-close="handleClose"
        >
            <span>{{ $t("message.ASSIGNMENT.Not_all_sections") }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">{{
                    $t("message.ASSIGNMENT.go_back")
                }}</el-button>
                <el-button type="primary" @click="onSubmit(Recordnum)">{{
                    $t("message.ASSIGNMENT.continue")
                }}</el-button>
            </span>
        </el-dialog>
        <div>
            <el-dialog
                :title="
                    $t('message.ASSIGNMENT.Grading_Scheme_for_Letter_Grade')
                "
                :visible.sync="dialogTableVisible"
                style="min-width: 50%"
                class="dialogTableVisibleDegree"
            >
                <span class="discription">
                    {{
                        $t("message.ASSIGNMENT.This_grading_scheme_is_applied")
                    }}
                </span>
                <el-table :data="gridData">
                    <el-table-column
                        property="code"
                        :label="$t('message.ASSIGNMENT.Name')"
                        width="150"
                    />
                    <el-table-column
                        property="rangeEnd"
                        :label="$t('message.ASSIGNMENT.Range')"
                        width="200"
                    />
                    <el-table-column property="rangeStart" label="" />
                </el-table>
                <el-button
                    type="primary"
                    style="margin-left: 80%;margin-top: 20px"
                    @click="editForm"
                >
                    <span class="el-icon-edit" />
                    <span>{{ $t("message.ASSIGNMENT.Edit") }}</span>
                </el-button>
            </el-dialog>
            <el-dialog
                :title="$t('message.ASSIGNMENT.Grading_Scheme_for')"
                :visible.sync="dialogFormVisible"
                class="dialogFormVisibleDegree"
            >
                <span class="discription">
                    {{ $t("message.ASSIGNMENT.grading_and_grading_analysis") }}
                </span>
                <el-form ref="forms" :model="forms" :rules="rulesLetter">
                    <el-table
                        :data="forms.voList"
                        width="100%"
                        class="range-table"
                    >
                        <el-table-column label="Name" min-width="110">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'voList.' + scope.$index + '.code'"
                                >
                                    <el-input
                                        v-model="scope.row.code"
                                        style="width: 75%"
                                    />
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('message.ASSIGNMENT.Range')"
                            min-width="150"
                        >
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="
                                        'voList.' + scope.$index + '.rangeEnd'
                                    "
                                    :rules="rulesLetter.rangeEnd"
                                >
                                    <span class="range-span" style="">
                                        <span class="range-span-span"><</span>
                                    </span>
                                    <el-input
                                        v-model="scope.row.rangeEnd"
                                        class="range-input"
                                        style=""
                                    />
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
                                    :rules="rulesLetter.rangeStart"
                                >
                                    <span class="to-span" style="">{{
                                        $t("message.ASSIGNMENT.to")
                                    }}</span>
                                    <el-input
                                        v-model="scope.row.rangeStart"
                                        class="to-input"
                                        style=""
                                    />
                                    <span style="margin-left: 10px">%</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="">
                            <template slot-scope="scope">
                                <span
                                    class="iconfont icon-delete"
                                    @click="deleteDomain(scope.$index)"
                                />
                                <span
                                    class="iconfont icon-add1"
                                    @click="addDomain(scope.$index)"
                                />
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button
                        style="margin-left: 60%;margin-top: 20px"
                        @click="dialogFormVisible = false"
                        >{{ $t("message.Cancel") }}
                    </el-button>
                    <el-button
                        style="margin-top: 20px"
                        type="primary"
                        @click="gradeSchemeAdd('forms')"
                        >{{ $t("message.Save") }}
                    </el-button>
                </el-form>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import groupSet from "./people/studyGroupSet.vue";
import assignTo from "@/utils/assignTo.vue";
import baseValidater from "@/utils/baseValidater";

export default {
    components: {
        "v-group-set": groupSet,
        "v-assign-to": assignTo
    },
    /*eslint-disable*/
    data() {
        // const zhengNumber = (rule, value, callback) => {
        //     const boolean = new RegExp("^[1-9][0-9]*$").test(value); // 验证是否为正数
        //     if (!value) {
        //         callback(new Error("Please enter a score"));
        //     } else if (!boolean) {
        //         callback(new Error("Points possible can not be less than 0"));
        //     } else {
        //         if (String(value).indexOf(".") > -1) {
        //             callback(new Error("You can only put in positive Numbers"));
        //         } else if (Number(value) > 1000) {
        //             callback(new Error("Ponits should be no more than 1,000!"));
        //         }
        //         callback();
        //     }
        // };
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
        /*eslint-disable no-new*/
        return {
            assignment_select: "assignment_select",
            num1: 1,
            labelWidth: "180px",
            editor: ClassicEditor,
            showScoreType: 2,
            dialogVisible3: false,
            Recordnum: 0,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            assignList: [
                {
                    assignId: "",
                    assignType: "",
                    limitTime: "",
                    startTime: "",
                    endTime: "",
                    defaultSelect: ["_1_0"] // 选中的
                }
            ], // 默认数据
            assignmentdetail: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.ASSIGNMENT.titleRequired"),
                        trigger: "blur"
                    }
                ],
                score: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ASSIGNMENT.Points_possible_is_required"
                        ),
                        trigger: "blur"
                    },
                    { validator: baseValidater.pointValidate, trigger: "blur" }
                ],
                fileLimit: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ASSIGNMENT.Please_specify_at_least"
                        ),
                        trigger: "blur"
                    }
                ]
            },
            dataall: {
                courseId: 1,
                assign: {
                    assignId: 1,
                    assignType: 1
                }
            },
            form: {
                showScoreType: 2,
                courseId: "",
                title: "",
                description: "",
                score: "",
                assignmentGroupId: "",
                gradeSchemeId: "",
                isIncludeGrade: "",
                submissionType: 4,
                studyGroupSetId: "",
                toolUrl: "",
                isEmbedTool: "",
                allowText: "",
                allowUrl: "",
                allowMedia: "",
                allowFile: "",
                fileLimit: "",
                status: "",
                isSelectOfFile: false
            },
            studyGroupSetIdChecked: false,
            studyGroupSetDialogVisible: false,
            assignmentGroupList: [],
            studyGroupSetList: [],
            courseId: this.$route.query.courseId,
            assignmentGroupItemId: "",
            studyGroupEdited: true, // 可编辑
            isSelectOfFile: false,
            gridData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            forms: {
                voList: []
            },
            rulesLetter: {
                rangeStart: [
                    { required: true, validator: rangeStart, trigger: "blur" }
                ],
                rangeEnd: [
                    { required: true, validator: rangeEnd, trigger: "blur" }
                ]
            },
            startTime: [],
            gradeScheme: false
        };
    },
    /*eslint-disable*/
    watch: {
        "form.showScoreType": {
            handler(newV) {
                if (newV == "5") {
                    this.form.score = "";
                }
            },
            deep: true,
            immediate: true
        }
    },
    /*eslint-disable no-new*/
    created() {
        this.getAssignmentGroupList();
        this.loadStudyGroupSetList();
        if (this.$route.query.assignmentId) {
            // 编辑
            this.assignmentGroupItemId = this.$route.query.assignmentGroupItemId;
            this.$set(
                this.form,
                "assignmentGroupItemId",
                this.$route.query.assignmentGroupItemId
            );
            this.$set(this.form, "score", this.$route.query.score);
            this.getAssignment(
                this.$route.query.assignmentId,
                this.$route.query.score
            );
        } else {
            // 新建
            this.form.score = this.$route.query.score;
            this.form.title = this.$route.query.title;
            this.assignList[0].limitTime = this.$route.query.limitTime;
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm(this.$t("message.ASSIGNMENT.Confirm_closure"))
                .then(() => {
                    done();
                })
                .catch(() => {});
        },

        change() {
            this.$forceUpdate();
        },
        callback() {
            this.$refs.form.resetFields();
            this.$router.push({
                path: "assignments",
                query: { courseId: this.courseId }
            });
        },

        async getAssignment(assignmentId, assignmentScore) {
            const result = await this.$getData("/assignment/get", {
                data: assignmentId
            });
            if (Number(result.data.code) === 200) {
                if (typeof result.data.entity.studyGroupSetId === "undefined") {
                    result.data.entity.studyGroupSetId = "";
                } else {
                    this.studyGroupSetIdChecked = false;
                }
                this.form = result.data.entity;
                if (this.form.fileLimit.length > 0) {
                    this.$set(this.form, "isSelectOfFile", true);
                } else {
                    this.$set(this.form, "isSelectOfFile", false);
                }
                if (this.form.studyGroupSetId !== "") {
                    this.$set(this.form, "studyGroupSetIdChecked", true);
                }
                this.$set(
                    this.form,
                    "assignmentGroupId",
                    Number(this.$route.query.assignmentGroupId)
                );
                if (assignmentScore) {
                    this.form.score = assignmentScore;
                } else {
                    this.form.score = this.form.score / 100;
                }

                if (this.form.studyGroupSetId) {
                    this.studyGroupSetIdChecked = true;
                }
                // 回显 分配列表
                const { assigns } = result.data.entity;
                const assignList = [];
                assigns.forEach((v, index) => {
                    const as = {
                        assignId: "",
                        assignType: "",
                        limitTime: v.limitTime,
                        startTime: v.startTime,
                        endTime: v.endTime,
                        defaultSelect: [] // 选中的
                    };

                    if (Number(v.assignType) === 1) {
                        as.defaultSelect.push(`_1_${index}`);
                    } else {
                        as.defaultSelect.push(
                            `${v.assignId}_${v.assignType}_${index}`
                        );
                    }
                    assignList.push(as);
                });
                this.assignList =
                    assignList.length > 0 ? assignList : this.assignList;
                this.studyGroupEdited = result.data.entity.studyGroupEdited;
            } else {
                this.$message.error(result.data.message);
            }
        },
        studyGroupSetCheck(v) {
            if (!v) {
                this.form.studyGroupSetId = "";
            }
        },
        submissionChange(v) {
            if (Number(v) === 4) {
                this.form.allowText = "";
                this.form.allowUrl = "";
                this.form.allowMedia = "";
                this.form.allowFile = "";
                this.form.fileLimit = "";
                this.form.isSelectOfFile = "";
            }
        },
        removeAssignForm(index) {
            this.assignList.splice(index, 1);
        },

        sendToSelect(arr) {
            if (arr.length > 0) {
                const data = arr[0].split("_");
                this.assignList[data[2]].defaultSelect = arr;
            }
        },
        addAssignForm() {
            this.assignList.push({
                assignId: "",
                assignType: "",
                limitTime: "",
                startTime: "",
                endTime: "",
                defaultSelect: []
            });
        },
        async getAssignmentGroupList() {
            const result = await this.$getData(
                `/assignmentGroup/list?courseId=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                // 刷新子项
                this.assignmentGroupList = result.data.entity;
                if (this.$route.query.assignmentGroupIdfirst) {
                    this.$set(
                        this.form,
                        "assignmentGroupId",
                        Number(this.$route.query.assignmentGroupIdfirst)
                    );
                } else {
                    this.$set(
                        this.form,
                        "assignmentGroupId",
                        Number(this.$route.query.assignmentGroupId)
                    );
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        createGroupSetHandler() {
            this.studyGroupSetDialogVisible = !this.studyGroupSetDialogVisible;
        },
        async loadStudyGroupSetList() {
            const result = await this.$getData("/studyGroupSet/list", {
                courseId: this.courseId
            });
            if (Number(result.data.code) === 200) {
                this.studyGroupSetList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        studyGroupSetClosed() {
            this.studyGroupSetDialogVisible = false;
            this.loadStudyGroupSetList();
        },
        async Record(form, status) {
            this.$refs[form].validate(async valid => {
                if (valid) {
                    this.Recordnum = status;
                    if (
                        this.form.assignmentGroupId === "" ||
                        typeof this.form.assignmentGroupId === "undefined"
                    ) {
                        this.$message.error(
                            this.$t(
                                "message.ASSIGNMENT.assignmentGroupRequired"
                            )
                        );
                    } else {
                        const assign = [];
                        // 分配表单
                        this.assignList.forEach(v => {
                            if (v.defaultSelect.length > 0) {
                                v.defaultSelect.forEach(vv => {
                                    const as = {
                                        assignId: "",
                                        assignType: "",
                                        limitTime: v.limitTime,
                                        startTime: v.startTime,
                                        endTime: v.endTime
                                    };
                                    const data = vv.split("_"); // id_type
                                    [as.assignId, as.assignType] = [
                                        data[0],
                                        data[1]
                                    ];
                                    assign.push(as);
                                });
                            }
                        });
                        if (assign.length === 0) {
                            const as = {
                                assignType: 1 // all
                            };
                            assign.push(as);
                        }
                        const data = this.form;
                        data.assign = assign;
                        data.courseId = this.courseId;
                        data.showScoreType = this.form.showScoreType;
                        if (Number(status) === 1) {
                            data.status = status;
                        }
                        // 有id就是修改 没有就是新增
                        data.assignmentGroupItemId = this.assignmentGroupItemId;
                        if (Boolean(data.allowFile) === false) {
                            data.isSelectOfFile = false;
                            data.fileLimit = "";
                        } else if (Boolean(data.isSelectOfFile) === false) {
                            data.fileLimit = "";
                        }

                        this.dataall.courseId = this.courseId;
                        this.dataall.assign = data.assign;
                        const dataalls = this.dataall;
                        const result = await this.$getData(
                            "/assign/isAll",
                            dataalls,
                            "post"
                        );
                        if (Number(result.data.code) === 200) {
                            if (!result.data.entity.isAll) {
                                this.dialogVisible3 = true;
                            } else {
                                data.score =
                                    data.score === "" ||
                                    typeof data.score === "undefined"
                                        ? null
                                        : Number(data.score).toFixed(2) * 100;
                                const result = await this.$getData(
                                    "/assignment/add",
                                    data,
                                    "post"
                                );
                                if (Number(result.data.code) === 200) {
                                    const ids = result.data.message.split("_");
                                    this.$router.push({
                                        path: "assignmentPreView",
                                        query: {
                                            courseId: this.courseId,
                                            assignmentId: ids[0],
                                            assignmentGroupId:
                                                data.assignmentGroupId,
                                            assignmentGroupItemId: ids[1]
                                        }
                                    });
                                } else {
                                    data.score =
                                        data.score === "" ||
                                        typeof data.score === "undefined"
                                            ? null
                                            : data.score / 100;
                                }
                            }
                        } else {
                            this.$message.error(result.data.message);
                        }
                    }
                }
            });
        },
        async onSubmit(status) {
            this.dialogVisible3 = false;

            if (
                this.form.assignmentGroupId === "" ||
                typeof this.form.assignmentGroupId === "undefined"
            ) {
                this.$message.error(
                    this.$t("message.ASSIGNMENT.assignmentGroupRequired")
                );
            } else {
                const assign = [];
                // 分配表单
                this.assignList.forEach(v => {
                    if (v.defaultSelect.length > 0) {
                        v.defaultSelect.forEach(vv => {
                            const as = {
                                assignId: "",
                                assignType: "",
                                limitTime: v.limitTime,
                                startTime: v.startTime,
                                endTime: v.endTime
                            };
                            const data = vv.split("_"); // id_type
                            [as.assignId, as.assignType] = [data[0], data[1]];
                            assign.push(as);
                        });
                    }
                });
                // 如果没选的话 必须写一个默认的
                if (assign.length === 0) {
                    const as = {
                        assignType: 1 // all
                    };
                    assign.push(as);
                }
                const data = this.form;
                data.assign = assign;
                data.score =
                    data.score === "" || typeof data.score === "undefined"
                        ? 0
                        : Number(data.score).toFixed(2) * 100;
                data.courseId = this.courseId;
                data.showScoreType = this.form.showScoreType;
                if (Number(status) === 1) {
                    data.status = status;
                }
                // 有id就是修改 没有就是新增
                data.assignmentGroupItemId = this.assignmentGroupItemId;
                if (Boolean(data.allowFile) === false) {
                    data.isSelectOfFile = false;
                    data.fileLimit = "";
                } else if (Boolean(data.isSelectOfFile) === false) {
                    data.fileLimit = "";
                }
                const result = await this.$getData(
                    "/assignment/add",
                    data,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    const ids = result.data.message.split("_");
                    this.$router.push({
                        path: "assignmentPreView",
                        query: {
                            courseId: this.courseId,
                            assignmentId: ids[0],
                            assignmentGroupId: data.assignmentGroupId,
                            assignmentGroupItemId: ids[1]
                        }
                    });
                } else {
                    data.score =
                        data.score === "" || typeof data.score === "undefined"
                            ? 0
                            : data.score / 100;
                }
            }
        },
        letterGrade(val) {
            if (Number(val) === 4) {
                this.gradeScheme = true;
            } else {
                this.gradeScheme = false;
            }
        },
        letterGradeScheme() {
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
        async gradeSchemeAdd(forms) {
            this.$refs[forms].validate(async valid => {
                if (valid) {
                    if (Number(this.forms.voList.length) - 1 > 0) {
                        this.startTime = [];
                        this.forms.voList.every((currentValue, index, arr) => {
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
                        Number(this.forms.voList.length) - 1
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
.assignment-admit {
    .multiple-assign {
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 86%;
        word-break: break-all;
        word-wrap: break-word;
    }

    .addto {
        padding: 2%;
        margin-bottom: 2%;
    }

    .homework_detail {
        width: 80%;

        line-height: 50px;
    }

    .homework_form {
        width: 80%;
        margin-left: 103px;
    }

    .homework_form p {
        display: flex;
    }

    .homework_form p .label {
        width: 137px;
    }

    .homework_border {
        display: flex;
        margin-bottom: 15px;
    }

    .homework_border .label {
        width: 137px;
    }

    .homework_border_ff {
        width: 80%;
        border: 1px solid #ccc;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }

    .dess {
        text-align: center;
    }

    .checkblue {
        color: #0e38b1;
    }

    .homework_select {
        width: 100%;
    }

    .pro {
        margin-left: 10px;
    }

    .homework_text {
        line-height: 25px;
    }

    .homework_find {
        position: relative;
    }

    .find_right {
        position: absolute;
        right: 0;
        top: 5px;
    }

    .button_b1 {
        margin: 10px 0;
    }

    .homework_border_father {
        display: flex;
        justify-content: space-between;
    }

    .homework_border_left {
        width: 49%;
    }

    .homework_border_right {
        width: 49%;
    }

    .homework_border_p1 {
        position: relative;
    }

    .homework_border_p1 span {
        position: absolute;
        right: 0;
        top: 6px;
        border: 1px solid #ccc;
        height: 28px;
        padding: 0 5px;
    }
    .text_right {
        text-align: right;
    }

    .button_father {
        display: flex;
        justify-content: space-between;
        padding-left: 182px;
    }
    .homework_border_data {
        width: 100%;
    }

    .homework_name {
        width: 80%;
        margin-left: 103px;
    }

    .mini {
        width: 50px;
    }

    .newsgroup {
    }

    .newsgroup p {
    }

    .newsgroup p label {
        display: inline-block;
        width: 90px;
        margin-right: 10px;
        text-align: right;
    }

    .groupname {
        width: 300px;
    }

    .margin_right {
        margin-right: 10px;
    }

    .typemarginleft {
        margin-left: 30px;
    }

    .Tips {
        color: #969896;
        margin-left: 7px;
    }

    .checkbox_right {
        padding-left: 20px;
    }

    .final_grade {
        margin-left: 150px;
        padding: 8px;
        background: #b3d4fc;
        color: #0077aa;
        font-weight: bolder;
        border-radius: 7px;
    }

    .Create_Group_Set {
        margin-top: 10px;
    }

    /deep/ .el-dropdown-menu {
        overflow: hidden;
    }

    .footer_father {
        position: relative;
    }

    .footer_right {
        position: absolute;
        right: 36%;
        top: 0;
    }

    .checkbox_right .type_example {
        display: inline-block;
        margin-top: 15px;
    }

    .assignment_point {
        width: 193px;
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
    /deep/.el-table th.is-leaf {
        border-bottom: none;
    }
    /deep/.el-table td {
        border-bottom: none;
    }
    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: white;
    }
    /*.range-span :nth-of-type(1) {*/
    /*display: none !important;*/
    /*}*/
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
    .grade-scheme {
        color: #0e38b1;
        cursor: pointer;
    }
}
</style>
