<template>
    <div style="padding: 50px 30px 0 0">
        <div class="resourceHeader">
            <h1>{{ $t("message.RESOURCE.Edit_resource") }}</h1>
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
                    <i
                        v-show="Number(originType) === 1"
                        class="iconfont icon-edit1"
                    />
                    <i
                        v-show="Number(originType) === 2"
                        class="iconfont icon-liaotian "
                    />
                    <i
                        v-show="Number(originType) === 3"
                        class="iconfont icon--xiugaineirong -"
                    />
                    <i
                        v-show="Number(originType) === 15"
                        class="iconfont icon-shu"
                    />
                    {{ originName }}
                </h2>
                <div class="courseResource_box">
                    <el-form
                        ref="shareForm"
                        :model="shareForm"
                        :rules="editRules"
                        class="shareBox"
                        label-position="top"
                    >
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
                        <el-form-item
                            :label="$t('message.RESOURCE.Share_range')"
                        >
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
                                <p style="margin-top: 20px">
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
                        <el-form-item label="Title" prop="name">
                            <el-input
                                v-model="shareForm.name"
                                maxlength="200"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.Description')"
                            prop="description"
                        >
                            <el-input
                                v-model="shareForm.description"
                                type="textarea"
                                :rows="3"
                                maxlength="1000"
                            />
                        </el-form-item>
                        <el-form-item
                            v-if="hasVersion"
                            :label="$t('message.RESOURCE.Version_change')"
                            prop="versionNotes"
                        >
                            <el-input
                                v-model="shareForm.versionNotes"
                                type="textarea"
                                :rows="3"
                                maxlength="500"
                            />
                        </el-form-item>
                        <el-form-item :label="$t('message.RESOURCE.Tags')">
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
                            :label="$t('message.Image')"
                            prop="fileUrl"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload"
                                :on-success="handleAvatarSuccess"
                            >
                                <el-button round class="upBtn">
                                    {{ $t("message.RESOURCE.Update_change") }}
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
                            <el-button @click="cancelEdit">
                                {{ $t("message.Cancel") }}
                            </el-button>
                            <el-button
                                type="primary"
                                @click="toEdit('shareForm')"
                            >
                                {{ $t("message.submit") }}
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resEditSearch, modifyResource } from "@/api/resourceRequst";
import utilMethods from "@/utils/utilMethods";

