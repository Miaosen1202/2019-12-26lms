<template>
    <div v-loading="loading" class="message-list" style="">
        <div>
            <el-select
                v-model="value"
                :placeholder="$t('message.Messages.All_course')"
                class="select-course"
                style=""
                :popper-class="discussion_select"
                @change="selectCourse"
            >
                <el-option
                    v-for="item in course"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
            </el-select>
        </div>
        <!--********************关于收件箱的start**********************************-->
        <div
            v-if="Number(messageType) === 0 || Number(messageType) === 1"
            class="message-list-inbox"
        >
            <div class="handle-box">
                <el-input
                    v-model="searchKey"
                    class="search-input"
                    style=""
                    prefix-icon="el-icon-search"
                    :placeholder="$t('message.Messages.Filter_by_subject')"
                    @input="inboxListSearch"
                />
                <div style="float: right">
                    <el-tooltip effect="dark" placement="top">
                        <div slot="content">
                            <span v-if="toggles === true">{{
                                $t("message.Messages.unstar")
                            }}</span>
                            <span v-if="toggles === false">{{
                                $t("message.Messages.star")
                            }}</span>
                        </div>
                        <span
                            :class="{
                                'iconfont icon-shoucang': toggles,
                                'iconfont icon-weishoucang': !toggles
                            }"
                            @click="collectAll"
                        />
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top">
                        <div slot="content">
                            <span v-if="isRead === true">{{
                                $t("message.Messages.read")
                            }}</span>
                            <span v-if="isRead === false">{{
                                $t("message.Messages.unread")
                            }}</span>
                        </div>
                        <!--<span :class="{'iconfont icon-yidu':isRead,'iconfont icon-weidu':!isRead}"-->
                        <!--style="" @click="isReadAll"></span>-->
                        <img
                            v-if="isRead"
                            src="/../../../static/images/yidu.png"
                            class="read-unread"
                            @click="isReadAll"
                        />
                        <img
                            v-if="!isRead"
                            src="/../../../static/images/weidu.png"
                            class="read-unread"
                            @click="isReadAll"
                        />
                    </el-tooltip>
                    <el-button @click="deleteMessageAll()">
                        <i
                            class="iconfont icon-delete"
                            style="font-size: 15px"
                        />
                        {{ $t("message.Messages.Delete") }}
                    </el-button>
                </div>
            </div>
            <div class="message-list-box">
                <el-checkbox-group v-model="checkList">
                    <div
                        v-for="(item, nIndex) in inboxListName"
                        :key="nIndex"
                        class="list-box"
                    >
                        <div class="message-list-box-top">
                            <el-checkbox
                                :label="item.subjectId"
                                class="subjectName"
                            >
                                {{ item.msgItemVO.messageSubject }}
                            </el-checkbox>
                            <span class="course-name">{{
                                item.courseName
                            }}</span>
                            <div
                                style="display: inline-block;float: right;margin-right: 10px"
                            >
                                <el-tooltip
                                    effect="dark"
                                    placement="top"
                                    :content="$t('message.Messages.unstar')"
                                >
                                    <span
                                        v-show="Number(item.isStar) === 1"
                                        class="iconfont icon-shoucang"
                                        style=""
                                        @click="collectItem(item.subjectId, 0)"
                                    />
                                </el-tooltip>
                                <el-tooltip
                                    effect="dark"
                                    placement="top"
                                    :content="$t('message.Messages.star')"
                                >
                                    <span
                                        v-show="item.isStar !== 1"
                                        class="iconfont icon-weishoucang"
                                        style=""
                                        @click="collectItem(item.subjectId, 1)"
                                    />
                                </el-tooltip>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <div class="caozuo">
                                            <i
                                                class="iconfont icon-huifu"
                                                style=""
                                            />
                                        </div>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <div
                                            @click="
                                                replyMessage(
                                                    item.courseId,
                                                    item.subjectId,
                                                    item.msgItemVO.messageId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-huifu"
                                                />
                                                <span
                                                    style="margin-left: 5px"
                                                    >{{
                                                        $t(
                                                            "message.Messages.Reply"
                                                        )
                                                    }}</span
                                                >
                                            </el-dropdown-item>
                                        </div>
                                        <div
                                            @click="
                                                replyMessageAll(
                                                    item.courseId,
                                                    item.subjectId,
                                                    item.msgItemVO.messageId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-ReplyAll"
                                                />
                                                {{
                                                    $t(
                                                        "message.Messages.Reply_All"
                                                    )
                                                }}
                                            </el-dropdown-item>
                                        </div>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <span
                                            class="iconfont icon-spread-big"
                                            style=""
                                        />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <div
                                            @click="
                                                forwardAll(
                                                    item.courseId,
                                                    item.subjectId,
                                                    item.msgItemVO.messageId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-forward"
                                                >
                                                    {{
                                                        $t(
                                                            "message.Messages.Forward"
                                                        )
                                                    }}
                                                </span>
                                            </el-dropdown-item>
                                        </div>
                                        <div
                                            @click="
                                                deleteMessageinboxDialog(
                                                    item.msgItemVO.subjectId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-delete"
                                                >
                                                    <span
                                                        style="margin-left: 10px"
                                                        >{{
                                                            $t(
                                                                "message.Messages.Delete"
                                                            )
                                                        }}</span
                                                    >
                                                </span>
                                            </el-dropdown-item>
                                        </div>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div
                            class="message-list-box-bottom"
                            @click="gotoDetail(item.subjectId, item.isStar)"
                        >
                            <div>
                                <el-tooltip
                                    effect="dark"
                                    placement="top"
                                    :content="$t('message.Messages.read')"
                                >
                                    <span
                                        v-show="
                                            Number(item.msgItemVO.isRead) === 0
                                        "
                                        class="iconfont icon-yidu"
                                        @click.stop="
                                            isReadToggle(
                                                item.msgItemVO.messageId,
                                                1
                                            )
                                        "
                                    />
                                </el-tooltip>
                                <el-tooltip
                                    effect="dark"
                                    placement="top"
                                    :content="$t('message.Messages.unread')"
                                >
                                    <span
                                        v-show="
                                            Number(item.msgItemVO.isRead) === 1
                                        "
                                        class="iconfont icon-weidu"
                                        @click.stop="
                                            isReadToggle(
                                                item.msgItemVO.messageId,
                                                0
                                            )
                                        "
                                    />
                                </el-tooltip>
                                <img
                                    class="message-img"
                                    :src="
                                        item.msgItemVO.sendAvatarFileId
                                            ? getAbsolutePath(
                                                  item.msgItemVO
                                                      .sendAvatarFileId,
                                                  40,
                                                  40
                                              )
                                            : '/../../../static/images/touxiang1.png'
                                    "
                                />
                                <div class="nameto">
                                    <span class="message-name">{{
                                        item.msgItemVO.sendUsername
                                    }}</span>
                                    <span
                                        style="margin-left: 5px;font-size: 15px"
                                        >{{ $t("message.Messages.to") }}</span
                                    >
                                    <div class="message-name-to-div">
                                        <span
                                            v-for="(items, reIndex) in item
                                                .msgItemVO.recList"
                                            :key="reIndex"
                                            class="message-name-to"
                                            >{{
                                                items.username
                                            }}&nbsp;&nbsp;</span
                                        >
                                    </div>
                                </div>
                                <span class="message-time-yesterday">
                                    {{
                                        item.msgItemVO.createTime
                                            | isYesterday(times)
                                    }}
                                </span>
                                <span class="message-time">{{
                                    item.msgItemVO.createTime | formatDate(s)
                                }}</span>
                                <p class="message-content">
                                    {{ transfHtml(item.msgItemVO.messageText) }}
                                </p>
                                <div class="another-message-box">
                                    <p
                                        v-if="item.msgTotal - 1 > 0"
                                        class="another-message"
                                    >
                                        ...<span> {{ item.msgTotal - 1 }} </span
                                        >{{ $t("message.Messages.more") }}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="nodata" class="no-list">
                        {{
                            $t(
                                "message.Messages.No_records_to_be_shown_for_your_query_range"
                            )
                        }}
                    </div>
                    <div v-if="nosearch" class="no-list">
                        {{
                            $t(
                                "message.Messages.No_matching_message_please_adjust_your_input"
                            )
                        }}
                    </div>
                </el-checkbox-group>
            </div>
            <div style="text-align: center;width: 100%">
                <span
                    v-if="hasMoreInboxList"
                    style="cursor: pointer;font-size: 17px;"
                    @click="moreInboxList()"
                    >{{ $t("message.Messages.Click_load_More") }} ...</span
                >
            </div>

            <div>
                <!--全部删除的弹窗-->
                <el-dialog
                    :title="$t('message.Messages.Delete_messages')"
                    :visible.sync="dialogVisibleDelete"
                    width="30%"
                >
                    <span>{{
                        $t(
                            "message.Messages.Delete_the_selected_messages_really"
                        )
                    }}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibleDelete = false">{{
                            $t("message.Messages.Cancel")
                        }}</el-button>
                        <el-button
                            type="primary"
                            @click="deleteMessageAllCheck"
                            >{{ $t("message.Messages.Confirm") }}</el-button
                        >
                    </span>
                </el-dialog>
                <!--单个删除的弹窗-->
                <el-dialog
                    :title="$t('message.Messages.Delete_messages')"
                    :visible.sync="dialogVisibleDeleteInbox"
                    width="30%"
                >
                    <span>{{
                        $t(
                            "message.Messages.Delete_the_selected_messages_really"
                        )
                    }}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibleDeleteInbox = false">{{
                            $t("message.Messages.Cancel")
                        }}</el-button>
                        <el-button type="primary" @click="deleteMessageinbox">{{
                            $t("message.Messages.Confirm")
                        }}</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <!--********************关于收件箱的end**********************************-->
        <!--********************关于发件箱的start**********************************-->
        <div
            v-if="Number(messageType) === 2"
            class="message-list-inbox message-list-sent"
        >
            <div class="handle-box">
                <el-input
                    v-model="sentSearchKey"
                    class="search-input"
                    prefix-icon="el-icon-search"
                    :placeholder="$t('message.Messages.Filter_by_subject')"
                    @input="sentBoxSearch"
                />
                <div style="float: right">
                    <el-button @click="deleteMessageSetDialog">
                        <i
                            class="iconfont icon-delete"
                            style="font-size: 15px"
                        />
                        {{ $t("message.Messages.Delete") }}
                    </el-button>
                </div>
            </div>
            <div class="message-list-box">
                <el-checkbox-group v-model="checkListSent" style="">
                    <div
                        v-for="(item, sIndex) in sentboxListName"
                        :key="sIndex"
                        class="list-box"
                    >
                        <div class="message-list-box-top">
                            <el-checkbox
                                :label="item.subjectId"
                                class="subjectName"
                            >
                                {{ item.msgItemVO.messageSubject }}
                            </el-checkbox>
                            <span class="course-name">{{
                                item.courseName
                            }}</span>
                            <div style="display: inline-block;float: right">
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <div class="caozuo">
                                            <i
                                                class="iconfont icon-huifu"
                                                style=""
                                            />
                                        </div>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <div
                                            @click="
                                                replyMessage(
                                                    item.courseId,
                                                    item.subjectId,
                                                    item.msgItemVO.messageId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-huifu"
                                                />
                                                <span
                                                    style="margin-left: 5px"
                                                    >{{
                                                        $t(
                                                            "message.Messages.Reply"
                                                        )
                                                    }}</span
                                                >
                                            </el-dropdown-item>
                                        </div>
                                        <div
                                            @click="
                                                replyMessageAll(
                                                    item.courseId,
                                                    item.subjectId,
                                                    item.msgItemVO.messageId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-ReplyAll"
                                                />
                                                {{
                                                    $t(
                                                        "message.Messages.Reply_All"
                                                    )
                                                }}
                                            </el-dropdown-item>
                                        </div>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <span
                                            class="iconfont icon-spread-big"
                                            style=""
                                        />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <div
                                            @click="
                                                forwardAll(
                                                    item.courseId,
                                                    item.subjectId,
                                                    item.msgItemVO.messageId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-forward"
                                                >
                                                    {{
                                                        $t(
                                                            "message.Messages.Forward"
                                                        )
                                                    }}
                                                </span>
                                            </el-dropdown-item>
                                        </div>
                                        <div
                                            @click="
                                                deleteMessageSentDialog(
                                                    item.msgItemVO.subjectId
                                                )
                                            "
                                        >
                                            <el-dropdown-item>
                                                <span
                                                    class="iconfont icon-delete"
                                                >
                                                    <span
                                                        style="margin-left: 10px"
                                                        >{{
                                                            $t(
                                                                "message.Messages.Delete"
                                                            )
                                                        }}</span
                                                    >
                                                </span>
                                            </el-dropdown-item>
                                        </div>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div
                            class="message-list-box-bottom"
                            @click="gotoDetail(item.subjectId)"
                        >
                            <div>
                                <img
                                    class="message-img"
                                    :src="
                                        item.msgItemVO.sendAvatarFileId
                                            ? getAbsolutePath(
                                                  item.msgItemVO
                                                      .sendAvatarFileId,
                                                  40,
                                                  40
                                              )
                                            : '/../../../static/images/touxiang1.png'
                                    "
                                />
                                <div class="nameto">
                                    <span class="message-name">{{
                                        item.msgItemVO.sendUsername
                                    }}</span>
                                    <span
                                        style="margin-left: 5px;font-size: 15px"
                                        >{{ $t("message.Messages.to") }}</span
                                    >
                                    <div class="message-name-to-div">
                                        <span
                                            v-for="(items, reIndex) in item
                                                .msgItemVO.recList"
                                            :key="reIndex"
                                            class="message-name-to"
                                        >
                                            {{
                                                items.username
                                            }}&nbsp;&nbsp;</span
                                        >
                                    </div>
                                </div>
                                <span class="message-time-yesterday">
                                    {{
                                        item.msgItemVO.createTime
                                            | isYesterday(times)
                                    }}
                                </span>
                                <span class="message-time">{{
                                    item.msgItemVO.createTime | formatDate(s)
                                }}</span>
                                <p class="message-content">
                                    {{ transfHtml(item.msgItemVO.messageText) }}
                                </p>
                                <div class="another-message-box">
                                    <p
                                        v-if="item.msgTotal - 1 > 0"
                                        class="another-message"
                                    >
                                        ...<span> {{ item.msgTotal - 1 }} </span
                                        >{{ $t("message.Messages.more") }}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="nodatasent" class="no-list">
                        {{
                            $t(
                                "message.Messages.No_records_to_be_shown_for_your_query_range"
                            )
                        }}
                    </div>
                    <div v-if="nosearchsent" class="no-list">
                        {{
                            $t(
                                "message.Messages.No_matching_message_please_adjust_your_input"
                            )
                        }}
                    </div>
                </el-checkbox-group>
            </div>
            <div style="text-align: center;width: 100%">
                <span
                    v-if="hasMoreSentList"
                    style="cursor: pointer;font-size: 17px;"
                    @click="moreSentList()"
                    >{{ $t("message.Messages.Click_load_More") }} ...</span
                >
            </div>
            <div>
                <el-dialog
                    :title="$t('message.Messages.Delete_messages')"
                    :visible.sync="dialogVisibleSent"
                    width="30%"
                >
                    <span>{{
                        $t(
                            "message.Messages.Delete_the_selected_messages_really"
                        )
                    }}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibleSent = false">{{
                            $t("message.Messages.Cancel")
                        }}</el-button>
                        <el-button
                            type="primary"
                            @click="dialogVisibleSentConfirm"
                            >{{ $t("message.Messages.Confirm") }}</el-button
                        >
                    </span>
                </el-dialog>
                <el-dialog
                    :title="$t('message.Messages.Delete_messages')"
                    :visible.sync="dialogVisibleSentdange"
                    width="30%"
                >
                    <span>{{
                        $t(
                            "message.Messages.Delete_the_selected_messages_really"
                        )
                    }}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibleSentdange = false">{{
                            $t("message.Messages.Cancel")
                        }}</el-button>
                        <el-button
                            type="primary"
                            @click="dialogVisibleSentConfirmDange"
                            >{{ $t("message.Messages.Confirm") }}</el-button
                        >
                    </span>
                </el-dialog>
            </div>
        </div>
        <!--********************关于发件箱的end**********************************-->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate, isYesterday } from "@/utils/date";
