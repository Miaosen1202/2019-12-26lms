<template>
    <div class="discuss_Detail">
        <div class="discuss_Detail_title">
            {{ $t("message.RESOURCE.points") }}:
            <span>{{ sonvalue.resource.score / 100 }}</span>
        </div>
        <div v-if="sonvalue.resource.content" class="detail-descrip">
            {{ transfHtml(sonvalue.resource.content) }}
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        sonvalue: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    computed: {},
    created() {
        // this.getResDetail()
    },
    methods: {
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            return false;
        }
    }
};
</script>
<style lang="less" scoped>
.discuss_Detail_title {
    line-height: 40px;
}
.detail-descrip {
    color: #666;
    white-space: normal;
    word-break: break-all;
}
</style>
