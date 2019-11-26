<template>
    <div style="padding: 50px 30px 0 0">
        <div class="resourceHeader">
            <h1>Share to Resource</h1>
            <a class="back" @click="courseResourceBack">
                {{ $t("message.RESOURCE.Back") }}
                <i
                    class="iconfont icon-ai207"
                    style="font-size: 24px; vertical-align:top; color: #666"
                />
            </a>
        </div>
        <div class="resourceMain">
            <div class="resourceLeft">
                <h2 class="resourceTitle">
                    <i v-show="originType === 1" class="iconfont icon-edit1" />
                    <i
                        v-show="originType === 2"
                        class="iconfont icon-liaotian"
                    />
                    <i
                        v-show="originType === 3"
                        class="iconfont icon--xiugaineirong"
                    />
                    <i v-show="originType === 15" class="iconfont icon-shu" />
                    {{ originName }}
                </h2>
                <div class="courseResource_box">
                    <!-- v-if='hasShared' -->
                    <div v-if="hasShared">
                        <el-checkbox v-model="isUpdate" @change="changeUpdate">
                            <p class="update-tips">
                                {{ $t("message.RESOURCE.Update_resource") }}
                            </p>
                        </el-checkbox>
                        <div v-if="isUpdate" class="update-box">
                            <ul class="update-list">
                                <li>
                                    <h1>
                                        <i>*</i>
                                        {{
                                            $t(
                                                "message.RESOURCE.Select_resource"
                                            )
                                        }}
                                    </h1>
                                    <el-radio-group
                                        v-model="updateId"
                                        style="width:100%"
                                    >
                                        <ul class="radioList">
                                            <li
                                                v-for="(item,
                                                index) in updateRadioList"
                                                :key="index"
                                            >
                                                <el-radio
                                                    :label="item.id"
                                                    @change="changeVersion"
                                                >
                                                    <div class="radioItem">
                                                        <el-tooltip
                                                            class="item"
                                                            effect="dark"
                                                            :content="item.name"
                                                            placement="top"
                                                        >
                                                            <h2
                                                                class="rItemName"
                                                            >
                                                                {{ item.name }}
                                                            </h2>
                                                        </el-tooltip>

                                                        <span
                                                            >{{
                                                                $t(
                                                                    "message.RESOURCE.Current_version"
                                                                )
                                                            }}:
                                                            {{
                                                                item.version
                                                                    | formDate
                                                            }}
                                                        </span>
                                                    </div>
                                                </el-radio>
                                            </li>
                                        </ul>
                                    </el-radio-group>
                                </li>
                                <li style="margin-top: 10px">
                                    <h1>
                                        <i>*</i>
                                        {{
                                            $t("message.RESOURCE.Version_notes")
                                        }}
                                        <span
                                            style="font-size:12px; color:#666"
                                            >{{
                                                $t(
                                                    "message.RESOURCE.Descrip_version"
                                                )
                                            }}</span
                                        >
                                    </h1>
                                    <el-input
                                        v-model="versionNotes"
                                        type="textarea"
                                        :rows="3"
                                        style="margin-top:6px"
                                        maxlength="500"
                                        @blur="textBlur"
                                    />
                                    <p v-if="isNote" style="color: #F56C6C">
                                        {{
                                            $t(
                                                "message.RESOURCE.Version_required"
                                            )
                                        }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <el-form
                        ref="shareForm"
                        :model="shareForm"
                        :rules="shareRules"
                        class="shareBox"
                        label-position="top"
                    >
                        <el-form-item label="Sharing range">
                            <el-radio-group v-model="shareForm.shareRange">
                                <p style="margin-top: 20px">
                                    <el-radio :label="1">
                                        {{ $t("message.RESOURCE.Only_me") }}
                                    </el-radio>
                                </p>
                                <p style="margin-top: 20px">
                                    <el-radio :label="2">
                                        {{
                                            $t(
                                                "message.RESOURCE.Share_institue"
                                            )
                                        }}
                                    </el-radio>
                                </p>
                                <p v-if="isPublic" style="margin-top: 20px">
                                    <el-radio :label="3">
                                        {{
                                            $t(
                                                "message.RESOURCE.Share_users_system"
                                            )
                                        }}
                                    </el-radio>
                                </p>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            :label="
                                $t('message.RESOURCE.Selct_licence_copyright')
                            "
                            prop="licence"
                        >
                            <el-select v-model="shareForm.licence">
                                <el-option
                                    v-for="item in licenceList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                            <a class="liceImage">
                                <img :src="licenImgSrc" />
                            </a>
                        </el-form-item>
                        <el-form-item label="Title" prop="name">
                            <el-input
                                v-model="shareForm.name"
                                maxlength="200"
                            />
                        </el-form-item>
                        <el-form-item label="Description" prop="description">
                            <el-input
                                v-model="shareForm.description"
                                type="textarea"
                                :rows="3"
                                maxlength="1000"
                            />
                        </el-form-item>
                        <el-form-item label="Tags">
                            <div>
                                <el-input
                                    v-model="newTagName"
                                    style="width: 300px"
                                    maxlength="30"
                                    :disabled="shareForm.tags.length >= 5"
                                />
                                <el-button
                                    size="small"
                                    style="height: 40px"
                                    @click="addTag"
                                >
                                    {{ $t("message.Add") }}
                                </el-button>
                                <p>
                                    <el-tag
                                        v-for="(tag, index) in shareForm.tags"
                                        :key="index"
                                        :disable-transitions="false"
                                        closable
                                        @close="handleTagClose(tag)"
                                    >
                                        {{ tag }}
                                    </el-tag>
                                </p>
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="Image"
                            prop="fileUrl"
                            class="imageUrl"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload"
                                :on-success="handleAvatarSuccess"
                            >
                                <el-button round class="upBtn">
                                    {{ $t("message.RESOURCE.Upload_change") }}
                                </el-button>
                                <img
                                    v-if="shareForm.fileUrl"
                                    :src="shareForm.fileUrl"
                                    class="avatar"
                                />
                                <p v-show="imgWarn" class="imgWarn">
                                    {{ imageWarn }}
                                </p>
                            </el-upload>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.RESOURCE.Grade_level')"
                        >
                            {{ $t("message.RESOURCE.From") }}
                            <el-select
                                v-model="shareForm.gradeStart"
                                :placeholder="$t('message.RESOURCE.Pls_select')"
                                @change="changeStartGrade"
                            >
                                <el-option
                                    v-for="item in gradeStartList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                            &nbsp; to &nbsp;
                            <el-select
                                v-model="shareForm.gradeEnd"
                                :placeholder="$t('message.RESOURCE.Pls_select')"
                                @change="changeEndStart"
                            >
                                <el-option
                                    v-for="item in gradeEndList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <div class="formBottom">
                            <el-button @click="cancelShare">
                                {{ $t("message.Cancel") }}
                            </el-button>
                            <el-button
                                type="primary"
                                @click="toShare('shareForm')"
                            >
                                {{ $t("message.Share") }}
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="resourceRight" />
        </div>
    </div>
</template>

<script>
import utilMethods from "@/utils/utilMethods";
import {
    getResList,
    addRes,
    resEditSearch,
    getResRange
} from "@/api/resourceRequst";
import { formatDate } from "@/utils/date";

export default {
    filters: {
        formDate(val) {
            if (val) {
                const tempVal = Number(val);
                const tempDate = new Date(tempVal);
                return formatDate(tempDate, "yyyy-MM-dd hh:mm:ss");
            }
            return "";
        }
    },
    data() {
        return {
            imgWarn: false,
            imageWarn: "",
            baseUrl: process.env.FILE_PRE_SERVER,
            uploadUrl: `${process.env.NODE_ENV}/upload`,
            originType: "",
            originId: "",
            hasShared: false,
            isUpdate: true,
            updateId: "",
            updateRadioList: [],
            versionNotes: "",
            newTagName: "",
            shareForm: {
                shareRange: 1,
                licence: 1,
                name: "",
                description: "",
                tags: [],
                fileUrl: "",
                orginFileUrl: "",
                gradeStart: "",
                gradeEnd: ""
            },
            shareRules: {
                licence: [
                    {
                        required: true,
                        message: "Licence is required",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "Title is required",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: "The length cannot exceed 200",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "Description is required",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 1000,
                        message: "The length cannot exceed 1000",
                        trigger: "blur"
                    }
                ]
                // fileUrl: [
                //     {
                //         required: true,
                //     },
                // ],
            },
            licenceList: utilMethods.licenceList,
            gradeList: utilMethods.gradeList,
            gradeStartList: utilMethods.gradeList,
            gradeEndList: utilMethods.gradeList,
            isNote: "",
            resFromPath: "",
            initTitle: "",
            isPublic: true
        };
    },
    computed: {
        originName() {
            switch (this.originType) {
                case 1:
                    return "Assignment";
                case 2:
                    return "Discussion";
                case 3:
                    return "Quiz";
                case 15:
                    return "Course";
                default:
                    return true;
            }
        },
        licenImgSrc() {
            const tempLicen = this.licenceList.find(
                el => el.id === this.shareForm.licence
            );
            return require(`../../../assets/images/${tempLicen.image}`);
        }
    },
    beforeRouteEnter(to, from, next) {
        if (from.fullPath !== "/") {
            localStorage.setItem("resFromPath", from.fullPath);
        }
        next();
    },
    created() {
        this.getResRange();
        this.originType = Number(this.$route.query.originType);
        this.originId = this.$route.query.id;
        this.initTitle = this.$route.query.resourceTitle;
        this.shareForm.name = this.initTitle;
        this.getResList();
        this.resFromPath = localStorage.getItem("resFromPath");
    },
    methods: {
        async getResRange() {
            const res = await getResRange();
            if (Number(res.data.code) === 200) {
                const tempRange = res.data.entity.shareRange;
                if (tempRange === 3) {
                    this.isPublic = true;
                } else {
                    this.isPublic = false;
                }
            }
        },
        courseResourceBack() {
            this.$router.push({
                path: this.resFromPath
            });
        },
        async getResList() {
            // 获取资源列表
            const param = {
                originId: this.originId,
                originType: this.originType
            };
            const res = await getResList(param);
            if (Number(res.data.code) === 200) {
                if (res.data.entity.length !== 0) {
                    this.updateRadioList = res.data.entity;
                    this.updateId = this.updateRadioList[0].id;
                    this.changeVersion();
                    this.hasShared = true;
                } else {
                    this.hasShared = false;
                }
            }
        },
        handleTagClose(tag) {
            this.shareForm.tags.splice(this.shareForm.tags.indexOf(tag), 1);
        },
        addTag() {
            const tempTagVal = this.newTagName;
            if (tempTagVal) {
                this.shareForm.tags.push(tempTagVal);
            }
            this.newTagName = "";
        },
        beforeAvatarUpload(file) {
            const tempFileType = file.type;
            const tempFileSize = file.size / 1024 / 1024;
            if (
                tempFileType !== "image/jpeg" &&
                tempFileType !== "image/png" &&
                tempFileType !== "image/bmp" &&
                tempFileType !== "image/ppm"
            ) {
                this.imgWarn = true;
                this.imageWarn = "File type shoud be Jpeg jpg png bmp ppm!";
                return false;
            }
            if (tempFileSize > 5) {
                this.imgWarn = true;
                this.imageWarn = "should be less than 5M";
                return false;
            }
            this.imgWarn = false;
            return true;
        },
        handleAvatarSuccess(res) {
            if (Number(res.code) === 200) {
                this.shareForm.fileUrl = this.baseUrl + res.entity[0].fileId;
                this.shareForm.orginFileUrl = res.entity[0].fileId;
            }
        },
        changeStartGrade(val) {
            const tempIndex = val;
            const tempGradList = Object.assign([], this.gradeList);
            this.gradeEndList = tempGradList.slice(tempIndex);
        },
        changeEndStart(val) {
            const tempIndex = val + 1;
            const tempGradList = Object.assign([], this.gradeList);
            this.gradeStartList = tempGradList.slice(0, tempIndex);
        },
        textBlur() {
            if (this.versionNotes.trim() === "") {
                this.isNote = true;
            } else {
                this.isNote = false;
            }
        },
        changeUpdate() {
            if (this.isUpdate) {
                this.changeVersion();
            } else {
                this.$refs.shareForm.resetFields();
                this.shareForm.gradeEnd = "";
                this.shareForm.gradeStart = "";
            }
        },
        async changeVersion() {
            const param = { data: this.updateId };
            const res = await resEditSearch(param);
            if (Number(res.data.code === 200)) {
                const tempResData = res.data.entity;
                this.shareForm.shareRange = Number(tempResData.shareRange);
                this.shareForm.licence = tempResData.licence;
                this.shareForm.name = tempResData.name;
                this.shareForm.description = tempResData.description;
                this.shareForm.tags = tempResData.tags;
                this.shareForm.fileUrl =
                    this.baseUrl + tempResData.thumbnailUrl;
                this.shareForm.orginFileUrl = tempResData.thumbnailUrl;
                this.shareForm.gradeStart = tempResData.gradeStart;
                this.shareForm.gradeEnd = tempResData.gradeEnd;
                // this.versionNotes = tempResData.versionNotes;
            }
        },
        cancelShare() {
            this.$refs.shareForm.resetFields();
            this.shareForm.gradeEnd = "";
            this.shareForm.gradeStart = "";
            this.$router.push({
                path: this.resFromPath
            });
        },
        toShare(formName) {
            /* eslint-disable consistent-return */
            this.imgWarn = false;
            if (
                this.versionNotes.trim() === "" &&
                this.isUpdate === true &&
                this.hasShared
            ) {
                this.isNote = true;
                return;
            }
            this.isNote = false;
            this.$refs[formName].validate(async valid => {
                if (this.shareForm.fileUrl === "") {
                    this.imgWarn = true;
                    this.imageWarn = "image is required";
                    return false;
                }
                if (valid) {
                    let initParam = {};
                    let gradeObj = {};
                    if (
                        this.shareForm.gradeStart !== "" &&
                        this.shareForm.gradeEnd !== ""
                    ) {
                        if (
                            Number(this.shareForm.gradeStart) ===
                            Number(this.shareForm.gradeEnd)
                        ) {
                            gradeObj = {
                                gradeStart: this.shareForm.gradeStart
                            };
                        } else {
                            gradeObj = {
                                gradeStart: Number(this.shareForm.gradeStart),
                                gradeEnd: Number(this.shareForm.gradeEnd)
                            };
                        }
                    } else {
                        gradeObj = {
                            gradeStart:
                                this.shareForm.gradeStart === ""
                                    ? ""
                                    : Number(this.shareForm.gradeStart),
                            gradeEnd:
                                this.shareForm.gradeEnd === ""
                                    ? ""
                                    : Number(this.shareForm.gradeEnd)
                        };
                    }
                    if (this.hasShared && this.isUpdate) {
                        initParam = {
                            originId: Number(this.originId),
                            shareRange: Number(this.shareForm.shareRange),
                            licence: Number(this.shareForm.licence),
                            name: this.shareForm.name,
                            description: this.shareForm.description,
                            fileUrl: this.shareForm.orginFileUrl,
                            originType: Number(this.originType),
                            tags: this.shareForm.tags,
                            updateId: this.updateId
                                ? Number(this.updateId)
                                : "",
                            versionNotes: this.versionNotes
                        };
                    } else {
                        initParam = {
                            originId: Number(this.originId),
                            shareRange: Number(this.shareForm.shareRange),
                            licence: Number(this.shareForm.licence),
                            name: this.shareForm.name,
                            description: this.shareForm.description,
                            fileUrl: this.shareForm.orginFileUrl,
                            originType: Number(this.originType),
                            tags: this.shareForm.tags
                        };
                    }
                    const param = Object.assign(initParam, gradeObj);
                    const res = await addRes(param);
                    if (Number(res.data.code) === 200) {
                        this.$message.success("add share success");
                        this.$router.push({
                            path: this.resFromPath
                        });
                    }
                }
            });
            /* eslint-disable consistent-return */
        }
    }
};
</script>

<style lang="less" scoped>
@import "./reCourse.less";
</style>
