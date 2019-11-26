<template>
    <div class="admin-certification-admit">
        <div class="write-certification-box">
            <span class="write-certification">
                {{ $t("message.Certification.Add_new_Certification") }}
            </span>
        </div>
        <div class="certification-admit-form">
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="250px"
                class="demo-ruleForm"
            >
                <el-form-item
                    :label="$t('message.Certification.Certification_Name')"
                    prop="name"
                >
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item
                    :label="
                        $t('message.Certification.Certification_Description')
                    "
                >
                    <ckeditor
                        v-model="ruleForm.memo"
                        :editor="editor"
                        :config="editorConfig"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.Certification.type')"
                    prop="type"
                >
                    <el-radio-group v-model="ruleForm.type">
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
                    :label="$t('message.Certification.Validity_in_months')"
                    prop="validity"
                    style="width: 70%"
                >
                    <el-input
                        v-model="ruleForm.validity"
                        type="number"
                        step="0.00001"
                        @mousewheel.native.prevent
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.Certification.Days_to_complete')"
                    prop="opDay"
                    style="width: 70%"
                >
                    <el-input
                        v-model="ruleForm.opDay"
                        type="number"
                        step="0.00001"
                        @mousewheel.native.prevent
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.Certification.Certification_issuer')"
                >
                    <el-radio-group v-model="ruleForm.issuer">
                        <el-radio label="0">
                            {{ $t("message.Certification.INTERNAL") }}
                        </el-radio>
                        <el-radio label="1">
                            {{ $t("message.Certification.External") }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('message.Certification.Cover_Image')">
                    <el-upload
                        class="avatar-uploader"
                        :action="upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,
                                       .mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <div v-else class="choose-image-div">
                            <span class="choose-image">Choose Image</span>
                        </div>
                        <p v-show="imgWarn" class="imgWarn">
                            {{ imageWarn }}
                        </p>
                    </el-upload>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button @click="certificationCancel">
                        {{ $t("message.Messages.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        {{ $t("message.Certification.Save") }}
                    </el-button>
                </el-form-item>
            </el-form>
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
            imageUrl: "",
            imgWarn: false,
            imageWarn: "",
            upload: `${process.env.NODE_ENV}/upload`,
            ruleForm: {
                name: "",
                memo: "",
                type: "1",
                validity: "",
                opDay: "",
                issuer: "0",
                fileUrl: "",
                messageSubjectMaxLength: 200
            },
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
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
        "ruleForm.name": {
            handler(newName) {
                if (newName.length > this.ruleForm.messageSubjectMaxLength) {
                    this.ruleForm.name = String(this.ruleForm.name).slice(
                        0,
                        this.ruleForm.messageSubjectMaxLength
                    );
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 创建认证
        async submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const params = {
                        name: this.ruleForm.name,
                        memo: this.ruleForm.memo,
                        type: Number(this.ruleForm.type),
                        validity: Number(this.ruleForm.validity),
                        opDay: Number(this.ruleForm.opDay),
                        issuer: Number(this.ruleForm.issuer),
                        fileUrl: this.ruleForm.fileUrl,
                        status: 0
                    };
                    const result = await this.$getData(
                        "/certification/add",
                        params,
                        "post"
                    );
                    if (result.data.code === 200) {
                        console.log(this.ruleForm.validity);
                        this.$router.push({
                            path: "/adminHomePage/adminCertificationList"
                        });
                        this.$message({
                            message: this.$t(
                                "message.Certification.Certification_created_successfully"
                            ),
                            type: "success"
                        });
                    }
                } else {
                    // this.$message.error(result.data.message);
                }
            });
        },
        certificationCancel() {
            this.$router.push({
                path: "/adminHomePage/adminCertificationList"
                // query:{ activeName: 'Overview',certificationId:certificationId },
            });
        },
        // 上传图片成功
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
.admin-certification-admit {
    .imgWarn {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
    .write-certification-box {
        margin-top: 30px;
        .write-certification {
            font-size: 32px;
            font-family: Arial-BoldMT;
            color: rgba(51, 51, 51, 1);
        }
    }
    .certification-admit-form {
        width: 80%;
        margin-top: 30px;
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
    }
}
</style>
