<template>
    <div>
        <!--eslint-disable-->
        <div class="groups">
            <div class="group-top">
                <div style="overflow: auto; padding: 10px 0;">
                    <!-- 学习小组集限制提示 -->
                    <span
                        v-if="
                            isStudentGroupSet ||
                                studyGroupSet.allowSelfSignup ||
                                studyGroupSet.isSectionGroup ||
                                studyGroupSet.groupMemberNumber
                        "
                        class="tips"
                    >
                        <el-tooltip placement="bottom-start">
                            <div slot="content">
                                {{ $t("message.Group_Tips") }}
                            </div>
                            <i class="iconfont icon-help" />
                        </el-tooltip>
                        <i v-if="isStudentGroupSet"
                            >{{ $t("message.These_groups_are_self") }}
                        </i>
                        <i v-else-if="studyGroupSet.allowSelfSignup">{{
                            $t("message.Self_Sign_Up")
                        }}</i>
                        <i v-else-if="studyGroupSet.isSectionGroup">{{
                            $t("message.Same_Section")
                        }}</i>
                        <i v-else-if="studyGroupSet.groupMemberNumber"
                            >{{ $t("message.Group_Limit")
                            }}{{ studyGroupSet.groupMemberNumber
                            }}{{ $t("message.Members") }}</i
                        >
                    </span>

                    <!-- 小组集操作 -->
                    <div class="group">
                        <!-- 小组更多操作 -->
                        <el-popover
                            v-if="!isStudentGroupSet"
                            placement="bottom"
                            style="float: right;"
                            trigger="click"
                        >
                            <ul class="handle-group">
                                <!--<li @click="messageStudents">-->
                                <!--<i class="iconfont el-icon-message"></i>-->
                                <!--<span>{{$t('message.Message')}}</span>-->
                                <!--</li>-->

                                <!-- 不允许学生自己注册时，显示随机分配操作 -->
                                <li
                                    v-if="
                                        !studyGroupSet.allowSelfSignup &&
                                            unassignedStudentList.length > 0
                                    "
                                    @click="goRandomAssign"
                                >
                                    <i class="iconfont icon-Randomly" />
                                    <span>{{
                                        $t(
                                            "message.People_study_group_set_assign_randomly"
                                        )
                                    }}</span>
                                </li>

                                <li @click="goEditGroupSet(studyGroupSet)">
                                    <i class="iconfont icon-edit" />
                                    <span>{{
                                        $t(
                                            "message.People_study_group_set_edit_title"
                                        )
                                    }}</span>
                                </li>

                                <li @click="goCloneGroupSet">
                                    <i class="iconfont icon-CloneGroupSet" />
                                    <span>{{
                                        $t(
                                            "message.People_study_group_set_clone"
                                        )
                                    }}</span>
                                </li>

                                <li @click="goDeleteGroupSet">
                                    <i class="iconfont icon-delete" />
                                    <span>{{
                                        $t(
                                            "message.People_study_group_set_delete"
                                        )
                                    }}</span>
                                </li>
                            </ul>

                            <el-button
                                v-if="!studyGroupSet.isStudentGroup"
                                slot="reference"
                                icon="el-icon-more"
                                @click="handleGroups($event)"
                            />
                        </el-popover>

                        <!-- 删除小组集 -->
                        <el-dialog
                            :title="$t('message.People_study_group_set_delete')"
                            :visible.sync="deleteGroupSetDialogVisible"
                            width="20%"
                        >
                            <span>{{
                                $t("message.People_study_group_set_delete_tip")
                            }}</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button
                                    @click="deleteGroupSetDialogVisible = false"
                                    >{{
                                        $t("message.Common_cancel")
                                    }}</el-button
                                >
                                <el-button
                                    type="primary"
                                    @click="confirmDeleteGroupSet"
                                    >{{
                                        $t("message.Common_confirm")
                                    }}</el-button
                                >
                            </span>
                        </el-dialog>

                        <!--Randomly Assign-->
                        <el-dialog
                            :title="
                                $t(
                                    'message.People_study_group_set_assign_randomly'
                                )
                            "
                            :visible.sync="assigningVisible"
                            width="26%"
                            @closed="
                                randomAssignModel.isLimitMemberInSameSection = 0
                            "
                        >
                            <p>
                                {{ $t("message.automatically_Assign") }}
                                <em class="no-assign">{{
                                    $t("message.all_unassigned_students")
                                }}</em>
                                {{ $t("message.Assign_Group") }}
                            </p>

                            <!--<el-tooltip class="item" effect="dark" :content="$t('message.Assign_tips')" placement="bottom">-->
                            <!--<span>-->
                            <!--<el-checkbox v-model="randomAssignModel.isLimitMemberInSameSection"-->
                            <!--:true-label="1" :false-label="0"-->
                            <!--:disabled="randomAssignCanLimitSection" style="margin-right: .5em;"/>-->
                            <!--<em>{{$t('message.Require_Section')}}</em>-->
                            <!--</span>-->
                            <!--</el-tooltip>-->

                            <span slot="footer" class="dialog-footer">
                                <el-button @click="assigningVisible = false">{{
                                    $t("message.Common_cancel")
                                }}</el-button>
                                <el-button
                                    type="primary"
                                    @click="randomAssign"
                                    >{{
                                        $t("message.Common_confirm")
                                    }}</el-button
                                >
                            </span>
                        </el-dialog>

                        <!-- 克隆小组集 -->
                        <el-dialog
                            title="Clone Group Set"
                            width="30%"
                            :visible.sync="cloneStudyGroupSetDialogVisible"
                            @closed="resetFormFields('studyGroupSetCloneForm')"
                        >
                            <el-form
                                ref="studyGroupSetCloneForm"
                                :model="studyGroupSetCloneForm"
                                :hide-required-asterisk="hide"
                                :rules="{
                                    name: [
                                        {
                                            required: true,
                                            message: $t(
                                                'message.People_study_group_set_clone_name_required'
                                            ),
                                            trigger: 'blur'
                                        },
                                        {
                                            min: 1,
                                            max: 100,
                                            message: $t(
                                                'message.People_study_group_set_rule_name'
                                            ),
                                            trigger: 'blur'
                                        }
                                    ]
                                }"
                            >
                                <el-form-item
                                    prop="name"
                                    :label="
                                        $t(
                                            'message.People_study_group_set_name'
                                        )
                                    "
                                    :label-width="130"
                                    class="set-name"
                                >
                                    <el-input
                                        v-model="studyGroupSetCloneForm.name"
                                        :placeholder="
                                            $t(
                                                'message.People_study_group_set_new_name'
                                            )
                                        "
                                        autocomplete="off"
                                        class="clone-name"
                                    />
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button
                                    @click="
                                        cloneStudyGroupSetDialogVisible = false
                                    "
                                >
                                    {{ $t("message.Cancel") }}
                                </el-button>
                                <el-button
                                    type="primary"
                                    @click="
                                        confirmCloneGroupSet(
                                            'studyGroupSetCloneForm'
                                        )
                                    "
                                >
                                    {{ $t("message.submit") }}
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <!-- 创建小组 -->
                    <el-button style="float: right;" @click="addGroup">
                        <i class="iconfont icon-add" />
                        <span>{{ $t("message.Group") }}</span>
                    </el-button>
                </div>
            </div>

            <div class="group-con">
                <!-- 未分配学生列表 -->
                <div class="left-con">
                    <h3>
                        {{ $t("message.Unassigned_title") }} ({{
                            unassignedStudentList.length
                        }})
                    </h3>
                    <el-form>
                        <el-form-item>
                            <el-input
                                v-model="unassignedStudentName"
                                prefix-icon="el-icon-search"
                                @blur="loadUnassignedStudentList"
                                @keyup.enter.native="loadUnassignedStudentList"
                            />
                        </el-form-item>
                    </el-form>

                    <div
                        v-if="unassignedStudentList.length == 0"
                        class="no-stu"
                    >
                        <p>{{ $t("message.No_Stu") }}</p>
                    </div>

                    <div
                        v-for="(el, index) in unassignedStudentList"
                        :key="el.userId"
                        class="unassigned"
                    >
                        <span class="unassignedName">{{ el.username }}</span>
                        <el-popover
                            style="vertical-align: middle"
                            placement="right-start"
                            :title="
                                $t(
                                    'message.People_study_group_set_add_to_group'
                                )
                            "
                            width="140"
                            trigger="click"
                        >
                            <ul class="select-group">
                                <!--v-if="stuGroup(item.groupUsers)"-->
                                <li
                                    v-for="item in groupList"
                                    v-show="
                                        !item.maxMemberNumber ||
                                            item.groupUsers.length <
                                                item.maxMemberNumber
                                    "
                                    :key="item.id"
                                    @click="assignUser(el, item)"
                                >
                                    <span>{{ item.name }}</span>
                                </li>
                            </ul>
                            <i
                                v-show="groupList.length > 0"
                                slot="reference"
                                class="iconfont icon-add"
                                @click="visible = !visible"
                            />
                        </el-popover>
                    </div>
                </div>

                <!-- 小组列表 -->
                <div class="right-con">
                    <h3>{{ $t("message.Groups") }}({{ groupList.length }})</h3>

                    <div v-if="groupList.length == 0" class="no-group">
                        <p>{{ $t("message.No_Group") }}</p>
                    </div>
                    <el-collapse @change="handleChange">
                        <el-collapse-item v-for="el in groupList" :key="el.id">
                            <template slot="title">
                                <div
                                    class="group-detail"
                                    @click="handleDetail($event)"
                                >
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="el.name"
                                        placement="top-start"
                                    >
                                        <span class="group-name">
                                            {{ el.name }}
                                        </span>
                                    </el-tooltip>
                                    <span
                                        v-for="item in el.groupUsers"
                                        v-if="item.isLeader == 1"
                                        :key="item.userId"
                                        class="group-leader"
                                        style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                                    >
                                        <i class="iconfont icon-account" />
                                        {{ item.username }}
                                    </span>
                                    <span class="group-num">
                                        <em>{{ el.groupUsers.length }}</em>
                                        <em v-if="el.maxMemberNumber">/</em>
                                        <em v-if="el.maxMemberNumber">{{
                                            el.maxMemberNumber
                                        }}</em>
                                        {{ $t("message.Group_Students") }}
                                    </span>
                                </div>
                                <el-popover
                                    placement="bottom"
                                    width="190"
                                    trigger="click"
                                >
                                    <ul class="handle-group">
                                        <li @click="visitGroup(el)">
                                            <i
                                                class="iconfont icon-tabbarhome"
                                            />
                                            <span>{{
                                                $t("message.Visit_Homepage")
                                            }}</span>
                                        </li>
                                        <li @click="editGroup(el)">
                                            <i class="iconfont icon-edit" />
                                            <span>{{
                                                $t("message.Edit_Group")
                                            }}</span>
                                        </li>
                                        <li @click="deleteGroup(el)">
                                            <i class="iconfont icon-delete" />
                                            <span>{{
                                                $t("message.Delete_Group")
                                            }}</span>
                                        </li>
                                    </ul>
                                    <i
                                        slot="reference"
                                        class="iconfont icon-more_"
                                        style="position: absolute; top: 0px; right: 10px;"
                                        @click="handleGroup($event)"
                                    />
                                </el-popover>
                            </template>
                            <div
                                v-if="el.groupUsers.length == 0"
                                class="no-people"
                            >
                                {{ $t("message.No_Stu") }}
                            </div>
                            <div
                                v-for="item in el.groupUsers"
                                v-if="el.groupUsers.length > 0"
                                :key="item.userId"
                                class="group-people"
                            >
                                <i
                                    v-if="item.isLeader == 1"
                                    class="iconfont icon-account"
                                />
                                <span
                                    style="width: 76%; display: inline-block;
                                            overflow: hidden;text-overflow:ellipsis;
                                            vertical-align: bottom;
                                            white-space: nowrap;"
                                >
                                    {{ item.username }}
                                </span>
                                <el-popover
                                    placement="bottom"
                                    width="186"
                                    trigger="click"
                                >
                                    <ul class="handle-group">
                                        <li
                                            @click="
                                                removeStudentFromGroup(item, el)
                                            "
                                        >
                                            <i class="iconfont icon-delete" />
                                            <span>{{
                                                $t("message.Remove")
                                            }}</span>
                                        </li>
                                        <li>
                                            <i
                                                v-if="item.isLeader == 1"
                                                class="iconfont icon-remove-leader"
                                            />
                                            <span
                                                v-if="item.isLeader == 1"
                                                @click="handleLeader(item, el)"
                                                >{{
                                                    $t("message.Remove_Leader")
                                                }}</span
                                            >

                                            <i
                                                v-if="item.isLeader == 0"
                                                class="iconfont icon-add-leader"
                                            />
                                            <span
                                                v-if="item.isLeader == 0"
                                                @click="handleLeader(item, el)"
                                                >{{
                                                    $t("message.Set_Leader")
                                                }}</span
                                            >
                                        </li>
                                        <li
                                            v-if="groupList.length > 1"
                                            @click="
                                                moveUserBelongStudyGroup(
                                                    item,
                                                    el
                                                )
                                            "
                                        >
                                            <i class="iconfont icon-switch" />
                                            <span>{{
                                                $t("message.Move_To")
                                            }}</span>
                                        </li>
                                    </ul>
                                    <i
                                        slot="reference"
                                        class="iconfont icon-morevert"
                                        @click="handlePeople($event)"
                                    />
                                </el-popover>
                            </div>
                        </el-collapse-item>
                    </el-collapse>

                    <!-- 添加/编辑小组 -->
                    <el-dialog
                        :title="$t('message.groupTitle')"
                        width="30%"
                        :visible.sync="editGroupVisible"
                        @closed="groupEditDialogClosed"
                    >
                        <el-form
                            ref="editGroupForm"
                            :model="editGroupForm"
                            :hide-required-asterisk="hide"
                            class="edit-group-form"
                        >
                            <el-form-item
                                :label="$t('message.Group_Name')"
                                prop="name"
                                :rules="[
                                    {
                                        required: true,
                                        message: $t('message.Mandatory'),
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 1,
                                        max: 100,
                                        message: $t('message.Characters_Limit'),
                                        trigger: 'blur'
                                    }
                                ]"
                                :label-width="formLabelWidth"
                            >
                                <el-input
                                    v-model="editGroupForm.name"
                                    :placeholder="$t('message.Group_Name')"
                                    class="group-name"
                                />
                            </el-form-item>
                            <el-form-item
                                v-if="!studyGroupSet.isStudentGroup"
                                prop="maxMemberNumber"
                            >
                                <!--:rules="[{validator: limitMembers, trigger: 'blur' }]">-->
                                {{ $t("message.Limit_Group") }}
                                <el-input-number
                                    v-model="editGroupForm.maxMemberNumber"
                                    controls-position="right"
                                    size="mini"
                                    :precision="0"
                                    :min="2"
                                    :max="999"
                                />

                                {{ $t("message.Limit_Num") }}
                            </el-form-item>
                            <el-form-item
                                v-if="studyGroupSet.isStudentGroup"
                                :label="$t('message.Joining')"
                                :label-width="formLabelWidth"
                            >
                                <el-select
                                    v-model="editGroupForm.joinType"
                                    placeholder="Select Group"
                                    style="width: 100%"
                                >
                                    <el-option
                                        :label="
                                            $t('message.People_Join_type_free')
                                        "
                                        :value="1"
                                    >
                                        {{
                                            $t("message.People_Join_type_free")
                                        }}
                                    </el-option>
                                    <el-option
                                        :label="
                                            $t(
                                                'message.People_Join_type_invite'
                                            )
                                        "
                                        :value="2"
                                    >
                                        {{
                                            $t(
                                                "message.People_Join_type_invite"
                                            )
                                        }}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="editGroupVisible = false">
                                {{ $t("message.Cancel") }}
                            </el-button>
                            <el-button
                                type="primary"
                                @click="saveGroup('editGroupForm')"
                            >
                                {{ $t("message.Save") }}
                            </el-button>
                        </div>
                    </el-dialog>

                    <!-- 用户移动所在组 -->
                    <el-dialog
                        :title="$t('message.Move_Student')"
                        :visible.sync="moveToVisible"
                        width="20%"
                    >
                        <el-form :model="selectGroups">
                            <el-form-item label="Groups" label-width="60">
                                <el-select
                                    v-model="moveTarget.targetGroupId"
                                    :placeholder="$t('message.Select_Group')"
                                >
                                    <el-option
                                        v-for="group in moveTargetGroups"
                                        :key="group.id"
                                        :label="group.name"
                                        :value="group.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="moveToVisible = false">{{
                                $t("message.Cancel")
                            }}</el-button>
                            <el-button type="primary" @click="handleMove">{{
                                $t("message.Move")
                            }}</el-button>
                        </span>
                    </el-dialog>

                    <!--删除小组-->
                    <el-dialog
                        :title="$t('message.Delete_Group')"
                        :visible.sync="deleteVisible"
                        width="20%"
                    >
                        <span>{{ $t("message.Are_you_sure") }}</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="deleteVisible = false">{{
                                $t("message.Cancel")
                            }}</el-button>
                            <el-button
                                type="primary"
                                @click="confirmDeleteGroup"
                                >{{ $t("message.OK") }}</el-button
                            >
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
let _this = {};
export default {
    filters: {},
    props: {
        studyGroupSet: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        _this = this;
        return {
            isStudentGroupSet: this.studyGroupSet.isStudentGroup == 1,
            studentList: [],
            groupList: [],
            unassignedStudentList: [],
            sectionList: [],

            unassignedStudentName: "",

            randomAssignModel: {
                studyGroupSetId: this.studyGroupSet.id,
                isLimitMemberInSameSection: 0
            },

            moveTargetGroups: [],

            moveTarget: {
                targetGroupId: "",
                userId: ""
            },

            editGroupForm: {
                // 编辑小组
                name: "",
                maxMemberNumber: "",
                joinType: 1,
                studyGroupSetId: this.studyGroupSet.id
            },

            studyGroupSetCloneForm: {
                id: this.studyGroupSet.id,
                name: ""
            },

            deleteGroupSetDialogVisible: false,
            cloneStudyGroupSetDialogVisible: false,

            input8: [],

            groupTitle: "",
            loading: false,
            restaurants: [],
            inGoups: [],
            groupUser: [],
            initGroup: [], // 移动前所在的小组
            limitNum: 2, // 编辑小组所限制人数
            editLimit: 2, // 编辑小组集所限制人数
            hide: true,
            stuNorepet: true, // 学生创建的小组不能重复加入同一个组
            stuGroupList: [],
            timeout: null,
            visible: false,
            moveToVisible: false,
            dialogVisible: false,
            deleteVisible: false,
            messageVisible: false,
            editGroupVisible: false, // 编辑小组
            dialogFormVisible: false,
            assigningVisible: false,
            messTextarea: "",
            checked: false,

            peoDisabled: true,
            selectGroups: {
                region: ""
            },
            editGroupData: {},

            formLabelWidth: "120px",
            groupSetVisible: false,
            signDisabled: true, // 是否允许自行注册
            setGroupForm: {
                name: "",
                createInput: "",
                limitInput: "",
                splitInput: "",
                signUp: false,
                sameSection: false,
                resource: "2", // Group Structure
                leadership: false,
                leaderRadio: "1",
                structure: false
            }
        };
    },

    computed: {
        randomAssignCanLimitSection() {
            let flag = false;
            if (this.groupList.length >= this.sectionList.length) {
                for (let i = 0; i < this.groupList.length; i++) {
                    const group = this.groupList[i];
                    if (group.groupUsers && group.groupUsers.length > 0) {
                        flag = true;
                        break;
                    }

                    if (group.maxMemberNumber && group.maxMemberNumber > 0) {
                        flag = true;
                        break;
                    }
                }
            } else {
                flag = true;
            }

            return flag;
        }
    },

    watch: {
        randomAssignCanLimitSection(newVal) {
            console.log("changed", newVal);
        }
    },

    created() {
        console.log("groupSet", this.studyGroupSet);
    },

    mounted() {
        this.loadStudyGroupList();
        this.loadUnassignedStudentList();
        this.loadSections();
    },

    methods: {
        maxGroupMemberNumber() {
            let num = 0;
            for (let i = 0; i < this.groupList.length; i++) {
                const users = this.groupList[i].groupUsers || [];
                if (users.length > num) {
                    num = users.length;
                }
            }
            return num;
        },

        async loadSections() {
            const result = await this.$getData("/section/list", {
                courseId: this.studyGroupSet.courseId
            });
            if (result.data.code == 200) {
                this.sectionList = result.data.entity || [];
            } else {
                this.$message.error(result.data.message);
            }
        },

        async loadStudyGroupList() {
            const result = await this.$getData("/studyGroup/list", {
                courseId: this.studyGroupSet.courseId,
                studyGroupSetId: this.studyGroupSet.id
            });
            if (result.data.code == 200) {
                this.groupList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },

        async loadUnassignedStudentList() {
            const data = {
                studyGroupSetId: this.studyGroupSet.id,
                username: this.unassignedStudentName
            };

            console.log("search", data);
            const result = await this.$getData(
                "/studyGroupSet/alternative/query",
                data
            );
            if (result.data.code == 200) {
                this.unassignedStudentList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },

        saveGroup(formName) {
            const peoLimit = this.editGroupForm.maxMemberNumber;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.editGroupForm.id) {
                        this.$http
                            .post(
                                `${process.env.NODE_ENV}/studyGroup/modify`,
                                this.editGroupForm
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.loadStudyGroupList();
                                    this.editGroupVisible = false;
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.$message.error(err);
                            });
                    } else {
                        this.$http
                            .post(
                                `${process.env.NODE_ENV}/studyGroup/add`,
                                this.editGroupForm
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.loadStudyGroupList();
                                    this.editGroupVisible = false;
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.$message.error(err);
                            });
                    }

                    // this.$emit('isLeader', this.groupList)
                } else {
                    return false;
                }
            });
        },

        async assignUser(user, group) {
            const result = await this.$getData(
                "/studyGroupUser/add",
                { userId: user.userId, studyGroupId: group.id },
                "post"
            );
            if (result.data.code == 200) {
                this.loadStudyGroupList();
                if (!this.isStudentGroupSet) {
                    const ind = this.unassignedStudentList.indexOf(user);
                    this.unassignedStudentList.splice(ind, 1);
                }
            } else {
                //this.$message.error(result.data.message);
            }
        },

        splitCount(rule, value, callback) {
            // 小组数量
            if (
                !this.setGroupForm.signUp &&
                this.setGroupForm.resource == "1"
            ) {
                if (!value) {
                    return callback(new Error("Mandatory"));
                }
                if (!Number.isInteger(value * 1)) {
                    callback(
                        new Error(this.$t("message.Must_enter_a_positive"))
                    );
                } else if (value < 1) {
                    callback(
                        new Error(this.$t("message.Must_enter_a_positive"))
                    );
                } else {
                    callback();
                }
            } else if (
                !this.setGroupForm.signUp &&
                this.setGroupForm.resource == "2"
            ) {
                callback();
            }
        },
        limitMember(rule, value, callback) {
            if (this.setGroupForm.signUp) {
                if (value == "") {
                    return callback();
                }
                if (!Number.isInteger(value * 1)) {
                    callback(
                        new Error(
                            `Must fill in a number greater than or equal to ${this.editLimit}`
                        )
                    );
                } else if (value < this.editLimit) {
                    callback(
                        new Error(
                            `Must fill in a number greater than or equal to ${this.editLimit}`
                        )
                    );
                } else {
                    callback();
                }
            }
        },

        async confirmDeleteGroupSet() {
            const result = await this.$getData(
                "/studyGroupSet/deletes",
                [this.studyGroupSet.id],
                "post"
            );
            if (result.data.code == 200) {
                this.deleteGroupSetDialogVisible = false;
                this.$emit("removeStudyGroupSet", this.studyGroupSet);
            } else {
                this.$message.error(result.data.message);
            }
        },

        handleChange(val) {
            // console.log(val);
        },

        handleGroups() {
            this.visible = !this.visible;
        },

        handleGroup(e) {
            e.stopPropagation();
            this.visible = !this.visible;
        },

        handleDetail(e) {
            e.stopPropagation();
        },

        visitGroup(group) {
            // alert("visit group home")
            this.$router.push({
                path: "/homePage/teacherMain/groupPeople",
                query: { groupId: group.id, courseId: group.courseId }
            });
        },

        addGroup() {
            this.editGroupVisible = true;
            this.groupTitle = this.$t("message.Add_Group");
        },

        editGroup(el) {
            this.groupTitle = this.$t("message.Edit_Group");
            this.editGroupVisible = true;
            this.editGroupData = el;
            this.editGroupForm.id = el.id;
            this.editGroupForm.name = el.name;
            this.editGroupForm.joinType = el.joinType;
            this.editGroupForm.studyGroupSetId = el.studyGroupSetId;
            this.editGroupForm.maxMemberNumber = el.maxMemberNumber;

            this.limitNum = el.memberNumber;
        },

        // limitMembers(rule, value, callback) {
        //   console.log("check", value)
        //   if (value == "") {
        //     return callback();
        //   }
        //   if (!Number.isInteger(value * 1)) {
        //     callback(new Error(`Must fill in a number greater than or equal to ${this.limitNum}`));
        //   } else {
        //     if (value<this.limitNum) {
        //       callback(new Error(`Must fill in a number greater than or equal to ${this.limitNum}`));
        //     } else {
        //       this.limitNum = 2
        //       callback();
        //     }
        //   }
        // },
        deleteGroup(group) {
            this.deleteVisible = true;
            this.editGroupData = group;
        },

        async confirmDeleteGroup() {
            const ind = this.groupList.indexOf(this.editGroupData);
            const result = await this.$getData(
                "/studyGroup/deletes",
                [this.editGroupData.id],
                "post"
            );
            if (result.data.code == 200) {
                this.deleteVisible = false;
                this.loadStudyGroupList();
                if (
                    this.editGroupData.groupUsers &&
                    this.editGroupData.groupUsers.length > 0
                ) {
                    this.loadUnassignedStudentList();
                    this.loadStudyGroupList();
                }
            } else {
                this.$message.error(result.data.message);
            }

            this.$emit("isLeader", this.groupList);
        },
        // handleEdit(formName) {
        //   this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //       console.log(this.groupsList.entity);
        //       this.groupSetVisible = false
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   })
        //   // this.visible = !this.visible
        // },

        handlePeople() {},
        async removeStudentFromGroup(user, group) {
            const result = await this.$getData(
                "/studyGroupUser/deletes",
                { studyGroupId: group.id, userId: user.userId },
                "post"
            );
            if (result.data.code == 200) {
                const ind = group.groupUsers.indexOf(user);
                group.groupUsers.splice(ind, 1);
                this.loadUnassignedStudentList();
            } else {
                this.$message.error(result.data.message);
            }

            this.$emit("isLeader", this.groupList);
        },
        moveUserBelongStudyGroup(user, group) {
            this.moveToVisible = true;
            this.moveTargetGroups = [];
            this.groupList.forEach(g => {
                if (g.maxMemberNumber) {
                    if (
                        g.id != group.id &&
                        g.groupUsers.length < g.maxMemberNumber
                    ) {
                        // debugger
                        this.moveTargetGroups.push(g);
                    }
                } else if (g.id != group.id) {
                    this.moveTargetGroups.push(g);
                }
            });
            console.log("this.moveTargetGroups", this.moveTargetGroups);

            this.moveTarget.userId = user.userId;
        },
        async handleMove() {
            const result = await this.$getData(
                "/studyGroupUser/move/edit",
                this.moveTarget,
                "post"
            );
            if (result.data.code == 200) {
                this.moveToVisible = false;
                this.loadStudyGroupList();
            } else {
                this.$message.error(result.data.message);
            }

            this.$emit("isLeader", this.groupList);
        },
        // messageStudents() {
        //   this.messageVisible = true
        // },

        goRandomAssign() {
            this.assigningVisible = true;
        },

        async randomAssign() {
            const result = await this.$getData(
                "/studyGroupUser/assign/edit",
                this.randomAssignModel,
                "post"
            );
            if (result.data.code == 200) {
                this.loadStudyGroupList();
                this.loadUnassignedStudentList();
                this.assigningVisible = false;
            } else {
                this.$message.error(result.data.message);
            }
        },

        goEditGroupSet() {
            this.studyGroupSet.maxGroupMemberNumber = this.maxGroupMemberNumber();
            this.$emit("editGroupSet", this.studyGroupSet);
        },

        goCloneGroupSet() {
            this.studyGroupSetCloneForm.name = `(Clone)${this.studyGroupSet.name}`;
            this.cloneStudyGroupSetDialogVisible = true;
        },

        goDeleteGroupSet() {
            this.deleteGroupSetDialogVisible = true;
        },

        confirmCloneGroupSet(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/studyGroupSet/copy/edit`,
                            this.studyGroupSetCloneForm
                        )
                        .then(result => {
                            if (result.data.code == 200) {
                                this.cloneStudyGroupSetDialogVisible = false;
                                this.$emit(
                                    "cloneStudyGroupSet",
                                    this.studyGroupSet
                                );
                            } else {
                                this.$message.error(result.data.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
            });
        },

        groupEditDialogClosed() {
            this.editGroupForm.id = "";
            this.editGroupForm.name = "";
            this.resetFormFields("editGroupForm");
        },

        resetFormFields(formName) {
            this.$refs[formName].resetFields();
        },

        async handleLeader(user, group) {
            const param = {
                studyGroupId: group.id,
                leaderId: user.isLeader == 1 ? null : user.userId
            };

            const result = await this.$getData(
                "/studyGroupUser/leader/edit",
                param,
                "post"
            );
            if (result.data.code == 200) {
                this.loadStudyGroupList();
            } else {
                this.$message.error(result.data.message);
            }

            this.$emit("isLeader", this.groupList);
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
.group-top {
    span {
        display: inline-block;
        width: 54%;
    }
    .tips {
        height: 42px;
    }
    .icon-help {
        font-size: 20px;
        display: block;
        float: left;
        margin-top: 2px;
        color: red;
    }
    b {
        font-weight: normal;
        margin-left: 26px;
        display: block;
    }
    .group {
        float: right;
        display: flex;
        button {
            padding: 8px 12px;
            margin-left: 10px;
        }
        .icon-add {
            font-size: 22px;
            vertical-align: -3px;
            display: inline-block;
        }
        .recipients {
            font-weight: 500;
        }
        span {
            width: inherit;
        }
    }
}

.group-con {
    overflow: hidden;
    margin-top: 16px;
    h3 {
        font-weight: 600;
        margin-bottom: 10px;
    }
    .left-con {
        box-sizing: border-box;
        float: left;
        border: 1px solid #f4f4f4;
        padding: 10px;
        width: 32%;
        .unassigned {
            width: 100%;
            text-align: center;
            line-height: 2;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            margin: 10px 0;
            font-weight: 600;
            padding-right: 6px;
            box-sizing: border-box;
            .unassignedName {
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: middle;
            }
            .icon-add {
                font-size: 22px;
                font-weight: normal;
                cursor: pointer;
            }
        }
        .no-stu {
            padding: 10px 0;
            width: 80%;
            text-align: center;
            color: #999;
            margin: 0 auto;
        }
    }
    .right-con {
        box-sizing: border-box;
        float: right;
        padding: 10px;
        border: 1px solid #f4f4f4;
        width: 66%;
        .no-group {
            padding: 10px 0;
            width: 80%;
            text-align: center;
            color: #999;
            margin: 0 auto;
        }
        .group-detail {
            width: 100%;
            padding: 0px 20% 0 20px;
            box-sizing: border-box;
            cursor: default;
            display: flex;
            justify-content: space-between;
            .group-name {
                display: inline-block;
                font-weight: 600;
                /*width: 34%;*/

                max-width: 30%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .group-leader {
                display: inline-block;
                width: 34%;
                i {
                    margin-right: 6px;
                }
            }
            .group-num {
                em {
                    margin-right: 6px;
                }
            }
        }
        .group-people {
            width: 28%;
            line-height: 36px;
            height: 36px;
            border: 1px solid #999;
            border-radius: 4px;
            margin-top: 16px;
            padding: 0 10px;
            float: left;
            margin: 10px;
            .icon-morevert {
                float: right;
                cursor: pointer;
            }
        }
        .icon-more_ {
            font-size: 24px;
        }
        .no-people {
            text-align: center;
            margin-top: 20px;
        }
    }
}

.select-group li {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30px;
    color: #0e38b1;
    font-weight: 600;
    cursor: pointer;
}

.handle-group {
    li {
        line-height: 36px;
        cursor: pointer;
        margin-left: -12px;
        padding-left: 12px;
        width: 106%;
        &:hover {
            background-color: #e7ebf7;
            color: #3e60c1;
        }
        span {
            font-weight: 600;
        }
    }
    .iconfont {
        margin-right: 6px;
    }
}

/*.group-name {*/
/*width: 50%;*/
/*}*/

.clone-name {
    width: 76%;
}

.group-limit {
    width: 10%;
    margin: 0 16px;
}

.no-assign {
    color: #0e38b1;
}

.group-set-name {
    display: inline-block;
    font-weight: 600;
    width: 76%;
}

.same-section {
    display: inherit;
    margin-left: 24%;
}

.split-group {
    width: 10%;
    margin: 0 10px;
}

.icon-help {
    font-size: 20px;
    margin-left: 5px;
    color: red;
}

.member-limit {
    margin-left: 24%;
    margin-top: 10px;
}
</style>
