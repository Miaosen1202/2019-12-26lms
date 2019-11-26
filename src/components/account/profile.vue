<template>
    <div class="account-profile-page">
        <!--eslint-disable-->
        <div v-show="Material" class="profileLeft">
            <div class="add_touxiang">
                <img
                    v-if="true"
                    class="moren"
                    :src="getAbsolutePath(userSetting.avatarFileId, 200, 70)"
                />
            </div>
            <div class="userSetting_name">
                {{ userSetting.nickname }}
            </div>
            <span class="userSetting_title">{{ userSetting.title }}</span>
        </div>
        <div class="profileRight">
            <div v-show="Material" class="displayMaterials">
                <!--个人资料显示隐藏-->
                <el-button
                    style="float: right;margin-right: 30px"
                    @click="showEditMaterial"
                >
                    <i class="iconfont icon-edit" />
                    {{ $t("message.Profile.Edit_profile") }}
                </el-button>
                <div class="show">
                    <h3 class="h3_tit">
                        Contact
                    </h3>
                    <p>
                        {{ $t("message.Phone_Number") }} &nbsp;
                        {{
                            userSetting.phone
                                ? userSetting.phone
                                : $t("message.UserSetting_no_contact_tip")
                        }}
                    </p>
                    <p>
                        {{ $t("message.Email") }} &nbsp;
                        {{
                            userSetting.email
                                ? userSetting.email
                                : $t("message.UserSetting_no_contact_tip")
                        }}
                    </p>
                </div>
                <div class="show">
                    <h3 class="h3_tit">
                        {{ $t("message.Profile.Biography") }}
                    </h3>
                    <p>
                        {{
                            userSetting.description
                                ? userSetting.description
                                : $t("message.UserSetting_no_description_tip")
                        }}
                    </p>
                </div>
                <div class="show">
                    <h3 class="h3_tit">
                        {{ $t("message.Profile.Links") }}
                    </h3>
                    <div
                        v-if="
                            userSetting.links && userSetting.links.length === 0
                        "
                    >
                        <p>{{ $t("message.UserSetting_no_links_tip") }}</p>
                    </div>
                    <div v-else>
                        <div
                            v-for="(link, index) in userSetting.links"
                            :key="index"
                        >
                            <p>
                                <span>{{ link.name }}</span
                                >&nbsp;:&nbsp;{{ link.url }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-form
                    v-show="!Material"
                    ref="profileForm"
                    :label-position="labelPosition"
                    :model="profileForm"
                    label-width="120px"
                    :rules="rules"
                    class="demo-dynamic"
                >
                    <div class="add_touxiang">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="true"
                                :src="
                                    getAbsolutePath(
                                        userSetting.avatarFileId,
                                        200,
                                        70
                                    )
                                "
                                class="avatar moren"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            />
                        </el-upload>
                    </div>
                    <el-form-item
                        :label="$t('message.userName')"
                        prop="nickname"
                    >
                        <el-input
                            v-model="profileForm.nickname"
                            maxlength="100"
                        />
                    </el-form-item>
                    <el-form-item :label="$t('message.title')" prop="title">
                        <el-input v-model="profileForm.title" />
                    </el-form-item>
                    <!--contact-->
                    <el-form-item
                        :label="$t('message.Contact')"
                        class="form-title"
                    />
                    <br />
                    <el-form-item
                        :label="$t('message.Phone_Number')"
                        prop="phone"
                    >
                        <el-input v-model="profileForm.phone" />
                    </el-form-item>
                    <el-form-item :label="$t('message.Email')" prop="email">
                        <el-input v-model="profileForm.email" maxlength="100" />
                    </el-form-item>
                    <!--<el-form-item :label="$t('message.Biography')" class="form-title"></el-form-item>-->
                    <el-form-item
                        prop="description"
                        class="desc_Biography"
                        :label="$t('message.Biography')"
                    >
                        <el-input
                            v-model="profileForm.description"
                            maxlength="2000"
                            type="textarea"
                        />
                    </el-form-item>
                    <!-- <el-form-item
                        v-show="profileForm.links && profileForm.links.length"
                        prop="links"
                        label="Links:"
                    >
                        <div
                            v-for="(el, index) in profileForm.links"
                            :key="index"
                            class="link_input"
                        >
                            <el-input
                                v-model="el.name"
                                style="width:44%;margin: 5px 0"
                                placeholder="input the title of the url"
                                maxlength="100"
                            />
                            ——
                            <el-input
                                v-model="el.url"
                                style="width:44%;margin: 5px 0"
                                placeholder="input the url"
                                prop="url"
                                maxlength="2000"
                            />
                            <a style="cursor:pointer" /><i
                                class="el-icon-close"
                                @click="removeLink(index, el.id)"
                            />
                        </div>
                    </el-form-item> -->
                    <el-form-item
                        v-for="(el, index) in profileForm.links"
                        :key="el.key"
                        label="Links:"
                    >
                        <el-col :span="10">
                            <el-form-item
                                :prop="'links.' + index + '.name'"
                                :rules="{
                                    required: true,
                                    message: $t(
                                        'message.Profile.Pls_enter_link_title'
                                    ),
                                    trigger: 'blur'
                                }"
                            >
                                <el-input
                                    v-model="el.name"
                                    placeholder="input the title of the url"
                                    maxlength="100"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" style="text-align:center">-</el-col>
                        <el-col :span="10">
                            <el-form-item
                                :prop="'links.' + index + '.url'"
                                :rules="[
                                    {
                                        required: true,
                                        message: $t(
                                            'message.Profile.Pls_enter_correct_link'
                                        ),
                                        trigger: 'blur'
                                    },
                                    { validator: checkUrl, trigger: 'blur' }
                                ]"
                            >
                                <el-input
                                    v-model="el.url"
                                    placeholder="input the title of the url"
                                    maxlength="2000"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <a style="cursor:pointer"
                                ><i
                                    class="el-icon-close"
                                    @click="removeLink(index, el.id)"
                                />
                            </a>
                        </el-col>
                    </el-form-item>

                    <div class="clearfix">
                        <el-button style="float: right" @click="addLink">
                            <i class="iconfont icon-add icon-adds" />{{
                                $t("message.Add_a_link")
                            }}
                        </el-button>
                    </div>
                    <div style="text-align: center" class="footer_bottom">
                        <el-button @click="resetForm">
                            {{ $t("message.Cancel") }}
                        </el-button>
                        <el-button
                            type="primary"
                            @click="submitForm('profileForm')"
                        >
                            {{ $t("message.Save") }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>
<script>
/*eslint-disable*/
import { mapGetters, mapMutations } from "vuex";
import defaultHeads from "../../../static/images/touxiang.png";

export default {
    props: {
        message: { type: Boolean }
    },
    data() {
        const checkUrl = (rule, value, callback) => {
            const url = value.slice(0, 8);
            if (url.indexOf("https://") != -1 || url.indexOf("http://") != -1) {
                callback();
            } else {
                callback(
                    new Error(this.$t("message.Profile.Pls_enter_correct_link"))
                );
            }
        };
        return {
            checkUrl: checkUrl,
            defaultHeads,
            tempIdss: [],

            userSetting: {},
            labelPosition: "right",
            imageUrl: "",
            touxiangid: "",
            profileForm: {
                id: "",
                username: "",
                title: "",
                phone: "",
                links: [
                    {
                        id: "",
                        name: "",
                        url: ""
                    }
                ],
                email: null,
                description: ""
            },
            rules: {
                nickname: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Profile.Pls_enter_display_name"
                        ),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.Profile.Length_1_and_100"),
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.Profile.Length_1_and_100"),
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.Profile.Length_1_and_100"),
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        min: 1,
                        max: 30,
                        message: this.$t("message.Profile.Length_1_and_30"),
                        trigger: "blur"
                    }
                ],

                name: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Profile.Pls_enter_active_name"
                        ),
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        min: 1,
                        max: 2000,
                        message: this.$t("message.Profile.Length_1_and_20"),
                        trigger: "blur"
                    }
                ]
            },

            // editMaterial: false,
            Material: true,
            uploadUrl: `${process.env.NODE_ENV}/upload`
        };
    },
    computed: {
        ...mapGetters(["userInfoData", "instituteList"])
    },
    watch: {
        userInfoData: {
            handler() {
                this.getUserSetting();
            },
            deep: true
        }
    },
    mounted() {
        this.getUserSetting();
    },

    methods: {
        ...mapMutations(["setUserInfo"]),
        getAbsolutePath(relativePath, width, height) {
            if (typeof relativePath === "undefined") return defaultHeads;
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const tempIds = this.tempIdss;
                    if (tempIds.length !== 0 && tempIds[0] !== "undefined") {
                        const result = await this.$getData(
                            "/userLink/deletes",
                            tempIds,
                            "post"
                        );
                        if (Number(result.data.code) === 200) {
                            // this.$message({
                            //     message: this.$t(
                            //         "message.UserSetting_delete_links_tip"
                            //     ),
                            //     type: "success"
                            // });
                        }
                    }

                    const params = {
                        id: this.userInfoData.id,
                        nickname: this.profileForm.nickname,
                        title: this.profileForm.title,
                        phone: this.profileForm.phone,
                        email: this.profileForm.email,
                        description: this.profileForm.description,
                        links: this.profileForm.links,
                        url: this.userSetting.avatarFileId
                    };

                    const res = await this.$getData(
                        "/userSetting/modify ",
                        params,
                        "post"
                    );
                    if (Number(res.data.code) === 200) {
                        this.getUserSetting();

                        this.$message({
                            message: this.$t(
                                "message.UserSetting_update_success_tip"
                            ),
                            type: "success"
                        });
                        this.Material = true;
                    }
                    return true;
                }
                return false;
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if (Number(res.code) === 200) {
                /* this.userSetting.avatarFileId = res.entity[0].fileId; */
                this.$set(
                    this.userSetting,
                    "avatarFileId",
                    res.entity[0].fileId
                );
                this.getAbsolutePath(this.userSetting.avatarFileId);
                const tempUserFile = res.entity[0].fileId;
                this.touxiangid = this.userInfoData.id;
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
                            const tempInfo = Object.assign(
                                {},
                                this.userInfoData,
                                { avatarFileId: tempUserFile }
                            );
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
        beforeAvatarUpload(file) {
            const isJPG =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error(
                    this.$t("message.Profile.Image_formate_jpg")
                );
            }
            if (!isLt2M) {
                this.$message.error(this.$t("message.Profile.Image_size_2M"));
            }
            return isJPG && isLt2M;
        },
        getUserSetting() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/userSetting/get?data=${this.userInfoData.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.profileForm = res.data.entity;
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
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        resetForm() {
            this.Material = true;
            this.getUserSetting();
        },
        async removeLink(index, id) {
            // console.log('remove', id)
            if (id) {
                this.tempIdss.push(String(id));
            }
            // 删除页面连接
            this.profileForm.links.splice(index, 1);
        },
        addLink() {
            this.profileForm.links.push({
                name: "",
                url: "",
                key: Date.now()
            });
        },
        showEditMaterial() {
            this.Material = false;
            this.$emit("changeMaterial", false);
            this.tempIdss = [];
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
.account-profile-page {
    margin-top: 20px;
    margin-left: 30px;
    .profileLeft {
        border-radius: 60px;
        float: left;
        text-align: center;
        color: #333;

        .avatar {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .profileRight {
        width: 57%;
        height: 100%;
        float: left;
        margin-bottom: 10%;
        margin-left: 20px;
    }
    .show {
        padding-bottom: 60px;
        padding-left: 30px;
        line-height: 34px;
        color: #666;
    }
    .displayMaterials {
        border-left: 1px solid #ccc;
    }
    .editProfileUsers {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        background-color: #cf9236;
        margin: 0 auto;
    }
    .demo-dynamic {
        width: 600px;
        margin: 0 auto;
    }
    .add_touxiang {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 70px;
        overflow: hidden;
        margin: 0 auto 30px;
    }
    .avatar-uploader {
        width: 100%;
        height: 100%;
    }
    /deep/ .allCourse-tabs .el-form-item {
        margin-top: 20px;
    }
    .h3_tit {
        font-weight: bolder;
    }
    .form-title {
        font-weight: bolder;
        font-size: 20px;
        margin-bottom: 0;
        .el-form-item__label {
            text-align: right;
        }
    }
}
.desc_Biography /deep/ .el-form-item__label {
    font-weight: bolder;
}
/deep/ .el-textarea__inner {
    color: rgb(96, 98, 102);
    font-family: "微软雅黑";
}
.link_input {
    margin-right: -21px;
}
.icon-adds {
    vertical-align: middle;
    margin-right: 10px;
}
.footer_bottom {
    margin-top: 30px;
}
.moren {
    width: 70px;
    height: 70px;
    display: block;
}
.show p {
    width: 500px;
    word-wrap: break-word;
    word-break: normal;
}
.userSetting_name {
    width: 300px;
    display: block;
    word-wrap: break-word;
}
.userSetting_title {
    width: 300px;
    display: block;
    word-wrap: break-word;
}
</style>
