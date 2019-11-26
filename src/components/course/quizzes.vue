<template>
    <!--eslint-disable-->
    <div>
        <div v-show="quizPageList">
            <!--测验列表-->
            <div class="summary-Quizzes">
                <div class="quizzes-search">
                    <el-input
                        v-model="input21"
                        :placeholder="$t('message.Search_for_Quiz')"
                        prefix-icon="el-icon-search"
                    />
                </div>
                <div class="module">
                    <el-button>
                        {{ $t("message.Manage_Question_Banks") }}
                    </el-button>
                    <el-button
                        style="background-color: #0138b1;color: white"
                        @click.native="showQuizes"
                    >
                        {{ $t("message.Quizzes") }}
                    </el-button>
                </div>
                <div class="modules-list">
                    <div class="modules-group">
                        <!--style="height: 500px;"-->
                        <el-scrollbar style="height: 100%;">
                            <div class="module-heard">
                                <span class="drag">
                                    <img
                                        src="../../../static/images/drag.png"
                                        title="拖动以重新排序单元"
                                        alt=""
                                    />
                                </span>
                                <h3 style="display: inline-block">
                                    测验测试
                                </h3>
                            </div>
                            <div
                                v-for="(quizz, index) in showQuizInforList"
                                :key="index"
                                class="content"
                            >
                                <ul>
                                    <li>
                                        <div class="modules-row">
                                            <span class="drag">
                                                <img
                                                    src="../../../static/images/drag.png"
                                                    alt=""
                                                    title="拖动可重新排序或移动项目至其它单元"
                                                />
                                            </span>
                                            <h4 style="display: inline-block">
                                                {{ quizz.title }}
                                            </h4>
                                            <div style="display: inline-block">
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    content="取消发布"
                                                    placement="top"
                                                >
                                                    <span
                                                        v-show="quizz.status"
                                                        class="modules-successList"
                                                        @click="
                                                            quizzStatus(
                                                                quizz.id,
                                                                0
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="el-icon-success"
                                                            style="cursor: pointer"
                                                        />
                                                    </span>
                                                </el-tooltip>
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    content="发布"
                                                    placement="top"
                                                >
                                                    <span
                                                        v-show="!quizz.status"
                                                        class="modules-Group"
                                                        @click="
                                                            quizzStatus(
                                                                quizz.id,
                                                                1
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-Group-"
                                                            style="cursor: pointer;font-size: 24px"
                                                        />
                                                    </span>
                                                </el-tooltip>
                                            </div>
                                            <div class="modules-menuList">
                                                <el-row class="block-col-2">
                                                    <el-col :span="12">
                                                        <el-dropdown
                                                            trigger="click"
                                                        >
                                                            <span
                                                                class="el-dropdown-link"
                                                                style="width: 10px;display: inline-block;cursor: pointer"
                                                            >
                                                                <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                                                                <img
                                                                    src="../../../static/images/spread.png"
                                                                    alt=""
                                                                />
                                                            </span>
                                                            <el-dropdown-menu
                                                                slot="dropdown"
                                                            >
                                                                <el-dropdown-item
                                                                    @click.native="
                                                                        showQuize(
                                                                            quizz.id
                                                                        )
                                                                    "
                                                                >
                                                                    <img
                                                                        src="../../../static/images/edit.png"
                                                                        alt=""
                                                                    />
                                                                    <!--<i class="iconfont icon-icon-edit"></i>-->
                                                                    {{
                                                                        $t(
                                                                            "message.Edit"
                                                                        )
                                                                    }}
                                                                </el-dropdown-item>
                                                                <el-dropdown-item
                                                                    @click.native="
                                                                        quizeDelete(
                                                                            quizz.id
                                                                        )
                                                                    "
                                                                >
                                                                    <img
                                                                        src="../../../static/images/delete.png"
                                                                        alt=""
                                                                    />
                                                                    {{
                                                                        $t(
                                                                            "message.Delete"
                                                                        )
                                                                    }}
                                                                </el-dropdown-item>
                                                                <el-dropdown-item>
                                                                    <img
                                                                        src="../../../static/images/share.png"
                                                                        alt=""
                                                                    />
                                                                    {{
                                                                        $t(
                                                                            "message.Share_to_Commons"
                                                                        )
                                                                    }}
                                                                </el-dropdown-item>
                                                            </el-dropdown-menu>
                                                        </el-dropdown>
                                                    </el-col>
                                                </el-row>
                                                <!-- <div>
                           <el-dialog
                             title="提示"
                             :visible.sync="quizeDeleteDialogVisible"
                             width="30%"
                            >
                             <span>是否确定要删除此测验?</span>
                             <span slot="footer" class="dialog-footer">
                               <el-button @click="quizeDeleteDialogVisible = false">取 消</el-button>
                               <el-button type="primary" @click="quizeDelete(quizz.id)">确 定</el-button>
                             </span>
                           </el-dialog>
                         </div>-->
                                            </div>
                                            <div
                                                v-for="(quizzs,
                                                index) in quizz.assigns"
                                                :key="index"
                                                class="quizzes-time"
                                            >
                                                <ul>
                                                    <li>已关闭 |</li>
                                                    <li v-show="quizz.score">
                                                        {{ quizz.score }}分 |
                                                    </li>
                                                    <li>
                                                        {{
                                                            quizz.totalQuestions
                                                        }}个问题
                                                    </li>
                                                    <li v-if="quizzs.endTime">
                                                        |
                                                        {{
                                                            quizzs.endTime
                                                                | formatDate(
                                                                    time
                                                                )
                                                        }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div class="modules-group">
                        <div class="module-heard">
                            <span class="drag">
                                <img
                                    src="../../../static/images/drag.png"
                                    title="拖动以重新排序单元"
                                    alt=""
                                />
                            </span>
                            <h3 style="display: inline-block">
                                测验测试
                            </h3>
                        </div>
                        <div class="content">
                            <ul>
                                <li>
                                    <div class="modules-row">
                                        <span class="drag">
                                            <!--<div class="todoStyle">-->
                                            <!--<ul>-->
                                            <!--<li><i class="iconfont icon-Announcement"></i>Grade <p>QuizeName</p></li>-->
                                            <!--<li>CourseName</li>-->
                                            <!--<li><span>Due</span> <span>12 ~ 10 pts</span> <span>5</span>to be Graded</li>-->
                                            <!--</ul>-->
                                            <!--</div>-->
                                            <img
                                                src="../../../static/images/drag.png"
                                                alt=""
                                                title="拖动可重新排序或移动项目至其它单元"
                                            />
                                        </span>
                                        <h4 style="display: inline-block">
                                            测验测试1
                                        </h4>

                                        <span class="modules-successList"
                                            ><i class="el-icon-success"
                                        /></span>
                                        <div class="modules-menuList">
                                            <el-row class="block-col-2">
                                                <el-col :span="12">
                                                    <el-dropdown
                                                        trigger="click"
                                                    >
                                                        <span
                                                            class="el-dropdown-link"
                                                            style="width: 10px;display: inline-block;cursor: pointer"
                                                        >
                                                            <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                                                            <img
                                                                src="../../../static/images/spread.png"
                                                                alt=""
                                                            />
                                                        </span>
                                                        <el-dropdown-menu
                                                            slot="dropdown"
                                                        >
                                                            <el-dropdown-item
                                                                @click.native="
                                                                    showQuize
                                                                "
                                                            >
                                                                <img
                                                                    src="../../../static/images/edit.png"
                                                                    alt=""
                                                                />
                                                                {{
                                                                    $t(
                                                                        "message.Edit"
                                                                    )
                                                                }}
                                                            </el-dropdown-item>
                                                            <el-dropdown-item>
                                                                <img
                                                                    src="../../../static/images/delete.png"
                                                                    alt=""
                                                                />
                                                                {{
                                                                    $t(
                                                                        "message.Delete"
                                                                    )
                                                                }}
                                                            </el-dropdown-item>
                                                            <el-dropdown-item>
                                                                <img
                                                                    src="../../../static/images/share.png"
                                                                    alt=""
                                                                />
                                                                {{
                                                                    $t(
                                                                        "message.Share_to_Commons"
                                                                    )
                                                                }}
                                                            </el-dropdown-item>
                                                        </el-dropdown-menu>
                                                    </el-dropdown>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <div class="quizzes-time">
                                            <ul>
                                                <li>已关闭</li>
                                                |
                                                <li>1分</li>
                                                |
                                                <li>1个问题</li>
                                                |
                                                <li>2019/1/9-2019/1/10</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="modules-row">
                                        <h4>测验测试1</h4>
                                        <span>111</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="quizPageAdd">
            <!--测验添加-->
            <div style="width: 70%;" class="quizeLeft">
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$t('message.Details')" name="first">
                        <div>
                            <el-input v-model="title" />
                        </div>
                        <div class="messagetext">
                            <ckeditor
                                v-model="description"
                                :editor="editor"
                                :config="editorConfig"
                            />
                        </div>
                        <div class="quizzes-install">
                            <el-form
                                :label-position="labelPosition"
                                label-width="20%"
                                :model="formLabelAlign"
                            >
                                <el-form-item :label="$t('message.Quiz_Type')">
                                    <el-select
                                        v-model="type.value"
                                        placeholder="Practic Quiz"
                                        style="width: 80%"
                                    >
                                        <el-option
                                            label="练习测验"
                                            value="1"
                                            @click.native="groupShow1"
                                        />
                                        <el-option
                                            label="评分测验"
                                            value="2"
                                            @click.native="groupShow2"
                                        />
                                        <el-option
                                            label="评分调查"
                                            value="3"
                                            @click.native="groupShow3"
                                        />
                                        <el-option
                                            label="非评分调查"
                                            value="4"
                                            @click.native="groupShow4"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-show="quizeValue"
                                    :label="$t('message.Assignment_Group')"
                                >
                                    <el-select
                                        v-model="assignment.courseId"
                                        placeholder="Assignments"
                                        style="width: 80%"
                                    >
                                        <el-option
                                            v-for="item in assignment"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.courseId"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-show="quizeScore"
                                    :label="$t('message.score')"
                                >
                                    <el-input
                                        v-model="score"
                                        placeholder="请输入内容"
                                        style="width: 20%"
                                    />
                                    pts
                                    <p class="quizzes-student">
                                        {{
                                            $t(
                                                "message.Student_will_automatically"
                                            )
                                        }}
                                    </p>
                                </el-form-item>
                                <el-form-item :label="$t('message.Options')">
                                    <el-checkbox v-model="isShuffleAnswer">
                                        {{ $t("message.Shuffle_Answers") }}
                                    </el-checkbox>
                                    <div style="padding-bottom: 1%">
                                        <el-checkbox v-model="timeLimit1">
                                            {{ $t("message.Time_Limit") }}
                                            <el-input
                                                v-model="timeLimit"
                                                style="width: 30%"
                                            />
                                            {{ $t("message.Minutes") }}
                                        </el-checkbox>
                                    </div>
                                    <div>
                                        <el-checkbox
                                            v-show="quizeSubmissions"
                                            v-model="allowAnonymous"
                                        >
                                            {{
                                                $t(
                                                    "message.Keep_Submissions_Anonymous"
                                                )
                                            }}
                                        </el-checkbox>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="allowMultiAttempt"
                                                style="display: block"
                                                @change="MultipleAttempt"
                                            >
                                                {{
                                                    $t(
                                                        "message.Allow_Multiple_Attempts"
                                                    )
                                                }}
                                            </el-checkbox>
                                            <div
                                                v-show="AllowMultiple"
                                                class="attempts-keep"
                                            >
                                                <span>{{
                                                    $t(
                                                        "message.Quiz_Score_to_keep"
                                                    )
                                                }}</span>
                                                <el-select
                                                    v-model="scoreType.value"
                                                    placeholder="Highest"
                                                    style="width: 30%;margin-bottom: 1%"
                                                >
                                                    <!--设置最高分，最低分，平均分-->
                                                    <el-option
                                                        v-for="item in scoreTypeOptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                    />
                                                </el-select>
                                                <el-checkbox
                                                    v-model="AllowedAttempts"
                                                >
                                                    {{
                                                        $t(
                                                            "message.Allowed_Attempts"
                                                        )
                                                    }}
                                                    <el-input
                                                        v-model="attemptNumber"
                                                        style="width: 30%"
                                                    />
                                                </el-checkbox>
                                            </div>
                                        </div>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="showReplyStrategy1"
                                                style="display: inline-block"
                                                @change="ReplyStrategy"
                                            />
                                            <span style="color: #606266">
                                                {{
                                                    $t(
                                                        "message.Let_Students_See_Their_Quiz"
                                                    )
                                                }}
                                            </span>
                                            <div
                                                v-show="showReply"
                                                class="attempts-keep"
                                            >
                                                <el-checkbox
                                                    v-model="showReplyStrategy2"
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
                                                            showAnswerStrategy1
                                                        "
                                                        @change="AnswerStrategy"
                                                    >
                                                        {{
                                                            $t(
                                                                "message.Let_Students_See_The_Correct_Answers"
                                                            )
                                                        }}
                                                    </el-checkbox>
                                                </div>
                                                <div
                                                    v-show="showAnswer"
                                                    class="attempt-third"
                                                >
                                                    <el-checkbox
                                                        v-model="
                                                            showAnswerStrategy2
                                                        "
                                                    >
                                                        {{
                                                            $t(
                                                                "message.Only_After_Their_Last_Attempt"
                                                            )
                                                        }}
                                                    </el-checkbox>
                                                    <div>
                                                        <span
                                                            style="margin-bottom: 2%;width: 42%;display: inline-block"
                                                        >
                                                            {{
                                                                $t(
                                                                    "message.show_Correct_Answers_at"
                                                                )
                                                            }}
                                                        </span>
                                                        <el-date-picker
                                                            v-model="
                                                                showAnswerStartTime
                                                            "
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                        />
                                                        <span
                                                            style="margin-bottom: 2%;width: 42%;display: inline-block"
                                                            >{{
                                                                $t(
                                                                    "message.Hide_Correct_Answers_at"
                                                                )
                                                            }}</span
                                                        >
                                                        <el-date-picker
                                                            v-model="
                                                                showAnswerEndTime
                                                            "
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="showQuestionStrategy"
                                                style="display: block"
                                                @change="LockQuestion"
                                            >
                                                {{
                                                    $t(
                                                        "message.Show_one_question_at_a_time"
                                                    )
                                                }}
                                            </el-checkbox>
                                            <div
                                                v-show="LockQuestions"
                                                class="attempts-keep"
                                            >
                                                <el-checkbox
                                                    v-model="
                                                        isLockRepliedQuestion
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Lock_questions_after_answering"
                                                        )
                                                    }}
                                                </el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('message.Quiz_Restrictions')"
                                >
                                    <div class="multiple-attempts">
                                        <el-checkbox
                                            v-model="isNeedAccessCode"
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
                                            v-show="showAccessCode"
                                            class="attempts-keep"
                                        >
                                            <el-input
                                                v-model="accessCode"
                                                placeholder="code"
                                                style="width: 50%"
                                            />
                                        </div>
                                    </div>
                                    <div class="multiple-attempts">
                                        <el-checkbox
                                            v-model="isFilterIP"
                                            style="display: block"
                                            @change="IPAddresses"
                                        >
                                            {{
                                                $t(
                                                    "message.Filter_IP_Addresses"
                                                )
                                            }}
                                        </el-checkbox>
                                        <div
                                            v-show="showFilterIP"
                                            class="attempts-keep"
                                        >
                                            <el-input
                                                v-model="filterIpAddress"
                                                placeholder="IP"
                                                style="width: 50%"
                                            />
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    v-for="domain in assign"
                                    :key="domain.key"
                                    :label="$t('message.Assign')"
                                >
                                    <div class="multiple-assign">
                                        <div class="addto">
                                            <p style="display: inline-block">
                                                {{ $t("message.Assign_to") }}
                                            </p>
                                            <i
                                                class="el-icon-error"
                                                style="float: right;cursor: pointer"
                                                @click.prevent="
                                                    editRemoveDomain(domain)
                                                "
                                            />
                                            <el-select
                                                v-model="domain.assignType"
                                                placeholder="Please select"
                                                style="width: 100%"
                                            >
                                                <!-- multiple-->
                                                <el-option
                                                    label=" 所有"
                                                    value="1"
                                                />
                                                <el-option
                                                    label="班级"
                                                    value="2"
                                                />
                                                <el-option
                                                    label="用户"
                                                    value="3"
                                                />
                                            </el-select>
                                            <p>{{ $t("message.Due") }}</p>
                                            <el-date-picker
                                                v-model="domain.limitTime"
                                                type="datetime"
                                                placeholder="选择日期时间"
                                                style="width: 100%"
                                            />
                                            <div class="available-until">
                                                <p>
                                                    {{
                                                        $t(
                                                            "message.Available_from"
                                                        )
                                                    }}
                                                </p>
                                                <el-date-picker
                                                    v-model="domain.startTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    style="width: 100%"
                                                />
                                            </div>
                                            <div class="available-until">
                                                <p>{{ $t("message.Until") }}</p>
                                                <el-date-picker
                                                    v-model="domain.endTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    style="width: 100%"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="assign-add">
                                    <el-button
                                        icon="el-icon-circle-plus-outline"
                                        @click="editAddDomain"
                                    >
                                        {{ $t("message.Add") }}
                                    </el-button>
                                </div>
                                <div class="questions-checkbox">
                                    <el-checkbox
                                        v-model="checked5"
                                        style="display: block;margin-top: 2%"
                                    >
                                        {{
                                            $t(
                                                "message.Notify_users_that_this_content_has_changed"
                                            )
                                        }}
                                    </el-checkbox>
                                </div>
                                <el-button>
                                    {{ $t("message.Cancel") }}
                                </el-button>
                                <el-button
                                    style="float: right;background-color: #0138b1;color: white"
                                    @click="quizeSure"
                                >
                                    {{ $t("message.Save") }}
                                </el-button>
                                <el-button
                                    v-model="status"
                                    style="float: right"
                                    @click="quizeSavePublish"
                                >
                                    {{ $t("message.Save_Publish") }}
                                </el-button>
                            </el-form>
                            <v-goTop />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Questions')" name="second">
                        <div class="questions-style">
                            <div
                                v-for="(domain, index) in quizItemList"
                                v-show="TestProblem"
                                :key="index"
                                class="quizzesQuestion"
                            >
                                <div class="quizzes-started">
                                    <div class="biaoji">
                                        <img
                                            src="../../../static/images/biaoji.png"
                                            alt=""
                                        />
                                    </div>
                                    <h5>
                                        {{ domain.question.title }}
                                        {{ index + 1 }}
                                    </h5>
                                    <span
                                        >{{ domain.question.score }}pts
                                        <i
                                            class="iconfont icon-edit"
                                            @click="
                                                modifyQuestionStara(
                                                    domain.targetId
                                                )
                                            "
                                        />
                                        <i
                                            class="iconfont icon-edit"
                                            @click="
                                                modifyQuestionStara(
                                                    domain.targetId
                                                )
                                            "
                                        />
                                    </span>

                                    <ul>
                                        <div v-html="domain.question.content" />
                                        <li
                                            v-for="item in domain.question
                                                .options"
                                        >
                                            <el-radio
                                                v-model="item.isCorrect"
                                                label="1"
                                            >
                                                {{ item.content }}
                                            </el-radio>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-show="TestProblem" class="quizzesQuestion">
                                <div class="quizzes-started">
                                    <div class="biaoji">
                                        <img
                                            src="../../../static/images/biaoji.png"
                                            alt=""
                                        />
                                    </div>
                                    <h5>Question 2</h5>
                                    <span>1pts</span>
                                    <ul>
                                        以下哪些是中国省会城市?
                                        <li>
                                            <el-radio v-model="radio" label="1">
                                                True
                                            </el-radio>
                                        </li>
                                        <li>
                                            <el-radio v-model="radio" label="2">
                                                False
                                            </el-radio>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                v-show="testQuestionsisShow"
                                class="questions-style"
                            >
                                <div class="quizzesTest">
                                    <el-input
                                        v-model="titles"
                                        placeholder="Search for Quiz"
                                        style="width: 30%"
                                    />
                                    <el-select
                                        v-model="questionType.value"
                                        placeholder="请选择问题"
                                        style="width: 30%"
                                    >
                                        <el-option
                                            label="单选"
                                            value="1"
                                            @click.native="testSelect"
                                        />
                                        <el-option
                                            label="多选"
                                            value="2"
                                            @click.native="testFile"
                                        />
                                        <el-option
                                            label="判断"
                                            value="3"
                                            @click.native="trueFalse"
                                        />
                                        <!--<el-option label="多项下拉题" value="4"></el-option>-->
                                        <!--<el-option label="匹配题" value="5"></el-option>-->
                                        <el-option
                                            label="简答题"
                                            value="6"
                                            @click.native="SimpleAnswer"
                                        />
                                        <!--<el-option label="文件上传题" value="7"></el-option>-->
                                        <!--<el-option label="文本题" value="8"></el-option>-->
                                    </el-select>
                                    <el-input
                                        v-model="score"
                                        style="width: 6%;float: right"
                                    />
                                    <span
                                        style="float: right;line-height: 40px"
                                    >
                                        pts</span
                                    >
                                    <p>
                                        Enter your question and multiple answers
                                    </p>
                                    <div>
                                        <h4>Message Text</h4>
                                        <div class="messagetext">
                                            <ckeditor
                                                v-model="content"
                                                :editor="editor"
                                                :config="editorConfig"
                                            />
                                        </div>
                                        <div v-show="testQuestionsselect">
                                            <!--:model="dynamicValidateForm"-->
                                            <!--单选-->
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <!--<el-form-item-->
                                                <!--v-for="(domain,index) in QuestionOptions"-->
                                                <!--:key="domain.key"-->
                                                <!--label=""-->
                                                <!--:prop="'domain.' +'.label'"-->
                                                <!--&gt;-->
                                                <!--<el-radio-group v-model="domain.code">-->
                                                <!--<el-radio :label="domain.code" >-->
                                                <!--<span class="opt-answer-code">{{codeObjList[index].name}}</span>-->
                                                <!--<el-input v-model="domain.content" style="width: 50%"></el-input>-->
                                                <!--<i class="el-icon-edit" @click.prevent="removeDomain(domain)"></i>-->
                                                <!--<i class="el-icon-delete" @click.prevent="removeDomain(domain)"></i>-->
                                                <!--</el-radio>-->
                                                <!--</el-radio-group>-->
                                                <!--</el-form-item>-->
                                                <el-form-item>
                                                    <el-radio-group
                                                        v-model="testRadio"
                                                        style="width: 60%"
                                                    >
                                                        <el-radio
                                                            v-for="(domain,
                                                            index) in QuestionOptions"
                                                            :key="domain.key"
                                                            :label="index"
                                                            style="display: block;"
                                                        >
                                                            <span
                                                                class="opt-answer-code"
                                                                >{{
                                                                    codeObjList[
                                                                        index
                                                                    ].name
                                                                }}</span
                                                            >
                                                            <el-input
                                                                v-model="
                                                                    domain.content
                                                                "
                                                                type="textarea"
                                                            />
                                                            <i
                                                                class="el-icon-edit"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                            <i
                                                                class="el-icon-delete"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                        </el-radio>
                                                    </el-radio-group>
                                                </el-form-item>

                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="correctComment"
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="wrongComment"
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                        <div v-show="testQuestionsfile">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item>
                                                    <el-checkbox-group
                                                        v-model="quizzChecked"
                                                        style="width: 60%"
                                                    >
                                                        <el-checkbox
                                                            v-for="(domain,
                                                            index) in QuestionOptions"
                                                            :key="domain.key"
                                                            :label="index"
                                                            style="display: block;"
                                                        >
                                                            <span
                                                                class="opt-answer-code"
                                                                >{{
                                                                    codeObjList[
                                                                        index
                                                                    ].name
                                                                }}</span
                                                            >
                                                            <el-input
                                                                v-model="
                                                                    domain.content
                                                                "
                                                                type="textarea"
                                                            />
                                                            <i
                                                                class="el-icon-edit"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                            <i
                                                                class="el-icon-delete"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="correctComment"
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="wrongComment"
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                        <div v-show="testQuestionsTrueFalse">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-radio-group
                                                    v-model="testRadio"
                                                    style="width: 60%"
                                                >
                                                    <el-radio
                                                        v-for="(domain,
                                                        index) in QuestionOptions"
                                                        :key="domain.key"
                                                        :label="index"
                                                        style="display: block;"
                                                    >
                                                        <span
                                                            class="opt-answer-code"
                                                            >{{
                                                                codeObjList[
                                                                    index
                                                                ].name
                                                            }}</span
                                                        >
                                                        <el-input
                                                            v-model="
                                                                domain.content
                                                            "
                                                            type="textarea"
                                                        />
                                                    </el-radio>
                                                </el-radio-group>
                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="correctComment"
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="wrongComment"
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>

                                        <div v-show="testQuestionsSimpleAnswer">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="quizzes-search">
                                    <!--:placeholder="$t('message.Question')"-->
                                    <el-input
                                        v-model="input21"
                                        placeholder="Search for Quiz"
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                                <div class="questions">
                                    <el-button @click.native="testQuestions">
                                        <i
                                            class="el-icon-circle-plus-outline"
                                        />{{ $t("message.New_Question") }}
                                    </el-button>
                                    <el-button
                                        icon="el-icon-circle-plus-outline"
                                    >
                                        {{ $t("message.New_Question_Group") }}
                                    </el-button>
                                </div>
                            </div>
                            <div class="questions-checkbox">
                                <el-checkbox
                                    v-model="checked5"
                                    style="display: block;margin-top: 2%"
                                >
                                    {{ $t("message.Notify_users_that") }}
                                </el-checkbox>
                            </div>
                            <el-button>{{ $t("message.Cancel") }}</el-button>
                            <el-button
                                style="float: right;background-color: #0138b1;color: white"
                                @click="quizeSure"
                            >
                                {{ $t("message.Save") }}
                            </el-button>
                            <el-button
                                v-model="status"
                                style="float: right"
                                @click="savePublish"
                            >
                                {{ $t("message.Save_Publish") }}
                            </el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div style="width: 26%;" class="quizeRight">
                <el-tabs v-model="quizeRight">
                    <el-tab-pane :label="$t('message.Links')" name="first">
                        <p>
                            {{
                                $t(
                                    "message.link_to_other_content_in_the_course"
                                )
                            }}
                        </p>
                        <div class="quizeLinks">
                            <el-collapse accordion>
                                <div class="left-quize">
                                    <el-collapse-item>
                                        <template slot="title">
                                            {{ $t("message.Pages") }}
                                        </template>
                                        <div>page</div>
                                        <div>page</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Assignments')"
                                    >
                                        <div>123</div>
                                        <div>123</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Quizzes')"
                                    >
                                        <div>456</div>
                                        <div>456</div>
                                        <div>456</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Announcements')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Discussions')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Modules')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Course_Navigation')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                            </el-collapse>
                        </div>
                        <!--<div>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>-->
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Files')" name="second">
                        <div class="files-rightfiles-right">
                            <p>
                                {{
                                    $t(
                                        "message.link_to_other_content_in_the_course"
                                    )
                                }}
                            </p>
                            <div class="filesRight">
                                <el-scrollbar style="height: 100%;">
                                    <el-tree
                                        :data="data"
                                        :props="defaultProps"
                                        @node-click="handleNodeClick"
                                    />
                                </el-scrollbar>
                            </div>
                            <el-button
                                v-show="uplondFiles"
                                style="width: 100%;margin-bottom: 8%;background-color: #26be96;color: #fff"
                                @click="fileUplond"
                            >
                                <img
                                    src="../../../static/images/Creat.png"
                                    alt=""
                                />
                                {{ $t("message.Upload_a_new_file") }}
                            </el-button>
                            <div v-show="uplondFile">
                                <el-button
                                    style="width: 100%;margin-bottom: 8%;background-color: #999999;color: white"
                                    @click="fileUplonds"
                                >
                                    <img
                                        src="../../../static/images/remove.png"
                                        alt=""
                                    />
                                    {{ $t("message.Cancel_file_upload") }}
                                </el-button>
                                <el-upload
                                    class="upload-demo"
                                    action="action"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                                >
                                    <el-button size="small" type="primary">
                                        {{ $t("message.Select_files") }}
                                    </el-button>
                                </el-upload>

                                <P style="margin-top: 4%">
                                    {{ $t("message.Folder") }}
                                </P>
                                <el-select
                                    v-model="formLabelAlign.region"
                                    placeholder="Assignments"
                                    style="width: 100%"
                                >
                                    <el-option
                                        label="区域一"
                                        value="shanghai"
                                    />
                                    <el-option label="区域二" value="beijing" />
                                </el-select>
                                <el-button
                                    style="width: 30%;margin-top: 4%;background-color: #0138b1;color: #fff;float: right"
                                >
                                    {{ $t("message.Upload") }}
                                </el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Images')" name="third">
                        <div class="files-right">
                            <p>
                                {{
                                    $t(
                                        "message.link_to_other_content_in_the_course"
                                    )
                                }}
                            </p>
                            <el-button
                                v-show="flickrImages"
                                style="width: 100%;margin-bottom: 8%;"
                                @click="ImagesFlickr"
                            >
                                <img
                                    src="../../../static/images/search-qianhui.png"
                                    alt=""
                                />
                                {{ $t("message.Search_Flickr") }}
                            </el-button>
                            <div v-show="flickrImage">
                                <el-button
                                    style="width: 100%;margin-bottom: 8%;"
                                    @click="ImagesFlickrs"
                                >
                                    <img
                                        src="../../../static/images/remove.png"
                                        alt=""
                                    />
                                    {{ $t("message.Search_Flickr") }}ssss
                                </el-button>
                                <p>Flickr:Creative Commons Search</p>
                                <el-input
                                    v-model="input"
                                    :placeholder="
                                        $t('message.Enter_search_terms')
                                    "
                                />
                                <el-button
                                    style="width: 30%;margin-top: 4%;float: right"
                                >
                                    {{ $t("message.Search") }}
                                </el-button>
                            </div>
                            <el-button
                                v-show="uplondImages"
                                style="width: 100%;margin: 4% 0;background-color: #26be96;color: #fff"
                                @click="ImagesUpload"
                            >
                                <img
                                    src="../../../static/images/Creat.png"
                                    alt=""
                                />
                                {{ $t("message.Upload_a_new_image") }}
                            </el-button>
                            <div v-show="uplondImage">
                                <el-button
                                    style="width: 100%;margin: 4% 0;background-color: #999999;color: white"
                                    @click="ImagesUploads"
                                >
                                    <img
                                        src="../../../static/images/remove.png"
                                        alt=""
                                    />
                                    {{ $t("message.Cancel_image_upload") }}
                                </el-button>
                                <el-upload
                                    class="upload-demo"
                                    action="action"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                                >
                                    <el-button size="small" type="primary">
                                        {{ $t("message.Select_files") }}
                                    </el-button>
                                </el-upload>
                                <P style="margin-top: 4%">
                                    {{ $t("message.Folder") }}
                                </P>
                                <el-select
                                    v-model="formLabelAlign.region"
                                    placeholder="Assignments"
                                    style="width: 100%"
                                >
                                    <el-option
                                        label="区域一"
                                        value="shanghai"
                                    />
                                    <el-option label="区域二" value="beijing" />
                                </el-select>

                                <el-button
                                    style="width: 30%;margin-top: 4%;background-color: #0138b1;color: #fff;float: right"
                                >
                                    {{ $t("message.Upload") }}
                                </el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div v-show="quizPageModify">
            <!--测验修改-->
            <div
                v-for="(quizFor, index) in quizInfor"
                :key="index"
                style="width: 70%;"
                class="quizeLeft"
            >
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$t('message.Details')" name="first">
                        <div>
                            <el-input
                                v-model="quizFor.title"
                                :placeholder="$t('message.Unnamed_Quiz')"
                            />
                        </div>
                        <div class="messagetext">
                            <ckeditor
                                v-model="quizFor.description"
                                :editor="editor"
                                :config="editorConfig"
                            />
                        </div>
                        <div class="quizzes-install">
                            <el-form
                                :label-position="labelPosition"
                                label-width="20%"
                                :model="formLabelAlign"
                            >
                                <el-form-item :label="$t('message.Quiz_Type')">
                                    <el-select
                                        v-model="type.value"
                                        placeholder="Practic Quiz"
                                        style="width: 80%"
                                    >
                                        <el-option
                                            label="练习测验"
                                            value="1"
                                            @click.native="groupShow1"
                                        />
                                        <el-option
                                            label="评分测验"
                                            value="2"
                                            @click.native="groupShow2"
                                        />
                                        <el-option
                                            label="评分调查"
                                            value="3"
                                            @click.native="groupShow3"
                                        />
                                        <el-option
                                            label="非评分调查"
                                            value="4"
                                            @click.native="groupShow4"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-show="quizeValue"
                                    :label="$t('message.Assignment_Group')"
                                >
                                    <el-select
                                        v-model="assignment.courseId"
                                        placeholder="Assignments"
                                        style="width: 80%"
                                    >
                                        <el-option
                                            v-for="item in assignment"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.courseId"
                                        />
                                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-show="quizeScore"
                                    :label="$t('message.score')"
                                >
                                    <el-input
                                        v-model="quizFor.score"
                                        placeholder="请输入内容"
                                        style="width: 20%"
                                    />
                                    pts
                                    <p class="quizzes-student">
                                        {{
                                            $t(
                                                "message.Student_will_automatically"
                                            )
                                        }}
                                    </p>
                                </el-form-item>
                                <el-form-item :label="$t('message.Options')">
                                    <el-checkbox
                                        v-model="quizFor.isShuffleAnswer"
                                    >
                                        {{ $t("message.Shuffle_Answers") }}
                                    </el-checkbox>
                                    <div style="padding-bottom: 1%">
                                        <el-checkbox
                                            v-model="quizFor.timeLimit1"
                                        >
                                            {{ $t("message.Time_Limit") }}
                                            <el-input
                                                v-model="quizFor.timeLimit"
                                                style="width: 30%"
                                            />
                                            {{ $t("message.Minutes") }}
                                        </el-checkbox>
                                    </div>
                                    <div>
                                        <el-checkbox
                                            v-show="quizeSubmissions"
                                            v-model="quizFor.allowAnonymous"
                                        >
                                            {{
                                                $t(
                                                    "message.Keep_Submissions_Anonymous"
                                                )
                                            }}
                                        </el-checkbox>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="
                                                    quizFor.allowMultiAttempt
                                                "
                                                style="display: block"
                                                @change="MultipleAttempt"
                                            >
                                                {{
                                                    $t(
                                                        "message.Allow_Multiple_Attempts"
                                                    )
                                                }}
                                            </el-checkbox>
                                            <div
                                                v-show="AllowMultiple"
                                                class="attempts-keep"
                                            >
                                                <span>{{
                                                    $t(
                                                        "message.Quiz_Score_to_keep"
                                                    )
                                                }}</span>
                                                <el-select
                                                    v-model="scoreType.value"
                                                    placeholder="Highest"
                                                    style="width: 30%;margin-bottom: 1%"
                                                >
                                                    <el-option
                                                        v-for="item in scoreTypeOptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                    />
                                                    <!--<el-option label="最低分" value="2"></el-option>
                          <el-option label="平均分" value="3"></el-option>-->
                                                </el-select>
                                                <el-checkbox
                                                    v-model="
                                                        quizFor.AllowedAttempts
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
                                                    />
                                                </el-checkbox>
                                            </div>
                                        </div>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="
                                                    quizFor.showReplyStrategy1
                                                "
                                                style="display: inline-block"
                                                @change="ReplyStrategy"
                                            />
                                            <span style="color: #606266">
                                                {{
                                                    $t(
                                                        "message.Let_Students_See_Their_Quiz"
                                                    )
                                                }}
                                            </span>
                                            <div
                                                v-show="showReply"
                                                class="attempts-keep"
                                            >
                                                <el-checkbox
                                                    v-model="
                                                        quizFor.showReplyStrategy2
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
                                                            quizFor.showAnswerStrategy1
                                                        "
                                                        @change="AnswerStrategy"
                                                    >
                                                        {{
                                                            $t(
                                                                "message.Let_Students_See_The_Correct_Answers"
                                                            )
                                                        }}
                                                    </el-checkbox>
                                                </div>
                                                <div
                                                    v-show="showAnswer"
                                                    class="attempt-third"
                                                >
                                                    <el-checkbox
                                                        v-model="
                                                            quizFor.showAnswerStrategy2
                                                        "
                                                    >
                                                        {{
                                                            $t(
                                                                "message.Only_After_Their_Last_Attempt"
                                                            )
                                                        }}
                                                    </el-checkbox>
                                                    <div>
                                                        <span
                                                            style="margin-bottom: 2%;width: 42%;display: inline-block"
                                                        >
                                                            {{
                                                                $t(
                                                                    "message.show_Correct_Answers_at"
                                                                )
                                                            }}
                                                        </span>
                                                        <el-date-picker
                                                            v-model="
                                                                quizFor.showAnswerStartTime
                                                            "
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                        />
                                                        <span
                                                            style="margin-bottom: 2%;width: 42%;display: inline-block"
                                                            >{{
                                                                $t(
                                                                    "message.Hide_Correct_Answers_at"
                                                                )
                                                            }}</span
                                                        >
                                                        <el-date-picker
                                                            v-model="
                                                                quizFor.showAnswerEndTime
                                                            "
                                                            type="datetime"
                                                            placeholder="选择日期时间"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="multiple-attempts">
                                            <el-checkbox
                                                v-model="
                                                    quizFor.showQuestionStrategy
                                                "
                                                style="display: block"
                                                @change="LockQuestion"
                                            >
                                                {{
                                                    $t(
                                                        "message.Show_one_question_at_a_time"
                                                    )
                                                }}
                                            </el-checkbox>
                                            <div
                                                v-show="LockQuestions"
                                                class="attempts-keep"
                                            >
                                                <el-checkbox
                                                    v-model="
                                                        quizFor.isLockRepliedQuestion
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Lock_questions_after_answering"
                                                        )
                                                    }}
                                                </el-checkbox>
                                            </div>
                                        </div>
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
                                            v-show="showAccessCode"
                                            class="attempts-keep"
                                        >
                                            <el-input
                                                v-model="quizFor.accessCode"
                                                placeholder="code"
                                                style="width: 50%"
                                            />
                                        </div>
                                    </div>
                                    <div class="multiple-attempts">
                                        <el-checkbox
                                            v-model="quizFor.isFilterIP"
                                            style="display: block"
                                            @change="IPAddresses"
                                        >
                                            {{
                                                $t(
                                                    "message.Filter_IP_Addresses"
                                                )
                                            }}
                                        </el-checkbox>
                                        <div
                                            v-show="showFilterIP"
                                            class="attempts-keep"
                                        >
                                            <el-input
                                                v-model="
                                                    quizFor.filterIpAddress
                                                "
                                                placeholder="IP"
                                                style="width: 50%"
                                            />
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    v-for="domain in assign"
                                    :key="domain.key"
                                    :label="$t('message.Assign')"
                                >
                                    <div class="multiple-assign">
                                        <div class="addto">
                                            <p style="display: inline-block">
                                                {{ $t("message.Assign_to") }}
                                            </p>
                                            <i
                                                class="el-icon-error"
                                                style="float: right;cursor: pointer"
                                                @click.prevent="
                                                    editRemoveDomain(domain)
                                                "
                                            />
                                            <el-select
                                                v-model="domain.assignType"
                                                placeholder="Please select"
                                                style="width: 100%"
                                            >
                                                <!-- multiple-->
                                                <el-option
                                                    label=" 所有"
                                                    value="1"
                                                />
                                                <el-option
                                                    label="班级"
                                                    value="2"
                                                />
                                                <el-option
                                                    label="用户"
                                                    value="3"
                                                />
                                            </el-select>
                                            <p>{{ $t("message.Due") }}</p>
                                            <el-date-picker
                                                v-model="domain.limitTime"
                                                type="datetime"
                                                placeholder="选择日期时间"
                                                style="width: 100%"
                                            />
                                            <div class="available-until">
                                                <p>
                                                    {{
                                                        $t(
                                                            "message.Available_from"
                                                        )
                                                    }}
                                                </p>
                                                <el-date-picker
                                                    v-model="domain.startTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    style="width: 100%"
                                                />
                                            </div>
                                            <div class="available-until">
                                                <p>{{ $t("message.Until") }}</p>
                                                <el-date-picker
                                                    v-model="domain.endTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    style="width: 100%"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>
                                <div class="assign-add">
                                    <el-button
                                        icon="el-icon-circle-plus-outline"
                                        @click="editAddDomain"
                                    >
                                        {{ $t("message.Add") }}
                                    </el-button>
                                </div>
                                <div class="questions-checkbox">
                                    <el-checkbox
                                        v-model="checked5"
                                        style="display: block;margin-top: 2%"
                                    >
                                        {{
                                            $t(
                                                "message.Notify_users_that_this_content_has_changed"
                                            )
                                        }}
                                    </el-checkbox>
                                </div>
                                <el-button>
                                    {{ $t("message.Cancel") }}
                                </el-button>
                                <el-button
                                    style="float: right;background-color: #0138b1;color: white"
                                    @click="quizeSureModify(quizFor)"
                                >
                                    {{ $t("message.Save") }}
                                </el-button>
                                <el-button
                                    v-model="status"
                                    style="float: right"
                                    @click="quizeSureModifyPublish(quizFor)"
                                >
                                    {{ $t("message.Save_Publish") }}
                                </el-button>
                            </el-form>
                            <v-goTop />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Questions')" name="second">
                        <div class="questions-style">
                            <div
                                v-for="(domain, index) in quizItemList"
                                v-show="mondifyTestProblem"
                                :key="index"
                                class="quizzesQuestion"
                            >
                                <!--<div class="biaoji">
                  <img src="../../../static/images/biaoji.png" alt="">
                </div>-->
                                <div class="quizzes-started">
                                    <div class="biaoji">
                                        <img
                                            src="../../../static/images/biaoji.png"
                                            alt=""
                                        />
                                    </div>
                                    <h5>
                                        {{ domain.question.title }}
                                        {{ index + 1 }}
                                    </h5>
                                    <span
                                        >{{ domain.question.score }}pts
                                        <i
                                            class="iconfont icon-edit"
                                            @click="
                                                modifyQuestionStara(
                                                    domain.targetId
                                                )
                                            "
                                        />
                                    </span>

                                    <ul>
                                        <div v-html="domain.question.content" />
                                        <li
                                            v-for="item in domain.question
                                                .options"
                                        >
                                            <el-radio
                                                v-model="item.isCorrect"
                                                label="1"
                                            >
                                                {{ item.content }}
                                            </el-radio>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                v-show="mondifyTestProblem"
                                class="quizzesQuestion"
                            >
                                <div class="quizzes-started">
                                    <div class="biaoji">
                                        <img
                                            src="../../../static/images/biaoji.png"
                                            alt=""
                                        />
                                    </div>
                                    <h5>Question 2</h5>
                                    <span>1pts</span>
                                    <ul>
                                        以下哪些是中国省会城市?
                                        <li>
                                            <el-radio v-model="radio" label="1">
                                                True
                                            </el-radio>
                                        </li>
                                        <li>
                                            <el-radio v-model="radio" label="2">
                                                False
                                            </el-radio>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                v-show="testQuestionsisShow"
                                class="questions-style"
                            >
                                <div
                                    v-for="(item, index) in questionList"
                                    :key="index"
                                    class="quizzesTest"
                                >
                                    <el-input
                                        v-model="item.question.title"
                                        placeholder="Search for Quiz"
                                        style="width: 30%"
                                    />
                                    <el-select
                                        v-model="questionType.value"
                                        placeholder="请选择问题"
                                        style="width: 30%"
                                    >
                                        <el-option
                                            label="单选"
                                            value="1"
                                            @click.native="testSelect"
                                        />
                                        <el-option
                                            label="多选"
                                            value="2"
                                            @click.native="testFile"
                                        />
                                        <el-option
                                            label="判断"
                                            value="3"
                                            @click.native="trueFalse"
                                        />
                                        <!--<el-option label="多项下拉题" value="4"></el-option>-->
                                        <!--<el-option label="匹配题" value="5"></el-option>-->
                                        <el-option
                                            label="简答题"
                                            value="6"
                                            @click.native="SimpleAnswer"
                                        />
                                        <!--<el-option label="文件上传题" value="7"></el-option>-->
                                        <!--<el-option label="文本题" value="8"></el-option>-->
                                    </el-select>
                                    <el-input
                                        v-model="item.question.score"
                                        style="width: 6%;float: right"
                                    />
                                    <span style="float: right;line-height: 40px"
                                        >{{ item.question.score }} pts</span
                                    >
                                    <p>
                                        Enter your question and multiple answers
                                    </p>
                                    <div>
                                        <h4>Message Text</h4>
                                        <div class="messagetext">
                                            <ckeditor
                                                v-model="item.question.content"
                                                :editor="editor"
                                                :config="editorConfig"
                                            />
                                        </div>
                                        <div v-show="testQuestionsselect">
                                            <!--:model="dynamicValidateForm"-->
                                            <!--单选-->
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item>
                                                    <el-radio-group
                                                        v-model="testRadio"
                                                        style="width: 60%"
                                                    >
                                                        <el-radio
                                                            v-for="(domain,
                                                            index) in item
                                                                .question
                                                                .options"
                                                            :key="domain.key"
                                                            :label="index"
                                                            style="display: block;"
                                                        >
                                                            <span
                                                                class="opt-answer-code"
                                                                >{{
                                                                    codeObjList[
                                                                        index
                                                                    ].name
                                                                }}</span
                                                            >
                                                            <el-input
                                                                v-model="
                                                                    domain.content
                                                                "
                                                                type="textarea"
                                                            />
                                                            <i
                                                                class="el-icon-edit"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                            <i
                                                                class="el-icon-delete"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                        </el-radio>
                                                    </el-radio-group>
                                                </el-form-item>

                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="
                                                        item.question
                                                            .correctComment
                                                    "
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="
                                                        item.question
                                                            .wrongComment
                                                    "
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="
                                                            item.question
                                                                .generalComment
                                                        "
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="
                                                            questionMondify(
                                                                item
                                                            )
                                                        "
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                        <div v-show="testQuestionsfile">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item>
                                                    <el-checkbox-group
                                                        v-model="quizzChecked"
                                                        style="width: 60%"
                                                    >
                                                        <el-checkbox
                                                            v-for="(domain,
                                                            index) in item
                                                                .question
                                                                .options"
                                                            :key="domain.key"
                                                            :label="index"
                                                            style="display: block;"
                                                        >
                                                            <span
                                                                class="opt-answer-code"
                                                                >{{
                                                                    codeObjList[
                                                                        index
                                                                    ].name
                                                                }}</span
                                                            >
                                                            <el-input
                                                                v-model="
                                                                    domain.content
                                                                "
                                                                type="textarea"
                                                            />
                                                            <i
                                                                class="el-icon-edit"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                            <i
                                                                class="el-icon-delete"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="
                                                        item.question
                                                            .correctComment
                                                    "
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="
                                                        item.question
                                                            .wrongComment
                                                    "
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="
                                                            item.question
                                                                .generalComment
                                                        "
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="
                                                            questionMondify(
                                                                item
                                                            )
                                                        "
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                        <div v-show="testQuestionsTrueFalse">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-radio-group
                                                    v-model="testRadio"
                                                    style="width: 60%"
                                                >
                                                    <el-radio
                                                        v-for="(domain,
                                                        index) in QuestionOptions"
                                                        :key="domain.key"
                                                        :label="index"
                                                        style="display: block;"
                                                    >
                                                        <span
                                                            class="opt-answer-code"
                                                            >{{
                                                                codeObjList[
                                                                    index
                                                                ].name
                                                            }}</span
                                                        >
                                                        <el-input
                                                            v-model="
                                                                domain.content
                                                            "
                                                            type="textarea"
                                                        />
                                                    </el-radio>
                                                </el-radio-group>
                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="
                                                        item.question
                                                            .correctComment
                                                    "
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="
                                                        item.question
                                                            .wrongComment
                                                    "
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="
                                                            item.question
                                                                .generalComment
                                                        "
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="
                                                            questionMondify(
                                                                item
                                                            )
                                                        "
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>

                                        <div v-show="testQuestionsSimpleAnswer">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="
                                                            item.question
                                                                .generalComment
                                                        "
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="
                                                            questionMondify(
                                                                item
                                                            )
                                                        "
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-show="testQuestionsisShow"
                                class="questions-style"
                            >
                                <div class="quizzesTest">
                                    <el-input
                                        v-model="titles"
                                        placeholder="Search for Quiz"
                                        style="width: 30%"
                                    />
                                    <el-select
                                        v-model="questionType.value"
                                        placeholder="请选择问题"
                                        style="width: 30%"
                                    >
                                        <el-option
                                            label="单选"
                                            value="1"
                                            @click.native="testSelect"
                                        />
                                        <el-option
                                            label="多选"
                                            value="2"
                                            @click.native="testFile"
                                        />
                                        <el-option
                                            label="判断"
                                            value="3"
                                            @click.native="trueFalse"
                                        />
                                        <!--<el-option label="多项下拉题" value="4"></el-option>-->
                                        <!--<el-option label="匹配题" value="5"></el-option>-->
                                        <el-option
                                            label="简答题"
                                            value="6"
                                            @click.native="SimpleAnswer"
                                        />
                                        <!--<el-option label="文件上传题" value="7"></el-option>-->
                                        <!--<el-option label="文本题" value="8"></el-option>-->
                                    </el-select>
                                    <el-input
                                        v-model="score"
                                        style="width: 6%;float: right"
                                    />
                                    <span
                                        style="float: right;line-height: 40px"
                                    >
                                        pts</span
                                    >
                                    <p>
                                        Enter your question and multiple answers
                                    </p>
                                    <div>
                                        <h4>Message Text</h4>
                                        <div class="messagetext">
                                            <ckeditor
                                                v-model="content"
                                                :editor="editor"
                                                :config="editorConfig"
                                            />
                                        </div>
                                        <div v-show="testQuestionsselect">
                                            <!--:model="dynamicValidateForm"-->
                                            <!--单选-->
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <!--<el-form-item-->
                                                <!--v-for="(domain,index) in QuestionOptions"-->
                                                <!--:key="domain.key"-->
                                                <!--label=""-->
                                                <!--:prop="'domain.' +'.label'"-->
                                                <!--&gt;-->
                                                <!--<el-radio-group v-model="domain.code">-->
                                                <!--<el-radio :label="domain.code" >-->
                                                <!--<span class="opt-answer-code">{{codeObjList[index].name}}</span>-->
                                                <!--<el-input v-model="domain.content" style="width: 50%"></el-input>-->
                                                <!--<i class="el-icon-edit" @click.prevent="removeDomain(domain)"></i>-->
                                                <!--<i class="el-icon-delete" @click.prevent="removeDomain(domain)"></i>-->
                                                <!--</el-radio>-->
                                                <!--</el-radio-group>-->
                                                <!--</el-form-item>-->
                                                <el-form-item>
                                                    <el-radio-group
                                                        v-model="testRadio"
                                                        style="width: 60%"
                                                    >
                                                        <el-radio
                                                            v-for="(domain,
                                                            index) in QuestionOptions"
                                                            :key="domain.key"
                                                            :label="index"
                                                            style="display: block;"
                                                        >
                                                            <span
                                                                class="opt-answer-code"
                                                                >{{
                                                                    codeObjList[
                                                                        index
                                                                    ].name
                                                                }}</span
                                                            >
                                                            <el-input
                                                                v-model="
                                                                    domain.content
                                                                "
                                                                type="textarea"
                                                            />
                                                            <i
                                                                class="el-icon-edit"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                            <i
                                                                class="el-icon-delete"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                        </el-radio>
                                                    </el-radio-group>
                                                </el-form-item>

                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="correctComment"
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="wrongComment"
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                        <div v-show="testQuestionsfile">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item>
                                                    <el-checkbox-group
                                                        v-model="quizzChecked"
                                                        style="width: 60%"
                                                    >
                                                        <el-checkbox
                                                            v-for="(domain,
                                                            index) in QuestionOptions"
                                                            :key="domain.key"
                                                            :label="index"
                                                            style="display: block;"
                                                        >
                                                            <span
                                                                class="opt-answer-code"
                                                                >{{
                                                                    codeObjList[
                                                                        index
                                                                    ].name
                                                                }}</span
                                                            >
                                                            <el-input
                                                                v-model="
                                                                    domain.content
                                                                "
                                                                type="textarea"
                                                            />
                                                            <i
                                                                class="el-icon-edit"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                            <i
                                                                class="el-icon-delete"
                                                                @click.prevent="
                                                                    removeDomain(
                                                                        domain
                                                                    )
                                                                "
                                                            />
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="correctComment"
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="wrongComment"
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                        <div v-show="testQuestionsTrueFalse">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-radio-group
                                                    v-model="testRadio"
                                                    style="width: 60%"
                                                >
                                                    <el-radio
                                                        v-for="(domain,
                                                        index) in QuestionOptions"
                                                        :key="domain.key"
                                                        :label="index"
                                                        style="display: block;"
                                                    >
                                                        <span
                                                            class="opt-answer-code"
                                                            >{{
                                                                codeObjList[
                                                                    index
                                                                ].name
                                                            }}</span
                                                        >
                                                        <el-input
                                                            v-model="
                                                                domain.content
                                                            "
                                                            type="textarea"
                                                        />
                                                    </el-radio>
                                                </el-radio-group>
                                                <el-form-item>
                                                    <el-button
                                                        style="float: left;margin-left: 32%;margin-bottom: 2%"
                                                        @click="addDomain"
                                                    >
                                                        Add Another Answer
                                                    </el-button>
                                                </el-form-item>
                                                <el-input
                                                    v-model="correctComment"
                                                    style="width: 20%;margin-left:10%"
                                                    type="textarea"
                                                />
                                                <el-input
                                                    v-model="wrongComment"
                                                    style="width: 20%"
                                                    type="textarea"
                                                />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>

                                        <div v-show="testQuestionsSimpleAnswer">
                                            <el-form
                                                ref="QuestionOptions"
                                                label-width="200px"
                                                class="demo-dynamic"
                                            >
                                                <el-form-item />
                                                <el-form-item
                                                    label="Explanation"
                                                >
                                                    <el-input
                                                        v-model="generalComment"
                                                        type="textarea"
                                                    />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button>
                                                        Cancel
                                                    </el-button>
                                                    <el-button
                                                        style="background-color: #0138b1;color: white"
                                                        @click="questionAdd"
                                                    >
                                                        Update Question
                                                    </el-button>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="quizzes-search">
                                    <el-input
                                        v-model="input21"
                                        :placeholder="
                                            $t('message.Search_for_Quiz')
                                        "
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                                <div class="questions">
                                    <el-button @click.native="testQuestions">
                                        <i
                                            class="el-icon-circle-plus-outline"
                                        />{{ $t("message.New_Question") }}
                                    </el-button>
                                    <el-button
                                        icon="el-icon-circle-plus-outline"
                                    >
                                        {{ $t("message.New_Question_Group") }}
                                    </el-button>
                                </div>
                            </div>
                            <div class="questions-checkbox">
                                <el-checkbox
                                    v-model="checked5"
                                    style="display: block;margin-top: 2%"
                                >
                                    {{ $t("message.Notify_users_that") }}
                                </el-checkbox>
                            </div>
                            <el-button>{{ $t("message.Cancel") }}</el-button>
                            <el-button
                                style="float: right;background-color: #0138b1;color: white"
                            >
                                {{ $t("message.Save") }}
                            </el-button>
                            <el-button
                                style="float: right"
                                @click="savePublish"
                            >
                                {{ $t("message.Save_Publish") }}
                            </el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div style="width: 26%;" class="quizeRight">
                <el-tabs v-model="quizeRight">
                    <el-tab-pane :label="$t('message.Links')" name="first">
                        <p>
                            <
                            {{
                                $t(
                                    "message.link_to_other_content_in_the_course"
                                )
                            }}
                        </p>
                        <div class="quizeLinks">
                            <el-collapse accordion>
                                <div class="left-quize">
                                    <el-collapse-item>
                                        <template slot="title">
                                            {{ $t("message.Pages") }}
                                        </template>
                                        <div>page</div>
                                        <div>page</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Assignments')"
                                    >
                                        <div>123</div>
                                        <div>123</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Quizzes')"
                                    >
                                        <div>456</div>
                                        <div>456</div>
                                        <div>456</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Announcements')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Discussions')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Modules')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                                <div class="left-quize">
                                    <el-collapse-item
                                        :title="$t('message.Course_Navigation')"
                                    >
                                        <div>qq</div>
                                        <div>qq</div>
                                    </el-collapse-item>
                                </div>
                            </el-collapse>
                        </div>
                        <!--<div>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>-->
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Files')" name="second">
                        <div class="files-rightfiles-right">
                            <p>
                                {{
                                    $t(
                                        "message.link_to_other_content_in_the_course"
                                    )
                                }}
                            </p>
                            <div class="filesRight">
                                <el-scrollbar style="height: 100%;">
                                    <el-tree
                                        :data="data"
                                        :props="defaultProps"
                                        @node-click="handleNodeClick"
                                    />
                                </el-scrollbar>
                            </div>
                            <el-button
                                v-show="uplondFiles"
                                style="width: 100%;margin-bottom: 8%;background-color: #26be96;color: #fff"
                                @click="fileUplond"
                            >
                                <img
                                    src="../../../static/images/Creat.png"
                                    alt=""
                                />
                                {{ $t("message.Upload_a_new_file") }}
                            </el-button>
                            <div v-show="uplondFile">
                                <el-button
                                    style="width: 100%;margin-bottom: 8%;background-color: #999999;color: white"
                                    @click="fileUplonds"
                                >
                                    <img
                                        src="../../../static/images/remove.png"
                                        alt=""
                                    />
                                    {{ $t("message.Cancel_file_upload") }}
                                </el-button>
                                <el-upload
                                    class="upload-demo"
                                    action="action"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                                >
                                    <el-button size="small" type="primary">
                                        {{ $t("message.Select_files") }}
                                    </el-button>
                                </el-upload>

                                <P style="margin-top: 4%">
                                    {{ $t("message.Folder") }}
                                </P>
                                <el-select
                                    v-model="formLabelAlign.region"
                                    placeholder="Assignments"
                                    style="width: 100%"
                                >
                                    <el-option
                                        label="区域一"
                                        value="shanghai"
                                    />
                                    <el-option label="区域二" value="beijing" />
                                </el-select>

                                <el-button
                                    style="width: 30%;margin-top: 4%;background-color: #0138b1;color: #fff;float: right"
                                >
                                    {{ $t("message.Upload") }}
                                </el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.Images')" name="third">
                        <div class="files-right">
                            <p>
                                {{
                                    $t(
                                        "message.link_to_other_content_in_the_course"
                                    )
                                }}
                            </p>
                            <el-button
                                v-show="flickrImages"
                                style="width: 100%;margin-bottom: 8%;"
                                @click="ImagesFlickr"
                            >
                                <img
                                    src="../../../static/images/search-qianhui.png"
                                    alt=""
                                />
                                {{ $t("message.Search_Flickr") }}
                            </el-button>
                            <div v-show="flickrImage">
                                <el-button
                                    style="width: 100%;margin-bottom: 8%;"
                                    @click="ImagesFlickrs"
                                >
                                    <img
                                        src="../../../static/images/remove.png"
                                        alt=""
                                    />
                                    {{ $t("message.Search_Flickr") }}ssss
                                </el-button>
                                <p>Flickr:Creative Commons Search</p>
                                <el-input
                                    v-model="input"
                                    :placeholder="
                                        $t('message.Enter_search_terms')
                                    "
                                />
                                <el-button
                                    style="width: 30%;margin-top: 4%;float: right"
                                >
                                    {{ $t("message.Search") }}
                                </el-button>
                            </div>
                            <el-button
                                v-show="uplondImages"
                                style="width: 100%;margin: 4% 0;background-color: #26be96;color: #fff"
                                @click="ImagesUpload"
                            >
                                <img
                                    src="../../../static/images/Creat.png"
                                    alt=""
                                />
                                {{ $t("message.Upload_a_new_image") }}
                            </el-button>
                            <div v-show="uplondImage">
                                <el-button
                                    style="width: 100%;margin: 4% 0;background-color: #999999;color: white"
                                    @click="ImagesUploads"
                                >
                                    <img
                                        src="../../../static/images/remove.png"
                                        alt=""
                                    />
                                    {{ $t("message.Cancel_image_upload") }}
                                </el-button>
                                <el-upload
                                    class="upload-demo"
                                    action="action"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                                >
                                    <el-button size="small" type="primary">
                                        {{ $t("message.Select_files") }}
                                    </el-button>
                                </el-upload>
                                <P style="margin-top: 4%">
                                    {{ $t("message.Folder") }}
                                </P>
                                <el-select
                                    v-model="formLabelAlign.region"
                                    placeholder="Assignments"
                                    style="width: 100%"
                                >
                                    <el-option
                                        label="区域一"
                                        value="shanghai"
                                    />
                                    <el-option label="区域二" value="beijing" />
                                </el-select>

                                <el-button
                                    style="width: 30%;margin-top: 4%;background-color: #0138b1;color: #fff;float: right"
                                >
                                    {{ $t("message.Upload") }}
                                </el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
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
                                        <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                                        <img
                                            src="../../../static/images/spread-big.png"
                                            alt=""
                                            style="vertical-align: baseline"
                                        />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <img
                                                src="../../../static/images/Lock.png"
                                                alt=""
                                            />
                                            Lock this Quiz Now
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <img
                                                src="../../../static/images/delete.png"
                                                alt=""
                                            />
                                            Delete
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <img
                                                src="../../../static/images/share.png"
                                                alt=""
                                            />
                                            Share to Commons
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </div>
                    <!--<img src="../../../static/images/spread-big.png" alt=""
               style="float: right;padding-top: 4px;cursor: pointer">-->

                    <el-button
                        icon="el-icon-edit"
                        style="float: right;margin: 0 2%"
                    >
                        {{ $t("message.Edit") }}
                    </el-button>
                    <el-button style="float: right" @click="startedQuizzes">
                        {{ $t("message.Preview") }}
                    </el-button>
                    <el-button
                        type="success"
                        icon="el-icon-circle-check"
                        style="float: right"
                    >
                        {{ $t("message.Published") }}
                    </el-button>
                </div>
                <div class="quizzesPreview">
                    <h4 style="padding:2% 0 0 2%">
                        {{ quizInfoGetList.title }}
                    </h4>
                    <div class="quizzes-info">
                        <p style="padding: 1% 2%;border-bottom: 1px solid #ccc">
                            This is quiz of unit 1
                        </p>
                        <div class="quizInfo">
                            <ul style="text-align: center">
                                <li>
                                    <h5>{{ $t("message.Quiz_Type") }}</h5>
                                    <span>{{ quizInfoGetList.type }}</span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.Points") }}</h5>
                                    <span>{{
                                        quizInfoGetList.totalScore
                                    }}</span>
                                </li>
                                <!-- <li><h5>{{$t('message.Assignment_Group')}}</h5>
                  <span>assignment </span>
                </li>
                <li><h5>{{$t('message.Shuffle_Answers')}}</h5>
                  <span>No</span>
                </li>-->
                                <li>
                                    <h5>{{ $t("message.Time_Limit") }}</h5>
                                    <span>
                                        {{
                                            quizInfoGetList.createTime
                                                | formatDate(time)
                                        }}</span
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
                                        >Yes</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.allowMultiAttempt ==
                                                '0'
                                        "
                                        >No
                                    </span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.View_Responses") }}</h5>
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '0'
                                        "
                                        >不显示</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showReplyStrategy ==
                                                '1'
                                        "
                                        >每次提交后</span
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
                                        >不显示</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showAnswerStrategy ==
                                                '1'
                                        "
                                        >每次提交后</span
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
                                        >全部显示</span
                                    >
                                    <span
                                        v-if="
                                            quizInfoGetList.showQuestionStrategy ==
                                                '1'
                                        "
                                        >每页一个</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div>
                            <el-table
                                :data="quizInfoGetTaba"
                                style="width: 100%"
                            >
                                <el-table-column
                                    :label="$t('message.Due')"
                                    prop="limitTime"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        <p class="time">
                                            {{
                                                scope.row.limitTime
                                                    | formatDate(time)
                                            }}
                                        </p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('message.For')"
                                    prop="typeName"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                />
                                <el-table-column
                                    :label="$t('message.Auailable_from')"
                                    prop="endTime"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        <p class="time">
                                            {{
                                                scope.row.endTime
                                                    | formatDate(time)
                                            }}
                                        </p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    :label="$t('message.Until')"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                >
                                    <template slot-scope="scope">
                                        <p class="time">
                                            {{
                                                scope.row.startTime
                                                    | formatDate(time)
                                            }}
                                        </p>
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
            </div>
            <div class="quizzesPublish-right">
                <div>
                    <p>{{ $t("message.Related_items") }}</p>
                    <div class="importIntoCourse">
                        <el-button plain class="quizzes-right">
                            <img
                                src="../../../static/images/shezhi.png"
                                alt=""
                            />
                            {{ $t("message.Moderate_This_Quiz") }}
                        </el-button>
                    </div>
                    <div class="importIntoCourse">
                        <el-button
                            class="quizzes-right"
                            style="color: #00eb00;border: 1px solid #00eb00;"
                        >
                            <img
                                src="../../../static/images/UPLOAD.png"
                                alt=""
                            />
                            {{ $t("message.Download_All_Files") }}
                        </el-button>
                    </div>
                    <div class="importIntoCourse">
                        <el-button plain class="quizzes-right">
                            <img
                                src="../../../static/images/jifen.png"
                                alt=""
                            />
                            speedGrade
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="quizzesStarted">
            <div class="quizzesPreviewStarted">
                <h4>单元测试一</h4>
                <div class="caution">
                    <!--警示-->
                    <img src="../../../static/images/jingshi.png" alt="" />
                    {{ $t("message.this_is_a_preview_of") }}
                </div>
                <div class="quizzesStartTime">
                    <h4>{{ $t("message.Started") }}</h4>
                    <span>Dec 28 at 10:55am</span>
                </div>
                <div class="quizzesStartTime">
                    <h4>Quiz Instructions</h4>
                    <span>this is quiz of unit 1</span>
                </div>
                <div class="quizzesQuestion">
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>Question 2</h5>
                        <span>1pts</span>
                        <ul>
                            以下哪些是中国省会城市?
                            <li>
                                <el-checkbox v-model="checked">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked1">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked2">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked3">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked4">
                                    备选项
                                </el-checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="quizzesQuestion">
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>Question 2</h5>
                        <span>1pts</span>
                        <ul>
                            以下哪些是中国省会城市?
                            <li>
                                <el-checkbox v-model="checked">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked1">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked2">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked3">
                                    备选项
                                </el-checkbox>
                            </li>
                            <li>
                                <el-checkbox v-model="checked4">
                                    备选项
                                </el-checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="quizzesQuestion">
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>Question 2</h5>
                        <span>1pts</span>
                        <ul>
                            以下哪些是中国省会城市?
                            <li>
                                <el-radio v-model="radio" label="1">
                                    True
                                </el-radio>
                            </li>
                            <li>
                                <el-radio v-model="radio" label="2">
                                    False
                                </el-radio>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="quizzesQuestion">
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>Question 2</h5>
                        <span>1pts</span>
                        <ul>
                            <li>
                                <div class="question-select">
                                    <span>河南的省会城市是？ </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Select]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="郑州"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                                <div class="question-select">
                                    <span>河南的省会城市是？ </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Select]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="郑州"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                                <div class="question-select">
                                    <span>河南的省会城市是？ </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Select]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="郑州"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                                <div class="question-select">
                                    <span>河南的省会城市是？ </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Select]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="郑州"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                            </li>
                            <li />
                        </ul>
                    </div>
                </div>
                <div class="quizzesQuestion">
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>Question 2</h5>
                        <span>1pts</span>
                        <ul>
                            请上传你的作品图片或者视频？
                            <li>
                                <el-upload
                                    class="upload-demo"
                                    action="action"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                                >
                                    <el-button size="small" type="primary">
                                        选择文件
                                    </el-button>
                                </el-upload>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="quizzesQuestion">
                    <div class="quizzes-started">
                        <div class="biaoji">
                            <img
                                src="../../../static/images/biaoji.png"
                                alt=""
                            />
                        </div>
                        <h5>Question 2</h5>
                        <span>1pts</span>
                        <ul>
                            请对下面的省会城市进行匹配?
                            <li>
                                <span>A</span> <span>北京</span>
                                <div style="padding-left: 60%">
                                    <span>A </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Choose]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="区域一"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                            </li>
                            <li>
                                <span>A</span>
                                <el-tooltip
                                    class="item"
                                    effect="light"
                                    content="北京 北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京"
                                    placement="top"
                                >
                                    <span class="started-choose">
                                        北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京
                                    </span>
                                </el-tooltip>
                                <div style="padding-left: 60%">
                                    <span>A </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Choose]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="区域一"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                            </li>
                            <li>
                                <span>A</span> <span>北京</span>
                                <div style="padding-left: 60%">
                                    <span>A </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Choose]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="区域一"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                            </li>
                            <li>
                                <span>A</span> <span>北京</span>
                                <div style="padding-left: 60%">
                                    <span>A </span>
                                    <el-select
                                        v-model="formLabelAlign.region"
                                        placeholder="[Choose]"
                                        style="margin-bottom: 2%;"
                                    >
                                        <el-option
                                            label="区域一"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="区域二"
                                            value="beijing"
                                        />
                                    </el-select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="float: right;margin-top: 1%">
                    <span style="color:#666666">Quiz saved at 11:26am</span>
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
                            <img src="../../../static/images/edit.png" alt="" />
                            {{ $t("message.Keep_Editing_This_Quiz") }}
                        </el-button>
                        <div class="keepQuestions">
                            <ul>
                                <h4>{{ $t("message.Question") }}</h4>
                                <li><span>Questions 1</span></li>
                                <li><span>Questions 1</span></li>
                                <li><span>Questions 1</span></li>
                                <li><span>Questions 1</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style="display: inline-block;padding: 4% 0">
                                {{ $t("message.Time_Elapsed") }}:
                            </h4>
                            <span style="color:#0138b1;font-weight: 600">{{
                                $t("message.Hide")
                            }}</span>
                        </div>
                        <div style="color: #999999">
                            <span>12 </span><span> Minutes,</span><span>10</span
                            ><span> Seconds</span>
                        </div>
                    </div>
                </div>
            </div>
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
                                        <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                                        <img
                                            src="../../../static/images/spread-big.png"
                                            alt=""
                                            style="vertical-align: baseline"
                                        />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <img
                                                src="../../../static/images/Lock.png"
                                                alt=""
                                            />
                                            Lock this Quiz Now
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <img
                                                src="../../../static/images/delete.png"
                                                alt=""
                                            />
                                            Delete
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <img
                                                src="../../../static/images/share.png"
                                                alt=""
                                            />
                                            Share to Commons
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </div>
                    <!--<img src="../../../static/images/spread-big.png" alt=""
               style="float: right;padding-top: 4px;cursor: pointer">-->
                    <el-button
                        icon="el-icon-edit"
                        style="float: right;margin: 0 2%"
                    >
                        {{ $t("message.Edit") }}
                    </el-button>
                    <el-button style="float: right" @click="startedQuizzes">
                        {{ $t("message.Preview") }}
                    </el-button>
                    <el-button
                        type="success"
                        icon="el-icon-circle-check"
                        style="float: right"
                    >
                        {{ $t("message.Published") }}
                    </el-button>
                </div>
                <div class="quizzesPreviewSubmit">
                    <div class="caution">
                        <!--警示-->
                        <img src="../../../static/images/jingshi.png" alt="" />
                        {{ $t("message.this_is_a_preview_of") }}
                    </div>
                    <h4 style="padding:2% 0 0 2%">
                        单元一测试
                    </h4>
                    <div class="quizzes-info">
                        <p style="padding: 1% 2%;border-bottom: 1px solid #ccc">
                            This is quiz of unit 1
                        </p>
                        <div class="quizInfo">
                            <ul style="text-align: center">
                                <li>
                                    <h5>{{ $t("message.Quiz_Type") }}</h5>
                                    <span>Graded Quiz </span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.Points") }}</h5>
                                    <span>12 </span>
                                </li>
                                <li>
                                    <h5>
                                        {{ $t("message.Assignment_Group") }}
                                    </h5>
                                    <span>assignment </span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.Shuffle_Answers") }}</h5>
                                    <span>No</span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.Time_Limit") }}</h5>
                                    <span> No Time Limit</span>
                                </li>
                                <li>
                                    <h5>
                                        {{ $t("message.Multiple_Attempts") }}
                                    </h5>
                                    <span>No </span>
                                </li>
                                <li>
                                    <h5>{{ $t("message.View_Responses") }}</h5>
                                    <span>Always</span>
                                </li>
                                <li>
                                    <h5>
                                        {{ $t("message.Show_Correct_Answers") }}
                                    </h5>
                                    <span>Immediately</span>
                                </li>
                                <li>
                                    <h5>
                                        {{
                                            $t("message.One_Question_at_a_Time")
                                        }}
                                    </h5>
                                    <span>No</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column
                                    :label="$t('message.Due')"
                                    prop="due"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                />
                                <el-table-column
                                    :label="$t('message.For')"
                                    prop="every"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                />
                                <el-table-column
                                    :label="$t('message.Auailable_from')"
                                    prop="auailable"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                />
                                <el-table-column
                                    :label="$t('message.Until')"
                                    prop="until"
                                    align="center"
                                    data-placement="auto"
                                    :show-overflow-tooltip="true"
                                    min-width="24%"
                                />
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
                        <ul>
                            <li>
                                {{ $t("message.Score_for_this_quiz") }} :
                                <span>1 out of 10*</span>
                            </li>
                            <li>
                                {{ $t("message.submitted_Dec") }} 25 at 14.44pm
                            </li>
                            <li>This attempt took 12 minutes</li>
                        </ul>
                    </div>
                    <div>
                        <div class="quizzes-question">
                            <h5>Question 1</h5>
                            <span>1pts</span>
                            <ul>
                                以下哪些是中国省会城市?
                                <li>
                                    <img
                                        src="../../../static/images/youranswer.png"
                                        alt=""
                                    />
                                    <el-radio v-model="radio" label="1">
                                        备选项1
                                    </el-radio>
                                </li>
                                <li>
                                    <img
                                        src="../../../static/images/correct.png"
                                        alt=""
                                    />
                                    <el-radio v-model="radio" label="2">
                                        备选项
                                    </el-radio>
                                </li>
                                <li>
                                    <el-radio v-model="radio" label="3">
                                        备选项
                                    </el-radio>
                                </li>
                                <li>
                                    <el-radio v-model="radio" label="4">
                                        备选项
                                    </el-radio>
                                </li>
                            </ul>
                        </div>
                        <div class="quizzes-question">
                            <h5>Question 2</h5>
                            <span>1pts</span>
                            <ul>
                                以下哪些是中国省会城市?
                                <li>
                                    <img
                                        src="../../../static/images/correctanswer.png"
                                        alt=""
                                    />
                                    <el-checkbox v-model="checked">
                                        备选项
                                    </el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox v-model="checked1">
                                        备选项
                                    </el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox v-model="checked2">
                                        备选项
                                    </el-checkbox>
                                </li>
                                <li>
                                    <img
                                        src="../../../static/images/correctanswer.png"
                                        alt=""
                                    />
                                    <el-checkbox v-model="checked3">
                                        备选项
                                    </el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox v-model="checked4">
                                        备选项
                                    </el-checkbox>
                                </li>
                            </ul>
                        </div>
                        <div class="quizzes-question">
                            <h5>Question 3</h5>
                            <span>1pts</span>

                            <ul>
                                以下哪些是中国省会城市?
                                <li>
                                    <img
                                        src="../../../static/images/youranswer.png"
                                        alt=""
                                    />
                                    <el-radio v-model="radio" label="1">
                                        True
                                    </el-radio>
                                </li>
                                <li>
                                    <el-radio v-model="radio" label="2">
                                        False
                                    </el-radio>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <v-goTop />
                </div>
            </div>
            <div class="quizzesPublish-right">
                <div>
                    <p>{{ $t("message.Related_items") }}</p>
                    <div class="importIntoCourse">
                        <el-button
                            style="color: #00eb00;border: 1px solid #00eb00;"
                        >
                            <img
                                src="../../../static/images/UPLOAD.png"
                                alt=""
                            />
                            {{ $t("message.Download_All_Files") }}
                        </el-button>
                    </div>
                    <div class="importIntoCourse">
                        <el-button plain>
                            <img src="../../../static/images/edit.png" alt="" />
                            {{ $t("message.Keep_Editing_This_Quiz") }}
                        </el-button>
                    </div>
                    <div>
                        <h4 style="display: inline-block;padding: 4% 0">
                            Time Elapsed:
                        </h4>
                    </div>
                    <div class="submissionDtails">
                        <ul>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.time") }}:
                                </p>
                                <span> 11</span>minutes
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Current_Score") }} :
                                </p>
                                <span>1</span> out of <span>7*</span>
                            </li>
                            <li>
                                <p style="width: 50%;display: inline-block">
                                    {{ $t("message.Kept_Score") }} :
                                </p>
                                <span>1</span> out of <span>7</span>
                            </li>
                            <li>
                                <span class="some"
                                    >*Some questions not yet graded</span
                                >
                            </li>
                            <li>
                                <p class="preview" @click="startedQuizzes">
                                    {{ $t("message.Preview_thie_Quiz_Again") }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import eventBus from "@/eventBus";
import goTop from "@/utils/goTop.vue";
import { formatDate } from "@/utils/date";

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
            testRadio: 1,
            quizzChecked: [],
            title: this.$t("message.Unnamed_quiz"),
            titles: this.$t("message.Question"),
            description: "",
            type: {
                value: "1"
            },
            time: "",
            quizeValue: false,
            quizeScore: false,
            quizeSubmissions: false,
            score: "",
            courseId: 1,
            name: "",
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
            LockQuestions: false,
            showReply: false,
            showAnswer: false,
            quizPageModify: false,
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
            quizInfor: [],
            correctComment: "",
            wrongComment: "",
            generalComment: "",
            quizadd: "",
            datas: "",
            quizInfoGetList: [],
            quizeDeleteDialogVisible: false,
            optionContentMaxLength: 100,
            action: process.env.NODE_ENV,
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
            quizzesPublish: false,
            quizzesStarted: false,
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
            tableData: [
                {
                    due: "Dec1",
                    every: "Everyone",
                    auailable: "Dec 22 at 14:44pm",
                    until: "Dec 22 at 14:44pm"
                },
                {
                    due: "Dec1",
                    every: "Everyone",
                    auailable: "Dec 22 at 14:44pm",
                    until: "Dec 22 at 14:44pm"
                },
                {
                    due: "Dec1",
                    every: "Everyone",
                    auailable: "Dec 22 at 14:44pm",
                    until: "Dec 22 at 14:44pm"
                }
            ],
            multipleSelection: [],
            value1: null,
            tableData3: [
                {
                    date: "2016-05-0-032016-05-032016-05-03016-05-03",
                    pts: "2pts"
                },
                {
                    date: "2016-05-02",
                    pts: "2pts"
                },
                {
                    date: "2016-05-04",
                    pts: "2pts"
                },
                {
                    date: "2016-05-01",
                    pts: "2pts"
                },
                {
                    date: "2016-05-08",
                    pts: "2pts"
                },
                {
                    date: "2016-05-06",
                    pts: "2pts"
                },
                {
                    date: "2016-05-07",
                    pts: "2pts"
                }
            ],
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

            data: [
                {
                    label: "一级 1",
                    children: [
                        {
                            label: "二级 1-1",
                            children: [
                                {
                                    label: "三级 1-1-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 2",
                    children: [
                        {
                            label: "二级 2-1",
                            children: [
                                {
                                    label: "三级 2-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 2-2",
                            children: [
                                {
                                    label: "三级 2-2-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 3",
                    children: [
                        {
                            label: "二级 3-1",
                            children: [
                                {
                                    label: "三级"
                                }
                            ]
                        },
                        {
                            label: "二级 3-2",
                            children: [
                                {
                                    label: "三级 3-2-1"
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            initMount: 0
        };
    },
    mounted() {
        this.quizInforList();
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
        startedQuizzes() {
            this.quizPageList = false;
            this.quizPageAdd = false;
            this.quizPageModify = false;
            this.quizzesPublish = false;
            this.quizzesStarted = true;
            this.quizzesSubmit = false;
        },
        submitQuizzes() {
            this.quizPageList = false;
            this.quizPageAdd = false;
            this.quizPageModify = false;
            this.quizzesPublish = false;
            this.quizzesStarted = false;
            this.quizzesSubmit = true;
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
        showQuizes() {
            if (!this.showReplyStrategy1) {
                this.showReplyStrategy = 0;
            } else if (this.showReplyStrategy2) {
                this.showReplyStrategy = 2;
            } else {
                this.showReplyStrategy = 1;
            }
            if (!this.showAnswerStrategy1) {
                this.showAnswerStrategy = 0;
            } else if (this.showAnswerStrategy2) {
                this.showAnswerStrategy = 2;
            } else {
                this.showAnswerStrategy = 1;
            }
            const quize = {
                courseId: 1,
                title: this.title,
                description: this.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.courseId,
                score: this.score,
                allowAnonymous: Number(this.allowAnonymous),
                isShuffleAnswer: Number(this.isShuffleAnswer),
                timeLimit: this.timeLimit,
                allowMultiAttempt: Number(this.allowMultiAttempt),
                attemptNumber: this.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: this.showReplyStrategy,
                showAnswerStrategy: this.showAnswerStrategy,
                showAnswerStartTime: this.showAnswerStartTime,
                showAnswerEndTime: this.showAnswerEndTime,
                showQuestionStrategy: Number(this.showQuestionStrategy),
                isLockRepliedQuestion: Number(this.isLockRepliedQuestion),
                isNeedAccessCode: Number(this.isNeedAccessCode),
                accessCode: this.accessCode,
                isFilterIP: Number(this.isFilterIP),
                filterIpAddress: this.filterIpAddress,
                version: "20",
                status: "0",
                totalQuestions: "0",
                totalScore: "23",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = true;
                        this.quizPageModify = false;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGet();
                        this.quizadd = res.data.message;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        showQuize(id) {
            // let params = {
            //   id: id,
            // };
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/list?id=${id}`)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = true;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfor = res.data.entity;
                        this.mondifyquizItem(id);
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
            const param = {
                courseId: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: param
                })
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
        groupShow3() {
            this.quizeValue = true;
            this.quizeScore = true;
            this.quizeSubmissions = true;
            const param = {
                courseId: this.courseId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: param
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.assignment = res.data.entity;
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
        quizeSure() {
            // debugger;
            if (!this.showReplyStrategy1) {
                this.showReplyStrategy = 0;
            } else if (this.showReplyStrategy2) {
                this.showReplyStrategy = 2;
            } else {
                this.showReplyStrategy = 1;
            }
            if (!this.showAnswerStrategy1) {
                this.showAnswerStrategy = 0;
            } else if (this.showAnswerStrategy2) {
                this.showAnswerStrategy = 2;
            } else {
                this.showAnswerStrategy = 1;
            }
            const quize = {
                courseId: 1,
                title: this.title,
                description: this.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.courseId,
                score: this.score,
                allowAnonymous: Number(this.allowAnonymous),
                isShuffleAnswer: Number(this.isShuffleAnswer),
                timeLimit: this.timeLimit,
                allowMultiAttempt: Number(this.allowMultiAttempt),
                attemptNumber: this.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: this.showReplyStrategy,
                showAnswerStrategy: this.showAnswerStrategy,
                showAnswerStartTime: this.showAnswerStartTime,
                showAnswerEndTime: this.showAnswerEndTime,
                showQuestionStrategy: Number(this.showQuestionStrategy),
                isLockRepliedQuestion: Number(this.isLockRepliedQuestion),
                isNeedAccessCode: Number(this.isNeedAccessCode),
                accessCode: this.accessCode,
                isFilterIP: Number(this.isFilterIP),
                filterIpAddress: this.filterIpAddress,
                version: "20",
                status: "0",
                totalQuestions: "0",
                totalScore: "23",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGet();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizeSavePublish() {
            if (!this.showReplyStrategy1) {
                this.showReplyStrategy = 0;
            } else if (this.showReplyStrategy2) {
                this.showReplyStrategy = 2;
            } else {
                this.showReplyStrategy = 1;
            }
            if (!this.showAnswerStrategy1) {
                this.showAnswerStrategy = 0;
            } else if (this.showAnswerStrategy2) {
                this.showAnswerStrategy = 2;
            } else {
                this.showAnswerStrategy = 1;
            }
            const quize = {
                courseId: 1,
                title: this.title,
                description: this.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.courseId,
                score: this.score,
                allowAnonymous: Number(this.allowAnonymous),
                isShuffleAnswer: Number(this.isShuffleAnswer),
                timeLimit: this.timeLimit,
                allowMultiAttempt: Number(this.allowMultiAttempt),
                attemptNumber: this.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: this.showReplyStrategy,
                showAnswerStrategy: this.showAnswerStrategy,
                showAnswerStartTime: this.showAnswerStartTime,
                showAnswerEndTime: this.showAnswerEndTime,
                showQuestionStrategy: Number(this.showQuestionStrategy),
                isLockRepliedQuestion: Number(this.isLockRepliedQuestion),
                isNeedAccessCode: Number(this.isNeedAccessCode),
                accessCode: this.accessCode,
                isFilterIP: Number(this.isFilterIP),
                filterIpAddress: this.filterIpAddress,
                version: "20",
                status: "1",
                totalQuestions: "0",
                totalScore: "23",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGet();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        quizInforList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/quizInfor/pageList?courseId=${this.courseId}`
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.showQuizInforList = res.data.entity.list;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizzStatus(id, status) {
            const quizzes = {
                id,
                status
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/publish/edit`, quizzes)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizInforList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizeDelete(id) {
            const quizId = [];
            quizId.push(id);
            // let quizzes = {
            //   ids: quizId,
            // };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/deletes`, quizId)
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizeDeleteDialogVisible = false;
                        this.quizInforList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizeSureModify(item) {
            // console.log(123,item);
            const modifyQuize = {
                id: item.id,
                courseId: 1,
                title: item.title,
                description: item.description,
                type: item.type,
                assignmentGroupId: this.assignment.courseId,
                score: item.score,
                allowAnonymous: Number(this.allowAnonymous),
                isShuffleAnswer: Number(this.isShuffleAnswer),
                timeLimit: this.timeLimit,
                allowMultiAttempt: Number(this.allowMultiAttempt),
                attemptNumber: this.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: item.showReplyStrategy,
                showAnswerStrategy: item.showAnswerStrategy,
                showAnswerStartTime: this.showAnswerStartTime,
                showAnswerEndTime: this.showAnswerEndTime,
                showQuestionStrategy: Number(this.showQuestionStrategy),
                isLockRepliedQuestion: Number(this.isLockRepliedQuestion),
                isNeedAccessCode: Number(this.isNeedAccessCode),
                accessCode: item.accessCode,
                isFilterIP: Number(this.isFilterIP),
                filterIpAddress: this.filterIpAddress,
                version: "20",
                status: "0",
                totalQuestions: "0",
                totalScore: "23",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/modify`, modifyQuize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGet();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizeSureModifyPublish(item) {
            const modifyQuize = {
                id: item.id,
                courseId: 1,
                title: item.title,
                description: item.description,
                type: item.type,
                assignmentGroupId: this.assignment.courseId,
                score: item.score,
                allowAnonymous: Number(this.allowAnonymous),
                isShuffleAnswer: Number(this.isShuffleAnswer),
                timeLimit: this.timeLimit,
                allowMultiAttempt: Number(this.allowMultiAttempt),
                attemptNumber: this.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: item.showReplyStrategy,
                showAnswerStrategy: item.showAnswerStrategy,
                showAnswerStartTime: this.showAnswerStartTime,
                showAnswerEndTime: this.showAnswerEndTime,
                showQuestionStrategy: Number(this.showQuestionStrategy),
                isLockRepliedQuestion: Number(this.isLockRepliedQuestion),
                isNeedAccessCode: Number(this.isNeedAccessCode),
                accessCode: item.accessCode,
                isFilterIP: Number(this.isFilterIP),
                filterIpAddress: this.filterIpAddress,
                version: "20",
                status: "1",
                totalQuestions: "0",
                totalScore: "23",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/modify`, modifyQuize)
                .then(res => {
                    if (res.data.code == 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfoGet();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        questionAdd() {
            // debugger;
            this.tempOPtions = [];
            // console.log('testRadio', this.testRadio)
            this.QuestionOptions.forEach((el, index) => {
                const tempObj = {};
                tempObj.code = 0;
                tempObj.content = el.content;
                if (this.questionType.value == 1) {
                    tempObj.isCorrect = Number(index == this.testRadio);
                } else if (this.questionType.value == 2) {
                    tempObj.isCorrect = Number(index == this.quizzChecked);
                }
                tempObj.seq = index;
                tempObj.explanation = 0;
                this.tempOPtions.push(tempObj);
            });
            // this.quizeSure();
            const quest = {
                quizId: this.quizadd,
                courseId: 1,
                groupID: 2,
                isTemplate: 0,
                questionBankID: 0,
                questionTemplateId: 0,
                seq: 0,
                correctComment: this.correctComment,
                wrongComment: this.wrongComment,
                generalComment: this.generalComment,
                title: this.titles,
                type: this.questionType.value,
                content: this.content,
                score: this.score,
                options: this.tempOPtions
            };
            // console.log('quest', quest)
            this.$http
                .post(`${process.env.NODE_ENV}/question/add`, quest)
                .then(res => {
                    if (res.data.code == 200) {
                        this.testQuestionsselect = false;
                        this.testQuestionsfile = false;
                        this.testQuestionsTrueFalse = false;
                        this.testQuestionsSimpleAnswer = false;
                        this.TestProblem = true;
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
            const param = {
                quizId: this.quizadd
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizItem/list`, { params: param })
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
        mondifyquizItem(id) {
            this.$http
                .get(`${process.env.NODE_ENV}/quizItem/list?quizId=${id}`)
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
        modifyQuestionStara(id) {
            this.$http
                .get(`${process.env.NODE_ENV}/question/list?id=${id}`)
                .then(res => {
                    if (res.data.code == 200) {
                        this.questionList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        questionMondify(item) {
            const questionMondify = {
                id: item.question.id,
                quizId: item.quizId,
                courseId: 1,
                groupID: 2,
                isTemplate: 0,
                questionBankID: 0,
                questionTemplateId: 0,
                seq: 0,
                correctComment: item.question.correctComment,
                wrongComment: item.question.wrongComment,
                generalComment: item.question.generalComment,
                title: item.question.title,
                type: this.questionType.value,
                content: item.question.content,
                score: item.question.score,
                options: this.tempOPtions
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/question/modify`,
                    questionMondify
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizadd = item.quizId;
                        this.quizItem();
                        this.quizInfoGet();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizInfoGet() {
            const param = {
                data: this.datas
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/get`, { params: param })
                .then(res => {
                    if (res.data.code == 200) {
                        this.quizInfoGetList = res.data.entity;
                        this.quizInfoGetTaba = res.data.entity.assigns;
                        this.quizInfoGetTaba.forEach(el => {
                            /* el.endtime='endTime | formatDate(time)' */
                            if (el.assignType == 1) {
                                el.typeName = "everyone";
                            } else if (el.assignType == 2) {
                                el.typeName = "班级";
                            } else if (el.assignType == 3) {
                                el.typeName = "班级";
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
    }
};
/*eslint-disable no-new*/
</script>

<style scoped="">
.importIntoCourse {
    margin-top: 4%;
}

.el-checkbox__label {
    /*width: 100%;*/
}

.el-button-group .el-button--primary:last-child,
.el-button-group .el-button--info:first-child {
    width: 50%;
}

.elradio-select .el-radio {
    width: 70%;
    margin: 2% 0;
}

.studentRequirements .el-radio {
    width: 70%;
    margin: 2% 0;
}

.module {
    float: right;
    margin-bottom: 2%;
}

.questions {
    float: right;
    margin-bottom: 2%;
}

.questions-style {
    padding-bottom: 2%;
    color: #606266;
    width: 100%;
}

.modules-list {
    border: 1px solid #ccc;
    clear: both;
    /*margin-left: 2%;*/
}

.modules-group {
    border-bottom: 1px dashed #a5afb5;
    padding: 2%;
}

.module-heard {
    border-bottom: none;
    margin-bottom: 2%;
    position: relative;
}

.modules-row {
    position: relative;
    /*padding: 2%;*/
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    border-radius: 3px;
    color: #394b58;
    border: 1px solid #c7cdd1;
    border-top: none;
    border-bottom: none;
}

.content {
    border-top: 1px solid #c7cdd1;
    border-radius: 3px;
}

.modules-successList {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    color: green;
    display: inline-block;
    position: absolute;
    left: 88%;
    top: 24%;
}

.modules-Group {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    display: inline-block;
    position: absolute;
    left: 88%;
    top: 24%;
}

.modules-menuList {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 94%;
    top: 20%;
}

h6 {
    width: 50%;
    padding-left: 140px;
    color: #999999;
}

.moduleSpread ul li {
    width: 180px;
    margin-top: 8px;
}

/* img {
    vertical-align: middle;
    padding-right: 1%;
  }*/

.drag {
    cursor: move;
}

/*summary-Quizzes*/

.summary-Quizzes {
    width: 90%;
    display: inline-block;
}

.quizzes-search {
    display: inline-block;
    padding-left: 2%;
}

.quizeLeft {
    display: inline-block;
    width: 70%;
}

.quizzesPublish-left {
    display: inline-block;
    width: 70%;
}

.quizzesPublish-right {
    float: right;
    padding-right: 2%;
    height: 100%;
    width: 26%;
}

.quizeRight {
    float: right;
    padding-right: 1%;
    height: 100%;
    width: 26%;
}

.quizeRight p {
    font-size: 14px;
    color: #999999;
    padding-bottom: 4%;
}

.left-quize {
    border: 1px solid #ccc;
    margin-bottom: 6%;
    border-radius: 4px;
    padding: 1px 4%;
}

.filesRight {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2% 4%;
    margin: 2% 0;
    height: 200px;
    overflow: auto;
}

/*----------quizzes-select------------*/

.quizzes-install {
    color: #606266;
    margin: 0 2%;
}

/*multiple-attempts多次尝试*/
.multiple-attempts {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 82%;
    padding: 2%;
    margin-bottom: 2%;
    word-break: break-all;
    word-wrap: break-word;
}

.multiple-assign {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 86%;
    word-break: break-all;
    word-wrap: break-word;
}

.addto {
    padding: 2%;
    margin-bottom: 2%;
}

.multiple-attempts .attempts-keep {
    padding: 2%;
}

.attempt-third {
    padding-left: 4%;
}

.quizzes-student {
    color: rgb(153, 153, 153);
    display: inline-block;
    width: 80%;
    word-wrap: break-word;
    line-height: 20px;
}

.assign-addto {
    border-top: 1px dashed #ccc;
}

.assign-style {
    padding: 2%;
    margin-bottom: 2%;
}

.assign-add {
    padding-left: 78%;
    padding-bottom: 2%;
}

.available-until {
    display: inline-block;
    width: 48%;
    margin-left: 1%;
}

.questions-checkbox {
    margin: 2% 0;

    border-top: 1px solid #ccc;
}

.quizzesTest p {
    margin: 2% 0 3% 0;
}

.messagetext {
    border-radius: 6px;
    border: 1px solid rgb(204, 204, 204);
    margin-top: 2%;
    margin-bottom: 2%;
}

.quizzesTest {
    width: 100%;
}

/*quizzesPreview*/
.quizzesPreview {
    clear: both;
    /*padding: 2%;*/
    margin: 7% 1% 1% 1%;
    border-radius: 4px;
    box-shadow: 0 0 6px -1px #00000075;
}

.quizzes-time {
    padding-left: 3%;
}

.quizzes-time ul li {
    display: inline-block;
    padding: 0 1%;
}

.quizInfo ul {
    padding-bottom: 2%;
    border-bottom: 1px solid #ccc;
}

.quizInfo ul li h5 {
    display: inline-block;
    text-align: right;
    width: 30%;
}

.quizInfo ul li span {
    display: inline-block;
    width: 30%;
    text-align: left;
    margin-left: 4%;
    margin-top: 2%;
}

.quizzes-info {
    border: 1px solid #ccc;
    border-radius: 4px;
    /*margin: 4%;*/
    margin: 2% 4%;
}

.quizzes-right {
    text-align: left;
    padding-left: 24%;
}

.quizzes-score {
    padding: 2% 2% 0 2%;
}

.quizzes-question {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 4%;
    position: relative;
}

.quizzes-question h5 {
    display: inline-block;
    padding: 1% 0 1% 2%;
}

.quizzes-question span {
    float: right;
    padding: 1%;
    color: #999999;
}

.quizzes-question ul {
    font-weight: 600;
    padding-left: 6%;
    padding-top: 1%;
    padding-bottom: 2%;
    border-top: 1px solid #ccc;
}

.quizzes-question ul li {
    padding-top: 1%;
}

.quizzes-question ul li img {
    position: absolute;
    left: -7%;
}

/*开始测试*/
.quizzesPreviewStarted {
    display: inline-block;
    width: 68%;
    clear: both;
    padding: 2%;
    margin: 1%;
    border-radius: 4px;
    box-shadow: 0 0 6px -1px #00000075;
}

.quizzesStarted-right {
    float: right;
    padding-right: 2%;
    height: 100%;
    width: 22%;
}

.quizzesPreviewStarted .caution {
    border: 1px solid #f13026;
    color: #f13026;
    padding: 1%;
    border-radius: 4px;
    background-color: #fef7f6;
    font-family: "Microsoft Yahei", sans-serif, arial;
}

.quizzesStartTime {
    padding: 1% 0;
}

.quizzesStartTime h4 {
    display: inline-block;
    width: 18%;
    text-align: right;
}

.quizzesStartTime span {
    display: inline-block;
    padding-left: 2%;
    color: #666666;
    text-align: left;
}

.quizzes-started {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 2% 1%;
    position: relative;
}

.quizzes-started h5 {
    display: inline-block;
    padding: 1% 0 1% 3%;
}

.quizzes-started span {
    float: right;
    padding: 1%;
    color: #999999;
}

.quizzes-started ul {
    font-weight: 600;
    padding-left: 6%;
    padding-top: 1%;
    padding-bottom: 2%;
    border-top: 1px solid #ccc;
}

.quizzes-started ul li {
    padding-top: 1%;
}

.quizzes-started ul li span {
    float: left;
}

.biaoji {
    display: inline-block;
    /*position: absolute;
    left: 14px;
    padding-top: 6px;*/
}

.keepQuestions {
    padding-top: 6%;
}

.keepQuestions ul li span {
    margin-left: 8%;
    display: inline-block;
    margin-top: 4%;
    color: #0138b1;
    cursor: pointer;
    border-bottom: 1px solid #0138b1;
}

.started-choose {
    display: inline-block;
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.question-select {
    display: inline-block;
    width: 48%;
    margin-bottom: 2%;
}

.quizzesPreviewSubmit .caution {
    border: 1px solid #f13026;
    color: #f13026;
    padding: 1%;
    border-radius: 4px;
    background-color: #fef7f6;
    font-family: "Microsoft Yahei", sans-serif, arial;
}

.quizzesPreviewSubmit {
    clear: both;
    padding: 2%;
    margin: 7% 1% 1% 1%;
    border-radius: 4px;
    box-shadow: 0 0 6px -1px #00000075;
}

.submissionDtails ul li {
    padding-bottom: 2%;
}

.submissionDtails ul li .some {
    color: #f17e26;
}

.submissionDtails ul li .preview {
    color: #0138b1;
    display: inline-block;
    border-bottom: 1px solid #0138b1;
    cursor: pointer;
}

.quizze_preview {
    text-align: center;
    padding: 0 2% 2%;
    border-bottom: 1px solid #ccc;
}
</style>
