<template>
    <div>
        <el-tabs
            v-model="activeStatus"
            class="statusPanel"
            style="margin-top: 20px"
        >
            <el-tab-pane
                :label="$t('message.RESOURCE.Duplicate_status')"
                name="1"
            >
                <el-table
                    v-loading="dupStatusData.loading"
                    :data="dupStatusData.list"
                    :header-cell-style="{ background: '#eee', color: '#333' }"
                >
                    <el-table-column
                        prop="resourceName"
                        :label="$t('message.RESOURCE.Resource')"
                    />
                    <el-table-column prop="category" label="Category">
                        <template slot-scope="scope">
                            <span v-if="scope.row.category === 1">
                                {{ $t("message.assignment") }}
                            </span>
                            <span v-if="scope.row.category === 2">
                                {{ $t("message.discussion") }}
                            </span>
                            <span v-if="scope.row.category === 3"> Quiz </span>
                            <span v-if="scope.row.category === 15">
                                {{ $t("message.RESOURCE.Course") }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="courseName"
                        :label="$t('message.RESOURCE.Duplicate_to')"
                    />
                    <el-table-column
                        prop="importType"
                        :label="$t('message.Type')"
                    >
                        <template slot-scope="scope">
                            <span>
                                {{
                                    scope.row.importType === "3"
                                        ? $t("message.Import")
                                        : $t("message.Common_update")
                                }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        :label="$t('message.RESOURCE.Date_Time')"
                    >
                        <template slot-scope="scope">
                            <span> {{ scope.row.createTime | formDate }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Status">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status === 1"
                                class="blueStatus"
                            >
                                <i class="iconfont icon-Processing-copy" />
                                {{ $t("message.Processing") }}
                            </span>
                            <span
                                v-if="scope.row.status === 2"
                                class="greenStatus"
                            >
                                <i class="iconfont icon-duigou" />
                                {{ $t("message.RESOURCE.Done") }}
                            </span>
                            <span
                                v-if="scope.row.status === 3"
                                class="redStatus"
                            >
                                <i class="iconfont icon-failed" />
                                {{ $t("message.RESOURCE.Failed") }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="pagBox"
                    background
                    layout="prev, pager, next"
                    :total="dupStatusData.totalPage"
                    @current-change="dupCurrentChange"
                />
            </el-tab-pane>
            <el-tab-pane :label="$t('message.RESOURCE.Share_status')" name="2">
                <el-table
                    v-loading="shareStatusData.loading"
                    :data="shareStatusData.list"
                    :header-cell-style="{ background: '#eee', color: '#333' }"
                >
                    <el-table-column
                        :label="$t('message.RESOURCE.Resource')"
                        prop="resourceName"
                    />
                    <el-table-column
                        prop="category"
                        :label="$t('message.RESOURCE.Category')"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.category === 1">
                                {{ $t("message.assignment") }}
                            </span>
                            <span v-if="scope.row.category === 2">
                                {{ $t("message.discussion") }}
                            </span>
                            <span v-if="scope.row.category === 3">
                                {{ $t("message.Grade_Quize") }}
                            </span>
                            <span v-if="scope.row.category === 15">
                                {{ $t("message.RESOURCE.Course") }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.RESOURCE.Share_to')">
                        <template slot-scope="scope">
                            <span>
                                {{
                                    scope.row.shareRange === 1
                                        ? $t("message.RESOURCE.Only_me")
                                        : scope.row.shareRange === 2
                                        ? $t("message.RESOURCE.Institute")
                                        : $t("message.Public")
                                }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.RESOURCE.Date_Time')">
                        <template slot-scope="scope">
                            <span> {{ scope.row.createTime | formDate }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.Grade_Status')">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status === 1"
                                class="blueStatus"
                            >
                                <i class="iconfont icon-Processing-copy" />
                                {{ $t("message.Processing") }}
                            </span>
                            <span
                                v-if="scope.row.status === 2"
                                class="greenStatus"
                            >
                                <i class="iconfont icon-duigou" />
                                {{ $t("message.RESOURCE.Done") }}
                            </span>
                            <span
                                v-if="scope.row.status === 3"
                                class="redStatus"
                            >
                                <i class="iconfont icon-failed" />
                                {{ $t("message.RESOURCE.Failed") }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="pagBox"
                    background
                    layout="prev, pager, next"
                    :total="shareStatusData.totalPage"
                    @current-change="shareCurrentChange"
                />
            </el-tab-pane>
            <el-tab-pane name="3">
                <span slot="label" class="adminState">
                    {{ $t("message.RESOURCE.Revise_by_admin") }}
                    <a v-show="adminCheck" class="adminDot" />
                </span>
                <el-table
                    v-loading="adminStatusData.loading"
                    :data="adminStatusData.list"
                    :header-cell-style="{ background: '#eee', color: '#333' }"
                >
                    <el-table-column
                        prop="resourceName"
                        :label="$t('message.RESOURCE.Resource')"
                    />
                    <el-table-column
                        prop="category"
                        :label="$t('message.RESOURCE.Category')"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.category === 1">
                                {{ $t("message.assignment") }}
                            </span>
                            <span v-if="scope.row.category === 2">
                                {{ $t("message.discussion") }}
                            </span>
                            <span v-if="scope.row.category === 3">
                                {{ $t("message.Grade_Quize") }}
                            </span>
                            <span v-if="scope.row.category === 15">
                                {{ $t("message.RESOURCE.Course") }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.RESOURCE.Share_to')">
                        <template slot-scope="scope">
                            <span>
                                {{
                                    scope.row.shareRange === 1
                                        ? $t("message.RESOURCE.Only_me")
                                        : scope.row.shareRange === 2
                                        ? $t("message.RESOURCE.Institute")
                                        : $t("message.Public")
                                }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="category"
                        :label="$t('message.Type')"
                    >
                        <template slot-scope="scope">
                            <span>
                                {{
                                    scope.row.operationType === 1
                                        ? $t("message.Edit")
                                        : $t("message.Remove")
                                }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.RESOURCE.Date_Time')">
                        <template slot-scope="scope">
                            <span>
                                {{ scope.row.createTime | formDate }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="adminName"
                        :label="$t('message.RESOURCE.Admin')"
                    />
                </el-table>
                <el-pagination
                    class="pagBox"
                    background
                    layout="prev, pager, next"
                    :total="adminStatusData.totalPage"
                    @current-change="adminCurrentChange"
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {
    getResImportStatus,
    getResShareStatus,
    getAdminStatus
} from "@/api/resourceRequst";
import { formatDate } from "@/utils/date";

export default {
    components: {},
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
            activeStatus: "1",
            dupStatusData: {
                list: [],
                pageIndex: 1,
                totalPage: 1,
                loading: false
            },
            shareStatusData: {
                list: [],
                pageIndex: 1,
                totalPage: 1,
                loading: false
            },

            adminStatusData: {
                list: [],
                pageIndex: 1,
                totalPage: 10,
                hasCheck: 0,
                loading: false
            },
            pageSize: 10,
            adminCheck: false
        };
    },
    created() {
        this.getResImportStatus();
        this.getResShareStatus();
        this.getAdminStatus();
    },
    methods: {
        tabClick(data) {
            const curName = data.name;
            switch (curName) {
                case "1":
                    this.getResImportStatus();
                    break;
                case "2":
                    this.getResShareStatus();
                    break;
                case "3":
                    this.getAdminStatus();
                    break;
                default:
                    return false;
            }
            return true;
        },
        dupCurrentChange(page) {
            this.dupStatusData.pageIndex = page;
            this.getResImportStatus();
        },
        async getResImportStatus() {
            // 资源导入分页日志-- Duplicating status
            this.dupStatusData.loading = true;
            const params = {
                pageIndex: this.dupStatusData.pageIndex,
                pageSize: this.pageSize
            };
            const res = await getResImportStatus(params);
            if (Number(res.data.code) === 200) {
                console.log("resTotalPage", res.data.entity.total);
                this.dupStatusData.list = res.data.entity.list;
                this.dupStatusData.totalPage = res.data.entity.total;
                this.dupStatusData.loading = false;
            }
        },
        shareCurrentChange(page) {
            this.shareStatusData.pageIndex = page;
            this.getResShareStatus();
        },
        async getResShareStatus() {
            // 资源分享日志 -- Sharing status
            this.shareStatusData.loading = true;
            const params = {
                pageIndex: this.shareStatusData.pageIndex,
                pageSize: this.pageSize
            };
            const res = await getResShareStatus(params);
            if (Number(res.data.code) === 200) {
                this.shareStatusData.list = res.data.entity.list;
                this.shareStatusData.totalPage = res.data.entity.total;
                this.shareStatusData.loading = false;
            }
        },
        adminCurrentChange(page) {
            this.adminStatusData.pageIndex = page;
            this.getAdminStatus();
        },
        async getAdminStatus() {
            // 资源管理员日志分页 --  Revised by Admin
            this.adminStatusData.loading = true;
            const params = {
                pageIndex: this.adminStatusData.pageIndex,
                pageSize: this.pageSize
            };
            const res = await getAdminStatus(params);
            if (Number(res.data.code) === 200) {
                this.adminCheck = res.data.entity.hasCheck === 1;
                this.adminStatusData.list = res.data.entity.list;
                this.adminStatusData.totalPage = res.data.entity.total;
                this.adminStatusData.loading = false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import "./resourceList.less";
</style>
