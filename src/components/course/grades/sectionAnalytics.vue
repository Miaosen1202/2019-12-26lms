<template>
    <div class="analytics-page">
        <!--eslint-disable-->
        <div class="title-box">
            <div class="title-left">
                <h1 @click="backTask">
                    {{ $t("message.Grade_Back_Book") }}
                    <i class="iconfont icon-ai207"></i>
                </h1>
                <span>{{ $t("message.Grade_Section_Switch") }}</span>
                <el-select
                    v-model="sectionValue"
                    @change="getSectionList"
                    :placeholder="$t('message.Common_please_select')"
                >
                    <el-option
                        :label="el.name"
                        :value="el.id"
                        v-for="el in sectionList"
                        :key="el.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-tooltip :content="switchValue" placement="top">
                    <el-switch
                        style="display: block"
                        v-model="switchValue"
                        active-color="#0e38b1"
                        inactive-color="#0e38b1"
                        active-icon-class="iconfont icon-liebiaorongqi"
                        inactive-icon-class="iconfont icon-tongjitu"
                        inactive-value="chart show"
                        active-value="table show"
                        @change="changeSwitch"
                    >
                    </el-switch>
                </el-tooltip>
            </div>
        </div>
        <!--stuCharts-->
        <sectionCharts v-if="showtab" :sectionId="sectionId"></sectionCharts>
        <!--stuTables-->
        <sectionTables v-if="!showtab" :sectionId="sectionId"></sectionTables>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import sectionCharts from "@/components/course/grades/sectionCharts.vue";
import sectionTables from "@/components/course/grades/sectionTables.vue";

export default {
    data() {
        return {
            sectionValue: "",
            switchValue: "",
            showtab: true,
            sectionList: [],
            courseId: "",
            sectionId: ""
        };
    },
    components: {
        sectionCharts,
        sectionTables
    },
    methods: {
        backTask() {
            this.$router.push({
                path: "/homePage/allCourse/gradeBook",
                query: {
                    courseId: this.courseId
                }
            });
            // this.$emit('book-page', true)
            // this.$emit('section', false)
        },
        changeSwitch(status) {
            status == "chart show"
                ? (this.showtab = true)
                : (this.showtab = false);
            // console.log(status)
        },
        async getSectionList() {
            let result = await this.$getData(
                "/section/list",
                { courseId: this.courseId },
                "get"
            );
            this.sectionList = result.data.entity;
            this.sectionId = this.sectionId
                ? this.sectionValue
                : this.$route.query.sectionId;
        }
    },
    mounted() {
        this.courseId = this.$route.query.courseId;
        this.getSectionList();
        this.sectionValue = this.$route.query.sectionId;
    }
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
.title-box {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 28px 2% 28px 0;
    border-bottom: 6px solid #eee;
    .title-left {
        display: flex;
        line-height: 40px;
        h1 {
            margin-right: 40px;
            font-size: 26px;
            color: #333;
            line-height: 1;
            font-weight: normal;
            cursor: pointer;
            i {
                font-size: 24px;
                color: #666;
            }
        }
        span {
            margin-right: 10px;
        }
    }
    .icon-chartbar {
        font-size: 24px !important;
    }
}

.course-status {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-right: 2%;
    dl {
        width: 30%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 30px;
        margin-left: 10%;
        dt {
            text-align: center;
            .assign-num {
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 6px;
            }
        }
    }
}

.student {
    margin: 6px 0;
    .portrait {
        height: 34px;
        vertical-align: middle;
    }
}
</style>
