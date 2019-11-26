<template>
    <div>
        <div>
            <div class="top-header">
                <h1 class="top-title">
                    {{ $t("message.RESOURCE.Shared_resource") }}
                </h1>
                <a class="top-set" @click="toSet">
                    <i
                        class="iconfont icon-shezhi"
                        style="font-size: 16px;font-weight:bold"
                    />
                    {{ $t("message.Settings") }}
                </a>
            </div>
            <el-input
                v-model="searchVal"
                class="searchBox"
                size="medium"
                :placeholder="$t('message.LIVE.search')"
                prefix-icon="iconfont icon-sousuo"
                maxlength="100"
                @keyup.enter.native="handleSearch"
            />
            <div class="filterBox">
                <div class="filterList">
                    <h1>Filter</h1>
                    <div class="filter-right">
                        <el-checkbox
                            v-model="checkAll"
                            class="filter-item"
                            @change="handleCheckAllChange"
                        >
                            {{ $t("message.All") }}
                        </el-checkbox>
                        <el-checkbox-group
                            v-model="checkedItem"
                            class="checkFilter"
                            @change="handleCheckedChange"
                        >
                            <el-checkbox
                                v-for="(item, index) in checkFilter"
                                :key="index"
                                class="filter-item"
                                :label="item.id"
                            >
                                {{ item.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="filterList">
                    <h1>{{ $t("message.RESOURCE.Sequencing") }}</h1>
                    <div class="filter-right">
                        <ul class="sortList">
                            <li v-for="item in sortData" :key="item.id">
                                <a
                                    :class="{
                                        activeSort:
                                            item.id.toString() ===
                                            activeSort.toString()
                                    }"
                                    @click="handleSort(item)"
                                >
                                    {{ item.title }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="containBox">
                <ul v-loading="loading" class="containList">
                    <li
                        v-for="(item, index) in adminResData"
                        :key="index"
                        class="contain-item"
                    >
                        <a class="item-img" @click="toDetail(item)">
                            <img :src="baseUrl + item.thumbnailUrl" />
                        </a>
                        <div class="item-box">
                            <h1 class="item-type">
                                <span v-show="item.originType === 1">
                                    <i class="iconfont icon-edit1" />
                                    {{ $t("message.assignment") }}
                                </span>
                                <span v-show="item.originType === 2">
                                    <i class="iconfont icon-liaotian" />
                                    {{ $t("message.discussion") }}
                                </span>
                                <span v-show="item.originType === 3">
                                    <i class="iconfont icon--xiugaineirong" />
                                    {{ $t("message.Grade_Quize") }}
                                </span>
                                <span v-show="item.originType === 4">
                                    <i class="iconfont icon-shu" />
                                    {{ $t("message.course") }}
                                </span>
                            </h1>
                            <h2 class="item-title">
                                {{ item.name }}
                            </h2>
                            <h3 class="item-grade">
                                {{ $t("message.Grades") }}
                                {{ item.gradeStart }} -
                                {{ item.gradeEnd }}
                            </h3>
                            <ul class="tag-list">
                                <li
                                    v-for="(val, _index) in item.tags"
                                    :key="_index"
                                >
                                    {{ val }}
                                </li>
                            </ul>
                            <div class="authorBox">
                                <span class="authorName">
                                    {{ $t("message.RESOURCE.by") }}
                                    {{ item.author }}</span
                                >
                                <span style="color: #666">
                                    <i
                                        class="iconfont icon-sey-leave-a"
                                        style="font-size: 24px; vertical-align: middle"
                                    />
                                    {{ item.importCount }}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pagBox">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :current-page.sync="pageIndex"
                        :total="totalPage"
                        @current-change="turnPage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resSearchAdmin } from "@/api/resourceRequst";

export default {
    data() {
        return {
            baseUrl: process.env.FILE_PRE_SERVER,
            searchVal: "",
            isActive: true,
            checkAll: true,
            checkedItem: [1, 2, 3, 15],
            checkFilter: [
                { name: this.$t("message.Course"), id: 15 },
                { name: this.$t("message.assignment"), id: 1 },
                { name: this.$t("message.Quiz"), id: 3 },
                { name: this.$t("message.discussion"), id: 2 }
            ],
            sortData: [
                { id: 1, title: this.$t("message.RESOURCE.Latest_updates") },
                { id: 2, title: this.$t("message.RESOURCE.Most_duplicate") }
            ],
            adminResData: [],
            activeSort: 1,
            pageIndex: 1,
            pageSize: 16,
            loading: false,
            totalPage: 1
        };
    },
    computed: { ...mapGetters(["userInfoData"]) },
    created() {
        this.resSearchAdmin();
    },
    mounted() {},
    methods: {
        handleSearch() {
            this.pageIndex = 1;
            this.resSearchAdmin();
        },
        handleCheckAllChange(value) {
            const checkArr = this.checkFilter.map(el => el.id);
            this.checkedItem = value ? checkArr : [];
            this.pageIndex = 1;
            this.resSearchAdmin();
        },
        handleCheckedChange(value) {
            const checkedCount = value.length;
            this.checkAll = checkedCount === this.checkFilter.length;
            this.pageIndex = 1;
            this.resSearchAdmin();
        },
        handleSort(item) {
            this.activeSort = item.id;
            this.resSearchAdmin();
        },
        turnPage(currentPage) {
            this.pageIndex = Number(currentPage);
            this.resSearchAdmin();
        },
        async resSearchAdmin() {
            this.loading = true;
            const params = {
                types: this.checkedItem.join(","),
                sortBy: this.activeSort.toString(),
                content: this.searchVal,
                pageIndex: Number(this.pageIndex),
                pageSize: Number(this.pageSize)
            };
            const res = await resSearchAdmin(params);
            if (Number(res.data.code) === 200) {
                this.adminResData = res.data.entity.list;
                if (this.adminResData.length > 0) {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }
                this.loading = false;
                this.totalPage = res.data.entity.total;
            }
        },
        toSet() {
            this.$router.push({
                path: "/adminHomePage/adminResource/adminResourceSet"
            });
        },
        toDetail(item) {
            this.$router.push({
                path: "/adminHomePage/adminResource/adminResDetail",
                query: {
                    originType: item.originType,
                    originId: item.id,
                    hasCheck: item.hasCheck,
                    hasNewVersion: item.hasNewVersion
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../resource/resourceList.less";
.top-header {
    padding: 20px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .top-title {
        font-size: 20px;
        color: #333;
        line-height: 24px;
        font-weight: bold;
    }
    .top-set {
        color: #0037b8;
        font-size: 14px;
        line-height: 24px;
        cursor: pointer;
    }
}
</style>
