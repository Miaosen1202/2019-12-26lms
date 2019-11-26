<template>
    <div>
        <!--eslint-disable-->
        <div class="className">
            <div class="modules-list">
                <!--无数据是展示-->
                <div
                    v-if="moduleDataList == 0"
                    class="modules-group"
                    style="text-align: center;"
                >
                    <span>{{ $t("message.No_modules_have") }}</span>
                </div>
                <div
                    v-for="(modulex, indexx) in moduleDataList"
                    :key="indexx"
                    class="modules-group"
                >
                    <div class="module-heard">
                        <h3
                            v-trigger
                            style="display: inline-block;cursor: pointer"
                            @click="collapseModule(modulex, indexx)"
                        >
                            <i
                                v-show="modulex.isOpen"
                                class="iconfont icon-sanjiao_xia"
                            />
                            <i
                                v-show="!modulex.isOpen"
                                class="iconfont icon-sanjiaoyou"
                            />
                            {{ modulex.name }}
                        </h3>
                        <p
                            v-show="modulex.completeStatus == 1"
                            style="float: right;padding-right: 2%"
                        >
                            <i
                                class="iconfont icon-dui"
                                style="color: #55C21F;font-size: 16px!important"
                            />
                        </p>
                    </div>
                    <div />
                    <div class="module-border">
                        <div
                            v-if="
                                modulex.moduleItems.length == 0 &&
                                    modulex.isShow
                            "
                            class="content modules-row"
                            style="text-align: center;"
                        >
                            <span>{{
                                $t("message.ASSIGNMENT.noModuleData")
                            }}</span>
                        </div>
                        <div
                            v-for="(moduleItemt, ind) in modulex.moduleItems"
                            v-show="modulex.isShow"
                            :key="ind"
                            class="content"
                        >
                            <div class="modules-row">
                                <div
                                    style="position: absolute;top: 34%;"
                                    :style="{
                                        'margin-left':
                                            moduleItemt.indentLevel * 20 + 'px'
                                    }"
                                >
                                    <!--<img v-if="moduleItem.originType==1"
                                    height="20" width="20"
                                    src="../../../../static/images/assign.png"/>-->
                                    <i
                                        v-if="moduleItemt.originType == 1"
                                        class="iconfont icon-icon-edit i_edit"
                                    />
                                    <i
                                        v-else-if="moduleItemt.originType == 2"
                                        class="iconfont icon-liaotian i_edit"
                                    />
                                    <!--<img v-else-if="moduleItem.originType==2" height="20" width="20"-->
                                    <!--src="../../../../static/images/Discussions.png"/>-->
                                    <!--<img v-else-if="moduleItem.originType==3" height="20" width="20"-->
                                    <!--src="../../../../static/images/quiz.png"/>-->
                                    <i
                                        v-else-if="moduleItemt.originType == 3"
                                        class="iconfont icon--xiugaineirong i_edit"
                                    />
                                    <i
                                        v-else-if="moduleItemt.originType == 4"
                                        class="iconfont icon-file1"
                                    />

                                    <i
                                        v-else-if="moduleItemt.originType == 14"
                                        class="iconfont icon-attach"
                                    />
                                </div>
                                <!--<a-->
                                <!--class="studentTitle"-->
                                <!--@click="goTo(moduleItemt)"-->
                                <!--&gt;{{ moduleItemt.title }}</a>-->
                                <div
                                    :style="{
                                        'margin-left':
                                            moduleItemt.indentLevel * 20 + 'px'
                                    }"
                                >
                                    <a
                                        v-show="moduleItemt.originType != 13"
                                        style="cursor: pointer;margin-left: 23px;"
                                        class="titleHeading"
                                        @click="goTo(moduleItemt)"
                                        >{{ moduleItemt.title }}</a
                                    >
                                    <a
                                        v-show="moduleItemt.originType == 13"
                                        class="titleHeader"
                                        >{{ moduleItemt.title }}</a
                                    >
                                </div>
                                <div
                                    style="position: absolute;top: 30%;right: 20px"
                                >
                                    <p v-show="moduleItemt.completeStatus == 1">
                                        <i
                                            class="iconfont icon-dui"
                                            style="color: #55C21F;font-size: 16px!important"
                                        />
                                    </p>
                                    <!--<p v-show="moduleItemt.completeStatus == 0 &&
                                    moduleItemt.limitTime > Date.parse(new Date())">-->
                                    <!--</p>-->
                                    <p
                                        v-show="
                                            moduleItemt.completeStatus == 0 &&
                                                moduleItemt.limitTime <
                                                    Date.parse(new Date())
                                        "
                                    >
                                        <!--&&moduleItemt.limitTime|formatterDate<-->
                                        <i
                                            class="iconfont icon-chidao"
                                            style="font-size: 20px!important;color: #F13026;"
                                        />
                                    </p>
                                </div>
                                <div
                                    v-show="
                                        moduleItemt.originType != 13 &&
                                            moduleItemt.originType != 14 &&
                                            moduleItemt.originType != 4
                                    "
                                    class="quizzes-time"
                                >
                                    <ul
                                        :style="{
                                            'margin-left':
                                                moduleItemt.indentLevel * 20 +
                                                'px'
                                        }"
                                    >
                                        <v-due-time
                                            :assigns="moduleItemt.assigns"
                                        />
                                        <v-available-time
                                            :assigns="moduleItemt.assigns"
                                        />
                                        <li v-if="moduleItemt.score > 0">
                                            {{ moduleItemt.score / 100 }}
                                            {{ $t("message.pts") }}
                                        </li>
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            :title="$t('message.Add_Module')"
            :visible.sync="dialogAddModuleVisible"
            :width="dialogWidth"
            @closed="dialogAddModuleVisibleClosed"
        >
            <el-form
                ref="addModuleForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="addModuleForm"
            >
                <el-form-item :label="$t('message.Module_Name')" prop="name">
                    <el-input v-model="addModuleForm.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddModuleVisible = false">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitAddModuleForm"
                >
                    {{ $t("message.Add_Module") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.Edit_Module')"
            :visible.sync="dialogEditModuleVisible"
            :width="dialogWidth"
            @closed="dialogEditModuleVisibleClosed"
        >
            <el-form
                ref="editModuleForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="editModuleForm"
            >
                <el-form-item :label="$t('message.Module_Name')" prop="name">
                    <el-input v-model="editModuleForm.name" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditModuleForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitEditModuleForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.Add_Module_Item')"
            :visible.sync="dialogAddModuleItemVisible"
            :width="dialogWidth"
            @closed="dialogAddModuleItemVisibleClosed"
        >
            <el-form
                ref="form"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="form"
            >
                <el-form-item :label="$t('message.Add')" prop="originType">
                    <el-select v-model="form.originType" @change="change">
                        <!--value 与后台枚举对对应-->
                        <el-option
                            :label="$t('message.Assignments')"
                            value="1"
                        />
                        <el-option
                            :label="$t('message.Discussions')"
                            value="2"
                        />
                        <el-option :label="$t('message.Quizzes')" value="3" />
                        <el-option :label="$t('message.Files')" value="4" />
                    </el-select>
                    <span>{{ $t("message.To") }} {{ module.name }}</span>
                </el-form-item>
                <!--作业 开始-->
                <el-form-item v-if="form.originType == 1" prop="originId">
                    <el-select v-model="form.originId">
                        <el-option
                            :label="
                                '[' +
                                    $t('message.Common_please_select') +
                                    ' ' +
                                    $t('message.Assignments') +
                                    ']'
                            "
                            value="0"
                        />
                        <el-option
                            v-for="item in assignmentDataList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <!--作业 结束-->
                <!--讨论 开始-->
                <el-form-item v-if="form.originType == 2" prop="originId">
                    <el-select v-model="form.originId">
                        <el-option
                            :label="
                                '[' +
                                    $t('message.Common_please_select') +
                                    ' ' +
                                    $t('message.Discussions') +
                                    ']'
                            "
                            value="0"
                        />
                        <el-option
                            v-for="item in discussionDataList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <!--讨论 结束-->
                <!--测验 开始-->
                <el-form-item v-if="form.originType == 3" prop="originId">
                    <el-select v-model="form.originId">
                        <el-option
                            :label="
                                '[' +
                                    $t('message.Common_please_select') +
                                    ' ' +
                                    $t('message.Quizzes') +
                                    ']'
                            "
                            value="0"
                        />
                        <el-option
                            v-for="item in quizDataList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <!--测验 结束-->
                <!--文件 开始-->
                <el-form-item v-if="form.originType == 4" prop="originType">
                    <el-select v-model="form.originId">
                        <el-option
                            :label="
                                '[' +
                                    $t('message.Common_please_select') +
                                    ' ' +
                                    $t('message.Files') +
                                    ']'
                            "
                            value="0"
                        />
                        <el-option
                            v-for="item in fileDataList"
                            :key="item.id"
                            :label="item.fileName"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <!--文件 结束-->
                <el-form-item
                    :label="$t('message.Indentation')"
                    prop="indentLevel"
                >
                    <el-select v-model="form.indentLevel">
                        <el-option
                            :label="$t('message.Not_Indentation')"
                            value="0"
                        />
                        <el-option
                            :label="$t('message.Indentation_1')"
                            value="1"
                        />
                        <el-option
                            :label="$t('message.Indentation_2')"
                            value="2"
                        />
                        <el-option
                            :label="$t('message.Indentation_3')"
                            value="3"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddModuleItem">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitAddModuleItem"
                >
                    {{ $t("message.Add_Item") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.Edit_Module_Item')"
            :visible.sync="dialogEditModuleItemVisible"
            :width="dialogWidth"
        >
            <el-form
                ref="editModuleItemForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="editModuleItemForm"
            >
                <el-form-item
                    :label="$t('message.Module_Name')"
                    style="width: 70%"
                >
                    <el-input
                        v-model="editModuleItemForm.name"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Indentation')">
                    <el-select
                        v-model="editModuleItemForm.indent"
                        style="width: 70%"
                    >
                        <el-option
                            :label="$t('message.Not_Indentation')"
                            value="0"
                        />
                        <el-option
                            :label="$t('message.Indentation_1')"
                            value="1"
                        />
                        <el-option
                            :label="$t('message.Indentation_2')"
                            value="2"
                        />
                        <el-option
                            :label="$t('message.Indentation_3')"
                            value="3"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditModuleItemForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitEditModuleItemForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--移动单元项-->
        <el-dialog
            :title="$t('message.Move')"
            :visible.sync="dialogMoveModuleItemVisible"
            :width="dialogWidth"
            @closed="dialogMoveModuleItemVisibleClosed"
        >
            <el-form
                ref="moveModuleItemForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveModuleItemForm"
            >
                <el-form-item style="width: 70%" prop="name">
                    <span>Place "{{ moveModuleItemForm.name }}"</span>
                </el-form-item>
                <el-form-item
                    :label="$t('message.Module')"
                    prop="targetModuleId"
                >
                    <el-select
                        v-model="moveModuleItemForm.targetModuleId"
                        style="width: 70%"
                        @change="changeModule"
                    >
                        <el-option
                            v-for="moduleq in moduleDataList"
                            :key="moduleq.id"
                            :label="moduleq.name"
                            :value="moduleq.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.strategy')" prop="strategy">
                    <el-select
                        v-model="moveModuleItemForm.strategy"
                        style="width: 70%"
                    >
                        <el-option :label="$t('message.TOP')" value="1" />
                        <el-option :label="$t('message.BOTTOM')" value="2" />
                        <!--暂时先不写 后台逻辑有点问题-->
                        <!--<el-option :label="$t('message.BEFORE')" value="3"></el-option>-->
                        <!--<el-option :label="$t('message.AFTER')" value="4"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="
                        (moveModuleItemForm.strategy == 3 ||
                            moveModuleItemForm.strategy == 4) &&
                            module.moduleItems.length > 0
                    "
                    :label="$t('message.To')"
                    prop="targetModuleItemId"
                    required
                >
                    <el-select
                        v-model="moveModuleItemForm.targetModuleItemId"
                        style="width: 70%"
                    >
                        <el-option
                            v-for="moduleItemd in module.moduleItems"
                            v-show="
                                moduleItemd.title !== moveModuleItemForm.name
                            "
                            :key="moduleItemd.id"
                            :label="moduleItemd.title"
                            :value="moduleItemd.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelMoveModuleItemForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveModuleItemForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--移动单元-->
        <el-dialog
            :title="$t('message.Move')"
            :visible.sync="dialogMoveModuleVisible"
            :width="dialogWidth"
            @closed="dialogMoveModuleVisibleClosed"
        >
            <el-form
                ref="moveModuleForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveModuleForm"
            >
                <el-form-item style="width: 70%" prop="name">
                    <span>Place "{{ moveModuleForm.name }}"</span>
                </el-form-item>
                <el-form-item :label="$t('message.strategy')" prop="strategy">
                    <el-select
                        v-model="moveModuleForm.strategy"
                        style="width: 70%"
                    >
                        <!--<el-option label="DEFAULT" value="0"></el-option>-->
                        <el-option :label="$t('message.TOP')" value="1" />
                        <el-option :label="$t('message.BOTTOM')" value="2" />
                        <el-option :label="$t('message.BEFORE')" value="3" />
                        <el-option :label="$t('message.AFTER')" value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="
                        moveModuleForm.strategy == 3 ||
                            moveModuleForm.strategy == 4
                    "
                    :label="$t('message.To')"
                    prop="targetModuleId"
                >
                    <el-select
                        v-model="moveModuleForm.targetModuleId"
                        style="width: 70%"
                    >
                        <el-option
                            :label="$t('message.Common_please_select')"
                            value="0"
                        />
                        <el-option
                            v-for="modules in moduleDataList"
                            v-show="modules.name !== moveModuleForm.name"
                            :key="modules.id"
                            :label="modules.name"
                            :value="modules.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelMoveModuleForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveModuleForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
/* eslint no-param-reassign: ["error", { "props": false }] */
import utilMethods from "@/utils/utilMethods";
import dueDraw from "@/utils/dueDraw.vue";
import availableDraw from "@/utils/availableDraw.vue";

export default {
    directives: {
        trigger: {
            inserted(el) {
                el.click();
            }
        }
    },
    components: {
        "v-due-time": dueDraw,
        "v-available-time": availableDraw
    },
    filters: {
        formatterDate(val) {
            return utilMethods.formatDate(val);
        },
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2:
                    for (let i = 0; i < sections.length; i += 1) {
                        const v = sections[i];
                        if (Number(v.id) === Number(assign.assignId)) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < users.length; i += 1) {
                        const v = users[i];
                        if (Number(v.id) === Number(assign.assignId)) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                default:
            }

            return data;
        }
    },
    data() {
        return {
            labelPosition: "right",
            labelWidth: "120px",
            dialogWidth: "28%",
            dialogMoveModuleVisible: false,
            dialogMoveModuleItemVisible: false,
            dialogMoveContentVisible: false,
            dialogAddModuleVisible: false,
            dialogEditModuleVisible: false,
            dialogAddModuleItemVisible: false,
            dialogEditModuleItemVisible: false,
            editModuleItemForm: {
                indent: "0",
                name: ""
            },
            editModuleForm: {
                name: ""
            },
            moveModuleForm: {
                targetModuleId: "0",
                name: "",
                strategy: "1"
            },
            moveModuleItemForm: {
                sourceModuleId: "",
                sourceModuleItemId: "",
                targetModuleId: "",
                targetModuleItemId: "",
                name: "",
                strategy: "1"
            },
            moduleSpread: false,
            form: {
                name: "",
                to: "",
                originType: "1",
                delivery: false,
                type: [],
                resource: "",
                originId: "0",
                indentLevel: "0",
                desc: ""
            },
            formLabelWidth: "28%",
            addModuleForm: {
                name: ""
            },
            moduleItem: {}, // 临时操作的那个
            module: {}, // 临时操作的那个
            moduleDataList: [],
            assignmentDataList: [], // 作业下拉
            quizDataList: [], // 测验下拉
            discussionDataList: [], // 讨论下拉
            fileDataList: [],
            courseId: this.$route.query.courseId,
            cacheAssignReq: [],
            sections: [], // 所有班级
            users: [] // 所有用户
        };
    },

    mounted() {
        // TODO取 课程id
        this.getModuleDataList();
        // this.getAssignDataList();
    },
    methods: {
        // 去指定页面

        goTo(item) {
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    this.$router.push({
                        path: "studentAssignmentSubmit",
                        query: {
                            courseId,
                            assignmentId: targetId,
                            name: item.title,
                            modulesData: item.id
                        }
                    });
                    break;
                case 2:
                    this.$router.push({
                        path:
                            "/studentHomePage/studentAllCourse/studentCourseDiscussionDetail",
                        query: {
                            discussionId: targetId,
                            courseId,
                            name: item.title,
                            modulesData: item.id
                        }
                    });
                    break;
                case 3:
                    // /?courseId=102
                    this.$router.push({
                        path: "/studentHomePage/studentAllCourse/quizzDetail",
                        query: {
                            quizDetailId: targetId,
                            // data: targetId,
                            name: item.title,
                            modulesData: item.id,
                            courseId: this.courseId
                        }
                    });
                    break;
                case 14:
                    this.$router.push({
                        path: "studentfileView",
                        query: {
                            modulesData: item.id,
                            courseId: this.courseId,
                            originType: item.originType
                        }
                    });
                    break;
                case 4:
                    this.$http
                        .get(
                            `${process.env.NODE_ENV}/userFile/get?data=${targetId}`
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                console.log(res);
                                this.$router.push({
                                    path: "studentfileView",
                                    query: {
                                        originType: item.originType,
                                        fileUrl: res.data.entity.fileUrl,
                                        fileType: res.data.entity.fileType,
                                        modulesData: item.id,
                                        courseId: this.courseId
                                    }
                                });
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                    break;
                default:
            }
        },

        async changeModule(val) {
            this.module = this.moduleDataList.find(
                v => Number(v.id) === Number(val)
            );
            if (Number(this.module.moduleItems.length) === 0) {
                // 动态获取目标items
                const result = await this.$getData(
                    `/moduleItem/list?moduleId=${val}`,
                    null,
                    "get"
                );
                if (Number(result.data.code) === 200) {
                    // 刷新子项
                    const moduleItems = result.data.entity;
                    this.$set(this.module, "moduleItems", moduleItems);
                } else {
                    this.$message.error(result.data.message);
                }
            }
        },
        cancelMoveModuleItemForm() {
            this.dialogMoveModuleItemVisible = false;
            this.$refs.moveModuleItemForm.resetFields();
            this.moveModuleItemForm.sourceModuleId = "";
            this.moveModuleItemForm.sourceModuleItemId = "";
        },
        async submitMoveModuleItemForm() {
            const result = await this.$getData(
                "/moduleItem/moveContent/edit",
                this.moveModuleItemForm,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.dialogMoveModuleItemVisible = false;
                // 内存操作
                if (
                    Number(this.moveModuleItemForm.sourceModuleId) ===
                    Number(this.moveModuleItemForm.targetModuleId)
                ) {
                    // 展开操作
                    const module = this.moduleDataList.find(
                        v =>
                            Number(v.id) ===
                            Number(this.moveModuleItemForm.sourceModuleId)
                    );
                    module.isShow = false;
                    this.collapseModule(module);
                } else {
                    this.getModuleDataList();
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 移动单元项弹窗关闭事件
        dialogMoveModuleItemVisibleClosed() {
            this.$refs.moveModuleItemForm.resetFields();
        },
        // 移动单元项弹窗
        moveModuleItemDialog(module, moduleItem) {
            this.module = module;
            this.moduleItem = moduleItem;
            this.dialogMoveModuleItemVisible = true;
            this.moveModuleItemForm.sourceModuleId = module.id;
            this.moveModuleItemForm.sourceModuleItemId = moduleItem.id;
            this.moveModuleItemForm.targetModuleId = module.id;
            this.moveModuleItemForm.name = moduleItem.title;
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
        async getModuleItemAssignDataList(module, moduleItem) {
            // let cacheKey = moduleItem.originId + "_" + moduleItem.originType;
            // if (this.cacheAssignReq.indexOf(cacheKey) != -1) {
            //   return;
            // }
            // this.cacheAssignReq.push(cacheKey);
            // 缓存 数据 originId originType 相同的就不再查询
            const data = `${moduleItem.originType}_${moduleItem.originId}`;
            const result = await this.$getData(
                `/assignStudent/get?data=${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const assign = result.data.entity;
                const assigns = [];
                assigns.push(assign);
                this.$set(moduleItem, "assigns", assigns);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async modulePushHandler(module) {
            const data = {};
            data.id = module.id;
            data.status = Number(module.status) === 0 ? 1 : 0;
            const result = await this.$getData(
                "/module/status/edit",
                data,
                "post"
            );
            if (Number(result.data.code) === 200) {
                module.status = data.status;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async moduleItemPushHandler(module, moduleItem) {
            const data = {};
            data.originId = moduleItem.originId;
            data.originType = moduleItem.originType;
            data.status = Number(moduleItem.status) === 0 ? 1 : 0;
            const result = await this.$getData(
                "/publish/status/edit",
                data,
                "post"
            );
            if (Number(result.data.code) === 200) {
                moduleItem.status = data.status;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async increaseindent(module, moduleItem) {
            const data = {};
            data.id = moduleItem.id;
            data.indent = moduleItem.indentLevel + 1;
            this.moduleItemEdit(module, data);
        },
        async decreaseindent(module, moduleItem) {
            const data = {};
            data.id = moduleItem.id;
            data.indent = moduleItem.indentLevel - 1;
            this.moduleItemEdit(module, data);
        },
        async moduleItemEdit(module, data) {
            const result = await this.$getData(
                "/moduleItem/indent/edit",
                data,
                "post"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(module.isShow) === true
            ) {
                this.refreshModuleItem(module);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async deleteModuleItem(module, moduleItem) {
            const result = await this.$getData(
                "/moduleItem/deletes",
                moduleItem.id,
                "post"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(module.isShow) === true
            ) {
                this.refreshModuleItem(module);
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 重新获取子项
        async refreshModuleItem(module) {
            const result = await this.$getData(
                `/moduleItem/list?moduleId=${module.id}`,
                null,
                "get"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(module.isShow) === true
            ) {
                // 刷新子项
                const moduleItems = result.data.entity;
                this.$set(module, "moduleItems", moduleItems);
                moduleItems.forEach(v => {
                    this.getModuleItemAssignDataList(module, v);
                });
            } else {
                this.$message.error(result.data.message);
            }
        },
        // moveContentDialog(module) {
        //     this.$alert('还未实现');
        // },
        cancelMoveModuleForm() {
            this.dialogMoveModuleVisible = false;
        },
        // 关闭移动module
        dialogMoveModuleVisibleClosed() {
            this.$refs.moveModuleForm.resetFields();
        },
        // 提交移动单元表单
        submitMoveModuleForm() {
            const list = utilMethods.clone(this.moduleDataList);
            const index = list.findIndex(
                v => Number(v.id) === Number(this.module.id)
            ); // 找到当前module
            list.splice(index, 1); // 删除
            switch (this.moveModuleForm.strategy) {
                case "1":
                    // 置顶
                    list.splice(0, 0, this.module); // 放到第一位
                    break;
                case "2":
                    // 置底
                    list.push(this.module); // 放到第一位
                    break;
                case "3": {
                    // 指定之前
                    // 指定目标id
                    const targetIndex = list.findIndex(
                        v =>
                            Number(v.id) ===
                            Number(this.moveModuleForm.targetModuleId)
                    );
                    list.splice(targetIndex, 0, this.module); // 放到第一位
                    break;
                }
                case "4": {
                    // 指定之后
                    const targetIndex2 = list.findIndex(
                        v =>
                            Number(v.id) ===
                            Number(this.moveModuleForm.targetModuleId)
                    );
                    list.splice(targetIndex2 + 1, 0, this.module); // 放到第一位
                    break;
                }
                default:
            }
            this.moveModuleReq(list);
        },
        moveModuleDialog(module) {
            this.module = module;
            this.moveModuleForm.name = module.name;
            this.dialogMoveModuleVisible = true;
        },
        // 移动module实现
        async moveModuleReq(list) {
            const data = [];
            list.forEach(v => data.push(v.id));
            const result = await this.$getData(
                "/module/move/edit",
                { moduleIds: data },
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.moduleDataList = list;
                this.dialogMoveModuleVisible = false;
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 单元删除
        async moduleDelete(item) {
            const result = await this.$getData(
                "/module/deletes",
                item.id,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.getModuleDataList();
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 提交修改单元表单
        async submitEditModuleForm() {
            const data = {};
            data.name = this.editModuleForm.name;
            data.id = this.module.id;
            const result = await this.$getData("/module/modify ", data, "post");
            if (Number(result.data.code) === 200) {
                this.dialogEditModuleVisible = false;
                this.getModuleDataList();
            } else {
                this.$message.error(result.data.message);
            }
        },
        cancelEditModuleForm() {
            this.dialogEditModuleVisible = false;
        },
        cancelAddModuleItem() {
            this.dialogAddModuleItemVisible = false;
        },
        change(val) {
            this.form.originId = "0"; // 重置下拉框
            switch (val) {
                case "1":
                    if (Number(this.assignmentDataList.length) === 0) {
                        // 缓存下 防止多次查找
                        this.getAssignmentDataList();
                    }
                    break;
                case "2":
                    if (Number(this.discussionDataList.length) === 0) {
                        // 缓存下 防止多次查找
                        this.getDiscussionDataList();
                    }
                    break;
                case "3":
                    if (Number(this.quizDataList.length) === 0) {
                        // 缓存下 防止多次查找
                        this.getQuizDataList();
                    }
                    break;
                case "4":
                    if (Number(this.fileDataList.length) === 0) {
                        // 缓存下 防止多次查找
                        this.getFileDataList();
                    }
                    break;
                default:
            }
        },
        // 提交添加单元项
        async submitAddModuleItem() {
            const data = {};
            data.originIds = [];
            data.moduleId = this.module.id;
            data.originIds[0] = this.form.originId;
            data.originType = this.form.originType;
            data.indentLevel = this.form.indentLevel;
            // 非新建
            const result = await this.$getData("/moduleItem/add", data, "post");
            if (Number(result.data.code) === 200) {
                this.dialogAddModuleItemVisible = false;
                if (Boolean(this.module.isShow) === true) {
                    this.refreshModuleItem(this.module);
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 获取文件列表
        getFileDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/fileSelect/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.fileDataList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获讨论件列表
        getDiscussionDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/discussionSelect/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.discussionDataList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取测验列表
        getQuizDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/quizSelect/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.quizDataList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获作业验列表
        getAssignmentDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentSelect/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.assignmentDataList = res.data.entity;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取单元列表
        getModuleDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/module/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.moduleDataList = res.data.entity;
                        for (
                            let i = 0;
                            i < this.moduleDataList.length;
                            i += 1
                        ) {
                            this.$set(this.moduleDataList[i], "isShow", false);
                            this.$set(
                                this.moduleDataList[i],
                                "moduleItems",
                                []
                            );
                            this.$set(this.moduleDataList[i], "isOpen", false);
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleCheckedCitiesChange() {
            this.isShow = !this.isShow;
        },
        // 编辑单元弹窗
        editModuleDialog(item) {
            this.module = item;
            this.editModuleForm.name = item.name;
            this.dialogEditModuleVisible = true;
        },
        // 添加单元弹窗
        addModuleHandler(module) {
            this.module = module;
            this.dialogAddModuleItemVisible = true;
            if (Number(this.assignmentDataList.length) === 0) {
                // 缓存下 防止多次查找
                this.getAssignmentDataList();
            }
        },
        // 提交编辑单元项表单
        submitEditModuleItemForm() {
            const data = this.editModuleItemForm;
            data.id = this.moduleItem.id;
            this.moduleItemEdit(this.module, data);
            this.dialogEditModuleItemVisible = false;
        },
        // 取消moduleItem弹窗
        cancelEditModuleItemForm() {
            this.dialogEditModuleItemVisible = false;
        },
        // 编辑moduleItem弹窗
        editModuleItemDialog(module, moduleItem) {
            this.module = module;
            this.moduleItem = moduleItem;
            this.editModuleItemForm.name = moduleItem.title;
            this.editModuleItemForm.indent = `${moduleItem.indentLevel}`;
            this.dialogEditModuleItemVisible = true;
        },
        // 折叠/展开单元
        collapseModule(module) {
            if (module.isShow) {
                // 关闭或再次展开就不需要刷新了
                this.$set(module, "isShow", !module.isShow);
                module.isOpen = !module.isOpen;
                return;
            }
            if (module.moduleItems.length > 0) {
                this.$set(module, "isShow", !module.isShow);
                return;
            }
            this.$http
                .get(
                    `${process.env.NODE_ENV}/moduleItem/list?moduleId=${module.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        module.isOpen = !module.isOpen;
                        const moduleItems = res.data.entity;
                        this.$set(module, "isShow", !module.isShow);
                        this.$set(module, "moduleItems", moduleItems);
                        module.moduleItems.forEach(v => {
                            this.getModuleItemAssignDataList(module, v);
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 提交添加单元表单
        submitAddModuleForm() {
            this.addModuleForm.courseId = this.courseId;
            this.$http
                .post(`${process.env.NODE_ENV}/module/add`, this.addModuleForm)
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.dialogAddModuleVisible = false;
                        this.getModuleDataList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 添加单元项弹窗关闭回调
        dialogAddModuleItemVisibleClosed() {
            this.form.originId = "0"; // 重置下拉框
            this.$refs.form.resetFields(); // 重置表单
        },
        // 编辑单元弹窗关闭回调
        dialogEditModuleVisibleClosed() {
            this.$refs.editModuleForm.resetFields(); // 重置表单
        },
        // 添加单元弹窗关闭回调
        dialogAddModuleVisibleClosed() {
            this.$refs.addModuleForm.resetFields(); // 重置表单
        }
    }
};
/*eslint-disable*/
</script>

<style scoped="">
.className {
    width: 90%;
    display: inline-block;
}

.el-button el-button--info {
    width: 50%;
}

.el-button-group .el-button--primary:last-child {
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

.bottomHint {
    color: red;
    display: inline-block;
    width: 70%;
    margin-top: 6%;
}

.module {
    float: right;
    margin-bottom: 2%;
}

.el-icon-error {
    color: #999999;
    cursor: pointer;
    font-size: 16px;
}

.modules-list {
    border: 1px solid #ccc;
    clear: both;
    margin-left: 2%;
}

.modules-group {
    /*border-bottom: 1px dashed #a5afb5;*/
    padding: 2%;
}

.module-heard {
    /*border-bottom: none;*/
    margin-bottom: 2%;
    position: relative;
}

.modules-row {
    position: relative;
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    /*border-radius: 3px;*/
    color: #394b58;
    border: 1px solid #c7cdd1;
    border-bottom: 1px solid #c7cdd1;
}

/*.content {*/
/*border-top: 1px solid #c7cdd1;*/
/*border-radius: 3px;*/
/*}*/
.module-border {
    border: 1px solid #ccc;
    border-radius: 3px;
    border-bottom: none;
}

h6 {
    width: 50%;
    padding-left: 140px;
    color: #999999;
}

.moduleSpread {
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    padding: 8px 0;
    border-color: #c7cdd1;
    text-align: left;
    z-index: 9999;
    left: 76%;
    top: 40%;
}

.triangle {
    position: absolute;
    top: -10%;
    z-index: 9999;
    left: 66%;
}

.moduleSpread ul li {
    width: 180px;
    margin-top: 8px;
}

.el-dropdown-menu {
    width: 16%;
}

img {
    vertical-align: middle;
    padding-right: 1%;
}

.quizzes-time {
    padding-left: 14px;
}

.quizzes-time ul li {
    display: inline-block;
    padding: 0 1%;
}

.drag {
    cursor: move;
}

i {
    font-size: 20px !important;
    color: #666666;
    /*font-weight: 600 !important;*/
}

.modules-menu i:hover {
    color: #0138b1;
}

.studentTitle {
    display: inline-block;
    cursor: pointer;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.titleHeading {
    font-size: 14px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    display: inline-block;
    cursor: pointer;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

/*.titleHeader {*/
/*font-size: 14px;*/
/*font-family: PingFangSC-Semibold;*/
/*font-weight: 600;*/
/*color: rgba(51, 51, 51, 1);*/
/*line-height: 20px;*/
/*}*/
.titleHeader {
    display: inline-block;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    width: 86%;
    line-height: 20px;
    padding-top: 6px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}
</style>
