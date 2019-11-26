<template>
    <div>
        <div>
            <div class="top-header">
                <h1 class="top-title">
                    {{ $t("message.RESOURCE.Shared_resource") }}
                </h1>
                <a class="top-back" @click="goBack">
                    {{ $t("message.RESOURCE.Back") }}
                    <i class="iconfont icon-ai207" style="color: #666" />
                </a>
            </div>
            <div class="set-main">
                <h2 class="set-title">
                    {{ $t("message.Shared") }}
                </h2>
                <el-radio-group v-model="shareRange">
                    <p style="margin-bottom: 20px">
                        <el-radio :label="2">
                            {{ $t("message.RESOURCE.Within_institute") }}
                        </el-radio>
                    </p>
                    <p>
                        <el-radio :label="3">
                            {{ $t("message.RESOURCE.To_Public") }}
                        </el-radio>
                    </p>
                </el-radio-group>
                <div class="set-btns">
                    <el-button @click="handleCancel">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="handleSave">
                        {{ $t("message.Save") }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { modifyShareSetting, getResRange } from "@/api/resourceRequst";

export default {
    data() {
        return {
            shareRange: 3,
            resAdminPath: ""
        };
    },

    created() {
        this.getResRange();
    },

    methods: {
        handleCancel() {
            this.$router.push({
                path: "/adminHomePage/adminResource/adminRescourseList"
            });
        },
        async handleSave() {
            const param = { shareRange: this.shareRange };
            const res = await modifyShareSetting(param);
            if (Number(res.data.code) === 200) {
                this.$message.success("success");
                this.$router.push({
                    path: "/adminHomePage/adminResource/adminRescourseList"
                });
            }
        },
        goBack() {
            this.$router.push({
                path: "/adminHomePage/adminResource/adminRescourseList"
            });
        },
        async getResRange() {
            const res = await getResRange();
            if (Number(res.data.code) === 200) {
                if (res.data.entity.shareRange) {
                    this.shareRange = Number(res.data.entity.shareRange);
                } else {
                    this.shareRange = 3;
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
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
    }
    .top-back {
        color: #333;
        font-size: 20px;
        cursor: pointer;
    }
}
.set-main {
    width: 70%;
    padding: 0 20px;
    margin-top: 20px;
    // padding-bottom: 20px;
    .set-title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .set-btns {
        margin-top: 20px;
        border-top: 1px solid #aaa;
        padding-top: 20px;
        text-align: right;
    }
}
</style>
