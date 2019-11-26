<template>
    <!--eslint-disable-->
    <div class="studentDiscussions">
        <div v-show="discussionStepOne" class="discussionStepOne">
            <el-row>
                <el-col :span="12">
                    <div style="margin-top: -8px">
                        <el-form
                            ref="form"
                            :model="form"
                            style="display: inline-block"
                        >
                            <el-form-item
                                label=""
                                style="width: 35%;display: inline-block"
                            >
                                <el-input
                                    v-model="form.name"
                                    placeholder="Search"
                                    prefix-icon="el-icon-search"
                                    disabled="disabled"
                                />
                            </el-form-item>
                            <el-form-item
                                label=""
                                style="display: inline-block;width: 35%;margin-left: 18px"
                            >
                                <el-select
                                    v-model="form.region"
                                    placeholder="All"
                                    disabled="disabled"
                                >
                                    <el-option label="" value="1">
                                        1
                                    </el-option>
                                    <el-option label="" value="2">
                                        2
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="float: right;margin-right: 49%">
                        <el-button
                            icon="el-icon-circle-plus-outline"
                            type="primary"
                            style="display: inline-block;width: 63%"
                            @click="addDiscussion"
                        >
                            Discussion
                        </el-button>
                        <el-button
                            icon="el-icon-setting"
                            @click="openCenterDialogVisible"
                        />
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <div class="grid-content bg-purple">
                        <div class="disMain">
                            <div class="disMainImg">
                                <img
                                    src="../../../static/images/studiscussion.png"
                                    alt=""
                                />
                                <p>
                                    There are no discussions to show in this
                                    section
                                </p>
                                <a @click="addDiscussion"
                                    >Click here to add a discussion</a
                                >
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="discussionStepTwo" class="discussionStepTwo">
            <el-row>
                <el-col :span="18" style="">
                    <el-row>
                        <el-col :span="23">
                            <el-input
                                v-model="title"
                                placeholder="Topic Title"
                            />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <div class="editor">
                                <ckeditor
                                    v-model="content"
                                    :editor="editor"
                                    :config="editorConfig"
                                />
                            </div>
                        </el-col>
                    </el-row>
                    <el-form ref="ruleform" :model="ruleform" label-width="">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item
                                    v-show="postTo"
                                    label="Post to"
                                    style=""
                                    multiple
                                    style="margin-left: 18%;margin-top: 20px"
                                >
                                    <!--<el-select v-model="ruleform.assignId"  multiple placeholder="请选择班级"  style="width: 70%">-->
                                    <!--<el-option-->
                                    <!--v-for="item in section"-->
                                    <!--:label="item.name"-->
                                    <!--:value="item.id"-->
                                    <!--:key="item.id">-->
                                    <!--</el-option>-->
                                    <!--</el-select>-->
                                    <el-select
                                        v-model="postSections"
                                        placeholder="Please select"
                                        multiple
                                    >
                                        <!--<el-option-group-->
                                        <!--v-for="group in section"-->
                                        <!--:key="group.label"-->
                                        <!--:label="group.label">-->
                                        <!--</el-option-group>-->
                                        <el-option
                                            v-for="item in postToSection"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item
                            label="Attachment"
                            style="margin-left: 14%;margin-top: 10px"
                        >
                            <!--<el-input disabled="disabled" style="display: inline-block;width: 15%"-->
                            <!--placeholder="Select File"></el-input>-->
                            <el-upload
                                style="display: inline-block"
                                class="upload-demo"
                                :action="upload"
                                :file-list="file"
                                :on-success="uploadSuccess"
                                accept=".doc,.docx,.mp4,.ppt,.pptx,.xls,.xlsx,.pdf,.mp3,.swf,.jpg,.jpeg,.png,.gif,.bmp"
                            >
                                <el-button type="primary">
                                    点击上传
                                </el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="Options" style="margin-left: 18%">
                            <el-checkbox
                                v-model="ruleform.isGrade"
                                label="Graded"
                                name="isGrade"
                                @change="disoption"
                            /><br />
                            <!--<el-checkbox label="Allow threaded replied" name="option" style="margin-left: 28%"></el-checkbox>-->
                        </el-form-item>

                        <el-form-item
                            label="Group Discussion"
                            style="margin-left: 10%"
                        >
                            <div class="multiple-attempts">
                                <el-checkbox v-model="gradeType1">
                                    This is a group discussion
                                </el-checkbox>
                                <p style="margin-left: 24px;color:gray;">
                                    Group Set
                                </p>
                                <el-form-item
                                    label=""
                                    prop="region"
                                    style="margin-left: 24px"
                                >
                                    <el-select
                                        v-model="ruleform.studyGroupSetId"
                                        placeholder="请选择小组"
                                        style="width: 98%"
                                    >
                                        <el-option
                                            v-for="item in classGroup"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item style="margin-left: 24px">
                                    <el-button
                                        icon="el-icon-circle-plus-outline"
                                        @click="dialogFormVisible = true"
                                    >
                                        New Group Category
                                    </el-button>
                                </el-form-item>
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-show="pointsPossible"
                            label="Points Possible"
                            style="margin-left: 11.5%"
                        >
                            <el-input
                                v-model="ruleform.score"
                                style="width: 12%"
                            >
                                Points Possible
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            v-show="displayGradeas"
                            style="margin-left: 10%"
                            label="Display Grade as"
                            prop="region"
                        >
                            <el-select
                                v-model="ruleform.gradeType"
                                placeholder="请选择"
                                style="width: 27%"
                            >
                                <el-option label="分值" value="1">
                                    分值
                                </el-option>
                                <el-option label="百分比" value="2">
                                    百分比
                                </el-option>
                                <el-option label="GAP" value="3">
                                    GAP
                                </el-option>
                                <el-option label="Letter" value="4">
                                    Letter
                                </el-option>
                                <el-option label="不评分" value="5">
                                    不评分
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            v-show="assignmentGroup"
                            label="Assignment Group"
                            prop="region"
                            style="margin-left: 9%"
                        >
                            <el-select
                                v-model="ruleform.assignmentGroupId"
                                placeholder=""
                                style="width: 27%"
                            >
                                <el-option label="" value="">
                                    <div @click="dialogAssignmentCreate = true">
                                        [创建新小组]
                                    </div>
                                </el-option>
                                <el-option
                                    v-for="item in assignmentGroup"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            v-show="assignTo"
                            label="Assign"
                            style="margin-left: 19%"
                        >
                            <div class="multiple-assign">
                                <!--<div class="addto">-->
                                <!--<p>Assign to</p>-->
                                <!--<el-select v-model="ruleform.assignId"  multiple placeholder="请选择班级"  style="width: 70%">-->
                                <!--<el-option-->
                                <!--v-for="item in section"-->
                                <!--:label="item.name"-->
                                <!--:value="item.id"-->
                                <!--:key="item.id">-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--<p>Due</p>-->
                                <!--<el-date-picker-->
                                <!--v-model="value1time"-->
                                <!--type="datetime"-->
                                <!--placeholder="选择日期时间" style="width: 100%">-->
                                <!--</el-date-picker>-->
                                <!--<div class="available-until">-->
                                <!--<p>Available from</p>-->
                                <!--<el-date-picker-->
                                <!--v-model="value1time"-->
                                <!--type="datetime"-->
                                <!--placeholder="选择日期时间" style="width: 100%">-->
                                <!--</el-date-picker>-->
                                <!--</div>-->
                                <!--<div class="available-until">-->
                                <!--<p>Until</p>-->
                                <!--<el-date-picker-->
                                <!--v-model="value1time"-->
                                <!--type="datetime"-->
                                <!--placeholder="选择日期时间" style="width: 100%">-->
                                <!--</el-date-picker>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--动态生成的表单-->
                                <el-form-item
                                    v-for="domain in assign"
                                    :key="domain.key"
                                >
                                    <div class="assign-addto">
                                        <div class="assign-style">
                                            <p>
                                                Assign to
                                                <i
                                                    class="el-icon-error"
                                                    style="float: right;cursor: pointer;margin-top: 10px"
                                                    @click.prevent="
                                                        editRemoveDomain(domain)
                                                    "
                                                />
                                            </p>
                                            <el-select
                                                v-model="domain.assignId"
                                                :multiple="false"
                                                placeholder="请选择班级"
                                                style="width: 70%"
                                                @change="
                                                    selectAssignChange(domain)
                                                "
                                            >
                                                <el-option-group
                                                    v-for="group in section"
                                                    :key="group.label"
                                                    :label="group.label"
                                                >
                                                    <el-option
                                                        v-for="item in group.options"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="
                                                            item.type +
                                                                '_' +
                                                                item.id
                                                        "
                                                    />
                                                </el-option-group>
                                            </el-select>
                                            <p>Due</p>
                                            <el-date-picker
                                                v-model="domain.limitTime"
                                                type="datetime"
                                                placeholder="选择日期时间"
                                                style="width: 100%"
                                            />
                                            <div class="available-until">
                                                <p>Available from</p>
                                                <el-date-picker
                                                    v-model="domain.startTime"
                                                    type="datetime"
                                                    placeholder="选择日期时间"
                                                    style="width: 100%"
                                                />
                                            </div>
                                            <div class="available-until">
                                                <p>Until</p>
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
                                        Add
                                    </el-button>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-show="availableFrom"
                            label="Available from"
                            style="margin-left: 13%"
                        >
                            <el-date-picker
                                v-model="ruleform.startTime"
                                type="datetime"
                                placeholder="选择日期"
                                style="width: 21%"
                            />
                        </el-form-item>
                        <el-form-item
                            v-show="until"
                            label="Until"
                            style="margin-left: 21.5%"
                        >
                            <el-date-picker
                                v-model="ruleform.endTime"
                                type="datetime"
                                placeholder="选择日期"
                                style="width: 21%"
                            />
                        </el-form-item>
                        <el-row>
                            <el-col :span="20">
                                <el-form-item>
                                    <el-button
                                        style="margin-left: 33.5%"
                                        @click="editorcancel"
                                    >
                                        Cancel
                                    </el-button>
                                    <p style="float: right">
                                        <el-button
                                            style=""
                                            @click="discussionPublish"
                                        >
                                            Save&Publish
                                        </el-button>
                                        <el-button
                                            type="primary"
                                            style=""
                                            @click="onSubmit"
                                        >
                                            Save
                                        </el-button>
                                    </p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
                <el-col :span="6" style="">
                    <div class="discussionRightBar">
                        <el-tabs
                            v-model="activeName"
                            :stretch="true"
                            @tab-click="handleClick"
                        >
                            <el-tab-pane label="Links" name="first">
                                <p class="link">
                                    Link to other content in the course.Click
                                    any page to insert a think to that page
                                </p>
                                <div class="quizeLinks">
                                    <el-collapse accordion>
                                        <div class="left-quize">
                                            <el-collapse-item>
                                                <template slot="title">
                                                    Page
                                                </template>
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                        <div class="left-quize">
                                            <el-collapse-item
                                                title="Assignments"
                                            >
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                        <div class="left-quize">
                                            <el-collapse-item title="Quizzes">
                                                <div>1111</div>
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                        <div class="left-quize">
                                            <el-collapse-item
                                                title="Announcements"
                                            >
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                        <div class="left-quize">
                                            <el-collapse-item
                                                title="Discussions"
                                            >
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                        <div class="left-quize">
                                            <el-collapse-item title="Modules">
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                        <div class="left-quize">
                                            <el-collapse-item
                                                title="Course Navigation"
                                            >
                                                <div>1111</div>
                                                <div>1111</div>
                                            </el-collapse-item>
                                        </div>
                                    </el-collapse>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Files" name="second">
                                Files
                            </el-tab-pane>
                            <el-tab-pane label="Images" name="third">
                                Images
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
            <div>
                <el-dialog
                    title="Create group Set"
                    :visible.sync="dialogFormVisible"
                >
                    <el-form ref="createGroupForm" :model="createGroupForm">
                        <el-form-item label="Group set name">
                            <el-input
                                v-model="createGroupForm.name"
                                autocomplete="off"
                                style="width: 50%"
                            />
                        </el-form-item>
                        <el-form-item label="Self Sign-up">
                            <el-checkbox
                                v-model="createGroupForm.allowSelfSignup"
                                label="Allow Self Sign up"
                                name="type"
                                @change="allSelfSignUp"
                            />
                            <el-checkbox
                                v-model="createGroupForm.isSectionGroup"
                                label="Require group members to be in the same section"
                                name="type"
                                style="margin-left: 28%"
                            />
                        </el-form-item>
                        <el-form-item label="Group Structure">
                            <!--<el-radio-group v-model="form.resource">-->
                            <el-radio
                                v-show="splitStudents"
                                label=""
                                @change="splitStudent"
                            >
                                Split students into
                                <el-input
                                    v-model="createGroupForm.createNGroup"
                                    style="width: 60px"
                                    autocomplete="off"
                                />
                                groups </el-radio
                            ><br />
                            <el-radio
                                v-show="createGroupsManually"
                                label=""
                                style="margin-left: 28%"
                            >
                                I'll create groups manually </el-radio
                            ><br />
                            <el-radio
                                v-show="createGroupsNow"
                                label=""
                                style="margin-left: 28%"
                            >
                                Create
                                <el-input
                                    v-model="createGroupForm.createNGroup"
                                    style="width: 60px"
                                    autocomplete="off"
                                />
                                groups now </el-radio
                            ><br />
                            <el-radio
                                v-show="limitGroups"
                                label=""
                                style="margin-left: 28%"
                            >
                                Limit groups to
                                <el-input
                                    v-model="createGroupForm.groupMemberNumber"
                                    style="width: 60px"
                                    autocomplete="off"
                                />
                                members(leave blank for no limit)
                            </el-radio>
                            <el-checkbox
                                v-show="requireGroupmembers"
                                label="Require group members to be in the same section"
                                name="type"
                                style="margin-left: 28%"
                            />
                            <!--</el-radio-group>-->
                        </el-form-item>
                        <el-form-item v-show="leaderShip" label="Leadership">
                            <el-radio-group
                                v-model="createGroupForm.leaderSetStrategy"
                            >
                                <el-radio label="1" style="">
                                    Automatically assign a student group leader </el-radio
                                ><br />
                                <el-radio label="2" style="">
                                    Set first student to join as group leader </el-radio
                                ><br />
                                <el-radio label="3" style="">
                                    Set a random student as group leader
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">
                            取 消
                        </el-button>
                        <el-button
                            type="primary"
                            @click="newGroupCategory('createGroupForm')"
                        >
                            确 定
                        </el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title="添加作业小组"
                    :visible.sync="dialogAssignmentCreate"
                >
                    姓名<el-input
                        v-model="assignmentName"
                        autocomplete="off"
                        style="width: 80%"
                    />
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAssignmentCreate = false">
                            取 消
                        </el-button>
                        <el-button type="primary" @click="assignmentCreate">
                            添加小组
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div v-show="discussionStepThree" class="discussionStepThree">
            <div>
                <el-row>
                    <el-col :span="15">
                        <div style="margin-top: -8px">
                            <el-form
                                ref="ruleformlist"
                                :model="ruleformlist"
                                style="display: inline-block"
                            >
                                <el-form-item
                                    label=""
                                    style="width: 35%;display: inline-block"
                                >
                                    <el-input
                                        v-model="ruleformlist.title"
                                        placeholder="Search"
                                        prefix-icon="el-icon-search"
                                        @input="shaixuan"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label=""
                                    style="display: inline-block;width: 35%;margin-left: 18px"
                                >
                                    <el-select
                                        v-model="ruleformlist.isRead"
                                        placeholder="All"
                                        @change="shaixuan1"
                                    >
                                        <el-option label="全部" value="2">
                                            全部
                                        </el-option>
                                        <el-option label="未读" value="0">
                                            未读
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div style="float: right;margin-right: 40%">
                            <el-button
                                icon="el-icon-circle-plus-outline"
                                type="primary"
                                style="display: inline-block;width: 63%"
                                @click="addDiscussion"
                            >
                                Discussion
                            </el-button>
                            <el-button
                                icon="el-icon-setting"
                                @click="centerDialogVisible = true"
                            />
                            <!--<el-button icon="el-icon-setting" @click="testly">1111</el-button>-->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="20">
                    <div class="distable">
                        <template>
                            <el-table
                                :cell-class-name="cell"
                                :data="tableData"
                                style="width: 100%;border: 1px solid #e7ebf7"
                                :show-header="false"
                                @row-click="showRowDetail"
                            >
                                <el-table-column
                                    align="center"
                                    label=""
                                    min-width="30"
                                >
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="scope.row.isRead">
                                            备选项
                                        </el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="30">
                                    <template slot-scope="scope">
                                        <i
                                            ><img
                                                src="../../../static/images/Discussions.png"
                                        /></i>
                                    </template>
                                </el-table-column>
                                <el-table-column label="姓名" min-width="180">
                                    <template slot-scope="scope">
                                        <el-popover
                                            trigger="hover"
                                            placement="top"
                                        >
                                            <p
                                                style="cursor: pointer;
                      overflow: hidden;text-overflow:ellipsis;white-space: nowrap "
                                            >
                                                {{ scope.row.title }}
                                            </p>
                                            <div
                                                slot="reference"
                                                style="cursor: pointer;
                      overflow: hidden;text-overflow:ellipsis;white-space: nowrap"
                                                class="name-wrapper"
                                                @click="gotoDetail(scope.row)"
                                            >
                                                {{ scope.row.title }}
                                            </div>
                                        </el-popover>
                                        <div
                                            v-if="
                                                scope.row.createTime !==
                                                    undefined
                                            "
                                        >
                                            <p style="" class="time">
                                                {{
                                                    scope.row.createTime
                                                        | formatDate(s)
                                                }}
                                            </p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="127">
                                    <template slot-scope="scope">
                                        <p>
                                            <a
                                                style="text-decoration: underline;color: #0e38b1;font-size: 13px"
                                                ><span>{{
                                                    scope.row.section
                                                }}</span></a
                                            >
                                        </p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="280">
                                    <template slot-scope="scope">
                                        <span class="time">
                                            <span
                                                v-if="
                                                    scope.row.warningVO !==
                                                        undefined
                                                "
                                            >
                                                <span
                                                    v-if="
                                                        scope.row.warningVO
                                                            .warningType == 1
                                                    "
                                                >
                                                    Not available until{{
                                                        scope.row.warningVO
                                                            .warningTime
                                                            | formatDate(s)
                                                    }}
                                                </span>
                                            </span>
                                            <span
                                                v-if="
                                                    scope.row.warningVO !==
                                                        undefined
                                                "
                                            >
                                                <span
                                                    v-if="
                                                        scope.row.warningVO
                                                            .warningType == 2
                                                    "
                                                >
                                                    Available until
                                                    {{
                                                        scope.row.warningVO
                                                            .warningTime
                                                            | formatDate(s)
                                                    }}
                                                </span>
                                            </span>
                                            <span
                                                v-if="
                                                    scope.row.warningVO !==
                                                        undefined
                                                "
                                            >
                                                <span
                                                    v-if="
                                                        scope.row.warningVO
                                                            .warningType == 3
                                                    "
                                                >
                                                    Was locked at{{
                                                        scope.row.warningVO
                                                            .warningTime
                                                            | formatDate(s)
                                                    }}
                                                </span>
                                            </span>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="120">
                                    <template slot-scope="scope">
                                        <div class="read-unread">
                                            <template
                                                v-for="(item,
                                                key,
                                                index) in scope.row
                                                    .readCountDTO"
                                                style="background: #0e38b1"
                                            >
                                                <!--<el-tooltip class="item" effect="dark" :content="item" placement="top">-->
                                                <span
                                                    v-if="
                                                        key ==
                                                            'replyNotReadTotal'
                                                    "
                                                    class="read"
                                                    >{{ item }}</span
                                                >
                                                <!--</el-tooltip>-->
                                            </template>
                                            <template
                                                v-for="(item,
                                                key,
                                                index) in scope.row
                                                    .readCountDTO"
                                                style="background: #0e38b1"
                                            >
                                                <span
                                                    v-if="key == 'replyTotal'"
                                                    class="unread"
                                                    >{{ item }}</span
                                                >
                                            </template>
                                            <!--</div>-->
                                        </div>

                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <i style="float: right"
                                                    ><img
                                                        src="../../../static/images/spread.png"
                                                /></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <div
                                                    @click="
                                                        discussionListComments(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            ><img
                                                                src="../../../static/images/unlock.png"
                                                        /></i>

                                                        Open for comments
                                                    </el-dropdown-item>
                                                </div>
                                                <el-dropdown-item>
                                                    <i style=""
                                                        ><img
                                                            src="../../../static/images/unlock.png"
                                                    /></i>

                                                    Close for comments
                                                </el-dropdown-item>
                                                <div
                                                    @click="
                                                        discussionListUpin(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i style=""
                                                            ><img
                                                                src="../../../static/images/ding.png"
                                                        /></i>

                                                        Unpin
                                                    </el-dropdown-item>
                                                </div>
                                                <div
                                                    @click="
                                                        discussionListCopy(
                                                            tableData,
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i style=""
                                                            ><img
                                                                src="../../../static/images/duplicate.png"
                                                        /></i>

                                                        Duplicate
                                                    </el-dropdown-item>
                                                </div>
                                                <el-dropdown-item>
                                                    <i style=""
                                                        ><img
                                                            src="../../../static/images/share.png"
                                                    /></i>

                                                    Share
                                                </el-dropdown-item>
                                                <div
                                                    @click="
                                                        discussionListDelete(
                                                            scope.$index,
                                                            tableData,
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-dropdown-item>
                                                        <i
                                                            ><img
                                                                src="../../../static/images/delete.png"
                                                        /></i>

                                                        Delete
                                                    </el-dropdown-item>
                                                </div>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="discussionStepFour" class="discussionStepFour">
            <el-row>
                <el-col :span="19" style="">
                    <div class="question">
                        <div style="border-bottom: 1px solid #ccc">
                            <div class="title">
                                <span>This is a graded discussion:</span>
                                <span
                                    ><span>{{ score }}</span> points
                                    possible</span
                                >
                                <span>due Dec 27</span>
                            </div>
                            <div class="description">
                                <el-row>
                                    <el-col :span="12">
                                        <div>
                                            <img
                                                src="../../../static/images/touxiang1.png"
                                            />
                                            <span class="name">{{
                                                nameDetail
                                            }}</span
                                            ><br />
                                            <span class="time">
                                                <span>{{
                                                    createTimeDetail
                                                        | formatDate(s)
                                                }}</span>
                                                <a>3 Sections</a>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="operation">
                                            <div
                                                v-if="replyTotal != ''"
                                                class="read-unread"
                                            >
                                                <div class="read">
                                                    {{ replyNotReadTotal }}
                                                </div>
                                                <div class="unread">
                                                    {{ replyTotal }}
                                                </div>
                                            </div>
                                            <el-button
                                                icon="el-icon-edit"
                                                class="edit"
                                                @click="discussionDetailEdit"
                                            >
                                                Edit
                                            </el-button>
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="float: right;margin-top: 4px"
                                                    >
                                                        <img
                                                            src="../../../static/images/spread-big.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <div @click="allRead">
                                                        <el-dropdown-item>
                                                            <i>
                                                                <el-radio />
                                                            </i>
                                                            Mark All as Read
                                                        </el-dropdown-item>
                                                    </div>
                                                    <div
                                                        @click="
                                                            discussionReplyDelete
                                                        "
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
                                                    </div>
                                                    <div
                                                        @click="
                                                            discussionReplyClose
                                                        "
                                                    >
                                                        <el-dropdown-item>
                                                            <i style=""
                                                                ><img
                                                                    src="../../../static/images/unlock.png"
                                                            /></i>

                                                            Close for comments
                                                        </el-dropdown-item>
                                                    </div>
                                                    <el-dropdown-item>
                                                        <i
                                                            ><img
                                                                src="../../../static/images/unlock.png"
                                                        /></i>

                                                        Open for comments
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <i style=""
                                                            ><img
                                                                src="../../../static/images/share.png"
                                                        /></i>

                                                        Share
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="detail">
                                <p>{{ titleDetail }}</p>
                                <span style="color: gray">
                                    {{ contentDetail }}
                                    <!--It's very important for us to learn English well. English is the most widely used language in the world.-->
                                    <!--It is also used as an international language. It's spoken by more than 400 million people as their first language.-->
                                    <!--Many countries use English as a foreign language. English is widely used for international business. Chinese-->
                                    <!--use English as a second language. China's reform and opening-up policy, China's entry into WTO and the-->
                                    <!--2008 Olympic Games encourage more and more Chinese to learn English. So we must try our best to learn-->
                                    <!--English well and make a contribution to building our country better.-->
                                </span>
                                <br />
                                <a
                                    ><img
                                        src="../../../static/images/doc.png"
                                    />1 Galaxies Packet.doc</a
                                >
                            </div>
                        </div>
                        <div
                            style="margin-top: 10px;border-bottom: 1px solid #ccc;margin-bottom: 15px"
                        >
                            <el-row style="margin-bottom: 10px">
                                <el-col :span="18">
                                    <div style="">
                                        <el-form
                                            ref="form"
                                            :model="form"
                                            style="display: inline-block"
                                        >
                                            <div class="inputSearch">
                                                <el-form-item
                                                    label=""
                                                    style="display: inline-block"
                                                >
                                                    <el-input
                                                        v-model="form.name"
                                                        placeholder="Search entries or author"
                                                        prefix-icon="el-icon-search"
                                                        @input="detailShanxuan"
                                                    />
                                                </el-form-item>
                                            </div>
                                            <el-form-item
                                                label=""
                                                style="display: inline-block;position: relative"
                                            >
                                                <el-button
                                                    @click="detailUnread"
                                                >
                                                    Unread
                                                </el-button>
                                                <el-button
                                                    size="medium"
                                                    style="position: absolute;top:0px;left:82px;"
                                                >
                                                    <i
                                                        ><img
                                                            src="../../../static/images/up.png"
                                                    /></i>
                                                </el-button>
                                                <el-button
                                                    size="medium"
                                                    style="position: absolute;top:0px;left:145px;"
                                                >
                                                    <img
                                                        src="../../../static/images/down.png"
                                                    />
                                                </el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="position: relative">
                            <img
                                src="../../../static/images/reply.png"
                                style="position: absolute;z-index: 222222;top: 10px;left: 2px;"
                            />
                            <el-input
                                placeholder="Reply"
                                prefix-icon="el-icon-search"
                                @focus="replyAdd"
                            />
                        </div>
                        <div v-show="edit">
                            <el-row style="margin-top: 10px">
                                <el-col :span="24">
                                    <div class="editor">
                                        <ckeditor
                                            v-model="contentReplyDetail"
                                            :editor="editor"
                                            :config="editorConfig"
                                        />
                                    </div>
                                </el-col>
                            </el-row>
                            <div>
                                <el-button
                                    size="small"
                                    @click="contentReplyDetailCancel"
                                >
                                    cancel
                                </el-button>
                                <el-button
                                    size="small"
                                    type="confirm"
                                    @click="contentReplyDetailConfirm"
                                >
                                    confirm
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="reply" style="">
                <div>
                    <el-collapse v-model="activeId">
                        <div v-for="item in collapsedetail" class="reply-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
                                :name="item.id"
                            >
                                <template slot="title">
                                    <div class="reply-title">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <img
                                                src="../../../static/images/touxiang1.png"
                                                style="float: left"
                                            />
                                            <span
                                                ><span class="name"
                                                    >{{
                                                        item.userNickname
                                                    }}:&nbsp;</span
                                                >&nbsp;&nbsp;
                                                <span style="color: gray">
                                                    {{ item.content }}</span
                                                ></span
                                            >
                                            <div class="time">
                                                <span>{{
                                                    item.createTime
                                                        | formatDate(s)
                                                }}</span>
                                            </div>
                                            <div class="caozuo" @click="test">
                                                <img
                                                    src="../../../static/images/liulan.png"
                                                    class="liulan"
                                                />
                                                <el-dropdown>
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="margin-left: 5px"
                                                        >
                                                            <img
                                                                src="../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <div
                                                            @click="
                                                                replyDetailChildrenDelete(
                                                                    item.id
                                                                )
                                                            "
                                                        >
                                                            <el-dropdown-item>
                                                                <i
                                                                    ><img
                                                                        src="../../../static/images/delete.png"
                                                                /></i>

                                                                Delete
                                                            </el-dropdown-item>
                                                        </div>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template slot="">
                                    <div
                                        v-for="items in item.replies"
                                        v-if="
                                            item.replies !== '' ||
                                                item.replies !== 'undefined' ||
                                                item.replies !== null
                                        "
                                        class="mainreply"
                                    >
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <div>
                                                <img
                                                    src="../../../static/images/touxiang1.png"
                                                    style="float: left"
                                                />
                                                <span>
                                                    <span class="name">{{
                                                        items.userNickname
                                                    }}</span
                                                    >&nbsp;&nbsp;
                                                    <span class="namereply"
                                                        >Reply</span
                                                    >&nbsp;&nbsp;
                                                    <span class="name"
                                                        >Renzhaohui</span
                                                    ><span
                                                        >：{{
                                                            items.content
                                                        }}</span
                                                    >
                                                </span>
                                            </div>
                                            <div class="time">
                                                <span />
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../static/images/liulan.png"
                                                    class="liulan"
                                                />
                                                <el-dropdown>
                                                    <span
                                                        class="el-dropdown-link"
                                                    >
                                                        <i
                                                            style="margin-left: 5px"
                                                        >
                                                            <img
                                                                src="../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <div
                                                            @click="
                                                                replyTwoDelete(
                                                                    items.id
                                                                )
                                                            "
                                                        >
                                                            <el-dropdown-item>
                                                                <i
                                                                    ><img
                                                                        src="../../../static/images/delete.png"
                                                                /></i>

                                                                Delete
                                                            </el-dropdown-item>
                                                        </div>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div
                                    style="padding-top: 2%;height: 15px;position: relative"
                                >
                                    <img
                                        src="../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder="Reply"
                                        prefix-icon="el-icon-search"
                                        @focus="replyAddChildren"
                                    />
                                </div>
                                <div v-show="editchildren">
                                    <el-row style="margin-top: 50px">
                                        <el-col :span="24">
                                            <div class="editor">
                                                <ckeditor
                                                    v-model="
                                                        contentReplyDetailChildren
                                                    "
                                                    :editor="editor"
                                                    :config="editorConfig"
                                                />
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div>
                                        <el-button
                                            size="small"
                                            @click="
                                                contentReplyDetailChildrenCancel
                                            "
                                        >
                                            cancel
                                        </el-button>
                                        <el-button
                                            size="small"
                                            type="confirm"
                                            @click="
                                                contentReplyDetailChildrenConfirm(
                                                    item.id
                                                )
                                            "
                                        >
                                            confirm
                                        </el-button>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </div>
                <!--</el-col>-->
            </div>
            <!--</el-row>-->
        </div>
        <div v-show="discussionStepFive" class="discussionStepFive">
            <el-row>
                <el-col :span="19" style="">
                    <div class="question">
                        <div style="">
                            <div class="title">
                                <span>This is a graded discussion:</span>
                                <span
                                    ><span>{{ groupScore }}</span> points
                                    possible</span
                                >
                                <span>{{ groupmaxDueTime }}</span>
                            </div>
                            <div class="repertory">
                                <span class="testtitle"
                                    >Sinse this is a group discussion,each group
                                    has its own conversation for this topic.Here
                                    are the ones you have access to；</span
                                >
                                <el-row>
                                    <el-col :span="22">
                                        <div
                                            v-for="item in groupItemName"
                                            class="circletest"
                                        >
                                            <div class="circle" />
                                            <a class="test"
                                                ><span>{{ item.name }}</span></a
                                            >
                                        </div>
                                    </el-col>
                                    <el-col :span="2">
                                        <div class="read-unread">
                                            <div class="read">
                                                {{ groupreplyNotReadTotal }}
                                            </div>
                                            <div class="unread">
                                                {{ groupreplyTotal }}
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="description">
                                <el-row>
                                    <el-col :span="16">
                                        <div>
                                            <img
                                                src="../../../static/images/touxiang1.png"
                                            />
                                            <span class="name">{{
                                                groupName
                                            }}</span
                                            ><br />
                                            <span class="time">
                                                <span>{{
                                                    groupCreateTime
                                                }}</span>
                                                <a>3 Sections</a>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="operation">
                                            <el-button
                                                type="success"
                                                icon="el-icon-circle-check"
                                            >
                                                {{ $t("message.Published") }}
                                            </el-button>
                                            <el-button
                                                icon="el-icon-edit"
                                                class="edit"
                                                @click="groupDiscussionEdit"
                                            >
                                                Edit
                                            </el-button>
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="position: absolute;bottom: -10px;"
                                                    >
                                                        <img
                                                            src="../../../static/images/spread-big.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <el-dropdown-item>
                                                        <i style=""
                                                            ><img
                                                                src="../../../static/images/share.png"
                                                        /></i>

                                                        Share
                                                    </el-dropdown-item>
                                                    <div
                                                        @click="
                                                            groupDiscussionDelete
                                                        "
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
                                                    </div>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="detail">
                                <p>{{ groupTitle }}</p>
                                <span style="color: gray">
                                    <!--It's very important for us to learn English well. English is the most widely used language in the world.-->
                                    <!--It is also used as an international language. It's spoken by more than 400 million people as their first language.-->
                                    <!--Many countries use English as a foreign language. English is widely used for international business. Chinese-->
                                    <!--use English as a second language. China's reform and opening-up policy, China's entry into WTO and the-->
                                    <!--2008 Olympic Games encourage more and more Chinese to learn English. So we must try our best to learn-->
                                    <!--English well and make a contribution to building our country better.-->
                                </span>
                                <a
                                    ><img
                                        src="../../../static/images/doc.png"
                                    />1 Galaxies Packet.doc</a
                                >
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-dialog
                title="Edit Discussion Settings"
                :visible.sync="centerDialogVisible"
                width="30%"
                center
            >
                <span>My Settings</span><br />
                <el-checkbox
                    v-model="allowMarkPostStatus"
                    label="Manually mark posts as read"
                    name="type"
                /><br />
                <span>Student Settings</span><br />
                <el-checkbox
                    v-model="allowStudentCreateDiscussion"
                    label="Create discussion topic"
                    name="type"
                />
                <el-checkbox
                    v-model="allowStudentEditDiscussion"
                    label="Edit and delete their own posts"
                    name="type"
                    style="margin-left: 1px"
                />
                <el-checkbox
                    v-model="allowDiscussionAttachFile"
                    label="Attach files to discussions"
                    name="type"
                    style="margin-left: 1px"
                />
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false"
                        >Cancel</el-button
                    >
                    <el-button type="primary" @click="discussionSettings"
                        >Save Settings</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>
<script>
/*eslint-disable*/
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "@/utils/date";

export default {
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    data() {
        return {
            options3: [
                {
                    label: "热门城市",
                    options: [
                        {
                            value: "Shanghai",
                            label: "上海"
                        },
                        {
                            value: "Beijing",
                            label: "北京"
                        }
                    ]
                },
                {
                    label: "城市名",
                    options: [
                        {
                            value: "Chengdu",
                            label: "成都"
                        },
                        {
                            value: "Shenzhen",
                            label: "深圳"
                        },
                        {
                            value: "Guangzhou",
                            label: "广州"
                        },
                        {
                            value: "Dalian",
                            label: "大连"
                        }
                    ]
                }
            ],
            selectedAssign: [],
            value7: "",
            settingId: "",
            assignmentName: "",
            activeId: "",
            s: "",
            upload: `${process.env.NODE_ENV}/upload`,
            file: [],
            assign: [
                {
                    assignId: "",
                    assignType: "",
                    limitTime: "",
                    startTime: "",
                    endTime: ""
                }
            ],
            postSections: [],
            editor: ClassicEditor,
            editorConfig: {},
            splitStudents: true,
            createGroupsManually: true,
            createGroupsNow: false,
            limitGroups: false,
            pointsPossible: false,
            displayGradeas: false,
            assignmentGroup: false,
            leaderShip: false,
            requireGroupmembers: false,
            assignTo: false,
            availableFrom: true,
            until: true,
            postTo: true,
            multipleSelection: [],
            radio: "",
            selected: {},
            value5: [],
            value1time: "",
            section: {},
            postToSection: [],
            classGroup: {},
            assignmentGroup: {},
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value: [],
            form: {
                name: "",
                region: ""
            },
            dialogFormVisible: false,
            dialogAssignmentCreate: false,
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
            discussionStepOne: false,
            discussionStepTwo: false,
            discussionStepThree: false,
            discussionStepFour: false,
            discussionStepFive: false,
            centerDialogVisible: false,
            //* ******新建讨论表单采集start*********
            title: "",
            content: "",
            gradeType1: "",
            ruleform: {
                type: "",
                assignId: "",
                fileId: "",
                isGrade: "",
                studyGroupSetId: "",
                gradeType: "",
                score: "",
                displayGradeas: "",
                assignmentGroupId: "",
                startTime: "",
                endTime: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                region1: ""
            },
            createGroupForm: {
                name: "",
                allowSelfSignup: "",
                isSectionGroup: "",
                createNGroup: "",
                groupMemberNumber: "",
                leaderSetStrategy: ""
            },
            leaderSetStrategy: 1,
            //* ******新建讨论表单采集end*********
            //* ******讨论列表start*********
            isRead: "",
            id: "",
            pageIndex: 1,
            pageSize: 10,
            totalCount: 20,
            //* ******讨论列表end*********
            //* ******讨论设置start********
            allowMarkPostStatus: "",
            allowStudentCreateDiscussion: "",
            allowStudentEditDiscussion: "",
            allowDiscussionAttachFile: "",
            //* ******讨论设置end********
            //* ******筛选参数处理start******
            ruleformlist: {
                title: "",
                isRead: ""
            },
            //* ******筛选参数处理end******
            //* ******列表详情start******
            contentReplyDetail: "",
            contentReplyDetailChildren: "",
            edit: false,
            editchildren: false,
            replyId: "",
            ids: "",
            index: "",
            rows: "",
            score: "",
            titleDetail: "",
            contentDetail: "",
            createTimeDetail: "",
            nameDetail: "",
            collapsedetail: "",
            replyTotal: "",
            replyNotReadTotal: "",
            //* ******列表详情end******
            //* ******小组列表详情start********
            groupScore: "",
            groupmaxDueTime: "",
            groupreplyTotal: "",
            groupreplyNotReadTotal: "",
            groupCreateTime: "",
            groupName: "",
            groupTitle: "",
            groupContent: "",
            groupItemName: "",
            //* ******小组列表详情end********
            activeName: "first",
            tableData: [],
            titlemain: ""
        };
    },
    mounted() {
        // this.initData();
        this.sections();
        this.discussionList();
        this.classGroups();
        this.contentReplyList();
        this.assignmentGroups();
    },
    methods: {
        selectAssignChange(ass) {
            console.log(ass);
            this.selectedAssign.push(ass);
            console.log(this.selectedAssign);
        },
        test(event) {
            event.stopPropagation();
            console.log("阻止事件冒泡在");
        },
        testly() {
            this.centerDialogVisible = true;
            console.log("hahahaha");
        },

        // 分页
        // pageChange(){
        //   let that = this;
        //   that.$http.get(`${process.env.NODE_ENV}/discussion/pageList`,{params:{'courseId':1,
        //       'isRead':this.isRead || 2,'pageIndex':1,'pageSize':10}}).then((res)=>{
        //         console.log(res);
        //     // that.section = res.data.entity;
        //   })
        // },
        uploadSuccess(response, file, fileList) {
            response.entity.map((item, index) => {
                this.ruleform.fileId = item.fileId;
            });
            // this.ruleform.fileId = item.id;
            this.$message({
                showClose: true,
                message: "上传成功",
                type: "success"
            });
        },
        allSelfSignUp() {
            this.createGroupsNow = !this.createGroupsNow;
            this.limitGroups = !this.limitGroups;
            this.leaderShip = !this.leaderShip;
            this.splitStudents = !this.splitStudents;
            this.createGroupsManually = !this.createGroupsManually;
        },
        splitStudent() {
            this.requireGroupmembers = !this.requireGroupmembers;
            this.leaderShip = !this.leaderShip;
        },
        // 讨论配置修改
        discussionSettings() {
            const that = this;
            that.centerDialogVisible = false;
            that.$http
                .post(`${process.env.NODE_ENV}/userConfig/modify`, {
                    allowMarkPostStatus: Number(this.allowMarkPostStatus)
                })
                .then(res => {
                    console.log(res);
                });
            that.$http
                .post(`${process.env.NODE_ENV}/discussionConfig/modify`, {
                    id: this.settingId,
                    courseId: 1,
                    allowStudentCreateDiscussion: Number(
                        this.allowStudentCreateDiscussion
                    ),
                    allowStudentEditDiscussion: Number(
                        this.allowStudentEditDiscussion
                    ),
                    allowDiscussionAttachFile: Number(
                        this.allowDiscussionAttachFile
                    )
                })
                .then(res => {
                    console.log(res);
                    console.log(Number(this.allowStudentCreateDiscussion));
                });
        },
        openCenterDialogVisible() {
            const that = this;
            that.centerDialogVisible = true;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionConfig/get`, {
                    params: { data: 1 }
                })
                .then(res => {
                    console.log(res.data.entity.id);
                    this.settingId = res.data.entity.id;
                });
            that.$http
                .get(`${process.env.NODE_ENV}/userConfig/get`, {
                    params: { data: 1 }
                })
                .then(res => {
                    console.log(res);
                });
        },

        // 初始化分配列表
        // initData(){
        //   this.assign = [];
        //   console.log(this.ruleform.fileId)
        // },
        // 讨论列表评论
        discussionListComments(scope) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: scope.id,
                    courseId: 1,
                    allowComment: 1
                })
                .then(res => {
                    console.log(res);
                });
        },
        // 讨论列表置顶
        discussionListUpin(row) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    id: row.id,
                    courseId: 1,
                    isPin: 1
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                });
        },
        // 讨论列表复制
        discussionListCopy(tableData, scope) {
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/copy/edit`, {
                    id: scope.id
                })
                .then(res => {
                    console.log(res);
                    this.discussionList();
                    tableData.push({ title: this.title });
                });
        },
        // 讨论列表删除
        discussionListDelete(index, rows, scope) {
            console.log("*****");
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [scope.id])
                .then(res => {
                    rows.splice(index, 1);
                    console.log(res);
                });
        },
        // 初始化班级列表
        sections() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/assign/get`, {
                    params: { data: 1 }
                })
                .then(res => {
                    // that.section = res.data.entity;
                    console.log(res.data.entity);
                    const tmp = [];
                    tmp.push({
                        label: "All",
                        options: [
                            {
                                type: 1,
                                id: 0,
                                name: "ALL"
                            }
                        ]
                    });
                    tmp.push({
                        label: "班级",
                        options: res.data.entity.sections
                    });
                    tmp.push({
                        label: "学生",
                        options: res.data.entity.users
                    });
                    that.section = tmp;
                    console.log("aaa", that.section);

                    this.postToSection.push({
                        id: 0,
                        type: 1,
                        name: "ALL"
                    });
                    for (let i = 0; i < res.data.entity.sections.length; i++) {
                        this.postToSection.push(res.data.entity.sections[i]);
                    }
                });
        },
        // 初始作业小组列表
        assignmentGroups() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                    params: { courseId: 1 }
                })
                .then(res => {
                    that.assignmentGroup = res.data.entity;
                });
        },
        // 添加作业小组
        assignmentCreate() {
            this.dialogAssignmentCreate = false;
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/assignmentGroup/add`, {
                    courseId: 1,
                    name: this.assignmentName
                })
                .then(res => {
                    that.$http
                        .get(`${process.env.NODE_ENV}/assignmentGroup/list`, {
                            params: { courseId: 1 }
                        })
                        .then(res => {
                            that.assignmentGroup = res.data.entity;
                        });
                });
        },
        // 初始化小组集列表
        classGroups() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/studyGroupSet/list`, {
                    params: { courseId: 1 }
                })
                .then(res => {
                    that.classGroup = res.data.entity;
                });
        },

        // 创建小组集列表
        newGroupCategory(formName) {
            const that = this;
            that.dialogFormVisible = false;
            const params = {
                courseId: 1,
                name: this.createGroupForm.name,
                allowSelfSignup: Number(this.createGroupForm.allowSelfSignup),
                isSectionGroup: Number(this.createGroupForm.isSectionGroup),
                createNGroup: this.createGroupForm.createNGroup,
                groupMemberNumber: this.createGroupForm.groupMemberNumber,
                leaderSetStrategy: this.createGroupForm.leaderSetStrategy
            };
            that.$http
                .post(`${process.env.NODE_ENV}/studyGroupSet/add`, params)
                .then(res => {
                    that.classGroup = res.data.entity;
                    this.createGroupForm.name = "";
                    this.createGroupForm.allowSelfSignup = "";
                    this.createGroupForm.isSectionGroup = "";
                    this.createGroupForm.createNGroup = "";
                    this.createGroupForm.groupMemberNumber = "";
                    this.createGroupForm.leaderSetStrategy = "";
                });
        },
        // 控制分配的显示与隐藏
        disoption() {
            this.pointsPossible = !this.pointsPossible;
            this.displayGradeas = !this.displayGradeas;
            this.assignmentGroup = !this.assignmentGroup;
            this.assignTo = !this.assignTo;
            this.availableFrom = !this.availableFrom;
            this.until = !this.until;
            this.postTo = !this.postTo;
        },
        // 删除分配列表
        editRemoveDomain(item) {
            const index = this.assign.indexOf(item);
            if (index !== -1) {
                this.assign.splice(index, 1);
            }
        },
        // 增加分配列表
        editAddDomain() {
            console.log("=================================");
            this.assign.push({
                value: "",
                key: Date.now()
            });
        },
        // 置顶图标的转换
        cell({ row, column, rowIndex, columnIndex }) {
            // 第四列添加image类
            if (row.isPin == "1" && columnIndex === 3) {
                return "my-image";
            }
            if (row.status == "1" && columnIndex === 5) {
                // console.log('=============================================')
                return "published";
            }
            if (row.status == "0" && columnIndex === 5) {
                // console.log('=============================================')
                return "unpublished";
            }
        },
        // 参数的处理
        // initData(){
        //   let _ruleFormList = this.ruleFormList;
        //   let params = {};
        //   for (var i in _ruleFormList) {
        //     if(_ruleFormList[i] !== 'undefined' && _ruleFormList[i] !== ''
        //       && _ruleFormList[i] !== null){
        //       params[i] = _ruleFormList[i]
        //     }
        //   }
        // },
        shaixuan() {
            this.discussionList();
        },
        shaixuan1() {
            this.discussionList();
        },
        detailShanxuan() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: { discussionId: that.ids, isRead: 2 }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
        },
        detailUnread() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: { discussionId: that.ids, isRead: 0 }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
        },
        // 初始化加载讨论列表
        discussionList() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussion/list`, {
                    params: {
                        courseId: 1,
                        isRead: this.ruleformlist.isRead || 2,
                        title: this.ruleformlist.title
                    }
                })
                .then(res => {
                    // console.log('entir', res.data.entity)
                    const arr = res.data.entity;
                    arr.map((item, index) => {
                        item.isRead = Boolean(item.isRead);
                        this.id = item.id;
                        this.titlemain = item.title;
                    });
                    that.tableData = arr;
                    if (this.titlemain) {
                        this.discussionStepOne = false;
                        this.discussionStepThree = true;
                        console.log("aaaa", this.titlemain);
                    } else {
                        console.log("bbbbb", this.titlemain);
                        // this.discussionStepOne = true;
                        this.discussionStepOne = true;
                        // this.discussionStepThree = false;
                    }
                });
        },
        allcourseId() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/course/joined/query`)
                .then(res => {
                    console.log(res);
                });
        },
        addDiscussion() {
            this.discussionStepOne = false;
            this.discussionStepTwo = true;
            this.discussionStepThree = false;
            console.log(111111111);
            this.$http
                .post(`${process.env.NODE_ENV}/userConfig/modify`, {})
                .then(res => {
                    console.log(res);
                });
        },
        // 创建讨论
        discussionPublish() {
            const that = this;
            console.log(this.assign);
            const params = {
                courseId: 1,
                title: this.title,
                content: this.content,
                type: 1,
                studyGroupSetId: this.ruleform.studyGroupSetId,
                fileId: this.ruleform.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: this.ruleform.score,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 1,
                assign: this.assign

                // [
                //
                // ]
            };
            // var assign = [];
            // if(assignType == 1){
            //
            // }

            that.$http
                .post(`${process.env.NODE_ENV}/discussion/add`, params)
                .then(res => {
                    console.log(res);
                    this.discussionList();
                    this.discussionStepThree = true;
                    this.discussionStepTwo = false;
                });
        },
        onSubmit() {
            console.log(this.$route.query.courseId);
            console.log(this.assign);
            console.log(this.selectedAssign);

            const disAssigns = [];
            if (this.ruleform.isGrade) {
                for (let i = 0; i < this.assign.length; i++) {
                    const ass = this.assign[i];
                    const arr = ass.assignId.split("_");
                    disAssigns.push({
                        assignType: arr[0],
                        assignId: arr[1],
                        startTime: ass.startTime,
                        endTime: ass.endTime,
                        limitTime: ass.limitTime
                    });
                }
            } else {
                for (let i = 0; i < this.postSections.length; i++) {
                    disAssigns.push({
                        assignType: this.postSections[i] == 0 ? 1 : 2,
                        assignId: this.postSections[i],
                        startTime: this.ruleform.startTime,
                        endTime: this.ruleform.endTime
                    });
                }
            }

            const that = this;
            const params = {
                courseId: 1,
                title: this.title,
                content: this.content,
                type: 1,
                studyGroupSetId: this.ruleform.studyGroupSetId,
                fileId: this.ruleform.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: this.ruleform.score,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                status: 0,
                assign: disAssigns
            };

            console.log("submit time", params);

            that.$http
                .post(`${process.env.NODE_ENV}/discussion/add`, params)
                .then(res => {
                    console.log(res);
                    this.discussionList();
                    this.discussionStepThree = true;
                    this.discussionStepTwo = false;
                });
            console.log("submit!");
            this.discussionStepTwo = false;
            this.discussionStepThree = true;
        },
        editorcancel() {
            this.discussionStepOne = true;
            this.discussionStepTwo = false;
        },
        onSubmitlist() {
            console.log("submit!");
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        showRowDetail(row, event, column) {
            this.radio = this.tableData.indexOf(row);
            this.selected = row;
        },
        gotoDetail(scope) {
            this.ids = scope.id;
            console.log(this.ids);
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussion/get`, {
                    params: { data: scope.id }
                })
                .then(res => {
                    if (
                        scope.studyGroupSetId == "undefined" ||
                        scope.studyGroupSetId == "" ||
                        scope.studyGroupSetId == null
                    ) {
                        that.discussionStepFour = true;
                        console.log("================================");
                        console.log("=====================================");
                        this.score = res.data.entity.score;
                        this.titleDetail = res.data.entity.title;
                        this.contentDetail = res.data.entity.content;
                        this.createTimeDetail = res.data.entity.createTime;
                        this.limitTimeDetail = res.data.entity.limitTime;
                        this.nameDetail = res.data.entity.author.nickname;
                        this.idChildren = res.data.entity.id;
                        // this.replyTotal = res.data.entity.readCountDTO.replyTotal;
                        // this.replyNotReadTotal =  res.data.entity.readCountDTO.replyNotReadTotal;
                        console.log(
                            "lolo",
                            res.data.entity.readCountDTO != "undefined"
                        );
                        if (res.data.entity.readCountDTO) {
                            this.replyTotal =
                                res.data.entity.readCountDTO.replyTotal;
                            this.replyNotReadTotal =
                                res.data.entity.readCountDTO.replyNotReadTotal;
                        } else {
                            this.replyTotal = "";
                        }
                        console.log(res.data.entity);
                    } else {
                        that.discussionStepFive = true;
                        console.log("=====================================");
                        this.groupScore = res.data.entity.score;
                        this.groupmaxDueTime = res.data.entity.maxDueTime;
                        this.groupreplyTotal =
                            res.data.entity.readCountDTO.replyTotal;
                        this.groupreplyNotReadTotal =
                            res.data.entity.readCountDTO.replyNotReadTotal;
                        this.groupName = res.data.entity.author.nickname;
                        this.groupCreateTime = res.data.entity.createTime;
                        this.groupTitle = res.data.entity.title;
                        this.groupContent = res.data.entity.content;
                        this.groupItemName = res.data.entity.studyGroupList;
                    }
                });
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: { discussionId: that.ids, isRead: 2 }
                })
                .then(res => {
                    this.collapsedetail = res.data.entity;
                });
            this.discussionStepThree = false;
        },

        // 讨论回复全部标记为已读未读
        allRead() {
            console.log(this.ids);
            this.$http
                .post(`${process.env.NODE_ENV}/contentViewRecord/add`, {
                    originId: this.ids,
                    originType: 2
                })
                .then(res => {
                    console.log(res);
                });
        },
        // 讨论详情删除
        discussionReplyDelete() {
            console.log(this.ids);
            this.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [this.ids])
                .then(res => {
                    this.discussionList();
                    this.discussionStepFour = false;
                    this.discussionStepThree = true;
                });
        },
        // 讨论详情评论关闭
        discussionReplyClose() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/statusToggle/edit`, {
                    courseId: 1,
                    id: this.ids,
                    allowComment: 0
                })
                .then(res => {
                    console.log(res);
                });
        },
        // 添加讨论回复
        replyAdd() {
            this.edit = true;
        },
        replyAddChildren() {
            this.editchildren = true;
        },
        // 讨论详情回复取消
        contentReplyDetailCancel() {
            this.edit = false;
        },
        // 讨论详情子集回复取消
        contentReplyDetailChildrenCancel() {
            this.editchildren = false;
        },
        // 讨论详情子集回复确认
        contentReplyDetailChildrenConfirm(id) {
            console.log(id);
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/add`, {
                    discussionId: this.ids,
                    content: this.contentReplyDetailChildren,
                    discussionReplyId: id
                })
                .then(res => {
                    console.log(res);
                    that.$http
                        .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                            params: { discussionId: that.ids, isRead: 2 }
                        })
                        .then(res => {
                            this.collapsedetail = res.data.entity;
                        });
                });
        },
        // 讨论详情子集删除
        replyDetailChildrenDelete(b) {
            console.log(b);
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/deletes`, [b])
                .then(res => {
                    console.log(res);
                    that.$http
                        .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                            params: { discussionId: that.ids, isRead: 2 }
                        })
                        .then(res => {
                            that.collapsedetail = res.data.entity;
                        });
                });
        },
        // 讨论二级删除
        replyTwoDelete(id) {
            const that = this;
            console.log(id);
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/deletes`, [id])
                .then(res => {
                    console.log(res);
                    that.$http
                        .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                            params: { discussionId: that.ids, isRead: 2 }
                        })
                        .then(res => {
                            that.collapsedetail = res.data.entity;
                        });
                });
        },

        // 讨论详情回复确认
        contentReplyDetailConfirm() {
            // this.edit = true;
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussionReply/add`, {
                    discussionId: this.ids,
                    content: this.contentReplyDetail
                })
                .then(res => {
                    that.$http
                        .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                            params: { discussionId: that.ids, isRead: 2 }
                        })
                        .then(res => {
                            this.collapsedetail = res.data.entity;
                        });
                });
        },
        // 讨论回复列表初始化
        contentReplyList() {
            const that = this;
            that.$http
                .get(`${process.env.NODE_ENV}/discussionReply/list`, {
                    params: { discussionId: that.ids, isRead: 2 }
                })
                .then(res => {
                    console.log(res);
                    console.log(
                        "==============================================="
                    );
                });
        },
        // 小组讨论删除
        groupDiscussionDelete() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/deletes`, [this.ids])
                .then(res => {
                    this.discussionList();
                    this.discussionStepFive = false;
                    this.discussionStepThree = true;
                });
        },
        // 小组讨论编辑
        groupDiscussionEdit() {
            const that = this;
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/modify`, {
                    id: this.ids,
                    courseId: 1,
                    title: "",
                    type: 2,
                    assign: [{ assignType: 1 }]
                })
                .then(res => {
                    this.discussionStepTwo = true;
                    this.discussionStepFive = false;
                });
        },
        // 讨论详情编辑
        discussionDetailEdit() {
            const that = this;
            const params = {
                id: this.ids,
                courseId: 1,
                title: this.title,
                content: this.content,
                type: 1,
                studyGroupSetId: this.ruleform.studyGroupSetId,
                fileId: this.ruleform.fileId,
                isGrade: Number(this.ruleform.isGrade),
                score: this.ruleform.score,
                gradeType: this.ruleform.gradeType,
                assignmentGroupId: this.ruleform.assignmentGroupId,
                // "gradeSchemeId":1,
                // "isPin":1,
                status: 0,
                // "isRead":1,
                // "allowComment":1,
                // "attachmentFileId":1,
                assign: [
                    {
                        startTime: this.ruleform.startTime,
                        endTime: this.ruleform.endTime,
                        assignType: 1
                    }
                ]
            };
            that.$http
                .post(`${process.env.NODE_ENV}/discussion/modify`, params)
                .then(res => {
                    console.log(res);
                    this.discussionStepTwo = true;
                    this.discussionStepFour = false;
                    that.$http
                        .get(`${process.env.NODE_ENV}/discussion/get`, {
                            params: { data: this.ids }
                        })
                        .then(res => {});
                });
        }
    },
    // 讨论编辑
    detailEdit() {
        console.log(
            "========================================================="
        );
        this.discussionStepTwo = true;
        this.discussionStepFour = false;
    }
};
/*eslint-disable no-new*/
</script>
<style scoped lang="less">
.studentDiscussions /deep/ .el-collapse-item__wrap {
    border: none;
}

.studentDiscussions /deep/ .el-collapse-item__header {
    border: none;
    line-height: 20px;
}

.studentDiscussions /deep/ .el-collapse {
    border: none;
}

/*.studentDiscussions /deep/ .el-icon-search:before {*/
/*content: "";*/
/*}*/
.studentDiscussions {
    .discussionStepOne {
        .disMain {
            margin-top: 25px;
            height: 650px;
            border: 1px solid #e7ebf7;

            .disMainImg {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .disMainImg img {
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .disMainImg p {
                font-size: 18px;
                color: gray;
                position: absolute;
                top: 57%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .disMainImg a {
                text-decoration: underline;
                color: #0e38b1;
                font-size: 18px;
                cursor: pointer;
                position: absolute;
                top: 62%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .discussionStepTwo {
        /*/deep/ .el-icon-error:before:nth-of-type(0) {*/
        /*content: "";*/
        /*}*/
        /deep/ .ck-editor__main {
            height: 210px;
        }
        /deep/ .ck-content {
            height: 210px;
        }
        /deep/.el-upload-list {
            /*display: none;*/
        }
        /*/deep/ .el-icon-error{*/
        /*content: '';*/
        /*}*/
        .editor {
            margin-top: 20px;
            height: 250px;
        }

        .discussionRightBar {
            height: 400px;
            .link {
                color: #cccccc;
                font-size: 11px;
            }
        }

        .left-quize {
            border: 1px solid #ccc;
            margin-bottom: 4%;
            border-radius: 4px;
            padding: 1px 4%;
        }
        .multiple-attempts {
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 57%;
            padding: 2%;
            margin-left: 19%;
            margin-bottom: 2%;
            word-break: break-all;
            word-wrap: break-word;
        }
        .multiple-assign {
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 69%;
            word-break: break-all;
            word-wrap: break-word;
            margin-left: 9%;
        }
        .addto {
            padding: 2%;
            margin-bottom: 2%;
        }
        .multiple-attempts .attempts-keep {
            padding: 2%;
        }
        .assign-style {
            padding: 2%;
            margin-bottom: 2%;
        }

        .assign-add {
            padding-left: 74%;
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
        .assign-addto {
            border-top: 1px dashed #ccc;
        }

        .quizzesTest p {
            margin: 2% 0 3% 0;
        }

        .messagetext {
            height: 200px;
            border-radius: 6px;
            border: 1px solid rgb(204, 204, 204);
            margin-top: 2%;
            margin-bottom: 2%;
        }

        .quizzesTest {
            width: 100%;
        }
    }

    .discussionStepThree {
        /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: white;
        }
        /deep/ .el-table .my-image {
            background: url("../../../static/images/ding.png") no-repeat;
            background-size: 19px 19px;
            background-position: 50% 50%;
        }
        /deep/ .el-table .published {
            background: url("../../../static/images/published.png") no-repeat;
            background-size: 19px 19px;
            background-position: 60% 50%;
        }
        /deep/ .el-table .unpublished {
            background: url("../../../static/images/unpublished.png") no-repeat;
            background-size: 19px 19px;
            background-position: 60% 50%;
        }
        /deep/ .el-dropdown {
            float: right;
        }
        .read-unread {
            display: inline-block;
            float: left;
            margin-right: 35px;
        }
        .read {
            display: inline-block;
            background: #0e38b1;
            border: 2px solid #0e38b1;
            border-radius: 15px 1px 1px 15px;
            /*height: 20px;*/
            color: white;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 10px;
            height: 22px;
            float: left;
        }
        .unread {
            display: inline-block;
            background: #e6ebf7;
            border: 2px solid #0e38b1;
            border-radius: 1px 15px 15px 1px;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 11px;
            height: 22px;
        }
        position: relative;

        .rightBar {
            position: absolute;
            top: 0;
            right: 0;
        }

        .time {
            color: #cccccc;
            font-size: 13px;
        }

        .distable {
            padding: 1%;
            border: 1px solid #e7ebf7;
            margin-top: 20px;
            width: 100%;
        }

        .el-table__body {
            width: 100%;
        }
    }
    .discussionStepFour {
        /deep/ .el-icon-search:before {
            content: "";
        }
        .inputSearch {
            display: inline-block;
            /deep/ .el-icon-search:before {
                content: "\E619";
            }
        }
        .read-unread {
            display: inline-block;
            /*float: right;*/
            margin-right: 115px;
        }
        .read {
            display: inline-block;
            background: #0e38b1;
            border: 2px solid #0e38b1;
            border-radius: 15px 1px 1px 15px;
            /*height: 20px;*/
            color: white;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 10px;
        }
        .unread {
            display: inline-block;
            background: #e6ebf7;
            border: 2px solid #0e38b1;
            border-radius: 1px 15px 15px 1px;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 11px;
        }
        .el-collapse-item__wrap {
            border: none;
        }

        .question {
            width: 100%;
            border: 1px solid #ccc;
            padding: 2%;
        }

        .title {
            border: 1px solid #0e38b1;
            border-radius: 3px;
            background: #e6ebf7;
            padding: 1%;
        }

        .title span:nth-of-type(1) {
            color: #0e38b1;
        }

        .title span:nth-of-type(3) {
            float: right;
        }

        .description {
            margin-top: 20px;
            .name {
                margin-left: 10px;
                font-weight: bolder;
                font-size: 17px;
            }

            .time {
                margin-left: 10px;
                font-size: 13px;
                color: gray;

                a {
                    text-decoration: underline;
                    color: #0e38b1;
                }
            }
        }

        .description div:nth-of-type(1) img {
            float: left;
        }

        .operation {
            float: right;
            position: relative;

            .liulan {
                margin-right: 115px;
                margin-top: 7px;
            }

            .edit {
                position: absolute;
                right: 45px;
            }
        }

        .detail {
            margin-left: 50px;
            margin-top: 8px;
            margin-bottom: 10px;

            p {
                font-weight: bolder;
                font-size: 19px;
            }

            span {
                display: inline-block;
                margin-top: 13px;
            }

            a {
                font-weight: bolder;
                margin-top: 5px;
                display: inline-block;
                cursor: pointer;

                img {
                    float: left;
                }
            }
        }
        .reply-title {
            width: 100%;
        }

        .reply-item {
            border: 1px solid #ccc;
            margin-bottom: 2%;
            border-radius: 1px;
            padding: 4% 5px;

            .name {
                font-weight: bolder;
                font-size: 16px;
            }

            .time {
                position: absolute;
                top: 130%;
                left: 7%;
                color: gray;
            }

            .caozuo {
                position: absolute;
                left: 91%;
                top: 110%;
                z-index: 33333333333333333333;
                /*margin-left: 600px;*/
            }

            .namereply {
                color: gray;
                font-size: 14px;
            }

            .mainreply {
                margin-top: 5%;
                padding: 5% 3.4% 5% 5%;
                border-bottom: 1px solid #ccc;
                border-top: 1px solid #ccc;

                .time {
                    position: absolute;
                    top: 130%;
                    left: 5%;
                    color: gray;
                }

                .caozuo {
                    position: absolute;
                    left: 91%;
                    top: 110%;
                }
            }
        }

        .reply {
            width: 77%;
            margin-top: 20px;
            margin-left: 5.5%;
        }
    }
    .discussionStepFive {
        .el-collapse-item__wrap {
            border: none;
        }

        .question {
            width: 100%;
            border: 1px solid #ccc;
            padding: 2%;
        }

        .title {
            border: 1px solid #0e38b1;
            border-radius: 3px;
            background: #e6ebf7;
            padding: 1%;
        }
        .repertory {
            border: 1px solid #0e38b1;
            border-radius: 3px;
            background: #e6ebf7;
            padding: 1%;
            margin-top: 2%;
            .testtitle {
                color: #0e38b1;
            }
            .circletest {
                margin-top: 10px;
            }
            .circle {
                width: 6px;
                height: 6px;
                background: #0e38b1;
                border-radius: 6px;
                display: inline-block;
            }
            .test {
                text-decoration: underline;
                color: #0e38b1;
                margin-left: 15px;
            }
            .read {
                display: inline-block;
                background: #0e38b1;
                border: 2px solid #0e38b1;
                border-radius: 15px 1px 1px 15px;
                /*height: 20px;*/
                color: white;
                padding-left: 5px;
                padding-right: 5px;
                font-size: 10px;
            }
            .unread {
                display: inline-block;
                background: #e6ebf7;
                border: 2px solid #0e38b1;
                border-radius: 1px 15px 15px 1px;
                padding-left: 5px;
                padding-right: 5px;
                font-size: 11px;
            }
        }

        .title span:nth-of-type(1) {
            color: #0e38b1;
        }

        .title span:nth-of-type(3) {
            float: right;
        }

        .description {
            margin-top: 20px;
            overflow: hidden;

            .name {
                margin-left: 10px;
                font-weight: bolder;
                font-size: 17px;
            }

            .time {
                margin-left: 10px;
                font-size: 13px;
                color: gray;

                a {
                    text-decoration: underline;
                    color: #0e38b1;
                }
            }
        }

        .description div:nth-of-type(1) img {
            float: left;
        }

        .operation {
            overflow: hidden;
            /*float: right;*/
            position: relative;

            .liulan {
                /*margin-right: 115px;*/
                /*margin-top: 7px;*/
            }

            .edit {
                /*position: absolute;*/
                /*right: 45px;*/
            }
            .read-unread {
                display: inline-block;
            }
            .read {
                display: inline-block;
                background: #0e38b1;
                border: 2px solid #0e38b1;
                border-radius: 15px 1px 1px 15px;
                color: white;
                padding-left: 5px;
                padding-right: 5px;
                font-size: 10px;
            }
            .unread {
                display: inline-block;
                background: #e6ebf7;
                border: 2px solid #0e38b1;
                border-radius: 1px 15px 15px 1px;
                padding-left: 5px;
                padding-right: 5px;
                font-size: 11px;
            }
        }
    }
    .detail {
        margin-left: 50px;
        margin-top: 8px;
        margin-bottom: 10px;

        p {
            font-weight: bolder;
            font-size: 19px;
        }

        span {
            display: inline-block;
            margin-top: 13px;
        }

        a {
            font-weight: bolder;
            margin-top: 5px;
            display: inline-block;
            cursor: pointer;

            img {
                float: left;
            }
        }
    }
}
</style>
