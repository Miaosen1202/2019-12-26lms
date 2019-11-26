<template>
    <div>
        <!--eslint-disable-->
        <!--教师端人员显示-->
        <div v-show="people" class="people">
            <!-- 创建小组集按钮 -->
            <el-button
                class="group-set"
                type="primary"
                @click="addTab(activeTabName)"
            >
                <i class="iconfont icon-add" />
                <span> {{ $t("message.Create_Group_Set") }} </span>
            </el-button>

            <!-- 人员管理 -->
            <el-tabs ref="elTabs" v-model="activeTabName">
                <!-- 课程班级人员管理 -->
                <el-tab-pane name="Everyone">
                    <span slot="label">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="$t('message.Everyone')"
                            placement="top"
                        >
                            <i class="group-title">{{
                                $t("message.Everyone")
                            }}</i>
                        </el-tooltip>
                    </span>
                    <v-personnel />
                </el-tab-pane>

                <!-- 无学习小组集合时描述信息 -->
                <el-tab-pane
                    v-if="
                        studyGroupSetList.length == 0 ||
                            (studyGroupSetList.length == 1 &&
                                studyGroupSetList[0].isStudentGroup == 1 &&
                                studyGroupSetList[0].groupNumber == 0)
                    "
                    name="studyGroupDescPanel"
                >
                    <span slot="label">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="$t('message.Everyone')"
                            placement="top"
                        >
                            <i class="group-title">{{
                                $t("message.Groups")
                            }}</i>
                        </el-tooltip>
                    </span>
                    <el-alert
                        :title="
                            $t('message.People_study_group_description_ch1')
                        "
                        :description="
                            $t('message.People_study_group_description_ch2')
                        "
                        type="info"
                        show-icon
                    />
                </el-tab-pane>

                <!-- 课程学习小组集合列表 -->
                <el-tab-pane
                    v-for="(item, index) in studyGroupSetList"
                    v-if="item.isStudentGroup == 0 || item.groupNumber > 0"
                    :key="item.id"
                    :name="'group_set_' + item.id"
                    :lazy="true"
                >
                    <span slot="label">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="item.name"
                            placement="top"
                        >
                            <i class="group-title">{{ item.name }}</i>
                        </el-tooltip>
                    </span>
                    <groups
                        :study-group-set="item"
                        @removeStudyGroupSet="removeStudyGroupSet"
                        @cloneStudyGroupSet="cloneStudyGroupSet"
                        @editGroupSet="editGroupSet"
                    />
                </el-tab-pane>
            </el-tabs>

            <v-goTop />

            <v-group-set
                v-show="studyGroupSetEditDialogVisible"
                :course-id="courseId"
                :update-study-group-set="currentEditStudyGroupSet"
                :visible="studyGroupSetEditDialogVisible"
                @closed="studyGroupSetClosed"
                @added="groupSetAdded"
                @updated="loadStudyGroupSetList"
            />
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
import goTop from "../../utils/goTop.vue";
import personnel from "./people/personnel.vue";
import groups from "@/components/course/people/groups.vue";
import groupSet from "./people/studyGroupSet.vue";
// import stugroups from "@/components/course/people/stugroups.vue";

export default {
    components: {
        "v-goTop": goTop,
        groups,
        "v-group-set": groupSet,
        "v-personnel": personnel
        // "v-studyGroups": stugroups,
    },
    data() {
        return {
            radio3: "",
            courseId: this.$route.query.courseId,
            people: true,
            showStudyGroups: false,

            studyGroupSetList: [],
            studyGroupSetGroupsMap: {},

            studyGroupSetEditDialogVisible: false,

            currentEditStudyGroupSet: null,
            studyGroupSetForm: {
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
            },

            activeTabName: "Everyone",

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
            },
            groupTips: {
                display: "none"
            }
        };
    },
    created() {
        this.loadStudyGroupSetList();
    },
    updated() {
        // console.log("studyGroupSetList............",this.studyGroupSetList)
        const childrenRefs = this.$refs.elTabs;
        // console.log(this.$children[1].$children[0])
        this.$children[1].$children[0].$forceUpdate();
    },
    mounted() {
        // console.log(groupList)
    },
    methods: {
        groupTipsShow(that) {
            const ids = `groupSet${that}`;

            this.groupTips.display = "inline-block";
            console.log(this.$refs.ids);
        },
        groupMaxMemberNumberRule(rule, val, callback) {
            console.log("rule", rule, val);

            let maxMemberNumber = 2;
            if (this.studyGroupSetForm.isUpdate) {
                maxMemberNumber =
                    this.currentEditStudyGroupSet.maxGroupMemberNumber || 2;
            }
            // val == 0 表示不限制
            if (
                this.studyGroupSetForm.allowSelfSignup &&
                val != 0 &&
                val < maxMemberNumber
            ) {
                callback(
                    new Error(
                        `${this.$t(
                            "message.People_study_group_set_rule_member_min_limit"
                        )} ${maxMemberNumber}`
                    )
                );
            } else {
                callback();
            }
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
            return true;
        },

        groupSetAdded(groupSet) {
            this.loadStudyGroupSetList(`group_set_${groupSet.id}`);
        },

        editGroupSet(groupSet) {
            this.currentEditStudyGroupSet = groupSet;
            console.log("update......", this.currentEditStudyGroupSet);

            this.studyGroupSetForm.isUpdate = true;
            this.studyGroupSetForm.id = groupSet.id;
            this.studyGroupSetForm.name = groupSet.name;
            this.studyGroupSetForm.isSectionGroup =
                groupSet.isSectionGroup == 1;
            this.studyGroupSetForm.allowSelfSignup =
                groupSet.allowSelfSignup == 1;
            this.studyGroupSetForm.groupMaxMemberNumber =
                groupSet.groupMemberNumber;

            this.studyGroupSetForm.autoAssignLeader =
                groupSet.leaderSetStrategy != 1;
            this.studyGroupSetForm.leaderSetStrategy =
                groupSet.leaderSetStrategy;

            this.studyGroupSetEditDialogVisible = true;
        },

        saveStudyGroupSetEdit(form) {
            console.log(
                "save group set",
                JSON.stringify(this.studyGroupSetForm)
            );
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
                                    this.loadStudyGroupSetList();
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
                                    this.studyGroupSetEditDialogVisible = false;
                                    this.loadStudyGroupSetList();
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

        removeStudyGroupSet(groupSet) {
            const ind = this.studyGroupSetList.indexOf(groupSet);
            this.studyGroupSetList.splice(ind, 1);
            this.activeTabName = "Everyone";
        },

        cloneStudyGroupSet() {
            this.loadStudyGroupSetList();
        },

        addTab() {
            this.studyGroupSetEditDialogVisible = true;
        },

        studyGroupSetClosed() {
            this.studyGroupSetEditDialogVisible = false;
            this.currentEditStudyGroupSet = null;
        }
    }
};
/*eslint-disable*/
</script>

<style scoped>
.people {
    padding-top: 36px;
    width: 90%;
    position: relative;
}

.group-set {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 13px;
}

.group-set .icon-add {
    font-size: 22px;
    vertical-align: -3px;
    display: inline-block;
}

.group-set .icon-add span {
    font-size: 14px;
    vertical-align: middle;
    padding-left: 4px;
}

.no-group h3 {
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    top: 10px;
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
.group-title {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.group-title-tips {
    height: 26px;
    border: 1px solid #333;
    border-radius: 6px;
    position: absolute;
    top: -14px;
}
/deep/ .el-tabs__item {
    position: relative;
}
</style>
