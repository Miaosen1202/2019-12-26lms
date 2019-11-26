<template>
    <div>
        <!-- start: 待办 -->
        <div style="padding: 2%">
            <div class="todo">
                <h3>{{ $t("message.Dashboard_to_do") }}</h3>
                <span v-if="courseId == ''">
                    {{ $t("message.Dashboard_for_all_course") }}</span
                >
            </div>
            <div
                v-for="(todo, index) in todoList"
                :key="index"
                class="todoStyle"
            >
                <ul>
                    <li class="todo-top">
                        <span
                            v-if="Number(todo.dataType) === 2"
                            class="to-name"
                        >
                            <i
                                class="iconfont icon-calendar_icon"
                                style="font-size: 16px"
                            />
                            <span>{{ $t("message.Dashboard_deal_with") }}</span>
                        </span>
                        <span v-else>
                            <i
                                v-show="Number(todo.originType) === 1"
                                class="iconfont icon-icon-edit"
                                style="font-size: 16px"
                            />
                            <i
                                v-show="Number(todo.originType) == 2"
                                class="iconfont icon-liaotian"
                                style="font-size: 16px"
                            />
                            <i
                                v-show="Number(todo.originType) == 3"
                                class="iconfont icon--xiugaineirong"
                                style="font-size: 16px"
                            />
                            <span
                                v-show="
                                    Number(todo.originType) === 1 ||
                                        Number(todo.originType) === 2
                                "
                            >
                                Turn in
                            </span>
                            <span v-show="Number(todo.originType) === 3">
                                Take
                            </span>
                        </span>
                        <a
                            class="task-title"
                            style="cursor: pointer; color:#0e38b1"
                            @click="
                                gotoTaskPage(
                                    todo,
                                    todo.dataType,
                                    todo.courseId,
                                    todo.originType,
                                    todo.originId,
                                    todo.title
                                )
                            "
                        >
                            {{ todo.title }}
                        </a>
                    </li>
                    <li>
                        <h2 class="course-title">
                            {{ todo.courseName }}
                        </h2>
                    </li>
                    <li class="time-box">
                        <div v-show="todo.dataType != 2" class="task-time">
                            <span v-show="Number(todo.dueOrClose) === 0">
                                <i> Due </i> &nbsp;&nbsp;
                                <a> {{ todo.limitTime | formatDate }} </a>
                            </span>
                            <span v-show="Number(todo.dueOrClose) === 1">
                                <i
                                    >{{
                                        todo.endTime ? "Close" : "Close Unset"
                                    }}
                                </i>
                                &nbsp;&nbsp;
                                <a v-if="todo.endTime">
                                    {{ todo.endTime | formatDate }}
                                </a>
                            </span>
                            <span v-if="todo.score">
                                ~ {{ parseInt(todo.score / 100) }} pts
                            </span>
                        </div>
                        <div
                            v-show="Number(todo.dataType) === 2"
                            class="task-time"
                        >
                            <span>
                                <a> {{ todo.doTime | formatDate }} </a>
                            </span>
                        </div>
                        <div class="toScore">
                            <span
                                v-show="Number(todo.isLated) === 1"
                                class="isLate"
                            >
                                Late
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="moreToDo" style="padding-top: 1em;">
                <el-button
                    v-if="hasMoreTodo"
                    type="text"
                    @click="getTodoList(todoPageIndex + 1)"
                >
                    {{ $t("message.Dashboard_More") }} >>
                </el-button>
                <span v-if="todoList.length === 0">{{
                    $t("message.Dashboard_no_to_do_tip")
                }}</span>
            </div>
        </div>
        <!-- start: comming up -->
        <div style="padding: 2%">
            <div class="todo">
                <h3>{{ $t("message.Dashboard_up_coming") }}</h3>
                <span v-if="courseId === ''">
                    {{ $t("message.Dashboard_for_all_course") }}</span
                >
            </div>
            <div
                v-for="(todo, index) in upcomingList"
                :key="index"
                class="todoStyle"
            >
                <ul>
                    <li class="todo-top">
                        <span
                            v-if="Number(todo.dataType) === 2"
                            class="to-name"
                        >
                            <i
                                class="iconfont icon-calendar_icon"
                                style="font-size: 16px"
                            />
                            <span>{{ $t("message.Dashboard_deal_with") }}</span>
                        </span>
                        <span v-else>
                            <i
                                v-show="Number(todo.originType) === 1"
                                class="iconfont icon-icon-edit"
                                style="font-size: 16px"
                            />
                            <i
                                v-show="Number(todo.originType) === 2"
                                class="iconfont icon-liaotian"
                                style="font-size: 16px"
                            />
                            <i
                                v-show="Number(todo.originType) === 3"
                                class="iconfont icon--xiugaineirong"
                                style="font-size: 16px"
                            />
                            <span
                                v-show="
                                    Number(todo.originType) === 1 ||
                                        Number(todo.originType) === 2
                                "
                            >
                                Turn in
                            </span>
                            <span v-show="Number(todo.originType) === 3">
                                Take
                            </span>
                        </span>
                        <a
                            class="task-title"
                            style="cursor: pointer; color:#0e38b1"
                            @click="
                                gotoTaskPage(
                                    todo.dataType,
                                    todo.courseId,
                                    todo.originType,
                                    todo.originId
                                )
                            "
                        >
                            {{ todo.title }}
                        </a>
                    </li>
                    <li>
                        <h2 class="course-title">
                            {{ todo.courseName }}
                        </h2>
                    </li>
                    <li class="time-box">
                        <div class="task-time">
                            <span v-if="Number(todo.dataType) === 2">
                                <a> {{ todo.doTime | formatDate }} </a>
                            </span>
                            <span v-if="Number(todo.dataType) !== 2">
                                <a>Avai {{ todo.doTime | formatDate }} </a>
                            </span>
                            <span v-if="todo.score">
                                ~ {{ parseInt(todo.score / 100) }} pts
                            </span>
                        </div>
                        <div class="toScore">
                            <span
                                v-show="Number(todo.isLated) === 1"
                                class="isLate"
                            >
                                Late
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="moreToDo" style="padding-top: 1em;">
                <el-button
                    v-if="hasMoreUpcoming"
                    type="text"
                    @click="getUpcomingList(upcomingPageIndex + 1)"
                >
                    {{ $t("message.Dashboard_More") }} >>
                </el-button>
                <span v-if="upcomingList.length === 0">{{
                    $t("message.Dashboard_no_coming_up_tip")
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
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
    props: {
        courseId: { default: "" }
    },
    data() {
        return {
            todoList: [],
            upcomingList: [],
            todoPageIndex: 1,
            upcomingPageIndex: 1,
            pageSize: 5,
            hasMoreTodo: true,
            hasMoreUpcoming: true
        };
    },
    mounted() {
        this.getTodoList(this.todoPageIndex);
        this.getUpcomingList(this.upcomingPageIndex);
    },
    methods: {
        goCourse(course) {
            this.$router.push({
                path: "/homePage/allCourse/home",
                query: { courseId: course.id }
            });
        },
        async getTodoList(pageIndex) {
            // console.log('获取待办列表111')
            pageIndex = pageIndex || 1;
            let params = {};
            if (this.courseId != "") {
                params = {
                    pageIndex,
                    pageSize: this.pageSize,
                    courseId: this.courseId
                };
            } else {
                params = { pageIndex, pageSize: this.pageSize };
            }
            const res = await this.$getData("/todo/pageList", params, "get");
            if (res.data.code == 200) {
                const totalCount =
                    (pageIndex - 1) * this.pageSize +
                    res.data.entity.list.length;
                if (totalCount < res.data.entity.total) {
                    this.hasMoreTodo = true;
                } else {
                    this.hasMoreTodo = false;
                }
                if (pageIndex === 1) {
                    this.todoList = res.data.entity.list;
                } else {
                    this.arrayPush(this.todoList, res.data.entity.list);
                }
                this.todoPageIndex = res.data.entity.pageIndex;
            }
        },

        async getUpcomingList(pageIndex) {
            pageIndex = pageIndex || 1;
            let params = {};
            if (this.courseId != "") {
                params = {
                    pageIndex,
                    pageSize: this.pageSize,
                    courseId: this.courseId
                };
            } else {
                params = { pageIndex, pageSize: this.pageSize };
            }
            const res = await this.$getData(
                "/upcoming/pageList",
                params,
                "get"
            );
            if (res.data.code == 200) {
                const totalCount =
                    (pageIndex - 1) * this.pageSize +
                    res.data.entity.list.length;
                if (totalCount < res.data.entity.total) {
                    this.hasMoreUpcoming = true;
                } else {
                    this.hasMoreUpcoming = false;
                }
                if (pageIndex === 1) {
                    this.upcomingList = res.data.entity.list;
                } else {
                    this.arrayPush(this.upcomingList, res.data.entity.list);
                }
                this.upcomingPageIndex = res.data.entity.pageIndex;
            }
        },

        // todo 点击任务、日历事件时跳转到详情页
        gotoTaskPage(todo, dataType, courseId, originType, originId, title) {
            localStorage.setItem("studentCourseName", todo.courseName);
            // 1： 待评分 3: 待提交
            if (dataType == 1 || dataType == 3) {
                // this.$router.push()
                switch (originType) {
                    case 1: // 作业
                        this.gotoAssignmentPage(courseId, originId, title);
                        break;
                    case 2: // 讨论
                        this.gotoDiscussionPage(courseId, originId, title);
                        break;
                    case 3: // 测验
                        this.gotoQuizPage(courseId, originId, title);
                        break;
                    default:
                        break;
                }
                // 2: 日历todo
            } else if (dataType == 2) {
                this.$router.push({
                    path: "/studentHomePage/studentCalendarWatch"
                });
            }
        },

        gotoAssignmentPage(courseId, assignmentId, title) {
            this.$router.push({
                path:
                    "/studentHomePage/studentAllCourse/studentAssignmentSubmit",
                query: {
                    courseId,
                    assignmentId,
                    name: title
                }
            });
        },

        gotoDiscussionPage(courseId, discussionId, title) {
            this.$router.push({
                path:
                    "/studentHomePage/studentAllCourse/studentCourseDiscussionDetail",
                query: {
                    courseId,
                    discussionId,
                    name: title
                }
            });
        },

        gotoQuizPage(courseId, quizId, title) {
            this.$router.push({
                path: "/studentHomePage/studentAllCourse/quizzDetail",
                query: { courseId, quizDetailId: quizId, name: title }
            });
        },

        arrayPush(tarArr, srcArr) {
            tarArr = tarArr || [];
            srcArr = srcArr || [];
            for (let i = 0; i < srcArr.length; i++) {
                tarArr.push(srcArr[i]);
            }
            return tarArr;
        }
    }
};
</script>

<style scoped="" lang="less">
.iconfont {
    font-size: 20px;
}
.todo {
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
}
.todo h3 {
    display: inline-block;
    font-weight: 700;
    padding-bottom: 10px;
}
.todo span {
    display: inline-block;
    // padding-left: 40%
}
.todoStyle {
    /*display: inline-block;*/
    display: block;
    padding-top: 4%;
    .course-title {
        font-size: 14px;
        color: #666;
        line-height: 30px;
    }
    .todo-top {
        display: flex;
        // justify-content: space-between;
        span {
            i {
                vertical-align: middle;
            }
        }
        .to-name {
            display: inline-block;
            // vertical-align: middle
        }
        .top-right {
            font-size: 14px;
            color: #666666;
        }
    }
    .todoTitle {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #0e38b1;
        cursor: pointer;
    }
    .task-title {
        margin-left: 5px;
        width: 50%;
        font-weight: 400;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: text-top;
    }
    .coming-title {
        width: 70%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.todoStyle ul li {
    &:nth-child(n + 2) {
        padding-left: 24px;
    }
    // &:nth-child(2){
    //   margin: 10px 0;
    // }
}
// .todoStyle ul li:nth-child(n+2){
//   padding-left: 16%;
// }
.todoStyle ul li i {
    // padding:0 4%;
}
.moreToDo {
    padding-left: 20%;
}
.todoStyle ul li p {
    display: inline-block;
    color: #0138b1;
    cursor: pointer;
}
.todoStyle ul li p:active {
    color: #0147ff;
    cursor: pointer;
}
.time-box {
    display: flex;
    justify-content: space-between;
    .task-time {
        color: #999;
        font-size: 12px;
    }
    .toScore {
        .isLate {
            color: #f17e26;
            font-size: 14px;
        }
    }
}
</style>
