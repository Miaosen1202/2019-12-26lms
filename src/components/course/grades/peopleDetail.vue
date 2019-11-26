<template>
    <div>
        <!--eslint-disable-->
        <div
            :class="`people-detail animated ${slide}`"
            v-if="!(JSON.stringify(userBook) == '{}')"
        >
            <header>
                <img
                    v-if="userBook.userByIdVo.avatarFileId"
                    class="portrait"
                    :src="GlobalUrl + userBook.userByIdVo.avatarFileId"
                />
                <img v-else src="/static/images/touxiang.png" />
                <div class="detail">
                    <h2>{{ userBook.userByIdVo.username }}</h2>
                    <p>{{ userBook.userByIdVo.email }}</p>
                </div>
                <i class="iconfont icon-shanchu2" @click="closeDetail"></i>
            </header>
            <div class="course-section">
                <p>{{ $t("message.Grade_Course") }}: {{ curCourseName }}</p>
                <p>{{ $t("message.Grade_Section") }}: {{ sectionName }}</p>
            </div>
            <div class="course-status">
                <dl>
                    <li>
                        <dd class="assign-num">
                            {{ userBook.userByIdVo.unOverdue || "--" }}
                        </dd>
                        <dd>{{ $t("message.Grade_Due") }}</dd>
                    </li>
                    <li>
                        <dd class="assign-num">
                            {{ userBook.userByIdVo.overdue || "--" }}
                        </dd>
                        <dd>{{ $t("message.Grade_Late") }}</dd>
                    </li>
                    <li>
                        <dd class="assign-num">
                            {{ userBook.missQuery || "--" }}
                        </dd>
                        <dd>{{ $t("message.Grade_Missing") }}</dd>
                    </li>
                </dl>
                <div class="grade-num">
                    <div>
                        <h1>
                            {{ userBook.userByIdVo.gradeScore / 100 || "--" }} /
                            {{ proportionScore }}
                        </h1>
                        <span
                            >{{ $t("message.Grade_Score") }} /
                            {{ $t("message.Grade_Percent") }}</span
                        >
                    </div>
                    <div>
                        <h1>{{ userBook.ranking || "--" }}</h1>
                        <span>{{ $t("message.Grade_Ranking") }}</span>
                    </div>
                </div>
            </div>

            <!-- 学生统计图入口 -->
            <el-button
                type="primary"
                class="analytics-title"
                @click="stuAnalytics"
                >{{ $t("message.Grade_Comprehensive_Analytics") }}
            </el-button>

            <!-- 分数百分比 -->
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('message.Grade_High')" name="first">
                    <div
                        class="rate"
                        v-for="(el, index) in userBook.taskToTheEnd"
                        :key="index"
                    >
                        <div class="progress-out">
                            <div
                                class="progress-in"
                                :style="
                                    'width:' + el.proportionScore * 100 + '%'
                                "
                            >
                                <span v-if="el.originType == 1">A : </span
                                ><span v-if="el.originType == 2">D : </span
                                ><span v-if="el.originType == 3">Q : </span>
                                <!-- <el-tooltip class="item" effect="dark" :content="el.title" placement="top"> -->
                                <i class="assgin-title">{{ el.title }}</i>
                                <!-- </el-tooltip> -->
                            </div>
                        </div>
                        <span
                            >{{ el.gradeScore / 100 }}/{{
                                el.score / 100
                            }}</span
                        >
                    </div>
                    <div
                        v-if="userBook.taskToTheEnd.length == 0"
                        style="text-align:center;margin-top:20%;"
                    >
                        {{ $t("message.Grade_No_Data") }}
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$t('message.Grade_Low')" name="second">
                    <div
                        class="rate"
                        v-for="(el, index) in userBook.taskLowToHigh"
                        :key="index"
                    >
                        <div class="progress-out">
                            <div
                                class="progress-in"
                                :style="
                                    'width:' + el.proportionScore * 100 + '%'
                                "
                            >
                                <span v-if="el.originType == 1">A : </span
                                ><span v-if="el.originType == 2">D : </span
                                ><span v-if="el.originType == 3">Q : </span>
                                <i class="assgin-title">{{ el.title }}</i>
                            </div>
                        </div>
                        <span
                            >{{ el.gradeScore / 100 }}/{{
                                el.score / 100
                            }}</span
                        >
                    </div>
                    <div
                        v-if="userBook.taskLowToHigh.length == 0"
                        style="text-align:center;margin-top:20%;"
                    >
                        {{ $t("message.Grade_No_Data") }}
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--eslint-disable-->
    </div>
</template>

<script>
/*eslint-disable*/
export default {
    data() {
        return {
            slideInRight: "slideInRight",
            activeName: "first",
            userBook: {},
            courseId: "",
            curCourseName: "",
            proportionScore: ""
        };
    },
    props: {
        slide: {
            type: String,
            default: () => ""
        },
        uid: {
            type: Number,
            default: () => ""
        },
        sectionId: {
            type: Number,
            default: () => ""
        },
        sectionName: {
            type: String,
            default: () => ""
        }
    },
    components: {
        // studentAnalytics
    },
    watch: {
        uid(newVal, oldVal) {
            this.getUserBook();
        }
    },
    methods: {
        closeDetail() {
            this.$emit("slide", "slideOutRight");
        },
        stuAnalytics() {
            this.$emit("show", false);
            this.$emit("id", this.uid);
            this.$router.push({
                path: "/homePage/allCourse/stuAnalytics",
                query: {
                    uid: this.uid,
                    sectionId: this.sectionId,
                    courseId: this.$route.query.courseId
                }
            });
        },
        async getUserBook() {
            let res = await this.$getData(
                "/grade/userBook/query",
                {
                    userId: this.uid,
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
        }
    },
    mounted() {
        this.curCourseName = localStorage.getItem("curCourseName");
        this.courseId = this.$route.query.courseId;
        this.getUserBook();
    }
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
.people-detail {
    width: 28%;
    height: 100%;
    padding: 30px;
    background: #fff;
    position: fixed;
    right: -17px;
    top: 0px;
    z-index: 999;
    overflow-y: auto;
    box-sizing: border-box;
    box-shadow: 0px 0px 30px 0px #666;
    header {
        overflow: hidden;
        margin-bottom: 20px;
        img {
            width: 100px;
            float: left;
        }
        .detail {
            float: left;
            line-height: 50px;
            margin-left: 20px;
        }
        .icon-shanchu2 {
            display: inline-block;
            font-size: 30px;
            cursor: pointer;
            float: right;
            height: 30px;
            line-height: 30px;
        }
    }
    .course-section {
        line-height: 30px;
    }
    .course-status {
        margin-top: 20px;
        dl {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            dt {
                text-align: center;
                .assign-num {
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 6px;
                }
            }
        }
        .grade-num {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            text-align: center;
        }
    }
    .analytics-title {
        width: 100%;
        margin-bottom: 10px;
    }
    .rate {
        display: flex;
        justify-content: space-between;
        .progress-out {
            width: 88%;
            height: 30px;
            margin-bottom: 12px;
            background: #cfd7ef;

            .progress-in {
                white-space: nowrap;
                background: #0f39b1;
                height: 30px;
                box-sizing: border-box;
                line-height: 30px;
                color: #fff;
                padding-left: 10px;
                background: linear-gradient(left, #0f39b1, #7691da);
                position: relative;
                span {
                    float: left;
                }
                .assgin-title {
                    padding-left: 6px;
                    float: left;
                    display: inline-block;
                    width: 210px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: absolute;
                    top: 0;
                }
            }
        }
    }
}
</style>
