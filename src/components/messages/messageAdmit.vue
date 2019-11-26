<template>
    <div class="message-admit">
        <div class="write-message-box">
            <span v-if="reply != 0" class="write-message">{{
                $t("message.Messages.Write_a_New_Message")
            }}</span>
            <span
                v-if="replyTypes == 2 || replyTypes == 3"
                class="write-message"
                >{{ $t("message.Messages.Forward_a_Message") }}</span
            >
            <span
                v-if="replyTypes == 0 || replyTypes == 1"
                class="write-message"
                >{{ $t("message.Messages.Reply_a_Message") }}</span
            >
        </div>
        <div class="message-form">
            <el-form
                ref="form"
                :model="form"
                label-width="100px"
                :rules="rules"
            >
                <el-form-item
                    v-if="reply != 0"
                    :label="$t('message.Messages.course')"
                    prop="courseId"
                >
                    <el-select
                        v-model="form.courseId"
                        :popper-class="discussion_select"
                        :placeholder="$t('message.Messages.Select_a_Course')"
                        style="width: 50%"
                        @change="courseChange"
                    >
                        <el-option
                            v-for="item in course"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="reply == 0"
                    :label="$t('message.Messages.course') + ':'"
                >
                    <span class="message-admit-course">{{ courseName }}</span>
                </el-form-item>
                <el-form-item
                    :label="$t('message.Messages.Message_to')"
                    prop="recDTO"
                >
                    <el-select
                        v-model="form.recDTO"
                        :popper-class="discussion_select"
                        placeholder=""
                        :multiple="true"
                        style="width: 50%"
                    >
                        <el-option-group
                            v-for="sectionUser in sectionUserList"
                            :key="sectionUser.id"
                            :label="sectionUser.label"
                        >
                            <el-option
                                v-for="item in sectionUser.options"
                                v-show="!item.isSelected"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id + '_' + item.type + '_'"
                            />
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox-group v-model="form.isPrivate">
                        <el-checkbox
                            :label="
                                $t(
                                    'message.Messages.Send_an_individual_message_to_each_recipient'
                                )
                            "
                            name="type"
                        />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    v-if="reply != 0"
                    :label="$t('message.Messages.Subject')"
                    style="width: 56%"
                    prop="messageSubject"
                >
                    <el-input v-model="form.messageSubject" />
                </el-form-item>
                <el-form-item
                    v-if="reply == 0"
                    :label="$t('message.Messages.Subject') + ':'"
                >
                    <span class="message-admit-subject">{{
                        messageSubject
                    }}</span>
                </el-form-item>
                <div class="editor">
                    <ckeditor
                        v-model="form.messageText"
                        :editor="editor"
                        :config="editorConfig"
                    />
                </div>
                <div
                    v-show="
                        reply == 0 &&
                            (replyTypes == 0 || replyTypes == 1) &&
                            historyMessages != ''
                    "
                    class="message-admit-history"
                >
                    <div
                        v-for="item in historyMessagesFifty"
                        :key="item.id"
                        class="message-detail-list-inner"
                    >
                        <p class="message-detail-name">
                            {{ item.sendUsername }}
                        </p>
                        <p>
                            <span class="message-detail-nameto">to</span>
                            <span class="message-detail-nameto-span">
                                <span
                                    v-for="items in item.recList"
                                    :key="items.id"
                                    class="message-detail-nameto"
                                    >{{ items.username }}&nbsp;&nbsp;</span
                                >
                            </span>
                            <span class="message-time-yesterday">{{
                                item.createTime | isYesterday(times)
                            }}</span>
                            <span class="message-detail-time">{{
                                item.createTime | formatDate
                            }}</span>
                        </p>
                        <p class="message-detail-content">
                            {{ transfHtml(item.messageText) }}
                        </p>
                    </div>
                </div>
                <div
                    v-show="
                        reply == 0 && replyTypes == 2 && historyForwards != ''
                    "
                    class="message-admit-history"
                >
                    <div
                        v-for="item in historyForwardsFifty"
                        :key="item.id"
                        class="message-detail-list-inner"
                    >
                        <p class="message-detail-name">
                            {{ item.sendUsername }}
                        </p>
                        <p>
                            <span class="message-detail-nameto">to</span>
                            <span class="message-detail-nameto-span">
                                <span
                                    v-for="items in item.recList"
                                    :key="items.id"
                                    class="message-detail-nameto"
                                    >{{ items.username }}&nbsp;&nbsp;</span
                                >
                            </span>
                            <span class="message-time-yesterday">{{
                                item.createTime | isYesterday(times)
                            }}</span>
                            <span class="message-detail-time">{{
                                item.createTime | formatDate
                            }}</span>
                        </p>
                        <p class="message-detail-content">
                            {{ transfHtml(item.messageText) }}
                        </p>
                    </div>
                </div>
                <div
                    v-show="
                        reply == 0 &&
                            replyTypes == 3 &&
                            historyForwardDans != ''
                    "
                    class="message-admit-history"
                >
                    <div class="message-detail-list-inner">
                        <p class="message-detail-name">
                            {{ historyForwardDans.sendUsername }}
                        </p>
                        <p>
                            <span class="message-detail-nameto">to</span>
                            <span class="message-detail-nameto-span">
                                <span
                                    v-for="item in historyForwardDans.recList"
                                    :key="item.id"
                                    class="message-detail-nameto"
                                    >{{ item.username }}&nbsp;&nbsp;</span
                                >
                            </span>
                            <span class="message-time-yesterday">{{
                                historyForwardDans.createTime
                                    | isYesterday(times)
                            }}</span>
                            <span class="message-detail-time">{{
                                historyForwardDans.createTime | formatDate
                            }}</span>
                        </p>
                        <p class="message-detail-content">
                            {{ transfHtml(historyForwardDans.messageText) }}
                        </p>
                    </div>
                </div>
                <div
                    v-if="historyMessages.length - 15 > 0"
                    class="message-admit-more"
                >
                    {{ historyMessages.length - 15 }}
                    {{
                        $t(
                            "message.Messages.more_messages_will_be_sent_but_undisplayed_here"
                        )
                    }}
                </div>
                <div
                    v-if="historyForwards.length - 15 > 0"
                    class="message-admit-more"
                >
                    {{ historyForwards.length - 15 }}
                    {{
                        $t(
                            "message.Messages.more_messages_will_be_sent_but_undisplayed_here"
                        )
                    }}
                </div>
                <el-form-item style="margin-top: 3%;margin-left: 20%">
                    <el-button @click="messageCancel">
                        {{ $t("message.Messages.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="onSubmitMessage('form')">
                        {{ $t("message.Messages.Send") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapGetters } from "vuex";
import { formatDate, isYesterday } from "@/utils/date";

export default {
    name: "MessageAdmit",
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
            reply: Number(this.$route.query.reply),
            replyTypes: Number(this.$route.query.replyTypes),
            courseIds: Number(this.$route.query.courseId),
            subjectId: Number(this.$route.query.subjectId),
            messageId: Number(this.$route.query.messageId),
            messageType: Number(this.$route.query.messageType),
            discussion_select: "discussion_select",
            form: {
                messageSubject: "",
                courseId: "",
                isPrivate: "",
                messageText: "",
                recDTO: [],
                resDTO: {
                    allStudents: "",
                    sectionIds: [],
                    userIds: []
                },
                // 回显
                rehDTO: [],
                messageSubjectMaxLength: 300
            },
            courseIdAll: "",
            ids: [],
            content: "",
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            course: [],
            sectionUserList: [],
            value: "",
            historyMessages: [],
            s: "",
            courseName: "",
            messageSubject: "",
            messageRelatedIds: [],
            historyForwards: [],
            roleType: "",
            historyMessagesFifty: [],
            historyForwardsFifty: [],
            historyForwardDans: [],
            times: "",
            rules: {
                courseId: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Messages.Course_scop_is_required"
                        ),
                        trigger: "change"
                    }
                ],
                recDTO: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Messages.Recievers_is_required"
                        ),
                        trigger: "change"
                    }
                ],
                messageSubject: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Messages.Subject_is_required"
                        ),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    watch: {
        "form.courseId": {
            handler(newName, oldName) {
                if (oldName) {
                    if (newName) {
                        this.form.recDTO = [];
                    }
                }
            },
            deep: true,
            immediate: true
        },
        "form.messageSubject": {
            handler(newName) {
                if (newName.length > this.form.messageSubjectMaxLength) {
                    this.form.messageSubject = String(
                        this.form.messageSubject
                    ).slice(0, this.form.messageSubjectMaxLength);
                }
            },
            deep: true,
            immediate: true
        },
        $route: {
            handler(newName, oldName) {
                this.reply = Number(newName.query.reply);
                this.replyTypes = Number(newName.query.replyTypes);
                if (oldName) {
                    if (newName) {
                        this.form.recDTO = [];
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.getCourseData();
        if (this.reply === 0) {
            this.assignDataList();
        }
        this.historyMessage();
        this.subjectCourse();
        this.historyPeople();
        this.historyForward();
        this.routerpath();
        this.historyForwardDan();
    },
    methods: {
        routerpath() {
            this.roleType = this.userInfoData.type;
            // console.log(this.roleType === 2);
        },
        // 获取课程的接口
        async getCourseData() {
            const result = await this.$getData(
                "/course/owner/query",
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const course = [];
                result.data.entity.forEach(item => {
                    if (item.isConcluded === 0) {
                        course.push(item);
                    }
                });
                console.log(course);
                this.course = course;
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        courseChange(selVal) {
            this.form.courseId = selVal;
            this.assignDataList();
        },
        // 获取分配的接口
        async assignDataList() {
            if (this.reply === 0) {
                this.courseIdAll = this.courseIds;
            } else {
                this.courseIdAll = this.form.courseId;
            }
            const result = await this.$getData(
                `/assign/get?data=${this.courseIdAll}`,
                null,
                "get"
            );
            if (result.data.code === 200) {
                // 刷新子项
                const data = result.data.entity;
                const arr = [];
                if (this.roleType === 2) {
                    arr.push({
                        type: 1,
                        label: "All students",
                        options: [
                            {
                                id: "",
                                name: "All students",
                                type: 1
                            }
                        ]
                    });
                }
                if (this.roleType === 2) {
                    if (result.data.entity.sections.length > 0) {
                        // result.data.entity.sections.forEach((item) => {
                        //     item.isSelected = false;
                        // });
                        result.data.entity.users = result.data.entity.users.map(
                            item =>
                                Object.assign({}, item, { isSelected: false })
                        );
                        arr.push({
                            type: 2,
                            label: this.$t("message.Sections"),
                            options: data.sections
                        });
                    }
                }
                if (result.data.entity.users.length > 0) {
                    // result.data.entity.users.forEach((item) => {
                    //     item.isSelected = false;
                    // });
                    result.data.entity.users = result.data.entity.users.map(
                        item => Object.assign({}, item, { isSelected: false })
                    );
                    arr.push({
                        type: 3,
                        label: "People",
                        options: data.users
                    });
                }
                this.sectionUserList = arr;
                // console.log(this.sectionUserList)
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 新建消息及回复及转发
        async onSubmitMessage(form) {
            // 转发的时候
            this.$refs[form].validate(async valid => {
                if (valid) {
                    if (
                        this.reply === 0 &&
                        (this.replyTypes === 2 || this.replyTypes === 3)
                    ) {
                        this.form.recDTO.forEach(item => {
                            const type = item.split("_")[1];
                            if (Number(type) === 1) {
                                // if (this.form.resDTO.allStudents === '') {
                                //     this.form.resDTO.allStudents = 0;
                                // } else {
                                this.form.resDTO.allStudents = 1;
                                // }
                            }
                            if (Number(type) === 2) {
                                this.form.resDTO.sectionIds.push(
                                    item.split("_")[0]
                                );
                            }
                            if (Number(type) === 3) {
                                this.form.resDTO.userIds.push(
                                    item.split("_")[0]
                                );
                            }
                        });
                        if (this.reply === 0 && this.replyTypes === 2) {
                            this.historyForwards.forEach(item => {
                                this.messageRelatedIds.push(item.messageId);
                            });
                        }
                        if (this.reply === 0 && this.replyTypes === 3) {
                            this.messageRelatedIds.push(
                                this.historyForwardDans.messageId
                            );
                        }
                        let subjectIds = "";
                        if (this.subjectId === "") {
                            subjectIds = 0;
                        } else {
                            subjectIds = this.subjectId;
                        }
                        const params = {
                            recDTO: {
                                allStudents: this.form.resDTO.allStudents,
                                sectionIds: this.form.resDTO.sectionIds,
                                userIds: this.form.resDTO.userIds
                            },
                            isPrivate: Number(this.form.isPrivate),
                            subjectId: subjectIds,
                            courseId: this.courseIds,
                            messageSubject: this.messageSubject,
                            messageText: this.form.messageText,
                            messageRelatedIds: this.messageRelatedIds
                        };
                        const result = await this.$getData(
                            "/message/add",
                            params,
                            "post"
                        );
                        if (result.data.code === 200) {
                            this.$message({
                                message: this.$t(
                                    "message.Messages.Message_sending_successfull"
                                ),
                                type: "success"
                            });
                            if (this.roleType === 2 && this.messageType === 0) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                                });
                            }
                            if (this.roleType === 4 && this.messageType === 0) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                                });
                            }
                            if (this.roleType === 2 && this.messageType === 1) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=1&activeName=star"
                                });
                            }
                            if (this.roleType === 4 && this.messageType === 1) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=1&activeName=star"
                                });
                            }
                            if (this.roleType === 2 && this.messageType === 2) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=2&activeName=sent"
                                });
                            }
                            if (this.roleType === 4 && this.messageType === 2) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=2&activeName=sent"
                                });
                            }
                        } else {
                            this.$message({
                                message: result.data.message,
                                type: "error"
                            });
                        }
                    }
                }
            });
            // 回复的时候
            this.$refs[form].validate(async valid => {
                if (valid) {
                    if (
                        this.reply === 0 &&
                        (this.replyTypes === 0 || this.replyTypes === 1)
                    ) {
                        this.form.recDTO.forEach(item => {
                            const type = item.split("_")[1];
                            if (Number(type) === 1) {
                                // if (this.form.resDTO.allStudents === '') {
                                //     this.form.resDTO.allStudents = 0;
                                // } else {
                                this.form.resDTO.allStudents = 1;
                                // }
                            }
                            if (Number(type) === 2) {
                                this.form.resDTO.sectionIds.push(
                                    item.split("_")[0]
                                );
                            }
                            if (Number(type) === 3) {
                                this.form.resDTO.userIds.push(
                                    item.split("_")[0]
                                );
                            }
                        });
                        if (this.reply === 0) {
                            this.historyMessages.forEach(item => {
                                this.messageRelatedIds.push(item.messageId);
                            });
                        }
                        let subjectIds = "";
                        if (this.subjectId === "") {
                            subjectIds = 0;
                        } else {
                            subjectIds = this.subjectId;
                        }
                        const params = {
                            recDTO: {
                                allStudents: this.form.resDTO.allStudents,
                                sectionIds: this.form.resDTO.sectionIds,
                                userIds: this.form.resDTO.userIds
                            },
                            isPrivate: Number(this.form.isPrivate),
                            subjectId: subjectIds,
                            courseId: this.courseIds,
                            messageSubject: this.messageSubject,
                            messageText: this.form.messageText,
                            messageRelatedIds: this.messageRelatedIds
                        };
                        const result = await this.$getData(
                            "/message/add",
                            params,
                            "post"
                        );
                        if (result.data.code === 200) {
                            this.$message({
                                message: this.$t(
                                    "message.Messages.Message_sending_successfull"
                                ),
                                type: "success"
                            });
                            if (this.roleType === 2 && this.messageType === 0) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                                });
                            }
                            if (this.roleType === 4 && this.messageType === 0) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                                });
                            }
                            if (this.roleType === 2 && this.messageType === 1) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=1&activeName=star"
                                });
                            }
                            if (this.roleType === 4 && this.messageType === 1) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=1&activeName=star"
                                });
                            }
                            if (this.roleType === 2 && this.messageType === 2) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=2&activeName=sent"
                                });
                            }
                            if (this.roleType === 4 && this.messageType === 2) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=2&activeName=sent"
                                });
                            }
                        } else {
                            this.$message({
                                message: result.data.message,
                                type: "error"
                            });
                        }
                    }
                }
            });
            // 添加消息
            this.$refs[form].validate(async valid => {
                if (valid) {
                    if (this.reply !== 0) {
                        this.form.recDTO.forEach(item => {
                            const type = item.split("_")[1];
                            if (Number(type) === 1) {
                                // console.log(this.form.recDTO.allStudents)
                                // if (this.form.resDTO.allStudents == '') {
                                //     this.form.resDTO.allStudents = 0;
                                // } else {
                                this.form.resDTO.allStudents = 1;
                                // }
                            }
                            if (Number(type) === 2) {
                                this.form.resDTO.sectionIds.push(
                                    item.split("_")[0]
                                );
                            }
                            if (Number(type) === 3) {
                                this.form.resDTO.userIds.push(
                                    item.split("_")[0]
                                );
                            }
                        });
                        const params = {
                            recDTO: {
                                allStudents: this.form.resDTO.allStudents,
                                sectionIds: this.form.resDTO.sectionIds,
                                userIds: this.form.resDTO.userIds
                            },
                            isPrivate: Number(this.form.isPrivate),
                            subjectId: 0,
                            courseId: this.form.courseId,
                            messageSubject: this.form.messageSubject,
                            messageText: this.form.messageText
                        };
                        const result = await this.$getData(
                            "/message/add",
                            params,
                            "post"
                        );
                        if (result.data.code === 200) {
                            this.$message({
                                message: this.$t(
                                    "message.Messages.Message_sending_successfull"
                                ),
                                type: "success"
                            });
                            if (this.roleType === 2) {
                                this.$router.push({
                                    path:
                                        "/homePage/messageLeft/messageList?messagetype=0&activeName=inbox"
                                });
                            } else {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentMessageLeft/studentMessageList?messagetype=0&activeName=inbox"
                                });
                            }
                        } else {
                            this.$message({
                                message: result.data.message,
                                type: "error"
                            });
                        }
                    }
                }
            });
        },
        messageCancel() {
            if (this.roleType === 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMessageLeft/studentMessageList",
                    query: { messagetype: 0 }
                });
            } else {
                this.$router.push({
                    path: "/homePage/messageLeft/messageList",
                    query: { messagetype: 0 }
                });
            }
        },
        // 获取课程名称及消息主题
        async subjectCourse() {
            if (this.reply === 0) {
                const params = {
                    subjectId: this.subjectId
                };
                const result = await this.$getData(
                    "/message/subject/query",
                    params,
                    "get"
                );
                if (result.data.code === 200) {
                    this.courseName = result.data.entity.courseName;
                    this.messageSubject = result.data.entity.messageSubject;
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        // 获取收件人历史集合
        async historyPeople() {
            if (
                this.reply === 0 &&
                (this.replyTypes === 0 || this.replyTypes === 1)
            ) {
                const params = {
                    messageId: this.messageId,
                    replyType: this.replyTypes
                };
                const result = await this.$getData(
                    "/messageReply/rec/query",
                    params,
                    "get"
                );
                if (result.data.code === 200) {
                    const assign = result.data.entity;
                    // assign.forEach(item=>{
                    //     this.form.recDTO = `${item.id}_` + '3_'
                    // })
                    this.form.recDTO = assign.map(item => `${item.id}_3_`);
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        // 历史消息引用接口
        async historyMessage() {
            if (
                this.reply === 0 &&
                (this.replyTypes === 0 || this.replyTypes === 1)
            ) {
                const params = {
                    subjectId: this.subjectId,
                    messageId: this.messageId,
                    replyType: this.replyTypes
                };
                const result = await this.$getData(
                    "/message/history/query",
                    params,
                    "get"
                );
                if (result.data.code === 200) {
                    this.historyMessages = result.data.entity;
                    this.historyMessagesFifty = result.data.entity.slice(0, 15);
                    console.log(
                        this.historyMessages,
                        this.historyMessagesFifty
                    );
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        // 转发下得历史消息引用
        async historyForward() {
            if (this.reply === 0 && this.replyTypes === 2) {
                const params = {
                    subjectId: this.subjectId,
                    msgType: 1,
                    pageIndex: 1,
                    pageSize: 1000
                };
                const result = await this.$getData(
                    "/message/oneSubjectSentRec/query",
                    params,
                    "get"
                );
                if (result.data.code === 200) {
                    this.historyForwards = result.data.entity.list;
                    this.historyForwardsFifty = result.data.entity.list.slice(
                        0,
                        15
                    );
                    console.log(
                        this.historyForwards,
                        this.historyForwardsFifty
                    );
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        // 单个回复的时候获取的历史引用记录
        async historyForwardDan() {
            if (this.reply === 0 && this.replyTypes === 3) {
                const params = {
                    data: this.messageId
                };
                const result = await this.$getData(
                    "/message/get",
                    params,
                    "get"
                );
                if (result.data.code === 200) {
                    this.historyForwardDans = result.data.entity;
                } else {
                    this.$message({
                        message: result.data.message,
                        type: "error"
                    });
                }
            }
        },
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            return false;
        }
    }
};
</script>
<style scoped lang="less">
.message-admit {
    .message-admit-subject {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 71%;
        display: inline-block;
    }
    .message-admit-course {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 71%;
        display: inline-block;
    }
    .write-message-box {
        height: 50px;
        border-bottom: 1px solid #aaaaaa;
        line-height: 50px;
        .write-message {
            font-size: 20px;
            font-family: Arial-BoldMT;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }

        .write-message-back {
            float: right;
            font-size: 32px;
            font-family: ArialMT;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            cursor: pointer;
        }
    }
    .message-form {
        margin-left: 20%;
        margin-top: 2%;
    }

    .editor {
        width: 85%;
    }
    .message-admit-more {
        font-size: 14px;
        font-family: ArialMT;
        font-weight: 400;
        color: #999999;
        margin-top: 15px;
        margin-left: 15px;
    }

    .message-admit-history {
        width: 85%;
        height: 200px;
        margin-top: 2%;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        overflow: auto;
        .message-detail-name {
            font-size: 16px;
            font-family: Arial-BoldMT;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .message-detail-list-inner {
            /*margin-left: 60px;*/
            padding: 2%;
            border-bottom: 1px solid #aaaaaa;
        }
        .message-detail-nameto {
            font-size: 14px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }
        .message-detail-time {
            font-size: 14px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-left: 10%;
        }
        .message-detail-content {
            font-size: 14px;
            font-family: ArialMT;
            /*font-weight: bold;*/
            color: rgba(102, 102, 102, 1);
            width: 100%;
            word-wrap: break-word;
        }
    }

    .subject-max {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
    .message-detail-nameto-span {
        width: 35%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        position: relative;
        top: 5px;
    }
    .message-time-yesterday {
        font-size: 14px;
        font-family: ArialMT;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        position: relative;
        left: 40px;
    }
}
</style>
