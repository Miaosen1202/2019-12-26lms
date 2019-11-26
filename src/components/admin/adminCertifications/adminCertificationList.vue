<template>
    <div class="admit-certification-list">
        <div v-if="noCertificationList" class="no-certification-list">
            <div class="certification-operation">
                <el-form>
                    <el-input
                        v-model="value"
                        class="search-input"
                        prefix-icon="el-icon-search"
                        :placeholder="$t('message.Common_search')"
                        disabled="disabled"
                        style="width: 15%"
                    />
                    <el-select
                        v-model="value"
                        :placeholder="$t('message.ANNOUNCE.ALL')"
                        disabled="disabled"
                        style="margin-left: 2%;width: 15%"
                    >
                        <el-option label="区域一" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                    </el-select>
                    <el-form-item
                        :label="$t('message.Certification.Type')"
                        label-width="40px"
                        class="list-type"
                        style=""
                    >
                        <el-select
                            v-model="value"
                            :placeholder="$t('message.ANNOUNCE.ALL')"
                            disabled="disabled"
                        >
                            <el-option label="区域一" value="shanghai" />
                            <el-option label="区域二" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Certification.Sort_by')"
                        label-width="70px"
                        class="no-list-sortby"
                        style=""
                    >
                        <el-select
                            v-model="value"
                            :placeholder="$t('message.Certification.Name_a_z')"
                            disabled="disabled"
                        >
                            <el-option label="区域一" value="shanghai" />
                            <el-option label="区域二" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="nolist-button"
                        style=""
                        @click="addCertification"
                    >
                        <i class="iconfont icon-add" style="" />
                        <span style="">{{
                            $t("message.Certification.Certification")
                        }}</span>
                    </el-button>
                </el-form>
            </div>
            <div class="no-list-img">
                <img src="../../../../static/images/diploma-3.png" />
                <p>
                    {{
                        $t(
                            "message.Certification.There_are_no_Certifications_to_show_in_this_section"
                        )
                    }}
                </p>
                <p @click="addCertification">
                    {{
                        $t(
                            "message.Certification.Click_here_to_add_a_certification"
                        )
                    }}
                </p>
            </div>
            <div />
        </div>
        <div
            v-if="haveCertificationList"
            class="certification-list no-certification-list"
            @click="hidePanel"
        >
            <div class="certification-operation">
                <el-form>
                    <el-input
                        v-model="searchKey"
                        class="search-input"
                        prefix-icon="el-icon-search"
                        :placeholder="$t('message.Common_search')"
                        style="width: 15%"
                        @input="selectSearch"
                    />
                    <el-select
                        v-model="status"
                        :placeholder="$t('message.ANNOUNCE.ALL')"
                        style="margin-left: 2%;width: 15%"
                        @change="selectStatus"
                    >
                        <el-option
                            :label="$t('message.ANNOUNCE.ALL')"
                            value="-1"
                        >
                            {{ $t("message.ANNOUNCE.ALL") }}
                        </el-option>
                        <el-option
                            :label="$t('message.Certification.Published')"
                            value="1"
                        >
                            {{ $t("message.Certification.Published") }}
                        </el-option>
                        <el-option
                            :label="$t('message.Certification.Unpublished')"
                            value="0"
                        >
                            {{ $t("message.Certification.Unpublished") }}
                        </el-option>
                        <el-option
                            :label="$t('message.Certification.Retired')"
                            value="2"
                        >
                            {{ $t("message.Certification.Retired") }}
                        </el-option>
                    </el-select>
                    <el-form-item
                        :label="$t('message.Certification.Type')"
                        label-width="40px"
                        class="list-type"
                        style=""
                        @change="selectIssuer"
                    >
                        <el-select
                            v-model="issuer"
                            :placeholder="$t('message.ANNOUNCE.ALL')"
                            @change="selectIssuer"
                        >
                            <el-option
                                :label="$t('message.ANNOUNCE.ALL')"
                                value="-1"
                            >
                                {{ $t("message.ANNOUNCE.ALL") }}
                            </el-option>
                            <el-option label="Internal" value="0">
                                {{ $t("message.Certification.Internal") }}
                            </el-option>
                            <el-option label="External" value="1">
                                {{ $t("message.Certification.External") }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Certification.Sort_by')"
                        label-width="70px"
                        class="no-list-sortby"
                        style=""
                    >
                        <el-select
                            v-model="orderBy"
                            :placeholder="$t('message.Certification.Name_a_z')"
                            @change="selectSort"
                        >
                            <el-option
                                :label="$t('message.Certification.Name_a_z')"
                                value="0"
                            >
                                {{ $t("message.Certification.Name_a_z") }}
                            </el-option>
                            <el-option
                                :label="$t('message.Certification.Name_z_a')"
                                value="1"
                            >
                                {{ $t("message.Certification.Name_z_a") }}
                            </el-option>
                            <el-option
                                :label="
                                    $t('message.Certification.Data_Updated')
                                "
                                value="2"
                            >
                                {{ $t("message.Certification.Data_Updated") }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="nolist-button"
                        style=""
                        @click="addCertification"
                    >
                        <i class="iconfont icon-add" style="" />
                        <span style="">{{
                            $t("message.Certification.Certification")
                        }}</span>
                    </el-button>
                </el-form>
            </div>
            <div v-loading="loading" class="certification-list-card">
                <div
                    v-for="(item, index) in certificationLists"
                    :key="index"
                    class="certification-card"
                    style="display: inline-block"
                    @click="operationClickLeave(item)"
                >
                    <el-card shadow="never">
                        <div
                            :class="
                                `${
                                    item.status == 1
                                        ? 'certification-card-top'
                                        : ''
                                }
                                  ${
                                      item.status == 0
                                          ? 'certification-card-top-unpublish'
                                          : ''
                                  }
                                  ${
                                      item.status == 2
                                          ? 'certification-card-top-retired'
                                          : ''
                                  }`
                            "
                            :style="{
                                backgroundImage:
                                    'url(' +
                                    (item.userFile
                                        ? getAbsolutePath(item.userFile.fileUrl)
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
                            <span
                                v-if="item.status == 1"
                                class="certification-publish"
                            >
                                <span class="certification-publish-span">{{
                                    $t("message.Certification.Published")
                                }}</span>
                            </span>
                            <span
                                v-if="item.status == 0"
                                class="certification-unpublish"
                            >
                                <span class="certification-unpublish-span">{{
                                    $t("message.Certification.Unpublished")
                                }}</span>
                            </span>
                            <span
                                v-if="item.status == 2"
                                class="certification-retired"
                            >
                                <span class="certification-retired-span">{{
                                    $t("message.Certification.Retired")
                                }}</span>
                            </span>
                            <p class="certification-card-name">
                                <span class="certification-card-name-span">{{
                                    item.name
                                }}</span>
                            </p>
                        </div>
                        <div
                            v-if="cardbottom"
                            class="certification-card-bottom"
                        >
                            <span @click.stop="operationClick(item, index)">
                                <img
                                    src="../../../../static/images/shadian.png"
                                />
                            </span>
                        </div>
                    </el-card>
                    <!--<p :class="{'activeShow': index === selected }"-->
                    <!--class="red"-->
                    <!--&gt;11111111111111</p>-->
                    <div
                        v-if="item.show"
                        id="myPanel"
                        class="certification-card-operation red"
                        :class="{ activeShow: index === selected }"
                    >
                        <p class="certification-card-operation-name" style="">
                            <span>{{ item.name }}</span>
                        </p>
                        <p
                            class="certification-card-operation-p"
                            @click="gotoDetail(item.id, item.status, item.name)"
                        >
                            <span class="iconfont icon-view" />
                            <span>{{
                                $t("message.Certification.View_Certification")
                            }}</span>
                        </p>
                        <p
                            v-if="item.status == 0 || item.status == 2"
                            class="certification-card-operation-p"
                            @click="certificationPublish(item.id, item.name)"
                        >
                            <span class="iconfont icon-publish" />
                            <span>{{ $t("message.Published") }}</span>
                        </p>
                        <p
                            v-if="item.status == 0 || item.status == 2"
                            class="certification-card-operation-p"
                            @click="certificationDelete(item.id)"
                        >
                            <span class="iconfont icon-delete" />
                            <span>{{ $t("message.Delete") }}</span>
                        </p>
                        <p
                            v-if="item.status == 1"
                            class="certification-card-operation-p"
                            @click="
                                certificationLearnerList(
                                    item.id,
                                    item.status,
                                    item.name
                                )
                            "
                        >
                            <span class="iconfont icon-enrolllearners" />
                            <span>{{
                                $t("message.Certification.Enroll_Learners")
                            }}</span>
                        </p>
                        <p
                            v-if="item.status == 1"
                            class="certification-card-operation-p"
                            @click="certificationRetire(item.id, item.name)"
                        >
                            <span class="iconfont icon-retire" />
                            <span>{{
                                $t("message.Certification.Retire")
                            }}</span>
                        </p>
                        <p
                            class="certification-card-operation-p"
                            @click="certificationDuplicate(item.id)"
                        >
                            <span
                                class="iconfont icon-ICAtubiao_wendangzhongxin"
                            />
                            <span>{{
                                $t("message.Certification.Duplicate")
                            }}</span>
                        </p>
                    </div>
                </div>
                <div style="text-align: center;width: 100%">
                    <span
                        v-if="hasMoreList"
                        style="cursor: pointer;font-size: 17px;height: 60px;
                        line-height: 60px;"
                        @click="certificationList()"
                        >{{ $t("message.Messages.Click_load_More") }} ...</span
                    >
                </div>
            </div>
        </div>
        <div>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="dialogVisibleCertification"
                width="30%"
            >
                <span>{{
                    $t(
                        "message.Certification.You_are_about_delete_this_Certification"
                    )
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleCertification = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="dialogVisibleCertificationDelete"
                        >{{ $t("message.Delete") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminCertificationList",
    data() {
        return {
            selected: null,
            searchKey: "",
            status: "",
            issuer: "",
            orderBy: "",
            pageIndex: 1,
            pageSize: 20,
            certificationLists: [],
            noCertificationList: false,
            haveCertificationList: true,
            certificationCardOperation: false,
            cardbottom: true,
            dialogVisibleCertification: false,
            certificationId: "",
            operationShow: false,
            hasMoreList: false,
            loading: true,
            mb_menuVisible: false,
            showsPanel: "",
            certificationListIndex: ""
        };
    },
    watch: {
        certificationListIndex: {
            handler(newName, oldName) {
                // if (newName) {
                //     // this.showsPanel = false;
                //     // this.certificationList()
                // }
                console.log(newName, oldName);
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.certificationList();
        this.pageIndex = 1;
    },
    methods: {
        // 背景图片
        getAbsolutePath(relativePath, width, height) {
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        // 请求列表的接口
        arrayPush(tarArr, srcArr) {
            const tempTarArr = tarArr || [];
            const tempSrcArr = srcArr || [];
            for (let i = 0; i < tempSrcArr.length; i += 1) {
                tempTarArr.push(tempSrcArr[i]);
            }
            return tempTarArr;
        },
        async certificationList() {
            let statuss = "";
            if (this.status === "") {
                statuss = -1;
            } else {
                statuss = this.status;
            }
            let issuers = "";
            if (this.issuer === "") {
                issuers = -1;
            } else {
                issuers = this.issuer;
            }
            let orderBys = "";
            if (this.orderBy === "") {
                orderBys = 0;
            } else {
                orderBys = this.orderBy;
            }
            const params = {
                searchKey: this.searchKey,
                status: statuss,
                issuer: issuers,
                orderBy: orderBys,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            };
            const result = await this.$getData(
                "/certification/pageList",
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
                    this.certificationLists = result.data.entity.list;
                } else {
                    this.arrayPush(
                        this.certificationLists,
                        result.data.entity.list
                    );
                }
                this.certificationLists.forEach(item => {
                    this.$set(item, "show", false);
                    this.showsPanel = item.show;
                });
                if (
                    Number(this.certificationLists.length) === 0 &&
                    this.searchKey === "" &&
                    this.status === "" &&
                    this.issuer === "" &&
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
        selectStatus() {
            this.pageIndex = 1;
            this.certificationLists = [];
            setTimeout(this.certificationList(), 800);
        },
        selectSearch() {
            this.pageIndex = 1;
            this.certificationLists = [];
            setTimeout(this.certificationList(), 1500);
        },
        selectIssuer() {
            this.pageIndex = 1;
            this.certificationLists = [];
            setTimeout(this.certificationList(), 800);
        },
        selectSort() {
            this.pageIndex = 1;
            this.certificationLists = [];
            setTimeout(this.certificationList(), 800);
        },
        addCertification() {
            this.$router.push({
                path: "/adminHomePage/adminCertificationAdmit"
            });
        },
        hidePanel(event) {
            const sp = document.getElementById("myPanel");
            if (sp) {
                if (!sp.contains(event.target)) {
                    // 这句是说如果我们点击到了id为myPanel以外的区域
                    this.showsPanel = false;
                    this.certificationLists = [];
                    this.pageSize = 1000;
                    this.pageIndex = 1;
                    this.certificationList();
                }
            }
        },
        operationClick(item, index) {
            this.selected = index;
            const items = item;
            items.show = !items.show;
            // this.certificationListIndex = index;
        },
        operationClickLeave(item) {
            this.$set(item, "show", false);
        },
        gotoDetail(certificationId, certificationStatus, certificationName) {
            this.$router.push({
                path:
                    "/adminHomePage/adminCertificationDetailLeft/adminCertificationDetail",
                query: {
                    activeName: "Overview",
                    certificationId,
                    certificationStatus,
                    certificationName
                }
            });
        },
        // 认证发布
        async certificationPublish(certificationId, certificationName) {
            const params = {
                id: certificationId,
                status: 1,
                name: certificationName
            };
            const result = await this.$getData(
                "/certification/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.pageIndex = 1;
                this.pageSize = 1000;
                this.certificationLists = [];
                this.certificationList();
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_published_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 认证删除
        certificationDelete(certificationId) {
            this.certificationId = certificationId;
            this.dialogVisibleCertification = true;
        },
        async dialogVisibleCertificationDelete() {
            const result = await this.$getData(
                "/certification/deletes",
                [this.certificationId],
                "post"
            );
            if (result.data.code === 200) {
                this.pageIndex = 1;
                this.certificationLists = [];
                this.pageSize = 1000;
                this.certificationList();
                this.dialogVisibleCertification = false;
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_delete_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 认证复制
        async certificationDuplicate(certificationId) {
            const params = {
                id: certificationId
            };
            const result = await this.$getData(
                "/certification/copy/edit",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.pageIndex = 1;
                this.certificationLists = [];
                // this.pageSize = 1000;
                this.certificationList();
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_duplicated_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 认证过期
        async certificationRetire(certificationId, certificationName) {
            const params = {
                id: certificationId,
                status: 2,
                name: certificationName
            };
            const result = await this.$getData(
                "/certification/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.pageIndex = 1;
                this.certificationLists = [];
                this.pageSize = 1000;
                this.certificationList();
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_retired_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 认证加人员
        certificationLearnerList(
            certificationId,
            certificationStatus,
            certificationName
        ) {
            this.$router.push({
                path:
                    "/adminHomePage/adminCertificationDetailLeft/" +
                    "adminCertificationLearnersList",
                query: {
                    activeName: "Learners",
                    certificationId,
                    certificationStatus,
                    certificationName
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
@import "./adminCertificetionList.less";
.red {
    opacity: 0;
}
.activeShow {
    opacity: 1;
}
</style>
