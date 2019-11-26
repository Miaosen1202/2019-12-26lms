<template>
    <div>
        <!--eslint-disable-->
        <div v-show="quizzesStarted">
            <!--<p> 开始答题; </p>-->
            <div class="quizzesPreviewStarted">
                <h4 class="titleHeadline">
                    {{ quizInfoGetList.title }}
                </h4>
                <div class="caution">
                    <!--警示-->
                    <img src="../../../../static/images/jingshi.png" alt="" />
                    {{ $t("message.this_is_a_preview_of") }}
                </div>
                <div class="quizzesStartTime">
                    <h4>{{ $t("message.Started") }}</h4>
                    <span
                        >Dec
                        {{
                            quizInfoGetList.createTime | formatDate(time)
                        }}</span
                    >
                </div>
                <div class="quizzesStartTime">
                    <!--<h4>Quiz Instructions</h4><span>this is quiz of unit 1</span>-->
                </div>
                <div
                    v-for="(domain, index) in quizItemList"
                    v-show="mondifyTestProblem"
                    :key="index"
                    class="quizzesQuestion"
                >
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>
                            {{ domain.title }} {{ index + 1 }}
                            {{ domain.type }} {{ domain.id }}
                        </h5>
                        <span>{{ domain.score }}{{ $t("message.pts") }}</span>
                        <ul>
                            <div v-html="domain.content" />
                            <li v-show="domain.type == 1">
                                <!-- 单选题 -->
                                <el-radio-group
                                    v-model="domain.selectVal"
                                    @change="changeSingle"
                                >
                                    <p
                                        v-for="(item, index) in domain.options"
                                        :key="index"
                                        style="margin: 5px 0"
                                    >
                                        <el-radio
                                            :label="domain.id + '_' + item.id"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </p>
                                </el-radio-group>
                            </li>
                            <li v-show="domain.type == 2">
                                <!-- 多选题 -->
                                <el-checkbox-group
                                    v-model="domain.selectVal"
                                    @change="changeMulti"
                                >
                                    <p
                                        v-for="(val, index) in domain.options"
                                        :key="index"
                                        style="margin: 5px 0"
                                    >
                                        <el-checkbox
                                            :key="val.id"
                                            :label="domain.id + '_' + val.id"
                                        >
                                            {{ val.content }}
                                        </el-checkbox>
                                    </p>
                                </el-checkbox-group>
                            </li>
                            <li
                                v-show="
                                    domain.type == 6 &&
                                        Boolean('selectVal' in domain)
                                "
                            >
                                <!-- 简答题 -->
                                <p>
                                    {{ domain.selectVal }}
                                    {{ Boolean("selectVal" in domain) }}
                                </p>
                                <el-input
                                    type="textarea"
                                    @blur="changeTextrea(domain.id, $event)"
                                /><!-- v-model = "domain.selectVal"-->
                            </li>
                            <li v-show="domain.type == 3">
                                <!-- 判断题 -->
                                <el-radio-group
                                    v-model="domain.selectVal"
                                    @change="changeJudge"
                                >
                                    <p
                                        v-for="(item, index) in domain.options"
                                        :key="index"
                                        style="margin: 5px 0"
                                    >
                                        <el-radio
                                            :label="domain.id + '_' + item.id"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </p>
                                </el-radio-group>
                            </li>
                        </ul>
                        <!--<el-input class="comment" type="textarea" :disabled="true"-->
                        <!--v-show="domain.generalComment!=''"-->
                        <!--style="width: 50%" v-model="domain.generalComment">-->
                        <!--</el-input>-->
                    </div>
                </div>
                <div style="float: right;margin-top: 1%">
                    <!--暂时注释-->
                    <!--<span style="color:#666666">Quiz saved at 11:26am</span>-->
                    <el-button
                        style="background-color: #0138b1;color: #fff"
                        @click="submitQuizzes"
                    >
                        {{ $t("message.Submit_Quiz") }}
                    </el-button>
                </div>
                <v-goTop />
            </div>
            <div class="quizzesStarted-right">
                <div>
                    <div class="importIntoCourse">
                        <el-button plain @click.native="showQuize">
                            <i class="iconfont icon-edit">
                                {{ $t("message.Keep_Editing_This_Quiz") }}</i
                            >
                        </el-button>
                        <div class="keepQuestions">
                            <ul>
                                <h4>{{ $t("message.Question") }}</h4>
                                <li
                                    v-for="(domain, index) in quizItemList"
                                    :key="index"
                                >
                                    <span
                                        v-if="!domain.isAnswer"
                                        style="color: red"
                                        >{{ $t("message.Questions") }}
                                        {{ domain.id }}</span
                                    >
                                    <span v-else-if="domain.isAnswer"
                                        >{{ $t("message.Questions") }}
                                        {{ domain.id }}</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 style="display: inline-block;padding: 4% 0">
                                {{ $t("message.Time_Elapsed") }}:
                            </h4>
                            <!--<span style="color:#0138b1;font-weight: 600;cursor: pointer" >{{$t('message.Hide')}}</span>-->
                        </div>
                        <div style="color: #999999">
                            <p style="font-size: 22px">
                                {{ callinTime }}
                            </p>
                            <!-- v-if="quizInfoGetList.timeLimit!=''"-->
                            <p style="font-size: 22px">
                                {{ minute }}:{{ second }}
                            </p>
                            <!--<span>12 </span><span> Minutes,{{callinTime}}</span><span>10</span><span> Seconds</span>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapGetters } from "vuex";
