<template>
    <!--eslint-disable-->
    <div v-show="annnouncementStepFour" class="annnouncementStepFour">
        <el-row>
            <el-col :span="21" style="">
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
                                        <el-button
                                            @click="
                                                editAnnounceEvent(announceVO.id)
                                            "
                                            icon="el-icon-edit"
                                            class="edit"
                                        >
                                            {{ $t("message.Edit") }}
                                        </el-button>
                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <i
                                                    style="float: right;margin-top: 4px;cursor: pointer"
                                                >
                                                    <span
                                                        class="iconfont icon-spread-big"
                                                        style="font-size: 30px"
                                                    ></span>
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
                                                        <i
                                                            style="margin-left: 3px"
                                                        >
                                                            <el-radio></el-radio>
                                                        </i>
                                                        <span
                                                            style="margin-left: -6px;font-size: 16px"
                                                            >{{
                                                                $t(
                                                                    "message.ANNOUNCE.MARK_ALL_AS_READ"
                                                                )
                                                            }}</span
                                                        >
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    v-if="
                                                        announceVO.allowComment ==
                                                            0
                                                    "
                                                    @click="
                                                        switchComment(
                                                            [announceVO.id],
                                                            1
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
                                                    v-else-if="
                                                        announceVO.allowComment ==
                                                            1
                                                    "
                                                    @click="
                                                        switchComment(
                                                            [announceVO.id],
                                                            0
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
                                                    @click="
                                                        deleteOpen(
                                                            announceVO.id
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
                                </span>
                            </span>
                            <br />
                            <a
                                target="_Blank"
                                v-if="announceVO.attachmentFile"
                                :href="
                                    getAbsolutePath(
                                        announceVO.attachmentFile.fileUrl
                                    )
                                "
                            >
                                {{ announceVO.attachmentFile.fileName }}</a
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
                                            >
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item
                                            label=""
                                            style="display: inline-block;position: relative"
                                        >
                                            <el-button
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
                                                    @click="msgFold(1)"
                                                    size="medium"
                                                    style="position: absolute;top:0px;left:162px;"
                                                    ><i
                                                        ><img
                                                            src="../../../../static/images/up.png"
                                                    /></i>
                                                </el-button>
                                            </el-tooltip>
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                content="Expand replies"
                                            >
                                                <el-button
                                                    @click="msgFold(0)"
                                                    size="medium"
                                                    style="position: absolute;top:0px;left:235px;"
                                                    ><img
                                                        src="../../../../static/images/down.png"
                                                /></el-button>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="position: relative" class="reply-input">
                        <img
                            src="../../../../static/images/reply.png"
                            style="position: absolute;z-index: 1;top: 9px;left: 10px;"
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
                    <div v-show="edit">
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
                                size="small"
                                style="margin-top: 10px"
                                @click="contentReplyCancel"
                                >{{ $t("message.Cancel") }}</el-button
                            >
                            <!--<el-button v-if="announceReplyId" size="small" type="confirm" @click="contentReplyDetailEdit()">{{$t('message.Edit_Save')}}-->
                            <!--</el-button>-->
                            <el-button
                                size="small"
                                style="margin-top: 10px"
                                type="confirm"
                                @click="contentReplyConfirm()"
                                >{{ $t("message.Save") }}
                            </el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="reply" style="">
            <div>
                <el-collapse
                    v-model="activeList"
                    v-for="(item, index) in announceReplyList"
                    :key="item.id"
                    @change="clickTitle(index)"
                >
                    <div class="reply-item">
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
                                            style="float: left;height: 35px;
      width: 40px;
      border-radius: 3px;"
                                        />
                                        <span>
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="item.userNickname"
                                            >
                                                <span
                                                    class="name authorNames"
                                                    >{{
                                                        item.userNickname
                                                    }}</span
                                                >
                                            </el-tooltip>
                                            <span
                                                class="name"
                                                style="margin-left: 3px;margin-right: 3px"
                                                >:</span
                                            >
                                            <span class="replyImg">
                                                <span
                                                    class="replyTitle"
                                                    style="color: gray;display: inline-block;
                      white-space:normal;word-break:break-all"
                                                    @click="
                                                        richTextClick($event)
                                                    "
                                                    v-html="item.content"
                                                ></span>
                                            </span>
                                        </span>
                                        <div class="time">
                                            <span>{{
                                                formatDate(item.createTime)
                                            }}</span>
                                        </div>
                                        <div class="caozuo">
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="margin-left: 5px;cursor: pointer"
                                                    >
                                                        <img
                                                            src="../../../../static/images/spread.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <div
                                                        @click="
                                                            deleteReply(item.id)
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
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                    <div
                                        style="padding-top: 3%;height: 15px;position: relative;width: 100%"
                                    >
                                        <img
                                            src="../../../../static/images/reply.png"
                                            style="position: absolute;z-index: 1;top: 87%;left: 55px;"
                                        />
                                        <el-button
                                            prefix-icon="el-icon-search"
                                            style="width: 90%;
    margin-left: 50px;"
                                            @click="editShowChildren(item)"
                                        >
                                            <span
                                                style="color: gray;margin-right: 93%"
                                                >{{
                                                    $t("message.ANNOUNCE.REPLY")
                                                }}</span
                                            >
                                        </el-button>
                                    </div>
                                    <div v-show="item.show">
                                        <el-row
                                            style="margin-top: 40px;margin-left: 50px"
                                        >
                                            <el-col :span="23">
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
                                                style="margin-top: 10px;margin-left: 50px;"
                                                size="small"
                                                @click="
                                                    contentReplyDetailCancel(
                                                        item
                                                    )
                                                "
                                                >{{
                                                    $t("message.Cancel")
                                                }}</el-button
                                            >
                                            <!--<el-button v-if="announceReplyId" size="small" type="confirm" @click="contentReplyDetailEdit">{{$t('message.Edit_Save')}}-->
                                            <!--</el-button>-->
                                            <el-button
                                                style="margin-top: 10px"
                                                size="small"
                                                type="confirm"
                                                @click="
                                                    contentReplyDetailConfirm(
                                                        item.id,
                                                        item,
                                                        index
                                                    )
                                                "
                                            >
                                                {{ $t("message.Save") }}
                                            </el-button>
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
                                                style="float: left;height: 35px;
      width: 40px;
      border-radius: 3px;"
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
                                                    >
                                                </el-tooltip>
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
                                        <div class="caozuo">
                                            <!--<img src="../../../../static/images/liulan.png" class="liulan">-->
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="margin-left: 5px;cursor: pointer"
                                                    >
                                                        <img
                                                            src="../../../../static/images/spread.png"
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
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>
                                                            {{
                                                                $t(
                                                                    "message.Deletes"
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

        <div>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="deleteDialogVisible"
                width="30%"
            >
                <span>{{
                    $t(
                        "message.ANNOUNCE.You_are_about_to_delete_this_announcement"
                    )
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="deleteAnnounce()">{{
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
import defaultHead from "../../../../static/images/touxiang1.png";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";

export default {
    name: "announcementdetail",
    data() {
        return {
            noSearch: false,
            inputSearch: "",
            a: { chlidrenReplyContent: [] },
            deleteDialogVisible: false,
            edit: false,
            editChildren: false,
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
            replyTitle: true,
            createTime: true,
            activeName: "first",
            activeList: [],
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
            announceReplyList: []
        };
    },
    mounted() {
        this.announceDetail();
        this.announceReplyListFn();
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
        contentReplyCancel() {
            this.edit = false;
        },
        contentReplyConfirm(replyId) {
            // var ss = this.a.chlidrenReplyContent.toString();
            // var str = ss.replace(/,/g, "");
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
                        this.edit = false;
                        this.announceReplyListFn();
                        this.announceDetail();
                        this.content = "";
                        this.announceReplyId = null;
                        this.attachmentFileId = null;
                        this.$message.success(
                            this.$t("message.Common_success")
                        );
                        this.editChildren = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        msgFold(key) {
            if (!key) {
                for (let i = 0; i < this.announceReplyList.length; i++) {
                    this.activeList.push(i);
                }
            } else {
                this.activeList = [];
            }
        },
        editShowChildren(item) {
            item.show = !item.show;
        },
        test(event) {
            event.stopPropagation();
            // console.log("阻止事件冒泡在");
        },
        editShow() {
            this.edit = true;
        },
        deleteOpen() {
            this.deleteDialogVisible = true;
        },
        formatDate(time) {
            return formatDate(new Date(time), "yyyy-MM-dd hh:mm:ss");
        },
        getAbsolutePath(relativePath, width, height) {
            if (relativePath == undefined) return defaultHead;
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
        //公告编辑跳转
        editAnnounceEvent() {
            var query = {
                courseId: this.courseId,
                announceId: this.announceId
            };
            this.$router.push({
                path: "/homePage/allCourse/announcementAdmit",
                query: query
            });
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
        //评论编辑 onclick事件
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
                        this.$message.success(
                            this.$t(
                                "message.ANNOUNCE.Announcement_deleted_successfully"
                            )
                        );
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
                    announceReplyLists.type = true;
                    announceReplyLists.time = true;
                    this.$set(announceReplyLists, "show", false);
                });
                console.log(this.announceReplyList);
            } else {
                this.$message.error(result.data.message);
            }
        },
        //公告删除
        deleteAnnounce() {
            var params = [this.announceId];
            this.$http
                .post(`${process.env.NODE_ENV}/announce/deletes`, params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$router.push({
                            path: "/homePage/allCourse/announcementCreate",
                            query: { courseId: this.courseId }
                        });
                        this.$message.success(
                            this.$t(
                                "message.ANNOUNCE.Announcement_deleted_successfully"
                            )
                        );
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
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
        //公告评论开关
        switchComment(ids, allowComment) {
            var params = {
                ids: ids,
                allowComment: allowComment
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/announce/statusToggle/edit`,
                    params
                )
                .then(res => {
                    if (res.data.code == 200) {
                        //this.announceDetail();
                        this.announceVO.allowComment = allowComment;
                        if (this.announceVO.allowComment == 0) {
                            this.$message.success(
                                this.$t(
                                    "message.ANNOUNCE.Comments_are_unavailable"
                                )
                            );
                        } else {
                            this.$message.success(
                                this.$t(
                                    "message.ANNOUNCE.Comments_are_available"
                                )
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
        contentReplyDetailCancel(item) {
            this.$set(item, "show", false);
        },
        //公告评论添加
        contentReplyDetailConfirm(replyId, item, index) {
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
            if (str != "") {
                this.$http
                    .post(
                        `${process.env.NODE_ENV}/announceReply/add`,
                        paramsJson
                    )
                    .then(res => {
                        if (res.data.code == 200) {
                            this.announceReplyListFn();
                            this.announceDetail();
                            // this.content = '';
                            this.announceReplyId = null;
                            this.attachmentFileId = null;
                            this.$message.success(
                                this.$t("message.Common_success")
                            );
                            this.$set(item, "show", false);
                            this.a.chlidrenReplyContent[index] = "";
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$message.error(this.$t("message.Content_cannot_be_empty"));
            }
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
                        this.editChildren = false;
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
        clickTitle(index) {
            // console.log(4444)
            // this.announceReplyList[index].type =! this.announceReplyList[index].type;
            // this.announceReplyList[index].time =! this.announceReplyList[index].time;        // announceReplyLists        this.createTime =! this.createTime;
            // // console.log(4444444)
        },
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
<style>
.replyTitle p {
    /*width: 680px;*/
    /*overflow:hidden;*/
    /*white-space:nowrap;*/
    /*text-overflow:ellipsis;*/
}
</style>

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
    /deep/ .ck-editor__main {
        height: 200px;
    }

    /deep/ .ck-editor__editable_inline {
        height: 180px;
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
    .read-unread {
        display: inline-block;
        /*margin-right: 120px;*/
        position: relative;
        right: 110px;
        bottom: 10px;
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
        /*height: 35px;*/
        /*width: 40px;*/
        border-radius: 3px;
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
            right: 40px;
            bottom: 3px;
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
                height: 35px;
                width: 40px;
                border-radius: 3px;
            }
        }
    }

    .reply-item {
        border: 1px solid #ccc;
        margin-bottom: 2%;
        border-radius: 1px;
        padding: 4% 5px;

        .name {
            font-weight: bolder;
            font-size: 16px;
            margin-left: 10px;
            float: left;
        }

        .time {
            position: absolute;
            top: 100%;
            color: gray;
            left: 50px;
        }

        .caozuo {
            float: right;
            margin-right: 20px;
        }

        .namereply {
            color: gray;
            font-size: 14px;
        }

        .mainreply {
            margin-top: 5%;
            padding: 5% 3.4% 5% 5%;
            border-bottom: 1px solid #ccc;
            border-top: 1px solid #ccc;

            .time {
                position: absolute;
                top: 100%;
                left: 50px;
                color: gray;
            }
        }
    }
    .replyImg {
        width: 69%;
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
        width: 85.5%;
        margin-top: 20px;
        margin-left: 5.5%;
    }
    .reply-title {
        width: 100%;
    }
}
</style>
