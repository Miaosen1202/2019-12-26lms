<template>
    <div class="terms">
        <!--eslint-disable-->
        <!--学期列表-->
        <h3 class="h3_bloder">
            {{ $t("message.Term_Detail") }}
        </h3>
        <span class="terms_right"
            ><el-button class="terms_bu" @click="openAdd"
                ><i class="iconfont icon-add" />{{
                    $t("message.Create_Term")
                }}</el-button
            ></span
        >
        <ul v-for="(item, itemIndex) in items" :key="itemIndex">
            <li class="item_name">
                <input v-model="id" type="hidden" />
                <p style="line-height: 1.5">
                    <span> {{ item.name }}</span>
                </p>
                <p class="Term_Runs_From">
                    {{ $t("message.Term_Runs_From") }}
                </p>
                <p>
                    <span v-if="item.startTime == null">{{
                        $t("message.whenever")
                    }}</span>
                    <span v-else>{{ item.startTime | formatDate }}</span>
                    <span class="center">{{ $t("message.To") }}</span>
                    <span v-if="item.endTime == null">{{
                        $t("message.whenever")
                    }}</span>
                    <span v-else>{{ item.endTime | formatDate }}</span>
                </p>
            </li>
            <li>
                <p>
                    <span>{{ $t("message.SIS_ID") }}:</span
                    ><span>{{ item.sisId }}</span>
                </p>
                <p class="Term_Runs_From">
                    {{ $t("message.Students_Can_Access_From") }}
                </p>
                <p>
                    <span v-if="item.studentStartTime == null">{{
                        $t("message.Term_Start")
                    }}</span>
                    <span v-else>{{ item.studentStartTime | formatDate }}</span>
                    <span class="center">{{ $t("message.To") }}</span>
                    <span v-if="item.studentEndTime == null">{{
                        $t("message.Term_End")
                    }}</span>
                    <span v-else>{{ item.studentEndTime | formatDate }}</span>
                </p>
            </li>
            <li>
                <p>
                    <span>{{ item.coursesCount }}</span
                    ><span>{{ $t("message.courses") }}</span>
                </p>
                <p class="Term_Runs_From">
                    {{ $t("message.Teachers_Can_Access_From") }}
                </p>
                <p>
                    <span v-if="item.teacherStartTime == null">{{
                        $t("message.whenever")
                    }}</span>
                    <span v-else>{{ item.teacherStartTime | formatDate }}</span>
                    <span class="center">{{ $t("message.To") }}</span>
                    <span v-if="item.teacherEndTime == null">{{
                        $t("message.Term_End")
                    }}</span>
                    <span v-else>{{ item.teacherEndTime | formatDate }}</span>
                </p>
            </li>
            <li>
                <p><span /></p>
                <p class="Term_Runs_From">
                    {{ $t("message.TAs_Can_Access_From") }}
                </p>
                <p>
                    <span v-if="item.taStartTime == null">{{
                        $t("message.whenever")
                    }}</span>
                    <span v-else>{{ item.taStartTime | formatDate }}</span>
                    <span class="center">{{ $t("message.To") }}</span>
                    <span v-if="item.taEndTime == null">{{
                        $t("message.Term_End")
                    }}</span>
                    <span v-else>{{ item.taEndTime | formatDate }}</span>
                </p>
                <span
                    ><el-button @click="openDelete(item)">{{
                        $t("message.Delete")
                    }}</el-button
                    ><el-button @click="openEdit(item)">{{
                        $t("message.Edit")
                    }}</el-button></span
                >
            </li>
        </ul>
        <!--添加、编辑学期弹框-->
        <el-dialog
            :title="$t('message.addOrEditTitle')"
            :visible.sync="isCreate"
            width="40%"
        >
            <!--start: 表单内容-->
            <el-form
                ref="createForm"
                :model="createForm"
                label-width="200px"
                :rules="addOrEditRule"
            >
                <el-input v-model="createForm.id" type="hidden" />
                <el-form-item
                    :label="$t('message.Term_Name')"
                    prop="name"
                    class="label_left"
                >
                    <el-input
                        v-model="createForm.name"
                        class="terms_elastic_input"
                        minlength="1"
                        maxlength="50"
                        :popper-class="inputtable"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.SIS_ID')"
                    prop="id"
                    class="label_left"
                >
                    <el-input
                        v-model="createForm.sisId"
                        class="terms_elastic_input"
                        :popper-class="inputtable"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.Term_Runs_From')"
                    class="timetable"
                    prop="termTime"
                >
                    <div class="block">
                        <el-date-picker
                            v-model="createForm.termTime"
                            :popper-class="timetable"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            :range-separator="$t('message.To')"
                            align="right"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    :label="$t('message.Students_Can_Access_From')"
                    class="timetable"
                    prop="studentTime"
                >
                    <div class="block">
                        <el-date-picker
                            v-model="createForm.studentTime"
                            :popper-class="timetable"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            :range-separator="$t('message.To')"
                            align="right"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    :label="$t('message.Teachers_Can_Access_From')"
                    class="timetable"
                    prop="teacherTime"
                >
                    <div class="block">
                        <el-date-picker
                            v-model="createForm.teacherTime"
                            :popper-class="timetable"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            :range-separator="$t('message.To')"
                            align="right"
                        />
                    </div>
                </el-form-item>
                <el-form-item
                    :label="$t('message.TAs_Can_Access_From')"
                    class="timetable"
                    prop="tasTime"
                >
                    <div class="block">
                        <el-date-picker
                            v-model="createForm.tasTime"
                            :popper-class="timetable"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            :range-separator="$t('message.To')"
                            align="right"
                        />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancelAdd(createForm)">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button
                        v-if="postType == 'add'"
                        type="primary"
                        @click="onAddFrom(createForm)"
                    >
                        {{ $t("message.submit") }}
                    </el-button>
                    <el-button
                        v-else
                        type="primary"
                        @click="onEditFrom(createForm)"
                    >
                        {{ $t("message.submit") }}
                    </el-button>
                </el-form-item>
            </el-form>
            <!--end: 表单内容-->
        </el-dialog>
        <!--删除学期弹框-->
        <el-dialog
            :title="$t('message.Delete_Term')"
            :visible.sync="isDelete"
            width="40%"
        >
            <div class="terms_elastic_alerts">
                <p>{{ $t("message.Delete_Term_Confirm") }}</p>
                <p>
                    <el-button @click="cancelDelete">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button @click="confirmDelete">
                        {{ $t("message.Delete") }}
                    </el-button>
                </p>
            </div>
        </el-dialog>
        <!--删除学期时，还有课程的提示弹框-->
        <el-dialog
            :title="$t('message.Delete_Term')"
            :visible.sync="isDeleteOfCourse"
            width="40%"
        >
            <div class="terms_elastic_alert">
                <p>
                    <i class="iconfont icon-warning-circle-fill" />{{
                        $t("message.Delete_Term_Confirm_Course")
                    }}
                </p>
            </div>
        </el-dialog>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import { formatDate } from "@/utils/date.js";

