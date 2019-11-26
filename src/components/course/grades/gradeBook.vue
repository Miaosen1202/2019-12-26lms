<template>
    <!--eslint-disable-->
    <div class="grade-book">
        <div class="title-box">
            <div class="title-left">
                <h1 @click="backTask">
                    {{ $t("message.Grade_Back_Task") }}
                    <i class="iconfont icon-ai207" />
                </h1>
                <span>{{ $t("message.Grade_Section_Switch") }}</span>
                <el-select
                    v-model="sectionValue"
                    :popper-class="discussion_select"
                    :placeholder="$t('message.Common_please_select')"
                    @change="getSectionList"
                >
                    <el-option
                        v-for="el in sectionList"
                        :key="el.id"
                        :label="el.name"
                        :value="el.id"
                    />
                </el-select>
            </div>
            <div>
                <!--<el-button type="plain">-->
                <!--<i class="iconfont icon-wendangshezhi"></i>-->
                <!--{{$t('message.Grade_Book')}}-->
                <!--</el-button>-->
            </div>
        </div>

        <!-- 搜索 -->
        <div class="filter-box">
            <el-select
                v-model="searchValue"
                class="filter-input"
                multiple
                filterable
                remote
                reserve-keyword
                :placeholder="$t('message.Grade_Filter_Name_Email')"
                :remote-method="remoteMethod"
                popper-class="grade-book-select"
                :loading="loading"
            />
            <div class="status-tips">
                <b class="delayed" />
                {{ $t("message.Grade_Delayed") }}
            </div>
            <div class="status-tips">
                <b class="missed" />
                {{ $t("message.Grade_Missed") }}
            </div>
            <div class="status-tips">
                <b class="un-graded">
                    <i class="ungrade">U</i>
                </b>
                {{ $t("message.Grade_UnGraded") }}
            </div>
            <div
                class="status-tips"
                style="vertical-align: middle;padding-top: 5px;"
            >
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="Section analytics"
                    placement="top"
                >
                    <i
                        class="iconfont icon-tongjitu"
                        style="cursor: pointer;"
                        @click="sectionAnal"
                    />
                </el-tooltip>
            </div>
            <el-popover placement="bottom" width="20%" trigger="click">
                <el-radio v-model="radio" label="1" class="total-radio">
                    {{ $t("message.Grade_Percent_Pts") }}
                </el-radio>
                <br />
                <el-radio v-model="radio" label="2">
                    {{ $t("message.Grade_Letter") }}
                </el-radio>
                <el-button
                    slot="reference"
                    class="total-more"
                    icon="el-icon-more"
                    @click="handleTotal($event)"
                />
            </el-popover>
        </div>

        <!--作业表book-->
        <div v-loading="loading2" class="table-show">
            <div
                v-if="allList.length == 0 && noDataFlag"
                style="color:#666;text-align:center;margin:30px 0;"
            >
                {{ $t("message.Grade_No_Data") }}
            </div>
            <el-table
                v-if="allList.length > 0"
                :key="tableId"
                :data="allList"
                border
                stripe
                :header-cell-style="getRowClass"
                max-height="500"
                style="width: 100%"
                :row-class-name="tableRowClassName"
            >
                <el-table-column
                    :label="$t('message.Student_Name')"
                    prop="fullName"
                    fixed
                    min-width="140"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <img
                            v-if="scope.row.fileUrl"
                            class="portrait"
                            :src="GlobalUrl + scope.row.fileUrl"
                        />
                        <img
                            v-else
                            class="portrait"
                            src="/static/images/touxiang.png"
                        />
                        <a
                            href="javascript:void(0);"
                            @click="peopleDetail(scope.row.id)"
                        >
                            <span style="margin-left: 10px">{{
                                scope.row.fullName
                            }}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="email"
                    :label="$t('message.Email')"
                    min-width="170"
                    fixed
                />
                <el-table-column
                    v-for="(el, index) in gradeBook.gradeTestListQuery"
                    :key="el.id"
                    align="center"
                    class-name="single-task"
                    label="el"
                    min-width="130"
                >
                    <template slot="header" slot-scope="scope">
                        <el-popover
                            trigger="hover"
                            :content="$t('message.This_is_not_counted')"
                        >
                            <i
                                v-if="el.isIncludeGrade == 0"
                                slot="reference"
                                class="el-icon-warning"
                            />
                        </el-popover>
                        <el-popover trigger="hover">
                            <ul
                                v-if="el.assignsList.length > 0"
                                class="assign-tip"
                            >
                                <li style="text-align:center;color:#333;">
                                    {{ el.title }}
                                </li>
                                <li v-if="el.originType == 2">
                                    <span
                                        >{{
                                            $t("message.Grade_AssignmentType")
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_discussion") }}
                                </li>
                                <li v-if="el.originType == 3">
                                    <span
                                        >{{
                                            $t("message.Grade_AssignmentType")
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_quiz") }}
                                </li>
                                <li v-if="el.originType == 1">
                                    <span
                                        >{{
                                            $t("message.Grade_AssignmentType")
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_assignment") }}
                                </li>
                                <li v-if="el.isGradeAssignment == 'group'">
                                    <span
                                        >{{
                                            $t(
                                                "message.Grade_isGradeAssignment"
                                            )
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_Yes") }}
                                </li>
                                <li v-if="el.isGradeAssignment == 'individual'">
                                    <span
                                        >{{
                                            $t(
                                                "message.Grade_isGradeAssignment"
                                            )
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_No") }}
                                </li>
                                <li v-if="el.assignsList.length == 1">
                                    <span
                                        >{{
                                            $t("message.Grade_Available_Time")
                                        }}:</span
                                    >
                                    <em v-if="el.assignsList[0].startTime">{{
                                        el.assignsList[0].startTime | formatDate
                                    }}</em>
                                    <em v-else>--</em>
                                </li>
                                <li v-if="el.assignsList.length == 1">
                                    <span
                                        >{{
                                            $t("message.Grade_Due_Time")
                                        }}:</span
                                    >
                                    <em v-if="el.assignsList[0].limitTime">{{
                                        el.assignsList[0].limitTime | formatDate
                                    }}</em>
                                    <em v-else>--</em>
                                </li>
                                <li v-if="el.assignsList.length == 1">
                                    <span
                                        >{{
                                            $t("message.Grade_Close_Time")
                                        }}:</span
                                    >
                                    <em v-if="el.assignsList[0].endTime">{{
                                        el.assignsList[0].endTime | formatDate
                                    }}</em>
                                    <em v-else>--</em>
                                </li>
                                <li v-if="el.assignsList.length > 1">
                                    <span
                                        >{{
                                            $t("message.Grade_Available_Time")
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_Multiple_Dates") }}
                                </li>
                                <li v-if="el.assignsList.length > 1">
                                    <span
                                        >{{
                                            $t("message.Grade_Due_Time")
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_Multiple_Dates") }}
                                </li>
                                <li v-if="el.assignsList.length > 1">
                                    <span
                                        >{{
                                            $t("message.Grade_Close_Time")
                                        }}:</span
                                    >
                                    {{ $t("message.Grade_Multiple_Dates") }}
                                </li>
                                <!--<li v-if="el.assignsList.length>1">
                      <span>{{$t('message.Grade_Multiple_Dates')}}</span>
                </li>-->
                            </ul>
                            <span
                                slot="reference"
                                class="assign-title"
                                @click="handleTitle(el)"
                                >{{ el.title }}</span
                            >
                        </el-popover>
                        <p>
                            {{ $t("message.Grade_out_of") }}
                            {{ el.score / 100 }}
                        </p>
                        <!--<p>-->
                        <!--{{ el.weight }}-->
                        <!--<span> % of grade</span>-->
                        <!--</p>-->
                    </template>
                    <template slot-scope="scope">
                        <span
                            v-if="
                                scope.row[el.title + el.id + scope.row.id] >
                                    0 ||
                                    scope.row[
                                        el.title + el.id + scope.row.id
                                    ] == 0
                            "
                        >
                            <!--当是数字评分的时候-->
                            <span v-if="el.showScoreType == 2">
                                {{
                                    scope.row[el.title + el.id + scope.row.id] /
                                        (el.weight / 100)
                                }}
                            </span>
                            <!--当是百分比评分的时候-->
                            <span v-if="el.showScoreType == 1">
                                {{
                                    (scope.row[
                                        el.title + el.id + scope.row.id
                                    ] /
                                        (el.weight / 100) /
                                        el.score) *
                                        10000
                                }}
                            </span>
                            <span
                                v-if="el.showScoreType == 1"
                                style="position: absolute;left: 19px;"
                                >%</span
                            >
                            <!--当是完成未完成评分的时候-->
                            <span
                                v-if="
                                    el.showScoreType == 3 &&
                                        scope.row[
                                            el.title + el.id + scope.row.id
                                        ] == 0
                                "
                            >
                                {{ $t("message.Incomplete") }}
                            </span>
                            <span
                                v-if="
                                    el.showScoreType == 3 &&
                                        scope.row[
                                            el.title + el.id + scope.row.id
                                        ] != 0
                                "
                            >
                                {{ $t("message.Complete") }}
                            </span>
                            <!--当是字母评分的时候-->
                            <span v-if="el.showScoreType == 4">{{
                                scope.row[el.title + el.id]
                            }}</span>
                        </span>
                        <span
                            v-else-if="
                                scope.row[el.title + el.id + scope.row.id] ==
                                    '未提交'
                            "
                            >-</span
                        >
                        <span
                            v-else-if="
                                scope.row[el.title + el.id + scope.row.id] ==
                                    '未打分'
                            "
                        >
                            <i
                                class="ungrade"
                                style="width: 18px;height: 18px;line-height:18px"
                                >U</i
                            >
                        </span>
                        <span
                            v-else-if="
                                scope.row[el.title + el.id + scope.row.id] ==
                                    '缺交'
                            "
                        >
                            -
                            <i
                                style="background:#f13026;color:#fff;"
                                class="status-bg"
                            />
                        </span>
                        <span
                            v-else-if="
                                scope.row[el.title + el.id + scope.row.id] ==
                                    '迟交'
                            "
                        >
                            {{ scope.row["delay" + el.id + scope.row.id] }}
                            <i
                                style="background:#f7f031;color:#fff;"
                                class="status-bg"
                            />
                        </span>
                        <span
                            v-else-if="
                                scope.row[el.title + el.id + scope.row.id] ==
                                    '未打分逾期'
                            "
                        >
                            <i
                                style="width: 18px;height: 18px;line-height:18px"
                                class="ungrade"
                                >U</i
                            >
                            <i
                                style="background:#f7f031;color:#00f"
                                class="status-bg"
                            />
                        </span>
                        <span v-else>
                            <i class="iconfont icon-shanchu2" />
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-for="(el, index) in gradeGroup"
                    :key="el.id"
                    align="center"
                    min-width="110"
                >
                    <template slot="header" slot-scope="scope">
                        <el-popover trigger="hover">
                            <p style="text-align:center">
                                {{ el.assignGroup.name }}
                            </p>
                            <span slot="reference">{{
                                el.assignGroup.name
                            }}</span>
                            <p slot="reference">
                                {{ el.assignGroup.weight }}
                                <span> % {{ $t("message.of_grade") }}</span>
                            </p>
                        </el-popover>
                    </template>
                    <template slot-scope="scope">
                        <span>{{
                            scope.row[el.assignGroup.name + el.assignGroup.id]
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('message.Total')">
                    <el-table-column
                        prop="trueScore"
                        sortable
                        :sort-method="sortByPts"
                        align="center"
                        :label="$t('message.Pts')"
                        min-width="100"
                    />
                    <el-table-column
                        prop="scorePer"
                        sortable
                        :sort-method="sortByPer"
                        align="center"
                        :label="scoreShow"
                        :formatter="formatter"
                        min-width="100"
                    />
                </el-table-column>
            </el-table>
            <p v-if="noDataFlag" class="unassigned-tip">
                <i class="iconfont icon-shanchu2" />
                {{ $t("message.Grade_UnAssigned_tip") }}
            </p>
        </div>

        <!-- 学生信息卡 -->
        <peopleDetail
            v-if="show"
            :slide="slideStaus"
            :uid="uid"
            :section-id="sectionId"
            :section-name="sectionName"
            @slide="slideChange"
            @show="showDetail"
            @id="handleUid"
        />
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import Vue from "vue";
import peopleDetail from "@/components/course/grades/peopleDetail.vue";
import { formatDate } from "@/utils/date";
import gradeBookPub from "@/utils/gradeBookPub";

export default {
    components: {
        peopleDetail
    },
    filters: {
        formatDate(time) {
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
    data() {
        return {
            discussion_select: "discussion_select",
            sectionValue: "", // 班级select
            searchValue: "", // 搜索value
            radio: "1",
            uid: "",
            loading: false,
            loading2: true,
            show: false, // 信息卡flag
            slideStaus: "slideInRight",
            scoreShow: "Per",
            gradeBook: {},
            gradeGroup: [],
            allList: [],
            list: [],
            sectionList: [],
            sectionId: "",
            courseId: "",
            sectionName: "",
            noDataFlag: false,
            tableId: +new Date(),
            codes: "",
            gradeScheme: []
        };
    },
    mounted() {
        this.courseId = this.$route.query.courseId;
        this.getSectionList();
        this.gradeSchemeList();
    },
    methods: {
        backTask() {
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: {
                    courseId: this.courseId
                }
            });
            // this.$emit('task-page', true)
            // this.$emit('book-page', false)
        },
        handleTotal(e) {},
        handleTitle(item) {
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    this.$router.push({
                        path: "assignmentPreView",
                        query: {
                            courseId: this.courseId,
                            assignmentId: targetId,
                            assignmentGroupId: item.assignmentGroupId,
                            assignmentGroupItemId: item.id
                        }
                    });
                    break;
                case 2:
                    this.$router.push({
                        path: "/homePage/allCourse/discussionDeatilCourse",
                        query: {
                            discussionId: targetId,
                            courseId: this.courseId
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/homePage/allCourse/courseQuizz",
                        query: { data: targetId }
                    });
                    break;
                default:
            }
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return "background:#dcdcdc;text-align:center;color:#000";
            }
            return "";
        },
        peopleDetail(uid) {
            this.uid = uid;
            this.show = true;
            this.slideStaus = "slideInRight";
        },
        sectionAnal() {
            // this.$emit('book-page', false)
            // this.$emit('section', true)
            this.$router.push({
                path: "/homePage/allCourse/sectionAnalytics",
                query: {
                    sectionId: this.sectionValue,
                    courseId: this.courseId
                }
            });
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 0) {
                return "warning-row";
            }
            return "success-row";

            return "success-row";
        },
        remoteMethod(query) {
            const _this = this;
            if (query !== "") {
                _this.loading = true;
                setTimeout(() => {
                    _this.loading = false;
                    // this.userList = this.gradeBook.userList.slice(1)
                    if (_this.list.length > 0) {
                        _this.allList = _this.list.filter(
                            item =>
                                item.fullName
                                    .toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1 ||
                                (item.email
                                    ? item.email
                                          .toLowerCase()
                                          .indexOf(query.toLowerCase()) > -1
                                    : "")
                        );
                    }
                }, 100);
            } else {
                _this.allList = _this.gradeBook.userList;
            }
        },
        slideChange(val) {
            this.slideStaus = val;
        },
        handleUid(val) {
            this.uid = val;
            this.$emit("user", this.uid);
            // console.log(this.uid)
        },
        showDetail(val) {
            this.show = val;
            // this.$emit('book-page', false)
            // this.$emit('stu', true)
        },
        sortByDate(obj1, obj2) {
            // let val1 = obj1.id
            // let val2 = obj2.id
            // return val2 - val1
        },
        sortByPts(obj1, obj2) {
            const val1 = obj1.trueScore;
            const val2 = obj2.trueScore;
            return val2 - val1;
        },
        sortByPer(obj1, obj2) {
            const val1 = obj1.scorePer.split("%")[0] * 1;
            const val2 = obj2.scorePer.split("%")[0] * 1;
            return val2 - val1;
        },
        formatter(row, column) {
            if (this.radio == "1") {
                this.scoreShow = "Per";
                return row.scorePer;
            }
            if (row.scorePer) {
                this.scoreShow = "Letter";
                let letter = row.scorePer.replace("%", "") * 1;
                // console.log(letter)
                // console.log(row)
                for (let i = 0; i < this.gradeScheme.length; i++) {
                    if (
                        (Number(letter) <
                            Number(this.gradeScheme[i].rangeEnd) ||
                            Number(letter) == 100) &&
                        Number(letter) >= Number(this.gradeScheme[i].rangeStart)
                    ) {
                        return this.gradeScheme[i].code;
                    }
                }
                // console.log(this.codes)

                // console.log(this.codes)

                // if (letter < 94 && letter >= 90) {
                //     return "A-";
                // }
                // if (letter < 90 && letter >= 87) {
                //     return "B+";
                // }
                // if (letter < 87 && letter >= 84) {
                //     return "B";
                // }
                // if (letter < 84 && letter >= 80) {
                //     return "B-";
                // }
                // if (letter < 80 && letter >= 77) {
                //     return "C+";
                // }
                // if (letter < 77 && letter >= 74) {
                //     return "C";
                // }
                // if (letter < 74 && letter >= 70) {
                //     return "C-";
                // }
                // if (letter < 70 && letter >= 67) {
                //     return "D+";
                // } else if (letter < 67 && letter >= 64) {
                //     return "D";
                // } else if (letter < 64 && letter >= 61) {
                //     return "D-";
                // } else if (letter < 61 && letter >= 0) {
                //     return "F";
                // }
            }
        },
        async getSectionList() {
            const result = await this.$getData(
                "/section/list",
                { courseId: this.courseId },
                "get"
            );
            this.sectionList = result.data.entity;
            this.sectionId = this.sectionId
                ? this.sectionValue
                : this.sectionList[0].id;
            this.sectionValue = this.sectionValue || this.sectionList[0].id;
            this.sectionList.forEach(el => {
                if (el.id == this.sectionId) {
                    this.sectionName = el.name;
                }
            });
            await this.getBookList();
        },
        isRangeIn(num, minnum, maxnum, code) {
            if ((num < maxnum || num == 100) && num >= minnum) {
                return code;
            }
            return "";
        },
        //获取字母评分详情
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
        async getBookList() {
            const result = await this.$getData(
                "/grade/book/query",
                { courseId: this.courseId, sectionId: this.sectionId },
                "get"
            );
            if (result.data.code == 200) {
                this.gradeBook = result.data.entity;
                this.tableId = +new Date();
                this.loading2 = false;
                this.noDataFlag = true;
                this.allList = this.gradeBook.userList;
                this.gradeGroup = [];
                const hashMap = {};
                this.gradeBook.gradeTestListQuery.forEach(item => {
                    if (!hashMap[item.assignmentGroupId]) {
                        hashMap[item.assignmentGroupId] = {
                            assignGroup: {
                                name: item.name,
                                id: item.assignmentGroupId,
                                assign: [],
                                score: "",
                                weight: item.weight
                            }
                        };
                        this.gradeGroup.push(hashMap[item.assignmentGroupId]);
                    }
                    const group = hashMap[item.assignmentGroupId];
                    const assign = {
                        title: item.title,
                        score: (item.score / 100) * (item.weight / 100),
                        id: item.id,
                        originType: item.originType
                    };
                    if (item.originType == 1) {
                        assign.isIncludeGrade = item.isIncludeGrade;
                    }
                    group.assignGroup.assign.push(assign);
                });
                this.allList.forEach(item => {
                    item.score = [];
                    item.title = [];
                    item.fullScore = [];
                    item.missNum = 0;
                    this.gradeBook.gradeTestListQuery.forEach(el => {
                        const ele = el.submitGradeQuery.find(
                            ele => ele.userId == item.id
                        );
                        if (ele !== undefined) {
                            if (
                                (ele.isGraded == 1 || ele.isGraded == 2) &&
                                ele.isOverdue == 0
                            ) {
                                item[el.title + el.id + ele.userId] =
                                    (ele.gradeScore / 100) * (el.weight / 100); // 得分
                                if (el.showScoreType == 4) {
                                    for (
                                        let i = 0;
                                        i < this.gradeScheme.length;
                                        i++
                                    ) {
                                        item[el.title + el.id] = this.isRangeIn(
                                            Number(
                                                (ele.gradeScore / el.score) *
                                                    100
                                            ),
                                            Number(
                                                this.gradeScheme[i].rangeStart
                                            ),
                                            Number(
                                                this.gradeScheme[i].rangeEnd
                                            ),
                                            this.gradeScheme[i].code
                                        );
                                        if (item[el.title + el.id]) {
                                            break;
                                        }
                                    }
                                }

                                if (
                                    el.originType == 1 &&
                                    el.isIncludeGrade == 0
                                ) {
                                    item.title.push(
                                        el.title + el.id + ele.userId
                                    ); // 任务
                                } else {
                                    item.score.push(
                                        (ele.gradeScore / 100) *
                                            (el.weight / 100)
                                    );
                                    item.fullScore.push(
                                        (el.score / 100) * (el.weight / 100)
                                    ); // 任务
                                    item.title.push(
                                        el.title + el.id + ele.userId
                                    ); // 任务
                                }
                            } else if (
                                ele.isGraded == 0 &&
                                ele.isOverdue == 0
                            ) {
                                item[el.title + el.id + ele.userId] = "未打分";
                                // 未打分未逾期
                            } else if (
                                ele.isGraded == 0 &&
                                ele.isOverdue == 1
                            ) {
                                item[el.title + el.id + ele.userId] =
                                    "未打分逾期";
                                //"未打分逾期" // 未打分逾期
                            } else if (
                                (ele.isGraded == 1 || ele.isGraded == 2) &&
                                ele.isOverdue == 1
                            ) {
                                // 打分迟交
                                item[el.title + el.id + ele.userId] = "迟交";
                                item[`delay${el.id}${ele.userId}`] =
                                    (ele.gradeScore / 100) * (el.weight / 100);
                                if (el.showScoreType == 4) {
                                    for (
                                        let i = 0;
                                        i < this.gradeScheme.length;
                                        i++
                                    ) {
                                        item[el.title + el.id] = this.isRangeIn(
                                            Number(
                                                (ele.gradeScore / el.score) *
                                                    100
                                            ),
                                            Number(
                                                this.gradeScheme[i].rangeStart
                                            ),
                                            Number(
                                                this.gradeScheme[i].rangeEnd
                                            ),
                                            this.gradeScheme[i].code
                                        );
                                        if (item[el.title + el.id]) {
                                            break;
                                        }
                                    }
                                }
                                if (
                                    el.originType == 1 &&
                                    el.isIncludeGrade == 0
                                ) {
                                    item.title.push(
                                        el.title + el.id + ele.userId
                                    ); // 任务
                                } else if (
                                    el.originType == 3 &&
                                    el.quizOne.type == 1
                                ) {
                                    item.title.push(
                                        el.title + el.id + ele.userId
                                    ); // 任务
                                } else {
                                    item.score.push(
                                        (ele.gradeScore / 100) *
                                            (el.weight / 100)
                                    );
                                    item.fullScore.push(
                                        (el.score / 100) * (el.weight / 100)
                                    ); // 任务
                                    item.title.push(
                                        el.title + el.id + ele.userId
                                    ); // 任务
                                }
                            } else if (
                                ele.isGraded == undefined &&
                                ele.isOverdue == undefined
                            ) {
                                const nowTime = new Date().getTime();
                                if (
                                    ele.endTime == undefined ||
                                    nowTime <= ele.endTime
                                ) {
                                    item[el.title + el.id + ele.userId] =
                                        "未提交";
                                } else {
                                    item[el.title + el.id + ele.userId] =
                                        "缺交";
                                    item.missNum += 1;
                                }
                            }
                        } else {
                            item[el.title + el.id] = this.$t(
                                "message.unabsorbed"
                            ); //"未分配";
                        }
                        // });
                    });
                });
                this.allList.forEach(item => {
                    this.gradeGroup.forEach(el => {
                        let ss = 0;
                        let all = 0;
                        let ave = 0;
                        const aveKey = el.assignGroup.name + el.assignGroup.id;
                        el.assignGroup.assign.forEach(ele => {
                            if (item.title.length > 0) {
                                Array.from(new Set(item.title)).forEach(e => {
                                    if (e == ele.title + ele.id + item.id) {
                                        all += ele.score;
                                        if (item[e] == "迟交") {
                                            ss +=
                                                item[
                                                    `delay${ele.id}${item.id}`
                                                ];
                                        } else {
                                            ss += item[e];
                                        }
                                        // ave = `${((ss / all) * 100).toFixed(
                                        //     2
                                        // )}%`;
                                        item[aveKey] = ss.toFixed(2);
                                        // console.log(aveKey, ave, item.id);
                                        const trueScore = gradeBookPub.sum(
                                            item.score
                                        );
                                        const fullScore = gradeBookPub.sum(
                                            item.fullScore
                                        );
                                        item.trueScore = trueScore.toFixed(2);
                                        item.scorePer = `${(
                                            (trueScore / fullScore) *
                                            100
                                        ).toFixed(2)}%`;
                                    }
                                });
                            } else {
                                item[aveKey] = `${0}`;
                                item.trueScore = 0;
                                item.scorePer = `${0}%`;
                            }
                            if (item[aveKey] == undefined) {
                                item[aveKey] = `${0}`;
                            }
                        });
                    });
                });
                this.list = [...this.allList];
            } else {
                this.allList = [];
                this.loading2 = false;
                this.noDataFlag = true;
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style lang="less" scoped>
.title-box {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 28px 2% 28px 0;
    border-bottom: 6px solid #eee;
    .title-left {
        display: flex;
        line-height: 40px;
        h1 {
            margin-right: 40px;
            font-size: 26px;
            color: #333;
            line-height: 1;
            font-weight: normal;
            cursor: pointer;
            i {
                font-size: 24px;
                color: #666;
            }
        }
        span {
            margin-right: 10px;
        }
    }
}

.filter-box {
    padding: 20px 2% 20px 0;
    .filter-input {
        width: 250px;
    }
    .status-tips {
        display: inline-block;
        margin: 0 20px;
        b {
            display: inline-block;
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-right: 10px;
        }
        .delayed {
            background: #f7f031;
        }
        .missed {
            background: #f13026;
        }
        .un-graded {
            // color: #0e38b1;
        }
        .icon-tongjitu {
            font-size: 24px;
            color: #0e38b1;
        }
    }
    .total-more {
        float: right;
    }
}
.ungrade {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    text-align: center;
    border: 2px solid #b106cc;
    border-radius: 50%;
    font-size: 12px;
    font-weight: normal;
}
.total-radio {
    margin-bottom: 10px;
}

.table-show {
    min-height: 200px;
    padding-right: 2%;
    .unassigned-tip {
        margin-top: 20px;
        color: #999;
    }
}

.el-icon-warning {
    position: absolute;
    left: 5%;
    top: 6px;
}

.assign-title {
    border-bottom: 1px #333 solid;
    width: 66% !important;
    display: inline-block !important;
    padding-left: 0 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.assign-tip {
    li {
        line-height: 34px;
        span {
            display: inline-block;
            width: 110px !important;
            text-align: right;
        }
    }
}

.portrait {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border-radius: 50%;
}

.single-task {
    background: red;
    .status-bg {
        display: inline-block;
        width: 100%;
        background: red;
        box-sizing: border-box;
        height: 2px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

 {
    transform: translateX(24%);
    opacity: 0;
}
</style>
