<template>
    <div class="take-quiz-component">
        <!--eslint-disable-->
        <div class="quiz-index">
            <slot />
            <div class="quiz-question-index">
                <h4>{{ $t("message.Question") }}</h4>

                <ul>
                    <li
                        v-for="(question, index) in questionList"
                        :key="question.id"
                        class="index-item"
                        :class="{ complete: question.isComplete }"
                    >
                        <i class="el-icon-check" />
                        {{ $t("message.Questions") }} {{ index + 1 }}
                    </li>
                </ul>
            </div>
            <div v-if="quiz.timeLimit">
                <h4>
                    {{ $t("message.Time_Elapsed") }}:
                    <a
                        class="toggle-duration"
                        @click="showDuration = !showDuration"
                    >
                        {{
                            showDuration
                                ? $t("message.Hide")
                                : $t("message.Show")
                        }}</a
                    >
                </h4>
                <p v-show="showDuration" class="quiz-duration">
                    {{ duration }}
                </p>
            </div>
            <div v-else>
                {{ $t("message.The_time_is_not_limited") }}
            </div>
        </div>
        <div class="quiz-content">
            <h4 class="studentTitle_title">
                {{ quiz.title }}
            </h4>
            <div v-if="isPreview" class="preview-tip">
                <i class="el-icon-warning" />
                {{ $t("message.this_is_a_preview_of") }}
            </div>
            <ul class="question-list">
                <li
                    v-for="(question, index) in questionList"
                    :key="question.id"
                    class="question-item"
                >
                    <div class="question-hd">
                        {{ index + 1 }}.
                        <span>
                            {{ question.title }}
                        </span>
                        <span class="pts"> {{ question.score / 100 }}pts </span>
                    </div>
                    <div class="question-bd">
                        <div
                            class="question-content"
                            v-html="question.content"
                        />
                        <div v-if="question.type == 1" class="question-answer">
                            <el-radio-group
                                v-model="question.__value"
                                @change="onQuestionReply(question)"
                            >
                                <p
                                    v-for="(opt, index) in question.options"
                                    :key="opt.id"
                                >
                                    <el-radio
                                        :label="index"
                                        class="submitMatterred"
                                    >
                                        {{ opt.content }}
                                    </el-radio>
                                </p>
                            </el-radio-group>
                        </div>
                        <div v-if="question.type == 2" class="question-answer">
                            <el-checkbox-group
                                v-model="question.__value"
                                @change="onQuestionReply(question)"
                            >
                                <p
                                    v-for="(opt, index) in question.options"
                                    :key="opt.id"
                                >
                                    <el-checkbox
                                        :label="index"
                                        class="submitMatterred"
                                    >
                                        {{ opt.content }}
                                    </el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                        <div v-if="question.type == 3" class="question-answer">
                            <el-radio-group
                                v-model="question.__value"
                                @change="onQuestionReply(question)"
                            >
                                <p
                                    v-for="(opt, index) in question.options"
                                    :key="opt.id"
                                >
                                    <el-radio
                                        :label="index"
                                        class="submitMatterred"
                                    >
                                        {{ opt.content }}
                                    </el-radio>
                                </p>
                            </el-radio-group>
                        </div>
                        <div
                            v-if="question.type == 6"
                            class="question-answer reply-wrap"
                        >
                            <el-input
                                v-model="question.reply.reply"
                                type="textarea"
                                @blur="onQuestionReply(question)"
                            />
                        </div>
                    </div>
                </li>
            </ul>
            <div class="btn-group">
                <el-button
                    type="primary"
                    class="float-right"
                    @click="submitRecord"
                >
                    {{ $t("message.Submit_Quiz") }}
                </el-button>
            </div>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
