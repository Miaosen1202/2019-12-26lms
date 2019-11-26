<template>
    <div>
        <!--start: Grade Task -->
        <div v-if="isTask" v-loading="loading2">
            <div class="title-box">
                <h1>{{ $t("message.Grade_Task") }}</h1>
                <div style="float: right;">
                    <el-button type="plain" @click="showGradeBook"
                        ><i class="iconfont icon-wendangshezhi"></i
                        >{{ $t("message.Grade_Book") }}
                    </el-button>
                    <!--<el-button type="plain"><i class="iconfont icon-bingtu_o" style="font-size: 20px; vertical-align: middle"></i> Learning Mastery</el-button>-->
                </div>
            </div>
            <!--start: 筛选搜索区域-->
            <div class="filter-box">
                <!--<el-input v-model="searchValue" placeholder="Filter by student name or Email" class="filter-input"></el-input>-->
                <el-select
                    v-model="selectValue"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    :placeholder="$t('message.Filter_student')"
                    :remote-method="remoteMethod"
                    popper-class="grade-book-select"
                    :loading="loading"
                >
                    <!--<el-option v-for="items in gradeList" :key="items.originId" :label="item.title" :value="item.title">
					</el-option>-->
                </el-select>

                <div class="select-box">
                    <span>{{ $t("message.MissionType") }}</span>
                    <el-select
                        v-model="typeValue"
                        placeholder="All"
                        class="filter-select"
                        @change="getGradeList()"
                    >
                        <el-option
                            v-for="(item, index) in typeOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="sequence-box">
                    <!--<span>Sequence by : </span>-->
                    <!--<el-radio-group v-model="sequenceRadio" @change="getGradeList()">
						<el-radio label="1">Default</el-radio>
						<el-radio label="2">Alphabetically</el-radio>
						<el-radio label="3">Due Date</el-radio>
						<el-radio label="4">Close Date</el-radio>
					</el-radio-group>-->
                </div>
            </div>
            <!--end: 搜索筛选区域-->
            <!--start: 列表-->
            <ul
                class="task-list"
                style=" border: 1px solid #eee;"
                v-show="gradeList.length"
            >
                <li v-for="(item, index) in gradeList" :key="index">
                    <div class="task-left">
                        <!--<i v-show="item.originType == 1" style="font-size: 20px;" class="iconfont icon-icon-edit"></i>
						<i v-show="item.originType == 2" style="font-size: 20px;" class="iconfont icon-liaotian"></i>
						<i v-show="item.originType == 3" style="font-size: 20px;" class="iconfont icon--xiugaineirong"></i>-->
                        <i
                            style="font-size: 20px; color: #666666;"
                            class="iconfont"
                            :class="{
                                'icon-icon-edit': item.originType == 1,
                                'icon-liaotian': item.originType == 2,
                                'icon--xiugaineirong': item.originType == 3
                            }"
                        ></i>
                        <div class="task-leftTitle">
                            <h1 :title="item.title">{{ item.title }}</h1>
                            <ul class="tag-list">
                                <v-time
                                    :assigns="item.fplb"
                                    :users="users"
                                    :sections="sections"
                                ></v-time>
                                <v-Dtime
                                    :assigns="item.fplb"
                                    :users="users"
                                    :sections="sections"
                                ></v-Dtime>
                                <span
                                    style="color: #999; margin-left: 10px; font-size: 12px;"
                                >
                                    <span v-show="item.score != null"
                                        >{{ item.score / 100 }}
                                        {{ $t("message.Pts") }}</span
                                    >
                                    <span v-show="item.score == null"
                                        >{{ item.score }}{{ $t("message.Pts") }}
                                    </span>
                                    <label>{{
                                        item.isGradeAssignment
                                    }}</label></span
                                >
                            </ul>
                        </div>
                    </div>
                    <div class="task-right">
                        <!--@command="GradCommand"-->
                        <el-dropdown class="grads-Command">
                            <el-button type="plain">
                                {{ $t("message.GradeNow") }}
                                <i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <!-- -->
                                <el-dropdown-item
                                    command="BatchGrade"
                                    :disabled="
                                        item.unGraderIdcount == null &&
                                            item.graderIdcount == null
                                    "
                                >
                                    <span
                                        class="GradeSpan"
                                        @click="
                                            batchGradeClick(
                                                item.originType,
                                                item.originId,
                                                item.title,
                                                item.unGraderIdcount,
                                                item.graderIdcount,
                                                item.score,
                                                item.isGradeAssignment,
                                                item.fplb
                                            )
                                        "
                                        >{{ $t("message.Batch_Grade") }}
                                    </span>
                                </el-dropdown-item>
                                <!--<p>{{item.originId}}</p>-->
                                <!---->
                                <el-dropdown-item
                                    command="BackOneGrade"
                                    :disabled="
                                        item.unGraderIdcount == null &&
                                            item.graderIdcount == null
                                    "
                                >
                                    <span
                                        class="GradeSpan"
                                        @click="
                                            oneGradeClick(
                                                item.originType,
                                                item.originId,
                                                item.title,
                                                item.unGraderIdcount,
                                                item.graderIdcount,
                                                item.score,
                                                item.isGradeAssignment,
                                                item.fplb
                                            )
                                        "
                                        >{{
                                            $t("message.Grade_one_by_one")
                                        }}</span
                                    >
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span v-if="item.unGraderIdcount || item.graderIdcount"
                            >{{ $t("message.unG") }} /
                            {{ $t("message.Graded") }} ：
                            <i
                                :class="item.unGraderIdcount == 0 ? '' : 'red'"
                                >{{ item.unGraderIdcount }}</i
                            >
                            / {{ item.graderIdcount }}
                        </span>
                        <span v-else
                            >{{ $t("message.unG") }} /
                            {{ $t("message.Graded") }} ：<i>0</i> / 0</span
                        >
                        <!--提交人数-->
                        <!--<span>Unsubmit ：<i>11</i></span>-->
                        <!--平均分-->
                        <span v-show="item.taskAvg != null"
                            >{{ $t("message.AverScore") }}：<em>{{
                                item.taskAvg / 100
                            }}</em>
                        </span>
                        <span v-show="item.taskAvg == null"
                            >{{ $t("message.AverScore") }}：<em>--</em>
                        </span>
                        <!--消息数-->
                        <span class="task-new"
                            ><i class="iconfont icon-message"></i>
                            <em>{{ item.plgs }}</em></span
                        >
                    </div>
                </li>
            </ul>
            <!--end: 列表-->
            <!--stat 列表无内容展示-->
            <p class="grade-nodata" v-show="!gradeList.length">
                {{ $t("message.Nothing_displayed") }}
            </p>
            <!--end 列表无内容展示-->
        </div>
        <!--end: Grade Task -->

        <!--逐一评分-->
        <!-- <div class="grade-box1" v-if="BackOneGrade">
			<v-gradesTask @One-grades="BackgGrades" @one-page="onePage" @book-page="bookPage" :gradeBatch="oneGrade"></v-gradesTask>
		</div> -->
        <!-- gradeBook -->
        <!--<div v-show="gradeBook">
			<gradeBook @task-page="taskPage" @book-page="bookPage" @stu="stuPage" @section="sectionPage" @user="handleUid" @user-list="userLists"></gradeBook>
		</div>-->
        <!--studentAnalytics-->
        <!--<div v-if="stuAnalytics">
			<analytics @book-page="bookPage" @stu="stuPage" :uid="uid" :user-list="this.userList"></analytics>
		</div>-->
        <!--sectionAnalytics-->
        <!--<div v-if="sectionAnalytics">
			<sectionAnalytics @book-page="bookPage" @section="sectionPage"></sectionAnalytics>
		</div>-->
        <!--<div style="">
			<v-stugrades></v-stugrades>
		</div>-->
        <!--end: Batch grade-->
    </div>
