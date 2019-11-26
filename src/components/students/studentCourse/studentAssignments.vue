<template>
    <div>
        <!--eslint-disable-->
        <div class="className">
            <p class="className_select">
                <el-select
                    v-model="value"
                    :placeholder="$t('message.ASSIGNMENT.SHOW_BY_TYPE')"
                    @change="homeLeftSelect(value)"
                >
                    <el-option
                        key="1"
                        :label="$t('message.ASSIGNMENT.SHOW_BY_TYPE')"
                        value="1"
                    />
                    <el-option
                        key="2"
                        :label="$t('message.ASSIGNMENT.SHOW_BY_DATE')"
                        value="2"
                    />
                </el-select>
            </p>
            <div
                v-show="assignmentGroupDataList.length === 0 && isAssign"
                class="modules-liststart"
            >
                <p
                    style="display: inline-block;cursor: pointer"
                    @click="QQpracticeQuizList"
                >
                    <i
                        v-show="TeacherQuizList"
                        class="iconfont icon-sanjiao_xia"
                    />
                    <i
                        v-show="!TeacherQuizList"
                        class="iconfont icon-sanjiaoyou"
                    />
                    {{ $t("message.ASSIGNMENT.assignment") }}
                </p>
                <div
                    v-show="
                        TeacherQuizList && assignmentGroupDataList.length === 0
                    "
                    class="quizzList-border"
                >
                    <div class="Assignment-row" style="text-align: center;">
                        <span>{{
                            $t("message.ASSIGNMENT.No_assignment_in_this_group")
                        }}</span>
                    </div>
                </div>
            </div>
            <div v-show="isAssign && assignmentGroupDataList.length > 0">
                <div class="modules-list">
                    <div
                        v-for="(assignmentGrouphh,
                        index) in assignmentGroupDataList"
                        :key="index"
                        class="modules-group"
                    >
                        <div class="module-heard">
                            <span
                                v-show="objweight.isWeightGrade"
                                class="assignmentGroup_weight"
                                ><span class="assignmentGroup_weights"
                                    >{{ assignmentGrouphh.weight
                                    }}<span v-if="!assignmentGrouphh.weight">
                                        %
                                        {{
                                            $t(
                                                "message.ASSIGNMENT.of_the_Total"
                                            )
                                        }}</span
                                    ><span v-if="assignmentGrouphh.weight"
                                        >%
                                        {{
                                            $t(
                                                "message.ASSIGNMENT.of_the_Total"
                                            )
                                        }}</span
                                    ></span
                                ></span
                            >

                            <h3
                                v-trigger
                                style="display: inline-block;cursor: pointer"
                                class="studentAssignments_tit"
                                @click="
                                    collapseAssignmentGroup(
                                        assignmentGrouphh,
                                        index
                                    )
                                "
                            >
                                <i
                                    v-show="assignmentGrouphh.isOpen"
                                    class="iconfont icon-sanjiao_xia"
                                />
                                <i
                                    v-show="!assignmentGrouphh.isOpen"
                                    class="iconfont icon-sanjiaoyou"
                                />
                                <el-tooltip
                                    v-show="assignmentGrouphh.name.length > 30"
                                    class="item"
                                    effect="dark"
                                    :content="assignmentGrouphh.name"
                                    placement="top"
                                >
                                    <span>{{ assignmentGrouphh.name }}</span>
                                </el-tooltip>
                                <span
                                    v-show="assignmentGrouphh.name.length <= 30"
                                    >{{ assignmentGrouphh.name }}</span
                                >
                            </h3>
                        </div>
                        <div
                            v-if="
                                assignmentGrouphh.assignmentGroupItems.length ==
                                    0 && assignmentGrouphh.isShow
                            "
                            class="content modules-row"
                            style="text-align: center;"
                        >
                            <span>{{
                                $t("message.ASSIGNMENT.noAssignmentData")
                            }}</span>
                        </div>
                        <div
                            v-for="(assignmentGroupItemll,
                            indexs) in assignmentGrouphh.assignmentGroupItems"
                            v-show="assignmentGrouphh.isShow"
                            :key="indexs"
                            class="content"
                        >
                            <div class="modules-row">
                                <i
                                    v-if="assignmentGroupItemll.originType == 1"
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-else-if="
                                        assignmentGroupItemll.originType == 2
                                    "
                                    class="iconfont icon-liaotian i_edit"
                                    height="20"
                                    width="20"
                                />
                                <i
                                    v-else-if="
                                        assignmentGroupItemll.originType == 3
                                    "
                                    class="iconfont icon--xiugaineirong i_edit"
                                    style="font-size: 22px;"
                                />
                                <i
                                    v-else-if="moduleItem.originType == 4"
                                    class="iconfont icon-doctext"
                                />
                                <a
                                    style="cursor: pointer"
                                    class="shenglue"
                                    @click="
                                        goTo(
                                            assignmentGrouphh,
                                            assignmentGroupItemll
                                        )
                                    "
                                    >{{ assignmentGroupItemll.title }}</a
                                >
                                <div class="quizzes-time">
                                    <ul>
                                        <v-module
                                            :modules="
                                                assignmentGroupItemll.modules
                                            "
                                        />
                                        <v-due-time
                                            :assigns="
                                                assignmentGroupItemll.assigns
                                            "
                                        />
                                        <v-available-time
                                            :assigns="
                                                assignmentGroupItemll.assigns
                                            "
                                        />
                                        <li
                                            v-if="
                                                assignmentGroupItemll.score > 0
                                            "
                                        >
                                            {{
                                                assignmentGroupItemll.score /
                                                    100
                                            }}
                                            {{ $t("message.pts") }}
                                        </li>
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <assignmentdata v-show="!isAssign" />
        </div>
        <el-dialog
            :title="$t('message.Adding_Working_Groups')"
            :visible.sync="dialogAddAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogAddAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="addAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="addAssignmentGroupForm"
                :rules="addWorkGroupRules"
            >
                <el-form-item :label="$t('message.Group_Name')" prop="name">
                    <el-input
                        v-model="addAssignmentGroupForm.name"
                        autocomplete="off"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddAssignmentGroupForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitAddAssignmentGroupForm"
                >
                    {{ $t("message.Add") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.Edit_Assignment_Group')"
            :visible.sync="dialogEditAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogEditAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="editAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="editAssignmentGroupForm"
                :rules="editAssignmentGroupRules"
            >
                <el-form-item :label="$t('message.Group_Name')" prop="name">
                    <el-input v-model="editAssignmentGroupForm.name" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditAssignmentGroupForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitEditAssignmentGroupForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.Add_Assignment_to_Assignments')"
            :visible.sync="dialogAddAssignmentGroupItemVisible"
            :width="dialogWidth"
            @closed="dialogAddAssignmentGroupItemVisibleClosed"
        >
            <el-form
                ref="form"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="form"
                :rules="AddAssignmentToAssignmentsRules"
            >
                <el-form-item :label="$t('message.Type')" prop="originType">
                    <el-select v-model="form.originType">
                        <!--value 与后台枚举对对应-->
                        <el-option
                            :label="$t('message.Assignments')"
                            value="1"
                        />
                        <el-option
                            :label="$t('message.Discussions')"
                            value="2"
                        />
                        <el-option :label="$t('message.Quizzes')" value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.Name')" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item :label="$t('message.Dues')" prop="limitTime">
                    <el-date-picker
                        v-model="form.limitTime"
                        value-format="timestamp"
                        :placeholder="$t('message.select_Date')"
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Points')" prop="point">
                    <el-input v-model="form.point" />
                </el-form-item>
                <el-form-item :label="$t('message.Publish')" prop="status">
                    <el-switch
                        v-model="form.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="goMore">
                    {{ $t("message.more_options") }}
                </el-button>
                <el-button @click="cancelAddAssignmentGroupItem">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitAddAssignmentGroupItem"
                >
                    {{ $t("message.Save") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.Edit_Assignment')"
            :visible.sync="dialogEditAssignmentGroupItemVisible"
            :width="dialogWidth"
            @closed="dialogEditAssignmentGroupItemVisibleClosed"
        >
            <el-form
                ref="editAssignmentGroupItemForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="editAssignmentGroupItemForm"
                :rules="editAssignmentGroupItemRules"
            >
                <el-form-item :label="$t('message.Group_Name')" prop="name">
                    <el-input
                        v-model="editAssignmentGroupItemForm.name"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Points')" prop="point">
                    <el-input
                        v-model="editAssignmentGroupItemForm.point"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Publish')" prop="status">
                    <el-switch
                        v-model="editAssignmentGroupItemForm.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditAssignmentGroupItemForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitEditAssignmentGroupItemForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--移动作业项-->
        <el-dialog
            :title="$t('message.Move')"
            :visible.sync="dialogMoveAssignmentGroupItemVisible"
            :width="dialogWidth"
            @closed="dialogMoveAssignmentGroupItemVisibleClosed"
        >
            <el-form
                ref="moveAssignmentGroupItemForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveAssignmentGroupItemForm"
            >
                <el-form-item style="width: 70%" prop="name">
                    <span
                        >{{ $t("message.Move") }} "{{
                            moveAssignmentGroupItemForm.name
                        }}"</span
                    >
                </el-form-item>
                <el-form-item
                    :label="$t('message.Assignment_Group')"
                    prop="targetAssignmentGroupId"
                >
                    <el-select
                        v-model="
                            moveAssignmentGroupItemForm.targetAssignmentGroupId
                        "
                        style="width: 70%"
                        @change="changeAssignmentGroup"
                    >
                        <el-option
                            v-for="assignmentGroupj in assignmentGroupDataList"
                            :key="assignmentGroupj.id"
                            :label="assignmentGroupj.name"
                            :value="assignmentGroupj.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.strategy')" prop="strategy">
                    <el-select
                        v-model="moveAssignmentGroupItemForm.strategy"
                        style="width: 70%"
                    >
                        <el-option :label="$t('message.TOP')" value="1" />
                        <el-option :label="$t('message.BOTTOM')" value="2" />
                        <!--暂时先不写 后台逻辑有点问题-->
                        <!--<el-option :label="$t('message.BEFORE')" value="3"></el-option>-->
                        <!--<el-option :label="$t('message.AFTER')" value="4"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="
                        (moveAssignmentGroupItemForm.strategy == 3 ||
                            moveAssignmentGroupItemForm.strategy == 4) &&
                            assignmentGroup.assignmentGroupItems.length > 0
                    "
                    :label="$t('message.To')"
                    prop="targetAssignmentGroupItemId"
                    required
                >
                    <el-select
                        v-model="
                            moveAssignmentGroupItemForm.targetAssignmentGroupItemId
                        "
                        style="width: 70%"
                    >
                        <el-option
                            v-for="assignmentGroupItema in assignmentGroup.assignmentGroupItems"
                            v-show="
                                assignmentGroupItema.title !=
                                    moveAssignmentGroupItemForm.name
                            "
                            :key="assignmentGroupItema.id"
                            :label="assignmentGroupItema.title"
                            :value="assignmentGroupItema.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelMoveAssignmentGroupItemForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveAssignmentGroupItemForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--移动作业组-->
        <el-dialog
            :title="$t('message.Move')"
            :visible.sync="dialogMoveAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogMoveAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="moveAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveAssignmentGroupForm"
            >
                <el-form-item style="width: 70%" prop="name">
                    <span
                        >{{ $t("message.Move") }} "{{
                            moveAssignmentGroupForm.name
                        }}"</span
                    >
                </el-form-item>
                <el-form-item :label="$t('message.strategy')" prop="strategy">
                    <el-select
                        v-model="moveAssignmentGroupForm.strategy"
                        style="width: 70%"
                    >
                        <!--<el-option label="DEFAULT" value="0"></el-option>-->
                        <el-option :label="$t('message.TOP')" value="1" />
                        <el-option :label="$t('message.BOTTOM')" value="2" />
                        <el-option :label="$t('message.BEFORE')" value="3" />
                        <el-option :label="$t('message.AFTER')" value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="
                        moveAssignmentGroupForm.strategy == 3 ||
                            moveAssignmentGroupForm.strategy == 4
                    "
                    :label="$t('message.To')"
                    prop="targetAssignmentGroupId"
                >
                    <el-select
                        v-model="
                            moveAssignmentGroupForm.targetAssignmentGroupId
                        "
                        style="width: 70%"
                    >
                        <el-option
                            :label="$t('message.Common_please_select')"
                            value="0"
                        />
                        <el-option
                            v-for="assignmentGroups in assignmentGroupDataList"
                            v-show="
                                assignmentGroups.name !=
                                    moveAssignmentGroupForm.name
                            "
                            :key="assignmentGroups.id"
                            :label="assignmentGroups.name"
                            :value="assignmentGroups.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelMoveAssignmentGroupForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveAssignmentGroupForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--eslint-disable-->
    </div>