export default {
    name: "TakeQuiz",
    props: {
        recordId: {
            type: String,
            required: true
        },
        quiz: {
            type: Object,
            required: true
        },
        isPreview: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            questionList: [],
            showDuration: true,
            duration: ""
        };
    },
    created() {
        this.init();
        this.$watch("recordId", recordId => {
            if (recordId) {
                this.init();
            }
        });
    },
    destroyed() {
        this.destroyTimer();
    },
    methods: {
        init() {
            this.getQuestionList();
            if (this.quiz.timeLimit) {
                this.getStartTime().then(startTime => {
                    // let sysCurrent = +new Date() - this.quiz.serverTime;
                    console.log(this.quiz.timeDiff);
                    this.startDurationCount(
                        startTime + (this.quiz.timeDiff || 0)
                    );
                });
            }
            this.postingQuestionCount = 0;
        },
        getStartTime() {
            return this.$getData("/quizRecord/list", {
                quizId: this.quiz.id
            }).then(res => {
                if (res.data.code == 200) {
                    const currQuiz = res.data.entity.find(
                        item => item.id == this.recordId
                    );
                    // console.log('lastAttamp', currQuiz, this.recordId)
                    return currQuiz ? currQuiz.startTime : +new Date();
                }
            });
        },
        getQuestionList() {
            return this.$getData("quizQuestionTestRecord/list", {
                quizRecordId: this.recordId
            }).then(res => {
                if (res.data.code == 200) {
                    const list = res.data.entity;
                    // 选项排序
                    list.forEach(question => {
                        if (question.options) {
                            question.options.sort((a, b) =>
                                b.seq < a.seq ? 1 : -1
                            );
                        }
                    });
                    this.questionList = list.map(item => {
                        if (item.type == 6) {
                            // 简答
                            if (item.reply) {
                                item.isComplete = Boolean(item.reply.reply);
                            } else {
                                item.reply = {
                                    reply: ""
                                };
                            }
                        } else {
                            // 单选，多选，判断
                            let ret;
                            if (item.type == "2") {
                                ret = [];
                                item.options.forEach((option, index) => {
                                    if (option.isChoice) {
                                        ret.push(index);
                                        item.isComplete = true;
                                    }
                                });
                            } else {
                                ret = item.options.findIndex(i => i.isChoice);
                                item.options.forEach((option, index) => {
                                    if (option.isChoice) {
                                        item.isComplete = true;
                                    }
                                });
                            }
                            item.__value = ret;
                        }
                        return item;
                    });
                }
            });
        },

        onQuestionReply(question) {
            // question.__value 存储选项值
            switch (question.type) {
                case 1:
                case 3:
                    question.options.forEach((option, index) => {
                        option.isChoice = index === question.__value ? 1 : 0;
                    });
                    question.isComplete = question.__value > -1;
                    break;
                case 2:
                    question.options.forEach((option, index) => {
                        option.isChoice =
                            question.__value.indexOf(index) > -1 ? 1 : 0;
                    });
                    question.isComplete = question.__value.length;
                    break;
                default:
                    question.isComplete = !!(
                        question.reply && question.reply.reply
                    );
                // 简答
            }

            // 提交上一题
            /* if (question.id !== this.lastModifyId) {
                      this.lastModifyId && this.submitQuestionById(this.lastModifyId);
                      this.lastModifyId = question.id;
                    } */
            return this.submitQuestion(question);
        },

        submitQuestionById(id) {
            const question = this.questionList.find(
                question => question.id === id
            );
            return this.submitQuestion(question);
        },

        async submitQuestion(question) {
            if (!question) {
                return;
            }

            // 删除掉 __value
            const data = Object.assign({}, question);
            delete data.__value;
            this.postingQuestionCount++;

            this.$getData("/quizQuestionRecord/modify", data, "post")
                .then(res => {
                    if (res.data.code == 200) {
                        // question.isComplete = true; // 标记为答题完成
                    }
                    this.submitQuestionCallback();
                })
                .catch(e => {
                    this.submitQuestionCallback();
                });
        },

        submitQuestionCallback() {
            this.postingQuestionCount--;
            if (this.postingQuestionCount <= 0) {
                this.$emit("_submit_queue_empty");
            }
        },

        /**
         * @param isTimeout boolean，true表示超时自动提交
         */
        async submitRecord($event, isTimeout) {
            // await this.submitQuestionById(this.lastModifyId);
            if (isTimeout) {
                this.destroyTimer();
                return this._emitSubmitRecord();
            }

            if (this.postingQuestionCount > 0) {
                // 问题还在提交中...
                const $loading = this.$loading({
                    text: "Waiting..."
                });
                return this.$once("_submit_queue_empty", () => {
                    $loading.close();
                    this.submitRecord();
                });
            }
            // 有未答问题提示
            const unCompleteCount = this.questionList.reduce(
                (sum, a) => (sum += a.isComplete ? 0 : 1),
                0
            );
            if (unCompleteCount > 0 && unCompleteCount <= 1) {
                return this.$confirm(
                    `You have ${unCompleteCount} unanswered question(see the right sidebar for detail. Submit anyway`,
                    "",
                    {
                        confirmButtonText: this.$t("message.Yes"),
                        cancelButtonText: this.$t("message.Cancel"),
                        type: "warning"
                    }
                ).then(
                    () => {
                        this._emitSubmitRecord();
                    },
                    () => {
                        console.log("user cancel submit quiz");
                    }
                );
            }
            if (unCompleteCount > 1) {
                return this.$confirm(
                    `You have ${unCompleteCount} unanswered questions(see the right sidebar for detail. Submit anyway`,
                    "",
                    {
                        confirmButtonText: this.$t("message.Yes"),
                        cancelButtonText: this.$t("message.Cancel"),
                        type: "warning"
                    }
                ).then(
                    () => {
                        this._emitSubmitRecord();
                    },
                    () => {
                        console.log("user cancel submit quiz");
                    }
                );
            }
            this._emitSubmitRecord();
        },

        _emitSubmitRecord() {
            this.$emit("submitRecord", {
                recordId: this.recordId,
                questionList: this.questionList.map(question => {
                    // 删除掉 __value
                    const data = Object.assign({}, question);
                    delete data.__value;
                    return data;
                })
            });
        },
        startDurationCount(startTime) {
            this.destroyTimer();
            const totalTime = this.quiz.timeLimit * 60 * 1000;
            this._timer = setInterval(() => {
                const duration = +new Date() - startTime;
                const timeElapsed = totalTime - duration;
                this.duration = msToHours(timeElapsed);

                if (totalTime <= duration) {
                    // 超出时间限制
                    console.log("超时强制提交");
                    this.submitRecord(null, true);
                }
            }, 1000);
        },
        destroyTimer() {
            if (this._timer) {
                clearInterval(this._timer);
                this._timer = null;
            }
        }
    }
};

