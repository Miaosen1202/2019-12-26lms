<template>
    <!--eslint-disable-->
    <div class="studentDiscussions">
        <div v-show="discussionStepTwo" class="discussionStepTwo">
            <el-row>
                <el-col :span="18" style="">
                    <el-form
                        ref="ruleform"
                        :rules="rules"
                        :model="ruleform"
                        label-width="180px"
                        :label-position="'right'"
                    >
                        <el-row>
                            <el-col :span="23">
                                <el-form-item
                                    prop="title"
                                    style=""
                                    class="el-form-item_content"
                                    label-width="0px"
                                >
                                    <el-input
                                        v-model="ruleform.title"
                                        style=""
                                        :placeholder="$t('message.Topic_Title')"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <div class="editor">
                                    <ckeditor
                                        v-model="content"
                                        :editor="editor"
                                        :config="editorConfig"
                                    />
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item
                                    v-show="postTo"
                                    v-if="!gradeType1"
                                    :label="$t('message.Post_to')"
                                    style=""
                                    multiple
                                    style="margin-top: 20px;"
                                    prop="postTo"
                                >
                                    <el-select
                                        v-model="postSections"
                                        :placeholder="
                                            $t('message.Common_please_select')
                                        "
                                        multiple
                                        style="width: 87%"
                                        @change="selectChange"
                                    >
                                        <el-option
                                            v-for="item in postToSection"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item
                            :label="$t('message.Attachment')"
                            style="margin-top: 10px"
                        >
                            <el-upload
                                style="display: inline-block"
                                class="upload-demo"
                                :action="upload"
                                :file-list="file"
                                :on-success="uploadSuccess"
                                :before-upload="beforeFileUpload"
                                accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,.mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                            >
                                <el-button type="primary">
                                    {{ $t("message.upload") }}
                                </el-button>
                            </el-upload>
                            <br />
                            <a :href="getAbsolutePath(fileId)" target="_blank">
                                {{ originName }}</a
                            >
                            <i
                                v-if="fileId"
                                style="cursor: pointer"
                                class="el-tag__close el-icon-close"
                                @click="uploadClose"
                            />

                            <a
                                v-show="
                                    Number(typeEdit) === 1 &&
                                        fileName &&
                                        !fileId
                                "
                                :href="getAbsolutePath(fileUrl)"
                                target="_Blank"
                            >
                                {{ fileName }}
                            </a>
                            <i
                                v-show="
                                    Number(typeEdit) === 1 &&
                                        fileName &&
                                        !fileId
                                "
                                style="cursor: pointer"
                                class="el-tag__close el-icon-close"
                                @click="uploadClose"
                            />
                        </el-form-item>

                        <el-form-item
                            :label="$t('message.Optionss')"
                            style=""
                            prop="isGrade"
                        >
                            <el-checkbox
                                v-model="ruleform.isGrade"
                                :disabled="
                                    postSections[0] != 0 ||
                                        (isSubmited > 0 && typeEdit == 1)
                                "
                                :label="$t('message.Graded')"
                                name="isGrade"
                                @change="disoption"
                            /><br />
                        </el-form-item>
                        <span
                            v-if="isSubmited > 0 && typeEdit == 1"
                            style="color: red;margin-left: 21%"
                            >{{
                                $t("message.Students_have_already_submitted")
                            }}</span
                        >
                        <el-form-item
                            :label="$t('message.Group_Discussion')"
                            style=""
                        >
                            <div class="multiple-attempts">
                                <el-checkbox
                                    v-model="gradeType1"
                                    :disabled="
                                        postSections[0] != 0 ||
                                            (isSubmited > 0 && typeEdit == 1)
                                    "
                                    @change="groupChange(gradeType1)"
                                >
                                    {{
                                        $t("message.This_is_a_group_discussion")
                                    }}
                                </el-checkbox>
                                <div v-show="gradeType1">
                                    <p style="margin-left: 24px;color:gray;">
                                        {{ $t("message.Group_Sets") }}
                                    </p>
                                    <el-form-item
                                        label=""
                                        prop="studyGroupSetId"
                                        style=""
                                        class="studygroup"
                                    >
                                        <el-select
                                            :popper-class="discussion_select"
                                            v-model="ruleform.studyGroupSetId"
                                            :disabled="
                                                isSubmited > 0 && typeEdit == 1
                                            "
                                            placeholder="Please select group"
                                            style="width: 90%;margin-left: 24px"
                                        >
                                            <el-option
                                                v-for="item in classGroup"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            />
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        style="margin-left: 24px;margin-top: 19px"
                                    >
                                        <el-button
                                            icon="el-icon-circle-plus-outline"
                                            @click="
                                                studyGroupSetEditDialogVisible = true
                                            "
                                        >
                                            {{
                                                $t("message.New_Group_Category")
                                            }}
                                        </el-button>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-show="pointsPossible"
                            :label="$t('message.Points_Possible')"
                            style=""
                            prop="score"
                        >
                            <el-input
                                v-model="ruleform.score"
                                style="width: 12%"
                                type="number"
                                step="0.00001"
                                @mousewheel.native.prevent
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            v-show="displayGradeas"
                            style=""
                            :label="$t('message.Display_Grade_as')"
                            prop="region"
                        >
                            <el-select
                                v-model="ruleform.gradeType"
                                placeholder="Please select"
                                style="width: 35%"
                            >
                                <el-option label="points" :value="1">
                                    {{ $t("message.points") }}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            v-show="assignmentGroup1"
                            :label="$t('message.Assignment_Group')"
                            prop="assignmentGroupId"
                            style=""
                        >
                            <el-select
                                :popper-class="discussion_select"
                                v-model="ruleform.assignmentGroupId"
                                placeholder=""
                                style="width: 35%"
                            >
                                <el-option label="" value="">
                                    <div @click="dialogAssignmentCreate = true">
                                        [{{
                                            $t(
                                                "message.Create_assignment_group"
                                            )
                                        }}]
                                    </div>
                                </el-option>
                                <el-option
                                    v-for="item in assignmentGroup"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <v-assign-to
                            v-show="assignTo"
                            :course-id="courseId"
                            :assign-list="assign"
                            @removeAssignForm="removeAssignForm"
                            @sendToSelect="sendToSelect"
                            @addAssignForm="addAssignForm"
                        />
                        <el-form-item
                            v-show="availableFrom"
                            :label="$t('message.Available_from')"
                            style=""
                        >
                            <el-date-picker
                                v-model="startTime"
                                type="datetime"
                                :placeholder="$t('message.Select_a_date')"
                                style="width: 35%"
                            />
                        </el-form-item>
                        <el-form-item
                            v-show="until"
                            :label="$t('message.Until')"
                            style=""
                        >
                            <el-date-picker
                                v-model="endTime"
                                type="datetime"
                                :placeholder="$t('message.Select_a_date')"
                                style="width: 35%"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button style="" @click="editorcancel">
                                {{ $t("message.Cancel") }}
                            </el-button>
                            <div style="float: right;margin-right: 14%">
                                <el-button
                                    v-if="typeEdit != '1'"
                                    style=""
                                    @click="discussionPublish('ruleform')"
                                >
                                    {{ $t("message.Save&Publish") }}
                                </el-button>
                                <el-button
                                    v-if="typeEdit != '1'"
                                    type="primary"
                                    style=""
                                    @click="onSubmit('ruleform')"
                                >
                                    {{ $t("message.Save") }}
                                </el-button>
                                <el-button
                                    v-if="typeEdit === '1'"
                                    type="primary"
                                    @click="editSavePublish('ruleform')"
                                >
                                    {{ $t("message.Save&Publish") }}
                                </el-button>
                                <el-button
                                    v-if="typeEdit === '1'"
                                    type="primary"
                                    @click="editSave('ruleform')"
                                >
                                    {{ $t("message.Save") }}
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div>
                <v-group-set
                    v-show="studyGroupSetEditDialogVisible"
                    :course-id="courseId"
                    :update-study-group-set="currentEditStudyGroupSet"
                    :visible="studyGroupSetEditDialogVisible"
                    @closed="studyGroupSetClosed"
                    @added="groupSetAdded"
                    @updated="loadStudyGroupSetList"
                />
                <el-dialog
                    :title="$t('message.Add_assignment_group')"
                    :visible.sync="dialogAssignmentCreate"
                >
                    <el-form
                        ref="groupForm"
                        :model="groupForm"
                        :rules="rule"
                        label-width="100px"
                    >
                        <el-form-item
                            :label="$t('message.Names')"
                            prop="assignmentName"
                        >
                            <el-input
                                v-model="groupForm.assignmentName"
                                autocomplete="off"
                                style="width: 80%"
                            />
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAssignmentCreate = false">
                            {{ $t("message.Cancel") }}
                        </el-button>
                        <el-button
                            type="primary"
                            @click="assignmentCreate('groupForm')"
                        >
                            {{ $t("message.Add_Group") }}
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";
import assignTo from "@/utils/assignTo.vue";
import commonRight from "@/utils/right/commonRight.vue";
import groupSet from "../people/studyGroupSet.vue";
import defaultHead from "../../../../static/images/touxiang1.png";
import baseValidater from "@/utils/baseValidater";

