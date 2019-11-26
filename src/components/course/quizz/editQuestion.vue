<template>
    <div class="question-edit-component">
        <!--eslint-disable-->
        <div class="row">
            <el-input
                :placeholder="$t('message.Question_Name')"
                v-model="question.title"
                style="width: 30%"
                minlength="1"
                maxlength="50"
            >
            </el-input>
            <el-select
                v-model="question.type"
                :placeholder="$t('message.Question_Type')"
                @change="changeQuestionType"
            >
                <el-option
                    v-for="type in questionTypes"
                    :key="type.value"
                    :label="type.text"
                    :value="type.value"
                >
                </el-option>
            </el-select>
            <el-form
                ref="scoreForm"
                :model="question"
                :rules="scoreRules"
                class="score-form"
                style="float:right"
                label-width="60px"
            >
                <el-form-item prop="score" :label="$t('message.Pts')">
                    <el-input
                        v-model="question.score"
                        class="score-input"
                    ></el-input>
                </el-form-item>
            </el-form>
            <!-- <p class="tip">Enter your question, specifying where each blank should go. Students must type answers into text boxes at each blank.</p> -->
        </div>
        <div class="row">
            <h4>{{ $t("message.Question") }}</h4>
            <!--<p class="tip">In the box below, every place you want to show an answer box, type a reference word (no spaces) surrounded by brackets(i.e. "Roses are [color1], violets are [color2]")</p>-->
        </div>
        <div class="row">
            <h4>{{ $t("message.Message_Text") }}</h4>
            <ckeditor
                :editor="editor"
                v-model="question.content"
                :config="editorConfig"
                style="width: 640px"
            ></ckeditor>
        </div>
        <div class="row">
            <div v-if="question.type == 1">
                <el-form label-width="160px" class="demo-dynamic">
                    <el-form-item
                        :label="$t('message.Options')"
                        v-if="question.options && question.options.length > 0"
                    >
                        <el-radio-group
                            @input="setCorrectOption($event)"
                            v-model="radioAnswer"
                        >
                            <el-radio
                                v-for="(option, index) in question.options"
                                :key="index"
                                :label="index"
                                style="display: block;margin-right: 0"
                            >
                                <span class="opt-answer-code">{{
                                    codeObjList[index].name
                                }}</span>
                                <el-input
                                    type="textarea"
                                    v-model="option.content"
                                >
                                </el-input>
                                <i
                                    class="el-icon-delete"
                                    @click.prevent="removeOption(option, index)"
                                ></i>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addOption" style="float:right">{{
                            $t("message.Add_Another_Answer")
                        }}</el-button>
                    </el-form-item>
                    <!--<el-form-item label="Correct Comment">-->
                    <!--<el-input type="textarea" v-model="question.correctComment" placeholder="Correct Comment"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="Error Comment">-->
                    <!--<el-input type="textarea" v-model="question.wrongComment" placeholder="Wrong Comment"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item :label="$t('message.Explain')">
                        <el-input
                            type="textarea"
                            v-model="question.generalComment"
                            :placeholder="$t('message.Answer_Explain')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancel">{{
                            $t("message.Cancel")
                        }}</el-button>
                        <el-button type="primary" @click="submit">
                            {{ $t("message.Update_Question") }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="question.type == 2">
                <el-form label-width="160px" class="demo-dynamic">
                    <el-form-item
                        :label="$t('message.Options')"
                        v-if="question.options && question.options.length > 0"
                    >
                        <div>
                            <el-checkbox
                                v-for="(option, index) in question.options"
                                v-model="option.isCorrect"
                                :true-label="1"
                                :false-label="0"
                                :key="index"
                                :label="index"
                                style="display: block;margin-right: 0"
                            >
                                <span class="opt-answer-code">{{
                                    codeObjList[index].name
                                }}</span>
                                <el-input
                                    type="textarea"
                                    v-model="option.content"
                                >
                                </el-input>
                                <i
                                    class="el-icon-delete"
                                    @click.prevent="removeOption(option, index)"
                                ></i>
                            </el-checkbox>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addOption" style="float:right">{{
                            $t("message.Add_Another_Answer")
                        }}</el-button>
                    </el-form-item>
                    <!--<el-form-item label="Correct Comment">-->
                    <!--<el-input type="textarea" v-model="question.correctComment" placeholder="Correct Comment"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="Error Comment">-->
                    <!--<el-input type="textarea" v-model="question.wrongComment" placeholder="Wrong Comment"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item :label="$t('message.Explain')">
                        <el-input
                            type="textarea"
                            v-model="question.generalComment"
                            :placeholder="$t('message.Answer_Explain')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancel">{{
                            $t("message.Cancel")
                        }}</el-button>
                        <el-button type="primary" @click="submit">
                            {{ $t("message.Update_Question") }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="question.type == 3">
                <el-form label-width="160px">
                    <el-form-item
                        :label="$t('message.Options')"
                        v-if="question.options && question.options.length > 0"
                    >
                        <el-radio-group
                            @change="setCorrectOption"
                            v-model="radioAnswer"
                        >
                            <el-radio
                                v-for="(option, index) in question.options"
                                :key="index"
                                :label="index"
                                style="display: block"
                            >
                                <span class="opt-answer-code">{{
                                    codeObjList[index].name
                                }}</span>
                                <span class="content">{{
                                    option.content
                                }}</span>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--<el-form-item label="Correct Comment">-->
                    <!--<el-input type="textarea" v-model="question.correctComment" placeholder="Correct Comment"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="Error Comment">-->
                    <!--<el-input type="textarea" v-model="question.wrongComment" placeholder="Wrong Comment"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item :label="$t('message.Explain')">
                        <el-input
                            type="textarea"
                            v-model="question.generalComment"
                            :placeholder="$t('message.Answer_Explain')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancel">{{
                            $t("message.Cancel")
                        }}</el-button>
                        <el-button type="primary" @click="submit">
                            {{ $t("message.Update_Question") }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="question.type == 6">
                <el-form label-width="160px">
                    <el-form-item :label="$t('message.Explanation')">
                        <el-input
                            type="textarea"
                            :placeholder="$t('message.general_Comment')"
                            v-model="question.generalComment"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancel">{{
                            $t("message.Cancel")
                        }}</el-button>
                        <el-button type="primary" @click="submit">
                            {{ $t("message.Update_Question") }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>

<script>
/* eslint-disable */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import baseValidater from "@/utils/baseValidater";

export default {
    name: "edit-question",
    components: {
        //ckeditor: ClassicEditor
    },
    props: {
        showScore: {
            type: Boolean,
            default: true
        },
        inputQuestion: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: process.env.NODE_ENV + "/ckupload"
                }
            },
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
            questionTypes: [
                {
                    value: 1,
                    text: this.$t("message.Multiple_Choice")
                },
                {
                    value: 2,
                    text: this.$t("message.Mulitple_Answers")
                },
                {
                    value: 3,
                    text: this.$t("message.True_False")
                },
                {
                    value: 6,
                    text: this.$t("message.Essay_Question")
                }
            ],

            scoreRules: {
                score: [
                    {
                        required: true,
                        message: this.$t("message.Points_possible_is_required"),
                        trigger: "blur"
                    },
                    {
                        validator: baseValidater.pointValidatequiz,
                        trigger: "blur"
                    }
                ]
            },
            radioAnswer: -1,
            question: {}
            //trueFalseAnswer: -1
        };
    },
    watch: {
        inputQuestion: {
            handler: function(q, old) {
                this.question = q;
                this.radioAnswer = -1;
                if (q.type == 1 || (q.type == 3 && q.options)) {
                    this.radioAnswer = q.options.findIndex(q => q.isCorrect);
                }
            },
            immediate: true
        }
    },
    created() {
        this.question = this.inputQuestion;
    },
    methods: {
        changeQuestionType() {
            // 切换类型处理
            switch (this.question.type) {
                case 1:
                case 2:
                    if (this.question.options && this.question.options.length) {
                        //只复制内容, 否则多选切成单选会有多个正确答案
                        this.question.options = this.question.options.map(
                            option => ({
                                content: option.content,
                                isCorrect: 0
                            })
                        );
                    } else {
                        this.$set(this.question, "options", [
                            {
                                content: "",
                                isCorrect: 0
                            },
                            {
                                content: "",
                                isCorrect: 0
                            }
                        ]);
                    }
                    break;
                case 3:
                    this.$set(this.question, "options", [
                        {
                            content: "True"
                        },
                        {
                            content: "False"
                        }
                    ]);
                    break;
                case 6:
                    this.$delete(this.question, "options");
                    break;
            }
            // console.log(this.question.type, this.question.options)
        },
        removeOption(option, index) {
            if (option.id) {
                let ids = [option.id];
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
                                    this.question.options.splice(index, 1);
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(() => {});
            } else {
                this.question.options.splice(index, 1);
            }
        },
        addOption() {
            var option = {
                content: "",
                isCorrect: 0
            };
            if (!this.question.options) {
                this.$set(this.question, "options", [option]);
            } else {
                this.question.options.push(option);
            }

            //console.log(this.question.options);
        },

        setCorrectOption(index) {
            this.question.options.forEach((option, i) => {
                option.isCorrect = (i == index) & 1;
            });
            //console.log(this.radioAnswer, this.question.options, index);
        },
        submit() {
            // todo valid
            if (this.question.options && this.question.type != "6") {
                this.question.options.forEach((option, index) => {
                    option.code = this.codeObjList[index].name;
                    option.seq = index + 1;
                    option.isCorrect = option.isCorrect & 1;
                });
                if (!this.question.options.some(option => option.isCorrect)) {
                    return this.$message({
                        message: this.$t("message.At_least_one_correct_option"),
                        type: "error"
                    });
                }
            }
            if (this.showScore) {
                return this.$refs.scoreForm.validate(isValid => {
                    // console.log(isValid);
                    if (isValid) {
                        this.$emit("submit", this.question);
                    }
                });
            }
            this.$emit("submit", this.question);
        },

        cancel() {
            this.$emit("cancel");
        }
    }
};
/*eslint-disable no-new*/
</script>
<style lang="less">
.question-edit-component {
    margin: 0 1%;
    .demo-dynamic {
        max-width: 600px;
        margin: 30px auto;
    }
    h4 {
        font-size: 14px;
        font-weight: bold;
    }
    .row {
        margin: 16px 0;
    }
    .score-input {
        width: 70px;
    }
    .score-form .el-form-item__error {
        white-space: nowrap;
        right: 0;
        left: auto;
    }
}
</style>
