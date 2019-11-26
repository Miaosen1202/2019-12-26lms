<template>
    <div style="padding: 50px 30px 0 0">
        <div class="resourceHeader">
            <h1>{{ $t("message.RESOURCE.Import_resource") }}</h1>
            <a class="back" @click="courseResourceBack">
                {{ $t("message.RESOURCE.Back") }}
                <i
                    class="iconfont icon-ai207"
                    style="font-size: 24px; vertical-align:top; color: #666"
                />
            </a>
        </div>
        <div class="resourceMain">
            <div class="resourceLeft">
                <h2 class="resourceTitle">
                    <i
                        v-show="Number(originType) === 1"
                        class="iconfont icon-edit1"
                    />
                    <i
                        v-show="Number(originType) === 2"
                        class="iconfont icon-liaotian "
                    />
                    <i
                        v-show="Number(originType) === 3"
                        class="iconfont icon--xiugaineirong -"
                    />
                    <i
                        v-show="Number(originType) === 15"
                        class="iconfont icon-shu"
                    />

                    {{ originName }}
                </h2>
                <h2 v-if="versionData.resource" class="resourceName">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="versionData.resource.name"
                        placement="top-start"
                    >
                        <span>{{ versionData.resource.name }}</span>
                    </el-tooltip>
                </h2>
                <div class="res-version">
                    <p v-if="versionData.latestVersion">
                        {{ $t("message.RESOURCE.Latest_version") }} &nbsp;
                        &nbsp;
                        {{ versionData.latestVersion.version | formDate }}
                    </p>
                    <p
                        v-if="versionData.latestVersion"
                        style="word-break: break-all; width: 840px; margin-top:10px"
                    >
                        {{ versionData.latestVersion.description }}
                    </p>
                </div>
                <div class="version-course">
                    <div
                        v-if="hasUpdate"
                        style="margin-right: 30px"
                        class="version-box"
                    >
                        <h1 class="version-title">
                            {{ $t("message.RESOURCE.Update_follwing_course") }}
                        </h1>
                        <div class="version-block">
                            <el-checkbox-group v-model="updateCheckList">
                                <p
                                    v-for="item in updateCourseList"
                                    :key="item.id"
                                >
                                    <el-checkbox :label="item.id">
                                        {{ item.name }}
                                    </el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="version-box">
                        <h1 v-if="hasUpdate" class="version-title">
                            {{
                                $t(
                                    "message.RESOURCE.Duplicate_followinf_course"
                                )
                            }}
                        </h1>
                        <h1 v-if="!hasUpdate" class="version-title">
                            {{ $t("message.RESOURCE.Select_courses") }}
                        </h1>
                        <div class="version-block">
                            <el-checkbox-group v-model="importCheckList">
                                <p
                                    v-for="item in importCourseList"
                                    :key="item.id"
                                >
                                    <el-checkbox :label="item.id">
                                        {{ item.name }}
                                    </el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="version-bottom">
                    <p v-show="isWarn" class="import-warn">
                        {{ $t("message.RESOURCE.Selct_course_import") }}
                    </p>
                    <el-button @click="handelCancel">
                        {{ $t("message.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="handleImport">
                        {{ $t("message.Duplicate") }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getImportCourse, addImport, modifyImport } from "@/api/resourceRequst";
import { formatDate } from "@/utils/date";

export default {
    name: "NewVersion",
    filters: {
        formDate(val) {
            if (val) {
                const tempVal = Number(val);
                const tempDate = new Date(tempVal);
                return formatDate(tempDate, "yyyy-MM-dd hh:mm:ss");
            }
            return "";
        }
    },
    data() {
        return {
            isWarn: false,
            originId: "",
            originType: "",
            hasUpdate: false,
            versionData: {},
            importCheckList: [],
            importCourseList: [],
            updateCheckList: [],
            updateCourseList: [],
            fromPath: ""
        };
    },
    computed: {
        originName() {
            switch (Number(this.originType)) {
                case 1:
                    return this.$t("message.Grade_Assignments");
                case 2:
                    return this.$t("message.Grade_Comments");
                case 3:
                    return this.$t("message.Grade_Quize");
                case 15:
                    return this.$t("message.Course");
                default:
                    return true;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        if (from.fullPath !== "/") {
            localStorage.setItem("fromPath", from.fullPath);
        }
        next();
    },
    created() {
        // console.log('route', this.$route)
        this.originId = this.$route.query.originId;
        this.originType = this.$route.query.originType;
        // this.hasUpdate = Number(this.$route.query.hasUpdate) !== 0;
        this.getCourse();
        this.fromPath = localStorage.getItem("fromPath");
    },
    methods: {
        courseResourceBack() {
            this.$router.push(this.fromPath);
        },
        async getCourse() {
            const param = { data: Number(this.originId) };
            const res = await getImportCourse(param);
            if (Number(res.data.code) === 200) {
                // console.log('res', res)
                this.versionData = res.data.entity;
                const tempVersionData = res.data.entity;
                this.importCourseList = tempVersionData.notImportedCourses;
                this.updateCourseList = tempVersionData.importedCourses;
                this.hasUpdate = this.updateCourseList.length !== 0;
            }
        },
        async handleImport() {
            if (this.hasUpdate) {
                if (
                    this.importCheckList.length <= 0 &&
                    this.updateCheckList.length <= 0
                ) {
                    this.isWarn = true;
                    //    this.$message.error('Please select at least one course  to be imported.');
                    return false;
                }
                const isAdd = await this.addImport();
                const isImport = await this.modifyImport();
                if (isAdd && isImport) {
                    this.$message.success(
                        this.$t("message.RESOURCE.Import_success")
                    );
                } else {
                    this.$message.error(
                        this.$t("message.RESOURCE.Import_failed")
                    );
                }
            } else {
                if (this.importCheckList.length <= 0) {
                    this.isWarn = true;
                    // this.$message.error('Please select at least one course  to be imported.');
                    return false;
                }
                const isImport = await this.addImport();
                if (isImport) {
                    this.$message.success(
                        this.$t("message.RESOURCE.Import_success")
                    );
                } else {
                    this.$message.error(
                        this.$t("message.RESOURCE.Import_failed")
                    );
                }
            }
            this.$router.push(this.fromPath);
            return true;
        },
        async addImport() {
            const tempCourseIds = this.importCheckList;
            const param = {
                resourceId: Number(this.originId),
                courseIds: tempCourseIds
            };
            const res = await addImport(param);
            if (Number(res.data.code) === 200) {
                return true;
            }
            return false;
        },

        async modifyImport() {
            const tempCourseIds = this.updateCheckList;
            const param = {
                resourceId: Number(this.originId),
                courseIds: tempCourseIds
            };
            const res = await modifyImport(param);
            if (Number(res.data.code) === 200) {
                return true;
            }
            return false;
        },
        handelCancel() {
            this.$router.push(this.fromPath);
        }
    }
};
</script>

<style lang="less" scoped>
@import "../course/homeCourse/reCourse.less";
.resourceLeft {
    width: 100% !important;
}
.resourceName {
    width: 540px;
    font-size: 20px;
    color: #333;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.res-version {
    margin-top: 20px;
}
.version-course {
    margin-top: 40px;
    // border: 1px solid red;
    overflow: hidden;
    .version-title {
        color: #666;
        font-size: 14px;
        line-height: 16px;
        font-weight: bold;
        margin-bottom: 12px;
    }
    .version-box {
        width: 600px;
        box-sizing: border-box;
        float: left;
        .version-block {
            border: 1px solid #aaa;
            width: 100%;
            height: 326px;
            overflow-y: scroll;
            box-sizing: border-box;
            padding-left: 20px;
            p {
                margin: 20px 0;
            }
        }
    }
}
.version-bottom {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    text-align: right;
}
.import-warn {
    color: #f56c6c;
    font-size: 14px;
    display: inline-block;
    margin-right: 20px;
}
</style>
