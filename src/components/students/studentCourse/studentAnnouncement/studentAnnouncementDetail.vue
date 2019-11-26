<template>
    <!--eslint-disable-->
    <div v-show="annnouncementStepFour" class="annnouncementStepFour">
        <el-row>
            <el-col :span="18" style="">
                <div class="question">
                    <div style="border-bottom: 1px solid #ccc">
                        <div class="description">
                            <el-row>
                                <el-col :span="12">
                                    <div>
                                        <img
                                            v-if="announceVO.author"
                                            :src="
                                                announceVO.author.avatarUrl
                                                    ? getAbsolutePath(
                                                          announceVO.author
                                                              .avatarUrl,
                                                          40,
                                                          40
                                                      )
                                                    : defaultHead
                                            "
                                        />
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="
                                                announceVO.author.nickname
                                            "
                                        >
                                            <span
                                                class="name authorNames"
                                                v-if="announceVO.author"
                                                >{{
                                                    announceVO.author.nickname
                                                }}</span
                                            ></el-tooltip
                                        ><br />
                                        <span class="time">
                                            <span>{{
                                                formatDate(
                                                    announceVO.createTime
                                                )
                                            }}</span>
                                            <!--<a v-if="announceVO.userCount">{{$t('message.ANNOUNCE.ALL_SECTIONS')}} </a>-->
                                            <div
                                                style="color: #0e38b1;text-decoration: underline;display: inline-block"
                                                v-if="announceVO.userCount"
                                            >
                                                <el-popover
                                                    trigger="hover"
                                                    placement="top"
                                                    v-if="
                                                        announceVO.userCount !=
                                                            0
                                                    "
                                                >
                                                    <div>
                                                        <span
                                                            >{{
                                                                announceVO.userCount
                                                            }}&nbsp;
                                                            <span
                                                                v-if="
                                                                    announceVO.userCount ==
                                                                        1
                                                                "
                                                                >{{
                                                                    $t(
                                                                        "message.user"
                                                                    )
                                                                }}</span
                                                            >
                                                            <span
                                                                v-else-if="
                                                                    announceVO.userCount >
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
                                                        style="text-decoration: underline;color: #0e38b1;font-size: 13px"
                                                        slot="reference"
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
                                            <!--<a v-else-if="announceVO.sectionList">{{announceVO.sectionList.length}} -->
                                            <!--{{$t('message.ANNOUNCE.SECTIONS')}}</a>-->
                                            <div
                                                v-else-if="
                                                    announceVO.sectionList
                                                "
                                                style="display: inline-block"
                                            >
                                                <el-popover
                                                    trigger="hover"
                                                    placement="top"
                                                    v-if="
                                                        announceVO.sectionList
                                                            .length != 0
                                                    "
                                                >
                                                    <div
                                                        v-for="(item,
                                                        key,
                                                        index) in announceVO.sectionList"
                                                    >
                                                        <span
                                                            >{{
                                                                item.sectionName
                                                            }}&nbsp;&nbsp;&nbsp;{{
                                                                item.userCount
                                                            }}
                                                            <span
                                                                v-if="
                                                                    item.userCount ==
                                                                        1
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
                                                        style="text-decoration: underline;color: #0e38b1;font-size: 13px;display: inline-block"
                                                        slot="reference"
                                                        class="name-wrapper"
                                                    >
                                                        {{
                                                            announceVO
                                                                .sectionList
                                                                .length
                                                        }}
                                                        <span
                                                            v-if="
                                                                announceVO
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
                                                                announceVO
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
                                        </span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="operation">
                                        <!--todo 样式-->
                                        <div
                                            class="read-unread"
                                            v-if="announceVO.readCountDTO"
                                        >
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="
                                                    String(
                                                        announceVO.readCountDTO
                                                            .replyNotReadTotal
                                                    ) + ' unread replies'
                                                "
                                                placement="top"
                                            >
                                                <div class="read">
                                                    {{
                                                        announceVO.readCountDTO
                                                            .replyNotReadTotal
                                                    }}
                                                </div>
                                            </el-tooltip>
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="
                                                    String(
                                                        announceVO.readCountDTO
                                                            .replyTotal
                                                    ) + ' replies'
                                                "
                                                placement="top"
                                            >
                                                <div class="unread">
                                                    {{
                                                        announceVO.readCountDTO
                                                            .replyTotal
                                                    }}
                                                </div>
                                            </el-tooltip>
                                        </div>
                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <i
                                                    style="float: right;margin-top: 4px;cursor: pointer"
                                                >
                                                    <img
                                                        src="../../../../../static/images/spread-big.png"
                                                    />
                                                </i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <div
                                                    @click="
                                                        markAllAsRead(
                                                            announceVO.id
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i>
                                                            <el-radio></el-radio>
                                                        </i>
                                                        {{
                                                            $t(
                                                                "message.ANNOUNCE.MARK_ALL_AS_READ"
                                                            )
                                                        }}
                                                    </el-dropdown-item>
                                                </div>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="detail">
                            <p style="white-space:normal;word-break:break-all">
                                {{ announceVO.topic }}
                            </p>
                            <span class="replyImg">
                                <span
                                    style="color: gray;white-space:normal;word-break:break-all"
                                    v-html="announceVO.content"
                                    @click="richTextClick($event)"
                                >
                                </span> </span
                            ><br />
                            <a
                                target="_Blank"
                                v-if="announceVO.attachmentFile"
                                :href="
                                    getAbsolutePath(
                                        announceVO.attachmentFile.fileUrl
                                    )
                                "
                                >{{ announceVO.attachmentFile.fileName }}</a
                            >
                        </div>
                    </div>
                    <div
                        style="margin-top: 10px;border-bottom: 1px solid #ccc;margin-bottom: 15px"
                    >
                        <el-row style="margin-bottom: 10px">
                            <el-col :span="19">
                                <div style="">
                                    <el-form
                                        ref="form"
                                        :model="form"
                                        style="display: inline-block"
                                    >
                                        <el-form-item
                                            label=""
                                            style="display: inline-block"
                                        >
                                            <el-input
                                                @input="
                                                    announceReplyListFnSearch
                                                "
                                                v-model="form.name"
                                                :placeholder="
                                                    $t(
                                                        'message.ANNOUNCE.SEARCH_TITLE_OR_AUTOR'
                                                    )
                                                "
                                                prefix-icon="el-icon-search"
                                                style="width: 105%"
                                            >
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item
                                            label=""
                                            style="display: inline-block;position: relative"
                                        >
                                            <el-button
                                                style="margin-left: 20px"
                                                @click="announceReplyListFn(0)"
                                            >
                                                {{
                                                    $t(
                                                        "message.ANNOUNCE.Unread"
                                                    )
                                                }}</el-button
                                            >
                                            <el-button
                                                @click="announceReplyListFn(2)"
                                                >{{
                                                    $t("message.ANNOUNCE.ALL")
                                                }}</el-button
                                            >
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                content="Collapse replies"
                                            >
                                                <el-button
                                                    size="medium"
                                                    @click="msgFold(1)"
                                                    style="position: absolute;top:0px;left:185px;"
                                                    ><i
                                                        ><img
                                                            src="../../../../../static/images/up.png"
                                                    /></i>
                                                </el-button>
                                            </el-tooltip>
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                content="Expand replies"
                                            >
                                                <el-button
                                                    size="medium"
                                                    @click="msgFold(0)"
                                                    style="position: absolute;top:0px;left:255px;"
                                                    ><img
                                                        src="../../../../../static/images/down.png"
                                                /></el-button>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div
                        style="position: relative"
                        class="reply-input"
                        v-if="announceVO.allowComment"
                    >
                        <img
                            src="../../../../../static/images/reply.png"
                            style="position: absolute;z-index: 1;top: 10px;left: 7px;"
                        />
                        <el-button
                            style="width:100%"
                            prefix-icon="el-icon-search"
                            @click="editShow"
                        >
                            <span style="margin-right: 93%;color: gray;">{{
                                $t("message.ANNOUNCE.REPLY")
                            }}</span>
                        </el-button>
                    </div>
                    <div v-show="edit" v-if="announceVO.allowComment">
                        <el-row style="margin-top: 10px">
                            <el-col :span="24">
                                <div class="editor">
                                    <ckeditor
                                        :editor="editor"
                                        v-model="content"
                                        v-html="contentReplyDetail"
                                        :config="editorConfig"
                                    ></ckeditor>
                                </div>
                            </el-col>
                        </el-row>
                        <div>
                            <el-button
                                style="margin-top: 10px"
                                size="small"
                                @click="contentReplyDetailCancel"
                                >{{ $t("message.Cancel") }}</el-button
                            >
                            <el-button
                                style="margin-top: 10px"
                                v-if="announceReplyId"
                                size="small"
                                type="confirm"
                                @click="contentReplyDetailEdit()"
                                >{{ $t("message.Edit_Save") }}</el-button
                            >
                            <el-button
                                style="margin-top: 10px"
                                v-else
                                size="small"
                                type="confirm"
                                @click="contentReplyDetailConfirm()"
                                >{{ $t("message.Save") }}</el-button
                            >
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="reply" style="" v-loading="isload">
            <div>
                <el-collapse v-model="activeList">
                    <div
                        class="reply-item"
                        v-for="(item, index) in announceReplyList"
                        :key="item.id"
                    >
                        <el-collapse-item
                            title=""
                            style="position: relative;"
                            :name="index"
                        >
                            <template slot="title">
                                <div class="reply-title" @click="test">
                                    <div
                                        v-if="item.isRead"
                                        @click="isReadSwitch(item.id)"
                                        class="commentReaded"
                                    ></div>
                                    <div
                                        v-if="!item.isRead"
                                        @click="isReadSwitch(item.id)"
                                        class="commentUnRead"
                                    ></div>
                                    <!--<el-radio @change="isReadSwitch(item.id)" v-model="item.isRead" class="radio" style="position: absolute;left: -50px;"></el-radio>-->
                                    <div style="position: relative">
                                        <img
                                            :src="
                                                item.userAvatarUrl
                                                    ? getAbsolutePath(
                                                          item.userAvatarUrl,
                                                          40,
                                                          40
                                                      )
                                                    : '../../../../static/images/touxiang1.png'
                                            "
                                            style="float: left"
                                        />
                                        <span>
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="item.userNickname"
                                                ><span
                                                    class="name authorNames"
                                                    >{{
                                                        item.userNickname
                                                    }}</span
                                                ></el-tooltip
                                            >
                                            <span
                                                class="name"
                                                style="margin-left: 3px;margin-right: 3px"
                                                >:</span
                                            >
                                            <span class="replyImg">
                                                <span
                                                    style="color: gray;display: inline-block;word-wrap:break-word;
                          word-break:break-all"
                                                    v-html="item.content"
                                                    @click="
                                                        richTextClick($event)
                                                    "
                                                >
                                                </span> </span
                                        ></span>
                                        <div class="time">
                                            <span>{{
                                                formatDate(item.createTime)
                                            }}</span>
                                        </div>
                                        <div
                                            class="caozuo"
                                            v-if="
                                                announceVO.allowComment &&
                                                    userInfoData.id ==
                                                        item.createUserId
                                            "
                                        >
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="margin-left: 5px;cursor: pointer"
                                                    >
                                                        <img
                                                            src="../../../../../static/images/spread.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <!--<div @click="editFirstReplyEvent(item)">-->
                                                    <!--<el-dropdown-item>-->
                                                    <!--<i><img src="../../../../../static/images/edit.png"></i>-->
                                                    <!--{{$t('message.Edit')}}-->
                                                    <!--</el-dropdown-item>-->
                                                    <!--</div>-->
                                                    <div
                                                        @click="
                                                            deleteReply(item.id)
                                                        "
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../../static/images/delete.png"
                                                            /></i>
                                                            {{
                                                                $t(
                                                                    "message.Delete"
                                                                )
                                                            }}
                                                        </el-dropdown-item>
                                                    </div>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                    <div
                                        style="position: relative;margin-top: 20px"
                                        class="reply-input"
                                        v-if="announceVO.allowComment"
                                    >
                                        <img
                                            src="../../../../../static/images/reply.png"
                                            style="position: absolute;z-index: 1;top: 39%;left: 3px;"
                                        />
                                        <el-button
                                            style="width:100%;margin-top: 10px"
                                            prefix-icon="el-icon-search"
                                            @click="editChildren(item)"
                                        >
                                            <span
                                                style="margin-right: 93%;color: gray;"
                                                >{{
                                                    $t("message.ANNOUNCE.REPLY")
                                                }}</span
                                            >
                                        </el-button>
                                    </div>
                                    <div
                                        v-show="item.show"
                                        v-if="announceVO.allowComment"
                                        style="margin-top: 10px"
                                    >
                                        <el-row style="margin-top: 10px">
                                            <el-col :span="24">
                                                <div class="editor">
                                                    <ckeditor
                                                        :editor="editor"
                                                        v-model="
                                                            a
                                                                .chlidrenReplyContent[
                                                                index
                                                            ]
                                                        "
                                                        :config="editorConfig"
                                                    ></ckeditor>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <div>
                                            <el-button
                                                style="margin-top: 10px"
                                                size="small"
                                                @click="
                                                    contentReplyDetailCancelChildren(
                                                        item
                                                    )
                                                "
                                                >{{
                                                    $t("message.Cancel")
                                                }}</el-button
                                            >
                                            <el-button
                                                style="margin-top: 10px"
                                                v-if="announceReplyId"
                                                size="small"
                                                type="confirm"
                                                @click="
                                                    contentReplyDetailEdit()
                                                "
                                                >{{
                                                    $t("message.Edit_Save")
                                                }}</el-button
                                            >
                                            <el-button
                                                style="margin-top: 10px"
                                                v-else
                                                size="small"
                                                type="confirm"
                                                @click="
                                                    contentReplyDetailConfirmChildren(
                                                        item.id,
                                                        item,
                                                        index
                                                    )
                                                "
                                                >{{
                                                    $t("message.Save")
                                                }}</el-button
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template slot="" @click="test">
                                <div
                                    class="mainreply"
                                    v-for="second in item.replies"
                                >
                                    <div
                                        v-if="second.isRead"
                                        @click="isReadSwitch(second.id)"
                                        class="commentReaded"
                                    ></div>
                                    <div
                                        v-if="!second.isRead"
                                        @click="isReadSwitch(second.id)"
                                        class="commentUnRead"
                                    ></div>
                                    <!--<el-radio class="radio" v-model="second.isRead" style="position: absolute;left: -50px;"></el-radio>-->
                                    <div style="position: relative">
                                        <div>
                                            <img
                                                :src="
                                                    second.userAvatarUrl
                                                        ? getAbsolutePath(
                                                              second.userAvatarUrl,
                                                              40,
                                                              40
                                                          )
                                                        : '../../../../static/images/touxiang1.png'
                                                "
                                                style="float: left"
                                            />
                                            <span>
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="
                                                        second.userNickname
                                                    "
                                                >
                                                    <span
                                                        class="name authorNames"
                                                        >{{
                                                            second.userNickname
                                                        }}</span
                                                    ></el-tooltip
                                                >
                                                <span
                                                    class="name"
                                                    style="margin-left: 3px;margin-right: 3px"
                                                    >:</span
                                                >
                                                <!--<span class="namereply">Reply</span>&nbsp;&nbsp;-->
                                                <span class="replyImg">
                                                    <span
                                                        style="color: gray;display: inline-block;word-wrap:break-word;
                          word-break:break-all"
                                                        v-html="second.content"
                                                        @click="
                                                            richTextClick(
                                                                $event
                                                            )
                                                        "
                                                    >
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                        <div class="time">
                                            <span>{{
                                                formatDate(second.createTime)
                                            }}</span>
                                        </div>
                                        <div
                                            class="caozuo"
                                            v-if="
                                                announceVO.allowComment &&
                                                    userInfoData.id ==
                                                        second.createUserId
                                            "
                                        >
                                            <!--<img src="../../../../../static/images/liulan.png" class="liulan">-->
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="margin-left: 5px;cursor: pointer"
                                                    >
                                                        <img
                                                            src="../../../../../static/images/spread.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <div
                                                        @click="
                                                            deleteReply(
                                                                second.id
                                                            )
                                                        "
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../../static/images/delete.png"
                                                            /></i>
                                                            {{
                                                                $t(
                                                                    "message.Delete"
                                                                )
                                                            }}
                                                        </el-dropdown-item>
                                                    </div>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-collapse-item>
                    </div>
                </el-collapse>
                <div v-if="noSearch">
                    {{ $t("message.Your_search_did_not_match_any_entries") }} !
                    !
                </div>
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import defaultHead from "../../../../../static/images/touxiang1.png";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";
import { mapGetters } from "vuex";
export default {
    name: "studentAnnouncementDetail",
    data() {
        return {
            noSearch: false,
            inputSearch: "",
            a: { chlidrenReplyContent: [] },
            isload: false,
            edit: false,
            editShowChildren: false,
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: process.env.NODE_ENV + "/ckupload"
                }
            },
            contentReplyDetail: "",
            defaultHead: defaultHead,
            courseId: this.$route.query.courseId,
            announceId: this.$route.query.announceId,
            studyGroupId: null,
            announceReplyId: null,
            content: "",
            fileId: null,
            attachmentFileId: null,
            annnouncementStepOne: true,
            annnouncementStepTwo: false,
            annnouncementStepThree: false,
            annnouncementStepFour: true,
            activeName: "first",
            form: {
                name: "",
                region: "",
                isRead: 2
            },
            ruleform: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            announceVO: {},
            announceReplyList: "",
            activeList: []
        };
    },
    mounted() {
        this.announceDetail();
        this.announceReplyListFn();
    },
    computed: {
        ...mapGetters(["userInfoData", "instituteList"])
    },
    watch: {
        announceReplyList: {
            handler(newName, oldName) {
                if (Number(newName.length) === 0 && this.inputSearch) {
                    this.noSearch = true;
                } else {
                    this.noSearch = false;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        announceReplyListFnSearch(val) {
            this.inputSearch = val;
            this.announceReplyListFn();
        },
        test(event) {
            event.stopPropagation();
            console.log("阻止事件冒泡在");
        },
        editShow() {
            this.edit = true;
        },
        msgFold(key) {
            console.log(1111);
            if (!key) {
                for (let i = 0; i < this.announceReplyList.length; i++) {
                    this.activeList.push(i);
                }
            } else {
                this.activeList = [];
            }
        },
        formatDate(time) {
            return formatDate(new Date(time), "yyyy-MM-dd hh:mm:ss");
        },
        getAbsolutePath(relativePath, width, height) {
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            } else {
                return (
                    this.GlobalUrl +
                    relativePath +
                    "?s=thumb&a=" +
                    width +
                    "x" +
                    height
                );
            }
        },
        //评论回复已读未读变更
        isReadSwitch(replyId) {
            var paramsJson = {
                originType: 4,
                originId: replyId
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/contentViewRecord/modify`,
                    paramsJson
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceDetail();
                        this.announceReplyListFn();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //评论onclick事件
        editFirstReplyEvent(reply) {
            this.content = reply.content;
            this.announceReplyId = reply.id;
            this.attachmentFileId = reply.attachmentFileId;
        },
        //评论删除
        deleteReply(replyId) {
            var params = [replyId];
            this.$http
                .post(`${process.env.NODE_ENV}/announceReply/deletes`, params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceDetail();
                        this.announceReplyListFn();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //公告回复列表
        async announceReplyListFn(isRead) {
            var isReaded = this.form.isRead;
            if (isRead != undefined) {
                isReaded = isRead;
            }
            var params = {
                announceId: this.announceId,
                studyGroupId: this.studyGroupId,
                isRead: isReaded,
                content: this.form.name
            };
            let result = await this.$getData(
                "/announceReply/list",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.announceReplyList = result.data.entity;
                this.announceReplyList.forEach(announceReplyLists => {
                    // announceReplyLists.type=true;
                    // announceReplyLists.time=true;
                    this.$set(announceReplyLists, "show", false);
                });
            } else {
                this.$message.error(result.data.message);
            }
        },
        //公告回复全部标记为已读
        markAllAsRead(announceId) {
            var params = {
                originId: announceId,
                studyGroupId: null,
                originType: 4
            };
            this.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/add`, params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceReplyListFn();
                        this.announceDetail();
                        console.log(res);
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //公告详情
        async announceDetail() {
            var params = {
                data: this.announceId
            };
            let result = await this.$getData("/announce/get", params, "get");
            if (result.data.code == 200) {
                this.announceVO = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        contentReplyDetailCancel() {
            this.edit = false;
        },
        contentReplyDetailCancelChildren(item) {
            this.$set(item, "show", false);
        },
        editChildren(item) {
            item.show = !item.show;
        },
        contentReplyDetailConfirmChildren(replyId, item, index) {
            var ss = this.a.chlidrenReplyContent.toString();
            var str = ss.replace(/,/g, "");
            var paramsJson = {
                announceId: this.announceId,
                studyGroupId: this.studyGroupId,
                announceReplyId: this.announceReplyId,
                content: str,
                fileId: this.fileId
            };
            if (replyId != undefined) {
                paramsJson.announceReplyId = replyId;
            }
            this.$http
                .post(`${process.env.NODE_ENV}/announceReply/add`, paramsJson)
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceReplyListFn();
                        this.announceDetail();
                        this.content = "";
                        this.announceReplyId = null;
                        this.attachmentFileId = null;
                        this.$message.success(
                            this.$t("message.Common_success")
                        );
                        this.editShowChildren = false;
                        this.$set(item, "show", false);
                        this.a.chlidrenReplyContent[index] = "";
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //公告评论添加
        contentReplyDetailConfirm(replyId) {
            var paramsJson = {
                announceId: this.announceId,
                studyGroupId: this.studyGroupId,
                announceReplyId: this.announceReplyId,
                content: this.content,
                fileId: this.fileId
            };
            if (replyId != undefined) {
                paramsJson.announceReplyId = replyId;
            }
            this.$http
                .post(`${process.env.NODE_ENV}/announceReply/add`, paramsJson)
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceReplyListFn();
                        this.announceDetail();
                        this.content = "";
                        this.announceReplyId = null;
                        this.attachmentFileId = null;
                        this.$message.success(
                            this.$t("message.Common_success")
                        );
                        this.edit = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //公告评论修改
        contentReplyDetailEdit() {
            var paramsJson = {
                id: this.announceReplyId,
                content: this.content,
                fileId: this.fileId,
                attachmentFileId: this.attachmentFileId
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/announceReply/modify`,
                    paramsJson
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceReplyListFn();
                        this.content = "";
                        this.announceReplyId = null;
                        this.attachmentFileId = null;
                        this.$message.success(
                            this.$t("message.Common_success")
                        );
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        gotolist() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        addAnnoucement() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        editorcancel() {
            // this.annnouncementStepOne = false;
            // this.annnouncementStepTwo = false;
            // this.annnouncementStepThree = false;
            // this.annnouncementStepFour = true;
        },
        reply() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = false;
            this.annnouncementStepFour = true;
        },
        onSubmit() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = true;
        },
        handleClick() {},
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
.commentReaded {
    position: absolute;
    left: -50px;
    width: 10px;
    height: 10px;
    border: 2px solid #0e38b1;
    border-radius: 10px;
    cursor: pointer;
}
.commentUnRead {
    position: absolute;
    left: -50px;
    width: 14px;
    height: 14px;
    background: #0e38b1;
    border-radius: 10px;
    cursor: pointer;
}
.annnouncementStepFour {
    .authorNames {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 150px;
        display: inline-block;
    }
    /deep/ .el-collapse-item__header {
        height: auto !important;
        cursor: auto;
    }
    /deep/ .el-collapse-item__arrow {
        cursor: pointer;
    }
    .reply /deep/ .el-collapse-item__wrap {
        border: none;
    }

    .reply /deep/ .el-collapse-item__header {
        border: none;
        line-height: 20px;
    }

    .reply /deep/ .el-collapse {
        border: none;
    }
    .reply /deep/ .el-icon-search:before {
        content: "";
    }

    .reply-input /deep/ .el-icon-search:before {
        content: "";
    }

    .discussionRightBar {
        height: 400px;
        margin-left: 50px;

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
    .el-collapse-item__wrap {
        border: none;
    }

    .question {
        width: 100%;
        border: 1px solid #ccc;
        padding: 2%;
    }

    .title {
        border: 1px solid #0e38b1;
        border-radius: 3px;
        background: #e6ebf7;
        padding: 1%;
    }

    .title span:nth-of-type(1) {
        color: #0e38b1;
    }

    .title span:nth-of-type(3) {
        float: right;
    }

    .description {
        margin-top: 20px;

        .name {
            margin-left: 10px;
            font-weight: bolder;
            font-size: 17px;
        }

        .time {
            margin-left: 10px;
            font-size: 13px;
            color: gray;

            a {
                text-decoration: underline;
                color: #0e38b1;
            }
        }
    }

    .description div:nth-of-type(1) img {
        float: left;
    }

    .operation {
        float: right;
        position: relative;

        .liulan {
            margin-right: 115px;
            margin-top: 7px;
        }

        .edit {
            position: absolute;
            right: 45px;
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
    .reply-title {
        width: 100%;
    }
    .reply-item {
        border: 1px solid #ccc;
        margin-bottom: 2%;
        border-radius: 1px;
        padding: 4% 5px;

        .name {
            font-weight: bolder;
            font-size: 16px;
            margin-left: 15px;
            float: left;
        }

        .time {
            position: absolute;
            top: 100%;
            left: 56px;
            color: gray;
            /*margin-top: 15px;*/
        }
        .caozuo {
            float: right;
            margin-right: 20px;
            /*margin-top: 10px;*/
        }

        .namereply {
            color: gray;
            font-size: 14px;
        }

        .mainreply {
            /*position: relative;*/
            margin-top: 5%;
            padding: 5% 3.4% 5% 5%;
            border-bottom: 1px solid #ccc;
            border-top: 1px solid #ccc;
        }
    }
    .replyImg {
        width: 68%;
        height: 100%;
        display: inline-block;
        /deep/ .image {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .reply {
        width: 73%;
        margin-top: 20px;
        margin-left: 5.5%;
    }
    .read-unread {
        display: inline-block;
        /*margin-right: 120px;*/
        position: relative;
        bottom: 10px;
        right: 10px;
    }

    .read {
        display: inline-block;
        background: #0e38b1;
        border: 2px solid #0e38b1;
        border-radius: 15px 1px 1px 15px;
        color: white;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 10px;
        float: left;
        /*margin-top: 10px;*/
    }

    .unread {
        display: inline-block;
        background: #e6ebf7;
        border: 2px solid #0e38b1;
        border-radius: 1px 15px 15px 1px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 11px;
    }
}
</style>