</template>

<script>
import gradesTask from "./grades/gradesTask.vue";
import gradeBook from "@/components/course/grades/gradeBook.vue";
import analytics from "@/components/course/grades/stuAnalytics.vue";
import sectionAnalytics from "@/components/course/grades/sectionAnalytics.vue";
//	import stugrades from "@/components/course/grades/stuGrades.vue";
import dueDraw from "@/utils/dueDraw";
import availableDraw from "@/utils/availableDraw";
export default {
    data() {
        return {
            loading2: true,
            searchValue: "",
            selectValue: "",
            loading: false,
            list: [],
            typeOptions: [
                {
                    value: "",
                    label: this.$t("message.All")
                },
                {
                    value: "1",
                    label: this.$t("message.Assignment")
                },
                {
                    value: "2",
                    label: this.$t("message.Discussion")
                },
                {
                    value: "3",
                    label: this.$t("message.Quiz")
                }
            ],
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
                    label: this.$t("message.Have_been")
                }
            ],
            statusValue: "2", // 以评分，未评分。
            typeValue: "", //任务类型 ；作业 ；讨论；测验
            //				sequenceRadio: '1', //
            isTask: true,
            BatchGrade: false,
            BackOneGrade: false,
            switchValue: "",
            submitValue: "1",
            missionValue: "2",
            scoreValue: "",
            scoreValue1: "",
            gradeScore: "",
            gradeBook: false, //作业本
            stuAnalytics: false, //学生统计页面
            sectionAnalytics: false, //班级统计页面
            gradedOverChecked: "", //选中批量打分
            SetLowestChecked: false,
            isOverWrite: "0",
            isSetLowestScore: "0",
            muteChecked: "",
            textarea: "",
            gradeList: [], //评分列表
            gradeListTime: [],
            gradeBatch: "", //批量批改
            gradeType: "",
            groupList: [],
            gradeStatisticsQuery: "", //批量显示列表；
            scoreDisabled: false, //设置禁止事件
            setScoreDisabled: true,
            OverDisabled: false,
            uid: 1,
            userList: [],
            gradSucceed: false,
            studentGrade: [],
            oneGrade: "",
            StatisticsQuery: [],
            types: "",
            userId: "",
            sections: [], //所有班级
            users: [] //所有用
        };
    },
    computed: {
        userNameMap: function() {
            var map = {};
            this.studentGrade.forEach(s => {
                map[s.id] = s.name;
            });
            return map;
        }
    },

    components: {
        gradeBook,
        analytics,
        "v-gradesTask": gradesTask,
        sectionAnalytics,
        "v-time": availableDraw,
        "v-Dtime": dueDraw
        //			"v-stugrades": stugrades,
    },
    created() {
        let width = document.body.clientWidth;
    },
    filters: {
        //          filterStudentName(val) {
        //              console.log("items.userId",val);
        //          },
    },
    mounted() {
        this.getGradeList();
        this.getAssignDataList();
    },
    methods: {
        remoteMethod(query) {
            var _this = this;
            if (query !== "") {
                _this.loading = true;
                setTimeout(() => {
                    _this.loading = false;
                    _this.gradeList = _this.list.filter(item => {
                        return (
                            item.title
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    });
                }, 100);
            } else {
                _this.gradeList = _this.list;
            }
        },
        //获取焦点value值为空；
        gradeScorechange(num) {
            //				if(!/^\d+(\.\d{1,1})?$/.test(num)) {
            //					this.scoreValue = '';
            //					this.scoreValue1 = '';
            //					this.gradSucceed = false;
            //					this.$message({
            //						message: 'can enter only one decimal',
            //						type: 'warning'
            //					});
            //
            //				} else if(!/^([1-9]\d*|0)(\.\d*[1-9])?$/.test(num)) {
            //					this.scoreValue = '';
            //					this.scoreValue1 = '';
            //					this.gradSucceed = false;
            //					this.$message({
            //						message: 'Please enter the correct score',
            //						type: 'warning'
            //					});
            //
            //				} else if(parseInt(num) > parseInt(this.gradeBatch.score)) {
            //					this.gradSucceed = false;
            //					this.$message({
            //						message: 'Score range 0 to' + this.gradeBatch.score / 100 + '.',
            //						type: 'warning'
            //					});
            //
            //				} else if(this.scoreValue != '') {
            //					this.gradSucceed = false;
            //					this.gradeScore = this.scoreValue;
            //				} else if(this.scoreValue1 != '') {
            //					this.gradSucceed = false;
            //					this.gradeScore = this.scoreValue1;
            //				}
        },
        //选择最低分
        SetLowestchange() {
            if (this.SetLowestChecked == true) {
                this.isSetLowestScore = 1;
                this.scoreDisabled = true;
                //覆盖评分框
                this.gradedOverChecked = false;
                //覆盖禁止框
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
        //分值覆盖；
        Overchange() {
            if (this.gradedOverChecked == true) {
                this.setScoreDisabled = true;
            } else {
                this.setScoreDisabled = true;
            }
        },
        //分数成功提示
        gradDone() {
            this.gradSucceed = false;
        },
        // grade下拉框
        //			GradCommand(command) {
        //				this.isTask = false;
        //				this.BatchGrade = false;
        //				this.BackOneGrade = false;
        //				switch(command) {
        //					case 'BatchGrade':
        //						// this.BatchGrade = true;
        //						// this.$router.push({
        //						// 	path: "/homePage/allCourse/batchGradePage",
        //						// 	query: {
        //						// 		courseId: this.$route.query.courseId
        //						// 	}
        //						// });
        //						break;
        //					case 'BackOneGrade':
        //						// this.BackOneGrade = true;
        //						break;
        //				}
        //			},
        batchGradeClick(
            originType,
            originId,
            title,
            unGraderIdcount,
            graderIdcount,
            score,
            isGradeAssignment,
            fplb
        ) {
            this.$router.push({
                path: "/homePage/allCourse/batchGradePage",
                query: {
                    courseId: this.$route.query.courseId,
                    originType,
                    originId,
                    title,
                    unGraderIdcount,
                    graderIdcount,
                    score,
                    isGradeAssignment,
                    fplb
                }
            });
        },
        oneGradeClick(
            originType,
            originId,
            title,
            unGraderIdcount,
            graderIdcount,
            score,
            isGradeAssignment,
            fplb
        ) {
            this.$router.push({
                path: "/homePage/allCourse/oneGradePage",
                query: {
                    courseId: this.$route.query.courseId,
                    originType,
                    originId,
                    title,
                    unGraderIdcount,
                    graderIdcount,
                    score,
                    isGradeAssignment,
                    fplb
                }
            });
        },
        //批量评分
        //			async getBatchGrade(originType, originId, title, unGraderIdcount, graderIdcount, score, isGradeAssignment, fplb) {
        //				if(this.BatchGrade == true) {
        //					this.gradeType = 2;
        //				} else {
        //					this.gradeType = 1;
        //				}
        //				if(isGradeAssignment == "group") {
        //					isGradeAssignment = 2;
        //				} else {
        //					isGradeAssignment = 1;
        //				}
        //				if(unGraderIdcount == undefined) {
        //					unGraderIdcount = 0;
        //				}
        //				if(graderIdcount == undefined) {
        //					graderIdcount = 0;
        //				}
        //				let params = {
        //					originType: originType,
        //					originId: originId,
        //					gradeType: this.gradeType, // 2批量   1单个
        //					originName: title,
        //					unG: unGraderIdcount,
        //					graded: graderIdcount,
        //					//unGGraded: unGraderIdcount + '▓' + graderIdcount,
        //					score: score,
        //					releaseType: isGradeAssignment, //1：个人  2：小组
        //				}
        //				let result = await this.$getData('/gradeDataQuery/gradeQuery/query', params, 'get');
        //				if(result.data.code == 200) {
        //					this.gradeBatch = result.data.entity.gradeInfoVo;
        //					//this.groupList = result.data.entity.groupList;
        //					this.gradeOneStuGroupQuery();
        //					this.getStatisticsQuery();
        //				} else {
        //
        //				}
        //
        //			},
        //查询单个任务的组、学生list
        //			async gradeOneStuGroupQuery() {
        //				let params = {
        //					originType: this.gradeBatch.originType,
        //					originId: this.gradeBatch.originId,
        //					releaseType: this.gradeBatch.releaseType,
        //					sequence: 1, //提交类型 1
        //					gradedStatus: 2, //评分 2
        //				}
        //				let result = await this.$getData('/gradeDataQuery/gradeOneStuGroupQuery/query', params, 'get');
        //				if(result.data.code == 200) {
        //					//判断是否是小组
        //					if(result.data.entity.groupListVoList) {
        //						var groupListVoLists = result.data.entity.groupListVoList;
        //						var obj = {};
        //						this.groupList = [];
        //						//筛选小组是否重复
        //						for(var i = 0; i < groupListVoLists.length; i++) {
        //							if(!obj[groupListVoLists[i].id]) {
        //								this.groupList.push(groupListVoLists[i]);
        //								obj[groupListVoLists[i].id] = true;
        //							}
        //						}
        //					}
        //					//学生没有userid,小组的时候才会显示userid
        //					//	if(result.data.entity.studentListVos) {
        //					//     this.groupList = result.data.entity.studentListVos;
        //					//	}
        //
        //				} else {}
        //			},
        //逐一评分
        //			async getoneGrade(originType, originId, title, unGraderIdcount, graderIdcount, score, isGradeAssignment, fplb) {
        //				if(this.BatchGrade == true) {
        //					this.gradeType = 2;
        //				} else {
        //					this.gradeType = 1;
        //				}
        //				if(isGradeAssignment == "group") {
        //					isGradeAssignment = 2;
        //				} else {
        //					isGradeAssignment = 1;
        //				}
        //				if(unGraderIdcount == undefined) {
        //					unGraderIdcount = 0;
        //				}
        //				if(graderIdcount == undefined) {
        //					graderIdcount = 0;
        //				}
        //				let params = {
        //					originType: originType,
        //					originId: originId,
        //					gradeType: 1,
        //					originName: title,
        //					unG: unGraderIdcount,
        //					graded: graderIdcount,
        //					//					unGGraded: unGraderIdcount + '▓' + graderIdcount,
        //					score: score,
        //					releaseType: isGradeAssignment,
        //				}
        //				let result = await this.$getData('/gradeDataQuery/gradeQuery/query', params, 'get');
        //				if(result.data.code == 200) {
        //					this.oneGrade = result.data.entity.gradeInfoVo;
        //					//	this.groupList = result.data.entity.groupList;
        //				} else {}
        //
        //			},
        //提交评分人数展示
        //			async getStatisticsQuery() {
        //				var GroupAndAll = '';
        //				if(this.missionValue == 2) {
        //					GroupAndAll = 0;
        //				} else {
        //					GroupAndAll = 1;
        //				}
        //				let params = {
        //					originType: this.gradeBatch.originType,
        //					originId: this.gradeBatch.originId,
        //					releaseType: this.gradeBatch.releaseType, //1个人 ，2小组；
        //					studyGroupId: this.missionValue,
        //					submitStatus: this.submitValue,
        //					isGrade: this.statusValue,
        //					isGroupAndAll: GroupAndAll,
        //				}
        //				let result = await this.$getData('/gradeDataQuery/gradeStatisticsQuery/query', params, 'get');
        //				if(result.data.code == 200) {
        //					this.gradeStatisticsQuery = result.data.entity;
        //				} else {
        //
        //				}
        //			},
        selectMission() {
            this.getStatisticsQuery();
        },
        selectStatusValue() {
            this.getStatisticsQuery();
        },
        BackTask() {
            this.BatchGrade = false;
            this.BackOneGrade = false;
            this.isTask = true;
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
        taskPage(val) {
            this.isTask = val;
        },
        bookPage(val) {
            this.gradeBook = val;
        },
        stuPage(val) {
            this.stuAnalytics = val;
        },
        sectionPage(val) {
            this.sectionAnalytics = val;
        },
        handleUid(val) {
            this.uid = val;
        },
        BackgGrades(val) {
            this.isTask = val;
        },
        onePage(val) {
            this.BackOneGrade = val;
        },
        //时间转换
        timestampToTime(cjsj) {
            var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            return Y + M + D;
            //				console.log(timestampToTime(1533293827000))
        },
        //评分列表；
        async getGradeList() {
            let params = {
                originType: this.typeValue,
                courseId: this.$route.query.courseId
            };
            let result = await this.$getData(
                "/grade/data/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeList = result.data.entity;
                this.loading2 = false;
                this.list = this.gradeList.map(item => {
                    return item;
                });
                //this.getStatisticsQuery();
            } else {
            }
        },
        //提交批量打分；
        //			async gradeSubmit() {
        //				if(this.SetLowestChecked == true) {
        //					this.gradeScore = this.scoreValue1;
        //				} else {
        //					this.gradeScore = this.scoreValue;
        //				}
        //				//				this.gradeScore = this.scoreValue1;
        //				for(var i = 0; i < this.groupList.length; i++) {
        //					if(this.gradedStatus == this.groupList[i].id) {
        //						this.userId = this.groupList[i].userId;
        //						this.types = this.groupList[i].type;
        //					}
        //				}
        //				if(this.BatchGrade == true) {
        //					this.gradeType = 2;
        //				} else {
        //					this.gradeType = 1;
        //				}
        //				//设置批量评分
        //				if(this.gradedOverChecked == true) { //不 0； 覆盖1
        //					this.isOverWrite = 1;
        //				} else if(this.OverDisabled == true) {
        //					this.isOverWrite = 0;
        //				}
        //
        //				if(parseFloat(this.gradeScore) >= 0 && this.gradeScore <= this.gradeBatch.score / 100) {
        //					if(this.missionValue == 2) {
        //						let params = {
        //							courseId: this.gradeBatch.courseId,
        //							assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
        //							originType: this.gradeBatch.originType,
        //							originId: this.gradeBatch.originId,
        //							content: this.tex1tarea,
        //							userId: this.gradeBatch.userId,
        //							isSendGroupUser: "0",
        //							score: this.gradeBatch.score,
        //							gradeScore: this.gradeScore * 100,
        //							isOverWrite: this.isOverWrite, // 是否覆盖之前的评分 0不覆盖  1覆盖
        //							isSetLowestScore: this.isSetLowestScore, // 设置最低评分 0不设置  1设置
        //							gradeType: this.gradeType, //1个人 2 小组
        //							releaseType: this.gradeBatch.releaseType, //1个人 2 小组
        //							studyGroupId: this.missionValue,
        //							userType: 2,
        //						}
        //						var gradeParams = params;
        //					} else {
        //						if(this.types == 0) {
        //							let params = {
        //								courseId: this.gradeBatch.courseId,
        //								assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
        //								originType: this.gradeBatch.originType,
        //								originId: this.gradeBatch.originId,
        //								content: this.tex1tarea,
        //								userId: this.gradeBatch.userId,
        //								isSendGroupUser: "0",
        //								score: this.gradeBatch.score,
        //								gradeScore: this.gradeScore * 100,
        //								isOverWrite: this.isOverWrite, // 是否覆盖之前的评分 0不覆盖  1覆盖
        //								isSetLowestScore: this.isSetLowestScore, // 设置最低评分 0不设置  1设置
        //								gradeType: this.gradeType,
        //								releaseType: this.gradeBatch.releaseType, //1个人 2 小组
        //								studyGroupId: this.missionValue,
        //								userType: 0,
        //							}
        //							var gradeParams = params;
        //						} else {
        //							let params = {
        //								courseId: this.gradeBatch.courseId,
        //								assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
        //								originType: this.gradeBatch.originType,
        //								originId: this.gradeBatch.originId,
        //								content: this.tex1tarea,
        //								userId: this.gradeBatch.userId,
        //								isSendGroupUser: "0",
        //								score: this.gradeBatch.score,
        //								gradeScore: this.gradeScore * 100,
        //								isOverWrite: this.isOverWrite, // 是否覆盖之前的评分 0不覆盖  1覆盖
        //								isSetLowestScore: this.isSetLowestScore, // 设置最低评分 0不设置  1设置
        //								gradeType: this.gradeType,
        //								releaseType: this.gradeBatch.releaseType, //1个人 2 小组
        //								studyGroupId: this.missionValue,
        //								userType: 1,
        //							}
        //							var gradeParams = params;
        //						}
        //					}
        //					let result = await this.$getData('/gradedEdit/add', gradeParams, 'post');
        //					if(result.data.code == 200) {
        //						//						this.scoreValue = "";
        //						this.gradeScore = "";
        //						this.$message({
        //							message: 'Done',
        //							type: 'success'
        //						});
        //						//						this.gradSucceed = true;
        //						this.gradeSub();
        //						this.getStatisticsQuery();
        //
        //					} else {
        //
        //					}
        //				} else {
        //					this.$message({
        //						message: 'Score range 0 to' + this.gradeBatch.score / 100 + '.',
        //						type: 'warning'
        //					});
        //					this.scoreValue = "";
        //
        //				}
        //			},
        //提交评语
        //			async gradeSub() {
        //				if(this.BatchGrade == true) {
        //					this.gradeType = 2;
        //				} else {
        //					this.gradeType = 1;
        //				}
        //				//				if(this.textarea == "") {
        //				//					this.$message({
        //				//						message: 'Please input comment content firstly',
        //				//						type: 'warning'
        //				//					});
        //				//				} else {
        //				if(this.missionValue == 2) {
        //					let params = {
        //						courseId: this.gradeBatch.courseId,
        //						assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
        //						originType: this.gradeBatch.originType,
        //						originId: this.gradeBatch.originId,
        //						content: this.textarea,
        //						userId: this.userId,
        //						isSendGroupUser: "0",
        //						gradeType: this.gradeType,
        //						releaseType: this.gradeBatch.releaseType,
        //						studyGroupId: this.missionValue,
        //						userType: 2,
        //						isSetLowestScore: this.isSetLowestScore,
        //					}
        //					var stbAddParams = params;
        //				} else {
        //					if(this.types == 0) {
        //						let params = {
        //							courseId: this.gradeBatch.courseId,
        //							assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
        //							originType: this.gradeBatch.originType,
        //							originId: this.gradeBatch.originId,
        //							content: this.textarea,
        //							userId: this.userId,
        //							isSendGroupUser: "0",
        //							gradeType: this.gradeType,
        //							releaseType: this.gradeBatch.releaseType,
        //							studyGroupId: this.missionValue,
        //							userType: 0,
        //							isSetLowestScore: this.isSetLowestScore,
        //						}
        //						var stbAddParams = params;
        //					} else {
        //						let params = {
        //							courseId: this.gradeBatch.courseId,
        //							assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
        //							originType: this.gradeBatch.originType,
        //							originId: this.gradeBatch.originId,
        //							content: this.textarea,
        //							userId: this.userId,
        //							isSendGroupUser: "0",
        //							gradeType: this.gradeType,
        //							releaseType: this.gradeBatch.releaseType,
        //							studyGroupId: this.missionValue,
        //							userType: 1,
        //						}
        //						var stbAddParams = params;
        //					}
        //				}
        //				let result = await this.$getData('/gradedCommentEdit/add', stbAddParams, 'post');
        //				if(result.data.code == 200) {
        //					this.textarea = "";
        //				} else {
        //
        //				}
        //				//				}
        //			},
        userLists(val) {
            this.userList = val;
        },
        // 评分列表的时间及人数展示
        async getAssignDataList() {
            let params = {
                data: this.$route.query.courseId
            };
            let result = await this.$getData("/assign/get", params, "get");
            if (result.data.code == 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        }
    }
};
</script>

<style scoped="" lang="less">
.grade-box {
    /*border-bottom: 1px solid #eee;*/
}
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
            width: 50%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: center;
            .task-leftTitle {
                margin-left: 10px;
                h1 {
                    font-size: 14px;
                    color: #666;
                    margin-left: 10px;
                    width: 420px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
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
            width: 50%;
            /*text-align: center;*/
            > span {
                /*width: 18%;*/
                display: inline-block;
                text-align: left;
                /*margin: 0px 4px;*/
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
    width: 34%;
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
    width: 66px;
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
.grads-Command .el-dropdown-menu__item {
    padding: 0px !important;
}
.GradeSpan {
    width: 136px;
    line-height: 36px;
    padding: 0px 20px;
    display: inline-block;
}
.grads-Command {
}
</style>
