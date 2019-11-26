<template>
    <div class="account-setting-page">
        <div v-show="showSetting" class="settingRight">
            <div class="setiings">
                <el-button
                    class="iconfather"
                    style="width: 100%"
                    @click="showEditSetting"
                >
                    <i class="iconfont icon-edit iconfont_personal" />{{
                        $t("message.Edit_Settings")
                    }}
                </el-button>
            </div>
            <div class="password">
                <el-button
                    class="iconfather"
                    style="width: 100%"
                    @click="editPassworddialogVisible = true"
                >
                    <i
                        class="iconfont icon-ResetPassword iconfont_personal"
                    />{{ $t("message.Change_Password") }}
                </el-button>
            </div>
            <div class="addEmail">
                <h3 class="line">
                    {{ $t("message.Emails_for_Contacting") }}
                </h3>
                <el-scrollbar class="">
                    <div>
                        <div
                            v-for="(em, index) in userSetting.emails"
                            :key="index"
                            class="line"
                        >
                            <span class="emailList father_delete"
                                >{{ em.email
                                }}<i
                                    class="iconfont icon-delete icon-delete"
                                    @click="removeEmail(index, em.id)"
                            /></span>
                        </div>
                    </div>
                </el-scrollbar>
                <div>
                    <el-button
                        style="width: 100%;margin-top: 18px;"
                        @click="emailVisible = true"
                    >
                        <i class="el-icon-circle-plus-outline" />
                        {{ $t("message.Add_Emails_Address") }}
                    </el-button>
                </div>
            </div>
        </div>
        <div class="settingLeft">
            <div class="left-inner">
                <div class="add_touxiang">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            :src="
                                getAbsolutePath(
                                    userSetting.avatarFileId,
                                    200,
                                    70
                                )
                            "
                            class="avatar moren"
                        />
                    </el-upload>
                </div>

                <div v-if="showSetting" class="showSetting">
                    <el-form ref="form" :model="form" label-width="200px">
                        <el-form-item :label="$t('message.Full_Name')">
                            <p class="user_name">
                                {{ userSetting.firstName }}&nbsp;{{
                                    userSetting.lastName
                                }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.Display_Name')"
                            class="user_name"
                        >
                            <p class="user_name">
                                {{ userSetting.nickname }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            class="showSetting_item"
                            :label="$t('message.Email')"
                        >
                            {{ userSetting.email }}
                        </el-form-item>
                        <el-form-item :label="$t('message.language')">
                            {{ $t("message.UserSetting_english") }}
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else>
                    <el-form
                        ref="editseting"
                        :model="form2"
                        label-width="120px"
                        :rules="rules"
                        class="el_form_ll"
                    >
                        <!-- <div class="fullname_father"> -->
                        <el-form-item
                            :label="$t('message.UserSetting_first_Name')"
                            prop="firstName"
                        >
                            <el-input
                                v-model="form2.firstName"
                                maxlength="60"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.UserSetting_last_Name')"
                            prop="lastName"
                        >
                            <el-input v-model="form2.lastName" maxlength="50" />
                        </el-form-item>
                        <!-- </div> -->
                        <el-form-item
                            :label="$t('message.UserSetting_Display_Name')"
                            prop="nickname"
                        >
                            <el-input
                                v-model="form2.nickname"
                                maxlength="100"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.UserSetting_Default_Email')"
                        >
                            <el-select
                                v-model="form2.email"
                                :placeholder="
                                    $t(
                                        'message.UserSetting_please_select_email'
                                    )
                                "
                            >
                                <el-option
                                    v-for="item in userSetting.emails"
                                    :key="item.id"
                                    :label="item.email"
                                    :value="item.email"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.UserSetting_Language')"
                        >
                            <el-select
                                v-model="form2.language"
                                :placeholder="$t('message.UserSetting_english')"
                                disabled
                            >
                                <el-option
                                    :label="$t('message.UserSetting_english')"
                                    :value="$t('message.UserSetting_english')"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="cancelsettings">
                                {{ $t("message.UserSetting_Cancel") }}
                            </el-button>
                            <el-button
                                type="primary"
                                @click="editsettings('editseting')"
                            >
                                {{ $t("message.UserSetting_Update_Settings") }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div>
            <el-dialog
                :title="$t('message.UserSetting_Password_Title')"
                :visible.sync="editPassworddialogVisible"
                width="40%"
            >
                <div>
                    <el-form
                        ref="editPasswordForm"
                        novalidate
                        :model="editPasswordForm"
                        label-width="180px"
                        :rules="rules"
                        class="demo-ruleForm"
                    >
                        <el-form-item
                            :label="$t('message.SETTINGS.Old_password')"
                            prop="oldPassword"
                        >
                            <el-input
                                v-model="editPasswordForm.oldPassword"
                                type="password"
                                autocomplete="off"
                                style="width: 60%;"
                                minlength="6"
                                maxlength="30"
                                step="0.00001"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.SETTINGS.New_password')"
                            prop="password"
                        >
                            <el-input
                                v-model="editPasswordForm.password"
                                type="password"
                                style="width: 60%;"
                                clearable
                                minlength="6"
                                maxlength="30"
                                autocomplete="off"
                                step="0.00001"
                                @mousewheel.native.prevent
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.SETTINGS.Confrim_new_paswd')"
                            prop="checkpassword"
                        >
                            <el-input
                                v-model="editPasswordForm.checkpassword"
                                type="password"
                                style="width: 60%;"
                                clearable
                                minlength="6"
                                maxlength="30"
                                step="0.00001"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelPassword()">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click.prevent="editPasswordSave('editPasswordForm')"
                        >{{ $t("message.Common_submit") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :title="$t('message.UserSetting_Email_Title')"
                :visible.sync="emailVisible"
                width="40%"
            >
                <div class="email_address_father">
                    <el-form
                        ref="emailForm"
                        :label-position="labelPosition"
                        :model="emailForm"
                        label-width="25%"
                        :rules="emailrules"
                        class="demo-ruleForm"
                    >
                        <el-form-item
                            :label="$t('message.SETTINGS.Email_address')"
                            prop="email"
                            :popper-class="marleft"
                        >
                            <el-input
                                v-model="emailForm.email"
                                type="input"
                                autocomplete="off"
                                maxlength="100"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="emailVisible = false">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="editEmailSave('emailForm')"
                        >{{ $t("message.Common_submit") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import defaultHeads from "../../../static/images/touxiang.png";
import baseValidater from "@/utils/baseValidater";

export default {
    data() {
        const validatePass = (rule, value, callback) => {
            const Regx = /^[A-Za-z0-9]*$/;
            if (!Regx.test(value)) {
                callback(
                    new Error(this.$t("message.only_be_Numbers_or_letters"))
                );
            } else {
                callback();
            }
        };
        const confirmValidate = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("message.pls_enter_pswd_again")));
            } else if (value !== this.editPasswordForm.password) {
                callback(
                    new Error(
                        this.$t("message.UserSetting_Password_Confirm_Error")
                    )
                );
            } else {
                callback();
            }
        };
        return {
            labelPosition: "right",
            imageUrl: "",
            marleft: "marleft",
            defaultHeads,
            flagthree: false,
            flagfive: false,
            flagfour: false,
            fullName: "",
            userSetting: {},
            form2: {
                fullName: "",
                nickname: "",
                email: "",
                language: this.$t("message.UserSetting_english")
            },

            emailForm: {
                email: ""
            },
            editPasswordForm: {
                oldPassword: "",
                password: "",
                checkpassword: ""
            },
            emailrules: {
                email: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_email"),
                        trigger: "blur"
                    },
                    {
                        validator: baseValidater.emailValue,
                        trigger: "blur"
                    }
                ]
            },
            rules: {
                firstName: [
                    /* {required: true, min: 6, max: 20, message: '长度在 0 到 60 个字符', trigger: 'blur' } */

                    {
                        required: true,
                        min: 0,
                        max: 60,
                        message: this.$t("message.range_length", [1, 60]),
                        trigger: "blur"
                    }
                ],
                lastName: [
                    /* {required: true, min: 6, max: 20, message: '长度在 0 到 60 个字符', trigger: 'blur' } */

                    {
                        required: true,
                        min: 0,
                        max: 50,
                        message: this.$t("message.range_length", [1, 50]),
                        trigger: "blur"
                    }
                ],
                oldPassword: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_pwd"),
                        trigger: "blur"
                    },
                    {
                        required: true,
                        min: 6,
                        max: 30,
                        message: this.$t("message.limit_6_30"),
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_pwd"),
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 30,
                        message: this.$t("message.limit_6_30"),
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ],
                checkpassword: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_pwd"),
                        trigger: "blur"
                    },
                    { validator: confirmValidate, trigger: "blur" }
                ],

                nickname: [
                    {
                        required: true,
                        min: 1,
                        max: 100,
                        message: this.$t("message.range_length", [1, 100]),
                        trigger: "blur"
                    }
                ]
            },
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            showSetting: true,
            editPassworddialogVisible: false,
            emailVisible: false,
            ruleForm2: {
                pass: "",
                checkPass: "",
                age: ""
            },
            uploadUrl: `${process.env.NODE_ENV}/upload`
        };
    },
    computed: {
        ...mapGetters(["userInfoData", "instituteList"])
    },
    watch: {
        messages: {
            handler() {
                this.getUserSetting();
            }
        },
        userInfoData: {
            handler() {
                this.getUserSetting();
            },
            deep: true,
            immediate: true
        },
        emailVisible: {
            handler(newval) {
                if (Boolean(newval) === false) {
                    this.$refs.emailForm.resetFields();
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.getUserSetting();
    },
    methods: {
        ...mapMutations(["setUserInfo"]),
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if (Number(res.code) === 200) {
                this.userSetting.avatarFileId = res.entity[0].fileId;
                this.getAbsolutePath(this.userSetting.avatarFileId);
                this.touxiangid = this.userInfoData.id;
                const tempUserFile = res.entity[0].fileId;
                const data = {
                    id: this.touxiangid,
                    avatarFileId: tempUserFile
                };
                this.$http
                    .post(
                        `${process.env.NODE_ENV}/userSetting/portrait/edit`,
                        data
                    )
                    .then(res => {
                        if (Number(res.data.code) === 200) {
                            const tempInfo = Object.assign(this.userInfoData, {
                                avatarFileId: tempUserFile
                            });

                            this.setUserInfo(tempInfo);
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        validateJyhl(glhm) {
            // 校验关联交易号
            const reg = /^[A-Za-z0-9]{1,30}$/;
            if (!reg.test(glhm)) {
                this.flagfour = true;
            } else {
                this.flagfour = false;
            }
        },
        validateJyhk(glhm) {
            // 校验关联交易号
            const reg = /^[A-Za-z0-9]{1,30}$/;
            if (!reg.test(glhm)) {
                this.flagfive = true;
            } else {
                this.flagfive = false;
            }
        },
        validateJyh(glhm) {
            // 校验关联交易号
            const reg = /^[A-Za-z0-9]{1,30}$/;
            if (!reg.test(glhm)) {
                this.flagthree = true;
            } else {
                this.flagthree = false;
            }
        },
        onSubmit() {
            this.showSetting = true;
        },
        removeEmail(index, id) {
            // 删除页面连接
            this.$confirm(
                this.$t("message.SETTINGS.Del_email_really"),
                this.$t("message.SETTINGS.Del_confirm"),
                {
                    type: "warning"
                }
            )
                .then(() => {
                    this.userSetting.emails.splice(index, 1);
                    // 删除数据
                    if (id != null) {
                        const tempIds = [];
                        tempIds.push(String(id));
                        const res = this.$getData(
                            "/userEmail/deletes",
                            tempIds,
                            "post"
                        );
                        if (Number(res.data.code) === 200) {
                            this.$message({
                                message: this.$t(
                                    "message.UserSetting_email_delete_tip"
                                ),
                                type: "success"
                            });
                        }
                    }
                })
                .catch(() => {}); // 一定别忘了这个
        },
        getAbsolutePath(relativePath, width, height) {
            if (typeof relativePath === "undefined") {
                return defaultHeads;
            }
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        cancelPassword() {
            this.$refs.editPasswordForm.resetFields();
            this.editPassworddialogVisible = false;
        },
        cancelsettings() {
            this.showSetting = true;
        },
        editsettings(editseting) {
            this.$refs[editseting].validate(async valid => {
                if (valid) {
                    this.showSetting = true;
                    const params = {
                        id: this.userInfoData.id,
                        email: this.form2.email,
                        nickname: this.form2.nickname,
                        fullName: `${this.form2.firstName} ${this.form2.lastName}`,
                        firstName: this.form2.firstName,
                        lastName: this.form2.lastName,
                        language: this.form2.language
                    };
                    const res = await this.$getData(
                        "/userSetting/modify",
                        params,
                        "post"
                    );
                    if (Number(res.data.code) === 200) {
                        this.$message({
                            message: this.$t(
                                "message.UserSetting_update_success_tip"
                            ),
                            type: "success"
                        });
                        this.editPassworddialogVisible = false;

                        this.getUserSetting();
                        return true;
                    }
                    return true;
                }
                this.$t("message.UserSetting_password_error_tip");
                return false;
            });
        },
        showEditSetting() {
            // this.editSetting=true;
            this.showSetting = false;
            this.getUserSetting();
            this.$emit("changeMaterials", false);
        },
        getUserSetting() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/userSetting/get?data=${this.userInfoData.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.userSetting = res.data.entity;

                        const tempObj = {
                            nickname: this.userSetting.nickname,
                            title: this.userSetting.title,
                            phone: this.userSetting.phone,
                            email: this.userSetting.email,
                            description: this.userSetting.description,
                            links: this.userSetting.links,
                            url: this.userSetting.avatarFileId
                        };
                        const tempUserObj = Object.assign(
                            this.userInfoData,
                            tempObj
                        );
                        this.setUserInfo(tempUserObj);
                        this.form2 = res.data.entity;
                        this.getAbsolutePath(tempUserObj.avatarFileId);
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$message.success("submit");
                    return true;
                }
                return false;
            });
        },
        // 更新用户密码
        editPasswordSave(editPassword) {
            this.$refs[editPassword].validate(async valid => {
                if (valid) {
                    const params = {
                        id: this.userInfoData.id,
                        oldPassword: this.editPasswordForm.oldPassword,
                        password: this.editPasswordForm.password
                    };
                    const res = await this.$getData(
                        "/userSetting/modify ",
                        params,
                        "post"
                    );
                    if (Number(res.data.code) === 200) {
                        this.$message({
                            message: this.$t(
                                "message.UserSetting_password_success_tip"
                            ),
                            type: "success"
                        });
                        this.editPassworddialogVisible = false;
                        this.editPasswordForm.oldPassword = "";
                        this.editPasswordForm.password = "";
                        this.editPasswordForm.checkpassword = "";
                        return true;
                    }
                    return true;
                }
                this.$t("message.UserSetting_password_error_tip");
                return false;
            });
        },

        // 更新用户邮箱地址
        editEmailSave(editEmail) {
            this.$refs[editEmail].validate(async valid => {
                if (valid) {
                    const params = {
                        email: this.emailForm.email
                    };
                    const res = await this.$getData(
                        "/userEmail/add ",
                        params,
                        "post"
                    );
                    if (Number(res.data.code) === 200) {
                        this.getUserSetting();
                        this.$message({
                            message: this.$t(
                                "message.UserSetting_email_success_tip"
                            ),
                            type: "success"
                        });
                        this.emailVisible = false;
                        this.emailForm.email = "";
                        return true;
                    }
                    return true;
                }
                this.$t("message.UserSetting_password_error_tip");
                return false;
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        beforeAvatarUpload(file) {
            const isJPG =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error(
                    this.$t("message.SETTINGS.Image_formate_jpg")
                );
            }
            if (!isLt2M) {
                this.$message.error(this.$t("message.SETTINGS.Image_size_2M"));
            }
            return isJPG && isLt2M;
        }
    }
};
</script>

<style lang="less">
.email_address_father {
    text-align: left;
}
.account-setting-page {
    width: 100%;
    .settingRight {
        float: right;
        width: 250px;
        margin-right: 30px;
        /*margin-top: -144px;*/
        /*margin-left: 40px;*/
        z-index: 999;
    }
    .uesrs {
        width: 100px;
        height: 100px;
        margin-left: 40%;
        border-radius: 50px;
        background-color: #1c0eff;
    }
    .setiings,
    .password {
        margin-bottom: 20px;
    }

    .addEmail {
        padding: 20px 10px;
        border: 1px solid #ccc;
        color: #666;
        h3 {
            font-size: 14px;
            color: #333;
            font-weight: 400;
        }
        .line {
            line-height: 40px;
            border-bottom: 1px solid #aaa;
            padding-bottom: 6px;
        }
    }

    .emailList {
        display: inline-block;
        padding-top: 4%;
    }
    .el_form_ll {
        margin-top: 30px;
        width: 500px;
        // margin-left: -40%;
        .el-select {
            display: block;
        }
    }
    .add_touxiang {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 70px;
        margin-left: 215px;
        overflow: hidden;
    }

    .edithead {
        position: absolute;
        right: -5px;
        bottom: 0;
    }
    .avatar-uploader {
        width: 100%;
        height: 100%;
    }
    .settingLeft {
        position: relative;
        margin-right: 300px;

        .left-inner {
            position: relative;
            float: left;
            top: 0;
            left: 38%;
            margin-left: -250px;
            width: 500px;
        }
    }
    .father_delete {
        position: relative;
        display: inline-block;
        width: 100%;
        word-wrap: break-word;
    }
    .father_delete i {
        position: absolute;
        right: 10px;
    }
    .showSetting {
        margin-left: 10%;
        margin-top: 20px;
    }
    .flagthree {
        color: red;
    }
}
.fullname_father {
    display: flex;
}
/deep/ .el-form-item {
    margin-bottom: 46px;
}
/deep/ .el-scrollbar__wrap {
    margin-bottom: -5px !important;
}
.iconfather {
    position: relative;
    text-align: left !important;
    text-indent: 15px;
}
.iconfont_personal {
    margin-right: 10px;
    position: absolute;
    left: 0;
    top: 11px;
    margin-left: -3px;
    vertical-align: middle;
}
.iconfont_personal_img {
    width: 16px;
}
.moren {
    width: 70px;
    height: 70px;
    display: block;
}
/deep/.is-required .el-form-item__error {
    margin-left: 134px;
}
.showSetting .showSetting_item {
    word-wrap: break-word;
}
.user_name {
    width: 337px;
    word-wrap: break-word;
}
</style>
