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
                        :inactive-value="$t('message.Grade_Chart_Show')"
                        :active-value="$t('message.Grade_Table_Show')"
                        @change="changeSwitch"
                    >
                    </el-switch>
                </el-tooltip>
            </div>
        </div>
        <!--<div class="course-status">
            <dl v-if="!(JSON.stringify(userBook)=='{}')">
                <dt>
                    &lt;!&ndash;!(JSON.stringify(allList)=='{}'&ndash;&gt;
                <dd class="assign-num">{{userBook.userByIdVo.unOverdue ||'&#45;&#45;'}}</dd>
                <dd>{{$t('message.Grade_Due')}}</dd>

                </dt>
                <dt>
                <dd class="assign-num">{{userBook.userByIdVo.overdue ||'&#45;&#45;'}}</dd>
                <dd>{{$t('message.Grade_Late')}}</dd>
                </dt>
                <dt>
                <dd class="assign-num">{{userBook.missQuery ||'&#45;&#45;'}}</dd>
                <dd>{{$t('message.Grade_Missing')}}</dd>
                </dt>
                <dt>
                <dd class="assign-num">{{userBook.userByIdVo.gradeScore/100 || '&#45;&#45;'}} / {{proportionScore}}</dd>
                <dd>{{$t('message.Grade_Score')}} / {{$t('message.Grade_Percent')}}</dd>
                </dt>
            </dl>
            <div style="float:right">
                <i class="el-icon-arrow-left" @click="leftSlide"></i>
                <el-select v-model="studentValue" placeholder="All" @change="changeSelection" ref="select">
                    <el-option v-for="(el,ind) in userList" :key="el.id" :label="el.fullName" :value="el.id"
                               class="student">
                        <img v-if="el.fileUrl" class="portrait" :src="GlobalUrl+el.fileUrl+ '?s=thumb&a=34x34'">
                        <img v-else class="portrait" src="/static/images/touxiang.png">
                        <span>{{el.fullName}}</span>
                    </el-option>
                </el-select>
                <i class="el-icon-arrow-right" @click="rightSlide"></i>
            </div>

        </div>-->
        <!--stuCharts-->
        <stuCharts v-if="showtab" :uid="userId || uid"></stuCharts>
        <!--stuTables-->
        <stuTables v-if="!showtab" :uid="userId || uid"></stuTables>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
import stuCharts from "@/components/course/grades/stuCharts.vue";
import stuTables from "@/components/course/grades/stuTables.vue";

export default {
    data() {
        return {
            sectionValue: "",
            sectionList: [],
            studentValue: "",
            switchValue: "",
            showtab: true,
            avatars: "",
            userParticipate: [],
            userBook: {},
            userId: "",
            uid: "",
            sectionId: "",
            courseId: "",
            userList: [],
            proportionScore: ""
        };
    },
    components: {
        stuCharts,
        stuTables
    },
    // props: ['userList'],
    methods: {
        backTask() {
            // this.$emit('book-page', true)
            // this.$emit('stu', false)
            this.$router.push({
                path: "/homePage/allCourse/gradeBook",
                query: {
                    courseId: this.courseId
                }
            });
        },
        changeSwitch(status) {
            localStorage.getItem("lang");
            status == "chart show" || status == "统计图展示"
                ? (this.showtab = true)
                : (this.showtab = false);
            // console.log(localStorage.getItem('lang'))
        },
        changeSelection(val) {
            this.userId = this.studentValue;
            this.getUserBook();
            this.userList.forEach(el => {
                if (el.id == val) {
                    this.avatars = el.fileUrl
                        ? this.GlobalUrl + el.fileUrl
                        : "/static/images/touxiang.png";
                }
            });
            this.$refs.select.$el.children[0].children[0].setAttribute(
                "style",
                "background:url(" +
                    this.avatars +
                    ") no-repeat 2px center;padding-left: 50px;background-size: 36px;"
            );
        },
        leftSlide() {
            this.userList.forEach((el, index) => {
                if (el.id == this.studentValue && index > 0) {
                    this.studentValue = this.userList[index - 1].id;
                    this.userId = this.studentValue;
                    this.getUserBook();
                    this.avatars = this.userList[index - 1].fileUrl
                        ? this.GlobalUrl + this.userList[index - 1].fileUrl
                        : "/static/images/touxiang.png";
                    this.$refs.select.$el.children[0].children[0].setAttribute(
                        "style",
                        "background:url(" +
                            this.avatars +
                            ") no-repeat 2px center;padding-left: 50px;background-size: 36px;"
                    );
                }
            }, this);
        },
        rightSlide() {
            try {
                this.userList.forEach((el, index) => {
                    if (
                        el.id == this.studentValue &&
                        index < this.userList.length - 1
                    ) {
                        this.studentValue = this.userList[index + 1].id;
                        this.userId = this.studentValue;
                        this.getUserBook();
                        this.avatars = this.userList[index + 1].fileUrl
                            ? this.GlobalUrl + this.userList[index + 1].fileUrl
                            : "/static/images/touxiang.png";
                        // console.log(this.avatars)
                        this.$refs.select.$el.children[0].children[0].setAttribute(
                            "style",
                            "background:url(" +
                                this.avatars +
                                ") no-repeat 2px center;padding-left: 50px;background-size: 36px;"
                        );
                        throw "BreakException";
                    }
                }, this);
            } catch (e) {
                if (e !== "BreakException") throw e;
            }
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
            var el = this.sectionList.find(el => el.id == this.sectionId);
            if (el) {
                this.sectionValue = el.id;
            }
            await this.getBookList();
            await this.getUserBook();
        },
        async getUserBook() {
            let res = await this.$getData(
                "/grade/userBook/query",
                {
                    userId: this.userId,
                    sectionId: this.sectionId,
                    courseId: this.courseId
                },
                "get"
            );
            this.userBook = res.data.entity;
            this.proportionScore = this.userBook.userByIdVo.proportionScore
                ? (this.userBook.userByIdVo.proportionScore * 100).toFixed(2) +
                  "%"
                : "--";
        },
        async getBookList() {
            let result = await this.$getData(
                "/grade/book/query",
                {
                    courseId: this.courseId,
                    sectionId: this.sectionId
                },
                "get"
            );
            this.userList = result.data.entity.userList;
            var el = this.userList.find(el => el.id == this.uid);
            if (el != undefined) {
                this.studentValue = el.id;
                this.userId = el.id;
                this.avatars = el.fileUrl
                    ? this.GlobalUrl + el.fileUrl
                    : "/static/images/touxiang.png";
            } else {
                this.userId = this.userList[0].id;
                this.studentValue = this.userId;
                this.avatars = this.userList[0].fileUrl
                    ? this.GlobalUrl + this.userList[0].fileUrl
                    : "/static/images/touxiang.png";
            }
            this.$refs.select.$el.children[0].children[0].setAttribute(
                "style",
                "background:url(" +
                    this.avatars +
                    ") no-repeat 2px center;padding-left: 50px;background-size: 36px;"
            );
        }
    },
    mounted() {
        this.uid = this.$route.query.uid;
        this.courseId = this.$route.query.courseId;
        this.userId = this.uid;
        this.getSectionList();
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

.el-icon-arrow-left,
.el-icon-arrow-right {
    cursor: pointer;
}

.course-status {
    margin-top: 20px;
    overflow: hidden;
    margin-right: 2%;
    dl {
        width: 40%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 30px;
        margin-left: 10%;
        float: left;
        dt {
            text-align: center;
            // margin-right: 10%;
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
        width: 34px;
        height: 34px;
        border-radius: 50%;
        vertical-align: middle;
    }
}
</style>
