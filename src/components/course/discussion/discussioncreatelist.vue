<template>
    <div class="studentDiscussions">
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
                        <!--<el-button @click="addDiscussion" icon="el-icon-circle-plus-outline" type="primary"-->
                        <!--style="display: inline-block;">{{$t('message.discussion')}}-->
                        <!--</el-button>-->
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
                        <el-button
                            icon="el-icon-setting"
                            @click="openCenterDialogVisible"
                        />
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" style="margin-top: -20px">
                    <div class="grid-content bg-purple">
                        <div class="disMain">
                            <div class="disMainImg">
                                <img
                                    src="../../../../static/images/studiscussion.png"
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
                        <div style="float: right;margin-right: 15%">
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
                            <el-button
                                icon="el-icon-setting"
                                @click="openCenterDialogVisible"
                            />
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
                                style="width: 100%;"
                                :show-header="false"
                            >
                                <el-table-column
                                    align="center"
                                    label=""
                                    min-width="20"
                                >
                                    <template slot-scope="scope">
                                        <div
                                            v-if="
                                                Number(scope.row.isRead) === 0
                                            "
                                            style="
                width:10px;
                height:10px;
                background: #0e38b1;
                border-radius:10px;"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="37">
                                    <template>
                                        <!--<i><img src="../../../../static/images/Discussions.png"></i>-->
                                        <i
                                            class="iconfont icon-liaotian"
                                            style="font-size: 20px;color: #666666;"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="194">
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
                                                    <span>
                                                        {{
                                                            scope.row.userCount
                                                        }}
                                                        <span
                                                            v-if="
                                                                Number(
                                                                    scope.row
                                                                        .userCount
                                                                ) === 1
                                                            "
                                                            >{{
                                                                $t(
                                                                    "message.user"
                                                                )
                                                            }}</span
                                                        >
                                                        <span
                                                            v-else-if="
                                                                scope.row
                                                                    .userCount >
                                                                    1
                                                            "
                                                            >{{
                                                                $t(
                                                                    "message.users"
                                                                )
                                                            }}</span
                                                        >
                                                    </span>
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
                                                    index) in scope.row
                                                        .sectionList"
                                                    :key="index"
                                                >
                                                    <span
                                                        >{{ item.sectionName }}
                                                        {{ item.userCount }}
                                                        <span
                                                            v-if="
                                                                Number(
                                                                    item.userCount
                                                                ) === 1
                                                            "
                                                            >{{
                                                                $t(
                                                                    "message.user"
                                                                )
                                                            }}</span
                                                        >
                                                        <span
                                                            v-else-if="
                                                                item.userCount >
                                                                    1
                                                            "
                                                            >{{
                                                                $t(
                                                                    "message.users"
                                                                )
                                                            }}</span
                                                        >
                                                    </span>
                                                </div>

                                                <div
                                                    slot="reference"
                                                    style="text-decoration: underline;color: #0e38b1;font-size: 13px"
                                                    class="name-wrapper"
                                                >
                                                    {{
                                                        scope.row.sectionList
                                                            .length
                                                    }}
                                                    <span
                                                        v-if="
                                                            scope.row
                                                                .sectionList
                                                                .length == 1
                                                        "
                                                        >{{
                                                            $t(
                                                                "message.People_section"
                                                            )
                                                        }}</span
                                                    >
                                                    <span
                                                        v-else-if="
                                                            scope.row
                                                                .sectionList
                                                                .length > 1
                                                        "
                                                        >{{
                                                            $t(
                                                                "message.Sections"
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </el-popover>
                                        </div>
                                        <p />
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="280">
                                    <template slot-scope="scope">
                                        <v-available-time
                                            :assigns="scope.row.assign"
                                            :users="users"
                                            :sections="sections"
                                            class="time"
                                        />
                                        <v-due-time
                                            class="time"
                                            :assigns="scope.row.assign"
                                            :users="users"
                                            :sections="sections"
                                        />
                                        <!--{{scope.row}}-->
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="140">
                                    <template slot-scope="scope">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            content="unpublish"
                                            placement="top"
                                        >
                                            <span
                                                v-show="scope.row.status"
                                                class="publish-unpublish"
                                                @click="
                                                    published(0, scope.row.id)
                                                "
                                            >
                                                <i
                                                    class="el-icon-success"
                                                    style="cursor: pointer;color: green;font-size: 24px"
                                                />
                                            </span>
                                        </el-tooltip>
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            content="publish"
                                            placement="top"
                                        >
                                            <span
                                                v-show="!scope.row.status"
                                                class="publish-unpublish"
                                                @click="
                                                    published(1, scope.row.id)
                                                "
                                            >
                                                <i
                                                    class="iconfont icon-Group-"
                                                    style="cursor: pointer;font-size: 24px"
                                                />
                                            </span>
                                        </el-tooltip>
                                        <div class="read-unread">
                                            <div
                                                v-for="(item,
                                                key,
                                                index) in scope.row
                                                    .readCountDTO"
                                                :key="index"
                                                style=""
                                            >
                                                <template>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            String(item) +
                                                                ' ' +
                                                                'unread' +
                                                                ' ' +
                                                                'replies'
                                                        "
                                                        placement="top"
                                                    >
                                                        <span
                                                            v-if="
                                                                key ===
                                                                    'replyNotReadTotal'
                                                            "
                                                            class="read"
                                                            >{{ item }}</span
                                                        >
                                                    </el-tooltip>
                                                </template>
                                            </div>
                                            <div
                                                v-for="(item,
                                                key,
                                                index) in scope.row
                                                    .readCountDTO"
                                                :key="index"
                                                style=""
                                            >
                                                <template>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            String(item) +
                                                                ' ' +
                                                                'replies'
                                                        "
                                                        placement="top"
                                                    >
                                                        <span
                                                            v-if="
                                                                key ===
                                                                    'replyTotal'
                                                            "
                                                            class="unread"
                                                            >{{ item }}</span
                                                        >
                                                    </el-tooltip>
                                                </template>
                                            </div>
                                        </div>

                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <div
                                                    style="width: 20px;
                                                          height: 30px;
                                                          cursor: pointer;
                                                          text-align: center;
                                                          margin-left: 10px"
                                                >
                                                    <i style=""
                                                        ><img
                                                            src="../../../../static/images/spread.png"
                                                    /></i>
                                                </div>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <div
                                                    v-if="
                                                        !scope.row.allowComment
                                                    "
                                                    @click="
                                                        discussionListComments(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
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
                                                        scope.row.allowComment
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
                                                        <!--{{$t('message.Close_for_comments')}}-->
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
                                                                Pin
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
                                                                Unpin
                                                            </span>
                                                        </i>
                                                        <!--Unpin-->
                                                    </el-dropdown-item>
                                                </div>
                                                <div
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
                                                <div
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
                                                    @click="
                                                        goCourseResource(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            class="iconfont icon-fenxiang1"
                                                            style="font-size: 20px"
                                                        >
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.share_resource"
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
                                                        "message.close_for_comments"
                                                    )
                                                }}</span
                                            >
                                        </div>
                                    </template>
                                    <!--<span style="font-size: 12px">close for common</span>-->
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
                <span>{{ $t("message.Student_Settings") }}</span
                ><br />
                <el-checkbox
                    v-model="allowStudentCreateDiscussion"
                    :label="$t('message.Create_discussion_topic')"
                    name="type"
                /><br />
                <el-checkbox
                    v-model="allowStudentEditDiscussion"
                    :label="$t('message.Edit_and_delete_their_own_posts')"
                    name="type"
                    style="margin-left: 1px"
                /><br />
                <el-checkbox
                    v-model="allowDiscussionAttachFile"
                    :label="$t('message.Attach_files_to_discussions')"
                    name="type"
                    style="margin-left: 1px"
                />
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
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";
import availableDraw from "@/utils/availableDraw.vue";
import dueDraw from "@/utils/dueDraw.vue";

