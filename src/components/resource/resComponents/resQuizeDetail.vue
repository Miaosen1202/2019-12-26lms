<template>
    <div class="quize_Detail">
        <p class="quize_Detail_title">
            <span v-if="sonvalue.resource">
                {{ $t("message.RESOURCE.Max_attemps") }}
                {{ sonvalue.resource.attemptNumber }}</span
            >
            <span> {{ quizType(sonvalue.resource.type) }} </span>
            <span v-if="sonvalue.resource.timeLimit"
                >{{ sonvalue.resource.timeLimit }}
                {{ $t("message.RESOURCE.Minute_limited") }}</span
            >
            <span v-if="sonvalue.resource.accessCode">
                {{ $t("message.RESOURCE.Require_access_code") }}
                {{ sonvalue.resource.accessCode }}</span
            >
        </p>
        <h3 class="quize_Detail_type" />
        <el-divider />
        <div class="quize_Detail_con">
            <div
                v-for="(item, index) in quizesDataListQue"
                :key="index"
                class="quize_Detail_list"
            >
                <h3>{{ item.seq }}.</h3>
                <div class="quize_Detail_list_right">
                    <p class="quize_Detail_list_p1">
                        <b class="quize_Detail_list_tit">{{
                            quizTitle(item.question)
                        }}</b>

                        <span class="quize_Detail_scor"
                            >{{ item.question.score / 100 }} pts</span
                        >
                    </p>
                    <p class="quize_Detail_list_p2">
                        {{ transfHtml(item.question.content) }}
                    </p>
                    <div
                        v-for="(items, indexs) in item.question.options"
                        :key="indexs"
                        class="quize_Detail_list_select"
                    >
                        <p
                            :class="
                                Number(items.isCorrect) === 1
                                    ? 'quize_Detail_list_gr'
                                    : ''
                            "
                        >
                            <span>{{ items.code }}</span
                            ><span>{{ transfHtml(items.content) }}</span>
                        </p>
                    </div>
                </div>
            </div>
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
        return {
            quizesDataListQue: ""
        };
    },
    computed: {},
    watch: {
        sonvalue: {
            handler(newVal) {
                if (typeof newVal.resource !== "undefined") {
                    this.sonvalue = newVal;
                    this.quizesDataListQue = this.sonvalue.resource.quizItemVOs;
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {},

    methods: {
        quizTitle(item) {
            let resTitle = "";
            switch (item.type) {
                case 1:
                    resTitle = this.$t("message.RESOURCE.Multiple_Choice");
                    break;
                case 2:
                    resTitle = this.$t("message.RESOURCE.Mulitple_Answers");
                    break;
                case 3:
                    resTitle = this.$t("message.RESOURCE.True_false");
                    break;
                case 6:
                    resTitle = this.$t("message.RESOURCE.Essay");
                    break;
                default:
                    break;
            }
            return resTitle;
        },
        quizType(item) {
            let tempType = "";
            switch (item) {
                case 1:
                    tempType = this.$t("message.RESOURCE.Practice_quiz");
                    break;
                case 2:
                    tempType = this.$t("message.RESOURCE.Graded_quiz");
                    break;
                case 3:
                    tempType = this.$t("message.RESOURCE.Graded_survey");
                    break;
                case 4:
                    tempType = this.$t("message.RESOURCE.Ungraded_survey");
                    break;
                default:
                    break;
            }
            return tempType;
        },
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
.quize_Detail_list {
    display: flex;
    margin-bottom: 45px;
}
.quize_Detail_list_p1 {
    width: 200px;
    position: relative;
}
.quize_Detail_list_p2 {
    margin-top: 15px;
}
.quize_Detail_list_right {
    margin-left: 20px;
}
.quize_Detail_list_tit {
    display: inline-block;
    border: 1px solid #cccccc;
    text-align: center;
    padding: 2px 7px;
    border-radius: 12px;
}
.quize_Detail_scor {
    position: absolute;
    right: -5px;
    top: 0;
    color: #666666;
}
.quize_Detail_list_select {
    margin-top: 30px;
}
.quize_Detail_list_select p {
    line-height: 30px;
}
.quize_Detail_list_select p span {
    margin-right: 30px;
}
.quize_Detail_list_gr {
    color: #55c21f;
}
.quize_Detail_title span {
    margin-right: 30px;
    color: #333;
}
.quize_Detail_type {
    margin-top: 20px;
}
.quize_Detail_title {
    margin-top: 20px;
}
</style>
