<template>
    <!--eslint-disable-->
    <li v-if="isShow(assigns)">
        <b>{{ $t("message.ASSIGNMENT.available") }}</b>
        <span v-if="assigns.length == 1">
            {{ getStatus(assigns[0], false) }}
        </span>
        <span v-else-if="assigns.length > 1">
            <el-tooltip placement="top">
                <div slot="content">
                    <div v-for="assign in assigns">
                        {{ getStatus(assign, true) }}
                    </div>
                </div>
                <span style="color: blue">{{
                    $t("message.ASSIGNMENT.multiple_available_date")
                }}</span>
            </el-tooltip>
        </span>
    </li>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import utilMethods from "@/utils/utilMethods";

export default {
    // name: 'assignTo',
    props: ["assigns", "users", "sections"],
    data() {
        return {};
    },
    created() {},
    methods: {
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2:
                    for (let i = 0; i < sections.length; i++) {
                        const v = sections[i];
                        if (v.id == assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < users.length; i++) {
                        const v = users[i];
                        if (v.id == assign.assignId) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                default:
                    // if(sections.length < 1 && users.length  < 1){
                    //   data = this.$t('message.Everyone');
                    // }else{
                    //   data = this.$t('message.Everyelse');
                    // }
                    data = this.$t("message.Everyelse");
            }

            return data;
        },
        isShow(assigns) {
            if (assigns) {
                for (let i = 0; i < assigns.length; i++) {
                    if (
                        assigns[i] &&
                        (assigns[i].startTime != undefined ||
                            assigns[i].endTime != undefined)
                    ) {
                        return true;
                    }
                }
            }
            return false;
        },
        async getAssignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (result.data.code == 200) {
                this.sections = result.data.entity.sections;
                this.users = result.data.entity.users;
            } else {
                this.$message.error(result.data.message);
            }
        },
        formatterDate(val) {
            return utilMethods.formatDate(val);
        },
        getStatus(assign, b) {
            let u = "";
            if (b) {
                u = this.idToName(assign, this.sections, this.users);
            }

            const now = new Date().getTime();
            const st = assign.startTime;
            const et = assign.endTime;
            let time = "";
            // 开始时间 不为空 结束时间为空
            if (st != undefined && et == undefined) {
                if (st > now) {
                    time = `${this.$t(
                        "message.ASSIGNMENT.available_From"
                    )} ${this.formatterDate(st)}`;
                } else {
                    time = this.$t("message.ASSIGNMENT.noCloseDate");
                }
                // 开始时间 不为空 结束时间不为空
            } else if (st != undefined && et != undefined) {
                if (st > now) {
                    time = `${this.$t(
                        "message.ASSIGNMENT.available_From"
                    )} ${this.formatterDate(st)}`;
                } else if (st < now && et > now) {
                    time = `${this.$t(
                        "message.ASSIGNMENT.available_Until"
                    )} ${this.formatterDate(et)}`;
                } else {
                    time = this.$t("message.ASSIGNMENT.closed");
                }
                // 开始时间 为空 结束时间不为空
            } else if (st == undefined && et != undefined) {
                if (et > now) {
                    time = `${this.$t(
                        "message.ASSIGNMENT.available_Until"
                    )} ${this.formatterDate(et)}`;
                } else {
                    time = this.$t("message.ASSIGNMENT.closed");
                }
                // 开始时间 为空 结束时间为空
            }
            if (time != "") {
                if (b) {
                    time = `${u} ${time}`;
                }
            }
            return time;
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped>
.assign-addto {
    border-top: 1px dashed #ccc;
}

.assign-add {
    padding-left: 90%;
    padding-bottom: 2%;
}

.available-until {
    display: inline-block;
    width: 48%;
    margin-left: 1%;
}

.assign-style {
    padding: 2%;
    margin-bottom: 2%;
}
</style>
