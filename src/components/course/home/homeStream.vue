<template>
    <div>
        <!--eslint-disable-->
        <h1 class="activeTitle">
            {{ $t("message.recent_activity") }}
        </h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('message.Dialog')" name="first">
                <div v-if="dialogList.length > 0">
                    <ul class="tab-list">
                        <li v-for="(item, index) in dialogList" :key="index">
                            <span class="tab-icon">
                                <i
                                    v-show="item.type == 1"
                                    class="iconfont icon-liaotian"
                                />
                                <i
                                    v-show="item.type == 2"
                                    class="iconfont icon-liaotian"
                                />
                            </span>
                            <div class="tab-content">
                                <div class="tab-content-main">
                                    <!-- <span v-show = "item.type == 1" class="content-left"> reply you : </span>
                  <span v-show = "item.type == 2" class="content-left"> re-Comment : </span>
                  <div v-html="item.content" class="reply-content"></div> -->

                                    <!-- width="300" -->
                                    <div class="reply-content msgContent">
                                        <el-popover
                                            :popper-class="popBox"
                                            placement="top-start"
                                            width="300"
                                            trigger="hover"
                                        >
                                            <p>
                                                {{ transfHtml(item.content) }}
                                            </p>
                                            <p slot="reference" class="msgText">
                                                <span v-show="item.type == 1">
                                                    {{
                                                        $t("message.Reply_you")
                                                    }}
                                                    :
                                                </span>
                                                <span v-show="item.type == 2">
                                                    {{
                                                        $t("message.re_Comment")
                                                    }}
                                                    :
                                                </span>
                                                {{ transfHtml(item.content) }}
                                            </p>
                                        </el-popover>
                                    </div>
                                </div>
                                <p class="mark-text">
                                    <span> From: {{ item.username }} </span>
                                    <span style="margin-left: 24px">
                                        {{ item.createTime | formatDate }}
                                    </span>
                                </p>
                                <p class="mark-title">
                                    <a
                                        v-show="item.type == 1"
                                        class="item-title"
                                        @click="turnPage(item)"
                                    >
                                        {{ item.discussionTitle }}
                                    </a>
                                    <a
                                        v-show="item.type == 2"
                                        class="item-title"
                                        @click="turnPage(item)"
                                    >
                                        {{ item.assignmentGroupItemTitle }}
                                    </a>
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p v-show="dialogMore" class="moreTag">
                        <a @click="getDialogList(dialogPageIndex + 1)">
                            {{ $t("message.HOME.more") }}
                        </a>
                    </p>
                </div>
                <div v-else class="noText">
                    {{ $t("message.HOME.Temporarily_no_data") }}
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.HOME.Message')" name="second">
                <div v-if="messageList.length > 0">
                    <ul class="tab-list">
                        <li v-for="(item, index) in messageList" :key="index">
                            <span class="tab-icon">
                                <i class="iconfont icon-Announcement" />
                            </span>
                            <div class="tab-content">
                                <div class="reply-content msgContent">
                                    <el-popover
                                        :popper-class="popBox"
                                        placement="top-start"
                                        width="300"
                                        trigger="hover"
                                    >
                                        <p>{{ transfHtml(item.content) }}</p>
                                        <p slot="reference" class="msgText">
                                            {{ transfHtml(item.content) }}
                                        </p>
                                    </el-popover>
                                </div>
                                <p class="mark-text">
                                    <span
                                        >{{ $t("message.HOME.From") }}:
                                        {{ item.username }}
                                    </span>
                                    <span style="margin-left: 24px">
                                        {{ item.createTime | formatDate }}
                                    </span>
                                </p>
                                <p class="mark-title">
                                    <a
                                        class="item-title"
                                        @click="tiaoPage(item)"
                                    >
                                        {{ item.announceTitle }}
                                    </a>
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p v-show="mesgMore" class="moreTag">
                        <a @click="getMessgList(messagePageIndex + 1)">
                            {{ $t("message.HOME.more") }}
                        </a>
                    </p>
                </div>
                <div v-else class="noText">
                    {{ $t("message.HOME.Temporarily_no_data") }}
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.HOME.Notification')" name="third">
                <div v-if="notifyList.length">
                    <ul class="tab-list">
                        <li v-for="(item, index) in notifyList" :key="index">
                            <span class="tab-icon">
                                <i
                                    v-show="item.originType == 1"
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-show="item.originType == 2"
                                    class="iconfont icon-liaotian"
                                />
                                <i
                                    v-show="item.originType == 3"
                                    class="iconfont icon--xiugaineirong"
                                />
                            </span>
                            <div class="tab-content">
                                <p>
                                    {{
                                        item.originType == 1
                                            ? $t("message.Assignment")
                                            : item.originType == 2
                                            ? $t("message.Discussions")
                                            : $t("message.Quize")
                                    }}
                                    {{
                                        item.opType == 1
                                            ? $t("message.Created")
                                            : $t("message.Content_Changed")
                                    }}
                                </p>
                                <p class="titleMark">
                                    <a class="sTitle" @click="jumpPage(item)">
                                        {{ item.title }}
                                    </a>
                                    <span
                                        style="margin-left: 24px; color:#999; font-size: 14px"
                                    >
                                        {{ item.createTime | formatDate }}
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p v-show="notifyMore" class="moreTag">
                        <a @click="getNotifyList(notifyPageIndex + 1)">
                            {{ $t("message.HOME.more") }}
                        </a>
                    </p>
                </div>
                <div v-else class="noText">
                    {{ $t("message.HOME.Temporarily_no_data") }}
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/date";
import module from "@/components/course/modules.vue";
import assignments from "@/components/course/assignments2.vue";

