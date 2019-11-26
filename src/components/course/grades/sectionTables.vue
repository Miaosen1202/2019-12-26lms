<template>
    <!--eslint-disable-->
    <div class="table-page">
        <!--1-->
        <div class="table-date">
            <h2>{{ $t("message.Grade_Parcitipation_date") }}</h2>
            <el-table
                :data="polarShow"
                border
                :header-cell-style="getRowClass"
                style="width: 100%"
            >
                <el-table-column
                    prop="time"
                    :label="$t('message.Grade_Time')"
                    align="center"
                    width="180"
                />
                <el-table-column
                    prop="diss"
                    :label="$t('message.Grade_Comments')"
                    align="center"
                />
                <el-table-column
                    prop="quiz"
                    :label="$t('message.Grade_Quize')"
                    align="center"
                />
                <el-table-column
                    prop="assgin"
                    :label="$t('message.Grade_Assignments')"
                    align="center"
                />
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next,jumper"
                :page-size="6"
                :total="totalPage1"
                class="pagination"
                @current-change="handleCurrentChange"
            />
        </div>
        <!--2-->
        <div class="table-submissions">
            <h2>{{ $t("message.Grade_Status_Submissions") }}</h2>
            <el-table
                :data="scoresShow"
                border
                :header-cell-style="getRowClass"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    :label="$t('message.Grade_Mission_Name')"
                    align="center"
                />
                <el-table-column
                    prop="ot"
                    :label="$t('message.Grade_On_Time')"
                    align="center"
                />
                <el-table-column
                    prop="lt"
                    :label="$t('message.Grade_Late')"
                    align="center"
                />
                <el-table-column
                    prop="ms"
                    :label="$t('message.Grade_Missing')"
                    align="center"
                />
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next,jumper"
                :page-size="6"
                :total="totalPage2"
                class="pagination"
                @current-change="handleSubmissions"
            />
        </div>
        <!--3-->
        <div class="table-scores">
            <h2>
                {{ $t("message.Grade_Scores_Letter")
                }}{{ $t("message.Grade_person_time") }}
            </h2>
            <el-table
                :data="scoresOptionList.data"
                border
                :header-cell-style="getRowClass"
                style="width: 100%"
            >
                <el-table-column
                    prop="letter1"
                    :label="$t('message.Grade_Letter_Scores')"
                    align="center"
                />
                <el-table-column
                    prop="num1"
                    :label="$t('message.Grade_Amounts')"
                    align="center"
                />
                <el-table-column
                    prop="letter2"
                    :label="$t('message.Grade_Letter_Scores')"
                    align="center"
                />
                <el-table-column
                    prop="num2"
                    :label="$t('message.Grade_Amounts')"
                    align="center"
                />
            </el-table>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { formatDate } from "@/utils/date";
import gradeBookPub from "@/utils/gradeBookPub";

