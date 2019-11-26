<template>
    <!--eslint-disable-->
    <div>
        <!--start: Batch grade 批量打分-->
        <div style="padding-bottom: 30px;" class="grade-box">
            <div class="title-box">
                <h1 @click="BackTask">
                    {{ $t("message.Back_grade") }}
                    <a
                        class="iconfont icon-ai207"
                        style="font-size: 24px; color:#666; cursor: pointer"
                    />
                </h1>
                <div class="grade-btn">
                    <el-button type="plain" @click="showGradeBook">
                        <span class="iconfont icon-wendangshezhi" />
                        {{ $t("message.Grade_Book") }}
                    </el-button>
                </div>
            </div>
            <ul class="task-list" style="border-bottom: 1px solid #eee">
                <li>
                    <div class="task-left">
                        <p class="task-left-h1">
                            {{ $t("message.Batch") }}<br />{{
                                $t("message.Grade")
                            }}
                        </p>
                        <i
                            class="iconfont"
                            style="font-size: 30px;"
                            :class="{
                                'icon-icon-edit': gradeBatch.originType == 1,
                                'icon-liaotian': gradeBatch.originType == 2,
                                'icon--xiugaineirong':
                                    gradeBatch.originType == 3
                            }"
                        />
                        <div v-if="gradeBatch" class="task-leftTitle">
                            <h1>{{ gradeBatch.originName }}</h1>
                            <ul class="tag-list tag-list1">
                                <v-time
                                    :assigns="gradeBatch.close"
                                    :users="users"
                                    :sections="sections"
                                />
                                <v-Dtime
                                    :assigns="gradeBatch.close"
                                    :users="users"
                                    :sections="sections"
                                />
                                <span
                                    v-if="gradeBatch.score"
                                    class="grad-title-size"
                                    style="border:none;"
                                    >{{ gradeBatch.score / 100 }}
                                    {{ $t("message.Pts") }}</span
                                >
                                <span
                                    v-else
                                    class="grad-title-size"
                                    style="border:none;"
                                >
                                    {{ $t("message.Pts") }}</span
                                >
                                <span class="grad-title-size">{{
                                    gradeBatch.releaseType == 1
                                        ? $t("message.individual")
                                        : $t("message.group")
                                }}</span
                                ><br />
                                <!--<span class="grad-title-size" v-show="gradeBatch.releaseType == 2">group</span>-->
                                <span
                                    v-if="gradeBatch.originType == 1"
                                    class="grad-title-size"
                                >
                                    <label style="font-weight: bold;">{{
                                        $t("message.Submission_Type")
                                    }}</label>
                                    {{ submissionType }}
                                </span>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <!--查询条件显示-->
            <div class="input-group">
                <div class="group-item">
                    <label>{{ $t("message.Submit_Status") }}</label> &nbsp;
                    <el-select
                        v-model="submitValue"
                        :placeholder="$t('message.All')"
                        class="filter-select"
                        disabled
                    >
                        <el-option
                            key="Have Submitted"
                            :label="$t('message.Have_Submitted')"
                            value="1"
                        />
                        <!--<el-option label="Submit Delayed" value="Submit Delayed" key="Submit Delayed"></el-option>
							<el-option label="Haven't Submitted" value="Haven't Submitted" key="Haven't Submitted"></el-option>
							<el-option label="Missed" value="Missed" key="Missed"></el-option>-->
                    </el-select>
                </div>
                <div class="group-item">
                    <label>{{ $t("message.Graded_Status") }}</label> &nbsp;
                    <el-select
                        v-model="statusValue"
                        :placeholder="$t('message.All')"
                        class="filter-select"
                        @change="selectStatusValue"
                    >
                        <el-option
                            v-for="item in gradesOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <div class="group-item">
                    <label>{{ $t("message.Mission_Group") }}</label> &nbsp;
                    <el-select
                        v-model="missionValue"
                        :placeholder="$t('message.All')"
                        :disabled="gradeBatch.releaseType == 1"
                        class="filter-select"
                        @change="selectMission(missionValue)"
                    >
                        <el-option
                            key="All"
                            :label="$t('message.All')"
                            value="2"
                        />
                        <el-option
                            v-for="item in groupList"
                            :key="item.id"
                            :label="item.groupName"
                            :value="item.id"
                        />
                    </el-select>
                    <span>{{ $t("message.Group_Mission") }}</span>
                </div>
                <br />
                <div style="border: 1px solid #eee; margin-top: 50px;" />
            </div>
            <div class="grade-left-box">
                <div class="contain-box">
                    <div class="group-data">
                        <!--评分人数显示-->
                        <p class="group-data-tips" style="clear: both;">
                            {{ gradeStatisticsQuery.group }}
                            {{ $t("message.group_and") }}
                            {{ gradeStatisticsQuery.students }}
                            {{ $t("message.student_s") }}
                            {{ $t("message.returned") }}
                        </p>
                        <h2>
                            <span>{{ $t("message.unG_Graded") }}</span>
                            <span class="group-data-title"
                                >{{ $t("message.Group_unSub") }}/
                                {{ $t("message.Group_Submitted") }}</span
                            >
                        </h2>
                        <h3>
                            <span
                                style="padding: 0px 40px; margin-left: -78px; display: inline-block;"
                            >
                                <label class="red">{{
                                    gradeStatisticsQuery.unG
                                }}</label>
                                /
                                <em>{{ gradeStatisticsQuery.graded }}</em>
                            </span>
                            <span>
                                <label class="red group-data-title">{{
                                    gradeStatisticsQuery.unSub
                                }}</label>
                                /
                                <em>{{ gradeStatisticsQuery.submitted }}</em>
                            </span>
                        </h3>
                    </div>
                    <div class="grad-summery">
                        <h3 style="margin-bottom: 14px">
                            {{ $t("message.Group_Summery") }}
                        </h3>
                        <div class="group-change">
                            <table>
                                <tr align="center">
                                    <th>
                                        {{
                                            $t("message.Group_Points_possible")
                                        }}
                                    </th>
                                    <th>
                                        {{ $t("message.Group_Average_Score") }}
                                    </th>
                                    <th>
                                        {{ $t("message.Group_High_Score") }}
                                    </th>
                                    <th>{{ $t("message.Group_Low_Score") }}</th>
                                    <th>
                                        {{ $t("message.Group_Total_Stu") }}.
                                    </th>
                                </tr>
                                <tr v-if="statusValue != 0" align="center">
                                    <td
                                        v-if="
                                            gradeStatisticsQuery.pointsPossible
                                        "
                                        rowspan="2"
                                    >
                                        <span v-if="gradeBatch.score">{{
                                            gradeBatch.score / 100
                                        }}</span>
                                        <span v-else>--</span>
                                    </td>
                                    <!--<span>{{gradeBatch.score/100}}</span>-->
                                    <td
                                        v-if="gradeStatisticsQuery.averageScore"
                                        rowspan="2"
                                    >
                                        <span>{{
                                            Math.floor(
                                                (gradeStatisticsQuery.averageScore *
                                                    100) /
                                                    100
                                            ) / 100
                                        }}</span>
                                    </td>
                                    <td
                                        v-if="gradeStatisticsQuery.highScore"
                                        rowspan="2"
                                    >
                                        <span>{{
                                            gradeStatisticsQuery.highScore / 100
                                        }}</span>
                                    </td>
                                    <td
                                        v-if="gradeStatisticsQuery.lowScore"
                                        rowspan="2"
                                    >
                                        <span>{{
                                            gradeStatisticsQuery.lowScore / 100
                                        }}</span>
                                    </td>
                                    <td
                                        v-if="gradeStatisticsQuery.totalStu"
                                        rowspan="2"
                                    >
                                        <span>{{
                                            gradeStatisticsQuery.totalStu
                                        }}</span>
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td
                                        v-if="
                                            gradeStatisticsQuery.pointsPossible ==
                                                null
                                        "
                                        rowspan="2"
                                    >
                                        <span v-if="gradeBatch.score">{{
                                            gradeBatch.score / 100
                                        }}</span>
                                        <span v-else>--</span>
                                    </td>
                                    <td
                                        v-show="
                                            gradeStatisticsQuery.averageScore ==
                                                null
                                        "
                                        rowspan="2"
                                    >
                                        --
                                    </td>
                                    <td
                                        v-show="
                                            gradeStatisticsQuery.highScore ==
                                                null
                                        "
                                        rowspan="2"
                                    >
                                        --
                                    </td>
                                    <td
                                        v-show="
                                            gradeStatisticsQuery.lowScore ==
                                                null
                                        "
                                        rowspan="2"
                                    >
                                        --
                                    </td>
                                    <td
                                        v-show="
                                            gradeStatisticsQuery.totalStu ==
                                                null
                                        "
                                        rowspan="2"
                                    >
                                        --
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!--评分分值填写-->
            <div class="grad-intro">
                <h1 class="grad-intro-title">
                    <span class="grad-title"
                        >{{ gradeStatisticsQuery.group }}
                        {{ $t("message.Group") }}
                        {{ gradeStatisticsQuery.unG }}
                        {{ $t("message.Stu_ungraded") }}</span
                    >
                </h1>
                <section>
                    <div>
                        <!--{{$t('message.Group_Score')}}-->
                        <!--<el-input v-model="scoreValue" type="number" step="0.00001"-->
                        <!--:disabled="scoreDisabled"-->
                        <!--placeholder-->
                        <!--@focus="gradeScorechange(scoreValue)"
                                  style="width: 76px;height:30px;">-->
                        <!--</el-input>-->
                        <!--<span v-if="gradeBatch.score">out of {{gradeBatch.score/100}}</span>-->
                        <!--<span v-else>out of </span>-->
                        <p>
                            {{ $t("message.Grade") }}
                            <el-input
                                v-if="
                                    gradeBatch.showScoreType == 1 ||
                                        gradeBatch.showScoreType == 2 ||
                                        gradeBatch.showScoreType == 4
                                "
                                v-model="scoreValue"
                                type="number"
                                step="0.00001"
                                :disabled="scoreDisabled"
                                placeholder=""
                                style="width: 76px;height:30px;"
                                @focus="gradeScorechange(scoreValue)"
                            />
                            <el-select
                                v-if="gradeBatch.showScoreType == 3"
                                v-model="completeGrade"
                                style="width: 35%"
                            >
                                <el-option
                                    :label="$t('message.Complete')"
                                    :value="gradeBatch.score"
                                >
                                    {{ $t("message.Complete") }}
                                </el-option>
                                <el-option
                                    :label="$t('message.Incomplete')"
                                    :value="0"
                                >
                                    {{ $t("message.Incomplete") }}
                                </el-option>
                            </el-select>
                            <span
                                v-if="
                                    gradeBatch.showScoreType == 3 &&
                                        Number(completeGrade) === 0
                                "
                                >0</span
                            >
                            <span
                                v-if="
                                    gradeBatch.showScoreType == 3 &&
                                        completeGrade != 0
                                "
                                >{{ gradeBatch.score / 100 }}</span
                            >
                            <span v-if="gradeBatch.showScoreType == 3"
                                >{{ $t("message.out_of") }}
                                {{ gradeBatch.score / 100 }}</span
                            >
                            <span v-if="gradeBatch.showScoreType == 1">%</span>
                            <span>
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 4 &&
                                            scoreValue
                                    "
                                    >{{ codes }}</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >(</span
                                >
                                <span
                                    v-if="
                                        (gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4) &&
                                            scoreValue
                                    "
                                    >{{ scoreValue }}</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 &&
                                            scoreValue
                                    "
                                    >{{ percentageScore }}</span
                                >
                                <span
                                    v-if="
                                        (gradeBatch.showScoreType == 1 &&
                                            scoreValue == '') ||
                                            (gradeBatch.showScoreType == 4 &&
                                                scoreValue == '')
                                    "
                                    >-</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >/</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >{{ gradeBatch.score / 100 }}</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >)</span
                                >
                            </span>
                        </p>
                    </div>

                    <p class="grad-checkbox">
                        <el-checkbox
                            v-model="gradedOverChecked"
                            :disabled="OverDisabled"
                            @change="Overchange"
                            >{{ $t("message.Over_Write_the_Graded") }}
                        </el-checkbox>
                        <br />
                    </p>
                    <div>
                        <el-checkbox
                            v-model="SetLowestChecked"
                            @change="SetLowestchange()"
                        >
                            {{ $t("message.Group_Set_Lowest_Score") }}
                        </el-checkbox>
                        <!--<el-input v-model="scoreValue1" type="number" step="0.00001"-->
                        <!--placeholder :disabled="setScoreDisabled"-->
                        <!--@focus="gradeScorechange(scoreValue1)"-->
                        <!--style="width: 76px;height:30px;">-->

                        <!--</el-input>-->
                        <p style="display: inline-block;">
                            <!--Grade-->
                            <el-input
                                v-if="
                                    gradeBatch.showScoreType == 1 ||
                                        gradeBatch.showScoreType == 2 ||
                                        gradeBatch.showScoreType == 4
                                "
                                v-model="scoreValue1"
                                type="number"
                                step="0.00001"
                                :disabled="setScoreDisabled"
                                placeholder=""
                                style="width: 76px;height:30px;"
                                @focus="gradeScorechange(scoreValue1)"
                            />
                            <el-select
                                v-if="gradeBatch.showScoreType == 3"
                                v-model="completeGrade1"
                                style="width: 35%"
                            >
                                <el-option
                                    :label="$t('message.Complete')"
                                    :value="gradeBatch.score"
                                >
                                    {{ $t("message.Complete") }}
                                </el-option>
                                <el-option
                                    :label="$t('message.Incomplete')"
                                    :value="0"
                                >
                                    {{ $t("message.Incomplete") }}
                                </el-option>
                            </el-select>
                            <span
                                v-if="
                                    gradeBatch.showScoreType == 3 &&
                                        completeGrade1 == 0
                                "
                                >0</span
                            >
                            <span
                                v-if="
                                    gradeBatch.showScoreType == 3 &&
                                        completeGrade1 != 0
                                "
                                >{{ gradeBatch.score / 100 }}</span
                            >
                            <span v-if="gradeBatch.showScoreType == 3"
                                >{{ $t("message.out_of") }}
                                {{ gradeBatch.score / 100 }}</span
                            >
                            <span v-if="gradeBatch.showScoreType == 1">%</span>
                            <span>
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 4 &&
                                            scoreValue1
                                    "
                                    >{{ codes }}</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >(</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >{{ scoreValue1 }}</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 &&
                                            scoreValue1
                                    "
                                    >{{ percentageScore }}</span
                                >
                                <span
                                    v-if="
                                        (gradeBatch.showScoreType == 1 &&
                                            scoreValue1 == '') ||
                                            (gradeBatch.showScoreType == 4 &&
                                                scoreValue1 == '')
                                    "
                                    >-</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >/</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >{{ gradeBatch.score / 100 }}</span
                                >
                                <span
                                    v-if="
                                        gradeBatch.showScoreType == 1 ||
                                            gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >)</span
                                >
                            </span>
                        </p>

                        <el-tooltip
                            :content="$t('message.Group_all_graded')"
                            placement="bottom"
                            effect="light"
                        >
                            <i
                                class="iconfont icon-help-copy"
                                style="color:#0e38b1; font-size: 22px; cursor: pointer"
                            />
                        </el-tooltip>
                        <el-input
                            v-model="textarea"
                            type="textarea"
                            :rows="2"
                            :placeholder="
                                $t('message.Group_enter_comments_here')
                            "
                            resize="none"
                            style="width: 80%; margin-top:30px;"
                        />
                        <el-button
                            style="background: #94a5d6; color: #fff; width: 80%; margin-top: 50px;"
                            :disabled="SubmitDisabled"
                            @click="gradeSubmit()"
                        >
                            {{ $t("message.Submit") }}
                        </el-button>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import gradeBook from "@/components/course/grades/gradeBook.vue";
