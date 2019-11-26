<template>
    <div style="margin-top: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                :label="$t('message.RESOURCE.Assignments')"
                name="first"
            >
                <div v-if="tabAssignment" class="table-a">
                    <ul>
                        <li
                            v-for="(item, index) in assignmentDataList"
                            :key="index"
                            @click="getListDetail(item.id, 1)"
                        >
                            <div>
                                <span class="table-a-l1"
                                    ><i class="iconfont icon-edit1"
                                /></span>
                                <a href="javascript:;" class="list-item">{{
                                    item.title
                                }}</a>

                                <span class="table-a-r1">
                                    <span>{{ item.score / 100 }}</span>
                                    {{ $t("message.RESOURCE.points") }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="!tabAssignment">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="assignmentData.title"
                        placement="top"
                    >
                        <h2 class="detailTitle">
                            {{ assignmentData.title }}
                        </h2>
                    </el-tooltip>

                    <p class="detail-text">
                        <span class="detail-title"
                            >{{ $t("message.RESOURCE.Submitting") }}:</span
                        >
                        <span
                            v-if="assignmentData.submissionType === 1"
                            class="detail-num"
                        >
                            {{ $t("message.RESOURCE.On_line") }}
                        </span>
                        <span
                            v-if="assignmentData.submissionType === 2"
                            class="detail-num"
                        >
                            {{ $t("message.RESOURCE.On_paper") }}
                        </span>
                        <span
                            v-if="assignmentData.submissionType === 3"
                            class="detail-num"
                        >
                            {{ $t("message.RESOURCE.External_tool") }}
                        </span>
                        <span
                            v-if="assignmentData.submissionType === 4"
                            class="detail-num"
                        >
                            {{ $t("message.RESOURCE.No_submit") }}
                        </span>
                    </p>
                    <p class="detail-text">
                        <span class="detail-title"
                            >{{ $t("message.RESOURCE.Point") }}:</span
                        >
                        <span class="detail-num">{{
                            assignmentData.score / 100
                        }}</span>
                    </p>
                    <div
                        v-if="assignmentData.description"
                        class="detail-descrip"
                    >
                        {{ transfHtml(assignmentData.description) }}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Discussions" name="second">
                <div v-if="tabDiscussions" class="table-a">
                    <ul>
                        <li
                            v-for="(itemDis, indexs) in dataDetail"
                            :key="indexs"
                            @click="getListDetail(itemDis.id, 2)"
                        >
                            <div>
                                <span class="table-a-l1"
                                    ><i class="iconfont icon-duihuakuang"
                                /></span>

                                <a href="javascript:;" class="list-item">{{
                                    itemDis.title
                                }}</a>

                                <span
                                    v-if="itemDis.score"
                                    class="table-a-r"
                                    style="top: 0px"
                                >
                                    <span>{{ itemDis.score / 100 }}</span>
                                    {{ $t("message.RESOURCE.points") }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="!tabDiscussions" class="Discussions_Detail">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="discussData.title"
                        placement="top"
                    >
                        <h2 class="detailTitle">
                            {{ discussData.title }}
                        </h2>
                    </el-tooltip>
                    <div v-if="discussData.content" class="detail-descrip">
                        {{ transfHtml(discussData.content) }}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Quizzes" name="third">
                <div v-if="tabQuizzes" class="table-a">
                    <ul>
                        <li
                            v-for="(itemQui, indexs) in dataDetail"
                            :key="indexs"
                            @click="getListDetail(itemQui.id, 3)"
                        >
                            <div>
                                <span class="table-a-l">
                                    <i class="iconfont icon--xiugaineirong" />
                                </span>
                                <p class="table-a-t">
                                    <a href="javascript:;">{{
                                        itemQui.title
                                    }}</a>
                                </p>
                                <p class="table-a-c">
                                    {{ itemQui.questionCount }}
                                    <i v-if="itemQui.questionCount > 1">{{
                                        $t("message.RESOURCE.Questions")
                                    }}</i>
                                    <i v-else>{{
                                        $t("message.RESOURCE.Question")
                                    }}</i>
                                </p>
                                <span class="table-a-r">
                                    <span>{{ itemQui.score / 100 }}</span>
                                    {{ $t("message.RESOURCE.points") }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="!tabQuizzes">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="quizData.title"
                        placement="top"
                    >
                        <h2 class="detailTitle">
                            {{ quizData.title }}
                        </h2>
                    </el-tooltip>
                    <p class="table-a-p">
                        {{ $t("message.RESOURCE.Max_attemps") }}
                        {{ quizData.attemptNumber }}
                        <!-- sonvalue.resource.attemptNumber -->
                    </p>
                    <h3 class="quize_Detail_type">
                        {{ $t("message.RESOURCE.Questions") }}
                    </h3>
                    <el-divider />
                    <div class="quize_Detail_con">
                        <div
                            v-for="(item, index) in quizData.quizItemVOs"
                            :key="index"
                            class="quize_Detail_list"
                        >
                            <h3>{{ item.seq }}.</h3>
                            <div class="quize_Detail_list_right">
                                <p class="quize_Detail_list_p1">
                                    <b class="quize_Detail_list_tit">
                                        {{ item.question.title }}
                                    </b>
                                </p>
                                <p class="quize_Detail_list_p2">
                                    {{ transfHtml(item.question.content) }}
                                </p>
                                <div
                                    v-for="(items, indexs) in item.question
                                        .options"
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
                                        ><span>{{ items.content }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getCourseItem, getListDetail } from "@/api/resourceRequst";

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
            activeName: "first",
            tabAssignment: true,
            tabDiscussions: true,
            tabQuizzes: true,
            assignmentDataList: "",
            discussionsDataList: "",
            quizesDataList: "",
            resId: "",
            dataDetail: "",
            listItemDetail: "",
            assignmentData: "",
            discussData: "",
            quizData: ""
        };
    },
    computed: {},
    watch: {
        sonvalue: {
            handler() {
                this.assignmentDataList = this.sonvalue.resource.assignments.items;
                this.discussionsDataList = this.sonvalue.resource.discussions.items;
                this.quizesDataList = this.sonvalue.resource.quizes.items;
            },
            immediate: true
        }
    },
    created() {
        // this.getResDetail()
    },
    mounted() {
        this.resId = this.$route.query.originId;
    },

    methods: {
        transfHtml(str) {
            const dd = str.replace(/<\/?.+?>/g, "");
            let dds = dd;
            dds = dds.replace(/&nbsp;/, " ");
            return dds;
        },
        handleClick(tab) {
            const tabs = tab;
            if (Number(tabs.index) === 0) {
                this.tabAssignment = true;
                this.getCourseItem(1, this.resId);
            } else if (Number(tabs.index) === 1) {
                this.tabDiscussions = true;
                this.getCourseItem(2, this.resId);
            } else if (Number(tabs.index) === 2) {
                this.tabQuizzes = true;
                this.getCourseItem(3, this.resId);
            } else {
                return false;
            }
            return true;
        },
        async getCourseItem(originType, originId) {
            const params = { resourceId: originId, originType };
            const res = await getCourseItem(params);
            if (Number(res.data.code) === 200) {
                this.dataDetail = res.data.entity;
                this.assignmentDataList = res.data.entity;
            }
        },
        async getListDetail(item, originType) {
            const params = {
                resourceId: Number(this.resId),
                originType,
                originId: Number(item)
            };
            const res = await getListDetail(params);
            if (Number(res.data.code) === 200) {
                this.listItemDetail = res.data.entity;
                if (originType === 1) {
                    this.tabAssignment = !this.tabAssignment;
                    this.assignmentData = res.data.entity;
                } else if (originType === 2) {
                    this.tabDiscussions = !this.tabDiscussions;
                    this.discussData = res.data.entity;
                } else if (originType === 3) {
                    this.tabQuizzes = !this.tabQuizzes;
                    this.quizData = res.data.entity;
                    // console.log('quizData', this.quizData);
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.table-a ul {
    border-radius: 5px;
    width: 800px;
    border: 1px solid #cccccc;
}
.table-a ul {
    border: 1px solid #cccccc;
}
.table-a ul li {
    width: 100%;
    border-bottom: 1px solid #cccccc;
    padding: 8px 0;
    // height: 50px;
}
.table-a ul li:last-child {
    border-bottom: none;
}
.table-a ul li div {
    border: 0;
    position: relative;
    padding-left: 35px;
}
.table-a ul div .table-a-l {
    position: absolute;
    left: 10px;
    top: 12px;
    color: #0138b1;
}
.table-a ul div .table-a-l1 {
    position: absolute;
    left: 10px;
    top: 0px;
    color: #0138b1;
}
.table-a ul div .table-a-t {
    margin-top: 5px;
    color: #0138b1;
}
.table-a ul div .table-a-t1 {
    // margin-top: 15px;
    color: #0138b1;
}
.table-a ul div .table-a-t a {
    display: inline-block;
    color: #0138b1;
    width: 90%;
    color: #0138b1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.table-a ul div .table-a-t1 a {
    display: inline-block;
    width: 90%;
    color: #0138b1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-item {
    display: inline-block;
    width: 90%;
    color: #0138b1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 16px;
    vertical-align: sub;
    text-decoration: underline !important;
}
.table-a ul div .table-a-c {
    color: #cccccc;
}
.table-a ul div .table-a-r {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #cccccc;
}
.table-a ul div .table-a-r1 {
    position: absolute;
    right: 10px;
    top: 0px;
    color: #ccc;
}
.assignmentList_Detail p {
    margin-top: 10px;
}
.assignmentList_Detail div {
    width: 80%;
    margin-top: 15px;
}
.Discussions_Detail div {
    width: 80%;
    margin-top: 15px;
}
.quize_Detail_list {
    display: flex;
    margin-bottom: 45px;
}
.quize_Detail_list_p1 {
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
}
.quize_Detail_type {
    margin-top: 20px;
}
.quize_Detail_title {
    margin-top: 20px;
}
.table-a-p {
    margin-top: 15px;
}
/deep/ .el-tabs__nav-wrap::after {
    height: 1px !important;
}
/deep/ .el-tabs__active-bar {
    height: 3px !important;
}
.detailTitle {
    color: #333333;
    font-size: 20px;
    margin: 10px 0 20px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4 !important;
}
.detail-text {
    margin-bottom: 10px;
    font-size: 14px;
}
.detail-title {
    color: #333;
}
.detail-num {
    color: #666;
}
.detail-descrip {
    color: #666;
    white-space: normal;
    word-break: break-all;
}
</style>
