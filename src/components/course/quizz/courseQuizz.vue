<template>
    <div>
        <!--eslint-disable-->
        <div v-show="quizzesPublish">
            <div class="quizzesPublish-left">
                <div>
                    <div
                        style="float: right;padding-top: 4px;cursor: pointer;padding-right: 1%"
                    >
                        <el-row class="block-col-2">
                            <el-col :span="12">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
                                        <i
                                            class="iconfont icon-spread-big more_icon"
                                        ></i>
                                        <!--<img-->
                                        <!--src="../../../../static/images/spread-big.png"-->
                                        <!--alt=""-->
                                        <!--style="vertical-align: baseline"-->
                                        <!--/>-->
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <!--<el-dropdown-item>-->
                                        <!--<img src="../../../../static/images/Lock.png" alt="">-->
                                        <!--Lock this Quiz Now-->
                                        <!--</el-dropdown-item>-->
                                        <el-dropdown-item
                                            @click.native="quizeDeletes"
                                        >
                                            <!--<img src="../../../../static/images/delete.png" alt="">-->
                                            <i
                                                class="iconfont icon-delete i_edit_style"
                                            >
                                                <span class="written">{{
                                                    $t("message.Delete")
                                                }}</span>
                                            </i>
                                        </el-dropdown-item>
                                        <!--<el-dropdown-item>-->
                                        <!--<img src="../../../../static/images/share.png" alt="">-->
                                        <!--Share to Commons-->
                                        <!--</el-dropdown-item>-->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </div>

                    <el-button
                        style="float: right;margin: 0 2%"
                        @click="showQuize(quizInfoGetList.title)"
                    >
                        <i class="iconfont icon-edit quize_icon">
                            {{ $t("message.Edit") }}</i
                        >
                    </el-button>
                    <el-button
                        style="float: right;margin-left: 20px"
                        @click="startedQuizzes"
                    >
                        {{ $t("message.Preview") }}
                    </el-button>
                    <el-button
                        v-show="!quizInfoGetList.status"
                        type="info"
                        style="float: right;"
                        @click="quizzStatus(1)"
                    >
                        <i class="iconfont icon-Group- quize_icon">
                            {{ $t("message.Unpublished") }}</i
                        >
                    </el-button>
                    <el-button
                        v-show="quizInfoGetList.status"
                        type="success"
                        style="float: right"
                        @click="quizzStatus(0)"
                    >
                        <i class="iconfont icon-duigou quize_icon">
                            {{ $t("message.Published") }}</i
                        >
                    </el-button>
                </div>
                <div class="quizzesPreview">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="quizInfoGetList.title"
                        placement="top"
                    >
                        <h4 class="titleHeadline">
                            {{ quizInfoGetList.title }}
                        </h4>
                    </el-tooltip>
                    <div class="quizzes-info">
                        <p
                            v-show="quizInfoGetList.description"
                            class="descriptionFold"
                            @click="richTextClick($event)"
                            v-html="quizInfoGetList.description"
                        />
                        <div class="quizInfo">
                            <ul style="text-align: center">
                                <li>
                                    <h5>{{ $t("message.Quiz_Type") }}</h5>
                                    <!--<span>{{quizInfoGetList.type}}</span>-->
                                    <span v-if="quizInfoGetList.type == '1'">{{
                                        $t("message.Practice_Quiz")
                                    }}</span>
                                    <span v-if="quizInfoGetList.type == '2'"
                                        >{{ $t("message.Graded_Quiz") }}
                                    </span>
                                    <span v-if="quizInfoGetList.type == '3'"
                                        >{{ $t("message.Graded_survey") }}
                                    </span>
                                    <span v-if="quizInfoGetList.type == '4'"
                                        >{{ $t("message.Ungraded_survey") }}
                                    </span>
                                </li>
                                <li v-show="quizInfoGetList.totalScore">
                                    <h5>{{ $t("message.Points") }}</h5>
                                    <span>{{
                                        quizInfoGetList.totalScore / 100
                                    }}</span>
                                </li>
                                <li v-show="quizInfoGetList.timeLimit">
                                    <h5>{{ $t("message.Time_Limit") }}</h5>
                                    <span>{{ quizInfoGetList.timeLimit }}</span>
                                    <!--<span> {{quizInfoGetList.createTime | formatDate(time)}}</span>-->
                                </li>
                                <li v-if="quizInfoGetList.allowMultiAttempt">
                                    <h5>
                                        {{ $t("message.Multiple_Attempts") }}
                                    </h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.allowMultiAttempt ==
                                                '1'
                                        "
                                        >{{ $t("message.Yes") }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.allowMultiAttempt ==
                                                '0'
                                        "
                                        >{{ $t("message.No") }}
                                    </span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.View_Responses") }}</h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '0'
                                        "
                                        ><!--不显示-->{{
                                            $t("message.No")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '1'
                                        "
                                        ><!--每次提交后-->{{
                                            $t("message.After_each_submission")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '2'
                                        "
                                        ><!---->{{
                                            $t("message.Last_submission")
                                        }}</span
                                    >
                                </li>
                                <li>
                                    <h5>
                                        {{ $t("message.Show_Correct_Answers") }}
                                    </h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showAnswerStrategy ==
                                                '0'
                                        "
                                        ><!--不显示-->{{
                                            $t("message.No")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showAnswerStrategy ==
                                                '1'
                                        "
                                        ><!--显示-->{{
                                            $t("message.Yes")
                                        }}</span
                                    >
                                </li>
                                <li>
                                    <h5>
                                        {{
                                            $t("message.One_Question_at_a_Time")
                                        }}
                                    </h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showQuestionStrategy ==
                                                '0'
                                        "
                                        ><!--全部显示-->{{
                                            $t("message.Show_all")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showQuestionStrategy ==
                                                '1'
                                        "
                                        ><!--每页一个-->{{
                                            $t("message.One_per_page")
                                        }}</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div>
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column
                                    :label="$t('message.Due')"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            scope.row.limitTime | formatterDate
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('message.For')"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            idToName(scope.row, sections, users)
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                    :label="$t('message.Available_from')"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            scope.row.startTime | formatterDate
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                    :label="$t('message.Until')"
                                >
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | formatterDate }}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div
                        style="text-align: center;padding: 0 2% 2%;border-bottom: 1px solid #ccc"
                    >
                        <el-button
                            style="background-color: #0138b1;color: #fff"
                            @click="startedQuizzes"
                        >
                            {{ $t("message.Preview") }}
                        </el-button>
                    </div>
                    <v-goTop />
                </div>
                <div v-if="this.data">
                    <nextPrevious :data="data" :course-id="courseId" />
                </div>
            </div>
            <div class="quizzesPublish-right">
                <div>
                    <p>{{ $t("message.Related_items") }}</p>
                    <!--<div class="importIntoCourse">
            <el-button plain class="quizzes-right">
              <img src="../../../../static/images/shezhi.png" alt="">
              {{$t('message.Moderate_This_Quiz')}}
            </el-button>
          </div>
          <div class="importIntoCourse">
            <el-button class="quizzes-right" style="color: #00eb00;border: 1px solid #00eb00;">
              <img src="../../../../static/images/UPLOAD.png" alt="">
              {{$t('message.Download_All_Files')}}
            </el-button>
          </div>-->
                    <div
                        v-show="quizInfoGetList.type == 1"
                        class="importIntoCourse"
                    >
                        <el-button
                            plain
                            class="quizzes-right"
                            disabled="disabled"
                            @click="
                                GradeNow(
                                    quizInfoGetList.title,
                                    quizInfoGetList.totalScore
                                )
                            "
                        >
                            <!--<img src="../../../../static/images/jifen.png" alt="">-->
                            <i
                                class="iconfont icon-a geade"
                                style="font-size: 20px"
                            >
                                <span
                                    style="vertical-align: 2px;padding-left: 20px;font-size: 14px"
                                    >{{ $t("message.GradeNow") }}</span
                                >
                                <!--<span style="vertical-align: 2px;padding-left: 20px;font-size: 14px">SpeedGrade</span>-->
                            </i>
                        </el-button>
                    </div>
                    <div
                        v-show="quizInfoGetList.type == 2"
                        class="importIntoCourse"
                    >
                        <el-button
                            plain
                            class="quizzes-right"
                            :disabled="this.gradeNowShow < 1"
                            @click="
                                GradeNow(
                                    quizInfoGetList.title,
                                    quizInfoGetList.totalScore
                                )
                            "
                        >
                            <!--<img src="../../../../static/images/jifen.png" alt="">-->
                            <i
                                class="iconfont icon-a geade"
                                style="font-size: 20px"
                            >
                                <span
                                    style="vertical-align: 2px;padding-left: 20px;font-size: 14px"
                                    >{{ $t("message.GradeNow") }}</span
                                >
                                <!--<span style="vertical-align: 2px;padding-left: 20px;font-size: 14px">SpeedGrade</span>-->
                            </i>
                            <!--立即评分-->
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="quizzesStarted">
            <take-quiz
                v-if="quizRecordId"
                is-preview
                :record-id="quizRecordId"
                :quiz="quizInfoGetList"
                @submitRecord="submitQuizzes"
            >
                <el-button
                    plain
                    @click.native="showQuize(quizInfoGetList.title)"
                >
                    <i class="iconfont icon-edit">
                        {{ $t("message.Keep_Editing_This_Quiz") }}</i
                    >
                </el-button>
            </take-quiz>
        </div>

        <div v-show="quizzesSubmit">
            <div class="quizzesPublish-left">
                <div>
                    <div
                        style="float: right;padding-top: 4px;cursor: pointer;padding-right: 1%"
                    >
                        <el-row class="block-col-2">
                            <el-col :span="12">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
                                        <i
                                            class="iconfont icon-more_ more_icon"
                                        ></i>
                                        <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <!--<el-dropdown-item>-->
                                        <!--<img src="../../../../static/images/Lock.png" alt="">-->
                                        <!--Lock this Quiz Now-->
                                        <!--</el-dropdown-item>-->
                                        <el-dropdown-item
                                            @click.native="quizeDeletes"
                                        >
                                            <i
                                                class="iconfont icon-delete i_edit_style"
                                            >
                                                <span class="written">{{
                                                    $t("message.Delete")
                                                }}</span>
                                            </i>
                                        </el-dropdown-item>
                                        <!--<el-dropdown-item>-->
                                        <!--<img src="../../../../static/images/share.png" alt="">-->
                                        <!--Share to Commons-->
                                        <!--</el-dropdown-item>-->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </div>
                    <!--<img src="../../../../static/images/spread-big.png" alt=""
               style="float: right;padding-top: 4px;cursor: pointer">-->
                    <!--<el-button icon="el-icon-edit" style="float: right;margin: 0 2%"
          @click="showQuize(quizInfoGetList.title)">{{$t('message.Edit')}}-->
                    <!--</el-button>-->
                    <el-button
                        style="float: right;margin: 0 2%"
                        @click="showQuize(quizInfoGetList.title)"
                    >
                        <i class="iconfont icon-edit quize_icon">
                            {{ $t("message.Edit") }}</i
                        >
                    </el-button>
                    <el-button
                        style="float: right;margin-left: 20px"
                        @click="startedQuizzes"
                    >
                        {{ $t("message.Preview") }}
                    </el-button>
                    <el-button
                        v-show="!quizInfoGetList.status"
                        type="info"
                        style="float: right;"
                        @click="quizzStatus(1)"
                    >
                        <i class="iconfont icon-Group- quize_icon">
                            {{ $t("message.Unpublished") }}</i
                        >
                    </el-button>
                    <el-button
                        v-show="quizInfoGetList.status"
                        type="success"
                        style="float: right"
                        @click="quizzStatus(0)"
                    >
                        <i class="iconfont icon-duigou quize_icon">
                            {{ $t("message.Published") }}</i
                        >
                    </el-button>
                </div>
                <div class="quizzesPreviewSubmit">
                    <div class="caution">
                        <!--警示-->
                        <img
                            src="../../../../static/images/jingshi.png"
                            alt=""
                        />
                        {{ $t("message.this_is_a_preview_of") }}
                    </div>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="quizInfoGetList.title"
                        placement="top"
                    >
                        <h4 class="titleHeadline">
                            {{ quizInfoGetList.title }}
                        </h4>
                    </el-tooltip>
                    <div class="quizzes-info">
                        <p
                            v-show="quizInfoGetList.description"
                            class="descriptionFold"
                            @click="richTextClick($event)"
                            v-html="quizInfoGetList.description"
                        />
                        <div class="quizInfo">
                            <ul style="text-align: center">
                                <li>
                                    <h5>{{ $t("message.Quiz_Type") }}</h5>
                                    <span v-if="quizInfoGetList.type == '1'">{{
                                        $t("message.Practice_Quiz")
                                    }}</span>
                                    <span v-if="quizInfoGetList.type == '2'"
                                        >{{ $t("message.Graded_Quiz") }}
                                    </span>
                                    <span v-if="quizInfoGetList.type == '3'"
                                        >{{ $t("message.Graded_survey") }}
                                    </span>
                                    <span v-if="quizInfoGetList.type == '4'"
                                        >{{ $t("message.Ungraded_survey") }}
                                    </span>
                                </li>
                                <li v-show="quizInfoGetList.totalScore">
                                    <h5>{{ $t("message.Points") }}</h5>
                                    <span>{{
                                        quizInfoGetList.totalScore / 100
                                    }}</span>
                                </li>
                                <li v-show="quizInfoGetList.timeLimit">
                                    <h5>{{ $t("message.Time_Limit") }}</h5>
                                    <span>
                                        {{ quizInfoGetList.timeLimit }}</span
                                    >
                                </li>
                                <li>
                                    <h5>
                                        {{ $t("message.Multiple_Attempts") }}
                                    </h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.allowMultiAttempt ==
                                                '1'
                                        "
                                        >{{ $t("message.Yes") }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.allowMultiAttempt ==
                                                '0'
                                        "
                                        >{{ $t("message.No") }}
                                    </span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.View_Responses") }}</h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '0'
                                        "
                                        ><!--不显示-->{{
                                            $t("message.No")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '1'
                                        "
                                        ><!--每次提交后-->{{
                                            $t("message.After_each_submission")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '2'
                                        "
                                        ><!---->{{
                                            $t("message.Last_submission")
                                        }}</span
                                    >
                                </li>
                                <li>
                                    <h5>
                                        {{ $t("message.Show_Correct_Answers") }}
                                    </h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showAnswerStrategy ==
                                                '0'
                                        "
                                        ><!--不显示-->{{
                                            $t("message.No")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showAnswerStrategy ==
                                                '1'
                                        "
                                        ><!--每次提交后-->{{
                                            $t("message.Yes")
                                        }}</span
                                    >
                                </li>
                                <li>
                                    <h5>
                                        {{
                                            $t("message.One_Question_at_a_Time")
                                        }}
                                    </h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showQuestionStrategy ==
                                                '0'
                                        "
                                        ><!--全部显示-->{{
                                            $t("message.Show_all")
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showQuestionStrategy ==
                                                '1'
                                        "
                                        ><!--每页一个-->{{
                                            $t("message.One_per_page")
                                        }}</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div>
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column
                                    :label="$t('message.Due')"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            scope.row.limitTime | formatterDate
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('message.For')"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            idToName(scope.row, sections, users)
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                    :label="$t('message.Available_from')"
                                >
                                    <template slot-scope="scope">
                                        {{
                                            scope.row.startTime | formatterDate
                                        }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                    :label="$t('message.Until')"
                                >
                                    <template slot-scope="scope">
                                        {{ scope.row.endTime | formatterDate }}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="quizze_preview">
                        <el-button
                            style="background-color: #0138b1;color: #fff"
                            @click="startedQuizzes"
                        >
                            {{ $t("message.Preview") }}
                        </el-button>
                    </div>
                    <div class="quizzes-score">
                        <!--<ul>-->
                        <!--<li>{{$t('message.Score_for_this_quiz')}} : <span>1 out of 10*</span></li>-->
                        <!--<li>{{$t('message.submitted_Dec')}} {{lastAttempt.attemps}}</li>-->
                        <!--<li>This attempt took 12 minutes</li>-->
                        <!--</ul>-->
                    </div>
                    <div>
                        <div
                            v-if="
                                quizInfoGetList.showAnswerStrategy == '1' &&
                                    quizInfoGetList.showReplyStrategy == '2'
                            "
                            class="quizzes-question"
                        >
                            <div
                                v-for="(domain,
                                index) in showQuizQuestionRecord"
                                class="quizzes-question"
                            >
                                <h5>{{ domain.title }} {{ index + 1 }}</h5>
                                <span
                                    >{{ domain.score / 100
                                    }}{{ $t("message.pts") }}</span
                                >
                                <ul>
                                    <div
                                        class="submitMatter"
                                        v-html="domain.content"
                                    />
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 1"
                                    >
                                        <!--<img v-show="item.isChoice == 0" src="../../../../../static/images/UnAnswered.png" alt="">-->
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <!--<img-->
                                        <!--v-show="-->
                                        <!--item.isCorrect == 1 &&-->
                                        <!--item.isChoice == 1-->
                                        <!--"-->
                                        <!--src="../../../../static/images/correct.png"-->
                                        <!--alt=""-->
                                        <!--/>-->
                                        <div
                                            class="ziti"
                                            v-if="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                        >
                                            <div class="correct">
                                                <span class="font_color"
                                                    >correct!</span
                                                >
                                            </div>
                                            <div class="font_correct"></div>
                                        </div>
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../static/images/correctanswer.png"
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
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 2"
                                    >
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../static/images/correctanswer.png"
                                            alt=""
                                        />
                                        <!--<img-->
                                        <!--v-show="-->
                                        <!--item.isCorrect == 1 &&-->
                                        <!--item.isChoice == 1-->
                                        <!--"-->
                                        <!--src="../../../../static/images/correct.png"-->
                                        <!--alt=""-->
                                        <!--/>-->
                                        <div
                                            class="ziti"
                                            v-if="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                        >
                                            <div class="correct">
                                                <span class="font_color"
                                                    >correct!</span
                                                >
                                            </div>
                                            <div class="font_correct"></div>
                                        </div>
                                        <el-checkbox
                                            v-model="item.isChoice"
                                            :true-label="1"
                                            disabled
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-checkbox>
                                    </li>
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 3"
                                    >
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <!--<img-->
                                        <!--v-show="-->
                                        <!--item.isCorrect == 1 &&-->
                                        <!--item.isChoice == 1-->
                                        <!--"-->
                                        <!--src="../../../../static/images/correct.png"-->
                                        <!--alt=""-->
                                        <!--/>-->
                                        <div
                                            class="ziti"
                                            v-if="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                        >
                                            <div class="correct">
                                                <span class="font_color"
                                                    >correct!</span
                                                >
                                            </div>
                                            <div class="font_correct"></div>
                                        </div>
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../static/images/correctanswer.png"
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
                                </ul>
                                <!-- todo  <el-input class="comment" style="width: 20%;
                background-color:green;margin-left:10%" type="textarea"
                            :disabled="true"
                            v-show="domain.correctComment"
                            v-model="domain.correctComment">
                  </el-input>
                  <el-input class="comment" style="width: 20%;background-color:red;"
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
                        <div
                            v-if="
                                quizInfoGetList.showAnswerStrategy == '1' &&
                                    quizInfoGetList.showReplyStrategy == '1'
                            "
                            class="quizzes-question"
                        >
                            <div
                                v-for="(domain,
                                index) in showQuizQuestionRecord"
                                class="quizzes-question"
                            >
                                <!--<img-->
                                <!--v-show="-->
                                <!--domain.error &&-->
                                <!--domain.error.type == 'unanswer'-->
                                <!--"-->
                                <!--src="../../../../static/images/UnAnswered.png"-->
                                <!--alt=""-->
                                <!--/>-->
                                <div
                                    class="ziti"
                                    v-if="
                                        domain.error &&
                                            domain.error.type == 'unanswer'
                                    "
                                >
                                    <div class="UnAnswered">
                                        <span class="font_color"
                                            >UnAnswered</span
                                        >
                                    </div>
                                    <div class="font_position"></div>
                                </div>
                                <h5>{{ domain.title }} {{ index + 1 }}</h5>
                                <span>{{ domain.score / 100 }}pts</span>
                                <ul>
                                    <div
                                        class="submitMatter"
                                        v-html="domain.content"
                                    />
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 1"
                                    >
                                        <!--<img v-show="item.isChoice == 0" src="../../../../../static/images/UnAnswered.png" alt="">-->
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <!--<img-->
                                        <!--v-show="-->
                                        <!--item.isCorrect == 1 &&-->
                                        <!--item.isChoice == 1-->
                                        <!--"-->
                                        <!--src="../../../../static/images/correct.png"-->
                                        <!--alt=""-->
                                        <!--/>-->
                                        <div
                                            class="ziti"
                                            v-if="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                        >
                                            <div class="correct">
                                                <span class="font_color"
                                                    >correct!</span
                                                >
                                            </div>
                                            <div class="font_correct"></div>
                                        </div>
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../static/images/correctanswer.png"
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
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 2"
                                    >
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../static/images/correctanswer.png"
                                            alt=""
                                        />
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                            src="../../../../static/images/correct.png"
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
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 3"
                                    >
                                        <img
                                            v-show="item.isChoice == 1"
                                            src="../../../../static/images/youranswer.png"
                                            alt=""
                                        />
                                        <!--<img-->
                                        <!--v-show="-->
                                        <!--item.isCorrect == 1 &&-->
                                        <!--item.isChoice == 1-->
                                        <!--"-->
                                        <!--src="../../../../static/images/correct.png"-->
                                        <!--alt=""-->
                                        <!--/>-->
                                        <div
                                            class="ziti"
                                            v-if="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 1
                                            "
                                        >
                                            <div class="correct">
                                                <span class="font_color"
                                                    >correct!</span
                                                >
                                            </div>
                                            <div class="font_correct"></div>
                                        </div>
                                        <img
                                            v-show="
                                                item.isCorrect == 1 &&
                                                    item.isChoice == 0
                                            "
                                            src="../../../../static/images/correctanswer.png"
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
                                </ul>
                                <!-- todo  <el-input class="comment" style="width: 20%;background-color:green;margin-left:10%" type="textarea"
                            :disabled="true"
                            v-show="domain.correctComment"
                            v-model="domain.correctComment">
                  </el-input>
                  <el-input class="comment" style="width: 20%;background-color:red;" type="textarea" :disabled="true"
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
                        <div
                            v-if="
                                quizInfoGetList.showReplyStrategy == '1' &&
                                    quizInfoGetList.showAnswerStrategy == '0'
                            "
                            class="quizzes-question"
                        >
                            <div
                                v-for="(domain,
                                index) in showQuizQuestionRecord"
                                :key="domain.id"
                                class="quizzes-question"
                                :class="{ error: domain.error }"
                            >
                                <div
                                    class="ziti"
                                    v-if="
                                        domain.error &&
                                            domain.error.type == 'unanswer'
                                    "
                                >
                                    <div class="UnAnswered">
                                        <span class="font_color"
                                            >UnAnswered</span
                                        >
                                    </div>
                                    <div class="font_position"></div>
                                </div>
                                <img
                                    v-if="
                                        domain.error &&
                                            domain.error.type == 'error'
                                    "
                                    src="../../../../static/images/Incorrect.png"
                                    alt=""
                                />
                                <!--<img-->
                                <!--v-show="domain.type != 6"-->
                                <!--v-if="!domain.error"-->
                                <!--src="../../../../static/images/correct.png"-->
                                <!--alt=""-->
                                <!--/>-->
                                <div
                                    class="ziti"
                                    v-show="domain.type != 6"
                                    v-if="!domain.error"
                                >
                                    <div class="correct">
                                        <span class="font_color">correct!</span>
                                    </div>
                                    <div class="font_correct"></div>
                                </div>
                                <h5>{{ domain.title }} {{ index + 1 }}</h5>
                                <span>{{ domain.score / 100 }}pts</span>
                                <ul>
                                    <div
                                        class="submitMatter"
                                        v-html="domain.content"
                                    />
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 1"
                                    >
                                        <el-radio
                                            :value="1"
                                            :label="item.isChoice"
                                            readonly
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </li>
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 2"
                                    >
                                        <el-checkbox
                                            v-model="item.isChoice"
                                            :true-label="1"
                                            disabled
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-checkbox>
                                    </li>
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 3"
                                    >
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
                                </ul>
                                <!--<el-input class="comment" style="width: 20%;background-color:green;margin-left:10%" type="textarea"-->
                                <!--:disabled="true"-->
                                <!--v-show="domain.correctComment"-->
                                <!--v-model="domain.correctComment">-->
                                <!--</el-input>-->
                                <!--<el-input class="comment" style="width: 20%;background-color:red;" type="textarea" :disabled="true"-->
                                <!--v-show="domain.wrongComment"-->
                                <!--v-model="domain.wrongComment">-->
                                <!--</el-input>-->
                                <!--<el-input class="comment" type="textarea" :disabled="true"-->
                                <!--v-show="domain.generalComment"-->
                                <!--style="width: 50%" v-model="domain.generalComment">-->
                                <!--</el-input>-->
                            </div>
                        </div>
                        <div
                            v-if="
                                quizInfoGetList.showReplyStrategy == '2' &&
                                    quizInfoGetList.showAnswerStrategy == '0'
                            "
                            class="quizzes-question"
                        >
                            <div
                                v-for="(domain,
                                index) in showQuizQuestionRecord"
                                :key="domain.id"
                                class="quizzes-question"
                                :class="{ error: domain.error }"
                            >
                                <!--<img-->
                                <!--v-if="-->
                                <!--domain.error &&-->
                                <!--domain.error.type == 'unanswer'-->
                                <!--"-->
                                <!--src="../../../../static/images/UnAnswered.png"-->
                                <!--alt=""-->
                                <!--/>-->
                                <div
                                    class="ziti"
                                    v-if="
                                        domain.error &&
                                            domain.error.type == 'unanswer'
                                    "
                                >
                                    <div class="UnAnswered">
                                        <span class="font_color"
                                            >UnAnswered</span
                                        >
                                    </div>
                                    <div class="font_position"></div>
                                </div>

                                <img
                                    v-if="
                                        domain.error &&
                                            domain.error.type == 'error'
                                    "
                                    src="../../../../static/images/Incorrect.png"
                                    alt=""
                                />
                                <!--<img-->
                                <!--v-show="domain.type != 6"-->
                                <!--v-if="!domain.error"-->
                                <!--src="../../../../static/images/correct.png"-->
                                <!--alt=""-->
                                <!--/>-->
                                <div
                                    class="ziti"
                                    v-show="domain.type != 6"
                                    v-if="!domain.error"
                                >
                                    <div class="correct">
                                        <span class="font_color">correct!</span>
                                    </div>
                                    <div class="font_correct"></div>
                                </div>
                                <h5>{{ domain.title }} {{ index + 1 }}</h5>
                                <span>{{ domain.score / 100 }}pts</span>
                                <ul>
                                    <div
                                        class="submitMatter"
                                        v-html="domain.content"
                                    />
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 1"
                                    >
                                        <el-radio
                                            :value="1"
                                            :label="item.isChoice"
                                            readonly
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-radio>
                                    </li>
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 2"
                                    >
                                        <el-checkbox
                                            v-model="item.isChoice"
                                            :true-label="1"
                                            disabled
                                            class="submitMatterred"
                                        >
                                            {{ item.content }}
                                        </el-checkbox>
                                    </li>
                                    <li
                                        v-for="(item, index) in domain.options"
                                        v-show="domain.type == 3"
                                    >
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
                                </ul>
                                <!--<el-input class="comment" style="width: 20%;background-color:green;margin-left:10%" type="textarea"-->
                                <!--:disabled="true"-->
                                <!--v-show="domain.correctComment"-->
                                <!--v-model="domain.correctComment">-->
                                <!--</el-input>-->
                                <!--<el-input class="comment" style="width: 20%;background-color:red;" type="textarea" :disabled="true"-->
                                <!--v-show="domain.wrongComment"-->
                                <!--v-model="domain.wrongComment">-->
                                <!--</el-input>-->
                                <!--<el-input class="comment" type="textarea" :disabled="true"-->
                                <!--v-show="domain.generalComment"-->
                                <!--style="width: 50%" v-model="domain.generalComment">-->
                                <!--</el-input>-->
                            </div>
                        </div>
                    </div>
                    <v-goTop />
                </div>
            </div>
            <div class="quizzesPublish-right">
                <div>
                    <!--todo 产品协商暂时注释 功能待开发-->
                    <!--<p>{{$t('message.Related_items')}}</p>-->
                    <!--<div class="importIntoCourse">-->
                    <!--<el-button style="color: #00eb00;border: 1px solid #00eb00;">-->
                    <!--<img src="../../../../static/images/UPLOAD.png" alt="">-->
                    <!--{{$t('message.Download_All_Files')}}-->
                    <!--</el-button>-->
                    <!--</div>-->
                    <!--<div class="importIntoCourse">-->
                    <!--<el-button plain @click.native="showQuize">-->
                    <!--<img src="../../../../static/images/edit.png" alt="">-->
                    <!--{{$t('message.Keep_Editing_This_Quiz')}}-->
                    <!--</el-button>-->
                    <!--</div>-->
                    <div>
                        <h4 style="display: inline-block;padding: 4% 0">
                            {{ $t("message.Submission_Details") }} :
                        </h4>
                    </div>
                    <div class="submissionDtails">
                        <ul>
                            <li v-show="lastAttempt.timeLimit">
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.time") }}:
                                </p>
                                <span> {{ lastAttempt.timeLimit }}</span>
                                {{ $t("message.minutes") }}
                            </li>
                            <!--<li>-->
                            <!--<p style="width: 50%;display: inline-block">private Integer attemps:</p>-->
                            <!--<span> {{lastAttempt.attemps}}</span>-->
                            <!--</li>-->
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Current_Score") }}:
                                </p>
                                <span>
                                    {{ lastAttempt.currentScore / 100 }}</span
                                >
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Kept_Score") }}:
                                </p>
                                <span> {{ lastAttempt.gradeScore / 100 }}</span>
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
                            <li>
                                <p class="preview" @click="startedQuizzes">
                                    {{ $t("message.Preview_thie_Quiz_Again") }}
                                </p>
                            </li>
                            <li>
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
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>
<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
import eventBus from "@/eventBus";
import goTop from "@/utils/goTop.vue";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import utilMethods from "@/utils/utilMethods";
import quizeAnswer from "@/utils/quizAnswer";
import TakeQuiz from "./takeQuiz";
import nextPrevious from "../../../utils/nextPrevious";

export default {
    filters: {
        formatterDate(val) {
            if (!val) {
                return "-";
            }
            return utilMethods.formatDate(val);
        }
    },
    components: {
        "v-goTop": goTop,
        TakeQuiz,
        nextPrevious
    },
    data() {
        return {
            data: this.$route.query.modulesData,
            courseId: this.$route.query.courseId,
            quizDetailId: this.$route.query.data,
            ispublish: "",
            quizRecordId: "",
            status: "",
            showQuizQuestionRecord: [],
            allowMultiAttempt: "",
            isone: null,
            tableData: [],
            sections: [], // 所有班级
            users: [], // 所有用户
            assign: [
                {
                    assignType: "1",
                    limitTime: "",
                    startTime: "",
                    endTime: ""
                }
            ],
            gradeNowShow: "",
            quizInfoGetTaba: [],
            quizRecordlist: [] /* 历史记录 */,
            // datas: this.$route.query.data,
            quizInfoGetList: [],
            lastAttempt: {},

            showQuizzes: false,
            quizzesPublish: true,
            quizzesStarted: false,
            quizItemList: [],
            quizzesSubmit: false
            // flag:this.$route.query.flag? this.$route.query.flag : ''
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
        this.quizInfoGet();
        this.GradeNowShow();
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    methods: {
        /**
         *点击 save&publish和save触发
         * 测验信息查找
         * * */
        quizInfoGet() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/quizInfor/get?data=${this.quizDetailId}`
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizInfoGetList = res.data.entity;
                        const timeDiff =
                            +new Date() - res.data.entity.serverTime;
                        this.quizInfoGetList.timeDiff = isNaN(timeDiff)
                            ? 0
                            : timeDiff;
                        // this.ispublish =res.data.entity.status;
                        this.courseId = this.quizInfoGetList.courseId;
                        this.ispublish = this.quizInfoGetList.status != 0;
                        // this.minutes=res.data.entity.limitTime;
                        this.quizInfoGetTaba = res.data.entity.assigns;
                        this.isone = res.data.entity.assigns.length;
                        this.getAssignDataList();
                        this.getAssignList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        startedQuizzes() {
            this.quizzesPublish = false;
            this.quizzesStarted = true;
            this.quizzesSubmit = false;
            this.quizRecordAdd();
            this.start(true);
            // this.$router.push({path: "/homePage/allCourse/quizzAnswer", query: {data:this.quizDetailId,courseId:this.courseId}});
        },
        /**
         * 点击预览按钮触发，展示每一道题
         * 测验问题项列表
         * */
        quizItem(key, desc) {
            const param = {
                quizRecordId: this.quizRecordId
            };
            /* this.$http.get(`${process.env.NODE_ENV}/quizQuestionTestRecord/list`, {params: param})
                  .then((res) => {
                    if (res.data.code == 200) {
                      quizeAnswer.quizQuestionRecordList = res.data.entity
                      this.quizItemList = res.data.entity;
                      for (let i = 0; i < this.quizItemList.length; i++) {
                        this.quizItemList[i].isAnswer = false;
                        if (this.quizItemList[i].type == 2) {
                          this.$set(this.quizItemList[i], 'selectVal', [])
                          this.sortSeq();
                        } else {
                          this.$set(this.quizItemList[i], 'selectVal', '')
                          this.sortSeq();
                        }
                      }
                      //console.log('ererre', this.quizItemList )
                    } else {
                      this.$message.error(res.data.message);
                    }
                  }).catch((err) => {
                  console.log(err);
                }) */
        },

        /** *
         *当点击预览按钮，触发此事件，添加一条答题记录
         *测验答题记录添加
         * * */
        quizRecordAdd() {
            const myDate = new Date();
            const quizRecord = {
                quizId: this.quizDetailId,
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
                        // this.quizItem();
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
        quizzStatus(status) {
            if (status == 1) {
                this.ispublish = true;
            } else if (status == 0) {
                this.ispublish = false;
            }
            const quizzes = {
                id: this.quizDetailId,
                status
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/publish/edit`, quizzes)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizInfoGet();
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
                quizId: this.quizDetailId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizRecord/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizRecordlist = res.data.entity;
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
                data: this.quizDetailId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizScoreRecord/get`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.lastAttempt = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showQuize(title) {
            this.$router.push({
                path: "/homePage/allCourse/mondifyQuizz",
                query: {
                    quizDetailId: this.quizDetailId,
                    courseId: this.courseId,
                    name: title
                }
            });
        },
        /**
         *测验答题记录修改
         *Submit-modify提交
         * * */
        submitQuizzes() {
            this.everyoneQuizzes();

            const myDate = new Date();
            const quizRecord = {
                id: this.quizRecordId,
                quizId: this.quizDetailId,
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
                    if (res.data.code === 200) {
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
                if (result.data.code === 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id === res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: this.$t("message.success"),
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
            if (res !== null) {
                const result = await this.$getData(
                    "/quizQuestionRecord/modify",
                    res,
                    "post"
                );
                if (result.data.code === 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id === res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: this.$t("message.success"),
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
            if (res !== null) {
                const result = await this.$getData(
                    "/quizQuestionRecord/modify",
                    res,
                    "post"
                );
                if (result.data.code == 200) {
                    this.quizItemList.forEach(a => {
                        if (a.id === res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: this.$t("message.success"),
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
                        if (a.id === res.id) a.isAnswer = true;
                    });
                    this.$message({
                        message: this.$t("message.success"),
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
                    if (res.data.code === 200) {
                        this.showQuizQuestionRecord = res.data.entity;

                        this.showQuizQuestionRecord.forEach(r => {
                            let hasAnswer = false;
                            if (
                                r.type === 6 &&
                                (!r.reply || r.reply.reply === "")
                            ) {
                                return (r.error = {
                                    type: "unanswer"
                                });
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
                                    el => el.isChoice === 0
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
        quizeDeletes() {
            const ids = [];
            ids.push(this.quizDetailId);
            this.$confirm(this.$t("message.delete_quiz"), "", {
                confirmButtonText: this.$t("message.Yes"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(`${process.env.NODE_ENV}/quiz/deletes`, ids)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    message: this.$t(
                                        "message.Delete_succeeded"
                                    ),
                                    type: "success"
                                });
                                this.$router.push({
                                    path: "quizzList",
                                    query: { courseId: this.courseId }
                                });
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        /**
         * 分配
         * * */
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2: {
                    for (let i = 0; i < sections.length; i += 1) {
                        const v = sections[i];
                        if (v.id === assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                }
                case 3: {
                    for (let i = 0; i < users.length; i += 1) {
                        const v = users[i];
                        if (v.id === assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                }
                default:
                    if (this.isone < 2) {
                        data = this.$t("message.Everyone");
                    } else {
                        data = this.$t("message.Everyelse");
                    }
            }
            return data;
        },
        async getAssignList() {
            let data = `courseId=${this.courseId}`;
            data += `&originId=${this.quizDetailId}`;
            data += `&originType=${3}`;
            const result = await this.$getData(
                `/moduleItemAssign/list?${data}`,
                null,
                "get"
            );
            if (result.data.code === 200) {
                this.tableData = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (result.data.code === 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        },
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        },
        GradeNowShow() {
            const param = {
                originType: 3,
                originId: this.quizDetailId
            };
            this.$http
                .get(
                    `${process.env.NODE_ENV}/grade/tmissionScoringStat/query`,
                    { params: param }
                )
                .then(res => {
                    if (res.data.code === 200) {
                        this.gradeNowShow = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        GradeNow(title, totalScore) {
            /* /grade/tmissionScoringStat/query */
            this.$router.push({
                path: "/homePage/allCourse/oneGradePage",
                query: {
                    originType: 3,
                    courseId: this.courseId,
                    gradeType: 1,
                    title,
                    score: totalScore,
                    originId: this.quizDetailId
                }
            });
        },
        /**
         * 删除老师端答题记录
         * */
        QDeletes() {
            const ids = [];
            ids.push(this.quizRecordId);
            this.$http
                .post(`${process.env.NODE_ENV}/quizRecord/deletes`, ids)
                .then(res => {
                    if (res.data.code === 200) {
                        // empty
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
@import "./styleQuizz.css";
</style>