export default {
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    components: {
        "v-assign-to": assignTo,
        commonRight,
        "v-group-set": groupSet
    },
    data() {
        const isGrades = (rule, value, callback) => {
            if (this.ruleform.isGrade) {
                if (!this.ruleform.assignmentGroupId) {
                    callback(
                        new Error(
                            this.$t(
                                "message.Please_select_the_assignment_group"
                            )
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const zhengNumber = (rule, value, callback) => {
            const tempValue = String(value).trim();
            if (this.ruleform.isGrade) {
                if (tempValue) {
                    const isDigital = isNaN(Number(tempValue));
                    if (!isDigital) {
                        const tempNum = Number(tempValue);
                        if (tempNum < 0 || tempNum > 1000) {
                            callback(
                                new Error(
                                    this.$t(
                                        "message.The_value_of_possible_points_for"
                                    )
                                )
                            );
                        } else {
                            callback();
                        }
                    } else {
                        callback(
                            new Error(
                                this.$t(
                                    "message.Points_possible_must_be_a_number"
                                )
                            )
                        );
                    }
                } else {
                    callback(
                        new Error(this.$t("message.Points_possible_is_require"))
                    );
                }
            } else {
                callback();
            }
        };
        const postRules = (rule, value, callback) => {
            if (!this.ruleform.isGrade) {
                if (this.ruleform.postTo.length == 0) {
                    callback(new Error("李孟雪哈哈哈"));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const studyGroup = (rule, value, callback) => {
            if (this.gradeType1) {
                if (!this.ruleform.studyGroupSetId) {
                    callback(
                        new Error(
                            this.$t("message.Please_select_a_study_group")
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            rules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.Please_enter_the_title"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        trigger: "blur"
                    }
                ],
                assignmentGroupId: [
                    { required: true, validator: isGrades, trigger: "change" }
                ],
                score: [
                    { required: true, validator: zhengNumber, trigger: "blur" }
                ],
                postTo: [
                    {
                        required: true,
                        validator: postRules,
                        message: this.$t("message.A_section_is_required"),
                        trigger: "blur"
                    }
                ],
                studyGroupSetId: [
                    { required: true, validator: studyGroup, trigger: "blur" }
                ]
            },
            rule: {
                assignmentName: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Please_enter_the_homework_team"
                        ),
                        trigger: "blur"
                    }
                ]
            },
            discussion_select: "discussion_select",

            defaultHead,
            studyGroupSetEditDialogVisible: false,
            currentEditStudyGroupSet: null,
            fileList: [],
            assetsTy: "1",
            avatarUrl: "",
            courseId: this.$route.query.courseId,
            selectedAssign: [],
            settingId: "",
            groupForm: {
                assignmentName: ""
            },
            activeId: "",
            s: "",
            upload: `${process.env.NODE_ENV}/upload`,
            file: [],
            assign: [
                {
                    assignId: "",
                    assignType: "",
                    limitTime: "",
                    startTime: "",
                    endTime: "",
                    defaultSelect: ["_1_0"] // 选中的
                }
            ],
            startTime: "",
            endTime: "",
            postSections: "",
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            splitStudents: true,
            createGroupsManually: true,
            createGroupsNow: false,
            limitGroups: false,
            pointsPossible: false,
            displayGradeas: false,
            assignmentGroup1: false,
            leaderShip: false,
            requireGroupmembers: false,
            assignTo: false,
            availableFrom: true,
            until: true,
            postTo: true,
            multipleSelection: [],
            selected: {},
            section: {},
            postToSection: [],
            classGroup: {},
            assignmentGroup: {},
            value: [],
            dialogFormVisible: false,
            dialogAssignmentCreate: false,
            discussionStepOne: false,
            discussionStepTwo: true,
            discussionStepThree: false,
            discussionStepFour: false,
            discussionStepFive: false,
            centerDialogVisible: false,
            //* ******新建讨论表单采集start*********
            // title:'',
            content: "",
            gradeType1: "",
            fileId: "",
            originName: "",
            ruleform: {
                title: "",
                assignId: "",
                isGrade: false,
                studyGroupSetId: "",
                gradeType: "",
                score: "",
                displayGradeas: "",
                assignmentGroupId: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                region1: "",
                postTo: []
            },
            createGroupForm: {
                name: "",
                allowSelfSignup: "",
                isSectionGroup: "",
                createNGroup: "",
                groupMemberNumber: "",
                leaderSetStrategy: ""
            },
            leaderSetStrategy: 1,
            //* ******新建讨论表单采集end*********
            //* ******讨论列表start*********
            isRead: "",
            id: "",
            pageIndex: 1,
            pageSize: 10,
            totalCount: 20,
            //* ******讨论列表end*********
            //* ******讨论设置start********
            allowMarkPostStatus: "",
            allowStudentCreateDiscussion: "",
            allowStudentEditDiscussion: "",
            allowDiscussionAttachFile: "",
            //* ******讨论设置end********
            //* ******筛选参数处理start******
            ruleformlist: {
                title: "",
                isRead: ""
            },
            //* ******筛选参数处理end******
            //* ******列表详情start******
            contentReplyDetail: "",
            contentReplyDetailChildren: "",
            edit: false,
            editchildren: false,
            replyId: "",
            ids: "",
            index: "",
            rows: "",
            score: "",
            titleDetail: "",
            contentDetail: "",
            createTimeDetail: "",
            nameDetail: "",
            collapsedetail: "",
            replyTotal: "",
            replyNotReadTotal: "",
            //* ******列表详情end******
            //* ******小组列表详情start********
            groupScore: "",
            groupmaxDueTime: "",
            groupreplyTotal: "",
            groupreplyNotReadTotal: "",
            groupCreateTime: "",
            groupName: "",
            groupTitle: "",
            groupContent: "",
            groupItemName: "",
            //* ******小组列表详情end********
            activeName: "first",
            tableData: [],
            titlemain: "",
            discussionId: "",
            typeEdit: "",
            fileUrl: "",
            fileName: "",
            isSubmited: ""
        };
    },
    computed: {
        uploadDisabled() {
            return this.fileList.length >= 1;
        }
    },
    watch: {
        postSections(val) {
            this.ruleform.postTo = val;
            console.log(
                "postTo",
                this.ruleform.postTo,
                this.ruleform.postTo.length
            );
        }
    },
    mounted() {
        this.sections();
        this.classGroups();
        this.assignmentGroups();
        this.editForm();
        this.assignmentMoreOption();
    },
    created() {
        this.loadStudyGroupSetList();
    },
    methods: {
        getAbsolutePath(relativePath, width, height) {
            if (relativePath == undefined) return defaultHead;
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        groupChange(gradeType1) {
            if (gradeType1 == false) {
                this.ruleform.studyGroupSetId = "";
            }
        },
        studyGroupSetClosed() {
            this.studyGroupSetEditDialogVisible = false;
            this.currentEditStudyGroupSet = null;
        },
        groupSetAdded(groupSet) {
            this.classGroups();
            this.loadStudyGroupSetList(`group_set_${groupSet.id}`);
        },
        async loadStudyGroupSetList(active) {
            const result = await this.$getData("/studyGroupSet/list", {
                courseId: this.courseId,
                includeStudentGroupSet: 1
            });
            if (result.data.code == 200) {
                this.studyGroupSetList = result.data.entity;

                if (active) {
                    console.log("active", active);
                    this.activeTabName = active;
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        removeAssignForm(index) {
            this.assign.splice(index, 1);
        },
        sendToSelect(arr) {
            if (arr.length > 0) {
                // 19_2_0; ["id_type_index"]
                const data = arr[0].split("_");
                this.assign[data[2]].defaultSelect = arr;
            }
        },
        addAssignForm() {
            this.assign.push({
                assignId: "",
                assignType: "",
                limitTime: "",
                startTime: "",
                endTime: "",
                defaultSelect: []
            });
        },
        selectChange(val) {
            if (
                val.length >= 2 &&
                val.indexOf(0) > -1 &&
                val.indexOf(0) < val.length - 1
            ) {
                // console.log(111111111111)
                const _index = val.indexOf(0);
                val = val.splice(_index, 1);
            } else if (val.length >= 2 && val.indexOf(0) == val.length - 1) {
                this.postSections = [0];
            }
        },
        test(event) {
            event.stopPropagation();
        },
        testly() {
            this.centerDialogVisible = true;
            // console.log('hahahaha')
        },
        assignmentMoreOption() {
            if (this.$route.query.moreOption == 1) {
                this.postSections = [0];
                this.ruleform.title = this.$route.query.names;
                this.ruleform.score = this.$route.query.score / 100;
                this.ruleform.isGrade = Boolean(this.$route.query.isGrade);
                this.ruleform.assignmentGroupId = this.$route.query.assignmentGroupId;
                this.pointsPossible = true;
                this.displayGradeas = true;
                this.assignmentGroup1 = true;
                this.assignTo = true;
                this.availableFrom = false;
                this.until = false;
                this.postTo = false;
            }
        },
        editForm() {
            const that = this;
            that.discussionId = that.$route.query.discussionId;
            const b = that.$route.query.courseId;
            that.typeEdit = that.$route.query.type;
            if (that.typeEdit === "1") {
                that.$http
                    .get(`${process.env.NODE_ENV}/discussion/get`, {
                        params: { data: that.discussionId }
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.ruleform.title = res.data.entity.title;
                            this.content = res.data.entity.content;
                            this.ruleform = res.data.entity;
                            this.ruleform.isGrade = Boolean(
                                res.data.entity.isGrade
                            );
                            this.ruleform.score = res.data.entity.score / 100;
                            this.gradeType1 = Boolean(
                                res.data.entity.studyGroupSetId
                            );
                            this.$set(
                                this.ruleform,
                                "studyGroupSetId",
                                res.data.entity.studyGroupSetId
                            );
                            if (res.data.entity.isSubmited != "") {
                                this.isSubmited = res.data.entity.isSubmited;
                            }
                            const assigns = res.data.entity.assign;
                            this.avatarUrl = res.data.entity.author.avatarUrl;
                            if (res.data.entity.attachmentFile) {
                                this.fileUrl =
                                    res.data.entity.attachmentFile.fileUrl;
                                this.fileName =
                                    res.data.entity.attachmentFile.fileName;
                            }
                            if (res.data.entity.isGrade == 1) {
                                this.pointsPossible = true;
                                this.displayGradeas = true;
                                this.assignmentGroup1 = true;
                                this.assignTo = true;
                                this.availableFrom = false;
                                this.until = false;
                                this.postTo = false;
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

                                    if (v.assignType == 1) {
                                        as.defaultSelect.push(`_1_${index}`);
                                    } else {
                                        as.defaultSelect.push(
                                            `${v.assignId}_${v.assignType}_${index}`
                                        );
                                    }
                                    assignList.push(as);
                                });

                                this.assign =
                                    assignList.length > 0
                                        ? assignList
                                        : this.assign;
                                assigns.forEach((assign, index) => {
                                    this.postSections.push(assign.assignId);
                                    this.startTime = assign.startTime;
                                    this.endTime = assign.endTime;
                                });
                            } else {
                                assigns.forEach((assign, index) => {
                                    this.postSections.push(assign.assignId);
                                    this.startTime = assign.startTime;
                                    this.endTime = assign.endTime;
                                });
                            }
                        }
                    });
            }
        },
        editSave(ruleform) {
            const that = this;
            const a = that.$route.query.discussionId;
            let disAssigns = [];
            if (this.ruleform.isGrade) {
                const assign = [];
                // 分配表单
                this.assign.forEach(v => {
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
                            as.assignId = data[0]; // all
                            as.assignType = data[1]; // all
                            assign.push(as);
                        });
                    }
                });
                // 如果没选的话 必须写一个默认的
                if (assign.length == 0) {
                    const as = {
                        assignType: 1 // all
                    };
                    assign.push(as);
                }
                disAssigns = assign;
            } else {
                for (let i = 0; i < this.postSections.length; i++) {
                    disAssigns.push({
                        assignType: this.postSections[i] == 0 ? 1 : 2,
                        assignId: this.postSections[i],
                        startTime: new Date(this.startTime).getTime(),
                        endTime: new Date(this.endTime).getTime()
                    });
                }
            }
            let studyGroupSetIds = "";
            if (this.gradeType1 == false) {
                studyGroupSetIds = "";
            } else {
                studyGroupSetIds = this.ruleform.studyGroupSetId;
            }
            const params = {
                id: that.discussionId,
                courseId: that.courseId,
                title: this.ruleform.title,
                content: this.content,
                type: 1,
                studyGroupSetId: studyGroupSetIds,
                fileId: this.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: Number(this.ruleform.score).toFixed(2) * 100,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 0,
                assign: disAssigns
            };
            this.$refs[ruleform].validate(valid => {
                if (valid) {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/discussion/modify`,
                            params
                        )
                        .then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.assign = "";
                                this.$router.push({
                                    path:
                                        "/homePage/allCourse/discussionCreateList",
                                    query: { courseId: this.courseId }
                                });
                            }
                        });
                }
            });
        },
        editSavePublish(ruleform) {
            const that = this;
            const a = that.$route.query.discussionId;
            let disAssigns = [];
            if (this.ruleform.isGrade) {
                // for (let i = 0; i < this.assign.length; i++) {
                //   let ass = this.assign[i]
                //   let arr = ass.assignId.split('_')
                //   disAssigns.push({
                //     assignType: arr[0],
                //     assignId: arr[1],
                //     startTime: new Date(ass.startTime).getTime(),
                //     endTime: new Date(ass.endTime).getTime(),
                //     limitTime:new Date(ass.limitTime).getTime(),
                //   })
                // }
                const assign = [];
                // 分配表单
                this.assign.forEach(v => {
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
                            as.assignId = data[0]; // all
                            as.assignType = data[1]; // all
                            assign.push(as);
                        });
                    }
                });
                // 如果没选的话 必须写一个默认的
                if (assign.length == 0) {
                    const as = {
                        assignType: 1 // all
                    };
                    assign.push(as);
                }
                disAssigns = assign;
            } else {
                for (let i = 0; i < this.postSections.length; i++) {
                    disAssigns.push({
                        assignType: this.postSections[i] == 0 ? 1 : 2,
                        assignId: this.postSections[i],
                        startTime: new Date(this.startTime).getTime(),
                        endTime: new Date(this.endTime).getTime()
                    });
                }
            }
            let studyGroupSetIds = "";
            if (this.gradeType1 == false) {
                studyGroupSetIds = "";
            } else {
                studyGroupSetIds = this.ruleform.studyGroupSetId;
            }
            const params = {
                id: that.discussionId,
                courseId: that.courseId,
                title: this.ruleform.title,
                content: this.content,
                type: 1,
                studyGroupSetId: studyGroupSetIds,
                fileId: this.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: Number(this.ruleform.score).toFixed(2) * 100,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 1,
                assign: disAssigns
            };
            this.$refs[ruleform].validate(valid => {
                if (valid) {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/discussion/modify`,
                            params
                        )
                        .then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.$router.push({
                                    path:
                                        "/homePage/allCourse/discussionCreateList",
                                    query: { courseId: this.courseId }
                                });
                            }
                        });
                }
            });
        },
        uploadClose() {
            this.fileId = "";
            this.originName = "";
            this.fileUrl = "";
            this.fileName = "";
        },
        uploadSuccess(response, file, fileList) {
            this.fileList = fileList;
            response.entity.forEach((item, index) => {
                this.fileId = item.fileId;
                this.originName = item.originName;
                console.log(this.fileId);
            });
            this.$message({
                showClose: true,
                message: this.$t("message.Certification.Upload_successfully"),
                type: "success"
            });
        },
        beforeFileUpload(file) {
            const isLitSize = file.size / 1024 / 1024 < 400;
            if (!isLitSize) {
                this.$message({
                    message: this.$t("message.File_size_exceeds_quota"),
                    type: "warning"
                });
            }
            return isLitSize;
        },
        allSelfSignUp() {
            this.createGroupsNow = !this.createGroupsNow;
            this.limitGroups = !this.limitGroups;
            this.leaderShip = !this.leaderShip;
            this.splitStudents = !this.splitStudents;
            this.createGroupsManually = !this.createGroupsManually;
        },
        splitStudent() {
            this.requireGroupmembers = !this.requireGroupmembers;
            this.leaderShip = !this.leaderShip;
        },
        openCenterDialogVisible() {
            const that = this;
            that.centerDialogVisible = true;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionConfig/get`, {
                    params: { data: that.courseId }
                })
                .then(res => {
                    // console.log(res.data.entity.id);
                    this.settingId = res.data.entity.id;
                });
            that.$http
                .get(`${process.env.NODE_ENV}/userConfig/get`, {
                    params: { data: that.courseId }
                })
                .then(res => {
                    // console.log(res);
                });
        },
        // 初始化班级列
        sections() {
            const that = this;
            that.courseId = that.$route.query.courseId;
            // console.log('5555',that.courseId)
            that.$http
                .get(`${process.env.NODE_ENV}/assign/get`, {
                    params: { data: that.courseId }
                })
                .then(res => {
                    const tmp = [];
                    tmp.push({
                        label: "All",
                        options: [
                            {
                                type: 1,
                                id: 0,
                                name: "ALL"
                            }
                        ]
                    });
                    tmp.push({
                        label: "班级",
                        options: res.data.entity.sections
                    });
                    tmp.push({
                        label: "学生",
                        options: res.data.entity.users
                    });
                    that.section = tmp;
                    console.log("aaa", that.section);
                    this.postToSection.push({
                        id: 0,
                        type: 1,
                        name: "ALL sections"
                    });
                    for (let i = 0; i < res.data.entity.sections.length; i++) {
                        this.postToSection.push(res.data.entity.sections[i]);
                    }
                });
        },
        // 初始作业小组列表
        assignmentGroups() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: { courseId: that.courseId }
                })
                .then(res => {
                    that.assignmentGroup = res.data.entity;
                });
        },
        // 添加作业小组
        assignmentCreate(groupForm) {
            this.$refs[groupForm].validate(valid => {
                if (valid) {
                    this.dialogAssignmentCreate = false;
                    const that = this;
                    that.$http
                        .post(`${process.env.NODE_ENV}/assignmentGroup/add`, {
                            courseId: that.courseId,
                            weight: 100,
                            name: this.groupForm.assignmentName
                        })
                        .then(res => {
                            that.assignmentGroups();
                            that.groupForm.assignmentName = "";
                        });
                }
            });
        },
        // 初始化小组集列表
        classGroups() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/studyGroupSet/list`, {
                    params: { courseId: that.courseId }
                })
                .then(res => {
                    that.classGroup = res.data.entity;
                });
        },
        // 创建小组集列表
        newGroupCategory(formName) {
            const that = this;
            that.dialogFormVisible = false;
            const params = {
                courseId: that.courseId,
                name: this.createGroupForm.name,
                allowSelfSignup: Number(this.createGroupForm.allowSelfSignup),
                isSectionGroup: Number(this.createGroupForm.isSectionGroup),
                createNGroup: this.createGroupForm.createNGroup,
                groupMemberNumber: this.createGroupForm.groupMemberNumber,
                leaderSetStrategy: this.createGroupForm.leaderSetStrategy
            };
            that.$http
                .post(`${process.env.NODE_ENV}/studyGroupSet/add`, params)
                .then(res => {
                    that.classGroup = res.data.entity;
                    this.createGroupForm.name = "";
                    this.createGroupForm.allowSelfSignup = "";
                    this.createGroupForm.isSectionGroup = "";
                    this.createGroupForm.createNGroup = "";
                    this.createGroupForm.groupMemberNumber = "";
                    this.createGroupForm.leaderSetStrategy = "";
                    this.classGroups();
                });
        },
        // 控制分配的显示与隐藏
        disoption() {
            this.pointsPossible = !this.pointsPossible;
            this.displayGradeas = !this.displayGradeas;
            this.assignmentGroup1 = !this.assignmentGroup1;
            this.assignTo = !this.assignTo;
            this.availableFrom = !this.availableFrom;
            this.until = !this.until;
            this.postTo = !this.postTo;
        },
        // 删除分配列表
        editRemoveDomain(item) {
            const index = this.assign.indexOf(item);
            if (index !== -1) {
                this.assign.splice(index, 1);
            }
        },
        // 增加分配列表
        editAddDomain() {
            // console.log('=================================')
            this.assign.push({
                value: "",
                key: Date.now()
            });
        },
        // 创建讨论并发布
        discussionPublish(ruleform) {
            console.log(ruleform);
            const that = this;
            let disAssigns = [];
            if (this.ruleform.isGrade) {
                const assign = [];
                // 分配表单
                this.assign.forEach(v => {
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
                            as.assignId = data[0]; // all
                            as.assignType = data[1]; // all
                            assign.push(as);
                        });
                    }
                });
                // 如果没选的话 必须写一个默认的
                if (assign.length == 0) {
                    const as = {
                        assignType: 1 // all
                    };
                    assign.push(as);
                }
                disAssigns = assign;
            } else {
                for (let i = 0; i < this.postSections.length; i++) {
                    disAssigns.push({
                        assignType: this.postSections[i] == 0 ? 1 : 2,
                        assignId: this.postSections[i],
                        startTime: this.startTime,
                        endTime: this.endTime
                    });
                }
            }
            let studyGroupSetIds = "";
            if (this.gradeType1 == false) {
                studyGroupSetIds = "";
            } else {
                studyGroupSetIds = this.ruleform.studyGroupSetId;
            }
            const params = {
                courseId: that.courseId,
                title: this.ruleform.title,
                content: this.content,
                type: 1,
                studyGroupSetId: studyGroupSetIds,
                fileId: this.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: Number(this.ruleform.score).toFixed(2) * 100,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 1,
                assign: disAssigns
            };
            this.$refs[ruleform].validate(async valid => {
                if (valid) {
                    const result = await this.$getData(
                        "/discussion/add",
                        params,
                        "post"
                    );
                    if (result.data.code == 200) {
                        this.$router.push({
                            path: "/homePage/allCourse/discussionCreateList",
                            query: { courseId: this.courseId }
                        });
                    }
                } else {
                    this.$message.error(result.data.message);
                }
            });
        },
        // 创建一个讨论
        onSubmit(ruleform) {
            console.log(this.fileId);
            let disAssigns = [];
            if (this.ruleform.isGrade) {
                const assign = [];
                // 分配表单
                this.assign.forEach(v => {
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
                            as.assignId = data[0]; // all
                            as.assignType = data[1]; // all
                            assign.push(as);
                        });
                    }
                });
                // 如果没选的话 必须写一个默认的
                if (assign.length == 0) {
                    const as = {
                        assignType: 1 // all
                    };
                    assign.push(as);
                }
                disAssigns = assign;
            } else {
                for (let i = 0; i < this.postSections.length; i++) {
                    disAssigns.push({
                        assignType: this.postSections[i] == 0 ? 1 : 2,
                        assignId: this.postSections[i],
                        startTime: this.startTime,
                        endTime: this.endTime
                    });
                }
            }
            let studyGroupSetIds = "";
            if (this.gradeType1 == false) {
                studyGroupSetIds = "";
            } else {
                studyGroupSetIds = this.ruleform.studyGroupSetId;
            }
            const params = {
                courseId: this.courseId,
                title: this.ruleform.title,
                content: this.content,
                type: 1,
                studyGroupSetId: studyGroupSetIds,
                fileId: this.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: Number(this.ruleform.score).toFixed(2) * 100,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 0,
                assign: disAssigns
            };
            this.$refs[ruleform].validate(async valid => {
                if (valid) {
                    const result = await this.$getData(
                        "/discussion/add",
                        params,
                        "post"
                    );
                    if (result.data.code == 200) {
                        this.$router.push({
                            path: "/homePage/allCourse/discussionCreateList",
                            query: { courseId: this.courseId }
                        });
                    }
                } else {
                    this.$message.error(result.data.message);
                }
            });
        },
        editorcancel() {
            this.$router.push({
                path: "/homePage/allCourse/discussionCreateList",
                query: { courseId: this.courseId }
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
.studentDiscussions {
    .discussionStepTwo {
        /deep/ .el-dropdown-menu {
            overflow: hidden;
        }
        .studygroup {
            /deep/.el-form-item__error {
                left: 23px;
            }
        }
        /deep/.el-upload-list__item .el-icon-upload-success:before {
            content: "";
            display: none;
        }
        /deep/ .el-upload-list__item-name {
            display: none;
        }
        min-width: 912px;
        /deep/
            .el-form-item.is-required:not(.is-no-asterisk)
            > .el-form-item__label:before {
            content: "*";
            color: #f56c6c;
            margin-right: 4px;
        }
        /deep/ .ck-editor__main {
            height: 210px;
        }
        /deep/ .ck-content {
            height: 210px;
        }
        /deep/.el-upload-list {
            /*display: none;*/
        }
        .editor {
            margin-top: 20px;
            height: 250px;
        }

        .discussionRightBar {
            height: 400px;
            .link {
                color: #cccccc;
                font-size: 11px;
            }
        }

        .left-quize {
            border: 1px solid #ccc;
            margin-bottom: 4%;
            border-radius: 4px;
            padding: 1px 4%;
        }
        .multiple-attempts {
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 82%;
            padding: 2%;
            /*margin-left: 19%;*/
            margin-bottom: 2%;
            word-break: break-all;
            word-wrap: break-word;
        }
        .multiple-assign {
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 69%;
            word-break: break-all;
            word-wrap: break-word;
            /*margin-left: 9%;*/
        }
        .addto {
            padding: 2%;
            margin-bottom: 2%;
        }
        .multiple-attempts .attempts-keep {
            padding: 2%;
        }
        .assign-style {
            padding: 2%;
            margin-bottom: 2%;
        }

        .assign-add {
            padding-left: 74%;
            padding-bottom: 2%;
        }

        .available-until {
            display: inline-block;
            width: 48%;
            margin-left: 1%;
        }

        .questions-checkbox {
            margin: 2% 0;

            border-top: 1px solid #ccc;
        }
        .assign-addto {
            border-top: 1px dashed #ccc;
        }

        .quizzesTest p {
            margin: 2% 0 3% 0;
        }

        .messagetext {
            height: 200px;
            border-radius: 6px;
            border: 1px solid rgb(204, 204, 204);
            margin-top: 2%;
            margin-bottom: 2%;
        }

        .quizzesTest {
            width: 100%;
        }
    }
    .detail {
        margin-left: 50px;
        margin-top: 8px;
        margin-bottom: 10px;

        p {
            font-weight: bolder;
            font-size: 19px;
        }

        span {
            display: inline-block;
            margin-top: 13px;
        }

        a {
            font-weight: bolder;
            margin-top: 5px;
            display: inline-block;
            cursor: pointer;

            img {
                float: left;
            }
        }
    }
}
</style>
