<template>
    <!--eslint-disable-->
    <div>
        <el-row>
            <el-col :span="10">
                <div style="padding: 14px;">
                    <h2>{{ $t("message.Group_Members") }}</h2>
                    <div class="stu_bottom clearfix">
                        <div
                            v-for="user in groupUsers"
                            class="user-item clearfix"
                        >
                            <a href="javascript:;" class="avatar"
                                ><img :src="getAvatar(user.avatarFileUrl)"
                            /></a>

                            <a
                                href="javascript:;"
                                @click="gotoUserDetail(user)"
                                >{{ user.username }}</a
                            >
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div style="padding: 14px;">
                    <h2>{{ $t("message.Teachers_TAs") }}</h2>
                    <div class="stu_bottom clearfix">
                        <div
                            v-for="user in courseTeacherAndTaList"
                            class="user-item"
                        >
                            <a class="avatar"
                                ><img :src="getAvatar(user.avatarFileUrl)"
                            /></a>

                            <a
                                href="javascript:;"
                                @click="gotoUserDetail(user)"
                                >{{ user.username }}</a
                            >
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- User Profile -->
        <div class="personnel-dialog">
            <el-dialog
                v-show="userProfileDialog"
                class="personal-profile-dialog"
                :title="$t('message.User_Profile')"
                :visible.sync="userProfileDialog"
                width="50%"
            >
                <div style="overflow: hidden;">
                    <div class="profileLeft">
                        <div>
                            <img
                                v-if="true"
                                :src="
                                    getAbsolutePath(
                                        userSetting.avatarFileId,
                                        200,
                                        70
                                    )
                                "
                                class="avatar"
                            />
                        </div>
                        <div class="name">
                            {{ userSetting.nickname }}
                        </div>
                        <span>{{ userSetting.title }}</span>
                    </div>
                    <div class="profileRight">
                        <div class="displayMaterials">
                            <div class="show">
                                <h3>Contact</h3>
                                <p>
                                    {{ $t("message.Phone_Number") }} &nbsp;{{
                                        userSetting.phone
                                            ? userSetting.phone
                                            : $t(
                                                  "message.UserSetting_no_contact_tip"
                                              )
                                    }}
                                </p>
                                <p>
                                    {{ $t("message.Email") }} &nbsp;{{
                                        userSetting.email
                                            ? userSetting.email
                                            : $t(
                                                  "message.UserSetting_no_contact_tip"
                                              )
                                    }}
                                </p>
                            </div>
                            <div class="show">
                                <h3>{{ $t("message.Biography") }}</h3>
                                <p>
                                    {{
                                        userSetting.description
                                            ? userSetting.description
                                            : $t(
                                                  "message.UserSetting_no_description_tip"
                                              )
                                    }}
                                </p>
                            </div>
                            <div class="show">
                                <h3>Links</h3>
                                <div
                                    v-if="
                                        userSetting.links &&
                                            userSetting.links.length == 0
                                    "
                                >
                                    <p>
                                        {{
                                            $t(
                                                "message.UserSetting_no_links_tip"
                                            )
                                        }}
                                    </p>
                                </div>
                                <div v-else>
                                    <div
                                        v-for="(link,
                                        index) in userSetting.links"
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
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import defaultAvatar from "../../../../static/images/touxiang.png";
import defaultHeads from "../../../../static/images/touxiang1.png";

export default {
    name: "GroupGroup",
    components: {},
    data() {
        return {
            courseId: this.$route.query.courseId,
            groupId: this.$route.query.groupId,
            defaultHeads,
            groupUsers: [],
            courseUsers: [],
            courseTeacherAndTaList: [],
            activeFlag: "",
            courseName: "",
            groupCourse: {},
            groupName: "",
            defaultAvatar,
            userProfileDialog: false,
            userSetting: {}
        };
    },
    created() {
        console.log(this.$route.query);
        this.loadGroupUsers();
        this.loadCourseUsers();
    },
    methods: {
        getAbsolutePath(relativePath, width, height) {
            if (relativePath == undefined) return defaultHeads;
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        gotoUserDetail(user) {
            this.userProfileDialog = true;

            this.getUserSetting(user.userId);
        },
        getAvatar(url) {
            if (url && url.length > 0) {
                return `${process.env.FILE_PRE_SERVER + url}?s=thumb&a=40x40`;
            }
            return defaultAvatar;
        },
        async getUserSetting(userId) {
            const res = await this.$getData(`/userSetting/get?data=${userId}`);
            if (res.data.code == 200) {
                this.userSetting = res.data.entity;
            } else {
                this.$message.error(res.data.message);
            }
        },
        async loadGroupUsers() {
            const result = await this.$getData("/studyGroupUser/list", {
                studyGroupId: this.groupId
            });
            if (result.data.code == 200) {
                this.groupUsers = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },

        async loadCourseUsers() {
            const result = await this.$getData("/course/user/query", {
                courseId: this.courseId
            });
            if (result.data.code == 200) {
                this.courseUsers = result.data.entity;
                for (let i = 0; i < this.courseUsers.length; i++) {
                    const u = this.courseUsers[i];
                    const sectionUsers = u.sectionUserDetailVos || [];
                    for (let j = 0; j < sectionUsers.length; j++) {
                        const su = sectionUsers[j];
                        // 用户在班级中存在教师(roleId=2)或助教(roleId=3)身份
                        if (su.roleId == 2 || su.roleId == 3) {
                            this.courseTeacherAndTaList.push(u);
                            break;
                        }
                    }
                }
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style lang="less" scoped>
@import "./studentGroup.less";
.stu_bottom {
    margin-top: 10px;
}
.user-item {
    line-height: 2em;
    font-size: 1.5em;
    padding-left: 1em;
}

.user-item > a {
    text-decoration: none;
    margin-top: 18px;
    display: inline-block;
    word-break: break-all;
    max-width: 86%;
}

.avatar {
    display: block;
    float: left;
    width: 36px;
    height: 36px;
    margin-top: 10px;
    margin-right: 12px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar img {
    display: block;
    width: 36px;
    height: 36px;
}

.profileLeft {
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    float: left;
    margin: 2% 4%;
    text-align: center;
}
.profileRight {
    width: 70%;
    height: 100%;
    display: inline-block;
    padding-top: 1%;
    float: left;
    margin-bottom: 10%;
    padding-left: 4%;
}
.show {
    padding-bottom: 1rem;
    padding-left: 2%;
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
    /* margin: 0 auto; */
    /* text-align: center; */
    margin-left: 287px;
    margin-top: 30px;
}
.add_touxiang {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 70px;
    margin-left: 28%;
    overflow: hidden;
}
.avatar-uploader {
    width: 100%;
    height: 100%;
}
</style>