export default {
    filters: {
        formatDate(time) {
            const data = new Date(time);
            return formatDate(data, "yyyy-MM-dd hh:mm");
        }
    },
    data() {
        return {
            timetable: "timetable",
            inputtable: "inputtable",
            items: [],
            isCreate: false,
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            createForm: {
                name: "",
                id: "",
                sisId: "",
                coursesCount: "",
                termTime: [],
                studentTime: [],
                teacherTime: [],
                tasTime: []
            },
            isDelete: false,
            isDeleteOfCourse: false,
            id: 0,
            addOrEditTitle: this.$t("message.Create_Term"),
            postType: "add",
            addOrEditRule: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Name_Valid"),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getTermList();
    },

    methods: {
        async getTermList() {
            const result = await this.$getData("/term/list", "get");
            if (result.data.code == 200) {
                const tempTerms = result.data.entity;
                tempTerms.map(item => {
                    const { termConfigs } = item;
                    if (termConfigs) {
                        termConfigs.map(item1 => {
                            if (item1) {
                                if (item1.role_id == 2) {
                                    item.teacherStartTime = item1.start_time;
                                    item.teacherEndTime = item1.end_time;
                                } else if (item1.role_id == 3) {
                                    item.taStartTime = item1.start_time;
                                    item.taEndTime = item1.end_time;
                                } else if (item1.role_id == 4) {
                                    item.studentStartTime = item1.start_time;
                                    item.studentEndTime = item1.end_time;
                                }
                            }
                        });
                    }
                });
                this.items = tempTerms;
            }
        },
        async onAddFrom(createForm) {
            this.$refs.createForm.validate(async valid => {
                if (valid) {
                    const postJs = this.getPostJs(createForm);
                    const result = await this.$getData(
                        "/term/add",
                        postJs,
                        "post"
                    );
                    if (result.data.code == 200) {
                        this.isCreate = false;
                        this.getTermList();
                    } else {
                        this.$message({
                            message: result.data.message,
                            type: "error"
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        getStartTime(time) {
            if (time != null && time.length > 0) return time[0].getTime();
            return null;
        },
        getEndTime(time) {
            if (time != null && time.length > 1) return time[1].getTime();
            return null;
        },
        openDelete(item) {
            if (item.coursesCount > 0) {
                this.isDeleteOfCourse = true;
            } else {
                this.isDelete = true;
                this.id = item.id;
            }
        },
        async confirmDelete() {
            const result = await this.$getData(
                "/term/deletes",
                { id: this.id },
                "post"
            );
            if (result.data.code == 200) {
                this.isDelete = false;
                this.getTermList();
            } else {
                this.$message({
                    message: result.data.message,
                    type: "error"
                });
            }
        },
        openEdit(item) {
            this.addOrEditTitle = this.$t("message.Edit_Term");
            this.postType = "edit";
            this.$set(item, "termTime", [
                new Date(item.startTime),
                new Date(item.endTime)
            ]);
            this.$set(item, "studentTime", [
                new Date(item.studentStartTime),
                new Date(item.studentEndTime)
            ]);
            this.$set(item, "tasTime", [
                new Date(item.taStartTime),
                new Date(item.taEndTime)
            ]);
            this.$set(item, "teacherTime", [
                new Date(item.teacherStartTime),
                new Date(item.teacherEndTime)
            ]);
            // this.createForm = item
            setTimeout(() => {
                this.createForm = {
                    name: item.name,
                    id: item.id,
                    sisId: item.id,
                    coursesCount: item.coursesCount,
                    termTime: item.termTime,
                    studentTime: item.studentTime,
                    teacherTime: item.teacherTime,
                    tasTime: item.tasTime
                };
                this.isCreate = true;
            }, 100);
        },
        openAdd() {
            this.addOrEditTitle = this.$t("message.Create_Term");
            this.isCreate = true;
            (this.postType = "add"),
                (this.createForm = {
                    name: "",
                    id: "",
                    sisId: "",
                    coursesCount: "",
                    termTime: [],
                    studentTime: [],
                    teacherTime: [],
                    tasTime: []
                });
        },
        cancelDelete() {
            this.isDelete = false;
        },
        cancelAdd(createForm) {
            // this.$refs.createForm.resetFields();
            this.isCreate = false;
        },
        async onEditFrom(createForm) {
            this.$refs.createForm.validate(async valid => {
                if (valid) {
                    const postJs = this.getPostJs(createForm);
                    postJs.id = createForm.id;
                    const result = await this.$getData(
                        "/term/modify",
                        postJs,
                        "post"
                    );
                    if (result.data.code == 200) {
                        this.isCreate = false;
                        this.getTermList();
                    } else {
                        this.$message({
                            message: result.data.message,
                            type: "error"
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        getPostJs(createForm) {
            const postJs = {
                name: createForm.name,
                sisId: createForm.sisId,
                termStartTime: this.getStartTime(createForm.termTime),
                termEndTime: this.getEndTime(createForm.termTime),
                studentStartTime: this.getStartTime(createForm.studentTime),
                studentEndTime: this.getEndTime(createForm.studentTime),
                teacherStartTime: this.getStartTime(createForm.teacherTime),
                teacherEndTime: this.getEndTime(createForm.teacherTime),
                taStartTime: this.getStartTime(createForm.tasTime),
                taEndTime: this.getEndTime(createForm.tasTime)
            };
            return postJs;
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
.terms h3 {
    position: relative;
}
.terms_right {
    position: absolute;
    right: 20px;
    top: 10px;
}
.terms_right .terms_bu {
    width: 200px;
    line-height: 20px;
    border-radius: 5px;
    border-color: #0e38b1;
    color: #0e38b1;
}
.terms_right .icon-add {
    position: relative;
    vertical-align: middle;
    font-size: 26px;
    margin-right: 7px;
}
.terms ul {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
}
.terms ul li {
    display: flex;
    line-height: 40px;
}
.terms ul li p {
    width: 260px;
    margin-right: 20px;
    word-break: break-all;
}
.terms ul li p:nth-child(3) {
    width: 400px;
}
.item_name p:nth-child(4) {
    width: 400px;
}
.item_name p:nth-child(3) {
    width: 260px !important;
}

.iswidth {
    display: inline-block;
    width: 90px;
}
.center {
    margin: 0 20px;
}
.bottom_button {
    margin-top: 30px;
}
.terms_elastic_frame {
    width: 800px;
    height: 800px;
}
.terms_elastic_frame {
    line-height: 70px;
}
.terms_elastic_tit {
    position: relative;
    padding-left: 30px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}
.terms_elastic_tit span {
    position: absolute;
    right: 30px;
    top: 10px;
}
.terms_elastic_frame p .label_left {
    display: inline-block;
    width: 255px;
    text-align: right;
}
.terms_elastic_frame .terms_elastic_input {
    width: 400px;
    margin-left: 10px;
}
.terms_elastic_inputs {
    width: 162px;
    margin-left: 10px;
}
.label_center i,
span {
    margin: 0 10px;
}
.terms_elastic_button {
    margin-left: 10px;
    width: 126px;
    height: 45px;
}
.terms_elastic_alert {
    width: 450px;
}
.terms_elastic_alert h3 {
    text-align: right;
    line-height: 50px;
    padding-right: 30px;
    border-bottom: 1px solid #ccc;
}
.terms_elastic_alert p {
    position: relative;
    padding-left: 70px;
    padding-top: 30px;
}
.terms_elastic_alert p i {
    position: absolute;
    left: 30px;
    top: 29px;
}
.terms_elastic_alerts {
    width: 300px;
}
.terms_elastic_alerts h3 {
    text-align: right;
    line-height: 50px;
    padding-right: 30px;
    border-bottom: 1px solid #ccc;
}
.terms_elastic_alerts p {
    text-align: center;
    margin-top: 20px;
}
.icon-warning-circle-fill {
    color: red;
    font-size: 30px;
}

/deep/ .el-dialog {
    min-width: 600px;
}
.h3_bloder {
    font-weight: bolder;
}
.Term_Runs_From {
    font-weight: bold;
}
</style>
