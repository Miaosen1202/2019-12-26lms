<template>
    <div class="admit-learner-list">
        <el-row>
            <el-col :span="3">
                <div class="select-box">
                    <span @click="backToList">
                        <span class="backList">{{
                            $t("message.Messages.back")
                        }}</span>
                        <span class="iconfont icon-ai207" />
                    </span>
                    <div>
                        <el-tabs
                            v-model="activeName"
                            :tab-position="tabPosition"
                            @tab-click="certificationList"
                        >
                            <el-tab-pane
                                :label="$t('message.Certification.Overview')"
                                name="Overview"
                            />
                            <el-tab-pane
                                :label="$t('message.Certification.Learners')"
                                name="Learners"
                            />
                        </el-tabs>
                    </div>
                </div>
            </el-col>
            <el-col :span="20" style="margin-left: 1%">
                <div v-if="noLearnerList" class="no-learner-list">
                    <el-row>
                        <el-col :span="24">
                            <div class="write-certification-box">
                                <span class="write-certification">
                                    {{
                                        $t(
                                            "message.Certification.Certification_Test"
                                        )
                                    }}
                                </span>
                            </div>
                            <div class="no-learner-list-form">
                                <el-form>
                                    <el-form-item
                                        style="display: inline-block;width: 16%;"
                                    >
                                        <el-input
                                            v-model="value"
                                            class="search-input"
                                            prefix-icon="el-icon-search"
                                            :placeholder="
                                                $t('message.Common_search')
                                            "
                                            disabled="disabled"
                                        />
                                    </el-form-item>
                                    <el-form-item
                                        style="display: inline-block;width: 16%;"
                                    >
                                        <el-select
                                            v-model="value"
                                            :placeholder="
                                                $t('message.ANNOUNCE.ALL')
                                            "
                                            disabled="disabled"
                                        >
                                            <el-option
                                                label="区域一"
                                                value="shanghai"
                                            />
                                            <el-option
                                                label="区域二"
                                                value="beijing"
                                            />
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        :label="
                                            $t('message.Certification.Sort_by')
                                        "
                                        label-width="70px"
                                        class="no-list-sortby"
                                        style="display: inline-block;width: 25%;"
                                    >
                                        <el-select
                                            v-model="value"
                                            :placeholder="
                                                $t(
                                                    'message.Certification.Name_a_z'
                                                )
                                            "
                                            disabled="disabled"
                                        >
                                            <el-option
                                                label="区域一"
                                                value="shanghai"
                                            />
                                            <el-option
                                                label="区域二"
                                                value="beijing"
                                            />
                                        </el-select>
                                    </el-form-item>
                                    <el-button
                                        v-show="certificationStatus == 1"
                                        type="primary"
                                        class="nolist-button"
                                        style=""
                                        @click="addLearner"
                                    >
                                        <i class="iconfont icon-add" style="" />
                                        <span style="">{{
                                            $t("message.Certification.Enroll")
                                        }}</span>
                                    </el-button>
                                    <el-button
                                        v-if="certificationStatus == 1"
                                        class="retire-button"
                                        @click="certificationRetire"
                                    >
                                        <i class="iconfont icon-retire" />
                                        <span>{{
                                            $t("message.Certification.Retire")
                                        }}</span>
                                    </el-button>
                                    <el-button
                                        v-if="certificationStatus == 2"
                                        type="primary"
                                        class="publish-button"
                                        @click="certificationPublish"
                                    >
                                        <i class="iconfont icon-publish" />
                                        <span>{{ $t("message.Publish") }}</span>
                                    </el-button>
                                </el-form>
                            </div>
                            <div class="no-list-img ">
                                <img
                                    src="../../../../static/images/learner.png"
                                />
                                <p>
                                    {{
                                        $t(
                                            "message.Certification.Currently_there_are_no_learners_enrolled_for"
                                        )
                                    }}
                                </p>
                                <p @click="addLearner">
                                    {{
                                        $t(
                                            "message.Certification.Click_Enroll_to_get_a_started"
                                        )
                                    }}
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="learnerList" class="learner-list no-learner-list">
                    <el-row>
                        <el-col :span="24">
                            <div class="write-certification-box">
                                <span class="write-certification">
                                    {{
                                        $t(
                                            "message.Certification.Certification_Test"
                                        )
                                    }}
                                </span>
                            </div>
                            <div class="no-learner-list-form">
                                <el-form>
                                    <el-form-item
                                        style="display: inline-block;width: 16%;"
                                    >
                                        <el-input
                                            v-model="searchKey"
                                            class="search-input"
                                            prefix-icon="el-icon-search"
                                            :placeholder="
                                                $t('message.Common_search')
                                            "
                                            @input="seacherLearnerList"
                                        />
                                    </el-form-item>
                                    <el-form-item
                                        style="display: inline-block;width: 16%;"
                                    >
                                        <el-select
                                            v-model="status"
                                            :placeholder="
                                                $t('message.ANNOUNCE.ALL')
                                            "
                                            @change="selectStatus"
                                        >
                                            <el-option label="All" value="-1">
                                                {{ $t("message.ANNOUNCE.ALL") }}
                                            </el-option>
                                            <el-option
                                                label="Certified"
                                                value="2"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.Certified"
                                                    )
                                                }}
                                            </el-option>
                                            <el-option
                                                label="Assigned"
                                                value="0"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.Assigned"
                                                    )
                                                }}
                                            </el-option>
                                            <el-option
                                                label="Expired"
                                                value="3"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.Expired"
                                                    )
                                                }}
                                            </el-option>
                                            <el-option
                                                label="Unenrolled"
                                                value="4"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.Unenrolled"
                                                    )
                                                }}
                                            </el-option>
                                            <el-option
                                                label="PendingApproval"
                                                value="1"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.PendingApproval"
                                                    )
                                                }}
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        :label="
                                            $t('message.Certification.Sort_by')
                                        "
                                        label-width="70px"
                                        class="no-list-sortby"
                                        style="display: inline-block;width: 25%;"
                                    >
                                        <el-select
                                            v-model="orderBy"
                                            :placeholder="
                                                $t(
                                                    'message.Certification.Name_a_z'
                                                )
                                            "
                                            @change="selectOrder"
                                        >
                                            <el-option
                                                :label="
                                                    $t(
                                                        'message.Certification.Name_a_z'
                                                    )
                                                "
                                                value="0"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.Name_a_z"
                                                    )
                                                }}
                                            </el-option>
                                            <el-option
                                                :label="
                                                    $t(
                                                        'message.Certification.Name_z_a'
                                                    )
                                                "
                                                value="1"
                                            >
                                                {{
                                                    $t(
                                                        "message.Certification.Name_z_a"
                                                    )
                                                }}
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-button
                                        v-show="certificationStatus == 1"
                                        type="primary"
                                        class="nolist-button"
                                        style=""
                                        @click="addLearner"
                                    >
                                        <i class="iconfont icon-add" style="" />
                                        <span style="">{{
                                            $t("message.Certification.Enroll")
                                        }}</span>
                                    </el-button>
                                    <el-button
                                        v-show="certificationStatus == 1"
                                        class="retire-button"
                                        @click="certificationRetire"
                                    >
                                        <i class="iconfont icon-retire" />
                                        <span>{{
                                            $t("message.Certification.Retire")
                                        }}</span>
                                    </el-button>
                                    <el-button
                                        v-show="certificationStatus == 2"
                                        type="primary"
                                        class="publish-button"
                                        style="margin-right: 0px"
                                        @click="certificationPublish"
                                    >
                                        <i class="iconfont icon-publish" />
                                        <span>{{ $t("message.Publish") }}</span>
                                    </el-button>
                                </el-form>
                            </div>
                            <template>
                                <div
                                    v-loading="loading"
                                    class="syllabus_list"
                                    style="width: 80%"
                                >
                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            prop="fullName"
                                            label="Name"
                                            width="130"
                                        />
                                        <el-table-column
                                            prop="username"
                                            label="Login ID"
                                            width="130"
                                        />
                                        <el-table-column
                                            prop="status"
                                            label="Status"
                                            width="120"
                                            :formatter="statusType"
                                        />
                                        <el-table-column
                                            prop="enrollTime"
                                            :formatter="dateFormat"
                                            label="Enroll Date"
                                            width="130"
                                        />
                                        <el-table-column
                                            prop="completeTime"
                                            label="Certification Date"
                                            :formatter="dateFormat"
                                            width="150"
                                        />
                                        <el-table-column
                                            label="Operation"
                                            class="operation"
                                        >
                                            <template slot-scope="scope">
                                                <el-button
                                                    v-if="scope.row.fileUrl"
                                                    type="text"
                                                    size="small"
                                                    style="margin-left: 10px"
                                                    @click="
                                                        downLoad(
                                                            scope.row
                                                                .proofFileId
                                                        )
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Certification.Download_The_Proof"
                                                        )
                                                    }}
                                                </el-button>
                                                <el-button
                                                    v-if="
                                                        scope.row.status ===
                                                            0 ||
                                                            scope.row.status ===
                                                                1
                                                    "
                                                    type="text"
                                                    size="small"
                                                    @click="
                                                        markComplete(
                                                            scope.row.id
                                                        )
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Certification.Mark_Complete"
                                                        )
                                                    }}
                                                </el-button>
                                                <el-button
                                                    v-if="
                                                        scope.row.status === 0
                                                    "
                                                    type="text"
                                                    size="small"
                                                    @click="
                                                        unEnroll(scope.row.id)
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Certification.Unenroll"
                                                        )
                                                    }}
                                                </el-button>
                                                <el-button
                                                    v-if="
                                                        scope.row.status === 1
                                                    "
                                                    type="text"
                                                    size="small"
                                                    @click="
                                                        reject(scope.row.id)
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Certification.Reject"
                                                        )
                                                    }}
                                                </el-button>
                                                <el-button
                                                    v-if="
                                                        scope.row.status === 4
                                                    "
                                                    type="text"
                                                    size="small"
                                                    @click="
                                                        reEnroll(scope.row.id)
                                                    "
                                                >
                                                    {{
                                                        $t(
                                                            "message.Certification.ReEnroll"
                                                        )
                                                    }}
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </template>
                            <div class="pagination">
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :current-page="page"
                                    :total="totalCount"
                                    :page-size="pageSize"
                                    @current-change="handleCurrentChange"
                                />
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div class="personnel-dialog">
            <el-dialog
                :title="$t('message.People_add_people')"
                :visible.sync="courseUserAddDialog"
                width="40%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips">
                    {{ $t("message.People_add_people_by_tip") }}
                </p>
                <el-radio v-model="addPeopleCondition.addBy" label="LOGIN_ID">
                    Login ID
                </el-radio>
                <el-radio v-model="addPeopleCondition.addBy" label="SIS_ID">
                    SIS ID
                </el-radio>

                <!--提示-->

                <p class="personnel-tips" style="color: #a7a7a7;">
                    {{ $t("message.Common_example") }}: ijohn,mjack
                </p>

                <el-form
                    ref="addPeopleForm"
                    :model="addPeopleCondition"
                    :rules="addPeopleRules"
                >
                    <!-- 添加用户 loginId, sisId 输入框 -->
                    <el-form-item prop="value">
                        <el-input
                            v-model="addPeopleCondition.value"
                            type="textarea"
                            class="personnel-textarea"
                            resize="none"
                        />
                    </el-form-item>
                </el-form>
                <p class="personnel-tips" style="color: #a7a7a7;">
                    {{ $t("message.People_user_add_tip") }}
                </p>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="cancel">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button type="primary" @click="goConfirmAddUser">{{
                        $t("message.People_next")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 添加用户列表确认弹框 -->
        <div class="personnel-dialog">
            <el-dialog
                v-show="courseUserAddConfirmDialog"
                :title="$t('message.People_add_people')"
                :visible.sync="courseUserAddConfirmDialog"
                width="50%"
                height="auto"
            >
                <!--提示-->
                <p class="personnel-tips">
                    {{ $t("message.Certification.The_following_user") }}
                </p>
                <div class="personnel-eamil-box">
                    <el-table
                        :data="courseUserReadyAddedList"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="username"
                            :label="$t('message.People_username')"
                            width="180"
                        />
                        <el-table-column
                            prop="email"
                            :label="$t('message.People_email')"
                            width="180"
                        />
                        <el-table-column
                            prop="sisId"
                            :label="$t('message.People_sis_id')"
                        />
                        <el-table-column
                            prop="org.name"
                            :label="$t('message.people_institution')"
                        />
                    </el-table>
                </div>

                <span
                    slot="footer"
                    class="dialog-footer"
                    style="text-align: center;"
                >
                    <el-button @click="courseUserAddConfirmDialog = false">{{
                        $t("message.Common_cancel")
                    }}</el-button>
                    <el-button @click="goAddPeople">{{
                        $t("message.People_add_people_start_over")
                    }}</el-button>
                    <el-button
                        type="primary"
                        :disabled="courseUserReadyAddedList.length < 1"
                        @click="addPeople"
                        >{{ $t("message.Certification.Add_User") }}</el-button
                    >
                </span>
            </el-dialog>
        </div>
        <el-dialog
            :title="$t('message.Certification.Retiring_Certification')"
            :visible.sync="dialogVisibleCertificationRetiring"
            width="30%"
        >
            <span>{{
                $t(
                    "message.Certification.Retiring_a_Certification_makes_it_unavailable"
                )
            }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="dialogVisibleCertificationRetiring = false"
                    >{{ $t("message.Cancel") }}</el-button
                >
                <el-button
                    type="primary"
                    @click="dialogVisibleCertificationRetire"
                    >{{ $t("message.Certification.OK") }}</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from "moment";
import { formatDate, isYesterday } from "@/utils/date";
import utilMethods from "@/utils/utilMethods";

export default {
    name: "AdminLearnersList",
    filters: {
        formatDate(s) {
            const date = new Date(s);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        isYesterday(times) {
            return isYesterday(times);
        }
    },
    data() {
        return {
            activeName: "",
            tabPosition: "right",
            value: "",
            certificationStatus: "",
            certificationName: "",
            noLearnerList: false,
            learnerList: true,
            certificationId: "",
            pageSize: 5,
            totalCount: null,
            page: null,
            courseUserAddDialog: false,
            courseUserAddConfirmDialog: false,
            dialogVisibleCertificationRetiring: false,
            addPeopleCondition: {
                addBy: "LOGIN_ID",
                value: ""
            },
            userIds: [],
            courseUserReadyAddedList: [],
            tableData: [],
            searchKey: "",
            status: "",
            orderBy: "",
            addPeopleRules: {
                value: [
                    {
                        required: true,
                        message: this.$t("message.Common_rule_cannot_be_empty"),
                        trigger: "blur"
                    }
                ]
            },
            loading: true
        };
    },
    watch: {
        $route: {
            handler(newName) {
                this.activeName = newName.query.activeName;
                this.certificationId = newName.query.certificationId;
            },
            deep: true,
            immediate: true
        },
        courseUserAddDialog: {
            handler(newName, oldName) {
                console.log(newName, oldName);
                if (newName === false) {
                    this.$refs.addPeopleForm.resetFields();
                }
                // this.activeName = newName.query.activeName;
                // this.certificationId = newName.query.certificationId;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.learnerLists();
        this.certificationDetail();
        // this.$store.commit( 'setId',(this.certificationStatus))
        // console.log(this.certificationStatus)
    },
    methods: {
        // 返回列表
        backToList() {
            this.$router.push({
                path: "/adminHomePage/adminCertificationList"
            });
        },
        // tab切换
        certificationList(val) {
            if (Number(val.index) === 0) {
                this.$router.push({
                    path:
                        "/adminHomePage/adminCertificationDetailLeft/adminCertificationDetail",
                    query: {
                        activeName: this.activeName,
                        certificationId: this.certificationId,
                        certificationStatus: this.certificationStatus,
                        certificationName: this.certificationName
                    }
                });
            }
            if (Number(val.index) === 1) {
                this.$router.push({
                    path:
                        "/adminHomePage/adminCertificationDetailLeft/adminCertificationLearnersList",
                    query: {
                        activeName: this.activeName,
                        certificationId: this.certificationId,
                        certificationStatus: this.certificationStatus,
                        certificationName: this.certificationName
                    }
                });
            }
        },
        // 请求详情页的接口
        async certificationDetail() {
            const params = {
                data: this.certificationId
            };
            const result = await this.$getData(
                "/certification/get",
                params,
                "get"
            );
            if (result.data.code === 200) {
                this.certificationStatus = Number(result.data.entity.status);
                this.certificationName = result.data.entity.name;
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 学习者列表的请求
        async learnerLists() {
            console.log(this.certificationStatus);
            const params = {
                certificationId: this.certificationId,
                searchKey: this.searchKey,
                status: this.status,
                // issuer: issuers,
                orderBy: this.orderBy,
                pageSize: this.pageSize,
                pageIndex: this.page
            };
            const result = await this.$getData(
                "/certificationUser/pageList",
                params,
                "get"
            );
            if (result.data.code === 200) {
                this.loading = false;
                this.tableData = result.data.entity.list;
                this.totalCount = Number(result.data.entity.total);
                if (
                    Number(this.tableData.length) === 0 &&
                    this.searchKey === "" &&
                    this.status === "" &&
                    this.orderBy === ""
                ) {
                    this.noLearnerList = true;
                    this.learnerList = false;
                } else {
                    this.noLearnerList = false;
                    this.learnerList = true;
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        goConfirmAddUser() {
            this.$refs.addPeopleForm.validate(valid => {
                if (valid) {
                    const inputVal = this.addPeopleCondition.value.replace(
                        /\n/g,
                        ","
                    );
                    if (inputVal === "" || inputVal.trim() === "") {
                        return;
                    }
                    const param = {};
                    param[
                        this.addPeopleCondition.addBy === "LOGIN_ID"
                            ? "usernames"
                            : "sisIds"
                    ] = inputVal;

                    this.$http
                        .get(`${process.env.NODE_ENV}/user/list`, {
                            params: param
                        })
                        .then(result => {
                            if (result.data.code === 200) {
                                this.courseUserAddDialog = false;
                                this.courseUserAddConfirmDialog = true;
                                this.courseUserReadyAddedList =
                                    result.data.entity;
                                const usersId = [];
                                this.addPeopleCondition.value = "";
                                this.courseUserReadyAddedList.forEach(item => {
                                    usersId.push(item.id);
                                });
                                this.userIds = usersId;
                            } else {
                                this.$message.error(this.data.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
            });
        },
        goAddPeople() {
            this.courseUserAddConfirmDialog = false;
            this.courseUserAddDialog = true;
            if (this.$refs.addPeopleForm) {
                this.$refs.addPeopleForm.resetFields();
            }
            this.courseUserReadyAddedList = [];
        },
        async addPeople() {
            const params = {
                certificationId: this.certificationId,
                userIds: this.userIds
            };
            const result = await this.$getData(
                "/certificationUser/add",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.courseUserAddConfirmDialog = false;
                this.learnerLists();
                if (Number(result.data.message) === 0) {
                    this.$message({
                        message: this.$t(
                            "message.Certification.The_learner_has_been_registered"
                        ),
                        type: "error"
                    });
                } else {
                    this.$message({
                        message: this.$t(
                            "message.Certification.Add_user_successfully"
                        ),
                        type: "success"
                    });
                }
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 日期格式的转换
        dateFormat(row, column) {
            const date = row[column.property];
            if (date === undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        // input输入框的搜索
        seacherLearnerList() {
            this.learnerLists();
        },
        selectStatus() {
            this.learnerLists();
        },
        selectOrder() {
            this.learnerLists();
        },
        statusType(val) {
            if (val.status === 0) {
                return "Assigned";
            }
            if (val.status === 1) {
                return "PendingApproval";
            }
            if (val.status === 2) {
                return "Certified";
            }
            if (val.status === 3) {
                return "Expired";
            }
            if (val.status === 4) {
                return "Unenrolled";
            }
            return false;
        },
        // 认证过期
        async certificationRetire() {
            this.dialogVisibleCertificationRetiring = true;
        },
        async dialogVisibleCertificationRetire() {
            const params = {
                id: this.certificationId,
                status: 2,
                name: this.certificationName
            };
            const result = await this.$getData(
                "/certification/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.certificationDetail();
                this.dialogVisibleCertificationRetiring = false;
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_retired_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        // 认证发布
        async certificationPublish() {
            const params = {
                id: this.certificationId,
                status: 1,
                name: this.certificationName
            };
            const result = await this.$getData(
                "/certification/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.certificationDetail();
                this.$store.commit("setId", this.certificationStatus);
                console.log(this.certificationStatus);
                this.$message({
                    message: this.$t(
                        "message.Certification.Certification_published_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async markComplete(id) {
            const params = {
                id,
                opType: 1
            };
            const result = await this.$getData(
                "/certificationUser/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.learnerLists();
                this.$message({
                    message: this.$t(
                        "message.Certification.Mark_completed_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async unEnroll(id) {
            const params = {
                id,
                opType: 3
            };
            const result = await this.$getData(
                "/certificationUser/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.learnerLists();
                this.$message({
                    message: this.$t(
                        "message.Certification.Unenrolled_Successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async reject(id) {
            const params = {
                id,
                opType: 2
            };
            const result = await this.$getData(
                "/certificationUser/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.learnerLists();
                this.$message({
                    message: this.$t(
                        "message.Certification.Rejected_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async reEnroll(id) {
            const params = {
                id,
                opType: 4
            };
            const result = await this.$getData(
                "/certificationUser/modify",
                params,
                "post"
            );
            if (result.data.code === 200) {
                this.learnerLists();
                this.$message({
                    message: this.$t(
                        "message.Certification.ReEnrolled_successfully"
                    ),
                    type: "success"
                });
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        async downLoad(id) {
            const url = `${process.env.NODE_ENV}/userFile/download/direct?id=${id}`;
            utilMethods.downloadFile(url);
        },
        // 背景图片
        getAbsolutePath(relativePath, width, height) {
            if (typeof width === "undefined" && typeof height === "undefined") {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        addLearner() {
            this.courseUserAddDialog = true;
        },
        cancel() {
            this.courseUserAddDialog = false;
            if (this.$refs.addPeopleForm) {
                this.$refs.addPeopleForm.resetFields();
            }
        },
        handleClick(row) {
            console.log(row);
        },
        handleCurrentChange(val) {
            this.page = Number(val);
            this.learnerLists();
        }
    }
};
</script>

<style scoped lang="less">
.admit-learner-list {
    .select-box {
        margin-top: 33%;
    }

    .backList {
        font-size: 23px;
        font-family: ArialMT;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: inline-block;
        cursor: pointer;
        margin-top: 7px;
    }
    .icon-ai207 {
        font-size: 25px;
        cursor: pointer;
    }

    /deep/ .el-tabs--right .el-tabs__header.is-right {
        float: right;
        margin-bottom: 0;
        width: 100%;
        margin-top: 5%;
    }

    /deep/ .is-active {
        background-color: #cfd7ef;
    }

    /deep/ .el-tabs__item {
        height: auto;
        line-height: normal;
        font-size: 15px;
        padding-top: 10%;
        padding-bottom: 7%;
    }

    /deep/ .el-tabs__active-bar .is-right {
        height: 12%;
    }

    .no-learner-list {
        .write-certification-box {
            margin-top: 3.5%;

            .write-certification {
                font-size: 32px;
                font-family: Arial-BoldMT;
                color: rgba(51, 51, 51, 1);
            }
        }

        .nolist-button {
            display: inline-block;
            vertical-align: -3px;
            padding: 8px 13px;
            float: right;
            margin-right: 20%;

            span {
                font-size: 17px;
                position: relative;
                top: -2.5px;
            }
        }

        .icon-add {
            font-size: 22px;
            margin-top: 5px;
        }

        .icon-retire {
            font-size: 22px;
            margin-top: 5px;
        }
        .icon-publish {
            font-size: 22px;
            margin-top: 5px;
        }

        .retire-button {
            display: inline-block;
            vertical-align: -3px;
            padding: 8px 13px;
            float: right;
            margin-right: -28%;
            width: 16%;
            text-align: center;
            span {
                font-size: 17px;
                position: relative;
                top: -2.5px;
            }
        }
        .publish-button {
            display: inline-block;
            vertical-align: -3px;
            padding: 8px 13px;
            float: right;
            /*margin-right: -28%;*/
            width: 16%;
            text-align: center;
            span {
                font-size: 17px;
                margin-top: 3px;
            }
        }

        .no-learner-list-form {
            margin-top: 2%;
        }

        .no-list-img {
            width: 100%;
            height: 100%;
            text-align: center;

            img {
                width: 220px;
                height: 183px;
                margin-top: 4%;
            }

            p:nth-of-type(1) {
                font-size: 25px;
                font-family: ArialMT;
                color: rgba(102, 102, 102, 1);
                margin-top: 50px;
            }

            p:nth-of-type(2) {
                font-size: 27px;
                font-family: ArialMT;
                color: rgba(14, 56, 177, 1);
                margin-top: 30px;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    .personnel-tips {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .operation {
        /deep/.el-button--small {
            cursor: pointer;
        }
    }
    .pagination {
        width: 80%;
        text-align: center;
        margin-top: 2%;
    }
}
</style>