import eventBus from "@/eventBus";
import goTop from "@/utils/goTop.vue";
import { formatDate } from "@/utils/date";
import quizeAnswer from "@/utils/quizAnswer";

export default {
    filters: {
        formatDate(time) {
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    components: {
        "v-goTop": goTop
    },
    data() {
        return {
            courseId: this.$route.query.courseId,
            quizRecordId: this.$route.query.data,
            minutes: 15,
            seconds: 0,
            callinTime: "",
            setTimeout: "",
            testRadio: 1,
            quizzChecked: [],
            title: this.$t("message.Unnamed_quiz"),
            titles: this.$t("message.Question"),
            description: "",
            type: {
                value: "1"
            },
            time: "",
            showQuizQuestionRecord: [],
            quizeValue: false,
            quizeScore: false,
            quizeSubmissions: false,
            score: "",
            name: "",
            assignment: [],
            isShuffleAnswer: "",
            allowAnonymous: "",
            timeLimit: "",
            timeLimit1: "",
            allowMultiAttempt: "",
            attemptNumber: "",
            scoreType: [],
            scoreTypeOptions: [
                {
                    value: "1",
                    label: "最高分"
                },
                {
                    value: "2",
                    label: "最低分"
                },
                {
                    value: "3",
                    label: "平均分"
                }
            ],
            showReplyStrategy1: "",
            showReplyStrategy2: "",
            showReplyStrategy: "",
            showAnswerStrategy1: "",
            showAnswerStrategy: "",
            showAnswerStrategy2: "",
            AllowedAttempts: "",
            showAnswerStartTime: "",
            showAnswerEndTime: "",
            status: "",
            showQuestionStrategy: "",
            isLockRepliedQuestion: "",
            isNeedAccessCode: "",
            accessCode: "",
            isFilterIP: "",
            filterIpAddress: "",
            isOpen: false,
            assign: [
                {
                    assignType: "1",
                    limitTime: "",
                    startTime: "",
                    endTime: ""
                }
            ],
            QuestionOptions: [
                {
                    code: "A",
                    content: "",
                    explanation: "",
                    isCorrect: "",
                    seq: ""
                }
            ],
            tempOPtions: [],
            codeObjList: [
                { id: 0, name: "A" },
                { id: 1, name: "B" },
                { id: 2, name: "C" },
                { id: 3, name: "D" },
                { id: 4, name: "E" },
                { id: 5, name: "F" },
                { id: 6, name: "G" },
                { id: 7, name: "H" },
                { id: 8, name: "I" },
                { id: 9, name: "J" }
            ],
            quizFor: {},
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
            },

            fileList: [],
            showQuizInforList: [],
            quizInfoGetTaba: [],
            quizRecordlist: [] /* 历史记录 */,
            quizInfor: [],
            correctComment: "",
            wrongComment: "",
            generalComment: "",
            quizadd: "",
            datas: this.$route.query.data,
            quizInfoGetList: [],
            quizeDeleteDialogVisible: false,
            optionContentMaxLength: 100,
            action: process.env.NODE_ENV,
            lastAttempt: {},

            questionType: {
                value: ""
            },
            content: "",
            value1time: "",
            showQuizzes: false,
            questionList: [],
            isShow: false,
            claim: true,
            quizPageList: true,
            quizPageAdd: false,
            quizzesPublish: true,
            quizzesStarted: true,
            editIsShow: false,
            moduleSpread: false,
            testQuestionsisShow: false,
            testQuestionsselect: false,
            testQuestionsTrueFalse: false,
            testQuestionsfile: false,
            testQuestionsSimpleAnswer: false,
            quizItemList: [],
            mondifyTestProblem: true,
            TestProblem: false,
            uplondImage: false,
            uplondImages: true,
            flickrImage: false,
            flickrImages: true,
            uplondFiles: true,
            uplondFile: false,
            quizzesSubmit: false,
            submitCourse: 1000,
            tabPosition: "left",
            checked: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
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
            editDialogFormVisible: false,
            editDialogFormVisibleList: false,
            options: [
                {
                    value: "1",
                    label: "练习测验"
                },
                {
                    value: "2",
                    label: "选项2"
                },
                {
                    value: "选项3",
                    label: "3"
                },
                {
                    value: "选项4",
                    label: "4"
                }
            ],
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
            },
            initMount: 0
        };
    },
    watch: {
        second: {
            handler(newVal) {
                this.num(newVal);
            }
        },
        minute: {
            handler(newVal) {
                this.num(newVal);
            }
        }
    },
    mounted() {
        this.timer();
        this.start(true);
        this.quizInfoGet();
        this.quizRecordAdd();
    },
    computed: {
        second() {
            return this.num(this.seconds);
        },
        minute() {
            return this.num(this.minutes);
        },
        ...mapGetters(["userInfoData"])
    },
    methods: {
        handleCheckedCitiesChange() {
            this.isShow = !this.isShow;
        },
        originalPage() {
            this.quizPageList = true;
            this.quizPageAdd = false;
            this.quizPageModify = false;
            this.quizzesPublish = false;
            this.quizzesStarted = false;
            this.quizzesSubmit = false;
            eventBus.$emit("originalPage");
        },
        testQuestions() {
            this.testQuestionsisShow = !this.testQuestionsisShow;
        },

        /* 下拉选择不同的试题 */
        testSelect() {
            this.testQuestionsselect = true;
            this.testQuestionsfile = false;
            this.testQuestionsTrueFalse = false;
            this.testQuestionsSimpleAnswer = false;
        },
        testFile() {
            this.testQuestionsselect = false;
            this.testQuestionsfile = true;
            this.testQuestionsTrueFalse = false;
            this.testQuestionsSimpleAnswer = false;
        },
        trueFalse() {
            this.testQuestionsselect = false;
            this.testQuestionsfile = false;
            this.testQuestionsTrueFalse = true;
            this.testQuestionsSimpleAnswer = false;
        },
        SimpleAnswer() {
            this.testQuestionsselect = false;
            this.testQuestionsfile = false;
            this.testQuestionsTrueFalse = false;
            this.testQuestionsSimpleAnswer = true;
        },
        editSetting() {
            this.editDialogFormVisible = true;
        },
        editSettingList() {
            this.editDialogFormVisibleList = true;
        },
        editLockUntil() {
            this.editIsShow = !this.editIsShow;
        },
        editClaim() {
            this.claim = true;
        },
        editClaimClose() {
            this.claim = false;
            this.checked1 = false;
        },
        ImagesUpload() {
            this.uplondImage = true;
            this.uplondImages = false;
        },
        ImagesUploads() {
            this.uplondImage = false;
            this.uplondImages = true;
        },
        ImagesFlickr() {
            this.flickrImage = true;
            this.flickrImages = false;
        },
        ImagesFlickrs() {
            this.flickrImages = true;
            this.flickrImage = false;
        },
        fileUplond() {
            this.uplondFiles = false;
            this.uplondFile = true;
        },
        fileUplonds() {
            this.uplondFiles = true;
            this.uplondFile = false;
        },
        savePublish() {
            this.quizPageList = false;
            this.quizPageAdd = false;
            this.quizPageModify = false;
            this.quizzesPublish = true;
            this.quizzesStarted = false;
            this.quizzesSubmit = false;
        },
        removeDomain(item) {
            const index = this.QuestionOptions.indexOf(item);
            if (index !== -1) {
                this.QuestionOptions.splice(index, 1);
            }
        },
        addDomain() {
            this.initMount = this.initMount + 1;
            this.QuestionOptions.push({
                _index: this.initMount,
                value: "",
                key: Date.now()
            });
        },
        editRemoveDomain(item) {
            const index = this.assign.indexOf(item);
            if (index !== -1) {
                this.assign.splice(index, 1);
            }
        },
        editAddDomain() {
            this.assign.push({
                value: "",
                key: Date.now()
            });
        },

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

        /**
         *点击 save&publish和save触发
         * 测验信息查找
         * * */
        quizInfoGet() {
            // console.log('信息查找')
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/get?data=${this.datas}`)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizInfoGetList = res.data.entity;
                        this.courseId = this.quizInfoGetList.courseId;
                        // this.minutes=res.data.entity.limitTime;
                        this.quizInfoGetTaba = res.data.entity.assigns;
                        this.quizInfoGetTaba = this.quizInfoGetTaba.map(el => {
                            if (el.assignType == 1) {
                                el.typeName = "everyone";
                            } else if (el.assignType == 2) {
                                el.typeName = "班级";
                            } else if (el.assignType == 3) {
                                el.typeName = "班级";
                            }
                            const tempObj = {
                                limitTime: "",
                                endTime: "",
                                startTime: ""
                            };
                            el = Object.assign(tempObj, el);
                            return el;
                        });
                        for (let i = 0; i < this.quizInfoGetTaba.length; i++) {
                            const tempItem = this.quizInfoGetTaba[i];
                            tempItem.limitTime =
                                tempItem.limitTime.length == 0
                                    ? "— —"
                                    : formatDate(
                                          new Date(tempItem.limitTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                            tempItem.startTime =
                                tempItem.startTime.length == 0
                                    ? "— —"
                                    : formatDate(
                                          new Date(tempItem.startTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                            tempItem.endTime =
                                tempItem.endTime.length == 0
                                    ? "— —"
                                    : formatDate(
                                          new Date(tempItem.endTime),
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
        startedQuizzes() {
            this.quizPageList = false;
            this.quizPageAdd = false;
            this.quizPageModify = false;
            this.quizzesPublish = false;
            this.quizzesStarted = true;
            this.quizzesSubmit = false;
            this.quizRecordAdd();
            this.lastid = "";
        },
        /**
         * 点击预览按钮触发，展示每一道题
         * 测验问题项列表
         * */
        quizItem() {
            const param = {
                quizRecordId: this.quizRecordId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizQuestionTestRecord/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        quizeAnswer.quizQuestionRecordList = res.data.entity;
                        this.quizItemList = res.data.entity;

                        for (let i = 0; i < this.quizItemList.length; i++) {
                            this.quizItemList[i].isAnswer = false;
                            if (this.quizItemList[i].type == 2) {
                                this.$set(
                                    this.quizItemList[i],
                                    "selectVal",
                                    []
                                );
                            } else {
                                this.$set(
                                    this.quizItemList[i],
                                    "selectVal",
                                    ""
                                );
                            }
                        }
                        console.log("ererre", this.quizItemList);
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /** *
         *当点击预览按钮，触发此事件，添加一条答题记录
         *测验答题记录添加
         * * */
        quizRecordAdd() {
            const myDate = new Date();
            const quizRecord = {
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
         * 答题开始计时
         * 计时器
         * */
        start(bolean) {
            const _this = this;
            let hour;
            let minute;
            let second;
            hour = minute = second = 0;
            if (bolean === true) {
                _this.timer = setInterval(() => {
                    if (second >= 0) {
                        second += 1;
                    }
                    if (second >= 60) {
                        second = 0;
                        minute += 1;
                    }
                    if (minute >= 60) {
                        minute = 0;
                        hour += 1;
                    }
                    _this.callinTime = `${hour}:${minute}:${second}`;
                }, 1000);
            } else {
                window.clearInterval(_this.timer);
            }
        },
        /** *
         * 倒计时
         */
        num(n) {
            return n < 10 ? `0${n}` : `${n}`;
        },
        timer() {
            const _this = this;
            const time = window.setInterval(() => {
                if (_this.seconds === 0 && _this.minutes !== 0) {
                    _this.seconds = 59;
                    _this.minutes -= 1;
                } else if (_this.minutes === 0 && _this.seconds === 0) {
                    _this.seconds = 0;
                    window.clearInterval(time);
                } else {
                    _this.seconds -= 1;
                }
            }, 1000);
        },
        quizzStatus(status) {
            const quizzes = {
                id: this.datas,
                status
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/publish/edit`, quizzes)
                .then(res => {
                    if (res.data.code == 200) {
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         *历史记录
         * * */
        HistoryQuery() {
            const param = {
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
                                el.typeName = "学生";
                            }
                            const tempObj = {
                                dueTime: "",
                                submitTime: "",
                                startTime: ""
                            };
                            el = Object.assign(tempObj, el);
                            return el;
                        });
                        for (let i = 0; i < this.quizRecordlist.length; i++) {
                            const tempItem = this.quizRecordlist[i];
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
         * 右侧提交信息展示
         ** */
        quizScoreRecord() {
            const param = {
                data: this.datas
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizScoreRecord/get`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.lastAttempt = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        showQuize() {
            this.$router.push({
                path: "/homePage/allCourse/mondifyQuizz",
                query: {
                    quizDetailId: this.quizDetailId,
                    courseId: this.courseId
                }
            });
        },
        /**
         *测验答题记录修改
         *Submit-modify提交
         * * */
        submitQuizzes() {
            // 提交测验记录更新时触发，最后一次的答题记录
            this.everyoneQuizzes();
            const myDate = new Date();
            const quizRecord = {
                id: this.quizRecordId,
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
                .post(`${process.env.NODE_ENV}/quizRecord/modify`, quizRecord)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = true;
                        this.HistoryQuery();
                        this.quizScoreRecord();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 单选题提交
        async changeSingle(item) {
            const tempList = item.split("_");
            const questionId = tempList[0];
            const optionId = tempList[1];
            const optionIdList = [];
            optionIdList.push(Number(optionId));

            const res = quizeAnswer.quizQuestionRecordAnswerDto(
                questionId,
                optionIdList,
                ""
            );
            if (res != null) {
                const result = await this.$getData(
                    "/quizQuestionRecord/modify",
                    res,
                    "post"
                );
                if (result.data.code == 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id == res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: "更改问题成功",
                        type: "success"
                    });
                }
            }
        },
        // 多选题提交
        async changeMulti(item) {
            const quetionId = item[0].split("_")[0];
            const optionList = [];
            for (let i = 0; i < item.length; i++) {
                optionList.push(Number(item[i].split("_")[1]));
            }

            const res = quizeAnswer.quizQuestionRecordAnswerDto(
                quetionId,
                optionList
            );
            if (res != null) {
                const result = await this.$getData(
                    "/quizQuestionRecord/modify",
                    res,
                    "post"
                );
                debugger;
                if (result.data.code == 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id == res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: "更改问题成功",
                        type: "success"
                    });
                }
            }
        },

        // 简答题提交
        async changeTextrea(id, $event) {
            // console.log('sds', $event, $event.target, $event.target.value)
            const text = $event.target.value;
            const res = quizeAnswer.quizQuestionRecordAnswerDto(id, null, text);
            if (res != null) {
                const result = await this.$getData(
                    "/quizQuestionRecord/modify",
                    res,
                    "post"
                );
                if (result.data.code == 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id == res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: "更改问题成功",
                        type: "success"
                    });
                }
            }
        },
        // 判断题提交
        async changeJudge(item) {
            const tempList = item.split("_");
            const questionId = tempList[0];
            const optionIdList = [];
            optionIdList.push(Number(tempList[1]));
            const res = quizeAnswer.quizQuestionRecordAnswerDto(
                questionId,
                optionIdList,
                ""
            );
            if (res != null) {
                const result = await this.$getData(
                    "/quizQuestionRecord/modify",
                    res,
                    "post"
                );
                if (result.data.code == 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id == res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: "更改问题成功",
                        type: "success"
                    });
                }
            }
        },
        /**
         *测验答题
         *答题后展示
         * * */
        everyoneQuizzes() {
            const param = {
                quizRecordId: this.quizRecordId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizQuestionRecord/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.showQuizQuestionRecord = res.data.entity;
                        this.showQuizQuestionRecord.forEach(r => {
                            r.options.forEach(opt => {
                                if (r.type === 1 && opt.isChoice === 1) {
                                    // 单选题
                                    r.choiceItem = opt.content;
                                } else if (r.type === 2) {
                                    // 多选题
                                    if (opt.isChoice === 1) {
                                        opt.isChoice = true;
                                    } else {
                                        opt.isChoice = false;
                                    }
                                } else if (r.type === 3 && opt.isChoice === 1) {
                                    // 判断题
                                    r.choiceItem = opt.content;
                                }
                            });
                        });
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
/*eslint-disable*/
</script>

<style scoped>
@import "./styleQuizz.css";
</style>
