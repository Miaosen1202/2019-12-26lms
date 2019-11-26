<template>
    <div style="margin-top: 20px">
        <el-button @click="goPreviewLast">
            {{ $t("message.Previous") }}
        </el-button>
        <el-button type="primary" style="float: right" @click="goPreviewNext">
            {{ $t("message.Next") }}
        </el-button>
    </div>
</template>

<script>
export default {
    name: "StudentnextPrevious",
    /* props: {
        courseId: {
            type: Number,
            default: 0,
        },
        data: {
            type: Number,
            default: 0,
        },
        // quizDetailId:{
        //   type:String,
        //   default:""
        // }
    }, */
    data() {
        return {
            moduleItem: {},
            previous: {},
            next: {},
            courseId: this.$route.query.courseId,
            data: this.$route.query.modulesData
        };
    },
    mounted() {
        // console.log('父组件接受来的');
        // console.log('courseId', this.courseId);
        // console.log('data', this.data);
        this.goPreview();
    },
    methods: {
        goPreview() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/moduleItemContent/get?data=${this.data}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.moduleItem = res.data.entity.moduleItem;
                        this.previous = res.data.entity.previous;
                        this.next = res.data.entity.next;
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        goPreviewLast() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/moduleItemContent/get?data=${this.previous.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        if (this.previous.originType === 1) {
                            this.$router.push({
                                path: "studentAssignmentSubmit",
                                query: {
                                    courseId: this.courseId,
                                    assignmentId: this.previous.originId,
                                    name: this.previous.title,
                                    modulesData: this.previous.id
                                }
                            });
                        } else if (Number(this.previous.originType) === 4) {
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/userFile/get?data=${this.previous.originId}`
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        this.$router.push({
                                            path: "studentfileView",
                                            query: {
                                                fileUrl:
                                                    res.data.entity.fileUrl,
                                                fileType:
                                                    res.data.entity.fileType,
                                                modulesData: this.previous.id,
                                                courseId: this.courseId,
                                                originType: this.previous
                                                    .originType
                                            }
                                        });
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                })
                                .catch(err => {
                                    this.$message.error(err);
                                });
                        } else if (Number(this.previous.originType) === 3) {
                            this.$router.push({
                                path:
                                    "/studentHomePage/studentAllCourse/quizzDetail",
                                query: {
                                    quizDetailId: this.previous.originId,
                                    // data: targetId,
                                    name: this.previous.title,
                                    modulesData: this.previous.id,
                                    courseId: this.courseId,
                                    // data: this.previous.originId,
                                    originType: this.previous.originType
                                }
                            });
                        } else if (Number(this.previous.originType) === 2) {
                            this.$router.push({
                                path:
                                    "/studentHomePage/studentAllCourse/studentCourseDiscussionDetail",
                                query: {
                                    discussionId: this.previous.originId,
                                    name: this.previous.title,
                                    modulesData: this.previous.id,
                                    courseId: this.courseId,
                                    originType: this.previous.originType
                                }
                            });
                        } else if (Number(this.previous.originType) === 14) {
                            this.$router.push({
                                path: "studentfileView",
                                query: {
                                    modulesData: this.previous.id,
                                    courseId: this.courseId,
                                    originType: this.previous.originType
                                }
                            });
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        goPreviewNext() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/moduleItemContent/get?data=${this.next.id}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        if (this.next.originType === 1) {
                            this.$router.push({
                                path: "studentAssignmentSubmit",
                                query: {
                                    courseId: this.courseId,
                                    assignmentId: this.next.originId,
                                    name: this.next.title,
                                    modulesData: this.next.id
                                }
                            });
                        } else if (Number(this.next.originType) === 4) {
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/userFile/get?data=${this.next.originId}`
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        this.$router.push({
                                            path: "studentfileView",
                                            query: {
                                                fileUrl:
                                                    res.data.entity.fileUrl,
                                                fileType:
                                                    res.data.entity.fileType,
                                                modulesData: this.next.id,
                                                courseId: this.courseId,
                                                originType: this.next.originType
                                            }
                                        });
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                })
                                .catch(err => {
                                    this.$message.error(err);
                                });
                        } else if (Number(this.next.originType) === 3) {
                            this.$router.push({
                                path:
                                    "/studentHomePage/studentAllCourse/quizzDetail",
                                query: {
                                    quizDetailId: this.next.originId,
                                    // data: targetId,
                                    name: this.next.title,
                                    modulesData: this.next.id,
                                    courseId: this.courseId,
                                    // data: this.next.originId,
                                    originType: this.next.originType
                                }
                            });
                        } else if (Number(this.next.originType) === 2) {
                            this.$router.push({
                                path:
                                    "/studentHomePage/studentAllCourse/studentCourseDiscussionDetail",
                                query: {
                                    discussionId: this.next.originId,
                                    name: this.next.title,
                                    modulesData: this.next.id,
                                    courseId: this.courseId,
                                    originType: this.next.originType
                                }
                            });
                        } else if (Number(this.next.originType) === 14) {
                            this.$router.push({
                                path: "studentfileView",
                                query: {
                                    modulesData: this.next.id,
                                    courseId: this.courseId,
                                    originType: this.next.originType
                                }
                            });
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    }
};
</script>

<style scoped=""></style>
