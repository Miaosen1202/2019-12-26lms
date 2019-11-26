<template>
    <!--eslint-disable-->
    <div>
        <el-row :gutter="30">
            <el-col :span="18">
                <span
                    v-if="assignment.isIncludeGrade == 0"
                    class="isIncludeGradeWarning"
                    ><b>{{ $t("message.IsIncludeGradeWarn") }}</b>
                </span>
                <div class="re_SubmitAssignment_father item">
                    <!--<span> <b>{{assignment.title}}</b></span>-->
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="assignment.title"
                        placement="top"
                    >
                        <el-button class="border_none">
                            {{ assignment.title }}
                        </el-button>
                    </el-tooltip>
                    <el-button
                        v-if="
                            assignment.submissionType == 1 &&
                                isSubmit &&
                                !tabForm
                        "
                        class="re_SubmitAssignment"
                        style="margin-right: 20px"
                        type="primary"
                        @click="showTab"
                    >
                        {{
                            assignmentSubmitData
                                ? this.$t(
                                      "message.ASSIGNMENT.reSubmitAssignment"
                                  )
                                : this.$t("message.ASSIGNMENT.submitAssignment")
                        }}
                    </el-button>
                </div>
                <div
                    v-show="assignment.studyGroupSetId"
                    style="display: inline-block"
                >
                    <span style="color: #999999">{{
                        $t(
                            "message.ASSIGNMENT.assignment_with_everyone_in_your"
                        )
                    }}</span>
                    <span
                        style="color: blue;
                        text-decoration: underline;
                        font-size: 16px"
                    >
                        <span v-html="assignment.studyGroupSetName"
                            >&nbsp;{{ $t("message.ASSIGNMENT.group") }}</span
                        >
                    </span>
                    <span style="color: #999999"
                        >&nbsp;{{ $t("message.ASSIGNMENT.Group_Set_group") }}
                    </span>
                </div>
                <span class="bottom_line" />
                <br />
                <span v-if="limitTime"
                    ><b>{{ $t("message.ASSIGNMENT.due") }}:</b>
                    {{ limitTime | formatterDate }}</span
                >
                <span v-else
                    ><b>{{ $t("message.ASSIGNMENT.due") }}:</b>
                    {{ $t("message.ASSIGNMENT.not_due_time") }}</span
                >
                <span
                    ><b> {{ $t("message.ASSIGNMENT.score") }}:</b>
                    {{ assignment.score / 100 }}</span
                ><br />
                <!--在线提交-->
                <span v-if="assignment.submissionType == 1">
                    <span>
                        <b>{{ $t("message.ASSIGNMENT.submitting") }}: </b>
                    </span>
                    <span v-if="assignment.allowText">{{
                        $t("message.ASSIGNMENT.text")
                    }}</span>
                    <span
                        v-if="
                            assignment.allowText &&
                                (assignment.allowFile ||
                                    assignment.allowMedia ||
                                    assignment.allowUrl)
                        "
                        >,
                    </span>
                    <span v-if="assignment.allowFile">{{
                        $t("message.ASSIGNMENT.file")
                    }}</span>
                    <span
                        v-if="
                            assignment.allowFile &&
                                (assignment.allowMedia || assignment.allowUrl)
                        "
                        >,</span
                    >
                    <span v-if="assignment.allowUrl">{{
                        $t("message.ASSIGNMENT.url")
                    }}</span>
                    <span v-if="assignment.allowUrl && assignment.allowMedia"
                        >,</span
                    >
                    <span v-if="assignment.allowMedia">{{
                        $t("message.ASSIGNMENT.media")
                    }}</span> </span
                ><br />
                <span v-if="startTime || endTime">
                    <b>{{ $t("message.ASSIGNMENT.available") }} :</b>
                    {{ startTime | formatterDate }} &nbsp;&nbsp;
                    {{ endTime | formatterDate }} </span
                ><br />
                <span class="bottom_line" />
                <br />
                <br />
                <!--eslint-disable-->
                <p
                    style="word-wrap: break-word;
                     word-break: break-all;
                     overflow: auto;"
                    v-if="assignment.description"
                    @click="richTextClick($event)"
                    v-html="assignment.description"
                ></p>
                <!--eslint-disable no-new-->
                <span v-else>{{ $t("message.ASSIGNMENT.no_content") }}</span>
                <br />
                <br />
                <el-alert
                    v-if="startTime > now"
                    :title="getLockedUntilTip(startTime)"
                    type="info"
                    show-icon
                />
                <el-alert
                    v-if="
                        endTime != undefined && endTime != '' && endTime < now
                    "
                    :title="getLockedTip(endTime)"
                    type="info"
                    show-icon
                />
                <el-tabs
                    v-if="tabForm"
                    v-model="activeTab"
                    @tab-click="handleClick"
                >
                    <div v-if="assignment.studyGroupSetId">
                        <el-tag class="el-icon-warning" type="danger">
                            {{ $t("message.ASSIGNMENT.groupTip") }}
                            {{ assignment.studyGroupSetName }}
                            {{ $t("message.ASSIGNMENT.groupTip2") }}.
                        </el-tag>
                    </div>
                    <br />
                    <el-tab-pane
                        v-if="assignment.allowText"
                        :label="$t('message.ASSIGNMENT.text')"
                        name="1"
                    >
                        <div>{{ $t("message.ASSIGNMENT.textTip") }}</div>
                        <br />
                        <ckeditor
                            v-model="text"
                            :editor="editor"
                            :config="editorConfig"
                        />
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="assignment.allowFile"
                        :label="$t('message.ASSIGNMENT.file')"
                        name="2"
                    >
                        <div>
                            <span>{{ $t("message.ASSIGNMENT.fileTip") }}</span>
                        </div>
                        <br />
                        <el-upload
                            ref="upload"
                            :action="getUrl()"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload"
                        >
                            <el-button
                                slot="trigger"
                                size="small"
                                type="primary"
                                icon="el-icon-upload"
                            >
                                {{ $t("message.pls_select") }}
                            </el-button>
                            <div slot="tip" class="el-upload__tip">
                                <span v-if="assignment.fileLimit">
                                    {{ $t("message.ASSIGNMENT.supportFile") }} :
                                    {{ assignment.fileLimit }}
                                </span>
                            </div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="assignment.allowUrl"
                        :label="$t('message.ASSIGNMENT.url')"
                        name="3"
                    >
                        <div>{{ $t("message.ASSIGNMENT.webSiteTip") }}</div>
                        <br />
                        <div>{{ $t("message.ASSIGNMENT.url") }}</div>
                        <el-input v-model="url" label="" />
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="assignment.allowMedia"
                        :label="$t('message.ASSIGNMENT.media')"
                        name="4"
                    >
                        <div>
                            <span>{{ $t("message.ASSIGNMENT.mediaTip") }}</span>
                        </div>
                        <br />

                        <el-upload
                            ref="upload"
                            class="upload-demo"
                            :action="getUrl()"
                            :on-remove="handleMediaRemove"
                            :on-success="handleMediaSuccess"
                            :before-upload="beforeMediaUpload"
                            :on-progress="mediaProgress"
                            :file-list="mediFileList"
                            :on-error="handleMediaErro"
                        >
                            <el-button
                                slot="trigger"
                                size="small"
                                type="primary"
                                icon="el-icon-upload"
                            >
                                {{ $t("message.pls_select") }}
                            </el-button>
                            <div slot="tip" class="el-upload__tip">
                                <span>
                                    {{ $t("message.ASSIGNMENT.supportFile") }} :
                                    mp4
                                </span>
                            </div>
                        </el-upload>
                        <el-progress
                            v-if="uploadFlag"
                            :percentage="UploadPercent"
                            style="margin-top:10px;"
                        />
                    </el-tab-pane>
                    <br />
                    <el-input
                        v-model="comment"
                        type="textarea"
                        :placeholder="$t('message.ASSIGNMENT.comments') + '...'"
                    />
                    <span v-show="flagtit">{{
                        $t("message.ASSIGNMENT.commentsTip")
                    }}</span
                    ><br />
                    <el-button @click="closeTab">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="submit">
                        {{
                            assignmentSubmitData
                                ? this.$t(
                                      "message.ASSIGNMENT.reSubmitAssignment"
                                  )
                                : this.$t("message.ASSIGNMENT.submitAssignment")
                        }}
                    </el-button>
                </el-tabs>
            </el-col>
            <el-col :span="6">
                <!--在线提交-->
                <div
                    v-if="
                        assignment.submissionType == 1 && assignmentSubmitData
                    "
                >
                    <span>
                        <b>{{ $t("message.ASSIGNMENT.submission") }}</b>
                    </span>
                    <br />
                    <span
                        ><i class="el-icon-success" />
                        {{ $t("message.ASSIGNMENT.submitted") }}</span
                    >
                    <br />
                    <span v-if="!assignmentSubmitData.isLate">
                        {{ assignmentSubmitData.submitTime | formatterDate
                        }}<br
                    /></span>

                    <span v-if="assignmentSubmitData.isLate">
                        <font color="#FF0000"
                            >{{
                                assignmentSubmitData.submitTime | formatterDate
                            }}
                            (late)</font
                        ><br
                    /></span>

                    <el-button type="text" @click="goTo">
                        {{ $t("message.ASSIGNMENT.assignmentDetail") }}
                    </el-button>
                    <br />
                    <span v-if="assignmentSubmitData.score"
                        >{{ $t("message.ASSIGNMENT.Grade") }}
                        {{ assignmentSubmitData.score / 100 }}
                        ({{ assignment.score / 100
                        }}{{ $t("message.ASSIGNMENT.ScorePossiple") }}) <br
                    /></span>

                    <span v-show="assigncomm"
                        ><b>{{ $t("message.ASSIGNMENT.comments") }}:</b></span
                    >
                    <div
                        v-for="(item, index) in assignmentSubmitCommentData"
                        :key="index"
                    >
                        <span
                            ><b>{{ item.username }}:</b></span
                        >
                        <span class="numberwrap">{{ item.content }}</span>
                        <br />
                        <span>{{ item.createTime | formatterDate }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div v-if="data && isSubmit && !tabForm" style="width: 75%;">
            <studentnextPrevious />
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import utilMethods from "@/utils/utilMethods";
import studentnextPrevious from "../../../utils/studentnextPrevious.vue";

export default {
    filters: {
        formatterDate(val) {
            return utilMethods.formatDate(val);
        }
    },
    components: {
        studentnextPrevious
    },
    // name: "select02.vue",
    data() {
        return {
            isSubmit: false,
            flagtit: false,
            editor: ClassicEditor,
            submitCount: null,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            now: new Date().getTime(),
            activeTab: "",
            url: "",
            media: "",
            text: "",
            comment: "",
            fileList: [],
            limitTime: "",
            startTime: "",
            endTime: "",
            data: this.$route.query.modulesData,
            courseId: this.$route.query.courseId,
            assignmentId: this.$route.query.assignmentId,
            assignment: {},
            assignmentSubmitData: "",
            assignmentSubmitCommentData: "",
            tabForm: this.$route.query.tabForm
                ? this.$route.query.tabForm
                : false,
            assigncomm: true,
            uploadFlag: false,
            UploadPercent: 0,
            mediFileList: [],
            originName: ""
        };
    },
    mounted() {
        this.getAssignmentData();
    },
    methods: {
        mediaProgress(event) {
            this.uploadFlag = true;
            const tempPercent = Number(Number(event.percent).toFixed(0));
            this.UploadPercent = tempPercent < 90 ? tempPercent : 90;
        },
        ransfHtml(str) {
            const dd = str.replace(/<\/?.+?>/g, "");
            let dds = dd;
            // let dds = dd.replace(/ /g,"");//dds为得到后的内容
            dds = dds.replace(/&nbsp;/, "");
            return dds;
        },
        goTo() {
            this.$router.push({
                path: "studentAssignmentDetail",
                query: {
                    courseId: this.courseId,
                    assignmentId: this.assignmentId
                }
            });
        },
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            return false;
        },
        showTab() {
            this.fileList = [];
            this.tabForm = true;
            this.getAssignmentData();
            if (Number(this.submitCount) === 48) {
                this.$confirm(
                    this.$t("message.assignment_attotion"),
                    this.$t("message.ASSIGNMENT.attention"),
                    {
                        confirmButtonText: this.$t("message.Save"),
                        cancelButtonText: this.$t("message.Cancel"),
                        type: "warning"
                    }
                )
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: this.$t("message.delete_success")
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: this.$t("message.delete_cancel")
                        });
                    });
            }
        },
        closeTab() {
            this.tabForm = false;
        },
        getUrl() {
            return `${process.env.NODE_ENV}/upload`;
        },
        getLockedUntilTip(startTime) {
            return `${this.$t(
                "message.ASSIGNMENT.lockedUntilTip"
            )} ${utilMethods.formatDate(startTime)}`;
        },
        getLockedTip(endTime) {
            return `${this.$t(
                "message.ASSIGNMENT.lockedTip"
            )} ${utilMethods.formatDate(endTime)}`;
        },
        async getAssignmentSubmitCommentData() {
            const result = await this.$getData(
                "/assignmentSubmitComment/list",
                { assignmentId: this.assignmentId },
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.assignmentSubmitCommentData = result.data.entity;
                this.assigncomm = this.assignmentSubmitCommentData.length;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignmentSubmitData() {
            const result = await this.$getData(
                "/assignmentSubmit/get",
                { data: this.assignmentId },
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.assignmentSubmitData = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },

        async submit() {
            let content = "";
            if (Number(this.activeTab) === 1) {
                content = this.text;
                this.getAssignmentData();
            } else if (Number(this.activeTab) === 2) {
                // 文件提交
                if (Number(this.fileList.length) === 0) {
                    this.$message.error("Please upload a file");
                    return;
                }
                this.fileList.forEach(v => {
                    content += `${v.fileId},`;
                });
            } else if (Number(this.activeTab) === 3) {
                const zz = /(http|https):\/\/([\w.]+\/?)\S*/;
                if (!zz.test(this.url) && this.url !== "") {
                    content = `http://${this.url}`;
                } else {
                    content = this.url;
                }
            } else if (Number(this.activeTab) === 4) {
                content = this.media;
            }
            if (!this.ransfHtml(content)) {
                this.$message.error(
                    this.$t("message.ASSIGNMENT.contentInvalid")
                );
            } else {
                const data = {
                    assignmentId: this.assignmentId,
                    replyType: this.activeTab,
                    content: this.ransfHtml(content),
                    comment: this.ransfHtml(this.comment)
                };

                const result = await this.$getData(
                    "/assignmentSubmit/add",
                    data,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.url = "";
                    this.media = "";
                    this.text = "";
                    this.comment = "";
                    this.fileList = [];
                    this.$message.success(result.data.message);
                    this.refresh(); // 刷新提交记录 及 评论
                    this.closeTab();
                } else {
                    // this.$message.error(result.data.message);
                }
            }
        },
        handleSuccess(res) {
            if (Number(res.code) === 200) {
                this.fileList.push(res.entity[0]);
            } else {
                this.$message.error(res.message);
            }
        },
        handleMediaSuccess(res) {
            if (Number(res.code) === 200) {
                this.UploadPercent = 100;
                this.media = res.entity[0].fileId;
                // this.originName = res.entity[0].originName;
                // this.mediFileList = [];
                this.uploadFlag = false;
            } else {
                this.uploadFlag = false;
                this.UploadPercent = 0;
                // this.mediFileList = [];
                this.$message.error(
                    this.$t("message.ASSIGNMENT.Upload_timeout")
                );
            }
        },
        uploadClose() {
            this.media = "";
            this.originName = "";
        },
        handleMediaErro() {
            this.$message.error(this.$t("message.ASSIGNMENT.Upload_timeout"));
            this.mediFileList = [];
            this.uploadFlag = false;
        },
        beforeUpload(file) {
            if (this.assignment.fileLimit) {
                const v = this.assignment.fileLimit.indexOf(
                    file.name.substring(file.name.lastIndexOf(".") + 1)
                );
                if (Number(v) === -1) {
                    this.$message.error(
                        `${this.$t("message.ASSIGNMENT.notSupportFile")} ${
                            this.assignment.fileLimit
                        }`
                    );
                }
                return v > -1;
            }
            return true;
        },
        beforeMediaUpload(file) {
            const v = file.type === "video/mp4";

            if (!v) {
                this.$message.error(
                    `${this.$t("message.ASSIGNMENT.notSupportFile")} : mp4`
                );
                return v;
            }
            const isLitSize = file.size / 1024 / 1024 < 400;
            if (!isLitSize) {
                const msg = this.$t(
                    "message.ASSIGNMENT.File size exceeds quota!"
                );
                this.$message({
                    message: msg,
                    type: "warning"
                });
                return isLitSize;
            }

            return v && isLitSize;
        },
        handleRemove(file) {
            this.fileList.splice(
                this.fileList.findIndex(v => v.originName === file.name)
            );
        },
        handleMediaRemove() {
            this.media = "";
        },
        handleClick() {
            // console.log(tab, event);
        },
        async getAssignmentData() {
            const result = await this.$getData(
                "/assignment/get",
                { data: this.assignmentId },
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.refresh(); // 刷新提交记录 及 评论
                const data = result.data.entity;
                /* let data = result.data.entity; */
                this.assignment = result.data.entity;
                this.submitCount = data.submitCount;
                if (result.data.entity.studyGroupSetId != null) {
                    this.flagtit = true;
                } else {
                    this.flagtit = false;
                }
                this.limitTime = data.assignUser.limitTime;
                this.startTime = data.assignUser.startTime;
                this.endTime = data.assignUser.endTime;
                const now = new Date().getTime();
                this.isSubmit =
                    // ((this.startTime === undefined &&
                    //     this.endTime === undefined) ||
                    //     (this.startTime < now ||
                    //         this.startTime === undefined ||
                    //         this.endTime === undefined ||
                    //         (this.endTime > now ||
                    //             this.startTime === undefined ||
                    //             this.endTime === undefined))) &&
                    // data.submitCount < 49;
                    ((this.startTime === undefined &&
                        this.endTime === undefined) ||
                        ((this.startTime < now ||
                            this.startTime === undefined ||
                            this.endTime === undefined) &&
                            (this.endTime > now ||
                                this.startTime === undefined ||
                                this.endTime === undefined))) &&
                    data.submitCount < 49;
                if (Number(data.allowText) === 1) {
                    this.activeTab = "1";
                    return;
                }
                if (Number(data.allowFile) === 1) {
                    this.activeTab = "2";
                    return;
                }
                if (Number(data.allowUrl) === 1) {
                    this.activeTab = "3";
                    return;
                }
                if (Number(data.allowMedia) === 1) {
                    this.activeTab = "4";
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        refresh() {
            this.getAssignmentSubmitData();
            this.getAssignmentSubmitCommentData();
        },
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        }
    }
};
/*eslint-disable*/
</script>

<style scoped>
.select02_one {
    line-height: 40px;
}

.Warning_box {
    border: 1.5px solid red;
    padding-left: 40px;
}

.Tit_name {
    display: inline-block;
    width: 60px;
}

.select02_one div {
    margin-bottom: 15px;
}

.isIncludeGradeWarning {
    width: 100%;
    display: inline-block;
    color: #62aad5;
    padding: 10px;
    margin-bottom: 40px;
    text-align: center;
    border: 1px solid #55c21f;
    background: #eaffea;
    color: #55c21f;
    font-weight: bold;
    border-radius: 3px;
}
.re_SubmitAssignment_father {
    position: relative;
}
.re_SubmitAssignment {
    position: absolute;
    right: 0;
    top: 0;
}
.bottom_line {
    display: inline-block;
    width: 100%;
    height: 1px;
    background: #cccccc;
}
.breakwrap {
    width: 100px;
    word-wrap: break-word;
}
.item .border_none {
    width: 440px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: -20px;
    border: none;
    color: #333333;
    background: #ffffff;
    cursor: auto;
    text-align: left;
    font-size: 20px;
}
.numberwrap {
    word-break: break-all;
}
/deep/ .upload-demo .el-upload-list__item .el-progress {
    display: none !important;
}
</style>
