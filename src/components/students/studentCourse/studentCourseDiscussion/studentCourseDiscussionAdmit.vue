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
                            <el-col :span="24">
                                <el-form-item
                                    :label="$t('message.Post_to')"
                                    style=""
                                    multiple
                                    style="margin-top: 20px;"
                                    prop="postTo"
                                >
                                    <el-select
                                        v-model="postSections"
                                        :placeholder="
                                            $t('message.Common_please_select')
                                        "
                                        multiple
                                        style="width: 70%"
                                        @change="selectChange"
                                    >
                                        <el-option
                                            v-for="item in postToSection"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item
                            v-if="allowDiscussionAttachFile == 1"
                            :label="$t('message.Attachment')"
                            style="margin-top: 10px"
                        >
                            <el-upload
                                style="display: inline-block"
                                class="upload-demo"
                                :action="upload"
                                :file-list="file"
                                :on-success="uploadSuccess"
                                :before-upload="beforeFileUpload"
                                accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,.mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                            >
                                <el-button type="primary">
                                    {{ $t("message.upload") }}
                                </el-button>
                            </el-upload>
                            <br />
                            <a :href="getAbsolutePath(fileId)" target="_blank">
                                {{ originName }}</a
                            >
                            <i
                                v-if="fileId"
                                style="cursor: pointer"
                                class="el-tag__close el-icon-close"
                                @click="uploadClose"
                            />
                            <a
                                v-show="
                                    Number(typeEdit) === 1 &&
                                        fileName &&
                                        !fileId
                                "
                                :href="getAbsolutePath(fileUrl)"
                                target="_Blank"
                            >
                                {{ fileName }}
                            </a>
                            <i
                                v-show="
                                    Number(typeEdit) === 1 &&
                                        fileName &&
                                        !fileId
                                "
                                style="cursor: pointer"
                                class="el-tag__close el-icon-close"
                                @click="uploadClose"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.Available_from')"
                            style=""
                        >
                            <el-date-picker
                                v-model="startTime"
                                type="datetime"
                                placeholder="Select a date"
                                style="width: 35%"
                            />
                        </el-form-item>
                        <el-form-item :label="$t('message.Until')" style="">
                            <el-date-picker
                                v-model="endTime"
                                type="datetime"
                                placeholder="Select a date"
                                style="width: 35%"
                            />
                        </el-form-item>

                        <el-row>
                            <el-col :span="20">
                                <el-form-item>
                                    <el-button style="" @click="editorcancel">
                                        {{ $t("message.Cancel") }}
                                    </el-button>
                                    <p style="float: right;margin-right: 12%">
                                        <el-button
                                            v-if="
                                                allowStudentCreateDiscussion ==
                                                    1 && typeEdit != '1'
                                            "
                                            type="primary"
                                            style=""
                                            @click="
                                                discussionPublish('ruleform')
                                            "
                                        >
                                            {{ $t("message.Save&Publish") }}
                                        </el-button>
                                        <!--<el-button type="primary" @click="onSubmit" v-if="allowStudentCreateDiscussion = 1" style="">-->
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
import defaultHead from "../../../../../static/images/touxiang1.png";

