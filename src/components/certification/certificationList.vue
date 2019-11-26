<template>
    <div class="certification-list">
        <div v-if="noCertificationList" class="no-certification-list">
            <div>
                <span class="my-certification">
                    {{ $t("message.Certification.My_Certifications") }}
                </span>
                <div class="my-certification-select">
                    <span class="my-certification-select-span">
                        {{ $t("message.Certification.Sort_by") }}
                    </span>
                    <el-select
                        v-model="value"
                        :placeholder="$t('message.All')"
                        disabled="disabled"
                        style="width: 70%"
                    >
                        <el-option label="Name(a-z)" value="0" />
                        <el-option label="区域二" value="beijing" />
                    </el-select>
                </div>
            </div>
            <div class="certification-img">
                <img src="../../../static/images/diploma-3.png" />
                <p>
                    {{
                        $t(
                            "message.Certification.There_are_no_Certifications_to_show_in_this_section"
                        )
                    }}
                </p>
            </div>
        </div>
        <div
            v-if="haveCertificationList"
            class="have-certification-list no-certification-list"
        >
            <div>
                <span class="my-certification">
                    {{ $t("message.Certification.My_Certifications") }}
                </span>
                <div class="my-certification-select">
                    <span class="my-certification-select-span">
                        {{ $t("message.Certification.Sort_by") }}
                    </span>
                    <el-select
                        v-model="orderBy"
                        :placeholder="$t('message.Certification.Name_a_z')"
                        style="width: 70%"
                        @change="selectList"
                    >
                        <el-option
                            :label="$t('message.Certification.Name_a_z')"
                            value="0"
                        />
                        <el-option
                            :label="$t('message.Certification.Name_z_a')"
                            value="1"
                        />
                        <el-option
                            :label="$t('message.Certification.Data_Updated')"
                            value="2"
                        />
                    </el-select>
                </div>
            </div>
            <div v-loading="loading" class="certification-card-list">
                <div
                    v-for="(item, index) in certificationLearnerList"
                    :key="index"
                    class="certification-card"
                >
                    <el-card shadow="never">
                        <div
                            :class="
                                `${
                                    item.certStatus == 1
                                        ? 'certification-card-top'
                                        : ''
                                }
                                  ${
                                      item.certStatus == 0
                                          ? 'certification-card-top-unpublish'
                                          : ''
                                  }
                                  ${
                                      item.certStatus == 2
                                          ? 'certification-card-top-retired'
                                          : ''
                                  }`
                            "
                            :style="{
                                backgroundImage:
                                    'url(' +
                                    (item.fileUrl
                                        ? getAbsolutePath(item.fileUrl)
                                        : '') +
                                    ')',
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat'
                            }"
                        >
                            <span
                                v-if="item.issuer == 0"
                                class="certification-internal-out"
                                >{{
                                    $t("message.Certification.INTERNAL")
                                }}</span
                            >
                            <span
                                v-if="item.issuer == 1"
                                class="certification-internal-out"
                                >{{
                                    $t("message.Certification.External")
                                }}</span
                            >
                            <span v-if="item.status == 4" class="enroll">
                                <span class="enroll-span">
                                    {{
                                        $t(
                                            "message.Certification.Unenrolled_ok"
                                        )
                                    }}
                                </span>
                            </span>
                            <span v-if="item.status == 2" class="enroll">
                                <span class="enroll-span">
                                    {{ $t("message.Certification.Complete") }}
                                </span>
                            </span>
                            <p class="certification-card-name">
                                <span class="certification-card-name-span">{{
                                    item.name
                                }}</span>
                            </p>
                        </div>
                        <div class="certification-card-bottom">
                            <span class="certification-card-time">
                                {{ $t("message.Certification.Due") }}:
                                {{ item.dueTime | formatDate(s) }}
                            </span>
                            <span
                                class="certification-card-operation-view"
                                @click="gotodetail(item.certificationId)"
                            >
                                <span class="iconfont icon-view" />
                                <!--<span>View Certification</span>-->
                            </span>
                        </div>
                    </el-card>
                </div>
                <div style="text-align: center;width: 100%">
                    <span
                        v-if="hasMoreList"
                        style="cursor: pointer;font-size: 17px;
                        height: 60px;line-height: 60px;"
                        @click="certificationList()"
                        >{{ $t("message.Messages.Click_load_More") }} ...</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/date";

