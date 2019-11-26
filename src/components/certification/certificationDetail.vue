<template>
    <!--eslint-disable-->
    <div class="certification-detail">
        <div class="certification-detail-top">
            <div class="certification-oper">
                <p
                    v-if="certificationDetails.issuer == 0"
                    class="certification-in-out"
                >
                    {{ $t("message.Certification.INTERNAL_Certification") }}
                </p>
                <p
                    v-if="certificationDetails.issuer == 1"
                    class="certification-in-out"
                >
                    {{ $t("message.Certification.External_Certification") }}
                </p>
                <el-tooltip
                    effect="dark"
                    placement="top"
                    :content="certificationDetails.name"
                >
                    <p class="certification-name">
                        {{ certificationDetails.name }}
                    </p>
                </el-tooltip>
                <p
                    v-if="certificationDetails.status == 3"
                    class="certification-status"
                >
                    {{ $t("message.Certification.Certification_Expired") }}
                </p>
                <p
                    v-if="certificationDetails.status == 0"
                    class="certification-status"
                >
                    {{ $t("message.Certification.Certification_Assigned") }}
                </p>
                <p
                    v-if="certificationDetails.status == 1"
                    class="certification-status"
                >
                    {{ $t("message.Certification.Completion_Pending") }}
                </p>
                <p
                    v-if="certificationDetails.status == 2"
                    class="certification-status"
                >
                    {{ $t("message.Certification.Certification_Completed") }}.
                </p>
                <p
                    v-if="certificationDetails.status == 4"
                    class="certification-status"
                >
                    {{ $t("message.Certification.Unenrolled_OK") }}
                </p>
            </div>
        </div>
        <div class="certification-detail-bottom">
            <el-row>
                <el-col :span="17">
                    <div class="certification-detail-left">
                        <p
                            v-if="certificationDetails.memo"
                            class="certification-detail-content"
                            v-html="certificationDetails.memo"
                        />
                        <p
                            v-if="
                                certificationDetails.status == 0 &&
                                    certificationDetails.issuer == 0
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.This_is_an_internal_Certification_Please_waiting"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 2 &&
                                    certificationDetails.issuer == 0
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.This_is_an_internal_Certification_Your_Certificate"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 3 &&
                                    certificationDetails.issuer == 0
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.The_certification_has_expired_and_you"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 4 &&
                                    certificationDetails.issuer == 0
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.You_has_already_unenrolled"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 0 &&
                                    certificationDetails.issuer == 1
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.This_is_an_external_Certification_Please_upload"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 1 &&
                                    certificationDetails.issuer == 1
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.Uploaded_proof_of_completion"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 2 &&
                                    certificationDetails.issuer == 1
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.Your_external_Certificate_has_already_approved"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 3 &&
                                    certificationDetails.issuer == 1
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.The_certification_has_expired_and_you_have"
                                )
                            }}
                        </p>
                        <p
                            v-if="
                                certificationDetails.status == 4 &&
                                    certificationDetails.issuer == 1
                            "
                            class="certification-detail-status"
                        >
                            {{
                                $t(
                                    "message.Certification.You_has_already_unenrolled_Contact"
                                )
                            }}
                        </p>
                        <div
                            v-if="
                                certificationDetails.issuer == 1 &&
                                    (certificationDetails.status == 0 ||
                                        certificationDetails.status == 1 ||
                                        certificationDetails.status == 4)
                            "
                        >
                            <el-upload
                                style="display: inline-block;margin-top: 30px;"
                                class="upload-demo"
                                :action="upload"
                                :file-list="file"
                                :on-success="uploadSuccess"
                                :before-upload="beforeFileUpload"
                                accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,
                                       .mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                            >
                                <el-button style="width: 120px" type="primary">
                                    <span class="iconfont icon-Upload" />
                                    {{ $t("message.upload") }}
                                </el-button>
                            </el-upload>
                            <a
                                v-if="proofFileUrl || fileId"
                                :href="getAbsolutePath(fileId)"
                                target="_blank"
                                style="margin-left: 10px"
                            >
                                {{ originName }}</a
                            >
                            <a
                                v-if="!fileId"
                                :href="getAbsolutePath(proofFileUrl)"
                                target="_blank"
                                style="margin-left: 10px"
                                >{{ proofFileName }}</a
                            >
                            <!--<i-->
                            <!--v-if="fileId || proofFileUrl"-->
                            <!--style="cursor: pointer"-->
                            <!--class="el-tag__close el-icon-close"-->
                            <!--@click="uploadClose"-->
                            <!--/>-->
                            <p class="note">
                                {{
                                    $t(
                                        "message.Certification.Note_Only_one_document_can_be_uploaded"
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="certification-detail-right">
                        <p class="certification-detail-deadline">
                            <span class="iconfont icon-due" />
                            <span class="">Deadline</span>
                            <span>{{
                                certificationDetails.dueTime | formatDate(s)
                            }}</span>
                        </p>
                        <p
                            v-if="certificationDetails.type == 1"
                            class="certification-detail-deadline"
                        >
                            <span class="iconfont icon-recurring" />
                            <span>{{ $t("message.Certification.Type") }}</span>
                            <span>{{
                                $t("message.Certification.Recurring")
                            }}</span>
                        </p>
                        <p
                            v-if="certificationDetails.type == 0"
                            class="certification-detail-deadline"
                        >
                            <span class="iconfont icon-recurring" />
                            <span>{{ $t("message.Certification.Type") }}</span>
                            <span>{{
                                $t("message.Certification.No_Recurring")
                            }}</span>
                        </p>
                        <p
                            v-if="certificationDetails.type == 1"
                            class="certification-detail-deadline"
                        >
                            <span class="iconfont icon-validity" />
                            <span>{{
                                $t("message.Certification.Validity")
                            }}</span>
                            <span>
                                <span>{{ certificationDetails.validity }}</span>
                                <span
                                    v-if="certificationDetails.validity == 1"
                                    >{{
                                        $t("message.Certification.month")
                                    }}</span
                                >
                                <span
                                    v-if="certificationDetails.validity > 1"
                                    >{{
                                        $t("message.Certification.months")
                                    }}</span
                                >
                            </span>
                        </p>
                        <p
                            v-if="certificationDetails.type == 0"
                            class="certification-detail-deadline"
                        >
                            <span class="iconfont icon-validity" />
                            <span>{{
                                $t("message.Certification.Validity")
                            }}</span>
                            <span>{{
                                $t("message.Certification.Perpetual")
                            }}</span>
                        </p>
                        <div
                            v-if="certificationDetailLists.length > 0"
                            class="certification-detail-right-bottom"
                        >
                            <p class="certification-detail-right-history">
                                {{
                                    $t(
                                        "message.Certification.History_of_approval"
                                    )
                                }}
                            </p>
                            <p class="certification-detail-right-record">
                                {{
                                    $t(
                                        "message.Certification.Only_records_of_successful_certification"
                                    )
                                }}
                            </p>
                            <p
                                v-for="(item,
                                index) in certificationDetailLists"
                                :key="index"
                                class="certification-detail-right-complete"
                            >
                                <span class="iconfont icon-duigou" />
                                <span>{{
                                    $t(
                                        "message.Certification.Certification_Completed"
                                    )
                                }}</span
                                ><br />
                                <span>{{
                                    item.createTime | formatDate(s)
                                }}</span>
                            </p>
                            <div style="width: 100%">
                                <span
                                    v-if="hasMoreList"
                                    style="cursor: pointer;margin-left: 22%;color: #0e38b1"
                                    @click="certificationDetailList()"
                                    >{{ $t("message.Messages.more") }}>></span
                                >
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
import { formatDate } from "@/utils/date";

export default {
    name: "CertificationDetail",
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    data() {
        return {
            certificationId: this.$route.query.certificationId,
            certificationDetails: {},
            certificationDetailLists: [],
            s: "",
            pageSize: 5,
            pageIndex: 1,
            upload: `${process.env.NODE_ENV}/upload`,
            file: [],
            fileList: [],
            fileId: "",
            originName: "",
            proofFileName: "",
            proofFileUrl: "",
            hasMoreList: false
        };
    },
    mounted() {
        this.certificationDetail();
        this.pageIndex = 1;
        this.certificationDetailList();
    },
    methods: {
        arrayPush(tarArr, srcArr) {
            const tempTarArr = tarArr || [];
            const tempSrcArr = srcArr || [];
            for (let i = 0; i < tempSrcArr.length; i += 1) {
                tempTarArr.push(tempSrcArr[i]);
            }
            return tempTarArr;
        },
        async certificationDetailList() {
            const params = {
                certificationId: this.certificationId,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            };
            const result = await this.$getData(
                "/certificationLearnerHis/pageList",
                params,
                "get"
            );
            if (result.data.code === 200) {
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
                    this.certificationDetailLists = result.data.entity.list;
                } else {
                    this.arrayPush(
                        this.certificationDetailLists,
                        result.data.entity.list
                    );
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            return false;
        },
        // 背景图片
        getAbsolutePath(relativePath, width, height) {
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        async certificationDetail() {
            const params = {
                data: this.certificationId
            };
            const result = await this.$getData(
                "/certificationLearner/get",
                params,
                "get"
            );
            if (result.data.code === 200) {
                this.certificationDetails = result.data.entity;
                if (result.data.entity.proofFile) {
                    this.proofFileName = result.data.entity.proofFile.fileName;
                    this.proofFileUrl = result.data.entity.proofFile.fileUrl;
                    console.log(this.proofFileName, this.proofFileUrl);
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async certificationDetailUpload() {
            const params = {
                certificationId: this.certificationId,
                fileUrl: this.fileId
            };
            const result = await this.$getData(
                "/certificationLearner/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                console.log(result.data.code);
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        uploadSuccess(response, file, fileList) {
            this.fileList = fileList;
            if (response.code === 200) {
                response.entity.forEach(item => {
                    this.fileId = item.fileId;
                    this.originName = item.originName;
                });
                this.$message({
                    showClose: true,
                    message: this.$t(
                        "message.Certification.Upload_successfully"
                    ),
                    type: "success"
                });
                this.certificationDetailUpload();
            }
        },
        beforeFileUpload(file) {
            const isLitSize = file.size / 1024 / 1024 < 400;
            if (!isLitSize) {
                this.$message({
                    message: this.$t(
                        "message.Certification.File_size_exceeds_quota"
                    ),
                    type: "warning"
                });
            }
            return isLitSize;
        },
        uploadClose() {
            this.fileId = "";
            this.originName = "";
            this.proofFileName = "";
            this.proofFileUrl = "";
            console.log(this.proofFileName, this.proofFileUrl);
        }
    }
};
</script>

<style scoped lang="less">
.certification-detail {
    /*overflow: hidden;*/
    /deep/.el-upload-list__item .el-icon-upload-success:before {
        content: "";
        display: none;
    }
    /deep/ .el-upload-list__item-name {
        display: none;
    }
    /deep/ .el-progress {
        top: 6px;
    }
    .certification-detail-top {
        width: 100%;
        height: 152px;
        background: rgba(14, 56, 177, 0.1);
        overflow: hidden;
        .certification-oper {
            margin-left: 30px;
            margin-top: 30px;
            overflow: hidden;
            .certification-in-out {
                font-size: 14px;
                font-family: Arial-BoldMT;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                overflow: hidden;
            }
            .certification-name {
                font-size: 18px;
                font-family: Arial-BoldMT;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                margin-top: 25px;
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .certification-status {
                font-size: 14px;
                font-family: ArialMT;
                color: rgba(51, 51, 51, 1);
                margin-top: 10px;
            }
        }
    }
    .certification-detail-bottom {
        .certification-detail-left {
            width: 100%;
            margin-left: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
            border-right: 1px solid rgba(238, 238, 238, 1);
            .certification-detail-content {
                word-break: break-all;
                /deep/ .image {
                    img {
                        width: 301px;
                        height: 400px;
                        margin-top: 30px;
                        margin-left: 30%;
                    }
                }
            }
            .certification-detail-status {
                font-size: 14px;
                font-family: ArialMT;
                color: rgba(14, 56, 177, 1);
                margin-top: 30px;
            }
            .note {
                font-size: 14px;
                font-family: ArialMT;
                color: rgba(153, 153, 153, 1);
                margin-top: 20px;
            }
        }
        .certification-detail-right {
            margin-left: 20%;
            .icon-due {
                font-size: 22px;
                color: #0e38b1;
                position: relative;
                top: 3px;
            }
            .icon-recurring {
                font-size: 22px;
                color: #0e38b1;
                position: relative;
                top: 3px;
            }
            .icon-validity {
                font-size: 22px;
                color: #0e38b1;
                position: relative;
                top: 2px;
            }
            .certification-detail-deadline {
                margin-top: 15%;
                span:nth-of-type(2) {
                    width: 75px;
                    font-size: 14px;
                    font-family: ArialMT;
                    color: rgba(102, 102, 102, 1);
                    display: inline-block;
                }
            }
            .certification-detail-right-bottom {
                margin-top: 10%;
            }
            .certification-detail-right-history {
                font-size: 14px;
                font-family: Arial-BoldMT;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }
            .certification-detail-right-record {
                font-size: 14px;
                font-family: ArialMT;
                color: rgba(102, 102, 102, 1);
                margin-top: 7%;
            }
            .icon-duigou {
                color: rgba(85, 194, 31, 1);
                font-size: 14px;
            }
            .certification-detail-right-complete {
                margin-top: 10%;
                span:nth-of-type(3) {
                    font-size: 14px;
                    font-family: ArialMT;
                    color: rgba(102, 102, 102, 1);
                    /*width: 95px;*/
                    display: inline-block;
                    margin-left: 19px;
                }
                span:nth-of-type(2) {
                    font-size: 14px;
                    font-family: ArialMT;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }
}
</style>
