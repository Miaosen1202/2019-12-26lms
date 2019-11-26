<template>
    <div class="logo">
        <!--eslint-disable-->
        <p class="logo-box" @click="back">
            <img src="../../static/images/logo.png" alt="" />
        </p>
        <div class="userInfo">
            <a style="display: inline-block; vertical-align: middle">
                <img :src="userPic" alt="" />
            </a>
            <div class="roleInfo">
                <div class="roleBox" style="cursor:pointer">
                    <h1 class="roleLabel">
                        {{ showRole }}
                    </h1>
                    <el-cascader
                        ref="cascader"
                        v-model="selectedRole"
                        :popper-class="roleCascader"
                        :options="roleList"
                        @change="changeRole"
                    />
                    <h2 style="padding-left: 20px" class="userName">
                        {{ userRole }}
                    </h2>
                </div>
            </div>
        </div>
        <!-- todo 语言包引入-->
        <div class="languageBox">
            <el-select v-show="true" v-model="selectValue" @change="langChange">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import { mapState, mapMutations, mapGetters } from "vuex";
import defaultPic from "../../static/images/touxiang.png";

export default {
    data() {
        return {
            roleCascader: "roleCascader",
            selectValue: "",
            options: [
                {
                    value: "zh",
                    label: "中文"
                },
                {
                    value: "fr",
                    label: "Français"
                },
                {
                    value: "en",
                    label: "English"
                },
                {
                    value: "ru",
                    label: "русский язык "
                }
            ],
            roleList: [
                {
                    value: "teacher",
                    label: this.$t("message.Teacher")
                },
                {
                    value: "student",
                    label: this.$t("message.Student")
                },
                {
                    value: "LogOut",
                    label: this.$t("message.log_out")
                }
            ],
            selectedRole: [],
            roleName: this.$t("message.role_switch"),
            showRole: []
        };
    },

    computed: {
        ...mapState(["curLanguage", "userInfo"]),
        ...mapGetters(["userInfoData", "instituteList"]),
        userRole() {
            return this.userInfoData.username;
        },
        userPic() {
            if (this.userInfoData.avatarFileId) {
                return `${process.env.FILE_PRE_SERVER}${this.userInfoData.avatarFileId}`;
            }
            return defaultPic;
        },
        HasAdmin() {
            if (this.instituteList.length == 0) {
                return false;
            }
            return true;
        }
    },
    watch: {
        userInfoData: {
            handler(newVal, oldVal) {
                // console.log('newVal', newVal)
                // this.userRole = newVal.username;
                // this.userPic = newVal.avatarFileId ? `${process.env.FILE_PRE_SERVER}`+this.userInfoData.avatarFileId : defaultPic
            },
            deep: true,
            immediate: true
        },
        selectValue: {
            handler(newVal, oldVal) {
                // this.selectValues = newVal
            },
            deep: true,
            immediate: true
        },
        selectedRole() {
            const tempRoleName = this.selectedRole[0];
            let tempRole = "";
            if (tempRoleName == "student") {
                tempRole = "S";
            } else if (tempRoleName.startsWith("Admin")) {
                tempRole = "A";
            } else if (tempRoleName == "teacher") {
                tempRole = "T";
            } else if (tempRoleName == "ta") {
                tempRole = "Ta";
            }
            this.showRole = tempRole;
        },
        immediate: true
    },
    created() {
        this.selectedRole =
            this.selectedRole.length != 0
                ? this.selectedRole
                : localStorage.getItem("currentRole").split(",");
        const that = this;
        that.selectValue =
            localStorage.lang == undefined ? "en" : localStorage.lang;
        this.langChange(that.selectValue);
        if (this.HasAdmin) {
            let tempObj = {};
            if (this.instituteList.length == 1) {
                tempObj = {
                    value: `Admin_${this.instituteList[0].id}_${this.instituteList[0].treeId}_${this.instituteList[0].name}`,
                    label: this.$t("message.Admin")
                };
                tempObj = Object.assign(tempObj, this.instituteList[0]);
                this.roleList.splice(3, 0, tempObj);
            } else if (this.instituteList.length > 1) {
                const tempInstitueList = this.instituteList.map(el => {
                    el.value = `${el.id}_${el.treeId}_${el.name}`;
                    el.label = el.name;
                    return el;
                });
                tempObj = {
                    value: "Admin",
                    label: this.$t("message.Admin"),
                    children: tempInstitueList
                };
                this.roleList.splice(3, 0, tempObj);
            }
        } else {
            // console.log('不是管理员')
        }
    },

    methods: {
        ...mapMutations(["changeLanguage", "setUserInfo", "logout"]),
        // 语言切换
        langChange(e) {
            //console.log('语言装换', e);
            localStorage.setItem("lang", e);
            this.$i18n.locale = e;
            this.changeLanguage(e);
            this.roleList = [
                {
                    value: "switch",
                    label: this.$t("message.role_switch"),
                    disabled: true
                },
                {
                    value: "student",
                    label: this.$t("message.Student")
                },
                {
                    value: "teacher",
                    label: this.$t("message.Teacher")
                },
                {
                    value: "ta",
                    label: this.$t("message.teacher_assistant")
                },
                {
                    value: "logOut",
                    label: this.$t("message.log_out")
                }
            ];
        },
        back() {
            // this.$router.push({path:"/"});
        },
        changeLanguage(e) {
            var quest = {
                language: e
            };
            this.$http
                .post(`${process.env.NODE_ENV}/changeLanguage`, quest)
                .then(res => {
                    if (res.data.code == 200) {
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        async changeRole(value) {
            localStorage.setItem("currentRole", value);
            const tempValueList = value;
            const len = tempValueList.length;
            if (len == 1) {
                const tempRole = tempValueList[0];
                if (tempRole == "teacher") {
                    await this.change(2);
                    this.$router.push({ path: "/homePage/controlPanel" });
                } else if (tempRole == "ta") {
                    await this.change(3);
                    this.$router.push({ path: "/homePage/controlPanel" });
                } else if (tempRole == "student") {
                    await this.change(4);
                    this.$router.push({
                        path: "/studentHomePage/studentControlPanel"
                    });
                } else if (tempRole.indexOf("Admin") > -1) {
                    const orgId = tempRole.split("_")[1];
                    const orgTreeId = tempRole.split("_")[2];
                    const orgName = tempRole.split("_")[3];
                    const orgObj = {
                        orgId,
                        orgTreeId,
                        orgName
                    };
                    await this.change(1, orgObj);
                    this.$router.push({
                        path: "/adminHomePage/adminCourseAll",
                        query: { data: new Date().getTime() }
                    });
                } else if (tempRole == "logOut") {
                    const res = await this.$getData("/logout", "get");
                    this.logout(); // mutation
                    if (res.data.code == 200) {
                        this.$router.push({ path: "/login" });
                    }
                }
            } else {
                const tempList = value[1].split("_");
                const [tempId, tempTreeId, tempName] = tempList;
                const orgObj = {
                    orgId: tempId,
                    orgTreeId: tempTreeId,
                    orgName: tempName
                };
                await this.change(1, orgObj);

                this.$router.push({
                    path: "/adminHomePage/adminCourseAll",
                    query: { data: new Date().getTime() }
                });
                // this.$router.go(0)
            }
        },
        // 切换角色typeId
        async change(typeId, orgObj) {
            let params = {};
            if (orgObj) {
                params = {
                    orgId: orgObj.orgId,
                    typeId
                };
            } else {
                params = { typeId };
            }
            const res = await this.$getData("/change", params, "post");
            if (res.data.code == 200) {
                let tempUserInfo = this.userInfoData;
                const tempTypeObj = { type: typeId };
                tempUserInfo = Object.assign(tempUserInfo, orgObj, tempTypeObj);
                this.setUserInfo(tempUserInfo);
            }
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
p {
    display: inline-block;
}
.logo-box {
    cursor: pointer;
    padding: 5px;
    overflow: hidden;
    float: left;
    margin-top: 12px;
    width: 114px;
    margin-left: 5px;
    img {
        display: inline-block;
        width: 100%;
    }
}
.userInfo {
    float: right;
    padding-right: 2%;
    margin-top: 0.4%;
    display: flex;
    justify-content: space-around;
    a {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 2px;
        border: 1px solid #ccc;
        border-radius: 50%;
        overflow: hidden;
        img {
            display: inline-block;
            width: 40px;
            height: 40px;
        }
    }
    .roleInfo {
        width: 90px;
        margin-left: 20px;
        h1 {
            font-size: 14px;
            font-weight: bold;
            border-bottom: 1px solid #fff;
            pointer-events: none;
        }
    }
}
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    display: inline-block;
    width: 100px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
/deep/ .el-input__inner {
    border: none;
}
/deep/ .el-cascader-menu {
    height: 160px;
}
.languageBox {
    float: right;
    margin-right: 2%;
    width: 134px;
    margin-top: 0.4%;
}
.roleBox {
    // padding-top: 11px;
    position: relative;
    .roleLabel {
        width: 63px;
        background: #fff;
        position: absolute;
        right: 25px;
        top: 5px;
        z-index: 11;
        text-align: center;
        color: #f17e26;
        // background: red
    }
    .userName {
        position: absolute;
        width: 63px;
        height: 21px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-weight: normal;
        right: 25px;
        bottom: -6px;
        color: #606266;
        font-size: 14px;
        // background: red;
        pointer-events: none;
    }
}
</style>