function pad(number) {
    if (number < 10) {
        return `0${number}`;
    }
    return `${number}`;
}

function msToHours(ms) {
    ms = Math.max(0, ms);
    ms = Math.floor(ms / 1000);
    const hours = pad(Math.floor(ms / 3600));
    const minutes = pad(Math.floor((ms % 3600) / 60));
    const seconds = pad(ms % 60);
    return [hours, minutes, seconds].join(":");
}

/*eslint-disable*/
</script>

<style lang="less">
.take-quiz-component {
    .quiz-content {
        margin-right: 25%; /*margin-right: 290px;*/
        padding: 0 30px 30px;
        border: 1px solid #eee;
        .title {
            font-size: 18px;
            color: #333;
            line-height: 60px;
            display: inline-block;
            cursor: pointer;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .studentTitle_title {
            font-size: 18px;
            color: #333;
            line-height: 60px;
            display: inline-block;
            /*cursor: pointer ;*/
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .preview-tip {
            border: 1px solid #f13026;
            color: #f13026;
            padding: 1%;
            border-radius: 4px;
            background-color: #fef7f6;
            margin-bottom: 10px;
        }
    }

    .quiz-index {
        /*width: 260px;*/
        float: right;

        h4 {
            font-weight: bold;
            color: #333;
        }

        .quiz-duration {
            color: #999;
            font-size: 16px;
            margin-left: 16px;
        }
    }

    .question-item {
        border: 1px solid #aaa;
        border-radius: 4px;
        font-size: 12px;
        margin-bottom: 20px;

        .question-hd {
            padding: 0 10px;
            color: #333;
            font-weight: bold;
            line-height: 40px;
            border-bottom: 1px solid #aaa;

            .pts {
                float: right;
                color: #999;
                font-weight: normal;
            }
        }
        .question-bd {
            padding: 25px 30px;
            .question-answer {
                padding-left: 30px;
            }
        }

        .question-content {
            color: #333;
            font-size: 14px;
            /*line-height: 1;*/
            width: 100%;
            height: auto;
            word-wrap: break-word;
            /*word-break:break-all;*/
            overflow: hidden;
        }
        .question-answer p {
            margin-top: 20px;
            line-height: 1;
            .submitMatterred {
                white-space: inherit !important;
                width: 100%;
                height: auto;
                word-wrap: break-word;
                word-break: break-all;
                .el-checkbox__label {
                    line-height: 20px;
                }
                .el-radio__label {
                    line-height: 20px;
                }
            }
        }

        .reply-wrap {
            margin-top: 10px;
        }
    }
    .quiz-question-index {
        .index-item {
            margin-left: 16px;
            color: #144efc;
            .el-icon-check {
                color: #666;
                display: none;
            }
        }
        .complete .el-icon-check {
            display: inline-block;
        }
    }
    .btn-group {
        &::after {
            display: block;
            content: "";
            clear: both;
        }
        .float-right {
            float: right;
        }
    }
    .el-radio__label,
    .el-checkbox__label {
        color: #666;
        font-weight: normal;
    }

    .toggle-duration {
        cursor: pointer;
        display: inline-block;
        padding: 0 4px;
        color: #144efc;
    }
}
</style>
