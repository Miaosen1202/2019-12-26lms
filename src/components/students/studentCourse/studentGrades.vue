<template>
    <!--eslint-disable-->
    <div>
        <div class="stugrades-box">
            <div class="title-box">
                <h1>{{ $t("message.Grade_Task") }}</h1>
                <div style="display: inline-block;">
                    <span>{{ $t("message.for") }}</span>
                    <el-select
                        v-model="gradeselect"
                        :popper-class="discussion_select"
                        :placeholder="$t('message.Please_select')"
                        @change="stuGradeList()"
                    >
                        <el-option
                            v-for="item in stugradeselect"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>
            </div>
            <div class="stugrades-tab">
                <el-table :data="stugradeList" style="width: 100%;">
                    <el-table-column
                        prop="title"
                        :label="$t('message.Mission')"
                        align="center"
                        min-width="150"
                    >
                        <template slot-scope="scope">
                            <el-popover
                                ref="popover"
                                trigger="hover"
                                placement="bottom"
                                style="width: 400px !important;"
                            >
                                <div slot="reference" class="stugrades-title">
                                    {{ scope.row.title }}
                                </div>
                                <div class="stugrades-hover">
                                    <!--<span>{{scope.row}}</span>-->
                                    <p>
                                        {{ $t("message.Type") }}:
                                        <span class="stugrades-type">{{
                                            gradeGType[scope.row.originType]
                                        }}</span>
                                    </p>
                                    <br />
                                    <span class="stugrades-type">
                                        {{ $t("message.GRADE.DueTime") }}:
                                    </span>
                                    <p class="stugrades-time">
                                        {{
                                            scope.row.dueTime == undefined
                                                ? "--"
                                                : timestampToTimes(
                                                      scope.row.dueTime
                                                  )
                                        }}
                                    </p>
                                    <br />
                                    <span class="stugrades-type"
                                        >{{
                                            $t("message.GRADE.SubmitTime")
                                        }}:</span
                                    >
                                    <p
                                        class="stugrades-time"
                                        style="display: inline"
                                    >
                                        {{
                                            scope.row.subTime == undefined
                                                ? "--"
                                                : timestampToTimes(
                                                      scope.row.subTime
                                                  )
                                        }}
                                    </p>
                                    <!--<p><span class="stugrades-type">(or Close Time)</span></p>-->
                                    <p>
                                        <span class="stugrades-type"
                                            >{{
                                                $t(
                                                    "message.GRADE.MissionGroup"
                                                )
                                            }}:</span
                                        >{{ scope.row.missionGroup }}
                                    </p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="submissionStatus"
                        :label="$t('message.GRADE.Submission_status')"
                        align="center"
                        min-width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.submissionStatus }}</span>
                            <!--<span v-if="scope.row.subTime == null &&scope.row.dueTime[0] ==null">UnSubmit</span>
							<span v-if="scope.row.subTime && scope.row.dueTime[0] ==null"> On Time</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="submissionStatus"
                        sortable
                        :label="$t('message.GRADE.Display_Grade')"
                        align="center"
                        min-width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.showScoreTag }}</span>
                            <!--<span v-if="scope.row.subTime == null &&scope.row.dueTime[0] ==null">UnSubmit</span>
							<span v-if="scope.row.subTime && scope.row.dueTime[0] ==null"> On Time</span>-->
                        </template>
                    </el-table-column>

                    <el-table-column prop="scores" sortable align="center">
                        <template
                            slot="header"
                            slot-scope="scope"
                            style="width:400px;"
                        >
                            <el-popover trigger="hover" content="">
                                <i
                                    slot="reference"
                                    class="el-icon-question"
                                    style="font-size: 18px;"
                                />
                                <span slot="reference" style="margin: 0 8px;">
                                    {{ $t("message.Grade_Scores") }}
                                </span>
                                <div class="stugradstips">
                                    <p>
                                        {{ $t("message.GRADE.Score_mission") }}
                                        <br />
                                        {{
                                            $t("message.GRADE.A_B_score")
                                        }}l<br />
                                        {{
                                            $t("message.GRADE.Score_of_mission")
                                        }}
                                        <br />
                                    </p>
                                    <p style="margin-top: 20px;">
                                        {{
                                            $t(
                                                "message.GRADE.Score_mission_group"
                                            )
                                        }}<br />
                                        {{ $t("message.GRADE.A_Sum_Score")
                                        }}<br />
                                        {{
                                            $t(
                                                "message.GRADE.Sum_mission_group"
                                            )
                                        }}
                                    </p>
                                </div>
                            </el-popover>
                        </template>
                        <template slot-scope="scope" style="width:400px;">
                            <span slot="reference" style="margin: 0 8px;">
                                {{ scope.row.scores }}
                                {{ scope.row.gradeScore }}
                                <span v-if="!scope.row.scores">/</span>
                                {{ scope.row.gradeScoreFull }}
                            </span>
                            <el-popover
                                v-show="scope.row.includeGrade == 0"
                                trigger="hover"
                            >
                                <i
                                    slot="reference"
                                    class="el-icon-warning"
                                    style="font-size: 14px; color: #bfbfbf;"
                                />
                                <div class="stugradstips">
                                    <p>
                                        {{
                                            $t(
                                                "message.GRADE.Count_final_score"
                                            )
                                        }}
                                    </p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="byPercentLetter"
                        sortable
                        :label="$t('message.GRADE.by_percent')"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div>{{ scope.row.byPercentLetter }}%</div>
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="ranking" label="Ranking" align="center">
					</el-table-column>-->
                    <el-table-column
                        prop="gradeCount"
                        label="More Info"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-popover
                                ref="popover"
                                trigger="click"
                                placement="bottom"
                                style="width:450px !important;"
                            >
                                <div
                                    slot="reference"
                                    class="id-wrapper"
                                    style="display: inline-block;"
                                    @click="
                                        stuGradeQuery(
                                            scope.row.userId,
                                            scope.row.originType,
                                            scope.row.originId
                                        )
                                    "
                                >
                                    <i
                                        v-show="scope.row.gradeCount"
                                        class="iconfont icon-duihuakuang"
                                        style="margin: 0 10px; display: inline-block; font-size: 20px;"
                                    />
                                </div>
                                <div
                                    class="stutable-content"
                                    style="width: 400px;"
                                >
                                    <p class="stutable-content-title">
                                        {{ $t("message.ASSIGNMENT.assignment")
                                        }}<!--<span>x</span>-->
                                    </p>
                                    <ul class="stutable-content-talk">
                                        <li
                                            v-for="(item,
                                            sIndex) in stugradecontent"
                                            :key="sIndex"
                                        >
                                            <span
                                                v-if="item.content"
                                                class="student-content"
                                                :title="item.content"
                                                >{{
                                                    item.content.comments
                                                }}</span
                                            >
                                            <span v-else class="student-content"
                                                >--------</span
                                            >
                                            <label>
                                                <span v-if="item.userName">{{
                                                    item.userName
                                                }}</span>
                                                <span v-else>-------</span>
                                                <a v-if="item.createTime">{{
                                                    timestampToTimes(
                                                        item.createTime
                                                    )
                                                }}</a>
                                                <a v-else>------</a>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div />
                            </el-popover>
                            <span>{{ scope.row.gradeCount }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
export default {
    data() {
        return {
            stugradeselect: [],
            gradeselect: "",
            stugradeList: [],
            stugradecontent: [],
            courseId: this.$route.query.courseId,
            gradeGType: {
                1: this.$t("message.assignment"),
                2: this.$t("message.discussion"),
                3: this.$t("message.Quiz")
            },
            discussion_select: "discussion_select"
        };
    },
    mounted() {
        this.stuGradeselect();
        //			this.stuGradeList();
        //			this.stuGradeQuery();
    },
    methods: {
        // 学生评分筛选菜单；
        async stuGradeselect() {
            const result = await this.$getData(
                "/gradeDataQuery/userCourseQuery/query",
                "get"
            );
            if (result.data.code == 200) {
                this.stugradeselect = result.data.entity;
                this.stugradeselect.forEach(el => {
                    if (el.id == this.courseId) {
                        this.gradeselect = el.id;
                    }
                });
                // this.gradeselect = result.data.entity[0].id;
                this.stuGradeList();
            }
        },
        // 时间转换
        timestampToTimes(cjsj) {
            const date = new Date(cjsj); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
            const Y = `${date.getFullYear()}-`;
            const M = `${
                date.getMonth() + 1 < 10
                    ? `0${date.getMonth() + 1}`
                    : date.getMonth() + 1
            }-`;
            const D = `${date.getDate()} `;
            const h =
                date.getHours() < 10
                    ? `0${date.getHours()}:`
                    : `${date.getHours()}:`;
            const m =
                date.getMinutes() < 10
                    ? `0${date.getMinutes()}:`
                    : `${date.getMinutes()}:`;
            const s =
                date.getSeconds() < 10
                    ? `0${date.getSeconds()}`
                    : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        // 学生评分列表；
        async stuGradeList() {
            const params = {
                courseId: this.gradeselect
            };
            const result = await this.$getData(
                "/gradeDataQuery/myGradeBook/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.stugradeList = result.data.entity.modelList;
                this.stugradeList.push({
                    title: "total",
                    scores: result.data.entity.totalScores,
                    byPercentLetter: result.data.entity.totalPercent
                });
                console.log(this.stugradeList);
            }
        },
        // 学生评分列表；
        async stuGradeQuery(userId, originType, originId) {
            const params = {
                originType,
                originId,
                userId
            };

            const result = await this.$getData(
                "/gradeDataQuery/gradedCommentDataQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.stugradecontent = result.data.entity;
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped="" lang="less">
.stugrades-tab .el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #fafafa !important;
    color: #333333ab;
    font-weight: 600 !important;
}
.stugrades-box {
    width: 96%;
}

.title-box {
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 28px 2% 28px 0;
    border-bottom: 6px solid #eee;
    h1 {
        font-size: 30px;
        color: #333;
        line-height: 1;
        font-weight: normal;
        display: inline-block;
    }
    span {
        margin-left: 100px;
        font-size: 16px;
    }
    .grade-btn {
        float: right;
    }
}

.stugrades-tab {
    margin-top: 40px;
    .stugrades-tab-mun {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        display: inline-block;
        border: 2px solid #ff0000;
    }
    .has-gutter .gutter {
        display: none !important;
    }
}

.student-content {
    width: 36%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.stutable-box {
    table {
        border-collapse: collapse;
        width: 100%;
    }
    table,
    td {
        /*height: 60px;*/
        border: 1px solid #cccccc;
        padding: 2px 20px;
    }
    th {
        background: #dbedff;
        border: 1px solid #cccccc;
    }
}

.stutable-content-title {
    border-bottom: 1px solid #ccc;
    padding-bottom: 6px;
    margin-bottom: 12px;
    span {
        display: inline-block;
        float: right;
        color: #ff0000;
        margin-left: 30%;
        padding-right: 20px;
    }
}

.stutable-content-talk li {
    span {
        /*width: 50%;*/
        display: inline-block;
        /*margin-right: 40px;*/
    }
    label {
        width: 60%;
        display: inline-block;
        text-align: left;
        float: right;
        span {
            margin: 0 10px;
        }
        a {
        }
    }
}
.el-popper {
    width: 400px;
}
.stugrades-title {
    color: #0147ff;
}
.stugrades-hover {
    .stugrades-type {
        margin-right: 10px;
    }
    .stugrades-time {
        display: inline-block;
    }
}
.stugradstips p {
    color: #666666;
}
</style>