import defaultHead from "../../../static/images/touxiang1.png";

export default {
    name: "MessageList",
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        isYesterday(times) {
            return isYesterday(times);
        }
    },
    data() {
        return {
            courseId: this.$route.query.courseId,
            activeName: this.$route.query.activeName,
            checkList: [],
            dialogVisible: false,
            dialogVisibleDelete: false,
            dialogVisibleDeleteInbox: false,
            messageType: "",
            inboxListName: [],
            s: "",
            defaultHead,
            toggles: true,
            statusStar: "",
            isRead: true,
            statusRead: "",
            subjectIdInbox: [],
            searchKey: "",
            inboxListNameStarts: [],
            sentboxListName: [],
            checkListSent: [],
            sentSearchKey: "",
            dialogVisibleSent: false,
            dialogVisibleSentdange: false,
            sentSubjectId: "",
            course: "",
            paths: "",
            value: 0,
            pageSize: 20,
            inboxPageIndex: 1,
            sentPageIndex: 1,
            hasMoreInboxList: false,
            hasMoreSentList: false,
            loading: false,
            roleType: "",
            times: "",
            nosearch: false,
            inboxListNameNew: [],
            nodata: false,
            sentboxListNameNew: [],
            nodatasent: false,
            nosearchsent: false,
            searchInputInbox: "",
            searchInputSent: "",
            discussion_select: "discussion_select"
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    watch: {
        $route: {
            handler(newName) {
                this.messageType = Number(newName.query.messagetype);
                this.inboxPageIndex = 1;
                this.inboxListName = [];
                this.sentPageIndex = 1;
                this.sentboxListName = [];
                this.checkList = [];
                this.searchKey = "";
                this.sentSearchKey = "";
                // this.moreInboxList();
                this.moreSentList();
                this.inboxListSearch();
            },
            deep: true,
            immediate: true
        },
        inboxListName: {
            handler(newName) {
                if (newName.length === 0) {
                    this.nodata = true;
                    if (this.searchInputInbox) {
                        this.nodata = false;
                        this.nosearch = true;
                    } else {
                        this.nosearch = false;
                    }
                } else {
                    this.nodata = false;
                    this.nosearch = false;
                }
            },
            deep: true,
            immediate: true
        },
        courseId: {
            handler(newName, oldName) {
                console.log(newName, oldName);
            }
        },
        sentboxListName: {
            handler(newName) {
                if (newName.length === 0) {
                    this.nodatasent = true;
                    if (this.searchInputSent) {
                        this.nodatasent = false;
                        this.nosearchsent = true;
                    } else {
                        this.nosearchsent = false;
                    }
                } else {
                    this.nodatasent = false;
                    this.nosearchsent = false;
                }
                // 控制搜索是没有匹配项的提示语
                // if((this.courseId>0 || this.courseId != '') && newName.length == 0){
                //   this.nodatasent = false
                //   this.nosearchsent = true
                // }
                // else {
                //   this.nodatasent = false
                //   this.nosearchsent = false
                // }
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.getCourseData();
        this.routerpath();
    },
    methods: {
        // 去除p标签
        /*eslint-disable*/
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            // return false;
        },
        /*eslint-disable no-new*/
        // 日期的函数
        routerpath() {
            this.roleType = this.userInfoData.type;
            console.log(this.roleType);
        },
        async getCourseData() {
            const result = await this.$getData(
                "/course/owner/query",
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.course = result.data.entity;
                this.course.unshift({
                    name: this.$t("message.Messages.All_course"),
                    id: 0,
                    type: 1
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        selectCourse(val) {
            this.courseId = val;
            this.inboxPageIndex = 1;
            this.inboxListName = [];
            this.moreInboxList();
            this.sentPageIndex = 1;
            this.sentboxListName = [];
            this.moreSentList();
        },
        //* ***********************关于收件箱的start*****************************
        deleteMessageAll() {
            if (this.checkList.length === 0) {
                this.$message({
                    message: this.$t(
                        "message.Messages.Please_select_a_message"
                    ),
                    type: "warning"
                });
            } else {
                this.dialogVisibleDelete = true;
            }
        },
        // 收件箱的搜索
        inboxListSearch(val) {
            this.searchInputInbox = val;
            this.inboxPageIndex = 1;
            this.inboxListName = [];
            this.moreInboxList();
        },
        // 全部收藏
        async collectAll() {
            if (this.checkList.length === 0) {
                this.$message({
                    message: this.$t(
                        "message.Messages.Please_select_a_message"
                    ),
                    type: "warning"
                });
            } else {
                this.toggles = !this.toggles;
                if (this.toggles) {
                    this.statusStar = 1;
                } else {
                    this.statusStar = 0;
                }
                const params = {
                    subjectIds: this.checkList,
                    status: this.statusStar
                };
                const result = await this.$getData(
                    "/messageStar/add",
                    params,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.checkList = [];
                    this.inboxPageIndex = 1;
                    this.inboxListName = [];
                    this.moreInboxList();
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        // 全部已读未读
        async isReadAll() {
            console.log(this.checkList);
            if (this.checkList.length === 0) {
                this.$message({
                    message: this.$t(
                        "message.Messages.Please_select_a_message"
                    ),
                    type: "warning"
                });
            } else {
                const data = new Map();
                const messageIds = [];
                this.inboxListName.forEach(item => {
                    data.set(item.subjectId, item.msgItemVO.messageId);
                });
                this.checkList.forEach(item => {
                    messageIds.push(data.get(item));
                });
                this.isRead = !this.isRead;
                if (this.isRead) {
                    this.statusRead = 0;
                } else {
                    this.statusRead = 1;
                }
                const params = {
                    messageIds,
                    status: this.statusRead
                };
                const result = await this.$getData(
                    "/messageRec/modify",
                    params,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.checkList = [];
                    this.inboxPageIndex = 1;
                    this.inboxListName = [];
                    this.moreInboxList();
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        // 全部删除
        async deleteMessageAllCheck() {
            const result = await this.$getData(
                "/messageRec/deletes",
                this.checkList,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.checkList = [];
                this.inboxPageIndex = 1;
                this.inboxListName = [];
                this.moreInboxList();
                this.dialogVisibleDelete = false;
                this.$message({
                    message: this.$t("message.delete_success"),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        gotoDetail(subjectId, isStar) {
            if (Number(this.roleType) === 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageDetail",
                    query: {
                        subjectId,
                        messageType: this.messageType,
                        isStar,
                        activeName: this.activeName
                    }
                });
            } else {
                this.$router.push({
                    path: "/homePage/messageLeft/messageDetail",
                    query: {
                        subjectId,
                        messageType: this.messageType,
                        isStar,
                        activeName: this.activeName
                    }
                });
            }
        },
        // 点击加载更多
        async moreInboxList() {
            this.loading = true;
            let courseIds = this.courseId;
            if (courseIds === "") {
                courseIds = 0;
            }
            const params = {
                isStar: this.messageType,
                pageIndex: this.inboxPageIndex,
                pageSize: this.pageSize,
                courseId: courseIds,
                searchKey: this.searchKey
            };
            const result = await this.$getData(
                "/messageRec/pageList",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.loading = false;
                let totalCount = 0;
                if (result.data.entity.list !== []) {
                    totalCount =
                        (this.inboxPageIndex - 1) * this.pageSize +
                        result.data.entity.list.length;
                }
                if (totalCount < result.data.entity.total) {
                    this.hasMoreInboxList = true;
                    this.inboxPageIndex = this.inboxPageIndex + 1;
                } else {
                    this.hasMoreInboxList = false;
                }
                if (Number(this.inboxPageIndex) === 1) {
                    this.inboxListName = result.data.entity.list;
                } else {
                    this.arrayPush(this.inboxListName, result.data.entity.list);
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        arrayPush(tarArr, srcArr) {
            const tempTarArr = tarArr || [];
            const tempSrcArr = srcArr || [];
            for (let i = 0; i < tempSrcArr.length; i += 1) {
                tempTarArr.push(tempSrcArr[i]);
            }
            return tempTarArr;
        },
        // 我的收件箱列表请求
        async inboxList() {
            this.loading = true;
            let courseIds = this.courseId;
            if (courseIds === "") {
                courseIds = 0;
            }
            const params = {
                isStar: this.messageType,
                pageIndex: this.inboxPageIndex,
                pageSize: this.pageSize,
                courseId: courseIds,
                searchKey: this.searchKey
            };
            const result = await this.$getData(
                "/messageRec/pageList",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.loading = false;
                this.inboxListName = result.data.entity.list;
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 关于单个收藏的
        async collectItem(subjectId, status) {
            const params = {
                subjectIds: [subjectId],
                status
            };
            const result = await this.$getData(
                "/messageStar/add",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.inboxPageIndex = 1;
                this.inboxListName = [];
                this.moreInboxList();
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 关于单个回复的
        replyMessage(courseId, subjectId, messageId) {
            if (Number(this.roleType) === 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 0,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageType,
                        activeName: this.activeName
                    }
                });
            } else {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 0,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageType,
                        activeName: this.activeName
                    }
                });
            }
        },
        // 关于全部回复的
        replyMessageAll(courseId, subjectId, messageId) {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 1,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageType,
                        activeName: this.activeName
                    }
                });
            } else {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 1,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageType,
                        activeName: this.activeName
                    }
                });
            }
        },
        // 关于转发
        forwardAll(courseId, subjectId, messageId) {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 2,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageType,
                        activeName: this.activeName
                    }
                });
            } else {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 2,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageType,
                        activeName: this.activeName
                    }
                });
            }
        },
        // 关于单个删除的
        deleteMessageinboxDialog(subjectId) {
            this.dialogVisibleDeleteInbox = true;
            this.subjectIdInbox = subjectId;
        },
        async deleteMessageinbox() {
            const result = await this.$getData(
                "/messageRec/deletes",
                [this.subjectIdInbox],
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.checkList = [];
                this.inboxPageIndex = 1;
                this.inboxListName = [];
                this.moreInboxList();
                this.dialogVisibleDeleteInbox = false;
                this.$message({
                    message: this.$t("message.delete_success"),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 单个标记为已读未读
        async isReadToggle(messageId, status) {
            const params = {
                messageIds: [messageId],
                status
            };
            const result = await this.$getData(
                "/messageRec/modify",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.inboxPageIndex = 1;
                this.inboxListName = [];
                this.moreInboxList();
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 默认头像
        getAbsolutePath(relativePath, width, height) {
            if (typeof relativePath === "undefined") return defaultHead;
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        //* ***********************关于收件箱的end*****************************
        //* ***********************关于发件箱的start*****************************
        // 发件箱的加载更多
        async moreSentList() {
            this.loading = true;
            let courseIds = this.courseId;
            if (courseIds === "") {
                courseIds = 0;
            }
            const params = {
                pageIndex: this.sentPageIndex,
                pageSize: this.pageSize,
                courseId: courseIds,
                searchKey: this.sentSearchKey
            };
            const result = await this.$getData(
                "/messageSent/pageList",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.loading = false;
                let totalCount = 0;
                if (result.data.entity.list !== []) {
                    totalCount =
                        (this.sentPageIndex - 1) * this.pageSize +
                        result.data.entity.list.length;
                }
                if (totalCount < result.data.entity.total) {
                    this.hasMoreSentList = true;
                    this.sentPageIndex = this.sentPageIndex + 1;
                } else {
                    this.hasMoreSentList = false;
                }
                if (Number(this.sentPageIndex) === 1) {
                    this.sentboxListName = result.data.entity.list;
                } else {
                    this.arrayPush(
                        this.sentboxListName,
                        result.data.entity.list
                    );
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async sentBoxList() {
            this.loading = true;
            let courseIds = this.courseId;
            if (courseIds === "") {
                courseIds = 0;
            }
            const params = {
                pageIndex: this.sentPageIndex,
                pageSize: this.pageSize,
                courseId: courseIds,
                searchKey: this.sentSearchKey
            };
            const result = await this.$getData(
                "/messageSent/pageList",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.loading = false;
                this.sentboxListName = result.data.entity.list;
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 收件箱的搜索
        sentBoxSearch(val) {
            this.searchInputSent = val;
            this.sentPageIndex = 1;
            this.sentboxListName = [];
            this.moreSentList();
        },
        // 关于全部删除的
        deleteMessageSetDialog() {
            if (this.checkListSent.length === 0) {
                this.$message({
                    message: this.$t(
                        "message.Messages.Please_select_a_message"
                    ),
                    type: "warning"
                });
            } else {
                this.dialogVisibleSent = true;
            }
        },
        async dialogVisibleSentConfirm() {
            const result = await this.$getData(
                "/messageSent/deletes",
                this.checkListSent,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.checkListSent = [];
                this.checkListSent = [];
                this.sentPageIndex = 1;
                this.sentboxListName = [];
                this.dialogVisibleSent = false;
                this.$message({
                    message: this.$t("message.delete_success"),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 关于单个删除的
        deleteMessageSentDialog(sentSubjectId) {
            this.sentSubjectId = sentSubjectId;
            this.dialogVisibleSentdange = true;
        },
        async dialogVisibleSentConfirmDange() {
            const result = await this.$getData(
                "/messageSent/deletes",
                [this.sentSubjectId],
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.checkListSent = [];
                this.sentPageIndex = 1;
                this.sentboxListName = [];
                this.moreSentList();
                this.dialogVisibleSentdange = false;
                this.$message({
                    message: this.$t("message.delete_success"),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        }
        //* ***********************关于发件箱的end*****************************
    }
};
</script>

<style scoped lang="less">
.message-list {
    .select-course {
        float: left;
    }
    .search-input {
        width: 22%;
        float: right;
        margin-left: 10px;
    }
    .icon-huifu {
        font-size: 12px;
    }
    .icon-ReplyAll {
        font-size: 10px;
    }
    .message-list-inbox {
        .handle-box {
            border-bottom: 1px solid #aaaaaa;
            padding-bottom: 5%;
        }
        .list-box:hover {
            background: #f4f5fa;
        }
        .message-list-box {
            margin-top: 2%;
            .course-name {
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: #333;
                margin-left: 1%;
                cursor: pointer;
                position: relative;
                top: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 25%;
                display: inline-block;
            }
        }

        .message-list-box-top {
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 0.5%;
            .subjectName {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 52%;
                position: relative;
                top: 13px;
            }
        }
        .read-unread {
            position: relative;
            top: 5px;
            right: 13px;
            cursor: pointer;
        }

        .icon-weishoucang {
            color: #606266;
            font-size: 20px;
            position: relative;
            right: 20px;
            top: 2px;
            cursor: pointer;
        }

        .icon-shoucang {
            color: yellow;
            font-size: 20px;
            position: relative;
            right: 20px;
            top: 2px;
            cursor: pointer;
        }
        .icon-yidu {
            color: #9fafe0;
            margin-right: 10px;
            cursor: pointer;
        }
        .icon-weidu {
            margin-right: 10px;
            cursor: pointer;
        }

        .icon-huifu {
            font-size: 12px;
            color: #606266;
        }

        .caozuo {
            width: 60px;
            height: 30px;
            border: 1px solid lightgray;
            display: inline-block;
            line-height: 30px;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 8px;
        }

        .icon-spread-big {
            font-size: 30px;
            position: relative;
            top: 5px;
            left: 10px;
            cursor: pointer;
        }

        .message-list-box-bottom {
            padding-bottom: 8%;
            cursor: pointer;
            .icon-yidu {
                color: #9fafe0;
                float: left;
                margin-top: 10px;
                cursor: pointer;
            }
            .icon-weidu {
                float: left;
                margin-top: 10px;
                cursor: pointer;
            }

            .message-img {
                float: left;
                margin-left: 10px;
                margin-top: 10px;
                width: 40px;
                height: 40px;
                border-radius: 4px;
            }
            .nameto {
                float: left;
                margin-top: 10px;
                width: 70%;
            }
            .message-name {
                font-size: 16px;
                font-family: Arial-BoldMT;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                margin-left: 10px;
                margin-top: 10px;
            }
            .message-name-to-div {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 15px;
                position: relative;
                top: 5px;
                width: 50%;
            }
            .message-name-to {
                font-size: 14px;
                font-family: Arial-BoldMT;
                color: rgba(51, 51, 51, 1);
                margin-left: 3px;
            }
            .message-time {
                float: right;
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-top: 10px;
            }
            .message-time-yesterday {
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                position: relative;
                top: 10px;
            }
            .message-content {
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                top: 1%;
                left: 10px;
                cursor: pointer;
                font-size: 15px;
            }
            .another-message-box {
                text-align: center;
            }
            .another-message {
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                float: right;
                margin-right: 50%;
                margin-top: 20px;
            }
        }
        .no-list {
            font-size: 20px;
            text-align: center;
            height: 30px;
        }
    }
}
</style>
