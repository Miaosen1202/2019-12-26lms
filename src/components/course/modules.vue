<template>
    <div>
        <!--eslint-disable-->
        <div class="className">
            <div class="module">
                <!--<el-button>{{$t('message.View_Progress')}}</el-button>-->
                <el-button
                    type="primary"
                    class="group-set"
                    @click="dialogAddModuleVisible = true"
                >
                    <i class="iconfont icon-add" />
                    <span style="font-size: 17px">{{
                        $t("message.Module")
                    }}</span>
                </el-button>
            </div>
            <!--style="text-align: center;width:200px;border-radius: 20px;
                           padding: 30px 60px 76px 60px;
                           border: 2px dashed #0e38b1"-->
            <div class="modules-list">
                <div
                    v-if="Number(moduleDataList) === 0"
                    style="line-height: 500px"
                >
                    <div
                        class="moduleStart"
                        @click="dialogAddModuleVisible = true"
                    >
                        <div style="padding-top: 60px;">
                            <i class="iconfont icon-creatmodule creatmodule" />
                            <p style="margin-top: 10px;">
                                <a class="creat">{{
                                    $t("message.Creat_a_new_Module")
                                }}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    v-for="(moduleQ, index) in moduleDataList"
                    :key="index"
                    v-loading="load"
                    class="modules-group"
                >
                    <div class="module-heard">
                        <p
                            v-trigger
                            style="display: inline-block;
                            cursor: pointer;
                            width: 80%;
                            word-wrap: break-word;"
                            @click="collapseModule(moduleQ)"
                        >
                            <i
                                v-show="moduleQ.isShow"
                                class="iconfont icon-sanjiao_xia i_edit"
                            />
                            <i
                                v-show="!moduleQ.isShow"
                                class="iconfont icon-sanjiaoyou i_edit"
                            />
                            {{ moduleQ.name }}
                        </p>
                        <!--<span class="modules-menu" @click="moduleSpreadMenu">
                        <i class="el-icon-menu"></i></span>-->
                        <div class="modules-menu">
                            <el-row class="block-col-2">
                                <el-col :span="12">
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">
                                            <i
                                                style="font-size: 34px;color: #666666"
                                                class="iconfont icon-spread-big"
                                            />
                                            <!--<img
                                            src="../../../static/images/spread-big.png"
                                            alt=""
                                            style="vertical-align: baseline">-->
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item
                                                @click.native="
                                                    editModuleDialog(moduleQ)
                                                "
                                            >
                                                <i
                                                    class="iconfont icon-edit i_edit_style"
                                                >
                                                    <span class="written">
                                                        {{
                                                            $t("message.Edit")
                                                        }}</span
                                                    >
                                                </i>
                                            </el-dropdown-item>
                                            <el-dropdown-item
                                                :disabled="
                                                    moduleQ.moduleItems
                                                        .length === 0 ||
                                                        moduleDataList.length <
                                                            2
                                                "
                                                @click.native="
                                                    moveContentModuleDialog(
                                                        moduleQ
                                                    )
                                                "
                                            >
                                                <i
                                                    class="iconfont icon-move i_edit_style "
                                                >
                                                    <span class="written">
                                                        {{
                                                            $t(
                                                                "message.Move_Content"
                                                            )
                                                        }}</span
                                                    >
                                                </i>
                                            </el-dropdown-item>
                                            <el-dropdown-item
                                                :disabled="
                                                    moduleDataList.length < 2
                                                "
                                                @click.native="
                                                    moveModuleDialog(
                                                        moduleQ,
                                                        index
                                                    )
                                                "
                                            >
                                                <i
                                                    class="iconfont icon-move i_edit_style "
                                                >
                                                    <span class="written">
                                                        {{
                                                            $t(
                                                                "message.Move_Module"
                                                            )
                                                        }}</span
                                                    >
                                                </i>
                                            </el-dropdown-item>
                                            <el-dropdown-item
                                                @click.native="
                                                    moduleDelete(moduleQ)
                                                "
                                            >
                                                <i
                                                    class="iconfont icon-delete i_edit_style"
                                                >
                                                    <span class="written">
                                                        {{
                                                            $t("message.Delete")
                                                        }}</span
                                                    >
                                                </i>
                                            </el-dropdown-item>
                                            <!--<el-dropdown-item>-->
                                            <!--<img src="../../../static/images/duplicate.png" alt="">-->
                                            <!--{{$t('message.Duplicate')}}-->
                                            <!--</el-dropdown-item>-->
                                            <!--<el-dropdown-item>-->
                                            <!--<img src="../../../static/images/share.png" alt="">-->
                                            <!--{{$t('message.Share_to_Commons')}}-->
                                            <!--</el-dropdown-item>-->
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-col>
                            </el-row>
                        </div>
                        <span
                            class="modules-outline"
                            @click="addModuleHandler(moduleQ)"
                        >
                            <i
                                style="font-size: 34px;color: #666666"
                                class="iconfont icon-add1"
                            />
                            <!--<i class="el-icon-circle-plus-outline"></i>-->
                            <!--<img src="../../../static/images/add.png" alt="" style="vertical-align: baseline">-->
                        </span>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                                moduleQ.status == 0
                                    ? $t('message.Published')
                                    : $t('message.UnPublished')
                            "
                            placement="top"
                        >
                            <span
                                class="modules-success"
                                @click="modulePushHandler(moduleQ)"
                            >
                                <i
                                    v-if="moduleQ.status == 0"
                                    class="iconfont icon-Group- i_edit"
                                    style="color: #666666;cursor: pointer"
                                />
                                <i
                                    v-else
                                    class="el-icon-success i_ed"
                                    style="color: green;cursor: pointer"
                                />
                            </span>
                        </el-tooltip>
                    </div>
                    <div class="module-border">
                        <div
                            v-if="
                                moduleQ.moduleItems.length === 0 &&
                                    moduleQ.isShow
                            "
                            class="content modules-row"
                            style="text-align: center;"
                        >
                            <span>{{
                                $t("message.ASSIGNMENT.noModuleData")
                            }}</span>
                        </div>
                        <div
                            v-for="(moduleItemSS,
                            indexx) in moduleQ.moduleItems"
                            v-show="moduleQ.isShow"
                            :key="indexx"
                            class="content"
                        >
                            <div class="modules-row">
                                <!--<img v-if="moduleItem.originType==1"
                                height="20" width="20"
                                src="../../../static/images/assign.png"/>-->
                                <div
                                    style="position: absolute;top: 30%;"
                                    :style="{
                                        'margin-left':
                                            moduleItemSS.indentLevel * 20 + 'px'
                                    }"
                                >
                                    <i
                                        v-if="moduleItemSS.originType == 1"
                                        class="iconfont icon-icon-edit i_edit"
                                    />
                                    <!--<img v-else-if="moduleItem.originType==2"
                                    height="20" width="20"-->
                                    <!--src="../../../static/images/Discussions.png"/>-->
                                    <i
                                        v-else-if="moduleItemSS.originType == 2"
                                        class="iconfont icon-liaotian i_edit"
                                    />
                                    <!--<img v-else-if="moduleItem.originType==3"
                                     height="20" width="20"
                                      src="../../../static/images/quiz.png"/>-->
                                    <i
                                        v-else-if="moduleItemSS.originType == 4"
                                        class="iconfont icon-file1 i_edit"
                                    />
                                    <i
                                        v-else-if="moduleItemSS.originType == 3"
                                        class="iconfont icon--xiugaineirong i_edit"
                                    />
                                    <i
                                        v-else-if="
                                            moduleItemSS.originType == 14
                                        "
                                        class="iconfont icon-attach i_edit"
                                    />
                                </div>
                                <!--<i class="iconfont icon&#45;
                                &#45;xiugaineirong"
                                style="font-size: 22px;
                                font-weight: 600"></i>-->
                                <!--<img height="20"
                                width="20"
                                src="../../../static/images/pdf.png"/>-->
                                <div
                                    :style="{
                                        'margin-left':
                                            moduleItemSS.indentLevel * 20 + 'px'
                                    }"
                                >
                                    <a
                                        v-show="moduleItemSS.originType != 13"
                                        style="cursor: pointer;margin-left: 23px;"
                                        class="titleHeading"
                                        @click="goTo(moduleItemSS)"
                                        >{{ moduleItemSS.title }}</a
                                    >
                                    <a
                                        v-show="moduleItemSS.originType == 13"
                                        class="titleHeader"
                                        >{{ moduleItemSS.title }}</a
                                    >
                                </div>

                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="
                                        moduleItemSS.status == 0
                                            ? $t('message.Published')
                                            : $t('message.Unpublished')
                                    "
                                    placement="top"
                                >
                                    <span
                                        class="modules-suc"
                                        @click="
                                            moduleItemPushHandler(
                                                moduleQ,
                                                moduleItemSS
                                            )
                                        "
                                    >
                                        <i
                                            v-if="moduleItemSS.status == 0"
                                            class="iconfont icon-Group- i_edit"
                                            style="color: #666666;cursor: pointer"
                                        />
                                        <i
                                            v-else
                                            class="el-icon-success i_ed"
                                            style="color: green;cursor: pointer"
                                        />
                                    </span>
                                </el-tooltip>
                                <div
                                    v-show="moduleItemSS.originType != 13"
                                    class="quizzes-time"
                                >
                                    <ul
                                        :style="{
                                            'margin-left':
                                                moduleItemSS.indentLevel * 20 +
                                                'px'
                                        }"
                                    >
                                        <v-available-time
                                            :assigns="moduleItemSS.assigns"
                                            :users="users"
                                            :sections="sections"
                                        />
                                        <v-due-time
                                            :assigns="moduleItemSS.assigns"
                                            :users="users"
                                            :sections="sections"
                                        />
                                        <li v-if="moduleItemSS.score > 0">
                                            {{ moduleItemSS.score / 100 }}
                                            {{ $t("message.pts") }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="modules-menuList">
                                    <el-row class="block-col-2">
                                        <el-col :span="12">
                                            <el-dropdown trigger="click">
                                                <span
                                                    class="el-dropdown-link"
                                                    style="width: 10px;display: inline-block;cursor: pointer"
                                                >
                                                    <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                                                    <img
                                                        src="../../../static/images/spread.png"
                                                        alt=""
                                                        style="vertical-align: baseline"
                                                    />
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <el-dropdown-item
                                                        @click.native="
                                                            editModuleItemDialog(
                                                                moduleQ,
                                                                moduleItemSS
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
                                                            moveModuleItemDialog(
                                                                moduleQ,
                                                                moduleItemSS
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-move i_edit_style"
                                                        >
                                                            <span
                                                                class="written"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Move_to"
                                                                    )
                                                                }}</span
                                                            >
                                                        </i>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :disabled="
                                                            moduleItemSS.indentLevel ==
                                                                0
                                                        "
                                                        @click.native="
                                                            decreaseindent(
                                                                moduleQ,
                                                                moduleItemSS
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-indent-copy i_edit_style"
                                                        >
                                                            <span
                                                                class="written"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Decrease_indent"
                                                                    )
                                                                }}</span
                                                            >
                                                        </i>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :disabled="
                                                            moduleItemSS.indentLevel ==
                                                                3
                                                        "
                                                        @click.native="
                                                            increaseindent(
                                                                moduleQ,
                                                                moduleItemSS
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-indent i_edit_style"
                                                        >
                                                            <span
                                                                class="written"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Increase_indent"
                                                                    )
                                                                }}</span
                                                            >
                                                        </i>
                                                    </el-dropdown-item>
                                                    <!--<el-dropdown-item>-->
                                                    <!--<img src="../../../static/images/duplicate.png" alt="">-->
                                                    <!--{{$t('message.Duplicate')}}-->
                                                    <!--</el-dropdown-item>-->
                                                    <el-dropdown-item
                                                        @click.native="
                                                            deleteModuleItem(
                                                                moduleQ,
                                                                moduleItemSS
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-shanchu i_edit_style"
                                                        >
                                                            <span
                                                                class="written"
                                                            >
                                                                {{
                                                                    $t(
                                                                        "message.Remove"
                                                                    )
                                                                }}</span
                                                            >
                                                        </i>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--新建单元-->
        <div class="moudes_add">
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
                    :rules="addModuleFormRule"
                >
                    <el-form-item
                        :label="$t('message.Module_Name')"
                        prop="name"
                    >
                        <el-input
                            v-model="addModuleForm.name"
                            autocomplete="off"
                            clearable
                            maxlength="50"
                            show-word-limit
                        />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAddModuleForm">
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
        </div>
        <!--编辑单元-->
        <div class="edit_add">
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
                    :rules="addModuleFormRule"
                >
                    <el-form-item
                        :label="$t('message.Module_Name')"
                        prop="name"
                    >
                        <el-input
                            v-model="editModuleForm.name"
                            maxlength="50"
                            show-word-limit
                        />
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
                        {{ $t("message.Upgrade_Module") }}
                    </el-button>
                </div>
            </el-dialog>
        </div>

        <!--添加-->
        <div class="module_module">
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
                    :rules="dialogAddModuleItemRules"
                >
                    <el-form-item
                        style="margin-bottom: 10px"
                        :label="$t('message.Type')"
                        prop="originType"
                    >
                        <el-select
                            v-model="form.originType"
                            style="width: 70%"
                            @change="change"
                        >
                            <!--value 与后台枚举对对应-->
                            <el-option
                                :label="$t('message.Assignments')"
                                value="1"
                            />
                            <el-option
                                :label="$t('message.Discussions')"
                                value="2"
                            />
                            <el-option
                                :label="$t('message.Quizzes')"
                                value="3"
                            />
                            <el-option :label="$t('message.Files')" value="4" />
                            <el-option
                                :label="$t('message.textHeard')"
                                value="13"
                            />
                            <el-option
                                :label="$t('message.external')"
                                value="14"
                            />
                        </el-select>
                    </el-form-item>
                    <div style="display: inline-block;word-break: break-all;">
                        <span v-if="Number(form.originType) === 13"
                            ><!--margin-bottom: 20px;-->
                            <!--{{ $t("message.To") }} {{ module.name }}-->
                            {{ $t("message.Type_the_text") }}
                        </span>
                        <span v-if="Number(form.originType) === 1">
                            {{ $t("message.Select_the_assignment") }}
                        </span>
                        <span v-if="Number(form.originType) === 2">
                            {{ $t("message.Select_the_Discussion") }}
                        </span>
                        <span v-if="Number(form.originType) === 3">
                            {{ $t("message.Select_the_quiz") }}
                        </span>
                        <span v-if="Number(form.originType) === 4">
                            {{ $t("message.Select_the_file") }}
                        </span>
                        <span v-if="Number(form.originType) === 14">
                            {{ $t("message.Enter_a_URL") }}
                        </span>
                    </div>
                    <!--textHeard 开始-->
                    <el-form-item
                        v-if="Number(form.originType) === 13"
                        :label="$t('message.Sub_header')"
                        prop="title"
                        style="margin-top: 20px"
                    >
                        <el-input
                            v-model="form.title"
                            maxlength="200"
                            show-word-limit
                            style="width: 70%"
                        />
                    </el-form-item>

                    <!--textHeard 结束-->

                    <!--External URL 开始-->
                    <el-form-item
                        v-if="Number(form.originType) === 14"
                        label="URL"
                        prop="url"
                    >
                        <el-input
                            v-model="form.url"
                            minlength="1"
                            maxlength="200"
                            style="width: 70%"
                        />
                    </el-form-item>
                    <el-form-item
                        v-if="Number(form.originType) === 14"
                        label="Page name"
                        prop="title"
                    >
                        <el-input
                            v-model="form.title"
                            maxlength="200"
                            show-word-limit
                            style="width: 70%"
                        />
                    </el-form-item>
                    <!--External URL 结束-->
                    <el-tabs
                        v-if="
                            Number(form.originType) !== 13 &&
                                Number(form.originType) !== 14
                        "
                        v-model="activeName"
                        @tab-click="handleClick"
                    >
                        <el-tab-pane label="Select" name="first">
                            <el-form
                                ref="formx"
                                :label-position="labelPosition"
                                :label-width="labelWidth"
                                :model="formx"
                                :rules="ItemRules"
                            >
                                <!--作业组 开始-->
                                <el-form-item
                                    v-if="Number(form.originType) === 1"
                                    :label="$t('message.Assignment_group')"
                                    prop="assignmentGroupId"
                                >
                                    <el-select
                                        v-model="formx.assignmentGroupId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                        @change="changes"
                                    >
                                        <el-tooltip
                                            v-for="iQ in assignmentGroup"
                                            :key="iQ.id"
                                            class="item"
                                            effect="dark"
                                            :content="iQ.name"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="iQ.id"
                                                :label="iQ.name"
                                                :value="iQ.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--作业组 结束-->
                                <!--作业 开始-->
                                <el-form-item
                                    v-if="Number(form.originType) === 1"
                                    :label="$t('message.Assignment')"
                                    prop="originId"
                                >
                                    <el-select
                                        v-model="formx.originId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                    >
                                        <el-tooltip
                                            v-for="iw in assignmentDataList"
                                            :key="iw.id"
                                            class="item"
                                            effect="dark"
                                            :content="iw.title"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="iw.id"
                                                :label="iw.title"
                                                :value="iw.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--作业 结束-->

                                <!--讨论 开始-->
                                <el-form-item
                                    v-if="Number(form.originType) === 2"
                                    label="Discussion"
                                    prop="originId"
                                >
                                    <el-select
                                        v-model="formx.originId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                    >
                                        <el-tooltip
                                            v-for="_item in discussionDataList"
                                            :key="_item.id"
                                            class="item"
                                            effect="dark"
                                            :content="_item.title"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="_item.id"
                                                :label="_item.title"
                                                :value="_item.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--讨论 结束-->

                                <!--测验组 开始-->
                                <el-form-item
                                    v-if="Number(form.originType) === 3"
                                    :label="$t('message.Quiz_type')"
                                >
                                    <el-select
                                        v-model="quizValue"
                                        :popper-class="aSelect"
                                        prop="originId"
                                        style="width: 70%"
                                        @change="QuizChange"
                                    >
                                        <el-tooltip
                                            v-for="im in options"
                                            :key="im.id"
                                            class="item"
                                            effect="dark"
                                            :content="im.label"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="im.id"
                                                :label="im.label"
                                                :value="im.quizValue"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--测验组 结束-->
                                <!--测验 开始-->
                                <el-form-item
                                    v-if="
                                        (Number(form.originType) === 3 &&
                                            Number(quizValue) === 1) ||
                                            (Number(form.originType) === 3 &&
                                                quizValue === '')
                                    "
                                    prop="originId"
                                    :label="$t('message.Select_quiz')"
                                >
                                    <el-select
                                        v-model="formx.originId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                    >
                                        <el-tooltip
                                            v-for="iem in practiceQuizList"
                                            :key="iem.id"
                                            class="item"
                                            effect="dark"
                                            :content="iem.title"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="iem.id"
                                                :label="iem.title"
                                                :value="iem.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="
                                        Number(form.originType) === 3 &&
                                            Number(quizValue) === 2
                                    "
                                    :label="$t('message.Select_quiz')"
                                    prop="originId"
                                >
                                    <el-select
                                        v-model="formx.originId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                    >
                                        <el-tooltip
                                            v-for="it in gradedQuizList"
                                            :key="it.id"
                                            class="item"
                                            effect="dark"
                                            :content="it.title"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="it.id"
                                                :label="it.title"
                                                :value="it.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--测验 结束-->
                                <!--文件 开始-->
                                <div
                                    v-if="Number(form.originType) === 4"
                                    style="height: 160px;
                                border: 1px solid #ccc;
                                overflow :auto"
                                >
                                    <el-tree
                                        ref="fileTree"
                                        node-key="treeId"
                                        :highlight-current="true"
                                        :check-on-click-node="true"
                                        :expand-on-click-node="true"
                                        :props="props1"
                                        :load="loadNode1"
                                        :default-expanded-keys="treeExpandeKeys"
                                        accordion
                                        lazy
                                        @node-click="treeExpand"
                                    />
                                </div>
                                <div
                                    v-if="Number(form.originType) === 4"
                                    style="height: 146px;
                                border: 1px solid rgba(238,238,238,1);
                                margin-bottom: 20px;
                                overflow :auto"
                                >
                                    <el-table
                                        id="fileTable"
                                        ref="fileTable"
                                        v-loading="loading"
                                        class="folder-table"
                                        :data="tableData"
                                        highlight-current-row
                                        :show-header="false"
                                        style="width: 100%; border: 1px solid #fff"
                                        @current-change="handleCurrentChange"
                                    >
                                        <el-table-column prop="fileName">
                                            <template slot-scope="scope">
                                                <div>
                                                    <!--<el-tooltip
                                                    :content="scope.row.fileName"
                                                    placement="top"
                                                    effect="light">-->
                                                    <div>
                                                        <span
                                                            v-if="
                                                                !scope.row
                                                                    .fileType
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-wenjianjia1"
                                                            />
                                                        </span>
                                                        <span
                                                            v-if="
                                                                fileTypeData.imgList.indexOf(
                                                                    scope.row
                                                                        .fileType
                                                                ) > -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <img
                                                                :src="
                                                                    fileUrl +
                                                                        scope
                                                                            .row
                                                                            .fileUrl +
                                                                        '?s=thumb&a=18x18'
                                                                "
                                                        /></span>

                                                        <span
                                                            v-if="
                                                                fileTypeData.docList.indexOf(
                                                                    scope.row
                                                                        .fileType
                                                                ) > -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-doctext"
                                                            />
                                                        </span>
                                                        <span
                                                            v-if="
                                                                fileTypeData.excelList.indexOf(
                                                                    scope.row
                                                                        .fileType
                                                                ) > -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-Excel"
                                                            />
                                                        </span>
                                                        <span
                                                            v-if="
                                                                fileTypeData.mp4List.indexOf(
                                                                    scope.row
                                                                        .fileType
                                                                ) > -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-MP"
                                                            />
                                                        </span>
                                                        <span
                                                            v-if="
                                                                fileTypeData.pdfList.indexOf(
                                                                    scope.row
                                                                        .fileType
                                                                ) > -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-pdf1"
                                                            />
                                                        </span>
                                                        <span
                                                            v-if="
                                                                fileTypeData.pptList.indexOf(
                                                                    scope.row
                                                                        .fileType
                                                                ) > -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-PPT"
                                                            />
                                                        </span>
                                                        <span
                                                            v-if="
                                                                scope.row
                                                                    .fileType &&
                                                                    fileTypeData.imgList.indexOf(
                                                                        scope
                                                                            .row
                                                                            .fileType
                                                                    ) <= -1 &&
                                                                    fileTypeData.docList.indexOf(
                                                                        scope
                                                                            .row
                                                                            .fileType
                                                                    ) <= -1 &&
                                                                    fileTypeData.excelList.indexOf(
                                                                        scope
                                                                            .row
                                                                            .fileType
                                                                    ) <= -1 &&
                                                                    fileTypeData.mp4List.indexOf(
                                                                        scope
                                                                            .row
                                                                            .fileType
                                                                    ) <= -1 &&
                                                                    fileTypeData.pdfList.indexOf(
                                                                        scope
                                                                            .row
                                                                            .fileType
                                                                    ) <= -1 &&
                                                                    fileTypeData.pptList.indexOf(
                                                                        scope
                                                                            .row
                                                                            .fileType
                                                                    ) <= -1
                                                            "
                                                            class="fileIcon"
                                                        >
                                                            <i
                                                                class="iconfont icon-file"
                                                            />
                                                        </span>
                                                        <span
                                                            class="fileName"
                                                            >{{
                                                                scope.row
                                                                    .fileName
                                                            }}</span
                                                        >
                                                    </div>
                                                    <!--</el-tooltip>-->
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <!--文件 结束-->
                                <el-form-item
                                    :label="$t('message.Indentation')"
                                    prop="indentLevel"
                                >
                                    <el-select
                                        v-model="formx.indentLevel"
                                        style="width: 70%"
                                    >
                                        <el-option
                                            :label="
                                                $t('message.Not_Indentation')
                                            "
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
                                <div
                                    style="margin-top: 0px;
                                float: right;
                                margin-bottom: 20px"
                                >
                                    <!--v-if="form.originType!=1
                                    && form.originType!=2&&
                                    form.originType!=3&&
                                    form.originType!=4"-->
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
                            </el-form>
                        </el-tab-pane>
                        <!--新增-->
                        <el-tab-pane
                            :label="$t('message.Create_new')"
                            name="second"
                        >
                            <el-form
                                ref="forml"
                                :label-position="labelPosition"
                                :label-width="labelWidth"
                                :model="forml"
                                :rules="dialogAddModuleItem"
                            >
                                <el-form-item
                                    v-if="Number(form.originType) !== 4"
                                    prop="title"
                                    :label="$t('message.Name')"
                                >
                                    <el-input
                                        v-model="forml.title"
                                        maxlength="200"
                                        show-word-limit
                                        style="width: 70%"
                                    />
                                </el-form-item>

                                <!--作业添加-->
                                <el-form-item
                                    v-if="Number(form.originType) === 1"
                                    :label="$t('message.Assignment_group')"
                                    prop="assignmentGroupId"
                                >
                                    <el-select
                                        v-model="forml.assignmentGroupId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                        @change="changes"
                                    >
                                        <el-tooltip
                                            v-for="iteS in assignmentGroup"
                                            :key="iteS.id"
                                            class="item"
                                            effect="dark"
                                            :content="iteS.name"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="iteS.id"
                                                :label="iteS.name"
                                                :value="iteS.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--作业添加结束-->
                                <!--讨论添加-->
                                <el-form-item
                                    v-if="Number(form.originType) === 2"
                                    :label="$t('message.Discussion_type')"
                                    prop="isGrade.value"
                                >
                                    <el-select
                                        v-model="forml.isGrade.value"
                                        :placeholder="$t('message.Select')"
                                        style="width: 70%"
                                    >
                                        <el-option
                                            selected
                                            :label="$t('message.ungraded')"
                                            :value="0"
                                        />
                                        <el-option
                                            :label="$t('message.graded')"
                                            :value="1"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="
                                        Number(forml.isGrade.value) === 1 &&
                                            Number(form.originType) === 2
                                    "
                                    :label="$t('message.Assignment_group')"
                                    prop="assignmentGroupId"
                                >
                                    <el-select
                                        v-model="forml.assignmentGroupId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                        @change="changes"
                                    >
                                        <el-tooltip
                                            v-for="ite in assignmentGroup"
                                            :key="ite.id"
                                            class="item"
                                            effect="dark"
                                            :content="ite.name"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="ite.id"
                                                :label="ite.name"
                                                :value="ite.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>

                                <!--讨论添加结束-->
                                <!--测验添加-->
                                <el-form-item
                                    v-if="Number(form.originType) === 3"
                                    :label="$t('message.Select')"
                                    prop="types.value"
                                >
                                    <el-select
                                        v-model="forml.types.value"
                                        :placeholder="
                                            $t('message.Practic_Quiz')
                                        "
                                        style="width: 70%"
                                    >
                                        <el-option
                                            :label="$t('message.ungraded')"
                                            :value="1"
                                        />
                                        <el-option
                                            :label="$t('message.graded')"
                                            :value="2"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="
                                        Number(forml.types.value) === 2 &&
                                            Number(form.originType) === 3
                                    "
                                    :label="$t('message.Assignment_group')"
                                    prop="assignmentGroupId"
                                >
                                    <el-select
                                        v-model="forml.assignmentGroupId"
                                        :popper-class="aSelect"
                                        style="width: 70%"
                                        @change="changes"
                                    >
                                        <el-tooltip
                                            v-for="itemS in assignmentGroup"
                                            :key="itemS.id"
                                            class="item"
                                            effect="dark"
                                            :content="itemS.name"
                                            placement="top"
                                        >
                                            <el-option
                                                :key="itemS.id"
                                                :label="itemS.name"
                                                :value="itemS.id"
                                            />
                                        </el-tooltip>
                                    </el-select>
                                </el-form-item>
                                <!--测验添加结束-->
                                <!--文件添加-->
                                <el-form-item
                                    v-if="Number(form.originType) === 4"
                                    label=""
                                >
                                    <el-upload
                                        class="upload-demo"
                                        :before-remove="beforeRemove"
                                        :on-remove="removeFile"
                                        :action="uploadUrl"
                                        :on-change="handleChange"
                                        :on-success="handleSuccess"
                                        :limit="1"
                                        :file-list="fileList"
                                    >
                                        <el-button size="small" type="primary">
                                            {{ $t("message.Uploud_a_file") }}
                                        </el-button>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item
                                    v-if="Number(form.originType) === 4"
                                    :label="$t('message.Folder')"
                                >
                                    <div
                                        style="height: 160px;
                                border: 1px solid #ccc;
                                width: 70%;
                                overflow :auto"
                                    >
                                        <el-tree
                                            ref="fileTree"
                                            node-key="treeId"
                                            :highlight-current="true"
                                            :check-on-click-node="true"
                                            :expand-on-click-node="true"
                                            :props="props1"
                                            :load="loadNode1"
                                            :default-expanded-keys="
                                                treeExpandeKeys
                                            "
                                            accordion
                                            lazy
                                            @node-click="treeExpand"
                                        />
                                    </div>
                                </el-form-item>

                                <!--文件添加结束-->

                                <el-form-item
                                    :label="$t('message.Indentation')"
                                    prop="indentLevel"
                                >
                                    <el-select
                                        v-model="forml.indentLevel"
                                        style="width: 70%"
                                    >
                                        <el-option
                                            :label="
                                                $t('message.Not_Indentation')
                                            "
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
                                <div
                                    style="margin-top: 0px;float: right;margin-bottom: 20px"
                                >
                                    <!--v-if="form.originType!=1
                                    && form.originType!=2&&
                                    form.originType!=3&&
                                    form.originType!=4"-->
                                    <el-button @click="cancelAddModuleItem">
                                        {{ $t("message.Cancel") }}
                                    </el-button>
                                    <el-button
                                        style="background-color: #0138b1"
                                        type="primary"
                                        @click="submitAddModule"
                                    >
                                        {{ $t("message.Add_Item") }}
                                    </el-button>
                                </div>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                    <el-form-item
                        v-if="
                            Number(form.originType) !== 1 &&
                                Number(form.originType) !== 2 &&
                                Number(form.originType) !== 3 &&
                                Number(form.originType) !== 4
                        "
                        :label="$t('message.Indentation')"
                        prop="indentLevel"
                    >
                        <el-select
                            v-model="form.indentLevel"
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
                <div
                    v-if="
                        Number(form.originType) !== 1 &&
                            Number(form.originType) !== 2 &&
                            Number(form.originType) !== 3 &&
                            Number(form.originType) !== 4
                    "
                    slot="footer"
                    class="dialog-footer"
                    style="margin-top: 0px"
                >
                    <!---->
                    <el-button @click="cancelAddModuleItem">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button
                        style="background-color: #0138b1"
                        type="primary"
                        @click="submitAdd"
                    >
                        {{ $t("message.Add_Item") }}
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <!--修改名字-->
        <div class="mondify_name">
            <el-dialog
                :title="$t('message.Edit_Item')"
                :visible.sync="dialogEditModuleItemVisible"
                :width="dialogWidth"
                @closed="mondifyModuleName"
            >
                <el-form
                    ref="editModuleItemForm"
                    :label-position="labelPosition"
                    :label-width="labelWidth"
                    :model="editModuleItemForm"
                    :rules="dialogAddModulemondify"
                >
                    <el-form-item
                        :label="$t('message.Title')"
                        style="width: 77%"
                        prop="name"
                    >
                        <el-input
                            v-model="editModuleItemForm.name"
                            autocomplete="off"
                            maxlength="200"
                            show-word-limit
                        />
                    </el-form-item>
                    <!--v-if="editModuleItemForm.url"-->
                    <el-form-item
                        v-if="editModuleItemForm.url"
                        prop="url"
                        :label="$t('message.url')"
                        style="width: 77%"
                    >
                        <el-input
                            v-model="editModuleItemForm.url"
                            autocomplete="off"
                            minlength="1"
                            maxlength="200"
                        />
                    </el-form-item>
                    <el-form-item :label="$t('message.Indent')">
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
                        {{ $t("message.Save") }}

                        <!--{{ $t("message.Common_submit") }}-->
                    </el-button>
                </div>
            </el-dialog>
        </div>
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
                    <span
                        style="display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 100%;"
                    >
                        {{ $t("message.Move") }} "{{
                            moveModuleItemForm.name
                        }}"</span
                    >
                </el-form-item>
                <el-form-item
                    :label="$t('message.Module')"
                    prop="targetModuleId"
                >
                    <el-select
                        v-model="moveModuleItemForm.targetModuleId"
                        :popper-class="aSelect"
                        style="width: 70%"
                        @change="changeModule"
                    >
                        <el-tooltip
                            v-for="moduleSS in moduleDataList"
                            :key="moduleSS.id"
                            class="item"
                            effect="dark"
                            :content="moduleSS.name"
                            placement="top"
                        >
                            <el-option
                                :key="moduleSS.id"
                                :label="moduleSS.name"
                                :value="moduleSS.id"
                            />
                        </el-tooltip>
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
                        (Number(moveModuleItemForm.strategy) === 3 ||
                            Number(moveModuleItemForm.strategy) === 4) &&
                            module.moduleItems.length > 0
                    "
                    :label="$t('message.To')"
                    prop="targetModuleItemId"
                    required
                >
                    <el-select
                        v-model="moveModuleItemForm.targetModuleItemId"
                        :popper-class="aSelect"
                        style="width: 70%"
                    >
                        <el-option
                            v-for="moduleItemss in module.moduleItems"
                            v-show="
                                moduleItemss.title !== moveModuleItemForm.name
                            "
                            :key="moduleItemss.id"
                            :label="moduleItemss.title"
                            :value="moduleItemss.id"
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
                    <span style="display: inline-block;word-break: break-all;"
                        >{{ $t("message.Move") }} "{{
                            moveModuleForm.name
                        }}"</span
                    >
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
                        Number(moveModuleForm.strategy) === 3 ||
                            Number(moveModuleForm.strategy) === 4
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
                        <el-tooltip
                            v-for="moduless in moduleDataList"
                            :key="moduless.id"
                            class="item"
                            effect="dark"
                            :content="moduless.name"
                            placement="top"
                        >
                            <el-option
                                v-show="moduless.name !== moveModuleForm.name"
                                :value="moduless.id"
                                :label="moduless.name"
                            />
                        </el-tooltip>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--eslint-disable-->
                <el-button @click="cancelMoveModuleForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    v-if="
                        moveModuleForm.targetModuleId == 0 &&
                            moveModuleForm.strategy == 3
                    "
                    @click="cancelMoveModuleForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    v-if="
                        moveModuleForm.targetModuleId == 0 &&
                            moveModuleForm.strategy == 4
                    "
                    @click="cancelMoveModuleForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <el-button
                    v-if="
                        moveModuleForm.strategy == 1 ||
                            moveModuleForm.strategy == 2
                    "
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveModuleForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <el-button
                    v-if="moveModuleForm.targetModuleId != 0"
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveModuleForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <!--eslint-disable no-new-->
            </div>
        </el-dialog>
        <!--移动单元内容--><!--@closed="dialogMoveContentModuleVisibleClosed"-->
        <el-dialog
            :title="$t('message.Move_Content2')"
            :visible.sync="dialogMoveContentModuleVisible"
            :width="dialogWidth"
            @closed="cancelMoveContentModuleForm"
        >
            <el-form
                ref="moveContentModuleForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveContentModuleForm"
                :rules="moveContentModuleFormRules"
            >
                <!--label-width="40%"-->
                <el-form-item
                    :label="$t('message.Source_Module')"
                    style="width: 100%"
                    prop="sourceName"
                >
                    <span style="display: inline-block;word-break: break-all;">
                        {{ moveContentModuleForm.sourceName }}
                    </span>
                </el-form-item>
                <el-form-item
                    :label="$t('message.Target_Module')"
                    prop="targetModuleId"
                >
                    <el-select
                        v-model="moveContentModuleForm.targetModuleId"
                        :popper-class="aSelected"
                        style="width: 70%"
                    >
                        <el-tooltip
                            v-for="moduleDatass in moduleDataList"
                            :key="moduleDatass.id"
                            class="item"
                            effect="dark"
                            :content="moduleDatass.name"
                            placement="top"
                        >
                            <el-option
                                v-if="
                                    moduleDatass.id !==
                                        moveContentModuleForm.sourceModuleId
                                "
                                :key="moduleDatass.id"
                                :label="moduleDatass.name"
                                :value="moduleDatass.id"
                            />
                        </el-tooltip>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.strategy')" prop="strategy">
                    <el-select
                        v-model="moveContentModuleForm.strategy"
                        style="width: 70%"
                    >
                        <el-option :label="$t('message.TOP')" value="1" />
                        <el-option :label="$t('message.BOTTOM')" value="2" />
                        <!--暂时先不写 后台逻辑有点问题-->
                        <!--<el-option :label="$t('message.BEFORE')" value="3"></el-option>-->
                        <!--<el-option :label="$t('message.AFTER')" value="4"></el-option>-->
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelMoveContentModuleForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveContentModuleForm"
                >
                    {{ $t("message.Move") }}
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
// import previewFile from '@/utils/previewFile.vue';

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
        }
    },
    data() {
        return {
            url: "",
            title: "",
            upFileData: {},
            upParentDirectoryId: "",
            upFileId: "",
            pasenamed: "",
            fileUrl: process.env.FILE_PRE_SERVER,
            fileTypeData: utilMethods.fileTypeData,
            uploadUrl: `${process.env.NODE_ENV}/upload`,
            fileList: [],
            curFolderId: "",
            searchFile: "",
            canUpload: true,
            currentKey: "",
            loading: false,
            load: true,
            tableData: [],
            props1: {
                label: "fileName",
                children: "zones",
                isLeaf: "leaf"
            },
            treeExpandeKeys: [],
            practiceQuizList: [],
            gradedQuizList: [],
            surveyList: [],
            activeName: "first",
            assignmentGroupId: "",
            // isDisable: false,
            quizValue: "",
            aSelect: "aSelect",
            aSelected: "aSelected",
            explainMaxLength: 50,
            explainMaxLengthmax: 200,
            labelPosition: "right",
            labelWidth: "180px",
            dialogWidth: "40%",
            dialogMoveModuleVisible: false,
            dialogMoveModuleItemVisible: false,
            dialogMoveContentVisible: false,
            dialogAddModuleVisible: false,
            dialogEditModuleVisible: false,
            dialogAddModuleItemVisible: false,
            dialogEditModuleItemVisible: false,
            editModuleItemForm: {
                indent: "0",
                title: "",
                name: "",
                url: ""
            },
            baseItemDTO: {
                name: ""
            },
            textheard: [],
            editModuleForm: {
                title: "",
                name: ""
            },
            addModuleForm: {
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
                title: "",
                name: "",
                to: "",
                originType: "1",
                delivery: false,
                type: [],
                resource: "",
                originId: "",
                indentLevel: "0",
                desc: "",
                quizValue: "",
                assignmentGroupId: "",
                isGrade: {
                    value: ""
                }
            },
            formx: {
                title: "",
                name: "",
                to: "",
                originType: "1",
                delivery: false,
                type: [],
                resource: "",
                originId: "",
                indentLevel: "0",
                desc: "",
                quizValue: "",
                assignmentGroupId: "",
                isGrade: {
                    value: ""
                }
            },
            forml: {
                title: "",
                name: "",
                to: "",
                originType: "1",
                delivery: false,
                type: [],
                resource: "",
                originId: "",
                indentLevel: "0",
                desc: "",
                url: "",
                quizValue: "",
                assignmentGroupId: "",
                isGrade: {
                    value: ""
                },
                types: {
                    value: ""
                }
            },
            options: [
                {
                    quizValue: "1",
                    label: this.$t("message.Practice_Quizzes")
                },
                {
                    quizValue: "2",
                    label: this.$t("message.Assignment_Quizzes")
                }
            ],
            formLabelWidth: "28%",
            moduleItem: {}, // 临时操作的那个
            module: {}, // 临时操作的那个
            moduleDataList: [],
            assignmentDataList: [], // 作业下拉
            assignmentGroup: [], // 作业组
            quizDataList: [], // 测验下拉
            discussionDataList: [], // 讨论下拉
            fileDataList: [],
            courseId: this.$route.query.courseId,
            cacheAssignReq: [],
            sections: [], // 所有班级
            users: [], // 所有用户
            dialogAddModuleItemRules: {
                originId: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                "isGrade.value": [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                quizValue: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: this.$t("message.Name_Validl"),
                        trigger: "blur"
                    }
                ],
                assignmentGroupId: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: this.$t("message.Url_is_required"),
                        trigger: "blur"
                    }
                ]
            },
            ItemRules: {
                originId: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                "isGrade.value": [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                quizValue: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: this.$t("message.Name_Validl"),
                        trigger: "blur"
                    }
                ],
                assignmentGroupId: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: this.$t("message.Url_is_required"),
                        trigger: "blur"
                    }
                ]
            },
            dialogAddModulemondify: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.Name_Title"),
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: this.$t("message.Name_Title"),
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: this.$t("message.Url_is_required"),
                        trigger: "blur"
                    }
                ]
            },

            dialogAddModuleItem: {
                originId: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                assignmentGroupId: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                "isGrade.value": [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                "types.value": [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                quizValue: [
                    {
                        required: true,
                        message: this.$t("message.originId"),
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: this.$t("message.Name_Validl"),
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: this.$t("message.Name_Validl"),
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: this.$t("message.Url_is_required"),
                        trigger: "blur"
                    }
                ]
            },
            moveContentModuleForm: {
                sourceModuleId: "",
                targetModuleId: "",
                strategy: "",
                sourceName: "",
                quizValue: ""
            },
            dialogMoveContentModuleVisible: false,
            dialogMoveContentModuleVisibleClosed: false,
            moveContentModuleFormRules: {
                targetModuleId: [
                    {
                        required: true,
                        message: this.$t("message.target_moduleId_isValid"),
                        trigger: "blur"
                    }
                ],
                strategy: [
                    {
                        required: true,
                        message: this.$t("message.strategy_isValid"),
                        trigger: "blur"
                    }
                ]
            },
            addModuleFormRule: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Mudule_Name_Valid"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: "",
                        trigger: "blur"
                    }
                ]
            },
            upF: "",
            upFi: ""
        };
    },
    mounted() {
        // TODO取 课程id
        this.getModuleDataList();
        this.getAssignDataList();
    },
    created() {
        if (
            typeof this.$route.query.courseId === "undefined" &&
            typeof this.$route.query.groupId === "undefined"
        ) {
            this.hasCourseId = false;
            this.hasGroupId = false;
        } else if (
            typeof this.$route.query.courseId !== "undefined" &&
            typeof this.$route.query.groupId === "undefined"
        ) {
            this.hasGroupId = false;
            this.hasCourseId = true;
            this.courseId = this.$route.query.courseId;
        } else if (typeof this.$route.query.groupId !== "undefined") {
            this.hasGroupId = true;
            this.hasCourseId = false;
            this.groupId = this.$route.query.groupId;
        }
    },
    methods: {
        handleClick(tab, event) {
            // this.activeName == !this.activeNames;
            console.log(tab, event);
            // this.activeNames = this.activeNames == 'first' ? false : true;
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
        },
        beforeRemove(file) {
            //
            this.removedFileName = file.name;
        },
        removeFile(file, fileList) {
            console.log((file, fileList));
            for (let i = 0; i < this.tableData.length; i += 1) {
                if (this.tableData[i].fileName === this.removedFileName) {
                    this.tableData.splice(i, 1);
                    break;
                }
            }
        },
        // handleSuccess(res) {
        //     console.log(res);
        //     if (res.code === 200) {
        //
        //         this.fileEntity = res.entity;
        //         this.tableData.push(
        //             {
        //                 Path: this.fileEntity.fileId,
        //                 title: this.fileEntity.originName
        //             });
        //     }
        // },
        /*eslint-disable*/
        async handleSuccess(res) {
            if (res.code === 200) {
                // this.UploadPercent = 100;
                this.fileEntity = res.entity;
                /* this.fileEntity.forEach((a) => {
                                        a.id=this.upF;
                                        a.originName=this.upFi;
                                        console.log(a.id);

                                    }); */
                //
                this.tableData.push({
                    Path: this.fileEntity.fileId,
                    title: this.fileEntity.originName
                });
                const upFileData = res.entity[0];
                [this.upFileData] = res.entity;
                // this.upFileData = res.entry[0];
                const fileName = this.newNuptialName || upFileData.originName;
                const { fileId } = upFileData;
                const parentDirectoryId = this.curFolderId;
                this.upParentDirectoryId = this.curFolderId;
                this.upFileId = upFileData.fileId;
                this.pasenamed = upFileData.originName;
                this.loading = true;
                //await this.addFile(0, fileName, fileId, parentDirectoryId);
                await this.getInitTableData();
                // this.fileList = [];
            }
        },
        // 文件上传失败
        handleErro(err, file, fileList) {
            console.log(err, file, fileList);
        },
        // 添加文件
        // async addFile(isDirectory, name, fileId, parentDirectoryId) {
        //     const params = {
        //         isDirectory: 0,
        //         name,
        //         fileId,
        //         parentDirectoryId,
        //         isCovered: this.isCovered,
        //     };
        //     const result = await this.$getData('/userFile/add', params, 'post');
        //     if (result.data.code === 200) {
        //         this.$message({
        //             message: this.$t('message.add_file_success'),
        //             type: 'success',
        //         });
        //     }
        // },
        /*eslint-disable no-new*/
        // 去指定页面
        goTo(item) {
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    // 随便拿一个作业组
                    this.$http
                        .get(
                            `${process.env.NODE_ENV}/assignmentGroupItem/get?data=${targetId}`
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.$router.push({
                                    path: "assignmentPreView",
                                    query: {
                                        courseId,
                                        assignmentId: targetId,
                                        assignmentGroupId:
                                            res.data.entity.assignmentGroupId,
                                        assignmentGroupItemId:
                                            res.data.entity.id,
                                        name: item.title,
                                        modulesData: item.id
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
                case 2:
                    this.$router.push({
                        path: "/homePage/allCourse/discussionDeatilCourse",
                        query: {
                            discussionId: targetId,
                            courseId,
                            name: item.title,
                            modulesData: item.id
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/homePage/allCourse/courseQuizz",
                        query: {
                            data: targetId,
                            name: item.title,
                            modulesData: item.id,
                            courseId: this.courseId
                        }
                    });
                    break;
                case 14:
                    this.$router.push({
                        path: "fileView",
                        query: {
                            modulesData: item.id,
                            courseId: this.courseId,
                            originType: item.originType,
                            name: item.title
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
                                this.$router.push({
                                    path: "fileView",
                                    query: {
                                        originType: item.originType,
                                        fileUrl: res.data.entity.fileUrl,
                                        fileType: res.data.entity.fileType,
                                        modulesData: item.id,
                                        courseId: this.courseId,
                                        name: item.title
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
        /* this.$set(this.quizFor, 'assignmentGroupId', this.assignment[0].id) */
        treeExpand(data) {
            this.canUpload = data.allowUpload === 1;
            const tempTreeIdLen = data.treeId.length;
            if (tempTreeIdLen >= 20) {
                this.canAddFolder = false;
            } else {
                this.canAddFolder = true;
            }
            // const tempTreeId = data.treeId;
            this.treeExpandeKeys = [];
            let tempTreeList = [];
            tempTreeList = utilMethods.dealTreeList(data.treeId);
            this.treeExpandeKeys = tempTreeList;
            this.currentKey = data.treeId;
            this.currentData = data;
            this.curFolderId = data.id;
            this.getInitTableData();
            this.buttonShow = false;
        },
        async loadNode1(node, resolve) {
            if (this.isFirst) {
                this.node = node;
                this.resolve = resolve;
                this.isFirst = false;
            }
            if (node.level === 0) {
                await this.getFolderData();
                this.$nextTick(() => {
                    if (this.currentKey === "") {
                        // console.log('folderData', this.folderData)
                        const tempCurrentKey = this.folderData[0].treeId;
                        // this.canUpload = this.folderData[0].allowUpload === 1;
                        this.$refs.fileTree.setCurrentKey(tempCurrentKey);
                    } else {
                        // this.canUpload = this.currentData.allowUpload === 1;
                        this.$refs.fileTree.setCurrentKey(this.currentKey);
                    }
                });
                return resolve(this.folderData);
            }
            const tempId = node.data.id;
            const leafData = await this.getLeafData(tempId);
            this.$nextTick(() => {
                this.$refs.fileTree.setCurrentKey(this.currentKey);
            });
            return resolve(leafData);
        },
        // 获取文件夹列表
        async getFolderData() {
            this.folderData = [];
            let params = {};
            if (this.hasCourseId) {
                params = {
                    spaceType: 1,
                    courseId: this.courseId
                };
            } else if (this.hasGroupId) {
                params = {
                    spaceType: 2,
                    studyGroupId: this.groupId
                };
            } else {
                params = {};
            }
            const res = await this.$getData("/userFile/list", params, "get");
            if (res.data.code === 200) {
                const folderList = res.data.entity;
                const tempFolderData = utilMethods.deepClone(folderList);
                if (tempFolderData.length > 0) {
                    if (this.curFolderId === "") {
                        this.curFolderId = tempFolderData[0].id;
                    }
                    // const tempCurId = this.curFolderId;
                    this.getInitTableData();
                    this.folderData = tempFolderData;
                    this.folderData.forEach(el => {
                        el.leaf = !el.isDirectory;
                    });
                    // console.log('folderData000', this.folderData)
                }
            }
        },
        // async getFolderData() {
        //     this.folderData = [];
        //     const params = {
        //         spaceType: 1,
        //         courseId: this.courseId,
        //     };
        //
        //     const res = await this.$getData('/userFile/list', params, 'get');
        //     if (Number(res.data.code) === 200) {
        //         const folderList = res.data.entity;
        //         const tempFolderData = utilMethods.deepClone(folderList);
        //         if (tempFolderData.length > 0) {
        //             if (this.curFolderId === '') {
        //                 this.curFolderId = tempFolderData[0].id;
        //             }
        //             // const tempCurId = this.curFolderId;
        //             this.getInitTableData();
        //             this.folderData = tempFolderData;
        //             // this.folderData.forEach((el) => {
        //             //     el.leaf = !el.isDirectory;
        //             // });
        //             // console.log('folderData000', this.folderData)
        //         }
        //     }
        // },
        async getInitTableData() {
            this.loading = true;
            const params = { parentId: this.curFolderId };
            const res = await this.$getData("/userFile/list", params, "get");
            let tempTableData = [];
            if (Number(res.data.code) === 200) {
                this.loading = false;
                tempTableData = res.data.entity;
                // tempTableData.forEach((el) => {
                //     el.leaf = !el.isDirectory;
                // });
                // const tempObj = {};
                for (let i = 0; i < tempTableData.length; i += 1) {
                    this.$set(tempTableData[i], "isInput", false);
                    if (!tempTableData[i].updateUserName) {
                        tempTableData[i].updateUserName = "";
                    }
                }
                this.tableData = tempTableData;
                // this.buttonShow = false;
            }
        },
        // 获取指定文件夹下的文件夹列表
        async getLeafData(tempId) {
            const params = { parentId: tempId };
            const res = await this.$getData("/userFile/list", params, "get");
            let tempList = [];
            let tempTreeList = [];
            if (Number(res.data.code) === 200) {
                tempList = res.data.entity;
                // tempList.forEach((el) => {
                //     el.leaf = !el.isDirectory;
                // });
                this.tableData = tempList;
                tempTreeList = tempList.filter(
                    el => Number(el.isDirectory) === 1
                );
                return tempTreeList;
            }
            return false;
        },
        // 选中行
        handleCurrentChange(val) {
            if (val) {
                this.isSystem = Number(val.isSystemLevel) === 0;
                this.canUpload = Number(val.allowUpload) === 1;
                this.formx.originId = val.id;
                this.buttonShow = true;
                this.selectedCurData = val;
                if (!this.selectedCurData.fileType) {
                    this.canView = false;
                } else {
                    const tempFileType = this.selectedCurData.fileType;
                    this.canView = utilMethods.getIsView(tempFileType);
                }
            }
        },

        async changeModule(val) {
            this.module = this.moduleDataList.find(
                v => Number(v.id) === Number(val)
            );
            if (Number(this.module.moduleItems.length === 0)) {
                // 动态获取目标items
                const result = await this.$getData(
                    `/moduleItem/list?moduleId=${val}`,
                    null,
                    "get"
                );
                if (Number(result.data.code) === 200) {
                    // 刷新子项
                    const moduleItems = result.data.entity;
                    this.load = false;
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
        async getRandomAssginmentGroup(originId) {
            const result = await this.$getData(
                `/assignmentGroupItem/get?data=${originId}`,
                null,
                "get"
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
            let data = `courseId=${this.courseId}`;
            data += `&originId=${moduleItem.originId}`;
            data += `&originType=${moduleItem.originType}`;
            const result = await this.$getData(
                `/moduleItemAssign/list?${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const assigns = result.data.entity;
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
                this.dialogEditModuleItemVisible = false;
                this.refreshModuleItem(module);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async moduleItemEditadd(module, data) {
            this.$refs.editModuleItemForm.validate(async valid => {
                if (valid) {
                    const datas = {};
                    datas.id = data.id;
                    datas.indent = data.indent;
                    datas.name = this.editModuleItemForm.name;
                    datas.url = this.editModuleItemForm.url;
                    const result = await this.$getData(
                        "/moduleItem/indent/edit",
                        datas,
                        "post"
                    );
                    if (
                        Number(result.data.code) === 200 &&
                        Boolean(module.isShow) === true
                    ) {
                        this.dialogEditModuleItemVisible = false;
                        this.refreshModuleItem(module);
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
                return false;
            });
        },

        async deleteModuleItem(module, moduleItem) {
            // let result = await this.$getData("/moduleItem/deletes", moduleItem.id, "post");
            // if (result.data.code == 200 && module.isShow == true) {
            //   this.refreshModuleItem(module)
            // } else {
            //   this.$message.error(result.data.message);
            // }
            this.$confirm(this.$t("message.delete_statement"), "", {
                confirmButtonText: this.$t("message.Yes"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/moduleItem/deletes`,
                            moduleItem.id
                        )
                        .then(res => {
                            if (
                                Number(res.data.code) === 200 &&
                                Boolean(module.isShow) === true
                            ) {
                                this.refreshModuleItem(module);
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
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: 'undelete'
                    // });
                });
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
            const index = list.findIndex(v => v.id === this.module.id); // 找到当前module
            list.splice(index, 1); // 删除
            switch (this.moveModuleForm.strategy) {
                case "1": {
                    // 置顶
                    list.splice(0, 0, this.module); // 放到第一位
                    break;
                }
                case "2": {
                    // 置底
                    list.push(this.module); // 放到第一位
                    break;
                }
                case "3": {
                    // 指定之前
                    // 指定目标id
                    const targetIndex = list.findIndex(
                        v => v.id === this.moveModuleForm.targetModuleId
                    );
                    list.splice(targetIndex, 0, this.module); // 放到第一位
                    break;
                }
                case "4": {
                    // 指定之后
                    const targetIndex2 = list.findIndex(
                        v => v.id === this.moveModuleForm.targetModuleId
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
            this.$confirm(this.$t("message.delete_statement"), "", {
                confirmButtonText: this.$t("message.Yes"),
                cancelButtonText: this.$t("message.Cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(`${process.env.NODE_ENV}/module/deletes`, item.id)
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.getModuleDataList();
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
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: 'undelete'
                    // });
                });
        },
        // 提交修改单元表单
        /* async submitEditModuleForm() {
                                 const data = {};
                                 data.name = this.editModuleForm.name;
                                 data.id = this.module.id;
                                 const result = await this.$getData('/module/modify ', data, 'post');
                                 if (Number(result.data.code) === 200) {
                                     this.dialogEditModuleVisible = false;
                                     this.getModuleDataList();
                                 } else {
                                     this.$message.error(result.data.message);
                                 }
                             }, */

        async submitEditModuleForm() {
            this.$refs.editModuleForm.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.name = this.editModuleForm.name;
                    data.id = this.module.id;
                    const result = await this.$getData(
                        "/module/modify",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.dialogEditModuleVisible = false;
                        this.getModuleDataList();
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
                return false;
            });
        },

        cancelEditModuleForm() {
            this.dialogEditModuleVisible = false;
        },
        cancelAddModuleItem() {
            this.dialogAddModuleItemVisible = false;
            this.moveContentModuleForm = {
                sourceModuleId: "",
                targetModuleId: "",
                strategy: "",
                sourceName: "",
                quizValue: ""
            };
        },
        change(val) {
            this.form.originId = ""; // 重置下拉框
            switch (val) {
                case "1":
                    if (this.assignmentDataList.length === 0) {
                        // 缓存下 防止多次查找
                        this.getAssignmentGroup();
                    }
                    break;
                case "2":
                    if (this.discussionDataList.length === 0) {
                        // 缓存下 防止多次查找
                        this.getDiscussionDataList();
                    }
                    break;
                case "3":
                    if (this.quizDataList.length === 0) {
                        // 缓存下 防止多次查找
                        this.getQuizDataList();
                    }
                    break;
                case "4":
                    if (this.fileDataList.length === 0) {
                        // 缓存下 防止多次查找
                        this.getFileDataList();
                    }
                    break;
                default:
            }
        },
        // 提交添加单元项
        async submitAddModuleItem() {
            this.$refs.formx.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.courseId = this.courseId;
                    data.originIds = [];
                    data.moduleId = this.module.id;
                    data.originIds[0] = this.formx.originId;
                    data.originType = this.form.originType;
                    data.indentLevel = this.formx.indentLevel;
                    data.assignmentGroupId = this.formx.assignmentGroupId;
                    // data.baseItemDTO = {
                    //   name: this.editModuleForm.name,
                    // };

                    // 非新建
                    const result = await this.$getData(
                        "/moduleItem/add",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.quizValue = "";
                        this.formx.originId = "";
                        this.dialogAddModuleItemVisible = false;
                        this.formx.assignmentGroupId = "";
                        if (this.module.isShow === true) {
                            this.refreshModuleItem(this.module);
                        }
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
                return false;
            });
        },
        // 提交添加单元项
        async submitAddModule() {
            this.$refs.forml.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.courseId = this.courseId;
                    data.originIds = [];
                    data.moduleId = this.module.id;
                    data.originIds[0] = this.forml.originId;
                    data.originType = this.form.originType;
                    data.indentLevel = this.forml.indentLevel;
                    data.title = this.forml.title || this.upFileData.originName;
                    data.type = this.forml.types.value;
                    data.isGrade = this.forml.isGrade.value;
                    data.assignmentGroupId = this.forml.assignmentGroupId;
                    data.url = this.url;
                    data.parentDirectoryId = this.curFolderId;
                    data.fileId = this.upFileId;
                    // data.baseItemDTO = {
                    //   name: this.editModuleForm.name,
                    // };

                    // 新建
                    const result = await this.$getData(
                        "/moduleItem/content/edit",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.fileList = [];
                        this.quizValue = "";
                        this.forml.originId = "";
                        this.dialogAddModuleItemVisible = false;
                        this.forml.assignmentGroupId = "";
                        this.forml.title = "";
                        if (this.module.isShow === true) {
                            this.refreshModuleItem(this.module);
                        }
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
                return false;
            });
        },
        // 提交添加单元项
        async submitAdd() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const data = {};
                    data.courseId = this.courseId;
                    data.originIds = [];
                    data.moduleId = this.module.id;
                    data.originIds[0] = this.form.originId;
                    data.originType = this.form.originType;
                    data.indentLevel = this.form.indentLevel;
                    data.title = this.form.title;
                    data.url = this.form.url;
                    // 新建
                    const result = await this.$getData(
                        "/moduleItem/content/edit",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.fileList = [];
                        this.quizValue = "";
                        this.forml.originId = "";
                        this.forml.assignmentGroupId = "";
                        this.forml.title = "";
                        this.dialogAddModuleItemVisible = false;
                        this.forml.assignmentGroupId = "";
                        if (this.module.isShow === true) {
                            this.refreshModuleItem(this.module);
                        }
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
                return false;
            });
        },

        // 新增
        // moduleItemEdit: function () {
        //   let moduleItemedit = {
        //
        //   };
        //   this.$http.post(`${process.env.NODE_ENV}/moduleItem/content/edit`, moduleItemedit)
        //     .then((res) => {
        //       if (res.data.code == 200) {
        //         this.quizValue = '';
        //         this.form.originId = '';
        //         this.dialogAddModuleItemVisible = false;
        //         this.assignmentGroupId = '';
        //         if (this.module.isShow == true) {
        //           this.refreshModuleItem(this.module);
        //         }
        //       } else {
        //         this.$message.error(res.data.message);
        //       }
        //     }).catch((err) => {
        //     console.log(err);
        //   })
        // },
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
        QuizChange(type) {
            this.getQuizDataList(type);
            this.form.originId = "";
        },
        // 获取测验列表
        getQuizDataList(changeType) {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/quizSelect/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.practiceQuizList = [];
                        this.gradedQuizList = [];
                        this.quizDataList = res.data.entity;
                        if (Number(changeType) === 1) {
                            this.quizDataList.forEach(e => {
                                if (Number(e.type) === 1) {
                                    this.practiceQuizList.push(e);
                                }
                            });
                        } else if (Number(changeType) === 2) {
                            this.quizDataList.forEach(e => {
                                if (Number(e.type) === 2) {
                                    this.gradedQuizList.push(e);
                                }
                            });
                        }
                        // this.quizDataList.forEach((e) => {
                        //   if (e.type == 1) {
                        //     this.practiceQuizList.push(e);
                        //   } else if (e.type == 2) {
                        //     this.gradedQuizList.push(e);
                        //   } else if (e.type == 3 || e.type == 4) {
                        //     this.surveyList.push(e);
                        //   }
                        // })
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changes(val) {
            this.getAssignmentDataList(val);
        },
        // 获作业验列表
        getAssignmentDataList() {
            const param = {
                courseId: this.courseId,
                assignmentGroupId: this.formx.assignmentGroupId
            };
            this.$http
                .get(`${process.env.NODE_ENV}/assignmentSelect/list`, {
                    params: param
                })
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
        // 获作业组验列表
        getAssignmentGroup() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentGroup/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.assignmentGroup = res.data.entity;
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
                        this.load = false;
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
            if (this.assignmentDataList.length === 0) {
                // 缓存下 防止多次查找
                this.getAssignmentGroup();
                // this.getAssignmentDataList();
            }
        },
        // 提交编辑单元项表单
        submitEditModuleItemForm() {
            const data = this.editModuleItemForm;
            data.id = this.moduleItem.id;
            this.moduleItemEditadd(this.module, data);
        },
        // 取消moduleItem弹窗
        cancelEditModuleItemForm() {
            this.$refs.editModuleItemForm.resetFields();
            this.dialogEditModuleItemVisible = false;
        },
        // 编辑moduleItem弹窗
        editModuleItemDialog(module, moduleItem) {
            this.module = module;
            this.moduleItem = moduleItem;
            this.editModuleItemForm.name = moduleItem.title;
            this.editModuleItemForm.url = moduleItem.url;
            this.editModuleItemForm.indent = `${moduleItem.indentLevel}`;
            this.dialogEditModuleItemVisible = true;
        },
        // 折叠/展开单元
        collapseModule(module) {
            // if (module.isShow) {//关闭或再次展开就不需要刷新了
            //   this.$set(module, 'isShow', !module.isShow);
            //   return;
            // }
            // if (module.moduleItems.length > 0) {
            //   this.$set(module, 'isShow', !module.isShow);
            //   return;
            // }
            this.$http
                .get(
                    `${process.env.NODE_ENV}/moduleItem/list?moduleId=${module.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        const moduleItems = res.data.entity;

                        this.$set(module, "isShow", !module.isShow);
                        this.$set(module, "moduleItems", moduleItems);
                        // 查询分配记录
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
            // this.isDisable = true;
            this.$refs.addModuleForm.validate(async valid => {
                if (valid) {
                    this.addModuleForm.courseId = this.courseId;
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/module/add`,
                            this.addModuleForm
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.dialogAddModuleVisible = false;
                                this.getModuleDataList();
                            } else {
                                this.$message.error(res.data.message);
                            }
                            // this.isDisable = false;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                return false;
            });
        },
        // 添加单元项弹窗关闭回调
        dialogAddModuleItemVisibleClosed() {
            this.quizValue = "";
            this.form.originId = ""; // 重置下拉框
            this.formx.originId = ""; // 重置下拉框
            this.fileList = [];
            this.quizValue = "";
            this.forml.originId = "";
            this.formx.originId = "";
            this.forml.assignmentGroupId = "";
            this.forml.title = "";
            this.formx.assignmentGroupId = "";
            this.formx.title = "";
            this.$refs.form.resetFields(); // 重置表单
            this.$refs.forml.resetFields();
            this.$refs.formx.resetFields();
        },
        // 编辑单元弹窗关闭回调
        dialogEditModuleVisibleClosed() {
            this.$refs.editModuleForm.resetFields(); // 重置表单
        },
        // 添加单元弹窗关闭回调
        dialogAddModuleVisibleClosed() {
            this.$refs.addModuleForm.resetFields(); // 重置表单
        },
        mondifyModuleName() {
            this.$refs.editModuleItemForm.resetFields(); // 重置修改单元名字表单
        },
        cancelMoveContentModuleForm() {
            this.dialogMoveContentModuleVisible = false;
            this.$refs.moveContentModuleForm.resetFields(); // 重置表单
            this.moveContentModuleForm = {
                sourceModuleId: "",
                targetModuleId: "",
                strategy: "",
                sourceName: ""
            };
        },
        async submitMoveContentModuleForm() {
            this.$refs.moveContentModuleForm.validate(async valid => {
                if (valid) {
                    const result = await this.$getData(
                        "/moduleItem/moveContent/edit",
                        this.moveContentModuleForm,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.dialogMoveContentModuleVisible = false;
                        this.moveContentModuleForm = {
                            sourceModuleId: "",
                            targetModuleId: "",
                            strategy: "",
                            sourceName: "",
                            quizValue: ""
                        };
                        // this.getFileDataList();
                        // this.getDiscussionDataList();
                        // this.getQuizDataList();
                        // this.getAssignmentDataList();
                        this.getModuleDataList();
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
                return false;
            });
        },
        moveContentModuleDialog(module) {
            this.moveContentModuleForm.sourceModuleId = module.id;
            this.moveContentModuleForm.sourceName = module.name;
            this.dialogMoveContentModuleVisible = true;
        },
        cancelAddModuleForm() {
            this.$refs.addModuleForm.resetFields();
            this.dialogAddModuleVisible = false;
        }
    }
};
/*eslint-disable*/
</script>
<style>
.moudes_add .el-form-item__error,
.edit_add .el-form-item__error,
.mondify_name .el-form-item__error {
    display: contents;
}
</style>
<style scoped>
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
    /*margin-right: 2%;*/
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
    margin-bottom: 2%;
}

.modules-group {
    border-bottom: 1px dashed #a5afb5;
    padding: 20px;
}

.module-heard {
    border-bottom: none;
    margin-bottom: 28px;
    position: relative;
}

.module-heard p {
    font-size: 18px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.modules-row {
    position: relative;
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    /*border-radius: 3px;*/
    color: #394b58;
    /*border: 1px solid #c7cdd1;*/
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

.modules-success {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    display: inline-block;
    position: absolute;
    right: 106px;
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

.modules-outline {
    line-height: 34px;
    padding-left: 1%;
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    right: 52px;
    cursor: pointer;
}

.modules-menu {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    right: 0px;
    cursor: pointer;
}

.modules-menuList {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 18%;
}

.modules-suc {
    line-height: 34px;
    padding-left: 1%;
    font-size: 20px;
    display: inline-block;
    position: absolute;
    right: 54px;
    top: 24%;
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
    /*width: 16%;*/
}

img {
    vertical-align: middle;
    padding-right: 1%;
}

.quizzes-time {
    padding-left: 22px;
}

.quizzes-time ul li {
    font-size: 12px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    display: inline-block;
    padding: 0 2px;
}

.drag {
    cursor: move;
}

.i_edit {
    font-size: 20px;
    color: #666666;
    /*font-weight: 600 !important;*/
}

.i_ed {
    font-size: 22px;
    color: #666666;
    /*font-weight: 600 !important;*/
}

.written {
    font-size: 16px;
}

.modules-menu i:hover {
    color: #0138b1;
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

.group-set {
    background-color: #0138b1;
    color: white;
    vertical-align: -3px;
    padding: 8px 13px;
}

.group-set .icon-add {
    font-size: 22px;
    vertical-align: -3px;
    display: inline-block;
}

.i_edit_style {
    font-size: 20px;
}

/*.module_module {*/
/*height: 600px;*/
/*}*/

.el-table thead {
    display: none !important;
}

.creat {
    border-bottom: 1px solid #0e38b1;
    color: #0e38b1;
    opacity: 0.2;
    font-size: 18px;
    /*margin-left: 20px;*/
    font-family: ArialMT;
}

/*.moduleStart {*/
/*text-align: center;*/
/*width: 200px;*/
/*border-radius: 20px;*/
/*padding: 30px 66px 1px 60px;*/
/*border: 2px dashed #0e38b1;*/
/*margin: 180px auto;*/
/*line-height: 80px;*/
/*}*/
.moduleStart {
    text-align: center;
    width: 26%;
    border-radius: 20px;
    padding: 2% 1% 2% 1%;
    border: 2px dashed #0e38b1;
    margin: 8% auto;
    line-height: 50px;
}

.creatmodule {
    font-size: 180px;
    color: #0e38b1;
    opacity: 0.2;
}

.moduleStart :hover {
    opacity: 1;
    color: #0e38b1;
    cursor: pointer;
}
</style>