export default {
    data() {
        const postRules = (rule, value, callback) => {
            if (this.ruleform.postTo.length == 0) {
                callback(new Error("李孟雪哈哈哈"));
            } else {
                callback();
            }
        };
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
                ],
                // assignmentGroupId:[
                //   {validator:isGrades,trigger:'change'}
                // ],
                // score: [
                //   { validator: zhengNumber, trigger: 'blur' }
                // ],
                postTo: [
                    {
                        required: true,
                        validator: postRules,
                        message: this.$t("message.A_section_is_required"),
                        trigger: "blur"
                    }
                ]
                // studyGroupSetId:[
                //   {validator: studyGroup, trigger:'blur'}
                // ],
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
            fileId: "",
            originName: "",
            fileUrl: "",
            fileName: "",
            ruleform: {
                postTo: [],
                titles: ""
            },
            allowStudentCreateDiscussion: "",
            allowStudentEditDiscussion: "",
            allowDiscussionAttachFile: this.$route.query
                .allowDiscussionAttachFile,
            courseId: this.$route.query.courseId,
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
            activeName: "first"
        };
    },
    watch: {
        postSections(val) {
            this.ruleform.postTo = val;
            console.log(
                "postTo",
                this.ruleform.postTo,
                this.ruleform.postTo.length
            );
        },
        title(val) {
            this.ruleform.titles = val;
        }
    },
    mounted() {
        this.sections();
        this.editForm();
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
        selectChange(val) {
            if (
                val.length >= 2 &&
                val.indexOf(0) > -1 &&
                val.indexOf(0) < val.length - 1
            ) {
                const _index = val.indexOf(0);
                val = val.splice(_index, 1);
            } else if (val.length >= 2 && val.indexOf(0) == val.length - 1) {
                this.postSections = [0];
            }
        },
        uploadSuccess(response, file, fileList) {
            this.fileList = fileList;
            response.entity.forEach((item, index) => {
                this.fileId = item.fileId;
                this.originName = item.originName;
            });
            this.$message({
                showClose: true,
                message: this.$t("message.Certification.Upload_successfully"),
                type: "success"
            });
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
        uploadClose() {
            this.fileId = "";
            this.originName = "";
            this.fileUrl = "";
            this.fileName = "";
        },
        // 初始化班级列表
        sections() {
            this.allowStudentCreateDiscussion = this.$route.query.allowStudentCreateDiscussion;
            this.allowStudentEditDiscussion = this.$route.query.allowStudentEditDiscussion;
            this.allowDiscussionAttachFile = this.$route.query.allowDiscussionAttachFile;
            console.log(this.courseId);
            console.log(
                "123",
                this.allowStudentCreateDiscussion,
                this.allowStudentEditDiscussion,
                this.allowDiscussionAttachFile
            );
            this.$http
                .get(`${process.env.NODE_ENV}/assign/get`, {
                    params: { data: this.courseId }
                })
                .then(res => {
                    console.log(res.data.entity);
                    // this.postToSection.push({
                    //   id: 0,
                    //   type: 1,
                    //   name: 'ALL'
                    // })
                    for (let i = 0; i < res.data.entity.sections.length; i++) {
                        this.postToSection.push(res.data.entity.sections[i]);
                    }
                });
        },
        discussionPublish(ruleform) {
            const disAssigns = [];
            for (let i = 0; i < this.postSections.length; i++) {
                disAssigns.push({
                    assignType: this.postSections[i] == 0 ? 1 : 2,
                    assignId: this.postSections[i],
                    startTime: this.startTime,
                    endTime: this.endTime
                });
            }
            const params = {
                courseId: this.courseId,
                title: this.title,
                content: this.content,
                type: 1,
                fileId: this.fileId,
                status: 1,
                assign: disAssigns
            };
            this.$refs[ruleform].validate(valid => {
                if (valid) {
                    this.$http
                        .post(`${process.env.NODE_ENV}/discussion/add`, params)
                        .then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.$router.push({
                                    path:
                                        "/studentHomePage/studentAllCourse/studentCourseDiscussionCreateList",
                                    query: { courseId: this.courseId }
                                });
                            }
                        });
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
                            } else {
                                this.assign.forEach(a => {
                                    this.postSections.push(a.assignId);
                                    this.startTime = a.startTime;
                                    this.endTime = a.endTime;
                                });
                            }
                            this.assign.forEach(a => {
                                a.assignId = `${a.assignType}_${a.assignId}`;
                            });
                            if (res.data.entity.attachmentFile) {
                                this.fileUrl =
                                    res.data.entity.attachmentFile.fileUrl;
                                this.fileName =
                                    res.data.entity.attachmentFile.fileName;
                            }
                        }
                    });
            }
        },
        editSavePublish() {
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
                fileId: this.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: this.ruleform.score,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 1,
                assign: disAssigns
            };
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/modify`, params)
                .then(res => {
                    console.log(res);
                    // this.discussionList();
                    this.$router.push({
                        path:
                            "/studentHomePage/studentAllCourse/studentCourseDiscussionCreateList",
                        query: { courseId: this.courseId }
                    });
                });
        },

        editorcancel() {
            this.$router.push({
                path:
                    "/studentHomePage/studentAllCourse/studentCourseDiscussionCreateList",
                query: { courseId: this.courseId }
            });
        },
        onSubmitlist() {
            console.log("submit!");
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        // goToDetail() {
        //   this.$router.push({path:"/studentHomePage/courseIndex"})
        // },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        showRowDetail(row, event, column) {
            // 赋值给radio
            this.radio = this.tableData.indexOf(row);
            this.selected = row;
            console.log(row.name);
            this.discussionStepFour = true;
            this.discussionStepThree = false;
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
