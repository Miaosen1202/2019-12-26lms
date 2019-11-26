<template>
    <!--eslint-disable-->
    <div class="announcements">
        <div v-show="annnouncementStepOne" class="annnouncementStepOne">
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
                            icon="el-icon-delete"
                            @click="centerDialogVisible = true"
                        />
                        <el-button
                            icon="el-icon-circle-plus-outline"
                            type="primary"
                            style="display: inline-block;width: 66%"
                            @click="addAnnoucement"
                        >
                            Announcement
                        </el-button>
                        <!--<el-button icon="el-icon-setting" @click="centerDialogVisible = true"></el-button>-->
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <div class="disMain">
                        <div class="disMainImg">
                            <img
                                src="../../../static/images/stu_announce.png"
                                alt=""
                                @click="gotolist"
                            />
                            <p>
                                There are no announcements to show in this
                                section
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="annnouncementStepTwo" class="annnouncementStepTwo">
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
                                style="display: inline-block;width: 14%"
                                placeholder="Choose File"
                            />
                            <span>No file choosen</span>
                        </el-form-item>
                        <el-form-item label="Options">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox
                                    label="Delay posting"
                                    name="type"
                                />
                                <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
                                <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
                                <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item
                            label="post at"
                            style="margin-left: 84px;color: gray;"
                        >
                            <el-date-picker
                                v-model="ruleform.date1"
                                type="date"
                                placeholder="选择日期"
                                style="width: 21%"
                            />
                        </el-form-item>
                        <el-form-item
                            label=""
                            style="margin-left: 28%;color: gray;"
                        >
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox
                                    label="Aollow users to comment"
                                    name="type"
                                />
                                <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
                                <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
                                <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
                            </el-checkbox-group>
                        </el-form-item>
                        <!--<el-form-item label="Until">-->
                        <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleform.date1"-->
                        <!--style="width: 21%"></el-date-picker>-->
                        <!--</el-form-item>-->
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
        <div v-show="annnouncementStepThree" class="annnouncementStepThree">
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
                            icon="el-icon-delete"
                            @click="centerDialogVisible = true"
                        />
                        <el-button
                            icon="el-icon-circle-plus-outline"
                            type="primary"
                            style="display: inline-block;width: 66%"
                            @click="addAnnoucement"
                        >
                            Announcement
                        </el-button>
                        <!--<el-button icon="el-icon-setting" @click="centerDialogVisible = true"></el-button>-->
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <div class="disMain">
                        <div class="disMainImg">
                            <div class="announceList">
                                <p class="announceListP1">
                                    Free trade in the pacific
                                </p>
                                <div class="read-unread">
                                    <div class="read">
                                        11
                                    </div>
                                    <div class="unread">
                                        21
                                    </div>
                                </div>
                                <div style="margin-top: 10px">
                                    <el-radio />
                                    <p class="announceListP2">
                                        It's very important for us to learn
                                        English well. English is the most widely
                                        used language in the world. It is also
                                        used as an international language. It's
                                        spoken by more than 400 million people
                                        as their first language. Many countries
                                        use English as a foreign language.
                                    </p>
                                </div>
                                <div class="bottomDetail">
                                    <span
                                        >Post on sep 29,2018 at 3:22 pm by
                                        zhangsan</span
                                    >
                                    <img
                                        src="../../../static/images/reply.png"
                                    />
                                    <span @click="reply">Reply</span>
                                </div>
                            </div>
                            <div class="announceList">
                                <p class="announceListP1">
                                    Free trade in the pacific
                                </p>
                                <div class="read-unread">
                                    <div class="read">
                                        11
                                    </div>
                                    <div class="unread">
                                        21
                                    </div>
                                </div>
                                <div style="margin-top: 10px">
                                    <el-radio />
                                    <p class="announceListP2">
                                        It's very important for us to learn
                                        English well. English is the most widely
                                        used language in the world. It is also
                                        used as an international language. It's
                                        spoken by more than 400 million people
                                        as their first language. Many countries
                                        use English as a foreign language.
                                    </p>
                                </div>
                                <div class="bottomDetail">
                                    <span
                                        >Post on sep 29,2018 at 3:22 pm by
                                        zhangsan</span
                                    >
                                    <img
                                        src="../../../static/images/reply.png"
                                    />
                                    <span>Reply</span>
                                </div>
                            </div>
                            <div class="announceList">
                                <p class="announceListP1">
                                    Free trade in the pacific
                                </p>
                                <div class="read-unread">
                                    <div class="read">
                                        11
                                    </div>
                                    <div class="unread">
                                        21
                                    </div>
                                </div>
                                <div style="margin-top: 10px">
                                    <el-radio />
                                    <p class="announceListP2">
                                        It's very important for us to learn
                                        English well. English is the most widely
                                        used language in the world. It is also
                                        used as an international language. It's
                                        spoken by more than 400 million people
                                        as their first language. Many countries
                                        use English as a foreign language.
                                    </p>
                                </div>
                                <div class="bottomDetail">
                                    <span
                                        >Post on sep 29,2018 at 3:22 pm by
                                        zhangsan</span
                                    >
                                    <img
                                        src="../../../static/images/reply.png"
                                    />
                                    <span>Reply</span>
                                </div>
                            </div>
                            <div class="announceList">
                                <p class="announceListP1">
                                    Free trade in the pacific
                                </p>
                                <div class="read-unread">
                                    <div class="read">
                                        11
                                    </div>
                                    <div class="unread">
                                        21
                                    </div>
                                </div>
                                <div style="margin-top: 10px">
                                    <el-radio />
                                    <p class="announceListP2">
                                        It's very important for us to learn
                                        English well. English is the most widely
                                        used language in the world. It is also
                                        used as an international language. It's
                                        spoken by more than 400 million people
                                        as their first language. Many countries
                                        use English as a foreign language.
                                    </p>
                                </div>
                                <div class="bottomDetail">
                                    <span
                                        >Post on sep 29,2018 at 3:22 pm by
                                        zhangsan</span
                                    >
                                    <img
                                        src="../../../static/images/reply.png"
                                    />
                                    <span>Reply</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <div style="float: right;margin-top:30px">
                        <el-button
                            icon="el-icon-delete"
                            @click="centerDialogVisible = true"
                        />
                        <el-button
                            icon="el-icon-circle-plus-outline"
                            type="primary"
                            style="display: inline-block;width: 66%"
                            @click="addAnnoucement"
                        >
                            Announcement
                        </el-button>
                        <!--<el-button icon="el-icon-setting" @click="centerDialogVisible = true"></el-button>-->
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="annnouncementStepFour" class="annnouncementStepFour">
            <el-row>
                <el-col :span="18" style="">
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
                                                src="../../../static/images/touxiang1.png"
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
                                                src="../../../static/images/liulan.png"
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
                                                            src="../../../static/images/spread-big.png"
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
                                        src="../../../static/images/doc.png"
                                    />1 Galaxies Packet.doc</a
                                >
                            </div>
                        </div>
                        <div
                            style="margin-top: 10px;border-bottom: 1px solid #ccc;margin-bottom: 15px"
                        >
                            <el-row style="margin-bottom: 10px">
                                <el-col :span="19">
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
                                <el-col :span="5">
                                    <div style="margin-top: 8px;float: right">
                                        <!--<el-button type="success"  plain size="small" style="display: inline-block;">-->
                                        <img
                                            src="../../../static/images/yidingyue.png"
                                            style="display: inline-block;"
                                        />
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="position: relative" class="reply-input">
                            <img
                                src="../../../static/images/reply.png"
                                style="position: absolute;z-index: 222222;top: 10px;left: 2px;"
                            />
                            <el-input
                                placeholder="Reply"
                                prefix-icon="el-icon-search"
                            />
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="reply" style="">
                <div>
                    <el-collapse>
                        <div class="reply-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
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
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
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
                                    <div class="mainreply">
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
                                                    <span class="name"
                                                        >zhangsan</span
                                                    >&nbsp;&nbsp;
                                                    <span class="namereply"
                                                        >Reply</span
                                                    >&nbsp;&nbsp;
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
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
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
                                        src="../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder="Reply"
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                            </el-collapse-item>
                        </div>
                        <div class="reply-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
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
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
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
                                    <div class="mainreply">
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
                                                    <span class="name"
                                                        >zhangsan</span
                                                    >&nbsp;&nbsp;
                                                    <span class="namereply"
                                                        >Reply</span
                                                    >&nbsp;&nbsp;
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
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
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
                                        src="../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder="Reply"
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                            </el-collapse-item>
                        </div>
                        <div class="reply-item">
                            <el-collapse-item
                                title=""
                                style="position: relative;"
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
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
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
                                    <div class="mainreply">
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
                                                    <span class="name"
                                                        >zhangsan</span
                                                    >&nbsp;&nbsp;
                                                    <span class="namereply"
                                                        >Reply</span
                                                    >&nbsp;&nbsp;
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
                                                        <el-dropdown-item>
                                                            <i
                                                                ><img
                                                                    src="../../../static/images/delete.png"
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
                                        src="../../../static/images/reply.png"
                                        style="position: absolute;z-index: 222222;top: 24px;left: 2px;"
                                    />
                                    <el-input
                                        placeholder="Reply"
                                        prefix-icon="el-icon-search"
                                    />
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
export default {
    data() {
        return {
            annnouncementStepOne: true,
            annnouncementStepTwo: false,
            annnouncementStepThree: false,
            annnouncementStepFour: false,
            activeName: "first",
            form: {
                name: "",
                region: ""
            },
            ruleform: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            }
        };
    },
    methods: {
        gotolist() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        addAnnoucement() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        editorcancel() {
            // this.annnouncementStepOne = false;
            // this.annnouncementStepTwo = false;
            // this.annnouncementStepThree = false;
            // this.annnouncementStepFour = true;
        },
        reply() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = false;
            this.annnouncementStepFour = true;
        },
        onSubmit() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = true;
        },
        handleClick() {}
    }
};
/*eslint-disable no-new*/
</script>

