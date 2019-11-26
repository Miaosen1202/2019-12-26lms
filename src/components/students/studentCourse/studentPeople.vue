<template>
    <div>
        <!--eslint-disable-->
        <div class="stugroups-box" v-show="stugroupsBox">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('message.Everyone')" name="first">
                    <div class="stugroups-seach">
                        <el-form ref="queryForm" label-width="80px">
                            <el-input
                                v-model="query.name"
                                @blur="loadCourseUsers"
                                @keyup.enter.native="loadCourseUsers"
                                :placeholder="$t('message.Common_search')"
                                maxlength="100"
                            >
                                <i
                                    slot="prefix"
                                    class="el-input__icon el-icon-search"
                                ></i>
                            </el-input>
                            <el-select
                                v-model="query.roleId"
                                clearable
                                @change="loadCourseUsers"
                                :placeholder="
                                    $t('message.Common_please_select')
                                "
                            >
                                <el-option
                                    v-for="item in sectionRoleAndPeopleList"
                                    :key="item.roleId"
                                    :label="
                                        item.roleName +
                                            '(' +
                                            item.courseUserNumber +
                                            ')'
                                    "
                                    :value="item.roleId"
                                >
                                </el-option>
                            </el-select>
                        </el-form>
                    </div>
                    <div class="syllabus_list">
                        <el-table
                            border
                            :data="courseUserList"
                            v-loading="loadingUserList"
                            row-key="userId"
                            :empty-text="loadingUserList ? ' ' : 'No data'"
                            :header-cell-style="getRowClass"
                            style="width: 100%"
                        >
                            <el-table-column
                                :label="$t('message.People_username')"
                                prop="username"
                                width="220px"
                            >
                                <template slot-scope="scope">
                                    <!--<i class="iconfont icon-account" style="font-size: 20px;"></i>-->
                                    <a
                                        href="javascript:;"
                                        @click="gotoUserDetail(scope.row)"
                                        class="avatar"
                                    >
                                        <img
                                            :src="
                                                getAvatar(
                                                    scope.row.avatarFileUrl
                                                )
                                            "
                                        />
                                    </a>
                                    <span
                                        @click="gotoUserDetail(scope.row)"
                                        style="margin-left: 10px"
                                        >{{ scope.row.username }}</span
                                    >
                                    <span
                                        v-if="
                                            !getUserState(scope.row).isActive ||
                                                !getUserState(scope.row)
                                                    .isJoined
                                        "
                                        style="margin-left: 10px;white-space:nowrap"
                                        class="personnel-state personnel-inactive1"
                                    >
                                        {{
                                            !getUserState(scope.row).isActive
                                                ? $t(
                                                      "message.People_inactive_tip"
                                                  )
                                                : !getUserState(scope.row)
                                                      .isJoined
                                                ? $t(
                                                      "message.People_pending_tip"
                                                  )
                                                : ""
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('message.People_nickname')"
                                prop="nickname"
                                align="center"
                            >
                            </el-table-column>

                            <el-table-column
                                :label="$t('message.People_section')"
                                prop="sectionId"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span
                                        class="section-role"
                                        v-for="item in scope.row
                                            .sectionUserDetailVos"
                                    >
                                        {{ item.sectionName }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('message.People_role')"
                                prop="roleName"
                                align="center"
                                class="cel-box"
                            >
                                <template slot-scope="scope">
                                    <span
                                        class="section-role"
                                        v-for="item in scope.row
                                            .sectionUserDetailVos"
                                    >
                                        {{ item.roleName }}
                                    </span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                :label="$t('message.People_last_activity')"
                                prop="lastActivity"
                                align="center"
                                width="160px"
                            >
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.lastActivity | formatDate
                                    }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('message.Groups')" name="second">
                    <!-- 搜索 -->
                    <div class="stugroups-seach">
                        <!--搜索-->
                        <el-input
                            v-model="groupOrMemberSearchName"
                            :placeholder="$t('message.username_or_group_name')"
                            @change="filterGroupOrMembers"
                            maxlength="100"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-search"
                            ></i>
                        </el-input>

                        <!--添加学生小组-->
                        <el-button @click="goAddGroup">
                            <i
                                class="iconfont icon-add"
                                style="font-size: 22px;
						    vertical-align: -3px;
						    display: inline-block;"
                            ></i>
                            <span>{{ $t("message.Groups") }}</span>
                        </el-button>
                    </div>

                    <div class="stugroups-list-box">
                        <div
                            class="stugroups-list"
                            v-for="(group, index) in studyGroupList"
                        >
                            <el-collapse
                                v-model="activeNames"
                                @change="handleChange"
                                accordion
                            >
                                <el-collapse-item>
                                    <template slot="title">
                                        <ul
                                            class="stugroups-list-title clearfix"
                                        >
                                            <li
                                                style="padding-left: 30px;"
                                                class="stugroups-list-first"
                                            >
                                                <p :title="group.name">
                                                    {{ group.name }}
                                                </p>
                                                <!--<p style="padding-left: 10px;" :title="group.studyGroupSet.name">{{ group.studyGroupSet.name }}</p>-->
                                            </li>
                                            <li style="padding-left: 30px;">
                                                <p
                                                    :title="
                                                        group.studyGroupSet.name
                                                    "
                                                >
                                                    {{
                                                        group.studyGroupSet.name
                                                    }}
                                                </p>
                                            </li>

                                            <li
                                                v-for="user in group.groupUsers"
                                                v-if="user.isLeader == 1"
                                                style="padding: 0 10px;"
                                            >
                                                <i
                                                    class="iconfont icon-account"
                                                ></i>
                                                {{ user.username }}
                                            </li>

                                            <li style="padding: 0 10px;">
                                                <em>{{
                                                    group.groupUsers.length
                                                }}</em>
                                                <span>{{
                                                    $t("message.students")
                                                }}</span>
                                            </li>
                                            <li
                                                class="group-operation"
                                                v-if="!locked(group)"
                                            >
                                                <template>
                                                    <el-popover
                                                        trigger="hover"
                                                        placement="bottom"
                                                        style="float: right;"
                                                    >
                                                        <div
                                                            slot="reference"
                                                            class="id-wrapper"
                                                        >
                                                            <el-tag
                                                                size="medium"
                                                                style="background: none; border: none;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-more_"
                                                                    style="font-size: 22px;"
                                                                ></i>
                                                            </el-tag>
                                                        </div>
                                                        <ul
                                                            class="stugroups-options"
                                                        >
                                                            <li
                                                                v-if="
                                                                    canVisit(
                                                                        group
                                                                    )
                                                                "
                                                                @click="
                                                                    visitGroup(
                                                                        group
                                                                    )
                                                                "
                                                                style="cursor: pointer;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-tabbarhome"
                                                                ></i>
                                                                <span>{{
                                                                    $t(
                                                                        "message.Visit"
                                                                    )
                                                                }}</span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    canManage(
                                                                        group
                                                                    )
                                                                "
                                                                @click="
                                                                    goManageGroup(
                                                                        group
                                                                    )
                                                                "
                                                                style="cursor: pointer;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-appmanage"
                                                                ></i>
                                                                <span>{{
                                                                    $t(
                                                                        "message.Manage"
                                                                    )
                                                                }}</span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    canJoin(
                                                                        group
                                                                    )
                                                                "
                                                                @click="
                                                                    joinGroup(
                                                                        group
                                                                    )
                                                                "
                                                                style="cursor: pointer;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-join1"
                                                                ></i>
                                                                <span>{{
                                                                    $t(
                                                                        "message.Join"
                                                                    )
                                                                }}</span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    canLeave(
                                                                        group
                                                                    )
                                                                "
                                                                @click="
                                                                    leaveGroup(
                                                                        group
                                                                    )
                                                                "
                                                                style="cursor: pointer;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-sey-leave-a"
                                                                ></i>
                                                                <span>{{
                                                                    $t(
                                                                        "message.Leave"
                                                                    )
                                                                }}</span>
                                                            </li>
                                                            <li
                                                                v-if="
                                                                    canSwitchTo(
                                                                        group
                                                                    )
                                                                "
                                                                @click="
                                                                    joinGroup(
                                                                        group
                                                                    )
                                                                "
                                                                style="cursor: pointer;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-sey-leave-a"
                                                                ></i>
                                                                <span>{{
                                                                    $t(
                                                                        "message.Switch_To"
                                                                    )
                                                                }}</span>
                                                            </li>
                                                        </ul>
                                                    </el-popover>
                                                </template>
                                            </li>
                                            <li
                                                class="group-operation"
                                                v-if="locked(group)"
                                            >
                                                <i
                                                    class="iconfont icon-suoding"
                                                    style="font-size: 22px; margin-right: 10px;"
                                                    :title="
                                                        $t(
                                                            'message.Group_is_joined_by_invitation_only'
                                                        )
                                                    "
                                                ></i>
                                            </li>
                                        </ul>
                                    </template>

                                    <!-- 组员列表 -->
                                    <div class="stugroups-list-name-box">
                                        <ul
                                            class="stugroups-list-name clearfix"
                                        >
                                            <li
                                                class="stugroup-item"
                                                v-for="(user,
                                                uIndex) in group.groupUsers"
                                                :key="uIndex"
                                            >
                                                <i
                                                    v-if="user.isLeader == 1"
                                                    class="iconfont icon-account"
                                                ></i>
                                                {{ user.username }}
                                            </li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                            <p class="stugroups-list-border"></p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="stugroups-dialog">
            <!-- 添加小组 -->
            <el-dialog
                :title="$t('message.People_study_group_set_group_structure')"
                :visible.sync="groupAddDialogVisible"
                width="40%"
                height="auto"
                @closed="groupAddDialogClosed"
                v-show="groupAddDialogVisible"
            >
                <!--提示-->
                <p class="stugoroup-tips">
                    {{ $t("message.People_study_group_student_group_desc") }}
                </p>

                <el-form
                    :label-position="'right'"
                    label-width="160px"
                    ref="addGroup"
                    :rules="groupRules"
                    :model="addGroup"
                >
                    <el-form-item
                        prop="name"
                        :label="$t('message.People_study_group_group_name')"
                    >
                        <el-input
                            v-model="addGroup.name"
                            style="width: 80%;"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        prop="joinType"
                        :label="
                            $t('message.People_study_group_group_join_type')
                        "
                    >
                        <el-select
                            v-model="addGroup.joinType"
                            style="width: 80%;"
                        >
                            <el-option
                                v-for="item in joinTypeOptions"
                                :key="item.value"
                                :label="item.desc"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        prop="invite"
                        :label="$t('message.People_study_group_group_invite')"
                        class="inviteLabel"
                        v-if="studentUserList.length > 1"
                    >
                        <el-checkbox-group v-model="addGroup.inviteUserIds">
                            <el-checkbox
                                v-for="user in studentUserList"
                                v-if="user.userId != userInfoData.id"
                                style="margin-right: 20px;"
                                :label="user.userId"
                                :key="user.userId"
                            >
                                {{ user.username }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <!--<span slot="footer" class="dialog-footer clearfix" style="text-align: center;"></span>-->
                        <el-button @click="groupAddDialogVisible = false">{{
                            $t("message.Common_cancel")
                        }}</el-button>
                        <el-button
                            type="primary"
                            @click="submitGroup('addGroup')"
                            >{{ $t("message.Common_confirm") }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 修改小组 -->
            <el-dialog
                :title="$t('message.People_study_group_set_manage_group')"
                :visible.sync="groupEditDialogVisible"
                width="40%"
                height="auto"
                @closed="groupEditDialogClosed"
                v-show="groupEditDialogVisible"
            >
                <!--提示-->
                <!--<p class="stugoroup-tips">{{ $t('message.People_study_group_student_group_desc')}}</p>-->

                <el-form
                    :label-position="'right'"
                    label-width="160px"
                    ref="editGroup"
                    :rules="editGroupRules"
                    :model="editGroup"
                >
                    <el-form-item
                        prop="name"
                        :label="$t('message.People_study_group_group_name')"
                    >
                        <el-input
                            v-model="editGroup.name"
                            style="width: 80%;"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        prop="invite"
                        :label="
                            $t('message.People_study_group_group_members') +
                                '(' +
                                editGroup.inviteUserIds.length +
                                (editGroup.maxMemberNumber
                                    ? '/' + editGroup.maxMemberNumber
                                    : '') +
                                ')'
                        "
                    >
                        <el-checkbox-group v-model="editGroup.inviteUserIds">
                            <!--<el-checkbox :label="userInfoData.id" :value="userInfoData.id" :checked="true" :disabled="true">-->
                            <!--{{ userInfoData.username }}-->
                            <!--</el-checkbox>-->
                            <el-checkbox
                                v-for="user in editGroup.groupUsers"
                                style="margin-right: 20px;"
                                :label="user.userId"
                                :checked="true"
                                :disabled="
                                    userInfoData.id == user.userId ||
                                        (editGroup.maxMemberNumber &&
                                            editGroup.inviteUserIds.indexOf(
                                                user.userId
                                            ) < 0 &&
                                            editGroup.inviteUserIds.length >=
                                                editGroup.maxMemberNumber)
                                "
                                :key="user.userId"
                            >
                                {{ user.username }}
                            </el-checkbox>
                            <el-checkbox
                                v-for="user in alternativeUsers"
                                v-if="userInfoData.id != user.userId"
                                :label="user.userId"
                                :key="user.userId"
                                :checked="false"
                                :disabled="
                                    editGroup.maxMemberNumber &&
                                        editGroup.inviteUserIds.indexOf(
                                            user.userId
                                        ) < 0 &&
                                        editGroup.inviteUserIds.length >=
                                            editGroup.maxMemberNumber
                                "
                                style="margin-right: 20px;"
                            >
                                {{ user.username }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <!--<span slot="footer" class="dialog-footer clearfix" style="text-align: center;"></span>-->
                        <el-button @click="groupEditDialogVisible = false">{{
                            $t("message.Common_cancel")
                        }}</el-button>
                        <el-button
                            type="primary"
                            @click="submitGroup('editGroup')"
                            >{{ $t("message.Common_confirm") }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 用户信息 -->
            <div class="personnel-dialog">
                <el-dialog
                    class="personal-profile-dialog"
                    :title="$t('message.User_Profile')"
                    :visible.sync="userProfileDialog"
                    v-show="userProfileDialog"
                    width="50%"
                >
                    <div style="overflow: hidden;">
                        <div class="profileLeft">
                            <div>
                                <img
                                    v-if="true"
                                    :src="
                                        getAbsolutePath(
                                            userSetting.avatarFileId,
                                            200,
                                            70
                                        )
                                    "
                                    class="avatar"
                                />
                            </div>
                            <div class="name">{{ userSetting.nickname }}</div>
                            <span>{{ userSetting.title }}</span>
                        </div>
                        <div class="profileRight">
                            <div class="displayMaterials">
                                <div class="show">
                                    <h3>{{ $t("message.Contact") }}</h3>
                                    <!--<p> {{ userSetting.phone ? userSetting.phone : $t('message.UserSetting_no_contact_tip')}} </p>-->
                                    <p>
                                        {{ $t("message.Phone_Number") }}
                                        &nbsp;{{
                                            userSetting.phone
                                                ? userSetting.phone
                                                : $t(
                                                      "message.UserSetting_no_contact_tip"
                                                  )
                                        }}
                                    </p>
                                    <p>
                                        {{ $t("message.Email") }} &nbsp;{{
                                            userSetting.email
                                                ? userSetting.email
                                                : $t(
                                                      "message.UserSetting_no_contact_tip"
                                                  )
                                        }}
                                    </p>
                                </div>
                                <div class="show">
                                    <h3>{{ $t("message.Biography") }}</h3>
                                    <p>
                                        {{
                                            userSetting.description
                                                ? userSetting.description
                                                : $t(
                                                      "message.UserSetting_no_description_tip"
                                                  )
                                        }}
                                    </p>
                                </div>
                                <div class="show">
                                    <h3>{{ $t("message.Links") }}</h3>
                                    <div
                                        v-if="
                                            userSetting.links &&
                                                userSetting.links.length == 0
                                        "
                                    >
                                        <p>
                                            {{
                                                $t(
                                                    "message.UserSetting_no_links_tip"
                                                )
                                            }}
                                        </p>
                                    </div>
                                    <div v-else>
                                        <div
                                            v-for="(link,
                                            index) in userSetting.links"
                                            :key="index"
                                        >
                                            <p>
                                                <span>{{ link.name }}</span
                                                >&nbsp;:&nbsp;{{ link.url }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import { mapState, mapMutations, mapGetters } from "vuex";
import utilMethods from "@/utils/utilMethods";
import { formatDate } from "@/utils/date";

import defaultAvatar from "../../../../static/images/touxiang.png";
import defaultHeads from "../../../../static/images/touxiang1.png";

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

        ...mapGetters(["userInfoData"])
    },

    mounted() {
        this.loadSectionRoleAndPeopleNumber();
        this.loadCourseUsers();
        this.loadCourseSections();
        this.loadStudyGroups();
    },

    data() {
        return {
            defaultHeads,
            courseId: this.$route.query.courseId,
            courseUserList: [],
            loadingUserList: false,
            studentUserList: [],
            courseSectionList: [],
            sectionRoleAndPeopleList: [],
            studyGroupList: [],
            query: {
                courseId: this.$route.query.courseId,
                roleId: "",
                name: ""
            },

            userProfileDialog: false,
            userSetting: {},

            groupRules: {
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
                ]
            },

            editGroupRules: {
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
                ]
            },

            studyGroupTmpList: [],
            groupOrMemberSearchName: "",

            groupEditDialogVisible: false,
            groupAddDialogVisible: false,

            addGroup: {
                courseId: this.$route.query.courseId,
                name: "",
                joinType: "1",
                inviteUserIds: []
            },

            editGroup: {
                id: "",
                courseId: this.$route.query.courseId,
                name: "",
                inviteUserIds: [],
                containUserIds: [],
                maxMemberNumber: ""
            },

            alternativeUsers: [],

            joinTypeOptions: [
                {
                    desc: this.$t("message.Course_members_are_free_to_join"),
                    value: "1"
                },
                {
                    desc: this.$t("message.Membership_by_invitation_only"),
                    value: "2"
                }
            ],

            stugroupsBox: true,
            activeName: "first",
            activeNames: ""
        };
    },
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return "text-align:center";
            }
            return "";
        },
        getAbsolutePath(relativePath, width, height) {
            if (relativePath == undefined) return defaultHeads;
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },

        gotoUserDetail(user) {
            this.userProfileDialog = true;

            this.getUserSetting(user.userId);
        },

        async getUserSetting(userId) {
            const res = await this.$getData(`/userSetting/get?data=${userId}`);
            if (res.data.code == 200) {
                this.userSetting = res.data.entity;
            } else {
                this.$message.error(res.data.message);
            }
        },

        getAvatar(url) {
            if (url && url.length > 0) {
                return `${process.env.FILE_PRE_SERVER + url}?s=thumb&a=40x40`;
            }
            return defaultAvatar;
        },

        filterGroupOrMembers(val) {
            val = val.trim();
            if (val) {
                const tmp = [];
                const reg = new RegExp(`.*${val}.*`, "i");
                for (let i = 0; i < this.studyGroupTmpList.length; i++) {
                    const group = this.studyGroupTmpList[i];

                    if (reg.test(group.name)) {
                        tmp.push(group);
                    } else {
                        const users = group.groupUsers || [];
                        for (let j = 0; j < users.length; j++) {
                            const user = users[j];
                            if (reg.test(user.username)) {
                                tmp.push(group);
                                break;
                            }
                        }
                    }
                }

                this.studyGroupList = tmp;
            } else if (this.studyGroupTmpList.length > 0) {
                this.studyGroupList = this.studyGroupTmpList;
            }
        },

        goAddGroup() {
            this.groupAddDialogVisible = true;
        },

        goManageGroup(group) {
            console.log(this.editGroup);
            this.editGroup.id = group.id;
            this.editGroup.name = group.name;
            this.editGroup.groupUsers = group.groupUsers;
            this.editGroup.maxMemberNumber = group.maxMemberNumber;
            // this.editGroup.inviteUserIds = this.group.groupUsers;

            // this.editGroup.containUserIds = [];

            // let existsGroupUserIdMap = {};
            // for (let i = 0; i < group.groupUsers.length; i++) {
            //   let u = group.groupUsers[i];
            //   existsGroupUserIdMap[u.userId] = u;
            // }
            // for (let i = 0; i < this.studentUserList.length; i++) {
            //   let student = this.studentUserList[i];
            //   if (existsGroupUserIdMap[student.userId]) {
            //     this.editGroup.inviteUserIds.push(student.userId);
            //     this.editGroup.containUserIds.push(student.userId);
            //   }
            // }

            const res = this.getAlternativeUsers(group);
            if (res) {
                this.groupEditDialogVisible = true;
            }

            // console.log("----------------")
            // console.log("group contains", JSON.stringify(this.editGroup.containUserIds));
            // console.log("group", group)
            // console.log("students", this.studentUserList);
            // console.log("alter", this.alternativeUsers)
        },

        async getAlternativeUsers(group) {
            const data = {
                studyGroupSetId: group.studyGroupSetId,
                studyGroupId: group.id
            };

            const res = await this.$getData(
                "/studyGroupSet/alternative/query",
                data
            );
            if (res.data.code == 200) {
                this.alternativeUsers = res.data.entity;
                return true;
            }
            this.$message.error(res.data.message);
            this.alternativeUsers = [];
            return false;
        },

        submitGroup(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (formName == "addGroup") {
                        this.$http
                            .post(
                                `${process.env.NODE_ENV}/studyGroup/add`,
                                this.addGroup
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.loadStudyGroups();
                                    this.groupAddDialogVisible = false;
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
                                `${process.env.NODE_ENV}/studyGroup/modify`,
                                this.editGroup
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.loadStudyGroups();
                                    this.groupEditDialogVisible = false;
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.$message.error(err);
                            });
                    }
                } else {
                    console.log("valid fail", valid);
                    return false;
                }
            });
        },

        groupAddDialogClosed() {
            this.$refs.addGroup.resetFields();
        },

        groupEditDialogClosed() {
            this.editGroup = {
                id: "",
                courseId: this.$route.query.courseId,
                name: "",
                inviteUserIds: [],
                containUserIds: []
            };
            this.$refs.editGroup.resetFields();
        },

        async loadCourseSections() {
            const result = await this.$getData(
                "/section/list",
                { courseId: this.courseId },
                "get"
            );
            if (result.data.code == 200) {
                this.courseSectionList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },

        async loadCourseUsers() {
            this.loadingUserList = true;
            const result = await this.$getData(
                "/course/user/query",
                this.query,
                "get"
            );
            this.loadingUserList = false;
            if (result.data.code == 200) {
                this.courseUserList = result.data.entity;
                for (let i = 0; i < this.courseUserList.length; i++) {
                    const user = this.courseUserList[i];
                    const sectionUsers = user.sectionUserDetailVos || [];

                    if (user.userId == this.userInfoData.id) {
                        continue;
                    }

                    for (let j = 0; j < sectionUsers.length; j++) {
                        const suser = sectionUsers[j];
                        // is student
                        if (suser.roleId == 4) {
                            this.studentUserList.push({
                                userId: user.userId,
                                username: user.username,
                                nickname: user.nickname
                            });
                            break;
                        }
                    }
                }
            } else {
                this.$message.error(result.data.message);
            }
        },

        async loadSectionRoleAndPeopleNumber() {
            const result = await this.$getData(
                "/role/courseUserNumber/query",
                { courseId: this.courseId },
                "get"
            );
            if (result.data.code == 200) {
                this.sectionRoleAndPeopleList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },

        async loadStudyGroups() {
            const result = await this.$getData("/studyGroup/list", {
                courseId: this.courseId
            });
            if (result.data.code == 200) {
                const groups = result.data.entity;

                groups.forEach(group => {
                    const users = group.groupUsers || [];
                    for (let i = 0; i < users.length; i++) {
                        group.inGroup = false;
                        group.isLeader = false;
                        if (users[i].userId == this.userInfoData.id) {
                            group.inGroup = true;
                            group.isLeader = users[i].isLeader == 1;
                            break;
                        }
                    }
                });

                this.studyGroupTmpList = groups;
                this.filterGroupOrMembers(this.groupOrMemberSearchName);
            } else {
                this.$message.error(result.data.message);
            }
        },

        locked(group) {
            return (
                !group.inGroup &&
                !this.canJoin(group) &&
                !this.canSwitchTo(group)
            );
        },

        canVisit(group) {
            return group.inGroup;
        },

        canManage(group) {
            return group.isLeader;
        },

        canLeave(group) {
            return (
                group.studyGroupSet.allowSelfSignup == 1 &&
                group.joinType == 1 &&
                group.inGroup
            );
        },

        canJoin(group) {
            if (group.inGroup) {
                return false;
            }

            // 组成员已满
            if (group.maxMemberNumber <= group.groupUsers.length) {
                return false;
            }

            // 学生小组 & 不限制加入
            if (group.studyGroupSet.isStudentGroup == 1) {
                return group.joinType == 1;
            }

            // 是否加入了同一组集下的其他组中
            let inOtherGroup = false;
            for (
                let i = 0;
                i < this.studyGroupList.length && !inOtherGroup;
                i++
            ) {
                const g = this.studyGroupList[i];
                if (g.studyGroupSetId == group.studyGroupSetId) {
                    const users = g.groupUsers;
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].userId == this.userInfoData.id) {
                            inOtherGroup = true;
                            break;
                        }
                    }
                }
            }

            // 未加入组集下任意组，且组集允许学习自行注册
            return !inOtherGroup && group.studyGroupSet.allowSelfSignup == 1;
        },

        canSwitchTo(group) {
            if (group.inGroup) {
                return false;
            }

            // 组成员已满
            if (group.maxMemberNumber <= group.groupUsers.length) {
                return false;
            }

            if (group.studyGroupSet.isStudentGroup == 1) {
                return false;
            }

            // 是否加入了同一组集下的其他组中
            let inOtherGroup = false;
            for (
                let i = 0;
                i < this.studyGroupList.length && !inOtherGroup;
                i++
            ) {
                const g = this.studyGroupList[i];
                if (g.studyGroupSetId == group.studyGroupSetId) {
                    const users = g.groupUsers;
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].userId == this.userInfoData.id) {
                            inOtherGroup = true;
                            break;
                        }
                    }
                }
            }

            // 已加入组集下某个组，且组集允许学习自行注册
            return inOtherGroup && group.studyGroupSet.allowSelfSignup == 1;
        },

        getUserState(user) {
            const result = { isActive: true, isJoined: true };
            if (user.isActive === 0) {
                result.isActive = false;
            } else {
                const sectionUsers = user.sectionUserDetailVos || [];
                for (let i = 0; i < sectionUsers.length; i++) {
                    const sectionUser = sectionUsers[i];
                    if (sectionUser.registryStatus === 1) {
                        result.isJoined = false;
                        break;
                    }
                }
            }
            return result;
        },

        visitGroup(group) {
            this.$router.push({
                path: "/studentHomePage/studentMain",
                query: { groupId: group.id, courseId: group.courseId }
            });
        },

        async leaveGroup(group) {
            const result = await this.$getData(
                "/studyGroupUser/deletes",
                { studyGroupId: group.id },
                "post"
            );
            if (result.data.code == 200) {
                // let ind = null;
                // for (let i = 0; i < group.groupUsers.length; i++) {
                //   if (group.groupUsers[i].userId == this.userInfoData.id) {
                //     ind = i;
                //     break;
                //   }
                // }
                // if (ind !== null) {
                //   group.groupUsers.splice(ind, 1);
                // }
                this.loadStudyGroups();
                console.log("leave success", group);
            } else {
                this.$message.error(result.data.message);
            }
        },

        async joinGroup(group) {
            const result = await this.$getData(
                "/studyGroup/join/edit",
                { id: group.id },
                "post"
            );
            if (result.data.code == 200) {
                this.loadStudyGroups();
            } else {
                this.$message.error(result.data.message);
            }
        },

        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleChange() {},
        Next() {}
    }
};
/*eslint-disable*/
</script>
<style>
.inviteLabel label {
    margin-top: 5px;
}
.stugroups-dialog .el-dialog__footer {
    padding: 20px !important;
    padding-top: 10px;
    text-align: center !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    clear: both;
}

