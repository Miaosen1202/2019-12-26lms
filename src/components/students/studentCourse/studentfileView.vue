<template>
    <div>
        <div v-if="Number(originType) === 4">
            <p>{{ moduleItem.fileName }}</p>
            <a
                type="text"
                style="color: #26BE96;border-bottom: 1px solid #26BE96;
                cursor: pointer;margin-bottom: 14px;
                margin-top:6px;display: inline-block"
                @click="downFile"
            >
                {{ moduleItem.fileName }}
                <i class="iconfont icon-clouddownloadyunxiazai" />
            </a>
            <div style="height: 650px;overflow: auto">
                <previewFile :prop-obj="propObj" />
            </div>
        </div>
        <div v-if="Number(originType) === 14">
            <p style="margin-top:40px;margin-bottom: 20px">
                This site needs to be opened in a new browser window.
            </p>
            <!--<p
                class="descriptionFold"
                style="cursor: pointer"
                @click="richTextClick($event)"
            >
                {{moduleItem.url}}
            </p>-->
            <div class="urlpagename">
                Open
                <a class="a-style" @click="linkDownload(moduleItem.url)">{{
                    moduleItem.pageName
                }}</a>
                in a new window
            </div>
            <p style="border-bottom: 1px solid #ccc;margin-top: 20px" />
        </div>
        <div>
            <studentnextPrevious />
        </div>
    </div>
</template>

<script>
import utilMethods from "@/utils/utilMethods";
import previewFile from "@/utils/previewFile.vue";
import studentnextPrevious from "../../../utils/studentnextPrevious.vue";

export default {
    components: {
        previewFile,
        studentnextPrevious
    },
    filters: {
        formatterDate(val) {
            if (!val) {
                return "-";
            }
            return utilMethods.formatDate(val);
        }
    },
    data() {
        return {
            moduleItem: {},
            previous: {},
            next: {},
            selectedCurData: {},
            courseId: this.$route.query.courseId,
            data: this.$route.query.modulesData,
            originType: this.$route.query.originType,
            propObj: {
                testUrl: this.$route.query.fileUrl,
                testType: this.$route.query.fileType
            }
        };
    },
    mounted() {
        this.goPreview();
    },
    methods: {
        async getAssignList() {
            let data = `courseId=${this.courseId}`;
            data += `&originId=${this.assignmentId}`;
            data += `&originType=${1}`;
            const result = await this.$getData(
                `/moduleItemAssign/list?${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.tableData = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        downFile() {
            const url = `${process.env.NODE_ENV}/userFile/download/direct?id=${this.moduleItem.fileId}`;
            const { fileName } = this.moduleItem;
            utilMethods.downloadFile(url, fileName);
        },
        // 预览文件
        goPreview() {
            this.$http
                .get(
                    `${process.env.NODE_ENV}/moduleItemContent/get?data=${this.data}`
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        this.moduleItem = res.data.entity.moduleItem;
                        this.showFile();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        showFile() {
            const moduleItemedit = {
                originId: this.moduleItem.originId,
                originType: this.moduleItem.originType
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/moduleItem/complete/edit`,
                    moduleItemedit
                )
                .then(res => {
                    if (Number(res.data.code) === 200) {
                        // dudu
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        richTextClick($event) {
            if ($event.target.tagName.toLowerCase() === "a") {
                // a标签，新标签页打开
                $event.target.setAttribute("target", "_blank");
            }
        },
        linkDownload(url) {
            window.open(url, "_blank"); // 新窗口打开外链接
        }
    }
};
</script>

<style scoped>
.a-style {
    color: #0500ee;
    cursor: pointer;
    text-decoration: underline;
}

.multiple-assign {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 86%;
    word-break: break-all;
    word-wrap: break-word;
}

.addto {
    padding: 2%;
    margin-bottom: 2%;
}

.homework_detail {
    width: 80%;

    line-height: 50px;
}

.homework_form {
    width: 80%;
    margin-left: 103px;
}

.homework_form p {
    display: flex;
}

.homework_form p .label {
    width: 137px;
}

.homework_border {
    display: flex;
    margin-bottom: 15px;
}

.homework_border .label {
    width: 137px;
}

.homework_border_ff {
    width: 80%;
    border: 1px solid #ccc;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
}

.dess {
    text-align: center;
}

.checkblue {
    color: #0e38b1;
}

.homework_select {
    width: 100%;
}

.pro {
    margin-left: 10px;
}

.homework_text {
    line-height: 25px;
}

.homework_find {
    position: relative;
}

.find_right {
    position: absolute;
    right: 0;
    top: 5px;
}

.button_b1 {
    margin: 10px 0;
}

.homework_border_father {
    display: flex;
    justify-content: space-between;
}

.homework_border_left {
    width: 49%;
}

.homework_border_right {
    width: 49%;
}

.homework_border_p1 {
    position: relative;
}

.homework_border_p1 span {
    position: absolute;
    right: 0;
    top: 6px;
    border: 1px solid #ccc;
    height: 28px;
    padding: 0 5px;
}

.el_checkbox {
}

.text_right {
    text-align: right;
}

.button_father {
    display: flex;
    justify-content: space-between;
    padding-left: 182px;
}

.button_father:nth-child(1) {
}

.button_father:nth-child(2) {
}

.homework_border_data {
    width: 100%;
}

.homework_name {
    width: 80%;
    margin-left: 103px;
}

.mini {
    width: 50px;
}

.newsgroup {
}

.newsgroup p {
}

.newsgroup p label {
    display: inline-block;
    width: 90px;
    margin-right: 10px;
    text-align: right;
}

.groupname {
    width: 300px;
}

.margin_right {
    margin-right: 10px;
}

.typemarginleft {
    margin-left: 30px;
}

.Tips {
    color: #969896;
    margin-left: 7px;
}

.urlpagename {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid rgba(170, 170, 170, 1);
    width: 60%;
    text-align: center;
    margin: 0 auto;
    word-wrap: break-word;
}
</style>
