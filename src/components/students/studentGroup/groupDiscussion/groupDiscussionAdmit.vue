<template>
    <!--eslint-disable-->
    <div class="studentDiscussions">
        <div v-show="discussionStepTwo" class="discussionStepTwo">
            <el-row>
                <el-col :span="18" style="">
                    <el-form
                        ref="ruleform"
                        style="margin-top: 20px"
                        :rules="rules"
                        :model="ruleform"
                        label-width="180px"
                        :label-position="'right'"
                    >
                        <el-row>
                            <el-col :span="23">
                                <el-form-item
                                    prop="titles"
                                    style=""
                                    class="el-form-item_content"
                                    label-width="0px"
                                >
                                    <el-input
                                        v-model="title"
                                        style=""
                                        :placeholder="$t('message.Topic_Title')"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <div class="editor">
                                    <ckeditor
                                        v-model="content"
                                        :editor="editor"
                                        :config="editorConfig"
                                    />
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" />
                        </el-row>
                        <el-form-item
                            v-if="(allowDiscussionAttachFile = 1)"
                            :label="$t('message.Attachment')"
                            style="margin-top: 10px"
                        >
                            <el-upload
                                style="display: inline-block"
                                class="upload-demo"
                                :action="upload"
                                :before-upload="beforeFileUpload"
                                :file-list="file"
                                :on-success="uploadSuccess"
                                accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,.mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                            >
                                <el-button type="primary">
                                    {{ $t("message.upload") }}
                                </el-button>
                            </el-upload>
                            <br />
                            <a
                                :href="getAbsolutePath(ruleform.fileId)"
                                target="_blank"
                            >
                                {{ ruleform.originName }}</a
                            >
                            <i
                                v-if="ruleform.fileId"
                                style="cursor: pointer"
                                class="el-tag__close el-icon-close"
                                @click="uploadClose"
                            />
                        </el-form-item>
                        <el-row>
                            <el-col :span="20">
                                <el-form-item>
                                    <!--<el-button @click="cancel" style="">{{$t('message.Cancel')}}</el-button>-->
                                    <el-button @click="cancel">
                                        {{ $t("message.Cancel") }}
                                    </el-button>
                                    <p style="float: right;margin-right: 12%">
                                        <el-button
                                            v-if="typeEdit != '1'"
                                            type="primary"
                                            style=""
                                            @click="
                                                discussionPublish('ruleform')
                                            "
                                        >
                                            {{ $t("message.Save&Publish") }}
                                        </el-button>
                                        <!--<el-button type="primary" @click="onSubmit" style="">-->
                                        <!--{{$t('message.Save')}}</el-button>-->
                                        <el-button
                                            v-if="typeEdit === '1'"
                                            type="primary"
                                            @click="editSavePublish"
                                        >
                                            {{ $t("message.Save&Publish") }}
                                        </el-button>
                                        <!--<el-button type="primary" @click="editSave" v-if="typeEdit === 1">{{$t('message.Save')}}</el-button>-->
                                    </p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapGetters } from "vuex";
import defaultHead from "../../../../../static/images/touxiang1.png";

