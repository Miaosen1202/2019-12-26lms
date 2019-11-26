<template>
    <div>
        <section class="mainContain">
            <el-form
                ref="liveForm"
                :model="liveForm"
                :rules="liveRules"
                label-width="120px"
            >
                <el-form-item prop="title" label=" ">
                    <el-input
                        v-model="liveForm.title"
                        :placeholder="$t('message.LIVE.Live_title')"
                    />
                </el-form-item>
                <el-form-item prop="description">
                    <ckeditor
                        v-model="liveForm.description"
                        :editor="editor"
                        :config="editorConfig"
                    />
                </el-form-item>
                <div style="width: 500px; margin: 0 auto">
                    <el-form-item
                        prop="postSection"
                        :label="$t('message.LIVE.post_to')"
                    >
                        <el-select
                            v-model="liveForm.postSection"
                            multiple
                            style="width: 100%"
                            @change="changePost"
                        >
                            <el-option
                                v-for="(item, index) in postList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="startTime"
                        :label="$t('message.LIVE.startTime')"
                    >
                        <el-date-picker
                            v-model="liveForm.startTime"
                            style="width: 100%"
                            :picker-options="pickerOptions"
                            type="datetime"
                            placeholder="select date"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="instructor"
                        :label="$t('message.LIVE.Instructor')"
                    >
                        <el-select
                            v-model="liveForm.instructor"
                            style="width: 100%"
                        >
                            <el-option
                                v-for="(item, index) in instructList"
                                :key="index"
                                :label="item.username"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item style="display: block; overflow:hidden">
                        <el-button style="float: left" @click="cancelLive">
                            {{ $t("message.LIVE.Cancel") }}
                        </el-button>
                        <el-button
                            type="primary"
                            style="float: right"
                            @click="toSave('liveForm')"
                        >
                            {{ $t("message.LIVE.Save") }}
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getAssign, tearcherUserList } from "@/api/commonRequest";
import { addLive, getLiveById, modifyLive } from "@/api/liveRequst";
/*eslint-disable*/
export default {
    data() {
        const nowTimeRule = (rule, value, callback) => {
            const nowTime = new Date().getTime();
            const selectTime = new Date(value).getTime();
            if (selectTime <= nowTime) {
                return callback(
                    new Error(
                        "Live broadcasting should not start earlier than the current time ."
                    )
                );
            }
            callback();
        };
        return {
            editor: ClassicEditor,
            editorConfig: {
                placeholder: "description……",
                ckfinder: {
                    uploadUrl: `${process.env.NODE_ENV}/ckupload`
                }
            },
            liveType: "",
            courseId: "",
            liveForm: {
                title: "",
                description: "",
                postSection: ["all"],
                startTime: "",
                instructor: ""
            },
            liveRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.LIVE.title_required"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 200,
                        message: this.$t("message.LIVE.title_len_limit"),
                        trigger: "blur"
                    }
                ],
                postSection: [
                    {
                        required: true,
                        message: this.$t("message.LIVE.section_required"),
                        trigger: "change"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        message: this.$t("message.LIVE.startTime_required"),
                        trigger: "blur"
                    },
                    { validator: nowTimeRule, trigger: "blur" }
                ],
                instructor: [
                    {
                        required: true,
                        message: this.$t("message.LIVE.startTime_required"),
                        trigger: "blur"
                    }
                ]
            },
            pickerOptions: {
                disabledDate: nowDate => nowDate.getTime() < Date.now() - 8.64e7
            },
            postList: [
                {
                    type: 1,
                    name: this.$t("message.LIVE.All_Sections"),
                    id: "all"
                }
            ],
            instructList: [],
            liveId: ""
        };
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        userId() {
            return this.userInfoData.id;
        }
    },
    created() {
        this.liveType = this.$route.query.type;
        this.courseId = this.$route.query.courseId;
        this.getAssign();
        this.getTearcherUserList();
        if (this.liveType == "add") {
            this.liveForm.instructor = this.userId;
        } else if (this.liveType == "edit") {
            this.liveId = this.$route.query.liveId;
            this.getLiveById();
        }
    },
    methods: {
        async getTearcherUserList() {
            // 获取instructor列表
            const params = { courseId: this.courseId };
            const res = await tearcherUserList(params);
            // console.log('res', res)
            if (res.data.code == 200) {
                this.instructList = res.data.entity;
                this.liveForm.instructor = this.userId;
            }
        },
        async getAssign() {
            // 获取post to 数组
            const params = { data: Number(this.courseId) };
            const res = await getAssign(params);
            if (res.data.code == 200) {
                const sectionList = res.data.entity.sections;
                this.postList = this.postList.concat(sectionList);
            }
        },
        changePost(val) {
            // 选中post to数组
            if (val.indexOf("all") == 0 && val.length > 1) {
                this.liveForm.postSection.splice(0, 1);
            } else if (val.indexOf("all") > 0) {
                const _index = val.indexOf("all");
                this.liveForm.postSection = this.liveForm.postSection.splice(
                    _index,
                    1
                );
            }
        },
        toSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.liveType == "add") {
                        this.addLive();
                    } else if (this.liveType == "edit") {
                        this.editLive();
                    }
                } else {
                    return false;
                }
            });
        },
        operateAssign() {
            const tempStartTime = new Date(this.liveForm.startTime).getTime();
            const arr = [];
            if (this.liveForm.postSection.indexOf("all") > -1) {
                arr.push({
                    assignType: 1,
                    startTime: tempStartTime
                });
            } else {
                for (let i = 0; i < this.liveForm.postSection.length; i++) {
                    arr.push({
                        assignId: this.liveForm.postSection[i],
                        assignType: 2,
                        startTime: tempStartTime
                    });
                }
            }
            return arr;
        },
        async addLive() {
            // 增加直播
            const tempStartTime = new Date(this.liveForm.startTime).getTime();
            let initParams = {
                courseId: this.courseId,
                title: this.liveForm.title,
                description: this.liveForm.description,
                instructor: Number(this.liveForm.instructor),
                startTime: tempStartTime
            };
            const assign = this.operateAssign();
            initParams = Object.assign(initParams, { assign });
            const res = await addLive(initParams);
            if (res.data.code == 200) {
                this.$message({
                    message: this.$t("message.LIVE.add_live_success"),
                    type: "success"
                });
                this.$router.push({
                    path: "liveList",
                    query: { courseId: this.courseId }
                });
            }
        },
        async getLiveById() {
            // 根据ID获取直播信息
            const params = { data: Number(this.liveId) };
            const res = await getLiveById(params);
            if (res.data.code == 200) {
                const liveObj = res.data.entity;
                this.liveForm.title = liveObj.title;
                this.liveForm.startTime = liveObj.startTime;
                this.liveForm.description = liveObj.description;
                this.liveForm.instructor = liveObj.instructorId;
                const isAll = liveObj.assigns.some(
                    item => item.assignType == 1
                );
                if (isAll) {
                    this.liveForm.postSection = ["all"];
                } else {
                    this.liveForm.postSection = [];
                    for (let i = 0; i < liveObj.assigns.length; i++) {
                        this.liveForm.postSection.push(
                            liveObj.assigns[i].assignId
                        );
                    }
                }
            }
        },
        cancelLive() {
            this.$router.push({
                path: "liveList",
                query: { courseId: this.courseId }
            });
        },

        async editLive() {
            // 编辑直播
            const tempStartTime = new Date(this.liveForm.startTime).getTime();
            const assign = this.operateAssign();
            let params = {
                id: this.liveId,
                courseId: this.courseId,
                title: this.liveForm.title,
                description: this.liveForm.description,
                instructor: this.liveForm.instructor,
                startTime: tempStartTime
            };
            params = Object.assign(params, { assign });
            const res = await modifyLive(params);
            if (res.data.code == 200) {
                this.$message({
                    message: this.$t("message.LIVE.edit_live_success"),
                    type: "success"
                });
                this.$router.push({
                    path: "liveList",
                    query: { courseId: this.courseId }
                });
            }
        }
    },
    components: {}
};
/*eslint-disable*/
</script>
<style lang="less" scoped>
.mainContain {
    width: 80%;
}
</style>
