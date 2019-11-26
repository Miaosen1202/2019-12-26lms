<template>
    <!--eslint-disable-->
    <div style="width: 100%;">
        <!--start: Batch grade 批量打分-->
        <div style="padding-bottom: 30px;">
            <div class="title-box">
                <h1 @click="BackGrade">
                    {{ $t("message.back_to_Grade_Task") }}

                    <a
                        class="iconfont icon-ai207"
                        style="font-size: 24px; color:#666; cursor: pointer"
                    ></a>
                </h1>
                <div class="grade-btn">
                    <el-button type="plain" @click="bookGrade"
                        ><span class="iconfont icon-wendangshezhi"></span>
                        {{ $t("message.Grade_Book") }}</el-button
                    >
                    <!--<el-button type="plain"><span class="iconfont icon-bingtu_o" style="font-size: 20px; vertical-align: middle"></span> Learning Mastery</el-button>-->
                </div>
            </div>
            <ul
                class="task-list"
                style="padding:17px 0;border-bottom: 1px solid #eee"
            >
                <li>
                    <div class="task-left">
                        <!--<i v-show="gradeBatch.originType == 1" style="font-size: 30px;" class="iconfont icon-icon-edit"></i>
						<i v-show="gradeBatch.originType == 2" style="font-size: 30px;" class="iconfont icon-liaotian"></i>
						<i v-show="gradeBatch.originType == 3" style="font-size: 30px;" class="iconfont icon--xiugaineirong"></i>-->
                        <!--class判断显示图标-->
                        <p class="task-left-h1">
                            {{ $t("message.Grade") }}<br />{{
                                $t("message.one_by_one")
                            }}
                        </p>
                        <i
                            style="font-size: 30px;"
                            class="iconfont"
                            :class="{
                                'icon-icon-edit': gradeBatch.originType == 1,
                                'icon-liaotian': gradeBatch.originType == 2,
                                'icon--xiugaineirong':
                                    gradeBatch.originType == 3
                            }"
                        ></i>

                        <div class="task-leftTitle" v-if="gradeBatch">
                            <h1>{{ gradeBatch.originName }}</h1>
                            <ul class="tag-list tag-list1">
                                <v-time
                                    :assigns="gradeBatch.close"
                                    :users="users"
                                    :sections="sections"
                                ></v-time>
                                <v-Dtime
                                    :assigns="gradeBatch.close"
                                    :users="users"
                                    :sections="sections"
                                ></v-Dtime>

                                <li style="border:none">
                                    <span v-if="gradeBatch.score && !Nocontent"
                                        >{{ gradeBatch.score / 100 }} Pts</span
                                    >
                                    <!--	<span v-else></span>-->
                                    <span>{{
                                        gradeBatch.releaseType == 1
                                            ? $t("message.individual")
                                            : $t("message.group")
                                    }}</span>
                                </li>
                                <!--<li>Submission Type: Online text entry, Online URL, Media recording</li>-->
                            </ul>
                        </div>
                    </div>
                    <div class="group-data">
                        <h3>
                            <span class="red">{{
                                oneGradeStatisticsQuery.unG
                            }}</span>
                            / <em>{{ oneGradeStatisticsQuery.graded }}</em>
                        </h3>
                        <h2>
                            <span>{{ $t("message.unG_Graded") }}</span>
                        </h2>
                    </div>
                    <!--<el-button type="plain" style="overflow: hidden;"><i class="iconfont icon-liebiaorongqi"></i> View Rubric</el-button>-->
                </li>
            </ul>
            <div class="grade-left-box" v-show="showContent">
                <div class="grade-content-box clearfix">
                    <ul class="grade-content-left">
                        <li>{{ gradeContentInfo.originState }}</li>
                        <!--<li v-if="gradeBatch.originType == 1 || gradeBatch.originType == 2">{{gradeContentInfo.submissionToView}}</li>-->
                        <li
                            v-show="
                                (gradeContentInfo.submissionToView &&
                                    gradeContentInfo.submissionToView.length &&
                                    gradeBatch.originType == 1) ||
                                    this.gradeBatch.originType == 3
                            "
                        >
                            {{ $t("message.Submitted") }}: &nbsp;&nbsp;{{
                                Submission
                            }}
                        </li>
                        <li
                            v-if="
                                gradeContentInfo.submittedTime &&
                                    gradeBatch.originType == 2
                            "
                        >
                            {{ $t("message.Submitted") }}: &nbsp;&nbsp;{{
                                Submission
                            }}
                        </li>
                        <li v-if="gradeBatch.originType == 3">
                            {{ $t("message.This_attemp_took") }}
                            {{ formatSeconds(gradeContentInfo.attemptTook) }}
                        </li>
                    </ul>
                    <div
                        class="grade-content-right"
                        v-show="
                            gradeBatch.originType == 1 ||
                                gradeBatch.originType == 3
                        "
                    >
                        <p>{{ $t("message.Submission_to_view") }}:</p>
                        <!--<el-input v-model="Submission" placeholder="This is a Text Entry content  submitted by a student "></el-input>-->
                        <el-select
                            v-model="Submission"
                            placeholder=""
                            @change="getContentInfo"
                        >
                            <el-option
                                v-for="item in submissionToView"
                                :key="item"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!--学生提交的文本输入内容-->
                <!--文本-->
                <div
                    class="grade-content"
                    v-if="
                        gradeAssignmentReply.replyType == 1 &&
                            gradeStatisticsQuery[0].fullName
                    "
                >
                    <div
                        class="grade-content-text rich-text"
                        v-if="gradeStatisticsQuery[0].fullName"
                        v-html="gradeAssignmentReply.content"
                    ></div>
                    <!--<div class="grade-left-boxNo" v-if="Nocontent || gradeStatisticsQuery[0].fullName == null">
						<p>No data to be shown for your selection.</p>
					</div>-->
                </div>
                <!--url路径--!--视频类型-->
                <div
                    class="grade-attachments"
                    v-show="
                        gradeAssignmentReply.replyType == 2 ||
                            gradeAssignmentReply.replyType == 4
                    "
                >
                    <h2 v-show="gradeAssignmentReply.replyType == 2">
                        {{ $t("message.Uploaded_Files") }}
                    </h2>
                    <p
                        v-for="item in gradeAssignmentReply.attachments"
                        @click="FileShow(item.fileUrl, item.fileType)"
                        :data-type="item.fileType"
                        :data-fileUrl="item.fileUrl"
                        v-if="
                            item.fileType == 'zip' ||
                                item.fileType == 'rar' ||
                                item.fileType == 'exe'
                        "
                        style="color:#0147ff"
                    >
                        <a
                            class="el-upload-list__item-name"
                            :href="getAbsolutePath(item.fileUrl)"
                            style="text-decoration: none;cursor: pointer;color:#0147ff"
                            target="_Blank"
                        >
                            {{ item.fileName }}
                        </a>
                    </p>
                    <p
                        v-for="item in gradeAssignmentReply.attachments"
                        @click="FileShow(item.fileUrl, item.fileType)"
                        :data-type="item.fileType"
                        :data-fileUrl="item.fileUrl"
                        v-else
                    >
                        {{ item.fileName }}
                    </p>
                </div>
                <!--文件-->
                <div
                    class="grade-contentUrl"
                    style="border: none; height: 660px;"
                    v-show="gradeAssignmentReply.replyType == 3"
                >
                    <p>
                        <label>{{ $t("message.URL") }}:</label>
                        <span :title="gradeAssignmentReply.content">{{
                            gradeAssignmentReply.content
                        }}</span>
                        <a @click="open_win">{{
                            $t("message.open_in_new_tab_window")
                        }}</a>
                    </p>
                    <!--gradeAssignmentReply.replyType == 3-->
                    <iframe
                        class="rich-text"
                        :src="
                            gradeHttp == gradeContentStr
                                ? gradeAssignmentReply.content
                                : gradeHttp + gradeAssignmentReply.content
                        "
                        width="100%"
                        height="100%"
                        frameborder="0"
                        scrolling="no"
                    ></iframe>
                    <!--<div class="grade-content-text" v-html="gradeAssignmentReply.content"></div>-->
                </div>
                <!--学生讨论的内容-->
                <div
                    class="grade-content"
                    style="border: none;"
                    v-show="gradeAssignmentReply.originType == 2"
                >
                    <div
                        class="grade-content-title"
                        v-if="gradeAssignmentReply.discussion"
                    >
                        <p class="grade-title-ico">
                            <span>
                                <img
                                    v-if="
                                        gradeAssignmentReply.user.avatarFileId
                                    "
                                    :src="
                                        gradeUrl +
                                            gradeAssignmentReply.user
                                                .avatarFileId
                                    "
                                    class="grade-userPic"
                                />
                                <i
                                    class="iconfont icon-yonghutouxiang"
                                    v-else
                                    style="font-size: 44px;"
                                ></i>
                            </span>
                        </p>
                        <div class="msg-right">
                            <p
                                class="msg-name"
                                v-if="gradeAssignmentReply.user"
                            >
                                {{ gradeAssignmentReply.user.fullName }}
                            </p>
                            <label
                                class="msg-sections"
                                v-if="gradeAssignmentReply.discussion"
                                >{{
                                    timestampToTimes(
                                        gradeAssignmentReply.discussion
                                            .createTime
                                    )
                                }}
                                <!--<a href="#">3 Sections</a>-->
                            </label>
                            <h2 class="msg-title">
                                {{ gradeAssignmentReply.discussion.title }}
                            </h2>
                            <p
                                class="msg-text rich-text"
                                v-html="gradeAssignmentReply.discussion.content"
                            ></p>
                        </div>
                    </div>
                    <div
                        class="msg-speak"
                        v-if="gradeAssignmentReply.discussionReplyVOList"
                    >
                        <div
                            v-for="item in gradeAssignmentReply.discussionReplyVOList"
                        >
                            <div class="msg-speak-text">
                                <p class="grade-title-ico">
                                    <span>
                                        <img
                                            :src="gradeUrl + item.userAvatarUrl"
                                            v-if="item.userAvatarUrl"
                                            class="grade-userPic"
                                        />
                                        <i
                                            v-else
                                            class="iconfont icon-yonghutouxiang"
                                            style="font-size: 44px;"
                                        ></i>
                                    </span>
                                </p>
                                <div class="msg-speak-minbox">
                                    <p
                                        class="msg-text rich-text"
                                        v-if="gradeAssignmentReply.repUser"
                                    >
                                        <span>{{ item.userNickname }}：</span
                                        ><label v-html="item.content"></label>
                                    </p>
                                    <p class="msg-speak-time">
                                        <span>{{
                                            timestampToTimes(item.createTime)
                                        }}</span>
                                        <span
                                            class="msg-speak-time-right"
                                        ></span>
                                    </p>
                                </div>
                            </div>
                            <div
                                class="msg-speak-text msg-speak-text1"
                                v-for="items in item.replies"
                            >
                                <p
                                    class="grade-title-ico"
                                    style="margin-left: 58px;"
                                >
                                    <span>
                                        <img
                                            :src="
                                                gradeUrl + items.userAvatarUrl
                                            "
                                            v-if="items.userAvatarUrl"
                                            class="grade-userPic"
                                        />
                                        <i
                                            v-else
                                            class="iconfont icon-yonghutouxiang"
                                            style="font-size: 44px;"
                                        ></i>
                                    </span>
                                </p>
                                <div class="msg-speak-minbox">
                                    <p
                                        class="msg-text"
                                        style="margin-left: 10%;"
                                        v-if="gradeAssignmentReply.repUser"
                                    >
                                        <span style="word-break: break-all"
                                            >{{ items.userNickname }}：</span
                                        >
                                        <label v-html="items.content"></label>
                                    </p>
                                    <p class="msg-speak-time">
                                        <span>{{
                                            timestampToTimes(items.createTime)
                                        }}</span>
                                        <span
                                            class="msg-speak-time-right"
                                        ></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="grade-content"
                    style="border: none;"
                    v-show="gradeAssignmentReply.originType == 3"
                >
                    <el-tabs>
                        <el-tab-pane
                            :label="$t('message.Subjectivity')"
                            v-if="
                                gradeAssignmentReply.originType == 3 &&
                                    quizSubjectivityListVo.length
                            "
                        >
                            <div
                                class="grade-quizee-content clearfix"
                                v-for="(item, index) in quizSubjectivityListVo"
                                :key="item.id"
                            >
                                <div class="grade-quizee-title clearfix">
                                    <h4>
                                        <span class="grade-quizee-seq"
                                            >{{ item.seq }}、{{
                                                $t("message.Easy_Question")
                                            }}</span
                                        >
                                    </h4>
                                    <span>
                                        <!--主观题评分-->
                                        <!--== 0 ? '':item.gradeScore-->
                                        <el-input
                                            v-model="item.gradeScore"
                                            @blur="
                                                subScoreblur(
                                                    item.gradeScore,
                                                    item.score,
                                                    index
                                                )
                                            "
                                            style="width:60px; height: 20px !important; margin-right: 10px;"
                                        ></el-input>
                                        /<label>{{ item.score / 100 }}</label
                                        >{{ $t("message.pts") }}
                                    </span>
                                </div>
                                <div class="grade-quizee-box">
                                    <ul class="grade-quizee-list">
                                        <li v-html="item.content"></li>
                                        <li>{{ $t("message.Answer") }}:</li>
                                        <li>{{ item.answer }}</li>
                                    </ul>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane
                            :label="$t('message.Objective')"
                            v-if="
                                gradeAssignmentReply.originType == 3 &&
                                    quizQuestionVo.length
                            "
                        >
                            <div
                                class="grade-quizee-content clearfix"
                                style="margin-top: 10px;"
                                v-for="item in quizQuestionVo"
                            >
                                <div class="grade-quizee-title clearfix">
                                    <h4 class="grade-quizee-seq">
                                        {{ item.seq }}、
                                        <span>{{ gradeGType[item.type] }}</span>
                                        <!--<span v-if="item.type == 1">Multiple Choice</span>
										<span v-if="item.type == 2">Mulitple Answers</span>
										<span v-if="item.type == 3">True/False</span>-->
                                    </h4>
                                    <span>
                                        <!--客观题评分显示-->
                                        <el-input
                                            v-model="item.gradeScore / 100"
                                            :disabled="true"
                                            placeholder=""
                                            style="width:60px; height: 20px !important; margin-right: 10px;"
                                        ></el-input>
                                        /<label>{{ item.score / 100 }}</label
                                        >{{ $t("message.pts") }}
                                    </span>
                                </div>
                                <div class="grade-quizee-box">
                                    <p
                                        class="grade-subjectivity-title"
                                        v-html="item.content"
                                    ></p>
                                    <ul
                                        class="grade-quizee-list grade-quizee-list1"
                                    >
                                        <li
                                            v-for="items in item.option"
                                            v-if="item.type != 3"
                                        >
                                            <!--<el-radio v-model="items.isChoice == 1" label="items.isChoice" fill="#aaa">{{items.content}}</el-radio>-->
                                            <!--<span v-if="items.seq== 0">A</span>
											<span v-if="items.seq== 1">B</span>
											<span v-if="items.seq== 2">C</span>
											<span v-if="items.seq== 3">D</span>-->
                                            <el-radio-group v-model="radios">
                                                <el-radio
                                                    :label="items.isChoice"
                                                    disabled
                                                    >{{
                                                        items.content
                                                    }}</el-radio
                                                >
                                            </el-radio-group>
                                        </li>
                                        <li
                                            v-for="items in item.option"
                                            v-if="item.type == 3"
                                        >
                                            <!--<el-radio v-model="items.isChoice == 1" label="items.isChoice" fill="#aaa">{{items.content}}</el-radio>-->
                                            <span>{{ items.code }}</span>
                                            <el-radio-group v-model="radios">
                                                <el-radio
                                                    :label="items.isChoice"
                                                    disabled
                                                    >{{
                                                        items.content
                                                    }}</el-radio
                                                >
                                            </el-radio-group>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="gradScores" v-if="gradeBatch.originType == 3">
                    <!---->
                    <p v-if="quizSubjectivityListVo.length > 0">
                        {{ $t("message.Final_Score") }}: {{ FinalScore }}
                        {{ $t("message.out_of") }}
                        <span v-if="gradeBatch.score && !Nocontent"
                            >{{ gradeBatch.score / 100 }}
                            {{ $t("message.pts") }}</span
                        >
                        <span v-else></span>.
                        <el-button
                            style="background: #94a5d6; color: #fff; margin-top: 16px;"
                            @click="scoreModify(FinalScore)"
                            :disabled="disabledUpdte"
                            >{{ $t("message.Update_Scores") }}</el-button
                        >
                    </p>
                    <!--<p v-else> Final Score:  out of .
						<el-button style="background: #94a5d6; color: #fff; margin-top: 16px;" @click="scoreModify(FinalScore)">Update Scores</el-button>
					</p>-->
                </div>
                <!---->
                <div
                    style="margin-top: 2%;height: auto"
                    v-show="
                        gradeAssignmentReply.replyType == 2 ||
                            (gradeAssignmentReply.replyType == 4 && gradeImgs)
                    "
                >
                    <previewFile :propObj="propObj"></previewFile>
                </div>
                <!--v-if="Nocontent || gradeStatisticsQuery[0].fullName == null"-->
                <div
                    class="grade-left-boxNo"
                    v-show="Nocontent || gradedStatus == 0"
                >
                    <p>
                        {{
                            $t("message.No_data_to_be_shown_for_your_selection")
                        }}
                    </p>
                </div>
            </div>

            <!--评分分值填写-->
            <div class="grad-intro1">
                <!--是否隐藏姓名-->
                <div class="grad-hader-box clearfix">
                    <div class="grad-intro1-left">
                        <h1 class="grad-intro1-title">
                            <el-checkbox v-model="checked" disabled>{{
                                $t("message.Mute")
                            }}</el-checkbox>
                            <el-tooltip
                                :content="$t('message.if_checked_students')"
                                placement="bottom"
                                effect="light"
                            >
                                <i
                                    class="iconfont icon-help-copy"
                                    style="color:#0e38b1; font-size: 22px; cursor: pointer"
                                ></i>
                            </el-tooltip>
                        </h1>
                        <br />
                        <h1 class="grad-intro1-title grad-intro1-title1">
                            <el-checkbox
                                v-model="HideName"
                                @change="selectStudents()"
                                >{{ $t("message.Hide_Stu_Name") }}</el-checkbox
                            >
                        </h1>
                    </div>
                    <div class="grad-intro1-right">
                        <label>Sequence</label>
                        <el-select
                            v-model="sequence"
                            @change="SequenceChange"
                            :placeholder="$t('message.All')"
                            class="filter-select"
                            style="width: 52%;"
                        >
                            <el-option
                                v-for="item in typeOptions1"
                                :key="item.value1"
                                :label="item.label1"
                                :value="item.value1"
                            >
                            </el-option> </el-select
                        ><br />
                        <label>{{ $t("message.GradedStatus") }}</label>
                        <el-select
                            v-model="typeValue"
                            @change="GradedStatusChange"
                            :placeholder="$t('message.All')"
                            class="filter-select"
                            style="width: 52%; margin-top: 22px;"
                        >
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!--学生姓名是否显示-->
                <div class="grad-hader-box grad-hader-name clearfix">
                    <div class="grad-intro1-left" style="text-align: center;">
                        <span>{{ studentIndex }}</span
                        >/<span>{{ gradeStatisticsQuery.length }}</span>
                        <br />
                        <!--<p>{{studentName}}</p>-->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="studentName"
                            placement="top"
                        >
                            <p class="student-name" style="">
                                {{ studentName }}
                            </p>
                        </el-tooltip>
                    </div>
                    <div class="grad-intro1-right1">
                        <img
                            :src="gradeUrl + userImg"
                            v-if="userImg"
                            class="grade-userPic"
                            style="margin-top: 10px;"
                        />
                        <span class="grade-ico" v-else
                            ><i
                                class="iconfont icon-yonghutouxiang"
                                style="font-size: 44px;"
                            ></i
                        ></span>
                        <div class="geader-slidename">
                            <el-button
                                @click="leftSlide"
                                class="grade-slide"
                                type="text"
                                :disabled="leftDisabled"
                            ></el-button>
                            <el-select
                                v-model="gradedStatus"
                                :placeholder="$t('message.All')"
                                class="filter-select"
                                style="width: 66%; margin-top: 22px;"
                                @change="changeStudents"
                                ref="select"
                            >
                                <!--<el-option v-for="item in gradeStatisticsQuery" track-by="$index" v-show="gradeStatisticsQuery != null" :key="item.id" :label="item.studentName" :value="item.id"></el-option>-->
                                <el-option
                                    v-for="item in gradeStatisticsQuery"
                                    v-if="item.fullName != null"
                                    track-by="$index"
                                    :key="item.id"
                                    :label="
                                        gradeBatch.releaseType == 1
                                            ? item.fullName
                                            : item.groupName
                                    "
                                    :value="item.id"
                                ></el-option>
                                <!--<el-option v-for="(item,index) in gradeStatisticsQuery" v-if="item.fullName == null" track-by="$index" :key="index" :label="item.studentName" :value="item.id"></el-option>-->
                            </el-select>

                            <el-button
                                type="text"
                                class="grade-slide"
                                :disabled="rightDisabled"
                                @click="rightSlide"
                            >
                                >
                            </el-button>
                        </div>
                    </div>
                </div>
                <!--评分专栏-->
                <div class="grad-hader-box clearfix">
                    <div class="grad-intro1-content">
                        <p
                            class="grad-intro1-tips"
                            v-if="gradeBatch.releaseType == 1"
                        >
                            {{ $t("message.for_this_student") }}
                        </p>
                        <p
                            class="grad-intro1-tips"
                            v-if="gradeBatch.releaseType == 2"
                        >
                            {{ $t("message.for_this_group") }}
                        </p>
                        <!--数字评分-->
                        <p>
                            {{ $t("message.Grade") }}
                            <el-input
                                v-model="scoreValue"
                                type="number"
                                step="0.00001"
                                :disabled="gradeAssignmentReply.originType == 3"
                                placeholder=""
                                style="width: 20%;"
                                v-if="
                                    gradeBatch.showScoreType == 1 ||
                                        gradeBatch.showScoreType == 2 ||
                                        gradeBatch.showScoreType == 4
                                "
                            ></el-input>
                            <el-select
                                v-model="completeGrade"
                                style="width: 35%"
                                v-if="gradeBatch.showScoreType == 3"
                            >
                                <el-option
                                    :label="$t('message.Complete')"
                                    :value="gradeBatch.score"
                                    >{{ $t("message.Complete") }}
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
                                        completeGrade == 0
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
                            <span v-if="gradeBatch.showScoreType == 3">
                                {{ $t("message.out_of") }}
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
                                        gradeBatch.showScoreType == 2 ||
                                            gradeBatch.showScoreType == 4
                                    "
                                    >{{ scoreValue }}</span
                                >
                                <span v-if="gradeBatch.showScoreType == 1">{{
                                    percentageScore
                                }}</span>
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
                        <!--<p class="grad-subSucceed" v-show="gradSucceed">Done</p>-->
                    </div>
                </div>
                <!--评语专栏-->
                <div class="grad-hader-box clearfix">
                    <div class="grad-intro1-content">
                        <el-input
                            type="textarea"
                            :rows="2"
                            maxlength="300"
                            :placeholder="$t('message.Enter_comments_here')"
                            v-model="textarea"
                            resize="none"
                            style="width:100%; margin-bottom:20px;"
                        ></el-input>
                        <p
                            class="grad-intro1-tips"
                            v-if="gradeBatch.releaseType == 1"
                        >
                            {{ $t("message.Send_comments_to_student") }}

                            <span style="word-break: break-all">{{
                                studentName
                            }}</span
                            >.
                        </p>
                        <p
                            class="grad-intro1-tips"
                            v-if="gradeBatch.releaseType == 2"
                        >
                            {{ $t("message.Group_Assignment_comments") }}
                        </p>
                        <div style="text-align: center;">
                            <el-button
                                style="background: #94a5d6; color: #fff; width: 80%; margin-top: 16px;"
                                @click="SubScore()"
                                >{{ $t("message.Submit") }}</el-button
                            >
                        </div>
                    </div>
                </div>
                <div class="grad-hader-box">
                    <p style="font-weight: bold;">
                        {{ $t("message.Comments_Dialog") }}
                    </p>
                    <ul
                        class="grad-intro1-list clearfix"
                        v-if="gradeCommentDataQuery != null"
                    >
                        <li v-for="item in gradeCommentDataQuery">
                            <p class="grad-intro1-img">
                                <span class="clearfix"
                                    ><img
                                        :src="gradeUrl + item.userFile"
                                        v-show="item.userFile"
                                        class="grade-userPic"
                                /></span>
                                <i
                                    class="iconfont icon1 icon-yonghutouxiang"
                                    v-show="item.userFile == null"
                                    style="font-size: 44px;"
                                ></i>
                            </p>
                            <span
                                class="grad-list-delete"
                                @click="gradeCommentEdit(item.id)"
                                ><i
                                    class="iconfont icon-delete"
                                    style="font-size: 16px;"
                                ></i
                            ></span>
                            <p class="grad-list-text">
                                <span :title="item.fullName"
                                    >{{ item.fullName }}:
                                    <label :title="item.content">{{
                                        item.content
                                    }}</label></span
                                >
                            </p>
                            <label class="grad-list-time">{{
                                timestampToTimes(item.createTime)
                            }}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--end: Batch grade-->
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import previewFile from "@/utils/previewFileGrade";
import dueDraw from "@/utils/dueDraw";
import availableDraw from "@/utils/availableDraw";
import defaultHead from "../../../../static/images/touxiang1.png";
//	import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            gradeGType: {
                1: this.$t("message.Multiple_Choice"),
                2: this.$t("message.Mulitple_Answers"),
                3: this.$t("message.True_False")
            },
            searchValue: "",
            typeValue: "2",
            sequence: "1",
            gradedStatus: "",
            studentName: "",
            studentIndex: 1,
            typeOptions: [
                {
                    value: "2",
                    label: this.$t("message.All")
                },
                {
                    value: "1",
                    label: this.$t("message.been_Graded")
                },
                {
                    value: "0",
                    label: this.$t("message.Haven_been_Graded")
                }
            ],
            typeOptions1: [
                {
                    value1: "1",
                    label1: this.$t("message.by_Submit_Time")
                },
                {
                    value1: "2",
                    label1: this.$t("message.by_Alphabetical_Name")
                }
            ],
            sequenceRadio: "1",
            isTask: true,
            BatchGrade: false,
            //				gradeBatch: false,
            switchValue: "",
            scoreValue: "",
            Submission: "",
            checked: false,
            HideName: false,
            textarea: "",
            //				activeName: 'first',
            radios: 1,
            ObjectiveValue: "",
            gradeBatch: "",
            gradeStatisticsQuery: [],
            gradeContentInfo: {},
            userId: "",
            gradeAssignmentReply: "",
            gradeCommentDataQuery: [],
            gradeScore: "",
            quizQuestionVo: [], //测验
            quizSubjectivityListVo: [], //测验主观题，
            studentListVos: [], //学生姓名显示;
            Nocontent: false, //无评分内容展示；
            showContent: true, //展示评分内容；
            types: "",
            propObj: {},
            gradSucceed: false, //评分成功显示tips
            submissionToView: [],
            subjectiveScore: "",
            FinalScore: 0, //总分
            sections: [], //所有班级
            users: [], //所有用
            quizRecordId: [],
            quizQuestionVoid: [],
            gradeUrl: this.GlobalUrl,
            userImg: "",
            gradeType: "",
            gradeBatch: [],
            gradeHttp: "",
            //gradeHttp:'http://',
            gradeContentStr: "",
            quizRecordId: "",
            disabledUpdte: false,
            rightDisabled: false,
            leftDisabled: false,
            gradeImgs: true,
            submitValue: "1",
            missionValue: 2,
            oneGradeStatisticsQuery: "",
            courseId: this.$route.query.courseId,
            percentageScore: null,
            gradeScheme: [],
            codes: "",
            completeGrade: "",
            gradeScores: "",
            scoress: null,
            defaultHead
        };
    },
    computed: {},
    props: [
        // 'gradeBatch',
        "groupList"
    ],
    components: {
        previewFile,
        "v-time": availableDraw,
        "v-Dtime": dueDraw
    },
    filters: {},
    watch: {
        //当评分方式为百分比评分的时候显示
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
        deep: true
    },
    created() {
        //	let width = document.body.clientWidth;
    },
    mounted() {
        this.getoneGrade();
        this.getAssignDataList();
        this.gradeSchemeList();
    },
    methods: {
        getAbsolutePath(relativePath, width, height) {
            if (relativePath === undefined) return defaultHead;
            if (width === undefined && height === undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        isRangeIn(num, minnum, maxnum, code) {
            if ((num < maxnum || num == 100) && num >= minnum) {
                return code;
            }
            return "";
        },
        leftSlide() {
            this.scoreValue = "";
            this.Submission = "";
            this.gradSucceed = false;
            this.userImg = "";
            this.gradeImgs = false;
            this.gradeStatisticsQuery.forEach((el, index) => {
                let tempIndex;
                if (el.id == this.gradedStatus) {
                    if (index == 0) {
                        tempIndex = 0;
                        this.leftDisabled = true;
                        //							this.rightDisabled = false;
                    } else {
                        this.leftDisabled = false;
                        tempIndex = index - 1;
                    }
                    this.studentIndex = tempIndex + 1;
                    this.gradedStatus = this.gradeStatisticsQuery[tempIndex].id;
                    if (this.HideName == true) {
                        if (this.gradeBatch.releaseType == 2) {
                            this.studentName = "group" + this.studentIndex;
                        } else {
                            this.studentName = "stu" + this.studentIndex;
                        }
                    } else {
                        if (
                            this.gradeBatch.releaseType == 2 &&
                            this.gradeBatch.originType == 2
                        ) {
                            this.studentName = el.groupName;
                        } else {
                            this.studentName = el.fullName;
                        }
                    }
                    this.gradeOneStuGroupQuery();
                    //						this.changeStudents(this.gradedStatus)
                }
            });
        },
        rightSlide() {
            this.scoreValue = "";
            this.Submission = "";
            this.gradSucceed = false;
            this.userImg = "";
            this.gradeImgs = false;
            this.leftDisabled = false;
            //				this.studentIndex =0;
            try {
                this.gradeStatisticsQuery.forEach((el, index) => {
                    let tempIndex;
                    if (
                        el.id == this.gradedStatus &&
                        index <= this.gradeStatisticsQuery.length - 1
                    ) {
                        tempIndex = index + 1;
                        if ((index = this.gradeStatisticsQuery.length - 1)) {
                        }
                        console.log("tempIndex", tempIndex);
                        //this.studentIndex = el._index + 1;
                        this.gradedStatus = this.gradeStatisticsQuery[
                            tempIndex
                        ].id;
                        if (this.HideName == true) {
                            if (this.gradeBatch.releaseType == 2) {
                                this.studentName =
                                    "group" + (this.studentIndex + 1);
                                this.studentIndex = this.studentIndex + 1;
                            } else {
                                this.studentName =
                                    "stu" + (this.studentIndex + 1);
                                this.studentIndex = this.studentIndex + 1;
                            }
                        } else {
                            if (
                                this.gradeBatch.releaseType == 2 &&
                                this.gradeBatch.originType == 2
                            ) {
                                this.studentName = el.groupName;
                            } else {
                                this.studentName = el.fullName;
                                //this.userImg = el.studentFile;
                            }
                        }
                        //查询单个学生
                        this.gradeOneStuGroupQuery();
                        //							this.changeStudents(this.gradedStatus);

                        throw "BreakException";
                    } else {
                        //							this.rightDisabled = true;
                        return;
                    }
                });
            } catch (e) {
                if (e !== "BreakException") throw e;
            }
        },
        formatSeconds(value) {
            var theTime = parseInt(value); // 秒
            var theTime1 = 0; // 分
            var theTime2 = 0; // 小时
            if (theTime > 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (theTime1 > 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }
            var result =
                " " +
                "" +
                parseInt(theTime) +
                " " +
                this.$t("message.second_s");
            if (theTime1 > 0) {
                result =
                    " " +
                    parseInt(theTime1) +
                    " " +
                    this.$t("message.minute_s") +
                    result;
            }
            if (theTime2 > 0) {
                result =
                    "" +
                    "" +
                    parseInt(theTime2) +
                    " " +
                    this.$t("message.hour_s") +
                    result;
            }
            return result;
        },
        //提交时间显示；
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
        },
        //文件显示；
        FileShow(fileUrl, fileType) {
            this.gradeImgs = true;
            this.propObj = {
                testUrl: fileUrl,
                testType: fileType
            };
        },
        changeStudents(item) {
            //				console.log("item",item);
            this.scoreValue = "";
            this.Submission = "";
            this.gradSucceed = false;
            this.gradedStatus = item;
            this.gradeImgs = false;
            this.leftDisabled = false;
            this.rightDisabled = false;
            try {
                this.gradeStatisticsQuery.forEach(el => {
                    if (el.id == this.gradedStatus) {
                        this.studentIndex = el._index + 1;
                        if (this.HideName == true) {
                            if (this.gradeBatch.releaseType == 2) {
                                this.studentName = "group" + this.studentIndex;
                                //									this.studentIndex = (this.studentIndex + 1);
                            } else {
                                this.studentName = "stu" + this.studentIndex;
                                //									this.studentIndex = (this.studentIndex + 1);
                            }
                        } else {
                            if (
                                this.gradeBatch.releaseType == 2 &&
                                this.gradeBatch.originType == 2
                            ) {
                                this.studentName = el.fullName;
                            } else {
                                this.studentName = el.studentName;
                            }
                        }
                        this.gradeOneStuGroupQuery();
                        //							this.getContentInfo();
                        throw "BreakException";
                    }
                }, this);
            } catch (e) {
                if (e !== "BreakException") throw e;
            }
        },
        //选择评分学生列表切换；
        selectStudents() {
            this.scoreValue = "";
            this.Submission = "";
            this.gradSucceed = false;
            this.userImg = "";
            //讨论小组显示小组名称
            this.gradeOneStuGroupQuery();
        },
        BackGrade() {
            this.$router.push({
                path: "/homePage/allCourse/grades",
                query: {
                    courseId: this.$route.query.courseId
                }
            });
        },
        bookGrade() {
            this.$router.push({
                path: "/homePage/allCourse/gradeBook",
                query: {
                    courseId: this.$route.query.courseId
                }
            });
        },
        //时间转换
        timestampToTimes(cjsj) {
            var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            var D =
                date.getDate() < 10
                    ? "0" + date.getDate() + "  "
                    : date.getDate() + " ";
            var h =
                date.getHours() < 10
                    ? "0" + date.getHours() + ":"
                    : date.getHours() + ":";
            var m =
                date.getMinutes() < 10
                    ? "0" + date.getMinutes() + ":"
                    : date.getMinutes() + ":";
            var s =
                date.getSeconds() < 10
                    ? "0" + date.getSeconds()
                    : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        BackTask() {
            this.BatchGrade = false;
            this.gradeBatch = false;
            this.isTask = true;
        },
        //逐一评分title显示
        async getoneGrade() {
            let originType = this.$route.query.originType;
            let originId = this.$route.query.originId;
            let title = this.$route.query.title;
            let unGraderIdcount = this.$route.query.unGraderIdcount;
            let graderIdcount = this.$route.query.graderIdcount;
            let score = this.$route.query.score;
            let isGradeAssignment = this.$route.query.isGradeAssignment;
            this.gradeType = 1;
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
            let params = {
                courseId: this.courseId,
                originType: originType,
                originId: originId,
                gradeType: 1,
                originName: title,
                score: score,
                releaseType: isGradeAssignment
            };
            let result = await this.$getData(
                "/gradeDataQuery/gradeQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeBatch = result.data.entity.gradeInfoVo;
                this.oneStatisticsQuery();
                this.gradeOneStuGroupQuery();
            } else {
            }
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
        //逐一评分提交人数展示
        async oneStatisticsQuery() {
            let params = {
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                releaseType: this.gradeBatch.releaseType, //1个人 ，2小组；
                studyGroupId: this.missionValue,
                submitStatus: this.submitValue,
                isGrade: 2,
                isGroupAndAll: 0,
                userId: this.types == 0 ? 0 : this.userId
            };
            let result = await this.$getData(
                "/gradeDataQuery/gradeStatisticsQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.oneGradeStatisticsQuery = result.data.entity;
            } else {
            }
        },

        //查询学生名称
        async gradeOneStuGroupQuery() {
            let originType = this.$route.query.originType;
            let originId = this.$route.query.originId;
            //let releaseType = this.$route.query.releaseType
            let params = {
                originType: originType,
                originId: originId,
                releaseType: this.gradeBatch.releaseType,
                sequence: this.sequence, //提交类型 1
                gradedStatus: this.typeValue //评分 2
            };
            let result = await this.$getData(
                "/gradeDataQuery/gradeOneStuGroupQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                if (this.gradeBatch.releaseType == 1) {
                    if (
                        result.data.entity.studentListVos.length == 0 ||
                        result.data.entity.studentListVos[0].id == 0
                    ) {
                        this.userId = "";
                        this.gradedStatus = "";
                        this.gradeStatisticsQuery = [];
                        this.Nocontent = true; //无评分内容展示；
                        this.gradeContentInfo = [];
                        this.gradeAssignmentReply = [];
                        this.gradeCommentDataQuery = [];
                        this.scoreValue = "";
                        this.studentName = "";
                        this.Submission = "";
                        this.submissionToView = [];
                        this.studentIndex = 0;
                        this.FinalScore = "";
                    }
                    //学生没有userid,小组的时候才会显示userid
                    if (
                        result.data.entity.studentListVos.length > 0 &&
                        result.data.entity.studentListVos[0].id != 0
                    ) {
                        this.gradeStatisticsQuery =
                            result.data.entity.studentListVos;
                        for (
                            var i = 0;
                            i < this.gradeStatisticsQuery.length;
                            i++
                        ) {
                            this.gradeStatisticsQuery[i]._index = i;
                        }
                        //解决切换显示第一个；
                        this.userId =
                            this.gradedStatus ||
                            result.data.entity.studentListVos[0].id;
                        this.gradedStatus =
                            this.gradedStatus ||
                            result.data.entity.studentListVos[0].id;
                        this.Nocontent = false; //无评分内容展示；
                        this.showContent = true; //内容展示；
                        if (this.HideName == true) {
                            this.gradeStatisticsQuery.forEach((el, index) => {
                                if (el.id == this.gradedStatus) {
                                    this.studentName = "stu" + (index + 1);
                                    this.studentIndex = el._index + 1;
                                }
                                this.$set(
                                    this.gradeStatisticsQuery[index],
                                    "fullName",
                                    "stu" + (index + 1)
                                );
                            });
                        } else {
                            this.gradeStatisticsQuery.forEach((el, index) => {
                                if (el.id == this.gradedStatus) {
                                    this.userImg = el.studentFile;
                                    this.studentName = el.fullName;
                                    this.studentIndex = el._index + 1;
                                    this.userImg = el.studentFile;
                                }
                            });
                        }
                        this.getContentInfo();
                    }
                } else {
                    if (
                        result.data.entity.groupListVoList.length == 0 ||
                        result.data.entity.groupListVoList[0].id == 0
                    ) {
                        this.userId = "";
                        this.gradedStatus = "";
                        this.gradeStatisticsQuery = [];
                        this.Nocontent = true; //无评分内容展示；
                        this.gradeContentInfo = [];
                        this.gradeAssignmentReply = [];
                        this.gradeCommentDataQuery = [];
                        this.scoreValue = "";
                        this.studentName = "";
                        this.Submission = "";
                        this.submissionToView = [];
                        this.studentIndex = 0;
                        this.FinalScore = "";
                    }
                    //判断是否是小组
                    if (
                        result.data.entity.groupListVoList.length > 0 &&
                        result.data.entity.groupListVoList[0].id != 0
                    ) {
                        var groupListVoLists =
                            result.data.entity.groupListVoList;
                        var obj = {};
                        this.gradeStatisticsQuery = [];
                        //筛选小组是否重复
                        for (var i = 0; i < groupListVoLists.length; i++) {
                            if (!obj[groupListVoLists[i].id]) {
                                this.gradeStatisticsQuery.push(
                                    groupListVoLists[i]
                                );
                                obj[groupListVoLists[i].id] = true;
                            }
                        }
                        for (
                            var i = 0;
                            i < this.gradeStatisticsQuery.length;
                            i++
                        ) {
                            this.gradeStatisticsQuery[i]._index = i;
                        }
                        this.userId =
                            this.gradedStatus ||
                            result.data.entity.groupListVoList[0].id;
                        this.gradedStatus =
                            this.gradedStatus ||
                            result.data.entity.groupListVoList[0].id;
                        this.Nocontent = false; //无评分内容展示；
                        this.showContent = true; //内容展示；
                        if (this.HideName == true) {
                            this.gradeStatisticsQuery.forEach((el, index) => {
                                if (el.id == this.gradedStatus) {
                                    this.studentName = "group" + (index + 1);
                                    this.studentIndex = el._index + 1;
                                }
                                this.$set(
                                    this.gradeStatisticsQuery[index],
                                    "groupName",
                                    "group" + (index + 1)
                                );
                            });
                        } else {
                            if (
                                this.gradeAssignmentReply.originType == 2 &&
                                this.gradeBatch.releaseType == 2
                            ) {
                                this.gradeStatisticsQuery.forEach(
                                    (el, index) => {
                                        if (el.id == this.gradedStatus) {
                                            this.studentName = el.groupName;
                                            this.studentIndex = el._index + 1;
                                            this.userImg = "";
                                        }
                                    }
                                );
                            } else {
                                this.gradeStatisticsQuery.forEach(
                                    (el, index) => {
                                        if (el.id == this.gradedStatus) {
                                            this.studentName = el.fullName;
                                            this.studentIndex = el._index + 1;
                                            this.userImg = el.studentFile;
                                        }
                                    }
                                );
                            }
                        }
                        this.getContentInfo();
                    }
                }
            } else {
            }
        },

        //查询评分学生提交时间顺序；
        SequenceChange() {
            this.gradeOneStuGroupQuery();
        },
        //查询评分学生提交状态
        GradedStatusChange() {
            this.gradedStatus = "";
            this.scoreValue = "";
            this.Submission = "";
            this.gradeOneStuGroupQuery();
        },
        //查询单个任务的组、学生单个提交作业
        async getContentInfo() {
            for (var i = 0; i < this.gradeStatisticsQuery.length; i++) {
                if (this.gradedStatus == this.gradeStatisticsQuery[i].id) {
                    this.userId = this.gradeStatisticsQuery[i].userId;
                    this.types = this.gradeStatisticsQuery[i].type;
                }
            }
            let params = {
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                //						gradeType: this.gradeBatch.gradeType,
                releaseType: this.gradeBatch.releaseType,
                studyGroupId: this.types != 0 ? "0" : this.gradedStatus,
                userId: this.userId
            };
            var params1 = params;
            //				}
            let result = await this.$getData(
                "/gradeDataQuery/gradeContentInfo/query",
                params1,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeContentInfo = result.data.entity;
                this.submissionToView = [];
                for (
                    var i = 0;
                    i < this.gradeContentInfo.submissionToView.length;
                    i++
                ) {
                    this.submissionToView.push(
                        this.timestampToTimes(
                            this.gradeContentInfo.submissionToView[i]
                        )
                    );
                }
                if (this.gradeContentInfo.submissionToView.length == 0) {
                    this.Submission = this.timestampToTimes(
                        this.gradeContentInfo.submittedTime
                    );
                } else {
                    this.Submission =
                        this.Submission ||
                        this.timestampToTimes(
                            this.gradeContentInfo.submissionToView[0]
                        );
                }
                this.postAssignmentReply(Date.parse(this.Submission));
                this.getCommentDataQuery();
            } else {
            }
        },
        //评分查询内容信息
        async postAssignmentReply(submittedTime) {
            //判断个人评分  this.gradeBatch.originType == 2 //讨论
            //				if(this.types != 0) {
            //					let params = {
            //						originType: this.gradeBatch.originType,
            //						originId: this.gradeBatch.originId,
            //						studyGroupId: "0",
            //						userId: this.userId,
            //						submitTime: submittedTime,
            //						courseId: this.gradeBatch.courseId,
            //					}
            //					var Replyparams = params
            //				} else {
            //判断小组评分
            let params = {
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                studyGroupId: this.types != 0 ? "0" : this.gradedStatus,
                userId: this.userId,
                submitTime:
                    typeof submittedTime == "undefined" ||
                    submittedTime == "" ||
                    isNaN(submittedTime)
                        ? 0
                        : Number(submittedTime),
                courseId: this.courseId
            };
            let result = await this.$getData(
                "/gradeDataQuery/gradeAssignmentReply/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeAssignmentReply = result.data.entity;
                if (
                    this.gradeAssignmentReply.originType == 2 &&
                    this.gradeBatch.releaseType == 2
                ) {
                    this.gradeStatisticsQuery.forEach((el, index) => {
                        if (el.id == this.gradedStatus) {
                            this.studentName = el.groupName;
                            this.studentIndex = index + 1;
                            this.userImg = "";
                        }
                    });
                }
                if (this.gradeAssignmentReply.content) {
                    this.gradeContentStr = this.gradeAssignmentReply.content.slice(
                        0,
                        7
                    );
                }

                if (result.data.entity.gradeScore != null) {
                    this.scoreValue = result.data.entity.gradeScore / 100;
                    if (Number(this.gradeBatch.showScoreType) === 1) {
                        this.scoreValue =
                            (result.data.entity.gradeScore /
                                result.data.entity.score) *
                            100;
                    }
                    if (
                        Number(this.gradeBatch.showScoreType) === 3 &&
                        Number(result.data.entity.gradeScore) === 0
                    ) {
                        this.completeGrade = 0;
                    }
                    if (
                        Number(this.gradeBatch.showScoreType) === 3 &&
                        Number(result.data.entity.gradeScore) ===
                            Number(result.data.entity.score)
                    ) {
                        this.completeGrade = String(
                            result.data.entity.gradeScore
                        );
                    }
                }
                this.quizQuestionVo =
                    result.data.entity.quizQuestionVo.quizObjectiveListVo;
                this.quizSubjectivityListVo =
                    result.data.entity.quizQuestionVo.quizSubjectivityListVo;
                var objNum = 0;
                if (
                    this.gradeAssignmentReply.originType == 3 &&
                    this.quizQuestionVo.length > 0
                ) {
                    this.quizQuestionVo.forEach(el => {
                        objNum += el.gradeScore / 100;
                    });
                }
                //					this.FinalScore = objNum;
                //判断主观题不等于空
                var SubjectivityNum = 0;
                if (
                    this.gradeAssignmentReply.originType == 3 &&
                    this.quizSubjectivityListVo.length > 0
                ) {
                    this.quizSubjectivityListVo.map(el => {
                        el.gradeScore = el.gradeScore / 100;
                        this.quizRecordId = el.quizRecordId;
                        SubjectivityNum += el.gradeScore;
                        if (el.gradeScore == 0) {
                            this.scoreValue = "";
                        } else {
                            this.scoreValue =
                                result.data.entity.gradeScore / 100;
                        }
                    });
                }
                this.FinalScore = objNum + SubjectivityNum;

                //					if (this.gradeAssignmentReply.originType == 3 && this.quizQuestionVo.length>0 && this.quizSubjectivityListVo.length==0) {
                //						this.SubScore();
                //					}
            } else {
            }
        },
        //打开新窗口
        open_win() {
            var url = this.gradeAssignmentReply.content;
            if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
                window.open(this.gradeAssignmentReply.content);
            } else {
                window.open(this.gradeHttp + this.gradeAssignmentReply.content);
            }
        },
        //提交评分
        async SubScore() {
            if (
                Number(this.gradeBatch.showScoreType) === 2 ||
                Number(this.gradeBatch.showScoreType) === 4
            ) {
                this.gradeScores = Number(this.scoreValue).toFixed(2) * 100;
            }
            if (Number(this.gradeBatch.showScoreType) === 1) {
                this.gradeScores =
                    (this.scoreValue / 100) * this.gradeBatch.score;
            }
            if (Number(this.gradeBatch.showScoreType) === 3) {
                this.gradeScores = this.completeGrade;
                console.log(this.completeGrade);
            }
            // this.gradeOneSubmit()
            let params = {
                courseId: this.gradeBatch.courseId,
                assignmentGroupItemId: this.gradeBatch.assignmentGroupItemId,
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                userId: this.userId,
                isSendGroupUser: "0",
                score: this.gradeBatch.score,
                gradeScore: this.gradeScores,
                isOverWrite: 0, // 是否覆盖之前的评分 0不覆盖  1覆盖
                isSetLowestScore: 0, // 设置最低评分 0不设置  1设置
                gradeType: this.gradeBatch.gradeType,
                releaseType: this.gradeBatch.releaseType,
                studyGroupId: this.gradedStatus,
                userType: this.types == 0 ? "0" : "1",
                content: this.textarea,
                showScoreType: this.gradeBatch.showScoreType
            };
            if (
                parseFloat(this.gradeScores / 100) >= 0 &&
                parseFloat(this.gradeScores / 100) <=
                    this.gradeBatch.score / 100
            ) {
                let result = await this.$getData(
                    "/gradedEdit/add",
                    params,
                    "post"
                );
                if (result.data.code == 200) {
                    this.textarea = "";
                    this.scoreValue = "";
                    this.getCommentDataQuery();
                    this.$message.success("success");
                } else {
                }
            } else {
                this.$message({
                    message: `Score range 0 to${this.gradeBatch.score / 100}.`,
                    type: "warning"
                });
            }
        },
        //提交评语；
        async gradeOneSubmit() {
            if (this.textarea == "") {
                this.$message({
                    message: this.$t(
                        "message.Please input comment content firstly"
                    ),
                    type: "warning"
                });
            } else {
                let params = {
                    courseId: this.gradeBatch.courseId,
                    assignmentGroupItemId: this.gradeBatch
                        .assignmentGroupItemId,
                    originType: this.gradeBatch.originType,
                    originId: this.gradeBatch.originId,
                    content: this.textarea,
                    userId: this.userId,
                    isSendGroupUser: "0",
                    gradeType: this.gradeBatch.gradeType,
                    releaseType: this.gradeBatch.releaseType,
                    studyGroupId: this.gradedStatus,
                    userType: this.types == 0 ? "0" : "1"
                };
                var stbAddParams = params;
                //					}

                let result = await this.$getData(
                    "/gradedCommentEdit/add",
                    stbAddParams,
                    "post"
                );
                if (result.data.code == 200) {
                    this.textarea = "";
                    this.getCommentDataQuery();
                } else {
                }
            }
        },

        //评语展示
        async getCommentDataQuery() {
            let params = {
                originType: this.gradeBatch.originType,
                originId: this.gradeBatch.originId,
                userId: this.userId,
                studyGroupId: this.gradedStatus
            };
            let result = await this.$getData(
                "/gradeDataQuery/gradedCommentDataQuery/query",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.gradeCommentDataQuery = result.data.entity;
            } else {
            }
        },
        //删除评语展示
        async gradeCommentEdit(id) {
            let params = {
                id: id
            };
            let result = await this.$getData(
                "/gradeCommentEdit/modify",
                params,
                "post"
            );
            if (result.data.code == 200) {
                this.getCommentDataQuery();
            } else {
            }
        },

        subScoreblur(num1, score, index) {
            if (num1 > score / 100) {
                this.$message({
                    message: "Score range 0 to" + score / 100 + ".",
                    type: "warning"
                });
                this.quizSubjectivityListVo[index].gradeScore = "";
                this.scoress = false;
            }
            // else if (!/^\d+(\.\d{1,1})?$/.test(num1)) {
            //     this.scoreValue = "";
            //     this.$message({
            //         message: "Score range 0 to" + score / 100 + ".",
            //         type: "warning"
            //     });
            //     this.quizSubjectivityListVo[index].gradeScore = "";
            // }
            else {
                this.scoress = true;
            }

            var num = 0;
            var currScore = 0;
            //客观题分数
            this.quizQuestionVo.forEach(el => {
                num += Number(el.gradeScore.toFixed(0));
            });
            //主观题分数
            this.quizSubjectivityListVo.forEach(el => {
                currScore += Number(el.gradeScore.toFixed(0) * 100);
            });
            this.FinalScore = (currScore + num) / 100;
        },
        //总得分显示比率；
        async scoreModify() {
            var ScoreList = [];
            this.quizSubjectivityListVo.forEach(el => {
                ScoreList.push(
                    el.id +
                        "_" +
                        Number(((el.gradeScore * 10000) / 100).toFixed(0))
                );
            });
            if (Boolean(this.scoress) === true) {
                let params = {
                    originId: this.gradeBatch.originId,
                    userId: this.userId,
                    studyGroupId: this.gradedStatus,
                    score: this.FinalScore * 100,
                    //submitTime: this.Submission,
                    topicScore: ScoreList.join(),
                    recordOriginId: this.quizRecordId
                };
                let result = await this.$getData(
                    "/scoreModify/modify",
                    params,
                    "post"
                );
                if (result.data.code == 200) {
                    this.scoreValue = result.data.message / 100;
                    this.getoneGrade();
                    this.$message.success("success");
                    this.getContentInfo();
                } else {
                }
            }
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped="" lang="less">
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
    }
    .grade-btn {
        float: right;
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
        width: 200px;
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
        border-bottom: 1px solid #eee;
        &:last-child {
            border-bottom: none;
        }
        .task-left {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: center;
            .task-leftTitle {
                margin-left: 18px;
                h1 {
                    font-size: 14px;
                    color: #666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 420px;
                }
                .tag-list {
                    li {
                        display: inline-block;
                        padding-right: 5px;
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
            > span {
                display: inline-block;
                margin-left: 24px;
                font-size: 14px;
                color: #666;
            }
        }
    }
}

.group-data {
    width: 55%;
    text-align: left;
    h2 {
        font-size: 14px;
        color: #333;
        margin-bottom: 16px;
    }
    h3 {
        font-size: 14px;
        color: #333;
        margin-bottom: 10px;
        margin-left: 20px;
    }
    .group-data-title {
        margin-left: 66px;
    }
}

.red {
    color: #f13026;
}

.grad-intro1 {
    float: right;
    height: 100%;
    background: #eee;
    width: 39%;
    margin-top: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*margin: 20px 30px 0px 0px;*/
}

.grad-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    font-style: italic;
}

.grad-intro1-title {
    margin-bottom: 40px;
    display: inline-block;
}

.grad-intro1-title .el-checkbox__label {
    padding-left: 4px !important;
}

.grad-intro1-title1 {
    margin-bottom: -2px !important;
}

.grad-intro1-left {
    float: left;
    width: 30%;
    .student-name {
        display: inline-block;
        width: 65px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.grad-intro1-right {
    float: right;
    text-align: right;
    width: 70%;
    position: relative;
    color: #333333;
}

.grade-ico {
    font-size: 44px;
    margin-top: 18px;
    display: inline-block;
}

.grade-userPic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.grad-intro1-right span {
    font-size: 22px;
    color: #aaaaaa;
    font-weight: bold;
    cursor: pointer;
}

.grad-intro1-right label {
    /*font-weight: bold;*/
}

.grad-hader-box {
    /*border-bottom: 1px solid #aaaaaa;*/
    padding: 20px 16px;
    /*align-items: center;
	    display: flex;*/
}
.grad-hader-name {
    align-items: center;
    display: flex;
}
.grade-left-box {
    width: 54%;
    float: left;
}

.grade-content-box {
    margin-bottom: 20px;
}

.grad-checkbox {
    margin-top: 16px;
    margin-left: 46px;
    margin-bottom: 20px;
    label {
        margin-left: 0;
    }
}

.grade-content-left {
    float: left;
    font-weight: bold;
    margin: 14px 0;
}
.grade-content-left li {
    color: #333333;
}

.grade-content-right {
    float: right;
    margin: 14px 0;
}

.grade-content-right h6 {
    font-weight: bold;
    color: #333;
}

.grade-content {
    border: 1px solid #cccccc;
    min-height: 320px;
}

.grade-content .grade-content-text {
    margin: 10px 0px 0px 10px;
    color: #737373;
    word-break: break-all;
}

.grad-intro1-tips {
    margin-bottom: 14px;
    color: #737373;
}

.grad-intro1-list {
    background: #fff;
    padding-left: 20px;
    padding-right: 10px;
    height: auto;
    margin-top: 10px;
}

.grad-intro1-list li {
    position: relative;
    border-bottom: 1px dashed #eeeeee;
    padding-left: 20px;
    margin-left: -20px;
    margin-right: -10px;
    padding-right: 10px;
}

.grad-intro1-list .grad-list-delete {
    position: absolute;
    right: 10px;
    top: 6px;
}

.grad-list-text {
    line-height: 24px;
    padding-top: 20px;
    width: 100%;
}

.grad-list-text span {
    width: 84%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}

.grad-intro1-img {
    float: left;
    width: 10%;
    height: 100%;
    margin-right: 10px;
    margin-top: 24px;
}
.grad-intro1-img .icon1 {
    display: inline-block;
    margin-top: 6px;
}

.grad-list-time {
    width: 100%;
    display: block;
    text-align: right;
    margin-bottom: 10px;
}

.msg-right {
    margin-left: 9%;
}

.msg-name {
    font-size: 16px;
    font-weight: bold;
    margin-top: 1.5%;
    word-break: break-all;
}

.msg-sections {
    font-size: 12px;
    color: #999999;
}

.msg-sections a {
    color: #304db7;
    margin-left: 10px;
    font-weight: 600;
}

.msg-title {
    margin-top: 16px;
    margin-bottom: 24px;
    font-weight: bold;
    font-size: 14px;
}

.msg-text {
    /*width: 100%;*/
    color: #4b4b4b !important;
    line-height: 24px;
    /deep/ p {
        word-break: break-all;
    }
}

.msg-text /deep/ img {
    max-width: 100% !important;
}
.msg-speak-minbox /deep/ img {
    max-width: 100% !important;
}
.rich-text /deep/ img {
    max-width: 100% !important;
}
/*.image img{
		width: 86% !important;
	}*/

.msg-file {
    color: #333333;
    font-weight: bold;
    margin: 14px 0;
}

.grade-content-title {
    position: relative;
    border: 1px solid #eee;
    padding: 16px;
}

.grade-title-ico {
    position: absolute;
}

.msg-speak {
    margin-top: 20px;
}

.msg-speak-text {
    width: 92%;
    position: relative;
    float: right;
    padding: 16px;
    border: 1px solid #eee;
    margin-bottom: 12px;
    display: inline-block;
    border-collapse: collapse;
}

.msg-speak-text1 {
    border-top: none;
    margin-top: -12px;
}

.msg-speak-top {
    border-top: 1px solid #aaa;
}

.msg-speak-ico {
    height: 22px;
    text-align: center;
}

.msg-speak-box {
    width: 78%;
    height: auto;
    margin-top: 15px;
}

.msg-speak {
    position: relative;
}

.msg-speak .reply-discuss {
    border-top: 1px solid #aaa;
    padding: 2% 1%;
}

.msg-speak-portrait {
    margin-top: 0;
}

.msg-text span {
    font-weight: bold;
}

.msg-speak-minbox {
    margin-left: 9%;
}

.msg-speak-time {
    margin: 20px 0;
    color: #999999;
}

.msg-speak-time-right {
    float: right;
    margin-right: 20px;
}

.msg-speak-unread {
    border: 1px solid #0e38b1;
    /*width: 60px;*/
    border-radius: 30px;
    display: inline-block;
    margin-right: 10px;
    background: #0e38b1;
}

.grade-quizee-content {
    border: 1px solid #aaa;
    border-radius: 5px;
    margin-top: 10px;
}

.grade-quizee-title {
    line-height: 60px;
    border-bottom: 1px solid #aaa;
}

.grade-quizee-title h4 {
    float: left;
    padding-left: 10px;
    font-weight: bold;
}

.grade-quizee-title span {
    display: block;
    float: right;
    margin-right: 16px;
}

.grade-quizee-box {
    margin-top: 20px;
    padding-left: 30px;
}

.grade-quizee-list li {
    padding-right: 20px;
    margin-bottom: 20px;
}

.grade-quizee-list li:first-child {
    margin-bottom: 30px;
}

.grade-quizee-list1 li:first-child {
    margin-bottom: 20px !important;
}

.grade-quizee-list1 li span {
    margin: 0 12px;
    margin-left: 20px;
}

.grade-subjectivity-title {
    font-weight: bold;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 30px;
}

.grade-quizee-seq {
    font-size: 16px;
    margin-left: 12px;
    /*font-weight: bold;*/
}

.gradScores {
    border-top: 1px solid #cccccc;
    p {
        width: 100%;
        text-align: right;
    }
}

.grade-contentUrl {
    text-align: center;
    p {
        width: 100%;
        overflow: hidden;
        label {
            margin-right: 16px;
            display: inline-block;
            float: left;
            text-align: center;
            margin-left: 10%;
        }
        a {
            margin-left: 10%;
            color: #0147ff;
            cursor: pointer;
        }
        span {
            width: 40%;
            display: block;
            float: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
        }
    }
}

.grade-attachments {
    margin-bottom: 16px;
    p {
        color: #0147ff;
        margin-top: 16px;
        cursor: pointer;
    }
}

.grade-left-boxNo {
    margin-top: 10px;
    font-size: 16px;
}

.grad-subSucceed {
    width: 60px;
    height: 30px;
    margin-top: 6px;
    text-align: center;
    border: 1px solid #cccccc;
    color: yellowgreen;
    margin-left: 40px;
    border-radius: 5px;
    background: #ffffff;
    line-height: 30px;
}
.grade-slide {
    font-size: 22px;
    color: #aaaaaa;
    font-weight: bold;
    cursor: pointer;
}
.geader-slidename {
    float: right;
    width: 70%;
    top: -8px;
    position: relative;
    color: #333333;
}
.grad-intro1-right1 {
    width: 70%;
    display: inline;
    text-align: right;
    position: relative;
    color: #333333;
}
.task-left-h1 {
    width: 140px;
    height: 49px;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 30px;
    border-right: 1px solid #eeeeee;
    padding: 20px;
    margin-right: 14px;
    padding-left: 0;
    margin-left: 0;
}
</style>
