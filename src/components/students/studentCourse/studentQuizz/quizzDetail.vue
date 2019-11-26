<template>
    <div>
        <!--eslint-disable-->
        <div v-show="xianshi">
            <div style="width: 70%;" class="quizeLeft">
                <div class="question_unit">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="quizInfoGetList.title"
                        placement="top"
                    >
                        <p class="studentTitle_title">
                            {{ quizInfoGetList.title }}
                        </p>
                    </el-tooltip>
                    <!--<h3 class="studentTitle_title">{{quizInfoGetList.title}}</h3>-->
                    <!--详细信息展示-->
                    <div class="unit_again">
                        <ul>
                            <!--v-for="studentquizInfoGetTaba in quizInfoGetTaba"-->
                            <li>
                                <!--<h4>{{$t('message.Due')}}</h4>
                                <span>{{studentquizInfoGetTaba.limitTime}}</span>-->
                                <span v-if="quizInfoGetTaba.limitTime"
                                    ><b> {{ $t("message.ASSIGNMENT.due") }}:</b>
                                    {{
                                        quizInfoGetTaba.limitTime
                                            | formatterDate
                                    }}</span
                                >
                                <span v-else
                                    ><b>{{ $t("message.ASSIGNMENT.due") }}:</b>
                                    {{
                                        $t("message.ASSIGNMENT.not_due_time")
                                    }}</span
                                >
                            </li>
                            <li v-show="quizInfoGetList.totalScore">
                                <h4>{{ $t("message.Points") }}</h4>
                                <span>{{
                                    quizInfoGetList.totalScore / 100
                                }}</span>
                            </li>
                            <li v-show="quizInfoGetList.totalQuestions">
                                <h4>{{ $t("message.Questions") }}</h4>
                                <span>{{
                                    quizInfoGetList.totalQuestions
                                }}</span>
                            </li>
                            <li v-show="quizInfoGetList.timeLimit">
                                <h4>{{ $t("message.Time_Limit") }}</h4>
                                <span>{{ quizInfoGetList.timeLimit }}</span>
                            </li>
                            <li v-show="quizInfoGetList.attemptNumber">
                                <h4>{{ $t("message.Allowed_Attempts") }}</h4>
                                <span>{{ quizInfoGetList.attemptNumber }}</span>
                                <!--<span v-if="quizInfoGetList.allowMultiAttempt=='1'">Yes</span>-->
                                <!--<span v-if="quizInfoGetList.allowMultiAttempt=='0'">No </span>-->
                            </li>
                            <li>
                                <!--<h4>Available</h4><span v-show="studentquizInfoGetTaba.startTime">
                                {{studentquizInfoGetTaba.startTime}}</span>-->
                                <!--<span v-show="studentquizInfoGetTaba.endTime">
                                {{studentquizInfoGetTaba.endTime}}</span>-->
                                <span
                                    v-if="
                                        quizInfoGetTaba.startTime ||
                                            quizInfoGetTaba.endTime
                                    "
                                >
                                    <b
                                        >{{
                                            $t("message.ASSIGNMENT.available")
                                        }}:</b
                                    >
                                    {{
                                        quizInfoGetTaba.startTime
                                            | formatterDate
                                    }}
                                    &nbsp;&nbsp;
                                    {{
                                        quizInfoGetTaba.endTime | formatterDate
                                    }}
                                </span>
                            </li>
                        </ul>
                        <div class="quizeLeft_init">
                            <!--eslint-disable-->
                            <p
                                class="descriptionFold"
                                @click="richTextClick($event)"
                                v-html="quizInfoGetList.description"
                            >
                                <!--v-html="quizInfoGetList.description"-->
                                <!--{{ transfHtml(quizInfoGetList.description) }}-->
                            </p>
                            <!--eslint-disable no-new-->
                        </div>
                    </div>
                    <!--按钮显示隐藏-->
                    <div
                        v-show="!lastAttempt.attemps == 0"
                        class="quizeLeft_button"
                    >
                        <el-button
                            v-show="studentShowQuizz == 1"
                            style="background-color: #0138b1;color: white"
                            @click="startedQuizzes"
                        >
                            {{ $t("message.Take_the_Quiz_Again") }}
                        </el-button>
                    </div>
                    <div
                        v-show="lastAttempt.attemps == 0"
                        class="quizeLeft_button"
                    >
                        <el-button
                            v-show="studentShowQuizz == 1"
                            style="background-color: #0138b1;color: white"
                            @click="startedQuizzes"
                        >
                            {{ $t("message.Take_the_Quiz") }}
                        </el-button>
                    </div>
                    <div
                        v-show="studentShowQuizz == 9"
                        class="quizeLeft_button"
                    >
                        <el-button
                            v-show="studentShowQuizz == 9"
                            type="primary"
                            style="background-color: #0138b1;color: white"
                            @click="startedQuizzes"
                        >
                            {{ $t("message.Resume_Quiz") }}
                        </el-button>
                    </div>
                    <div v-if="studentShowQuizz == 7" class="cautions">
                        <!--警示-->
                        <i class="el-icon-info" />
                        {{ $t("message.This_quiz_is_locked_until") }}

                        {{ quizInfoGetTaba.startTime | formatterDate }}
                    </div>
                    <div v-if="studentShowQuizz == 8" class="cautions">
                        <!--警示-->
                        <i class="el-icon-info" />
                        {{ $t("message.This_quiz_was_locked") }}
                        {{ quizInfoGetTaba.endTime | formatterDate }}
                    </div>
                    <!--历史记录-->
                    <div class="quizeLeft_attempt">
                        <span>{{ $t("message.Attempt_History") }}</span>
                        <el-table
                            :data="quizRecordlist"
                            style="width: 100%"
                            @selection-change="handleSelectionChange(scope.row)"
                        >
                            <el-table-column
                                label=""
                                prop="idKept"
                                align="center"
                                data-placement="auto"
                                :show-overflow-tooltip="true"
                                min-width="24%"
                            />
                            <el-table-column
                                :label="$t('message.Attempt')"
                                align="center"
                                data-placement="auto"
                                :show-overflow-tooltip="true"
                                min-width="24%"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="goReply(scope.row)"
                                    >
                                        {{ scope.row.name }}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('message.Time_minute')"
                                prop="afterMin"
                                align="center"
                                data-placement="auto"
                                :show-overflow-tooltip="true"
                                min-width="24%"
                            />
                            <el-table-column
                                :label="$t('message.Score')"
                                prop="grade.gradeScore"
                                align="center"
                                data-placement="auto"
                                :show-overflow-tooltip="true"
                                min-width="24%"
                            />
                        </el-table>

                        <!--<p>* Some questions not yet graded </p>-->
                        <!--<p>-->
                        <!--Quiz results are protected for this quiz and
                        are not visible to students until they have submitted their-->
                        <!--last attempt</p>-->
                        <!--<div class="caution" v-if="studentShowQuizz==1">&lt;!&ndash;警示&ndash;&gt;-->
                        <!--<img src="../../../../../static/images/jingshi.png" alt="">-->
                        <!--{{$t('message.Allow_questions_to_be_answered')}}-->
                        <!--</div>-->
                        <!--<p>Score for this attempt : 0 out of 15 *</p>-->
                    </div>
                    <!--输入验证码-->
                    <div v-if="studentShowQuizz == 3">
                        <el-input
                            v-model="accessCode"
                            style="width: 30%;margin-top: 2%"
                            :placeholder="
                                $t('message.Please_enter_an_access_code')
                            "
                        />
                        <el-button type="primary" @click="showquizItem">
                            {{ $t("message.Sure") }}
                        </el-button>
                    </div>
                    <!--各种警示框-->
                    <div v-if="studentShowQuizz == 2" class="caution">
                        <!--警示-->
                        <img
                            src="../../../../../static/images/jingshi.png"
                            alt=""
                        />
                        {{ $t("message.Indicates_that_it_is_locked") }}
                    </div>
                    <div
                        v-if="studentShowQuizz == 3"
                        v-show="showCode"
                        class="caution"
                    >
                        <!--警示-->
                        <img
                            src="../../../../../static/images/jingshi.png"
                            alt=""
                        />
                        {{ $t("message.Indicates_an_access_code_error") }}
                    </div>
                    <!-- <div class="caution" v-if="studentShowQuizz==4">&lt;!&ndash;警示&ndash;&gt;
                       <img src="../../../../../static/images/jingshi.png" alt="">
                       {{$t('message.Indicates_that_the_number')}}

                     </div>-->
                    <div v-if="studentShowQuizz == 5" class="caution">
                        <!--警示-->
                        <img
                            src="../../../../../static/images/jingshi.png"
                            alt=""
                        />
                        {{ $t("message.IP_address_is_not_in_the_set_range") }}
                    </div>
                    <div v-if="studentShowQuizz == 6" class="caution">
                        <!--警示-->
                        <img
                            src="../../../../../static/images/jingshi.png"
                            alt=""
                        />
                        {{ $t("message.Reference_module_in_unlocked_state") }}
                    </div>
                    <!--<div class="caution" v-if="studentShowQuizz==7">&lt;!&ndash;警示&ndash;&gt;-->
                    <!--<img src="../../../../../static/images/jingshi.png" alt="">-->
                    <!--{{$t('message.The_current_time_is_not_within')}}-->
                    <!--</div>-->
                </div>
                <!--答题正误显示-->
                <div>
                    <!--attempt{{attemptIndex}}-->
                    <div
                        v-for="(domain, indexq) in showQuizQuestionRecord"
                        v-show="displayError == 4"
                        :key="indexq"
                        class="quizzes-question"
                    >
                        <img
                            v-show="
                                (domain.type != 6 && domain.answerNum == 0) ||
                                    (domain.type == 6 &&
                                        domain.reply.reply == '')
                            "
                            src="../../../../../static/images/UnAnswered.png"
                            alt=""
                        />
                        <img
                            v-show="
                                (domain.type != 1 && domain.answerNum == 0) ||
                                    (domain.type == 1 &&
                                        domain.choiceItem == '')
                            "
                            src="../../../../../static/images/UnAnswered.png"
                            alt=""
                        />
                        <img
                            v-show="
                                (domain.type != 2 && domain.answerNum == 0) ||
                                    (domain.type == 2 &&
                                        domain.choiceItem == '')
                            "
                            src="../../../../../static/images/UnAnswered.png"
                            alt=""
                        />
                        <img
                            v-show="
                                (domain.type != 3 && domain.answerNum == 0) ||
                                    (domain.type == 3 &&
                                        domain.choiceItem == '')
                            "
                            src="../../../../../static/images/UnAnswered.png"
                            alt=""
                        />

                        <h5>{{ domain.title }} {{ indexq + 1 }}</h5>
                        <span
                            >{{ domain.score / 100
                            }}{{ $t("message.pts") }}</span
                        >
                        <ul
                            v-for="(item, indexw) in domain.options"
                            :key="indexw"
                        >
                            <!--eslint-disable-->
                            <div
                                class="submitMatter"
                                v-html="domain.content"
                            ></div>
                            <!--eslint-disable no-new-->
                            <li v-show="domain.type == 1">
                                <el-radio
                                    v-model="domain.choiceItem"
                                    :label="item.content"
                                >
                                    {{ item.content }}
                                </el-radio>
                            </li>
                            <li v-show="domain.type == 2">
                                <el-checkbox v-model="item.isChoice">
                                    {{ item.content }}
                                </el-checkbox>
                            </li>
                            <li v-show="domain.type == 3">
                                <el-radio
                                    v-model="domain.choiceItem"
                                    :label="item.content"
                                >
                                    {{ item.content }}
                                </el-radio>
                            </li>
                            <li v-if="domain.type == 6">
                                <el-input
                                    v-model="domain.reply.reply"
                                    type="textarea"
                                    style="font-size:18px;font-family:'Microsoft YaHei'"
                                    disabled
                                >
                                    {{ domain.reply.reply }}
                                </el-input>
                            </li>
                        </ul>
                        <el-input
                            v-show="domain.generalComment"
                            v-model="domain.generalComment"
                            class="comment"
                            type="textarea"
                            :disabled="true"
                            style="width: 50%"
                        />
                    </div>
                </div>
            </div>

            <!--右侧信息展示-->
            <div style="width: 26%;" class="quizeRight">
                <div v-if="!lastAttempt.attemps == 0">
                    <div>
                        <h4
                            v-if="quizInfoGetList.attemptNumber < 2"
                            style="display: inline-block;padding: 4% 0"
                        >
                            {{ $t("message.Submission_Details") }}:
                        </h4>
                        <h4
                            v-else-if="quizInfoGetList.attemptNumber"
                            style="display: inline-block;padding: 4% 0"
                        >
                            {{ $t("message.Last_Attempt_Details") }}:
                        </h4>
                    </div>
                    <!--<div v-else="quizInfoGetList.attemptNumber">
                        <h4 style="display: inline-block;padding: 4% 0">
                            {{ $t('message.Last_Attempt_Details') }}:
                        </h4>
                    </div>-->
                    <div class="submissionDtails">
                        <ul>
                            <li
                                v-for="(timelimit, indext) in quizRecordlist"
                                v-show="indext === 0"
                                :key="indext"
                            >
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Time") }}:
                                </p>
                                <span>{{ timelimit.afterMin }}</span>
                                <span>{{ $t("message.minutes") }}</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Current_Score") }}:
                                </p>
                                <span>{{
                                    lastAttempt.currentScore / 100
                                }}</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Kept_Score") }}:
                                </p>
                                <span>{{ lastAttempt.gradeScore / 100 }}</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Attempts_Available") }}:
                                </p>
                                <span>{{ lastAttempt.attempsAvailable }}</span>
                            </li>
                            <li>
                                <span
                                    v-show="lastAttempt.isGraded == 0"
                                    class="some"
                                >
                                    {{
                                        $t("message.Some_subjective_questions")
                                    }}</span
                                >
                            </li>
                            <!--<li>-->
                            <!--<p style="width: 50%;display: inline-block"> isGraded:</p>-->
                            <!--<span-->
                            <!--v-if="lastAttempt.isGraded">Yes</span>-->
                            <!--<span v-if="!lastAttempt.isGraded">No </span>-->
                            <!---->
                            <!--</li>-->
                            <!--<li><span class="some">*Some questions not yet graded</span></li>-->
                            <!--<li>-->
                            <!--<h4>{{lastAttempt.attemps}} Attempts So far</h4>-->
                            <!--<p class="preview"
                            v-if="studentShowQuizz==1"
                            @click="startedQuizzes">
                            {{$t('message.Preview_thie_Quiz_Agains')}}</p>-->
                            <!--</li>-->
                            <li>
                                <!--<h4>66 More Attempts available</h4>-->
                                <p
                                    v-if="studentShowQuizz == 1"
                                    class="preview"
                                    @click="startedQuizzes"
                                >
                                    {{ $t("message.Take_the_Quiz_Agains") }}
                                </p>
                                <p v-show="lastAttempt.scoreType == 1">
                                    {{ $t("message.will_keep_the_highest") }}
                                </p>
                                <p v-show="lastAttempt.scoreType == 2">
                                    {{ $t("message.will_keep_the_latest") }}
                                </p>
                                <p v-show="lastAttempt.scoreType == 3">
                                    {{ $t("message.will_keep_the_average") }}
                                </p>
                            </li>
                            <!--<li>-->
                            <!--({{$t('message.Will_keep_the_highest_of_all_your_scores')}})-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="data" style="width: 70%;">
                <studentnextPrevious />
            </div>
        </div>
        <!--答题及倒计时-->
        <div v-if="quizzesStarted">
            <v-goTop />
            <take-quiz
                v-if="quizRecordId"
                :record-id="quizRecordId"
                :quiz="quizInfoGetList"
                @submitRecord="submitQuizzes"
            />
        </div>
        <!--详细信息展示-->
        <div v-show="quizzesSubmit">
            <div class="quizzesPublish-left">
                <div class="quizzesPreviewSubmit">
                    <div>
                        <div>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="quizInfoGetList.title"
                                placement="top"
                            >
                                <p class="studentTitle_title">
                                    {{ quizInfoGetList.title }}
                                </p>
                            </el-tooltip>
                            <div class="unit_again">
                                <ul>
                                    <!--v-for="studentquizInfoGetTaba in quizInfoGetTaba"-->
                                    <li>
                                        <!--<h4>{{$t('message.Due')}}</h4>
                                        <span>{{studentquizInfoGetTaba.limitTime}}</span>-->
                                        <span v-if="quizInfoGetTaba.limitTime"
                                            ><b
                                                >{{
                                                    $t(
                                                        "message.ASSIGNMENT.due"
                                                    )
                                                }}:
                                            </b>
                                            {{
                                                quizInfoGetTaba.limitTime
                                                    | formatterDate
                                            }}</span
                                        >
                                        <span v-else
                                            ><b
                                                >{{
                                                    $t(
                                                        "message.ASSIGNMENT.due"
                                                    )
                                                }}:</b
                                            >
                                            {{
                                                $t(
                                                    "message.ASSIGNMENT.not_due_time"
                                                )
                                            }}</span
                                        >
                                    </li>
                                    <li v-show="quizInfoGetList.totalScore">
                                        <h4>{{ $t("message.Points") }}</h4>
                                        <span>{{
                                            quizInfoGetList.totalScore / 100
                                        }}</span>
                                    </li>
                                    <li v-show="quizInfoGetList.totalQuestions">
                                        <h4>{{ $t("message.Questions") }}</h4>
                                        <span>{{
                                            quizInfoGetList.totalQuestions
                                        }}</span>
                                    </li>
                                    <li v-show="quizInfoGetList.timeLimit">
                                        <h4>{{ $t("message.Time_Limit") }}</h4>
                                        <span>{{
                                            quizInfoGetList.timeLimit
                                        }}</span>
                                    </li>
                                    <li v-show="quizInfoGetList.attemptNumber">
                                        <h4>
                                            {{ $t("message.Allowed_Attempts") }}
                                        </h4>
                                        <span>{{
                                            quizInfoGetList.attemptNumber
                                        }}</span>
                                        <!--<span v-if="quizInfoGetList.allowMultiAttempt=='1'">Yes</span>-->
                                        <!--<span v-if="quizInfoGetList.allowMultiAttempt=='0'">No </span>-->
                                    </li>
                                    <li>
                                        <!--<h4>Available</h4><span
                                        v-show="studentquizInfoGetTaba.startTime">
                                        {{studentquizInfoGetTaba.startTime}}</span>-->
                                        <!--<span v-show="studentquizInfoGetTaba.endTime">
                                        {{studentquizInfoGetTaba.endTime}}</span>-->
                                        <span
                                            v-if="
                                                quizInfoGetTaba.startTime ||
                                                    quizInfoGetTaba.endTime
                                            "
                                        >
                                            <b
                                                >{{
                                                    $t(
                                                        "message.ASSIGNMENT.available"
                                                    )
                                                }}:</b
                                            >
                                            {{
                                                quizInfoGetTaba.startTime
                                                    | formatterDate
                                            }}
                                            &nbsp;&nbsp;
                                            {{
                                                quizInfoGetTaba.endTime
                                                    | formatterDate
                                            }}
                                        </span>
                                    </li>
                                </ul>
                                <div class="quizeLeft_init">
                                    <!--eslint-disable-->
                                    <p
                                        class="descriptionFold"
                                        @click="richTextClick($event)"
                                        v-html="quizInfoGetList.description"
                                    />
                                    <!--eslint-disable no-new-->
                                </div>
                            </div>
                            <div class="quizeLeft_button">
                                <el-button
                                    v-if="studentShowQuizz == 1"
                                    style="background-color: #0138b1;color: white"
                                    @click="startedQuizzes"
                                >
                                    {{ $t("message.Take_the_Quiz_Agains") }}
                                </el-button>
                            </div>
                            <div class="quizeLeft_button">
                                <el-button
                                    v-show="studentShowQuizz == 9"
                                    type="primary"
                                    style="background-color: #0138b1;color: white"
                                    @click="startedQuizzes"
                                >
                                    {{ $t("message.Resume_Quiz") }}
                                </el-button>
                            </div>
                            <div class="quizeLeft_attempt">
                                <span>{{ $t("message.Attempt_History") }}</span>
                                <el-table
                                    :data="quizRecordlist"
                                    style="width: 100%"
                                    @selection-change="
                                        handleSelectionChange(scope.row)
                                    "
                                >
                                    <el-table-column
                                        label=""
                                        prop="idKept"
                                        align="center"
                                        data-placement="auto"
                                        :show-overflow-tooltip="true"
                                        min-width="24%"
                                    />
                                    <el-table-column
                                        :label="$t('message.Attempt')"
                                        align="center"
                                        data-placement="auto"
                                        :show-overflow-tooltip="true"
                                        min-width="24%"
                                    >
                                        <template slot-scope="scope">
                                            <el-button
                                                type="text"
                                                size="small"
                                                @click="goReply(scope.row)"
                                            >
                                                {{ scope.row.name }}
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label="$t('message.Time_minute')"
                                        prop="afterMin"
                                        align="center"
                                        data-placement="auto"
                                        :show-overflow-tooltip="true"
                                        min-width="24%"
                                    />
                                    <el-table-column
                                        :label="$t('message.Score')"
                                        prop="grade.gradeScore"
                                        align="center"
                                        data-placement="auto"
                                        :show-overflow-tooltip="true"
                                        min-width="24%"
                                    />
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!--正误判断查看和警示框-->
                    <div class="quizzes-score">
                        <div v-if="studentShowQuizz == 3">
                            <el-input
                                v-model="accessCode"
                                style="width: 30%;margin-top: 2%"
                                :placeholder="
                                    $t('message.Please_enter_an_access_code')
                                "
                            />
                            <el-button type="primary" @click="showquizItem">
                                {{ $t("message.Sure") }}
                            </el-button>
                        </div>
                        <p class="attemptNumber">
                            {{ attemptIndex }}
                        </p>
                        <p class="attemptNumber">
                            {{ $t("message.Score") }} {{ CurrentScore }}
                        </p>
                        <p class="attemptNumber">
                            {{ $t("message.Points") }}
                            {{ quizInfoGetList.totalScore / 100 }}
                        </p>
                        <!--<ul>-->
                        <!--<li>{{$t('message.Score_for_this_quiz')}} : <span>1 out of 10*</span></li>-->
                        <!--<li>{{$t('message.submitted_Dec')}} 25 at 14.44pm</li>-->
                        <!--<li>{{$t('message.This_attempt_took')}} 12 {{$t('message.minutes')}}</li>-->
                        <!--</ul>-->
                        <!--<div class="caution" v-if="displayError==1">&lt;!&ndash;警示&ndash;&gt;-->
                        <!--<img src="../../../../../static/images/jingshi.png" alt="">-->
                        <!--{{$t('message.To_allow')}}表示允许看正误和看答案-->
                        <!--</div>-->
                        <div v-if="displayError == 2" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--{{$t('message.Allowed_to')}}教师设置不允许看正误,<就不能看答案-->
                            <i>{{ $t("message.Quiz_results_are") }}</i
                            ><br />

                            <i style="color: #000000;padding-left: 3%">{{
                                $t("message.Correct_answers_are_hidden")
                            }}</i>
                        </div>
                        <div v-if="displayError == 3" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--{{$t('message.Indicates_that')}} 设置每次提交答案后才能看看正误，但还没提交答案-->
                        </div>
                        <div v-if="displayError == 4" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />{{ $t("message.Correct_answers_are_hidden") }}
                            <!--4 允许看正误，但教师设置不能看答案&lt;!&ndash;&ndash;&gt;-->
                        </div>
                        <div v-if="displayError == 5" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <i>{{ $t("message.Quiz_results_are_protected") }}</i
                            ><br />
                            <!--{{quizInfoGetList.showAnswerStartTime |
                             formatDate(time)}}&#45;&#45;
                             {{quizInfoGetList.showAnswerEndTime |formatDate(time)}}-->
                        </div>
                        <div v-if="displayError == 6" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--6允许看正误，但当前时间超出了看答案的时间-->
                            {{ $t("message.Allowed_to_look_right") }}
                        </div>
                        <div v-if="displayError == 7" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            7<!--允许看正误，但答案设置了最后一次提交才能看，当前不是最后一次提交-->
                            {{ $t("message.Answers_will_be_shown") }}
                        </div>
                        <div v-if="displayError == 8" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--8不允许看正误，设置了最后一次提交才能看正误，但当前不是最后一次提交-->
                            <i>{{ $t("message.Quiz_results_are_protected") }}</i
                            ><br />

                            <i style="color: #000000;padding-left: 3%">{{
                                $t("message.Correct_answers_are_hidden")
                            }}</i>
                        </div>
                        <div v-if="displayError == 9" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--9不允许看正误，设置了最后一次提交才能看正误，但当前不是最后一次提交,答案教师设置不允许看-->
                            {{ $t("message.Quiz_results_are_protected") }}
                        </div>
                        <div v-if="displayError == 10" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--10不允许看正误，设置了最后一次提交才能看正误，但当前不是最后一次提交,答案教师设置允许看,但还未达到看答案开始时间-->
                            {{ $t("message.Quiz_results_are_protected") }}
                        </div>
                        <div v-if="displayError == 11" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            <!--11不允许看正误，设置了最后一次提交才能看正误，但当前不是最后一次提交,答案教师设置允许看,但还未达到看答案开始时间-->
                            {{ $t("message.Quiz_results_are_protected") }}
                        </div>
                        <div v-if="displayError == 12" class="caution">
                            <!--警示-->
                            <img
                                src="../../../../../static/images/jingshi.png"
                                alt=""
                            />
                            {{ $t("message.Quiz_results_are_protected") }}
                            <!--12不允许看正误，设置了最后一次提交才能看正误，但当前不是最后一次提交,答案教师设置允许看,但当前不是最后一次提交-->
                        </div>
                    </div>
                    <div v-if="displayError == 1">
                        <div
                            v-for="(domain, indexy) in showQuizQuestionRecord"
                            :key="indexy"
                            class="quizzes-question"
                        >
                            <img
                                v-if="
                                    domain.error &&
                                        domain.error.type == 'unanswer'
                                "
                                src="../../../../../static/images/UnAnswered.png"
                                alt=""
                            />
                            <h5>{{ domain.title }} {{ indexy + 1 }}</h5>
                            <span
                                >{{ domain.score / 100
                                }}{{ $t("message.pts") }}</span
                            >
                            <ul>
                                <!--eslint-disable-->
                                <div
                                    class="submitMatter"
                                    v-html="domain.content"
                                ></div>
                                <!--eslint-disable no-new-->
                                <div
                                    v-for="(item, indexu) in domain.options"
                                    :key="indexu"
                                >
                                    <li v-show="domain.type == 1">
                                        <!--<img v-show="item.isChoice == 0"
                                         src="../../../../../static/images/UnAnswered.png" alt="">-->
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                            src="../../../../../static/images/correct.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../../static/images/correctanswer.png"
                                            alt=""
                                        />
                                        <el-radio
                                            :value="1"
                                            :label="item.isChoice"
                                            readonly
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </li>
                                    <li v-show="domain.type == 2">
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../../static/images/correctanswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                            src="../../../../../static/images/correct.png"
                                            alt=""
                                        />
                                        <el-checkbox
                                            v-model="item.isChoice"
                                            :true-label="1"
                                            disabled
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-checkbox>
                                    </li>
                                    <li v-show="domain.type == 3">
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                            src="../../../../../static/images/correct.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../../static/images/correctanswer.png"
                                            alt=""
                                        />
                                        <el-radio
                                            :value="1"
                                            :label="item.isChoice"
                                            readonly
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </li>
                                    <li v-if="domain.type == 6">
                                        <el-input
                                            v-model="domain.reply.reply"
                                            type="textarea"
                                            style="font-size:18px;font-family:'Microsoft YaHei'"
                                            disabled
                                        >
                                            {{ domain.reply.reply }}
                                        </el-input>
                                    </li>
                                </div>
                            </ul>
                            <!-- todo  <el-input class="comment"
                            style="width: 20%;background-color:green;
                            margin-left:10%" type="textarea"
                                        :disabled="true"
                                        v-show="domain.correctComment"
                                        v-model="domain.correctComment">
                              </el-input>
                              <el-input class="comment" style="width: 20%;
                              background-color:red;"
                              type="textarea" :disabled="true"
                                        v-show="domain.wrongComment"
                                        v-model="domain.wrongComment">
                              </el-input>-->
                            <el-input
                                v-show="domain.generalComment"
                                v-model="domain.generalComment"
                                class="comment"
                                type="textarea"
                                :disabled="true"
                                style="width: 50%"
                            />
                        </div>
                    </div>
                    <div v-if="displayError == 4">
                        <!--:key="domain.id+1"-->
                        <!--<p class="attemptNumber">{{attemptIndex}}</p>-->
                        <!--<p class="attemptNumber">Score {{CurrentScore}}</p>-->
                        <!--<p class="attemptNumber">Points {{quizInfoGetList.totalScore/100}}</p>-->
                        <div
                            v-for="(domain, indexp) in showQuizQuestionRecord"
                            :key="indexp"
                            class="quizzes-question"
                            :class="{ error: domain.error }"
                        >
                            <img
                                v-if="
                                    domain.error &&
                                        domain.error.type == 'unanswer'
                                "
                                src="../../../../../static/images/UnAnswered.png"
                                alt=""
                            />
                            <img
                                v-if="
                                    domain.error && domain.error.type == 'error'
                                "
                                src="../../../../../static/images/Incorrect.png"
                                alt=""
                            />
                            <img
                                v-show="domain.type != 6"
                                v-if="!domain.error"
                                src="../../../../../static/images/correct.png"
                                alt=""
                            />
                            <h5>{{ domain.title }} {{ indexp + 1 }}</h5>
                            <span
                                >{{ domain.score / 100
                                }}{{ $t("message.pts") }}</span
                            >
                            <ul>
                                <!--eslint-disable-->
                                <div
                                    class="submitMatter"
                                    v-html="domain.content"
                                ></div>
                                <!--eslint-disable no-new-->
                                <div
                                    v-for="(item, indexa) in domain.options"
                                    :key="indexa"
                                >
                                    <li v-show="domain.type == 1">
                                        <el-radio
                                            :value="1"
                                            :label="item.isChoice"
                                            readonly
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </li>
                                    <li v-show="domain.type == 2">
                                        <el-checkbox
                                            v-model="item.isChoice"
                                            :true-label="1"
                                            disabled
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-checkbox>
                                    </li>
                                    <li v-show="domain.type == 3">
                                        <el-radio
                                            :value="1"
                                            :label="item.isChoice"
                                            readonly
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </li>
                                    <li v-if="domain.type == 6">
                                        <el-input
                                            v-model="domain.reply.reply"
                                            type="textarea"
                                            style="font-size:18px;font-family:'Microsoft YaHei'"
                                            disabled
                                        >
                                            {{ domain.reply.reply }}
                                        </el-input>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <v-goTop />
                </div>
            </div>
            <div class="quizzesPublish-right">
                <div>
                    <div>
                        <h4
                            v-if="quizInfoGetList.attemptNumber < 2"
                            style="display: inline-block;padding: 4% 0"
                        >
                            {{ $t("message.Submission_Details") }}:
                        </h4>
                        <h4
                            v-else-if="quizInfoGetList.attemptNumber"
                            style="display: inline-block;padding: 4% 0"
                        >
                            {{ $t("message.Last_Attempt_Details") }}:
                        </h4>
                    </div>
                    <!--<div v-else="quizInfoGetList.attemptNumber">

                    </div>-->
                    <div class="submissionDtails">
                        <ul>
                            <li
                                v-for="(timelimit, indexf) in quizRecordlist"
                                v-show="indexf === 0"
                                :key="indexf"
                            >
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Time") }}:
                                </p>
                                <span>{{ timelimit.afterMin }}</span>
                                <span>{{ $t("message.minutes") }}</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Current_Score") }}:
                                </p>
                                <span>{{
                                    lastAttempt.currentScore / 100
                                }}</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Kept_Score") }}:
                                </p>
                                <span>{{ lastAttempt.gradeScore / 100 }}</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Attempts_Available") }}:
                                </p>
                                <span>{{ lastAttempt.attempsAvailable }}</span>
                            </li>
                            <li>
                                <span
                                    v-show="lastAttempt.isGraded == 0"
                                    class="some"
                                    >{{
                                        $t("message.Some_subjective_questions")
                                    }}</span
                                >
                            </li>
                            <!--<li>-->
                            <!--<h4>{{lastAttempt.attemps}} Attempts So far</h4>-->
                            <!--<p class="preview"
                            v-if="studentShowQuizz==1"
                            @click="startedQuizzes">{
                            {$t('message.Preview_thie_Quiz_Agains')}}</p>-->
                            <!--</li>-->
                            <li>
                                <!--<h4>66 More Attempts available</h4>-->
                                <p
                                    v-if="studentShowQuizz == 1"
                                    class="preview"
                                    @click="startedQuizzes"
                                >
                                    {{ $t("message.Take_the_Quiz_Agains") }}
                                </p>
                                <p v-show="lastAttempt.scoreType == 1">
                                    {{ $t("message.will_keep_the_highest") }}
                                </p>
                                <p v-show="lastAttempt.scoreType == 2">
                                    {{ $t("message.will_keep_the_latest") }}
                                </p>
                                <p v-show="lastAttempt.scoreType == 3">
                                    {{ $t("message.will_keep_the_average") }}
                                </p>
                            </li>
                            <!--<li>-->
                            <!--({{$t('message.Will_keep_the_highest_of_all_your_scores')}})-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
