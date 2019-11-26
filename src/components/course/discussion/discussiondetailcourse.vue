<template>
    <!--eslint-disable-->
    <div class="studentDiscussions">
        <div>
            <div v-show="discussionStepFour" class="discussionStepFour">
                <el-row>
                    <el-col :span="19" style="">
                        <div class="question">
                            <div style="border-bottom: 1px solid #ccc">
                                <div v-show="grade == 1" class="title">
                                    <span
                                        >{{
                                            $t(
                                                "message.This_is_a_graded_discussion"
                                            )
                                        }}:</span
                                    >
                                    <span>{{ score }}</span>
                                    {{ $t("message.Points_Possible") }}
                                    <span v-if="maxDueTime">{{
                                        maxDueTime | formatDate(s)
                                    }}</span>
                                    <el-table
                                        :data="tableData"
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            :label="$t('message.Due')"
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    scope.row.limitTime
                                                        | formatDate(s)
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="$t('message.For')"
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    idToName(
                                                        scope.row,
                                                        sections,
                                                        users
                                                    )
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="
                                                $t('message.Available_from')
                                            "
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    scope.row.startTime
                                                        | formatDate(s)
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="$t('message.Until')"
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    scope.row.endTime
                                                        | formatDate(s)
                                                }}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="description">
                                    <el-row>
                                        <el-col :span="12">
                                            <div>
                                                <img
                                                    :src="
                                                        avatarUrl
                                                            ? getAbsolutePath(
                                                                  avatarUrl,
                                                                  40,
                                                                  40
                                                              )
                                                            : '../../../../static/images/touxiang1.png'
                                                    "
                                                />
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="nameDetail"
                                                >
                                                    <span
                                                        class="name authorNames"
                                                        >{{ nameDetail }}</span
                                                    > </el-tooltip
                                                ><br />
                                                <span class="time">
                                                    <span>{{
                                                        createTimeDetail
                                                            | formatDate(s)
                                                    }}</span>
                                                    <div
                                                        v-if="userCount"
                                                        style="color: #0e38b1;
                                                        text-decoration: underline;
                                                        display: inline-block"
                                                    >
                                                        <el-popover
                                                            v-if="
                                                                userCount != 0
                                                            "
                                                            trigger="hover"
                                                            placement="top"
                                                        >
                                                            <div>
                                                                <span
                                                                    >{{
                                                                        userCount
                                                                    }}&nbsp;
                                                                    <span
                                                                        v-if="
                                                                            userCount ==
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
                                                                            userCount >
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
                                                                style="text-decoration: underline;
                                                                color: #0e38b1;font-size: 13px"
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
                                                        v-else-if="sectionList"
                                                        style="display: inline-block"
                                                    >
                                                        <el-popover
                                                            v-if="
                                                                sectionList.length !=
                                                                    0
                                                            "
                                                            trigger="hover"
                                                            placement="top"
                                                        >
                                                            <div
                                                                v-for="(item,
                                                                oo) in sectionList"
                                                                :key="oo"
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
                                                                slot="reference"
                                                                style="text-decoration: underline;
                                                                color: #0e38b1;
                                                                font-size: 13px;
                                                                display: inline-block"
                                                                class="name-wrapper"
                                                            >
                                                                {{
                                                                    sectionList.length
                                                                }}
                                                                <span
                                                                    v-if="
                                                                        sectionList.length ==
                                                                            1
                                                                    "
                                                                    >{{
                                                                        $t(
                                                                            "message.People_section"
                                                                        )
                                                                    }}</span
                                                                >
                                                                <span
                                                                    v-else-if="
                                                                        sectionList.length >
                                                                            1
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
                                                <div
                                                    v-if="replyTotal != ''"
                                                    class="read-unread"
                                                >
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            replyNotReadTotal +
                                                                ' ' +
                                                                'unread' +
                                                                ' ' +
                                                                'replies'
                                                        "
                                                    >
                                                        <div class="read">
                                                            {{
                                                                replyNotReadTotal
                                                            }}
                                                        </div>
                                                    </el-tooltip>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            replyTotal +
                                                                ' ' +
                                                                'replies'
                                                        "
                                                    >
                                                        <div class="unread">
                                                            {{ replyTotal }}
                                                        </div>
                                                    </el-tooltip>
                                                </div>
                                                <div
                                                    v-if="status"
                                                    style="display: inline-block;"
                                                >
                                                    <el-button
                                                        type="success"
                                                        icon="el-icon-circle-check"
                                                        @click="
                                                            publishStatus(0)
                                                        "
                                                    >
                                                        {{
                                                            $t(
                                                                "message.Published"
                                                            )
                                                        }}
                                                    </el-button>
                                                </div>
                                                <div
                                                    v-if="!status"
                                                    style="display: inline-block;margin-left: 10px"
                                                >
                                                    <el-button
                                                        type="info"
                                                        @click="
                                                            publishStatus(1)
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-Group-"
                                                            style="font-size: 12px"
                                                        />&nbsp;
                                                        {{
                                                            $t(
                                                                "message.ASSIGNMENT.UnPublish"
                                                            )
                                                        }}
                                                    </el-button>
                                                </div>
                                                <el-button
                                                    icon="el-icon-edit"
                                                    style="margin-left: 10px"
                                                    class="edit"
                                                    @click="
                                                        discussionDetailEdit
                                                    "
                                                >
                                                    {{ $t("message.Edit") }}
                                                </el-button>
                                                <el-dropdown
                                                    style="margin-left: 10px"
                                                >
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="float: right;;cursor: pointer;position: relative;top: 11px;"
                                                        >
                                                            <span
                                                                class="iconfont icon-spread-big"
                                                                style="font-size: 33px"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <div @click="allRead">
                                                            <el-dropdown-item>
                                                                <i
                                                                    style="margin-left: 2px"
                                                                >
                                                                    <el-radio />
                                                                </i>
                                                                <span
                                                                    style="margin-left: -11px;font-size: 16px"
                                                                >
                                                                    {{
                                                                        $t(
                                                                            "message.ANNOUNCE.MARK_ALL_AS_READ"
                                                                        )
                                                                    }}</span
                                                                >
                                                            </el-dropdown-item>
                                                        </div>
                                                        <div
                                                            @click="
                                                                discussionReplyDeleteDetail
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
                                                            v-if="allowComment"
                                                            @click="
                                                                discussionReplyClose
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
                                                            v-if="!allowComment"
                                                            @click="
                                                                discussionReplyOpen
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
                                                            @click="
                                                                goCourseResource
                                                            "
                                                        >
                                                            <el-dropdown-item>
                                                                <i
                                                                    class="iconfont icon-fenxiang1"
                                                                    style="font-size: 20px"
                                                                />
                                                                <span
                                                                    class="iconzi"
                                                                    style="font-size: 16px"
                                                                >
                                                                    <span
                                                                        style="margin-left: -4px"
                                                                        >{{
                                                                            $t(
                                                                                "message.share_resource"
                                                                            )
                                                                        }}</span
                                                                    >
                                                                </span>
                                                            </el-dropdown-item>
                                                        </div>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="detail">
                                    <p
                                        style="white-space:normal;word-break:break-all"
                                    >
                                        {{ titleDetail }}
                                    </p>
                                    <span class="replyImg">
                                        <span
                                            style="color: gray;"
                                            @click="richTextClick($event)"
                                            v-html="contentDetail"
                                        />
                                    </span>
                                    <br />
                                    <div v-if="fileUrl">
                                        <a
                                            class="el-upload-list__item-name"
                                            :href="getAbsolutePath(fileUrl)"
                                            style="text-decoration: none;cursor: pointer;"
                                            target="_Blank"
                                        >
                                            <i class="el-icon-document" />
                                            {{ fileName }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div
                                style="margin-top: 10px;border-bottom: 1px solid #ccc;margin-bottom: 15px"
                            >
                                <el-row style="margin-bottom: -10px">
                                    <el-col :span="18">
                                        <div style="">
                                            <el-form
                                                ref="form"
                                                style="display: inline-block"
                                            >
                                                <div class="inputSearch">
                                                    <el-form-item
                                                        label=""
                                                        style="display: inline-block"
                                                    >
                                                        <el-input
                                                            v-model="anthorName"
                                                            placeholder="Search entries or author"
                                                            style="width: 105%"
                                                            @input="
                                                                detailShanxuan
                                                            "
                                                        />
                                                        <span
                                                            class="iconfont icon-sousuo"
                                                            style="color: lightgray;float: left;
    position: relative;
    top: -21px;
    left: 10px;
"
                                                        />
                                                    </el-form-item>
                                                </div>
                                                <el-form-item
                                                    label=""
                                                    style="display: inline-block;position: relative;left: 30px"
                                                >
                                                    <el-button
                                                        @click="detailUnread"
                                                    >
                                                        {{
                                                            $t("message.Unread")
                                                        }}
                                                    </el-button>

                                                    <el-button
                                                        style="margin-left: 20px"
                                                        @click="detailAll"
                                                    >
                                                        {{ $t("message.All") }}
                                                    </el-button>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        content="Collapse replies"
                                                    >
                                                        <el-button
                                                            size="medium"
                                                            style="position: absolute;top:0px;left:180px;margin-left: 20px"
                                                            @click="msgFold(1)"
                                                        >
                                                            <i>
                                                                <span
                                                                    class="iconfont icon-xiangshang"
                                                                    style="font-size: 17px;"
                                                                ></span>
                                                            </i>
                                                        </el-button>
                                                    </el-tooltip>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        content="Expand replies"
                                                    >
                                                        <el-button
                                                            size="medium"
                                                            style="position: absolute;top:0px;left:265px;margin-left: 20px"
                                                            @click="msgFold(0)"
                                                        >
                                                            <i>
                                                                <span
                                                                    class="iconfont icon-xiangxia"
                                                                    style="font-size: 17px;"
                                                                ></span>
                                                            </i>
                                                        </el-button>
                                                    </el-tooltip>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <div style="position: relative">
                                    <img
                                        src="../../../../static/images/reply.png"
                                        style="position: absolute;top: 21%;left: 10px;"
                                    />
                                    <el-button
                                        placeholder="Reply"
                                        prefix-icon="el-icon-search"
                                        style="width: 100%"
                                        @click="replyAdd"
                                    >
                                        <span
                                            style="color: gray;float: left;margin-left: 15px"
                                            >{{
                                                $t("message.ANNOUNCE.REPLY")
                                            }}</span
                                        >
                                    </el-button>
                                </div>
                                <div v-show="edit">
                                    <el-row style="margin-top: 10px">
                                        <el-col :span="24">
                                            <div class="editor">
                                                <ckeditor
                                                    v-model="contentReplyDetail"
                                                    :editor="editor"
                                                    :config="editorConfig"
                                                />
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div>
                                        <el-button
                                            size="small"
                                            style="margin-top: 10px"
                                            @click="contentReplyDetailCancel"
                                        >
                                            {{ $t("message.Cancel") }}
                                        </el-button>
                                        <el-button
                                            size="small"
                                            style="margin-top: 10px"
                                            type="confirm"
                                            @click="contentReplyDetailConfirm"
                                        >
                                            {{ $t("message.Save") }}
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!--讨论回复列表-->
                <div v-loading="isload" class="reply" style="">
                    <el-collapse
                        v-for="(item, index) in collapsedetail"
                        v-show="collapsedetail.length"
                        :key="item.id"
                        v-model="activeList"
                        @change="collapseId(item.id)"
                    >
                        <div :key="item.id" class="reply-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
                                :name="index"
                            >
                                <template slot="title">
                                    <div class="reply-title" @click="test">
                                        <div
                                            v-if="item.isRead"
                                            style=" position: absolute;left: -50px;
                width:10px;
                height:10px;
                border:2px solid #0e38b1;
                border-radius:10px;cursor: pointer"
                                            @click="change(0, item.id)"
                                        />
                                        <div
                                            v-if="!item.isRead"
                                            style=" position: absolute;left: -50px;
                width:14px;
                height:14px;background: #0e38b1;border-radius:10px;cursor: pointer
                "
                                            @click="change(1, item.id)"
                                        />
                                        <div style="position: relative;">
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
                                                >
                                                    <span
                                                        class="name authorNames"
                                                        >{{
                                                            item.userNickname
                                                        }}&nbsp;</span
                                                    >
                                                </el-tooltip>
                                                <span
                                                    class="name"
                                                    style="margin-left: 3px;margin-right: 3px"
                                                    >:</span
                                                >
                                                <span class="replyImg">
                                                    <span
                                                        style="color: gray;
                                                        display: inline-block;
                                                        word-wrap:break-word;
                                                        word-break:break-all"
                                                        @click="
                                                            richTextClick(
                                                                $event
                                                            )
                                                        "
                                                        v-html="item.content"
                                                    />
                                                </span>
                                            </span>
                                            <div class="time">
                                                <span>{{
                                                    item.createTime
                                                        | formatDate(s)
                                                }}</span>
                                            </div>
                                            <div class="caozuo" @click="test">
                                                <el-dropdown>
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="cursor: pointer"
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
                                                                replyDetailChildrenDeleteDialog(
                                                                    item.id
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
                                        </div>
                                        <div
                                            style="padding-top: 4%;height: 15px;position: relative"
                                            class="rep"
                                        >
                                            <img
                                                src="../../../../static/images/reply.png"
                                                style="position: absolute;z-index: 1;top: 87%;left: 10px;"
                                            />
                                            <el-button
                                                placeholder="Reply"
                                                prefix-icon="el-icon-search"
                                                style="width: 100%"
                                                @click="replyAddChildren(item)"
                                            >
                                                <span
                                                    style="float: left;margin-left: 15px"
                                                    >{{
                                                        $t(
                                                            "message.ANNOUNCE.REPLY"
                                                        )
                                                    }}</span
                                                >
                                            </el-button>
                                        </div>
                                        <div v-if="item.show">
                                            <el-row style="margin-top: 50px">
                                                <el-col :span="24">
                                                    <div class="editor">
                                                        <ckeditor
                                                            v-model="
                                                                a
                                                                    .chlidrenReplyContent[
                                                                    index
                                                                ]
                                                            "
                                                            :editor="editor"
                                                            :config="
                                                                editorConfig
                                                            "
                                                        />
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <div>
                                                <el-button
                                                    style="margin-top: 10px"
                                                    size="small"
                                                    @click="
                                                        contentReplyDetailChildrenCancel(
                                                            item
                                                        )
                                                    "
                                                >
                                                    {{ $t("message.Cancel") }}
                                                </el-button>
                                                <el-button
                                                    style="margin-top: 10px"
                                                    size="small"
                                                    type="confirm"
                                                    @click="
                                                        contentReplyDetailChildrenConfirm(
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
                                    <br />
                                </template>
                                <template slot="">
                                    <div
                                        v-for="(items, ix) in item.children"
                                        :key="ix"
                                        class="mainreply"
                                    >
                                        <div
                                            v-if="items.isRead"
                                            style=" position: absolute;left: -50px;
                width:10px;
                height:10px;
                border:2px solid #0e38b1;
                border-radius:10px;cursor: pointer"
                                            @click="
                                                changes(items.status, items.id)
                                            "
                                        />
                                        <div
                                            v-if="!items.isRead"
                                            style=" position: absolute;left: -50px;
                width:14px;
                height:14px;background: #0e38b1;border-radius:10px;cursor: pointer;

                "
                                            @click="
                                                changes(items.status, items.id)
                                            "
                                        />
                                        <div style="position: relative">
                                            <div>
                                                <img
                                                    :src="
                                                        items.userAvatarUrl
                                                            ? getAbsolutePath(
                                                                  items.userAvatarUrl,
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
                                                            items.userNickname
                                                        "
                                                    >
                                                        <span
                                                            class="name authorNames"
                                                            >{{
                                                                items.userNickname
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
                                                            style="color: gray;
                                                            display: inline-block;
                                                            word-wrap:break-word;
                                                             word-break:break-all"
                                                            @click="
                                                                richTextClick(
                                                                    $event
                                                                )
                                                            "
                                                            v-html="
                                                                items.content
                                                            "
                                                        />
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="time">
                                                <span>{{
                                                    items.createTime
                                                        | formatDate(s)
                                                }}</span>
                                            </div>
                                            <div class="caozuo">
                                                <el-dropdown>
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="margin-left: 35px;cursor: pointer"
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
                                                                replyTwoDelete(
                                                                    items.id
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
                                        </div>
                                    </div>
                                </template>
                                <div>
                                    <div
                                        v-if="clickloadmorechildren"
                                        style="margin-left: 37%;font-size: 17px;cursor: pointer;"
                                        @click="
                                            contentReplyListChildren(
                                                1,
                                                pageIndexSub + 1
                                            )
                                        "
                                    >
                                        {{
                                            $t(
                                                "message.Messages.Click_load_More"
                                            )
                                        }}...
                                    </div>
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                    <div v-if="noSearch">
                        {{
                            $t("message.Your_search_did_not_match_any_entries")
                        }}! !
                    </div>
                </div>
                <div>
                    <span
                        v-if="clickloadmore"
                        style="margin-left: 37%;
    font-size: 17px;
    cursor: pointer;"
                        @click="contentReplyList(1, pageIndex + 1)"
                        >{{ $t("message.Messages.Click_load_More") }}...</span
                    >
                </div>
            </div>
        </div>
        <div v-show="discussionStepFive" class="discussionStepFive">
            <el-row>
                <el-col :span="19" style="">
                    <div class="question">
                        <div style="">
                            <div v-show="groupGrade == 1">
                                <div class="title">
                                    <span
                                        >{{
                                            $t(
                                                "message.This_is_a_graded_discussion"
                                            )
                                        }}:</span
                                    >
                                    <span>{{ groupScore }}</span>
                                    {{ $t("message.Points_Possible") }}
                                    <span v-if="groupmaxDueTime">{{
                                        groupmaxDueTime | formatDate(s)
                                    }}</span>
                                    <!--<span  v-else-if="!groupmaxDueTime">No due date</span>-->
                                    <el-table
                                        :data="tableData"
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            :label="$t('message.Due')"
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    scope.row.limitTime
                                                        | formatDate(s)
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="$t('message.For')"
                                            width="180"
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    idToName(
                                                        scope.row,
                                                        sections,
                                                        users
                                                    )
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="
                                                $t('message.Available_from')
                                            "
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    scope.row.startTime
                                                        | formatDate(s)
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="$t('message.Until')"
                                        >
                                            <template slot-scope="scope">
                                                {{
                                                    scope.row.endTime
                                                        | formatDate(s)
                                                }}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="repertory">
                                <span class="testtitle"
                                    >{{
                                        $t("message.Since_this_is_a_group")
                                    }}
                                    :</span
                                >
                                <el-row>
                                    <el-col :span="23">
                                        <div
                                            v-for="(item, tt) in groupItemName"
                                            :key="tt"
                                            class="circletest"
                                        >
                                            <div
                                                class="circle"
                                                style="display: inline-block"
                                            />
                                            <a
                                                class="test"
                                                style="cursor: pointer"
                                                @click="groupItem(item.id)"
                                                ><span>{{ item.name }}</span></a
                                            >
                                            <div
                                                v-if="item.readCountDTO"
                                                style="display: inline-block;float: right"
                                            >
                                                <div class="read">
                                                    {{
                                                        item.readCountDTO
                                                            .replyNotReadTotal
                                                    }}
                                                </div>
                                                <div class="unread">
                                                    {{
                                                        item.readCountDTO
                                                            .replyTotal
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="description">
                                <el-row>
                                    <el-col :span="12">
                                        <div>
                                            <img
                                                :src="
                                                    avatarUrlGroup
                                                        ? getAbsolutePath(
                                                              avatarUrlGroup,
                                                              40,
                                                              40
                                                          )
                                                        : '../../../../static/images/touxiang1.png'
                                                "
                                            />
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="groupName"
                                            >
                                                <span
                                                    class="name authorNames"
                                                    >{{ groupName }}</span
                                                > </el-tooltip
                                            ><br />
                                            <span class="time">
                                                <span>{{
                                                    groupCreateTime
                                                        | formatDate(s)
                                                }}</span>
                                                <div
                                                    v-if="userCount"
                                                    style="color: #0e38b1;
                                                    text-decoration: underline;
                                                    display: inline-block"
                                                >
                                                    <el-popover
                                                        v-if="userCount != 0"
                                                        trigger="hover"
                                                        placement="top"
                                                    >
                                                        <div>
                                                            <span
                                                                >{{
                                                                    userCount
                                                                }}&nbsp;{{
                                                                    $t(
                                                                        "message.user"
                                                                    )
                                                                }}</span
                                                            >
                                                        </div>

                                                        <div
                                                            slot="reference"
                                                            style="text-decoration: underline;
                                                            color: #0e38b1;font-size: 13px"
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
                                                    v-else-if="sectionList"
                                                    style="display: inline-block"
                                                >
                                                    <el-popover
                                                        v-if="
                                                            sectionList.length !=
                                                                0
                                                        "
                                                        trigger="hover"
                                                        placement="top"
                                                    >
                                                        <div
                                                            v-for="(item,
                                                            ii) in sectionList"
                                                            :key="ii"
                                                        >
                                                            <span
                                                                >{{
                                                                    item.sectionName
                                                                }}&nbsp;&nbsp;&nbsp;{{
                                                                    item.userCount
                                                                }}{{
                                                                    $t(
                                                                        "message.user"
                                                                    )
                                                                }}</span
                                                            >
                                                        </div>

                                                        <div
                                                            slot="reference"
                                                            style="text-decoration: underline;
                                                            color: #0e38b1;font-size: 13px;
                                                            display: inline-block"
                                                            class="name-wrapper"
                                                        >
                                                            {{
                                                                sectionList.length
                                                            }}{{
                                                                $t(
                                                                    "message.ANNOUNCE.SECTIONS"
                                                                )
                                                            }}
                                                        </div>
                                                    </el-popover>
                                                </div>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="operation">
                                            <div
                                                v-if="status"
                                                style="display: inline-block;"
                                            >
                                                <el-button
                                                    style="padding-top: 14px"
                                                    type="success"
                                                    icon="el-icon-circle-check"
                                                    @click="publishStatus(0)"
                                                >
                                                    {{
                                                        $t("message.Published")
                                                    }}
                                                </el-button>
                                            </div>
                                            <div
                                                v-if="!status"
                                                style="display: inline-block"
                                            >
                                                <el-button
                                                    type="info"
                                                    @click="publishStatus(1)"
                                                >
                                                    <i
                                                        class="iconfont icon-Group-"
                                                        style="font-size: 12px"
                                                    />&nbsp;Unpublish
                                                </el-button>
                                            </div>
                                            <el-button
                                                style="padding-top: 14px;margin-left: 10px"
                                                icon="el-icon-edit"
                                                class="edit"
                                                @click="groupDiscussionEdit"
                                            >
                                                Edit
                                            </el-button>
                                            <el-dropdown
                                                style="width:32px;margin-left: 10px"
                                            >
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="position: absolute;bottom: -10px;cursor: pointer"
                                                    >
                                                        <img
                                                            src="../../../../static/images/spread-big.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <div
                                                        @click="
                                                            discussionReplyDeleteDetail
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
                                                        <el-dropdown-item
                                                            @click.native="
                                                                goCourseResource
                                                            "
                                                        >
                                                            <i
                                                                class="iconfont icon-fenxiang1"
                                                            />
                                                            <span
                                                                style="font-size: 16px"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.share_resource"
                                                                    )
                                                                }}
                                                            </span>
                                                        </el-dropdown-item>
                                                    </div>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="detail">
                                <p>{{ groupTitle }}</p>
                                <span style="color: gray" />
                                <div
                                    v-if="fileUrl"
                                    style="display: inline-block"
                                >
                                    <a
                                        class="el-upload-list__item-name"
                                        :href="getAbsolutePath(fileUrl)"
                                        style="text-decoration: none;cursor: pointer;"
                                        target="_Blank"
                                    >
                                        <i class="el-icon-document" />
                                        {{ fileName }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="data" style="width: 83%">
            <nextPrevious />
        </div>
        <div>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="deleteDialogVisible"
                width="30%"
                center
            >
                <span>{{
                    $t("message.You_are_about_to_delete_this_discussion")
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="discussionReplyDelete">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="deleteReplyDialogVisible"
                width="30%"
                center
            >
                <span>{{
                    $t("message.You_are_about_to_delete_this_discussion")
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteReplyDialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="replyDetailChildrenDelete"
                        >{{ $t("message.Delete") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";
import defaultHead from "../../../../static/images/touxiang1.png";
import nextPrevious from "../../../utils/nextPrevious.vue";
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
    filters: {
        formatDate(s) {
            const date = new Date(s);
            if (!s) {
                return "-";
            }
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    components: {
        nextPrevious
    },

    data() {
        return {
            noSearch: false,
            inputSearch: "",
            a: { chlidrenReplyContent: [] },
            pageIndex: 1,
            pageIndexSub: 1,
            pageSize: 15,
            total: null,
            clickloadmore: false,
            clickloadmorechildren: false,
            isload: false,
            defaultHead,
            deleteDialogVisible: false,
            deleteReplyDialogVisible: false,
            msgID: "",
            discussionDetailChildrenId: "",
            grade: false,
            groupGrade: false,
            t: "",
            anthorName: "",
            selectedAssign: [],
            value7: "",
            settingId: "",
            assignmentName: "",
            activeList: [],
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
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            splitStudents: true,
            createGroupsManually: true,
            createGroupsNow: false,
            limitGroups: false,
            pointsPossible: false,
            displayGradeas: false,
            assignmentGroup: false,
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
            // assignmentGroup: {},
            value: [],
            dialogAssignmentCreate: false,
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            discussionStepOne: false,
            discussionStepTwo: false,
            discussionStepThree: false,
            discussionStepFour: false,
            discussionStepFive: false,
            centerDialogVisible: false,
            //* ******新建讨论表单采集start*********
            //* ******新建讨论表单采集end*********
            //* ******讨论列表start*********
            isRead: "",
            id: "",
            // pageIndex: 1,
            // pageSize: 10,
            // totalCount: 20,
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
            collapsedetails: "",
            replyTotal: "",
            replyNotReadTotal: "",
            maxDueTime: "",
            createUserAvatar: "",
            status: "",
            avatarUrl: "",
            fileUrl: "",
            fileName: "",
            discussionReplyId: "",
            // avatarUrl:'',
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
            // status: '',
            allowComment: "",

            //* ******小组列表详情end********
            activeName: "first",
            tableData: [],
            titlemain: "",
            discussionId: "",
            sectionList: "",
            userCount: "",
            sectionGroupList: "",
            studyGroupSetId: "",
            deleteId: "",
            sections: [], // 所有班级
            users: [], // 所有用户
            avatarUrlGroup: "",
            isone: null,
            collapseIds: "",
            data: this.$route.query.modulesData // 单元跳转使用
        };
    },
    watch: {
        collapsedetail: {
            handler(newName, oldName) {
                // console.log(newName.length, oldName.length);
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
    mounted() {
        // this.contentReplyList(1);
        this.gotoDetail();
        this.getAssignDataList();
    },
    methods: {
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (result.data.code === 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        },
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2:
                    for (let i = 0; i < sections.length; i += 1) {
                        const v = sections[i];
                        if (v.id === assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < users.length; i += 1) {
                        const v = users[i];
                        if (v.id === assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                default:
                    if (this.isone < 2) {
                        data = this.$t("message.Everyone");
                    } else {
                        data = this.$t("message.Everyelse");
                    }
            }

            return data;
        },

        one() {
            this.$router.push({
                path: "/homePage/studentMain/groupDiscussionCreateList",
                query: {
                    discussionId: this.discussionId,
                    courseId: this.courseId,
                    groupId: this.studyGroupSetId
                }
            });
        },
        groupItem(id) {
            this.$router.push({
                path: "/homePage/teacherMain/groupDiscussionDetail",
                query: {
                    discussionId: this.discussionId,
                    courseId: this.courseId,
                    groupId: id,
                    editTypes: 1
                }
            });
        },
        getAbsolutePath(relativePath, width, height) {
            if (relativePath === undefined) return defaultHead;
            if (width === undefined && height === undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        // 讨论已读变成未读
        change(isRead, id) {
            // console.log(isRead);
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/modify`, {
                    originId: id,
                    originType: 2
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        that.contentReplyList();
                        this.gotoDetail();
                        // isRead = !isRead;
                    }
                });
        },
        changes(isRead, id) {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/modify`, {
                    originId: id,
                    originType: 2
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        that.contentReplyListChildren();
                        this.gotoDetail();
                    }
                });
        },
        // 发布未发布
        publishStatus(status) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: this.discussionId,
                    status
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        // console.log(11112345666666)
                        this.gotoDetail();
                    }
                    // this.discussionList()
                });
        },
        msgFold(key) {
            if (!key) {
                for (let i = 0; i < this.collapsedetail.length; i += 1) {
                    this.activeList.push(i);
                }
            } else {
                this.activeList = [];
            }
        },
        test(event) {
            event.stopPropagation();
            // console.log('阻止事件冒泡在')
        },
        // 详情页的筛选供能
        detailShanxuan(val) {
            this.inputSearch = val;
            const that = this;
            clearTimeout(that.t);
            this.t = setTimeout(() => {
                that.$http
                    .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                        params: {
                            discussionId: that.discussionId,
                            isRead: 2,
                            content: that.anthorName
                        }
                    })
                    .then(res => {
                        that.collapsedetail = res.data.entity;
                    });
            }, 1000);
        },
        // 详情页的未读功能
        detailUnread() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: { discussionId: that.discussionId, isRead: 0 }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
        },
        detailAll() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: { discussionId: that.discussionId, isRead: 2 }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
        },
        // 详情页面初始化
        gotoDetail() {
            this.isload = true;
            const myDate = new Date();
            // console.log(myDate);
            const that = this;
            that.discussionId = that.$route.query.discussionId;
            that.courseId = that.$route.query.courseId;
            // console.log("33333555", that.$route.query.courseId);
            that.$http
                .get(`${process.env.NODE_ENV}/discussion/get`, {
                    params: { data: that.discussionId }
                })
                .then(res => {
                    // console.log(res.data.entity);
                    if (Number(res.data.code) === 200) {
                        // this.isload = false;
                        if (res.data.entity.studyGroupSetId) {
                            that.discussionStepFive = true;
                            this.groupScore =
                                Number(res.data.entity.score) / 100;
                            this.groupmaxDueTime = res.data.entity.maxDueTime;
                            this.groupName = res.data.entity.author.nickname;
                            this.groupCreateTime = res.data.entity.createTime;
                            this.groupTitle = res.data.entity.title;
                            this.groupContent = res.data.entity.content;
                            this.groupItemName = res.data.entity.studyGroupList;
                            this.status = res.data.entity.status;
                            this.sectionGroupList = res.data.entity.sectionList;
                            this.userCount = res.data.entity.userCount;
                            this.studyGroupSetId =
                                res.data.entity.studyGroupSetId;
                            this.tableData = res.data.entity.assign;
                            // console.log(this.studyGroupSetId);
                            if (res.data.entity.isGrade) {
                                this.groupGrade = res.data.entity.isGrade;
                            }
                            if (res.data.entity.readCountDTO) {
                                this.groupreplyTotal =
                                    res.data.entity.readCountDTO.replyTotal;
                                this.groupreplyNotReadTotal =
                                    res.data.entity.readCountDTO.replyNotReadTotal;
                            } else {
                                this.groupreplyTotal = "";
                            }
                            if (res.data.entity.author) {
                                this.avatarUrlGroup =
                                    res.data.entity.author.avatarUrl;
                            }
                            this.contentReplyList();
                            this.isone = res.data.entity.assign.length;
                        } else {
                            // this.isload = false;
                            that.discussionStepFour = true;
                            this.score = Number(res.data.entity.score) / 100;
                            this.tableData = res.data.entity.assign;
                            this.titleDetail = res.data.entity.title;
                            this.contentDetail = res.data.entity.content;
                            this.createTimeDetail = res.data.entity.createTime;
                            this.limitTimeDetail = res.data.entity.limitTime;
                            this.nameDetail = res.data.entity.author.nickname;
                            this.idChildren = res.data.entity.id;
                            this.status = res.data.entity.status;
                            this.maxDueTime = res.data.entity.maxDueTime;
                            this.allowComment = res.data.entity.allowComment;
                            this.sectionList = res.data.entity.sectionList;
                            if (res.data.entity.author) {
                                this.avatarUrl =
                                    res.data.entity.author.avatarUrl;
                            }
                            // console.log(res.data.entity.attachmentFile)
                            if (res.data.entity.attachmentFile) {
                                this.fileUrl =
                                    res.data.entity.attachmentFile.fileUrl;
                                this.fileName =
                                    res.data.entity.attachmentFile.fileName;
                                // console.log(res.data.entity.attachmentFile)
                            }
                            this.userCount = res.data.entity.userCount;
                            this.createUserAvatar =
                                res.data.entity.createUserAvatar;
                            if (res.data.entity.isGrade) {
                                this.grade = res.data.entity.isGrade;
                                // console.log(res.data.entity.isGrade)
                            }
                            if (res.data.entity.readCountDTO) {
                                this.replyTotal =
                                    res.data.entity.readCountDTO.replyTotal;
                                this.replyNotReadTotal =
                                    res.data.entity.readCountDTO.replyNotReadTotal;
                            } else {
                                this.replyTotal = "";
                            }
                            this.isone = res.data.entity.assign.length;
                            // console.log(res.data.entity);
                            this.contentReplyList();
                        }
                    }
                });
            this.discussionStepThree = false;
        },
        // 讨论回复全部标记为已读未读
        allRead() {
            // console.log(this.ids);
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/add`, {
                    originId: that.discussionId,
                    originType: 2
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        // console.log(res);
                        this.contentReplyList();
                        this.gotoDetail();
                    }
                });
        },
        //
        discussionReplyDeleteDetail() {
            this.deleteDialogVisible = true;
        },
        // 讨论详情删除
        discussionReplyDelete() {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [
                    this.discussionId
                ])
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.$router.push({
                            path: "/homePage/allCourse/discussionCreateList",
                            query: {
                                courseId: this.courseId,
                                discussionId: this.discussionId
                            }
                        });
                        this.$message.success(
                            this.$t("message.Delete_successfully")
                        );
                    }
                });
        },
        // 讨论详情评论关闭
        discussionReplyClose() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    courseId: that.courseId,
                    id: that.discussionId,
                    allowComment: 0
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        that.allowComment = 0;
                    }
                    // console.debug(888, res);
                });
            // console.log('bbbbbbbb', this.allowComment)
        },
        // 讨论详情评论打开
        discussionReplyOpen() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    courseId: that.courseId,
                    id: that.discussionId,
                    allowComment: 1
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        that.allowComment = 1;
                    }
                    // console.log(999, res);
                });
            // console.log('bbbbbbbb', this.allowComment)
        },
        // 添加讨论回复
        replyAdd() {
            this.edit = true;
        },
        replyAddChildren(item) {
            item.show = !item.show;
        },
        // 讨论详情回复取消
        contentReplyDetailCancel() {
            this.edit = false;
        },
        // 讨论详情子集回复取消
        contentReplyDetailChildrenCancel(item) {
            this.$set(item, "show", false);
        },
        // 讨论详情子集回复确认
        contentReplyDetailChildrenConfirm(id, item, index) {
            const ss = this.a.chlidrenReplyContent.toString();
            const str = ss.replace(/,/g, "");
            // console.log(this.a.chlidrenReplyContent);
            // 讨论id
            if (str != "") {
                this.$http
                    .post(`${process.env.NODE_ENV}/discussionReply/add`, {
                        discussionId: this.discussionId,
                        content: str,
                        discussionReplyId: id
                    })
                    .then(res => {
                        if (Number(res.data.code) === 200) {
                            this.discussionReplyId = id;
                            this.$set(item, "show", false);
                            this.a.chlidrenReplyContent[index] = "";
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/discussionReply/pageList`,
                                    {
                                        params: {
                                            discussionId: this.discussionId,
                                            isRead: 2,
                                            replyId: this.collapseIds,
                                            pageIndex: this.pageIndexSub,
                                            pageSize: 10000
                                        }
                                    }
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        const totalCount =
                                            (this.pageIndexSub - 1) *
                                                this.pageSize +
                                            res.data.entity.list.length;
                                        if (
                                            totalCount < res.data.entity.total
                                        ) {
                                            this.clickloadmorechildren = true;
                                        } else {
                                            this.clickloadmorechildren = false;
                                        }
                                        this.collapsedetail.forEach(item => {
                                            if (item.id === this.collapseIds) {
                                                if (this.pageIndexSub === 1) {
                                                    item.children =
                                                        res.data.entity.list;
                                                } else {
                                                    this.arrayPush(
                                                        item.children,
                                                        res.data.entity.list
                                                    );
                                                }
                                            }
                                        });
                                        this.isload = false;
                                    }
                                });
                        }
                    });
            } else {
                this.$message.error(this.$t("message.Content_cannot_be_empty"));
            }
        },
        replyDetailChildrenDeleteDialog(deleteId) {
            this.deleteReplyDialogVisible = true;
            this.deleteId = deleteId;
        },
        // 讨论详情子集删除
        replyDetailChildrenDelete() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/deletes`, [
                    this.deleteId
                ])
                .then(res => {
                    // console.log(res);
                    if (Number(res.data.code) === 200) {
                        this.contentReplyList();
                        // this.contentReplyListChildren()
                        this.deleteReplyDialogVisible = false;
                        this.$message.success(
                            this.$t("message.Delete_successfully")
                        );
                    }
                });
        },
        // 讨论二级删除
        replyTwoDelete(id) {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/deletes`, [id])
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.contentReplyListChildren();
                        this.$message.success(
                            this.$t("message.Delete_successfully")
                        );
                    }
                });
        },

        // 讨论详情回复确认
        contentReplyDetailConfirm() {
            const that = this;
            this.discussionReplyId = "";
            this.collapsedetail = [];
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/add`, {
                    discussionId: that.discussionId,
                    content: that.contentReplyDetail
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.contentReplyDetail = "";
                        this.edit = false;
                        // 請求全部的恢複數據
                        this.$http
                            .get(
                                `${process.env.NODE_ENV}/discussionReply/pageList`,
                                {
                                    params: {
                                        discussionId: this.discussionId,
                                        isRead: 2,
                                        replyId: 0,
                                        pageIndex: this.pageIndex,
                                        pageSize: 10000
                                    }
                                }
                            )
                            .then(res => {
                                if (Number(res.data.code) === 200) {
                                    const totalCount =
                                        (this.pageIndex - 1) * this.pageSize +
                                        res.data.entity.list.length;
                                    if (totalCount < res.data.entity.total) {
                                        this.clickloadmore = true;
                                    } else {
                                        this.clickloadmore = false;
                                    }
                                    if (this.pageIndex === 1) {
                                        this.collapsedetail =
                                            res.data.entity.list;
                                    } else {
                                        this.arrayPush(
                                            this.collapsedetail,
                                            res.data.entity.list
                                        );
                                    }
                                    this.collapsedetail.forEach(item => {
                                        this.$set(item, "children", []);
                                        this.$set(item, "show", false);
                                        this.$set(item, "value", "");

                                        if (item.id === this.collapseIds) {
                                            item.children =
                                                res.data.entity.list;
                                        }
                                    });
                                    this.isload = false;
                                    this.gotoDetail();
                                }
                            });
                    }
                });
        },
        arrayPush(tarArr, srcArr) {
            tarArr = tarArr || [];
            srcArr = srcArr || [];
            for (let i = 0; i < srcArr.length; i += 1) {
                tarArr.push(srcArr[i]);
            }
            return tarArr;
        },
        collapseId(id) {
            this.collapseIds = id;
            // console.log(this.collapseIds);
            this.contentReplyListChildren();
        },
        contentReplyListChildren(val, pageIndexSub) {
            this.pageIndexSub = pageIndexSub || 1;
            this.$http
                .get(`${process.env.NODE_ENV}/discussionReply/pageList`, {
                    params: {
                        discussionId: this.discussionId,
                        isRead: 2,
                        replyId: this.collapseIds,
                        pageIndex: this.pageIndexSub,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        const totalCount =
                            (this.pageIndexSub - 1) * this.pageSize +
                            res.data.entity.list.length;
                        // console.log("totalCount", totalCount);
                        // console.log(
                        //     "res.data.entity.total",
                        //     res.data.entity.total
                        // );
                        if (totalCount < res.data.entity.total) {
                            this.clickloadmorechildren = true;
                        } else {
                            this.clickloadmorechildren = false;
                        }
                        this.collapsedetail.forEach(item => {
                            if (Number(item.id) === Number(this.collapseIds)) {
                                if (this.pageIndexSub === 1) {
                                    item.children = res.data.entity.list;
                                } else {
                                    this.arrayPush(
                                        item.children,
                                        res.data.entity.list
                                    );
                                }
                            }
                        });
                        // }
                        this.isload = false;
                    }
                });
        },
        // 讨论回复列表初始化
        contentReplyList(val, pageIndex) {
            this.pageIndex = pageIndex || 1;
            this.$http
                .get(`${process.env.NODE_ENV}/discussionReply/pageList`, {
                    params: {
                        discussionId: this.discussionId,
                        isRead: 2,
                        replyId: 0,
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        const totalCount =
                            (this.pageIndex - 1) * this.pageSize +
                            res.data.entity.list.length;
                        if (totalCount < res.data.entity.total) {
                            this.clickloadmore = true;
                        } else {
                            this.clickloadmore = false;
                        }
                        if (this.pageIndex === 1) {
                            this.collapsedetail = res.data.entity.list;
                        } else {
                            this.arrayPush(
                                this.collapsedetail,
                                res.data.entity.list
                            );
                        }
                        this.collapsedetail.forEach(item => {
                            this.$set(item, "children", []);
                            this.$set(item, "show", false);
                            this.$set(item, "value", "");
                            // if (Number(item.id) === Number(this.collapseIds)) {
                            //     item.children = res.data.entity.list;
                            // }
                        });
                        this.isload = false;
                    }
                });
        },
        // 讨论详情编辑
        discussionDetailEdit() {
            this.$router.push({
                path: "/homePage/allCourse/discussionAdmit",
                query: {
                    type: "1",
                    courseId: this.courseId,
                    discussionId: this.discussionId
                }
            });
        },

        //* ********************有关小组讨论************************************
        groupDiscussionDelete() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [
                    this.discussionId
                ])
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        that.$router.push({
                            path: "/homePage/allCourse/discussionCreateList",
                            query: {
                                courseId: this.courseId,
                                discussionId: this.discussionId
                            }
                        });
                    }
                });
        },
        // 小组讨论编辑
        groupDiscussionEdit() {
            // const that = this;
            this.$router.push({
                path: "/homePage/allCourse/discussionAdmit",
                query: {
                    type: "1",
                    courseId: this.courseId,
                    discussionId: this.discussionId
                }
            });
        },
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        },
        goCourseResource() {
            this.$router.push({
                path: "/homePage/courseResource",
                query: {
                    originType: 2,
                    id: this.discussionId,
                    resourceTitle: this.titleDetail
                }
            });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
.studentDiscussions /deep/ .el-collapse-item__wrap {
    border: none;
}

.studentDiscussions /deep/ .el-collapse-item__header {
    border: none;
    line-height: 20px;
}

.studentDiscussions /deep/ .el-collapse {
    border: none;
}

.studentDiscussions {
    .authorNames {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 150px;
        display: inline-block;
    }
    .discussionStepFour {
        /deep/.el-input__inner {
            padding-left: 30px;
        }
        /deep/.el-form-item__content {
            line-height: 2px;
        }
        /deep/ .el-table tr {
            background-color: #e6ebf7;
        }

        /deep/ .el-table th.is-leaf,
        .el-table td {
            background-color: #e6ebf7;
        }

        /deep/ .ck-editor__main {
            height: 200px;
        }

        /deep/ .ck-editor__editable_inline {
            height: 180px;
        }

        /deep/ .el-icon-search:before {
            content: "";
        }

        .inputSearch {
            display: inline-block;

            /deep/ .el-icon-search:before {
                content: "\E619";
            }
        }

        .read-unread {
            display: inline-block;
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
                float: left;
                margin-left: 10px;
            }

            .time {
                position: absolute;
                top: 100%;
                left: 50px;
                color: gray;
            }

            .caozuo {
                float: right;
                margin-right: 20px;
                margin-top: 10px;
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

                .caozuo {
                    position: absolute;
                    left: 91%;
                    top: 100%;
                }
            }
        }

        .replyImg {
            width: 69%;
            height: 100%;
            display: inline-block;
            /deep/ span {
                p {
                    word-break: break-all;
                }
            }

            /deep/ .image {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .reply {
            width: 77%;
            margin-top: 20px;
            margin-left: 5.5%;
        }
    }

    .discussionStepFive {
        /deep/ .el-table tr {
            background-color: #e6ebf7;
        }

        /deep/ .el-table th.is-leaf,
        .el-table td {
            background-color: #e6ebf7;
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

        .repertory {
            border: 1px solid #0e38b1;
            border-radius: 3px;
            background: #e6ebf7;
            padding: 1%;
            margin-top: 2%;

            .testtitle {
                color: #0e38b1;
            }

            .circletest {
                margin-top: 10px;
            }

            .circle {
                width: 6px;
                height: 6px;
                background: #0e38b1;
                border-radius: 6px;
                display: inline-block;
            }

            .test {
                text-decoration: underline;
                color: #0e38b1;
                margin-left: 15px;
            }

            .read-unread {
                margin-top: 3px;
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
        }

        .title span:nth-of-type(1) {
            color: #0e38b1;
        }

        .title span:nth-of-type(3) {
            float: right;
        }

        .description {
            margin-top: 20px;
            overflow: hidden;

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
            overflow: hidden;
            float: right;
            /*position: relative;*/

            .liulan {
                /*margin-right: 115px;*/
                /*margin-top: 7px;*/
            }

            .edit {
                /*position: absolute;*/
                /*right: 45px;*/
            }

            .read-unread {
                display: inline-block;
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

    /deep/ .el-collapse-item__header {
        height: auto !important;
        cursor: auto;
    }
    /deep/ .el-collapse-item__arrow {
        cursor: pointer;
    }
}
</style>
