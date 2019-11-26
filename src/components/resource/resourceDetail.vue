<template>
    <div>
        <div class="detail-container">
            <div class="detail-left">
                <div class="left-top">
                    <div
                        v-if="
                            resType === 'Duplicated' &&
                                hasNewNote === 1 &&
                                roleType === 2 &&
                                isIgnore
                        "
                        class="resource-prompt"
                    >
                        This resource has been updated，update or
                        <a class="prompLabel" @click="igPromp">No.</a>
                    </div>
                    <div class="left-operate">
                        <a @click="goBack">
                            <span class="operate-text">
                                {{ $t("message.RESOURCE.Back") }}
                            </span>
                            <i
                                class="iconfont icon-ai207"
                                style="font-size: 24px; vertical-align:top; color: #666"
                            />
                        </a>
                    </div>
                    <div class="left-title">
                        <p class="type-title">
                            <!-- 作业-->
                            <span v-if="Number(originType) === 1">
                                <i class="iconfont icon-edit1" />
                                {{ $t("message.assignment") }}
                            </span>
                            <!-- 测验-->
                            <span v-if="Number(originType) === 2">
                                <i class="iconfont icon-liaotian" />
                                {{ $t("message.discussion") }}
                            </span>

                            <!-- 讨论-->
                            <span v-if="Number(originType) === 3">
                                <i class="iconfont icon--xiugaineirong " />
                                {{ $t("message.Grade_Quize") }}
                            </span>
                            <!-- 课程-->
                            <span v-if="Number(originType) === 15">
                                <i class="iconfont icon-shu" />
                                {{ $t("message.Grade_Course") }}
                            </span>
                        </p>
                        <h1 class="type-box">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="dataDetail.name"
                                placement="top"
                            >
                                <span class="type-name">{{
                                    dataDetail.name
                                }}</span>
                            </el-tooltip>

                            <span
                                v-if="canOperate && roleType === 2"
                                class="type-btns"
                            >
                                <el-button style="height: 40px" @click="toEdit">
                                    <i class="iconfont icon-edit" /> Edit
                                </el-button>
                                <el-button
                                    style="height: 40px"
                                    @click="dialogVisible = true"
                                >
                                    <i class="iconfont icon-shanchu" /> Remove
                                </el-button>
                            </span>
                            <span v-if="roleType === 1" class="type-btns">
                                <el-button style="height: 40px" @click="toEdit">
                                    <i class="iconfont icon-edit" /> Edit
                                </el-button>
                                <el-button
                                    style="height: 40px"
                                    @click="dialogVisible = true"
                                >
                                    <i class="iconfont icon-shanchu" /> Remove
                                </el-button>
                            </span>
                        </h1>
                    </div>
                </div>
                <div class="left-main" style="overflow: hidden">
                    <assignmentDetail
                        v-if="Number(originType) === 1 && flag"
                        :sonvalue="dataDetail"
                    />
                    <discussDetail
                        v-if="Number(originType) === 2 && flag"
                        :sonvalue="dataDetail"
                    />
                    <quizeDetail
                        v-if="Number(originType) === 3 && flag"
                        :sonvalue="dataDetail"
                    />
                    <resCourseDetail
                        v-if="Number(originType) === 15 && flag"
                        :sonvalue="dataDetail"
                    />
                </div>
            </div>
            <div class="detail-right">
                <div class="right-top">
                    <a>
                        <i
                            class="iconfont icon-duplicated"
                            style="font-size: 18px; color: #666"
                        />
                        {{ dataDetail.importCount }}
                    </a>
                    <a>
                        <i
                            class="iconfont icon-shoucang"
                            style="font-size: 18px; color: #F1D226FF"
                        />
                        {{ dataDetail.favoriteCount }}
                    </a>
                    <a class="liceImage">
                        <img :src="licenImgSrc" />
                    </a>
                </div>
                <div class="right-middle">
                    <p class="right-favorite">
                        <a style="cursor: pointer" @click="changeResFavorite">
                            <span style="color: #666">
                                {{ $t("message.RESOURCE.Add_Favorites") }}
                            </span>
                            <i
                                class="iconfont icon-shoucang"
                                style="font-size: 18px"
                                :class="{
                                    'favorite-active': favoriteActive,
                                    'favorite-noraml': !favoriteActive
                                }"
                            />
                        </a>
                    </p>
                    <a class="right-img">
                        <img :src="detailImg" />
                    </a>
                    <el-button
                        v-if="roleType === 2"
                        type="primary"
                        style="width: 100%; margin: 20px 0"
                        @click="goImportUrl"
                    >
                        <i
                            class="iconfont icon-duplicated"
                            style="font-size: 18px; color: #fff; vertical-align: middle"
                        />
                        <span v-if="dataDetail.operation === 2">{{
                            $t("message.Duplicate_Update")
                        }}</span>
                        <span v-if="dataDetail.operation === 1">
                            {{ $t("message.Duplicate") }}
                        </span>
                    </el-button>
                </div>
                <el-tabs v-model="activeTab" @tab-click="handleClick">
                    <el-tab-pane label="Basic Info" name="1">
                        <ul class="infoBox">
                            <li>
                                <h1 class="info-title">
                                    {{ $t("message.RESOURCE.Author") }}
                                </h1>
                                <p class="info-text">
                                    {{ dataDetail.author }}
                                </p>
                            </li>
                            <li>
                                <h1 class="info-title">
                                    {{ $t("message.RESOURCE.Institute") }}
                                </h1>
                                <p class="info-text">
                                    {{ dataDetail.institution }}
                                </p>
                            </li>
                            <li>
                                <h1 class="info-title">
                                    {{ $t("message.RESOURCE.Grades_Level") }}
                                </h1>
                                <p class="info-text">
                                    {{ dataDetail.gradeStart }} -
                                    {{ dataDetail.gradeEnd }}
                                </p>
                            </li>
                            <li>
                                <h1 class="info-title">
                                    {{ $t("message.Description") }}
                                </h1>
                                <p
                                    class="info-text"
                                    style="word-wrap: break-word"
                                >
                                    {{ dataDetail.description }}
                                </p>
                            </li>
                            <li>
                                <h1 class="info-title">
                                    {{ $t("message.RESOURCE.Tags") }}
                                </h1>
                                <ul class="tag-box">
                                    <li
                                        v-for="(val, index) in dataDetail.tags"
                                        :key="index"
                                    >
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="val"
                                            placement="top"
                                        >
                                            <a class="tag-item"> {{ val }} </a>
                                        </el-tooltip>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h1 class="info-title">
                                    {{ $t("message.RESOURCE.Share_domain") }}
                                </h1>
                                <p class="info-text">
                                    {{ curLicence }}
                                </p>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="Version" name="2">
                        <ul v-if="versionData.length !== 0" class="versionBox">
                            <li
                                v-for="(item, index) in versionData"
                                :key="index"
                            >
                                <div class="versionTitle">
                                    <h1 class="titleLeft">
                                        {{ $t("message.RESOURCE.Updated") }}
                                    </h1>
                                    <span class="titleRight">
                                        {{ item.version | formDate }}
                                    </span>
                                </div>
                                <div class="versionText">
                                    {{ item.description }}
                                </div>
                            </li>
                        </ul>
                        <div v-else class="versionBox">
                            <p class="empty-text">
                                {{ $t("message.RESOURCE.No_version_info") }}
                            </p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span slot="title" style="color: #333; font-weight: bold">
                {{ $t("message.RESOURCE.Remove_Confirmation") }}
            </span>
            <span>{{ $t("message.RESOURCE.Sure_remove_resource") }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">No</el-button>
                <el-button type="primary" @click="toDel">{{
                    $t("message.Yes")
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import utilMethods from "@/utils/utilMethods";
import { formatDate } from "@/utils/date";
import {
    getResDetail,
    addResFavorite,
    delFavorite,
    delResource,
    getVersionList,
    versionIgnore
} from "@/api/resourceRequst";
import discussDetail from "./resComponents/resDiscussDetail.vue";
import quizeDetail from "./resComponents/resQuizeDetail.vue";
import assignmentDetail from "./resComponents/resAssignmentDetail.vue";
import resCourseDetail from "./resComponents/resCourseDetail.vue";

export default {
    components: {
        discussDetail,
        quizeDetail,
        assignmentDetail,
        resCourseDetail
    },
    filters: {
        formDate(val) {
            if (val) {
                const tempVal = Number(val);
                const tempDate = new Date(tempVal);
                return formatDate(tempDate, "yyyy-MM-dd hh:mm:ss");
            }
            return "";
        }
    },
    data() {
        return {
            hasNewVersion: "",
            baseUrl: process.env.FILE_PRE_SERVER,
            licenceList: utilMethods.licenceList,
            favoriteActive: false,
            activeTab: "1",
            originType: 1,
            resId: "",
            flag: false,
            dataDetail: { licence: "" },
            curLicence: "",
            licenImgSrc: "",
            detailImg: "",
            versionData: [],
            canOperate: false,
            resType: "",
            hasNewNote: "",
            isIgnore: true,
            dialogVisible: false,
            timer: null
        };
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        userId() {
            return this.userInfoData.id;
        },
        roleType() {
            return this.userInfoData.type; // 1-管理员 2-老师 4-学生
        }
    },
    created() {
        this.originType = this.$route.query.originType;
        this.resId = this.$route.query.originId;
        this.hasNewVersion = this.$route.query.hasNewVersion;
        this.resType = this.$route.query.type;
        this.getResDetail();
    },
    methods: {
        async getResDetail() {
            this.flag = false;
            const params = { data: String(this.resId) };
            const res = await getResDetail(params);
            if (Number(res.data.code) === 200) {
                this.dataDetail = res.data.entity;
                // console.log('dataDetail', this.dataDetail)
                this.canOperate =
                    Number(this.dataDetail.authorId) === Number(this.userId);
                const val = this.licenceList.find(
                    el => Number(el.id) === Number(this.dataDetail.licence)
                );
                this.curLicence = val.name;
                this.licenImgSrc = require(`../../assets/images/${val.image}`);
                this.favoriteActive = this.dataDetail.isFavorite;
                this.detailImg = this.baseUrl + this.dataDetail.thumbnailUrl;
                this.flag = true;
                this.hasNewNote = this.dataDetail.hasNewNote;
            }
        },
        changeResFavorite() {
            const _this = this;
            window.clearTimeout(_this.timer);
            _this.timer = setTimeout(_this.modifyFav, 1000);
        },
        async modifyFav() {
            if (!this.favoriteActive) {
                const params = { resourceId: Number(this.resId) };
                const res = await addResFavorite(params);
                if (Number(res.data.code) === 200) {
                    this.favoriteActive = true;
                    this.dataDetail.favoriteCount += 1;
                }
            } else {
                const tempIds = [];
                tempIds.push(Number(this.resId));
                const res = await delFavorite(tempIds);
                if (Number(res.data.code) === 200) {
                    this.favoriteActive = false;
                    this.dataDetail.favoriteCount -= 1;
                }
            }
        },

        toEdit() {
            if (this.roleType === 2) {
                this.$router.push({
                    path: "/homePage/resourceEdit",
                    query: {
                        originId: this.dataDetail.id,
                        originType: this.originType,
                        type: this.resType
                    }
                });
            } else if (this.roleType === 1) {
                this.$router.push({
                    path: "/adminHomePage/adminResource/adminResEdit",
                    query: {
                        originId: this.dataDetail.id,
                        originType: this.originType
                    }
                });
            }
        },

        handleClose() {
            this.dialogVisible = false;
        },
        async toDel() {
            const tempId = this.resId;
            const tempIds = [];
            tempIds.push(Number(tempId));
            const res = await delResource(tempIds);
            if (Number(res.data.code) === 200) {
                this.$message.success("delete success");
                this.dialogVisible = false;
                if (this.roleType === 2) {
                    // 角色为教师
                    this.$router.push({
                        path: "/homePage/resourceMain/resourceList",
                        query: {
                            type: this.resType
                        }
                    });
                } else if (this.roleType === 1) {
                    this.$router.push({
                        path: "/adminHomePage/adminResource/adminRescourseList"
                    });
                }
            }
        },
        goBack() {
            if (this.roleType === 2) {
                // 角色为教师
                this.$router.push({
                    path: "/homePage/resourceMain/resourceList",
                    query: {
                        type: this.resType
                    }
                });
            } else if (this.roleType === 1) {
                this.$router.push({
                    path: "/adminHomePage/adminResource/adminRescourseList"
                });
            }
        },
        async handleClick(tab) {
            if (Number(tab.name) === 2) {
                const params = { data: Number(this.resId) };
                const res = await getVersionList(params);
                if (Number(res.data.code) === 200) {
                    this.versionData = res.data.entity;
                }
            }
        },
        goImportUrl() {
            this.$router.push({
                path: "/homePage/resImportUrl",
                query: {
                    originId: this.dataDetail.id,
                    originType: this.dataDetail.originType,
                    hasCheck: this.dataDetail.hasCheck
                    // hasNewVersion: this.dataDetail.hasNewNote,
                }
            });
        },
        async igPromp() {
            const params = { resourceId: this.resId };
            const res = await versionIgnore(params);
            if (Number(res.data.code) === 200) {
                this.$message.success(
                    this.$t("message.RESOURCE.Ignore_success")
                );
                this.isIgnore = false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import "./resourceList.less";
/deep/ .el-tabs__item {
    color: #999 !important;
}
/deep/ .el-tabs__item.is-active {
    color: #0e38b1 !important;
    font-weight: bold;
}
/deep/ .el-tabs__nav-wrap::after {
    height: 1px !important;
}
/deep/ .el-tabs__active-bar {
    height: 3px !important;
}
</style>
