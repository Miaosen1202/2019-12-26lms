<template>
    <div class="admin-certification-detail">
        <el-row>
            <el-col :span="3">
                <div class="select-box">
                    <span @click="backToList">
                        <span class="backList">{{
                            $t("message.Messages.back")
                        }}</span>
                        <span class="iconfont icon-ai207" />
                    </span>
                    <div>
                        <el-tabs
                            v-model="activeName"
                            :tab-position="tabPosition"
                            @tab-click="certificationList"
                        >
                            <el-tab-pane
                                :label="$t('message.Certification.Overview')"
                                name="Overview"
                            />
                            <el-tab-pane
                                :label="$t('message.Certification.Learners')"
                                name="Learners"
                                :disabled="disable"
                            />
                        </el-tabs>
                    </div>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="write-certification-box">
                    <span class="write-certification">
                        {{ $t("message.Certification.Certification_Test") }}
                    </span>
                </div>
                <div class="certification-admit-form">
                    <el-form
                        ref="ruleForm"
                        :model="ruleForm"
                        :rules="rules"
                        label-width="180px"
                        class="demo-ruleForm"
                    >
                        <el-form-item
                            :label="
                                $t('message.Certification.Certification_Name')
                            "
                            prop="name"
                        >
                            <el-input
                                v-model="ruleForm.name"
                                :disabled="status == 1"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="
                                $t(
                                    'message.Certification.Certification_Description'
                                )
                            "
                        >
                            <ckeditor
                                v-model="ruleForm.memo"
                                :editor="editor"
                                :config="editorConfig"
                                :disabled="status == 1"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.Certification.type')"
                            prop="type"
                        >
                            <el-radio-group
                                v-model="ruleForm.type"
                                :disabled="status == 1"
                            >
                                <el-radio label="1">
                                    {{ $t("message.Certification.Recurring") }}
                                </el-radio>
                                <el-radio label="0">
                                    {{ $t("message.Certification.Perpetual") }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            v-if="ruleForm.type == 1"
                            :label="
                                $t('message.Certification.Validity_in_months')
                            "
                            prop="validity"
                            style="width: 70%"
                        >
                            <el-input
                                v-model="ruleForm.validity"
                                type="number"
                                :disabled="status == 1"
                                step="0.00001"
                                @mousewheel.native.prevent
                            />
                        </el-form-item>
                        <el-form-item
                            :label="
                                $t('message.Certification.Days_to_complete')
                            "
                            prop="opDay"
                            style="width: 70%"
                        >
                            <el-input
                                v-model="ruleForm.opDay"
                                type="number"
                                :disabled="status == 1"
                                step="0.00001"
                                @mousewheel.native.prevent
                            />
                        </el-form-item>
                        <el-form-item
                            :label="
                                $t('message.Certification.Certification_issuer')
                            "
                        >
                            <el-radio-group
                                v-model="ruleForm.issuer"
                                :disabled="
                                    certificationStatus == 1 || status == 1
                                "
                            >
                                <el-radio label="0">
                                    Internal
                                </el-radio>
                                <el-radio label="1">
                                    External
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.Certification.Cover_Image')"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :class="{ 'avatar-uploader-edit': status == 1 }"
                                :action="upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :disabled="status == 1"
                            >
                                <img
                                    v-if="imageUrl"
                                    :src="imageUrl"
                                    class="avatar"
                                />
                                <img
                                    v-if="ruleForm.fileUrl && !imageUrl"
                                    :src="getAbsolutePath(ruleForm.fileUrl)"
                                    class="avatar"
                                />
                                <span
                                    v-if="ruleForm.fileUrl || imageUrl"
                                    class="choose-image"
                                    style="position:relative;top: -120px;right: 230px;"
                                    >{{
                                        $t(
                                            "message.Certification.Upload_Change"
                                        )
                                    }}</span
                                >
                                <div
                                    v-if="!ruleForm.fileUrl && !imageUrl"
                                    class="choose-image-div"
                                >
                                    <span class="choose-image">{{
                                        $t("message.Certification.Choose_Image")
                                    }}</span>
                                </div>
                                <p v-show="imgWarn" class="imgWarn">
                                    {{ imageWarn }}
                                </p>
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="float: right">
                            <el-button
                                :disabled="status == 1"
                                @click="CancelCertification"
                            >
                                {{ $t("message.Messages.Cancel") }}
                            </el-button>
                            <el-button
                                v-if="editStatus == false"
                                type="primary"
                                :disabled="status == 1"
                                @click="submitForm('ruleForm')"
                            >
                                {{ $t("message.Certification.Save") }}
                            </el-button>
                            <el-button
                                v-if="editStatus == true"
                                type="primary"
                                @click="submitForm('ruleForm', editStatus)"
                            >
                                {{ $t("message.Certification.Republish") }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button
                    v-if="(status == 0 || status == 2) && editStatus == false"
                    class="publish-button"
                    type="primary"
                    style="width: 100%;margin-top: 44%;margin-left: 10%"
                    @click="detailPublish"
                >
                    <i class="iconfont icon-publish" />
                    <span>{{ $t("message.publish") }}</span> </el-button
                ><br />
                <el-button
                    v-if="(status == 0 || status == 2) && editStatus == false"
                    class="delete-button"
                    style="width: 100%;margin-left: 10%;margin-top: 5%"
                    @click="detailDelete"
                >
                    <i class="iconfont icon-delete" />
                    <span>{{ $t("message.Delete") }}</span>
                </el-button>
                <el-button
                    v-if="status == 1 && editStatus == false"
                    class="edit-button"
                    type="primary"
                    style="width: 100%;margin-top: 33%;margin-left: 10%"
                    @click="detailEdit"
                >
                    <i class="iconfont icon-icon-edit" />
                    <span>{{ $t("message.Edit") }}</span> </el-button
                ><br />
                <el-button
                    v-if="status == 1 && editStatus == false"
                    class="retire-button"
                    style="width: 100%;margin-left: 10%;margin-top: 5%"
                    @click="detailRetire"
                >
                    <i class="iconfont icon-retire" />
                    <span>{{ $t("message.Certification.Retire") }}</span>
                </el-button>
            </el-col>
        </el-row>
        <div>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="dialogVisibleCertification"
                width="30%"
            >
                <span>{{
                    $t(
                        "message.Certification.You_are_about_delete_this_Certification"
                    )
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleCertification = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="dialogVisibleCertificationDelete"
                        >{{ $t("message.Delete") }}</el-button
                    >
                </span>
            </el-dialog>
            <el-dialog
                title="Retiring Certification"
                :visible.sync="dialogVisibleCertificationRetiring"
                width="30%"
            >
                <span>{{
                    $t(
                        "message.Certification.Retiring_a_Certification_makes_it_unavailable"
                    )
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        @click="dialogVisibleCertificationRetiring = false"
                        >{{ $t("message.Cancel") }}</el-button
                    >
                    <el-button
                        type="primary"
                        @click="dialogVisibleCertificationRetire"
                        >{{ $t("message.Certification.OK") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    name: "AdminCertificationAdmit",
    data() {
        const zhengNumber = (rule, value, callback) => {
            const boolean = new RegExp("^[1-9][0-9]*$").test(value);
            if (!value) {
                callback(
                    new Error(
                        this.$t("message.Certification.This_field_is_required")
                    )
                );
            } else if (!boolean) {
                callback(
                    new Error(
                        this.$t(
                            "message.Certification.Please_enter_a_valid_number"
                        )
                    )
                );
            } else if (Number(value) < 0 || Number(value) > 240) {
                callback(
                    new Error(
                        this.$t(
                            "message.Certification.Please_enter_a_value_between_1_and_240"
                        )
                    )
                );
            } else {
                callback();
            }
        };
        const daysTo = (rule, value, callback) => {
            const boolean = new RegExp("^[1-9][0-9]*$").test(value);
            const number = Number(this.ruleForm.validity * 30) / 2;
            if (!value) {
                callback(
                    new Error(
                        this.$t("message.Certification.This_field_is_required")
                    )
                );
            } else if (!boolean) {
                callback(
                    new Error(
                        this.$t(
                            "message.Certification.Please_enter_a_valid_number"
                        )
                    )
                );
            } else if (Number(this.ruleForm.type) === 1) {
                if (this.ruleForm.validity) {
                    if (Number(this.ruleForm.validity * 30) / 2 < value) {
                        callback(
                            new Error(
                                this.$t(
                                    "message.Certification.Please_enter_a_value_between_1_and"
                                ) + number
                            )
                        );
                    } else {
                        callback();
                    }
                } else {
                    this.$message({
                        message: this.$t(
                            "message.Certification.The_Validity_must_not_be_blank"
                        ),
                        type: "error"
                    });
                }
            } else if (Number(this.ruleForm.type) === 0) {
                if (value > 10000) {
                    callback(
                        new Error(
                            this.$t(
                                "message.Certification.Please_enter_a_value_between_1_and_10000"
                            )
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            imgWarn: false,
            imageWarn: "",
            certificationId: this.$route.query.certificationId,
            certificationStatus: this.$route.query.certificationStatus,
            activeName: "",
            tabPosition: "right",
            disable: false,
            imageUrl: "",
            upload: `${process.env.NODE_ENV}/upload`,
            ruleForm: {
                name: "",
                memo: "",
                type: "",
                validity: "",
                opDay: "",
                issuer: "",
                fileUrl: ""
            },
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            status: "",
            editStatus: false,
            certificationName: "",
            dialogVisibleCertification: false,
            dialogVisibleCertificationRetiring: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Certification.Certification_name_is_required"
                        ),
                        trigger: "blur"
                    }
                ],
                opDay: [{ required: true, validator: daysTo, trigger: "blur" }],
                validity: [
                    { required: true, validator: zhengNumber, trigger: "blur" }
                ]
            }
        };
    },
    watch: {
        $route: {
            handler(newName) {
                this.activeName = newName.query.activeName;
            },
            deep: true,
            immediate: true
        },
        status: {
            handler(newName, oldName) {
                console.log(newName, oldName);
                if (Number(oldName) === 0) {
                    this.disable = true;
                }
                if (Number(newName) === 1 || Number(newName) === 2) {
                    this.disable = false;
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.certificationDetail();
    },
    methods: {
        // 返回列表
        backToList() {
            this.$router.push({
                path: "/adminHomePage/adminCertificationList"
            });
        },
        // tab切换
        certificationList(val) {
            if (Number(val.index) === 0) {
                this.$router.push({
                    path:
                        "/adminHomePage/adminCertificationDetailLeft/adminCertificationDetail",
                    query: {
                        activeName: this.activeName,
                        certificationId: this.certificationId,
                        certificationStatus: this.certificationStatus,
                        certificationName: this.certificationName
                    }
                });
            }
            if (Number(val.index) === 1) {
                this.$router.push({
                    path:
                        "/adminHomePage/adminCertificationDetailLeft/adminCertificationLearnersList",
                    query: {
                        activeName: this.activeName,
                        certificationId: this.certificationId,
                        certificationStatus: this.certificationStatus,
                        certificationName: this.certificationName
                    }
                });
            }
        },
        // 请求详情页的接口
        async certificationDetail() {
            const params = {
                data: this.certificationId
            };
            const result = await this.$getData(
                "/certification/get",
                params,
                "get"
            );
            if (result.data.code === 200) {
                this.ruleForm = result.data.entity;
                if (Number(result.data.entity.type === 0)) {
                    this.ruleForm.validity = "";
                }
                this.$set(
                    this.ruleForm,
                    "type",
                    String(result.data.entity.type)
                );
                this.$set(
                    this.ruleForm,
                    "issuer",
                    String(result.data.entity.issuer)
                );
                this.status = Number(result.data.entity.status);
                this.certificationName = result.data.entity.name;
                if (result.data.entity.userFile) {
                    this.ruleForm.fileUrl = result.data.entity.userFile.fileUrl;
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 回显图片
        getAbsolutePath(relativePath, width, height) {
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        // 发布的按钮
        async detailPublish() {
            const params = {
                id: this.certificationId,
                status: 1,
                name: this.certificationName
            };
            const result = await this.$getData(
                "/certification/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.certificationDetail();
                this.$message({
                    message: "Certification published successfully",
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 删除详情
        detailDelete() {
            this.dialogVisibleCertification = true;
        },
        async dialogVisibleCertificationDelete() {
            const result = await this.$getData(
                "/certification/deletes",
                [this.certificationId],
                "post"
            );
            if (result.data.code === 200) {
                this.dialogVisibleCertification = false;
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_delete_successfully"
                    ),
                    type: "success"
                });

                this.$router.push({
                    path: "/adminHomePage/adminCertificationList"
                    // query:{ activeName: 'Overview',certificationId:certificationId },
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 认证编辑
        async detailEdit() {
            this.status = 0;
            this.editStatus = true;
        },
        // 认证注销
        detailRetire() {
            this.dialogVisibleCertificationRetiring = true;
        },
        async dialogVisibleCertificationRetire() {
            const params = {
                id: this.certificationId,
                status: 2,
                name: this.certificationName
            };
            const result = await this.$getData(
                "/certification/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.dialogVisibleCertificationRetiring = false;
                this.$router.push({
                    path: "/adminHomePage/adminCertificationList"
                    // query:{ activeName: 'Overview',certificationId:certificationId },
                });
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_retired_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        CancelCertification() {
            this.$router.push({
                path: "/adminHomePage/adminCertificationList"
                // query:{ activeName: 'Overview',certificationId:certificationId },
            });
        },
        async submitForm(formName, editStatus) {
            let statuss = "";
            if (Boolean(editStatus) === true) {
                statuss = 1;
            } else {
                statuss = this.status;
            }
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const params = {
                        id: this.certificationId,
                        name: this.ruleForm.name,
                        memo: this.ruleForm.memo,
                        type: Number(this.ruleForm.type),
                        validity: Number(this.ruleForm.validity),
                        opDay: Number(this.ruleForm.opDay),
                        issuer: Number(this.ruleForm.issuer),
                        fileUrl: this.ruleForm.fileUrl,
                        status: statuss
                    };
                    const result = await this.$getData(
                        "/certification/modify",
                        params,
                        "post"
                    );
                    if (result.data.code === 200) {
                        this.$router.push({
                            path: "/adminHomePage/adminCertificationList"
                        });
                        this.$message({
                            message: this.$t(
                                "message.Certification.Certification_edited_successfully"
                            ),
                            type: "success"
                        });
                    }
                } else {
                    // this.$message.error(result.data.message);
                }
            });
        },
        handleAvatarSuccess(res, file) {
            if (res.code === 200) {
                this.imageUrl = URL.createObjectURL(file.raw);
                res.entity.forEach(item => {
                    this.ruleForm.fileUrl = item.fileId;
                });
                this.$message({
                    message: this.$t(
                        "message.Certification.Upload_successfully"
                    ),
                    type: "success"
                });
            }
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
                this.imageWarn = this.$t(
                    "message.Certification.File_type_shoud_be_Jpeg_jpg_png_bmp_ppm"
                );
                return false;
            }
            if (tempFileSize > 5) {
                this.imgWarn = true;
                this.imageWarn = this.$t(
                    "message.Certification.should_be_less_than_5M"
                );
                return false;
            }
            this.imgWarn = false;
            return true;
        }
    }
};
</script>

<style scoped lang="less">
.admin-certification-detail {
    .select-box {
        margin-top: 33%;
    }

    .backList {
        font-size: 23px;
        font-family: ArialMT;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: inline-block;
        cursor: pointer;
        margin-top: 7px;
    }
    .icon-ai207 {
        font-size: 25px;
        cursor: pointer;
    }

    /deep/ .el-tabs--right .el-tabs__header.is-right {
        float: right;
        margin-bottom: 0;
        width: 100%;
        margin-top: 5%;
    }

    /deep/ .is-active {
        background-color: #cfd7ef;
    }

    /deep/ .el-tabs__item {
        height: auto;
        line-height: normal;
        font-size: 15px;
        padding-top: 10%;
        padding-bottom: 7%;
    }

    /deep/ .el-tabs__active-bar .is-right {
        height: 12%;
    }

    .imgWarn {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
    .avatar-uploader-edit {
        /deep/.el-upload {
            cursor: auto;
        }
    }
    .icon-retire {
        font-size: 22px;
        margin-top: 5px;
    }
    .icon-publish {
        font-size: 22px;
        margin-top: 5px;
        margin-left: 5px;
    }
    .icon-delete {
        font-size: 22px;
        margin-top: 5px;
    }
    .icon-icon-edit {
        font-size: 22px;
        margin-top: 5px;
        margin-left: -17px;
    }
    .publish-button {
        display: inline-block;
        vertical-align: -3px;
        padding: 8px 13px;
        span {
            font-size: 17px;
            margin-top: 3px;
            position: relative;
            top: -2px;
            left: 2px;
        }
    }
    .delete-button {
        display: inline-block;
        vertical-align: -3px;
        padding: 8px 13px;
        span {
            font-size: 17px;
            margin-top: 3px;
            position: relative;
            top: -2px;
        }
    }
    .retire-button {
        display: inline-block;
        vertical-align: -3px;
        padding: 8px 13px;
        span {
            font-size: 17px;
            margin-top: 3px;
            position: relative;
            top: -2px;
        }
    }
    .edit-button {
        display: inline-block;
        vertical-align: -3px;
        padding: 8px 13px;
        span {
            font-size: 17px;
            margin-top: 3px;
            position: relative;
            top: -2px;
            left: 2px;
        }
    }
    .write-certification-box {
        margin-top: 3.5%;
        .write-certification {
            font-size: 32px;
            font-family: Arial-BoldMT;
            color: rgba(51, 51, 51, 1);
        }
    }
    .certification-admit-form {
        width: 100%;
        margin-top: 3.5%;
    }
    .avatar {
        width: 320px;
        height: 240px;
        border-radius: 4px;
    }
    .choose-image-div {
        width: 320px;
        height: 240px;
        line-height: 240px;
        text-align: center;
        background: rgba(238, 238, 238, 1);
        border-radius: 4px;
    }
    .choose-image {
        display: inline-block;
        width: 140px;
        height: 40px;
        line-height: 40px;
        background: rgba(255, 255, 255, 1);
        border-radius: 20px;
        border: 1px solid rgba(170, 170, 170, 1);
        font-size: 14px;
    }
    /deep/ .el-tabs--right .el-tabs__header.is-right {
        float: right;
        margin-bottom: 0;
        width: 100%;
        margin-top: 5%;
    }
    /deep/.is-active {
        background-color: #cfd7ef;
    }
    /deep/.el-tabs__item {
        height: auto;
        line-height: normal;
        font-size: 15px;
        padding-top: 10%;
        padding-bottom: 7%;
    }
    /deep/.el-tabs__active-bar .is-right {
        height: 12%;
    }
}
</style>
