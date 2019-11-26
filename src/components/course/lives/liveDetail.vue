<template>
    <div class="liveMain">
        <div class="liveLeft">
            <ul class="liveInfo">
                <li>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="liveInfoData.title"
                        placement="top-start"
                    >
                        <h1 class="liveTitle">
                            {{ liveInfoData.title }}
                        </h1>
                    </el-tooltip>
                </li>
                <li>
                    <p
                        v-show="liveInfoData.status == 'In Progress'"
                        :class="{
                            green: liveInfoData.status == 'In Progress',
                            liveStatus: true
                        }"
                    >
                        <i class="iconfont icon-hebingxingzhuang" />
                        {{ liveInfoData.status }}
                    </p>
                    <p
                        v-show="liveInfoData.status == 'Not Started'"
                        :class="{
                            gray: liveInfoData.status == 'In Progress',
                            liveStatus: true
                        }"
                    >
                        <i class="iconfont icon-daojishi" />
                        {{ liveInfoData.status }}
                    </p>
                    <p
                        v-show="liveInfoData.status == 'Finished'"
                        :class="{
                            gray: liveInfoData.status == 'In Progress',
                            liveStatus: true
                        }"
                    >
                        <i class="iconfont icon-bofang" />
                        {{ liveInfoData.status }}
                    </p>
                </li>
                <li>
                    <span> Instructor：</span>
                    <a class="instructPic">
                        <img :src="instructorPic" />
                    </a>
                    <i class="instructName">{{ liveInfoData.instructor }}</i>
                </li>
                <li>
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                    >
                        <div v-if="liveInfoData.userCount">
                            {{ liveInfoData.userCount }}
                            <span v-if="liveInfoData.userCount > 1">
                                {{ $t("message.LIVE.users") }}
                            </span>
                            <span v-else>user</span>
                        </div>
                        <div v-else>
                            <ul>
                                <li
                                    v-for="(item,
                                    index) in liveInfoData.sectionList"
                                    :key="index"
                                >
                                    {{ item.sectionName }} &nbsp;
                                    {{ item.userCount }}
                                    <span v-if="item.userCount > 1">
                                        {{ $t("message.LIVE.users") }}
                                    </span>
                                    <span v-else>{{
                                        $t("message.LIVE.users")
                                    }}</span>
                                    &nbsp;&nbsp;&nbsp;
                                </li>
                            </ul>
                        </div>
                        <a
                            v-if="liveInfoData.userCount"
                            slot="reference"
                            class="instructSection"
                        >
                            {{ $t("message.LIVE.All_Sections") }}</a
                        >
                        <a v-else slot="reference" class="instructSection">
                            {{ sectionLen }} {{ $t("message.LIVE.section") }}</a
                        >
                    </el-popover>
                </li>
                <li>
                    <span> {{ $t("message.LIVE.startTime") }}：</span>
                    <i> {{ liveInfoData.startTime | formatDate }} </i>
                </li>
                <!-- <li v-if="liveInfoData.status == 'Finished'">
          <span> End Time: </span>
          <i> {{liveInfoData.endTime | formatDate }} </i>
        </li> -->
            </ul>
            <el-tabs
                v-model="activeTab"
                :class="{
                    onlyIntro:
                        liveInfoData.status != 'Finished' || roleType == 4,
                    tabBox: true
                }"
                @tab-click="tabClick"
            >
                <el-tab-pane :label="$t('message.LIVE.Introduction')" name="1">
                    <!--eslint-disable-->
                    <div
                        v-if="liveInfoData.description"
                        v-html="liveInfoData.description"
                    >
                        {{ intructDescription }}
                    </div>
                    <!--eslint-disable no-new-->
                    <div v-else>
                        {{ $t("message.LIVE.No_content") }}
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    v-if="liveInfoData.status == 'Finished' && roleType != 4"
                    :label="$t('message.LIVE.Participants')"
                    name="2"
                >
                    <div class="partTop">
                        <span> {{ $t("message.LIVE.List_User_joined") }} </span>
                        <span>
                            {{ $t("message.LIVE.Number_participant") }}:
                            {{ participateLen }}
                        </span>
                    </div>
                    <el-table
                        :data="participatData"
                        border
                        :header-cell-class-name="headerClass"
                    >
                        <el-table-column
                            prop="fullName"
                            :label="$t('message.LIVE.Name')"
                            align="center"
                        />
                        <el-table-column
                            prop="username"
                            :label="$t('message.LIVE.Login_ID')"
                            align="center"
                        />
                        <el-table-column
                            :label="$t('message.LIVE.Joined_time')"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.joinTime">
                                    {{ scope.row.joinTime | formatDate }}
                                </span>
                                <span v-else> - </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('message.LIVE.Length_time')"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.length">
                                    {{ scope.row.length | formateTime }}
                                </span>
                                <span v-else> - </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('message.Grade_Status')"
                            align="center"
                            width="120"
                        >
                            <template slot-scope="scope">
                                {{
                                    scope.row.status == 0
                                        ? $t("message.LIVE.Not_joined")
                                        : $t("message.LIVE.joined")
                                }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('message.LIVE.Revie_times')"
                            prop="reviewTimes"
                            align="center"
                            width="110"
                        />
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="liveRight">
            <!-- 教师端 -->
            <div v-show="roleType == 2">
                <!-- 已经结束的直播 -->
                <div v-if="liveInfoData.status == 'Finished'">
                    <el-button
                        v-if="liveInfoData.attendeeJoinUrlOfVod"
                        type="primary"
                        icon="iconfont icon-bofang"
                        class="liveBtn"
                        @click="playView"
                    >
                        &nbsp; {{ $t("message.LIVE.Playback") }}
                    </el-button>
                    <el-button
                        v-else
                        type="info"
                        plain
                        disabled
                        icon="iconfont icon-bofang"
                        class="liveBtn"
                    >
                        &nbsp; {{ $t("message.LIVE.Playback") }}
                    </el-button>
                </div>
                <!-- 未开始的直播 -->
                <div v-if="liveInfoData.status == 'Not Started'">
                    <el-button
                        v-if="userId == liveInfoData.instructorId"
                        type="primary"
                        icon="iconfont icon-jiaru"
                        class="liveBtn"
                        @click="joinLive"
                    >
                        &nbsp; {{ $t("message.LIVE.Join_live") }}
                    </el-button>
                    <el-button
                        type="primary"
                        icon="iconfont icon-view"
                        class="liveBtn"
                        @click="viewLive"
                    >
                        &nbsp; {{ $t("message.LIVE.View_live") }}
                    </el-button>
                    <el-button
                        icon="iconfont icon-edit"
                        class="liveBtn"
                        @click="toEditLive"
                    >
                        &nbsp; {{ $t("message.Edit") }}
                    </el-button>
                    <el-button
                        v-show="roleType == 2"
                        icon="iconfont icon-delete"
                        class="liveBtn"
                        @click="isDel = true"
                    >
                        &nbsp; {{ $t("message.Delete") }}
                    </el-button>
                </div>
                <!-- 正在进行的直播 -->
                <div v-if="liveInfoData.status == 'In Progress'">
                    <el-button
                        v-if="userId == liveInfoData.instructorId"
                        type="primary"
                        icon="iconfont icon-jiaru"
                        class="liveBtn"
                        @click="joinLive"
                    >
                        &nbsp; {{ $t("message.LIVE.Join_live") }}
                    </el-button>
                    <el-button
                        type="primary"
                        icon="iconfont icon-view"
                        class="liveBtn"
                        @click="viewLive"
                    >
                        &nbsp; {{ $t("message.LIVE.View_live") }}
                    </el-button>
                </div>
            </div>
            <!-- 学生端 -->
            <div v-show="roleType == 4">
                <!-- 已经结束的直播 -->
                <div v-if="liveInfoData.status == 'Finished'">
                    <el-button
                        v-if="liveInfoData.attendeeJoinUrlOfVod"
                        type="primary"
                        icon="iconfont icon-bofang"
                        class="liveBtn"
                        @click="playView"
                    >
                        &nbsp; {{ $t("message.LIVE.Playback") }}
                    </el-button>
                    <el-button
                        v-else
                        type="info"
                        plain
                        disabled
                        icon="iconfont icon-bofang"
                        class="liveBtn"
                    >
                        &nbsp; {{ $t("message.LIVE.Playback") }}
                    </el-button>
                </div>
                <!-- 未开始的直播 -->
                <div v-if="liveInfoData.status == 'Not Started'">
                    <el-button type="info" plain disabled class="liveBtn">
                        {{ $t("message.LIVE.Not_started") }}
                    </el-button>
                </div>
                <!-- 正在进行的直播 -->
                <div v-if="liveInfoData.status == 'In Progress'">
                    <el-button
                        type="primary"
                        class="liveBtn"
                        icon="iconfont icon-jiaru"
                        @click="viewLive"
                    >
                        {{ $t("message.LIVE.Join_live") }}
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 删除直播的弹窗 -->
        <el-dialog
            :title="$t('message.LIVE.confirm_delete')"
            :visible.sync="isDel"
            width="30%"
        >
            <span> {{ $t("message.LIVE.Sure_del_live") }} </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDel = false">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button type="primary" @click="delLive">
                    {{ $t("message.Common_delete") }}</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLiveById, delList, queryLive } from "@/api/liveRequst";
