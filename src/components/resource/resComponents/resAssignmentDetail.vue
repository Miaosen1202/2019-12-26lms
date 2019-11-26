<template>
    <div class="assignment_Detail">
        <div
            v-if="JSON.stringify(assdetail) != '{}'"
            class="assignment_Detail_title"
        >
            <p v-if="assdetail.resource" class="assignment_Detail_p1">
                <span class="d-title">
                    {{ $t("message.RESOURCE.Submitting") }}:</span
                >

                <span
                    v-if="assdetail.resource.submissionType === 1"
                    class="d-text"
                >
                    {{ assdetail.resource | subTypaName }}
                </span>
                <span
                    v-if="assdetail.resource.submissionType === 2"
                    class="d-text"
                    >{{ $t("message.RESOURCE.On_paper") }}</span
                >
                <span
                    v-if="assdetail.resource.submissionType === 3"
                    class="d-text"
                    >{{ $t("message.RESOURCE.External_tool") }}</span
                >
                <span
                    v-if="assdetail.resource.submissionType === 4"
                    class="d-text"
                    >{{ $t("message.RESOURCE.No_submit") }}</span
                >
            </p>
            <p class="assignment_Detail_p2">
                <span class="d-title">Point: </span>
                <span class="d-text">{{ assdetail.resource.score / 100 }}</span>
                <span
                    class="d-title"
                    style="display:inline-block; margin-left: 10px"
                >
                    {{ $t("message.RESOURCE.Diplay_grade") }}</span
                >
                <span
                    v-if="assdetail.resource.showScoreType === 1"
                    class="d-text"
                    >{{ $t("message.RESOURCE.points") }}</span
                >
                <span
                    v-if="assdetail.resource.showScoreType === 2"
                    class="d-text"
                    >{{ $t("message.RESOURCE.percentage") }}</span
                >
                <span
                    v-if="assdetail.resource.showScoreType === 3"
                    class="d-text"
                    >{{ $t("message.RESOURCE.Complete_Incomplete") }}</span
                >
                <span
                    v-if="assdetail.resource.showScoreType === 4"
                    class="d-text"
                    >{{ $t("message.RESOURCE.Letter_Grade") }}
                </span>
                <span
                    v-if="assdetail.resource.showScoreType === 5"
                    class="d-text"
                    >{{ $t("message.RESOURCE.Not_Graded") }}</span
                >
                <span v-if="!assdetail.resource.showScoreType">
                    {{ $t("message.RESOURCE.points") }}</span
                >
            </p>
        </div>
        <div class="detail-descrip">
            {{ transfHtml(assdetail.resource.description) }}
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    filters: {
        subTypaName: item => {
            const tempList = [];
            if (item.allowFile === 1)
                tempList.push(this.$t("message.RESOURCE.File_upload"));
            if (item.allowMedia === 1)
                tempList.push(this.$t("message.RESOURCE.Media_recording"));
            if (item.allowText === 1)
                tempList.push(this.$t("message.RESOURCE.Text_input"));
            if (item.allowUrl === 1)
                tempList.push(this.$t("message.RESOURCE.Website_URL"));
            const temStr = tempList.join(", ");
            return temStr;
        }
    },
    props: {
        sonvalue: {
            type: Object,
            default() {
                return {
                    submissionTypes: ""
                };
            }
        }
    },

    data() {
        return {
            subType: {
                allowFile: this.$t("message.RESOURCE.File_upload"),
                allowMedia: this.$t("message.RESOURCE.Media_recording"),
                allowText: this.$t("message.RESOURCE.Text_input"),
                allowUrl: this.$t("message.RESOURCE.Website_URL")
            }
        };
    },
    watch: {
        sonvalue: {
            handler() {
                this.assdetail = this.sonvalue;
            },
            immediate: true
        }
    },
    mounted() {},
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
            return "";
        }
    }
};
</script>
<style lang="less" scoped>
.assignment_Detail_img {
    width: 500px;
    height: 400px;
}
.assignment_Detail_imgcenter {
    text-align: center;
}
.assignment_Detail_title p {
    margin-top: 16px;
}
.d-title {
    color: #333;
    font-size: 14px;
    font-weight: bold;
}
.d-text {
    color: #666;
    font-size: 14px;
}
.detail-descrip {
    color: #666;
    white-space: normal;
    word-break: break-all;
}
</style>
