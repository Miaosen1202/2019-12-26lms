<template>
    <div>
        <div class="topBpx">
            <div class="topLeft">
                <el-input
                    v-model="searchVal"
                    style="width: 200px"
                    class="searchInput"
                    size="medium"
                    :placeholder="$t('message.LIVE.search')"
                    prefix-icon="iconfont icon-sousuo"
                    :disabled="isActive"
                    @input="testInput"
                />
                <el-select
                    v-model="liveStatus"
                    :disabled="isActive"
                    @change="searchList"
                >
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-checkbox
                    v-model="isMyView"
                    style="margin-left: 10px"
                    @change="searchList"
                >
                    {{ $t("message.LIVE.viewMyLives") }}
                </el-checkbox>
            </div>
            <div class="topRight">
                <el-button
                    v-if="roleType == 2"
                    type="primary"
                    style="height: 40px"
                    @click="toAddLive"
                >
                    <i
                        class="iconfont icon-add"
                        style="vertical-align: middle"
                    />
                    {{ $t("message.LIVE.Live") }}
                </el-button>
            </div>
        </div>
        <div class="liveMain">
            <el-table
                v-show="liveList.length > 0"
                :data="liveList"
                :empty-text="$t('message.LIVE.no_data')"
                style="width: 100%"
            >
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <div
                            :class="{
                                green: scope.row.status == 'In Progress'
                            }"
                        >
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="scope.row.status"
                                placement="top-start"
                            >
                                <span>
                                    <i
                                        v-if="scope.row.status == 'In Progress'"
                                        class="iconfont icon-hebingxingzhuang"
                                    />
                                    <i
                                        v-if="scope.row.status == 'Not Started'"
                                        class="iconfont icon-daojishi"
                                    />
                                    <i
                                        v-if="scope.row.status == 'Finished'"
                                        class="iconfont icon-bofang"
                                    />
                                    {{ scope.row.startTime | formatDate }}
                                </span>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <a
                            :class="{
                                green: scope.row.status == 'In Progress'
                            }"
                            style="cursor: pointer; text-decoration:underline"
                            @click="toLiveDetail(scope.row)"
                        >
                            {{ scope.row.title }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <a class="headImg">
                            <img :src="scope.row.userUrl" />
                            <!-- {{scope.row.userUrl}}  -->
                        </a>
                        {{ scope.row.instructor }}
                    </template>
                </el-table-column>
                <el-table-column v-if="roleType == 2">
                    <template slot-scope="scope">
                        {{ scope.row.showIcon }}
                        <div v-show="scope.row.status == 'Not Started'">
                            <a
                                style="cursor: pointer"
                                @click="toEditLive(scope.row)"
                            >
                                <i class="iconfont icon-edit" />
                                {{ $t("message.Edit") }}
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a
                                style="cursor: pointer"
                                @click="toDelLive(scope.row.id)"
                            >
                                <i class="iconfont icon-delete" />
                                {{ $t("message.Delete") }}
                            </a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span v-if="roleType == 2">
                            <a
                                v-if="
                                    scope.row.status == 'Not Started' &&
                                        scope.row.instructorId == userId
                                "
                                :class="{
                                    blue: scope.row.status != 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="joinLive(scope.row)"
                            >
                                <i class="iconfont icon-jiaru" />
                                {{ $t("message.LIVE.Join") }}
                            </a>
                            <a
                                v-if="
                                    scope.row.status == 'Not Started' &&
                                        scope.row.instructorId != userId
                                "
                                :class="{
                                    blue: scope.row.status != 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="toLiveDetail(scope.row)"
                            >
                                <i class="iconfont icon-view" />
                                {{ $t("message.LIVE.View") }}
                            </a>

                            <a
                                v-if="
                                    scope.row.status == 'In Progress' &&
                                        scope.row.instructorId == userId
                                "
                                :class="{
                                    green: scope.row.status == 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="joinLive(scope.row)"
                            >
                                <i class="iconfont icon-jiaru" />
                                {{ $t("message.LIVE.Join") }}
                            </a>
                            <a
                                v-if="
                                    scope.row.status == 'In Progress' &&
                                        scope.row.instructorId != userId
                                "
                                :class="{
                                    green: scope.row.status == 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="toLiveDetail(scope.row)"
                            >
                                <i class="iconfont icon-view" />
                                {{ $t("message.LIVE.View") }}
                            </a>

                            <a
                                v-if="scope.row.status == 'Finished'"
                                :class="{
                                    blue: scope.row.status != 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="toLiveDetail(scope.row)"
                            >
                                <i class="iconfont icon-view" />
                                {{ $t("message.LIVE.View") }}
                            </a>
                        </span>
                        <span v-if="roleType == 4">
                            <a
                                v-if="scope.row.status == 'Not Started'"
                                :class="{
                                    blue: scope.row.status != 'In Progress'
                                }"
                                style="color:#666; font-size:14px; line-height:16px"
                            >
                                {{ $t("message.LIVE.Pls_wait") }}
                            </a>
                            <a
                                v-if="scope.row.status == 'In Progress'"
                                :class="{
                                    green: scope.row.status == 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="joinLive(scope.row)"
                            >
                                <i class="iconfont icon-jiaru" />
                                {{ $t("message.LIVE.Join") }}
                            </a>
                            <a
                                v-if="scope.row.status == 'Finished'"
                                :class="{
                                    blue: scope.row.status != 'In Progress'
                                }"
                                style="cursor:pointer"
                                @click="toLiveDetail(scope.row)"
                            >
                                <i class="iconfont icon-view" />
                                {{ $t("message.LIVE.View") }}
                            </a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="liveList.length == 0" class="loadBox">
                <a class="loadPic">
                    <img :src="loadImg" />
                </a>
                <p class="loadText">
                    {{ $t("message.LIVE.No_lives") }}
                </p>
                <p
                    v-show="roleType != 4"
                    style="text-align:center;margin-top:10px;"
                >
                    <a class="loadClick" @click="toAddLive">{{
                        $t("message.LIVE.Add_live")
                    }}</a>
                </p>
            </div>
        </div>
        <!-- 确认删除弹窗 -->
        <el-dialog
            :title="$t('message.LIVE.confirm_delete')"
            :visible.sync="isDel"
            width="30%"
        >
            <span>{{ $t("message.LIVE.Sure_del_live") }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDel = false">
                    {{ $t("message.LIVE.Cancel") }}
                </el-button>
                <el-button type="primary" @click="delLive">{{
                    $t("message.Delete")
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { liveList, delList } from "@/api/liveRequst";
import loadImg from "../../../../static/images/live_load.png";
import defaultPic from "../../../../static/images/touxiang.png";
/*eslint-disable*/
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
        }
    },
    data() {
        return {
            courseId: "",
            isMyView: false,
            searchVal: "",
            liveStatus: "All",
            statusList: [
                { value: "All", label: this.$t("message.LIVE.All") },
                {
                    value: "Not Started",
                    label: this.$t("message.LIVE.notStarted")
                },
                {
                    value: "In Progress",
                    label: this.$t("message.LIVE.inProgress")
                },
                { value: "Finished", label: this.$t("message.LIVE.Finished") }
            ],
            liveList: [],
            delId: "",
            isDel: false,
            loadImg,
            isActive: false
        };
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        instructor() {
            return this.isMyView ? this.userInfoData.id : "";
        },
        userId() {
            return this.userInfoData.id;
        },
        roleType() {
            return this.userInfoData.type; // 2-老师 4-学生
        }
        // isActive(){
        //   if(this.liveList.length>0){
        //     return false
        //   } else {
        //     return true
        //   }

        // }
    },
    created() {
        this.courseId = this.$route.query.courseId;
        this.getLiveList(this.courseId, "All");
    },
    methods: {
        testInput() {
            setTimeout(() => {
                this.searchList();
            }, 500);
        },
        toDelLive(id) {
            this.delId = id;
            this.isDel = true;
        },
        searchList() {
            // 搜索直播列表
            this.getLiveList(
                this.courseId,
                this.liveStatus,
                this.instructor,
                this.searchVal
            );
        },
        toAddLive() {
            // 新增直播
            this.$router.push({
                path: "liveEdit",
                query: { type: "add", courseId: this.courseId }
            });
        },
        toEditLive(liveData) {
            // 去编辑直播
            // console.log('liveData', liveData)
            this.$router.push({
                path: "liveEdit",
                query: {
                    type: "edit",
                    courseId: this.courseId,
                    liveId: liveData.id
                }
            });
        },
        toLiveDetail(data) {
            // 去直播详情页面
            // console.log('datawww', data)
            this.$router.push({
                path: "liveDetail",
                query: {
                    courseId: this.courseId,
                    liveId: data.id,
                    name: data.title
                }
            });
        },
        async getLiveList(courseId, status, instructor = "", title = "") {
            // 初始化获取直播列表
            let instrObj = {};
            let titleObj = {};
            const params = {
                courseId: Number(courseId),
                status
            };
            if (instructor !== "")
                instrObj = { instructor: Number(instructor) };
            if (title !== "") titleObj = { title };
            const lastParmas = Object.assign(params, instrObj, titleObj);
            const res = await liveList(lastParmas);
            if (Number(res.data.code) === 200) {
                this.liveList = res.data.entity;

                for (let i = 0; i < this.liveList.length; i += 1) {
                    // defaultPic
                    this.liveList[i].userUrl = this.liveList[i].instructorUrl
                        ? `${process.env.FILE_PRE_SERVER}${this.liveList[i].instructorUrl}`
                        : defaultPic;
                    this.liveList[i].status =
                        status === "All" ? this.liveList[i].status : status;
                }
                if (
                    status === "All" &&
                    instructor === "" &&
                    title === "" &&
                    this.liveList.length === 0
                ) {
                    this.isActive = true;
                } else {
                    this.isActive = false;
                }
            }
        },
        async delLive() {
            // 删除直播
            const params = { id: Number(this.delId) };
            const res = await delList(params);
            if (Number(res.data.code) === 200) {
                this.isDel = false;
                this.$message({
                    message: this.$t("message.LIVE.del_live_success"),
                    type: "success"
                });
                this.getLiveList(
                    this.courseId,
                    this.liveStatus,
                    this.instructor,
                    this.searchVal
                );
            }
        },
        joinLive(data) {
            // 加入直播
            // const userId = this.userInfoData.id;
            let lastUrl = "";
            if (Number(this.roleType) === 2) {
                const url = data.panelistJoinUrl;
                const tempToken = data.organizerToken;
                const tempNickName = data.nickname;
                lastUrl = `${url}?&nickName=${tempNickName}&token=${tempToken}`;
            } else if (Number(this.roleType) === 4) {
                const url = data.attendeeJoinUrl;
                const tempNickName = data.nickname;
                lastUrl = `${url}&nickName=${tempNickName}`;
            }
            window.open(lastUrl, "_blank");
        }
    }
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
.headImg {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
    img {
        display: inline-block;
        width: 100%;
    }
}
.topBpx {
    display: flex;
    justify-content: space-between;
    .topLeft {
    }
    .topRight {
    }
}
.green {
    color: #55c21f;
}
.blue {
    color: #0e38b1;
}
.loadBox {
    width: 100%;
    overflow: hidden;
    .loadText {
        margin-top: 80px;
        color: #666;
        font-size: 30px;
        line-height: 34px;
        text-align: center;
    }
    .loadClick {
        color: #0e38b1;
        font-size: 30px;
        line-height: 38px;
        text-decoration: underline;
        cursor: pointer;
    }
    .loadPic {
        width: 240px;
        margin: 50px auto 0 auto;
        display: block;
        img {
            display: inline-block;
            line-height: 1;
            width: 100%;
        }
    }
}
.searchInput /deep/ .el-input__inner {
    height: 40px !important;
    line-height: 40px !important;
}
</style>