.stugroups-list .el-collapse-item__header.is-active {
    background: #f1f1f1 !important;
}

.stugroups-list .el-collapse-item__arrow {
    position: absolute !important;
    left: 30px !important;
}

.stugroups-list .el-collapse-item__header {
    border-bottom: 1px solid #aaaaaa;
}

.stugoroup-groups-table .el-table thead th {
    background: #f1f1f1;
    color: #4b4b4b;
    font-weight: bold;
}
</style>
<style scoped lang="less">
.stugroups-box {
    width: 80%;
}

.stugroups-seach .el-input {
    width: 22%;
    height: 36px;
    margin: 20px 0;
}

.stugroups-seach .el-select {
    width: 17%;
    margin-left: 12px;
}

.stugroups-seach .el-button {
    float: right !important;
    position: relative;
    font-size: 16px;
    padding: 8px 13px;
}

.stugroups-seach-tips {
    margin-top: 10px;
    margin-bottom: 10px;
}

.stugoroup-title {
    width: 90px;
    text-align: right;
    margin-top: 26px;
    display: inline-block;
    margin-right: 12px;
}

.stugroup-name {
    float: right;
    width: 75%;
    margin-top: 20px;
    text-align: left;
    display: inline-block;
    max-height: 264px;
    overflow-y: auto;
}

