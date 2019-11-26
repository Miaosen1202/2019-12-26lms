<template>
    <div>
        <!--eslint-disable-->
        <div v-show="isyincang">
            <div class="summary-Quizzes">
                <div class="quizzes-search">
                    <el-input
                        v-model="watchTitle"
                        :placeholder="$t('message.Search_for_Quiz')"
                        prefix-icon="el-icon-search"
                        @input="searchTitle"
                    >
                    </el-input>
                </div>
                <!--todo 保留三份为后续添加-->
                <div class="modules-list">
                    <div class="modules-group">
                        <div class="module-heard">
                            <p
                                style="display: inline-block;cursor: pointer"
                                @click="QQpracticeQuizList"
                            >
                                <i
                                    v-show="TeacherQuizList"
                                    class="iconfont icon-sanjiao_xia"
                                ></i>
                                <i
                                    v-show="!TeacherQuizList"
                                    class="iconfont icon-sanjiaoyou"
                                ></i>
                                {{ $t("message.Practice_Quizzes") }}
                            </p>
                        </div>
                        <div class="quizzList-border">
                            <div
                                class="modules-row"
                                style="text-align: center;"
                                v-show="TeacherQuizList"
                                v-if="practiceQuizList.length == 0"
                            >
                                <span>{{
                                    $t("message.No_assignment_quizzes")
                                }}</span>
                            </div>
                            <div
                                class="content"
                                v-for="(quizz, index) in practiceQuizList"
                                v-show="TeacherQuizList"
                                :key="index"
                            >
                                <ul>
                                    <li>
                                        <div class="modules-row">
                                            <div class="drag">
                                                <i
                                                    class="iconfont icon--xiugaineirong i_edit"
                                                ></i>
                                            </div>
                                            <div class="quiz_drag">
                                                <p
                                                    class="studentTitle"
                                                    @click="
                                                        showQuize(
                                                            quizz.id,
                                                            quizz.title
                                                        )
                                                    "
                                                >
                                                    {{ quizz.title }}
                                                </p>
                                                <div class="quizzes-time">
                                                    <ul>
                                                        <v-due-time
                                                            :assigns="
                                                                quizz.assignUsers
                                                            "
                                                        ></v-due-time>
                                                        <v-available-time
                                                            :assigns="
                                                                quizz.assignUsers
                                                            "
                                                        ></v-available-time>
                                                        <!--<li v-show="quizz.totalScore">{{quizz.totalScore/100}}  Point(s)</li>-->
                                                        <!--<li v-show="quizz.totalQuestions">{{quizz.totalQuestions}}  Question(s)</li>-->
                                                        <li
                                                            v-if="
                                                                !quizz.totalScore ==
                                                                    0 &&
                                                                    quizz.totalScore <=
                                                                        100
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalScore /
                                                                    100
                                                            }}
                                                            {{
                                                                $t("message.Pt")
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalScore >
                                                                    100
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalScore /
                                                                    100
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Pts"
                                                                )
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalQuestions ==
                                                                    0
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Question"
                                                                )
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                !quizz.totalQuestions ==
                                                                    0 &&
                                                                    quizz.totalQuestions <=
                                                                        1
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Question"
                                                                )
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalQuestions >
                                                                    1
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Questions"
                                                                )
                                                            }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modules-group">
                        <div class="module-heard">
                            <p
                                style="display: inline-block;cursor: pointer"
                                @click="QQgradedQuizList"
                            >
                                <i
                                    v-show="TeachergradedQuizList"
                                    class="iconfont icon-sanjiao_xia"
                                ></i>
                                <i
                                    v-show="!TeachergradedQuizList"
                                    class="iconfont icon-sanjiaoyou"
                                ></i>
                                {{ $t("message.Assignment_Quizzes") }}
                            </p>
                        </div>
                        <div class="quizzList-border">
                            <div
                                class="modules-row"
                                style="text-align: center;"
                                v-show="TeachergradedQuizList"
                                v-if="gradedQuizList.length == 0"
                            >
                                <span>{{
                                    $t("message.No_assignment_quizzes")
                                }}</span>
                            </div>
                            <div
                                class="content"
                                v-for="(quizz, index) in gradedQuizList"
                                v-show="TeachergradedQuizList"
                                :key="index"
                            >
                                <ul>
                                    <li>
                                        <div class="modules-row">
                                            <div class="drag">
                                                <i
                                                    class="iconfont icon--xiugaineirong i_edit"
                                                ></i>
                                            </div>
                                            <div class="quiz_drag">
                                                <p
                                                    class="studentTitle"
                                                    @click="
                                                        showQuize(
                                                            quizz.id,
                                                            quizz.title
                                                        )
                                                    "
                                                >
                                                    {{ quizz.title }}
                                                </p>

                                                <div class="quizzes-time">
                                                    <ul>
                                                        <v-due-time
                                                            :assigns="
                                                                quizz.assignUsers
                                                            "
                                                        ></v-due-time>
                                                        <v-available-time
                                                            :assigns="
                                                                quizz.assignUsers
                                                            "
                                                        ></v-available-time>
                                                        <li
                                                            v-if="
                                                                !quizz.totalScore ==
                                                                    0 &&
                                                                    quizz.totalScore <=
                                                                        100
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalScore /
                                                                    100
                                                            }}
                                                            {{
                                                                $t("message.Pt")
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalScore >
                                                                    100
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalScore /
                                                                    100
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Pts"
                                                                )
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalQuestions ==
                                                                    0
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Question"
                                                                )
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                !quizz.totalQuestions ==
                                                                    0 &&
                                                                    quizz.totalQuestions <=
                                                                        1
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Question"
                                                                )
                                                            }}
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalQuestions >
                                                                    1
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            {{
                                                                $t(
                                                                    "message.Questions"
                                                                )
                                                            }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modules-group" v-show="false">
                        <div class="module-heard">
                            <p
                                style="display: inline-block;cursor: pointer"
                                @click="QQsurveyQuizList"
                            >
                                <i
                                    v-show="TeachersurveyList"
                                    class="iconfont icon-sanjiao_xia"
                                ></i>
                                <i
                                    v-show="!TeachersurveyList"
                                    class="iconfont icon-sanjiaoyou"
                                ></i>
                                Questionnaire survey
                            </p>
                        </div>
                        <div class="quizzList-border">
                            <div
                                class="content"
                                v-for="(quizz, index) in surveyList"
                                v-show="TeachersurveyList"
                                :key="index"
                            >
                                <ul>
                                    <li>
                                        <div class="modules-row">
                                            <div class="drag">
                                                <i
                                                    class="iconfont icon--xiugaineirong"
                                                    style="font-size: 22px;"
                                                ></i>
                                            </div>
                                            <div class="quiz_drag">
                                                <p
                                                    class="studentTitle"
                                                    @click="showQuize(quizz.id)"
                                                >
                                                    {{ quizz.title }}
                                                </p>

                                                <div class="quizzes-time">
                                                    <ul>
                                                        <v-due-time
                                                            :assigns="
                                                                quizz.assignUsers
                                                            "
                                                        ></v-due-time>
                                                        <v-available-time
                                                            :assigns="
                                                                quizz.assignUsers
                                                            "
                                                        ></v-available-time>
                                                        <!--<li>已关闭 |</li>-->
                                                        <!--<li v-if="quizz.assignUsers.limitTime"> {{quizz.assignUsers.limitTime | formatDate(time) }}-->
                                                        <!--</li>-->
                                                        <!--<li v-if="quizz.assignUsers.endTime"> {{quizz.assignUsers.endTime | formatDate(time) }}</li>-->
                                                        <!--<li v-show="quizz.score">{{quizz.score/100}}  Point(s)</li>-->
                                                        <!--<li v-show="quizz.totalQuestions">{{quizz.totalQuestions}}  Question(s)</li>-->

                                                        <li
                                                            v-if="
                                                                !quizz.totalScore ==
                                                                    0 &&
                                                                    quizz.totalScore <=
                                                                        100
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalScore /
                                                                    100
                                                            }}
                                                            Pt
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalScore >
                                                                    100
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalScore /
                                                                    100
                                                            }}
                                                            Pts
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalQuestions ==
                                                                    0
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            Question
                                                        </li>
                                                        <li
                                                            v-if="
                                                                !quizz.totalQuestions ==
                                                                    0 &&
                                                                    quizz.totalQuestions <=
                                                                        1
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            Question
                                                        </li>
                                                        <li
                                                            v-if="
                                                                quizz.totalQuestions >
                                                                    1
                                                            "
                                                        >
                                                            {{
                                                                quizz.totalQuestions
                                                            }}
                                                            Questions
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    S
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
import goTop from "@/utils/goTop.vue";
import eventBus from "@/eventBus";
import { formatDate } from "@/utils/date";
import { mapGetters } from "vuex";
import dueDraw from "@/utils/dueDraw";
import availableDraw from "@/utils/availableDraw";

