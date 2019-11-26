<template>
    <!-- 班级管理 -->
    <!--eslint-disable-->
    <div class="tab_list">
        <el-table :data="sections" style="width: 100%">
            <el-table-column
                prop="name"
                :label="$t('message.COURSE_SETTING.tbl_name')"
                width="180"
            />
            <el-table-column
                :label="$t('message.COURSE_SETTING.tbl_teacher')"
                width="180"
            >
                <template slot-scope="scope">
                    <ul v-if="scope.row.users && scope.row.users.length > 0">
                        <li
                            v-for="(u, _index) in scope.row.users"
                            v-if="u.roleId == 2"
                            :key="_index"
                        >
                            {{ u.username }}
                        </li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column
                prop="startTime"
                :label="$t('message.COURSE_SETTING.tbl_start_date')"
            >
                <template slot-scope="scope">
                    {{ scope.row.startTime | formatDate }}
                </template>
            </el-table-column>

            <el-table-column
                prop="endTime"
                :label="$t('message.COURSE_SETTING.tbl_end_date')"
            >
                <template slot-scope="scope">
                    {{ scope.row.endTime | formatDate }}
                </template>
            </el-table-column>

            <el-table-column
                :label="$t('message.COURSE_SETTING.tbl_enrollment')"
                width="100%"
            >
                <template slot-scope="scope">
                    <p v-if="scope.row.joined > 0" class="joined-state">
                        {{ scope.row.joined }}
                        {{ $t("message.COURSE_SETTING.tbl_joined") }}
                    </p>
                    <p v-if="scope.row.pending > 0" class="pending-state">
                        {{ scope.row.pending }}
                        {{ $t("message.COURSE_SETTING.tbl_pending") }}
                    </p>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                :label="$t('message.COURSE_SETTING.tbl_operation')"
            >
                <template slot-scope="scope">
                    <span>
                        <a
                            href="javascript:;"
                            style="text-decoration: none;"
                            @click="goEditSection(scope.row)"
                        >
                            {{ $t("message.Common_edit") }}
                        </a>
                    </span>
                    <span v-if="scope.row.users.length == 0">
                        <a
                            href="javascript:;"
                            style="text-decoration: none; margin-left: 5px;"
                            @click="deleteSection(scope.row)"
                        >
                            {{ $t("message.Common_delete") }}
                        </a>
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <!--<h4>{{ $t('message.COURSE_SETTING.course_section') }}</h4>-->
        <!--<div style="margin-bottom: 2%" v-for="section in sections">-->
        <!--<el-button type="text" class="course-button">-->
        <!--{{ section.name }}-->
        <!--</el-button>-->
        <!--<span>-->
        <!--（{{ section.users.length }} {{ $t('message.COURSE_SETTING.n_user') }}）-->
        <!--</span>-->
        <!--</div>-->

        <div style="margin-top: 40px;">
            <h3 style="margin-bottom: 10px;">
                {{ $t("message.COURSE_SETTING.add_section_tip") }} :
            </h3>
            <el-input
                v-model="sectionName"
                :placeholder="$t('message.COURSE_SETTING.section_name')"
                clearable
                maxlength="200"
                show-word-limit
                style="width: 40%"
            />
            <el-button type="primary" @click="addSection">
                {{ $t("message.COURSE_SETTING.add_section") }}
            </el-button>
        </div>

        <el-dialog
            :title="$t('message.COURSE_SETTING.Edit_Section')"
            width="36%"
            :visible.sync="sectionEditDialogVisible"
            @closed="sectionEditDialogClosed"
        >
            <el-form
                ref="editSection"
                label-width="140px"
                :rules="sectionRules"
                :model="editSection"
            >
                <el-form-item
                    :label="$t('message.COURSE_SETTING.section_name')"
                    prop="name"
                >
                    <el-input
                        v-model="editSection.name"
                        maxlength="200"
                        show-word-limit
                        style="width: 220px"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.COURSE_SETTING.tbl_start_date')"
                    prop="startTime"
                >
                    <el-date-picker
                        v-model="editSection.startTime"
                        type="date"
                        @change="startTimeChange"
                    />
                </el-form-item>
                <el-form-item
                    :label="$t('message.COURSE_SETTING.tbl_end_date')"
                    prop="endTime"
                >
                    <el-date-picker
                        v-model="editSection.endTime"
                        type="date"
                        :picker-options="endTimePickerOptions"
                    />
                </el-form-item>
                <el-form-item class="dialog-footer">
                    <el-button @click="sectionEditDialogVisible = false">
                        {{ $t("message.Common_cancel") }}
                    </el-button>
                    <el-button
                        type="primary"
                        @click="saveSectionEdit('editSection')"
                    >
                        {{ $t("message.Common_submit") }}
                    </el-button>
                </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="sectionEditDialogVisible = false">
          {{ $t('message.Common_cancel') }}
        </el-button>
        <el-button type="primary" @click="saveSectionEdit('editSection')">
          {{ $t('message.Common_submit') }}
        </el-button>
      </span> -->
        </el-dialog>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import { mapState, mapMutations, mapGetters } from "vuex";