export default {
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    components: {
        "v-due-time": dueDraw,
        "v-available-time": availableDraw
        // 'v-module': moduleDraw,
    },
    data() {
        return {
            deleteDialogVisible: false,
            courseId: "",
            selectedAssign: [],
            value7: "",
            settingId: "",
            assignmentName: "",
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
                    endTime: ""
                }
            ],
            postSections: [],
            editor: ClassicEditor,
            editorConfig: {},
            splitStudents: true,
            createGroupsManually: true,
            createGroupsNow: false,
            limitGroups: false,
            pointsPossible: false,
            displayGradeas: false,
            leaderShip: false,
            requireGroupmembers: false,
            assignTo: false,
            availableFrom: true,
            until: true,
            postTo: true,
            multipleSelection: [],
            radio: "",
            selected: {},
            value5: [],
            value1time: "",
            section: {},
            postToSection: [],
            classGroup: {},
            assignmentGroup: {},
            value: [],
            form: {
                name: "",
                region: ""
            },
            dialogFormVisible: false,
            dialogAssignmentCreate: false,
            discussionStepOne: true,
            discussionStepTwo: false,
            discussionStepThree: false,
            discussionStepFour: false,
            discussionStepFive: false,
            centerDialogVisible: false,
            //* ******新建讨论表单采集start*********
            title: "",
            content: "",
            gradeType1: "",
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
            allowComment: "",
            scope: "",
            copy: "",
            users: "",
            sections: ""
        };
    },
    mounted() {
        this.discussionList();
        this.testly1();
        this.getAssignDataList();
    },
    methods: {
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
        published(status, id) {
            // console.log(status,id);
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id,
                    status
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        // console.log(11112345666666)
                        // status =! status
                        this.discussionList();
                    }
                    // this.discussionList()
                });
        },
        // 讨论配置初始化

        // 讨论配置修改
        discussionSettings() {
            const that = this;
            that.centerDialogVisible = false;
            that.$http
                .post(`${process.env.NODE_ENV}/userConfig/modify`, {
                    allowMarkPostStatus: Number(this.allowMarkPostStatus)
                })
                .then(res => {
                    console.log(res);
                });
            that.$http
                .post(`${process.env.NODE_ENV}/discussionConfig/modify`, {
                    id: this.settingId,
                    courseId: that.courseId,
                    allowStudentCreateDiscussion: Number(
                        this.allowStudentCreateDiscussion
                    ),
                    allowStudentEditDiscussion: Number(
                        this.allowStudentEditDiscussion
                    ),
                    allowDiscussionAttachFile: Number(
                        this.allowDiscussionAttachFile
                    )
                })
                .then(res => {
                    console.log(res);
                    // console.log(Number(this.allowStudentCreateDiscussion))
                });
        },
        testly1() {
            this.$http
                .get(`${process.env.NODE_ENV}/discussionConfig/get`, {
                    params: { data: this.courseId }
                })
                .then(res => {
                    // console.log(res.data.entity.id);
                    // this.settingId = res.data.entity.id;
                    this.allowDiscussionAttachFile = Boolean(
                        res.data.entity.allowDiscussionAttachFile
                    );
                    this.allowStudentCreateDiscussion = Boolean(
                        res.data.entity.allowStudentCreateDiscussion
                    );
                    this.allowStudentEditDiscussion = Boolean(
                        res.data.entity.allowStudentEditDiscussion
                    );
                });
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
                    console.log(res);
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
                    Object.assign(scope, { allowComment: 0 });
                    this.discussionList();
                });
            // console.log('cccccccccccccc',this.allowComment);
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
                    Object.assign(scope, { allowComment: 1 });
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
        // 讨论列表复制
        discussionListCopy(tableData, scope) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/copy/edit`, {
                    id: scope.id
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.discussionList();
                        Object.assign(scope, { copy: "copy" });
                        this.$message.success("Copy success");
                    }
                });
        },
        deleteOpen(index, rows, scope) {
            this.scope = scope;
            this.deleteDialogVisible = true;
        },
        // 讨论列表删除
        discussionListDelete() {
            this.deleteDialogVisible = false;
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [
                    this.scope.id
                ])
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.discussionList();
                        this.$message.success("Delete succeeded!");
                    }
                });
        },
        // 置顶图标的转换
        cell({ row, column, rowIndex, columnIndex }) {
            console.log(column + rowIndex);
            // 第四列添加image类
            if (String(row.isPin) === "1" && Number(columnIndex) === 3) {
                return "my-image";
            }
            return false;
        },
        shaixuan() {
            const that = this;
            that.courseId = that.$route.query.courseId;
            that.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: that.courseId,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title
                    }
                })
                .then(res => {
                    const arr = res.data.entity;
                    arr.map(item => {
                        that.allowComment = item.allowComment;
                        Object.assign(item, { isRead: Boolean(item.isRead) });
                        this.id = item.id;
                        this.titlemain = item.title;
                        return item;
                    });
                    that.tableData = arr;
                    if (arr.length === 0) {
                        // this.discussionStepOne = true;
                        // this.discussionStepThree = false;
                    } else {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                    }
                });
        },
        shaixuan1() {
            const that = this;
            that.courseId = that.$route.query.courseId;
            that.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: that.courseId,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title
                    }
                })
                .then(res => {
                    const arr = res.data.entity;
                    arr.map(item => {
                        that.allowComment = item.allowComment;
                        Object.assign(item, { isRead: Boolean(item.isRead) });
                        this.id = item.id;
                        this.titlemain = item.title;
                        return item;
                    });
                    that.tableData = arr;
                    if (arr.length === 0) {
                        // this.discussionStepOne = true;
                        // this.discussionStepThree = false;
                    } else {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                    }
                });
        },
        // 初始化加载讨论列表
        discussionList() {
            const that = this;
            that.courseId = that.$route.query.courseId;
            that.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: that.courseId,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title
                    }
                })
                .then(res => {
                    const arr = res.data.entity;
                    arr.map(item => {
                        that.allowComment = item.allowComment;
                        Object.assign(item, { isRead: Boolean(item.isRead) });
                        this.id = item.id;
                        this.titlemain = item.title;
                        return item;
                    });
                    that.tableData = arr;
                    if (arr.length === 0) {
                        this.discussionStepOne = true;
                        this.discussionStepThree = false;
                    } else {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                    }
                });
        },
        addDiscussion() {
            this.$router.push({
                path: "/homePage/allCourse/discussionAdmit",
                query: { courseId: this.courseId }
            });
        },
        gotoDetail(scope) {
            const that = this;
            that.$router.push({
                path: "/homePage/allCourse/discussionDeatilCourse",
                query: {
                    discussionId: scope.id,
                    courseId: that.courseId,
                    name: scope.title
                }
            });
            if (Number(scope.isRead) === 0) {
                that.$http
                    .post(`${process.env.NODE_ENV}/contentViewRecord/modify`, {
                        originId: scope.id,
                        originType: 1
                    })
                    .then(res => {
                        if (Number(res.data.code) === 200) {
                            // that.$router.push({path:'/homePage/allCourse/discussionDeatilCourse',
                            //   query:{discussionId:scope.id,courseId:that.courseId,name:scope.title}});
                            // console.log(1111)
                        }
                    });
            }
        },
        goCourseResource(data) {
            const originId = data.id;
            this.$router.push({
                path: "/homePage/courseResource",
                query: {
                    originType: 2,
                    id: originId,
                    resourceTitle: data.title
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.studentDiscussions {
    .discussionStepOne {
        min-width: 912px;
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
        .iconzi {
            font-size: 16px;
        }
        .iconfont {
            font-size: 20px;
        }
        min-width: 912px;
        .publish-unpublish {
            position: absolute;
            right: 30%;
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
        /deep/ .el-table .my-image {
            background: url("../../../../static/images/ding.png") no-repeat;
            background-size: 19px 19px;
            background-position: 76% 50%;
        }
        /deep/ .el-table .published {
            background: url("../../../../static/images/published.png") no-repeat;
            background-size: 19px 19px;
            background-position: 60% 50%;
        }
        /deep/ .el-table .unpublished {
            background: url("../../../../static/images/unpublished.png")
                no-repeat;
            background-size: 19px 19px;
            background-position: 60% 50%;
        }
        /deep/ .el-dropdown {
            float: right;
        }
        .read-unread {
            display: inline-block;
            float: left;
            margin-left: 33px;
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
            margin-left: -100%;
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
            margin-right: -10px;
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
