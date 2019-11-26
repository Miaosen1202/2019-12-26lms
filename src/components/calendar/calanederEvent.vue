<template>
    <div>
        <div class="calender-contain">
            <!-- 新增日历事件 -->
            <div class="calender-contain-left">
                <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    class="bread-crumbs"
                >
                    <el-breadcrumb-item>
                        {{ calendarTitle }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: 'caleadarWatch' }">
                        {{ $t("message.calendar_events") }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        {{ $t("message.new_calendar_event") }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <el-form
                    ref="moreEventForm"
                    :model="moreEventForm"
                    :rules="moreEventRules"
                >
                    <el-form-item
                        prop="title"
                        :label="$t('message.Title')"
                        label-width="60px"
                    >
                        <el-input
                            v-model="moreEventForm.title"
                            :placeholder="$t('message.pls_enter_content')"
                        />
                    </el-form-item>
                    <el-form-item prop="description" style="margin-left: 60px">
                        <ckeditor
                            v-model="moreEventForm.description"
                            :editor="editor"
                            :config="editorConfig"
                        />
                    </el-form-item>
                    <div class="form-container">
                        <el-form-item
                            :label="$t('message.datea')"
                            :label-width="formLabelWidth"
                            prop="date"
                        >
                            <el-date-picker
                                v-model="moreEventForm.date"
                                type="date"
                                :placeholder="$t('message.unlock_at')"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.available_from')"
                            :label-width="formLabelWidth"
                            prop="eventTimeVal"
                        >
                            <el-time-picker
                                v-model="moreEventForm.eventTimeVal"
                                :disabled="!moreEventForm.date"
                                format="HH:mm"
                                is-range
                                arrow-control
                                :range-separator="$t('message.untila')"
                                :start-placeholder="$t('message.start_time')"
                                :end-placeholder="$t('message.end_time')"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.location')"
                            prop="location"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="moreEventForm.location"
                                autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="$t('message.address')"
                            prop="address"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="moreEventForm.address"
                                autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item
                            v-if="eventType == 'create'"
                            prop="isDuplicate"
                            style="margin-left: 120px;"
                        >
                            <el-checkbox v-model="moreEventForm.isDuplicate">
                                {{ $t("message.Duplicate") }}
                            </el-checkbox>
                        </el-form-item>
                        <!-- v-if='moreEventForm.isDuplicate' -->
                        <div
                            v-if="
                                moreEventForm.isDuplicate &&
                                    eventType == 'create'
                            "
                            style="margin-left: 120px"
                        >
                            {{ $t("message.Every") }} &nbsp;
                            <el-form-item
                                prop="every"
                                style="display:inline-block"
                            >
                                <el-input-number
                                    v-model="moreEventForm.every"
                                    style="width: 86px"
                                    controls-position="right"
                                    :min="1"
                                />
                            </el-form-item>
                            <el-form-item
                                prop="everyUnit"
                                style="display:inline-block"
                            >
                                <el-select
                                    v-model="moreEventForm.everyUnit"
                                    placeholder="days"
                                    style="width: 100px;margin:0 10px"
                                >
                                    <el-option
                                        :label="$t('message.CALENDAR.day')"
                                        value="0"
                                    />
                                    <el-option
                                        :label="$t('message.CALENDAR.week')"
                                        value="1"
                                    />
                                    <el-option
                                        :label="$t('message.CALENDAR.month')"
                                        value="2"
                                    />
                                </el-select> </el-form-item
                            >For &nbsp;
                            <el-form-item
                                prop="duplicateNum"
                                style="display:inline-block"
                            >
                                <el-input-number
                                    v-model="moreEventForm.duplicateNum"
                                    style="width: 86px"
                                    controls-position="right"
                                    :min="1"
                                />
                            </el-form-item>
                        </div>
                        <el-form-item
                            v-if="eventType == 'create'"
                            prop="isCount"
                            style="margin-left: 120px"
                        >
                            <el-checkbox v-model="moreEventForm.isCount">
                                {{ $t("message.CALENDAR.Count") }}
                            </el-checkbox>
                            <span class="count-text">
                                <!-- Appends a number to the end of each event title (e.g. Event1,Event2,etc) -->
                            </span>
                        </el-form-item>
                        <el-form-item
                            v-if="eventType == 'create'"
                            style="padding-left: 120px; text-align:center"
                        >
                            <el-button @click="cancelEvent('moreEventForm')">
                                {{ $t("message.Cancel") }}
                            </el-button>
                            <el-button
                                type="primary"
                                @click="createEvent('moreEventForm')"
                            >
                                {{ $t("message.Create_Event") }}
                            </el-button>
                        </el-form-item>
                        <el-form-item
                            v-if="eventType == 'edit'"
                            style="padding-left: 120px; text-align:center"
                        >
                            <el-button @click="delEvent">
                                {{ $t("message.Delete") }}
                            </el-button>
                            <el-button @click="cancelEvent('moreEventForm')">
                                {{ $t("message.Cancel") }}
                            </el-button>
                            <el-button
                                type="primary"
                                @click="updateEvent('moreEventForm')"
                            >
                                {{ $t("message.Update_Event") }}
                            </el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!-- <common-right
        @getAssignItem = 'getAssignItem'
        @getQuizeItem = 'getQuizeItem'
        @getAnnouseItem = 'getAnnouseItem'
        @getDiscussItem = 'getDiscussItem'
        @getModuleItem = 'getModuleItem'
        @node-click = 'nodeClick'
        @fileSucess = 'fileSucess'
        @getFile-name = 'getFileName'
        :courseId = 'courseId'
        ></common-right> -->
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import commonRight from '@/utils/right/commonRight.vue'
export default {
    data() {
        return {
            eventType: "",
            // editor: ClassicEditor,
            editor: ClassicEditor,
            editorConfig: {
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },

            formLabelWidth: "120px",
            initMoreEventObj: {},
            moreEventForm: {
                title: "",
                date: "",
                eventTimeVal: [new Date(), new Date()],
                location: "",
                calendarVal: "",
                calendarValObj: null,
                startTime: "",
                endTime: "",
                description: "",
                address: "",
                isDuplicate: 0,
                every: 1,
                everyUnit: "1",
                duplicateNum: 1,
                isCount: false
            },
            moreEventRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.len_bettwen_1_100"),
                        trigger: "blur"
                    }
                ]
            },
            courseId: "",
            calendarTitle: ""
        };
    },
    created() {
        this.initFomrData();
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    methods: {
        initFomrData() {
            this.eventType = this.$route.query.type;
            this.calendarTitle = this.$route.query.title;
            if (this.eventType == "create") {
                this.initMoreEventObj = JSON.parse(
                    localStorage.getItem("createEventObj")
                );
                if (this.initMoreEventObj.startTime != "") {
                    this.$set(
                        this.moreEventForm,
                        "date",
                        new Date(this.initMoreEventObj.startTime)
                    );
                }
                Object.assign(
                    this.moreEventForm,
                    JSON.parse(localStorage.getItem("createEventObj"))
                );

                if (this.moreEventForm.calendarType == 2) {
                    this.courseId = this.moreEventForm.courseId;
                    const tempCourseId = this.moreEventForm.courseId;
                }
            } else if (this.eventType == "edit") {
                this.initMoreEventObj = JSON.parse(
                    localStorage.getItem("editEventObj")
                );
                if (this.initMoreEventObj.startTime != "") {
                    this.$set(
                        this.moreEventForm,
                        "date",
                        new Date(this.initMoreEventObj.startTime)
                    );
                }
                Object.assign(
                    this.moreEventForm,
                    JSON.parse(localStorage.getItem("editEventObj"))
                );
                // this.moreEventForm.date = new Date(this.moreEventForm.startTime);
                this.$set(
                    this.moreEventForm,
                    "date",
                    new Date(this.moreEventForm.startTime)
                );
                if (this.moreEventForm.calendarType == 2) {
                    this.courseId = this.moreEventForm.courseId;
                    const tempCourseId = this.moreEventForm.courseId;
                }
            }
        },
        initTime(formName) {
            let startTime;
            let endTime;
            if (this[formName].date) {
                const tempYear = this.moreEventForm.date.getFullYear();
                const tempMonth = this.moreEventForm.date.getMonth();
                const tempDay = this.moreEventForm.date.getDate();
                const tempStartHours = new Date(
                    this.moreEventForm.eventTimeVal[0]
                ).getHours();
                const tempStartMinutes = new Date(
                    this.moreEventForm.eventTimeVal[0]
                ).getMinutes();
                const tempEndHours = new Date(
                    this.moreEventForm.eventTimeVal[1]
                ).getHours();
                const tempEndMinutes = new Date(
                    this.moreEventForm.eventTimeVal[1]
                ).getMinutes();
                const tempStartDate = new Date(
                    tempYear,
                    tempMonth,
                    tempDay,
                    tempStartHours,
                    tempStartMinutes
                );
                startTime = Number(tempStartDate.getTime());
                const tempEndDate = new Date(
                    tempYear,
                    tempMonth,
                    tempDay,
                    tempEndHours,
                    tempEndMinutes
                );
                endTime = Number(tempEndDate.getTime());
            } else {
                startTime = "";
                endTime = "";
            }
            return {
                startTime,
                endTime
            };
        },
        async createEvent(formName) {
            this.$refs[formName].validate(async valid => {
                this.moreEventForm.startTime = this.initTime(
                    "moreEventForm"
                ).startTime;
                this.moreEventForm.endTime = this.initTime(
                    "moreEventForm"
                ).endTime;
                let tempObj = {
                    title: this.moreEventForm.title,
                    location: this.moreEventForm.location,
                    isDuplicate: this.moreEventForm.isDuplicate,
                    startTime: this.moreEventForm.startTime,
                    endTime: this.moreEventForm.endTime,
                    description: this.moreEventForm.description,
                    location: this.moreEventForm.location,
                    address: this.moreEventForm.address,
                    every: Number(this.moreEventForm.every),
                    everyUnit: Number(this.moreEventForm.everyUnit),
                    duplicateNum: Number(this.moreEventForm.duplicateNum),
                    isCount: Number(this.moreEventForm.isCount)
                };
                tempObj = Object.assign(this.initMoreEventObj, tempObj);
                const result = await this.$getData(
                    "/calendarEvent/add",
                    tempObj,
                    "post"
                );
                if (result.data.code == 200) {
                    this.$message({
                        message: this.$t("message.edit_success"),
                        type: "success"
                    });
                    localStorage.removeItem("createEventObj");
                    this.$router.push({ path: "caleadarWatch" });
                }
            });
        },
        cancelEvent(formName) {
            if (this.eventType == "create") {
                this.$refs[formName].resetFields();
                this.moreEventForm.calendarValObj = null;
                this.moreEventForm.title = "";
                localStorage.removeItem("createEventObj");
            } else if (this.eventType == "edit") {
                this.$refs[formName].resetFields();
                this.moreEventForm.calendarValObj = null;
                this.moreEventForm.title = "";
                localStorage.removeItem("editEventObj");
            }
            this.$router.push({ path: "caleadarWatch" });
        },
        // 编辑事件更新
        async updateEvent(formName) {
            this.$refs[formName].validate(async valid => {
                this.moreEventForm.startTime = this.initTime(
                    "moreEventForm"
                ).startTime;
                this.moreEventForm.endTime = this.initTime(
                    "moreEventForm"
                ).endTime;
                let tempObj = {
                    title: this.moreEventForm.title,
                    location: this.moreEventForm.location,
                    startTime: this.moreEventForm.startTime,
                    endTime: this.moreEventForm.endTime,
                    description: this.moreEventForm.description,
                    location: this.moreEventForm.location,
                    address: this.moreEventForm.address
                };
                tempObj = Object.assign(this.initMoreEventObj, tempObj);
                const result = await this.$getData(
                    "/calendarEvent/modify",
                    tempObj,
                    "post"
                );
                if (result.data.code == 200) {
                    this.$message({
                        message: this.$t("message.update_success"),
                        type: "success"
                    });
                    localStorage.removeItem("editEventObj");
                    this.$router.push({ path: "caleadarWatch" });
                }
            });
        },
        // 删除事件
        async delEvent() {
            const tempId = [];
            tempId.push(this.initMoreEventObj.id);
            const result = await this.$getData(
                "/calendarEvent/deletes",
                tempId,
                "post"
            );
            if (result.data.code == 200) {
                this.eventDetail = false;
                this.eventDelete = false;
                this.$message({
                    message: this.$t("message.del_event"),
                    type: "success"
                });
                localStorage.removeItem("editEventObj");
                this.$router.push({ path: "caleadarWatch" });
            }
        },
        // 取消
        toCalendar() {
            this.$router.push("caleadarWatch");
        }
        // getAssignItem(item){
        //   let tempUrl = 'homePage/allCourse/assignmentDetail?assignId='+ item.id;
        //   this.moreEventForm.description += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // 获取测验信息
        // getQuizeItem(item){
        //   let tempUrl = 'homePage/allCourse/courseQuizz?data=' + item.id;
        //   this.moreEventForm.description += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // getAnnouseItem(item){
        //   let tempUrl = '';
        //   this.moreEventForm.description += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // getDiscussItem(item){
        //   let tempUrl = '';
        //   this.moreEventForm.description += `<a href=${tempUrl}> ${item.name}</a>`
        // },
        // getModuleItem(item){
        //   let tempUrl = '';
        //   this.moreEventForm.description += `<a href=${tempUrl}> ${item.name}</a>`
        // },

        // nodeClick(fileName){
        //   this.moreEventForm.description += ''+ fileName;
        // },
        // fileSucess(fileName){
        //    this.moreEventForm.description += ''+ fileName;
        // },
        // getFileName(fileName){
        //   this.moreEventForm.description += ''+ fileName;
        // }
    },
    components: {
        // commonRight
    }
};
/* eslint-disable */
</script>
<style lang="less" scoped>
@import "./calender.less";
</style>