export default {
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    data() {
        return {
            /***
             * *测验列表
             * */
            watchTitle: "",
            assignUser: [],
            courseId: this.$route.query.courseId,
            practiceQuizList: [],
            showQuizInforList: [],
            gradedQuizList: [],
            surveyList: [],
            TeacherQuizList: true,
            TeachersurveyList: true,
            TeachergradedQuizList: true,
            datas: "",
            time: "",
            quizInfoGetTaba: [],
            quizInfoGetList: [],
            assign: [
                {
                    assignType: "1",
                    limitTime: "",
                    startTime: "",
                    endTime: ""
                }
            ],
            quizItemList: [],
            quizRecordId: "",
            quizRecordlist: [],
            studentShowQuizz: "",
            displayError: "",
            // isOpen: false,
            fileList: [],
            action: process.env.NODE_ENV,
            value1time: "",
            showQuizzes: false,
            isShow: false,
            isyincang: true,
            xianshi: false,
            quizzesPublish: false,
            quizzesStarted: false,
            moduleSpread: false,
            quizzesSubmit: false,
            takeTheQuizAgain: false,
            takeTheQuizNext: false,
            submitCourse: 1000,
            tabPosition: "left",
            input: "",
            input21: "",
            activeName: "first",
            quizeRight: "first",
            value2: "",
            multipleSelection: [],
            value1: null,
            dialogVisible: false,
            dialogFormVisible: false,
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            radio: "1",
            formLabelWidth: "28%",
            dynamicValidateForm: {
                domains: [
                    {
                        value: ""
                    }
                ]
            },
            editDynamicValidateForm: {
                domains: [
                    {
                        value: ""
                    }
                ]
            },
            dialogVisibleOutline: false,
            value: "",
            labelPosition: "right",
            formLabelAlign: {
                name: "",
                region: "",
                type: ""
            },
            value5: [],

            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    components: {
        "v-goTop": goTop,
        "v-due-time": dueDraw,
        "v-available-time": availableDraw
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    mounted() {
        this.quizInforList();
    },
    methods: {
        /*showQuize: function () {
        this.isyincang = false;
        this.xianshi = true;
        this.quizzesPublish = false;
        this.quizzesStarted = false;
        this.quizzesSubmit = false;
      },*/
        originalPage: function() {
            this.isyincang = true;
            this.xianshi = false;
            this.quizzesPublish = false;
            this.quizzesStarted = false;
            this.quizzesSubmit = false;
            eventBus.$emit("originalPage");
        },
        startedQuizzes: function() {
            this.isyincang = false;
            this.xianshi = false;
            this.quizzesPublish = false;
            this.quizzesStarted = true;
            this.quizzesSubmit = false;
            this.takeTheQuizNext = false;
            this.takeTheQuizAgain = true;
        },
        startedQuizzesNext: function() {
            this.isyincang = false;
            this.xianshi = false;
            this.quizzesPublish = false;
            this.quizzesStarted = true;
            this.quizzesSubmit = false;
            this.takeTheQuizNext = true;
            this.takeTheQuizAgain = false;
        },
        submitQuizzes: function() {
            this.isyincang = false;
            this.xianshi = false;
            this.quizzesPublish = false;
            this.quizzesStarted = false;
            this.quizzesSubmit = true;
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: "",
                key: Date.now()
            });
        },
        editRemoveDomain(item) {
            var index = this.editDynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.editDynamicValidateForm.domains.splice(index, 1);
            }
        },
        editAddDomain() {
            this.editDynamicValidateForm.domains.push({
                value: "",
                key: Date.now()
            });
        },
        outline() {},
        handleNodeClick(data) {
            console.log(data);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        quizInforList: function() {
            let param = {
                courseId: this.courseId,
                pageSize: 1000
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quiz/pageList`, { params: param })
                .then(res => {
                    if (res.data.code == 200) {
                        this.practiceQuizList = [];
                        this.gradedQuizList = [];
                        this.surveyList = [];
                        this.showQuizInforList = res.data.entity.list;
                        this.showQuizInforList.forEach(e => {
                            let assignUser1 = [];
                            let assignUser2 = [];
                            let assignUser3 = [];
                            if (e.type == 1) {
                                this.practiceQuizList.push(e);
                                assignUser1.push(e.assignUsers);
                                e.assignUsers = assignUser1;
                            } else if (e.type == 2) {
                                this.gradedQuizList.push(e);
                                assignUser2.push(e.assignUsers);
                                e.assignUsers = assignUser2;
                            } else if (e.type == 3 || e.type == 4) {
                                this.surveyList.push(e);
                                assignUser3.push(e.assignUsers);
                                e.assignUsers = assignUser3;
                            }
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * search搜索
         */
        searchTitle() {
            const that = this;
            let t;
            clearTimeout(t);
            t = setTimeout(() => {
                that.$http
                    .get(`${process.env.NODE_ENV}/quiz/pageList`, {
                        params: {
                            courseId: that.courseId,
                            pageSize: 1000,
                            title: that.watchTitle
                        }
                    })
                    .then(res => {
                        that.practiceQuizList = [];
                        that.gradedQuizList = [];
                        that.surveyList = [];
                        that.showQuizInforList = res.data.entity.list;
                        that.showQuizInforList.forEach(e => {
                            if (e.type == 1) {
                                that.practiceQuizList.push(e);
                            } else if (e.type == 2) {
                                that.gradedQuizList.push(e);
                            } else if (e.type == 3) {
                                that.surveyList.push(e);
                            }
                        });
                    });
            }, 100);
        },
        QQpracticeQuizList() {
            this.TeacherQuizList = !this.TeacherQuizList;
        },
        QQsurveyQuizList() {
            this.TeachersurveyList = !this.TeachersurveyList;
        },
        QQgradedQuizList() {
            this.TeachergradedQuizList = !this.TeachergradedQuizList;
        },

        showQuize: function(id, title) {
            this.$router.push({
                path: "/studentHomePage/studentAllCourse/quizzDetail",
                query: {
                    quizDetailId: id,
                    courseId: this.courseId,
                    name: title
                }
            });
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/get?data=${id}`)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.entity.id;
                        this.isyincang = false;
                        this.xianshi = true;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGetList = res.data.entity;
                        this.HistoryQuery();
                        this.quizItemOpen();
                        // this.minutes=res.data.entity.limitTime;
                        this.quizInfoGetTaba = res.data.entity.assigns;
                        // this.quizInfoGetTaba = this.quizInfoGetTaba.map(el => {
                        //   if (el.assignType == 1) {
                        //     el.typeName = 'Everyone'
                        //   } else if (el.assignType == 2) {
                        //     el.typeName = 'Class'
                        //   } else if (el.assignType == 3) {
                        //     el.typeName = 'Student'
                        //   }
                        //   let tempObj = {
                        //     limitTime: '',
                        //     endTime: '',
                        //     startTime: ''
                        //   };
                        //   el = Object.assign(tempObj, el)
                        //   return el
                        // });
                        // for (let i = 0; i < this.quizInfoGetTaba.length; i++) {
                        //   let tempItem = this.quizInfoGetTaba[i];
                        //   tempItem.limitTime = tempItem.limitTime.length == 0 ? '— —' : formatDate(new Date(tempItem.limitTime), 'yyyy-MM-dd hh:mm:ss');
                        //   tempItem.startTime = tempItem.startTime.length == 0 ? '— —' : formatDate(new Date(tempItem.startTime), 'yyyy-MM-dd hh:mm:ss');
                        //   tempItem.endTime = tempItem.endTime.length == 0 ? '— —' : formatDate(new Date(tempItem.endTime), 'yyyy-MM-dd hh:mm:ss');
                        // }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 点击测验题触发，查看学生能否答题
         **/
        quizItemOpen: function() {
            let studentRights = {
                id: this.datas
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/quizItem/open/edit`,
                    studentRights
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.studentShowQuizz = res.data.message;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 点击Take the Quiz Again按钮触发
         * 触发此事件，添加一条答题记录
         * 测验答题记录添加
         **/
        startedQuizzes: function() {
            let myDate = new Date();
            let quizRecord = {
                quizId: this.datas,
                quizVersion: 1,
                isSubmit: 0,
                isLastTime: 0,
                startTime: myDate,
                submitTime: myDate,
                dueTime: myDate,
                testerId: this.userInfoData.id
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quizRecord/add`, quizRecord)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizRecordId = res.data.message;
                        this.isyincang = false;
                        this.xianshi = false;
                        this.quizzesPublish = false;
                        this.quizzesStarted = true;
                        this.quizzesSubmit = false;
                        this.takeTheQuizNext = false;
                        this.takeTheQuizAgain = true;
                        this.quizItem();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 点击Take the Quiz Again按钮触发，展示每一道题
         * 测验问题项列表
         **/
        quizItem() {
            let param = {
                quizRecordId: this.quizRecordId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizQuestionTestRecord/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizItemList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 答题历史记录 表格
         * **/
        HistoryQuery() {
            let param = {
                quizId: this.datas
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizRecord/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizRecordlist = res.data.entity;
                        this.quizRecordlist = this.quizRecordlist.map(el => {
                            if (el.assignType == 1) {
                                el.typeName = "everyone";
                            } else if (el.assignType == 2) {
                                el.typeName = "班级";
                            } else if (el.assignType == 3) {
                                el.typeName = "班级";
                            }
                            let tempObj = {
                                dueTime: "",
                                submitTime: "",
                                startTime: ""
                            };
                            el = Object.assign(tempObj, el);
                            return el;
                        });
                        for (let i = 0; i < this.quizRecordlist.length; i++) {
                            let tempItem = this.quizRecordlist[i];
                            tempItem.dueTime =
                                tempItem.dueTime.length == 0
                                    ? "— —"
                                    : formatDate(
                                          new Date(tempItem.dueTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                            tempItem.startTime =
                                tempItem.startTime.length == 0
                                    ? "— —"
                                    : formatDate(
                                          new Date(tempItem.startTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                            tempItem.submitTime =
                                tempItem.submitTime.length == 0
                                    ? "— —"
                                    : formatDate(
                                          new Date(tempItem.submitTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 显示正误
         * **/
        goReply: function() {
            let studentRights = {
                id: this.datas
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/quizItem/show/edit`,
                    studentRights
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.displayError = res.data.message;
                        this.isyincang = false;
                        this.xianshi = false;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = true;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped>
@import "./studentQuizzss.css";
</style>
