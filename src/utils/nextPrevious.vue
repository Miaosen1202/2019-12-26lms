<template>
    <div style="margin-top: 20px">
        <el-button @click="goPreviewLast">
            <!--icon="el-icon-arrow-left"-->
            {{ $t("message.Previous") }}
        </el-button>
        <el-button type="primary" style="float: right" @click="goPreviewNext">
            {{ $t("message.Next") }} </el-button
        ><!--<i class="el-icon-arrow-right el-icon--right"/>-->
    </div>
</template>

<script>
export default {
    name: "NextPrevious",
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
            data: this.$route.query.modulesData,
            isDisabl: true,
            isDisablNext: true
        };
    },
    computed: {
        // isdisabledFn() {
        //     if (this.previous.id !== undefined) {
        //         return (this.isDisabl = false);
        //     }
        //     return (this.isDisabl = true);
        // },
        // isdisabledFnNext() {
        //     if (this.next.id !== undefined) {
        //         return (this.isDisablNext = false);
        //     }
        //     return (this.isDisablNext = true);
        // },
    },
    mounted() {
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
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/assignmentGroupItem/get?data=${this.previous.originId}`
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        this.$router.push({
                                            path:
                                                "/homePage/allCourse/assignmentPreView",
                                            query: {
                                                courseId: this.courseId,
                                                assignmentId: this.previous
                                                    .originId,
                                                assignmentGroupId:
                                                    res.data.entity
                                                        .assignmentGroupId,
                                                assignmentGroupItemId:
                                                    res.data.id,
                                                name: this.previous.title,
                                                modulesData: this.previous.id,
                                                originType: this.previous
                                                    .originType
                                            }
                                        });
                                        /*  this.$parent.assignmentId = this.previous.originId;
                                                      this.$parent.data = this.previous.id;
                                                      this.$parent.courseId = this.courseId; */
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                })
                                .catch(err => {
                                    this.$message.error(err);
                                });
                        } else if (Number(this.previous.originType) === 4) {
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/userFile/get?data=${this.previous.originId}`
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        this.$router.push({
                                            path: "fileView",
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
                                path: "/homePage/allCourse/courseQuizz",
                                query: {
                                    data: this.previous.originId,
                                    name: this.previous.title,
                                    modulesData: this.previous.id,
                                    courseId: this.courseId,
                                    originType: this.previous.originType
                                }
                            });
                        } else if (Number(this.previous.originType) === 2) {
                            this.$router.push({
                                path:
                                    "/homePage/allCourse/discussionDeatilCourse",
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
                                path: "fileView",
                                query: {
                                    modulesData: this.previous.id,
                                    courseId: this.courseId,
                                    originType: this.previous.originType
                                }
                            });
                        } /* else if (Number(this.previous.originType) === 13) {
                                        this.$router.push({
                                            path: 'fileView',
                                            query: {
                                                modulesData: this.previous.id,
                                                courseId: this.courseId,
                                                originType: this.previous.originType,
                                            },
                                        });
                                    } */
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
                        if (Number(this.next.originType) === 1) {
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/assignmentGroupItem/get?data=${this.next.originId}`
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        this.$router.push({
                                            path:
                                                "/homePage/allCourse/assignmentPreView",
                                            query: {
                                                courseId: this.courseId,
                                                assignmentId: this.next
                                                    .originId,
                                                assignmentGroupId:
                                                    res.data.entity
                                                        .assignmentGroupId,
                                                assignmentGroupItemId:
                                                    res.data.id,
                                                name: this.next.title,
                                                modulesData: this.next.id
                                            }
                                        });
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                })
                                .catch(err => {
                                    this.$message.error(err);
                                });
                        } else if (Number(this.next.originType) === 4) {
                            this.$http
                                .get(
                                    `${process.env.NODE_ENV}/userFile/get?data=${this.next.originId}`
                                )
                                .then(res => {
                                    if (Number(res.data.code) === 200) {
                                        this.$router.push({
                                            path: "fileView",
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
                                path: "/homePage/allCourse/courseQuizz",
                                query: {
                                    data: this.next.originId,
                                    name: this.next.title,
                                    modulesData: this.next.id,
                                    courseId: this.courseId
                                }
                            });
                        } else if (Number(this.next.originType) === 2) {
                            this.$router.push({
                                path:
                                    "/homePage/allCourse/discussionDeatilCourse",
                                query: {
                                    discussionId: this.next.originId,
                                    name: this.next.title,
                                    modulesData: this.next.id,
                                    courseId: this.courseId
                                }
                            });
                        } else if (Number(this.next.originType) === 14) {
                            this.$router.push({
                                path: "fileView",
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
