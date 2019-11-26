<template>
    <!--eslint-disable-->
    <div v-show="annnouncementStepTwo" class="annnouncementStepTwo">
        <el-row>
            <el-col :span="18" style="">
                <el-form ref="announce" :model="announce" :rules="rules">
                    <el-row>
                        <el-col :span="23">
                            <el-form-item prop="topic">
                                <el-input
                                    v-model="announce.topic"
                                    :placeholder="
                                        $t('message.ANNOUNCE.TOPIC_TITLE')
                                    "
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <div class="editor">
                                <el-row style="">
                                    <el-col :span="24">
                                        <div class="editor">
                                            <el-form-item>
                                                <ckeditor
                                                    v-model="announce.content"
                                                    :editor="editor"
                                                    :config="editorConfig"
                                                />
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                </el-row>
                                <!--我是一个富文本编辑器-->
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <el-form
                    ref="ruleform"
                    label-width="180px"
                    label-position="right"
                    style="margin-top: 10px"
                >
                    <el-row>
                        <el-col :span="24">
                            <el-form-item
                                :label="$t('message.ANNOUNCE.POST_TO')"
                            >
                                <el-select
                                    v-model="sectionIds"
                                    :placeholder="$t('message.All')"
                                    style="width: 60%"
                                    multiple
                                    @change="selectChange"
                                >
                                    <el-option
                                        v-for="item in sections"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item
                        :label="$t('message.ANNOUNCE.ATTACHMENT')"
                        style=""
                    >
                        <el-upload
                            style="display: inline-block"
                            class="upload-demo"
                            :on-exceed="handleExceed"
                            :action="upload"
                            :before-upload="beforeFileUpload"
                            :file-list="file"
                            :on-success="uploadSuccess"
                            accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,
                       .mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                        >
                            <el-button type="primary">
                                {{ $t("message.ANNOUNCE.CLICK_TO_UPLOAD") }}
                            </el-button>
                        </el-upload>
                        <br />
                        <a :href="getAbsolutePath(fileId)" target="_blank">{{
                            originName
                        }}</a>
                        <i
                            v-if="fileId"
                            style="cursor: pointer"
                            class="el-tag__close el-icon-close"
                            @click="uploadClose"
                        />
                        <a
                            v-if="announceFileUrl && !fileId"
                            :href="getAbsolutePath(announceFileUrl)"
                            target="_blank"
                            >{{ announceFileName }}</a
                        >
                        <i
                            v-if="announceFileUrl && !fileId"
                            style="cursor: pointer"
                            class="el-tag__close el-icon-close"
                            @click="uploadClose"
                        />
                    </el-form-item>
                    <!--<el-form-item label="Options">-->
                    <!--<el-checkbox v-model="chose">-->
                    <!--Delay posting-->
                    <!--</el-checkbox>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item-->
                    <!--v-show="chose"-->
                    <!--:label="$t('message.ANNOUNCE.DELAY_PUBLISH_AT')"-->
                    <!--style="width: 150%;"-->
                    <!--&gt;-->
                    <!--<el-date-picker-->
                    <!--v-model="announce.publishTime"-->
                    <!--type="datetime"-->
                    <!--:placeholder="$t('message.ANNOUNCE.SELECT_DATE')"-->
                    <!--style="width: 21%"-->
                    <!--/>-->
                    <!--</el-form-item>-->
                    <el-form-item label="" style="">
                        <el-checkbox-group v-model="announce.allowComment">
                            <el-checkbox
                                :label="
                                    $t(
                                        'message.ANNOUNCE.AOLLOW_USERS_TO_COMMENT'
                                    )
                                "
                                name="allowComment"
                            />
                        </el-checkbox-group>
                    </el-form-item>
                    <el-row>
                        <el-col :span="15">
                            <el-form-item style="">
                                <el-button @click="editorcancel">
                                    {{ $t("message.Cancel") }}
                                </el-button>
                                <el-button
                                    type="primary"
                                    style="margin-left: 44%"
                                    @click="onSubmit('announce')"
                                >
                                    {{ $t("message.Save") }}
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import commonRight from "@/utils/right/commonRight.vue";
import defaultHead from "../../../../static/images/touxiang1.png";

