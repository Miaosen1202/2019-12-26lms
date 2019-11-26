<template>
    <!-- 人员管理 -->
    <div>
        <!--eslint-disable-->
        <div class="personnel-box">
            <div class="personnel-search-box">
                <div class="personnel-search">
                    <!-- 添加课程人员按钮 -->
                    <el-button @click="goAddPeople">
                        <i
                            class="iconfont icon-add"
                            style="font-size: 22px;
                                vertical-align: -3px;
                                 display: inline-block;"
                        />
                        <span>{{ $t("message.People_people") }}</span>
                    </el-button>

                    <!--条件搜索-->
                    <el-form ref="queryForm" label-width="80px">
                        <el-input
                            v-model="query.name"
                            style="width: 200px"
                            :placeholder="$t('message.Common_search')"
                            maxlength="100"
                            @blur="loadCourseUsers"
                            @keyup.enter.native="loadCourseUsers"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-search"
                            />
                        </el-input>
                        <el-select
                            v-model="query.roleId"
                            style="width: 140px"
                            :placeholder="$t('message.Common_please_select')"
                            @change="loadCourseUsers"
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
                            />
                        </el-select>
                    </el-form>
                </div>

                <!-- 课程人员列表 -->
                <div class="syllabus_list">
                    <el-table
                        v-loading="loadingUserList"
                        border
                        :data="courseUserList"
                        :header-cell-style="getRowClass"
                        row-key="userId"
                        :empty-text="loadingUserList ? ' ' : 'No data'"
                        style="width: 100%; margin-top: 20px;"
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
                                    class="avatar"
                                    @click="gotoUserDetail(scope.row)"
                                >
                                    <img
                                        :src="
                                            getAvatar(scope.row.avatarFileUrl)
                                        "
                                    />
                                </a>
                                <span
                                    style="margin-left: 10px"
                                    @click="gotoUserDetail(scope.row)"
                                    >{{ scope.row.username }}</span
                                >
                                <span
                                    v-if="
                                        !scope.row.isActive ||
                                            !scope.row.isJoined
                                    "
                                    style="margin-left: 10px;white-space:nowrap"
                                    class="personnel-state personnel-inactive1"
                                >
                                    {{
                                        !scope.row.isActive
                                            ? $t("message.People_inactive_tip")
                                            : !scope.row.isJoined
                                            ? $t("message.People_pending_tip")
                                            : ""
                                    }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('message.People_full_name')"
                            prop="fullName"
                            align="center"
                        />

                        <el-table-column
                            :label="$t('message.People_section')"
                            prop="sectionId"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span
                                    v-for="(item, sIndex) in scope.row
                                        .sectionUserDetailVos"
                                    :key="sIndex"
                                    class="section-role"
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
                                    v-for="(item, dIndex) in scope.row
                                        .sectionUserDetailVos"
                                    :key="dIndex"
                                    class="section-role"
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

                        <!-- 用户操作列表 -->
                        <el-table-column align="center" width="80px">
                            <template slot-scope="scope">
                                <el-popover trigger="click" placement="bottom">
                                    <div slot="reference" class="id-wrapper">
                                        <i
                                            class="iconfont icon-morevert"
                                            style="font-size: 28px; text-align: center;cursor: pointer; color: #333;"
                                        />
                                    </div>
                                    <ul class="personnel-options">
                                        <li
                                            style="cursor: pointer"
                                            @click="
                                                goEditUserSection(scope.row)
                                            "
                                        >
                                            <i class="iconfont icon-edit" />
                                            {{
                                                $t(
                                                    "message.People_edit_section"
                                                )
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                userInfoData.id !=
                                                    scope.row.userId
                                            "
                                            style="cursor: pointer"
                                            @click="goEditUserRole(scope.row)"
                                        >
                                            <i class="iconfont icon-editrole" />
                                            {{ $t("message.People_edit_role") }}
                                        </li>
                                        <li
                                            style="cursor: pointer"
                                            @click="gotoUserDetail(scope.row)"
                                        >
                                            <i
                                                class="iconfont icon-userdetailes"
                                            />
                                            {{
                                                $t("message.People_user_detail")
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                userInfoData.id !=
                                                    scope.row.userId &&
                                                    scope.row.isActive &&
                                                    scope.row.isJoined
                                            "
                                            style="cursor: pointer"
                                            @click="deactivateUser(scope.row)"
                                        >
                                            <i class="iconfont icon-shanchu" />
                                            {{
                                                $t(
                                                    "message.People_to_deactivate"
                                                )
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                userInfoData.id !=
                                                    scope.row.userId &&
                                                    !scope.row.isActive
                                            "
                                            style="cursor: pointer"
                                            @click="activateUser(scope.row)"
                                        >
                                            <i
                                                class="iconfont icon-Re-activateUser"
                                            />
                                            {{
                                                $t("message.People_to_activate")
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                userInfoData.id !=
                                                    scope.row.userId
                                            "
                                            style="cursor: pointer"
                                            @click="
                                                removeUserFromCourse(scope.row)
                                            "
                                        >
                                            <i
                                                class="iconfont icon-RemoveFromCourse"
                                            />
                                            {{
                                                $t(
                                                    "message.People_remove_from_course"
                                                )
                                            }}
                                        </li>
                                        <li>
                                            <a
                                                style="cursor: pointer"
                                                @click="anJump(scope.row)"
                                            >
                                                <i
                                                    class="iconfont icon-analytic1"
                                                />
                                                {{ $t("message.Analytics") }}
                                            </a>
                                        </li>
                                    </ul>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <!--添加人员-->
        <div class="personnel-dialog">
            <el-dialog
                :title="$t('message.People_add_people')"
                :visible.sync="courseUserAddDialog"
                width="40%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips">
                    {{ $t("message.People_add_people_by_tip") }}
                </p>
                <!--<el-radio v-model="addPeopleCondition.addBy" label="EMAIL">EMAIL</el-radio>-->
                <el-radio v-model="addPeopleCondition.addBy" label="LOGIN_ID">
                    {{ $t("message.Login_ID") }}
                </el-radio>
                <el-radio v-model="addPeopleCondition.addBy" label="SIS_ID">
                    {{ $t("message.SIS_ID") }}
                </el-radio>

                <!--提示-->
                <p class="personnel-tips" style="color: #a7a7a7;">
                    {{ $t("message.People_user_add_tip") }}
                </p>
                <p class="personnel-tips" style="color: #a7a7a7;">
                    {{ $t("message.Common_example") }}:
                    {{ $t("message.ijohn_mjack") }}
                </p>

                <el-form
                    ref="addPeopleForm"
                    :model="addPeopleCondition"
                    :rules="addPeopleRules"
                >
                    <!-- 添加用户 loginId, sisId 输入框 -->
                    <el-form-item prop="value">
                        <el-input
                            v-model="addPeopleCondition.value"
                            type="textarea"
                            class="personnel-textarea"
                            resize="none"
                        />
                    </el-form-item>

                    <el-form-item>
                        <el-col :span="2" style="text-align: center">
                            <span>{{ $t("message.People_role") }}</span>
                        </el-col>
                        <el-col :span="9">
                            <!--选择角色-->
                            <el-select
                                v-model="addPeopleCondition.roleId"
                                :placeholder="
                                    $t('message.Common_please_select')
                                "
                                style="width: 80%"
                            >
                                <el-option
                                    v-for="item in sectionRoleAndPeopleList"
                                    :key="item.roleId"
                                    :label="item.roleName"
                                    :value="item.roleId"
                                />
                            </el-select>
                        </el-col>

                        <el-col :span="3" style="text-align: center">
                            <span>{{ $t("message.People_section") }}</span>
                        </el-col>

                        <el-col :span="9">
                            <!-- 选择班级 -->
                            <el-select
                                v-model="addPeopleCondition.sectionId"
                                :placeholder="
                                    $t('message.Common_please_select')
                                "
                                style="width: 80%"
                            >
                                <el-option
                                    v-for="item in courseSectionList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-form>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="courseUserAddDialog = false">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button type="primary" @click="goConfirmAddUser">{{
                        $t("message.People_next")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>

        <!-- 添加用户列表确认弹框 -->
        <div class="personnel-dialog">
            <el-dialog
                v-show="courseUserAddConfirmDialog"
                :title="$t('message.People_add_people')"
                :visible.sync="courseUserAddConfirmDialog"
                width="50%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips">
                    {{ $t("message.People_add_people_has_user_tip") }}
                </p>
                <div class="personnel-eamil-box">
                    <el-table
                        :data="courseUserReadyAddedList"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="username"
                            :label="$t('message.People_username')"
                            width="180"
                        />
                        <el-table-column
                            prop="email"
                            :label="$t('message.People_email')"
                            width="180"
                        />
                        <el-table-column
                            prop="sisId"
                            :label="$t('message.People_sis_id')"
                        />
                        <el-table-column
                            prop="org.name"
                            :label="$t('message.people_institution')"
                        />
                    </el-table>
                </div>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="courseUserAddConfirmDialog = false">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button @click="goAddPeople">{{
                        $t("message.People_add_people_start_over")
                    }}</el-button>
                    <el-button
                        type="primary"
                        :disabled="courseUserReadyAddedList.length < 1"
                        @click="addPeople"
                        >{{
                            $t("message.People_add_people_add_users")
                        }}</el-button
                    >
                </span>
            </el-dialog>
        </div>

        <!--Re-send lnvitation 发送邀请-->
        <div class="personnel-dialog">
            <el-dialog
                v-show="ReSend"
                :title="$t('message.Re_send_lnvitation')"
                :visible.sync="ReSend"
                width="20%"
                height="auto"
            >
                <!--提示-->
                <p
                    class="personnel-tips"
                    style="text-align: center; line-height: 30px;"
                >
                    {{ $t("message.Stu2_was_added_to") }}:<span
                        style="color: #0e38b1;"
                        >Dec 7 at 1:23am</span
                    >{{ $t("message.Invitations_aren") }}

                    <span style="color: #0e38b1;">{{
                        $t("message.sent_until_the_course_is_published")
                    }}</span>
                </p>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="dialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="dialogVisible = false">{{
                        $t("message.Re_send_lnvitation")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>

        <!--编辑学生班级-->
        <div class="personnel-dialog">
            <el-dialog
                v-show="courseUserSectionEditDialog"
                :title="$t('message.People_section_enrollments')"
                width="33%"
                height="auto"
                :visible.sync="courseUserSectionEditDialog"
                @close="courseUserSectionEditDialogClose"
            >
                <!--提示-->
                <p class="personnel-tips" style="line-height: 30px;">
                    {{ $t("message.People_section_edit_tip") }}
                </p>

                <!--条件搜索-->
                <!--Section下拉列表只显示未加入的Section；
                  教师对学生添加新的Section，学生在新的Section仍是学生；
                  教师对助教添加新的Section，助教在新的Section仍是助教；
                  教师对其他教师添加新的Section，在新的Section里是学生；
                用户有多个Section，可以删除直到只剩一个，即用户只有一个Section时，不允许删除；-->

                <el-select
                    v-model="courseSectionEdit.selectValue"
                    :placeholder="$t('message.Common_please_select')"
                    style="width: 100%;"
                    @change="selectAddSection"
                >
                    <el-option
                        v-for="item in courseSectionEdit.unjoinSections"
                        :key="item.sectionId"
                        :label="item.sectionName"
                        :value="item.sectionId"
                    />
                </el-select>

                <div class="joined-section-panel">
                    <el-tag
                        v-for="(tag,
                        tIndex) in courseSectionEdit.joinedSections"
                        :key="tIndex"
                        style="margin-right: 20px"
                        :closable="
                            courseSectionEdit.joinedSections.length > 1 &&
                                (editUserSectionCondition.userId !=
                                    userInfoData.id ||
                                    tag.roleId != 2)
                        "
                        @close="removeJoinedSection(tag)"
                    >
                        <span v-if="tag.roleName" class="item"
                            >{{ tag.sectionName }} - {{ tag.roleName }}</span
                        >
                        <span v-else class="item">{{ tag.sectionName }}</span>
                    </el-tag>
                </div>
                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="courseUserSectionEditDialog = false">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="courseUserSectionChange"
                        >{{ $t("message.Common_confirm") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>

        <!--Edit Course Role 编辑课程角色-->
        <div class="personnel-dialog">
            <el-dialog
                v-show="courseUserRoleEditDialog"
                :title="$t('message.Edit_Course_Role')"
                :visible.sync="courseUserRoleEditDialog"
                width="40%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips" style="line-height: 30px;">
                    {{ $t("message.People_edit_user_role_tip") }}
                </p>

                <!--选择角色-->
                <span style="margin-right: 8px;">{{ $t("message.Role") }}</span>
                <el-select
                    v-model="editUserRoleCondition.roleId"
                    :placeholder="$t('message.Common_please_select')"
                    style="width: 80%;"
                >
                    <el-option
                        v-for="item in selectRolePeopleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
                </el-select>
                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="courseUserRoleEditDialog = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="editUserRole">{{
                        $t("message.Update")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>

        <div class="personnel-dialog">
            <el-dialog
                v-show="userProfileDialog"
                class="personal-profile-dialog"
                :title="$t('message.User_Profile')"
                :visible.sync="userProfileDialog"
                width="50%"
            >
                <div style="overflow: hidden;">
                    <div class="aprofileLeft">
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
                        <div class="name">
                            {{ userSetting.nickname }}
                        </div>
                        <span>{{ userSetting.title }}</span>
                    </div>
                    <div class="profileRight">
                        <div class="displayMaterials">
                            <div class="showz">
                                <h3>{{ $t("message.Contact") }}</h3>
                                <p>
                                    {{ $t("message.Phone_Number") }} &nbsp;{{
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
                            <div class="showz">
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
                            <div class="showz">
                                <h3>{{ $t("message.Links") }}</h3>
                                <div
                                    v-if="
                                        userSetting.links &&
                                            userSetting.links.length === 0
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

        <!-- 未使用到的弹框 -->
        <!--Remove From Course 删除用户-->
        <div class="personnel-dialog">
            <el-dialog
                v-show="RemoveCourse"
                :title="$t('message.Remove_From_Course')"
                :visible.sync="RemoveCourse"
                width="30%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips" style="line-height: 30px;">
                    {{ $t("message.Are_you_sure") }}
                </p>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="dialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="dialogVisible = false">{{
                        $t("message.Ok")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
        <!--Re-send lnvitation 发送邀请-->
        <div class="personnel-dialog">
            <el-dialog
                v-show="ReSend"
                :title="$t('message.Re_send_lnvitation')"
                :visible.sync="ReSend"
                width="30%"
                height="auto"
            >
                <!--提示-->
                <p
                    class="personnel-tips"
                    style="text-align: center; line-height: 30px;"
                >
                    {{ $t("message.Stu2_has") }}
                    <span style="color: #0e38b1;">{{
                        $t("message.already_received_and_accepted")
                    }}</span
                    >{{ $t("message.to_join_the_course") }}
                    <span style="color: #0e38b1;">{{
                        $t("message.still_re_send_the_invitation")
                    }}</span
                    >{{ $t("message.if_it_is_needed") }}

                    <span style="color: #0e38b1;">Dec 7 at 1:23am</span>
                </p>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="dialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="dialogVisible = false">{{
                        $t("message.Re_send_lnvitation")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
        <!--Deactivate User 停止用户操作 表格状态显示-->
        <div class="personnel-dialog">
            <el-dialog
                v-show="Deactivate"
                :title="$t('message.Deactivate_User')"
                :visible.sync="Deactivate"
                width="30%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips" style="line-height: 30px;">
                    {{ $t("message.participate_in_the_course") }}
                </p>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="dialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="dialogVisible = false">{{
                        $t("message.Ok")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
import { mapState, mapGetters } from "vuex";
import { setTimeout } from "timers";
import { formatDate } from "@/utils/date";
import utilMethods from "@/utils/utilMethods";
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
    props: {
        listData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            defaultHeads,
            courseId: this.$route.query.courseId,
            sectionRoleAndPeopleList: [],
            selectRolePeopleList: [],
            query: {
                courseId: this.$route.query.courseId,
                roleId: "",
                name: ""
            },
            editUserRoleCondition: {
                courseId: this.$route.query.courseId,
                userId: "",
                roleId: ""
            },
            editUserSectionCondition: {
                courseId: this.$route.query.courseId,
                userId: "",
                sectionIds: []
            },
            addPeopleCondition: {
                addBy: "LOGIN_ID",
                roleId: 4,
                sectionId: "",
                value: "",
                courseId: this.$route.query.courseId
            },
            addPeopleRules: {
                value: [
                    {
                        required: true,
                        message: this.$t("message.Common_rule_cannot_be_empty"),
                        trigger: "blur"
                    }
                ]
            },
            courseUserList: [],
            loadingUserList: false,

            courseSectionList: [],

            courseUserReadyAddedList: [],

            courseSectionEdit: {
                joinedSections: [],
                unjoinSections: [],
                selectValue: ""
            },

            courseUserRoleEditDialog: false,
            courseUserSectionEditDialog: false,
            courseUserAddDialog: false,
            courseUserAddConfirmDialog: false,

            userProfileDialog: false,
            userSetting: {},

            // 给未使用的弹框使用的临时变量
            dialogVisible: false,
            tips: false,
            email: "",
            name: "",
            none: false,
            none1: false,
            radio: 1,
            ReSend: false,
            Enrollments: false,
            Deactivate: false,
            RemoveCourse: false,
            sectionTimer: null
        };
    },
    computed: {
        ...mapState(["curLanguage"]),

        ...mapGetters(["userInfoData"]),

        currentUserId() {
            return this.userInfoData.id;
        }
    },

    mounted() {
        this.loadSectionRoleAndPeopleNumber();
        this.loadCourseUsers();
        this.loadCourseSections();
    },

    methods: {
        anJump(data) {
            this.$router.push({
                path: "/homePage/allCourse/stuAnalytics",
                query: {
                    uid: data.userId,
                    sectionId: data.sectionUserDetailVos[0].sectionId,
                    courseId: this.courseId
                }
            });

            // <router-link
            //                                 :to="
            //                                     `/homePage/allCourse/stuAnalytics?uid=
            //                                       ${scope.row.userId}&sectionId=
            //                                       ${scope.row.sectionUserDetailVos[0].sectionId}
            //                                       &courseId=${courseId}`
            //                                 "
            //                             >

            //                             </router-link>
        },
        getRowClass({ rowIndex }) {
            if (rowIndex === 0) {
                return "text-align:center";
            }
            return "";
        },
        getAbsolutePath(relativePath, width, height) {
            if (typeof relativePath === "undefined") return defaultHeads;
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },

        getAvatar(url) {
            if (url && url.length > 0) {
                return `${process.env.FILE_PRE_SERVER + url}?s=thumb&a=40x40`;
            }
            return defaultAvatar;
        },

        async loadCourseSections() {
            const result = await this.$getData(
                "/section/list",
                { courseId: this.courseId },
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.courseSectionList = result.data.entity;
                for (let i = 0; i < this.courseSectionList.length; i += 1) {
                    const sec = this.courseSectionList[i];
                    if (Number(sec.isDefault) === 1) {
                        this.addPeopleCondition.sectionId = sec.id;
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
            if (Number(result.data.code) === 200) {
                let tempRes = result.data.entity;
                let tempNumber = 0;
                for (let i = 0; i < tempRes.length; i++) {
                    tempNumber += Number(tempRes[i].courseUserNumber);
                }
                let tempAllRole = {
                    courseUserNumber: tempNumber,
                    roleId: null,
                    roleName: "All Roles"
                };
                this.sectionRoleAndPeopleList = tempRes.concat(tempAllRole);
                this.selectRolePeopleList = tempRes;
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
            /* eslint-disable no-param-reassign */
            if (Number(result.data.code) === 200) {
                const list = result.data.entity.map(user => {
                    user.isActive = !!user.isActive;
                    user.isJoined = user.sectionUserDetailVos
                        ? user.sectionUserDetailVos.every(
                              section => section.registryStatus !== 1
                          )
                        : true;
                    return user;
                });
                this.courseUserList = list;
                this.$nextTick(() => console.timeEnd("userRendering"));
            } else {
                this.$message.error(result.data.message);
            }
            /* eslint-disable no-param-reassign */
        },
        selectAddSection(sectionId) {
            const currentUnjoindSec = this.courseSectionEdit.unjoinSections.find(
                el => Number(el.sectionId) === Number(sectionId)
            );
            const currentUnjoinedIndex = this.courseSectionEdit.unjoinSections.findIndex(
                item => Number(item.sectionId) === Number(sectionId)
            );
            const tempUser = [];
            const tempCurrentObj = utilMethods.deepClone(currentUnjoindSec);
            this.courseSectionEdit.unjoinSections.splice(
                currentUnjoinedIndex,
                1
            );
            this.courseSectionEdit.joinedSections = this.courseSectionEdit.joinedSections.concat(
                tempCurrentObj
            );
            this.courseSectionEdit.selectValue = "";
        },
        removeJoinedSection(joinSection) {
            if (this.courseSectionEdit.joinedSections.length <= 1) {
                this.$message.error(
                    this.$t("message.People_section_rm_empty_tip")
                );
                return;
            }
            const joinSectionIndex = this.courseSectionEdit.joinedSections.findIndex(
                el => Number(el.sectionId) === Number(joinSection.sectionId)
            );
            this.courseSectionEdit.joinedSections.splice(joinSectionIndex, 1);
            this.courseSectionEdit.unjoinSections.push(joinSection);
        },

        getUserUnjoinSections() {
            this.courseSectionEdit.joinedSections = [];
            this.courseSectionEdit.unjoinSections = [];
            if (!this.editUserSectionCondition.userId) {
                return [];
            }

            const editUserId = this.editUserSectionCondition.userId;

            let userJoinedSections = [];
            for (let i = 0; i < this.courseUserList.length; i += 1) {
                const courseUser = this.courseUserList[i];
                if (Number(courseUser.userId) === Number(editUserId)) {
                    userJoinedSections = courseUser.sectionUserDetailVos.slice();
                    break;
                }
            }
            const userUnjoinSections = [];
            for (let i = 0; i < this.courseSectionList.length; i += 1) {
                const section = this.courseSectionList[i];

                let joined = false;
                for (let j = 0; j < userJoinedSections.length; j += 1) {
                    if (
                        Number(section.id) ===
                        Number(userJoinedSections[j].sectionId)
                    ) {
                        joined = true;
                        break;
                    }
                }
                if (!joined) {
                    section.sectionId = section.id;
                    section.sectionName = section.name;

                    userUnjoinSections.push(section);
                }
            }

            this.courseSectionEdit.joinedSections = userJoinedSections;
            this.courseSectionEdit.unjoinSections = userUnjoinSections;
            return true;
        },

        courseUserSectionEditDialogClose() {
            this.courseSectionEdit.joinedSections = [];
            this.courseSectionEdit.unjoinSections = [];
            this.courseSectionEdit.selectValue = "";
        },

        deactivateUser(user) {
            this.$confirm(this.$t("message.People_deactivate_user_tip"), "", {
                confirmButtonText: this.$t("message.Common_confirm"),
                cancelButtonText: this.$t("message.Common_cancel"),
                type: "warning",
                center: true
            })
                .then(async () => {
                    const param = {
                        courseId: this.courseId,
                        userId: user.userId,
                        activeStatus: 0
                    };
                    const result = await this.$getData(
                        "/courseUser/activeToggle/edit",
                        param,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        Object.assign(user, { isActive: 0 });
                        this.$message({
                            type: "success",
                            message: this.$t(
                                "message.People_deactivate_success"
                            )
                        });
                    }
                })
                .catch(() => {});
        },

        async courseUserSectionChange() {
            const sections = this.courseSectionEdit.joinedSections;
            this.editUserSectionCondition.sectionUsers = [];
            for (let i = 0; i < sections.length; i += 1) {
                this.editUserSectionCondition.sectionIds.push(
                    sections[i].sectionId
                );
                this.editUserSectionCondition.sectionUsers.push({
                    sectionId: sections[i].sectionId,
                    roleId: sections[i].roleId
                });
            }

            const result = await this.$getData(
                "/courseUser/section/edit",
                this.editUserSectionCondition,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.$message.success(
                    this.$t("message.People_eidt_user_section_success_tip")
                );
                this.courseUserSectionEditDialog = false;
                this.loadCourseUsers();
            } else {
                this.$message.error(result.data.message);
            }
        },
        async activateUser(user) {
            const param = {
                courseId: this.courseId,
                userId: user.userId,
                activeStatus: 1
            };
            const result = await this.$getData(
                "/courseUser/activeToggle/edit",
                param,
                "post"
            );
            if (Number(result.data.code) === 200) {
                Object.assign(user, { isActive: 1 });
                this.$message({
                    type: "success",
                    message: this.$t("message.People_activate_success")
                });
            }
        },

        gotoUserDetail(user) {
            this.userProfileDialog = true;
            this.getUserSetting(user.userId);
        },

        async getUserSetting(userId) {
            const res = await this.$getData(`/userSetting/get?data=${userId}`);
            if (Number(res.data.code) === 200) {
                this.userSetting = res.data.entity;
            } else {
                this.$message.error(res.data.message);
            }
        },

        getUserState(user) {
            const result = { isActive: true, isJoined: true };
            if (Number(user.isActive) === 0) {
                result.isActive = false;
            } else {
                const sectionUsers = user.sectionUserDetailVos || [];
                for (let i = 0; i < sectionUsers.length; i += 1) {
                    const sectionUser = sectionUsers[i];
                    if (Number(sectionUser.registryStatus) === 1) {
                        result.isJoined = false;
                        break;
                    }
                }
            }
            return result;
        },

        removeUserFromCourse(user) {
            this.$confirm(
                this.$t("message.People_remove_user_from_course_tip"),
                "",
                {
                    confirmButtonText: this.$t("message.Common_confirm"),
                    cancelButtonText: this.$t("message.Common_cancel"),
                    type: "warning",
                    center: true
                }
            )
                .then(async () => {
                    const param = {
                        courseId: this.courseId,
                        userId: user.userId
                    };
                    const result = await this.$getData(
                        "/courseUser/deletes",
                        param,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        const ind = this.courseUserList.indexOf(user);
                        this.courseUserList.splice(ind, 1);
                        this.$message({
                            type: "success",
                            message: this.$t("message.Common_success")
                        });
                    }
                })
                .catch(() => {});
        },

        goEditUserRole(user) {
            this.editUserRoleCondition.userId = user.userId;
            this.courseUserRoleEditDialog = true;
        },

        async editUserRole() {
            if (!this.editUserRoleCondition.roleId) {
                this.$message.error(
                    this.$t("message.People_edit_user_role_no_role_tip")
                );
                return;
            }

            const result = await this.$getData(
                "/courseUser/role/edit",
                this.editUserRoleCondition,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.$message.success(
                    this.$t("message.People_edit_user_role_success_tip")
                );
                this.loadCourseUsers();
                this.courseUserRoleEditDialog = false;
            } else {
                this.$message.error(result.data.message);
            }
        },

        goEditUserSection(user) {
            this.editUserSectionCondition.userId = user.userId;
            this.getUserUnjoinSections();
            this.courseUserSectionEditDialog = true;
        },

        goAddPeople() {
            this.courseUserAddConfirmDialog = false;
            this.courseUserAddDialog = true;
            if (this.$refs.addPeopleForm) {
                this.$refs.addPeopleForm.resetFields();
            }
            this.courseUserReadyAddedList = [];
        },

        goConfirmAddUser() {
            this.$refs.addPeopleForm.validate(valid => {
                if (valid) {
                    const inputVal = this.addPeopleCondition.value.replace(
                        /\n/g,
                        ","
                    );
                    if (inputVal === "" || inputVal.trim() === "") {
                        return;
                    }

                    const param = {};
                    param[
                        this.addPeopleCondition.addBy === "LOGIN_ID"
                            ? "usernames"
                            : "sisIds"
                    ] = inputVal;

                    this.$http
                        .get(`${process.env.NODE_ENV}/user/list`, {
                            params: param
                        })
                        .then(result => {
                            if (Number(result.data.code) === 200) {
                                this.courseUserAddDialog = false;
                                this.courseUserAddConfirmDialog = true;
                                this.courseUserReadyAddedList =
                                    result.data.entity;
                            } else {
                                this.$message.error(this.data.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
            });
        },

        async addPeople() {
            const data = {
                courseId: this.addPeopleCondition.courseId,
                roleId: this.addPeopleCondition.roleId,
                sectionId: this.addPeopleCondition.sectionId,
                invites: []
            };
            /* eslint-disable no-unused-vars */
            let inviteType;
            switch (this.addPeopleCondition.addBy) {
                case "EMAIL":
                    inviteType = 1;
                    break;
                case "LOGIN_ID":
                    inviteType = 2;
                    break;
                case "SIS_ID":
                    inviteType = 3;
                    break;
                default:
                    break;
            }
            for (let i = 0; i < this.courseUserReadyAddedList.length; i += 1) {
                const readyAdd = this.courseUserReadyAddedList[i];
                const invite = {};
                switch (this.addPeopleCondition.addBy) {
                    case "EMAIL":
                        invite.inviteType = 1;
                        invite.email = readyAdd.email;
                        break;
                    case "LOGIN_ID":
                        invite.inviteType = 2;
                        invite.loginId = readyAdd.username;
                        break;
                    case "SIS_ID":
                        invite.inviteType = 3;
                        invite.sisId = readyAdd.sisId;
                        break;
                    default:
                        break;
                }
                data.invites.push(invite);
            }
            /* eslint-disable no-unused-vars */
            const result = await this.$getData("/courseUser/add", data, "post");
            if (Number(result.data.code) === 200) {
                this.courseUserAddConfirmDialog = false;
                this.loadCourseUsers();
                this.loadSectionRoleAndPeopleNumber();
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
.personnel-dialog .el-dialog__footer {
    padding: 20px !important;
    padding-top: 10px;
    text-align: center !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    clear: both;
}

.personnel-textarea .el-textarea__inner {
    resize: none !important;
    min-height: 85px !important;
    max-height: 85px !important;
    max-width: 96%;
    min-width: 96%;
    margin-bottom: 10px !important;
}

.personnel-dialog .el-dialog__body {
    padding: 0px 20px !important;
}

.personnel-search .el-table .cell {
    padding: 0px !important;
    text-align: center;
}

.personnel-box {
    width: 100%;
}

.joined-section-panel {
    padding-top: 20px;
}

.joined-section-panel .item {
    /* margin-right: 20px; */
    display: inline-block;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
}

.section-role {
    display: inline-block;
    width: 100%;
}

.personnel-search .el-input {
    /* width: 22%; */
    /* height: 36px; */
    /*margin: 20px 0;*/
}

.personnel-search .el-select {
    /* width: 17%; */
    /* margin-left: 12px; */
}

.personnel-search .el-button {
    float: right;
    position: relative;
    font-size: 16px;
    padding: 8px 13px;
}

.personnel-options li {
    line-height: 36px;
    margin-left: -12px;
    padding-left: 12px;
    width: 108%;
    &:hover {
        background-color: #e7ebf7;
        color: #3e60c1;
    }
    a {
        text-decoration: none;
        color: inherit;
        &:hover {
            color: #3e60c1;
        }
    }
}

.personnel-options li i {
    font-size: 18px;
    text-align: center;
    margin-right: 10px;
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

.personnel-tips {
    margin-top: 10px;
    margin-bottom: 10px;
}

.personnel-dialog .el-select {
    width: 36%;
}

.personnel-dialog li .el-select-dropdown__item.selected {
    width: 158px !important;
}

.personnel-name-title span {
    width: 20%;
    display: block;
    float: left;
    margin: 16px 0;
    margin-right: 10px;
    font-weight: bold;
}

.personnel-name {
    margin-bottom: 18px;
}

.personnel-name span {
    width: 20%;
    display: inline-block;
    float: left;
    line-height: 36px;
    margin-right: 10px;
}

.cel-box {
    padding: 0;
}

.cel-td {
    /*padding-left: 10px;*/
    display: block;
    padding: 0px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ebeef5;
}

.personnel-eamil {
    margin-left: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

.aaprofileLeft {
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

.showz {
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
