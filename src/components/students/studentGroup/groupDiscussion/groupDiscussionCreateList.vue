<template>
    <!--eslint-disable-->
    <div>
        <div v-show="discussionStepOne" class="discussionStepOne">
            <el-row>
                <el-col :span="12">
                    <div style="">
                        <el-form
                            ref="form"
                            :model="form"
                            style="display: inline-block"
                        >
                            <el-form-item
                                label=""
                                style="width: 35%;display: inline-block"
                            >
                                <el-input
                                    v-model="form.name"
                                    :placeholder="$t('message.Common_search')"
                                    prefix-icon="el-icon-search"
                                    disabled="disabled"
                                />
                            </el-form-item>
                            <el-form-item
                                label=""
                                style="display: inline-block;width: 35%;margin-left: 18px"
                            >
                                <el-select
                                    v-model="form.region"
                                    :placeholder="$t('message.All')"
                                    disabled="disabled"
                                >
                                    <el-option label="" value="1">
                                        1
                                    </el-option>
                                    <el-option label="" value="2">
                                        2
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="float: right;margin-right: 17%">
                        <el-button
                            type="primary"
                            style="display: inline-block;vertical-align: -3px;padding: 8px 13px;"
                            @click="addDiscussion"
                        >
                            <i
                                class="iconfont icon-add"
                                style="font-size: 22px;margin-top: 5px"
                            />
                            <span
                                style="float: right;font-size: 17px;margin-top: 3px"
                                >{{ $t("message.discussion") }}</span
                            >
                        </el-button>
                        <!--<el-button icon="el-icon-setting" @click="centerDialogVisibleTrue"></el-button>-->
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" style="margin-top: -20px">
                    <div class="grid-content bg-purple">
                        <div class="disMain">
                            <div class="disMainImg">
                                <img
                                    src="../../../../../static/images/studiscussion.png"
                                    alt=""
                                />
                                <p>
                                    {{
                                        $t(
                                            "message.There_are_no_discussions_to_show_in_this_section"
                                        )
                                    }}
                                </p>
                                <a @click="addDiscussion">{{
                                    $t("message.Click_here_to_add_a_discussion")
                                }}</a>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="discussionStepThree" class="discussionStepThree">
            <div>
                <el-row>
                    <el-col :span="14">
                        <div style="">
                            <el-form
                                ref="ruleformlist"
                                :model="ruleformlist"
                                style="display: inline-block"
                            >
                                <el-form-item
                                    label=""
                                    style="width: 35%;display: inline-block"
                                >
                                    <el-input
                                        v-model="ruleformlist.title"
                                        :placeholder="$t('message.Search')"
                                        prefix-icon="el-icon-search"
                                        @input="shaixuan"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label=""
                                    style="display: inline-block;width: 35%;margin-left: 18px"
                                >
                                    <el-select
                                        v-model="ruleformlist.isRead"
                                        :placeholder="$t('message.All')"
                                        @change="shaixuan1"
                                    >
                                        <el-option
                                            :label="$t('message.All')"
                                            value="2"
                                        >
                                            {{ $t("message.All") }}
                                        </el-option>
                                        <el-option
                                            :label="$t('message.Unread')"
                                            value="0"
                                        >
                                            {{ $t("message.Unread") }}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div style="float: right;margin-right: 17%">
                            <el-button
                                type="primary"
                                style="display: inline-block;vertical-align: -3px;padding: 8px 13px;"
                                @click="addDiscussion"
                            >
                                <i
                                    class="iconfont icon-add"
                                    style="font-size: 22px;margin-top: 5px"
                                />
                                <span
                                    style="float: right;font-size: 17px;margin-top: 3px"
                                    >{{ $t("message.discussion") }}</span
                                >
                            </el-button>
                            <!--<el-button icon="el-icon-setting" @click="centerDialogVisibleTrue"></el-button>-->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="22" style="margin-top: -20px">
                    <div class="distable">
                        <template>
                            <el-table
                                :cell-class-name="cell"
                                :data="tableData"
                                style="width: 100%"
                                :show-header="false"
                            >
                                <el-table-column
                                    align="center"
                                    label=""
                                    min-width="20"
                                >
                                    <template slot-scope="scope">
                                        <!--<el-checkbox v-model="scope.row.isRead"></el-checkbox>-->
                                        <div
                                            v-if="scope.row.isRead == 0"
                                            style="
                width:10px;
                height:10px;
                background: #0e38b1;
                border-radius:10px;"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="37">
                                    <template slot-scope="scope">
                                        <!--<i><img src="../../../../../static/images/Discussions.png"></i>-->
                                        <i
                                            class="iconfont icon-liaotian"
                                            style="font-size: 20px;color: #666666;"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column label="姓名" min-width="194">
                                    <template slot-scope="scope">
                                        <div
                                            slot="reference"
                                            style="cursor: pointer;
                      overflow: hidden;text-overflow:ellipsis;white-space: nowrap"
                                            class="name-wrapper"
                                            @click="gotoDetail(scope.row)"
                                        >
                                            {{ scope.row.title }}
                                        </div>
                                        <!--</el-popover>-->
                                        <div
                                            v-if="
                                                scope.row.lastActiveTime !==
                                                    undefined
                                            "
                                        >
                                            <p style="" class="time">
                                                Last post at&nbsp;{{
                                                    scope.row.lastActiveTime
                                                        | formatDate(s)
                                                }}
                                            </p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="127">
                                    <template slot-scope="scope">
                                        <div
                                            v-if="scope.row.userCount"
                                            style="color: #0e38b1;text-decoration: underline"
                                        >
                                            <el-popover
                                                v-if="scope.row.userCount != 0"
                                                trigger="hover"
                                                placement="top"
                                            >
                                                <div>
                                                    <span
                                                        >{{
                                                            scope.row.userCount
                                                        }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                            $t("message.user")
                                                        }}</span
                                                    >
                                                </div>

                                                <div
                                                    slot="reference"
                                                    style="text-decoration: underline;color: #0e38b1;font-size: 13px"
                                                    class="name-wrapper"
                                                >
                                                    {{
                                                        $t(
                                                            "message.ANNOUNCE.ALL_SECTIONS"
                                                        )
                                                    }}
                                                </div>
                                            </el-popover>
                                        </div>
                                        <div v-else-if="scope.row.sectionList">
                                            <el-popover
                                                v-if="
                                                    scope.row.sectionList
                                                        .length != 0
                                                "
                                                trigger="hover"
                                                placement="top"
                                            >
                                                <div
                                                    v-for="(item,
                                                    key,
                                                    index) in scope.row
                                                        .sectionList"
                                                >
                                                    <span
                                                        >{{
                                                            item.sectionName
                                                        }}&nbsp;&nbsp;&nbsp;{{
                                                            item.userCount
                                                        }}{{
                                                            $t("message.user")
                                                        }}</span
                                                    >
                                                </div>

                                                <div
                                                    slot="reference"
                                                    style="text-decoration: underline;color: #0e38b1;font-size: 13px"
                                                    class="name-wrapper"
                                                >
                                                    {{
                                                        scope.row.sectionList
                                                            .length
                                                    }}{{
                                                        $t(
                                                            "message.ANNOUNCE.SECTIONS"
                                                        )
                                                    }}
                                                </div>
                                            </el-popover>
                                        </div>
                                        <p />
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="285">
                                    <template slot-scope="scope">
                                        <v-due-time
                                            class="time"
                                            :assigns="scope.row.assign"
                                            :users="users"
                                            :sections="sections"
                                        />
                                        <v-available-time
                                            class="time"
                                            :assigns="scope.row.assign"
                                            :users="users"
                                            :sections="sections"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="135">
                                    <template slot-scope="scope">
                                        <div class="read-unread">
                                            <template
                                                v-for="(item,
                                                key,
                                                index) in scope.row
                                                    .readCountDTO"
                                                style="background: #0e38b1"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="
                                                        item +
                                                            ' ' +
                                                            'unread' +
                                                            ' ' +
                                                            'replies'
                                                    "
                                                    placement="top"
                                                >
                                                    <span
                                                        v-if="
                                                            key ==
                                                                'replyNotReadTotal'
                                                        "
                                                        class="read"
                                                        >{{ item }}</span
                                                    >
                                                </el-tooltip>
                                            </template>
                                            <template
                                                v-for="(item,
                                                key,
                                                index) in scope.row
                                                    .readCountDTO"
                                                style="background: #0e38b1"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="
                                                        item + ' ' + 'replies'
                                                    "
                                                    placement="top"
                                                >
                                                    <span
                                                        v-if="
                                                            key == 'replyTotal'
                                                        "
                                                        class="unread"
                                                        >{{ item }}</span
                                                    >
                                                </el-tooltip>
                                            </template>
                                        </div>

                                        <el-dropdown>
                                            <div
                                                style="width: 20px;height: 30px;cursor: pointer;text-align: center;margin-left: 10px"
                                            >
                                                <i style=""
                                                    ><img
                                                        src="../../../../../static/images/spread.png"
                                                /></i>
                                            </div>
                                            <el-dropdown-menu slot="dropdown">
                                                <div
                                                    v-if="
                                                        !scope.row
                                                            .allowComment &&
                                                            !hasNoOpPermission(
                                                                scope.row
                                                                    .createUserId
                                                            )
                                                    "
                                                    @click="
                                                        discussionListComments(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <!--<i><img src="../../../../../static/images/unlock.png"></i>-->
                                                        <!--{{$t('message.Open_for_comments')}}-->
                                                        <i
                                                            class="iconfont icon-password"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                class="iconzi"
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Open_for_comments"
                                                                    )
                                                                }}
                                                            </span>
                                                        </i>
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    v-if="
                                                        scope.row
                                                            .allowComment &&
                                                            !hasNoOpPermission(
                                                                scope.row
                                                                    .createUserId
                                                            )
                                                    "
                                                    @click="
                                                        discussionListCommentsClose(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            class="iconfont icon-suoding"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Close_for_comments"
                                                                    )
                                                                }}
                                                            </span>
                                                        </i>
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    v-if="
                                                        !hasNoOpPermission(
                                                            scope.row
                                                                .createUserId
                                                        )
                                                    "
                                                    @click="
                                                        deleteOpen(
                                                            scope.$index,
                                                            tableData,
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            class="iconfont icon-delete"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Deletes"
                                                                    )
                                                                }}
                                                            </span>
                                                        </i>
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    v-if="scope.row.isPin == 0"
                                                    @click="
                                                        discussionListpin(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            class="iconfont icon-ding"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Pin"
                                                                    )
                                                                }}
                                                            </span>
                                                        </i>
                                                        <!--Pin-->
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    v-if="scope.row.isPin == 1"
                                                    @click="
                                                        discussionListUpin(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            class="iconfont icon-ding"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Unpin"
                                                                    )
                                                                }}
                                                            </span>
                                                        </i>
                                                        <!--Unpin-->
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    v-if="
                                                        !hasNoOpPermission(
                                                            scope.row
                                                                .createUserId
                                                        )
                                                    "
                                                    @click="
                                                        discussionListCopy(
                                                            tableData,
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            class="iconfont icon-ICAtubiao_wendangzhongxin"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Duplicates"
                                                                    )
                                                                }}
                                                            </span>
                                                        </i>
                                                    </el-dropdown-item>
                                                </div>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                        <br />
                                        <div
                                            v-if="scope.row.allowComment == 0"
                                            style="display: inline-block"
                                        >
                                            <span
                                                style="font-size: 13px;color: #666666"
                                                >{{
                                                    $t(
                                                        "message.Close_for_comments"
                                                    )
                                                }}</span
                                            >
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-dialog
                :title="$t('message.Edit_Discussion_Settings')"
                :visible.sync="centerDialogVisible"
                width="30%"
            >
                <span>{{ $t("message.My_Settings") }}</span
                ><br />
                <el-checkbox
                    v-model="allowMarkPostStatus"
                    :label="$t('message.Manually_mark_posts_as_read')"
                    name="type"
                /><br />
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="discussionSettings">{{
                        $t("message.Save_Settings")
                    }}</el-button>
                </span>
            </el-dialog>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="deleteDialogVisible"
                width="30%"
            >
                <span>{{
                    $t("message.You_are_about_to_delete_this_discussion")
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="discussionListDelete">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/date";
import availableDraw from "@/utils/availableDraw";
import dueDraw from "@/utils/dueDraw";

export default {
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    components: {
        "v-due-time": dueDraw,
        "v-available-time": availableDraw
    },
    data() {
        return {
            //* ***************设置的变量start***************
            allowMarkPostStatus: "",
            settingId: "",
            allowStudentCreateDiscussion: "",
            allowStudentEditDiscussion: "",
            allowDiscussionAttachFile: "",
            //* ***************设置的变量end***************
            titlemain: "",
            courseId: this.$route.query.courseId,
            groupId: this.$route.query.groupId,
            deleteDialogVisible: false,
            scope: "",
            s: "",
            selected: {},
            form: {
                name: "",
                region: ""
            },
            discussionStepOne: true,
            discussionStepThree: false,
            centerDialogVisible: false,
            ruleformlist: {
                title: "",
                isRead: ""
            },
            tableData: [],
            type: "",
            users: "",
            sections: ""
        };
    },
    mounted() {
        this.power();
        this.discussionList();
        this.routerpath();
        this.getAssignDataList();
    },
    methods: {
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (result.data.code == 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        },
        routerpath() {
            this.type = this.userInfoData.type;
        },
        hasNoOpPermission(createUserId) {
            // console.log(this.createUserId);
            return (
                this.userInfoData.type == 4 &&
                this.userInfoData.id != createUserId
            );
        },
        // 跳转到录入页
        addDiscussion() {
            if (this.type == 4) {
                this.$router.push({
                    path: "/studentHomePage/studentMain/groupDiscussionAdmit",
                    query: {
                        allowStudentCreateDiscussion: this
                            .allowStudentCreateDiscussion,
                        allowStudentEditDiscussion: this
                            .allowStudentEditDiscussion,
                        allowDiscussionAttachFile: this
                            .allowDiscussionAttachFile,
                        courseId: this.courseId,
                        groupId: this.groupId
                    }
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupDiscussionAdmit",
                    query: {
                        allowStudentCreateDiscussion: this
                            .allowStudentCreateDiscussion,
                        allowStudentEditDiscussion: this
                            .allowStudentEditDiscussion,
                        allowDiscussionAttachFile: this
                            .allowDiscussionAttachFile,
                        courseId: this.courseId,
                        groupId: this.groupId
                    }
                });
            }
        },
        // 打开设置的弹窗
        centerDialogVisibleTrue() {
            this.centerDialogVisible = true;
        },
        // 权限控制的接口
        power() {
            console.log(this.courseId);
            this.$http
                .get(`${process.env.NODE_ENV}/discussionConfig/get`, {
                    params: { data: this.courseId }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        if ((res.data.entity.id = !"undefined")) {
                            this.settingId = res.data.entity.id;
                            this.allowStudentCreateDiscussion =
                                res.data.entity.allowStudentCreateDiscussion;
                            this.allowStudentEditDiscussion =
                                res.data.entity.allowStudentEditDiscussion;
                            this.allowDiscussionAttachFile =
                                res.data.entity.allowDiscussionAttachFile;
                        }
                    }
                });
        },
        // 设置保存
        discussionSettings() {
            this.centerDialogVisible = false;
            this.$http
                .post(`${process.env.NODE_ENV}/userConfig/modify`, {
                    allowMarkPostStatus: Number(this.allowMarkPostStatus)
                })
                .then(res => {
                    console.log(res);
                });
        },
        // 筛选
        shaixuan() {
            this.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: this.courseId,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title,
                        studyGroupId: this.groupId
                    }
                })
                .then(res => {
                    const arr = res.data.entity;
                    this.tableData = arr;
                    arr.map((item, index) => {
                        console.log("bbbbb", item.allowComment);
                        this.allowComment = item.allowComment;
                        // item.isRead = Boolean(item.isRead)
                        this.id = item.id;
                        this.titlemain = item.title;
                    });
                    if (arr.length == 0) {
                        // this.discussionStepOne = true;
                        // this.discussionStepThree = false;
                    } else {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                    }
                });
        },
        shaixuan1() {
            this.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: this.courseId,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title,
                        studyGroupId: this.groupId
                    }
                })
                .then(res => {
                    const arr = res.data.entity;
                    this.tableData = arr;
                    arr.map((item, index) => {
                        console.log("bbbbb", item.allowComment);
                        this.allowComment = item.allowComment;
                        // item.isRead = Boolean(item.isRead)
                        this.id = item.id;
                        this.titlemain = item.title;
                    });
                    if (arr.length == 0) {
                        // this.discussionStepOne = true;
                        // this.discussionStepThree = false;
                    } else {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                    }
                });
        },
        // 初始化讨论列表
        discussionList() {
            this.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: this.courseId,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title,
                        studyGroupId: this.groupId
                    }
                })
                .then(res => {
                    const arr = res.data.entity;
                    this.tableData = arr;
                    arr.map((item, index) => {
                        console.log("bbbbb", item.allowComment);
                        this.allowComment = item.allowComment;
                        // item.isRead = Boolean(item.isRead)
                        this.id = item.id;
                        this.titlemain = item.title;
                    });
                    if (arr.length == 0) {
                        this.discussionStepOne = true;
                        this.discussionStepThree = false;
                    } else {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                    }
                });
        },
        published(status, id) {
            console.log(status, id);
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id,
                    status
                })
                .then(res => {
                    if (res.data.code == 200) {
                        console.log(11112345666666);
                        // status =! status
                        this.discussionList();
                    }
                    // this.discussionList()
                });
        },
        unpublished() {},
        // 置顶图标的转换
        cell({ row, column, rowIndex, columnIndex }) {
            // 第四列添加image类
            if (row.isPin == "1" && columnIndex === 3) {
                return "my-image";
            }
            if (row.status == "1" && columnIndex === 5) {
                return "published";
            }
            if (row.status == "0" && columnIndex === 5) {
                return "unpublished";
            }
        },

        // 讨论列表置顶
        discussionListUpin(row) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: row.id,
                    courseId: this.courseId,
                    isPin: 0
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                });
        },
        // 讨论列表置顶
        discussionListpin(row) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: row.id,
                    courseId: this.courseId,
                    isPin: 1
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                });
        },
        // 讨论列表复制
        discussionListCopy(tableData, scope) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/copy/edit`, {
                    id: scope.id
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                });
        },

        deleteOpen(index, rows, scope) {
            this.scope = scope;
            this.deleteDialogVisible = true;
        },
        // 讨论列表删除
        discussionListDelete(index, rows, scope) {
            this.deleteDialogVisible = false;
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [
                    this.scope.id
                ])
                .then(res => {
                    this.discussionList();
                });
        },
        // 讨论列表评论打开
        discussionListComments(scope) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: scope.id,
                    courseId: this.courseId,
                    allowComment: 1
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                    scope.allowComment = 0;
                });
        },
        // 讨论列表评论关闭
        discussionListCommentsClose(scope) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: scope.id,
                    courseId: this.courseId,
                    allowComment: 0
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                    scope.allowComment = 1;
                });
        },
        // 进入详情页
        gotoDetail(scope) {
            const that = this;
            if (that.type == 4) {
                that.$router.push({
                    path: "/studentHomePage/studentMain/groupDiscussionDetail",
                    query: {
                        discussionId: scope.id,
                        courseId: this.courseId,
                        allowStudentEditDiscussion: this
                            .allowStudentEditDiscussion,
                        groupId: this.groupId,
                        editTypes: 1
                    }
                });
            } else {
                that.$router.push({
                    path: "/homePage/teacherMain/groupDiscussionDetail",
                    query: {
                        discussionId: scope.id,
                        courseId: this.courseId,
                        allowStudentEditDiscussion: this
                            .allowStudentEditDiscussion,
                        groupId: this.groupId
                    }
                });
            }
            if (Number(scope.isRead) == 0) {
                that.$http
                    .post(`${process.env.NODE_ENV}/contentViewRecord/modify`, {
                        originId: scope.id,
                        originType: 1
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            console.log(1111);
                        }
                    });
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
.discussionStepOne {
    .disMain {
        margin-top: 25px;
        /*height: 650px;*/
        border: 1px solid #e7ebf7;
        padding-top: 16%;
        padding-bottom: 30%;

        .disMainImg {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .disMainImg img {
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .disMainImg p {
            font-size: 18px;
            color: gray;
            position: absolute;
            margin-top: 15%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .disMainImg a {
            text-decoration: underline;
            color: #0e38b1;
            font-size: 18px;
            cursor: pointer;
            position: absolute;
            margin-top: 19%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
.discussionStepThree {
    .publish-unpublish {
        position: absolute;
        right: 30%;
    }
    /deep/ .el-table .my-image {
        background: url("../../../../../static/images/ding.png") no-repeat;
        background-size: 19px 19px;
        background-position: 50% 50%;
    }
    /deep/ .el-table {
        border: 1px solid lightgray;
    }
    /deep/ .el-table td {
        border-bottom: 1px solid lightgray;
    }

    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: white;
    }
    /deep/ .el-dropdown {
        display: inline-block;
        position: relative;
        color: #606266;
        font-size: 14px;
        float: right;
    }
    .read-unread {
        display: inline-block;
        float: left;
        margin-right: 35px;
    }
    .read {
        display: inline-block;
        background: #0e38b1;
        border: 2px solid #0e38b1;
        border-radius: 15px 1px 1px 15px;
        /*height: 20px;*/
        color: white;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 10px;
        height: 22px;
        float: left;
    }
    .unread {
        display: inline-block;
        background: #e6ebf7;
        border: 2px solid #0e38b1;
        border-radius: 1px 15px 15px 1px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 11px;
        height: 22px;
    }
    position: relative;

    .rightBar {
        position: absolute;
        top: 0;
        right: 0;
    }

    .time {
        color: #cccccc;
        font-size: 13px;
    }

    .distable {
        padding: 1%;
        border: 1px solid #a3a7b2;
        margin-top: 20px;
        width: 100%;
    }

    .el-table__body {
        width: 100%;
    }
}
</style>
