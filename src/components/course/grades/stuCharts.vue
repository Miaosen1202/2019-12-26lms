<template>
    <!--eslint-disable-->
    <div class="charts-page">
        <div class="handle-charts">
            <el-popover
                placement="bottom"
                :title="$t('message.Grade_partcipations_title')"
                trigger="hover"
            >
                <ul class="partcipations">
                    <li><span />{{ $t("message.Grade_posts_comment") }}</li>
                    <li><span />{{ $t("message.Grade_submits_quiz") }}</li>
                    <li>
                        <span />{{ $t("message.Grade_submits_assignment") }}
                    </li>
                </ul>
                <i slot="reference" class="iconfont icon-help" />
            </el-popover>
            <el-radio v-model="radio" label="1">
                {{ $t("message.Grade_Day") }}
            </el-radio>
            <el-radio v-model="radio" label="2">
                {{ $t("message.Grade_Week") }}
            </el-radio>
        </div>

        <!-- 图1 -->
        <div
            ref="stuCharts"
            v-loading="loadingParticipate"
            class="stu-charts"
        />
        <!-- 图2 -->
        <div v-loading="loadingSubmission" class="submission">
            <div ref="scatter" class="scatter" />
            <div ref="pie" class="pie" />
        </div>
        <!-- 图3 -->
        <div v-loading="loadingsScores" class="letter-scores">
            <div ref="scores" class="scores" />
            <div class="ave-scores">
                <el-popover
                    placement="bottom"
                    :title="$t('message.Grade_Letter_Grades')"
                    trigger="hover"
                    width="300"
                >
                    <span class="name">{{ $t("message.Grade_name") }}</span>
                    <span>{{ $t("message.Grade_Range") }}</span>
                    <hr />
                    <ul class="scores-tab">
                        <li v-for="(el, index) in scoresTab" :key="index">
                            <span>{{ el.code }}</span>
                            <span><&nbsp;{{ el.rangeEnd }}</span>
                            <span>to&nbsp;{{ el.rangeStart }}</span>
                        </li>
                    </ul>
                    <i slot="reference" class="iconfont icon-help" />
                </el-popover>
                <span class="num">{{ scoresOptionList.scoresStaus }}</span>
                <h2 style="width:140px;font-size: 19px;">
                    {{ $t("message.Grade_all_missions") }}
                </h2>
            </div>
        </div>
        <p style="width:100%;margin-left: 7.5%;">
            {{ $t("message.Grade_Student_Score") }}
        </p>
    </div>
    <!--eslint-disable no-new-->
</template>
<script>
/*eslint-disable*/
import { formatDate } from "@/utils/date";
import gradeBookPub from "@/utils/gradeBookPub";

