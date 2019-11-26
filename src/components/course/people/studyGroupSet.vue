`
<template>
    <div>
        <!--eslint-disable-->
        <!-- 学习小组集创建对话框 -->
        <el-dialog
            v-if="!this.updateStudyGroupSet"
            :title="$t('message.People_study_group_set_create_title')"
            :visible.sync="studyGroupSetEditDialogVisible"
            @closed="studyGroupSetEditDialogClose"
        >
            <el-form
                ref="studyGroupSetForms"
                :model="studyGroupSetForm"
                :label-position="'right'"
                :rules="studyGroupSetEditRules"
                label-width="180px"
            >
                <!-- 小组集名称 -->
                <el-form-item
                    prop="name"
                    :label="$t('message.People_study_group_set_name')"
                >
                    <el-input
                        v-model="studyGroupSetForm.name"
                        style="width: 50%;"
                    />
                </el-form-item>

                <!-- 限制小组用户在同一班级 -->
                <!--<el-form-item>-->
                <!--<el-checkbox v-model="studyGroupSetForm.isSectionGroup"-->
                <!--:disabled="studyGroupSetForm.manualCreateGroup != 0 && studyGroupSetForm.allowSelfSignup != 1">-->
                <!--{{ $t('message.Require_group_members_to_be_in_the_same_section') }}-->
                <!--</el-checkbox>-->
                <!--</el-form-item>-->

                <!-- 自行注册小组 -->
                <el-form-item
                    :label="$t('message.People_study_group_set_self_signup')"
                >
                    <el-checkbox
                        v-model="studyGroupSetForm.allowSelfSignup"
                        :label="$t('message.Allow_Self_Sign_up')"
                    />
                </el-form-item>

                <!-- 是否立即创建小组及小组最大人数设置 -->
                <el-form-item
                    :label="
                        $t('message.People_study_group_set_group_structure')
                    "
                >
                    <div v-if="studyGroupSetForm.allowSelfSignup == 1">
                        <div>
                            <span>{{
                                $t(
                                    "message.People_study_group_set_group_now_pre"
                                )
                            }}</span>
                            <el-input-number
                                v-model="studyGroupSetForm.createNGroupNumber"
                                size="mini"
                                controls-position="right"
                                :precision="0"
                                :min="1"
                                :rule="[
                                    {
                                        min: 1,
                                        message: 'Must great than 0',
                                        trigger: 'blur'
                                    }
                                ]"
                            />
                            <span>{{
                                $t(
                                    "message.People_study_group_set_group_now_suf"
                                )
                            }}</span>
                        </div>
                        <div>
                            <span>{{
                                $t(
                                    "message.People_study_group_set_member_limit_pre"
                                )
                            }}</span>
                            <el-input-number
                                v-model="studyGroupSetForm.groupMaxMemberNumber"
                                size="mini"
                                controls-position="right"
                                :precision="0"
                                :min="2"
                            />
                            <span>{{
                                $t(
                                    "message.People_study_group_set_member_limit_suf"
                                )
                            }}</span>
                        </div>
                    </div>

                    <!-- 是否立即分配学生到小组 -->
                    <div v-if="studyGroupSetForm.allowSelfSignup == 0">
                        <el-radio-group
                            v-model="studyGroupSetForm.manualCreateGroup"
                        >
                            <div>
                                <el-radio :label="0">
                                    <span>{{
                                        $t(
                                            "message.People_study_group_set_split_student_pre"
                                        )
                                    }}</span>
                                    <el-input-number
                                        v-model="
                                            studyGroupSetForm.createNGroupNumber
                                        "
                                        size="mini"
                                        controls-position="right"
                                        :precision="0"
                                        :min="1"
                                        :rule="[
                                            {
                                                min: 1,
                                                message: 'must greate than 0',
                                                trigger: 'blur'
                                            }
                                        ]"
                                    />
                                    <span>{{
                                        $t(
                                            "message.People_study_group_set_split_student_suf"
                                        )
                                    }}</span>
                                </el-radio>
                            </div>
                            <div>
                                <el-radio :label="1">
                                    {{
                                        $t(
                                            "message.People_study_group_set_manually_create"
                                        )
                                    }}
                                </el-radio>
                            </div>
                        </el-radio-group>
                    </div>
                </el-form-item>

                <!-- 组长设置策略 -->
                <el-form-item
                    v-if="
                        studyGroupSetForm.manualCreateGroup == 0 ||
                            studyGroupSetForm.allowSelfSignup == 1
                    "
                    :label="$t('message.People_study_group_set_leadership')"
                >
                    <div>
                        <el-checkbox
                            v-model="studyGroupSetForm.autoAssignLeader"
                            @change="changeAutoAssignLeader"
                        >
                            {{
                                $t(
                                    "message.Automatically_assign_a_student_group_leader"
                                )
                            }}
                        </el-checkbox>
                    </div>
                    <el-radio-group
                        v-model="studyGroupSetForm.leaderSetStrategy"
                        :disabled="!studyGroupSetForm.autoAssignLeader"
                    >
                        <div>
                            <el-radio :label="2">
                                {{
                                    $t(
                                        "message.Set_first_student_to_join_as_group_leader"
                                    )
                                }}
                            </el-radio>
                        </div>
                        <div>
                            <el-radio :label="3">
                                {{
                                    $t(
                                        "message.Set_a_random_student_as_group_leader"
                                    )
                                }}
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSave">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button
                    type="primary"
                    @click="saveStudyGroupSetEdit('studyGroupSetForms')"
                >
                    {{ $t("message.Common_confirm") }}
                </el-button>
            </div>
        </el-dialog>

        <!--学习小组集修改对话框-->
        <el-dialog
            v-if="updateStudyGroupSet != null"
            :title="$t('message.People_study_group_set_edit_title')"
            :visible.sync="studyGroupSetEditDialogVisible"
            @closed="studyGroupSetEditDialogClose"
        >
            <el-form
                ref="studyGroupSetForms"
                :model="studyGroupSetForm"
                :label-position="'right'"
                :rules="studyGroupSetEditRules"
                label-width="180px"
            >
                <!-- 小组集名称 -->
                <el-form-item
                    prop="name"
                    :label="$t('message.People_study_group_set_name')"
                >
                    <el-input
                        v-model="studyGroupSetForm.name"
                        style="width: 50%;"
                    />
                </el-form-item>

                <!-- 限制小组用户在同一班级 -->
                <!--<el-form-item>-->
                <!--<el-checkbox v-model="studyGroupSetForm.isSectionGroup"-->
                <!--:disabled="studyGroupSetForm.manualCreateGroup != 0 && studyGroupSetForm.allowSelfSignup != 1">-->
                <!--{{ $t('message.Require_group_members_to_be_in_the_same_section') }}-->
                <!--</el-checkbox>-->
                <!--</el-form-item>-->

                <!-- 自行注册小组 -->
                <el-form-item
                    :label="$t('message.People_study_group_set_self_signup')"
                >
                    <el-checkbox
                        v-model="studyGroupSetForm.allowSelfSignup"
                        :label="$t('message.Allow_Self_Sign_up')"
                    />
                </el-form-item>

                <!-- 是否立即创建小组及小组最大人数设置 -->
                <el-form-item
                    prop="groupMaxMemberNumber"
                    :label="
                        $t('message.People_study_group_set_group_structure')
                    "
                >
                    <div>
                        <span
                            >{{
                                $t(
                                    "message.People_study_group_set_member_limit_pre"
                                )
                            }}
                        </span>
                        <el-input-number
                            v-model="studyGroupSetForm.groupMaxMemberNumber"
                            size="mini"
                            controls-position="right"
                            :precision="0"
                            :min="0"
                            :disabled="!studyGroupSetForm.allowSelfSignup"
                        />
                        <span>{{
                            $t(
                                "message.People_study_group_set_member_limit_suf"
                            )
                        }}</span>
                    </div>
                </el-form-item>

                <!-- 组长设置策略 -->
                <el-form-item
                    :label="$t('message.People_study_group_set_leadership')"
                >
                    <div>
                        <el-checkbox
                            v-model="studyGroupSetForm.autoAssignLeader"
                        >
                            {{
                                $t(
                                    "message.Automatically_assign_a_student_group_leader"
                                )
                            }}
                        </el-checkbox>
                    </div>
                    <el-radio-group
                        v-model="studyGroupSetForm.leaderSetStrategy"
                        :disabled="!studyGroupSetForm.autoAssignLeader"
                    >
                        <div>
                            <el-radio :label="2">
                                {{
                                    $t(
                                        "message.Set_first_student_to_join_as_group_leader"
                                    )
                                }}
                            </el-radio>
                        </div>
                        <div>
                            <el-radio :label="3">
                                {{
                                    $t(
                                        "message.Set_a_random_student_as_group_leader"
                                    )
                                }}
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSave">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button
                    type="primary"
                    @click="saveStudyGroupSetEdit('studyGroupSetForms')"
                >
                    {{ $t("message.Common_confirm") }}
                </el-button>
            </div>
        </el-dialog>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
export default {
    props: ["visible", "updateStudyGroupSet", "courseId"],

    data() {
        return {
            studyGroupSetEditDialogVisible: this.visible,
            studyGroupSetForm: {
                isUpdate: false,
                id: "",
                name: "",
                isSectionGroup: 0,
                allowSelfSignup: 0,
                createNGroupNumber: 1,
                groupMaxMemberNumber: "",
                manualCreateGroup: 1,
                leaderSetStrategy: 1,

                autoAssignLeader: 0
            },

            studyGroupSetEditRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Common_rule_cannot_be_empty"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t(
                            "message.People_study_group_set_rule_name"
                        ),
                        trigger: "blur"
                    }
                ],
                groupMaxMemberNumber: [
                    {
                        type: "number",
                        validator: this.groupMaxMemberNumberRule,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    watch: {
        visible(cur) {
            if (cur == true) {
                this.studyGroupSetEditDialogVisible = true;
            }
        },

        updateStudyGroupSet(groupSet) {
            if (this.updateStudyGroupSet != null) {
                this.initUpdateData();
            }
        }
    },
    created() {
        console.log("update", this.updateStudyGroupSet);
        if (this.updateStudyGroupSet != null) {
            this.initUpdateData();
        }
    },

    methods: {
        changeAutoAssignLeader(val) {
            if (val) {
                this.studyGroupSetForm.leaderSetStrategy = 2;
            } else {
                this.studyGroupSetForm.leaderSetStrategy = 1;
            }
        },
        initUpdateData() {
            this.studyGroupSetForm.isUpdate = true;
            this.studyGroupSetForm.id = this.updateStudyGroupSet.id;
            this.studyGroupSetForm.name = this.updateStudyGroupSet.name;
            this.studyGroupSetForm.isSectionGroup =
                this.updateStudyGroupSet.isSectionGroup == 1;
            this.studyGroupSetForm.allowSelfSignup =
                this.updateStudyGroupSet.allowSelfSignup == 1;
            this.studyGroupSetForm.groupMaxMemberNumber = this.updateStudyGroupSet.groupMemberNumber;

            this.studyGroupSetForm.autoAssignLeader =
                this.updateStudyGroupSet.leaderSetStrategy != 1;
            this.studyGroupSetForm.leaderSetStrategy = this.updateStudyGroupSet.leaderSetStrategy;
        },

        cancelSave() {
            this.studyGroupSetEditDialogVisible = false;
            this.$emit("canceled");
        },

        saveStudyGroupSetEdit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    const data = {
                        id: this.studyGroupSetForm.id,
                        courseId: this.courseId,
                        name: this.studyGroupSetForm.name,
                        allowSelfSignup: this.studyGroupSetForm.allowSelfSignup
                            ? 1
                            : 0
                    };
                    if (this.studyGroupSetForm.allowSelfSignup) {
                        data.isSectionGroup = this.studyGroupSetForm
                            .isSectionGroup
                            ? 1
                            : 0;
                        data.groupMemberNumber =
                            this.studyGroupSetForm.groupMaxMemberNumber > 0
                                ? this.studyGroupSetForm.groupMaxMemberNumber
                                : null;
                        data.createNGroup = this.studyGroupSetForm.createNGroupNumber;
                        data.leaderSetStrategy = this.studyGroupSetForm
                            .autoAssignLeader
                            ? this.studyGroupSetForm.leaderSetStrategy
                            : 1;
                    } else if (!this.studyGroupSetForm.manualCreateGroup) {
                        data.isSectionGroup = this.studyGroupSetForm
                            .isSectionGroup
                            ? 1
                            : 0;
                        data.createNGroup = this.studyGroupSetForm.createNGroupNumber;
                        data.leaderSetStrategy = this.studyGroupSetForm
                            .autoAssignLeader
                            ? this.studyGroupSetForm.leaderSetStrategy
                            : 1;
                    }

                    if (
                        this.studyGroupSetForm.isUpdate &&
                        !this.studyGroupSetForm.allowSelfSignup
                    ) {
                        data.isSectionGroup = 0;
                    }

                    if (this.studyGroupSetForm.isUpdate) {
                        this.$http
                            .post(
                                `${process.env.NODE_ENV}/studyGroupSet/modify`,
                                data
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.studyGroupSetEditDialogVisible = false;
                                    // this.loadStudyGroupSetList();
                                    this.$emit("updated");
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
                                `${process.env.NODE_ENV}/studyGroupSet/add`,
                                data
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    data.id = res.data.message;
                                    this.$emit("added", data);
                                    this.studyGroupSetEditDialogVisible = false;
                                    // this.loadStudyGroupSetList();
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.$message.error(err);
                            });
                    }
                } else {
                    console.log("valid fail");
                    return false;
                }
            });
        },

        studyGroupSetEditDialogClose() {
            this.$refs.studyGroupSetForms.resetFields();
            this.studyGroupSetForm = {
                isUpdate: false,
                id: "",
                name: "",
                isSectionGroup: 0,
                allowSelfSignup: 0,

                createNGroupNumber: "",
                groupMaxMemberNumber: "",
                manualCreateGroup: 1,
                leaderSetStrategy: 1,

                autoAssignLeader: 0
            };
            this.$emit("closed");
            return true;
        }
    }
};
/*eslint-disable*/
</script>
<style scoped="scoped"></style>
