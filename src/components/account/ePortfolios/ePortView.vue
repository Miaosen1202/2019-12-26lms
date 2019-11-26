<template>
    <div class="eportMain">
        <router-view />
    </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    watch: {
        $route: {
            handler(val) {},
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type;
        }
    },

    created() {},
    methods: {}
};
/* eslint-disable */
</script>

<style lang="less" scoped>
.eportMain {
    padding-right: 30px;
}
</style>
