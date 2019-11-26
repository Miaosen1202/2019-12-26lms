<template>
    <div class="courses_box">
        <el-row>
            <el-col :span="20">
                <el-form :inline="true" :model="query" class="demo-form-inline">
                    <el-form-item class="margin_right">
                        <el-select
                            v-model="query.termId"
                            @change="getCourseData()"
                        >
                            <el-option :label="$t('message.All')" value="" />
                            <el-option
                                v-for="item in terms"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="margin_right">
                        <el-select
                            v-model="query.type"
                            @change="getCourseData()"
                        >
                            <el-option
                                :label="$t('message.Course')"
                                value="course"
                            />
                            <el-option
                                :label="$t('message.Teacher')"
                                value="teacher"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="margin_right">
                        <el-input
                            v-model="query.name"
                            :placeholder="$t('message.Common_search')"
                            @keyup.enter.native="handleQuery()"
                        />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="4">
                <p class="courses_button_right">
                    <el-button
                        class="courses_button_right_button"
                        @click="addCourse"
                    >
                        <i class="iconfont icon-add courses_button_right_add" />
                        {{ $t("message.Course") }}
                    </el-button>
                </p>
            </el-col>
        </el-row>
        <template>
            <div class="syllabus_list">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <i
                                v-if="scope.row.status == 1"
                                class="iconfont icon-duigou"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="$t('message.Courses')">
                        <template slot-scope="scope">
                            <span
                                style="cursor: pointer"
                                @click="goto(scope.row.id)"
                                >{{ scope.row.name }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sisId"
                        :label="$t('message.admin_sis_id')"
                    />
                    <el-table-column :label="$t('message.Terms')">
                        <template slot-scope="scope">
                            <div v-for="(item, index) in terms" :key="index">
                                <span v-if="item.id == scope.row.termId">
                                    {{ item.name }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.aTeacher')">
                        <template slot-scope="scope">
                            <el-row
                                v-for="(item, index) in scope.row.teachers"
                                :key="index"
                            >
                                <el-col :span="4">
                                    <img
                                        :src="setPicUrl(item.avatarFileId)"
                                        width="20px"
                                        height="20px"
                                    />
                                </el-col>
                                <el-col :span="20">
                                    <span>{{ item.fullName }}</span>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orgName"
                        :label="$t('message.admin_subOrg')"
                    />
                    <el-table-column
                        prop="studentCount"
                        :label="$t('message.aStudent')"
                    />
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="handleAddClick(scope.row)"
                            >
                                <i class="iconfont icon-plus" />
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                background
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :prev-text="$t('message.Common_prev')"
                :next-text="$t('message.Common_next')"
                layout="prev, pager, next, jumper"
                class="pagination_center"
                :total="total"
                @current-change="handleCurrentChange"
                @prev-click="handlePrevClick"
                @next-click="handleNextClick"
            />
        </template>
        <el-dialog
            :title="$t('message.Create_New_Course')"
            :visible.sync="dialogFormVisible"
        >
            <el-form
                ref="createForm"
                label-width="140px"
                :rules="rules"
                :model="course"
                class="el-form"
            >
                <el-form-item :label="$t('message.Course_Name')" prop="name">
                    <el-input
                        v-model="course.name"
                        class="course_name"
                        maxlength="200"
                    />
                </el-form-item>
                <el-form-item :label="$t('message.Course_Code')" prop="code">
                    <el-input v-model="course.code" class="course_name" />
                </el-form-item>
                <el-form-item :label="$t('message.admin_subOrg')" prop="orgId">
                    <el-select
                        v-model="course.orgId"
                        class="course_code"
                        :placeholder="
                            $t('message.Common_please_select') +
                                ' ' +
                                $t('message.admin_subOrg')
                        "
                    >
                        <el-option
                            v-for="item in orgOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id + '_' + item.treeId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('message.Terms')" prop="termId">
                    <el-select
                        v-model="course.termId"
                        class="course_code"
                        :placeholder="
                            $t('message.Common_please_select') +
                                ' ' +
                                $t('message.Terms')
                        "
                    >
                        <el-option
                            v-for="item in terms"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCourse">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button type="primary" @click="saveCourse">
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="add user"
            :visible.sync="dialogAddFormVisible"
            width="50%"
        >
            <el-form
                v-show="oneStep"
                ref="adduser"
                :model="form"
                :rules="stepRules"
            >
                <el-form-item
                    :label="$t('message.UserSetting_add_user(s)_by')"
                    prop="type"
                >
                    <el-radio v-model="form.type" label="2">
                        {{ $t("message.UserSetting_Login_ID") }}
                    </el-radio>
                    <el-radio v-model="form.type" label="3">
                        {{ $t("message.UserSetting_SIS_ID") }}
                    </el-radio>
                </el-form-item>
                <el-form-item
                    :label="$t('message.UserSetting_example')"
                    required
                    prop="datas"
                >
                    <el-input v-model="form.datas" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-col :span="3">
                        <span>{{ $t("message.People_role") }}</span>
                    </el-col>
                    <el-col :span="9">
                        <!--选择角色-->
                        <el-select
                            v-model="form.roleId"
                            :placeholder="$t('message.Common_please_select')"
                            style="width: 80%"
                        >
                            <el-option
                                v-for="item in sectionRoleAndPeopleList"
                                :key="item.roleId"
                                :label="item.roleName"
                                :value="item.roleId"
                            />
                        </el-select>
                    </el-col>

                    <el-col :span="3">
                        <span>{{ $t("message.People_section") }}</span>
                    </el-col>

                    <el-col :span="9">
                        <!-- 选择班级 -->
                        <el-select
                            v-model="form.sectionId"
                            :placeholder="$t('message.Common_please_select')"
                            style="width: 80%"
                        >
                            <el-option
                                v-for="item in courseSectionList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-table v-show="twoStep" :data="users" stripe style="width: 100%">
                <el-table-column
                    prop="fullName"
                    :label="$t('message.allName')"
                />
                <el-table-column
                    prop="email"
                    :label="$t('message.loginemail')"
                />
                <el-table-column
                    prop="username"
                    :label="$t('message.loginname')"
                />
                <el-table-column prop="sisId" :label="sisId" />
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">
                    {{ $t("message.UserSetting_cancel") }}
                </el-button>
                <el-button v-show="oneStep" type="primary" @click="next">
                    {{ $t("message.UserSetting_next") }}
                </el-button>
                <el-button v-show="twoStep" type="primary" @click="before">
                    {{ $t("message.UserSetting_prev") }}
                </el-button>
                <el-button v-show="twoStep" type="primary" @click="submit">
                    {{ $t("message.UserSetting_submit") }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import utilMethods from "@/utils/utilMethods";

export default {
    data() {
        return {
            courseSectionList: [],
            dialogAddFormVisible: false,
            sectionRoleAndPeopleList: [],
            oneStep: true,
            twoStep: false,
            watchTime: "",
            sisId: "",
            course: {
                name: "",
                code: "",
                orgId: "",
                termId: ""
            },
            dialogFormVisible: false,
            formLabelWidth: "120px",
            orgOptions: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            courseId: "",
            tableData: [],
            query: {
                name: "",
                termId: "",
                type: "course"
            },
            terms: [],
            users: [],
            stepRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.activityName"),
                        trigger: "blur"
                    }
                ],
                datas: [
                    {
                        required: true,
                        message: this.$t("message.activityNames"),
                        trigger: "blur"
                    }
                ]
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.activityName"),
                        trigger: "blur"
                    }
                ],
                orgId: [
                    {
                        required: true,
                        message: this.$t("message.reqireSubAccont"),
                        trigger: "blur"
                    }
                ],
                /*termId: [
            { required: true, message: this.$t("message.activityNames"), trigger: 'blur' },

          ],
          type:[
            { required: true, message: this.$t("message.activityNames"), trigger: 'blur' },
          ], */
                datas: [
                    {
                        required: true,
                        message: this.$t("message.activityNames"),
                        trigger: "blur"
                    }
                ]
            },
            form: {
                type: "2",
                datas: "",
                roleId: "",
                sectionId: ""
            }
        };
    },
    watch: {
        $route: {
            handler(val, oldVal) {
                this.getTerms();
                this.getCourseData();
            },
            // 深度观察监听
            deep: true
        }
    },
    created() {
        this.getTerms();
        this.getCourseData();
    },
    methods: {
        goto(id) {
            this.$router.push({
                path: "coursesettings",
                query: { courseId: id }
            });
        },
        async submit() {
            const data = {
                courseId: this.courseId,
                roleId: this.form.roleId,
                sectionId: this.form.sectionId,
                invites: []
            };
            this.users.forEach(v => {
                const invite = {
                    inviteType: this.form.type,
                    email: v.email,
                    loginId: v.username,
                    sisId: v.sisId,
                    nickname: v.nickname
                };
                data.invites.push(invite);
            });
            const result = await this.$getData("/courseUser/add", data, "post");
            if (result.data.code == 200) {
                this.getCourseData();
                this.cancel();
            } else {
                this.$message.error(result.data.message);
            }
        },
        async loadCourseSections() {
            const result = await this.$getData(
                "/section/list",
                { courseId: this.courseId },
                "get"
            );
            if (result.data.code == 200) {
                this.courseSectionList = result.data.entity;
                for (let i = 0; i < this.courseSectionList.length; i++) {
                    const sec = this.courseSectionList[i];
                    if (sec.isDefault == 1) {
                        this.form.sectionId = sec.id;
                    }
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        async loadSectionRoleAndPeopleNumber() {
            const result = await this.$getData(
                "/role/courseUserNumber/query",
                { courseId: this.courseId },
                "get"
            );
            if (result.data.code == 200) {
                this.sectionRoleAndPeopleList = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async cancel() {
            this.oneStep = false;
            this.twoStep = false;
            this.dialogAddFormVisible = false;
        },
        async before() {
            this.oneStep = true;
            this.twoStep = false;
        },
        async next() {
            this.$refs.adduser.validate(async valid => {
                if (valid) {
                    this.oneStep = false;
                    this.twoStep = true;
                    this.loadData();
                } else {
                    return false;
                }
            });
        },
        async loadData() {
            let data = "";
            const { type } = this.form;
            if (type == 2) {
                // loginId
                data = `usernames=${this.form.datas}`;
            } else {
                // sisid
                data = `sisIds=${this.form.datas}`;
            }
            const result = await this.$getData(
                `/user/list?${data}`,
                null,
                "get"
            );
            if (result.data.code == 200) {
                this.users = result.data.entity;
            }
        },
        async saveCourse() {
            this.$refs.createForm.validate(async valid => {
                if (valid) {
                    // 120_000100030001
                    const id_treeId = this.course.orgId.split("_");
                    this.course.orgId = id_treeId[0];
                    this.course.orgTreeId = id_treeId[1];
                    const result = await this.$getData(
                        "/course/add",
                        this.course,
                        "post"
                    );
                    if (result.data.code == 200) {
                        this.dialogFormVisible = false;
                        this.$refs.createForm.resetFields();
                        this.getCourseData();
                    } else {
                        this.$message.error(result.data.message);
                    }
                } else {
                    return false;
                }
            });
        },
        cancelCourse() {
            this.$refs.createForm.resetFields();
            this.dialogFormVisible = false;
        },
        async orgList() {
            const result = await this.$getData(
                "/org/select/query",
                null,
                "get"
            );
            if (result.data.code == 200) {
                this.orgOptions = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        addCourse() {
            this.orgList();
            this.dialogFormVisible = true;
        },
        handleAddClick(row) {
            this.courseId = row.id;
            this.loadSectionRoleAndPeopleNumber();
            this.loadCourseSections();
            this.dialogAddFormVisible = true;
            this.oneStep = true;
            this.twoStep = false;
        },
        handleViewClick() {
            this.$alert("设置课程通用组件");
        },
        setPicUrl(val) {
            return utilMethods.defaultAvatar(val);
        },
        handleQuery() {
            this.getCourseData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getCourseData();
        },
        handlePrevClick(val) {
            this.currentPage = val;
            this.getCourseData();
        },
        handleNextClick(val) {
            this.currentPage = val;
            this.getCourseData();
        },
        async getCourseData() {
            const params = this.query;
            params.pageSize = this.pageSize;
            params.pageIndex = this.currentPage;
            const result = await this.$getData(
                "/adminCourse/pageList",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.tableData = result.data.entity.list || [];
                this.total = result.data.entity.total;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getTerms() {
            const result = await this.$getData("/termSelect/list", null, "get");
            if (result.data.code == 200) {
                this.terms = result.data.entity || [];
            } else {
                this.$message.error(result.data.message);
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style scoped="">
.courses_search {
    position: relative;
}

.courses_search p .courses_search_input {
    width: 200px;
    margin-right: 20px;
}

.courses_search .courses_button_right {
    position: absolute;
    right: 20px;
    top: 0;
}
.courses_button_right_add {
    font-size: 19px;
    vertical-align: middle;
}
.courses_search_checkbox {
    margin-right: 10px;
}

.courses_search_list ul li span {
    display: inline-block;
    margin-right: 8%;
}

.courses_search_list ul li {
    margin: 50px 0;
    padding-bottom: 70px;
    border-bottom: 1px solid #ccc;
}

.courses_search_list ul li .courses_search_name {
    width: 77px;
    word-wrap: break-word;
    word-break: normal;
}

.courses_search_list ul li .courses_search_name i {
    display: inline-block;
    margin-bottom: 22px;
}

.courses_search_list ul li .courses_search_name .icon-yonghutouxiang {
    font-size: 45px;
}

.courses_search_list ul li span .icon-yonghutouxiang {
    font-size: 45px;
}

.courses_search_list ul li .courses_search_name b {
    font-weight: normal;
}

.courses_search_iconfont {
    position: relative;
    top: 30px;
}

.courses_search_iconfonts {
    position: relative;
    top: 50px;
}

.icon-duigou {
    color: #5daf34;
    font-size: 22px;
}

.courses_search_list ul .courses_search_first {
    background: #eee;
    padding-bottom: 0;
    height: 50px;
    line-height: 50px;
}

.admincourseall_mask {
    width: 400px;
}

.admincourseall_mask h3 {
    position: relative;
    border-bottom: 1px solid #eee;
    height: 30px;
}

.admincourseall_mask h3 span {
    position: absolute;
    right: 0;
    top: 7px;
}

.admincourseall_mask p {
    margin-top: 20px;
}

.admincourseall_mask p span {
    margin-right: 20px;
}

.admincourseall_mask_input .admincourseall_mask_son {
    height: 100px;
    width: 100%;
    border-radis: 5px;
}

.admincourseall_mask p .teacher,
.section {
    width: 134px;
    width: 134px;
}

.admincourseall_mask p label {
    margin-right: 7px;
}

.courses_detail_image label {
    width: 100px;
    text-align: right;
}

.admincourseall_mask_last {
    text-align: center;
}

.admincourseall_mask_button {
    width: 100px;
}

.admincourseall_masks_table tr td {
    text-align: center;
}

.admincourseall_masks_button {
    width: 400px;
    margin-top: 20px;
    text-align: center;
}

.admincourseall_masks_p1 {
    line-height: 50px;
}

.admincourseall_masks h3 {
    width: 400px;
    height: 30px;
    line-height: 30px;
    position: relative;
}

.admincourseall_masks h3 span {
    position: absolute;
    right: 0;
    top: 7px;
}

.admincourseall_mask_three {
    width: 300px;
}

.admincourseall_mask_three h3 {
    position: relative;
    height: 30px;
    border-bottom: 1px solid #ccc;
}

.admincourseall_mask_three h3 span {
    position: absolute;
    right: 20px;
    top: 0px;
}

.admincourseall_mask_three p {
    padding-left: 30px;
    margin-top: 20px;
}

.admincourseall_mask_three p i {
    margin-right: 10px;
    font-size: 30px;
}

.add_account_alert {
    width: 500px;
}

.add_account_alert p {
    margin: 15px 0;
}

.add_account_alert h3 {
    position: relative;
    padding-right: 30px;
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}

.add_account_alert i {
    position: absolute;
    right: 0;
    top: 6px;
}

.add_account_alert p label {
    display: inline-block;
    width: 120px;
}

.add_account_alert p .add_account_alert_right {
    width: 250px;
}

.courses_conclude h3 {
    margin-bottom: 25px;
}

.courses_conclude_p2 {
    margin-bottom: 30px;
}

.courses_conclude_button {
    text-align: right;
}

.courses_conclude {
    width: 500px;
}

.courses_detail {
}

.courses_detail_image {
    display: flex;
}

courses_detail_image label {
    margin-right: 10px;
}

.courses_detail_image p {
    width: 280px;
    height: 200px;
    background: #eeeeee;
    text-align: center;
    line-height: 200px;
    margin-left: 10px;
}

.courses_detail_in {
    width: 700px;
}

.courses_detail_ps label {
    display: inline-block;
    margin-right: 7px;
    width: 100px;
    text-align: right;
}

.courses_box {
    padding-right: 30px;
}

.courses_detail_ps {
    margin-top: 20px;
}

.courses_detail_image .courses_detail_image_p1 {
    border: 1px solid #ccc;
    background: white;
}

.few_options_ul label {
    display: inline-block;
    width: 110px;
}

.few_options_ul li input {
    margin-right: 10px;
}

.teacher_and_students {
    display: inline-block;
    width: 350px;
    margin-left: 110px;
    margin-right: 10px;
}

.few_options_ul p,
li {
    margin-top: 10px;
}

.black_line {
    width: 100%;
    height: 1px;
    background: #ccc;
    margin-top: 20px;
}

.black_button {
    text-align: right;
    margin-top: 30px;
}

.sections_list span {
    display: inline-block;
    width: 300px;
    height: 40px;
    text-align: center;
}

.title_father {
    position: relative;
}

.title_bottom {
    position: absolute;
    left: 100px;
    bottom: 0;
}

.title_bottom op {
    display: inline-block;
    margin-right: 15px;
}

.list_number .number_two {
    margin-right: 40px;
}
.courses_button_right_button {
    background: #0138b1;
    color: white;
    height: 40px;
}
.icon-plus,
.icon-shezhi {
    color: #969896;
    font-size: 24px;
    font-weight: bold;
}
.pagination_center {
    text-align: center;
    margin-top: 40px;
}
.course_name {
    width: 62%;
}
.course_code {
    width: 62%;
}
/deep/ .el-dialog {
    min-width: 500px;
    width: 30%;
}
/deep/ .el-dialog__body {
    padding: 30px 20px 0 20px;
    color: #606266;
    font-size: 14px;
}
/deep/ .el-input--suffix .el-input__inner {
    padding-right: 6px;
    width: 109%;
}
/deep/ .el-input__inner {
    width: 109%;
}
/deep/ .el-input__suffix {
    right: -17px;
}
.demo-form-inline .margin_right {
    margin-right: 20px;
}
</style>