export default {
    filters: {
        formatDate(time) {
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    props: ["sectionId"],
    data() {
        return {
            polarList: [],
            polarShow: [],
            scoresList: [],
            scoresShow: [],
            stackList: [],
            noData: "",
            polarList: {}, // 图表 1 数据
            participateList: [],
            timeList: [],
            participateTime: [],
            stackOptionList: {}, // 图表 2 数据
            stackList: [],
            scoresOptionList: {
                // 图表 4 数据
                scoresStaus: ""
            },
            courseId: "",
            totalPage1: 0,
            totalPage2: 0
        };
    },
    watch: {
        sectionId(newVal, oldVal) {
            if (newVal) {
                this.getParticipate();
                this.getSubmissionList();
                this.getPercentScore();
            }
        }
    },
    mounted() {
        this.courseId = this.$route.query.courseId;
        // 第一个图表
        this.getParticipate();
        // 第二个图表
        this.getSubmissionList();
        // 第4个图表
        this.getPercentScore();
    },
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return "background:#fafafa;color:#000";
            }
            return "";
        },
        handleCurrentChange(val) {
            this.polarShow = this.polarList.data.slice((val - 1) * 6, val * 6);
        },
        handleSubmissions(val) {
            // console.log(`当前页: ${val}`);
            this.scoresShow = this.stackOptionList.data.slice(
                (val - 1) * 6,
                val * 6
            );
        },
        sortNumber(a, b) {
            return a - b;
        },
        async getParticipate() {
            if (this.sectionId) {
                this.polarList.timeList = [];
                this.polarList.data = [];
                this.polarList.numList = [];
                const res = await this.$getData(
                    "/section/participate/query",
                    { courseId: this.courseId, sectionId: this.sectionId },
                    "get"
                );
                this.participateList = res.data.entity;
                // console.log('getParticipate',this.participateList)
                this.participateTime = [];
                let arr;
                this.participateList.forEach(el => {
                    el.userParticipateList.forEach(item => {
                        this.participateTime.push(item.createTime);
                        this.participateTime.sort(this.sortNumber);
                    });
                });
                this.participateTime.forEach(el => {
                    const date = new Date(el);
                    const newDate = formatDate(date, "yyyy-MM-dd");
                    this.polarList.timeList.push(newDate);
                    arr = new Set(this.polarList.timeList);
                    this.polarList.timeList = Array.from(arr);
                    // console.log(this.polarList);
                });
                this.polarList.timeList.forEach(el => {
                    this.polarList.data.push({
                        time: el,
                        assgin: 0,
                        diss: 0,
                        quiz: 0,
                        total: 0,
                        assgins: [],
                        statistics: []
                    });
                });
                this.participateList.forEach(el => {
                    el.userParticipateList.forEach(item => {
                        const date = new Date(item.createTime);
                        const newDate = formatDate(date, "yyyy-MM-dd");
                        this.polarList.data.forEach(ele => {
                            if (ele.time == newDate) {
                                ele.assgins.push({
                                    name: item.targetName,
                                    id: item.originId,
                                    type: item.originType,
                                    num: 0
                                });
                                // ele.statistics = gradeBookPub.uniqObjInArray(ele.assgins)
                                if (item.originType == 1) {
                                    ele.assgin += 1;
                                } else if (item.originType == 2) {
                                    ele.diss += 1;
                                } else if (item.originType == 3) {
                                    ele.quiz += 1;
                                }
                            }

                            ele.total = ele.assgin + ele.diss + ele.quiz;
                        });
                    });
                });
                this.polarList.data.forEach(el => {
                    el.statistics = gradeBookPub.uniqObjInArray(
                        el.assgins,
                        arrObj => {
                            arrObj.id;
                        }
                    );
                    this.polarList.numList.push(el.total);
                    el.statistics.forEach(ele => {
                        ele.num = 0;
                        el.assgins.forEach(item => {
                            if (ele.id == item.id && ele.type == item.type) {
                                ele.num += 1;
                            }
                        });
                    });
                });
                this.participateList.length == 0
                    ? (this.noData = this.$t("message.Grade_No_Data"))
                    : (this.noData = "");
                // console.log(this.polarList)
                this.polarShow = this.polarList.data.slice(0, 6);
                this.totalPage1 = this.polarList.data.length;
            }
        },
        async getSubmissionList() {
            if (this.sectionId) {
                const res = await this.$getData(
                    "/section/submissionSummary/query",
                    { courseId: this.courseId, sectionId: this.sectionId },
                    "get"
                );
                this.stackOptionList.mission = [];
                this.stackOptionList.data = [];
                this.stackOptionList.onTime = [];
                this.stackOptionList.late = [];
                this.stackOptionList.miss = [];
                this.stackOptionList.onTimeNum = [];
                this.stackOptionList.lateNum = [];
                this.stackOptionList.missNum = [];
                this.stackList = res.data.entity;
                const allData = [];
                const now = new Date().getTime();
                this.stackList.forEach(el => {
                    // isOverdue 0.ontime 1.late
                    el.submitGradeQuery.forEach(item => {
                        if (item.isOverdue == 0) {
                            this.stackOptionList.mission.push(el.id);
                        } else if (item.isOverdue == 1) {
                            this.stackOptionList.mission.push(el.id);
                        } else if (now > item.endTime) {
                            this.stackOptionList.mission.push(el.id);
                        }
                    });
                });
                this.stackOptionList.mission = Array.from(
                    new Set(this.stackOptionList.mission)
                );
                this.stackOptionList.mission.forEach((el, index) => {
                    let allNum = 0;
                    let onTime = 0;
                    let late = 0;
                    let miss = 0;
                    let onTimePer = 0;
                    let latePer = 0;
                    let missPer = 0;
                    // this.stackList.forEach(ele => {
                    const ele = this.stackList.find(ele => ele.id == el);
                    if (ele) {
                        const assginObj = {
                            name: ele.title,
                            id: ele.id,
                            ot: "",
                            lt: "",
                            ms: ""
                        };
                        ele.submitGradeQuery.forEach(item => {
                            if (item.isOverdue == 0) {
                                allNum += 1;
                                onTime += 1;
                                this.stackOptionList.data.push(assginObj);
                            } else if (item.isOverdue == 1) {
                                allNum += 1;
                                late += 1;
                                this.stackOptionList.data.push(assginObj);
                            } else if (now > item.endTime) {
                                allNum += 1;
                                miss += 1;
                                this.stackOptionList.data.push(assginObj);
                            }
                        });
                    }
                    // })
                    this.stackOptionList.data = gradeBookPub.uniqObjInArray(
                        this.stackOptionList.data,
                        arrObj => arrObj.id
                    );
                    onTimePer = Math.floor((onTime / allNum) * 10000) / 100;
                    latePer = Math.floor((late / allNum) * 10000) / 100;
                    missPer = Math.floor((miss / allNum) * 10000) / 100;
                    this.stackOptionList.onTime.push(onTimePer);
                    this.stackOptionList.late.push(latePer);
                    this.stackOptionList.miss.push(missPer);
                    this.stackOptionList.onTimeNum.push(onTime);
                    this.stackOptionList.lateNum.push(late);
                    this.stackOptionList.missNum.push(miss);
                });
                this.stackOptionList.data.forEach((el, index) => {
                    el.ot =
                        this.stackOptionList.onTimeNum[index] == 0
                            ? "--"
                            : `${this.stackOptionList.onTimeNum[index]}/${this.stackOptionList.onTime[index]}%`;
                    el.lt =
                        this.stackOptionList.lateNum[index] == 0
                            ? "--"
                            : `${this.stackOptionList.lateNum[index]}/${this.stackOptionList.late[index]}%`;
                    el.ms =
                        this.stackOptionList.missNum[index] == 0
                            ? "--"
                            : `${this.stackOptionList.missNum[index]}/${this.stackOptionList.miss[index]}%`;
                });

                this.stackList.length == 0
                    ? (this.noData = this.$t("message.Grade_No_Data"))
                    : (this.noData = "");
                // console.log(this.stackOptionList)
                this.scoresShow = this.stackOptionList.data.slice(0, 6);
                this.totalPage2 = this.stackOptionList.data.length;
            }
        },
        async getPercentScore() {
            if (this.sectionId) {
                const res = await this.$getData(
                    "/section/percentScore/query",
                    { courseId: this.courseId, sectionId: this.sectionId },
                    "get"
                );
                this.scoresOptionList.scoresNum = [];
                this.scoresOptionList.data = [];
                this.scoresList = res.data.entity;
                let a = 0;
                let ab = 0;
                let ba = 0;
                let b = 0;
                let bb = 0;
                let cb = 0;
                let c = 0;
                let cc = 0;
                let dc = 0;
                let d = 0;
                let dd = 0;
                let f = 0;
                let getScores = 0;
                let allScores = 0;
                this.scoresList.forEach(el => {
                    if (el.isIncludeGrade != 0) {
                        getScores += el.gradeScore;
                        allScores += el.score;
                        if (el.percent * 100 <= 100 && el.percent * 100 >= 94) {
                            a += 1;
                        } else if (
                            el.percent * 100 < 94 &&
                            el.percent * 100 >= 90
                        ) {
                            ab += 1;
                        } else if (
                            el.percent * 100 < 90 &&
                            el.percent * 100 >= 87
                        ) {
                            ba += 1;
                        } else if (
                            el.percent * 100 < 87 &&
                            el.percent * 100 >= 84
                        ) {
                            b += 1;
                        } else if (
                            el.percent * 100 < 84 &&
                            el.percent * 100 >= 80
                        ) {
                            bb += 1;
                        } else if (
                            el.percent * 100 < 80 &&
                            el.percent * 100 >= 77
                        ) {
                            cb += 1;
                        } else if (
                            el.percent * 100 < 77 &&
                            el.percent * 100 >= 74
                        ) {
                            c += 1;
                        } else if (
                            el.percent * 100 < 74 &&
                            el.percent * 100 >= 70
                        ) {
                            cc += 1;
                        } else if (
                            el.percent * 100 < 70 &&
                            el.percent * 100 >= 67
                        ) {
                            dc += 1;
                        } else if (
                            el.percent * 100 < 67 &&
                            el.percent * 100 >= 64
                        ) {
                            d += 1;
                        } else if (
                            el.percent * 100 < 64 &&
                            el.percent * 100 >= 61
                        ) {
                            dd += 1;
                        } else if (
                            el.percent * 100 < 61 &&
                            el.percent * 100 >= 0
                        ) {
                            f += 1;
                        }
                    }
                });
                this.scoresOptionList.data.push(
                    {
                        letter1: "A",
                        num1: a,
                        letter2: "C",
                        num2: c
                    },
                    {
                        letter1: "A-",
                        num1: ab,
                        letter2: "C-",
                        num2: cc
                    },
                    {
                        letter1: "B+",
                        num1: ba,
                        letter2: "D+",
                        num2: dc
                    },
                    {
                        letter1: "B",
                        num1: b,
                        letter2: "D",
                        num2: d
                    },
                    {
                        letter1: "B-",
                        num1: bb,
                        letter2: "D-",
                        num2: dd
                    },
                    {
                        letter1: "C+",
                        num1: cb,
                        letter2: "F",
                        num2: f
                    }
                );
                this.scoresOptionList.scoresStaus = gradeBookPub.getLetter(
                    ((getScores / allScores) * 100).toFixed(2)
                );
                this.scoresOptionList.scoresNum.push(
                    a,
                    ab,
                    ba,
                    b,
                    bb,
                    cb,
                    c,
                    cc,
                    dc,
                    d,
                    dd,
                    f
                );
                this.scoresList.length == 0
                    ? (this.noData = this.$t("message.Grade_No_Data"))
                    : (this.noData = "");
            }
        }
    }
};
/*eslint-disable no-new*/
</script>
<style lang="less" scoped>
.table-page {
    padding-top: 20px;
    padding-right: 2%;
    margin-bottom: 50px;
    .pagination {
        float: right;
        margin-top: 20px;
    }
    .table-date {
        overflow: hidden;
        margin-bottom: 30px;
        h2 {
            margin-bottom: 20px;
        }
    }
    .table-submissions {
        overflow: hidden;
        margin-bottom: 10px;
        h2 {
            margin-bottom: 20px;
        }
    }
    .table-scores {
        overflow: hidden;
        h2 {
            margin-bottom: 20px;
        }
    }
}
</style>
