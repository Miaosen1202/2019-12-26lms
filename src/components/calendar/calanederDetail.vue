<template>
    <div>
        <div class="calender-contain">
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
                        {{ $t("message.CALENDAR.EventDetail") }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="detail-box">
                    <div class="detail-header">
                        <h1>{{ eventData.title }}</h1>
                        <div class="editBtns">
                            <el-button icon="el-icon-edit" @click="goToEdit">
                                {{ $t("message.Edit") }}
                            </el-button>
                            <el-button
                                icon="el-icon-delete"
                                @click="eventDelete = true"
                            >
                                {{ $t("message.Delete") }}
                            </el-button>
                        </div>
                    </div>

                    <div class="detail-container">
                        <h2 class="detail-container-title">
                            {{ eventDate }} {{ $t("message.CALENDAR.from") }}
                            {{ eventStartTime }}
                            {{ $t("message.CALENDAR.to") }} {{ eventEndTime }}
                        </h2>
                        <div
                            class="detail-container-text"
                            v-html="eventData.description"
                        />
                    </div>
                </div>
            </div>
            <div class="calender-contain-right" style="padding-top: 50px">
                <el-button @click="backToCalendar">
                    <i class="iconfont icon-rollback" />
                    {{ $t("message.Back_to_Calenda") }}
                </el-button>
            </div>
        </div>
        <!--start: 删除事件-->
        <el-dialog
            :title="$t('message.confirm_delection')"
            :visible.sync="eventDelete"
            width="400px"
            @close="
                eventDelete = false;
                eventDetail = false;
            "
        >
            <p>{{ $t("message.sure_to_delete") }}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="eventDelete = false">
                    {{ $t("message.Cancel") }}</el-button
                >
                <el-button type="primary" @click="delEvent">{{
                    $t("message.Delete")
                }}</el-button>
            </span>
        </el-dialog>
        <!--end: 删除事件-->
    </div>
</template>
<script>
import { mapGetters } from "vuex";
/*eslint-disable*/
export default {
    data() {
        return {
            eventId: "",
            eventDelete: false,
            eventData: {},
            eventDate: "",
            eventStartTime: "",
            eventEndTime: "",
            calendarTitle: ""
        };
    },
    created() {
        this.eventId = this.$route.query.eventId;
        this.calendarTitle = this.$route.query.title;
        this.getEventDataById();
    },
    computed: {
        ...mapGetters(["userInfoData"])
    },
    methods: {
        goToEdit() {
            localStorage.setItem(
                "editEventObj",
                JSON.stringify(this.eventData)
            );
            // localStorage.setItem('editEventObj', JSON.stringify(params));
            this.$router.push({
                path: "calanederEvent",
                query: { type: "edit" }
            });
        },
        backToCalendar() {
            this.$router.push({ path: "caleadarWatch" });
        },
        async delEvent() {
            const tempId = [];
            tempId.push(this.eventId);
            const result = await this.$getData(
                "/calendarEvent/deletes",
                tempId,
                "post"
            );
            if (result.data.code == 200) {
                this.$message({
                    message: this.$t("message.del_event"),
                    type: "success"
                });
                this.$router.push({ path: "caleadarWatch" });
            }
        },

        async getEventDataById() {
            const params = { data: this.eventId };
            const result = await this.$getData(
                "/calendarEvent/get",
                params,
                "get"
            );
            if (result.data.code == 200) {
                this.eventData = result.data.entity;
                const tempStartTime = this.eventData.startTime;
                const tempEndTime = this.eventData.endTime;
                const tempStartObj = this.getYearByTime(tempStartTime);
                this.eventDate = tempStartObj.curDate;
                this.eventStartTime = tempStartObj.curTime;
                const tempEndObj = this.getYearByTime(tempEndTime);
                this.eventEndTime = tempEndObj.curTime;
            }
        },

        getYearByTime(time) {
            const tempDate = new Date(time);
            const tempYear = tempDate.getFullYear();
            let tempMonth = tempDate.getMonth() + 1;
            let tempHours = tempDate.getHours();
            let tempMinutes = tempDate.getMinutes();
            tempMonth = tempMonth > 9 ? tempMonth : `0${tempMonth}`;
            const curDate = `${tempYear}-${tempYear}`;
            tempHours = tempHours > 9 ? tempHours : `0${tempHours}`;
            tempMinutes = tempMinutes > 9 ? tempMinutes : `0${tempMinutes}`;
            const curTime = `${tempHours}:${tempMinutes}`;
            const tempObj = {
                curDate,
                curTime
            };
            return tempObj;
        }
    }
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
@import "./calender.less";
</style>