export default {
    components: {},
    data() {
        return {
            imgWarn: false,
            imageWarn: "",
            hasVersion: false,
            baseUrl: process.env.FILE_PRE_SERVER,
            uploadUrl: `${process.env.NODE_ENV}/upload`,
            originType: "",
            originId: "",
            resData: {},
            licenceList: utilMethods.licenceList,
            gradeList: utilMethods.gradeList,
            gradeStartList: utilMethods.gradeList,
            gradeEndList: utilMethods.gradeList,
            newTagName: "",
            type: "",
            shareForm: {
                licence: 1,
                shareRange: 1,
                name: "",
                description: "",
                versionNotes: "",
                fileUrl: "",
                orginFileUrl: "",
                tags: [],
                gradeStart: "",
                gradeEnd: ""
            },
            editRules: {
                licence: [
                    {
                        required: true,
                        message: this.$t("message.RESOURCE.Licence_required"),
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: this.$t("message.RESOURCE.Name_Title"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t("message.RESOURCE.length_exceed_200"),
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: this.$t(
                            "message.RESOURCE.Description_required"
                        ),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 1000,
                        message: this.$t("message.RESOURCE.length_exceed_1000"),
                        trigger: "blur"
                    }
                ],
                versionNotes: [
                    {
                        required: true,
                        message: this.$t(
                            "message.RESOURCE.Version_note_required"
                        ),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        originName() {
            switch (Number(this.originType)) {
                case 1:
                    return this.$t("message.assignment");
                case 2:
                    return this.$t("message.discussion");
                case 3:
                    return this.$t("message.Grade_Quize");
                case 15:
                    return this.$t("message.Course");
                default:
                    return true;
            }
        },
        licenImgSrc() {
            const tempLicen = this.licenceList.find(
                el => el.id === this.shareForm.licence
            );
            return require(`../../assets/images/${tempLicen.image}`);
        },
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type; // 1-管理员 2-老师 4-学生
        }
    },
    created() {
        this.originId = this.$route.query.originId;
        this.originType = this.$route.query.originType;
        this.type = this.$route.query.type;
        this.resEditSearch();
    },
    methods: {
        async resEditSearch() {
            const params = { data: this.originId };
            const res = await resEditSearch(params);
            if (Number(res.data.code) === 200) {
                this.resData = res.data.entity;
                const tempResData = res.data.entity;
                this.shareForm.licence = tempResData.licence;
                this.shareForm.shareRange = tempResData.shareRange;
                this.shareForm.name = tempResData.name;
                this.shareForm.description = tempResData.description;
                this.shareForm.versionNotes = tempResData.versionNotes
                    ? tempResData.versionNotes
                    : "";
                this.hasVersion = Number(tempResData.operationType) === 4;
                this.shareForm.orginFileUrl = tempResData.thumbnailUrl;
                this.shareForm.fileUrl =
                    this.baseUrl + tempResData.thumbnailUrl;
                this.shareForm.gradeStart = tempResData.gradeStart;
                this.shareForm.gradeEnd = tempResData.gradeEnd;
                this.shareForm.tags = tempResData.tags;
            }
        },
        addTag() {
            const tempTagVal = this.newTagName;
            if (tempTagVal) {
                this.shareForm.tags.push(tempTagVal);
            }
            this.newTagName = "";
        },
        handleTagClose(tag) {
            this.shareForm.tags.splice(this.shareForm.tags.indexOf(tag), 1);
        },
        courseResourceBack() {
            let tempPath = "";
            if (this.roleType === 2) {
                tempPath = "/homePage/resourceMain/resourceDetail";
            } else if (this.roleType === 1) {
                tempPath = "/adminHomePage/adminResource/adminResDetail";
            }
            this.$router.push({
                path: tempPath,
                query: {
                    originType: this.originType,
                    originId: this.originId,
                    hasCheck: this.resData.hasCheck,
                    hasNewVersion: this.resData.hasNewNote
                }
            });
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
                this.imageWarn = this.$t("message.eport.File_type_jpg");
                return false;
            }
            if (tempFileSize > 5) {
                this.imgWarn = true;
                this.imageWarn = this.$t("message.RESOURCE.Should_less_5M");
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
            const tempEndGrade = this.gradeEndList[0].id;
            this.shareForm.gradeEnd =
                tempEndGrade > this.shareForm.gradeEnd
                    ? ""
                    : this.shareForm.gradeEnd;
        },
        changeEndStart(val) {
            const tempIndex = val + 1;
            const tempGradList = Object.assign([], this.gradeList);
            this.gradeStartList = tempGradList.slice(0, tempIndex);
            const tempStartGrade = this.gradeStartList[
                this.gradeStartList.length - 1
            ].id;

            this.shareForm.gradeStart =
                tempStartGrade < this.shareForm.gradeStart
                    ? ""
                    : this.shareForm.gradeStart;
        },
        cancelEdit() {
            this.shareForm.licence = this.resData.licence;
            this.shareForm.shareRange = this.resData.shareRange;
            this.shareForm.name = this.resData.name;
            this.shareForm.description = this.resData.description;
            this.shareForm.versionNotes = this.resData.versionNotes
                ? this.resData.versionNotes
                : "";
            this.hasVersion = !!this.resData.versionNotes;
            this.shareForm.orginFileUrl = this.resData.thumbnailUrl;
            this.shareForm.fileUrl = this.baseUrl + this.resData.thumbnailUrl;
            this.shareForm.gradeStart = this.resData.gradeStart;
            this.shareForm.gradeEnd = this.resData.gradeEnd;
            this.shareForm.tags = this.resData.tags;
            let tempPath = "";
            if (this.roleType === 2) {
                tempPath = "/homePage/resourceMain/resourceDetail";
            } else if (this.roleType === 1) {
                tempPath = "/adminHomePage/adminResource/adminResDetail";
            }
            this.$router.push({
                path: tempPath,
                query: {
                    originType: this.originType,
                    originId: this.originId,
                    hasCheck: this.resData.hasCheck,
                    hasNewVersion: this.resData.hasNewNote,
                    type: this.type
                }
            });
        },
        toEdit(formName) {
            /* eslint-disable consistent-return */
            this.imgWarn = false;
            this.$refs[formName].validate(async valid => {
                if (this.shareForm.fileUrl === "") {
                    this.imgWarn = true;
                    this.imageWarn = this.$t("message.RESOURCE.Image_required");
                    return false;
                }
                if (valid) {
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
                    let versionNoteObj = {};
                    if (this.hasVersion) {
                        versionNoteObj = {
                            versionNotes: this.shareForm.versionNotes
                        };
                    }
                    const initParams = {
                        id: Number(this.originId),
                        licence: Number(this.shareForm.licence),
                        shareRange: Number(this.shareForm.shareRange),
                        name: this.shareForm.name,
                        description: this.shareForm.description,
                        tags: this.shareForm.tags,
                        fileUrl: this.shareForm.orginFileUrl
                    };
                    const params = Object.assign(
                        initParams,
                        gradeObj,
                        versionNoteObj
                    );
                    const res = await modifyResource(params);
                    if (Number(res.data.code) === 200) {
                        this.$message.success(
                            this.$t("message.RESOURCE.Edit_success")
                        );
                        let tempPath = "";
                        if (this.roleType === 2) {
                            tempPath = "/homePage/resourceMain/resourceDetail";
                        } else if (this.roleType === 1) {
                            tempPath =
                                "/adminHomePage/adminResource/adminResDetail";
                        }
                        this.$router.push({
                            path: tempPath,
                            query: {
                                originType: this.originType,
                                originId: this.originId,
                                hasCheck: this.resData.hasCheck,
                                hasNewVersion: this.resData.hasNewNote,
                                type: this.type
                            }
                        });
                    } else {
                        this.$message.error(
                            this.$t("message.RESOURCE.Edit_fialed")
                        );
                    }
                }
            });
            /* eslint-disable consistent-return */
        }
    }
};
</script>
<style lang="less" scoped>
@import "../course/homeCourse/reCourse.less";
</style>
