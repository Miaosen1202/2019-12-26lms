<template>
    <!--eslint-disable-->
    <div class="studentDiscussions">
        <el-alert
            v-if="startTime > now && type == 4"
            :title="getLockedUntilTip(startTime)"
            type="info"
            show-icon
        >
        </el-alert>
        <div v-else>
            <div v-show="discussionStepFour" class="discussionStepFour">
                <!--顶部详情-->
                <!--<div>11111</div>-->
                <el-row>
                    <el-col :span="19" style="">
                        <div class="question">
                            <div style="border-bottom: 1px solid #ccc">
                                <div class="title" v-show="grade == 1">
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
                                                            : '../../../../../static/images/touxiang1.png'
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
                                                    ></el-tooltip
                                                ><br />
                                                <span class="time">
                                                    <span>{{
                                                        createTimeDetail
                                                            | formatDate(s)
                                                    }}</span>
                                                    <div
                                                        style="color: #0e38b1;text-decoration: underline;display: inline-block"
                                                        v-if="userCount"
                                                    >
                                                        <el-popover
                                                            trigger="hover"
                                                            placement="top"
                                                            v-if="
                                                                userCount != 0
                                                            "
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
                                                        v-else-if="sectionList"
                                                        style="display: inline-block"
                                                    >
                                                        <el-popover
                                                            trigger="hover"
                                                            placement="top"
                                                            v-if="
                                                                sectionList.length !=
                                                                    0
                                                            "
                                                        >
                                                            <div
                                                                v-for="(item,
                                                                key,
                                                                index) in sectionList"
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
                                                                style="text-decoration: underline;color: #0e38b1;font-size: 13px;display: inline-block"
                                                                slot="reference"
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
                                                    class="read-unread"
                                                    v-if="replyTotal != ''"
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
                                                    style="display: inline-block"
                                                >
                                                    <el-button
                                                        v-if="
                                                            Number(
                                                                userInfoData.id
                                                            ) ===
                                                                Number(
                                                                    createUserId
                                                                ) &&
                                                                Number(
                                                                    disType
                                                                ) === 2
                                                        "
                                                        @click="
                                                            discussionDetailEdit
                                                        "
                                                        icon="el-icon-edit"
                                                        class="edit"
                                                    >
                                                        {{
                                                            $t("message.Edit")
                                                        }}</el-button
                                                    >
                                                </div>
                                                <el-dropdown style="top: 9px">
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="float: right;margin-top: 4px;cursor: pointer"
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
                                    <p>{{ titleDetail }}</p>
                                    <span class="replyImg">
                                        <span
                                            @click="richTextClick($event)"
                                            style="color: gray;word-break: break-all"
                                            v-html="contentDetail"
                                        >
                                            <!--{{contentDetail}}-->
                                        </span>
                                    </span>
                                    <br />
                                    <div v-if="fileUrl">
                                        <a
                                            class="el-upload-list__item-name"
                                            :href="getAbsolutePath(fileUrl)"
                                            style="text-decoration: none;cursor: pointer;"
                                            target="_Blank"
                                        >
                                            <i class="el-icon-document"></i>
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
                                                            @input="
                                                                detailShanxuan
                                                            "
                                                            placeholder="Search entries or author"
                                                            style="width: 105%"
                                                        >
                                                        </el-input>
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
                                                        >{{
                                                            $t("message.Unread")
                                                        }}</el-button
                                                    >
                                                    <el-button
                                                        @click="detailAll"
                                                        >{{
                                                            $t("message.All")
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
                                                            style="position: absolute;top:0px;left:165px;"
                                                        >
                                                            <i
                                                                ><span
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
                                                            @click="msgFold(0)"
                                                            size="medium"
                                                            style="position: absolute;top:0px;left:240px;"
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
                            <div
                                v-if="
                                    endTime == undefined ||
                                        endTime == '' ||
                                        endTime == null ||
                                        endTime > now
                                "
                            >
                                <div v-if="allowComment == 1 || type == 2">
                                    <div style="position: relative">
                                        <img
                                            src="../../../../../static/images/reply.png"
                                            style="position: absolute;z-index: 1;top: 21%;left: 10px;"
                                        />
                                        <el-button
                                            prefix-icon="el-icon-search"
                                            @click="replyAdd"
                                            style="width: 100%"
                                        >
                                            <span
                                                style="float: left;margin-left:15px;color: gray;"
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
                                                        :editor="editor"
                                                        v-model="
                                                            contentReplyDetail
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
                                                    contentReplyDetailCancel
                                                "
                                                >{{
                                                    $t("message.Cancel")
                                                }}</el-button
                                            >
                                            <el-button
                                                style="margin-top: 10px"
                                                size="small"
                                                type="confirm"
                                                @click="
                                                    contentReplyDetailConfirm
                                                "
                                                >{{ $t("message.Save") }}
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!--回复列表-->
                <div class="reply" style="" v-loading="isload">
                    <el-collapse
                        v-model="activeList"
                        v-if="collapsedetail.length"
                        v-for="(item, index) in collapsedetail"
                        @change="collapseId(item.id)"
                        :key="item.id"
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
                                            @click="
                                                change(item.isRead, item.id)
                                            "
                                            style=" position: absolute;left: -50px;
                width:10px;
                height:10px;
                border:2px solid #0e38b1;
                border-radius:10px;cursor: pointer"
                                        ></div>
                                        <div
                                            v-if="!item.isRead"
                                            @click="
                                                change(item.isRead, item.id)
                                            "
                                            style=" position: absolute;left: -50px;
                width:14px;
                height:14px;background: #0e38b1;border-radius:10px;cursor: pointer;

                "
                                        ></div>
                                        <div style="position: relative;">
                                            <!--<img src="../../../../../static/images/touxiang1.png" style="float: left">-->
                                            <img
                                                :src="
                                                    item.userAvatarUrl
                                                        ? getAbsolutePath(
                                                              item.userAvatarUrl,
                                                              40,
                                                              40
                                                          )
                                                        : '../../../../../static/images/touxiang1.png'
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
                                                    >&nbsp;</el-tooltip
                                                >
                                                <span
                                                    class="name"
                                                    style="margin-left: 3px;margin-right: 3px"
                                                    >:</span
                                                >
                                                <span class="replyImg">
                                                    <span
                                                        @click="
                                                            richTextClick(
                                                                $event
                                                            )
                                                        "
                                                        style="color: gray;display: inline-block;word-wrap:break-word;
                        word-break:break-all;"
                                                        v-html="item.content"
                                                    >
                                                    </span>
                                                </span>
                                            </span>
                                            <div class="time">
                                                <span>{{
                                                    item.createTime
                                                        | formatDate(s)
                                                }}</span>
                                            </div>
                                            <!--{{item.createUserId}}-->
                                            <div
                                                class="caozuo"
                                                @click="test"
                                                v-if="
                                                    !hasNoOpPermission(
                                                        item.createUserId
                                                    )
                                                "
                                            >
                                                <el-dropdown>
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i style="">
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
                                                                replyDetailChildrenDelete(
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
                                            v-if="
                                                endTime == undefined ||
                                                    endTime == '' ||
                                                    endTime == null ||
                                                    endTime > now
                                            "
                                        >
                                            <div
                                                v-if="
                                                    allowComment == 1 ||
                                                        type == 2
                                                "
                                            >
                                                <div
                                                    style="padding-top: 5%;height:15px;position: relative"
                                                >
                                                    <img
                                                        src="../../../../../static/images/reply.png"
                                                        style="position: absolute;z-index: 1;top: 87%;left:10px;"
                                                    />
                                                    <el-button
                                                        prefix-icon="el-icon-search"
                                                        @click="
                                                            replyAddChildren(
                                                                item
                                                            )
                                                        "
                                                        style="width: 100%"
                                                    >
                                                        <span
                                                            style="float:left;margin-left:15px;color: gray;"
                                                            >{{
                                                                $t(
                                                                    "message.ANNOUNCE.REPLY"
                                                                )
                                                            }}</span
                                                        >
                                                    </el-button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-show="item.show">
                                            <el-row style="margin-top: 50px">
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
                                                            :config="
                                                                editorConfig
                                                            "
                                                        ></ckeditor>
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
                                                    >{{
                                                        $t("message.Cancel")
                                                    }}</el-button
                                                >
                                                <el-button
                                                    style="margin-top: 10px"
                                                    size="small"
                                                    type="save"
                                                    @click="
                                                        contentReplyDetailChildrenConfirm(
                                                            item.id,
                                                            item,
                                                            index
                                                        )
                                                    "
                                                    >{{ $t("message.Save") }}
                                                </el-button>
                                                <!--<el-button size="small" type="confirm" @click="contentReplyDetailChildrenEdit(item.id)">编辑保存-->
                                                <!--</el-button>-->
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template slot="">
                                    <div
                                        class="mainreply"
                                        v-for="(items, index) in item.children"
                                        v-if="
                                            item.replies !== '' ||
                                                item.replies !== 'undefined' ||
                                                item.replies !== null
                                        "
                                    >
                                        <!--<el-checkbox class="radio" style="position: absolute;left: -50px;"-->
                                        <!--v-model="!!items.isRead"></el-checkbox>-->
                                        <div
                                            v-if="items.isRead"
                                            @click="
                                                changes(items.isRead, items.id)
                                            "
                                            style=" position: absolute;left: -50px;
                width:10px;
                height:10px;
                border:2px solid #0e38b1;
                border-radius:10px;cursor: pointer"
                                        ></div>
                                        <div
                                            v-if="!items.isRead"
                                            @click="
                                                changes(items.isRead, items.id)
                                            "
                                            style=" position: absolute;left: -50px;
                width:14px;
                height:14px;background: #0e38b1;border-radius:10px;cursor: pointer;

                "
                                        ></div>
                                        <div style="position: relative">
                                            <div>
                                                <!--<img src="../../../../../static/images/touxiang1.png" style="float: left">-->
                                                <img
                                                    :src="
                                                        items.userAvatarUrl
                                                            ? getAbsolutePath(
                                                                  items.userAvatarUrl,
                                                                  40,
                                                                  40
                                                              )
                                                            : '../../../../../static/images/touxiang1.png'
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
                                                        ></el-tooltip
                                                    >
                                                    <span
                                                        class="name"
                                                        style="margin-left: 3px;margin-right: 3px"
                                                        >:</span
                                                    >
                                                    <span class="replyImg">
                                                        <span
                                                            @click="
                                                                richTextClick(
                                                                    $event
                                                                )
                                                            "
                                                            style="color: gray;display: inline-block;word-wrap:break-word;
                          word-break:break-all"
                                                            v-html="
                                                                items.content
                                                            "
                                                        ></span>
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="time">
                                                <span>{{
                                                    items.createTime
                                                        | formatDate(s)
                                                }}</span>
                                            </div>

                                            <div
                                                class="caozuo"
                                                v-if="
                                                    !hasNoOpPermission(
                                                        items.createUserId
                                                    )
                                                "
                                            >
                                                <el-dropdown>
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="margin-left: 35px;cursor: pointer"
                                                        >
                                                            <img
                                                                src="../../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <!--<div @click="replyTwoEdit(items.id,index,item.replies)">-->
                                                        <!--<el-dropdown-item>-->
                                                        <!--<i><img src="../../../../../static/images/edit.png"></i>-->
                                                        <!--Edit-->
                                                        <!--</el-dropdown-item>-->
                                                        <!--</div>-->
                                                        <div
                                                            @click="
                                                                replyTwoDelete(
                                                                    items.id
                                                                )
                                                            "
                                                            style="cursor: pointer"
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
                                        @click="
                                            contentReplyListChildren(
                                                1,
                                                pageIndexSub + 1
                                            )
                                        "
                                        style="margin-left: 37%;font-size: 17px;cursor: pointer;"
                                        v-if="clickloadmorechildren"
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
                        }}
                        ! !
                    </div>
                    <div>
                        <span
                            @click="contentReplyList(1, pageIndex + 1)"
                            v-if="clickloadmore"
                            style="margin-left: 37%;
    font-size: 17px;
    cursor: pointer;"
                            >{{
                                $t("message.Messages.Click_load_More")
                            }}...</span
                        >
                    </div>
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
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";
import { mapGetters } from "vuex";
import utilMethods from "@/utils/utilMethods";
import defaultHead from "../../../../../static/images/touxiang1.png";
export default {
    filters: {
        formatDate(s) {
            let date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formatterDate(val) {
            return utilMethods.formatDate(val);
        }
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    data() {
        return {
            noSearch: false,
            inputSearch: "",
            collapseIds: "",
            pageIndex: 1,
            pageIndexSub: 1,
            pageSize: 10,
            total: null,
            clickloadmore: false,
            clickloadmorechildren: false,
            a: { chlidrenReplyContent: [] },
            isload: false,
            defaultHead: defaultHead,
            deleteDialogVisible: false,
            allowStudentEditDiscussion: "",
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
            upload: process.env.NODE_ENV + "/upload",
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
                    uploadUrl: process.env.NODE_ENV + "/ckupload"
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
            avatarUrl: "",
            fileUrl: "",
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
            dialogAssignmentCreate: false,
            discussionStepFour: false,
            centerDialogVisible: false,
            //*******新建讨论表单采集start*********
            //*******新建讨论表单采集end*********
            //*******讨论列表start*********
            isRead: "",
            id: "",
            // pageIndex: 1,
            // pageSize: 10,
            // totalCount: 20,
            //*******讨论列表end*********
            //*******讨论设置start********
            allowMarkPostStatus: "",
            allowStudentCreateDiscussion: "",
            allowStudentEditDiscussion: "",
            allowDiscussionAttachFile: "",
            //*******讨论设置end********
            //*******筛选参数处理start******
            ruleformlist: {
                title: "",
                isRead: ""
            },
            //*******筛选参数处理end******
            //*******列表详情start******
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
            collapsedetail: [],
            replyTotal: "",
            replyNotReadTotal: "",
            maxDueTime: "",
            createUserId: "",
            //*******列表详情end******
            //*******小组列表详情start********
            groupScore: "",
            groupmaxDueTime: "",
            groupreplyTotal: "",
            groupreplyNotReadTotal: "",
            groupCreateTime: "",
            groupName: "",
            groupTitle: "",
            groupContent: "",
            groupItemName: "",
            status: "",
            allowComment: "",
            //*******小组列表详情end********
            activeName: "first",
            tableData: [],
            titlemain: "",
            discussionId: "",
            sectionList: "",
            userCount: "",
            // groupId:'',
            groupId: this.$route.query.groupId,
            editTypes: this.$route.query.editTypes,
            now: new Date().getTime(),
            startTime: "",
            endTime: "",
            fileName: "",
            type: "",
            disType: ""
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
        },
        $route: {
            handler(newName, oldName) {
                // console.log(newName, oldName);
                // this.activeName = newName.query.activeName;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.contentReplyList();
        this.gotoDetail();
        this.hasNoOpPermission();
        this.routerpath();
    },
    methods: {
        //学生角色并且他人所建的记录 无操作权限
        hasNoOpPermission(createUserId) {
            console.log(createUserId);
            return (
                this.userInfoData.type == 4 &&
                this.userInfoData.id != createUserId
            );
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
        routerpath() {
            this.type = this.userInfoData.type;
        },
        discussionReplyDeleteDetail() {
            this.deleteDialogVisible = true;
        },
        getLockedUntilTip(startTime) {
            return (
                "This discussion is locked until" +
                " " +
                utilMethods.formatDate(startTime)
            );
        },
        detailAll() {
            let that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: {
                        discussionId: that.discussionId,
                        isRead: 2,
                        studyGroupId: that.groupId
                    }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
        },
        //讨论已读变成未读
        change(isRead, id) {
            var that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/modify`, {
                    originId: id,
                    originType: 2
                })
                .then(res => {
                    this.contentReplyList();
                    // this.contentReplyListChildren();
                    this.gotoDetail();
                    isRead = !isRead;
                });
        },
        changes(isRead, id) {
            var that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/modify`, {
                    originId: id,
                    originType: 2
                })
                .then(res => {
                    // this.contentReplyList();
                    this.contentReplyListChildren();
                    this.gotoDetail();
                    // this.collapseIds = "";
                });
        },
        msgFold(key) {
            if (!key) {
                for (let i = 0; i < this.collapsedetail.length; i++) {
                    this.activeList.push(i);
                }
            } else {
                this.activeList = [];
            }
        },
        publishStatus(status) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: this.discussionId,
                    status: status,
                    studyGroupId: this.groupId
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.gotoDetail();
                    }
                });
        },
        test(event) {
            event.stopPropagation();
        },
        //详情页的筛选供能
        detailShanxuan(val) {
            this.inputSearch = val;
            let that = this;
            this.t;
            clearTimeout(that.t);
            this.t = setTimeout(() => {
                that.$http
                    .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                        params: {
                            discussionId: that.discussionId,
                            isRead: 2,
                            content: that.anthorName,
                            studyGroupId: that.groupId
                        }
                    })
                    .then(res => {
                        that.collapsedetail = res.data.entity;
                    });
            }, 1000);
        },
        //详情页的未读功能
        detailUnread() {
            let that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: {
                        discussionId: that.discussionId,
                        isRead: 0,
                        studyGroupId: that.groupId
                    }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
        },
        //详情页面初始化
        gotoDetail() {
            let that = this;
            this.isload = true;
            that.discussionId = that.$route.query.discussionId;
            that.courseId = that.$route.query.courseId;
            that.allowStudentEditDiscussion =
                that.$route.query.allowStudentEditDiscussion;
            // console.log("33333555", that.$route.query.courseId);
            that.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/discussion/get?data=${that.discussionId +
                        "_" +
                        that.groupId}`
                )
                .then(res => {
                    if (res.data.code == 200) {
                        that.discussionStepFour = true;
                        this.score = Number(res.data.entity.score) / 100;
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
                            this.avatarUrl = res.data.entity.author.avatarUrl;
                        }
                        if (res.data.entity.attachmentFile) {
                            this.fileUrl =
                                res.data.entity.attachmentFile.fileUrl;
                            this.fileName =
                                res.data.entity.attachmentFile.fileName;
                        }
                        this.userCount = res.data.entity.userCount;
                        this.createUserId = res.data.entity.createUserId;
                        if (res.data.entity.isGrade) {
                            this.grade = res.data.entity.isGrade;
                        }
                        if (res.data.entity.readCountDTO) {
                            this.replyTotal =
                                res.data.entity.readCountDTO.replyTotal;
                            this.replyNotReadTotal =
                                res.data.entity.readCountDTO.replyNotReadTotal;
                        } else {
                            this.replyTotal = "";
                        }
                        if (res.data.entity.assignUser) {
                            this.startTime =
                                res.data.entity.assignUser.startTime;
                            this.endTime = res.data.entity.assignUser.endTime;
                        }
                        this.disType = res.data.entity.type;
                    }
                });
        },
        //讨论回复全部标记为已读未读
        allRead() {
            // console.log(this.ids);
            var that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/add`, {
                    originId: that.discussionId,
                    originType: 2
                })
                .then(res => {
                    // console.log(res);
                    this.contentReplyList();
                    this.gotoDetail();
                });
        },
        //讨论详情删除
        discussionReplyDelete() {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [
                    this.discussionId
                ])
                .then(res => {
                    if (this.type == 4) {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentAllCourse/studentCourseDiscussionCreateList",
                            query: {
                                courseId: this.courseId,
                                groupId: this.groupId
                            }
                        });
                    } else {
                        this.$router.push({
                            path:
                                "/homePage/teacherMain/studentCourseDiscussionCreateList",
                            query: {
                                courseId: this.courseId,
                                groupId: this.groupId
                            }
                        });
                    }
                });
        },
        //添加讨论回复
        replyAdd() {
            this.edit = true;
        },
        replyAddChildren(item) {
            item.show = !item.show;
        },
        //讨论详情回复取消
        contentReplyDetailCancel() {
            this.edit = false;
        },
        //讨论详情子集回复取消
        contentReplyDetailChildrenCancel(item) {
            this.$set(item, "show", false);
        },
        //讨论详情子集回复确认
        contentReplyDetailChildrenConfirm(id, item, index) {
            let that = this;
            //讨论id
            var ss = this.a.chlidrenReplyContent.toString();
            var str = ss.replace(/,/g, "");
            // let that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/add`, {
                    discussionId: that.discussionId,
                    content: str,
                    discussionReplyId: id,
                    studyGroupId: that.groupId
                })
                .then(res => {
                    this.discussionReplyId = id;
                    // this.contentReplyListChildren()
                    this.$set(item, "show", false);
                    this.a.chlidrenReplyContent[index] = "";
                    // this.pageIndexSub = pageIndexSub || 1;
                    this.$http
                        .get(
                            `${process.env.NODE_ENV}/discussionReply/pageList`,
                            {
                                params: {
                                    studyGroupId: this.groupId,
                                    discussionId: this.discussionId,
                                    isRead: 2,
                                    replyId: this.collapseIds,
                                    pageIndex: this.pageIndexSub,
                                    pageSize: 10000
                                }
                            }
                        )
                        .then(res => {
                            if (res.data.code == 200) {
                                let totalCount =
                                    (this.pageIndexSub - 1) * this.pageSize +
                                    res.data.entity.list.length;
                                // console.log('totalCount',totalCount);
                                // console.log('res.data.entity.total',res.data.entity.total);
                                if (totalCount < res.data.entity.total) {
                                    this.clickloadmorechildren = true;
                                } else {
                                    this.clickloadmorechildren = false;
                                }
                                this.collapsedetail.forEach((item, index) => {
                                    if (item.id == this.collapseIds) {
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
                                // }
                                this.isload = false;
                            }
                        });
                });
        },
        //讨论详情子集删除
        replyDetailChildrenDelete(b) {
            // console.log(b);
            let that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/deletes`, [b])
                .then(res => {
                    if (res.data.code == 200) {
                        this.contentReplyList();
                        this.$message.success("Delete succeeded!");
                    }
                });
        },
        //讨论修改保存
        contentReplyDetailEdit() {
            let that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/modify`, {
                    id: this.msgID,
                    discussionId: that.discussionId,
                    content: that.contentReplyDetail
                })
                .then(res => {
                    this.contentReplyList();
                });
        },
        contentReplyDetailChildrenEdit() {
            let that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/modify`, {
                    id: this.discussionDetailChildrenId,
                    discussionId: that.discussionId,
                    content: that.contentReplyDetailChildren
                })
                .then(res => {
                    this.contentReplyList();
                });
        },
        replyTwoEdit(id, index, reply) {
            this.editchildren = true;
            this.contentReplyDetailChildren = reply[index].content;
            this.discussionDetailChildrenId = id;
        },
        //讨论子集编辑
        replyDetailChildrenEdit(id, index) {
            this.edit = true;
            this.contentReplyDetail = this.collapsedetail[index].content;
            this.msgID = id;
            let that = this;
        },
        //讨论二级删除
        replyTwoDelete(id) {
            let that = this;
            // console.log(id);
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/deletes`, [id])
                .then(res => {
                    if (res.data.code == 200) {
                        this.contentReplyListChildren();
                        this.$message.success("Delete succeeded!");
                    }
                });
        },
        arrayPush(tarArr, srcArr) {
            tarArr = tarArr || [];
            srcArr = srcArr || [];

            for (let i = 0; i < srcArr.length; i++) {
                tarArr.push(srcArr[i]);
            }
            return tarArr;
        },

        //讨论详情回复确认
        contentReplyDetailConfirm() {
            // this.edit = true;
            let that = this;
            this.collapsedetail = [];
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/add`, {
                    discussionId: that.discussionId,
                    content: that.contentReplyDetail,
                    studyGroupId: that.groupId
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.contentReplyDetail = "";
                        this.edit = false;
                        this.pageIndex = 1000;
                        this.contentReplyList();
                        this.contentReplyListChildren();
                        this.gotoDetail();
                    }
                });
        },
        //
        //讨论回复列表初始化
        contentReplyList(val, pageIndex) {
            this.isload = true;
            let that = this;
            that.discussionId = that.$route.query.discussionId;
            that.groupId = that.$route.query.groupId;
            this.pageIndex = pageIndex || 1;
            this.$http
                .get(`${process.env.NODE_ENV}/discussionReply/pageList`, {
                    params: {
                        discussionId: this.discussionId,
                        studyGroupId: that.groupId,
                        isRead: 2,
                        replyId: 0,
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        let totalCount =
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
                        this.collapsedetail.forEach((item, index) => {
                            this.$set(item, "children", []);
                            this.$set(item, "show", false);
                            this.$set(item, "value", "");
                            // if (item.id == this.collapseIds) {
                            //     item.children = res.data.entity.list;
                            // }
                        });
                        this.isload = false;
                    }
                });
        },
        contentReplyListChildren(val, pageIndexSub) {
            this.pageIndexSub = pageIndexSub || 1;
            this.$http
                .get(`${process.env.NODE_ENV}/discussionReply/pageList`, {
                    params: {
                        studyGroupId: this.groupId,
                        discussionId: this.discussionId,
                        isRead: 2,
                        replyId: this.collapseIds,
                        pageIndex: this.pageIndexSub,
                        pageSize: this.pageSize
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        let totalCount =
                            (this.pageIndexSub - 1) * this.pageSize +
                            res.data.entity.list.length;
                        if (totalCount < res.data.entity.total) {
                            this.clickloadmorechildren = true;
                        } else {
                            this.clickloadmorechildren = false;
                        }
                        this.collapsedetail.forEach((item, index) => {
                            if (item.id == this.collapseIds) {
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
                        this.isload = false;
                    }
                });
        },
        collapseId(id) {
            this.collapseIds = id;
            this.contentReplyListChildren();
        },
        //讨论详情编辑
        discussionDetailEdit() {
            if (this.type == 4) {
                this.$router.push({
                    path: "/studentHomePage/studentMain/groupDiscussionAdmit",
                    query: {
                        type: "1",
                        courseId: this.courseId,
                        discussionId: this.discussionId,
                        groupId: this.groupId
                    }
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupDiscussionAdmit",
                    query: {
                        type: "1",
                        courseId: this.courseId,
                        discussionId: this.discussionId,
                        groupId: this.groupId
                    }
                });
            }
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
            /*height: 20px;*/
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
                display: inline-block;
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
                cursor: pointer;
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
