<template>
    <div class="admin-certification-left">
        <el-row>
            <div class="certification-right-main">
                <el-col :span="23" style="margin-left: 1%">
                    <router-view />
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "AdminCertificationDetailLeft",
    computed: {
        ...mapMutations(["setId"])
    },
    data() {
        return {};
    },
    watch: {},
    methods: {}
};
</script>

<style scoped lang="less">
.admin-certification-left {
}
</style>