export default {
    filters: {
        formatDate(time) {
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    props: ["roleType"],
    data() {
        return {
            popBox: "popContain",
            currentPro: "ACTIVE_STREAM",
            dialogVisible: false,
            isUnDisable: false,
            isPuDisable: false,
            unActive: "primary",
            publisActive: "",
            showPublish: true,
            isPublic: true,
            activeName: "first",
            courseId: "",
            dialogPageIndex: 1,
            messagePageIndex: 1,
            notifyPageIndex: 1,
            dialogList: [],
            dialogMore: true,
            mesgMore: true,
            messageList: [],
            notifyList: [],
            notifyMore: true,
            pageSize: 10,
            courseData: []
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    created() {
        // console.log('roleType', this.roleType)
        this.courseId = this.$route.query.courseId;
        this.getDialogList(this.dialogPageIndex);
        this.getMessgList(this.messagePageIndex);
        this.getNotifyList(this.notifyPageIndex);
        this.getCourseData();
    },
    methods: {
        handleClick() {},
        handleClose() {
            this.dialogVisible = false;
        },
        // 配置首页模块
        async changePro(item) {
            const params = { courseId: this.courseId, homepage: item };
            const res = await this.$getData(
                "/course/homepage/edit",
                params,
                "post"
            );
            if (res.data.code == 200) {
            }
        },
        async changeState(state) {
            const params = { id: this.courseId, status: Number(state) };
            const res = await this.$getData(
                "/course/statusToggle/edit",
                params,
                "post"
            );
            if (res.data.code == 200) {
                this.getCourseData();
            }
        },
        // 查询课程数据
        async getCourseData() {
            const params = { courseId: this.courseId };
            const res = await this.$getData(
                "/course/homepage/query",
                params,
                "get"
            );
            if (res.data.code == 200) {
                this.courseData = res.data.entity;
                if (this.courseData.isConcluded == 1) {
                    this.showPublish = false;
                } else if (this.courseData.isConcluded == 0) {
                    if (this.courseData.status == 0) {
                        this.publisActive = "";
                        this.unActive = "primary";
                        this.isUnDisable = false;
                        this.isPuDisable = false;
                    } else if (this.courseData.status == 1) {
                        this.publisActive = "primary";
                        this.unActive = "";
                        if (this.courseData.gradeTaskSubmittedCount > 0) {
                            this.isUnDisable = true;
                            this.isPuDisable = true;
                        } else {
                            this.isUnDisable = false;
                            this.isPuDisable = false;
                        }
                    }
                }
            }
        },
        // 查询对话列表
        async getDialogList(pageIndex) {
            pageIndex = pageIndex || 1;
            const params = {
                courseId: this.courseId,
                pageIndex,
                pageSize: this.pageSize
            };
            const res = await this.$getData(
                "/courseDialog/pageList",
                params,
                "get"
            );
            if (res.data.code == 200) {
                const totalCount =
                    (pageIndex - 1) * this.pageSize +
                    res.data.entity.list.length;
                if (totalCount < res.data.entity.total) {
                    this.dialogMore = true;
                } else {
                    this.dialogMore = false;
                }
                if (this.pageIndex === 1) {
                    this.dialogList = res.data.entity.list;
                } else {
                    this.arrayPush(this.dialogList, res.data.entity.list);
                }
                this.dialogPageIndex = res.data.entity.pageIndex;
            }
        },
        // 查询message消息列表
        async getMessgList(pageIndex) {
            pageIndex = pageIndex || 1;
            const params = {
                courseId: this.courseId,
                pageIndex,
                pageSize: this.pageSize
            };
            const res = await this.$getData(
                "/courseMessage/pageList",
                params,
                "get"
            );
            if (res.data.code == 200) {
                const totalCount =
                    (pageIndex - 1) * this.pageSize +
                    res.data.entity.list.length;
                if (totalCount < res.data.entity.total) {
                    this.mesgMore = true;
                } else {
                    this.mesgMore = false;
                }
                if (pageIndex == 1) {
                    this.messageList = res.data.entity.list;
                } else {
                    this.arrayPush(this.messageList, res.data.entity.list);
                }
                this.messagePageIndex = res.data.entity.pageIndex;
            }
        },
        // 查询 Notification列表
        async getNotifyList(pageIndex) {
            pageIndex = pageIndex;
            const params = {
                courseId: this.courseId,
                pageIndex,
                pageSize: this.pageSize
            };
            const res = await this.$getData(
                "/courseNotify/pageList",
                params,
                "get"
            );
            if (res.data.code == 200) {
                const totalCount =
                    (pageIndex - 1) * this.pageSize +
                    res.data.entity.list.length;
                if (totalCount < res.data.entity.total) {
                    this.notifyMore = true;
                } else {
                    this.notifyMore = false;
                }
                if (pageIndex == 1) {
                    this.notifyList = res.data.entity.list;
                } else {
                    this.arrayPush(this.notifyList, res.data.entity.list);
                }
                this.notifyPageIndex = res.data.entity.pageIndex;
            }
        },
        // notify 跳转页面
        async jumpPage(item) {
            if (this.roleType == "teacher") {
                if (item.originType == 1) {
                    const params = { data: item.originId };
                    const res = await this.$getData(
                        "/assignmentGroupItem/get",
                        params,
                        "get"
                    );
                    if (res.data.code == 200) {
                        this.$router.push({
                            path: "assignmentPreView",
                            query: {
                                courseId: item.courseId,
                                assignmentId: item.originId,
                                assignmentGroupId:
                                    res.data.entity.assignmentGroupId,
                                assignmentGroupItemId: res.data.entity.id,
                                name: item.title
                            }
                        });
                    }
                    // 作业
                } else if (item.originType == 2) {
                    // 讨论
                    this.$router.push({
                        path: "discussionDeatilCourse",
                        query: {
                            courseId: this.courseId,
                            discussionId: item.originId,
                            name: item.title
                        }
                    });
                } else if (item.originType == 3) {
                    // 测验
                    this.$router.push({
                        path: "courseQuizz",
                        query: {
                            courseId: this.courseId,
                            data: item.originId,
                            name: item.title
                        }
                    });
                }
            } else if (this.roleType == "student") {
                if (item.originType == 1) {
                    this.$router.push({
                        path: "studentAssignmentSubmit",
                        query: {
                            courseId: this.courseId,
                            assignmentId: item.originId,
                            name: item.title
                        }
                    });
                    // 作业
                } else if (item.originType == 2) {
                    // 讨论
                    this.$router.push({
                        path: "studentCourseDiscussionDetail",
                        query: {
                            courseId: this.courseId,
                            discussionId: item.originId,
                            name: item.title
                        }
                    });
                } else if (item.originType == 3) {
                    // 测验
                    this.$router.push({
                        path: "quizzDetail",
                        query: {
                            courseId: this.courseId,
                            quizDetailId: item.originId,
                            name: item.title
                        }
                    });
                }
            }
        },
        // dialog 跳转页面
        turnPage(item) {
            // console.log('item111', item)
            if (this.roleType == "student") {
                // 学生
                if (item.type == 1) {
                    this.$router.push({
                        path: "studentCourseDiscussionDetail",
                        query: {
                            courseId: this.courseId,
                            discussionId: item.discussionId,
                            name: item.discussionTitle
                        }
                    });
                } else if (item.type == 2) {
                }
            } else if (this.roleType == "teacher") {
                if (item.type == 1) {
                    this.$router.push({
                        path: "discussionDeatilCourse",
                        query: {
                            courseId: this.courseId,
                            discussionId: item.discussionId,
                            name: item.discussionTitle
                        }
                    });
                } else if (item.type == 2) {
                }
            }
        },
        // message 跳转页面
        tiaoPage(item) {
            if (this.roleType == "teacher") {
                this.$router.push({
                    path: "announcementDetail",
                    query: {
                        courseId: this.courseId,
                        announceId: item.announceId
                    }
                });
            } else if (this.roleType == "student") {
                this.$router.push({
                    path: "studentAnnouncementDeatil",
                    query: {
                        courseId: this.courseId,
                        announceId: item.announceId
                    }
                });
            }
        },

        arrayPush(tarArr, srcArr) {
            tarArr = tarArr || [];
            srcArr = srcArr || [];
            for (let i = 0; i < srcArr.length; i++) {
                tarArr.push(srcArr[i]);
            }
            return tarArr;
        },
        transfHtml(str) {
            const dd = str.replace(/<\/?.+?>/g, "");
            let dds = dd;
            dds = dds.replace(/&nbsp;/, " ");
            return dds;
        }
    },
    components: {
        module,
        assignments
    }
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
@import "./home.less";
</style>
