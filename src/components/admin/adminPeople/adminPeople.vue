<template>
    <div class="adminpeople_box">
        <!--eslint-disable-->
        <p>
            <span class="input_father"
                ><i class="iconfont icon-sousuo"/>
                <input
                    v-model="q"
                    type="text"
                    class="search_people"
                    :placeholder="$t('message.Search_People')"
                    @keyup.enter="query"/></span
            ><span class="people_right">
                <el-button class="adminpeople_blue" @click="addUser"
                    ><i class="iconfont icon-add" />{{
                        $t("message.admin_people")
                    }}</el-button
                ></span
            >
        </p>
        <!--<p v-show="tableDataVisible" class="p_center">
            <img src="static/images/no_people.png" alt="" />
        </p>-->
        <div v-show="!tableDataVisible" class="syllabus_list">
            <el-table
                :data="tableData"
                border
                style="width: 100%; margin-top:20px"
            >
                <el-table-column
                    prop="username"
                    :label="$t('message.Login_ID')"
                />
                <el-table-column
                    prop="email"
                    :label="$t('message.admin_email')"
                />
                <el-table-column
                    prop="sisId"
                    :label="$t('message.admin_sis_id')"
                />
                <el-table-column
                    prop="lastLoginTime"
                    :formatter="formatterDate"
                    :label="$t('message.admin_last_login')"
                />
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleViewClick(scope.row)"
                        >
                            <i class="iconfont icon-xinfeng" />
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="handleEditClick(scope.row)"
                        >
                            <i class="iconfont icon-edit" />
                        </el-button>
                        <el-button
                            v-if="userInfoData.id != scope.row.id"
                            type="text"
                            size="small"
                            @click="handleDeleteClick(scope.row)"
                        >
                            <i class="iconfont icon-shanchu1" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination_center"
                background
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :prev-text="$t('message.Common_prev')"
                :next-text="$t('message.Common_next')"
                layout="prev, pager, next, jumper"
                :total="total"
                @current-change="handleCurrentChange"
                @prev-click="handlePrevClick"
                @next-click="handleNextClick"
            />
        </div>
        <el-dialog
            :title="$t('message.admin_Add_a_New_User')"
            :visible.sync="dialogAddFormVisible"
        >
            <p />
            <el-form
                ref="addnewuser"
                :model="addForm"
                :rules="rules"
                label-width="140px"
                class="add_a_new_user"
            >
                <el-form-item
                    :label="$t('message.admin_firstName')"
                    prop="firstName"
                    class="addpeople"
                >
                    <el-input
                        v-model="addForm.firstName"
                        class="Add_a_New_User_input"
                        autocomplete="off"
                        maxlength="60"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.admin_lastName')"
                    prop="lastName"
                    class="addpeople"
                >
                    <el-input
                        v-model="addForm.lastName"
                        class="Add_a_New_User_input"
                        autocomplete="off"
                        maxlength="50"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.admin_sis_id')"
                    class="addpeople"
                >
                    <el-input
                        v-model="addForm.sisId"
                        class="Add_a_New_User_input"
                        autocomplete="off"
                        maxlength="60"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.admin_loginId')"
                    prop="loginId"
                    class="addpeople"
                >
                    <el-input
                        v-model="addForm.loginId"
                        class="Add_a_New_User_input"
                        minlength="1"
                        maxlength="50"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.admin_email')"
                    class="addpeople"
                    prop="email"
                >
                    <el-input
                        v-model="addForm.email"
                        class="Add_a_New_User_input"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.Subaccount')"
                    class="addpeople"
                    prop="addOrgId"
                >
                    <el-select
                        v-model="addForm.addOrgId"
                        class="Add_a_New_User_input"
                        :placeholder="
                            $t('message.Common_please_select') +
                                ' ' +
                                $t('message.admin_subOrg')
                        "
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id + '_' + item.treeId"
                        />
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddForm">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button type="primary" @click="addSubmit">
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('message.admin_Edit_User')"
            :visible.sync="dialogEditFormVisible"
        >
            <el-form
                ref="ruleForm"
                :model="editForm"
                :rules="rules"
                label-width="140px"
            >
                <el-form-item
                    :label="$t('message.admin_firstName')"
                    prop="firstName"
                >
                    <el-input
                        v-model="editForm.firstName"
                        autocomplete="off"
                        maxlength="60"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.admin_lastName')"
                    prop="lastName"
                >
                    <el-input
                        v-model="editForm.lastName"
                        autocomplete="off"
                        maxlength="60"
                    />
                </el-form-item>
                <el-form-item :label="$t('message.admin_nickname')">
                    <el-input v-model="editForm.nickname" autocomplete="off" />
                </el-form-item>
                <el-form-item :label="$t('message.admin_email')">
                    <el-input v-model="editForm.email" autocomplete="off" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditForm">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button type="primary" @click="editSubmit('ruleForm')">
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
        <!--eslint-disable-->
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import utilMethods from "@/utils/utilMethods";
/*eslint-disable*/
export default {
    data() {
        const userValidate = (rule, value, callback) => {
            if (value == "") {
                callback(new Error(this.$t("message.pls_enter_pswd_again")));
            } else {
                const reg = /^[0-9a-zA-Z_]{1,}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(
                        new Error(
                            this.$t(
                                "message.only_letters_numbers_and_downline_are_acceptable"
                            )
                        )
                    );
                }
            }
        };
        return {
            tableDataVisible: true,
            q: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            dialogAddFormVisible: false,
            dialogEditFormVisible: false,
            addForm: {
                firstName: "",
                lastName: "",
                sisId: "",
                loginId: "",
                email: "",
                addOrgId: "",
                orgTreeId: ""
            },
            editForm: {
                id: "",
                firstName: "",
                lastName: "",
                nickname: "",
                loginId: "",
                email: ""
            },
            options: [],
            formLabelWidth: "15%",
            rules: {
                firstName: [
                    {
                        required: true,
                        message: this.$t("message.firstName"),
                        trigger: "blur"
                    }
                ],
                lastName: [
                    {
                        required: true,
                        message: this.$t("message.lastName"),
                        trigger: "blur"
                    }
                ],
                loginId: [
                    {
                        required: true,
                        message: this.$t("message.loginId"),
                        trigger: "blur"
                    },
                    { validator: userValidate, trigger: "blur" }
                ],
                addOrgId: [
                    {
                        required: true,
                        message: this.$t("message.firstName"),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: { ...mapGetters(["userInfoData"]) },
    mounted() {
        this.userList();
    },
    methods: {
        formatterDate(row, column) {
            if (row.lastLoginTime) {
                return utilMethods.formatDate(row.lastLoginTime);
            }
        },
        handleEditClick(row) {
            this.editForm.id = row.id;
            this.editForm.firstName = row.firstName;
            this.editForm.lastName = row.lastName;
            this.editForm.nickname = row.nickname;
            this.editForm.email = row.email;
            this.dialogEditFormVisible = true;
        },
        handleViewClick(row) {
            this.$router.push({
                path: "peopleDetail",
                query: { userId: row.id }
            });
        },
        handleDeleteClick(row) {
            this.$confirm(this.$t("message.admin_people_remove"), "", {
                confirmButtonText: this.$t("message.Common_confirm"),
                cancelButtonText: this.$t("message.Common_cancel"),
                type: "warning"
            })
                .then(() => {
                    this.deletes(row);
                })
                .catch(() => {});
        },
        async deletes(row) {
            const result = await this.$getData(
                "/adminUser/deletes",
                { id: row.id },
                "post"
            );
            if (result.data.code == 200) {
                this.userList();
            } else {
                this.$message.error(result.data.message);
            }
        },
        closeEditForm() {
            this.dialogEditFormVisible = false;
        },
        closeAddForm() {
            this.dialogAddFormVisible = false;
            this.$refs.addnewuser.resetFields();
        },
        addUser() {
            this.dialogAddFormVisible = true;
            this.showOrgSelect();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.userList();
        },
        handlePrevClick(val) {
            this.currentPage = val;
            this.userList();
        },
        handleNextClick(val) {
            this.currentPage = val;
            this.userList();
        },
        query() {
            this.currentPage = 1;
            this.userList();
        },
        // 获取组织机构下拉列表
        showOrgSelect() {
            this.$http
                .get(`${process.env.NODE_ENV}/org/select/query`)
                .then(res => {
                    if (res.data.code === 200) {
                        this.options = res.data.entity;
                        this.addForm.addOrgId = `${this.userInfoData.orgId}_${this.userInfoData.orgTreeId}`;
                        // this.addForm.orgId = this.options[0].id + '_' + this.options[0].treeId
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 查询分页数据获取
        userList() {
            const params = {};
            params.q = this.q;
            params.pageSize = this.pageSize;
            params.pageIndex = this.currentPage;
            this.$http
                .get(`${process.env.NODE_ENV}/adminUser/pageList`, {
                    params
                })
                .then(res => {
                    if (res.data.code === 200) {
                        this.tableData = res.data.entity.list;
                        if (this.tableData.length > 0) {
                            this.tableDataVisible = false;
                            this.total = res.data.entity.total;
                            this.currentPage = res.data.entity.pageIndex;
                        } else {
                            this.tableDataVisible = true;
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 添加用户信息

        addSubmit() {
            const data = this.addForm;
            if (data.addOrgId) {
                // 9_0001000100070001
                const idTree = data.addOrgId.split("_");
                data.orgId = idTree[0];
                data.orgTreeId = idTree[1];
            }
            this.$refs.addnewuser.validate(async valid => {
                if (valid) {
                    this.$http
                        .post(`${process.env.NODE_ENV}/adminUser/add`, data)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.dialogAddFormVisible = false;
                                this.userList();
                                this.$refs.addnewuser.resetFields();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    return false;
                }
            });
        },
        // 添加用户信息
        editSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const data = this.editForm;
                    this.$http
                        .post(`${process.env.NODE_ENV}/adminUser/modify`, data)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.dialogEditFormVisible = false;
                                this.userList();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
/*eslint-disable*/
</script>

<style scoped="">
.icon-xinfeng,
.icon-edit,
.icon-shanchu1 {
    font-size: 24px;
    color: #969896;
}
.adminpeople {
    padding-right: 30px;
}

.adminpeople p .search_people {
    width: 200px;
}

.adminpeople p {
    position: relative;
}

.people_right {
    position: absolute;
    right: 0;
    top: 14.5px;
}

.icon-sousuo {
    position: relative;
    left: 30px;
    z-index: 999;
}

.icon-add {
    position: relative;
    right: 7px;
    top: 2px;
}

.p_center {
    text-align: center;
    margin-top: 20px;
}

.adminpeople_blue {
    background: #0e38b1;
    color: white;
    margin-top: 2px;
    line-height: 13px;
    margin-left: 232px;
}

.adminpeople_blue i {
    font-size: 20px;
    position: relative;
    top: 3px;
}

.input_father i {
    position: relative;
    top: 2px;
    left: 30px;
}
.input_father {
    text-align: left;
    margin-left: -20px;
}

.search_people {
    width: 200px;
    text-indent: 40px;
    height: 40px;
}

.people_mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
}

.add_account_alert {
    width: 500px;
    height: 450px;
    background: #fff;
    position: absolute;
    left: 50%;

    top: 50%;
    margin-left: -250px;
    padding: 20px;
    margin-top: -225px;
    border-radius: 3px;
}

.add_account_alert p {
    margin: 15px 0;
    margin-left: 40px;
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
    top: 0px;
}

.add_account_alert p label {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
}

.add_account_alert p .add_account_alert_right {
    width: 250px;
}

.add_account_alert_blue {
    background: #0e38b1;
    color: white;
}

.img_search {
    text-align: center;
    margin-top: 250px;
}

.messiage_list ul li {
    height: 40px;
    border: 1px solid #eee;
    line-height: 40px;
}

.messiage_list ul li b,
span {
    display: inline-block;
    width: 400px;
    text-align: center;
}

.messiage_list ul li span {
    border-right: 1px solid #eee;
}

.page_center {
    text-align: center;
}

.messiage_list ul .none_bottom {
    border-bottom: none;
}

.icon-yonghutouxiang {
    margin-right: 10px;
}

.page_center i {
    display: inline-block;
    border: 1px solid #ccc;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
}

.page_center {
    margin-top: 25px;
}

.page_center span {
    margin-right: 15px;
}

.people_group h3 {
    position: relative;
}

.group_set {
    position: absolute;
    right: 40px;
    top: 0px;
}

.people_group_p1 {
    width: 1200px;
    margin-top: 20px;
}
.pagination_center {
    text-align: center;
    margin-top: 20px;
}
/*/deep/ .el-dialog{
    width: 500px;
    min-width: 500px;
  }
.Add_a_New_User_input{
  width: 100%;
}*/
/*.addpeople .Add_a_New_User_input{
  width: 330px;
}
  /deep/ .el-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 230px;

  }
  /deep/ .el-dialog__body {
    padding: 30px 20px 0 20px;
    color: #606266;
    font-size: 14px;
  }*/
/*.add_a_new_user{
    margin-left: 70px;
  }*/
/deep/ .el-dialog {
    width: 550px;
    min-width: 450px;
}
.Add_a_New_User_input {
    width: 300px !important;
}
.adminpeople_box {
    padding-right: 30px;
}
.iconfont.icon-xinfeng {
    color: #666666;
}
.iconfont.icon-edit {
    color: #666666;
}
.iconfont.icon-shanchu1 {
    color: #666666;
}
</style>
