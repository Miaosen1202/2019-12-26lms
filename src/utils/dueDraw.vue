a<template>
    <li v-if="isShow(assigns)">
        <b>{{ $t("message.Due") }}</b>
        <span v-if="assigns.length == 1">
            {{ getType(assigns[0], false) }}
        </span>
        <span v-else-if="assigns.length > 1">
            <el-tooltip placement="top">
                <div slot="content">
                    <div v-for="(assign, index) in assigns" :key="index">
                        {{ getType(assign, true) }}
                    </div>
                </div>
                <span style="color: blue">{{
                    $t("message.Multiple_Due_Dates")
                }}</span>
            </el-tooltip>
        </span>
    </li>
</template>

<script>
import utilMethods from "@/utils/utilMethods";

export default {
    filters: {},
    // name: 'assignTo',
    props: ["assigns", "users", "sections"],
    data() {
        return {};
    },
    created() {},
    methods: {
        isShow(assigns) {
            // debugger;
            if (assigns) {
                for (let i = 0; i < assigns.length; i += 1) {
                    if (assigns[i] && assigns[i].limitTime) {
                        return true;
                    }
                }
            }
            return false;
        },
        formatterDate(val) {
            return utilMethods.formatDate(val);
        },
        idToName(assign, sections, users) {
            let data = "";
            // 1: 所有， 2：section(班级), 3: 用户
            switch (assign.assignType) {
                case 2:
                    for (let i = 0; i < sections.length; i += 1) {
                        const v = sections[i];
                        if (Number(v.id) === Number(assign.assignId)) {
                            data = v.name;
                            break;
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < users.length; i += 1) {
                        const v = users[i];
                        if (Number(v.id) === Number(assign.assignId)) {
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
        getType(assign, b) {
            let data = "";
            if (b) {
                data = this.idToName(assign, this.sections, this.users);
            }
            return assign.limitTime !== undefined
                ? `${data} ${this.formatterDate(assign.limitTime)}`
                : "";
        }
    }
};
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
