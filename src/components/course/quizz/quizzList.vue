<template>
    <div>
        <!--eslint-disable-->
        <div v-show="quizPageList">
            <!--测验列表-->
            <div class="summary-Quizzes">
                <div class="quizzes-search">
                    <el-input
                        v-model="watchTitle"
                        :placeholder="$t('message.Search_for_Quiz')"
                        prefix-icon="el-icon-search"
                        @input="searchTitle"
                    />
                </div>
                <div class="module">
                    <!--<el-button>{{$t('message.Manage_Question_Banks')}}</el-button>-->
                    <el-button
                        class="group-set"
                        type="primary"
                        @click.native="showQuizes"
                    >
                        <i class="iconfont icon-add" />
                        <!--{{$t('message.Quizzes')}}-->
                        <span style="font-size: 17px">{{
                            $t("message.Quiz")
                        }}</span>
                    </el-button>
                </div>
                <div class="modules-list">
                    <div class="modules-group">
                        <!--style="height: 500px;"-->
                        <div class="module-heard">
                            <!--<span class="drags">
                    <img src="../../../../static/images/drag.png"
                         alt="" @click="QQpracticeQuizList">
                  </span>-->
                            <p
                                style="display: inline-block;cursor: pointer"
                                @click="QQpracticeQuizList"
                            >
                                <i
                                    v-show="TeacherQuizList"
                                    class="iconfont icon-sanjiao_xia"
                                />
                                <i
                                    v-show="!TeacherQuizList"
                                    class="iconfont icon-sanjiaoyou"
                                />
                                {{ $t("message.Practice_Quizzes") }}
                            </p>
                        </div>
                        <div class="quizzList-border">
                            <div
                                v-show="TeacherQuizList"
                                v-if="practiceQuizList.length == 0"
                                class="modules-row"
                                style="text-align: center;"
                            >
                                <span>{{
                                    $t("message.No_practice_quizzes")
                                }}</span>
                            </div>
                            <div
                                v-for="(quizz, index) in practiceQuizList"
                                v-show="TeacherQuizList"
                                :key="index"
                                class="content"
                            >
                                <ul>
                                    <li>
                                        <div class="modules-row">
                                            <div class="drag">
                                                <!--<img src="../../../../static/images/drag.png" alt="">-->
                                                <i
                                                    class="iconfont icon--xiugaineirong"
                                                    style="font-size: 20px;color: #666666"
                                                />
                                            </div>
                                            <div class="quiz_drag">
                                                <p
                                                    class="titleHeading"
                                                    @click="
                                                        detailed(
                                                            quizz.id,
                                                            quizz.title
                                                        )
                                                    "
                                                >
                                                    {{ quizz.title }}
                                                </p>
                                                <div
                                                    style="display: inline-block"
                                                >
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            $t(
                                                                'message.Unpublished'
                                                            )
                                                        "
                                                        placement="top"
                                                    >
                                                        <span
                                                            v-show="
                                                                quizz.status
                                                            "
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
                                                                style="font-size: 22px;cursor: pointer"
                                                            />
                                                        </span>
                                                    </el-tooltip>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            $t(
                                                                'message.Published'
                                                            )
                                                        "
                                                        placement="top"
                                                    >
                                                        <span
                                                            v-show="
                                                                !quizz.status
                                                            "
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
                                                                style="cursor: pointer;font-size: 20px;;color: #666666"
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
                                                                    style="width: 10px;
                                                                            display: inline-block;
                                                                            cursor: pointer"
                                                                >
                                                                    <img
                                                                        src="../../../../static/images/spread.png"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <el-dropdown-menu
                                                                    slot="dropdown"
                                                                >
                                                                    <el-dropdown-item
                                                                        @click.native="
                                                                            showQuize(
                                                                                quizz.id,
                                                                                quizz.title
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="iconfont icon-edit i_edit_style"
                                                                        >
                                                                            <span
                                                                                class="written"
                                                                            >
                                                                                {{
                                                                                    $t(
                                                                                        "message.Edit"
                                                                                    )
                                                                                }}</span
                                                                            >
                                                                        </i>
                                                                    </el-dropdown-item>
                                                                    <el-dropdown-item
                                                                        @click.native="
                                                                            quizeDelete(
                                                                                quizz.id
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="iconfont icon-delete i_edit_style"
                                                                        >
                                                                            <span
                                                                                class="written"
                                                                            >
                                                                                {{
                                                                                    $t(
                                                                                        "message.Delete"
                                                                                    )
                                                                                }}
                                                                            </span>
                                                                        </i>
                                                                    </el-dropdown-item>
                                                                    <el-dropdown-item
                                                                        @click.native="
                                                                            goCourseResource(
                                                                                quizz
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="iconfont icon-fenxiang1 i_edit_style"
                                                                        >
                                                                            <span
                                                                                class="written"
                                                                            >
                                                                                {{
                                                                                    $t(
                                                                                        "message.Share_to_Resource"
                                                                                    )
                                                                                }}
                                                                            </span>
                                                                        </i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                                <div class="quizzes-time">
                                                    <ul>
                                                        <v-time
                                                            :assigns="
                                                                quizz.assigns
                                                            "
                                                            :users="users"
                                                            :sections="sections"
                                                        />
                                                        <v-Dtime
                                                            :assigns="
                                                                quizz.assigns
                                                            "
                                                            :users="users"
                                                            :sections="sections"
                                                        />
                                                        <!--<li>已关闭 |</li>-->
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
                        <!--style="height: 500px;"-->
                        <div class="module-heard">
                            <!--<span class="drags">-->
                            <!--<img src="../../../../static/images/drag.png"-->
                            <!--alt="" @click="QQgradedQuizList">-->
                            <!--</span>-->
                            <p
                                style="display: inline-block;cursor: pointer"
                                @click="QQgradedQuizList"
                            >
                                <i
                                    v-show="TeachergradedQuizList"
                                    class="iconfont icon-sanjiao_xia"
                                />
                                <i
                                    v-show="!TeachergradedQuizList"
                                    class="iconfont icon-sanjiaoyou"
                                />
                                {{ $t("message.Assignment_Quizzes") }}
                            </p>
                        </div>
                        <div class="quizzList-border">
                            <div
                                v-show="TeachergradedQuizList"
                                v-if="gradedQuizList.length == 0"
                                class="modules-row"
                                style="text-align: center;"
                            >
                                <span>{{
                                    $t("message.No_assignment_quizzes")
                                }}</span>
                            </div>
                            <div
                                v-for="(quizz, index) in gradedQuizList"
                                v-show="TeachergradedQuizList"
                                :key="index"
                                class="content"
                            >
                                <ul>
                                    <li>
                                        <div class="modules-row">
                                            <div class="drag">
                                                <!--<img src="../../../../static/images/drag.png" alt="">-->
                                                <i
                                                    class="iconfont icon--xiugaineirong"
                                                    style="font-size: 20px;color: #666666"
                                                />
                                            </div>
                                            <div class="quiz_drag">
                                                <p
                                                    class="titleHeading"
                                                    @click="
                                                        detailed(
                                                            quizz.id,
                                                            quizz.title
                                                        )
                                                    "
                                                >
                                                    {{ quizz.title }}
                                                </p>

                                                <div
                                                    style="display: inline-block"
                                                >
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            $t(
                                                                'message.Unpublished'
                                                            )
                                                        "
                                                        placement="top"
                                                    >
                                                        <span
                                                            v-show="
                                                                quizz.status
                                                            "
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
                                                                style="font-size: 22px;
                                                                cursor: pointer"
                                                            />
                                                        </span>
                                                    </el-tooltip>
                                                    <el-tooltip
                                                        class="item"
                                                        effect="dark"
                                                        :content="
                                                            $t(
                                                                'message.Published'
                                                            )
                                                        "
                                                        placement="top"
                                                    >
                                                        <span
                                                            v-show="
                                                                !quizz.status
                                                            "
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
                                                                style="cursor: pointer;
                                                                      font-size: 20px;
                                                                      color: #666666"
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
                                                                    style="width: 10px;
                                                                          display:inline-block;
                                                                          cursor: pointer"
                                                                >
                                                                    <img
                                                                        src="../../../../static/images/spread.png"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                                <el-dropdown-menu
                                                                    slot="dropdown"
                                                                >
                                                                    <el-dropdown-item
                                                                        @click.native="
                                                                            showQuize(
                                                                                quizz.id,
                                                                                quizz.title
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="iconfont icon-edit i_edit_style"
                                                                        >
                                                                            <span
                                                                                class="written"
                                                                            >
                                                                                {{
                                                                                    $t(
                                                                                        "message.Edit"
                                                                                    )
                                                                                }}</span
                                                                            >
                                                                        </i>
                                                                    </el-dropdown-item>
                                                                    <el-dropdown-item
                                                                        @click.native="
                                                                            quizeDelete(
                                                                                quizz.id
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="iconfont icon-delete i_edit_style"
                                                                        >
                                                                            <span
                                                                                class="written"
                                                                            >
                                                                                {{
                                                                                    $t(
                                                                                        "message.Delete"
                                                                                    )
                                                                                }}
                                                                            </span>
                                                                        </i>
                                                                    </el-dropdown-item>
                                                                    <el-dropdown-item
                                                                        @click.native="
                                                                            goCourseResource(
                                                                                quizz
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="iconfont icon-fenxiang1 i_edit_style"
                                                                        >
                                                                            <span
                                                                                class="written"
                                                                            >
                                                                                {{
                                                                                    $t(
                                                                                        "message.Share_to_Resource"
                                                                                    )
                                                                                }}
                                                                            </span>
                                                                        </i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                                <div class="quizzes-time">
                                                    <ul>
                                                        <v-time
                                                            :assigns="
                                                                quizz.assigns
                                                            "
                                                            :users="users"
                                                            :sections="sections"
                                                        />
                                                        <v-Dtime
                                                            :assigns="
                                                                quizz.assigns
                                                            "
                                                            :users="users"
                                                            :sections="sections"
                                                        />
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
                    <!--todo 暂时注释-->
                    <!--<div class="modules-group">-->
                    <!--<div class="module-heard">-->
                    <!--&lt;!&ndash;<span class="drags">&ndash;&gt;-->
                    <!--&lt;!&ndash;<img src="../../../../static/images/drag.png"&ndash;&gt;-->
                    <!--&lt;!&ndash;alt="" @click="QQsurveyQuizList">&ndash;&gt;-->
                    <!--&lt;!&ndash;</span>&ndash;&gt;-->
                    <!--<h3 style="display: inline-block;cursor: pointer" @click="QQsurveyQuizList">-->
                    <!--<i v-show="TeachersurveyList" class="iconfont icon-sanjiao_xia"></i>-->
                    <!--<i v-show="!TeachersurveyList" class="iconfont icon-sanjiaoyou"></i>-->
                    <!--Questionnaire survey-->
                    <!--</h3>-->
                    <!--</div>-->
                    <!--<div class="content"
                          v-show="TeachersurveyList"
                          v-for="(quizz,index) in surveyList"
                          :key="index">-->
                    <!--<ul>-->
                    <!--<li>-->
                    <!--<div class="modules-row">-->
                    <!--<span class="drag">-->
                    <!--&lt;!&ndash;<img src="../../../../static/images/drag.png" alt="">&ndash;&gt;-->
                    <!--<i class="iconfont icon&#45;&#45;xiugaineirong" style="font-size: 22px;"></i>-->
                    <!--</span>-->
                    <!--<h4 class="titleHeading" @click="detailed(quizz.id)">{{quizz.title}}</h4>-->
                    <!--<div style="display: inline-block">-->
                    <!--<el-tooltip class="item" effect="dark" content="Unpublish" placement="top">-->
                    <!--<span class="modules-successList" @click="quizzStatus(quizz.id,0)" v-show="quizz.status">-->
                    <!--<i class="el-icon-success"-->
                    <!--style="cursor: pointer">-->
                    <!--</i>-->
                    <!--</span>-->
                    <!--</el-tooltip>-->
                    <!--<el-tooltip class="item" effect="dark" content="Publish" placement="top">-->
                    <!--<span class="modules-Group" @click="quizzStatus(quizz.id,1)" v-show="!quizz.status">-->
                    <!--<i class="iconfont icon-Group-"-->
                    <!--style="cursor: pointer;font-size: 24px">-->
                    <!--</i>-->
                    <!--</span>-->
                    <!--</el-tooltip>-->
                    <!--</div>-->
                    <!--<div class="modules-menuList">-->
                    <!--<el-row class="block-col-2">-->
                    <!--<el-col :span="12">-->
                    <!--<el-dropdown trigger="click">-->
                    <!--<span class="el-dropdown-link" style="width: 10px;display: inline-block;cursor: pointer">-->
                    <!--&lt;!&ndash;<i style="font-size: 34px" class="el-icon-menu"></i>&ndash;&gt;-->
                    <!--<img src="../../../../static/images/spread.png" alt="">-->
                    <!--</span>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item @click.native="showQuize(quizz.id)">-->
                    <!--<img src="../../../../static/images/edit.png" alt="">-->
                    <!--&lt;!&ndash;<i class="iconfont icon-icon-edit"></i>&ndash;&gt;-->
                    <!--{{$t('message.Edit')}}-->
                    <!--</el-dropdown-item>-->
                    <!--<el-dropdown-item-->
                    <!--@click.native="quizeDelete(quizz.id)">-->
                    <!--<img src="../../../../static/images/delete.png" alt="">-->
                    <!--{{$t('message.Delete')}}-->
                    <!--</el-dropdown-item>-->
                    <!--<el-dropdown-item>-->
                    <!--<img src="../../../../static/images/share.png" alt="">-->
                    <!--{{$t('message.Share_to_Commons')}}-->
                    <!--</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                    <!--</div>-->
                    <!--<div class="quizzes-time">-->
                    <!--<ul>-->
                    <!--&lt;!&ndash;<v-time :assigns="quizz.assigns"></v-time>&ndash;&gt;-->
                    <!--&lt;!&ndash;<v-Dtime :assigns="quizz.assigns"></v-Dtime>&ndash;&gt;-->
                    <!--<v-time :assigns="quizz.assigns" :users="users"-->
                    <!--:sections="sections"></v-time>-->
                    <!--<v-Dtime :assigns="quizz.assigns" :users="users" :sections="sections"></v-Dtime>-->

                    <!--<li v-show="quizz.score">{{quizz.score}}points  </li>-->
                    <!--<li  v-show="!quizz.totalQuestions==0">{{quizz.totalQuestions}}question</li>-->
                    <!--</ul>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</li>-->
                    <!--</ul>-->
                    <!--</div>-->
                    <!--</div>-->
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
                                            label="Practice Quiz"
                                            :value="1"
                                            @click.native="groupShow1"
                                        />
                                        <el-option
                                            label="Scoring Quiz"
                                            :value="2"
                                            @click.native="groupShow2"
                                        />
                                        <el-option
                                            label="Rating survey"
                                            :value="3"
                                            @click.native="groupShow3"
                                        />
                                        <el-option
                                            label="Non-scoring survey"
                                            :value="4"
                                            @click.native="groupShow4"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-show="quizeValue"
                                    :label="$t('message.Assignment_Group')"
                                >
                                    <el-select
                                        v-model="assignmentGroupId"
                                        placeholder="Assignments"
                                        style="width: 80%"
                                    >
                                        <el-option
                                            v-for="item in assignment"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="assignment[0].id"
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
                                <!--<div class="questions-checkbox">-->
                                <!--<el-checkbox v-model="checked5" style="display: block;margin-top: 2%">-->
                                <!--{{$t('message.Notify_users_that_this_content_has_changed')}}-->

                                <!--</el-checkbox>-->
                                <!--</div>-->
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
                                            src="../../../../static/images/biaoji.png"
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
                                            v-for="(item, dIndex) in domain
                                                .question.options"
                                            :key="dIndex"
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
                            <!--<div class="questions-checkbox">-->
                            <!--<el-checkbox v-model="checked5" style="display: block;margin-top: 2%">-->

                            <!--{{$t('message.Notify_users_that')}}-->
                            <!--</el-checkbox>-->
                            <!--</div>-->
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
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import eventBus from "@/eventBus";
import goTop from "@/utils/goTop.vue";
import { formatDate } from "@/utils/date";
import dueDraw from "@/utils/dueDraw.vue";
import availableDraw from "@/utils/availableDraw.vue";

export default {
    filters: {
        formatDate(time) {
            const date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    components: {
        "v-goTop": goTop,
        "v-time": availableDraw,
        "v-Dtime": dueDraw
    },
    data() {
        return {
            watchTitle: "",
            seqq: 0,
            loading: true,
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
            courseId: this.$route.query.courseId,
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
                    assignId: "",
                    assignType: "1",
                    limitTime: "",
                    startTime: "",
                    endTime: ""
                }
            ],
            sections: [], // 所有班级
            users: [], // 所有用户
            aassignSections: [],
            aassignUser: [],
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
            section: {} /* assign */,
            fileList: [],
            assignmentGroupId: "",
            showQuizInforList: [],
            practiceQuizList: [],
            gradedQuizList: [],
            surveyList: [],
            quizInfoGetTaba: [],
            quizInfor: [],
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
            questionId: "",
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
            checked: false,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            radio: "1",
            formLabelWidth: "28%",
            dialogVisibleOutline: false,
            editDialogFormVisible: false,
            editDialogFormVisibleList: false,

            value: "",
            labelPosition: "right",
            formLabelAlign: {
                name: "",
                region: "",
                type: ""
            },
            value5: [],
            initMount: 0
        };
    },
    mounted() {
        this.quizInforList();
        this.assignGet();
        this.getAssignDataList();
    },
    methods: {
        selectAssignChange(ass) {
            console.log(ass);
            this.selectedAssign.push(ass);
            console.log(this.selectedAssign);
        },
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
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
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
                courseId: this.courseId,
                title: this.title,
                description: this.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.id,
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
                totalScore: "0",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = true;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizadd = res.data.message;
                        this.$router.push({
                            path: "/homePage/allCourse/mondifyQuizz",
                            query: {
                                quizDetailId: this.quizadd,
                                courseId: this.courseId
                            }
                        });
                        this.assignGet();
                        this.showQuizekk();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showQuizekk() {
            const param = {
                id: this.quizadd
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/list`, {
                    params: param
                })
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = true;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfor = res.data.entity;
                        this.quizInfor.forEach(el => {
                            this.isShuffleAnswer = Boolean(el.isShuffleAnswer);
                        });

                        this.mondifyquizItem(this.quizadd);
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showQuize(id, title) {
            this.$router.push({
                path: "/homePage/allCourse/mondifyQuizz",
                query: {
                    quizDetailId: id,
                    courseId: this.courseId,
                    name: title
                }
            });
            /*  this.$http.get(`${process.env.NODE_ENV}/quizInfor/list?id=${id}`,)
                    .then((res) => {
                      if (Number(res.data.code) === 200) {
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = true;
                        this.quizzesPublish = false;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.quizInfor = res.data.entity;
                        this.quizInfor.forEach(el => {
                          el.isShuffleAnswer = el.isShuffleAnswer == 0? false:true;
                        })
                        this.quizadd = id;
                        this.mondifyquizItem(id);
                      } else {
                        this.$message.error(res.data.message);
                      }
                    }).catch((err) => {
                    console.log(err);
                  }) */
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
                    if (Number(res.data.code) === 200) {
                        this.assignment = res.data.entity;
                        this.assignmentGroupId = this.assignment.id;
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
                    if (Number(res.data.code) === 200) {
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
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        quizeSure() {
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
                courseId: this.courseId,
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
                totalScore: "0",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.$router.push({
                            path: "/homePage/allCourse/courseQuizz",
                            query: { data: this.datas }
                        });
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
                courseId: this.courseId,
                title: this.title,
                description: this.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.id,
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
                totalScore: "0",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.$router.push({
                            path: "/homePage/allCourse/courseQuizz",
                            query: { data: this.datas }
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        quizInforList() {
            const param = {
                courseId: this.courseId,
                pageSize: 1000
            };
            this.$http
                .get(`${process.env.NODE_ENV}/quizInfor/pageList`, {
                    params: param
                })
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
                            } else if (
                                Number(e.type) === 3 ||
                                Number(e.type) === 4
                            ) {
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
        searchTitle() {
            const that = this;
            let t;
            clearTimeout(t);
            t = setTimeout(() => {
                that.$http
                    .get(`${process.env.NODE_ENV}/quizInfor/pageList`, {
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
                            } else if (
                                Number(e.type) === 3 ||
                                Number(e.type) === 4
                            ) {
                                that.surveyList.push(e);
                            }
                        });
                    });
            }, 500);
        },
        quizzStatus(id, status) {
            const quizzes = {
                id,
                status
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/publish/edit`, quizzes)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.quizInforList();
                    } else {
                        // this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        quizeDelete(id) {
            const quizId = [];
            quizId.push(id);
            this.$confirm(this.$t("message.delete_quiz"), "", {
                confirmButtonText: this.$t("message.Yes"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(`${process.env.NODE_ENV}/quiz/deletes`, quizId)
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.quizInforList();
                                this.$message({
                                    message: this.$t(
                                        "message.Delete_succeeded"
                                    ),
                                    type: "success"
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
        quizeSureModify(item) {
            const disAssigns = [];
            for (let i = 0; i < this.assign.length; i += 1) {
                const ass = this.assign[i];
                const arr = ass.assignId.split("_");
                disAssigns.push({
                    assignType: arr[0],
                    assignId: arr[1],
                    startTime: new Date(ass.startTime).getTime(),
                    endTime: new Date(ass.endTime).getTime(),
                    limitTime: new Date(ass.limitTime).getTime()
                });
            }
            const modifyQuize = {
                id: item.id,
                courseId: this.courseId,
                title: item.title,
                description: item.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.id,
                score: item.score,
                allowAnonymous: Number(item.allowAnonymous),
                isShuffleAnswer: Number(item.isShuffleAnswer),
                timeLimit: item.timeLimit,
                allowMultiAttempt: Number(item.allowMultiAttempt),
                attemptNumber: item.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: item.showReplyStrategy,
                showAnswerStrategy: item.showAnswerStrategy,
                showAnswerStartTime: item.showAnswerStartTime,
                showAnswerEndTime: item.showAnswerEndTime,
                showQuestionStrategy: Number(item.showQuestionStrategy),
                isLockRepliedQuestion: Number(item.isLockRepliedQuestion),
                isNeedAccessCode: Number(item.isNeedAccessCode),
                accessCode: item.accessCode,
                isFilterIP: Number(item.isFilterIP),
                filterIpAddress: item.filterIpAddress,
                version: "20",
                status: "0",
                totalQuestions: this.seqq,
                totalScore: "0",
                assign: disAssigns
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/modify`, modifyQuize)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.$router.push({
                            path: "/homePage/allCourse/courseQuizz",
                            query: { data: this.datas }
                        });
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
                courseId: this.courseId,
                title: item.title,
                description: item.description,
                type: this.type.value,
                assignmentGroupId: this.assignment.id,
                score: item.score,
                allowAnonymous: Number(item.allowAnonymous),
                isShuffleAnswer: Number(item.isShuffleAnswer),
                timeLimit: item.timeLimit,
                allowMultiAttempt: Number(item.allowMultiAttempt),
                attemptNumber: this.attemptNumber,
                scoreType: this.scoreType.value,
                showReplyStrategy: item.showReplyStrategy,
                showAnswerStrategy: item.showAnswerStrategy,
                showAnswerStartTime: item.showAnswerStartTime,
                showAnswerEndTime: item.showAnswerEndTime,
                showQuestionStrategy: Number(item.showQuestionStrategy),
                isLockRepliedQuestion: Number(item.isLockRepliedQuestion),
                isNeedAccessCode: Number(item.isNeedAccessCode),
                accessCode: item.accessCode,
                isFilterIP: Number(item.isFilterIP),
                filterIpAddress: item.filterIpAddress,
                version: "20",
                status: "1",
                totalQuestions: this.seqq,
                totalScore: "0",
                assign: this.assign
            };
            this.$http
                .post(`${process.env.NODE_ENV}/quiz/modify`, modifyQuize)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.datas = res.data.message;
                        this.quizPageList = false;
                        this.quizPageAdd = false;
                        this.quizPageModify = false;
                        this.quizzesPublish = true;
                        this.quizzesStarted = false;
                        this.quizzesSubmit = false;
                        this.$router.push({
                            path: "/homePage/allCourse/courseQuizz",
                            query: { data: this.datas }
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        questionAdd() {
            this.tempOPtions = [];
            this.QuestionOptions.forEach((el, index) => {
                const tempObj = {};
                tempObj.code = 0;
                tempObj.content = el.content;
                if (Number(this.questionType.value) === 1) {
                    tempObj.isCorrect = Number(
                        index.toString() === this.testRadio.toString()
                    );
                } else if (Number(this.questionType.value) === 2) {
                    tempObj.isCorrect = Number(
                        index.toString() === this.quizzChecked.toString()
                    );
                }
                tempObj.seq = index;
                tempObj.explanation = 0;
                this.tempOPtions.push(tempObj);
            });
            const quest = {
                quizId: this.quizadd,
                courseId: this.courseId,
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
                    if (Number(res.data.code) === 200) {
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
                    if (Number(res.data.code) === 200) {
                        this.quizItemList = res.data.entity;
                        this.seqq = this.quizItemList[
                            this.quizItemList.length - 1
                        ].seq;
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
                    if (Number(res.data.code) === 200) {
                        this.quizItemList = res.data.entity;
                        // this.seqq = this.quizItemList[this.quizItemList.length - 1].seq;
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
                    if (Number(res.data.code) === 200) {
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
                quizId: this.quizadd,
                courseId: this.courseId,
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
                    if (Number(res.data.code) === 200) {
                        this.quizadd = item.quizId;
                        this.quizItem();
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
                    if (Number(res.data.code) === 200) {
                        this.quizInfoGetList = res.data.entity;
                        this.quizInfoGetTaba = res.data.entity.assigns;
                        this.quizInfoGetTaba.forEach(el => {
                            /* el.endtime='endTime | formatDate(time)' */
                            if (Number(el.assignType) === 1) {
                                Object.assign(el, { type: "Everyone" });
                            } else if (Number(el.assignType) === 2) {
                                Object.assign(el, { type: "Class" });
                            } else if (Number(el.assignType) === 3) {
                                Object.assign(el, { type: "Student" });
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
        assignGet() {
            this.$http
                .get(`${process.env.NODE_ENV}/assign/get?data=${this.courseId}`)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.aassignSections = res.data.entity.sections;
                        this.aassignUser = res.data.entity.users;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
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
        detailed(id, title) {
            this.$router.push({
                path: "/homePage/allCourse/courseQuizz",
                query: { data: id, courseId: this.courseId, name: title }
            });
        },
        goCourseResource(el) {
            const originId = el.id;
            this.$router.push({
                path: "/homePage/courseResource",
                query: {
                    originType: 3,
                    id: originId,
                    resourceTitle: el.title
                }
            });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped>
@import "./styleQuizz.css";
</style>
