<template>
    <div v-loading="loading">
        <!--eslint-disable-->
        <div v-show="quizPageModify">
            <!--测验修改-->
            <div style="width: 70%;" class="quizeLeft">
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$t('message.Details')" name="first">
                        <div>
                            <el-input
                                v-model="quizFor.title"
                                :placeholder="$t('message.Unnamed_Quiz')"
                                minlength="4"
                                maxlength="200"
                            ></el-input>
                        </div>
                        <div class="messagetext">
                            <ckeditor
                                :editor="editor"
                                v-model="quizFor.description"
                                :config="editorConfig"
                            ></ckeditor>
                        </div>
                        <div class="quizzes-install">
                            <el-form
                                :label-position="labelPosition"
                                label-width="20%"
                                :model="quizFor"
                                :rules="rules"
                                :ref="quizFor"
                            >
                                <el-form-item :label="$t('message.Quiz_Type')">
                                    <el-select
                                        v-model="quizFor.type"
                                        :placeholder="
                                            $t('message.Practic_Quiz')
                                        "
                                        style="width: 80%"
                                    >
                                        <el-option
                                            @click.native="groupShow1"
                                            :label="$t('message.Practic_Quiz')"
                                            :value="1"
                                        ></el-option>
                                        <el-option
                                            @click.native="groupShow23"
                                            :label="$t('message.Graded_Quiz')"
                                            :value="2"
                                        ></el-option>
                                        <!--<el-option @click.native="groupShow3" label="Graded  survey" :value="3"></el-option>-->
                                        <!--<el-option @click.native="groupShow4" label="Ungraded survey" :value="4"></el-option>-->
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('message.Assignment_Group')"
                                    prop="assignmentGroupId"
                                    v-if="
                                        quizFor.type == 3 || quizFor.type == 2
                                    "
                                >
                                    <el-select
                                        v-model="quizFor.assignmentGroupId"
                                        :popper-class="quizz_select"
                                        :placeholder="$t('message.Assignment')"
                                        style="width: 80%"
                                    >
                                        <el-tooltip
                                            v-for="(newsType,
                                            ind) in assignment"
                                            :key="ind"
                                            class="item"
                                            effect="dark"
                                            :content="newsType.name"
                                            placement="top"
                                            :disabled="
                                                newsType.name.length < 40
                                            "
                                        >
                                            <el-option
                                                :key="ind"
                                                :label="newsType.name"
                                                :value="newsType.id"
                                            >
                                            </el-option>
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('message.score')"
                                    v-show="quizFor.type == 3"
                                    prop="score"
                                >
                                    <el-input
                                        v-model="quizFor.score"
                                        :placeholder="
                                            $t('message.Please_enter')
                                        "
                                        style="width: 20%"
                                        minlength="1"
                                        maxlength="4"
                                    ></el-input
                                    ><!--minlength='1' maxlength ='4'-->{{
                                        $t("message.Pts")
                                    }}
                                    <p class="quizzes-student">
                                        {{
                                            $t(
                                                "message.Student_will_automatically"
                                            )
                                        }}
                                    </p>
                                </el-form-item>

                                <el-form-item
                                    :label="$t('message.Options')"
                                    prop="timeLimit"
                                >
                                    <el-checkbox
                                        v-model="quizFor.isShuffleAnswer"
                                        >{{ $t("message.Shuffle_Answers") }}
                                    </el-checkbox>

                                    <div style="padding-bottom: 1%">
                                        <el-checkbox
                                            v-model="quizFor.timeLimit1"
                                            >{{ $t("message.Time_Limit") }}
                                            <el-input
                                                v-model="quizFor.timeLimit"
                                                :disabled="!quizFor.timeLimit1"
                                                minlength="1"
                                                maxlength="4"
                                                style="width: 30%"
                                            ></el-input>
                                            {{ $t("message.Minutes") }}
                                        </el-checkbox>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-checkbox
                                        v-model="quizFor.allowAnonymous"
                                        v-show="quizeSubmissions"
                                    >
                                        {{
                                            $t(
                                                "message.Keep_Submissions_Anonymous"
                                            )
                                        }}
                                    </el-checkbox>
                                    <div class="multiple-attempts">
                                        <el-checkbox
                                            v-model="quizFor.allowMultiAttempt"
                                            :disabled="studyGroupEdited == 1"
                                            style="display: block"
                                            @change="MultipleAttempt"
                                        >
                                            {{
                                                $t(
                                                    "message.Allow_Multiple_Attempts"
                                                )
                                            }}
                                        </el-checkbox>
                                        <span
                                            v-if="studyGroupEdited == 1"
                                            style="color: red;display: inline-block;line-height: 20px;"
                                        >
                                            {{
                                                $t(
                                                    "message.This_is_quiz_not_edit"
                                                )
                                            }}</span
                                        >
                                        <div
                                            class="attempts-keep"
                                            v-show="quizFor.allowMultiAttempt"
                                        >
                                            <span>{{
                                                $t("message.Quiz_Score_to_keep")
                                            }}</span>
                                            <el-select
                                                v-model="quizFor.scoreType"
                                                :placeholder="
                                                    $t('message.Please_select')
                                                "
                                                style="width: 30%;margin-bottom: 1%"
                                            >
                                                <el-option
                                                    v-for="item in scoreTypeOptions"
                                                    :disabled="
                                                        studyGroupEdited == 1
                                                    "
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-form-item prop="attemptNumber">
                                                <el-checkbox
                                                    v-model="
                                                        quizFor.AllowedAttempts
                                                    "
                                                    :disabled="
                                                        studyGroupEdited == 1
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Allowed_Attempts"
                                                        )
                                                    }}
                                                    <el-input
                                                        v-model="
                                                            quizFor.attemptNumber
                                                        "
                                                        style="width: 30%"
                                                        :disabled="
                                                            !quizFor.AllowedAttempts ||
                                                                studyGroupEdited ==
                                                                    1
                                                        "
                                                        minlength="1"
                                                        maxlength="2"
                                                    ></el-input>
                                                </el-checkbox>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="
                                                    quizFor.showReplyStrategy1
                                                "
                                                style="display: inline-block;word-wrap:break-word;"
                                            >
                                                <span
                                                    style="display: inline-block;word-wrap:break-word;white-space: normal;"
                                                >
                                                    {{
                                                        $t(
                                                            "message.Let_Students_See_Their_Quiz"
                                                        )
                                                    }}</span
                                                >
                                            </el-checkbox>
                                            <!--<span style="color: #606266"></span>-->
                                            <div
                                                class="attempts-keep"
                                                v-show="
                                                    quizFor.showReplyStrategy1
                                                "
                                            >
                                                <el-checkbox
                                                    v-model="
                                                        quizFor.showReplyStrategy2
                                                    "
                                                    :disabled="
                                                        !quizFor.showReplyStrategy1
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Only_After_Their_Last_Attempt"
                                                        )
                                                    }}
                                                </el-checkbox>
                                                <div>
                                                    <el-checkbox
                                                        v-model="
                                                            quizFor.showAnswerStrategy
                                                        "
                                                        :disabled="
                                                            !quizFor.showReplyStrategy1
                                                        "
                                                    >
                                                        {{
                                                            $t(
                                                                "message.Let_Students_See_The_Correct_Answers"
                                                            )
                                                        }}
                                                    </el-checkbox>
                                                </div>
                                                <!--<div class="attempt-third" v-show="showAnswer">-->
                                                <!--<el-checkbox v-model="quizFor.showAnswerStrategy2">-->
                                                <!--{{$t('message.Only_After_Their_Last_Attempt')}}-->
                                                <!--</el-checkbox>-->
                                                <!--<div>-->
                                                <!--<span style="margin-bottom: 2%;width: 42%;display: inline-block">-->
                                                <!--{{$t('message.show_Correct_Answers_at')}}-->
                                                <!--</span>-->
                                                <!--<el-date-picker-->
                                                <!--v-model="quizFor.showAnswerStartTime"-->
                                                <!--type="datetime"-->
                                                <!--placeholder="Please select date time">-->
                                                <!--</el-date-picker>-->
                                                <!--<span-->
                                                <!--style="margin-bottom: 2%;width: 42%;display: inline-block">{{$t('message.Hide_Correct_Answers_at')}}</span>-->
                                                <!--<el-date-picker-->
                                                <!--v-model="quizFor.showAnswerEndTime"-->
                                                <!--type="datetime"-->
                                                <!--placeholder="Please select date time">-->
                                                <!--</el-date-picker>-->
                                                <!--</div>-->
                                                <!--</div>-->
                                            </div>
                                        </div>
                                        <!--todo 一次展示一题-->
                                        <!--<div class="multiple-attempts">-->
                                        <!--<el-checkbox v-model="quizFor.showQuestionStrategy" style="display: block" @change="LockQuestion">-->
                                        <!--{{$t('message.Show_one_question_at_a_time')}}-->
                                        <!--</el-checkbox>-->
                                        <!--<div class="attempts-keep" v-show="quizFor.showQuestionStrategy">-->
                                        <!--<el-checkbox v-model="quizFor.isLockRepliedQuestion">-->
                                        <!--{{$t('message.Lock_questions_after_answering')}}-->
                                        <!--</el-checkbox>-->
                                        <!--</div>-->
                                        <!--</div>-->
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('message.Quiz_Restrictions')"
                                >
                                    <div class="multiple-attempts">
                                        <el-checkbox
                                            v-model="quizFor.isNeedAccessCode"
                                            style="display: block"
                                            @change="accesscode"
                                        >
                                            {{
                                                $t(
                                                    "message.Require_an_access_code"
                                                )
                                            }}
                                        </el-checkbox>
                                        <div
                                            class="attempts-keep"
                                            v-show="quizFor.isNeedAccessCode"
                                        >
                                            <el-input
                                                v-model="quizFor.accessCode"
                                                :placeholder="
                                                    $t('message.code')
                                                "
                                                minlength="1"
                                                maxlength="50"
                                                style="width: 50%"
                                            ></el-input>
                                        </div>
                                    </div>
                                    <!--暂时注释ip地址-->
                                    <!--<div class="multiple-attempts">-->
                                    <!--<el-checkbox v-model="quizFor.isFilterIP" style="display: block" @change="IPAddresses">-->
                                    <!--{{$t('message.Filter_IP_Addresses')}}-->
                                    <!--</el-checkbox>-->
                                    <!--<div class="attempts-keep" v-show="quizFor.isFilterIP">-->
                                    <!--<el-input v-model="quizFor.filterIpAddress" placeholder="IP" style="width: 50%"></el-input>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </el-form-item>
                                <v-assign-to
                                    :course-id="courseId"
                                    :assignList="assign"
                                    @removeAssignForm="removeAssignForm"
                                    @sendToSelect="sendToSelect"
                                    @addAssignForm="addAssignForm"
                                ></v-assign-to>
                                <el-form-item label="">
                                    <el-button @click="CancelAnEvent()">{{
                                        $t("message.Cancel")
                                    }}</el-button>
                                    <el-button
                                        style="float: right;background-color: #0138b1;color: white;margin-right: 14%"
                                        @click="
                                            quizeSureModify(
                                                quizFor.title,
                                                'quizFor'
                                            )
                                        "
                                    >
                                        {{ $t("message.Save") }}
                                    </el-button>
                                    <el-button
                                        style="float: right;background-color: #0138b1;color: white;"
                                        v-model="status"
                                        @click="
                                            quizeSureModifyPublish(
                                                quizFor.title,
                                                quizFor
                                            )
                                        "
                                    >
                                        {{ $t("message.Save_Publish") }}
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <v-goTop></v-goTop>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Questions')" name="second">
                        <div class="questions-style">
                            <div
                                class="quizzesQuestion"
                                v-show="mondifyTestProblem"
                                v-for="(domain, index) in quizItemList"
                                :key="index"
                            >
                                <div class="quizzes-started">
                                    <!--<div class="biaoji">-->
                                    <!--<img src="../../../../static/images/biaoji.png" alt="">-->
                                    <!--</div>-->
                                    <h5>
                                        {{ domain.question.title }}
                                        {{ index + 1 }}
                                    </h5>
                                    <span
                                        >{{ domain.question.score
                                        }}{{ $t("message.pts") }}
                                        <i
                                            @click="modifyQuestionStara(domain)"
                                            class="iconfont icon-edit"
                                            style="cursor: pointer"
                                        ></i>
                                        <i
                                            @click="
                                                questionDeletes(domain.targetId)
                                            "
                                            class="iconfont icon-delete"
                                            style="cursor: pointer"
                                        ></i>
                                    </span>
                                    <ul>
                                        <div
                                            v-html="domain.question.content"
                                            class="submitMatter"
                                        ></div>
                                        <li
                                            v-if="domain.question.type == 1"
                                            v-for="(item, index) in domain
                                                .question.options"
                                            :key="index"
                                        >
                                            <el-radio
                                                v-model="item.isCorrect"
                                                :label="1"
                                                disabled
                                                class="submitMatterred"
                                            >
                                                {{ item.content }}
                                            </el-radio>
                                        </li>
                                        <li
                                            v-if="domain.question.type == 2"
                                            v-for="(item, index) in domain
                                                .question.options"
                                            :key="index"
                                        >
                                            <el-checkbox
                                                v-model="item.isCorrect"
                                                :true-label="1"
                                                disabled
                                                class="submitMatterred"
                                            >
                                                {{ item.content }}
                                            </el-checkbox>
                                        </li>
                                        <li v-show="domain.question.type == 3">
                                            <!-- 判断题 -->
                                            <p
                                                v-for="(item, index) in domain
                                                    .question.options"
                                                :key="index"
                                                style="margin: 5px 0"
                                            >
                                                <el-radio
                                                    v-model="item.isCorrect"
                                                    :label="1"
                                                    disabled
                                                    class="submitMatterred"
                                                >
                                                    {{ item.content }}
                                                </el-radio>
                                            </p>
                                        </li>
                                        <!-- <li v-if="domain.question.type==6">
                                          <el-input type="textarea" v-model="domain.question.generalComment">
                                            {{domain.question.generalComment}}
                                          </el-input>
                                        </li> -->
                                    </ul>
                                    <!--<el-input class="comment" style="width: 20%;background-color:green;margin-left:10%" type="textarea"-->
                                    <!--v-show="domain.question.correctComment"-->
                                    <!--v-model="domain.question.correctComment">-->
                                    <!--</el-input>-->
                                    <!--<el-input class="comment" style="width: 20%;background-color:red;" type="textarea"-->
                                    <!--v-show="domain.question.wrongComment"-->
                                    <!--v-model="domain.question.wrongComment">-->
                                    <!--</el-input>-->
                                    <el-input
                                        class="comment"
                                        type="textarea"
                                        :disabled="true"
                                        v-show="domain.question.generalComment"
                                        style="width: 50%"
                                        v-model="domain.question.generalComment"
                                    >
                                    </el-input>
                                    <div
                                        class="questions-style"
                                        v-if="domain.isEdit"
                                    >
                                        <!--修改-->
                                        <edit-question
                                            :input-question="
                                                domain.copyQuestion
                                            "
                                            @submit="
                                                questionMondify($event, domain)
                                            "
                                            @cancel="domain.isEdit = false"
                                        ></edit-question>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="questions-style"
                                v-show="testQuestionsisShow"
                            >
                                <!--添加-->
                                <edit-question
                                    :input-question="newQuestion"
                                    @submit="questionAdd($event)"
                                    @cancel="testQuestionsisShow = false"
                                ></edit-question>
                            </div>
                            <div>
                                <div class="quizzes-search">
                                    <!--暂时注释，第二版放开-->
                                    <!--<el-input-->
                                    <!--:placeholder="$t('message.Search_for_Quiz')"-->
                                    <!--prefix-icon="el-icon-search"-->
                                    <!--v-model="input21">-->
                                    <!--</el-input>-->
                                    <el-button @click.native="testQuestions"
                                        ><i
                                            class="el-icon-circle-plus-outline"
                                        ></i
                                        >{{ $t("message.New_Question") }}
                                    </el-button>
                                </div>
                                <!--暂时注释，第二版放开-->
                                <!--<div class="questions">-->
                                <!--<el-button @click.native="testQuestions"><i-->
                                <!--class="el-icon-circle-plus-outline"></i>{{$t('message.New_Question')}}-->
                                <!--</el-button>-->
                                <!--<el-button icon="el-icon-circle-plus-outline">{{$t('message.New_Question_Group')}}</el-button>-->
                                <!--</div>-->
                            </div>
                            <div class="questions-checkbox">
                                <!--<el-checkbox v-model="checked5" style="display: block;margin-top: 2%">-->
                                <!--{{$t('message.Notify_users_that')}}-->
                                <!--</el-checkbox>-->
                            </div>
                            <el-button @click="CancelAnEvent()">{{
                                $t("message.Cancel")
                            }}</el-button>
                            <el-button
                                style="float: right;background-color: #0138b1;color: white;margin-right: 1%"
                                @click="
                                    quizeSureModify(quizFor.title, 'quizFor')
                                "
                            >
                                {{ $t("message.Save") }}
                            </el-button>
                            <el-button
                                style="float: right;background-color: #0138b1;color: white;"
                                v-model="status"
                                @click="
                                    quizeSureModifyPublish(
                                        quizFor.title,
                                        'quizFor'
                                    )
                                "
                            >
                                {{ $t("message.Save_Publish") }}
                            </el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--<div style="width: 26%;" class="quizeRight">-->
            <!--<common-right-->
            <!--@getAssignItem='getAssignItem'-->
            <!--@getQuizeItem='getQuizeItem'-->
            <!--@getAnnouseItem='getAnnouseItem'-->
            <!--@getDiscussItem='getDiscussItem'-->
            <!--@getModuleItem='getModuleItem'-->
            <!--@node-click='nodeClick'-->
            <!--@fileSucess='fileSucess'-->
            <!--@getFile-name='getFileName'-->
            <!--:courseId='courseId'-->
            <!--&gt;</common-right>-->
            <!--</div>-->
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
import Vue from "vue";
import eventBus from "@/eventBus";
import goTop from "@/utils/goTop.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";
import { mapGetters } from "vuex";
import commonRight from "@/utils/right/commonRight.vue";
import baseValidater from "@/utils/baseValidater";
import EditQuestion from "./editQuestion.vue";
import assignTo from "@/utils/assignTo.vue";