export default {
    computed: {
        ...mapGetters(["userInfoData"])
    },
    data() {
        return {
            rules: {
                titles: [
                    {
                        required: true,
                        message: this.$t("message.Please_enter_the_title"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t("message.The_length_is_between"),
                        trigger: "blur"
                    }
                ]
            },
            defaultHead,
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            upload: `${process.env.NODE_ENV}/upload`,
            file: [],
            content: "",
            title: "",
            postSections: [],
            postToSection: [],
            startTime: "",
            endTime: "",
            ruleform: {
                fileId: "",
                originName: "",
                titles: ""
            },
            allowStudentCreateDiscussion: "",
            allowStudentEditDiscussion: "",
            allowDiscussionAttachFile: "",
            courseId: this.$route.query.courseId,
            groupId: this.$route.query.groupId,
            discussionId: "",
            radio: "",
            selected: {},
            content: "",
            typeEdit: "",
            form: {
                name: "",
                region: ""
            },
            discussionStepOne: true,
            discussionStepTwo: true,
            discussionStepThree: false,
            discussionStepFour: false,
            centerDialogVisible: false,
            ruleformlist: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            activeName: "first",
            type: ""
        };
    },
    watch: {
        title(val) {
            this.ruleform.titles = val;
        }
    },
    mounted() {
        // this.sections();
        this.editForm();
        this.routerpath();
    },
    methods: {
        getAbsolutePath(relativePath, width, height) {
            if (relativePath == undefined) return defaultHead;
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },

        routerpath() {
            this.type = this.userInfoData.type;
        },
        uploadSuccess(response, file, fileList) {
            response.entity.map((item, index) => {
                this.ruleform.fileId = item.fileId;
                this.ruleform.originName = item.originName;
            });
            this.$message({
                showClose: true,
                message: "Upload succeeded",
                type: "success"
            });
        },
        uploadClose() {
            this.ruleform.fileId = "";
            this.ruleform.originName = "";
        },
        beforeFileUpload(file) {
            const isLitSize = file.size / 1024 / 1024 < 400;
            if (!isLitSize) {
                this.$message({
                    message: this.$t(
                        "message.Certification.File_size_exceeds_quota"
                    ),
                    type: "warning"
                });
            }
            return isLitSize;
        },
        discussionPublish(ruleform) {
            const params = {
                courseId: this.courseId,
                title: this.title,
                content: this.content,
                type: 2,
                fileId: this.ruleform.fileId,
                status: 1,
                // "assign":disAssigns,
                isGrade: 0,
                studyGroupId: this.groupId
            };
            this.$refs[ruleform].validate(valid => {
                if (valid) {
                    this.$http
                        .post(`${process.env.NODE_ENV}/discussion/add`, params)
                        .then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                if (this.type == 4) {
                                    this.$router.push({
                                        path:
                                            "/studentHomePage/studentMain/groupDiscussionCreateList",
                                        query: {
                                            courseId: this.courseId,
                                            groupId: this.groupId
                                        }
                                    });
                                } else {
                                    this.$router.push({
                                        path:
                                            "/homePage/teacherMain/groupDiscussionCreateList",
                                        query: {
                                            courseId: this.courseId,
                                            groupId: this.groupId
                                        }
                                    });
                                }
                            }
                        });
                }
            });
        },
        onSubmit() {
            const params = {
                courseId: this.courseId,
                title: this.title,
                content: this.content,
                type: 1,
                fileId: this.ruleform.fileId,
                status: 1,
                // "assign":disAssigns,
                isGrade: 0,
                studyGroupId: this.groupId
            };
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/add`, params)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        if (this.type == 4) {
                            this.$router.push({
                                path:
                                    "/studentHomePage/studentMain/groupDiscussionCreateList",
                                query: {
                                    courseId: this.courseId,
                                    groupId: this.groupId
                                }
                            });
                        } else {
                            this.$router.push({
                                path:
                                    "/homePage/teacherMain/groupDiscussionCreateList",
                                query: {
                                    courseId: this.courseId,
                                    groupId: this.groupId
                                }
                            });
                        }
                    }
                });
        },
        editForm() {
            const that = this;
            that.discussionId = that.$route.query.discussionId;
            const b = that.$route.query.courseId;
            that.typeEdit = that.$route.query.type;
            if (that.typeEdit === "1") {
                that.$http
                    .get(`${process.env.NODE_ENV}/discussion/get`, {
                        params: { data: that.discussionId }
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.title = res.data.entity.title;
                            this.content = res.data.entity.content;
                            this.ruleform = res.data.entity;
                            this.ruleform.isGrade = Boolean(
                                res.data.entity.isGrade
                            );
                            this.assign = res.data.entity.assign;
                            this.avatarUrl = res.data.entity.author.avatarUrl;
                            if (res.data.entity.isGrade == 1) {
                                this.pointsPossible = true;
                                this.displayGradeas = true;
                                this.assignmentGroup1 = true;
                                this.assignTo = true;
                                this.availableFrom = false;
                                this.until = false;
                                this.postTo = false;
                            }
                        }
                    });
            }
        },
        editSavePublish() {
            const that = this;
            // const a = that.$route.query.discussionId;
            // const disAssigns = [];
            // if (this.ruleform.isGrade) {
            //     for (let i = 0; i < this.assign.length; i++) {
            //         const ass = this.assign[i];
            //         const arr = ass.assignId.split("_");
            //         disAssigns.push({
            //             assignType: arr[0],
            //             assignId: arr[1],
            //             startTime: new Date(ass.startTime).getTime(),
            //             endTime: new Date(ass.endTime).getTime(),
            //             limitTime: new Date(ass.limitTime).getTime()
            //         });
            //     }
            // } else {
            //     for (let i = 0; i < this.postSections.length; i++) {
            //         disAssigns.push({
            //             assignType: this.postSections[i] == 0 ? 1 : 2,
            //             assignId: this.postSections[i],
            //             startTime: new Date(this.startTime).getTime(),
            //             endTime: new Date(this.endTime).getTime()
            //         });
            //     }
            // }
            const params = {
                id: that.discussionId,
                courseId: that.courseId,
                title: this.title,
                content: this.content,
                type: 2,
                studyGroupSetId: this.groupId,
                fileId: this.ruleform.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: this.ruleform.score,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 1
                // assign: disAssigns
            };
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/modify`, params)
                .then(res => {
                    console.log(res);
                    // this.discussionList();
                    if (this.type == 4) {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentMain/groupDiscussionCreateList",
                            query: {
                                courseId: this.courseId,
                                groupId: this.groupId
                            }
                        });
                    } else {
                        this.$router.push({
                            path:
                                "/homePage/teacherMain/groupDiscussionCreateList",
                            query: {
                                courseId: this.courseId,
                                groupId: this.groupId
                            }
                        });
                    }
                });
        },
        editSave() {
            const that = this;
            const a = that.$route.query.discussionId;
            const disAssigns = [];
            if (this.ruleform.isGrade) {
                for (let i = 0; i < this.assign.length; i++) {
                    const ass = this.assign[i];
                    const arr = ass.assignId.split("_");
                    disAssigns.push({
                        assignType: arr[0],
                        assignId: arr[1],
                        startTime: new Date(ass.startTime).getTime(),
                        endTime: new Date(ass.endTime).getTime(),
                        limitTime: new Date(ass.limitTime).getTime()
                    });
                }
            } else {
                for (let i = 0; i < this.postSections.length; i++) {
                    disAssigns.push({
                        assignType: this.postSections[i] == 0 ? 1 : 2,
                        assignId: this.postSections[i],
                        startTime: new Date(this.startTime).getTime(),
                        endTime: new Date(this.endTime).getTime()
                    });
                }
            }
            const params = {
                id: that.discussionId,
                courseId: that.courseId,
                title: this.title,
                content: this.content,
                type: 1,
                studyGroupSetId: this.ruleform.studyGroupSetId,
                fileId: this.ruleform.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: this.ruleform.score,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 0,
                assign: disAssigns
            };
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/modify`, params)
                .then(res => {
                    console.log(res);
                    // this.discussionList();
                    if (this.type == 4) {
                        this.$router.push({
                            path:
                                "/studentHomePage/studentMain/groupDiscussionCreateList",
                            query: {
                                courseId: this.courseId,
                                groupId: this.groupId
                            }
                        });
                    } else {
                        this.$router.push({
                            path:
                                "/homePage/teacherMain/groupDiscussionCreateList",
                            query: {
                                courseId: this.courseId,
                                groupId: this.groupId
                            }
                        });
                    }
                });
        },

        cancel() {
            if (this.type == 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMain/groupDiscussionCreateList",
                    query: { courseId: this.courseId, groupId: this.groupId }
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupDiscussionCreateList",
                    query: { courseId: this.courseId, groupId: this.groupId }
                });
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

.studentDiscussions /deep/ .el-icon-search:before {
    content: "";
}

.studentDiscussions {
    .discussionStepTwo {
        /deep/.el-upload-list__item .el-icon-upload-success:before {
            content: "";
            display: none;
        }
        /deep/ .el-upload-list__item-name {
            display: none;
        }
        /*position: relative;*/

        .editor {
            margin-top: 20px;
            border: 1px solid #e7ebf7;
            height: 250px;
        }

        .discussionRightBar {
            height: 400px;

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
    }
}
</style>
