<template>
    <div>
        <!-- :disabled="isActive" -->
        <el-input
            v-if="resType === 'All'"
            v-model="searchVal"
            class="searchBox"
            size="medium"
            maxlength="100"
            :placeholder="$t('message.LIVE.search')"
            prefix-icon="iconfont icon-sousuo"
            @keyup.enter.native="handleSearch"
        />
        <div class="filterBox">
            <div class="filterList">
                <h1>{{ $t("message.RESOURCE.Filter") }}</h1>
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
                    <div v-if="resType === 'All'" class="gradeBox">
                        <el-select
                            v-model="gradeStart"
                            style="width: 134px"
                            placeholder="Please select"
                            @change="changeStartGrade"
                        >
                            <el-option
                                v-for="item in gradeStartList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                        <span> {{ $t("message.RESOURCE.to") }} </span>
                        <el-select
                            v-model="gradeEnd"
                            style="width: 134px"
                            placeholder="Please select"
                            @change="changeEndStart"
                        >
                            <el-option
                                v-for="item in gradeEndList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </div>
                </div>
            </div>
            <div v-if="resType === 'All'" class="filterList">
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
                                >{{ item.title }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="containBox">
            <ul v-loading="searchLoading" class="containList">
                <li
                    v-for="(item, index) in resData"
                    :key="index"
                    class="contain-item"
                >
                    <a class="item-img" @click="toDetail(item)">
                        <span
                            v-if="resType === 'Shared'"
                            class="institute-label"
                        >
                            {{
                                item.shareRange === 1
                                    ? "Only me"
                                    : item.shareRange === 2
                                    ? "Institute"
                                    : "Public"
                            }}
                        </span>
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
                            <span v-show="item.originType === 15">
                                <i class="iconfont icon-shu" />
                                {{ $t("message.Course") }}
                            </span>
                            <i
                                v-if="
                                    item.hasNewNote === 1 &&
                                        resType === 'Duplicated'
                                "
                                class="iconfont icon-gengxin redFresh"
                            />
                        </h1>
                        <h2 class="item-title">
                            {{ item.name }}
                        </h2>
                        <h3 class="item-grade">
                            {{ $t("message.Grades") }} {{ item.gradeStart }} -
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
                                by {{ item.author }}</span
                            >
                            <span style="color: #666">
                                <i
                                    class="iconfont icon-duplicated"
                                    style="font-size: 16px; vertical-align: middle"
                                />
                                {{ item.importCount }}
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="pagBox">
                <el-pagination
                    v-show="!isActive"
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
</template>

<script>
import utilMethods from "@/utils/utilMethods";
import {
    resAllSearch,
    resDupSearch,
    resShareSearch,
    resFavSearch
} from "@/api/resourceRequst";

export default {
    components: {},
    data() {
        return {
            searchLoading: false,
            baseUrl: process.env.FILE_PRE_SERVER,
            searchVal: "",
            isActive: false,
            checkList: [],
            checkedItem: [1, 2, 3, 15],
            checkAll: true,
            checkFilter: [
                { name: this.$t("message.Course"), id: 15 },
                { name: this.$t("message.assignment"), id: 1 },
                { name: this.$t("message.Grade_Quize"), id: 3 },
                { name: this.$t("message.discussion"), id: 2 }
            ],
            sortData: [
                { id: 1, title: this.$t("message.RESOURCE.Latest_updates") },
                { id: 2, title: this.$t("message.RESOURCE.Most_duplicate") }
            ],
            gradeList: utilMethods.gradeList,
            gradeStartList: utilMethods.gradeList,
            gradeEndList: utilMethods.gradeList,
            gradeStart: "",
            gradeEnd: "",
            activeSort: 1,
            typesList: [],
            resType: "",
            pageSize: 16,
            pageIndex: 1,
            // 模拟数据
            // "url(" + `${process.env.FILE_PRE_SERVER}` + course.coverFileUrl + "?s=thumb&a=600x400)",
            resData: [],
            totalPage: 0
        };
    },
    watch: {
        $route: {
            handler(to) {
                this.resType = to.query.type;
                const tempResType = this.resType;
                this.pageIndex = 1;
                this.checkedItem = [1, 2, 3, 15];
                this.resSearch(tempResType);
            },
            immediate: true
        },
        checkedItem() {
            this.typesList = this.checkedItem;
        },
        resData() {
            if (this.resData.length > 0) {
                this.isActive = false;
            } else {
                this.isActive = true;
            }
        }
    },
    created() {},
    methods: {
        changeStartGrade(val) {
            const tempIndex = val;
            const tempGradList = Object.assign([], this.gradeList);
            this.gradeEndList = tempGradList.slice(tempIndex);
            this.pageIndex = 1;
            this.resSearch(this.resType);
        },
        changeEndStart(val) {
            const tempIndex = val + 1;
            const tempGradList = Object.assign([], this.gradeList);
            this.gradeStartList = tempGradList.slice(0, tempIndex);
            this.pageIndex = 1;
            this.resSearch(this.resType);
        },
        handleSearch() {
            this.pageIndex = 1;
            this.resSearch(this.resType);
        },
        handleSort(item) {
            this.activeSort = item.id;
            this.resSearch(this.resType);
        },
        handleCheckedChange(value) {
            const checkedCount = value.length;
            this.checkAll = checkedCount === this.checkFilter.length;
            this.pageIndex = 1;
            this.resSearch(this.resType);
        },
        handleCheckAllChange(value) {
            const checkArr = this.checkFilter.map(el => el.id);
            this.checkedItem = value ? checkArr : [];
            this.pageIndex = 1;
            this.resSearch(this.resType);
        },
        resSearch(type) {
            let params = {};
            this.searchLoading = true;
            if (type === "All") {
                params = {
                    pageSize: Number(this.pageSize),
                    pageIndex: Number(this.pageIndex),
                    types: this.checkedItem.join(","),
                    gradeStart: this.gradeStart ? Number(this.gradeStart) : "",
                    gradeEnd: this.gradeEnd ? Number(this.gradeEnd) : "",
                    sortBy: Number(this.activeSort),
                    content: this.searchVal
                };
            } else {
                params = {
                    types: this.checkedItem.join(","),
                    pageSize: Number(this.pageSize),
                    pageIndex: Number(this.pageIndex)
                };
            }

            if (type === "All") {
                this.resAllSearch(params);
            } else if (type === "Duplicated") {
                this.getResDupSearch(params);
            } else if (type === "Shared") {
                this.getResShareSearch(params);
            } else if (type === "Favorites") {
                this.getResFavSearch(params);
            }
        },
        async resAllSearch(params) {
            const res = await resAllSearch(params);
            if (Number(res.data.code) === 200) {
                this.resData = res.data.entity.list ? res.data.entity.list : [];
                this.searchLoading = false;
                this.totalPage = res.data.entity.total;
            }
        },
        async getResDupSearch(params) {
            const res = await resDupSearch(params);
            if (Number(res.data.code) === 200) {
                this.resData = res.data.entity.list ? res.data.entity.list : [];
                this.searchLoading = false;
            }
        },
        async getResShareSearch(params) {
            const res = await resShareSearch(params);
            if (Number(res.data.code) === 200) {
                this.resData = res.data.entity.list ? res.data.entity.list : [];
                this.searchLoading = false;
            }
        },
        async getResFavSearch(params) {
            const res = await resFavSearch(params);
            if (Number(res.data.code) === 200) {
                this.resData = res.data.entity.list ? res.data.entity.list : [];
                this.searchLoading = false;
            }
        },
        turnPage(currentPage) {
            this.pageIndex = Number(currentPage);
            this.resSearch(this.resType);
        },
        toDetail(item) {
            const tempType = this.resType;
            this.$router.push({
                path: "/homePage/resourceMain/resourceDetail",
                query: {
                    originType: item.originType,
                    originId: item.id,
                    hasCheck: item.hasCheck,
                    hasNewVersion: item.hasNewVersion,
                    type: tempType
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import "./resourceList.less";
</style>
