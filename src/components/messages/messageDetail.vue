<template>
    <div v-loading="loading" class="message-detail">
        <div class="message-detail-top">
            <div class="back-to-list" @click="backToList">
                <span>{{ $t("message.Messages.back") }}</span>
                <span class="iconfont icon-ai207" style="font-size: 25px" />
            </div>
            <div style="float: right">
                <el-tooltip
                    effect="dark"
                    placement="top"
                    :content="$t('message.Messages.unstar')"
                >
                    <span
                        v-show="
                            Number(isStar) === 1 && Number(messageType) === 1
                        "
                        class="iconfont icon-shoucang"
                        style=""
                        @click="collectItem(0)"
                    />
                </el-tooltip>
                <el-tooltip
                    effect="dark"
                    placement="top"
                    :content="$t('message.Messages.star')"
                >
                    <span
                        v-show="isStar !== 1 && Number(messageType) == 1"
                        class="iconfont icon-weishoucang"
                        style=""
                        @click="collectItem(1)"
                    />
                </el-tooltip>
                <el-button @click="forwardAll()">
                    <i class="iconfont icon-forward" style="font-size: 15px" />
                    {{ $t("message.Messages.Forward") }}
                </el-button>
                <el-button @click="dialogVisible = true">
                    <i class="iconfont icon-delete" style="font-size: 15px" />
                    {{ $t("message.Messages.Delete") }}
                </el-button>
            </div>
        </div>
        <div class="message-detail-bottom">
            <p class="message-title-course">
                <el-tooltip
                    effect="dark"
                    placement="top"
                    :content="messageSubject"
                >
                    <span class="message-detail-title">{{
                        messageSubject
                    }}</span>
                </el-tooltip>
                <el-tooltip effect="dark" placement="top" :content="courseName">
                    <span class="message-detail-coursename">{{
                        courseName
                    }}</span>
                </el-tooltip>
            </p>
            <div
                v-for="(item, bIndex) in boxDetails"
                :key="bIndex"
                class="message-detail-list"
                @mouseenter="onmouseover(item)"
                @mouseleave="onmouseout(item)"
            >
                <img
                    class="message-detail-img"
                    :src="
                        item.sendAvatarFileId
                            ? getAbsolutePath(item.sendAvatarFileId, 40, 40)
                            : '/../../../static/images/touxiang1.png'
                    "
                />
                <div class="message-detail-list-inner">
                    <p class="message-detail-name">
                        {{ item.sendUsername }}
                    </p>
                    <div>
                        <p class="message-detail-nameto">
                            {{ $t("message.Messages.to") }}
                        </p>
                        <p class="message-detail-nameto-div">
                            <span
                                v-for="(items, reIndex) in item.recList"
                                :key="reIndex"
                                class="message-detail-nameto"
                            >
                                <el-tooltip effect="dark" placement="top">
                                    <div slot="content">
                                        <span
                                            v-for="(reItems,
                                            _index) in item.recList"
                                            :key="_index"
                                        >
                                            {{ reItems.username }}</span
                                        >
                                    </div>
                                    <span
                                        >{{
                                            items.username
                                        }}&nbsp;&nbsp;&nbsp;</span
                                    >
                                </el-tooltip>
                            </span>
                        </p>
                        <span class="message-time-yesterday">{{
                            item.createTime | isYesterday(times)
                        }}</span>
                        <span class="message-detail-time">{{
                            item.createTime | formatDate
                        }}</span>
                        <span
                            v-if="item.isPrivate == 1"
                            class="message-detail-time"
                            >{{
                                $t("message.Messages.individually_sent")
                            }}</span
                        >
                    </div>
                    <p v-show="item.show" style="float: right;margin-top: -5%">
                        <span
                            class="iconfont icon-huifu"
                            @click="
                                replyMessage(
                                    item.courseId,
                                    item.subjectId,
                                    item.messageId
                                )
                            "
                        />
                        <span
                            class="iconfont icon-ReplyAll"
                            @click="
                                replyMessageAll(
                                    item.courseId,
                                    item.subjectId,
                                    item.messageId
                                )
                            "
                        />
                        <span
                            class="iconfont icon-forward"
                            @click="
                                forwardDan(
                                    item.courseId,
                                    item.subjectId,
                                    item.messageId
                                )
                            "
                        />
                        <span
                            class="iconfont icon-delete"
                            @click="deleteMessageDange(item.messageId)"
                        />
                    </p>
                    <p class="message-detail-content">
                        {{ transfHtml(item.messageText) }}
                    </p>
                </div>
            </div>
            <div style="text-align: center;width: 100%">
                <span
                    v-if="hasMoreSentList"
                    style="cursor: pointer;font-size: 17px;"
                    @click="moreSentList()"
                    >{{ $t("message.Messages.Click_load_More") }} ...</span
                >
            </div>
        </div>
        <div>
            <el-dialog
                :title="$t('message.Messages.Delete_messages')"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>{{
                    $t("message.Messages.Delete_the_selected_messages_really")
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">
                        {{ $t("message.Messages.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="subjectDelete">{{
                        $t("message.Messages.Confirm")
                    }}</el-button>
                </span>
            </el-dialog>
            <el-dialog
                :title="$t('message.Messages.Delete_messages')"
                :visible.sync="dialogVisibleDange"
                width="30%"
            >
                <span>{{
                    $t("message.Messages.Delete_the_selected_messages_really")
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleDange = false">
                        {{ $t("message.Messages.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="subjectDeleteDange">{{
                        $t("message.Messages.Confirm")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate, isYesterday } from "@/utils/date";
import defaultHead from "../../../static/images/touxiang1.png";

export default {
    name: "MessageDetail",
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
            activeName: this.$route.query.activeName,
            dialogVisible: false,
            dialogVisibleDange: false,
            subjectId: this.$route.query.subjectId,
            isStar: "",
            boxDetails: [],
            courseName: "",
            messageSubject: "",
            s: "",
            defaultHead,
            toggles: true,
            statusStar: "",
            courseId: "",
            messageType: "",
            messageId: "",
            hasMoreSentList: false,
            pageIndex: 1,
            pageSize: 20,
            roleType: "",
            userNames: "",
            times: "",
            handleOperation: false,
            messageTypes: "",
            loading: false
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    watch: {
        $route: {
            handler(newName) {
                if (
                    Number(newName.query.messageType) === 0 ||
                    Number(newName.query.messageType) === 1
                ) {
                    this.messageTypes = newName.query.messageType;
                    this.messageType = 1;
                } else if (Number(newName.query.messageType) === 2) {
                    this.messageType = 0;
                    this.messageTypes = newName.query.messageType;
                }
                this.moreSentList();
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.subjectCourse();
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
        // 返回列表
        backToList() {
            // 跳到收件箱
            if (
                Number(this.roleType) === 2 &&
                Number(this.messageTypes) === 0
            ) {
                this.$router.push({
                    path:
                        "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                });
            }
            if (
                Number(this.roleType) === 4 &&
                Number(this.messageTypes) === 0
            ) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                });
            }
            // 跳到收藏箱
            if (
                Number(this.roleType) === 2 &&
                Number(this.messageTypes) === 1
            ) {
                this.$router.push({
                    path:
                        "/homePage/messageLeft/messageList?messagetype=1&activeName=star"
                });
            }
            if (
                Number(this.roleType) === 4 &&
                Number(this.messageTypes) === 1
            ) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=1&activeName=star"
                });
            }
            // 跳到发件箱
            if (
                Number(this.roleType) === 2 &&
                Number(this.messageTypes) === 2
            ) {
                this.$router.push({
                    path:
                        "/homePage/messageLeft/messageList?messagetype=2&activeName=sent"
                });
            }
            if (
                Number(this.roleType) === 4 &&
                Number(this.messageTypes) === 2
            ) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=2&activeName=sent"
                });
            }
        },
        // 控制操作按钮的显示隐藏
        onmouseover(item) {
            this.$set(item, "show", true);
        },
        onmouseout(item) {
            this.$set(item, "show", false);
        },
        routerpath() {
            this.roleType = this.userInfoData.type;
            console.log(this.roleType);
        },
        // 关于详情页的
        async subjectCourse() {
            const params = {
                subjectId: this.subjectId
            };
            const result = await this.$getData(
                "/message/subject/query",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.courseName = result.data.entity.courseName;
                this.messageSubject = result.data.entity.messageSubject;
                this.courseId = result.data.entity.courseId;
                this.isStar = result.data.entity.isStar;
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 详情页分页
        arrayPush(tarArr, srcArr) {
            const tempTarArr = tarArr || [];
            const tempSrcArr = srcArr || [];
            for (let i = 0; i < tempSrcArr.length; i += 1) {
                tempTarArr.push(tempSrcArr[i]);
            }
            return tempTarArr;
        },
        async moreSentList() {
            this.loading = true;
            const params = {
                subjectId: this.subjectId,
                msgType: this.messageType,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            };
            const result = await this.$getData(
                "/message/oneSubjectSentRec/query",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.loading = false;
                const totalCount =
                    (this.pageIndex - 1) * this.pageSize +
                    result.data.entity.list.length;
                console.log(totalCount, result.data.entity.total);
                if (totalCount < result.data.entity.total) {
                    this.hasMoreSentList = true;
                    this.pageIndex = this.pageIndex + 1;
                } else {
                    this.hasMoreSentList = false;
                }
                if (this.pageIndex === 1) {
                    this.boxDetails = result.data.entity.list;
                    this.boxDetails.forEach(item => {
                        this.$set(item, "show", false);
                    });
                } else {
                    this.boxDetails.forEach(item => {
                        this.$set(item, "show", false);
                    });
                    this.arrayPush(this.boxDetails, result.data.entity.list);
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 详情页的
        async boxDetail() {
            this.loading = true;
            const params = {
                subjectId: this.subjectId,
                msgType: this.messageType,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            };
            const result = await this.$getData(
                "/message/oneSubjectSentRec/query",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.loading = false;
                this.boxDetails = result.data.entity.list;
                this.boxDetails.forEach(item => {
                    this.$set(item, "show", false);
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 默认头像的
        getAbsolutePath(relativePath, width, height) {
            if (typeof relativePath === "undefined") return defaultHead;
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        // 关于顶部收藏的
        async collectItem(status) {
            const params = {
                subjectIds: [this.subjectId],
                status
            };
            const result = await this.$getData(
                "/messageStar/add",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.subjectCourse();
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 关于全局转发的
        forwardAll() {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 2,
                        courseId: this.courseId,
                        subjectId: this.subjectId,
                        messageType: this.messageTypes,
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
                        courseId: this.courseId,
                        subjectId: this.subjectId,
                        messageType: this.messageTypes,
                        activeName: this.activeName
                    }
                });
            }
        },
        // 关于全局删除的
        async subjectDelete() {
            // 收件箱的删除
            if (Number(this.messageType) === 1) {
                const result = await this.$getData(
                    "/messageRec/deletes",
                    [this.subjectId],
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    if (
                        Number(this.roleType) === 2 &&
                        Number(this.messageTypes) === 0
                    ) {
                        this.$router.push({
                            path:
                                "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                        });
                    }
                    if (
                        Number(this.roleType) === 4 &&
                        Number(this.messageTypes) === 0
                    ) {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                        });
                    }
                    if (
                        Number(this.roleType) === 2 &&
                        Number(this.messageTypes) === 1
                    ) {
                        this.$router.push({
                            path:
                                "/homePage/messageLeft/messageList?messagetype=1&activeName=star"
                        });
                    }
                    if (
                        Number(this.roleType) === 4 &&
                        Number(this.messageTypes) === 1
                    ) {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=1&activeName=star"
                        });
                    }
                    this.dialogVisible = false;
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
            // 发件箱的删除
            if (Number(this.messageType) === 0) {
                const result = await this.$getData(
                    "/messageSent/deletes",
                    [this.subjectId],
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    if (Number(this.roleType) === 2) {
                        this.$router.push({
                            path:
                                "/homePage/messageLeft/messageList?messagetype=2&activeName=sent"
                        });
                    } else {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=2&activeName=sent"
                        });
                    }
                    this.dialogVisible = false;
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
        },
        // 关于单个删除的
        deleteMessageDange(messageId) {
            this.messageId = messageId;
            this.dialogVisibleDange = true;
        },
        async subjectDeleteDange() {
            const params = {
                messageId: this.messageId,
                type: this.messageType
            };
            const result = await this.$getData(
                "/message/item/edit",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.dialogVisibleDange = false;
                this.boxDetail();
                // 收件箱的
                if (
                    Number(this.roleType) === 2 &&
                    this.boxDetails.length === 1 &&
                    Number(this.messageTypes) === 0
                ) {
                    this.$router.push({
                        path:
                            "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                    });
                }
                if (
                    Number(this.roleType) === 4 &&
                    this.boxDetails.length === 1 &&
                    Number(this.messageTypes) === 0
                ) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                    });
                }
                // 收藏箱的
                if (
                    Number(this.roleType) === 2 &&
                    this.boxDetails.length === 1 &&
                    Number(this.messageTypes) === 1
                ) {
                    this.$router.push({
                        path:
                            "/homePage/messageLeft/messageList?messagetype=1&activeName=star"
                    });
                }
                if (
                    Number(this.roleType) === 4 &&
                    this.boxDetails.length === 1 &&
                    Number(this.messageTypes) === 1
                ) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=1&activeName=star"
                    });
                }
                // 发件箱的
                if (
                    Number(this.roleType) === 2 &&
                    this.boxDetails.length === 1 &&
                    Number(this.messageTypes) === 2
                ) {
                    this.$router.push({
                        path:
                            "/homePage/messageLeft/messageList?messagetype=2&activeName=sent"
                    });
                }
                if (
                    Number(this.roleType) === 4 &&
                    this.boxDetails.length === 1 &&
                    Number(this.messageTypes) === 2
                ) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=2&activeName=sent"
                    });
                }
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
        // 关于单个回复的
        replyMessage(courseId, subjectId, messageId) {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 0,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageTypes,
                        activeName: this.activeName
                    }
                });
            } else {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 0,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageTypes,
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
                        messageType: this.messageTypes,
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
                        messageType: this.messageTypes,
                        activeName: this.activeName
                    }
                });
            }
        },
        // 关于单个转发的
        forwardDan(courseId, subjectId, messageId) {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/messageLeft/messageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 3,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageTypes,
                        activeName: this.activeName
                    }
                });
            } else {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageAdmit",
                    query: {
                        reply: 0,
                        replyTypes: 3,
                        courseId,
                        subjectId,
                        messageId,
                        messageType: this.messageTypes,
                        activeName: this.activeName
                    }
                });
            }
        }
    }
};
</script>