export default {
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formatPrice(value) {
            let tempVal = parseFloat(value).toFixed(3);
            let realVal = tempVal.substring(0, tempVal.length - 1);
            return realVal;
        }
    },
    data() {
        return {
            quizz_select: "quizz_select",
            newQuestion: {},
            seq: "",
            studyGroupEdited: "",
            judgeData: "",
            judgeList: [
                {
                    code: "A",
                    content: "True",
                    explanation: "",
                    seq: 1
                },
                {
                    code: "B",
                    content: "False",
                    explanation: "",
                    seq: 2
                }
            ],
            radio2: "",
            watchTitle: "",
            seqq: 0,
            loading: true,
            testRadio: 1,
            quizzChecked: [],
            title: this.$t("message.Unnamed_quiz"),
            titles: this.$t("message.Question"),
            /*description: '',*/
            type: {
                value: "1"
            },
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: process.env.NODE_ENV + "/ckupload"
                }
            },
            time: "",
            quizeValue: false,
            quizeScore: false,
            quizeSubmissions: false,
            courseId: this.$route.query.courseId,
            quizDetailId: this.$route.query.quizDetailId,
            name: "",
            assignmentGroupList: [],
            assignment: [],
            isShuffleAnswer: "",
            allowAnonymous: "",
            timeLimit: "",
            timeLimit1: "",
            AllowMultiple: false,
            allowMultiAttempt: "",
            attemptNumber: "",
            scoreType: [],
            scoreTypeOptions: [
                {
                    value: 1,
                    name: this.$t("message.Highest")
                },
                {
                    value: 2,
                    name: this.$t("message.Latest")
                },
                {
                    value: 3,
                    name: this.$t("message.Average")
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
            LockQuestions: false,
            showReply: false,
            showAnswer: false,
            quizPageModify: true,
            showQuestionStrategy: "",
            isLockRepliedQuestion: "",
            showAccessCode: false,
            isNeedAccessCode: "",
            accessCode: "",
            showFilterIP: false,
            isFilterIP: "",
            filterIpAddress: "",
            isOpen: false,
            assign: [
                {
                    assignId: "",
                    assignType: "",
                    limitTime: "",
                    startTime: "",
                    endTime: "",
                    defaultSelect: ["_1_0"] //选中的
                }
            ],
            // aassignSections: [],
            // aassignUser: [],
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
            BooleanList: [
                { value: 0, name: "True" },
                { value: 1, name: "False" }
            ],
            quizFor: {
                // description: '',
                // score: '',
                // title: '',
                // scorep:'',
                // delivery: false,
                // timeLimit:'',
                // attemptNumber:'',
            },
            score: "",
            rules: {
                score: [{ validator: baseValidater.integerP, trigger: "blur" }],
                /*required: true,*/
                timeLimit: [
                    {
                        message: this.$t("message.Point_is_required"),
                        trigger: "blur"
                    },
                    {
                        validator: baseValidater.integerP,
                        trigger: "blur"
                    }
                ],
                attemptNumber: [
                    {
                        validator: baseValidater.validateatemptNumber,
                        trigger: "blur"
                    }
                ]
            },
            section: {} /*assign*/,
            fileList: [],
            showQuizInforList: [],
            practiceQuizList: [],
            gradedQuizList: [],
            surveyList: [],
            quizInfoGetTaba: [],
            correctComment: "",
            wrongComment: "",
            generalComment: "",
            quizadd: "",
            datas: "",
            TeacherQuizList: true,
            TeachersurveyList: true,
            TeachergradedQuizList: true,
            quizInfoGetList: [],
            quizeDeleteDialogVisible: false,
            testQuestionsisShowmondify: false,
            optionContentMaxLength: 100,
            action: process.env.NODE_ENV,
            questionType: {
                value: ""
            },
            content: "",
            value1time: "",
            showQuizzes: false,
            questionList: [],
            postToSection: [],
            questionId: "",
            editIsShow: false,
            testQuestionsisShow: false,
            quizItemList: [],
            mondifyTestProblem: true,
            TestProblem: false,
            quizzesSubmit: false,
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
            editDialogFormVisible: false,
            editDialogFormVisibleList: false,
            value: "",
            labelPosition: "right",
            value5: [],
            checked5: false,
            initMount: 0
        };
    },
    components: {
        "v-goTop": goTop,
        "v-assign-to": assignTo,
        commonRight,
        EditQuestion
    },
    watch: {
        "quizFor.timeLimit1": {
            handler(newV, oldV) {
                if (!newV) {
                    this.quizFor.timeLimit = "0";
                }
            },
            deep: true,
            immediate: true
        },
        "quizFor.showReplyStrategy1": {
            handler(newV, oldV) {
                if (!newV) {
                    this.quizFor.showReplyStrategy2 = false;
                    this.quizFor.showAnswerStrategy = false;
                }
            },
            deep: true,
            immediate: true
        },
        "quizFor.allowMultiAttempt": {
            handler(newV, oldV) {
                if (!newV) {
                    this.quizFor.AllowedAttempts = false;
                    this.quizFor.attemptNumber = "";
                    // this.quizFor.scoreType=2
                }
            },
            deep: true,
            immediate: true
        },
        "quizFor.isNeedAccessCode": {
            handler(newV, oldV) {
                if (!newV) {
                    this.quizFor.accessCode = "";
                }
            },
            deep: true,
            immediate: true
        },
        "quizFor.AllowedAttempts": {
            handler(newV, oldV) {
                if (!newV) {
                    this.quizFor.attemptNumber = "";
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.groupShow2();
        this.showQuize();
        this.quizInfoGet();
        // this.assignGet();
        /* this.groupShow3();*/
        this.answeredEdit();
        // console.log(this.userInfoData);
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    methods: {
        removeAssignForm(index) {
            this.assign.splice(index, 1);
        },
        sendToSelect(arr) {
            console.log(arr);
            if (arr.length > 0) {
                // 19_2_0; ["id_type_index"]
                let data = arr[0].split("_");
                this.assign[data[2]].defaultSelect = arr;
            }
        },
        addAssignForm() {
            this.assign.push({
                assignId: "",
                assignType: "",
                limitTime: "",
                startTime: "",
                endTime: "",
                defaultSelect: [] //选中的
            });
        },
        originalPage: function() {
            this.quizPageModify = false;
            this.quizzesSubmit = false;
            eventBus.$emit("originalPage");
        },
        testQuestions: function() {
            this.newQuestion = {
                title: this.$t("message.Question")
            };
            this.testQuestionsisShow = !this.testQuestionsisShow;
        },
        /*下拉选择不同的试题*/
        editLockUntil: function() {
            this.editIsShow = !this.editIsShow;
        },
        removeDomain(item) {
            var index = this.QuestionOptions.indexOf(item);
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
        showQuize: function() {
            let param = {
                id: this.quizDetailId
            };
            window.v = this;
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/list`, {
                    params: param
                })
                .then(res => {
                    // console.log(123, this.quizFor);
                    if (res.data.code == 200) {
                        // this.studyGroupEdited = this.studyGroupEdited == 0 ? false : true;
                        this.loading = false;
                        this.quizPageModify = true;
                        this.quizzesSubmit = false;
                        var quizFor = res.data.entity[0];
                        // this.quizadd = id;
                        quizFor.isShuffleAnswer = !!quizFor.isShuffleAnswer;
                        quizFor.allowMultiAttempt = !!quizFor.allowMultiAttempt;
                        quizFor.isFilterIP = !!quizFor.isFilterIP;
                        quizFor.isLockRepliedQuestion = !!quizFor.isLockRepliedQuestion;
                        quizFor.isNeedAccessCode = !!quizFor.isNeedAccessCode;
                        quizFor.showAnswerStrategy = !!quizFor.showAnswerStrategy;
                        quizFor.showQuestionStrategy = !!quizFor.showQuestionStrategy;
                        quizFor.showReplyStrategy1 =
                            quizFor.showReplyStrategy != 0;
                        quizFor.showReplyStrategy2 =
                            quizFor.showReplyStrategy == 2;
                        quizFor.timeLimit1 = quizFor.timeLimit > 0;
                        quizFor.AllowedAttempts = quizFor.attemptNumber > 0;
                        quizFor.timeLimit = quizFor.timeLimit || "";
                        quizFor.attemptNumber = quizFor.attemptNumber || "";
                        this.quizFor = quizFor;
                        // console.log('111111111111111',this.quizFor.assignmentGroupId);
                        this.quizItem();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        groupShow2() {
            this.quizeValue = true;
            this.quizeScore = false;
            this.quizeSubmissions = false;
            let param = {
                courseId: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.assignment = res.data.entity;
                        // this.quizFor.assignmentGroupId = this.assignment[0].id;
                        //  this.$set(this.quizFor, 'assignmentGroupId', this.assignment[0].id)
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        groupShow23() {
            this.quizeValue = true;
            this.quizeScore = false;
            this.quizeSubmissions = false;
            let param = {
                courseId: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.assignment = res.data.entity;
                        // this.quizFor.assignmentGroupId = this.assignment[0].id;
                        this.$set(
                            this.quizFor,
                            "assignmentGroupId",
                            this.assignment[0].id
                        );
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        groupShow3() {
            this.quizeValue = true;
            this.quizeScore = true;
            this.quizeSubmissions = true;
            let param = {
                courseId: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.assignment = res.data.entity;
                        // this.quizFor.assignmentGroupId = res.data.entity[0].id;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        groupShow1() {
            this.quizeValue = false;
            this.quizeScore = false;
            this.quizeSubmissions = false;
        },
        groupShow4() {
            this.quizeValue = false;
            this.quizeScore = false;
            this.quizeSubmissions = true;
        },
        MultipleAttempt() {
            this.AllowMultiple = !this.AllowMultiple;
        },
        LockQuestion() {
            this.LockQuestions = !this.LockQuestions;
        },
        ReplyStrategy() {
            this.showReply = !this.showReply;
        },
        AnswerStrategy() {
            this.showAnswer = !this.showAnswer;
        },
        accesscode() {
            this.showAccessCode = !this.showAccessCode;
        },
        IPAddresses() {
            this.showFilterIP = !this.showFilterIP;
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
        quizeSureModify: function(title, quizFor) {
            if (!this.quizFor.showReplyStrategy1) {
                this.quizFor.showReplyStrategy = 0;
            } else {
                if (this.quizFor.showReplyStrategy2) {
                    this.quizFor.showReplyStrategy = 2;
                } else {
                    this.quizFor.showReplyStrategy = 1;
                }
            }
            // if (!this.showAnswerStrategy1) {
            //   this.showAnswerStrategy = 0;
            //
            // } else {
            //   if (this.showAnswerStrategy2) {
            //     this.showAnswerStrategy = 2;
            //   } else {
            //     this.showAnswerStrategy = 1;
            //   }
            // }
            // ;
            let assigns = [];
            //分配表单
            this.assign.forEach(v => {
                if (v.defaultSelect.length > 0) {
                    v.defaultSelect.forEach(vv => {
                        let as = {
                            assignId: "",
                            assignType: "",
                            limitTime: v.limitTime,
                            startTime: v.startTime,
                            endTime: v.endTime
                        };
                        let data = vv.split("_"); //id_type
                        as.assignId = data[0]; //all
                        as.assignType = data[1]; //all
                        assigns.push(as);
                    });
                }
            });
            //如果没选的话 必须写一个默认的
            if (assigns.length == 0) {
                let as = {
                    assignType: 1 //all
                };
                assigns.push(as);
            }
            let modifyQuize = {
                id: this.quizDetailId,
                courseId: this.courseId,
                title: this.quizFor.title,
                description: this.quizFor.description,
                type: this.quizFor.type,
                assignmentGroupId: this.quizFor.assignmentGroupId,
                score: this.quizFor.score,
                allowAnonymous: Number(this.quizFor.allowAnonymous),
                isShuffleAnswer: Number(this.quizFor.isShuffleAnswer),
                timeLimit: this.quizFor.timeLimit,
                allowMultiAttempt: Number(this.quizFor.allowMultiAttempt),
                attemptNumber: this.quizFor.attemptNumber,
                scoreType: this.quizFor.scoreType,
                showReplyStrategy: Number(this.quizFor.showReplyStrategy),
                showAnswerStrategy: Number(this.quizFor.showAnswerStrategy),
                showAnswerStartTime: this.quizFor.showAnswerStartTime,
                showAnswerEndTime: this.quizFor.showAnswerEndTime,
                showQuestionStrategy: Number(this.quizFor.showQuestionStrategy),
                isLockRepliedQuestion: Number(
                    this.quizFor.isLockRepliedQuestion
                ),
                isNeedAccessCode: Number(this.quizFor.isNeedAccessCode),
                accessCode: this.quizFor.accessCode,
                isFilterIP: Number(this.quizFor.isFilterIP),
                filterIpAddress: this.quizFor.filterIpAddress,
                version: "20",
                status: this.status,
                totalQuestions: this.seqq,
                totalScore: "0",
                assign: assigns
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/modify`, modifyQuize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageModify = false;
                        this.quizzesSubmit = false;
                        this.$router.push({
                            path: "/homePage/allCourse/courseQuizz",
                            query: {
                                data: this.datas,
                                courseId: this.courseId,
                                name: title
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

        quizeSureModifyPublish: function(title) {
            if (!this.quizFor.showReplyStrategy1) {
                this.quizFor.showReplyStrategy = 0;
            } else {
                if (this.quizFor.showReplyStrategy2) {
                    this.quizFor.showReplyStrategy = 2;
                } else {
                    this.quizFor.showReplyStrategy = 1;
                }
            }
            // if (!this.showAnswerStrategy1) {
            //   this.showAnswerStrategy = 0;
            //
            // } else {
            //   if (this.showAnswerStrategy2) {
            //     this.showAnswerStrategy = 2;
            //   } else {
            //     this.showAnswerStrategy = 1;
            //   }
            // }
            // ;
            let assigns = [];
            //分配表单
            this.assign.forEach(v => {
                if (v.defaultSelect.length > 0) {
                    v.defaultSelect.forEach(vv => {
                        let as = {
                            assignId: "",
                            assignType: "",
                            limitTime: v.limitTime,
                            startTime: v.startTime,
                            endTime: v.endTime
                        };
                        let data = vv.split("_"); //id_type
                        as.assignId = data[0]; //all
                        as.assignType = data[1]; //all
                        assigns.push(as);
                    });
                }
            });
            //如果没选的话 必须写一个默认的
            if (assigns.length == 0) {
                let as = {
                    assignType: 1 //all
                };
                assigns.push(as);
            }
            let modifyQuize = {
                id: this.quizDetailId,
                courseId: this.courseId,
                title: this.quizFor.title,
                description: this.quizFor.description,
                type: this.quizFor.type,
                assignmentGroupId: this.quizFor.assignmentGroupId,
                score: this.quizFor.score,
                allowAnonymous: Number(this.quizFor.allowAnonymous),
                isShuffleAnswer: Number(this.quizFor.isShuffleAnswer),
                timeLimit: this.quizFor.timeLimit,
                allowMultiAttempt: Number(this.quizFor.allowMultiAttempt),
                attemptNumber: this.quizFor.attemptNumber,
                scoreType: this.quizFor.scoreType,
                showReplyStrategy: Number(this.quizFor.showReplyStrategy),
                showAnswerStrategy: Number(this.quizFor.showAnswerStrategy),
                showAnswerStartTime: this.quizFor.showAnswerStartTime,
                showAnswerEndTime: this.quizFor.showAnswerEndTime,
                showQuestionStrategy: Number(this.quizFor.showQuestionStrategy),
                isLockRepliedQuestion: Number(
                    this.quizFor.isLockRepliedQuestion
                ),
                isNeedAccessCode: Number(this.quizFor.isNeedAccessCode),
                accessCode: this.quizFor.accessCode,
                isFilterIP: Number(this.quizFor.isFilterIP),
                filterIpAddress: this.quizFor.filterIpAddress,
                version: "20",
                status: "1",
                totalQuestions: this.seqq,
                totalScore: "0",
                assign: assigns
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/modify`, modifyQuize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageModify = false;
                        this.quizzesSubmit = false;
                        this.$router.push({
                            path: "/homePage/allCourse/courseQuizz",
                            query: {
                                data: this.datas,
                                courseId: this.courseId,
                                name: title
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
        questionAdd: function(question) {
            var quest = {
                quizId: this.quizDetailId,
                courseId: this.courseId,
                groupID: 2,
                isTemplate: 0,
                questionBankID: 0,
                questionTemplateId: 0,
                seq: 0,
                correctComment: question.correctComment,
                wrongComment: question.wrongComment,
                generalComment: question.generalComment,
                title: question.title,
                type: question.type,
                content: question.content,
                score: Number(question.score).toFixed(2) * 100,
                options: question.options
            };
            this.$http
                .post(`${process.env.NODE_ENV}/question/add`, quest)
                .then(res => {
                    if (res.data.code == 200) {
                        this.testQuestionsisShow = false;
                        this.quizItem();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizItem() {
            let param = {
                quizId: this.quizDetailId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizItem/list`, { params: param })
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.entity) {
                            this.quizItemList = res.data.entity;
                            this.quizItemList.forEach(a => {
                                a.question.score /= 100;
                            });
                            this.seqq = this.quizItemList[
                                this.quizItemList.length - 1
                            ].seq;
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        modifyQuestionStara: function(domain) {
            Vue.set(domain, "isEdit", true);
            domain.copyQuestion = Object.assign({}, domain.question);
        },
        questionDeletes: function(id) {
            let ids = [];
            ids.push(id);
            this.$confirm(this.$t("message.delete_quiz"), "", {
                confirmButtonText: this.$t("message.Yes"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(`${process.env.NODE_ENV}/question/deletes`, ids)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: this.$t(
                                        "message.Delete_succeeded"
                                    ),
                                    type: "success"
                                });
                                this.quizItem();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: 'undelete'
                    // });
                });
        },
        questionMondify: function(question, domain) {
            let questionMondify = {
                id: question.id,
                quizId: this.quizDetailId,
                courseId: this.courseId,
                groupID: 2,
                isTemplate: 0,
                questionBankID: 0,
                questionTemplateId: 0,
                seq: 0,
                correctComment: question.correctComment,
                wrongComment: question.wrongComment,
                generalComment: question.generalComment,
                title: question.title,
                type: question.type,
                content: question.content,
                //score: question.score * 100,
                score: Number(question.score).toFixed(2) * 100,
                options: question.options
            };

            this.$http
                .post(
                    `${process.env.NODE_ENV}/question/modify`,
                    questionMondify
                )
                .then(res => {
                    if (res.data.code == 200) {
                        // todo ??
                        this.quizDetailId = domain.quizId;
                        this.quizItem();
                        domain.isEdit = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizInfoGet: function() {
            let param = {
                data: this.quizDetailId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/get`, { params: param })
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizInfoGetList = res.data.entity;
                        this.status = res.data.entity.status;
                        let assign = res.data.entity.assigns;
                        let assignList = [];
                        assign.forEach((v, index) => {
                            let as = {
                                assignId: "",
                                assignType: "",
                                limitTime: v.limitTime,
                                startTime: v.startTime,
                                endTime: v.endTime,
                                defaultSelect: [] //选中的
                            };

                            if (v.assignType == 1) {
                                as.defaultSelect.push("_1_" + index);
                            } else {
                                as.defaultSelect.push(
                                    v.assignId +
                                        "_" +
                                        v.assignType +
                                        "_" +
                                        index
                                );
                            }
                            assignList.push(as);
                        });
                        this.assign =
                            assignList.length > 0 ? assignList : this.assign;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // assignGet: function () {
        //   this.$http.get(`${process.env.NODE_ENV}/assign/get?data=${this.courseId}`)
        //     .then((res) => {
        //       if (res.data.code == 200) {
        //         this.aassignSections = res.data.entity.sections;
        //         this.aassignUser = res.data.entity.users;
        //       } else {
        //         this.$message.error(res.data.message);
        //       }
        //     }).catch((err) => {
        //     console.log(err);
        //   })
        //
        // },
        quizItemDeletes(item) {
            let index = this.assign.indexOf(item.id);
            if (index !== -1) {
                this.assign.splice(index, 1);
            }
            let ids = [];
            ids.push(item.id);
            this.$confirm(this.$t("message.delete_quiz"), "", {
                confirmButtonText: this.$t("message.Yes"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/questionOption/deletes`,
                            ids
                        )
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: this.$t(
                                        "message.Delete_succeeded"
                                    ),
                                    type: "success"
                                });
                                this.quizItem();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: 'undelete'
                    // });
                });
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
        //初始化班级列表
        assignGet: function() {
            this.$http
                .get(`${process.env.NODE_ENV}/assign/get?data=${this.courseId}`)
                .then(res => {
                    if (res.data.code == 200) {
                        let tmp = [];
                        tmp.push({
                            label: "Everyone",
                            optionss: [
                                {
                                    type: 1,
                                    id: 0,
                                    name: "Everyone"
                                }
                            ]
                        });
                        tmp.push({
                            label: "Class",
                            optionss: res.data.entity.sections
                        });
                        tmp.push({
                            label: "Student",
                            optionss: res.data.entity.users
                        });
                        this.section = tmp;
                        this.postToSection.push({
                            id: 0,
                            type: 1,
                            name: "Everyone"
                        });
                        for (
                            let i = 0;
                            i < res.data.entity.sections.length;
                            i++
                        ) {
                            this.postToSection.push(
                                res.data.entity.sections[i]
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
         * 返回按钮
         * */
        CancelAnEvent() {
            this.$router.push({
                path: "/homePage/allCourse/quizzList",
                query: { data: this.quizDetailId, courseId: this.courseId }
            });
        },
        /**
         * 学生是否答过题
         */
        answeredEdit: function() {
            let quizRecord = {
                id: this.quizDetailId
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/quizItem/answered/edit`,
                    quizRecord
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.studyGroupEdited = res.data.message;

                        //this.quizItem();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        // getAssignItem(item) {
        //   let tempUrl = 'homePage/allCourse/assignmentDetail?assignId=' + item.id;
        //   this.quizFor.description += `<a href=${tempUrl}> ${item.name}</a>`
        //   this.content += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // 获取测验信息
        // getQuizeItem(item) {
        //   let tempUrl = 'homePage/allCourse/courseQuizz?data=' + item.id;
        //   this.quizFor.description += `<a href=${tempUrl}> ${item.name}</a>`
        //   this.content += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // getAnnouseItem(item) {
        //   let tempUrl = '';
        //   this.quizFor.description += `<a href=${tempUrl}> ${item.name}</a>`
        //   this.content += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // getDiscussItem(item) {
        //   let tempUrl = '';
        //   this.quizFor.description += `<a href=${tempUrl}> ${item.name}</a>`
        //   this.content += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // getModuleItem(item) {
        //   let tempUrl = '';
        //   this.quizFor.description += `<a href=${tempUrl}> ${item.name}</a>`
        //   this.content += `<a href=${tempUrl}> ${item.name}</a>`
        // },

        // nodeClick(fileName) {
        //   this.quizFor.description += '' + fileName;
        //   this.content += '' + fileName;
        // },
        // fileSucess(fileName) {
        //   this.moreEventForm.description += '' + fileName;
        //   this.content += '' + fileName;
        // },
        // getFileName(fileName) {
        //   this.quizFor.description += '' + fileName;
        //   this.content += '' + fileName;
        // this.moreEventForm.description += '' + fileName;
        // },
    }
};
/*eslint-disable no-new*/
</script>

<style scoped>
@import "./styleQuizz.css";
</style>
