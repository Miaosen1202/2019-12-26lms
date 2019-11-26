<template>
    <div>
        <!--eslint-disable-->
        <div class="people_detail">
            <p class="people_detail_frist">
                <span
                    ><i>{{ $t("message.admin_people") }}</i
                    ><i class="iconfont icon-jiantou" /><i>{{
                        user.username
                    }}</i></span
                >
            </p>
            <p>
                <b>{{ $t("message.Name_and_Email") }}</b>
            </p>
            <div class="detail_pro">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-row>
                                <el-col :span="6">
                                    {{ $t("message.Full_Name") }}:
                                </el-col>
                                <el-col :span="18">
                                    {{ user.fullName }}
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    {{ $t("message.admin_nickname") }}:
                                </el-col>
                                <el-col :span="18">
                                    {{ user.nickname }}
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    {{ $t("message.Profile_picture") }}:
                                </el-col>
                                <el-col :span="18">
                                    <img
                                        :src="setPicUrl(user.avatarFileId)"
                                        alt="image"
                                        width="20"
                                        height="20"
                                        class="head_pic"
                                    />
                                    <el-button type="text" @click="removePic">
                                        <!-- {{$t('message.Common_delete')}} -->
                                        {{
                                            $t("message.Remove_avatar_picture")
                                        }}
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    {{ $t("message.admin_email") }}:
                                </el-col>
                                <el-col :span="18">
                                    {{ user.email }}
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <p class="detail_tit">
                <b>{{ $t("message.Login_Information") }}</b>
            </p>
            <div class="detail_pro">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-row>
                                <el-col :span="6">
                                    {{ $t("message.admin_loginId") }}:
                                </el-col>
                                <el-col :span="18">
                                    {{ user.fullName }}
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    {{ $t("message.Last_request") }}：
                                </el-col>
                                <el-col :span="18">
                                    {{ formatterDate(user.lastLoginTime) }}
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-button
                                        type="text"
                                        @click="restPassword"
                                    >
                                        {{ $t("message.Reset_password") }}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <p class="detail_tit">
                <b>{{ $t("message.Enrollments") }}</b>
            </p>
            <div class="detail_pro">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-row>
                                <el-col :span="6">
                                    <b
                                        >{{ $t("message.Courses") }}({{
                                            user.courses.length
                                        }})</b
                                    >
                                </el-col>
                            </el-row>
                            <el-row
                                v-for="(item, index) in user.courses"
                                :key="index + 1"
                            >
                                <el-col :span="6" style="word-break: break-all">
                                    <span>{{ item.name }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span
                                        :style="{
                                            color:
                                                item.isActive == 1
                                                    ? '#0e38b1'
                                                    : '#f17e26'
                                        }"
                                    >
                                        {{
                                            item.isActive == 1
                                                ? "Active"
                                                : "inActive"
                                        }}
                                        &nbsp;&nbsp;&nbsp;
                                    </span>
                                    <span
                                        v-for="(role, index) in item.roles"
                                        :key="index"
                                    >
                                        <span v-if="role.roleId == 2">
                                            {{
                                                $t("message.Teacher")
                                            }}&nbsp;&nbsp;
                                        </span>
                                        <span v-if="role.roleId == 3">
                                            {{ $t("message.Ta") }}&nbsp;&nbsp;
                                        </span>
                                        <span v-if="role.roleId == 4">
                                            {{
                                                $t("message.Student")
                                            }}&nbsp;&nbsp;
                                        </span>
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <b
                                        >{{ $t("message.Admin") }}({{
                                            orgs.length
                                        }})</b
                                    >
                                </el-col>
                            </el-row>
                            <el-row v-for="(item, index) in orgs" :key="index">
                                <el-col :span="6">
                                    <span>{{ item.name }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>{{
                                        $t("message.Account_Admin")
                                    }}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
import utilMethods from "@/utils/utilMethods";
/*eslint-disable*/
export default {
    data() {
        return {
            userId: this.$route.query.userId,
            orgs: [],
            user: {
                courses: [
                    {
                        roles: []
                    }
                ]
            }
        };
    },
    mounted() {
        this.loadData();
        this.loadOrg();
    },
    methods: {
        formatterDate(val) {
            if (val) {
                return utilMethods.formatDate(val);
            }
        },
        restPassword() {
            this.$confirm(this.$t("message.ADMIN.restPasswordTip"), "", {
                confirmButtonText: this.$t("message.Common_confirm"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/adminUser/restPassword/edit`,
                            { id: this.userId }
                        )
                        .then(res => {
                            if (res.data.code == 200) {
                                // this.loadData();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        loadData() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/adminUser/get?data=${this.userId}`
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.user = res.data.entity;
                        console.log("user", this.user.courses[4]);
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        loadOrg() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/adminUserOrg/list?userId=${this.userId}`
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.orgs = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        setPicUrl(url) {
            return utilMethods.defaultAvatar(url);
        },
        removePic() {
            this.$confirm(this.$t("message.avatar_picture"), "", {
                confirmButtonText: this.$t("message.Common_confirm"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/adminUser/removeAvatar/edit`,
                            { id: this.userId }
                        )
                        .then(res => {
                            if (res.data.code == 200) {
                                this.loadData();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        }
    }
};
/*eslint-disable*/
</script>

<style scoped>
.people_detail {
    position: relative;
}

.message_right {
    position: absolute;
    right: 30px;
    top: 0;
}

.detail_pro {
    border: 1px dashed #ccc;
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
}

.detail_pro li {
    line-height: 30px;
}

.detail_pro li span {
    display: inline-block;
    width: 200px;
}

.icon-yonghutouxiang {
    margin-right: 10px;
}

.detail_pro_bule {
    color: #0d329f;
}

.people_detail_frist {
    margin-bottom: 25px;
}

.people_detail_two {
    margin-bottom: 10px;
}

.detail_tit {
    line-height: 50px;
}
.head_pic {
    vertical-align: middle;
}
</style>