export default {
    props: ["uid"],
    data() {
        return {
            sectionValue: "",
            stuCharts: null,
            radio: "1",
            scatter: null,
            pie: null,
            scores: null,
            noData: "",
            noData2: "",
            polarList: {}, // 图表 1 数据
            participateList: [],
            timeList: [],
            participateTime: [],
            submissionList: [], // 图表 2 数据
            missionOptionList: {},
            scoresOptionList: {
                // 图表 4 数据
                scoresStaus: ""
            },
            scoresList: [],
            scoresTab: [],
            polar: {},
            scatterOption: {},
            pieOption: {},
            scoresOption: {},
            courseId: "",
            loadingParticipate: true,
            loadingSubmission: true,
            loadingsScores: true,
            scoresTabCode: []
            // polarName:
        };
    },
    computed: {
        polarName() {
            return this.$t("message.Grade_Percent");
        }
    },
    watch: {
        radio(newVal, oldVal) {
            this.getUserParticipate();
        },
        uid(newVal, oldVal) {
            if (newVal) {
                this.getUserParticipate();
                this.getUserSubmission();
                this.getUserScore();
            }
        }
    },
    mounted() {
        this.userId = this.uid || this.$route.query.uid;
        this.courseId = this.$route.query.courseId;
        this.parcitipation();
        // 第一个表
        this.getUserParticipate();
        // 第2个表
        // 第3个表
        this.getUserSubmission();
        // 第4个表
        this.getUserScore();
        this.gradeSchemeList();
    },
    methods: {
        parcitipation() {
            const _this = this;
            this.stuCharts = this.$echarts.init(this.$refs.stuCharts);
            this.stuCharts.setOption(this.polar);
            this.stuCharts.resize();
            this.scatter = this.$echarts.init(this.$refs.scatter);
            this.scatter.setOption(this.scatterOption);
            this.scatter.resize();
            this.pie = this.$echarts.init(this.$refs.pie);
            this.pie.setOption(this.pieOption);
            this.pie.resize();
            this.scores = this.$echarts.init(this.$refs.scores);
            this.scores.setOption(this.scoresOption);
            this.scores.resize();

            window.addEventListener("resize", () => {
                _this.stuCharts.resize();
            });
        },
        sortNumber(a, b) {
            return a - b;
        },
        getMonday(d) {
            d = new Date(d);
            const day = d.getDay();
            const diff = d.getDate() - day + (day == 0 ? -6 : 1);
            const dataMon = new Date(d.setDate(diff));
            const dataSun = new Date(d.setDate(diff + 6));
            // console.log(d.setDate(diff))
            return `${formatDate(dataMon, "yyyy-MM-dd")} ~ ${formatDate(
                dataSun,
                "yyyy-MM-dd"
            )}`;
        },
        async getUserParticipate() {
            this.polarList.timeList = [];
            this.polarList.data = [];
            this.polarList.assgin = [];
            this.polarList.numList = [];
            let interval = 5;
            this.radio == 1 ? (interval = 5) : 1;
            const res = await this.$getData(
                "/user/participate/query",
                {
                    courseId: this.courseId,
                    userId: this.uid || this.$route.query.uid
                },
                "get"
            );
            this.participateList = res.data.entity;
            this.loadingParticipate = false;
            this.participateTime = [];
            let arr;
            this.participateList.forEach(el => {
                this.participateTime.push(el.createTime);
                this.participateTime.sort(this.sortNumber);
            });
            this.participateTime.forEach(el => {
                if (this.radio == 1) {
                    const date = new Date(el);
                    const newDate = formatDate(date, "yyyy-MM-dd");
                    this.polarList.timeList.push(newDate);
                } else if (this.radio == 2) {
                    const weekDate = this.getMonday(new Date(el));
                    this.polarList.timeList.push(weekDate);
                }
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
                // el.userParticipateList.forEach((item) => {
                const date = new Date(item.createTime);
                const newDate = formatDate(date, "yyyy-MM-dd");
                this.polarList.data.forEach(ele => {
                    if (this.radio == 1) {
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
                    } else if (this.radio == 2) {
                        if (
                            this.getMonday(new Date(item.createTime)) ==
                            ele.time
                        ) {
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
                    }
                    ele.total = ele.assgin + ele.diss + ele.quiz;
                });
                // })
            });
            this.polarList.data.forEach(el => {
                this.polarList.numList.push(el.total);
                this.polarList.assgin = this.polarList.assgin.concat(
                    el.participation
                );
            });
            console.log(this.polarList);
            this.participateList.length == 0
                ? (this.noData = this.$t("message.Grade_No_Data"))
                : (this.noData = "");
            let startNum;
            let endNum;
            if (this.polarList.timeList.length > 10) {
                startNum = 30;
                endNum = 70;
            } else {
                startNum = 0;
                endNum = 100;
            }
            this.stuCharts.setOption({
                graphic: {
                    type: "text",
                    style: {
                        text: this.noData,
                        x: 500,
                        y: 200
                    }
                },
                tooltip: {
                    trigger: "axis",
                    confine: true,
                    position(point, params, dom, rect, size) {
                        // point: 鼠标位置
                        const tipHeight = point[1] + size.contentSize[1]; // contentSize: 提示dom 窗口大小
                        if (tipHeight > size.viewSize[1]) {
                            // viewSize: echarts 容器大小
                            return [
                                point[0] + 40,
                                point[1] - size.contentSize[1]
                            ];
                        }
                        if (point[1] < size.contentSize[1]) {
                            return [point[0] + 40, point[1] + 20];
                        }
                        return point;
                    },
                    backgroundColor: "rgba(245, 245, 245, 0.8)",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    textStyle: {
                        color: "#000"
                    },
                    extraCssText: "min-width: 300px",
                    formatter: (param, ticket, cb) => {
                        param = param[0];
                        let assgin;
                        this.polarList.data.forEach(ele => {
                            if (ele.time == param.name) {
                                assgin = ele.participation.map(
                                    el =>
                                        `<p style="line-height:30px;"><span style="display:inline-block;border:4px #333 solid;border-radius:50%;margin-right:6px;"></span> ${el.name}</p>`
                                );
                            }
                        });
                        return [
                            `${param.name}<hr size=1 style="margin: 3px 0">`,
                            assgin.join("")
                        ].join("");
                    }
                },
                dataZoom: [
                    {
                        id: "dataZoomX",
                        type: "slider",
                        xAxisIndex: [0],
                        filterMode: "filter",
                        start: startNum,
                        end: endNum
                    }
                ],
                xAxis: {
                    type: "category",
                    data: this.polarList.timeList,
                    splitNumber: 20,
                    min: "dataMin",
                    max: "dataMax",
                    axisLabel: {
                        interval
                    }
                },
                yAxis: {
                    name: this.$t("message.Parcitipation"),
                    nameTextStyle: {
                        color: "#657c97",
                        padding: [5, 0, 10, 16],
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 600
                    },
                    type: "value",
                    splitNumber: 3,
                    data: [2, 4, 6]
                },
                series: [
                    {
                        type: "bar",
                        data: this.polarList.numList,
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                color: "#0e38b1"
                            }
                        }
                    }
                ]
            });
        },
        async getUserSubmission() {
            const res = await this.$getData(
                "/user/submissionSummary/query",
                {
                    courseId: this.courseId,
                    userId: this.uid || this.$route.query.uid
                },
                "get"
            );
            const timeList = [];
            let status;
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
            this.loadingSubmission = false;
            let allNum = 0;
            let onTime = 0;
            let late = 0;
            let miss = 0;
            let onTimePer = 0;
            let latePer = 0;
            let missPer = 0;
            this.submissionList.forEach(el => {
                timeList.push(el.submitTime || el.endTime);
                timeList.sort(this.sortNumber);
                // console.log(timeList)
                const missionArr = [
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
                    el.isGraded ? `${el.gradeScore} out of ${el.score}` : "+"
                ];
                if (el.isOverdue == 0) {
                    allNum += 1;
                    onTime += 1;
                    status = this.$t("message.On_Time");
                    this.missionOptionList.mission.push(missionArr);
                } else if (el.isOverdue == 1) {
                    allNum += 1;
                    late += 1;
                    status = this.$t("message.Late_Late");
                    this.missionOptionList.mission.push(missionArr);
                } else {
                    const now = new Date().getTime();
                    if (now > el.endTime) {
                        allNum += 1;
                        miss += 1;
                        status = this.$t("message.Missing");
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
            // console.log(onTime, late, miss, allNum)
            timeList.forEach(el => {
                const date = new Date(el);
                const newDate = formatDate(date, "yyyy-MM-dd hh:mm");
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
            console.log(this.missionOptionList);
            this.missionOptionList.mission.length == 0
                ? (this.noData2 = this.$t("message.Grade_No_Data"))
                : (this.noData2 = "");

            let startNum;
            let endNum;
            if (this.missionOptionList.mission.length > 12) {
                startNum = 30;
                endNum = 70;
            } else {
                startNum = 0;
                endNum = 100;
            }
            this.scatter.setOption({
                graphic: {
                    type: "text",
                    style: {
                        text: this.noData2,
                        x: 500,
                        y: 200
                    }
                },
                color: ["#55c21f", "#f7f031", "#f13026"],
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(245, 245, 245, 0.8)",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    textStyle: {
                        color: "#000"
                    },
                    extraCssText: "min-width: 160px",
                    formatter: (param, ticket, cb) => {
                        param = param[0];
                        // console.log(param)
                        return [
                            `${
                                param.value[1]
                            }<hr size=1 style="margin: 3px 0">`,
                            `<p style="line-height:30px;"><span style="display:inline-block;border:4px #333 solid;border-radius:50%;margin-right:6px;"></span>${
                                param.value[2]
                            }</p>`
                        ].join("");
                    }
                },
                dataZoom: [
                    {
                        id: "dataZoomX",
                        type: "slider",
                        xAxisIndex: [0],
                        filterMode: "filter",
                        start: startNum,
                        end: endNum
                    }
                ],
                xAxis: {
                    type: "category",
                    name: this.$t("message.Missions"),
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: "category",
                    name: this.$t("message.Submission"),
                    nameTextStyle: {
                        color: "#657c97",
                        padding: [5, 0, 10, 0],
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 600
                    },
                    axisLabel: {
                        interval: 4,
                        formatter(value) {
                            return value
                                .split(" ")[0]
                                .split("-")
                                .slice(1, 3)
                                .join("-");
                        }
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        // 网格线
                        show: true
                    },
                    splitNumber: 30,
                    min: "dataMin",
                    max: "dataMax",
                    data: this.missionOptionList.timeList
                },
                series: [
                    {
                        name: this.$t("message.On_Time"),
                        data: this.missionOptionList.mission,
                        type: "scatter",
                        itemStyle: {
                            normal: {
                                color(params) {
                                    const colorList = [
                                        "#55c21f",
                                        "#f7f031",
                                        "#f13026"
                                    ];
                                    if (params.data[3] == "On Time") {
                                        return colorList[0];
                                    }
                                    if (params.data[3] == "Late") {
                                        return colorList[1];
                                    }
                                    if (params.data[3] == "Missing") {
                                        return colorList[2];
                                    }
                                }
                            }
                        }
                    }
                ]
            });
            if (onTimePer || latePer || missPer) {
                this.pie.setOption({
                    color: ["#55c21f", "#f7f031", "#f13026"],
                    grid: {
                        bottom: 80
                    },
                    // tooltip: {
                    //   trigger: 'item',
                    //   formatter: "{a} <br/>{b} : {c} ({d}%)"
                    // },
                    legend: {
                        orient: "vertical",
                        left: "left",
                        top: "50%",
                        data: [
                            this.$t("message.On_Time"),
                            this.$t("message.Late_Late"),
                            this.$t("message.Missing")
                        ]
                    },
                    series: [
                        {
                            name: this.$t("message.Missions"),
                            type: "pie",
                            // minAngle: 30,
                            radius: "55%",
                            center: ["66%", "60%"],
                            label: {
                                // 饼图图形上的文本标签
                                normal: {
                                    show: true,
                                    position: "inner", // 标签的位置
                                    textStyle: {
                                        fontSize: 14,
                                        color: "#fff" // 文字的字体大小
                                    },
                                    formatter: "{d}%"
                                }
                            },
                            data: [
                                {
                                    value: onTimePer || null,
                                    name: this.$t("message.On_Time")
                                },
                                {
                                    value: latePer || null,
                                    name: this.$t("message.Late_Late")
                                },
                                {
                                    value: missPer || null,
                                    name: this.$t("message.Missing")
                                }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                });
            }
        },
        async getUserScore() {
            const res = await this.$getData(
                "/user/percentScore/query",
                {
                    courseId: this.courseId,
                    userId: this.uid || this.$route.query.uid
                },
                "get"
            );
            this.scoresOptionList.scoresNum = [];
            this.scoresOptionList.data = [];
            this.scoresOptionList.datas = [];
            this.scoresList = res.data.entity;
            this.loadingsScores = false;
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
            const assginA = [];
            const assginAb = [];
            const assginBa = [];
            const assginB = [];
            const assginBc = [];
            const assginCb = [];
            const assginC = [];
            const assginCd = [];
            const assginDc = [];
            const assginD = [];
            const assginDf = [];
            const assginF = [];
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
            this.scoresOptionList.datas.push(
                { letter1: "A", num1: a, assgin: assginA },
                { letter1: "A-", num1: ab, assgin: assginAb },
                { letter1: "B+", num1: ba, assgin: assginBa },
                { letter1: "B", num1: b, assgin: assginB },
                { letter1: "B-", num1: bb, assgin: assginBc },
                { letter1: "C+", num1: cb, assgin: assginCb },
                { letter1: "C", num1: c, assgin: assginC },
                { letter1: "C-", num1: cc, assgin: assginCd },
                { letter1: "D+", num1: dc, assgin: assginDc },
                { letter1: "D", num1: d, assgin: assginD },
                { letter1: "D-", num1: dd, assgin: assginDf },
                { letter1: "F", num1: f, assgin: assginF }
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
            console.log(this.scoresOptionList);
            gradeBookPub.sum(this.scoresOptionList.scoresNum) == 0
                ? (this.noData = this.$t("message.Grade_No_Data"))
                : (this.noData = "");
            this.scores.setOption({
                graphic: {
                    type: "text",
                    style: {
                        text: this.noData,
                        x: 500,
                        y: 200
                    }
                },
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(245, 245, 245, 0.8)",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    textStyle: {
                        color: "#000"
                    },
                    extraCssText: "min-width: 300px",
                    formatter: (param, ticket, cb) => {
                        param = param[0];
                        let assgin;
                        this.scoresOptionList.datas.forEach(ele => {
                            if (ele.letter1 == param.name) {
                                assgin = ele.assgin.map(
                                    el =>
                                        `<p style="line-height:30px;"><span style="display:inline-block;border:4px #333 solid;border-radius:50%;margin-right:6px;"></span> ${
                                            el.name
                                        }<em style="float:right;margin-left:10px;">${el.gradeScore /
                                            100}/${el.score / 100}</em></p>`
                                );
                            }
                        });
                        return [
                            // param.name + '<hr size=1 style="margin: 3px 0">',
                            assgin.join("")
                        ].join("");
                    }
                },
                xAxis: {
                    type: "category",
                    name: this.$t("message.Letter_Grades"),
                    data: this.scoresTabCode
                },
                yAxis: {
                    name: this.$t("message.Scores_by_Letter"),
                    nameTextStyle: {
                        color: "#657c97",
                        padding: [5, 0, 10, 24],
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 600
                    },
                    type: "value",
                    splitNumber: 3,
                    data: [1, 3, 5]
                },
                series: [
                    {
                        type: "bar",
                        data: this.scoresOptionList.scoresNum,
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                color(params) {
                                    const colorList = [
                                        "#009d00",
                                        "#00d000",
                                        "#00ff8f",
                                        "#00d0ce",
                                        "#0067d3",
                                        "#00006b",
                                        "#986601",
                                        "#a82800",
                                        "#a8272e",
                                        "#d3220e",
                                        "#e8001f ",
                                        "#fc3434"
                                    ];
                                    return colorList[params.dataIndex];
                                }
                            }
                        }
                    }
                ]
            });
        },
        async gradeSchemeList() {
            const params = {
                data: Number(this.courseId)
            };
            const result = await this.$getData(
                "/gradeScheme/get",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                if (result.data.entity.length > 0) {
                    const data = [];
                    const dataCode = [];
                    result.data.entity.forEach(item => {
                        data.push({
                            rangeStart: `${item.rangeStart}%`,
                            rangeEnd: `${item.rangeEnd}%`,
                            code: item.code
                        });
                        dataCode.push(item.code);
                    });
                    this.scoresTab = data;
                    this.scoresTabCode = dataCode;
                } else {
                    this.scoresTab = [
                        {
                            code: "A",
                            rangeStart: "100%",
                            rangeEnd: "94%"
                        },
                        {
                            code: "A-",
                            rangeStart: "94%",
                            rangeEnd: "90%"
                        },
                        {
                            code: "B+",
                            rangeStart: "90%",
                            rangeEnd: "87%"
                        },
                        {
                            code: "B",
                            rangeStart: "87%",
                            rangeEnd: "84%"
                        },
                        {
                            code: "B-",
                            rangeStart: "84%",
                            rangeEnd: "80%"
                        },
                        {
                            code: "C+",
                            rangeStart: "80%",
                            rangeEnd: "77%"
                        },
                        {
                            code: "C",
                            rangeStart: "77%",
                            rangeEnd: "74%"
                        },
                        {
                            code: "C-",
                            rangeStart: "74%",
                            rangeEnd: "70%"
                        },
                        {
                            code: "D+",
                            rangeStart: "70%",
                            rangeEnd: "67%"
                        },
                        {
                            code: "D",
                            rangeStart: "67%",
                            rangeEnd: "64%"
                        },
                        {
                            code: "D-",
                            rangeStart: "64%",
                            rangeEnd: "61%"
                        },
                        {
                            code: "F",
                            rangeStart: "61%",
                            rangeEnd: "0%"
                        }
                    ];
                }
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable no-new*/
</script>
<style lang="less" scoped>
.charts-page {
    width: 100%;
    .stu-charts {
        width: 100%;
        height: 400px;
        margin-bottom: 80px;
        margin-left: -2.3%;
    }
    .handle-charts {
        padding-right: 10%;
        text-align: right;
        .icon-help {
            margin-right: 10px;
            vertical-align: middle;
        }
    }
    .submission {
        width: 98%;
        padding-right: 2%;
        height: 400px;
        display: flex;
        .scatter {
            width: 78%;
            height: 400px;
        }
        .pie {
            width: 20%;
            height: 400px;
        }
    }
    .letter-scores {
        width: 98%;
        padding-right: 2%;
        height: 400px;
        margin-top: 80px;
        margin-left: -0.8%;
        display: flex;
        .scores {
            width: 86%;
            height: 400px;
        }
        .ave-scores {
            width: 12%;
            height: 400px; // padding-left: 100px;
            padding-top: 100px;
            .icon-help {
                margin-left: 140px;
            }
            .num {
                display: block;
                width: 140px;
                height: 140px;
                line-height: 140px;
                text-align: center;
                color: #000;
                font-size: 26px;
                font-weight: 600;
                border-radius: 50%;
                border: #000 2px solid;
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
    }
}

.partcipations {
    li {
        line-height: 36px;
        span {
            display: inline-block;
            border-radius: 50%;
            border: 4px #666 solid;
            font-weight: 600;
            margin-right: 6px;
            vertical-align: middle;
        }
    }
}

.name {
    display: inline-block;
    margin-right: 68px;
    padding-bottom: 10px;
}

.scores-tab {
    li {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
    }
}
</style>
