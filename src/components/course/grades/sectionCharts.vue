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
                    <li>
                        <span />
                        {{ $t("message.Grade_posts_comment") }}
                    </li>
                    <li>
                        <span />
                        {{ $t("message.Grade_submits_quiz") }}
                    </li>
                    <li>
                        <span />
                        {{ $t("message.Grade_submits_assignment") }}
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
            <div ref="stack" class="scatter" />
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
            {{ $t("message.Grade_Section_Score") }}
        </p>
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
            radio: "1",
            stuCharts: null,
            stack: null,
            pie: null,
            scores: null,
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
            scoresList: [],
            scoresTab: [],
            polar: {},
            stackOption: {},
            pieOption: {},
            scoresOption: {},
            courseId: "",
            loadingParticipate: true,
            loadingSubmission: true,
            loadingsScores: true,
            scoresTabCode: []
        };
    },
    watch: {
        radio(newVal, oldVal) {
            this.getParticipate();
        },
        sectionId(newVal, oldVal) {
            // if (newVal) {
            this.getParticipate();
            this.getSubmissionList();
            this.getPercentScore();
            // }
        }
    },
    mounted() {
        this.courseId = this.$route.query.courseId;
        this.parcitipation();
        // 第一个图表
        this.getParticipate();
        // 第二个图表
        this.getSubmissionList();
        // 第4个图表
        this.getPercentScore();
        this.gradeSchemeList();
    },
    methods: {
        parcitipation() {
            const _this = this;
            this.stuCharts = this.$echarts.init(this.$refs.stuCharts);
            this.stuCharts.setOption(this.polar);
            this.stuCharts.resize();
            this.stack = this.$echarts.init(this.$refs.stack);
            this.stack.setOption(this.stackOption);
            this.stack.resize();
            this.getParticipate();
            this.pie = this.$echarts.init(this.$refs.pie);
            this.pie.setOption(this.pieOption);
            this.pie.resize();
            this.scores = this.$echarts.init(this.$refs.scores);
            this.scores.setOption(this.scoresOption);
            this.scores.resize();

            window.addEventListener("resize", () => {
                _this.stuCharts.resize();
                _this.stack.resize();
                _this.pie.resize();
                _this.scores.resize();
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
        async getParticipate() {
            if (this.sectionId) {
                this.polarList.timeList = [];
                this.polarList.data = [];
                this.polarList.numList = [];
                let interval = 5;
                this.radio == 1 ? (interval = 5) : 1;
                const res = await this.$getData(
                    "/section/participate/query",
                    { courseId: this.courseId, sectionId: this.sectionId },
                    "get"
                );
                console.time("Participate");
                this.participateList = res.data.entity;
                this.loadingParticipate = false;
                this.participateTime = [];
                let arr;
                this.participateList.forEach(el => {
                    el.userParticipateList.forEach(item => {
                        this.participateTime.push(item.createTime);
                        this.participateTime.sort(this.sortNumber);
                    });
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
                            if (this.radio == 1) {
                                if (ele.time == newDate) {
                                    ele.assgins.push({
                                        name: item.targetName,
                                        id: item.originId,
                                        type: item.originType,
                                        num: 0
                                    });
                                    // ele.statistics = gradeBookPub.uniqObjInArray(ele.assgins,(arrObj)=>{arrObj.id});
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
                                    ele.assgins.push({
                                        name: item.targetName,
                                        id: item.originId,
                                        type: item.originType,
                                        num: 0
                                    });
                                    // ele.statistics = gradeBookPub.uniqObjInArray(ele.assgins,(arrObj)=>{arrObj.id});
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
                    });
                });
                this.polarList.data.forEach(el => {
                    el.statistics = gradeBookPub.uniqObjInArray(
                        el.assgins,
                        arrObj => arrObj.id
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
                console.log(this.polarList);
                let startNum;
                let endNum;
                if (this.polarList.data.length > 10) {
                    startNum = 30;
                    endNum = 70;
                } else {
                    startNum = 0;
                    endNum = 100;
                }
                // localStorage.setItem('polarList', JSON.stringify(this.polarList))
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
                            let assgins;
                            this.polarList.data.forEach(ele => {
                                if (ele.time == param.name) {
                                    assgins = ele.statistics.map(
                                        el =>
                                            `<p style="line-height:30px;"><span style="display:inline-block;border:4px #333 solid;border-radius:50%;margin-right:6px;"></span>${el.name}<em style="float:right;margin-left:10px;">×${el.num}</em></p>`
                                    );
                                }
                            });
                            return [
                                `${param.name}<hr size=1 style="margin: 3px 0">`,
                                assgins.join("")
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
                            padding: [5, 0, 10, 0],
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
                console.time("Participate");
            }
        },
        async getSubmissionList() {
            if (this.sectionId) {
                const res = await this.$getData(
                    "/section/submissionSummary/query",
                    { courseId: this.courseId, sectionId: this.sectionId },
                    "get"
                );
                console.time("submission");
                this.stackOptionList.mission = [];
                this.stackOptionList.data = [];
                this.stackOptionList.onTime = [];
                this.stackOptionList.late = [];
                this.stackOptionList.miss = [];
                this.stackOptionList.onTimeNum = [];
                this.stackOptionList.lateNum = [];
                this.stackOptionList.missNum = [];
                this.stackList = res.data.entity;
                this.loadingSubmission = false;
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
                console.log(this.stackOptionList.mission.length);
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
                    const ele = this.stackList.find(ele => ele.id == el);
                    // this.stackList.forEach(ele => {
                    if (ele) {
                        const obj = {
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
                                this.stackOptionList.data.push(obj);
                            } else if (item.isOverdue == 1) {
                                allNum += 1;
                                late += 1;
                                this.stackOptionList.data.push(obj);
                            } else if (now > item.endTime) {
                                allNum += 1;
                                miss += 1;
                                this.stackOptionList.data.push(obj);
                            }
                        });
                    }
                    // });
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

                this.stackOptionList.data.length == 0
                    ? (this.noData = this.$t("message.Grade_No_Data"))
                    : (this.noData = "");
                console.log(this.stackOptionList);
                let startNum;
                let endNum;
                if (
                    this.stackOptionList.data.length > 20 &&
                    this.stackOptionList.data.length < 70
                ) {
                    startNum = 30;
                    endNum = 70;
                } else if (this.stackOptionList.data.length >= 70) {
                    startNum = 40;
                    endNum = 60;
                } else {
                    startNum = 0;
                    endNum = 100;
                }
                this.stack.setOption({
                    color: ["#55c21f", "#f7f031", "#f13026"],
                    graphic: {
                        type: "text",
                        style: {
                            text: this.noData,
                            x: 400,
                            y: 200
                        }
                    },
                    // legend: {
                    //     orient: "vertical",
                    //     left: "right",
                    //     padding: [0,0,0,100],
                    //     top: "50%",
                    //     data: ["On Time", "Late", "Missing"]
                    //   },
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
                            let assginName = "";
                            let ot;
                            let lt;
                            let ms;
                            let numPer;
                            this.stackOptionList.data.forEach(ele => {
                                if (param.name == ele.id) {
                                    assginName = ele.name;
                                    ot = ele.ot;
                                    lt = ele.lt;
                                    ms = ele.ms;
                                }
                            });
                            return [
                                `<p style="max-width:160px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">${assginName}</p>` +
                                    '<hr size=1 style="margin: 3px 0">',
                                `${' <p style="line-height:30px;">' +
                                    "On Time : "}${ot}</p>`,
                                `${' <p style="line-height:30px;">' +
                                    "Late : "}${lt}</p>`,
                                `${' <p style="line-height:30px;">' +
                                    "Missing : "}${ms}</p>`
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
                    yAxis: {
                        type: "value",
                        name: this.$t("message.Submission_Status"),
                        nameTextStyle: {
                            color: "#657c97",
                            padding: [5, 0, 10, 20],
                            color: "#333",
                            fontSize: 14,
                            fontWeight: 600
                        },
                        axisLabel: {
                            formatter(value) {
                                return `${value}%`;
                            }
                        }
                    },
                    xAxis: {
                        name: this.$t("message.Mission"),
                        type: "category",
                        axisLabel: {
                            show: false
                        },
                        data: this.stackOptionList.mission
                    },
                    series: [
                        {
                            name: this.$t("message.On_Time"),
                            type: "bar",
                            barWidth: 30,
                            stack: "总量",
                            data: this.stackOptionList.onTime
                        },
                        {
                            name: this.$t("message.Late_Late"),
                            type: "bar",
                            barWidth: 30,
                            stack: "总量",
                            data: this.stackOptionList.late
                        },
                        {
                            name: this.$t("message.Missing"),
                            type: "bar",
                            barWidth: 30,
                            stack: "总量",
                            data: this.stackOptionList.miss
                        }
                    ]
                });
                // 第3个图表
                let otSum;
                let ltSum;
                let msSum;
                let otPer;
                let ltPer;
                let msPer;
                let allPer;
                otSum = gradeBookPub.sum(this.stackOptionList.onTimeNum);
                ltSum = gradeBookPub.sum(this.stackOptionList.lateNum);
                msSum = gradeBookPub.sum(this.stackOptionList.missNum);
                allPer = otSum + ltSum + msSum;
                otPer = Math.floor((otSum / allPer) * 10000) / 100;
                ltPer = Math.floor((ltSum / allPer) * 10000) / 100;
                msPer = Math.floor((msSum / allPer) * 10000) / 100;
                console.log(msPer);
                console.timeEnd("submission");
                if (otPer || ltPer || msPer) {
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
                            selectedMode: false,
                            top: "50%",
                            data: [
                                this.$t("message.On_Time"),
                                this.$t("message.Late_Late"),
                                this.$t("message.Missing")
                            ]
                        },
                        series: [
                            {
                                name: "Missions",
                                type: "pie",
                                radius: "55%",
                                center: ["66%", "60%"],
                                // minAngle: 30,
                                label: {
                                    // 饼图图形上的文本标签
                                    normal: {
                                        show: true,
                                        position: "inner", // 标签的位置
                                        textStyle: {
                                            fontSize: 14, // 文字的字体大小
                                            color: "#fff"
                                        },
                                        formatter: "{d}%"
                                    }
                                },
                                data: [
                                    {
                                        value: otPer || null,
                                        name: this.$t("message.On_Time")
                                    },
                                    {
                                        value: ltPer || null,
                                        name: this.$t("message.Late_Late")
                                    },
                                    {
                                        value: msPer || null,
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
                this.scoresList.forEach(el => {
                    if (el.isIncludeGrade != 0) {
                        getScores += el.gradeScore;
                        allScores += el.score;
                        // console.log(el.score)
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
                        extraCssText: "min-width: 60px"
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
                            padding: [5, 0, 10, 10],
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
            }
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
        margin-top: 20px;
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
            width: 88%;
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
        margin-left: -0.8%;
        margin-top: 80px;
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