export default {
    name: "Announcementadmit",
    components: {
        // assignTo,
        commonRight
    },
    data() {
        return {
            rules: {
                topic: [
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
                // content: [
                //   { required: true, message: 'Please enter content', trigger: 'blur' },
                // ],
            },
            fileList: [],
            defaultHead,
            chose: "",
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            file: [],
            courseId: this.$route.query.courseId,
            announceId: this.$route.query.announceId,
            upload: `${process.env.NODE_ENV}/upload`,
            sections: [{ name: "All Sections", id: 0 }],
            annnouncementStepOne: true,
            annnouncementStepTwo: true,
            annnouncementStepThree: false,
            annnouncementStepFour: false,
            activeName: "first",
            form: {
                name: "",
                region: ""
            },
            ruleform: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                sectionIds: [],
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            sectionIds: [0],
            announce: {
                // 公告添加DTO
                courseId: this.$route.query.courseId,
                topic: null,
                content: "",
                allowComment: 0,
                publishTime: null,
                studyGroupId: null,
                fileId: null,
                originName: ""
            },
            fileId: null,
            originName: "",
            announceFileName: "",
            announceFileUrl: ""
        };
    },
    computed: {
        uploadDisabled() {
            return this.fileList.length >= 1;
            this.$message.error("只支持单文件上传");
        }
    },
    mounted() {
        this.initAssignData();
        this.announceDetail();
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
                this.sectionIds = [0];
            }
        },
        ransfHtml(str) {
            const dd = str.replace(/<\/?.+?>/g, "");
            let dds = dd;
            // let dds = dd.replace(/ /g,"");//dds为得到后的内容
            dds = dds.replace(/&nbsp;/, "");
            return dds;
        },
        nodeClick(fileName) {
            this.announce.content += `${fileName}`;
        },
        fileSucess(fileName) {
            this.announce.content += `${fileName}`;
        },
        getFileName(fileName) {
            this.announce.content += `${fileName}`;
        },
        uploadClose() {
            this.fileId = "";
            this.originName = "";
            this.announceFileName = "";
            this.announceFileUrl = "";
        },
        // 公告编辑数据回显
        async announceDetail() {
            // this.announce.content = '';
            if (this.announceId == undefined) return;
            const params = {
                data: this.announceId
            };
            const result = await this.$getData("/announce/get", params, "get");
            if (result.data.code == 200) {
                this.announce = result.data.entity;
                if (result.data.entity.attachmentFile) {
                    this.announceFileName =
                        result.data.entity.attachmentFile.fileName;
                    this.announceFileUrl =
                        result.data.entity.attachmentFile.fileUrl;
                }
                if (this.announce.publishTime) {
                    this.chose = true;
                }

                // 允许评论选中状态
                this.announce.allowComment == 1
                    ? (this.announce.allowComment = true)
                    : (this.announce.allowComment = false);
                // 分配历史回显
                this.sectionIds = [];
                this.announce.assign.forEach(assign => {
                    if (assign.assignType == 1) {
                        this.sectionIds.push(0);
                    } else if (assign.assignType == 2) {
                        this.sectionIds.push(assign.assignId);
                    }
                });
            } else {
                this.$message.error(result.data.message);
            }
        },
        async initAssignData() {
            const params = { data: this.courseId };
            const result = await this.$getData("/assign/get", params, "get");
            if (result.data.code == 200) {
                result.data.entity.sections.forEach(section => {
                    this.sections.push(section);
                });
            } else {
                this.$message.error(result.data.message);
            }
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
            this.$router.push({
                path: "/homePage/allCourse/announcementlist",
                query: { courseId: this.$route.query.courseId }
            });
        },
        reply() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = false;
            this.annnouncementStepFour = true;
        },
        uploadSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.fileList = fileList;
                response.entity.map((item, index) => {
                    this.fileId = item.fileId;
                    this.originName = item.originName;
                    this.announce.fileId = item.fileId;
                    this.announce.originName = item.originName;
                });
                this.$message({
                    showClose: true,
                    message: this.$t(
                        "message.Certification.Upload_successfully"
                    ),
                    type: "success"
                });
            }
        },
        beforeFileUpload(file) {
            const isLitSize = file.size / 1024 / 1024 < 400;
            if (!isLitSize) {
                this.$message({
                    message: this.$t("message.File_size_exceeds_quota"),
                    type: "warning"
                });
            }
            return isLitSize;
        },
        handleExceed(files, fileList) {
            // this.$message.warning(`You have already uploaded a file, no more one is available.`);
        },
        onSubmit(announc) {
            const { announce } = this;
            /** *****构造分配数组start********* */
            const assigns = [];
            for (let i = 0; i < this.sectionIds.length; i++) {
                if (this.sectionIds[i] == 0) {
                    assigns.push({ assignType: 1 });
                } else {
                    assigns.push({
                        assignType: 2,
                        assignId: this.sectionIds[i]
                    });
                }
            }
            announce.assign = assigns;
            /** *****构造分配数组end********* */
            this.$refs[announc].validate(valid => {
                if (this.announce.content) {
                    if (valid) {
                        let url = `${process.env.NODE_ENV}/announce/add`;
                        if (announce.id != undefined) {
                            url = `${process.env.NODE_ENV}/announce/modify`;
                        }
                        this.$http
                            .post(url, announce)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$router.push({
                                        path:
                                            "/homePage/allCourse/announcementlist",
                                        query: {
                                            courseId: this.$route.query.courseId
                                        }
                                    });
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                } else {
                    this.$message.error(
                        this.$t("message.ANNOUNCE.Content_is_required")
                    );
                }
            });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
.annnouncementStepTwo {
    /deep/ el-icon-circle-check:before {
        content: "";
    }
    /deep/.el-upload-list__item .el-icon-upload-success:before {
        content: "";
        display: none;
    }
    /deep/ .el-upload-list__item-name {
        display: none;
    }
    /*position: relative;*/
    /deep/ .ck-editor__main {
        height: 210px;
    }
    /deep/ .ck-content {
        height: 210px;
    }

    .editor {
        margin-top: 10px;
        /*border: 1px solid #e7ebf7;*/
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
    /deep/.el-upload-list {
        /*display: none;*/
    }
}
</style>
