<template>
    <div>
        <div class="className">
            <div class="module">
                <!--<el-button>{{$t('message.View_Progress')}}</el-button>-->
                <el-button
                    class="el-icon-circle-plus-outline_i1"
                    @click="dialogAddAssignmentGroupVisible = true"
                >
                    <i class="iconfont icon-add" />
                    {{ $t("message.Add_Assignment_Group") }}
                </el-button>
                <el-button
                    type="primary"
                    class="el-icon-circle-plus-outline_i1"
                    @click="goCreate"
                >
                    <i class="iconfont icon-add" />
                    {{ $t("message.Add_Assignment_Item") }}
                </el-button>
                <el-dropdown trigger="click" class="className_more">
                    <span class="el-dropdown-link">
                        <span
                            class="iconfont icon-spread-big"
                            style="font-size: 33px;
                            position: relative;
                            bottom: 5px;
                            cursor: pointer"
                        />
                    </span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="className_maskkuang"
                    >
                        <el-dropdown-item
                            @click.native="
                                editAssignmentGroupWeight(
                                    assignmentGroupDataList
                                )
                            "
                        >
                            <i
                                v-show="objweight.isWeightGrade"
                                class="iconfont icon-dui"
                            />
                            {{ $t("message.Edit_weight") }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!--作业组-->
            <div class="modules-list">
                <div
                    v-for="(item, index) in assignmentGroupDataList"
                    :key="index"
                    class="modules-group"
                >
                    <div class="module-heard">
                        <h3
                            v-trigger
                            style="display: inline-block;cursor: pointer"
                            class="shenglue"
                            @click="collapseAssignmentGroup(item)"
                        >
                            <i
                                v-show="item.isOpen"
                                class="iconfont icon-sanjiao_xia"
                            />
                            <i
                                v-show="!item.isOpen"
                                class="iconfont icon-sanjiaoyou"
                            />
                            <el-tooltip
                                v-show="item.name.length > 26"
                                class="item"
                                effect="dark"
                                :content="item.name"
                                placement="top"
                            >
                                <span class="assign_group">{{
                                    item.name
                                }}</span>
                            </el-tooltip>
                            <span
                                v-show="item.name.length <= 26"
                                class="assign_group"
                                >{{ item.name }}</span
                            >
                        </h3>
                        <div class="tubiao_you">
                            <span class="assignmentGroup_weight"
                                ><span
                                    v-show="objweight.isWeightGrade"
                                    class="assignmentGroup_weights"
                                    >{{ item.weight
                                    }}<span v-if="!item.weight">
                                        % {{ $t("message.of_the_Total") }}</span
                                    ><span v-if="item.weight"
                                        >%
                                        {{ $t("message.of_the_Total") }}</span
                                    ></span
                                ></span
                            >
                            <span
                                class="modules-outline"
                                @click="addAssignmentGroupHandler(item)"
                            >
                                <span
                                    class="iconfont icon-add1"
                                    style="font-size: 33px;
                                    position: relative;
                                    cursor: pointer;
                                    bottom: 4px;color: #666666"
                                />
                            </span>
                            <div class="modules-menu">
                                <el-row class="block-col-2">
                                    <el-col :span="12">
                                        <el-dropdown trigger="click">
                                            <span class="el-dropdown-link">
                                                <span
                                                    class="iconfont icon-spread-big"
                                                    style="font-size: 33px;position: relative;
                                                       cursor: pointer;color: #666666"
                                                />
                                            </span>
                                            <el-dropdown-menu
                                                slot="dropdown"
                                                class="maskkuang"
                                            >
                                                <el-dropdown-item
                                                    @click.native="
                                                        editAssignmentGroupDialog(
                                                            item
                                                        )
                                                    "
                                                >
                                                    <i
                                                        class="iconfont icon-edit"
                                                    />
                                                    <span class="written">{{
                                                        $t("message.Edit")
                                                    }}</span>
                                                </el-dropdown-item>
                                                <el-dropdown-item
                                                    :disabled="
                                                        assignmentGroupDataList.length <
                                                            2
                                                    "
                                                    @click.native="
                                                        moveAssignmentGroupDialog(
                                                            item,
                                                            index
                                                        )
                                                    "
                                                >
                                                    <!--<img src="../../../static/images/move.png" alt="">-->
                                                    <i
                                                        class="iconfont icon-move"
                                                    />
                                                    <span class="written">{{
                                                        $t("message.Move_Group")
                                                    }}</span>
                                                </el-dropdown-item>
                                                <el-dropdown-item
                                                    :disabled="
                                                        item
                                                            .assignmentGroupItems
                                                            .length === 0 ||
                                                            assignmentGroupDataList.length <
                                                                2
                                                    "
                                                    @click.native="
                                                        moveContentAssignmentGroupDialog(
                                                            item
                                                        )
                                                    "
                                                >
                                                    <i
                                                        class="iconfont icon-move"
                                                    />
                                                    <span class="written">{{
                                                        $t(
                                                            "message.Move_Content"
                                                        )
                                                    }}</span>
                                                </el-dropdown-item>
                                                <el-dropdown-item
                                                    :disabled="
                                                        assignmentGroupDataList.length <
                                                            2
                                                    "
                                                    @click.native="
                                                        openDeleteAssignmentGroup(
                                                            item
                                                        )
                                                    "
                                                >
                                                    <!--<img src="../../../static/images/delete.png" alt="">-->
                                                    <i
                                                        class="iconfont icon-delete"
                                                    />
                                                    <span class="written">{{
                                                        $t("message.Delete")
                                                    }}</span>
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="
                            item.assignmentGroupItems.length === 0 &&
                                item.isShow
                        "
                        class="content modules-row"
                        style="text-align: center;"
                    >
                        <span>{{
                            $t("message.ASSIGNMENT.noAssignmentData")
                        }}</span>
                    </div>
                    <div
                        v-for="(el, _index) in item.assignmentGroupItems"
                        v-show="item.isShow"
                        :key="_index"
                        class="content"
                        :style="{
                            'margin-left': el.indentLevel * 20 + 'px'
                        }"
                    >
                        <div class="modules-row">
                            <div class="assignmentimg">
                                <i
                                    v-if="el.originType == 1"
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-else-if="el.originType == 2"
                                    class="iconfont icon-liaotian i_edit"
                                    height="20"
                                    width="20"
                                />
                                <i
                                    v-else-if="el.originType == 3"
                                    class="iconfont icon--xiugaineirong i_edit"
                                    style="font-size: 22px;"
                                />
                                <img
                                    v-else-if="el.originType == 4"
                                    height="20"
                                    width="20"
                                    src="../../../static/images/pdf.png"
                                />
                            </div>
                            <a
                                style="cursor: pointer"
                                class="assignment_title"
                                @click="goTo(item, el)"
                                >{{ el.title }}</a
                            >
                            <div class="quizzes-time">
                                <ul class="ff">
                                    <v-module :modules="el.modules" />
                                    <v-available-time
                                        :assigns="el.assigns"
                                        :users="users"
                                        :sections="sections"
                                    />
                                    <v-due-time
                                        :assigns="el.assigns"
                                        :users="users"
                                        :sections="sections"
                                    />
                                    <li v-if="el.score > 0">
                                        {{ el.score / 100 }}
                                        {{ $t("message.pts") }}
                                    </li>
                                    <li />
                                </ul>
                            </div>
                            <div class="assignment_right">
                                <div class="isstatus">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="
                                            Number(el.status) === 0
                                                ? $t(
                                                      'message.ASSIGNMENT.Publish'
                                                  )
                                                : $t(
                                                      'message.ASSIGNMENT.UnPublish'
                                                  )
                                        "
                                        placement="top"
                                    >
                                        <span
                                            class="modules-success"
                                            @click="
                                                moduleItemPushHandler(item, el)
                                            "
                                        >
                                            <i
                                                v-if="Number(el.status) === 0"
                                                class="iconfont icon-Group-"
                                            />
                                            <i v-else class="el-icon-success" />
                                        </span>
                                    </el-tooltip>
                                </div>
                                <div class="modules-menuList">
                                    <el-row class="block-col-2">
                                        <el-col :span="12">
                                            <el-dropdown trigger="click">
                                                <span
                                                    class="el-dropdown-link"
                                                    style="width: 10px;display: inline-block;cursor: pointer"
                                                >
                                                    <img
                                                        src="../../../static/images/spread.png"
                                                        alt=""
                                                        style="vertical-align: baseline"
                                                    />
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                    class="maskkuang"
                                                >
                                                    <el-dropdown-item
                                                        @click.native="
                                                            editAssignmentGroupItemDialog(
                                                                item,
                                                                el
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-edit"
                                                        />
                                                        <span class="written">{{
                                                            $t("message.Edit")
                                                        }}</span>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :disabled="
                                                            assignmentGroupDataList.length <
                                                                2
                                                        "
                                                        @click.native="
                                                            moveAssignmentGroupItemDialog(
                                                                item,
                                                                el
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-move"
                                                        />
                                                        <span class="written">{{
                                                            $t(
                                                                "message.Move_to"
                                                            )
                                                        }}</span>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        @click.native="
                                                            openDeleteAssignmentGroupItem(
                                                                item,
                                                                el
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-delete"
                                                        />
                                                        <span class="written">{{
                                                            $t("message.Delete")
                                                        }}</span>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        @click.native="
                                                            goCourseResource(el)
                                                        "
                                                    >
                                                        <i
                                                            class="iconfont icon-fenxiang1"
                                                        />
                                                        <span class="written">{{
                                                            $t(
                                                                "message.share_resource"
                                                            )
                                                        }}</span>
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
        <el-dialog
            :title="$t('message.Adding_Working_Groups')"
            class="Adding_Working_Groups"
            :visible.sync="dialogAddAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogAddAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="addAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="addAssignmentGroupForm"
                :rules="addWorkGroupRules"
            >
                <el-form-item
                    :label="$t('message.Group_Name')"
                    prop="name"
                    label-width="150px"
                >
                    <el-input
                        v-model="addAssignmentGroupForm.name"
                        autocomplete="off"
                        maxlength="200"
                        show-word-limit
                    />
                </el-form-item>
                <el-form-item
                    v-if="objweight.isWeightGrade"
                    prop="weight"
                    style="margin-top: 20px"
                >
                    <el-input
                        v-model="addAssignmentGroupForm.weight"
                        class="Edit_weight"
                    />
                    <span>% {{ $t("message.ASSIGNMENT.of_total_grade") }}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddAssignmentGroupForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitAddAssignmentGroupForm"
                >
                    {{ $t("message.Add") }}
                </el-button>
            </div>
        </el-dialog>
        <!--修改作业组-->
        <el-dialog
            :title="$t('message.Edit_Assignment_Group')"
            :visible.sync="dialogEditAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogEditAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="editAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="editAssignmentGroupForm"
                :rules="editAssignmentGroupRules"
            >
                <el-form-item
                    :label="$t('message.Group_Name')"
                    prop="name"
                    label-width="150px"
                >
                    <el-input
                        v-model="editAssignmentGroupForm.name"
                        maxlength="200"
                        show-word-limit
                    />
                </el-form-item>
                <el-form-item
                    v-if="objweight.isWeightGrade"
                    prop="EditWeight"
                    style="margin-top: 20px"
                >
                    <el-input
                        v-model="editAssignmentGroupForm.EditWeight"
                        class="Edit_weight"
                    />
                    <span>% {{ $t("message.ASSIGNMENT.of_total_grade") }}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditAssignmentGroupForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitEditAssignmentGroupForm"
                >
                    {{ $t("message.Save") }}
                </el-button>
            </div>
        </el-dialog>
        <div class="assign_add">
            <el-dialog
                class="Add_Assignment_to_Assignments"
                :title="$t('message.Add_Assignment_to_Assignments')"
                :visible.sync="dialogAddAssignmentGroupItemVisible"
                :width="dialogWidth"
                @closed="dialogAddAssignmentGroupItemVisibleClosed"
            >
                <el-form
                    ref="form"
                    :label-position="labelPosition"
                    :label-width="labelWidth"
                    :model="form"
                    :rules="AddAssignmentToAssignmentsRules"
                >
                    <el-form-item
                        :label="$t('message.Type')"
                        prop="originType"
                        class="Add_Assignment"
                    >
                        <el-select v-model="form.originType" style="width: 80%">
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
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Name')"
                        prop="name"
                        class="Add_Assignment"
                    >
                        <el-input
                            v-model="form.name"
                            style="width: 80%"
                            maxlength="200"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Dues')"
                        prop="limitTime"
                        class="Add_Assignment"
                    >
                        <el-date-picker
                            v-model="form.limitTime"
                            style="width: 80%"
                            value-format="timestamp"
                            :placeholder="$t('message.select_Date')"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Points')"
                        class="Add_Assignment"
                        prop="point"
                    >
                        <el-input v-model="form.point" style="width: 80%" />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Publish')"
                        prop="status"
                        class="Add_Assignment"
                    >
                        <el-switch
                            v-model="form.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="goMore">
                        {{ $t("message.more_options") }}
                    </el-button>
                    <el-button @click="cancelAddAssignmentGroupItem">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button
                        style="background-color: #0138b1"
                        type="primary"
                        @click="submitAddAssignmentGroupItem"
                    >
                        {{ $t("message.Save") }}
                    </el-button>
                </div>
            </el-dialog>
        </div>

        <el-dialog
            :title="$t('message.Edit_Assignment')"
            :visible.sync="dialogEditAssignmentGroupItemVisible"
            :width="dialogWidth"
            @closed="dialogEditAssignmentGroupItemVisibleClosed"
        >
            <el-form
                ref="editAssignmentGroupItemForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="editAssignmentGroupItemForm"
                :rules="editAssignmentGroupItemRules"
            >
                <el-form-item
                    style="margin-bottom: 20px"
                    :label="$t('message.Assignment_Group_Item_Name')"
                    prop="name"
                >
                    <el-input
                        v-model="editAssignmentGroupItemForm.name"
                        autocomplete="off"
                        show-word-limit
                        maxlength="200"
                    />
                </el-form-item>
                <el-form-item
                    style="margin-bottom: 20px"
                    :label="$t('message.Points')"
                    prop="point"
                >
                    <el-input
                        v-model="editAssignmentGroupItemForm.point"
                        type="text"
                        step="0.00001"
                        autocomplete="off"
                        @mousewheel.native.prevent
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Publish')" prop="status">
                    <el-switch
                        v-model="editAssignmentGroupItemForm.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="goMoreAssignment">
                    {{ $t("message.more_options") }}
                </el-button>
                <el-button @click="cancelEditAssignmentGroupItemForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitEditAssignmentGroupItemForm"
                >
                    {{ $t("message.Save") }}
                </el-button>
            </div>
        </el-dialog>
        <!--移动作业项-->
        <el-dialog
            :title="$t('message.Move_Contents')"
            :visible.sync="dialogMoveAssignmentGroupItemVisible"
            :width="dialogWidth"
            @closed="dialogMoveAssignmentGroupItemVisibleClosed"
        >
            <el-form
                ref="moveAssignmentGroupItemForm"
                class="move_assignment"
                :label-position="labelPosition"
                :model="moveAssignmentGroupItemForm"
            >
                <el-form-item>
                    {{ $t("message.Assignment_Group") }}
                </el-form-item>
                <el-form-item prop="targetAssignmentGroupId">
                    <el-select
                        v-model="
                            moveAssignmentGroupItemForm.targetAssignmentGroupId
                        "
                        :popper-class="aSelected"
                        style="width: 70%"
                        @change="changeAssignmentGroup"
                    >
                        <el-tooltip
                            v-for="ele in assignmentGroupDataList"
                            :key="ele.id"
                            class="item"
                            effect="dark"
                            :content="ele.name"
                            placement="top"
                        >
                            <el-option
                                :key="ele.id"
                                :label="ele.name"
                                :value="ele.id"
                            />
                        </el-tooltip>
                    </el-select>
                </el-form-item>
                <el-form-item>{{ $t("message.strategy") }}</el-form-item>
                <el-form-item prop="strategy">
                    <el-select
                        v-model="moveAssignmentGroupItemForm.strategy"
                        style="width: 70%"
                    >
                        <el-option :label="$t('message.TOP')" value="1" />
                        <el-option :label="$t('message.BOTTOM')" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="
                        (moveAssignmentGroupItemForm.strategy == 3 ||
                            moveAssignmentGroupItemForm.strategy == 4) &&
                            assignmentGroup.assignmentGroupItems.length > 0
                    "
                    :label="$t('message.To')"
                    prop="targetAssignmentGroupItemId"
                    required
                >
                    <el-select
                        v-model="
                            moveAssignmentGroupItemForm.targetAssignmentGroupItemId
                        "
                        style="width: 70%"
                    >
                        <el-option
                            v-for="assignmentItem in assignmentGroup.assignmentGroupItems"
                            v-show="
                                assignmentItem.title !==
                                    moveAssignmentGroupItemForm.name
                            "
                            :key="assignmentItem.id"
                            :label="assignmentGroupItem.title"
                            :value="assignmentGroupItem.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer move_assignment_footer">
                <el-button @click="cancelMoveAssignmentGroupItemForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveAssignmentGroupItemForm"
                >
                    {{ $t("message.Move") }}
                </el-button>
            </div>
        </el-dialog>
        <!--移动作业组-->
        <el-dialog
            :title="$t('message.Move_Group')"
            :visible.sync="dialogMoveAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogMoveAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="moveAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveAssignmentGroupForm"
            >
                <el-form-item style="width: 70%" prop="name">
                    <span class="moveAssignmentGroupForm_name"
                        >{{ $t("message.Move") }} "{{
                            moveAssignmentGroupForm.name
                        }}"</span
                    >
                </el-form-item>
                <el-form-item prop="strategy">
                    <el-select
                        v-model="moveAssignmentGroupForm.strategy"
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
                        moveAssignmentGroupForm.strategy == 3 ||
                            moveAssignmentGroupForm.strategy == 4
                    "
                    :label="$t('message.To')"
                    prop="targetAssignmentGroupId"
                >
                    <el-select
                        v-model="
                            moveAssignmentGroupForm.targetAssignmentGroupId
                        "
                        :popper-class="aSelected"
                        style="width: 70%"
                    >
                        <el-option
                            :label="$t('message.Common_please_select')"
                            value="0"
                            style="display: none"
                        />
                        <el-tooltip
                            v-for="assignmentGroupVal in assignmentGroupDataList"
                            :key="assignmentGroupVal.id"
                            class="item"
                            effect="dark"
                            :content="assignmentGroupVal.name"
                            placement="top"
                        >
                            <el-option
                                v-show="
                                    assignmentGroupVal.name !==
                                        moveAssignmentGroupForm.name
                                "
                                :label="assignmentGroupVal.name"
                                :value="assignmentGroupVal.id"
                            />
                        </el-tooltip>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--eslint-disable-->
                <el-button @click="cancelMoveAssignmentGroupForm">
                    {{ $t("message.Cancel") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    v-if="
                        moveAssignmentGroupForm.targetAssignmentGroupId == 0 &&
                            moveAssignmentGroupForm.strategy == 3
                    "
                    @click="cancelMoveAssignmentGroupForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <el-button
                    style="background-color: #0138b1"
                    type="primary"
                    v-if="
                        moveAssignmentGroupForm.targetAssignmentGroupId == 0 &&
                            moveAssignmentGroupForm.strategy == 4
                    "
                    @click="cancelMoveAssignmentGroupForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <el-button
                    v-if="
                        moveAssignmentGroupForm.strategy == 1 ||
                            moveAssignmentGroupForm.strategy == 2
                    "
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveAssignmentGroupForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <el-button
                    v-if="moveAssignmentGroupForm.targetAssignmentGroupId != 0"
                    style="background-color: #0138b1"
                    type="primary"
                    @click="submitMoveAssignmentGroupForm"
                >
                    {{ $t("message.Common_submit") }}
                </el-button>
                <!--eslint-disable no-new-->
            </div>
        </el-dialog>
        <!--删除作业-->
        <el-dialog
            :title="$t('message.Delete_Assignment')"
            :visible.sync="isDeleteAssignment"
            width="30%"
        >
            <p>{{ $t("message.Delete_Assignment_Confirm") }}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDeleteAssignmentGroupItem">{{
                    $t("message.Cancel")
                }}</el-button>
                <el-button
                    type="primary"
                    @click="
                        deleteAssignmentGroupItem(
                            assignmentGroup,
                            assignmentGroupItem
                        )
                    "
                >
                    {{ $t("message.Yes") }}
                </el-button>
            </span>
        </el-dialog>
        <!--删除作业小组-->
        <el-dialog
            :title="$t('message.Delete_Assignment_Group')"
            :visible.sync="isDeleteAssignmentGroup"
            @closed="dialogAssignmentClosed"
            width="30%"
        >
            <p class="assignment_group_p">
                {{ $t("message.ASSIGNMENT.You_are_about_to_delete")
                }}{{ assignmentGroup.name }} ,
                {{ $t("message.ASSIGNMENT.which_has") }}
                <span>{{ this.assignmentItemGroupCount }}</span>
                <span v-if="assignmentItemGroupCount > 1">{{
                    $t("message.ASSIGNMENT.assignments")
                }}</span
                ><span v-else>{{ $t("message.ASSIGNMENT.assignment") }}</span
                >{{ $t("message.ASSIGNMENT.in_it") }}.
            </p>
            <p class="assignment_group_p">
                {{ $t("message.ASSIGNMENT.Would_you_like_to") }}:
            </p>
            <p class="assignment_group_p">
                <el-radio v-model="radio" label="1">
                    {{ $t("message.ASSIGNMENT.Delete_its_assignments") }}
                </el-radio>
            </p>
            <p v-if="assignmentItemGroupCount != 0" class="assignment_group_p">
                <el-radio v-model="radio" label="2">
                    {{ $t("message.ASSIGNMENT.Move_its_assignments_to") }}
                </el-radio>
            </p>
            <el-select
                v-if="Number(radio) === 2 && assignmentItemGroupCount !== 0"
                v-model="value2"
                :popper-class="aSelected"
                class="assignment_group_select"
                :placeholder="$t('message.ASSIGNMENT.Select_a_Group')"
            >
                <el-tooltip
                    v-for="item in newAssignmentGroupDataList"
                    :key="item.name"
                    class="item"
                    effect="dark"
                    :content="item.name"
                    placement="top"
                >
                    <el-option
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-tooltip>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDeleteAssignmentGroup">{{
                    $t("message.Cancel")
                }}</el-button>
                <el-button type="primary" @click="moduleDelete(assignmentGroup)"
                    >{{ $t("message.ASSIGNMENT.Delete_Group") }}
                </el-button>
            </span>
        </el-dialog>
        <!--移动作业组内容-->
        <el-dialog
            :title="$t('message.Move_Content2')"
            :visible.sync="dialogMoveContentAssignmentGroupVisible"
            :width="dialogWidth"
            @closed="dialogMoveContentAssignmentGroupVisibleClosed"
        >
            <el-form
                ref="moveContentAssignmentGroupForm"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :model="moveContentAssignmentGroupForm"
            >
                <!-- <el-form-item :label="$t('message.Source_Assignment_Group')" style="width: 70%" prop="sourceName">
          <span>{{moveContentAssignmentGroupForm.sourceName}}</span>
        </el-form-item>-->
                <el-form-item>
                    {{ $t("message.Target_Assignment_Group") }}
                </el-form-item>
                <el-form-item prop="targetAssignmentGroupId">
                    <el-select
                        v-model="
                            moveContentAssignmentGroupForm.targetAssignmentGroupId
                        "
                        :popper-class="aSelected"
                        style="width: 70%"
                    >
                        <el-tooltip
                            v-for="assignmentGroupData in assignmentGroupDataList"
                            :key="assignmentGroupData.id"
                            class="item"
                            effect="dark"
                            :content="assignmentGroupData.name"
                            placement="top"
                        >
                            <el-option
                                v-show="
                                    assignmentGroupData.id !=
                                        moveContentAssignmentGroupForm.sourceAssignmentGroupId
                                "
                                :key="assignmentGroupData.id"
                                :label="assignmentGroupData.name"
                                :value="assignmentGroupData.id"
                            />
                        </el-tooltip>
                    </el-select>
                </el-form-item>
                <el-form-item>{{ $t("message.strategy") }}</el-form-item>
                <el-form-item prop="strategy">
                    <el-select
                        v-model="moveContentAssignmentGroupForm.strategy"
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
            <div slot="footer">
                <p class="dialog-footer">
                    <el-button @click="cancelMoveContentAssignmentGroupForm">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button
                        style="background-color: #0138b1"
                        type="primary"
                        @click="submitMoveContentAssignmentGroupForm"
                    >
                        {{ $t("message.Move") }}
                    </el-button>
                </p>
            </div>
        </el-dialog>
        <el-dialog
            title="Assignment Groups Weight"
            :visible.sync="dialogEditAssignmentGroupWeight"
            width="30%"
            :before-close="handleClose"
        >
            <p>
                <el-checkbox v-model="objweight.isWeightGrade">
                    {{ $t("message.ASSIGNMENT.Weight_final_grade") }}
                </el-checkbox>
            </p>
            <div v-show="objweight.isWeightGrade">
                <div class="GroupWeight_list">
                    <el-form
                        ref="weightForm"
                        :model="weightForm"
                        :rules="weightRules"
                        style="padding-bottom: 20px"
                    >
                        <el-form-item prop="weights">
                            <div
                                v-for="(assignmentGroupEle,
                                num) in weightForm.weights"
                                :key="num"
                                style="border-bottom: 1px solid #eeeeee;padding-bottom: 12px;padding-top: 12px"
                            >
                                <el-row>
                                    <el-col
                                        :span="16"
                                        style="text-align: center;height: 30px;line-height: 30px"
                                        class="assignment_name"
                                    >
                                        {{ assignmentGroupEle.name }}
                                    </el-col>
                                    <el-col :span="8" justify="center">
                                        <p class="Percentagep">
                                            <el-input
                                                v-model="
                                                    assignmentGroupEle.weight
                                                "
                                                class="Percentage"
                                                style="width: 10%;min-width: 100px"
                                                @change="addNumber"
                                            />
                                            <span class="Percentage_mark"
                                                >%</span
                                            >
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <el-row style="padding-bottom: 12px;padding-top: 12px">
                    <el-col :span="16" style="text-align: center;height: 30px;">
                        {{ $t("message.ASSIGNMENT.Total") }}
                    </el-col>
                    <el-col :span="8" justify="center">
                        <p>{{ numberall }}%</p>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEditAssignmentGroupWeight = false">{{
                    $t("message.Cancel")
                }}</el-button>
                <el-button type="primary" @click="savegroupweight">{{
                    $t("message.Save")
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import utilMethods from "@/utils/utilMethods";
import dueDraw from "@/utils/dueDraw.vue";
import availableDraw from "@/utils/availableDraw.vue";
import moduleDraw from "@/utils/moduleDraw.vue";
import baseValidater from "@/utils/baseValidater";
/* eslint-disable */
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
        "v-available-time": availableDraw,
        "v-module": moduleDraw
    },
    filters: {
        formatterDate(val) {
            return utilMethods.formatDate(val);
        }
    },
    data() {
        const weightNum = (rule, value, callback) => {
            const tempValue = String(value).trim();
            if (tempValue) {
                const isDigital = isNaN(Number(tempValue));
                if (!isDigital) {
                    const tempNum = Number(tempValue);
                    if (tempNum < 0) {
                        callback(
                            new Error(
                                this.$t(
                                    "message.ASSIGNMENT.the_weight_Points_possible"
                                )
                            )
                        );
                    }
                    if (tempNum > 10000) {
                        callback(
                            new Error(
                                this.$t(
                                    "message.ASSIGNMENT.weight_Ponits_should"
                                )
                            )
                        );
                    }
                    callback();
                } else {
                    callback(
                        new Error(this.$t("message.ASSIGNMENT.Only_numbers"))
                    );
                }
            } else {
                callback();
            }
        };
        const weightValidate = (rule, value, callback) => {
            const tempValList = value;
            const isNumber = tempValList.every(el => {
                return !isNaN(el.weight);
            });
            if (isNumber) {
                const noBeyond = tempValList.every(item => {
                    const tempNum = Number(item.weight);
                    return tempNum >= 0 && tempNum <= 10000;
                });
                if (noBeyond) {
                    callback();
                } else {
                    callback(
                        new Error(
                            this.$t("message.ASSIGNMENT.the_number_range")
                        )
                    );
                }
            } else {
                callback(new Error(this.$t("message.ASSIGNMENT.Only_numbers")));
            }
        };
        return {
            aSelected: "aSelected",
            labelPosition: "right",
            labelWidth: "150px",
            dialogWidth: "28%",
            dialogMoveAssignmentGroupVisible: false,
            dialogMoveAssignmentGroupItemVisible: false,
            dialogMoveContentVisible: false,
            dialogAddAssignmentGroupVisible: false,
            dialogEditAssignmentGroupVisible: false,
            dialogAddAssignmentGroupItemVisible: false,
            dialogEditAssignmentGroupItemVisible: false,
            assignmentItemGroupCount: null,
            newAssignmentGroupDataList: [],
            ssignmentItemGroupCount: null,
            dialogEditAssignmentGroupWeight: false,
            assignmentlist: null,
            dialogVisible: false,
            value2: null,
            objweight: { isWeightGrade: "" },
            numberall: 0,
            radio: "1",
            isAsk: true,
            editAssignmentGroupItemForm: {
                point: "",
                status: false,
                name: ""
            },
            value: "",
            editAssignmentGroupForm: {
                name: "",
                EditWeight: ""
            },
            moveAssignmentGroupForm: {
                targetAssignmentGroupId: "0",
                name: "",
                strategy: "1"
            },
            moveAssignmentGroupItemForm: {
                sourceAssignmentGroupId: "",
                sourceAssignmentGroupItemId: "",
                targetAssignmentGroupId: "",
                targetAssignmentGroupItemId: "",
                name: "",
                strategy: "1"
            },
            moduleSpread: false,
            form: {
                name: "",
                limitTime: "",
                originType: "1",
                status: false,
                point: ""
            },
            formLabelWidth: "28%",
            addAssignmentGroupForm: {
                name: "",
                weight: 100
            },
            assignmentGroupItem: {}, // 临时操作的那个
            assignmentGroup: {}, // 临时操作的那个
            assignmentGroupDataList: [],
            assignmentDataList: [], // 作业下拉
            quizDataList: [], // 测验下拉
            discussionDataList: [], // 讨论下拉
            fileDataList: [],
            courseId: this.$route.query.courseId,
            cacheAssignReq: [],
            sections: [], // 所有班级
            users: [], // 所有用户
            addWorkGroupRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Add_Work_Group_Valid"),
                        trigger: "blur"
                    }
                ],
                weight: [
                    {
                        validator: weightNum,
                        trigger: "blur"
                    }
                ]
            },
            weightForm: {
                weights: []
            },
            weightRules: {
                weights: [
                    {
                        required: true,
                        validator: weightValidate,
                        trigger: "blur"
                    }
                ]
            },
            AddAssignmentToAssignmentsRules: {
                name: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Add_Assignment_To_Assignments_Valid"
                        ),
                        trigger: "blur"
                    }
                ],
                point: [
                    {
                        required: true,
                        validator: baseValidater.pointValidate,
                        trigger: "blur"
                    }
                ]
            },
            editAssignmentGroupRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Edit_Assignment_Group_Valid"),
                        trigger: "blur"
                    }
                ],
                EditWeight: [
                    {
                        validator: weightNum,
                        trigger: "blur"
                    }
                ]
            },
            editAssignmentGroupItemRules: {
                name: [
                    {
                        required: true,
                        message: this.$t(
                            "message.Edit_Assignment_Group_Item_Valid"
                        ),
                        trigger: "blur"
                    }
                ],
                point: [
                    {
                        required: true,
                        validator: baseValidater.pointValidate,
                        trigger: "blur"
                    }
                ]
            },
            isDeleteAssignment: false,
            isDeleteAssignmentGroup: false,
            dialogMoveContentAssignmentGroupVisible: false,
            dialogMoveContentAssignmentGroupVisibleClosed: false,
            moveContentAssignmentGroupForm: {
                sourceAssignmentGroupId: "",
                targetAssignmentGroupItemId: "",
                strategy: "",
                sourceName: ""
            }
        };
    },
    mounted() {
        // TODO取 课程id
        this.isGradeWeight();
        this.getAssignmentGroupDataList();
        this.getAssignDataList();
    },
    methods: {
        addNumber() {
            let tempWeightList = this.weightForm.weights;
            let totalNum = 0;
            for (let i = 0; i < tempWeightList.length; i++) {
                totalNum =
                    totalNum +
                    Number(Number(tempWeightList[i].weight).toFixed(2));
            }
            this.numberall = totalNum;
        },
        goCourseResource(el) {
            const { originType } = el;
            const { originId } = el;
            this.$router.push({
                path: "/homePage/courseResource",
                query: {
                    originType,
                    id: originId,
                    resourceTitle: el.title
                }
            });
        },
        savegroupweight() {
            this.$refs.weightForm.validate(async valid => {
                if (valid) {
                    let weights = [];
                    for (let i = 0; i < this.weightForm.weights.length; i++) {
                        let tempWeight = this.weightForm.weights[i].weight;

                        weights.push({
                            id: this.weightForm.weights[i].id,
                            weight: tempWeight
                                ? Number(tempWeight).toFixed(2)
                                : 100
                        });
                    }
                    let weightObj = {
                        isWeightGrade: Number(this.objweight.isWeightGrade),
                        weights: weights,
                        courseId: this.courseId
                    };
                    let res = await this.$getData(
                        "/assignmentGroup/weight/edit",
                        weightObj,
                        "post"
                    );
                    if (Number(res.data.code) === 200) {
                        this.dialogEditAssignmentGroupWeight = false;
                        for (
                            let i = 0;
                            i < this.assignmentGroupDataList.length;
                            i++
                        ) {
                            let tempObj = weights.find(el => {
                                return (
                                    el.id === this.assignmentGroupDataList[i].id
                                );
                            });
                            this.assignmentGroupDataList[i].weight =
                                tempObj.weight;
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                }
            });
        },
        async isGradeWeight() {
            const result = await this.$getData(
                `/assignmentGroup/weight/query?courseId=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.objweight.isWeightGrade = Boolean(
                    result.data.entity.isWeightGrade
                );
            } else {
                this.$message.error(result.data.message);
            }
        },
        goCreate() {
            this.$router.push({
                path: "assignmentdetail",
                query: {
                    courseId: this.courseId,
                    assignmentGroupIdfirst: this.assignmentGroupDataList[0].id,
                    name: this.assignmentGroupDataList[0].name
                }
            });
        },
        goMore() {
            const tempOrginType = parseInt(this.form.originType, 10);
            if (tempOrginType === 1) {
                this.$router.push({
                    path: "assignmentdetail",
                    query: {
                        courseId: this.courseId,
                        title: this.form.name,
                        limitTime: this.form.limitTime,
                        score:
                            this.form.point === "" ||
                            typeof this.form.point === "undefined"
                                ? 0
                                : this.form.point,
                        assignmentGroupId: this.assignmentGroup.id,
                        assignmentGroupItemId: this.assignmentGroupItem.id,
                        gomore: 1,
                        name: this.form.name
                    }
                });
            } else if (tempOrginType === 2) {
                let names = this.form.name;
                if (names === "") names = this.$t("message.Unnamed_Discuss");
                const params = {
                    courseId: this.courseId,
                    title: names,
                    types: 1,
                    isGrade: 1,
                    score:
                        this.form.point === "" ||
                        typeof this.form.point === "undefined"
                            ? 0
                            : this.form.point * 100,
                    assignmentGroupId: parseInt(this.assignmentGroup.id, 10),
                    assign: [
                        {
                            assignType: 1,
                            limitTime: this.form.limitTime
                        }
                    ]
                };
                this.$router.push({
                    path: "/homePage/allCourse/discussionAdmit",
                    query: {
                        types: "1",
                        courseId: this.courseId,
                        names: this.form.name,
                        score: params.score,
                        assignmentGroupId: params.assignmentGroupId,
                        isGrade: params.isGrade,
                        moreOption: 1
                    }
                });
            } else if (tempOrginType === 3) {
                let { name } = this.form;
                if (name === "") name = this.$t("message.Unnamed_Quiz");
                const quize = {
                    courseId: parseInt(this.courseId, 10),
                    title: name,
                    type: 2,
                    assignmentGroupId: parseInt(this.assignmentGroup.id, 10),
                    score: parseInt(
                        this.form.point === "" ||
                            typeof this.form.point === "undefined"
                            ? 0
                            : this.form.point,
                        10
                    ),
                    isShuffleAnswer: 0,
                    showReplyStrategy: 0,
                    showAnswerStrategy: 0,
                    showQuestionStrategy: 0,
                    isLockRepliedQuestion: 0,
                    isNeedAccessCode: 0,
                    isFilterIP: 0,
                    version: 1,
                    status: 0,
                    allow: 0,
                    totalQuestions: 0,
                    allowMultiAttempt: 0,
                    totalScore: parseInt(
                        this.form.point === "" ||
                            typeof this.form.point === "undefined"
                            ? 0
                            : this.form.point * 100,
                        10
                    ),
                    assign: [
                        {
                            assignType: 1,
                            limitTime: this.form.limitTime
                        }
                    ],
                    name: this.form.name
                };
                this.$http
                    .post(`${process.env.NODE_ENV}/quiz/add`, quize)
                    .then(res => {
                        if (Number(res.data.code) === 200) {
                            this.quizadd = res.data.message;
                            this.$router.push({
                                path: "/homePage/allCourse/mondifyQuizz",
                                query: {
                                    quizDetailId: parseInt(this.quizadd, 10),
                                    courseId: parseInt(this.courseId, 10),
                                    name: this.form.name,
                                    courseId: this.courseId
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
        goMoreAssignment() {
            const tempType = Number(this.assignmentGroupItem.originType);
            if (tempType === 1) {
                this.$router.push({
                    path: "assignmentdetail",
                    query: {
                        courseId: this.courseId,
                        assignmentId: this.assignmentGroupItem.originId,
                        assignmentGroupId: this.assignmentGroup.id,
                        assignmentGroupItemId: this.assignmentGroupItem.id,
                        // 'name':this.assignmentGroup.name
                        name: this.editAssignmentGroupItemForm.name,
                        score: this.editAssignmentGroupItemForm.point
                    }
                });
            } else if (tempType === 2) {
                this.$router.push({
                    path: "/homePage/allCourse/discussionAdmit",
                    query: {
                        type: "1",
                        courseId: this.courseId,
                        discussionId: this.assignmentGroupItem.originId,
                        name: this.editAssignmentGroupItemForm.name
                    }
                });
            } else if (tempType === 3) {
                this.$router.push({
                    path: "/homePage/allCourse/mondifyQuizz",
                    query: {
                        quizDetailId: parseInt(
                            this.assignmentGroupItem.originId,
                            10
                        ),
                        courseId: parseInt(this.courseId, 10),
                        name: this.editAssignmentGroupItemForm.name
                    }
                });
            }
        },
        // 去指定页面
        goTo(group, item) {
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    this.$router.push({
                        path: "assignmentPreView",
                        query: {
                            courseId: this.courseId,
                            assignmentId: targetId,
                            assignmentGroupId: group.id,
                            assignmentGroupItemId: item.id,
                            name: item.title
                        }
                    });
                    break;
                case 2:
                    this.$router.push({
                        path: "/homePage/allCourse/discussionDeatilCourse",
                        query: {
                            discussionId: targetId,
                            courseId,
                            name: item.title
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/homePage/allCourse/courseQuizz",
                        query: { data: targetId, name: item.title, courseId }
                    });
                    break;
                case 4:
                    this.$alert("文件预览");
                    break;
                default:
            }
        },
        async changeAssignmentGroup(val) {
            this.assignmentGroup = this.assignmentGroupDataList.find(
                v => Number(v.id) === Number(val)
            );
            if (this.assignmentGroup.assignmentGroupItems.length === 0) {
                // 动态获取目标items
                const result = await this.$getData(
                    `/assignmentGroupItem/list?assignmentGroupId=${val}`,
                    null,
                    "get"
                );
                if (Number(result.data.code) === 200) {
                    // 刷新子项
                    const assignmentGroupItems = result.data.entity;
                    this.$set(
                        this.assignmentGroup,
                        "assignmentGroupItems",
                        assignmentGroupItems
                    );
                } else {
                    this.$message.error(result.data.message);
                }
            }
        },
        cancelMoveAssignmentGroupItemForm() {
            this.dialogMoveAssignmentGroupItemVisible = false;
            this.$refs.moveAssignmentGroupItemForm.resetFields();
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupId = "";
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupItemId = "";
        },
        async submitMoveAssignmentGroupItemForm() {
            const result = await this.$getData(
                "/assignmentGroup/moveContent/edit",
                this.moveAssignmentGroupItemForm,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.dialogMoveAssignmentGroupItemVisible = false;
                // 内存操作
                if (
                    Number(
                        this.moveAssignmentGroupItemForm.sourceAssignmentGroupId
                    ) ===
                    Number(
                        this.moveAssignmentGroupItemForm.targetAssignmentGroupId
                    )
                ) {
                    // 展开操作
                    const assignmentGroup = this.assignmentGroupDataList.find(
                        v =>
                            Number(v.id) ===
                            Number(
                                this.moveAssignmentGroupItemForm
                                    .sourceAssignmentGroupId
                            )
                    );
                    assignmentGroup.isShow = false;
                    this.collapseAssignmentGroup(assignmentGroup);
                } else {
                    this.getAssignmentGroupDataList();
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 移动作业项弹窗关闭事件
        dialogMoveAssignmentGroupItemVisibleClosed() {
            this.$refs.moveAssignmentGroupItemForm.resetFields();
        },
        // 移动作业弹窗
        moveAssignmentGroupItemDialog(assignmentGroup, assignmentGroupItem) {
            this.assignmentGroup = assignmentGroup;
            this.assignmentGroupItem = assignmentGroupItem;
            this.dialogMoveAssignmentGroupItemVisible = true;
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupId =
                assignmentGroup.id;
            this.moveAssignmentGroupItemForm.sourceAssignmentGroupItemId =
                assignmentGroupItem.id;
            this.moveAssignmentGroupItemForm.targetAssignmentGroupId =
                assignmentGroup.id;
            this.moveAssignmentGroupItemForm.name = assignmentGroupItem.title;
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
        async getAssignmentGroupItemAssignDataList(
            assignmentGroup,
            assignmentGroupItem
        ) {
            let data = `courseId=${this.courseId}`;
            data += `&originId=${assignmentGroupItem.originId}`;
            data += `&originType=${assignmentGroupItem.originType}`;
            const result = await this.$getData(
                `/moduleItemAssign/list?${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const assigns = result.data.entity;
                this.$set(assignmentGroupItem, "assigns", assigns);
            } else {
                this.$message.error(result.data.message);
            }
        },
        async moduleItemPushHandler(assignmentGroup, assignmentGroupItem) {
            const data = {};
            data.originId = assignmentGroupItem.originId;
            data.originType = assignmentGroupItem.originType;
            data.status = Number(assignmentGroupItem.status) === 0 ? 1 : 0;
            const result = await this.$getData(
                "/publish/status/edit",
                data,
                "post"
            );
            if (Number(result.data.code) === 200) {
                assignmentGroupItem = Object.assign(assignmentGroupItem, {
                    status: data.status
                });
            } else {
                //this.$message.error(result.data.message);
            }
        },
        async assignmentGroupItemEdit() {
            const url = "/assignmentGroupItem/modify";
            const data = this.assignmentGroupItem;
            data.status = 0;
            if (this.editAssignmentGroupItemForm.status) data.status = 1;
            else data.status = 0;
            data.score =
                Number(this.editAssignmentGroupItemForm.point).toFixed(2) * 100;
            data.name = this.editAssignmentGroupItemForm.name;
            const result = await this.$getData(url, data, "post");
            if (Number(result.data.code) === 200) {
                this.dialogAddAssignmentGroupItemVisible = false;
                if (Boolean(this.assignmentGroup.isShow) === true) {
                    this.refreshAssignmentGroupItem(this.assignmentGroup);
                }
            } else {
                // this.$message.error(result.data.message);
                this.refreshAssignmentGroupItem(this.assignmentGroup);
            }
        },
        async deleteAssignmentGroupItem(assignmentGroup, assignmentGroupItem) {
            const result = await this.$getData(
                "/assignmentGroupItem/deletes",
                assignmentGroupItem.id,
                "post"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(assignmentGroup.isShow) === true
            ) {
                // this.refreshAssignmentGroupItem(assignmentGroup)
                assignmentGroup.assignmentGroupItems.splice(
                    assignmentGroup.assignmentGroupItems.findIndex(
                        v => Number(v.id) === Number(assignmentGroupItem.id)
                    ),
                    1
                );
                this.isDeleteAssignment = false;
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 重新获取子项
        async refreshAssignmentGroupItem(assignmentGroup) {
            const result = await this.$getData(
                `/assignmentGroupItem/list?assignmentGroupId=${assignmentGroup.id}`,
                null,
                "get"
            );
            if (
                Number(result.data.code) === 200 &&
                Boolean(assignmentGroup.isShow) === true
            ) {
                // 刷新子项
                const assignmentGroupItems = result.data.entity;
                this.$set(
                    assignmentGroup,
                    "assignmentGroupItems",
                    assignmentGroupItems
                );
                assignmentGroupItems.forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(
                        assignmentGroup,
                        v
                    );
                });
            } else {
                this.$message.error(result.data.message);
            }
        },
        cancelMoveAssignmentGroupForm() {
            this.dialogMoveAssignmentGroupVisible = false;
        },
        // 关闭移动作业
        dialogMoveAssignmentGroupVisibleClosed() {
            this.$refs.moveAssignmentGroupForm.resetFields();
        },
        // 提交移动作业表单
        submitMoveAssignmentGroupForm() {
            const list = utilMethods.clone(this.assignmentGroupDataList);
            const index = list.findIndex(
                v => Number(v.id) === Number(this.assignmentGroup.id)
            ); // 找到当前module
            list.splice(index, 1); // 删除
            const tempStrtegy = String(this.moveAssignmentGroupForm.strategy);
            if (tempStrtegy === "1") {
                list.splice(0, 0, this.assignmentGroup);
            } else if (tempStrtegy === "2") {
                list.push(this.assignmentGroup);
            } else if (tempStrtegy === "3") {
                // 指定之前
                // 指定目标id
                const targetIndex = list.findIndex(
                    v =>
                        Number(v.id) ===
                        Number(
                            this.moveAssignmentGroupForm.targetAssignmentGroupId
                        )
                );
                list.splice(targetIndex, 0, this.assignmentGroup); // 放到第一位
            } else if (tempStrtegy === "4") {
                const targetIndex2 = list.findIndex(
                    v =>
                        Number(v.id) ===
                        Number(
                            this.moveAssignmentGroupForm.targetAssignmentGroupId
                        )
                );
                list.splice(targetIndex2 + 1, 0, this.assignmentGroup); // 放到第一位
            }
            this.moveAssignmentGroupReq(list);
        },
        moveAssignmentGroupDialog(assignmentGroup) {
            this.assignmentGroup = assignmentGroup;
            this.moveAssignmentGroupForm.name = assignmentGroup.name;
            this.dialogMoveAssignmentGroupVisible = true;
        },
        // 移动作业组实现
        async moveAssignmentGroupReq(list) {
            const data = [];
            list.forEach(v => data.push(v.id));
            const result = await this.$getData(
                "/assignmentGroup/move/edit",
                { assignmentGroupIds: data },
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.assignmentGroupDataList = list;
                this.dialogMoveAssignmentGroupVisible = false;
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 作业组删除
        async moduleDelete(item) {
            if (Number(this.radio) === 2) {
                this.moveContentAssignmentGroupForm.sourceAssignmentGroupId =
                    item.id;
                this.moveContentAssignmentGroupForm.strategy = 2;
                this.moveContentAssignmentGroupForm.targetAssignmentGroupId = this.value2;
                const results = await this.$getData(
                    "/assignmentGroup/moveContent/edit",
                    this.moveContentAssignmentGroupForm,
                    "post"
                );
                if (Number(results.data.code) === 200) {
                    this.dialogMoveContentAssignmentGroupVisible = false;
                    this.moveContentAssignmentGroupForm = {
                        sourceAssignmentGroupId: "",
                        targetAssignmentGroupItemId: "",
                        sourceName: "",
                        strategy: ""
                    };
                    this.getAssignmentGroupDataList();
                } else {
                    this.$message.error(results.data.message);
                }
                const val = await this.$getData(
                    "/assignmentGroup/deletes",
                    item.id,
                    "post"
                );
                if (Number(val.data.code) === 200) {
                    this.getAssignmentGroupDataList();
                    this.isDeleteAssignmentGroup = false;
                } else {
                    this.$message.error(val.data.message);
                }
            } else {
                const result = await this.$getData(
                    "/assignmentGroup/deletes",
                    item.id,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.getAssignmentGroupDataList();
                    this.isDeleteAssignmentGroup = false;
                } else {
                    this.$message.error(result.data.message);
                }
            }
        },
        // 提交修改作业组表单
        async submitEditAssignmentGroupForm() {
            this.$refs.editAssignmentGroupForm.validate(async valid => {
                if (valid) {
                    let data = {
                        name: this.editAssignmentGroupForm.name,
                        id: this.assignmentGroup.id
                    };
                    if (this.objweight.isWeightGrade) {
                        const tempWeight = this.editAssignmentGroupForm.EditWeight.toString();
                        if (tempWeight.trim() !== "") {
                            const weightObj = { weight: Number(tempWeight) };
                            data = Object.assign(data, weightObj);
                        }
                    }

                    const result = await this.$getData(
                        "/assignmentGroup/modify",
                        data,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.dialogEditAssignmentGroupVisible = false;
                        this.getAssignmentGroupDataList();
                    } else {
                        this.$message.error(result.data.message);
                    }
                    return true;
                }
                return false;
            });
        },
        cancelEditAssignmentGroupForm() {
            this.$refs.editAssignmentGroupForm.resetFields();
            this.dialogEditAssignmentGroupVisible = false;
        },
        cancelAddAssignmentGroupItem() {
            this.$refs.form.resetFields();
            this.dialogAddAssignmentGroupItemVisible = false;
        },
        // 提交添加作业到作业组
        async submitAddAssignmentGroupItem() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    let url = "";
                    const data = {};
                    data.showScoreType = 2;
                    data.courseId = parseInt(this.courseId, 10);
                    data.title = this.form.name;
                    data.status = this.form.status ? 1 : 0;
                    data.score =
                        this.form.point === "" ||
                        typeof this.form.point === "undefined"
                            ? 0
                            : Number(this.form.point).toFixed(2) * 100;
                    // 作业小组ID（type=2,3） 测验type=2,3必须传此值
                    data.assignmentGroupId = this.assignmentGroup.id;
                    data.assign = [
                        {
                            assignType: 1, // 1: 所有， 2：section(班级), 3: 用户
                            limitTime: this.form.limitTime
                        }
                    ];
                    switch (this.form.originType) {
                        case "1":
                            url = "/assignment/add";
                            data.gradeType = 5; // 评分方式，1: 分值(points), 2: 百分比(percentage), 3: GPA, 4: Letter, 5: 不评分
                            data.submissionType = 4; // 提交类型, 1: 在线 2: 书面 3: 外部工具 4: 不提交
                            break;
                        case "2":
                            url = "/discussion/add";
                            data.type = 1; // 1: 课程里面创建的为普通讨论， 2：小组里面创建的为小组讨论
                            data.isGrade = 1; // 1: 课程里面创建的为普通讨论， 2：小组里面创建的为小组讨论
                            data.assign[0].assignId = 0;
                            break;
                        case "3":
                            // Quizzes
                            url = "/quiz/add";
                            // 1：练习测验(practice quiz)、
                            // 2：评分测验(graded quiz)、
                            // 3：评分调查(graded survey)、
                            // 4：非评分调查(ungraded survey)
                            data.type = 2;
                            data.isShuffleAnswer = 0; // ，是否重组答案（学生测验时答案选项将随机排列）
                            data.showReplyStrategy = 0; // ，显示学生的答题记录（正误）策略，0: 不显示 1：每次提交答案后 2：最后一次提交后
                            data.showAnswerStrategy = 0; // ，显示答案策略，0: 不显示 1：每次提交后 2：最后一次提交后
                            data.showQuestionStrategy = 0; // 显示问题策略, 0: 全部显示, 1: 每页一个
                            data.isLockRepliedQuestion = 0; // 回答后是否锁定问题
                            data.isNeedAccessCode = 0; // 是否需要访问码访问
                            data.isFilterIP = 0; // 是否过滤访问IP
                            data.version = 1; // 版本号（预留）,每次更新后版本号增加
                            data.totalQuestions = 0;
                            data.totalScore = 0;
                            break;
                        default:
                    }
                    const result = await this.$getData(url, data, "post");
                    if (Number(result.data.code) === 200) {
                        this.dialogAddAssignmentGroupItemVisible = false;
                        if (Boolean(this.assignmentGroup.isShow) === true) {
                            this.refreshAssignmentGroupItem(
                                this.assignmentGroup
                            );
                        }
                    } else {
                        this.$message.error(result.data.message);
                        data.score =
                            this.form.point === "" ||
                            typeof this.form.point === "undefined"
                                ? 0
                                : this.form.point / 10000;
                    }
                    return true;
                }
                return false;
            });
        },
        // 获作业下拉列表
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
        // 获取作业组列表
        getAssignmentGroupDataList() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentGroup/list?courseId=${this.courseId}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.assignmentGroupDataList = res.data.entity;
                        for (
                            let i = 0;
                            i < this.assignmentGroupDataList.length;
                            i += 1
                        ) {
                            this.$set(
                                this.assignmentGroupDataList[i],
                                "isShow",
                                false
                            );
                            this.$set(
                                this.assignmentGroupDataList[i],
                                "assignmentGroupItems",
                                []
                            );
                            this.$set(
                                this.assignmentGroupDataList[i],
                                "isOpen",
                                false
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
        // 编辑作业组弹窗
        editAssignmentGroupDialog(item) {
            this.assignmentGroup = item;
            this.editAssignmentGroupForm.name = item.name;
            this.editAssignmentGroupForm.EditWeight = item.weight;
            this.dialogEditAssignmentGroupVisible = true;
        },
        // 编辑作业组权重
        editAssignmentGroupWeight(assignmentGroupDataList) {
            this.dialogEditAssignmentGroupWeight = true;
            let allcore = 0;
            for (let i = 0; i < assignmentGroupDataList.length; i += 1) {
                if (assignmentGroupDataList[i].weight) {
                    // allcore += Number(assignmentGroupDataList[i].weight);
                    allcore += Number(
                        Number(assignmentGroupDataList[i].weight).toFixed(2)
                    );
                }
            }
            this.numberall = Number(allcore).toFixed(2);
            this.weightForm.weights = this.assignmentGroupDataList.map(el => {
                return {
                    id: el.id,
                    weight: el.weight ? el.weight : 100,
                    name: el.name
                };
            });
        },
        // 添加作业弹窗
        addAssignmentGroupHandler(assignmentGroup) {
            this.assignmentGroup = assignmentGroup;
            this.dialogAddAssignmentGroupItemVisible = true;
            if (this.assignmentDataList.length === 0) {
                // 缓存下 防止多次查找
                this.getAssignmentDataList();
            }
        },
        // 提交编辑作业表单
        submitEditAssignmentGroupItemForm() {
            this.$refs.editAssignmentGroupItemForm.validate(async valid => {
                if (valid) {
                    this.assignmentGroupItemEdit();
                    this.dialogEditAssignmentGroupItemVisible = false;
                    return true;
                }
                return false;
            });
        },
        // 取消编辑作业弹窗
        cancelEditAssignmentGroupItemForm() {
            this.$refs.editAssignmentGroupItemForm.resetFields();
            this.dialogEditAssignmentGroupItemVisible = false;
        },
        // 编辑作业弹窗
        editAssignmentGroupItemDialog(assignmentGroup, assignmentGroupItem) {
            this.assignmentGroup = assignmentGroup;
            this.assignmentGroupItem = assignmentGroupItem;
            this.editAssignmentGroupItemForm.name = assignmentGroupItem.title;
            this.editAssignmentGroupItemForm.status =
                Number(assignmentGroupItem.status) === 1;
            this.editAssignmentGroupItemForm.point =
                assignmentGroupItem.score === "" ||
                typeof assignmentGroupItem.score === "undefined"
                    ? 0
                    : assignmentGroupItem.score / 100;
            this.dialogEditAssignmentGroupItemVisible = true;
        },
        // 折叠/展开作业
        collapseAssignmentGroup(assignmentGroup) {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/assignmentGroupItem/list?assignmentGroupId=${assignmentGroup.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.$set(
                            assignmentGroup,
                            "isOpen",
                            !assignmentGroup.isOpen
                        );
                        const assignmentGroupItems = res.data.entity;
                        this.assignmentlist = res.data.entity;
                        this.$set(
                            assignmentGroup,
                            "isShow",
                            !assignmentGroup.isShow
                        );
                        this.$set(
                            assignmentGroup,
                            "assignmentGroupItems",
                            assignmentGroupItems
                        );
                        // 查询分配记录
                        assignmentGroup.assignmentGroupItems.forEach(v => {
                            this.getAssignmentGroupItemAssignDataList(
                                assignmentGroup,
                                v
                            );
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 提交添加作业组表单
        submitAddAssignmentGroupForm() {
            this.$refs.addAssignmentGroupForm.validate(valid => {
                if (valid) {
                    this.addAssignmentGroupForm.courseId = this.courseId;
                    this.addAssignmentGroupForm.point =
                        this.addAssignmentGroupForm.point * 100;
                    this.$http
                        .post(
                            `${process.env.NODE_ENV}/assignmentGroup/add`,
                            this.addAssignmentGroupForm
                        )
                        .then(res => {
                            if (Number(res.data.code) === 200) {
                                this.dialogAddAssignmentGroupVisible = false;
                                this.getAssignmentGroupDataList();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    return true;
                }
                return false;
            });
        },
        // 添加作业到作业组弹窗关闭回调
        dialogAddAssignmentGroupItemVisibleClosed() {
            this.form.originId = "0"; // 重置下拉框
            this.$refs.form.resetFields(); // 重置表单
        },
        // 编辑作业组弹窗关闭回调
        dialogEditAssignmentGroupVisibleClosed() {
            this.$refs.editAssignmentGroupForm.resetFields(); // 重置表单
        },
        // 添加作业组弹窗关闭回调
        dialogAddAssignmentGroupVisibleClosed() {
            this.$refs.addAssignmentGroupForm.resetFields(); // 重置表单
        },
        // 取消添加作业组表单
        cancelAddAssignmentGroupForm() {
            this.$refs.addAssignmentGroupForm.resetFields();
            this.dialogAddAssignmentGroupVisible = false;
        },
        dialogEditAssignmentGroupItemVisibleClosed() {
            this.$refs.editAssignmentGroupItemForm.resetFields();
            this.dialogEditAssignmentGroupItemVisible = false;
        },
        openDeleteAssignmentGroupItem(group, groupItem) {
            this.assignmentGroup = group;
            this.assignmentGroupItem = groupItem;
            this.isDeleteAssignment = true;
        },
        cancelDeleteAssignmentGroupItem() {
            this.isDeleteAssignment = false;
            this.assignmentGroup = {};
            this.assignmentGroupItem = {};
        },
        cancelDeleteAssignmentGroup() {
            this.isDeleteAssignmentGroup = false;
            this.moveContentAssignmentGroupForm = {
                sourceAssignmentGroupId: "",
                targetAssignmentGroupItemId: "",
                sourceName: "",
                strategy: ""
            };
            this.radio = "1";
            //this.assignmentGroup = {};
        },
        dialogAssignmentClosed() {
            this.isDeleteAssignmentGroup = false;
            this.moveContentAssignmentGroupForm = {
                sourceAssignmentGroupId: "",
                targetAssignmentGroupItemId: "",
                sourceName: "",
                strategy: ""
            };
            this.radio = "1";
        },
        openDeleteAssignmentGroup(group) {
            this.newAssignmentGroupDataList = [];
            this.moveContentAssignmentGroupForm.sourceAssignmentGroupId =
                group.id;
            this.moveContentAssignmentGroupForm.sourceName = group.name;
            this.assignmentGroup = group;
            this.assignmentItemGroupCount = this.assignmentGroup.assignmentGroupItems.length;
            this.isDeleteAssignmentGroup = true;
            this.assignmentGroupDataList.forEach(item => {
                if (this.assignmentGroup.name !== item.name) {
                    this.newAssignmentGroupDataList.push(item);
                }
            });
            this.value2 = this.newAssignmentGroupDataList[0].id;
        },
        moveContentAssignmentGroupDialog(assignmentGroup) {
            this.moveContentAssignmentGroupForm.sourceAssignmentGroupId =
                assignmentGroup.id;
            this.moveContentAssignmentGroupForm.sourceName =
                assignmentGroup.name;
            this.dialogMoveContentAssignmentGroupVisible = true;
        },
        cancelMoveContentAssignmentGroupForm() {
            this.dialogMoveContentAssignmentGroupVisible = false;
            this.moveContentAssignmentGroupForm = {
                sourceAssignmentGroupId: "",
                targetAssignmentGroupItemId: "",
                sourceName: "",
                strategy: ""
            };
        },
        async submitMoveContentAssignmentGroupForm() {
            const result = await this.$getData(
                "/assignmentGroup/moveContent/edit",
                this.moveContentAssignmentGroupForm,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.dialogMoveContentAssignmentGroupVisible = false;
                this.moveContentAssignmentGroupForm = {
                    sourceAssignmentGroupId: "",
                    targetAssignmentGroupItemId: "",
                    sourceName: "",
                    strategy: ""
                };
                this.getAssignmentGroupDataList();
            } else {
                this.$message.error(result.data.message);
            }
        },
        handleClose() {
            this.dialogEditAssignmentGroupWeight = false;
        }
    }
};
</script>

<style scoped>
.written {
    font-size: 16px;
}

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
    position: relative;
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
    padding: 1% 7% 1% 2%;
    box-sizing: border-box;
    border-radius: 3px;
    color: #394b58;
    border: 1px solid #c7cdd1;
    border-bottom: none;
    padding-left: 50px;
}

.content {
    /* border-radius: 3px; */
}

.content:last-child {
    border-bottom: 1px solid #c7cdd1;
}

.modules-success {
    line-height: 34px;
    padding-left: 8%;
    font-size: 24px;
    color: green;
    display: inline-block;
    cursor: pointer;
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
    padding-left: 1%;
    color: #999999;
    font-size: 34px;
    display: inline-block;
    cursor: pointer;
    margin-left: 43px;
}

.modules-menu {
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    cursor: pointer;
}

.modules-menuList {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    margin-left: 20px;
}

.isstatus {
    position: relative;
    top: 2px;
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

/*/deep/ .el-dropdown-menu {
                            display: inline-block;
                            width: 25%;
                            overflow: hidden;
                          }*/

.quizzes-time {
    margin-left: -7px;
}

.quizzes-time ul li {
    display: inline-block;
    padding: 0 1%;
}

.drag {
    cursor: move;
}

i {
    font-size: 22px !important;
    /*font-weight: 600 !important;*/
}

.assignmentimg i {
    color: #666666;
}

.size_small {
    font-size: 14px !important;
}

.modules-menu i:hover {
    color: #0138b1;
}

.assignment_elastic_alerts {
    width: 300px;
}

.Adding_Working_Groups {
}

/deep/ .el-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: left;
    margin-left: 90px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

/deep/ .el-dialog {
    min-width: 542px;
}

.el-icon-circle-plus-outline_i1 {
    height: 39px;
    line-height: 5px;
}

.el-icon-circle-plus-outline_i1 i {
    font-size: 8px;
    position: relative;
    top: 3px;
}

.el-icon-circle-plus-outline_i1 .el-icon-circle-plus-outline {
    vertical-align: middle;
    font-size: 8px;
}

.shenglue {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
    display: inline-block;
}

.maskkuang {
    /*width: 200px;*/
    overflow: hidden;
}

.className_maskkuang {
    /*width: 250px;*/
    overflow: hidden;
}

.icon-Group- {
    color: #666666;
}

.assignmentimg {
    position: absolute;
    left: 15px;
}

.assignment_right {
    position: absolute;
    right: 20px;
    top: 10px;
    display: flex;
}

.tubiao_you {
    width: 277px;
    position: absolute;
    right: 3px;
    top: 0;
}

.modules-outline_add {
    position: relative !important;
    top: -6px !important;
}

.assignment_group_select {
    margin-left: 30px;
}

.assignment_group_p {
    line-height: 40px;
}

/deep/ .el-form-item {
    margin-bottom: 5px;
}

.move_assignment {
    margin-left: 25%;
}

.move_assignment_footer {
    margin-left: -32px;
}

.className_more {
    position: relative;
    top: 12px;
    margin-left: 5px;
}

.Percentagep {
    width: 100px;
    border-radius: 3px;
    border: 1px solid #ccc;
    height: 39px;
    line-height: 30px;
    position: relative;

    background: #eeeeee;
}

.Percentage {
    display: inline-block;
    width: 60px;
    text-align: center;
    background: #eeeeee;
}

.Percentage_mark {
    display: inline-block;
    width: 39px;
    text-align: center;
    border-left: #cccccc 1px solid;
    position: absolute;
    right: 0;
    top: 1px;
    background: #eeee;
    height: 90%;
    padding-top: 3px;
}

.GroupWeight_list {
    height: 220px;
    margin-top: 20px;
    overflow-y: scroll;
}

.className_maskkuang .icon-dui {
    font-size: 11px !important;
}

.assignmentGroup_weight {
    display: inline-block;
    width: 153px;
    height: 30px;
    vertical-align: middle;
    position: relative;
    top: -17px;
    left: 36px;
    border-radius: 22px;
    text-align: center;
    line-height: 30px;
}

.assignmentGroup_weights {
    display: inline-block;
    width: 152px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 22px;
    text-align: center;
    line-height: 30px;
}

.Edit_weight {
    width: 130px;
}

.weight_final {
    margin-left: 15px;
}

.dialog-footer {
    padding: 20px;
    padding-top: 10px;
    text-align: left;
    margin-left: 39px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.Add_Assignment {
    margin-top: 20px;
}

.assignment_name {
    width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.moveAssignmentGroupForm_name {
    display: inline-block;
    width: 300px;
    word-wrap: break-word;
}

.assignment_title {
    display: block;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.assign_group {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.Add_Assignment_to_Assignments .el-dialog__body {
    padding: 10px 10px !important;
}
</style>