<style scoped lang="less">
.message-detail {
    .iconfont {
        cursor: pointer;
    }
    .message-detail-top {
        margin-top: 10px;
        border-bottom: 1px solid #aaaaaa;
        padding-bottom: 4.5%;
    }
    .back-to-list {
        float: left;
        font-size: 23px;
        font-family: ArialMT;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: inline-block;
        cursor: pointer;
        margin-top: 7px;
    }
    .icon-shoucang {
        color: yellow;
        font-size: 21px;
        margin-right: 10px;
        cursor: pointer;
    }
    .icon-weishoucang {
        color: #606266;
        font-size: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    .message-detail-bottom {
        padding-top: 2%;
        .message-detail-title {
            font-size: 14px;
            font-family: ArialMT;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            max-width: 27%;
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .message-detail-coursename {
            font-size: 14px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-left: 20%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 25%;
            display: inline-block;
        }
        .message-detail-list:hover {
            background: #f4f5fa;
        }
        .message-detail-list {
            margin-top: 2%;
            padding: 2%;
            .message-detail-img {
                float: left;
                width: 40px;
                height: 40px;
                border-radius: 4px;
            }
            .message-detail-name {
                font-size: 16px;
                font-family: Arial-BoldMT;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }
            .message-detail-list-inner {
                margin-left: 60px;
            }
            .message-detail-nameto {
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                display: inline-block;
                display: inline-block;
            }
            .message-detail-nameto-div {
                display: inline-block;
                width: 25%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                top: 5px;
            }
            .message-time-yesterday {
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-left: 1%;
            }
            .message-detail-time {
                font-size: 14px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-left: 1%;
            }
            .message-detail-content {
                font-size: 14px;
                font-family: ArialMT;
                color: rgba(102, 102, 102, 1);
                width: 100%;
                word-wrap: break-word;
            }
        }
    }
}
</style>
