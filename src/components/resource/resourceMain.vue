<template>
    <div style="padding-right: 20px">
        <header class="topHeader">
            <ul class="titleList">
                <li v-for="(item, index) in titleData" :key="index">
                    <a
                        :class="{ activeTitle: item.name == activeName }"
                        @click="handleTab(item)"
                    >
                        {{ item.name }}
                        <i
                            v-if="
                                item.name === 'Duplicated' &&
                                    hasNewVersion === 1
                            "
                            class="fresh-icon iconfont icon-gengxin"
                        />
                    </a>
                </li>
            </ul>
            <a class="status" @click="toStatus">
                <i class="iconfont icon-status" />
                {{ $t("message.Grade_Status") }}
            </a>
        </header>
        <router-view />
    </div>
</template>

<script>
import { resDupSearch } from "@/api/resourceRequst";

export default {
    components: {},
    data() {
        return {
            titleData: [
                { name: this.$t("message.All"), data: null },
                { name: this.$t("message.RESOURCE.Duplicated"), data: 1 },
                { name: this.$t("message.Shared"), data: 2 },
                { name: this.$t("message.RESOURCE.Favorites"), data: 3 }
            ],
            activeName: this.$route.params.type,
            hasNewVersion: 0
        };
    },
    watch: {
        $route: {
            handler(to) {
                this.activeName = to.query.type;
            },
            immediate: true
        }
    },
    created() {
        this.getResDupSearch();
    },
    methods: {
        handleTab(item) {
            this.activeName = item.name;
            this.$router.push({
                path: "/homePage/resourceMain/resourceList",
                query: {
                    type: item.name
                }
            });
        },
        toStatus() {
            this.$router.push({
                path: "/homePage/resourceMain/resourceStatus"
            });
        },
        async getResDupSearch() {
            const param = {
                types: "1,2,3,15",
                pageSize: 16,
                pageIndex: 1
            };
            const res = await resDupSearch(param);
            if (Number(res.data.code) === 200) {
                this.hasNewVersion = res.data.entity.hasNewVersion;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.topHeader {
    border-bottom: 1px solid #eee;
    padding-top: 20px;
    text-align: center;
    overflow: hidden;
    .status {
        float: right;
        color: #0e38b1;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        margin-right: 30px;
    }
}
.titleList {
    display: inline-block;
    li {
        display: inline-block;
        margin: 0 50px;
        a {
            font-size: 18px;
            color: #999;

            cursor: pointer;
            // line-height: 1.2;
            border-bottom: 3px solid #fff;
            padding-bottom: 3px;
            display: inline-block;
            position: relative;
            .fresh-icon {
                position: absolute;
                top: -6px;
                right: -19px;
                color: #f13026;
                font-size: 14px;
            }
        }
        .activeTitle {
            color: #0e38b1;
            border-bottom: 3px solid #0e38b1;
        }
    }
}
</style>
