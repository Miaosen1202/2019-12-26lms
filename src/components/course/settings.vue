<template>
    <div class="setting">
        <!-- 右侧操作栏 -->
        <div class="setting-right">
            <el-button
                v-show="!courseConcludedDisabled"
                style="text-align: left"
                class="course-handle"
                type="plain"
                icon="iconfont icon-suoding"
                @click="concludeCourse"
            >
                <span> {{ $t("message.Conclude_this_Course") }}</span>
            </el-button>
            <el-tooltip
                v-show="courseConcludedDisabled"
                class="item"
                effect="dark"
                :content="
                    $t('message.COURSE_SETTING.Please_contact_your_system')
                "
                placement="top"
            >
                <el-button
                    style="text-align: left"
                    class="course-handle"
                    type="plain"
                    icon="iconfont icon-conclude"
                >
                    {{ $t("message.De_Conclude") }}
                </el-button>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="dark"
                :content="$t('message.COURSE_SETTING.delete_this_course')"
                placement="top"
            >
                <el-button
                    style="text-align: left"
                    class="course-handle"
                    type="plain"
                    icon="iconfont icon-delete"
                >
                    <!--@click="deleteCourse"-->
                    {{ $t("message.Delete_this_Course") }}
                </el-button>
            </el-tooltip>
            <el-button
                style="text-align: left"
                class="course-handle"
                type="plain"
                icon="iconfont icon-fenxiang1"
                @click="goCourseResource(15, originId)"
            >
                {{ $t("message.share_resource") }}
            </el-button>
        </div>

        <!-- 中间内容区 -->
        <div style="width: 70%;">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('message.Course_Details')" name="first">
                    <!--课程详细信息-->
                    <v-course-detail
                        :course-handle-type="courseHandleType"
                        @courseLoaded="courseLoaded"
                    />
                </el-tab-pane>
                <el-tab-pane :label="$t('message.Sections')" name="second">
                    <!--班级-->
                    <v-section />
                </el-tab-pane>
            </el-tabs>
            <v-goTop />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import goTop from "../../utils/goTop.vue";
import courseDetail from "./setting/courseDetail.vue";
import section from "./setting/section.vue";
import { formatDate } from "@/utils/date";

export default {
    filters: {
        formatDate(time) {
            if (time) {
                const date = new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm:ss");
            }
            return "";
        }
    },

    components: {
        "v-goTop": goTop,
        "v-course-detail": courseDetail,
        "v-section": section
        // "v-nav": nav,
        // "v-app": app,
        // "v-feature": feature
    },
    data() {
        return {
            activeName: "first",
            courseHandleType: "",
            courseConcludedDisabled: true,
            originId: null,
            courseName: ""
        };
    },
    computed: {
        ...mapState(["curLanguage"]),

        ...mapGetters(["userInfoData"]),

        currentUserId() {
            return this.userInfoData.id;
        }
    },
    created() {
        this.originId = this.$route.query.courseId;
    },
    methods: {
        goCourseResource() {
            this.$router.push({
                path: "/homePage/courseResource",
                query: {
                    originType: 15,
                    id: this.originId,
                    resourceTitle: this.courseName
                }
            });
        },
        courseLoaded(course) {
            this.courseConcludedDisabled = Number(course.isConcluded) === 1;
            this.courseName = course.name;
        },
        concludeCourse() {
            this.$confirm(
                this.$t("message.concludeTip"),
                this.$t("message.Confirm_Conclude_Course"),
                {
                    confirmButtonText: this.$t("message.Common_confirm"),
                    cancelButtonText: this.$t("message.Cancel"),
                    showClose: false
                }
            )
                .then(() => {
                    this.courseConcludedDisabled = true;
                    this.courseHandleType = "conclude";
                })
                .catch(() => {});
        },

        deleteCourse() {
            this.$confirm(this.$t("message.deletes"), "", {
                confirmButtonText: this.$t("message.Common_confirm"),
                cancelButtonText: this.$t("message.Cancel"),
                showClose: false,
                type: "warning"
            })
                .then(() => {
                    this.courseHandleType = "delete";
                })
                .catch(() => {});
        }
    }
};
</script>

<style scoped="">
.el-form-item__content {
    margin-left: 150px;
}

.course-button {
    border-bottom: 1px solid #409eff;
    padding: 0px;
    border-radius: 0px;
}

.setting-right {
    float: right;
    display: block;
    width: 22%;
    /*position: absolute;
            top:0;
            right: 1%;*/
}

.setting-right .el-button {
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    display: block;
}

.current_users {
    margin-top: 10%;
}

.current_users ul li {
    border-bottom: 1px solid #ccc;
    padding: 3% 1%;
}

.current_users ul li span {
    width: 50%;
    display: inline-block;
}

.setting-right .course-handle:nth-child(n + 1) {
    margin-top: 1em;
    width: 250px;
}
</style>
