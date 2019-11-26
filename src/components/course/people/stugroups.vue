<template>
    <!--eslint-disable-->
    <div>
        <div v-show="stugroupsBox" class="stugroups-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Everyone" name="first">
                    Everyone
                    <div class="stugroups-seach">
                        <!--搜索-->
                        <el-input
                            v-model="search"
                            placeholder="Search people"
                            maxlength="100"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-search"
                            />
                        </el-input>
                        <!--条件搜索-->
                        <el-select v-model="value" placeholder="Please select">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </div>

                    <el-table
                        border
                        :data="
                            tableData.filter(
                                data =>
                                    !search ||
                                    data.id
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                            )
                        "
                        style="width: 100%"
                    >
                        <el-table-column
                            label="Name"
                            prop=" nickname"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <i
                                    class="iconfont icon-account"
                                    style="font-size: 20px;"
                                />
                                <span style="margin-left: 10px">{{
                                    scope.row.nickname
                                }}</span>
                                <!--<span style="margin-left: 10px" class="stugoroup-state">pending</span>-->
                                <span
                                    style="margin-left: 10px"
                                    class="stugoroup-state stugoroup-inactive1"
                                    >inactive</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="Section"
                            prop="sectionId"
                            align="center"
                        />
                        <el-table-column
                            label="Role"
                            prop="roleName"
                            align="center"
                            class="cel-box"
                        >
                            <template slot-scope="scope">
                                <span class="cel-td">{{
                                    scope.row.roleName
                                }}</span>
                                <span
                                    style="margin-top: 10px; display: block;"
                                    >{{ scope.row.sectionId }}</span
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="Groups" name="second">
                    Groups
                    <div class="stugroups-seach">
                        <!--搜索-->
                        <el-input
                            v-model="search"
                            placeholder="Search people"
                            maxlength="100"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-search"
                            />
                        </el-input>
                        <!--添加学生小组-->
                        <el-button @click="dialogVisible = true">
                            <i
                                class="iconfont icon-add"
                                style="font-size: 22px;
						    vertical-align: -3px;
						    display: inline-block;"
                            />
                            Groups
                        </el-button>
                    </div>
                    <div class="stugroups-list-box">
                        <div class="stugroups-list">
                            <el-collapse
                                v-model="activeNames"
                                accordion
                                @change="handleChange"
                            >
                                <el-collapse-item>
                                    <template slot="title">
                                        <ul
                                            class="stugroups-list-title clearfix"
                                        >
                                            <li style="padding-left: 30px;">
                                                StuGroup
                                                <span
                                                    style="padding-left: 10px;"
                                                    >Student Groups</span
                                                >
                                            </li>
                                            <li>Red</li>
                                            <li style="margin: 0px 10px;">
                                                students
                                            </li>
                                            <li style="text-align: right;">
                                                <template>
                                                    <el-popover
                                                        trigger="hover"
                                                        placement="bottom"
                                                        style="float: right;"
                                                    >
                                                        <div
                                                            slot="reference"
                                                            class="id-wrapper"
                                                        >
                                                            <el-tag
                                                                size="medium"
                                                                style="background: none; border: none;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-more_"
                                                                    style="font-size: 22px;"
                                                                />
                                                            </el-tag>
                                                        </div>
                                                        <ul
                                                            class="stugroups-options"
                                                        >
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Re send
                                                                Invitation
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Edit Sections
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Edit Role
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />User Details
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-shanchu"
                                                                />Deactiva User
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Re-activate
                                                                User
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Remove-From
                                                                Course
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Analytics
                                                            </li>
                                                        </ul>
                                                    </el-popover>
                                                </template>
                                            </li>
                                        </ul>
                                    </template>
                                    <div class="stugroups-list-name-box">
                                        <ul
                                            class="stugroups-list-name clearfix"
                                        >
                                            <li>StuGroup</li>
                                            <li>Red</li>
                                            <li>students</li>
                                            <li>students11111</li>
                                            <li>students</li>
                                            <li>students11111</li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <p class="stugroups-list-border" />
                        <div class="stugroups-list">
                            <el-collapse
                                v-model="activeNames"
                                accordion
                                @change="handleChange"
                            >
                                <el-collapse-item>
                                    <template slot="title">
                                        <ul
                                            class="stugroups-list-title clearfix"
                                        >
                                            <li style="padding-left: 30px;">
                                                StuGroup
                                                <span
                                                    style="padding-left: 10px;"
                                                    >Student Groups</span
                                                >
                                            </li>
                                            <li>Red</li>
                                            <li>students</li>
                                            <li style="text-align: right;">
                                                <i
                                                    class="iconfont icon-suoding"
                                                    style="font-size: 22px; margin-right: 10px;"
                                                    title="Group is joined by invitation only."
                                                />
                                            </li>
                                        </ul>
                                    </template>
                                    <div class="stugroups-list-name-box">
                                        <ul
                                            class="stugroups-list-name clearfix"
                                        >
                                            <li>StuGroup</li>
                                            <li>Red</li>
                                            <li>students</li>
                                            <li>students11111</li>
                                            <li>students</li>
                                            <li>students11111</li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <p class="stugroups-list-border" />
                        <div class="stugroups-list">
                            <el-collapse
                                v-model="activeNames"
                                accordion
                                @change="handleChange"
                            >
                                <el-collapse-item>
                                    <template slot="title">
                                        <ul
                                            class="stugroups-list-title clearfix"
                                        >
                                            <li style="padding-left: 30px;">
                                                StuGroup
                                                <span
                                                    style="padding-left: 10px;"
                                                    >Student Groups</span
                                                >
                                            </li>
                                            <li>Red</li>
                                            <li>students</li>
                                            <li style="text-align: right;">
                                                <template>
                                                    <el-popover
                                                        trigger="hover"
                                                        placement="bottom"
                                                        style="float: right;"
                                                    >
                                                        <div
                                                            slot="reference"
                                                            class="id-wrapper"
                                                        >
                                                            <el-tag
                                                                size="medium"
                                                                style="background: none; border: none;"
                                                            >
                                                                <i
                                                                    class="iconfont icon-more_"
                                                                    style="font-size: 22px;"
                                                                />
                                                            </el-tag>
                                                        </div>
                                                        <ul
                                                            class="stugroups-options"
                                                        >
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Re send
                                                                Invitation
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Edit Sections
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Edit Role
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />User Details
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-shanchu"
                                                                />Deactiva User
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Re-activate
                                                                User
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Remove-From
                                                                Course
                                                            </li>
                                                            <li>
                                                                <i
                                                                    class="iconfont icon-edit"
                                                                />Analytics
                                                            </li>
                                                        </ul>
                                                    </el-popover>
                                                </template>
                                            </li>
                                        </ul>
                                    </template>
                                    <div class="stugroups-list-name-box">
                                        <ul
                                            class="stugroups-list-name clearfix"
                                        >
                                            <li>StuGroup</li>
                                            <li>Red</li>
                                            <li>students</li>
                                            <li>students11111</li>
                                            <li>students</li>
                                            <li>students11111</li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--添加人员-->
        <div class="stugroups-dialog">
            <el-dialog
                v-show="none"
                title="New Student Group"
                :visible.sync="dialogVisible"
                width="40%"
                height="auto "
                :before-close="handleClose"
            >
                <!--提示-->
                <p class="stugoroup-tips">
                    Groups are a good place to collaborate on projects or to
                    figure out schedules for study sessions and the like. Every
                    group gets a calendar, a wiki, discussions, and a little bit
                    of space to store files. Groups can collaborate on
                    documents, or even schedule web conferences. It's really
                    like a mini-course where you can work with a smaller number
                    of students on a more focused project.
                </p>

                <!--选择角色-->
                <span class="stugoroup-title">Group Name</span>
                <el-select
                    v-model="value"
                    placeholder="请选择"
                    style="width: 80%;"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    /> </el-select
                ><br />

                <span class="stugoroup-title">Joining</span>
                <el-select
                    v-model="value"
                    placeholder="请选择"
                    style="width: 80%;"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>

                <span class="stugoroup-title">lnvte</span>
                <div class="stugroup-name">
                    <el-checkbox v-model="checked">
                        Stu2
                    </el-checkbox>
                    <el-checkbox v-model="checked">
                        Xiaoming
                    </el-checkbox>
                    <el-checkbox v-model="checked">
                        Stu3
                    </el-checkbox>
                    <el-checkbox v-model="checked">
                        Stu4
                    </el-checkbox>
                </div>

                <span
                    slot="footer"
                    class="dialog-footer clearfix"
                    style="text-align: center;"
                >
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="Next">Submit</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="stugroups-dialog">
            <el-dialog
                v-show="StudentGroup"
                title="Manage Student Group"
                :visible.sync="StudentGroup"
                width="30%"
                height="auto "
                :before-close="handleClose"
            >
                <!--选择角色-->
                <span class="stugoroup-title" style="width: 22%;"
                    >Group Ste Name</span
                >
                <el-select
                    v-model="value"
                    placeholder="请选择"
                    style="width: 70%;"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>

                <span class="stugoroup-title" style="width: 22%;"
                    >Members <label>(2/2)</label></span
                >
                <div class="stugroup-name">
                    <p>
                        <el-checkbox v-model="checked">
                            Stu2
                        </el-checkbox>
                    </p>
                    <p>
                        <el-checkbox v-model="checked">
                            Stu2
                        </el-checkbox>
                    </p>
                </div>

                <span
                    slot="footer"
                    class="dialog-footer clearfix"
                    style="text-align: center;"
                >
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="Next">Submit</el-button>
                </span>
            </el-dialog>
        </div>
        <!--小组列表显示-->
        <div v-show="groupsBox" class="stugoroup-groups-box">
            <p class="stugoroup-groups-title">
                Groups
            </p>
            <div class="stugoroup-groups-table">
                <el-table :data="tableData1" style="width: 100%">
                    <el-table-column prop="date" label="Groups" width="380" />
                    <el-table-column prop="name" label="Course" width="380" />
                    <el-table-column prop="address" label="Tem" />
                </el-table>
            </div>
        </div>
        <!--人员列表显示-->
        <div v-show="peopleBox" class="stugoroup-groups-box">
            <p class="stugoroup-groups-title">
                People
            </p>
            <div class="stugoroup-groups-table">
                <el-table :data="tableData1" style="width: 100%">
                    <el-table-column prop="date" label="Group Members">
                        <template slot-scope="scope">
                            <i
                                class="iconfont icon-account"
                                style="font-size: 20px; margin-right: 10px;"
                            />
                            <span class="cel-td">{{ scope.row.name }}</span>
                            <!--<span style="margin-top: 10px; display: block;">{{ scope.row.sectionId }}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="Teachers&TAs">
                        <template slot-scope="scope">
                            <i
                                class="iconfont icon-account"
                                style="font-size: 20px; margin-right: 10px;"
                            />
                            <span class="cel-td">{{ scope.row.name }}</span>
                            <!--<span style="margin-top: 10px; display: block;">{{ scope.row.sectionId }}</span>-->
                        </template>
                    </el-table-column>
                </el-table>
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
            stugroupsBox: false,
            activeName: "first",
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
            value: "",
            tableData: [
                {
                    nickname: "teacher", // name
                    userId: "45806013@qq.com", // Login ID
                    sectionId: "course1", // section
                    roleName: "Teacher", // Role
                    lastActivity: "Nov 12 at 14:42", // lastActivity
                    totalActivity: "05:34:23" // totalActivity
                },
                {
                    nickname: "teacher",
                    userId: "45806013@qq.com",
                    sectionId: "course1",
                    roleName: "Teacher",
                    lastActivity: "Nov 12 at 14:42",
                    totalActivity: "05:34:23"
                },
                {
                    nickname: "teacher",
                    userId: "45806013@qq.com",
                    sectionId: "course1",
                    roleName: "Teacher",
                    lastActivity: "Nov 12 at 14:42",
                    totalActivity: "05:34:23"
                },
                {
                    nickname: "teacher",
                    userId: "45806013@qq.com",
                    sectionId: "course1",
                    roleName: "Teacher",
                    lastActivity: "Nov 12 at 14:42",
                    totalActivity: "05:34:23"
                }
            ],
            search: "",
            dialogVisible: false,
            none: false,
            StudentGroup: false,
            activeNames: "",
            checked: "",
            tableData1: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            groupsBox: false,
            peopleBox: false
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleChange() {},
        Next() {},
        handleClose() {}
    }
};
/*eslint-disable no-new*/
</script>
<style>
.stugroups-dialog .el-dialog__footer {
    padding: 20px !important;
    padding-top: 10px;
    text-align: center !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    clear: both;
}

