<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                :label="$t('message.ADMINSEITING.Admins')"
                name="admins"
                class="admin_father"
            >
                <el-button class="add_admin" @click="addFormBut">
                    <i class="iconfont icon-add" />
                    {{ $t("message.ADMINSEITING.Account_Admin") }}
                </el-button>
                <el-row>
                    <el-col
                        v-for="(o, index) in admins"
                        :key="o.orgUserId"
                        :span="5"
                        :offset="index % 4 > 0 ? 1 : 0"
                        style="padding-top: 5px"
                    >
                        <el-card
                            :body-style="{ padding: '0px', height: '100px' }"
                        >
                            <div style="padding: 14px;" class="module_father">
                                <span>{{ o.username }}</span
                                ><br />
                                <span>{{ getOrgName(o.orgId) }}</span
                                ><br />
                                <el-button
                                    v-if="userInfoData.id != o.userId"
                                    ref="remove_lose"
                                    type="text"
                                    class="remove_right"
                                    @click="toDelAccount(o)"
                                >
                                    <i class="iconfont icon-close" />
                                </el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div>
                    <el-dialog
                        title="add Admins"
                        :visible.sync="dialogFormVisible"
                        @close="closeForm"
                    >
                        <el-form
                            v-show="oneStep"
                            ref="ruleForm"
                            :model="form"
                            :rules="rules"
                        >
                            <el-form-item
                                :label="$t('message.ADMINSEITING.add_user_by')"
                                required
                                prop="type"
                            >
                                <el-radio v-model="form.type" label="1">
                                    {{ $t("message.ADMINSEITING.Login_ID") }}
                                </el-radio>
                                <el-radio v-model="form.type" label="2">
                                    {{ $t("message.ADMINSEITING.SIS_ID") }}
                                </el-radio>
                            </el-form-item>
                            <el-form-item
                                :label="
                                    $t('message.ADMINSEITING.example_mjack')
                                "
                                prop="datas"
                            >
                                <el-input
                                    v-model="form.datas"
                                    type="textarea"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.UserSetting_mechanism')"
                                prop="orgId"
                            >
                                <el-select
                                    v-model="form.orgId"
                                    class="mechanism_please"
                                    :placeholder="
                                        $t('message.UserSetting_please')
                                    "
                                >
                                    <el-option
                                        v-for="item in orgs"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id + '_' + item.treeId"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-table
                            v-show="twoStep"
                            :data="users"
                            stripe
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="fullName"
                                :label="$t('message.allName')"
                            />
                            <el-table-column
                                prop="email"
                                :label="$t('message.loginemail')"
                                width="180"
                            />
                            <el-table-column
                                prop="username"
                                :label="$t('message.loginname')"
                                width="180"
                            />
                            <el-table-column
                                prop="sisId"
                                label="sisId"
                                width="180"
                            />
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel">
                                {{ $t("message.UserSetting_cancel") }}
                            </el-button>
                            <el-button
                                v-show="oneStep"
                                type="primary"
                                @click="next('ruleForm')"
                            >
                                {{ $t("message.UserSetting_next") }}
                            </el-button>
                            <el-button
                                v-show="twoStep"
                                type="primary"
                                @click="before"
                            >
                                {{ $t("message.UserSetting_prev") }}
                            </el-button>
                            <el-button
                                v-show="twoStep"
                                type="primary"
                                @click="submit"
                            >
                                {{ $t("message.UserSetting_submit") }}
                            </el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane
                :label="$t('message.ADMINSEITING.Mail_Configuration')"
                name="first"
            >
                <div class="name_title">
                    {{ $t("message.ADMINSEITING.Mail_Configuration") }}
                </div>
                <div class="check_email">
                    <ul>
                        <li>
                            <el-checkbox v-model="ruleForm.isOpen">
                                {{
                                    $t(
                                        "message.ADMINSEITING.Open_Email_Service"
                                    )
                                }}
                            </el-checkbox>
                        </li>
                        <li>
                            <el-checkbox
                                v-model="ruleForm.isOpenRegist"
                                :disabled="!ruleForm.isOpen"
                            >
                                {{
                                    $t(
                                        "message.ADMINSEITING.Open_Email_Verification"
                                    )
                                }}
                            </el-checkbox>
                        </li>
                        <li>
                            <el-checkbox
                                v-model="ruleForm.isOpenRetrievePwd"
                                :disabled="!ruleForm.isOpen"
                            >
                                {{
                                    $t(
                                        "message.ADMINSEITING.Open_Email_Retrieval"
                                    )
                                }}
                            </el-checkbox>
                        </li>
                        <li>
                            <el-checkbox
                                v-model="ruleForm.isOpenPushNotify"
                                :disabled="!ruleForm.isOpen"
                            >
                                {{
                                    $t(
                                        "message.ADMINSEITING.Open_Email_Push_System"
                                    )
                                }}
                            </el-checkbox>
                        </li>
                    </ul>
                </div>
                <div>
                    <p style="width: 70%;padding: 20px 10%;font-weight: 600">
                        {{ $t("message.ADMINSEITING.Simple_Mail_Transfer") }}
                    </p>
                </div>
                <div class="ruleform">
                    <el-form
                        ref="ruleForm"
                        :label-position="labelPosition"
                        :label-width="labelWidth"
                        :model="ruleForm"
                        :rules="ItemRules"
                    >
                        <el-form-item
                            :label="$t('message.ADMINSEITING.Display_name')"
                            prop="name"
                        >
                            <el-input
                                v-model="ruleForm.emailDisplayName"
                                maxlength="40"
                                show-word-limit
                            />
                            <p>
                                {{
                                    $t(
                                        "message.ADMINSEITING.It_will_be_displayed"
                                    )
                                }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.SMTP_host')"
                            prop="emailHost"
                        >
                            <el-input
                                v-model="ruleForm.emailHost"
                                maxlength="100"
                                show-word-limit
                            />
                            <p>
                                {{
                                    $t(
                                        "message.ADMINSEITING.Give_the_full_name"
                                    )
                                }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.SMTP_port')"
                            prop="emaiPort"
                        >
                            <el-input
                                v-model="ruleForm.emaiPort"
                                maxlength="5"
                                show-word-limit
                            />
                            <p>
                                {{
                                    $t(
                                        "message.ADMINSEITING.Port_25_is_default"
                                    )
                                }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.SMTP_security')"
                            prop="emaiSecurityType"
                        >
                            <el-select
                                v-model="ruleForm.emaiSecurityType"
                                :placeholder="$t('message.ADMINSEITING.Select')"
                                style="width: 100%"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                                />
                            </el-select>
                            <p>
                                {{
                                    $t(
                                        "message.ADMINSEITING.If_SMTP_server_requires"
                                    )
                                }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.SMTP_Auth_Type')"
                            prop="emaiAuthType"
                        >
                            <el-select
                                v-model="ruleForm.emaiAuthType"
                                :clearable="true"
                                disabled="disabled"
                                placeholder="1"
                                style="width: 100%"
                            >
                                :placeholder="$t('message.Common_please_select')"
                                <el-option label="LOGIN" :value="0" />
                            </el-select>
                            <p>
                                {{
                                    $t(
                                        "message.ADMINSEITING.This_sets_the_authentication"
                                    )
                                }}
                            </p>
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.SMTP_username')"
                            prop="emailUserName"
                        >
                            <el-input
                                v-model="ruleForm.emailUserName"
                                maxlength="100"
                                show-word-limit
                            />
                            <p />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.SMTP_password')"
                            prop="emailPwd"
                        >
                            <el-input
                                v-model="ruleForm.emailPwd"
                                show-password
                                maxlength="30"
                                show-word-limit
                            />
                            <p>
                                {{
                                    $t(
                                        "message.ADMINSEITING.username_and_password"
                                    )
                                }}
                            </p>
                        </el-form-item>
                        <div
                            style="margin-top: 0px;
                                float: right;
                                margin-right: 20px;
                                margin-bottom: 20px"
                        >
                            <el-button
                                v-show="!ruleForm.id"
                                @click="cancelItem"
                            >
                                {{ $t("message.ADMINSEITING.Update") }}
                            </el-button>
                            <el-button
                                v-show="ruleForm.id"
                                @click="MondifylItem"
                            >
                                {{ $t("message.ADMINSEITING.Update") }}
                            </el-button>
                            <el-button
                                style="background-color: #0138b1"
                                type="primary"
                                @click="submitItem"
                            >
                                {{
                                    $t(
                                        "message.ADMINSEITING.Test_Configuration"
                                    )
                                }}
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane
                :label="$t('message.ADMINSEITING.Mail_Send')"
                name="send"
            >
                <div class="name_title">
                    {{ $t("message.ADMINSEITING.Mail_Send") }}
                </div>
                <div class="ruleform" style="margin-top: 50px;">
                    <el-form
                        ref="rule"
                        :label-position="labelPosition"
                        :label-width="labelWidth"
                        :model="rule"
                        :rules="Itemquiz"
                    >
                        <el-form-item
                            :label="$t('message.ADMINSEITING.Message_to')"
                            prop="recEmail"
                        >
                            <el-input
                                v-model="rule.recEmail"
                                maxlength="100"
                                show-word-limit
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.Subject')"
                            prop="subject"
                        >
                            <el-input
                                v-model="rule.subject"
                                maxlength="100"
                                show-word-limit
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.ADMINSEITING.Email_Content')"
                            prop="content"
                        >
                            <div class="messagetext">
                                <ckeditor
                                    v-model="rule.content"
                                    :editor="editor"
                                    :config="editorConfig"
                                />
                            </div>
                        </el-form-item>
                        <div
                            style="margin-top: 0px;
                                float: right;
                                margin-bottom: 20px"
                        >
                            <el-button
                                style="background-color: #0138b1"
                                type="primary"
                                @click="send"
                            >
                                {{ $t("message.ADMINSEITING.Send") }}
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }] */
import { mapGetters } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import baseValidater from "@/utils/baseValidater";

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            details: {},
            isOpen: true,
            isOpenRegist: true,
            curUserId: "",
            isOpenRetrievePwd: true,
            isOpenPushNotify: true,
            dialogFormVisible: false,
            oneStep: true,
            twoStep: false,
            admins: [],
            orgs: [],
            labelPosition: "right",
            labelWidth: "180px",
            currentDate: new Date(),
            activeName: "admins",
            ruleForm: {
                isOpen: true,
                isOpenRegist: true,
                isOpenRetrievePwd: true,
                isOpenPushNotify: true,
                emailHost: "",
                emailDisplayName: "",
                emaiPort: "",
                emaiAuthType: 0,
                emaiSecurityType: 0,
                emailUserName: "",
                emailPwd: ""
            },
            options: [
                {
                    value: 0,
                    label: this.$t("message.ADMINSEITING.None")
                },
                {
                    value: 1,
                    label: this.$t("message.ADMINSEITING.SSL")
                },
                {
                    value: 2,
                    label: this.$t("message.ADMINSEITING.TLS")
                }
            ],
            rule: {
                recEmail: "",
                subject: "",
                content: ""
            },
            form: {
                type: "1",
                datas: "",
                orgId: "" // orgId_orgTreeId
            },
            users: [],
            ItemRules: {
                emailHost: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.The_length_should_between"
                        ),
                        trigger: "blur"
                    }
                ],
                emaiPort: [
                    {
                        required: true,
                        validator: baseValidater.integerP,
                        trigger: "blur"
                    },
                    {
                        required: true,
                        validator: baseValidater.adminSetting,
                        trigger: "blur"
                    }
                ],
                emailUserName: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.SMTP_username_is_required"
                        ),
                        trigger: "blur"
                    },
                    {
                        validator: baseValidater.emailValue,
                        trigger: "blur"
                    }
                ],
                emailPwd: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.SMTP_password_is_required"
                        ),
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        max: 30,
                        message: this.$t("message.limit_4_30"),
                        trigger: "blur"
                    }
                ]
            },
            Itemquiz: {
                recEmail: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.Message_to_is_required"
                        ),
                        trigger: "blur"
                    },
                    {
                        validator: baseValidater.emailValue,
                        trigger: "blur"
                    }
                ],
                subject: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.Subject_is_required"
                        ),
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.Content_is_required"
                        ),
                        trigger: "blur"
                    }
                ]
            },
            rules: {
                datas: [
                    {
                        required: true,
                        message: this.$t("message.activityNames"),
                        trigger: "blur"
                    }
                ],
                orgId: [
                    {
                        required: true,
                        message: this.$t(
                            "message.ADMINSEITING.mechanism_is_required"
                        ),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    watch: {
        /* eslint-disable */
        "ruleForm.isOpen": {
            handler(newV, oldV) {
                if (!newV) {
                    this.ruleForm.isOpen = false;
                    this.ruleForm.isOpenRegist = false;
                    this.ruleForm.isOpenRetrievePwd = false;
                    this.ruleForm.isOpenPushNotify = false;
                }
            },
            deep: true,
            immediate: true
        }
        /* eslint-disable no-new */
    },
    created() {
        //console.log("123", this.userInfoData);
    },
    mounted() {
        this.emailConfig();
        this.getOrgList();
        this.getAdminData();
    },
    methods: {
        async cancel() {
            this.oneStep = false;
            this.twoStep = false;
            this.dialogFormVisible = false;
        },
        async addFormBut() {
            this.dialogFormVisible = true;
            this.oneStep = true;
            this.twoStep = false;
        },
        async before() {
            this.oneStep = true;
            this.twoStep = false;
        },
        async next(formName) {
            /* eslint-disable */
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.oneStep = false;
                    this.twoStep = true;
                    this.loadData();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            /* eslint-disable no-new */
        },
        /* eslint-disable */
        closeForm() {
            this.form.orgId = "";
            this.form.datas = "";
        },
        async submit() {
            const data = {};
            data.orgId = this.form.orgId.split("_")[0];
            data.orgTreeId = this.form.orgId.split("_")[1];
            data.users = this.users;
            const result = await this.$getData("/addAdmin/add", data, "post");
            if (result.data.code === 200) {
                this.form.orgId = "";
                this.form.datas = "";
                this.getAdminData();
                this.cancel();
            }
            /* eslint-disable no-new */
        },
        toDelAccount(curUser) {
            this.$confirm(this.$t("message.ADMINSEITING.admin_account"), "", {
                distinguishCancelAndClose: true,
                confirmButtonText: this.$t("message.ADMINSEITING.Delete"),
                cancelButtonText: this.$t("message.ADMINSEITING.Cancel")
            })
                .then(async () => {
                    this.curUserId = curUser.orgUserId;
                    const result = await this.$getData(
                        "/orgAdmin/remove/edit",
                        { orgUserId: this.curUserId },
                        "post"
                    );
                    if (result.data.code === 200) {
                        this.$message({
                            type: "info",
                            message: this.$t(
                                "message.ADMINSEITING.Delete_succeeded"
                            )
                        });
                        this.getAdminData();
                    }
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: action === 'cancel'
                    //     ? '放弃保存并离开页面'
                    //     : '停留在当前页面'
                    // })
                });
        },
        async remove() {
            const result = await this.$getData(
                "/orgAdmin/remove/edit",
                { orgUserId: this.curUserId },
                "post"
            );
            if (result.data.code === 200) {
                this.getAdminData();
            }
        },
        handleClose() {},
        async loadData() {
            let data = "";
            const { type } = this.form;
            if (Number(type) === 1) {
                // loginId
                data = `usernames=${this.form.datas}`;
            } else {
                // sisid
                data = `sisIds=${this.form.datas}`;
            }
            const result = await this.$getData(
                `/user/list?${data}`,
                null,
                "get"
            );
            if (result.data.code === 200) {
                this.users = result.data.entity;
            }
        },
        getOrgName(orgId) {
            /* eslint-disable */
            let name = "";
            this.orgs.forEach(o => {
                if (o.id === orgId) {
                    name = o.name;
                }
            });
            return name;
            /* eslint-disable no-new */
        },
        async getOrgList() {
            const result = await this.$getData(
                "/org/select/query",
                null,
                "get"
            );
            if (result.data.code === 200) {
                this.orgs = result.data.entity;
            }
        },
        async getAdminData() {
            const result = await this.$getData("/orgAdmin/list", null, "get");
            if (result.data.code === 200) {
                this.admins = result.data.entity;
                //console.log("admins", this.admins);
            }
        },
        handleClick(tab, event) {
            console.log((tab, event));
        },
        onSubmit() {
            console.log("submit!");
        },

        //开发邮箱设置功能
        /**
         * 更新修改邮箱
         * */
        MondifylItem() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.id = this.ruleForm.id;
                    data.isOpen = Number(this.ruleForm.isOpen);
                    data.isOpenRegist = Number(this.ruleForm.isOpenRegist);
                    data.isOpenRetrievePwd = Number(
                        this.ruleForm.isOpenRetrievePwd
                    );
                    data.isOpenPushNotify = Number(
                        this.ruleForm.isOpenPushNotify
                    );
                    data.emailDisplayName = this.ruleForm.emailDisplayName;
                    data.emailHost = this.ruleForm.emailHost;
                    data.emaiPort = this.ruleForm.emaiPort;
                    data.emaiSecurityType = this.ruleForm.emaiSecurityType;
                    data.emaiAuthType = 0;
                    data.emailUserName = this.ruleForm.emailUserName;
                    data.emailPwd = this.ruleForm.emailPwd;

                    // 非新建
                    const result = await this.$getData(
                        "/emailConfig/modify",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.Updated_successfully"
                            ),
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.Update_failed"
                            ),
                            type: "warning"
                        });
                    }
                } else {
                    return false;
                }
                return false;
            });
        },
        /**
         * 添加邮箱
         * */
        cancelItem() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.isOpen = Number(this.ruleForm.isOpen);
                    data.isOpenRegist = Number(this.ruleForm.isOpenRegist);
                    data.isOpenRetrievePwd = Number(
                        this.ruleForm.isOpenRetrievePwd
                    );
                    data.isOpenPushNotify = Number(
                        this.ruleForm.isOpenPushNotify
                    );
                    data.emailDisplayName = this.ruleForm.emailDisplayName;
                    data.emailHost = this.ruleForm.emailHost;
                    data.emaiPort = this.ruleForm.emaiPort;
                    data.emaiSecurityType = this.ruleForm.emaiSecurityType;
                    data.emaiAuthType = 0;
                    data.emailUserName = this.ruleForm.emailUserName;
                    data.emailPwd = this.ruleForm.emailPwd;
                    const result = await this.$getData(
                        "/emailConfig/add",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.Updated_successfully"
                            ),
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.Update_failed"
                            ),
                            type: "warning"
                        });
                    }
                } else {
                    return false;
                }
                return false;
            });
        },
        /**
         * 配置是否成功
         * */
        submitItem() {
            var emailConfigTest = {
                testType: 0
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/emailConfigTest/add`,
                    emailConfigTest
                )
                .then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.SMTP_Service_Setup_Successful"
                            ),
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.SMTP_service_setup_failed_please_reset"
                            ),
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 测试邮箱
         * */
        send() {
            this.$refs.rule.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.testType = 1;
                    data.recEmail = this.rule.recEmail;
                    data.subject = this.rule.subject;
                    data.content = this.rule.content;

                    const result = await this.$getData(
                        "/emailConfigTest/add",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.Sent_successfully"
                            ),
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: this.$t(
                                "message.ADMINSEITING.Send_failed"
                            ),
                            type: "warning"
                        });
                    }
                } else {
                    return false;
                }
                return false;
            });
        },
        /**
         * 邮箱详情
         * */
        emailConfig() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/emailConfig/get?data=${this.userInfoData.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        if (res.data.entity) {
                            var ruleForm = res.data.entity;
                            ruleForm.isOpen = !!ruleForm.isOpen;
                            ruleForm.isOpenRegist = !!ruleForm.isOpenRegist;
                            ruleForm.isOpenRetrievePwd = !!ruleForm.isOpenRetrievePwd;
                            ruleForm.isOpenPushNotify = !!ruleForm.isOpenPushNotify;
                            this.ruleForm = ruleForm;
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
.tab_father {
    padding-left: 215px;
}

.settings h3 {
    border-bottom: 1px solid #ccc;
}

.quotas h3 {
    border-bottom: 1px solid #ccc;
}

.Admins h3 {
    border-bottom: 1px solid #ccc;
}

.settings p {
    margin-top: 30px;
}

.quotas p {
    margin-top: 25px;
}

.settings p label {
    display: inline-block;
    width: 200px;
    text-align: right;
}

.quotas p label {
    display: inline-block;
    width: 200px;
    text-align: right;
}

.settings p .settings_right {
    width: 800px;
    margin-left: 20px;
}

.quotas p .quotas_right {
    width: 400px;
    margin-left: 20px;
}

.quotas p span {
    margin-left: 20px;
}

.margin_left {
    margin-left: 25px;
}

.quotas_button {
    margin-left: 20px;
}

.quotas_small_input {
    width: 180px;
    margin-left: 20px;
}

.quotas_small_button {
    margin-left: 20px;
}

.quotas_button {
    background: blue;
    color: white;
}

.example {
    padding-left: 30px;
}

.notifications p span {
    margin-left: 10px;
}

.example ul {
    margin-left: 30px;
}

.example ul li {
    line-height: 45px;
}

.example ul li .tit_left {
    display: inline-block;
    width: 100px;
}

.update_settings {
    margin-left: 200px;
}

.notifications h3 {
    line-height: 30px;
}

.notifications p {
    line-height: 30px;
}

.diaxso {
    width: 300px;
}

.Admins_list {
    display: flex;
}

.Admins_list p {
    width: 300px;
    border: 1px dashed #ccc;
    padding-left: 10px;
    margin-right: 20px;
    margin-top: 20px;
}

.Admins_list ul li {
    line-height: 35px;
}

.Admins_list_p2 {
    position: relative;
}

.Admins_list_p2 span {
    position: absolute;
    right: 10px;
    top: 7px;
}

.module_father {
    position: relative;
}

.remove_right {
    position: absolute;
    right: 10px;
    top: 4px;
    color: #222222;
    font-size: 12px;
}

.admin_father {
    position: relative;
    width: 80%;
    height: 100px;
    padding-right: 130px;
}

.add_admin {
    position: absolute;
    right: -20px;
    top: 0;
    z-index: 999;
}

.add_admin .icon-add {
    vertical-align: middle;
    font-size: 22px;
}

/deep/ .el-dialog__footer {
    text-align: center;
}

.mechanism_please {
    width: 240px;
}

.name_title {
    font-size: 20px;
    height: 60px;
    border-bottom: 1px solid #eee;
    font-family: ArialMT;
    color: rgba(51, 51, 51, 1);
    line-height: 90px;
}

.check_email {
    border-bottom: 1px solid #eee;
}

.check_email ul {
    line-height: 30px;
    margin-left: 22%;
    text-align: left;
}

.ruleform {
    margin-left: 10%;
    width: 60%;
}

/*.ruleform .el-form-item {*/
/*margin-bottom: 2px !important;*/
/*}*/
.ruleform p {
    line-height: 24px !important;
    color: #999999;
    font-family: ArialMT;
}
</style>
