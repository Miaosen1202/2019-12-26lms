<template>
    <!--eslint-disable-->
    <div class="studentDiscussions">
        <!--studentDiscussions(讨论)-->
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
                                />
                            </el-form-item>
                            <el-form-item
                                label=""
                                style="display: inline-block;width: 35%;margin-left: 18px"
                            >
                                <el-select
                                    v-model="form.region"
                                    placeholder="All"
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
                            @click="centerDialogVisible = true"
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
                                    src="../../../../static/images/studiscussion.png"
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
                <!--<el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>-->
            </el-row>
            <div>
                <el-dialog
                    title="Edit Discussion Settings"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center
                >
                    <span>My Settings</span><br />
                    <el-checkbox
                        label="Manually mark posts as read"
                        name="type"
                    />
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false"
                            >Cancel</el-button
                        >
                        <el-button
                            type="primary"
                            @click="centerDialogVisible = false"
                            >Save Settings</el-button
                        >
                    </span>
                </el-dialog>
            </div>
        </div>
        <div v-show="discussionStepTwo" class="discussionStepTwo">
            <el-row>
                <el-col :span="18" style="">
                    <el-row>
                        <el-col :span="23">
                            <el-input placeholder="Topic Title" />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <div class="editor">
                                <!--我是一个富文本编辑器-->
                            </div>
                        </el-col>
                    </el-row>
                    <el-form ref="ruleform" :model="ruleform" label-width="">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="Post to" style="">
                                    <el-select
                                        v-model="ruleform.region"
                                        placeholder="All"
                                        style="width: 35%"
                                    >
                                        <el-option
                                            label="student1"
                                            value="shanghai"
                                        />
                                        <el-option
                                            label="student2"
                                            value="beijing"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="Attachment">
                            <el-input
                                v-model="ruleform.name"
                                disabled="disabled"
                                style="display: inline-block;width: 14%"
                                placeholder="Select File"
                            />
                        </el-form-item>
                        <el-form-item label="Available from">
                            <el-date-picker
                                v-model="ruleform.date1"
                                type="date"
                                placeholder="选择日期"
                                style="width: 21%"
                            />
                        </el-form-item>
                        <el-form-item label="Until">
                            <el-date-picker
                                v-model="ruleform.date1"
                                type="date"
                                placeholder="选择日期"
                                style="width: 21%"
                            />
                        </el-form-item>
                        <el-row>
                            <el-col :span="15">
                                <el-form-item style="float: right">
                                    <el-button @click="editorcancel">
                                        Cancel
                                    </el-button>
                                    <el-button type="primary" @click="onSubmit">
                                        Save
                                    </el-button>
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
        </div>
        <div v-show="discussionStepThree" class="discussionStepThree">
            <div>
                <el-row>
                    <el-col :span="12">
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
                                        v-model="ruleformlist.name"
                                        placeholder="Search"
                                        prefix-icon="el-icon-search"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label=""
                                    style="display: inline-block;width: 35%;margin-left: 18px"
                                >
                                    <el-select
                                        v-model="ruleformlist.region"
                                        placeholder="All"
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
                                @click="centerDialogVisible = true"
                            />
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="18">
                    <div class="distable">
                        <template>
                            <el-table
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
                                        <el-radio
                                            v-model="radio"
                                            class="radio"
                                            :label="scope.$index"
                                        >
                                            &nbsp;
                                        </el-radio>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="30">
                                    <template slot-scope="scope">
                                        <i
                                            ><img
                                                src="../../../../static/images/Discussions.png"
                                        /></i>
                                    </template>
                                </el-table-column>
                                <el-table-column label="姓名" min-width="180">
                                    <template slot-scope="scope">
                                        <p>{{ scope.row.name }}</p>
                                        <p style="" class="time">
                                            {{ scope.row.date }}
                                        </p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="127">
                                    <template slot-scope="scope">
                                        <p>
                                            <i
                                                ><img
                                                    src="../../../../static/images/ding.png"
                                            /></i>
                                        </p>
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
                                        <span class="time">{{
                                            scope.row.available
                                        }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="" min-width="120">
                                    <template slot-scope="scope">
                                        <i
                                            ><img
                                                src="../../../../static/images/liulan.png"
                                        /></i>

                                        <i style="margin-left: 10px"
                                            ><img
                                                src="../../../../static/images/weidingyue.png"
                                        /></i>

                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <i style="margin-left: 10px"
                                                    ><img
                                                        src="../../../../static/images/spread.png"
                                                /></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item>
                                                    <i
                                                        ><img
                                                            src="../../../../static/images/unlock.png"
                                                    /></i>

                                                    Open for comments
                                                </el-dropdown-item>
                                                <el-dropdown-item>
                                                    <i style=""
                                                        ><img
                                                            src="../../../../static/images/unlock.png"
                                                    /></i>

                                                    Close for comments
                                                </el-dropdown-item>
                                                <el-dropdown-item>
                                                    <i
                                                        ><img
                                                            src="../../../../static/images/delete.png"
                                                    /></i>

                                                    Delete
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-col>
            </el-row>
            <div>
                <el-dialog
                    title="Edit Discussion Settings"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center
                >
                    <span>My Settings</span><br />
                    <el-checkbox
                        label="Manually mark posts as read"
                        name="type"
                    />
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false"
                            >Cancel</el-button
                        >
                        <el-button
                            type="primary"
                            @click="centerDialogVisible = false"
                            >Save Settings</el-button
                        >
                    </span>
                </el-dialog>
            </div>
        </div>
        <div v-show="discussionStepFour" class="discussionStepFour">
            <el-row>
                <el-col :span="19" style="">
                    <div class="question">
                        <div style="border-bottom: 1px solid #ccc">
                            <div class="title">
                                <span>This is a graded discussion:</span>
                                <span>2.5 points possible</span>
                                <span>due Dec 27</span>
                            </div>
                            <div class="description">
                                <el-row>
                                    <el-col :span="12">
                                        <div>
                                            <img
                                                src="../../../../static/images/touxiang1.png"
                                            />
                                            <span class="name">Ren zhaohui</span
                                            ><br />
                                            <span class="time">
                                                <span>Oct 8 at 4:09am</span>
                                                <a>3 Sections</a>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="operation">
                                            <img
                                                src="../../../../static/images/liulan.png"
                                                class="liulan"
                                            />
                                            <el-button
                                                icon="el-icon-edit"
                                                class="edit"
                                            >
                                                Edit
                                            </el-button>
                                            <!--<img src="../../../../static/images/spread-big.png" style="float: right;margin-top: 4px">-->
                                            <el-dropdown>
                                                <span class="el-dropdown-link">
                                                    <i
                                                        style="float: right;margin-top: 4px"
                                                    >
                                                        <img
                                                            src="../../../../static/images/spread-big.png"
                                                        />
                                                    </i>
                                                </span>
                                                <el-dropdown-menu
                                                    slot="dropdown"
                                                >
                                                    <el-dropdown-item>
                                                        <i>
                                                            <el-radio />
                                                        </i>
                                                        Mark All as Read
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <i
                                                            ><img
                                                                src="../../../../static/images/delete.png"
                                                        /></i>

                                                        Delete
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="detail">
                                <p>一个月背完英语高考单词，你信吗？</p>
                                <span style="color: gray">
                                    It's very important for us to learn English
                                    well. English is the most widely used
                                    language in the world. It is also used as an
                                    international language. It's spoken by more
                                    than 400 million people as their first
                                    language. Many countries use English as a
                                    foreign language. English is widely used for
                                    international business. Chinese use English
                                    as a second language. China's reform and
                                    opening-up policy, China's entry into WTO
                                    and the 2008 Olympic Games encourage more
                                    and more Chinese to learn English. So we
                                    must try our best to learn English well and
                                    make a contribution to building our country
                                    better.
                                </span>
                                <a
                                    ><img
                                        src="../../../../static/images/doc.png"
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
                                            <el-form-item
                                                label=""
                                                style="display: inline-block"
                                            >
                                                <el-input
                                                    v-model="form.name"
                                                    placeholder="Search entries or author"
                                                    prefix-icon="el-icon-search"
                                                />
                                            </el-form-item>
                                            <el-form-item
                                                label=""
                                                style="display: inline-block;position: relative"
                                            >
                                                <el-button>Unread</el-button>
                                                <el-button
                                                    size="medium"
                                                    style="position: absolute;top:0px;left:82px;"
                                                >
                                                    <i
                                                        ><img
                                                            src="../../../../static/images/up.png"
                                                    /></i>
                                                </el-button>
                                                <el-button
                                                    size="medium"
                                                    style="position: absolute;top:0px;left:145px;"
                                                >
                                                    <img
                                                        src="../../../../static/images/down.png"
                                                    />
                                                </el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div style="margin-top: 8px;float: right">
                                        <!--<el-button type="success"  plain size="small" style="display: inline-block;">-->
                                        <img
                                            src="../../../../static/images/yidingyue.png"
                                            style="display: inline-block;"
                                        />
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="position: relative">
                            <img
                                src="../../../../static/images/reply.png"
                                style="position: absolute;z-index: 222222;top: 10px;left: 2px;"
                            />
                            <el-input
                                placeholder=""
                                prefix-icon="el-icon-search"
                            />
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="" style="">
                <div>
                    <el-collapse>
                        <div class="-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
                            >
                                <template slot="title">
                                    <div class="-title">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <img
                                                src="../../../../static/images/touxiang1.png"
                                                style="float: left"
                                            />
                                            <span
                                                ><span class="name"
                                                    >Ren zhaohui:&nbsp;</span
                                                >&nbsp;&nbsp;<span
                                                    style="color: gray"
                                                    >单词对于英语的重要，那真是不言而喻了，单词量到位了，什么都是浮云，我上大学时就有这么一位同学，
                                                    整天很少看什么英语书，做什么练习题，
                                                    整天很少看什么英语书，做什么练习题</span
                                                ></span
                                            >
                                            <div class="time">
                                                <span>12.38am</span>
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../../static/images/liulan.png"
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
                                                                src="../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template slot="">
                                    <div class="main">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <div>
                                                <img
                                                    src="../../../../static/images/touxiang1.png"
                                                    style="float: left"
                                                />
                                                <span>
                                                    <span class="name"
                                                        >zhangsan</span
                                                    >&nbsp;&nbsp;
                                                    <span
                                                        class="name"
                                                    />&nbsp;&nbsp;
                                                    <span class="name"
                                                        >Renzhaohui</span
                                                    ><span>：你很有想法</span>
                                                </span>
                                            </div>
                                            <div class="time">
                                                <span>12.38am</span>
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../../static/images/liulan.png"
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
                                                                src="../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
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
                                        src="../../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder=""
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                            </el-collapse-item>
                        </div>
                        <div class="-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
                            >
                                <template slot="title">
                                    <div class="-title">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <img
                                                src="../../../../static/images/touxiang1.png"
                                                style="float: left"
                                            />
                                            <span
                                                ><span class="name"
                                                    >Ren zhaohui:&nbsp;</span
                                                >&nbsp;&nbsp;<span
                                                    style="color: gray"
                                                    >单词对于英语的重要，那真是不言而喻了，单词量到位了，什么都是浮云，我上大学时就有这么一位同学，
                                                    整天很少看什么英语书，做什么练习题，
                                                    整天很少看什么英语书，做什么练习题</span
                                                ></span
                                            >
                                            <div class="time">
                                                <span>12.38am</span>
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../../static/images/liulan.png"
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
                                                                src="../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template slot="">
                                    <div class="main">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <div>
                                                <img
                                                    src="../../../../static/images/touxiang1.png"
                                                    style="float: left"
                                                />
                                                <span>
                                                    <span class="name"
                                                        >zhangsan</span
                                                    >&nbsp;&nbsp;
                                                    <span
                                                        class="name"
                                                    />&nbsp;&nbsp;
                                                    <span class="name"
                                                        >Renzhaohui</span
                                                    ><span>：你很有想法</span>
                                                </span>
                                            </div>
                                            <div class="time">
                                                <span>12.38am</span>
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../../static/images/liulan.png"
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
                                                                src="../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
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
                                        src="../../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder=""
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                            </el-collapse-item>
                        </div>
                        <div class="-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
                            >
                                <template slot="title">
                                    <div class="-title">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <img
                                                src="../../../../static/images/touxiang1.png"
                                                style="float: left"
                                            />
                                            <span
                                                ><span class="name"
                                                    >Ren zhaohui:&nbsp;</span
                                                >&nbsp;&nbsp;<span
                                                    style="color: gray"
                                                    >单词对于英语的重要，那真是不言而喻了，单词量到位了，什么都是浮云，我上大学时就有这么一位同学，
                                                    整天很少看什么英语书，做什么练习题，
                                                    整天很少看什么英语书，做什么练习题</span
                                                ></span
                                            >
                                            <div class="time">
                                                <span>12.38am</span>
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../../static/images/liulan.png"
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
                                                                src="../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template slot="">
                                    <div class="main">
                                        <el-radio
                                            class="radio"
                                            style="position: absolute;left: -50px;"
                                        />
                                        <div style="position: relative">
                                            <div>
                                                <img
                                                    src="../../../../static/images/touxiang1.png"
                                                    style="float: left"
                                                />
                                                <span>
                                                    <span class="name"
                                                        >zhangsan</span
                                                    >&nbsp;&nbsp;
                                                    <span
                                                        class="name"
                                                    />&nbsp;&nbsp;
                                                    <span class="name"
                                                        >Renzhaohui</span
                                                    ><span>：你很有想法</span>
                                                </span>
                                            </div>
                                            <div class="time">
                                                <span>12.38am</span>
                                            </div>
                                            <div class="caozuo">
                                                <img
                                                    src="../../../../static/images/liulan.png"
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
                                                                src="../../../../static/images/spread.png"
                                                            />
                                                        </i>
                                                    </span>
                                                    <el-dropdown-menu
                                                        slot="dropdown"
                                                    >
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/edit.png"
                                                            /></i>

                                                            Edit
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../../static/images/delete.png"
                                                            /></i>

                                                            Delete
                                                        </el-dropdown-item>
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
                                        src="../../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder=""
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </div>
                <!--</el-col>-->
            </div>
            <!--</el-row>-->
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>
<script>
/*eslint-disable*/
export default {
    data() {
        return {
            // tableData: [],
            multipleSelection: [],
            radio: "",
            selected: {},
            form: {
                name: "",
                region: ""
            },
            discussionStepOne: true,
            discussionStepTwo: false,
            discussionStepThree: false,
            discussionStepFour: false,
            centerDialogVisible: false,
            ruleform: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            ruleformlist: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            activeName: "first",
            tableData: [
                {
                    date: "2016-05-02",
                    name: "课程一讨论的话题",
                    section: "1 Section",
                    available: "Available until oct 9 at 9pm",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "课程一讨论的话题",
                    section: "1 Section",
                    available: "Available until oct 9 at 9pm",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "课程一讨论的话题",
                    section: "1 Section",
                    available: "Available until oct 9 at 9pm",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "课程一讨论的话题",
                    section: "1 Section",
                    available: "Available until oct 9 at 9pm",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        };
    },
    methods: {
        addDiscussion() {
            this.discussionStepOne = false;
            this.discussionStepTwo = true;
            this.discussionStepThree = false;
        },
        onSubmit() {
            console.log("submit!");
            this.discussionStepTwo = false;
            // this.$router.push({path:"/studentHomePage/studentDiscussionList"})
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
        // goToDetail() {
        //   this.$router.push({path:"/studentHomePage/courseIndex"})
        // },
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
            // 赋值给radio
            this.radio = this.tableData.indexOf(row);
            this.selected = row;
            console.log(row.name);
            this.discussionStepFour = true;
            this.discussionStepThree = false;
        }
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

.studentDiscussions /deep/ .el-icon-search:before {
    content: "";
}

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
        /*position: relative;*/

        .editor {
            margin-top: 20px;
            border: 1px solid #e7ebf7;
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
    }

    .discussionStepThree {
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

        .-item {
            border: 1px solid #ccc;
            margin-bottom: 2%;
            border-radius: 1px;
            /*padding-top: 4%;*/
            padding: 4% 5px;

            .name {
                font-weight: bolder;
                font-size: 16px;
            }

            .time {
                position: absolute;
                top: 130%;
                left: 5%;
                color: gray;
                /*margin-top: 15px;*/
            }

            .caozuo {
                position: absolute;
                left: 91%;
                top: 110%;
            }

            .name {
                color: gray;
                font-size: 14px;
            }

            .main {
                /*position: relative;*/
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
}
</style>