.stugroups-list .el-collapse-item__header.is-active {
    background: #f1f1f1 !important;
}

.stugroups-list .el-collapse-item__arrow {
    position: absolute !important;
    left: 30px !important;
}

.stugroups-list .el-collapse-item__header {
    border-bottom: 1px solid #aaaaaa;
}

.stugoroup-groups-table .el-table thead th {
    background: #f1f1f1;
    color: #4b4b4b;
    font-weight: bold;
}
</style>
<style scoped lang="less">
.stugroups-box {
    width: 80%;
}

.stugroups-seach .el-input {
    width: 22%;
    height: 36px;
    margin: 20px 0;
}

.stugroups-seach .el-select {
    width: 17%;
    margin-left: 12px;
}

.stugroups-seach .el-button {
    float: right !important;
    position: relative;
    font-size: 16px;
    padding: 8px 13px;
}

.stugroups-seach-tips {
    margin-top: 10px;
    margin-bottom: 10px;
}

.stugoroup-title {
    width: 90px;
    text-align: right;
    margin-top: 26px;
    display: inline-block;
    margin-right: 12px;
}

.stugroup-name {
    float: right;
    width: 75%;
    margin-top: 20px;
    text-align: left;
    display: inline-block;
    max-height: 264px;
    overflow-y: auto;
}

