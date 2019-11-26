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
                                            <ckeditor
                                                v-model="announce.content"
                                                :editor="editor"
                                                :config="editorConfig"
                                            />
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
                    <el-form-item
                        :label="$t('message.ANNOUNCE.ATTACHMENT')"
                        style=""
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
                                {{ $t("message.ANNOUNCE.CLICK_TO_UPLOAD") }}
                            </el-button>
                        </el-upload>
                        <br />
                        <a
                            :href="getAbsolutePath(announce.fileId)"
                            target="_blank"
                            >{{ originName }}</a
                        >
                        <i
                            v-if="announce.fileId"
                            class="el-tag__close el-icon-close"
                            @click="uploadClose"
                        />
                        <div v-if="announce.attachmentFile">
                            {{ announce.attachmentFile.fileName }}
                        </div>
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
import { mapGetters } from "vuex";
import commonRight from "@/utils/right/commonRight.vue";
import defaultHead from "../../../../../static/images/touxiang1.png";

export default {
    name: "GroupAnnouncementAdmit",
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
            defaultHead,
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            file: [],
            courseId: this.$route.query.courseId,
            announceId: this.$route.query.announceId,
            groupId: this.$route.query.groupId,
            upload: `${process.env.NODE_ENV}/upload`,
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
            announce: {
                // 公告添加DTO
                courseId: this.$route.query.courseId,
                studyGroupId: this.$route.query.groupId,
                topic: null,
                content: "",
                allowComment: 0,
                fileId: null
                // -:''
            },
            originName: "",

            fileList: "",
            type: ""
        };
    },
    mounted() {
        this.announceDetail();
        this.routerpath();
    },
    computed: {
        ...mapGetters(["userInfoData"])
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
        ransfHtml(str) {
            const dd = str.replace(/<\/?.+?>/g, "");
            let dds = dd;
            // let dds = dd.replace(/ /g,"");//dds为得到后的内容
            dds = dds.replace(/&nbsp;/, "");
            return dds;
        },
        uploadClose() {
            this.announce.fileId = "";
            this.originName = "";
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
        routerpath() {
            this.type = this.userInfoData.type;
        },

        // 公告编辑数据回显
        async announceDetail() {
            if (this.announceId == undefined) return;
            const params = {
                data: this.announceId
            };
            const result = await this.$getData("/announce/get", params, "get");
            if (result.data.code == 200) {
                this.announce = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        contentReplyDetail() {},
        gotolist() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        addAnnoucement() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        editorcancel() {
            const queryJson = {
                courseId: this.$route.query.courseId,
                groupId: this.$route.query.groupId
            };
            if (this.type == 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentMain/groupAnnouncementCreateList",
                    query: queryJson
                });
            } else {
                this.$router.push({
                    path: "/homePage/teacherMain/groupAnnouncementCreateList",
                    query: queryJson
                });
            }
        },
        reply() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = false;
            this.annnouncementStepFour = true;
        },
        uploadSuccess(response, file, fileList) {
            this.fileList = fileList;
            response.entity.map((item, index) => {
                this.announce.fileId = item.fileId;
                this.originName = item.originName;
            });
            this.$message({
                showClose: true,
                message: this.$t("message.Certification.Upload_successfully"),
                type: "success"
            });
        },
        onSubmit(announc) {
            const { announce } = this;
            this.$refs[announc].validate(valid => {
                if (valid && this.announce.content) {
                    let url = `${process.env.NODE_ENV}/announce/add`;
                    if (announce.id != undefined) {
                        url = `${process.env.NODE_ENV}/announce/modify`;
                    }
                    this.$http
                        .post(url, announce)
                        .then(res => {
                            if (res.data.code == 200) {
                                console.log(res.data);
                                const queryJson = {
                                    courseId: this.$route.query.courseId,
                                    groupId: this.$route.query.groupId
                                };
                                if (this.type == 4) {
                                    this.$router.push({
                                        path:
                                            "/studentHomePage/studentMain/groupAnnouncementCreateList",
                                        query: queryJson
                                    });
                                } else {
                                    this.$router.push({
                                        path:
                                            "/homePage/teacherMain/groupAnnouncementCreateList",
                                        query: queryJson
                                    });
                                }
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.$message.error("Content is required");
                }
            });
            // this.annnouncementStepOne = false;
            // this.annnouncementStepTwo = false;
            // this.annnouncementStepThree = true;
            // this.$router.push('/homePage/allCourse/announcementList')
        },
        handleClick() {}
    },
    components: {
        // assignTo,
        commonRight
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
    /deep/.ck-editor__main {
        height: 200px;
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
