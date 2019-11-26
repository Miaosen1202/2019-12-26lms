<template>
    <!--eslint-disable-->
    <div>
        <h1 class="sTitle">SIS {{ $t("message.Import") }}</h1>
        <div class="content-box">
            <!-- 数据文件上传 -->
            <p>
                {{ $t("message.select_csv_file") }}
                <el-upload
                    class="upload-file-btn"
                    :action="uploadUrl"
                    :on-success="handleSuccessCsv"
                    :show-file-list="false"
                    accept=".csv"
                    :file-list="csvFileList"
                >
                    <el-button size="small">
                        {{ $t("message.choose_file") }}
                    </el-button>
                </el-upload>
                {{ $t("message.or_a") }}
                <el-upload
                    class="upload-file-btn"
                    :action="uploadUrl"
                    :on-success="handleSuccessZip"
                    :show-file-list="false"
                    accept=".zip"
                    :file-list="zipFileList"
                >
                    <el-button size="small">
                        {{ $t("message.zip_file") }}
                    </el-button>
                </el-upload>
                <a class="down-template" @click="downTemp">
                    {{ $t("message.down_template") }}
                    <i
                        class="iconfont icon-clouddownloadyunxiazai"
                        style="font-size: 20px; color: #34c29d"
                    />
                </a>
            </p>

            <!-- 无文件提示 -->
            <div v-if="noFileWarn" class="no-file">
                <i class="el-icon-warning" /> &nbsp; &nbsp;
                {{ $t("message.no_file_chosen") }}
            </div>

            <ul class="upFile-list">
                <li v-for="(item, index) in upFileList" :key="index">
                    <a class="upFile-title">{{ item.originName }}</a>
                    <i
                        class="icon iconfont icon-close"
                        style="cursor: pointer; color: #666666;"
                        @click="upFileList.splice(index, 1)"
                    />
                </li>
            </ul>

            <div class="select-box">
                <!--<ul>-->
                <!--&lt;!&ndash; 全批量更新　&ndash;&gt;-->
                <!--<li>-->
                <!--<p>-->
                <!--<el-checkbox v-model="isFullBatchUpdate" :true-label="1" :false-label="0">-->
                <!--{{$t('message.full_batch_update')}}-->
                <!--</el-checkbox>-->
                <!--</p>-->
                <!--<p class="batch-intro"> {{$t('message.full_batch_intro')}} </p>-->
                <!--<p v-if="isFullBatchUpdate == 1">-->
                <!--<label style="color: #333">{{$t('message.Term')}}</label>-->
                <!--<el-select v-model="termVal" :placeholder="$t('message.pls_select')">-->
                <!--<el-option-->
                <!--v-for="item in termOptions"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</p>-->
                <!--</li>-->
                <!--<li style="margin-top:10px">-->
                <!--<p> <el-checkbox v-model="OverrideCheck">{{$t('message.override_ui')}}</el-checkbox></p>-->
                <!--<p class="batch-intro">-->
                <!--{{$t('message.override_ui_intro')}}-->
                <!--</p>-->
                <!--</li> -->
                <!--</ul>-->

                <!--　进度条 || 导入按钮 -->
                <div style="text-align: center">
                    <div v-if="isProgress" class="progress-box">
                        <el-progress
                            :text-inside="true"
                            :stroke-width="18"
                            :percentage="progressPercent"
                            status="success"
                        />
                    </div>
                    <el-button
                        v-if="!isProgress"
                        type="primary"
                        @click="toProcessImport"
                    >
                        {{ $t("message.process_data") }}
                    </el-button>
                </div>
            </div>
        </div>

        <!-- 最近一次导入记录 -->
        <div v-if="lastImport.id" class="last-batch">
            <h1>
                <a class="last-batchTitle"> {{ $t("message.last_batch") }} </a>
                <a class="view-recordBtn" @click="toImportList">
                    {{ $t("message.view_import_record") }}
                </a>
            </h1>

            <table class="batch-table">
                <thead>
                    <tr>
                        <th>{{ $t("message.import_files") }}</th>
                        <th>{{ $t("message.Result") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <h3 class="import-title">
                                {{ $t("message.Started") }} ：{{
                                    utilMethods.formDetialDate(
                                        lastImport.startTime
                                    )
                                }}
                            </h3>
                            <ul class="import-list">
                                <li
                                    v-for="(file,
                                    _index) in lastImport.importFiles"
                                    :key="_index"
                                >
                                    {{ file.fileName }}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <h3 class="import-title">
                                <span class="succ-num">
                                    {{ lastImport.totalNumber }}
                                    {{ $t("message.SIS.nItemImportSuccess") }}:
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.account") }}
                                    {{ lastImport.orgNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.user") }}
                                    {{ lastImport.userNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.term") }}
                                    {{ lastImport.termNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.course") }}
                                    {{ lastImport.courseNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.section") }}
                                    {{ lastImport.sectionNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.enrollment") }}
                                    {{ lastImport.sectionUserNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.group") }}
                                    {{ lastImport.studyGroupNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.groupSet") }}
                                    {{ lastImport.studyGroupSetNumber }},
                                </span>
                                <span class="succ-num">
                                    {{ $t("message.SIS.groupUser") }}
                                    {{ lastImport.studyGroupUserNumber }}
                                </span>
                            </h3>
                            <h3 class="import-prompt">
                                {{
                                    lastImport.errors
                                        ? lastImport.errors.length
                                        : 0
                                }}
                                {{ $t("message.erro_and_warn") }}
                            </h3>
                            <ul class="warn-list">
                                <li
                                    v-for="(err, index) in lastImport.errors"
                                    v-if="index < 50"
                                    :key="index"
                                >
                                    {{ err.fileName }} -
                                    {{ erroInfoByCode(err) }}
                                </li>
                            </ul>
                            <div
                                v-if="lastImport.errors.length >= 50"
                                class="more-errors-hide"
                            >
                                ......
                            </div>
                            <a
                                v-if="lastImport.errors.length > 0"
                                class="complete-warn"
                                @click="downloadErrorCsvFile"
                            >
                                {{
                                    $t("message.SIS.downloadCompleteErrorsTip")
                                }}
                                <i
                                    class="iconfont icon-clouddownloadyunxiazai"
                                    style="font-size: 20px; color: #34c29d"
                                />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--eslint-disable-->
</template>

<script>
/*eslint-disable*/
import utilMethods from "@/utils/utilMethods";
export default {
    data() {
        return {
            uploadUrl: `${process.env.NODE_ENV}/upload`,
            csvFileList: [],
            zipFileList: [],
            zipList: [],
            csvList: [],
            upFileList: [],
            isFullBatchUpdate: 0,
            OverrideCheck: false,
            noFileWarn: false,
            termVal: "",
            termOptions: [
                {
                    value: "0",
                    label: "Default Term"
                }
            ],
            isProgress: false,
            progressPercent: 0,
            importList: [],
            utilMethods,
            percentInterVal: null,
            lastImport: {}
        };
    },
    created() {
        this.getTermList();
        this.getLastImport();
    },
    mounted() {},

    beforeDestroy() {
        clearInterval(this.percentInterVal);
        this.percentInterVal = null;
    },
    methods: {
        downloadErrorCsvFile() {
            const url = `${
                process.env.NODE_ENV
            }/sisImportError/download/direct?batchCode=${encodeURIComponent(
                this.lastImport.batchCode
            )}`;
            utilMethods.downloadFile(url, "errors.csv");
        },

        // updatePercent() {
        //   this.progressPercent = this.progressPercent + 20;
        //   if (this.progressPercent == 100) {
        //     // alert('hahaha'+ this.progressPercent)
        //     clearInterval(this.percentInterVal)
        //     // this.progressPercent = 0;
        //   }
        // },

        queryProcessPercent() {
            // clearInterval(this.percentInterVal);

            this.percentInterVal = 0;
            // 模拟进度条效果
            // this.percentInterVal = setInterval(this.updatePercent, 500);

            // 实际查询方法
            // this.percentInterVal = setInterval(this.getProgressOfImport, 500);
            setTimeout(this.getProgressOfImport, 500);
        },

        // 获取导入进度
        async getProgressOfImport() {
            const res = await this.$getData("/sis/importProcess/query");
            if (res.data.code == 200) {
                const resData = res.data.entity;

                this.progressPercent = resData.percent;

                if (resData.batchCode != "" || resData.percent == 100) {
                    this.isProgress = false;

                    // clearInterval(this.percentInterVal);

                    if (resData.percent == 100) {
                        this.$message.success(
                            this.$t("message.RESOURCE.Import_success")
                        );
                    }

                    this.csvFileList = [];
                    this.zipFileList = [];
                    this.csvList = [];
                    this.zipList = [];
                    this.upFileList = [];
                    this.getLastImport();
                } else {
                    this.isProgress = true;

                    setTimeout(this.getProgressOfImport, 500);
                }
            } else {
                this.$message.error(res.data.message);
            }
        },

        erroInfoByCode(err) {
            let errMsg = "";
            switch (err.errorCode) {
                case 1:
                    errMsg = this.$t("message.SIS.skipUnknownFileType");
                    break;
                case 2:
                    errMsg = this.$t("message.SIS.skipUnknownFileType");
                    break;
                case 3:
                    errMsg = this.$t("message.SIS.skipUnknownFileType");
                    break;
                case 4: // 必填字段为空
                    errMsg =
                        this.$t("message.SIS.No_value_given") +
                        err.fieldName +
                        this.$t("message.SIS.at") +
                        err.rowNumber +
                        this.$t("message.SIS.rows");
                    break;
                case 5:
                    errMsg = `${err.fieldName} '${err.fieldValue}'${this.$t(
                        "message.SIS.fieldFormatErrorSuf"
                    )}`;
                    break;
                case 6: // 关联值不存在
                    errMsg = `${this.$t("message.SIS.valueNotFoundPre")} ${
                        err.fieldName
                    } ${err.fieldValue} ${this.$t("message.SIS.at")} ${
                        err.rowNumber
                    } ${this.$t("message.SIS.rows")}`;
                    // this.$t("message.SIS.associateValueNotFound") + err.fieldName + " " + err.fieldValue;
                    break;
                case 7:
                    errMsg = `${err.fieldName} ${err.fieldValue}${this.$t(
                        "message.SIS.fieldValueIsExistsSuf"
                    )}`;
                    break;
                default:
                    errMsg = "";
            }

            return errMsg;
        },

        // 获取学期下拉列表
        async getTermList() {
            // termOptions
            const res = await this.$getData("/termSelect/list", "get");
            if (res.data.code == 200) {
                const terms = [];
                const entiers = res.data.entity;
                for (let i = 0; i < entiers.length; i++) {
                    if (entiers[i].isDefault == 1 || entiers[i].sisId) {
                        terms.push(entiers[i]);
                    }
                }

                this.termOptions = terms;
                if (this.termOptions.length > 0) {
                    this.termVal = this.termOptions[0].id;
                }
            }
        },

        handleSuccessCsv(res, file, fileList) {
            if (res.code == 200 && res.entity.length > 0) {
                this.$message.success(
                    `${this.$t("message.add_file_success")}: ${
                        res.entity[0].originName
                    }`
                );

                const fileName = file.name;
                for (let i = 0; i < fileList.length; i++) {
                    const f = fileList[i];
                    if (f.name == fileName && i != fileList.length - 1) {
                        fileList.splice(i, 1);
                        break;
                    }
                }
                for (let i = 0; i < this.csvList.length; i++) {
                    const csv = this.csvList[i];
                    if (csv.originName == fileName) {
                        this.csvList.splice(i, 1);
                    }
                }

                this.csvList = this.csvList.concat(res.entity);
                this.upFileList = this.csvList;
                this.zipList = [];
                this.noFileWarn = false;
            }
        },

        handleSuccessZip(res, file, fileList) {
            this.zipList = [];
            if (res.code == 200) {
                this.zipList = res.entity;
                this.$message.success(this.$t("message.add_file_success"));
                this.upFileList = this.zipList;
                this.csvList = [];
                this.noFileWarn = false;
            }
        },

        // 导入数据
        toProcessImport() {
            if (this.zipList.length === 0 && this.csvList.length === 0) {
                this.noFileWarn = true;
                return;
            }

            const tempCsvIds = this.csvList.map(el => el.fileId);
            const params = {
                isFullBatchUpdate: this.isFullBatchUpdate,
                zipFileId:
                    this.zipList.length > 0 ? this.zipList[0].fileId : "",
                csvFileIds: tempCsvIds
            };
            const remainParams = {
                termId: this.termVal
            };
            let lastParams = params;
            if (this.isFullBatchUpdate == 1) {
                lastParams = Object.assign(params, remainParams);
            }

            this.$http
                .post(`${process.env.NODE_ENV}/sis/import/edit`, lastParams)
                .then(res => {
                    if (res.data.code == 200) {
                        this.isProgress = true;
                        this.$message.success("Data is processing");

                        this.queryProcessPercent();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },

        // 下载模板
        downTemp() {
            utilMethods.downloadFile(
                `${process.env.NODE_ENV}/sis/templateDownload/direct`,
                "template.zip"
            );
        },

        /*
         * 获取导入列表
         * 导入列表中，包含当前未导入完成的记录
         * 当最近一次导入未完成时，页面导入进度条展示导入进度
         * 进度条下边的内容区展示最近导入完成的导入任务详情
         */
        async getLastImport() {
            const res = await this.$getData(
                "/sisImport/pageList",
                { pageIndex: 1, pageSize: 2 },
                "get"
            );
            if (res.data.code == 200) {
                const importList = res.data.entity.list || [];

                this.importList = importList;

                if (importList.length > 0 && !importList[0].endTime) {
                    this.isProgress = true;
                    this.queryProcessPercent();
                }

                if (importList.length > 0) {
                    for (let i = 0; i < importList.length; i++) {
                        if (importList[i].endTime) {
                            this.lastImport = importList[i];
                            break;
                        }
                    }
                }
            } else {
                this.$message.error(res.data.message);
            }
        },

        // 获取导入列表
        async getImportList() {
            const res = await this.$getData(
                "/sisImport/pageList",
                { pageIndex: 1, pageSize: 2 },
                "get"
            );
            if (res.data.code == 200) {
                const importList = res.data.entity.list || [];

                this.importList = importList;
                if (importList.length > 0) {
                    for (let i = 0; i < importList.length; i++) {
                        if (importList[i].endTime) {
                            this.lastImport = importList[i];
                            break;
                        }
                    }
                }
            } else {
                this.$message.error(res.data.message);
            }
        },

        // 去历史记录列表页面
        toImportList() {
            // this.$router.push('')
            this.$router.push({ path: "sisImportList" });
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
@import "./sis.less";
</style>