.stugroup-name .el-checkbox {
    margin-left: 0px;
    padding: 10px;
}

.stugroups-list-box {
    border: 1px solid #eeeeee;
    padding: 20px;
}

.stugroups-list-border {
    border-bottom: 1px dashed #eeeeee;
    margin: 20px -14px;
}

.stugroups-list-title,
.stugroups-list-name {
    width: 100%;
}

.stugroups-list-title li {
    width: 24%;
    float: left;
    text-align: left;
    font-size: 14px;
}

.stugroups-list-title li span {
    color: #999999;
}

.stugroups-list-name li {
    float: left;
    text-align: left;
    font-size: 14px;
    width: 17%;
    padding-left: 10px;
    height: 36px;
    line-height: 36px;
    margin-left: 16px;
    margin-bottom: 14px;
    margin-top: 10px;
    border: 1px solid #eeeeee;
}

.stugroups-list-name-box {
    margin: 12px;
    width: 100%;
}

.stugroups-list .el-collapse {
    border: 1px solid #aaaaaa;
    border-radius: 5px;
}

.stugroups-options li {
    line-height: 36px;
}

.stugroups-options li i {
    font-size: 18px;
    text-align: center;
    margin-right: 10px;
}

.stugoroup-groups-title {
    font-weight: bold;
    font-size: 16px;
}

.stugoroup-groups-table {
    width: 80%;
    margin-top: 20px;
}
</style>