.stugroup-name .el-checkbox {
    margin-left: 0px;
    padding: 10px;
}

.stugroups-list-box {
    border: 1px solid #eeeeee;
    padding: 20px;
}

.stugroups-list-border {
    border-bottom: 1px dashed #eeeeee;
    margin: 20px -14px;
}

.stugroups-list-title,
.stugroups-list-name {
    width: 100%;
}

.stugroups-list-title li {
    min-width: 6%;
    max-width: 26%;
    float: left;
    text-align: left;
    margin-left: 10px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.stugroups-list-title li p {
    display: inline-block;
    color: #999999;
    display: initial;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
/*.stugroups-list-title .stugroups-list-first{
		max-width: 40% !important;
	}*/
.stugroups-list-first span {
    width: 30%;
}
.stugroups-list-name li {
    float: left;
    text-align: left;
    font-size: 14px;
    width: 17%;
    padding-left: 10px;
    height: 36px;
    line-height: 36px;
    margin-left: 16px;
    margin-bottom: 14px;
    margin-top: 10px;
    border: 1px solid #eeeeee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.stugroups-list-title > li.group-operation {
    text-align: right;
    width: auto;
    float: right;
}

.stugroups-list-name-box {
    margin: 12px;
    width: 100%;
}

.stugroups-list .el-collapse {
    border: 1px solid #aaaaaa;
    border-radius: 5px;
}

.stugroups-options li {
    line-height: 36px;
    margin-left: -12px;
    padding-left: 12px;
    width: 108%;
    &:hover {
        background-color: #e7ebf7;
        color: #3e60c1;
    }
}

.stugroups-options li i {
    font-size: 18px;
    text-align: center;
    margin-right: 10px;
}

.stugoroup-groups-title {
    font-weight: bold;
    font-size: 16px;
}

.stugoroup-groups-table {
    width: 80%;
    margin-top: 20px;
}

.avatar {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
}

.avatar img {
    display: block;
    width: 100%;
    height: 100%;
}

.personnel-state {
    background: #0e38b1;
    color: #fff;
    padding: 4px;
    border-radius: 5px;
}

.personnel-inactive1 {
    background: #f17e26;
}
</style>

<style scoped="">
.profileLeft {
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    float: left;
    margin: 2% 4%;
    text-align: center;
}
.profileRight {
    width: 70%;
    height: 100%;
    display: inline-block;
    padding-top: 1%;
    float: left;
    margin-bottom: 10%;
    padding-left: 4%;
}
.show {
    padding-bottom: 1rem;
    padding-left: 2%;
}
.displayMaterials {
    border-left: 1px solid #ccc;
}
.editProfileUsers {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    background-color: #cf9236;
    margin: 0 auto;
}
.demo-dynamic {
    /* margin: 0 auto; */
    /* text-align: center; */
    margin-left: 287px;
    margin-top: 30px;
}
.add_touxiang {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 70px;
    margin-left: 28%;
    overflow: hidden;
}
.avatar-uploader {
    width: 100%;
    height: 100%;
}
/deep/ .allCourse-tabs .el-form-item {
    margin-top: 20px;
}
</style>