import utilMethods from "@/utils/utilMethods";
import { formatDate } from "@/utils/date";

export default {
    filters: {
        formatDate(time) {
            if (time) {
                const date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            }
            return "";
        }
    },
    computed: {
        ...mapState(["curLanguage"]),

        ...mapGetters(["userInfoData"]),

        currentUserId() {
            return this.userInfoData.id;
        }
    },
    data() {
        return {
            courseId: this.$route.query.courseId,
            sections: [],
            sectionEditDialogVisible: false,
            editSection: {
                name: "",
                startTime: "",
                endTime: ""
            },

            sectionName: "",

            sectionNameTipVisible: false,

            endTimePickerOptions: {
                disabledDate: time => {
                    if (this.editSection.startTime) {
                        return time <= this.editSection.startTime;
                    }
                }
            },

            sectionRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Common_rule_cannot_be_empty"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t(
                            "message.COURSE_SETTING.section_name_length_range_tip"
                        ),
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    mounted() {
        this.loadSections();
    },

    methods: {
        async loadSections() {
            const result = await this.$getData("/section/list", {
                courseId: this.courseId
            });
            if (result.data.code == 200) {
                this.sections = result.data.entity;
                console.log("sections", this.sections);
                for (let i = 0; i < this.sections.length; i++) {
                    const section = this.sections[i];
                    const users = section.users || [];
                    section.users = users;

                    section.joined = 0;
                    section.pending = 0;
                    for (let j = 0; j < users.length; j++) {
                        const user = users[j];
                        if (user.registryStatus == 1) {
                            section.pending++;
                        } else {
                            section.joined++;
                        }
                    }
                }
            } else {
                this.$message.error(result.data.message);
            }
        },

        async deleteSection(section) {
            const result = await this.$getData(
                "/section/deletes",
                [section.id],
                "post"
            );
            if (result.data.code == 200) {
                this.loadSections();
            } else {
                this.$message.error(result.data.message);
            }
        },

        startTimeChange(val) {
            if (this.editSection.startTime >= this.editSection.endTime) {
                this.editSection.endTime = "";
            }
        },

        goEditSection(section) {
            this.editSection = {
                id: section.id,
                name: section.name,
                startTime: section.startTime,
                endTime: section.endTime
            };
            this.sectionEditDialogVisible = true;
        },

        saveSectionEdit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.editSection.id) {
                        this.$http
                            .post(
                                `${process.env.NODE_ENV}/section/modify`,
                                this.editSection
                            )
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.sectionName = "";
                                    this.editSection = {};
                                    this.sectionEditDialogVisible = false;
                                    this.loadSections();
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                this.$message.error(
                                    this.$t(
                                        "message.COURSE_SETTING.section_name_empty_tip"
                                    )
                                );
                            });
                    }
                }
            });
        },

        addSection() {
            if (this.sectionName && this.sectionName.trim().length > 0) {
                const data = {
                    courseId: this.courseId,
                    name: this.sectionName.trim()
                };

                this.$http
                    .post(`${process.env.NODE_ENV}/section/add`, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.sectionName = "";
                            this.loadSections();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            } else {
                this.$message.error(
                    this.$t("message.COURSE_SETTING.section_name_empty_tip")
                );
            }
        },

        sectionEditDialogClosed() {
            this.$refs.editSection.resetFields();
        }
    }
};
</script>
<style scoped="scoped">
p.pending-state {
    background: #f17e26;
    color: #fff;
    padding: 4px;
    border-radius: 5px;
    margin-top: 2px;
}

p.joined-state {
    background: #0e38b1;
    color: #fff;
    padding: 4px;
    border-radius: 5px;
    margin-right: 5px;
    margin-top: 2px;
}
</style>