import dueDraw from "@/utils/dueDraw";
import availableDraw from "@/utils/availableDraw";

export default {
    components: {
        gradeBook,
        "v-time": availableDraw,
        "v-Dtime": dueDraw
    },
    data() {
        return {
            submitValue: "1",
            statusValue: "2", // 以评分，未评分。
            missionValue: "2",
            scoreValue: "",
            gradedOverChecked: false, // 选中批量打分
            SetLowestChecked: false,
            scoreValue1: "",
            textarea: "",
            gradeBatch: "", // 批量批改
            groupList: [],
            gradeStatisticsQuery: "", // 批量显示列表；
            scoreDisabled: false, // 设置禁止事件
            setScoreDisabled: true,
            OverDisabled: false,
            BatchGrade: true,
            users: [], // 所有用
            sections: [], // 所有班级
            isOverWrite: 0,
            isSetLowestScore: 0,
            SubmitDisabled: false,
            submissionType: "",
            gradesOptions: [
                {
                    value: "2",
                    label: this.$t("message.All")
                },
                {
                    value: "0",
                    label: this.$t("message.Haven_been_Graded")
                },
                {
                    value: "1",
                    label: this.$t("message.been_Graded")
                }
            ],
            courseId: this.$route.query.courseId,
            percentageScore: null,
            gradeScheme: [],
            codes: "",
            completeGrade: "",
            completeGrade1: "",
            gradeScores: ""
        };
    },
    watch: {
        // 当评分方式为百分比评分的时候显示
        scoreValue(newVal) {
            if (Number(this.gradeBatch.showScoreType) === 1) {
                this.percentageScore = (
                    (parseFloat(newVal) / 10000) *
                    this.gradeBatch.score
                ).toFixed(1);
                if (newVal == "") {
                    this.percentageScore = "";
                }
                if (!/^[0-9]*[1-9][0-9]*$/.test(newVal) && newVal) {
                    this.scoreValue = "";
                    this.$message({
                        message: this.$t(
                            "message.The_score_must_be_positive_integer"
                        ),
                        type: "warning"
                    });
                }
            }
            if (Number(this.gradeBatch.showScoreType) === 4) {
                for (let i = 0; i < this.gradeScheme.length; i++) {
                    this.codes = this.isRangeIn(
                        Number((newVal / this.gradeBatch.score) * 10000),
                        Number(this.gradeScheme[i].rangeStart),
                        Number(this.gradeScheme[i].rangeEnd),
                        this.gradeScheme[i].code
                    );

                    if (this.codes == "") {
                        continue;
                    } else {
                        return;
                    }
                }
            }
        },
        scoreValue1(newVal) {
            if (Number(this.gradeBatch.showScoreType) === 1) {
                this.percentageScore = (
                    (parseFloat(newVal) / 10000) *
                    this.gradeBatch.score
                ).toFixed(1);
                if (newVal == "") {
                    this.percentageScore = "";
                }
                if (!/^[0-9]*[1-9][0-9]*$/.test(newVal)) {
                    this.scoreValue = "";
                    this.$message({
                        message: this.$t(
                            "message.The_score_must_be_positive_integer"
                        ),
                        type: "warning"
                    });
                }
            }
            if (Number(this.gradeBatch.showScoreType) === 4) {
                for (let i = 0; i < this.gradeScheme.length; i++) {
                    this.codes = this.isRangeIn(
                        Number((newVal / this.gradeBatch.score) * 10000),
                        Number(this.gradeScheme[i].rangeStart),
                        Number(this.gradeScheme[i].rangeEnd),
                        this.gradeScheme[i].code
                    );

                    if (this.codes == "") {
                        continue;
                    } else {
                        return;
                    }
                }
            }
        },
        deep: true
    },
    mounted() {
        this.getBatchGrade();
        this.getAssignDataList();
        this.gradeSchemeList();
    },
    methods: {
        isRangeIn(num, minnum, maxnum, code) {
            if ((num < maxnum || num == 100) && num >= minnum) {
                return code;
            }
            return "";
        },
        // 获取字母评分详情
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
                this.gradeScheme = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        BackTask() {
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: {
                    courseId: this.$route.query.courseId
                }
            });
        },
        showGradeBook() {
            this.$router.push({
                path: "/homePage/allCourse/gradeBook",
                query: {
                    courseId: this.$route.query.courseId
                }
            });
            this.isTask = false;
            this.gradeBook = true;
        },
        selectStatusValue() {
            this.getStatisticsQuery();
        },
        selectMission() {
            this.getStatisticsQuery();
        },
        // 分值覆盖；
        Overchange() {
            if (this.gradedOverChecked == true) {
                this.setScoreDisabled = true;
                this.SubmitDisabled = false;
            } else {
                this.setScoreDisabled = true;
            }
        },
        // 选择最低分
        SetLowestchange() {
            if (this.SetLowestChecked == true) {
                this.isSetLowestScore = 1;
                this.scoreDisabled = true;
                this.SubmitDisabled = false;
                // 覆盖评分框
                this.gradedOverChecked = false;
                // 覆盖禁止框
                this.OverDisabled = true;
                this.setScoreDisabled = false;
                this.scoreValue = "";
                this.gradeScore = this.scoreValue1;
            } else {
                this.isSetLowestScore = 0;
                this.scoreDisabled = false;
                this.OverDisabled = false;
                this.setScoreDisabled = true;
                this.scoreValue1 = "";
            }
        },
        gradeScorechange(num) {
            // 聚焦时取消禁止按钮；
            this.SubmitDisabled = false;
        },
        // 批量评分
        async getBatchGrade() {
            const { originType } = this.$route.query;
            const { originId } = this.$route.query;
            const { title } = this.$route.query;
            let { unGraderIdcount } = this.$route.query;
            let { graderIdcount } = this.$route.query;
            const { score } = this.$route.query;
            let { isGradeAssignment } = this.$route.query;
            const { fplb } = this.$route.query;
            if (this.BatchGrade == true) {
                this.gradeType = 2;
            } else {
                this.gradeType = 1;
            }
            if (isGradeAssignment == "group") {
                isGradeAssignment = 2;
            } else {
                isGradeAssignment = 1;
            }
            if (unGraderIdcount == undefined) {
                unGraderIdcount = 0;
            }
            if (graderIdcount == undefined) {
                graderIdcount = 0;
            }
            const params = {
                originType,
                originId,
                gradeType: this.gradeType, // 2批量   1单个
                originName: title,
                unG: unGraderIdcount,
                graded: graderIdcount,
                // unGGraded: unGraderIdcount + '▓' + graderIdcount,
                score,
                releaseType: isGradeAssignment // 1：个人  2：小组
            };
            const result = await this.$getData(
                "/gradeDataQuery/gradeQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeBatch = result.data.entity.gradeInfoVo;
                // 截取显示上传文件的类型
                if (this.gradeBatch.submissionType) {
                    const str = JSON.stringify(this.gradeBatch.submissionType);
                    this.submissionType = str.substr(
                        1,
                        this.gradeBatch.submissionType.length - 1
                    );
                }
                // this.groupList = result.data.entity.groupList;
                this.gradeOneStuGroupQuery();
                this.getStatisticsQuery();
            } else {
            }
        },

        // 提交批量打分；
        async gradeSubmit() {
            if (this.SetLowestChecked == true) {
                if (
                    Number(this.gradeBatch.showScoreType) === 2 ||
                    Number(this.gradeBatch.showScoreType) === 4
                ) {
                    this.gradeScore = Number(this.scoreValue1).toFixed(2) * 100;
                }
                if (Number(this.gradeBatch.showScoreType) === 1) {
                    this.gradeScore =
                        (this.scoreValue1 / 100) * this.gradeBatch.score;
                }
                if (Number(this.gradeBatch.showScoreType) === 3) {
                    this.gradeScore = this.completeGrade1;
                }
            } else {
                if (
                    Number(this.gradeBatch.showScoreType) === 2 ||
                    Number(this.gradeBatch.showScoreType) === 4
                ) {
                    this.gradeScore = Number(this.scoreValue).toFixed(2) * 100;
                }
                if (Number(this.gradeBatch.showScoreType) === 1) {
                    this.gradeScore =
                        (this.scoreValue / 100) * this.gradeBatch.score;
                }
                if (Number(this.gradeBatch.showScoreType) === 3) {
                    this.gradeScore = this.completeGrade;
                    console.log(this.completeGrade);
                }
            }
            for (let i = 0; i < this.groupList.length; i++) {
                if (this.missionValue == this.groupList[i].id) {
                    this.userId = this.groupList[i].userId;
                    this.types = this.groupList[i].type;
                }
            }
            if (this.BatchGrade == true) {
                this.gradeType = 2;
            } else {
                this.gradeType = 1;
            }
            // 设置批量评分
            if (this.gradedOverChecked == true) {
                // 不 0； 覆盖1
                this.isOverWrite = 1;
            } else if (this.OverDisabled == true) {
                this.isOverWrite = 0;
            }
            if (
                parseFloat(this.gradeScore / 100) >= 0 &&
                parseFloat(this.gradeScore / 100) <= this.gradeBatch.score / 100
            ) {
                if (this.missionValue == 2) {
                    const params = {
                        courseId: this.courseId,
                        assignmentGroupItemId: this.gradeBatch
                            .assignmentGroupItemId,
                        originType: this.gradeBatch.originType,
                        originId: this.gradeBatch.originId,
                        content: this.textarea,
                        //							userId: this.gradeBatch.userId,
                        isSendGroupUser: "0",
                        score: this.gradeBatch.score,
                        gradeScore: this.gradeScore,
                        isOverWrite: this.isOverWrite, // 是否覆盖之前的评分 0不覆盖  1覆盖
                        isSetLowestScore: this.isSetLowestScore, // 设置最低评分 0不设置  1设置
                        gradeType: this.gradeType, // 1个人 2 小组
                        releaseType: this.gradeBatch.releaseType, // 1个人 2 小组
                        studyGroupId: this.missionValue,
                        userType: 2
                    };
                    var gradeParams = params;
                } else {
                    const params = {
                        courseId: this.courseId,
                        assignmentGroupItemId: this.gradeBatch
                            .assignmentGroupItemId,
                        originType: this.gradeBatch.originType,
                        originId: this.gradeBatch.originId,
                        userId: this.types == 0 ? "" : this.userId,
                        content: this.textarea,
                        isSendGroupUser: "0",
                        score: this.gradeBatch.score,
                        gradeScore: this.gradeScore,
                        isOverWrite: this.isOverWrite, // 是否覆盖之前的评分 0不覆盖  1覆盖
                        isSetLowestScore: this.isSetLowestScore, // 设置最低评分 0不设置  1设置
                        gradeType: this.gradeType,
                        releaseType: this.gradeBatch.releaseType, // 1个人 2 小组
                        studyGroupId: this.missionValue,
                        userType: this.types == 0 ? 0 : 1
                    };
                    var gradeParams = params;
                    //						}
                }
                if (
                    this.gradeStatisticsQuery.submitted !=
                        this.gradeStatisticsQuery.graded ||
                    this.gradedOverChecked ||
                    this.SetLowestChecked
                ) {
                    const result = await this.$getData(
                        "/gradedEdit/add",
                        gradeParams,
                        "post"
                    );
                    if (result.data.code == 200) {
                        const _this = this;
                        _this.textarea = "";
                        _this.scoreValue = "";
                        _this.SubmitDisabled = true;
                        //							_this.gradeSub();
                        _this.getStatisticsQuery();
                        _this.$message({
                            message: this.$t("message.Done"),
                            type: "success"
                        });
                    }
                } else {
                    this.$message({
                        message: this.$t("message.No_filter_returned_Stu"),
                        type: "warning"
                    });
                }
            } else {
                this.$message({
                    message: `Score range 0 to${this.gradeBatch.score / 100}.`,
                    type: "warning"
                });
                this.scoreValue = "";
                this.scoreValue1 = "";
            }
        },

        // 提交评分人数展示
        async getStatisticsQuery() {
            let GroupAndAll = "";
            if (this.missionValue == 2) {
                GroupAndAll = 0;
            } else {
                GroupAndAll = 1;
            }
            for (let i = 0; i < this.groupList.length; i++) {
                if (this.missionValue == this.groupList[i].id) {
                    this.userId = this.groupList[i].userId;
                    this.types = this.groupList[i].type;
                }
            }
            //
            const params = {
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                releaseType: this.gradeBatch.releaseType, // 1个人 ，2小组；
                studyGroupId: this.missionValue,
                submitStatus: this.submitValue,
                isGrade: this.statusValue,
                isGroupAndAll: GroupAndAll,
                userId:
                    this.types == 0 || this.missionValue == 2 ? 0 : this.userId
            };
            const paramsData = params;
            //				}

            const result = await this.$getData(
                "/gradeDataQuery/gradeStatisticsQuery/query",
                paramsData,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeStatisticsQuery = result.data.entity;
            } else {
            }
        },
        // 查询单个任务的组、学生list
        async gradeOneStuGroupQuery() {
            const params = {
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                releaseType: this.gradeBatch.releaseType,
                sequence: 1, // 提交类型 1
                gradedStatus: 2 // 评分 2
            };
            const result = await this.$getData(
                "/gradeDataQuery/gradeOneStuGroupQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                // 判断是否是小组
                if (result.data.entity.groupListVoList) {
                    const groupListVoLists = result.data.entity.groupListVoList;
                    const obj = {};
                    this.groupList = [];
                    // 筛选小组是否重复
                    for (let i = 0; i < groupListVoLists.length; i++) {
                        if (!obj[groupListVoLists[i].id]) {
                            this.groupList.push(groupListVoLists[i]);
                            obj[groupListVoLists[i].id] = true;
                        }
                    }
                    console.log("this.groupList", this.groupList);
                }
                // 学生没有userid,小组的时候才会显示userid
                //	if(result.data.entity.studentListVos) {
                //     this.groupList = result.data.entity.studentListVos;
                //	}
            } else {
            }
        },
        async getAssignDataList() {
            const params = {
                data: this.$route.query.courseId
            };
            const result = await this.$getData("/assign/get", params, "get");
            if (result.data.code == 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style lang="less" scoped>
.title-box {
    /*display: flex;*/
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 28px 2% 28px 0;
    border-bottom: 6px solid #eee;
    h1 {
        font-size: 20px;
        color: #333;
        line-height: 1;
        font-weight: normal;
        display: inline-block;
        cursor: pointer;
    }
    span {
        /*margin-left: 16px;*/
    }
    .grade-btn {
        float: right;
    }
}

.sequence-box {
    .el-radio {
        margin-left: 12px;
    }
}

.filter-box {
    padding: 20px 0;
    .select-box {
        display: inline-block;
        margin-left: 20px;
    }
    .sequence-box {
        display: inline-block;
        margin-left: 20px;
    }
    .filter-input {
        width: 250px;
    }
    .filter-select {
        display: inline-block;
    }
}

.task-list {
    > li {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        padding-right: 2px !important;
        border-bottom: 1px solid #eee;
        &:last-child {
            border-bottom: none;
        }
        .task-left {
            /*width: 40%;*/
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: center;
            .task-leftTitle {
                margin-left: 18px;
                h1 {
                    font-size: 14px;
                    color: #666;
                    margin-left: 10px;
                }
                .tag-list {
                    margin-left: 10px;
                    li {
                        display: inline-block;
                        padding: 5px;
                        padding-left: 0px !important;
                        border-right: 1px solid #999;
                        font-size: 12px;
                        color: #999;
                        line-height: 1;
                        &:last-child {
                            border-right: none;
                        }
                    }
                }
            }
        }
        .task-right {
            width: 46%;
            /*text-align: center;*/
            > span {
                /*width: 18%;*/
                display: inline-block;
                text-align: left;
                margin: 0px 4px;
                font-size: 14px;
                color: #666;
            }
        }
    }
}

.grade-nodata {
    border: none;
    text-align: center;
    margin: 10% 0;
}

.tag-list1 li {
    display: inline-block;
    /*float: left;*/
}

.grad-summery {
    .el-table {
        border: 1px solid #cccccc;
    }
}

.red {
    color: #f13026;
}

.input-group {
    padding: 20px 0;
}

.input-group span {
    text-align: center;
    display: block;
    margin-left: 10%;
}

.group-item {
    /*display: inline-block;*/
    float: left;
    margin-left: 20px;
    /*width: 30%;*/
    &:first-child {
        margin-left: 0px;
    }
    label {
        font-size: 14px;
        color: #333;
        /*font-weight: bold;*/
    }
}

.group-data {
    /*width: 66%;*/
    text-align: center;
    h2 {
        font-size: 14px;
        color: #333;
        margin-bottom: 16px;
    }
    h3 {
        font-size: 22px;
        color: #333;
    }
    .group-data-title {
        margin-left: 66px;
    }
    .group-data-tips {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        /*font-weight: bold;*/
    }
}

.grad-summery {
    margin-top: 40px;
    h3 {
        font-size: 14px;
        color: #333;
        font-weight: normal;
    }
}

.contain-box {
    /*position: relative;*/
}

.grad-intro {
    float: right;
    height: 100%;
    background: #eee;
    width: 36%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 23px 0;
    padding-left: 46px;
    margin: 16px 8px 0px 0px;
}

.grad-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    font-style: italic;
}

.grad-intro-title {
    margin-bottom: 40px;
}

.grade-left-box {
    width: 62%;
    float: left;
    margin-top: 6px;
}

.grad-checkbox {
    margin-top: 16px;
    margin-left: 46px;
    margin-bottom: 20px;
    label {
        margin-left: 0;
    }
}

.task-close-list {
    display: inline-block;
    font-size: 12px;
    color: #999;
    span {
        /*margin: 0px 10px;*/
    }
}

.task-close-hover {
    display: inline-block;
    border-bottom: 1px solid;
    margin-left: 10px;
}

.task-close-time {
    padding: 0px 10px;
    /*float: left;*/
    label {
        display: block;
        float: right;
    }
}

.group-change {
    table {
        border-collapse: collapse;
        width: 100%;
    }
    table,
    td {
        height: 60px;
        border: 1px solid #cccccc;
    }
    th {
        border: 1px solid #cccccc;
        /*background: #dbedff;*/
        height: 40px;
    }
}

.task-new {
    width: 50px;
    float: right;
    line-height: 42px;
}

.grad-subSucceed {
    width: 60px;
    height: 30px;
    margin-top: 14px;
    text-align: center;
    border: 1px solid #cccccc;
    color: yellowgreen;
    margin-left: 40px;
    border-radius: 5px;
    background: #ffffff;
    line-height: 30px;
}

.gradestudent {
    width: 100px;
    float: left;
}

.grad-title-size {
    font-size: 12px;
    color: #999;
}

.grads-Command {
}
.task-left-h1 {
    width: 68px;
    height: 49px;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 30px;
    border-right: 1px solid #eeeeee;
    padding: 20px;
    margin: 14px;
    padding-left: 0;
    margin-left: 0;
}
</style>