</template>
<script>
/*eslint-disable*/
import utilMethods from "@/utils/utilMethods";
import dueDraw from "@/utils/dueDraw.vue";
import availableDraw from "@/utils/availableDraw.vue";
import assignmentdata from "@/components/students/studentCourse/studentAssignmentdata.vue";
import moduleDraw from "@/utils/moduleDraw.vue";

export default {
    directives: {
        trigger: {
            inserted(el) {
                el.click();
            }
        }
    },
    components: {
        "v-due-time": dueDraw,
        "v-available-time": availableDraw,
        assignmentdata,
        "v-module": moduleDraw
    },
    filters: {
        formatterDate(val) {
            return utilMethods.formatDate(val);
        },
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2:
                    for (let i = 0; i < sections.length; i += 1) {
                        const v = sections[i];
                        if (Number(v.id) === assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < users.length; i += 1) {
                        const v = users[i];
                        if (Number(v.id) === assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                default:
            }

            return data;
        }
    },
    data() {
        return {
            objweight: { isWeightGrade: "" },
            TeacherQuizList: true,
            labelPosition: "right",
            labelWidth: "100px",
            dialogWidth: "28%",
            dialogMoveAssignmentGroupVisible: false,
            dialogMoveAssignmentGroupItemVisible: false,
            dialogMoveContentVisible: false,
            dialogAddAssignmentGroupVisible: false,
            dialogEditAssignmentGroupVisible: false,
            dialogAddAssignmentGroupItemVisible: false,
            dialogEditAssignmentGroupItemVisible: false,
            value: "1",
            isAssign: true,
            editAssignmentGroupItemForm: {
                point: "",
                status: false,
                name: ""
            },
            editAssignmentGroupForm: {
                name: ""
            },
            moveAssignmentGroupForm: {
                targetAssignmentGroupId: "0",
                name: "",
                strategy: "1"
            },
            moveAssignmentGroupItemForm: {
                sourceAssignmentGroupId: "",
                sourceAssignmentGroupItemId: "",
                targetAssignmentGroupId: "",
                targetAssignmentGroupItemId: "",
                name: "",
                strategy: "1"
            },
            moduleSpread: false,
            form: {
                name: "",
                limitTime: "",
                originType: "1",
                status: false,
                point: ""
            },
            formLabelWidth: "28%",
            addAssignmentGroupForm: {
                name: ""
            },
            assignmentGroupItem: {}, // 临时操作的那个
            assignmentGroup: {}, // 临时操作的那个
            assignmentGroupDataList: [],
            assignmentDataList: [], // 作业下拉
            quizDataList: [], // 测验下拉
            discussionDataList: [], // 讨论下拉
            fileDataList: [],
            courseId: this.$route.query.courseId,
            cacheAssignReq: [],
            sections: [], // 所有班级
            users: [], // 所有用户
            addWorkGroupRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Add_Work_Group_Valid"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t("message.Add_Work_Group_length"),
                        trigger: "blur"
                    }
                ]
            },
            AddAssignmentToAssignmentsRules: {
                name: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Add_Assignment_To_Assignments_Valid"
                        ),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t(
                            "message.Add_Assignment_To_Assignments_length"
                        ),
                        trigger: "blur"
                    }
                ]
            },
            editAssignmentGroupRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Edit_Assignment_Group_Valid"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t(
                            "message.Edit_Assignment_Group_length"
                        ),
                        trigger: "blur"
                    }
                ]
            },
            editAssignmentGroupItemRules: {
                name: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Edit_Assignment_Group_Item_Valid"
                        ),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t(
                            "message.Edit_Assignment_Group_Item_length"
                        ),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    mounted() {
        this.isGradeWeight();
        // TODO取 课程ids
        this.getAssignmentGroupDataList();
        // this.getAssignDataList();
    },
    methods: {
        QQpracticeQuizList() {
            this.TeacherQuizList = !this.TeacherQuizList;
        },
        homeLeftSelect(value) {
            if (Number(value) === 1) {
                this.isAssign = true;
            } else if (Number(value) === 2) {
                this.isAssign = false;
            }
        },
        goCreate() {
            this.$router.push({
                path: "assignmentdetail",
                query: { courseId: this.courseId }
            });
        },
        goMore() {
            switch (parseInt(this.form.originType, 10)) {
                case 1:
                    this.$router.push({
                        path: "assignmentdetail",
                        query: {
                            courseId: this.courseId,
                            title: this.form.name,
                            limitTime: this.form.limitTime,
                            score: this.form.point,
                            assignmentGroupId: this.assignmentGroup.id,
                            assignmentGroupItemId: this.assignmentGroupItem.id
                        }
                    });
                    break;
                case 2: {
                    let { name } = this.form;
                    if (name === "") name = this.$t("message.Unnamed_Discuss");
                    const params = {
                        courseId: this.courseId,
                        title: name,
                        type: 2,
                        isGrade: 1,
                        score: parseInt(this.form.point, 10),
                        assignmentGroupId: parseInt(
                            this.assignmentGroup.id,
                            10
                        ),
                        assign: [
                            {
                                assignType: 1,
                                limitTime: this.form.limitTime
                            }
                        ]
                    };
                    this.$http
                        .post(`${process.env.NODE_ENV}/discussion/add`, params)
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.$router.push({
                                    path: "/homePage/allCourse/discussionAdmit",
                                    query: {
                                        type: "1",
                                        courseId: this.courseId,
                                        discussionId: res.data.entity
                                    }
                                });
                            }
                        });
                    break;
                }
                case 3: {
                    let { names } = this.form;
                    if (names === "") names = this.$t("message.Unnamed_Quiz");
                    const quize = {
                        courseId: parseInt(this.courseId, 10),
                        title: names,
                        type: 3,
                        assignmentGroupId: parseInt(
                            this.assignmentGroup.id,
                            10
                        ),
                        score: parseInt(this.form.point, 10),
                        isShuffleAnswer: 1,
                        showReplyStrategy: 0,
                        showAnswerStrategy: 0,
                        showQuestionStrategy: 0,
                        isLockRepliedQuestion: 0,
                        isNeedAccessCode: 0,
                        isFilterIP: 0,
                        version: 1,
                        status: 0,
                        totalQuestions: 0,
                        totalScore: parseInt(this.form.point, 10),
                        assign: [
                            {
                                assignType: 1,
                                limitTime: this.form.limitTime
                            }
                        ]
                    };
                    this.$http
                        .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.quizadd = res.data.message;
                                this.$router.push({
                                    path: "/homePage/allCourse/mondifyQuizz",
                                    query: {
                                        quizDetailId: parseInt(
                                            this.quizadd,
                                            10
                                        ),
                                        courseId: parseInt(this.courseId, 10)
                                    }
                                });
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    break;
                }
                default:
            }
        },
        // 去指定页面
        goTo(group, item) {
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    this.$router.push({
                        path: "studentAssignmentSubmit",
                        query: {
                            courseId: this.courseId,
                            assignmentId: targetId
                        }
                    });
                    break;
                case 2:
                    this.$router.push({
                        path:
                            "/studentHomePage/studentAllCourse/studentCourseDiscussionDetail",
                        query: {
                            discussionId: targetId,
                            courseId,
                            allowStudentEditDiscussion: 0
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/studentHomePage/studentAllCourse/quizzDetail",
                        query: { quizDetailId: targetId, courseId }
                    });
                    break;
                case 4:
                    this.$alert("文件预览");
                    break;
                default:
            }
        },
        async changeAssignmentGroup(val) {
            this.assignmentGroup = this.assignmentGroupDataList.find(
                v => Number(v.id) === Number(val)
            );
            if (
                Number(this.assignmentGroup.assignmentGroupItems.length) === 0
            ) {
                // 动态获取目标items
                const result = await this.$getData(
                    `/assignmentGroupItem/list?assignmentGroupId=${val}`,
                    null,
                    "get"
                );
                if (Number(result.data.code) === 200) {
                    // 刷新子项
                    const assignmentGroupItems = result.data.entity;
                    this.$set(
                        this.assignmentGroup,
                        "assignmentGroupItems",
                        assignmentGroupItems
                    );
                    console.log(assignmentGroupItems, "dsj");
                } else {
                    this.$message.error(result.data.message);
                }
            }
        },
        cancelMoveAssignmentGroupItemForm() {
            this.dialogMoveAssignmentGroupItemVisible = false;
            this.$refs.moveAssignmentGroupItemForm.resetFields();
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupId = "";
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupItemId = "";
        },
        async submitMoveAssignmentGroupItemForm() {
            const result = await this.$getData(
                "/assignmentGroup/moveContent/edit",
                this.moveAssignmentGroupItemForm,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.dialogMoveAssignmentGroupItemVisible = false;
                // 内存操作
                if (
                    Number(
                        this.moveAssignmentGroupItemForm.sourceAssignmentGroupId
                    ) ===
                    Number(
                        this.moveAssignmentGroupItemForm.targetAssignmentGroupId
                    )
                ) {
                    // 展开操作
                    const assignmentGroup = this.assignmentGroupDataList.find(
                        v =>
                            Number(v.id) ===
                            this.moveAssignmentGroupItemForm
                                .sourceAssignmentGroupId
                    );
                    assignmentGroup.isShow = false;
                    this.collapseAssignmentGroup(assignmentGroup);
                } else {
                    this.getAssignmentGroupDataList();
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 移动作业项弹窗关闭事件
        dialogMoveAssignmentGroupItemVisibleClosed() {
            this.$refs.moveAssignmentGroupItemForm.resetFields();
        },
        // 移动作业弹窗
        moveAssignmentGroupItemDialog(assignmentGroup, assignmentGroupItem) {
            this.assignmentGroup = assignmentGroup;
            this.assignmentGroupItem = assignmentGroupItem;
            console.log(assignmentGroup.id);
            console.log(assignmentGroupItem.id);
            this.dialogMoveAssignmentGroupItemVisible = true;
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupId =
                assignmentGroup.id;
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupItemId =
                assignmentGroupItem.id;
            this.moveAssignmentGroupItemForm.targetAssignmentGroupId =
                assignmentGroup.id;
            this.moveAssignmentGroupItemForm.name = assignmentGroupItem.title;
        },
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignmentGroupItemAssignDataList(
            assignmentGroup,
            assignmentGroupItem
        ) {
            const data = `${assignmentGroupItem.originType}_${assignmentGroupItem.originId}`;
            const result = await this.$getData(
                `/assignStudent/get?data=${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const assign = result.data.entity;
                const assigns = [];
                assigns.push(assign);
                this.$set(assignmentGroupItem, "assigns", assigns);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async moduleItemPushHandler(assignmentGroup, assignmentGroupItem) {
            const data = {};
            data.originId = assignmentGroupItem.originId;
            data.originType = assignmentGroupItem.originType;
            data.status = Number(assignmentGroupItem.status) === 0 ? 1 : 0;
            const result = await this.$getData(
                "/publish/status/edit",
                data,
                "post"
            );
            if (Number(result.data.code) === 200) {
                const fhj = assignmentGroupItem;
                fhj.status = data.status;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async assignmentGroupItemEdit() {
            const url = "/assignmentGroupItem/modify";
            const data = this.assignmentGroupItem;
            data.status = 0;
            if (this.editAssignmentGroupItemForm.status) data.status = 1;
            else data.status = 0;
            data.score = this.editAssignmentGroupItemForm.point;
            data.name = this.editAssignmentGroupItemForm.name;
            const result = await this.$getData(url, data, "post");
            if (Number(result.data.code) === 200) {
                this.dialogAddAssignmentGroupItemVisible = false;
                if (Boolean(this.assignmentGroup.isShow) === true) {
                    this.refreshAssignmentGroupItem(this.assignmentGroup);
                }
            } else {
                // this.$message.error(result.data.message);
            }
        },
        async deleteAssignmentGroupItem(assignmentGroup, assignmentGroupItem) {
            const result = await this.$getData(
                "/assignmentGroupItem/deletes",
                assignmentGroupItem.id,
                "post"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(assignmentGroup.isShow) === true
            ) {
                this.refreshAssignmentGroupItem(assignmentGroup);
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 重新获取子项
        async refreshAssignmentGroupItem(assignmentGroup) {
            const result = await this.$getData(
                `/assignmentGroupItem/list?assignmentGroupId=${assignmentGroup.id}`,
                null,
                "get"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(assignmentGroup.isShow) === true
            ) {
                // 刷新子项
                const assignmentGroupItems = result.data.entity;
                this.$set(
                    assignmentGroup,
                    "assignmentGroupItems",
                    assignmentGroupItems
                );
                assignmentGroupItems.forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(
                        assignmentGroup,
                        v
                    );
                });
            } else {
                this.$message.error(result.data.message);
            }
        },
        cancelMoveAssignmentGroupForm() {
            this.dialogMoveAssignmentGroupVisible = false;
        },
        // 关闭移动作业
        dialogMoveAssignmentGroupVisibleClosed() {
            this.$refs.moveAssignmentGroupForm.resetFields();
        },
        // 提交移动作业表单
        submitMoveAssignmentGroupForm() {
            const list = utilMethods.clone(this.assignmentGroupDataList);
            const index = list.findIndex(
                v => Number(v.id) === this.assignmentGroup.id
            ); // 找到当前module
            list.splice(index, 1); // 删除
            switch (this.moveAssignmentGroupForm.strategy) {
                case "1":
                    // 置顶
                    list.splice(0, 0, this.assignmentGroup); // 放到第一位
                    break;
                case "2":
                    // 置底
                    list.push(this.assignmentGroup); // 放到第一位
                    break;
                case "3": {
                    // 指定目标id // 指定之前
                    const targetIndex = list.findIndex(
                        v =>
                            Number(v.id) ===
                            this.moveAssignmentGroupForm.targetAssignmentGroupId
                    );
                    list.splice(targetIndex, 0, this.assignmentGroup); // 放到第一位
                    break;
                }
                case "4": {
                    // 指定之后
                    const targetIndex2 = list.findIndex(
                        v =>
                            Number(v.id) ===
                            this.moveAssignmentGroupForm.targetAssignmentGroupId
                    );
                    list.splice(targetIndex2 + 1, 0, this.assignmentGroup); // 放到第一位
                    break;
                }
                default:
            }
            this.moveAssignmentGroupReq(list);
        },
        moveAssignmentGroupDialog(assignmentGroup) {
            this.assignmentGroup = assignmentGroup;
            this.moveAssignmentGroupForm.name = assignmentGroup.name;
            this.dialogMoveAssignmentGroupVisible = true;
        },
        // 移动作业组实现
        async moveAssignmentGroupReq(list) {
            const data = [];
            list.forEach(v => data.push(v.id));
            const result = await this.$getData(
                "/assignmentGroup/move/edit",
                { assignmentGroupIds: data },
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.assignmentGroupDataList = list;
                this.dialogMoveAssignmentGroupVisible = false;
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 作业组删除
        async moduleDelete(item) {
            const result = await this.$getData(
                "/assignmentGroup/deletes",
                item.id,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.getAssignmentGroupDataList();
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 提交修改作业组表单
        async submitEditAssignmentGroupForm() {
            this.$refs.editAssignmentGroupForm.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.name = this.editAssignmentGroupForm.name;
                    data.id = this.assignmentGroup.id;
                    const result = await this.$getData(
                        "/assignmentGroup/modify ",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.dialogEditAssignmentGroupVisible = false;
                        this.getAssignmentGroupDataList();
                    } else {
                        this.$message.error(result.data.message);
                    }
                    return true;
                }
                return false;
            });
        },
        cancelEditAssignmentGroupForm() {
            this.$refs.editAssignmentGroupForm.resetFields();
            this.dialogEditAssignmentGroupVisible = false;
        },
        cancelAddAssignmentGroupItem() {
            this.$refs.form.resetFields();
            this.dialogAddAssignmentGroupItemVisible = false;
        },
        // 提交添加作业到作业组
        async submitAddAssignmentGroupItem() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    let url = "";
                    const data = {};
                    data.courseId = parseInt(this.courseId, 10);
                    data.title = this.form.name;
                    data.status = this.form.status ? 1 : 0;
                    data.score = parseInt(this.form.point, 10);
                    // 作业小组ID（type=2,3） 测验type=2,3必须传此值
                    data.assignmentGroupId = this.assignmentGroup.id;
                    data.assign = [
                        {
                            assignType: 1, // 1: 所有， 2：section(班级), 3: 用户
                            limitTime: this.form.limitTime
                        }
                    ];
                    switch (this.form.originType) {
                        case "1":
                            url = "/assignment/add";
                            data.gradeType = 5; // 评分方式，1: 分值(points), 2: 百分比(percentage), 3: GPA, 4: Letter, 5: 不评分
                            data.submissionType = 4; // 提交类型, 1: 在线 2: 书面 3: 外部工具 4: 不提交
                            break;
                        case "2":
                            url = "/discussion/add";
                            data.type = 2; // 1: 课程里面创建的为普通讨论， 2：小组里面创建的为小组讨论
                            break;
                        case "3":
                            // Quizzes
                            url = "/quiz/add";
                            data.type = 2; // ，1：练习测验(practice quiz)、2：评分测验(graded quiz)、
                            // 3：评分调查(graded survey)、4：非评分调查(ungraded survey)
                            data.isShuffleAnswer = 0; // ，是否重组答案（学生测验时答案选项将随机排列）
                            data.showReplyStrategy = 0; // ，显示学生的答题记录（正误）策略，0: 不显示 1：每次提交答案后 2：最后一次提交后
                            data.showAnswerStrategy = 0; // ，显示答案策略，0: 不显示 1：每次提交后 2：最后一次提交后
                            data.showQuestionStrategy = 0; // 显示问题策略, 0: 全部显示, 1: 每页一个
                            data.isLockRepliedQuestion = 0; // 回答后是否锁定问题
                            data.isNeedAccessCode = 0; // 是否需要访问码访问
                            data.isFilterIP = 0; // 是否过滤访问IP
                            data.version = 1; // 版本号（预留）,每次更新后版本号增加
                            data.totalQuestions = 0;
                            data.totalScore = 0;
                            break;
                        default:
                    }
                    const result = await this.$getData(url, data, "post");
                    if (Number(result.data.code) === 200) {
                        this.dialogAddAssignmentGroupItemVisible = false;
                        if (Boolean(this.assignmentGroup.isShow) === true) {
                            this.refreshAssignmentGroupItem(
                                this.assignmentGroup
                            );
                        }
                    } else {
                        this.$message.error(result.data.message);
                    }
                    return true;
                }
                return false;
            });
        },
        // 获作业下拉列表
        getAssignmentDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentSelect/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.assignmentDataList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取作业组列表
        getAssignmentGroupDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentGroup/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.assignmentGroupDataList = res.data.entity;
                        // console.log(
                        //     this.assignmentGroupDataList,
                        //     'djkshfncjdsvfjd',
                        // );
                        for (
                            let i = 0;
                            i < this.assignmentGroupDataList.length;
                            i += 1
                        ) {
                            this.$set(
                                this.assignmentGroupDataList[i],
                                "isShow",
                                false
                            );
                            this.$set(
                                this.assignmentGroupDataList[i],
                                "assignmentGroupItems",
                                []
                            );
                            this.$set(
                                this.assignmentGroupDataList[i],
                                "isOpen",
                                false
                            );
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 编辑作业组弹窗
        editAssignmentGroupDialog(item) {
            this.assignmentGroup = item;
            this.editAssignmentGroupForm.name = item.name;
            this.dialogEditAssignmentGroupVisible = true;
        },
        // 添加作业弹窗
        addAssignmentGroupHandler(assignmentGroup) {
            this.assignmentGroup = assignmentGroup;
            this.dialogAddAssignmentGroupItemVisible = true;
            if (Number(this.assignmentDataList.length) === 0) {
                // 缓存下 防止多次查找
                this.getAssignmentDataList();
            }
        },
        // 提交编辑作业表单
        submitEditAssignmentGroupItemForm() {
            this.$refs.editAssignmentGroupItemForm.validate(async valid => {
                if (valid) {
                    this.assignmentGroupItemEdit();
                    this.dialogEditAssignmentGroupItemVisible = false;
                    return false;
                }
                return false;
            });
        },
        // 取消编辑作业弹窗
        cancelEditAssignmentGroupItemForm() {
            this.$refs.editAssignmentGroupItemForm.resetFields();
            this.dialogEditAssignmentGroupItemVisible = false;
        },
        // 编辑作业弹窗
        editAssignmentGroupItemDialog(assignmentGroup, assignmentGroupItem) {
            this.assignmentGroup = assignmentGroup;
            this.assignmentGroupItem = assignmentGroupItem;
            this.editAssignmentGroupItemForm.name = assignmentGroupItem.title;
            this.editAssignmentGroupItemForm.status =
                Number(assignmentGroupItem.status) === 1;
            this.editAssignmentGroupItemForm.point = assignmentGroupItem.score;
            this.dialogEditAssignmentGroupItemVisible = true;
        },
        // 折叠/展开作业
        collapseAssignmentGroup(assignmentGroup) {
            if (assignmentGroup.isShow) {
                // 关闭或再次展开就不需要刷新了
                this.$set(assignmentGroup, "isShow", !assignmentGroup.isShow);
                const sdk = assignmentGroup;
                sdk.isOpen = !sdk.isOpen;
                return;
            }

            if (assignmentGroup.assignmentGroupItems.length > 0) {
                this.$set(assignmentGroup, "isShow", !assignmentGroup.isShow);
                const agro = assignmentGroup;
                agro.isOpen = !agro.isOpen;
                return;
            }
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentGroupItem/list?assignmentGroupId=${assignmentGroup.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        const assign = assignmentGroup;
                        assign.isOpen = !assign.isOpen;
                        const assignmentGroupItems = res.data.entity;
                        this.$set(
                            assignmentGroup,
                            "isShow",
                            !assignmentGroup.isShow
                        );
                        this.$set(
                            assignmentGroup,
                            "assignmentGroupItems",
                            assignmentGroupItems
                        );
                        // 查询分配记录
                        assignmentGroup.assignmentGroupItems.forEach(v => {
                            this.getAssignmentGroupItemAssignDataList(
                                assignmentGroup,
                                v
                            );
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 提交添加作业组表单
        submitAddAssignmentGroupForm() {
            this.$refs.addAssignmentGroupForm.validate(valid => {
                if (valid) {
                    this.addAssignmentGroupForm.courseId = this.courseId;
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/assignmentGroup/add`,
                            this.addAssignmentGroupForm
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.dialogAddAssignmentGroupVisible = false;
                                this.getAssignmentGroupDataList();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    return true;
                }
                return false;
            });
        },
        // 添加作业到作业组弹窗关闭回调
        dialogAddAssignmentGroupItemVisibleClosed() {
            this.form.originId = "0"; // 重置下拉框
            this.$refs.form.resetFields(); // 重置表单
        },
        // 编辑作业组弹窗关闭回调
        dialogEditAssignmentGroupVisibleClosed() {
            this.$refs.editAssignmentGroupForm.resetFields(); // 重置表单
        },
        // 添加作业组弹窗关闭回调
        dialogAddAssignmentGroupVisibleClosed() {
            this.$refs.addAssignmentGroupForm.resetFields(); // 重置表单
        },
        // 取消添加作业组表单
        cancelAddAssignmentGroupForm() {
            this.$refs.addAssignmentGroupForm.resetFields();
            this.dialogAddAssignmentGroupVisible = false;
        },
        dialogEditAssignmentGroupItemVisibleClosed() {
            this.$refs.editAssignmentGroupItemForm.resetFields();
            this.dialogEditAssignmentGroupItemVisible = false;
        },
        async isGradeWeight() {
            const result = await this.$getData(
                `/assignmentGroup/weight/query?courseId=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.objweight.isWeightGrade = Boolean(
                    result.data.entity.isWeightGrade
                );
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable*/
</script>

<style scoped>
.className {
    width: 90%;
    display: inline-block;
}

.el-button el-button--info {
    width: 50%;
}

.el-button-group .el-button--primary:last-child {
    width: 50%;
}

.elradio-select .el-radio {
    width: 70%;
    margin: 2% 0;
}

.studentRequirements .el-radio {
    width: 70%;
    margin: 2% 0;
}

.bottomHint {
    color: red;
    display: inline-block;
    width: 70%;
    margin-top: 6%;
}

.module {
    float: right;
    margin-bottom: 2%;
}

.el-icon-error {
    color: #999999;
    cursor: pointer;
    font-size: 16px;
}

.modules-list {
    border: 1px solid #ccc;
    clear: both;
    margin-left: 2%;
}

.modules-liststart {
    border: 1px solid #ccc;
    clear: both;
    margin-left: 2%;
    padding: 2%;
    margin-top: 20px;
}

.modules-group {
    border-bottom: 1px dashed #a5afb5;
    padding: 2%;
}

.module-heard {
    border-bottom: none;
    margin-bottom: 2%;
    position: relative;
}

.modules-row i {
    color: #666666;
}

.modules-row {
    position: relative;
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    color: #394b58;
    border: 1px solid #c7cdd1;
    border-bottom: none;
    border-radius: 3px;
}

.Assignment-row {
    position: relative;
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
}

.content {
    /* border-radius: 3px; */
}

.content:last-child {
    border-bottom: 1px solid #c7cdd1;
}

.modules-success {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    color: green;
    display: inline-block;
    position: absolute;
    left: 83%;
}

.modules-successList {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    color: green;
    display: inline-block;
    position: absolute;
    left: 88%;
    top: 24%;
}

.modules-outline {
    line-height: 34px;
    padding-left: 1%;
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 88%;
    cursor: pointer;
}

.modules-menu {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 94%;
    cursor: pointer;
}

.modules-menuList {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 94%;
    top: 20%;
}

h6 {
    width: 50%;
    padding-left: 140px;
    color: #999999;
}

.moduleSpread {
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    padding: 8px 0;
    border-color: #c7cdd1;
    text-align: left;
    z-index: 9999;
    left: 76%;
    top: 40%;
}

.triangle {
    position: absolute;
    top: -10%;
    z-index: 9999;
    left: 66%;
}

.moduleSpread ul li {
    width: 180px;
    margin-top: 8px;
}

.el-dropdown-menu {
    width: 16%;
}

img {
    vertical-align: middle;
    padding-right: 1%;
}

.quizzes-time {
    padding-left: 3%;
}

.quizzes-time ul li {
    display: inline-block;
    padding: 0 1%;
}

.drag {
    cursor: move;
}

i {
    font-size: 20px !important;
}

.modules-menu i:hover {
    color: #0138b1;
}

.shenglue {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
    display: inline-block;
}

.className_select {
    text-align: right;
}

.modules-list {
    margin-top: 20px;
}

.studentAssignments_tit {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.assignmentGroup_weight {
    display: inline-block;
    width: 153px;
    height: 30px;
    vertical-align: middle;
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 22px;
    text-align: center;
    line-height: 30px;
}

.assignmentGroup_weights {
    display: inline-block;
    width: 152px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 22px;
    text-align: center;
    line-height: 30px;
}

.quizzList-border {
    border: 1px solid #ccc;
    border-radius: 3px;
}
</style>
