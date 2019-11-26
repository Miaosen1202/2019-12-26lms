<template>
    <div
        style="background: #0e38b1; width: 100%; min-height: 100%; position:absolute"
    >
        <loginHeader bg-color="#0e38b1" />
        <div class="signUp-box">
            <div class="sign-header">
                <h1>{{ $t("message.sign_up_free") }}</h1>
                <p>
                    {{ $t("message.have_account") }}
                    <a @click="goLogin"> {{ $t("message.Login") }} </a>
                </p>
            </div>
            <div class="signForm">
                <el-form
                    ref="signUpForm"
                    :model="signUpForm"
                    :rules="signUpRules"
                    label-width="170px"
                    label-position="top"
                >
                    <el-form-item
                        :label="$t('message.admin_firstName')"
                        prop="firstName"
                    >
                        <el-input
                            v-model="signUpForm.firstName"
                            clearable
                            minlength="1"
                            maxlength="60"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.admin_lastName')"
                        prop="lastName"
                    >
                        <el-input
                            v-model="signUpForm.lastName"
                            clearable
                            minlength="1"
                            maxlength="50"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.phone_number')"
                        prop="phone"
                    >
                        <el-input
                            v-model="signUpForm.phone"
                            clearable
                            maxlength="30"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.organization')"
                        prop="orgId"
                    >
                        <el-select
                            v-model="signUpForm.orgId"
                            style="width: 100%"
                            :placeholder="$t('message.Select1')"
                        >
                            <el-option
                                v-for="(item, index) in orgnazList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <!-- <p style="border-top: 1px dashed #fff"> </p> -->
                    <el-form-item
                        :label="$t('message.Login_ID')"
                        prop="username"
                    >
                        <el-input
                            v-model="signUpForm.username"
                            :placeholder="$t('message.email_user')"
                            clearable
                            minlength="1"
                            maxlength="50"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.password')"
                        prop="password"
                    >
                        <el-input
                            v-model="signUpForm.password"
                            type="password"
                            clearable
                            minlength="6"
                            maxlength="30"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.confirm_pwd')"
                        prop="confirm_paswd"
                    >
                        <el-input
                            v-model="signUpForm.confirm_paswd"
                            type="password"
                            clearable
                            minlength="6"
                            maxlength="30"
                        />
                    </el-form-item>
                    <div>
                        <el-button
                            type="primary"
                            style="width:100%"
                            @click="signUpSubmit('signUpForm')"
                        >
                            Submit
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="signBottom">
            <div class="bottomMain">
                <span> {{ $t("message.LOGIN.Privacy_policy") }} </span>
                <span> {{ $t("message.LOGIN.Copy_right") }} </span>
                <span> {{ $t("message.LOGIN.Right_reserved") }} </span>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import loginHeader from "./loginHeader.vue";
// import baseValidater from '@/utils/baseValidater';

export default {
    name: "Login",
    components: {
        loginHeader
    },
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
            } else if (value !== this.signUpForm.password) {
                callback(new Error(this.$t("message.two_pswd_nomatch")));
            } else {
                callback();
            }
        };

        const userValidate = (rule, value, callback) => {
            if (value == "") {
                callback(new Error(this.$t("message.pls_enter_pswd_again")));
            } else {
                const reg = /^[0-9a-zA-Z_]{1,}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(
                        new Error(
                            this.$t(
                                "only letters numbers and downline are acceptable"
                            )
                        )
                    );
                }
            }
        };
        return {
            orgnazList: [],
            signUpForm: {
                firstName: "",
                lastName: "",
                phone: "",
                orgId: "",
                username: "",
                password: "",
                confirm_paswd: ""
            },
            signUpRules: {
                firstName: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_first_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 60,
                        message: this.$t("message.limit_1_60"),
                        trigger: "blur"
                    }
                ],
                lastName: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_last_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: this.$t("message.limit_1_50"),
                        trigger: "blur"
                    }
                ],
                orgId: [
                    {
                        required: true,
                        message: this.$t("message.pls_select_org"),
                        trigger: "blur"
                    }
                ],
                username: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_username"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: this.$t("message.limit_1_50"),
                        trigger: "blur"
                    },
                    { validator: userValidate, trigger: "blur" }
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
                confirm_paswd: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_pswd_again"),
                        trigger: "blur"
                    },
                    { validator: confirmValidate, trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.getOrgList();
    },
    mounted() {},
    methods: {
        async getOrgList() {
            const res = await this.$getData("/org2/select/query", "get");
            if (res.data.code == 200) {
                this.orgnazList = res.data.entity;
                // if(this.orgnazList.length>0){
                //   this.signUpForm.orgId = this.orgnazList[0].id
                // }
            }
        },
        goLogin() {
            this.$router.push({ path: "/login" });
        },

        signUpSubmit(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const params = {
                        username: this.signUpForm.username,
                        password: this.signUpForm.password,
                        orgId: this.signUpForm.orgId,
                        firstName: this.signUpForm.firstName,
                        lastName: this.signUpForm.lastName,
                        phone: this.signUpForm.phone
                    };
                    const result = await this.$getData(
                        "/user/signUp/edit",
                        params,
                        "post"
                    );
                    if (result.data.code == 200) {
                        this.$message({
                            message: this.$t("message.regist_success"),
                            type: "success"
                        });
                        setTimeout(() => {
                            this.$router.push({ path: "/login" });
                        }, 800);
                    }
                }
            });
        }
    }
};
/*eslint-disable*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./login.less";
</style>