import defaultPic from "../../../../static/images/touxiang.png";

export default {
    filters: {
        formatDate(val) {
            if (typeof val === "undefined" || val === "") {
                return "";
            }
            let res = "";
            const nowDate = new Date();
            const curYear = nowDate.getFullYear();
            const curMontn =
                nowDate.getMonth() + 1 > 9
                    ? nowDate.getMonth() + 1
                    : `0${nowDate.getMonth() + 1}`;
            const curDay =
                nowDate.getDate() > 9
                    ? nowDate.getDate()
                    : `0${nowDate.getDate()}`;
            const date = new Date(val);
            const year = date.getFullYear();
            const month =
                date.getMonth() + 1 > 9
                    ? date.getMonth() + 1
                    : `0${date.getMonth() + 1}`;
            const day =
                date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
            const hours =
                date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
            const minutes =
                date.getMinutes() > 9
                    ? date.getMinutes()
                    : `0${date.getMinutes()}`;
            const seconds =
                date.getSeconds() > 9
                    ? date.getSeconds()
                    : `0${date.getSeconds()}`;
            if (curYear === year && curMontn === month && curDay === day) {
                res = `${hours}:${minutes}:${seconds}`;
            } else {
                res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            }
            return res;
        },
        formateTime(val) {
            const h =
                parseInt(val / 3600, 10) === 0
                    ? ""
                    : `${parseInt(val / 3600, 10)}h`;
            const b = val % 3600;
            const m =
                parseInt(b / 60, 10) === 0 ? "" : `${parseInt(b / 60, 10)}m`;
            const s = b % 60 === 0 ? "" : `${b % 60}s`;
            const res = `${h} ${m} ${s}`;
            return res;
        }
    },
    data() {
        return {
            liveId: "",
            liveInfoData: {},
            instructorPic: "",
            activeTab: "1",
            intructDescription: "",
            isDel: false,
            courseId: "",
            sectionLen: "",
            innerLiveId: "",
            participateLen: "2",
            participatData: [],
            isDescription: false,
            vodId: ""
        };
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type; // 2-老师 4-学生
        },
        userId() {
            return this.userInfoData.id;
        }
    },
    created() {
        this.liveId = this.$route.query.liveId;
        this.courseId = this.$route.query.courseId;
        this.getLiveById();
    },
    methods: {
        headerClass() {
            return "headerRow";
        },
        transfHtml(str) {
            const dd = str.replace(/<\/?.+?>/g, "");
            let dds = dd;
            dds = dds.replace(/&nbsp;/, " ");
            return dds;
        },
        tabClick(tab) {
            console.log("tabClick", tab);
            if (Number(tab.name) === 2) {
                this.liveQuery();
            }
        },
        async getLiveById() {
            // 根据ID获取直播信息
            const params = { data: Number(this.liveId) };
            const res = await getLiveById(params);
            if (Number(res.data.code) === 200) {
                this.liveInfoData = res.data.entity;
                this.instructorPic = this.liveInfoData.instructorUrl
                    ? `${process.env.FILE_PRE_SERVER}${this.liveInfoData.instructorUrl}`
                    : defaultPic;
                this.intructDescription = this.transfHtml(
                    this.liveInfoData.description
                );
                this.isDescription = this.intructDescription.trim() !== "";
                this.sectionLen = this.liveInfoData.userCount
                    ? ""
                    : this.liveInfoData.sectionList.length;
                this.innerLiveId = this.liveInfoData.liveId;
                this.vodId = this.liveInfoData.vodId
                    ? this.liveInfoData.vodId
                    : "";
                // vodId
            }
        },
        async delLive() {
            // 删除直播
            const params = { id: Number(this.liveId) };
            const res = await delList(params);
            if (Number(res.data.code) === 200) {
                this.isDel = false;
                this.$message({
                    message: this.$t("message.LIVE.del_live_success"),
                    type: "success"
                });
                this.$router.push({
                    path: "liveList",
                    query: { courseId: this.courseId }
                });
            }
        },
        joinLive() {
            // 加入直播
            const url = this.liveInfoData.panelistJoinUrl;
            const tempToken = this.liveInfoData.organizerToken;
            const tempNickName = this.liveInfoData.nickname;
            const lastUrl = `${url}?&nickName=${tempNickName}&token=${tempToken}`;
            window.open(lastUrl, "_blank");
        },
        viewLive() {
            // 观看直播
            const url = this.liveInfoData.attendeeJoinUrl;
            const tempNickName = this.liveInfoData.nickname;
            const lastUrl = `${url}&nickName=${tempNickName}`;
            window.open(lastUrl, "_blank");
        },
        toEditLive() {
            // 编辑直播
            this.$router.push({
                path: "liveEdit",
                query: {
                    type: "edit",
                    courseId: this.courseId,
                    liveId: this.liveInfoData.id
                }
            });
        },
        playView() {
            // 观看回放
            const tempToken = this.liveInfoData.password;
            // const tempNickName = this.liveInfoData.nickname;
            const lastUrl = `${this.liveInfoData.attendeeJoinUrlOfVod}?token=${tempToken}&uid=${this.userId}`;
            window.open(lastUrl, "_blank");
        },
        async liveQuery() {
            const params = {
                courseId: this.courseId,
                liveId: this.liveId,
                innerLiveId: this.innerLiveId
            };
            let vodObj = {};
            if (this.vodId !== "") {
                vodObj = { innerVodId: this.vodId };
            } else {
                vodObj = {};
            }
            const initParams = Object.assign(params, vodObj);
            const res = await queryLive(initParams);
            if (Number(res.data.code) === 200) {
                this.participatData = res.data.entity;
                const joinList = this.participatData.filter(
                    el => el.status === 1
                );
                this.participateLen = joinList.length;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.headerRow {
    background: #000;
}
.green {
    color: #55c21f;
}
.grey {
    color: #333;
}
.liveMain {
    display: flex;
    justify-content: space-between;
    .liveLeft {
        width: 74%;
        .tabBox {
            margin-top: 20px;
        }
        .liveInfo {
            li {
                margin-top: 20px;
                .liveTitle {
                    display: inline-block;
                    color: #333;
                    font-size: 20px;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                }
                .instructPic {
                    vertical-align: middle;
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid #bdc3d5;
                    overflow: hidden;
                    img {
                        display: inline-block;
                        width: 100%;
                    }
                }
                .instructName {
                    color: #666;
                    font-size: 14px;
                    display: inline-block;
                    margin-left: 10px;
                    line-height: 16px;
                }
                .instructSection {
                    color: #0e38b1;
                    font-size: 14px;
                    text-decoration: underline;
                }
                .liveStatus {
                }
            }
        }
    }
    .liveRight {
        width: 24%;
        .liveBtn {
            width: 200px;
            height: 40px;
            display: block;
            margin-top: 20px;
            margin-left: 0;
        }
    }
}
.partTop {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    // border: 1px solid red
}
.onlyIntro /deep/ .el-tabs__item.is-active {
    color: #333;
}
.onlyIntro /deep/ .el-tabs__active-bar {
    display: none;
}
.onlyIntro /deep/ .el-tabs__nav-wrap::after {
    background: none;
}
</style>
