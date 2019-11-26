<template>
    <div class="table-page">
        <!--eslint-disable-->
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
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('message.Grade_Participation')"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next,jumper"
                @current-change="handleCurrentChange"
                :page-size="6"
                :total="polarPage"
                class="pagination"
            >
            </el-pagination>
        </div>
        <!--2-->
        <div class="table-submissions">
            <nav>
                <h2>
                    {{ $t("message.Grade_Status_Submissions") }}
                    <span> {{ $t("message.Grade_On_Time") }}: 31 / 75% </span>
                    <span> {{ $t("message.Grade_Late") }}:12 / 19% </span>
                    <span> {{ $t("message.Grade_Missing") }}:5 / 6% </span>
                </h2>
                <p>
                    <span>- {{ $t("message.Grade_No_Submission") }}</span>
                    <span>
                        + {{ $t("message.Grade_submitted_UnGraded") }}
                    </span>
                </p>
            </nav>
            <el-table
                :data="missionShow"
                border
                :header-cell-style="getRowClass"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    :label="$t('message.Grade_Mission_Name')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    :label="$t('message.Grade_Status')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="due"
                    :label="$t('message.Grade_Due_At')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="sub"
                    :label="$t('message.Grade_Submitted_At')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="score"
                    :label="$t('message.Grade_Scores')"
                    align="center"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next,jumper"
                @current-change="handleMission"
                :page-size="6"
                :total="missionPage"
                class="pagination"
            >
            </el-pagination>
        </div>
        <!--3-->
        <div class="table-scores">
            <h2>
                {{ $t("message.Grade_Scores_Letter") }}
                <span
                    >{{ scoresList.scoresStaus }}
                    {{ $t("message.Grade_all_missions") }}</span
                >
            </h2>
            <el-table
                :data="scoresShow"
                border
                :header-cell-style="getRowClass"
                style="width: 100%"
            >
                <el-table-column
                    prop="letter1"
                    :label="$t('message.Grade_Letter_Scores')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="num1"
                    :label="$t('message.Grade_Amounts')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="letter2"
                    :label="$t('message.Grade_Letter_Scores')"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="num2"
                    :label="$t('message.Grade_Amounts')"
                    align="center"
                >
                </el-table-column>
            </el-table>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import { formatDate } from "@/utils/date";
