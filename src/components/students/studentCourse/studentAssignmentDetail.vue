<template>
    <div style="width: 80%">
        <!--eslint-disable-->
        <span
            v-if="assignment.isIncludeGrade == 0"
            class="isIncludeGradeWarning"
            ><b class="">{{ $t("message.IsIncludeGradeWarn") }}</b>
        </span>
        <h1>{{ $t("message.ASSIGNMENT.submission") }}</h1>
        <br />
        <hr />
        <br />
        <el-row>
            <el-col :span="18">
                <div class="item">
                    <!--<h2>{{assignment.title}}</h2>-->
                    <el-tooltip
                        effect="dark"
                        :content="assignment.title"
                        placement="top"
                    >
                        <el-button class="border_none">{{
                            assignment.title
                        }}</el-button>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="text-align: right">
                    <el-button v-if="isSubmit" @click="goTo" type="primary">{{
                        this.$t("message.ASSIGNMENT.reSubmitAssignment")
                    }}</el-button>
                </div>
            </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
            <el-col :span="8">
                <div>
                    <span
                        >{{ $t("message.ASSIGNMENT.submission") }}:
                        {{
                            assignmentSubmitData.submitTime | formatterDate
                        }}</span
                    >
                </div>
            </el-col>
            <el-col :span="7">
                <div>
                    <span
                        >{{ $t("message.ASSIGNMENT.score") }}:
                        {{ assignment.score / 100 }}</span
                    >
                </div>
            </el-col>
        </el-row>
        <br />
        <div>
            <el-row :gutter="20">
                <el-col :span="18">
                    <div>
                        <!--html-->
                        <div
                            class="detailwrap"
                            v-if="assignmentSubmitData.replyType == 1"
                            v-html="assignmentSubmitData.content"
                        ></div>
                        <!--file-->
                        <div
                            v-if="assignmentSubmitData.replyType == 2"
                            v-for="item in assignmentSubmitData.attachments"
                        >
                            <span @click="getUrl(item.fileName, item.id)"
                                ><a href="javascript:;">{{
                                    item.fileName
                                }}</a></span
                            >
                            <br />
                        </div>
                        <!--weburl-->
                        <div v-if="assignmentSubmitData.replyType == 3">
                            <a
                                :href="assignmentSubmitData.content"
                                target="_blank"
                                >{{ assignmentSubmitData.content }}</a
                            >
                        </div>
                        <div v-if="assignmentSubmitData.replyType == 4">
                            <video
                                width="80%"
                                ref="bovideo"
                                controls="controls"
                                :src="bofang(assignmentSubmitData.content)"
                            ></video>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" style="text-align: right">
                    <div style="text-align: left">
                        <span
                            ><b
                                >{{ $t("message.ASSIGNMENT.comments") }}:</b
                            ></span
                        >
                        <div v-for="item in assignmentSubmitCommentData">
                            <span
                                ><b>{{ item.username }}:</b></span
                            >
                            <span class="detailwrap">{{ item.content }}</span>
                            <br />
                            <span>{{ item.createTime | formatterDate }}</span>
                        </div>
                        <br />
                        <el-input type="textarea" v-model="comment"></el-input>
                        <br />
                        <br />
                        <el-button
                            @click="assignmentSubmitComment"
                            type="primary"
                            >{{ $t("message.Save") }}</el-button
                        >
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import utilMethods from "@/utils/utilMethods";

export default {
    //name: "select02.vue",
    data() {
        return {
            comment: "",
            courseId: this.$route.query.courseId,
            assignmentId: this.$route.query.assignmentId,
            assignment: "",
            assignmentSubmitData: "",
            assignmentSubmitCommentData: "",
            startTime: false,
            isSubmit: false,
            endTime: ""
        };
    },
    filters: {
        formatterDate(val) {
            return utilMethods.formatDate(val);
        }
    },
    mounted() {
        this.getAssignmentData();
    },
    methods: {
        bofang(url) {
            console.log(
                "是不是视频地址",
                `${process.env.FILE_PRE_SERVER}` +
                    this.assignmentSubmitData.content
            );
            return `${process.env.FILE_PRE_SERVER}` + url;
        },
        submitComment() {
            this.tabForm = true;
        },
        goTo() {
            this.$router.push({
                path: "studentAssignmentSubmit",
                query: {
                    courseId: this.courseId,
                    assignmentId: this.assignmentId,
                    tabForm: true
                }
            });
        },
        getUrl(fileNames, id) {
            //return `${process.env.FILE_PRE_SERVER}` + url;
            let url =
                `${process.env.NODE_ENV}/userFile/download/direct?id=` + id;
            let fileName = fileNames;
            //window.open('/userFile/download/direct?id='+id);
            utilMethods.downloadFile(url, fileName);
        },
        async assignmentSubmitComment() {
            const data = {};
            data.courseId = this.courseId;
            data.assignmentId = this.assignmentId;
            data.comment = this.comment;
            let result = await this.$getData(
                "/assignmentSubmitComment/add",
                data,
                "post"
            );
            if (result.data.code == 200) {
                this.getAssignmentSubmitCommentData();
                this.comment = "";
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignmentSubmitCommentData() {
            let result = await this.$getData(
                "/assignmentSubmitComment/list",
                { assignmentId: this.assignmentId },
                "get"
            );
            if (result.data.code == 200) {
                this.assignmentSubmitCommentData = result.data.entity;
                //console.log("这是啥接口",this.assignmentSubmitCommentData);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignmentSubmitData() {
            let result = await this.$getData(
                "/assignmentSubmit/get",
                { data: this.assignmentId },
                "get"
            );
            if (result.data.code == 200) {
                this.assignmentSubmitData = result.data.entity;
                //console.log("是个傻子没错",this.assignmentSubmitData);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignmentData() {
            let result = await this.$getData(
                "/assignment/get",
                { data: this.assignmentId },
                "get"
            );
            if (result.data.code == 200) {
                let data = result.data.entity;
                this.assignment = data;
                this.getAssignmentSubmitData();
                this.getAssignmentSubmitCommentData();
                this.startTime = data.assignUser.startTime;
                this.endTime = data.assignUser.endTime;
                const now = new Date().getTime();
                //this.$set(this.form, 'isSubmit', ((this.startTime == undefined && this.endTime == undefined) || this.startTime < now && this.endTime > now) && data.submitCount < 50);
                this.isSubmit =
                    ((this.startTime == undefined &&
                        this.endTime == undefined) ||
                        (this.startTime < now && this.endTime > now)) &&
                    data.submitCount < 49;
                console.log(this.isSubmit);
            } else {
                this.$message.error(result.data.message);
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
    display: inline-block;
    background: #e5f2f8;
    color: #62aad5;
    padding: 10px;
    margin-bottom: 40px;
    margin-left: 30%;
}
.item .border_none {
    width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: -23px;
    border: none;
    color: #333333;
    background: #ffffff;
    cursor: auto;
    text-align: left;
}
.detailwrap {
    word-wrap: break-word;
    word-break: break-all;
}
</style>
