<template>
    <div style="padding-right: 20px">
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {};
    },
    computed: { ...mapGetters(["userInfoData"]) },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="less" scoped></style>
