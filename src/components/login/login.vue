<template>
    <div class="big-container">
        <!-- <header class="topHeader" style="background: none">
      <a class="logoBox">
        <img src="../../../static/images/logo_name.png">
      </a>
    </header> -->
        <loginHeader bg-color="#fff" />
        <section class="loginContainer">
            <div class="loginBox">
                <div class="loginHeader">
                    <h1>{{ $t("message.Login") }}</h1>
                    <!-- <a @click="goSignUp"> {{ $t("message.sign_up_free") }}</a> -->
                </div>
                <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login-form"
                    label-position="top"
                >
                    <el-form-item :label="$t('message.Role')" prop="roleType">
                        <el-select
                            v-model="loginForm.roleType"
                            :placeholder="$t('message.Select1')"
                            style="width:100%"
                        >
                            <el-option
                                key="4"
                                :label="$t('message.login_as_student')"
                                value="4"
                            />
                            <el-option
                                key="2"
                                :label="$t('message.login_as_teacher')"
                                value="2"
                            />
                            <el-option
                                key="1"
                                :label="$t('message.login_as_admin')"
                                value="1"
                            />
                            <el-option
                                key="3"
                                label="Login as Teacher assistant"
                                value="3"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.login_id')"
                        prop="username"
                    >
                        <el-input
                            v-model="loginForm.username"
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
                            v-model="loginForm.password"
                            type="password"
                            clearable
                            minlength="1"
                            maxlength="30"
                            @keyup.enter.native="loginSubmit('loginForm')"
                        />
                    </el-form-item>
                    <p class="forget-text">
                        <a @click="fogretPswd">{{
                            $t("message.forget_pwd")
                        }}</a>
                    </p>
                    <div class="submitBox">
                        <!-- <span class="failureBox"> {{failureText}} </span> -->
                        <el-form-item size="large">
                            <el-button
                                type="primary"
                                @click="loginSubmit('loginForm')"
                            >
                                {{ $t("message.Login") }}
                            </el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <el-carousel
                :interval="5000"
                arrow="always"
                height="100%"
                class="swiper"
            >
                <el-carousel-item class="swiper-item">
                    <div class="content">
                        <div class="title">
                            {{ $t("message.LOGIN.Stay_connect") }}
                        </div>
                        <div>{{ $t("message.LOGIN.Serve_connect") }}</div>
                    </div>
                </el-carousel-item>
                <el-carousel-item class="swiper-item">
                    <div class="content">
                        <div class="title">
                            {{ $t("message.LOGIN.Comprehensive_Insights") }}
                        </div>
                        <div>{{ $t("message.LOGIN.Translate_info") }}</div>
                    </div>
                </el-carousel-item>
                <el-carousel-item class="swiper-item">
                    <div class="content">
                        <div class="title">
                            {{ $t("message.LOGIN.Easy_flexible") }}
                        </div>
                        <div>{{ $t("message.LOGIN.Fine_grained") }}</div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <particles-wave class="wave" :separation="90" />
        </section>
    </div>
</template>

<script>
/*eslint-disable*/
import { mapMutations } from "vuex";
import loginHeader from "./loginHeader.vue";
import ParticlesWave from "./particlesWaves.vue";

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                roleType: "",
                username: "",
                password: ""
            },
            loginRules: {
                roleType: [
                    {
                        required: true,
                        message: this.$t("message.pls_select_role"),
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
                    }
                ]
            }
        };
    },
    computed: {},
    created() {},
    methods: {
        ...mapMutations(["setUserInfo"]),
        // 登录
        loginSubmit(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const params = {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                        roleType: this.loginForm.roleType
                    };
                    const res = await this.$getData("/login", params, "post");
                    if (res.data.code == 200) {
                        const userInfo = res.data.entity;
                        // console.log('ee', res.data.entity)
                        this.setUserInfo(userInfo);
                        sessionStorage.setItem(
                            "userInfo",
                            JSON.stringify(userInfo)
                        );
                        const userType = userInfo.type;
                        switch (userType) {
                            case 1:
                                this.$router.push({
                                    path: "/adminHomePage/adminCourseAll"
                                });
                                localStorage.setItem("currentRole", ["Admin"]);
                                break;
                            case 2:
                                this.$router.push({
                                    path: "/homePage/controlPanel"
                                });
                                localStorage.setItem("currentRole", [
                                    "teacher"
                                ]);
                                break;
                            case 3:
                                this.$router.push({
                                    path: "/homePage/controlPanel"
                                });
                                localStorage.setItem("currentRole", ["ta"]);
                                break;
                            case 4:
                                this.$router.push({
                                    path: "/studentHomePage/studentControlPanel"
                                });
                                localStorage.setItem("currentRole", [
                                    "student"
                                ]);
                                break;
                        }
                    }
                }
            });
        },
        goSignUp() {
            this.$router.push({ path: "/signUp" });
        },
        // 忘记密码提示
        fogretPswd() {
            this.$message({
                message: this.$t("message.forgot_pswd_text"),
                showClose: true,
                duration: 10000
            });
        }
    },
    components: {
        loginHeader,
        ParticlesWave
    }
};
/*eslint-disable*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./login.less";
.wave {
    position: fixed;
    bottom: 0;
    top: 200px;
    width: 100%;
    z-index: 2;
    pointer-events: none;
}
.swiper {
    background: linear-gradient(to bottom, #154ed9, #00207b);
    color: #fff;
    .content {
        position: absolute;
        top: 35%;
        transform: translateY(-50%);
        right: 10%;
        left: 10%;
        // min-height: 436px;
        margin-right: 460px;
        font-size: 16px;
        line-height: 24px;
        .title {
            font-size: 36px;
            line-height: 42px;
            margin-bottom: 25px;
            font-weight: bold;
        }
    }
}
</style>