<style scoped="scoped" lang="less">
.announcements {
    .annnouncementStepOne {
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
                width: 190px;
                height: 200px;
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
        }
    }
    .annnouncementStepTwo {
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
    .annnouncementStepThree {
        .disMain {
            margin-top: 25px;
            height: 650px;
            border: 1px solid #e7ebf7;

            .disMainImg {
                width: 100%;
                height: 100%;
                position: relative;
            }
            .announceList {
                border-bottom: 1px solid #e7ebf7;
                padding: 2%;
            }
            .announceList:last-child {
                border-bottom: none;
            }
            .announceListP1 {
                display: inline-block;
                font-size: 20px;
                font-weight: bold;
                margin-left: 30px;
            }
            .announceListP2 {
                display: inline-block;
                margin-top: -22px;
                margin-left: 30px;
            }
            .bottomDetail {
                margin-top: 10px;
                position: relative;
                span:nth-of-type(1) {
                    color: #6b7080;
                    margin-left: 30px;
                }
                img {
                    position: absolute;
                    margin-left: 20px;
                }
                span:nth-of-type(2) {
                    color: #6b7080;
                    margin-left: 50px;
                }
            }
            .read-unread {
                display: inline-block;
                float: right;
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
    }
    .annnouncementStepFour {
        .reply /deep/ .el-collapse-item__wrap {
            border: none;
        }

        .reply /deep/ .el-collapse-item__header {
            border: none;
            line-height: 20px;
        }

        .reply /deep/ .el-collapse {
            border: none;
        }
        .reply /deep/ .el-icon-search:before {
            content: "";
        }

        .reply-input /deep/ .el-icon-search:before {
            content: "";
        }

        .discussionRightBar {
            height: 400px;
            margin-left: 50px;

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
                left: 5%;
                color: gray;
                /*margin-top: 15px;*/
            }

            .caozuo {
                position: absolute;
                left: 91%;
                top: 110%;
            }

            .namereply {
                color: gray;
                font-size: 14px;
            }

            .mainreply {
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
            width: 73%;
            margin-top: 20px;
            margin-left: 5.5%;
        }
    }
}
</style>