/* eslint no-param-reassign: ["error", { "props": false }] */
import { mapGetters } from "vuex";
import goTop from "@/utils/goTop.vue";
// import eventBus from '@/eventBus';
import utilMethods from "@/utils/utilMethods";
import { formatDate } from "@/utils/date";
// import quizeAnswer from "@/utils/quizAnswer"
import TakeQuiz from "@/components/course/quizz/takeQuiz.vue";
import studentnextPrevious from "../../../../utils/studentnextPrevious.vue";

export default {
    filters: {
        formatterDate(val) {
            if (!val) {
                return " ";
            }
            return utilMethods.formatDate(val);
        },
        filters: {
            formatDate(time) {
                const date = new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm:ss");
            }
        }
    },
    components: {
        "v-goTop": goTop,
        TakeQuiz,
        studentnextPrevious
    },
    data() {
        return {
            /** *
             * *测验列表
             * */
            idKept: "",
            attemptIndex: "",
            showCode: false,
            CurrentScore: "",
            gradeScore: "",
            quizkept: "",
            data: this.$route.query.modulesData,
            courseId: this.$route.query.courseId,
            quizDetailId: this.$route.query.quizDetailId,
            accessCode: "",
            practiceQuizList: [],
            showQuizInforList: [],
            gradedQuizList: [],
            surveyList: [],
            mondifyTestProblem: true,
            TeacherQuizList: true,
            TeachersurveyList: true,
            TeachergradedQuizList: true,
            datas: "",
            time: "",
            callinTime: "",
            quizInfoGetTaba: {},
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
            watchTitle: "",
            quizRecordId: "",
            quizRecordlist: [],
            showQuizQuestionRecord: [],
            studentShowQuizz: "",
            displayError: "",
            lastAttempt: {},
            // isOpen: false,
            fileList: [],
            action: process.env.NODE_ENV,
            value1time: "",
            showQuizzes: false,
            isShow: false,
            isyincang: false,
            xianshi: true,
            quizzesStarted: false,
            moduleSpread: false,
            quizzesSubmit: false,
            takeTheQuizAgain: false,
            takeTheQuizNext: false,
            submitCourse: 1000,
            tabPosition: "left",
            checked: false,
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
    computed: {
        ...mapGetters(["userInfoData"])
    },
    watch: {
        watchTitle(newName, oldName) {
            console.log((newName, oldName));
            const param = {
                courseId: this.courseId,
                pageSize: 1000
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quiz/pageList`, { params: param })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.practiceQuizList = [];
                        this.gradedQuizList = [];
                        this.surveyList = [];
                        this.showQuizInforList = res.data.entity.list;
                        this.showQuizInforList.forEach(e => {
                            if (Number(e.type) === 1) {
                                this.practiceQuizList.push(e);
                            } else if (Number(e.type) === 2) {
                                this.gradedQuizList.push(e);
                            } else if (Number(e.type) === 3) {
                                this.surveyList.push(e);
                            }
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.quizScoreRecord();
        this.HistoryQuery();
        this.showQuize();
    },
    methods: {
        startedQuizzesNext() {
            this.isyincang = false;
            this.xianshi = false;
            this.quizzesStarted = true;
            this.quizzesSubmit = false;
            this.takeTheQuizNext = true;
            this.takeTheQuizAgain = false;
        },

        removeDomain(item) {
            const index = this.dynamicValidateForm.domains.indexOf(item);
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
            const index = this.editDynamicValidateForm.domains.indexOf(item);
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
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        quizInforList() {
            const param = {
                courseId: this.courseId,
                pageSize: 1000
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quiz/pageList`, { params: param })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.practiceQuizList = [];
                        this.gradedQuizList = [];
                        this.surveyList = [];
                        this.showQuizInforList = res.data.entity.list;
                        this.showQuizInforList.forEach(e => {
                            if (Number(e.type) === 1) {
                                this.practiceQuizList.push(e);
                            } else if (Number(e.type) === 2) {
                                this.gradedQuizList.push(e);
                            } else if (Number(e.type) === 3) {
                                this.surveyList.push(e);
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
            // this.t;
            clearTimeout(that.t);
            this.t = setTimeout(() => {
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
                            if (Number(e.type) === 1) {
                                that.practiceQuizList.push(e);
                            } else if (Number(e.type) === 2) {
                                that.gradedQuizList.push(e);
                            } else if (Number(e.type) === 3) {
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

        showQuize() {
            const param = {
                data: this.quizDetailId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/get`, { params: param })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.datas = res.data.entity.id;
                        this.isyincang = false;
                        this.xianshi = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGetList = res.data.entity;
                        const timeDiff =
                            +new Date() - res.data.entity.serverTime;
                        this.quizInfoGetList.timeDiff = isNaN(timeDiff)
                            ? 0
                            : timeDiff;
                        this.quizItemOpen();
                        // this.minutes=res.data.entity.limitTime;
                        this.quizInfoGetTaba = res.data.entity.assignUsers;
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
                        for (
                            let i = 0;
                            i < this.quizInfoGetTaba.length;
                            i += 1
                        ) {
                            const tempItem = this.quizInfoGetTaba[i];
                            tempItem.limitTime =
                                Number(tempItem.limitTime.length) === 0
                                    ? ""
                                    : formatDate(
                                          new Date(tempItem.limitTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                            tempItem.startTime =
                                Number(tempItem.startTime.length) === 0
                                    ? ""
                                    : formatDate(
                                          new Date(tempItem.startTime),
                                          "yyyy-MM-dd hh:mm:ss"
                                      );
                            tempItem.endTime =
                                Number(tempItem.endTime.length) === 0
                                    ? ""
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

        /**
         * 点击测验题触发，查看学生能否答题
         * */
        quizItemOpen() {
            const studentRights = {
                id: this.datas,
                accessCode: this.accessCode
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/quizItem/open/edit`,
                    studentRights
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
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
         * 点击访问码按钮触发，查看学生能否答题
         * */
        showquizItem() {
            const studentRights = {
                id: this.datas,
                accessCode: this.accessCode
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/quizItem/open/edit`,
                    studentRights
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.studentShowQuizz = res.data.message;
                        this.showCode = true;
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
         * */
        startedQuizzes() {
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
                    if (Number(res.data.code) === 200) {
                        this.quizRecordId = res.data.message;
                        this.isyincang = false;
                        this.xianshi = false;
                        this.quizzesStarted = true;
                        this.quizzesSubmit = false;
                        this.takeTheQuizNext = false;
                        this.takeTheQuizAgain = true;
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
         * */
        // /**
        //  * 点击预览按钮触发，展示每一道题
        //  * 测验问题项列表
        //  **/
        // quizItem() {
        //   let param = {
        //     quizRecordId: this.quizRecordId,
        //   };
        //   this.$http.get(`${process.env.NODE_ENV}/quizQuestionTestRecord/list`, {params: param})
        //     .then((res) => {
        //       if (Number(res.data.code) === 200) {
        //         quizeAnswer.quizQuestionRecordList = res.data.entity
        //         this.quizItemList = res.data.entity;
        //
        //         for (let i = 0; i < this.quizItemList.length; i++) {
        //           this.quizItemList[i].isAnswer = false;
        //           if (this.quizItemList[i].type == 2) {
        //             this.$set(this.quizItemList[i], 'selectVal', [])
        //           } else {
        //             this.$set(this.quizItemList[i], 'selectVal', '')
        //           }
        //         }
        //         // console.log('ererre', this.quizItemList)
        //       } else {
        //         this.$message.error(res.data.message);
        //       }
        //     }).catch((err) => {
        //     console.log(err);
        //   })
        // },

        /**
         * 答题历史记录 表格
         * * */
        HistoryQuery() {
            const param = {
                quizId: this.quizDetailId
            };
            const that = this;
            clearTimeout(that.t);
            this.t = setTimeout(() => {
                that.$http
                    .get(`${process.env.NODE_ENV}/quizRecord/list`, {
                        params: param
                    })
                    .then(res => {
                        if (Number(res.data.code) === 200) {
                            this.quizRecordlist = res.data.entity;
                            // this.attemptIndex = res.data.entity.length;
                            // let idArray=[];
                            const { length } = this.quizRecordlist;
                            this.quizRecordlist.forEach((s, index) => {
                                s.name = `attempt ${length - index}`;
                                if (s.grade && s.grade.gradeScore) {
                                    s.grade.gradeScore =
                                        Number(s.grade.gradeScore) / 100;
                                } else {
                                    s.grade = {};
                                    s.grade.gradeScore = 0;
                                }

                                if (s.id === this.quizkept) {
                                    s.idKept = this.$t("message.Kept");
                                } else {
                                    s.idKept = "";
                                }
                            });

                            // if(idArray.indexOf(this.quizkept) >= 0){
                            //   this.idKept = 'Kept';
                            // }else{
                            //   this.idKept = '';
                            // }
                            // console.log('pop', this.quizRecordlist)
                            this.quizRecordlist = this.quizRecordlist.map(
                                el => {
                                    let tempEl = Object.assign({}, el);
                                    if (Number(tempEl.assignType) === 1) {
                                        tempEl.typeName = "Everyone";
                                    } else if (
                                        Number(tempEl.assignType) === 2
                                    ) {
                                        tempEl.typeName = "Class";
                                    } else if (
                                        Number(tempEl.assignType) === 3
                                    ) {
                                        tempEl.typeName = "Student";
                                    }
                                    const tempObj = {
                                        dueTime: "",
                                        submitTime: "",
                                        startTime: ""
                                    };
                                    tempEl = Object.assign(tempObj, tempEl);
                                    return tempEl;
                                }
                            );
                            for (
                                let i = 0;
                                i < this.quizRecordlist.length;
                                i += 1
                            ) {
                                const tempItem = this.quizRecordlist[i];
                                tempItem.dueTime =
                                    Number(tempItem.dueTime.length) === 0
                                        ? ""
                                        : formatDate(
                                              new Date(tempItem.dueTime),
                                              "yyyy-MM-dd hh:mm:ss"
                                          );
                                // tempItem.startTime = tempItem.startTime.length == 0 ?
                                // '— —' : formatDate(new Date(tempItem.startTime), 'yyyy-MM-dd hh:mm:ss');
                                tempItem.submitTime =
                                    Number(tempItem.submitTime.length) === 0
                                        ? ""
                                        : formatDate(
                                              new Date(tempItem.submitTime),
                                              "yyyy-MM-dd hh:mm:ss"
                                          );
                                // tempItem.updateTime = tempItem.updateTime.length == 0 ?
                                // '— —' : formatDate(new Date(tempItem.updateTime), 'yyyy-MM-dd hh:mm:ss');
                                // tempItem.createTime = tempItem.createTime.length == 0 ?
                                // '— —' : formatDate(new Date(tempItem.createTime), 'yyyy-MM-dd hh:mm:ss');
                                //  console.log('tempItem', tempItem, tempItem.updateTime)
                                const s1 = tempItem.updateTime;
                                const s2 = tempItem.createTime;
                                const total = (s1 - s2) / 1000;
                                tempItem.afterMin = total / 60;
                                tempItem.afterMin = tempItem.afterMin.toFixed(
                                    2
                                );
                            }
                            /* this.quizItemOpen(this.datas); */
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 500);
        },
        /**
         * 显示正误
         * * */
        goReply(record) {
            if (!record) {
                // 提交测试后，显示最近一次提交
                this.attemptIndex = this.$t("message.Last_Attempt");
                this.CurrentScore = this.lastAttempt.currentScore / 100;
            } else {
                this.attemptIndex = record.name;
                this.CurrentScore = record.grade.gradeScore;
                // this.quizRecordId = String(record.id);
            }

            const studentRights = {
                id: this.datas
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/quizItem/show/edit`,
                    studentRights
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.displayError = res.data.message;
                        this.isyincang = false;
                        this.xianshi = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = true;
                        this.showquizItem();
                        this.HistoryQuery();
                        this.quizItemOpen();
                        this.everyoneQuizzes(String(record.id));
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        quizScoreRecord() {
            const param = {
                data: this.quizDetailId
            };
            return this.$http
                .get(`${process.env.NODE_ENV}/quizScoreRecord/get`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.lastAttempt = res.data.entity;
                        this.quizkept = res.data.entity.recordId;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         *测验答题记录修改
         *Submit-modify提交
         * * */
        submitQuizzes() {
            this.everyoneQuizzes(this.quizRecordId);
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
                    if (Number(res.data.code) === 200) {
                        this.xianshi = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = true;
                        this.HistoryQuery();
                        this.quizItemOpen();
                        this.quizScoreRecord().then(() => {
                            this.goReply();
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
         *测验答题
         *答题后展示
         * * */
        everyoneQuizzes(quizRecordId) {
            const param = {
                quizRecordId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizQuestionRecord/list`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.showQuizQuestionRecord = res.data.entity;

                        this.showQuizQuestionRecord.forEach(r => {
                            let hasAnswer = false;
                            if (
                                Number(r.type) === 6 &&
                                (!r.reply || r.reply.reply === "")
                            ) {
                                if (r.error) {
                                    return r.type === "unanswer";
                                }
                                // return r.error = {
                                //     type: 'unanswer',
                                // };
                            }
                            hasAnswer = true;

                            r.options.forEach(opt => {
                                if (opt.isChoice) hasAnswer = true;

                                if (
                                    (!opt.isChoice && opt.isCorrect) ||
                                    (opt.isChoice && !opt.isCorrect)
                                ) {
                                    r.error = {
                                        type: "error"
                                    };
                                }
                                hasAnswer = !r.options.every(
                                    el => Number(el.isChoice) === 0
                                );
                            });
                            if (!hasAnswer) {
                                r.error = {
                                    type: "unanswer"
                                };
                            }
                            return false;
                        });
                        console.log(
                            this.showQuizQuestionRecord.map(i => i.error)
                        );
                        this.QDeletes();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        },
        transfHtml(str) {
            if (str) {
                const dd = str.replace(/<\/?.+?>/g, "");
                let dds = dd;
                dds = dds.replace(/&nbsp;/, " ");
                return dds;
            }
            return false;
        }
    }
};
/*eslint-disable*/
</script>

<style scoped>
@import "./studentQuizzss.css";
</style>