export default {
    name: "CertificationList",
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    data() {
        return {
            orderBy: "",
            noCertificationList: false,
            haveCertificationList: true,
            certificationLearnerList: [],
            pageSize: 20,
            pageIndex: 1,
            s: "",
            roleType: "",
            hasMoreList: false,
            loading: true,
            value: ""
        };
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    mounted() {
        this.pageIndex = 1;
        this.certificationList();
        this.routerpath();
    },
    methods: {
        gotodetail(certificationId) {
            if (Number(this.roleType) === 2) {
                this.$router.push({
                    path: "/homePage/certificationDetail",
                    query: { certificationId }
                });
            }
            if (Number(this.roleType) === 4) {
                this.$router.push({
                    path: "/studentHomePage/studentCertificationDetail",
                    query: { certificationId }
                });
            }
        },
        routerpath() {
            this.roleType = this.userInfoData.type;
            // console.log(this.roleType);
        },
        // 背景图片
        getAbsolutePath(relativePath, width, height) {
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        // 列表的请求接口
        arrayPush(tarArr, srcArr) {
            const tempTarArr = tarArr || [];
            const tempSrcArr = srcArr || [];
            for (let i = 0; i < tempSrcArr.length; i += 1) {
                tempTarArr.push(tempSrcArr[i]);
            }
            return tempTarArr;
        },
        async certificationList() {
            const params = {
                orderBy: this.orderBy,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            };
            const result = await this.$getData(
                "/certificationLearner/pageList",
                params,
                "get"
            );
            if (result.data.code === 200) {
                this.loading = false;
                let totalCount = 0;
                if (result.data.entity.list !== []) {
                    totalCount =
                        (this.pageIndex - 1) * this.pageSize +
                        result.data.entity.list.length;
                }
                if (totalCount < result.data.entity.total) {
                    this.hasMoreList = true;
                    this.pageIndex = this.pageIndex + 1;
                } else {
                    this.hasMoreList = false;
                }
                if (Number(this.pageIndex) === 1) {
                    this.certificationLearnerList = result.data.entity.list;
                } else {
                    this.arrayPush(
                        this.certificationLearnerList,
                        result.data.entity.list
                    );
                }
                if (
                    Number(this.certificationLearnerList.length) === 0 &&
                    this.orderBy === ""
                ) {
                    this.noCertificationList = true;
                    this.haveCertificationList = false;
                } else {
                    this.noCertificationList = false;
                    this.haveCertificationList = true;
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        selectList() {
            this.certificationLearnerList = [];
            this.pageIndex = 1;
            setTimeout(this.certificationList(), 800);
        }
    }
};
</script>

<style scoped lang="less">
.certification-list {
    .no-certification-list {
        .my-certification {
            font-size: 18px;
            font-family: Arial-BoldMT;
            font-weight: bold;
            color: #333333;
            height: 25px;
            display: inline-block;
            position: relative;
            top: 10px;
        }
        .my-certification-select {
            float: right;
            margin-right: 1.5%;
        }
        .my-certification-select-span {
            font-size: 14px;
            font-family: ArialMT;
            margin-right: 5px;
        }
        .certification-img {
            width: 100%;
            height: 100%;
            text-align: center;
            img {
                width: 240px;
                height: 203px;
                margin-top: 10%;
                margin-left: 20%;
            }
            p {
                font-size: 28px;
                font-family: ArialMT;
                color: rgba(102, 102, 102, 1);
                margin-top: 50px;
            }
        }
    }
    .have-certification-list {
        .certification-card-list {
            /deep/.el-card__body {
                padding: 0px;
            }
            margin-top: 15px;
            .certification-card {
                width: 17.2%;
                display: inline-block;
                margin-right: 2.65%;
                position: relative;
                margin-top: 20px;
                .certification-card-top {
                    height: 230px;
                    width: 100%;
                    background: rgba(218, 255, 200, 1);
                }
                .certification-internal-out {
                    font-size: 14px;
                    font-family: Arial-BoldMT;
                    font-weight: normal;
                    color: rgba(51, 51, 51, 1);
                    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
                    margin-top: 5px;
                    margin-left: 5px;
                }
                .certification-card-name {
                    position: relative;
                    top: 78%;
                    width: 100%;
                    height: 13%;
                    background: rgba(51, 51, 51, 0.5);
                    .certification-card-name-span {
                        font-size: 17px;
                        font-family: Arial-BoldMT;
                        font-weight: normal;
                        color: rgba(255, 255, 255, 1);
                        position: relative;
                        left: 5px;
                        top: 3px;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 97%;
                    }
                }
                .enroll {
                    width: 45%;
                    height: 24px;
                    display: inline-block;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 12px;
                    text-align: center;
                    line-height: 24px;
                    float: right;
                    margin-top: 2px;
                    span {
                        font-size: 14px;
                        font-family: ArialMT;
                        color: rgba(51, 51, 51, 1);
                    }
                }
                .certification-card-top-unpublish {
                    height: 230px;
                    width: 100%;
                    background: rgba(254, 202, 200, 1);
                }
                .certification-card-top-retired {
                    height: 230px;
                    width: 100%;
                    background: rgba(207, 207, 207, 1);
                }
                .certification-card-bottom {
                    width: 100%;
                    height: 40px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    border: 1px solid rgba(238, 238, 238, 1);
                    float: left;
                    line-height: 40px;
                    .certification-card-time {
                        font-size: 14px;
                        font-family: ArialMT;
                        color: rgba(153, 153, 153, 1);
                        margin-left: 3px;
                    }
                    .certification-card-operation-view {
                        font-size: 14px;
                        font-family: ArialMT;
                        color: rgba(14, 56, 177, 1);
                        float: right;
                        margin-right: 3px;
                        /*margin-top: -19px;*/
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