import gradeBookPub from "@/utils/gradeBookPub";
export default {
    data() {
        return {
            polarShow: [],
            missionShow: [],
            missionPage: 0,
            polarPage: 0,
            scoresShow: [],
            noData: "",
            polarList: {}, //图表 1 数据
            participateList: [],
            timeList: [],
            participateTime: [],
            submissionList: [], //图表 2 数据
            missionOptionList: {},
            scoresOptionList: {
                //图表 4 数据
                scoresStaus: ""
            },
            scoresList: [],
            courseId: ""
        };
    },
    props: ["uid"],
    watch: {
        uid(newVal, oldVal) {
            this.getUserParticipate();
            this.getUserSubmission();
            this.getUserScore();
        }
    },
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return "background:#fafafa;color:#000";
            } else {
                return "";
            }
        },
        handleCurrentChange(val) {
            this.polarShow = this.polarList.assgin.slice(
                (val - 1) * 6,
                val * 6
            );
        },
        handleMission(val) {
            this.missionShow = this.missionOptionList.data.slice(
                (val - 1) * 6,
                val * 6
            );
        },
        sortNumber(a, b) {
            return a - b;
        },
        async getUserParticipate() {
            this.polarList.timeList = [];
            this.polarList.data = [];
            this.polarList.assgin = [];
            this.polarList.numList = [];
            let res = await this.$getData(
                "/user/participate/query",
                { courseId: this.courseId, userId: this.uid },
                "get"
            );
            this.participateList = res.data.entity;
            this.participateTime = [];
            let arr;
            this.participateList.forEach(el => {
                this.participateTime.push(el.createTime);
                this.participateTime.sort(this.sortNumber);
            });
            this.participateTime.forEach(el => {
                var date = new Date(el);
                var newDate = formatDate(date, "yyyy-MM-dd");
                this.polarList.timeList.push(newDate);
                arr = new Set(this.polarList.timeList);
                this.polarList.timeList = Array.from(arr);
            });
            this.polarList.timeList.forEach(el => {
                this.polarList.data.push({
                    time: el,
                    assgin: 0,
                    diss: 0,
                    quiz: 0,
                    total: 0,
                    participation: []
                });
            });
            this.participateList.forEach(item => {
                var date = new Date(item.createTime);
                var newDate = formatDate(date, "yyyy-MM-dd");
                this.polarList.data.forEach(ele => {
                    if (ele.time == newDate) {
                        ele.participation.push({
                            name: item.targetName,
                            time: formatDate(date, "yyyy-MM-dd hh:mm")
                        });
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
            this.polarList.data.forEach(el => {
                this.polarList.numList.push(el.total);
                this.polarList.assgin = this.polarList.assgin.concat(
                    el.participation
                );
            });
            console.log(this.polarList);
            this.participateList.length == 0
                ? (this.noData = this.$t("message.No_Data_to_be_Displayed"))
                : (this.noData = "");
            this.polarShow =
                this.polarList.assgin.length > 6
                    ? this.polarList.assgin.slice(0, 6)
                    : this.polarList.assgin;
            this.polarPage = this.polarList.assgin.length;
        },
        async getUserSubmission() {
            let res = await this.$getData(
                "/user/submissionSummary/query",
                { courseId: this.courseId, userId: this.uid },
                "get"
            );
            let timeList = [],
                status;
            this.missionOptionList.mission = [];
            this.missionOptionList.timeList = [];
            this.missionOptionList.data = [];
            this.missionOptionList.onTime = "";
            this.missionOptionList.late = "";
            this.missionOptionList.miss = "";
            this.missionOptionList.onTimeNum = "";
            this.missionOptionList.lateNum = "";
            this.missionOptionList.missNum = "";
            this.submissionList = res.data.entity;
            let allNum = 0,
                onTime = 0,
                late = 0,
                miss = 0,
                onTimePer = 0,
                latePer = 0,
                missPer = 0;
            this.submissionList.forEach(el => {
                timeList.push(el.submitTime || el.endTime);
                timeList.sort(this.sortNumber);
                var missionArr = [
                    el.id,
                    formatDate(
                        new Date(el.submitTime || el.endTime),
                        "yyyy-MM-dd hh:mm"
                    ),
                    el.title,
                    status,
                    el.limitTime
                        ? formatDate(new Date(el.limitTime), "yyyy-MM-dd hh:mm")
                        : "",
                    el.isGraded
                        ? el.gradeScore / 100 + " out of " + el.score / 100
                        : "+"
                ];
                if (el.isOverdue == 0) {
                    allNum += 1;
                    onTime += 1;
                    status = "On Time";
                    this.missionOptionList.mission.push(missionArr);
                } else if (el.isOverdue == 1) {
                    allNum += 1;
                    late += 1;
                    status = "Late";
                    this.missionOptionList.mission.push(missionArr);
                } else {
                    let now = new Date().getTime();
                    if (now > el.endTime) {
                        allNum += 1;
                        miss += 1;
                        status = "Missing";
                        this.missionOptionList.mission.push([
                            el.id,
                            formatDate(
                                new Date(el.submitTime || el.endTime),
                                "yyyy-MM-dd hh:mm"
                            ),
                            el.title,
                            status,
                            el.limitTime
                                ? formatDate(
                                      new Date(el.limitTime),
                                      "yyyy-MM-dd hh:mm"
                                  )
                                : "",
                            "-"
                        ]);
                    }
                }
            });
            onTimePer = Math.floor((onTime / allNum) * 10000) / 100;
            latePer = Math.floor((late / allNum) * 10000) / 100;
            missPer = Math.floor((miss / allNum) * 10000) / 100;
            this.missionOptionList.onTime = onTimePer;
            this.missionOptionList.late = latePer;
            this.missionOptionList.miss = missPer;
            this.missionOptionList.onTimeNum = onTime;
            this.missionOptionList.lateNum = late;
            this.missionOptionList.missNum = miss;
            timeList.forEach(el => {
                var date = new Date(el);
                var newDate = formatDate(date, "yyyy-MM-dd hh:mm");
                this.missionOptionList.timeList.push(newDate);
            });
            this.missionOptionList.timeList = Array.from(
                new Set(this.missionOptionList.timeList)
            );
            this.missionOptionList.mission = gradeBookPub.uniqObjInArray(
                this.missionOptionList.mission,
                arrObj => arrObj.id
            );
            this.missionOptionList.mission.forEach((el, index) => {
                this.missionOptionList.data.push({
                    name: el[2],
                    status: el[3],
                    due: el[4],
                    sub: el[1],
                    score: el[5]
                });
            });
            this.missionShow =
                this.missionOptionList.data.length > 6
                    ? this.missionOptionList.data.slice(0, 6)
                    : this.missionOptionList.data;
            this.missionPage = this.missionOptionList.mission.length;
            console.log(this.missionOptionList);
        },
        async getUserScore() {
            let res = await this.$getData(
                "/user/percentScore/query",
                { courseId: this.courseId, userId: this.uid },
                "get"
            );
            this.scoresOptionList.scoresNum = [];
            this.scoresOptionList.data = [];
            this.scoresList = res.data.entity;
            let a = 0,
                ab = 0,
                ba = 0,
                b = 0,
                bb = 0,
                cb = 0,
                c = 0,
                cc = 0,
                dc = 0,
                d = 0,
                dd = 0,
                f = 0,
                getScores = 0,
                allScores = 0,
                assginA = [],
                assginAb = [],
                assginBa = [],
                assginB = [],
                assginBc = [],
                assginCb = [],
                assginC = [],
                assginCd = [],
                assginDc = [],
                assginD = [],
                assginDf = [],
                assginF = [];
            this.scoresList.forEach(el => {
                if (
                    el.originType != 1 ||
                    (el.originType == 1 && el.isIncludeGrade != 0)
                ) {
                    getScores += el.gradeScore;
                    allScores += el.score;
                    if (el.percent * 100 <= 100 && el.percent * 100 >= 94) {
                        a += 1;
                        assginA.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 94 &&
                        el.percent * 100 >= 90
                    ) {
                        ab += 1;
                        assginAb.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 90 &&
                        el.percent * 100 >= 87
                    ) {
                        ba += 1;
                        assginBa.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 87 &&
                        el.percent * 100 >= 84
                    ) {
                        b += 1;
                        assginB.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 84 &&
                        el.percent * 100 >= 80
                    ) {
                        bb += 1;
                        assginBc.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 80 &&
                        el.percent * 100 >= 77
                    ) {
                        cb += 1;
                        assginCb.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 77 &&
                        el.percent * 100 >= 74
                    ) {
                        c += 1;
                        assginC.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 74 &&
                        el.percent * 100 >= 70
                    ) {
                        cc += 1;
                        assginCd.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 70 &&
                        el.percent * 100 >= 67
                    ) {
                        dc += 1;
                        assginDc.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 67 &&
                        el.percent * 100 >= 64
                    ) {
                        d += 1;
                        assginD.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (
                        el.percent * 100 < 64 &&
                        el.percent * 100 >= 61
                    ) {
                        dd += 1;
                        assginDf.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    } else if (el.percent * 100 < 61 && el.percent * 100 >= 0) {
                        f += 1;
                        assginF.push({
                            name: el.title,
                            gradeScore: el.gradeScore,
                            score: el.score
                        });
                    }
                }
            });
            this.scoresOptionList.data.push(
                { letter1: "A", num1: a, letter2: "C", num2: c },
                { letter1: "A-", num1: ab, letter2: "C-", num2: cc },
                { letter1: "B+", num1: ba, letter2: "D+", num2: dc },
                { letter1: "B", num1: b, letter2: "D", num2: d },
                { letter1: "B-", num1: bb, letter2: "D-", num2: dd },
                { letter1: "C+", num1: cb, letter2: "F", num2: f }
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
            // console.log(this.scoresOptionList.data)
            this.scoresShow = this.scoresOptionList.data;
        }
    },
    mounted() {
        this.courseId = this.$route.query.courseId;
        // 第1个表
        this.getUserParticipate();
        // 第2个表
        this.getUserSubmission();
        // 第3个表
        this.getUserScore();
    }
};
//eslint-disable
</script>
<style lang="less" scoped>
.table-page {
    padding-right: 2%;
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
        nav {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            h2 {
                span {
                    font-size: 14px;
                    color: #333;
                    margin-left: 20px;
                }
            }
            p {
                span {
                    margin-left: 20px;
                }
            }
        }
    }
    .table-scores {
        overflow: hidden;
        h2 {
            margin-bottom: 20px;
            span {
                font-size: 14px;
                color: #333;
                margin-left: 20px;
            }
        }
    }
}
</style>
