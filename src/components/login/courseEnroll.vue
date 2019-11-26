<template>
    <div class="big-container" style="background: #0e38b1">
        <loginHeader bg-color="#0e38b1" />
        <div class="signUp-box" style="width: 450px;">
            <div class="sign-header">
                <h1>{{ $t("message.COURSE.course_enrollment_title") }}</h1>
                <p>{{ $t("message.COURSE.course_enrollment_course_name") }}</p>
            </div>
            <div class="signForm">
                <el-form
                    ref="signUpForm"
                    :model="signUpForm"
                    :rules="signUpRules"
                    label-width="140px"
                    label-position="top"
                >
                    <el-form-item label="username" prop="username">
                        <el-input
                            v-model="signUpForm.username"
                            :placeholder="$t('message.LOGIN.Email_userName')"
                        />
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input
                            v-model="signUpForm.password"
                            :placeholder="$t('message.LOGIN.Email_userName')"
                        />
                    </el-form-item>
                    <div>
                        <el-button
                            type="primary"
                            style="width:100%"
                            @click="signUpSubmit('signUpForm')"
                        >
                            {{ $t("message.submit") }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import loginHeader from "./loginHeader.vue";
const validatePass = (rule, value, callback) => {
    if (value.length < 6 || value.length > 50) {
        callback(new Error(this.$t("message.LOGIN.Length_6_and_50")));
    } else {
        const Regx = /^[A-Za-z0-9]*$/;
        if (!Regx.test(value)) {
            callback(new Error(this.$t("message.LOGIN.Only_number_letters")));
        } else {
            callback();
        }
    }
};
export default {
    name: "Login",
    components: {
        loginHeader
    },
    data() {
        return {
            signUpForm: {
                username: "",
                password: ""
            },
            signUpRules: {
                username: [
                    {
                        required: true,
                        message: this.$t("message.LOGIN.Enter_username"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: this.$t("message.LOGIN.Length_1_50"),
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("message.pls_enter_pwd"),
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ]
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        goLogin() {
            this.$router.push({ path: "/login" });
        },

        signUpSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$router.push({ path: "/login" });
                } else {
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
