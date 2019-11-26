<template>
    <div>
        <h2 class="imported-title">
            {{ $t("message.imported_records") }}
        </h2>
        <table class="batch-table">
            <thead>
                <tr>
                    <th>{{ $t("message.import_files") }}</th>
                    <th>{{ $t("message.Result") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in importList" :key="index">
                    <td>
                        <h3 class="import-title">
                            {{ $t("message.Started") }} ：{{
                                utilMethods.formDetialDate(item.startTime)
                            }}
                        </h3>
                        <ul class="import-list">
                            <li
                                v-for="(el, _index) in item.importFiles"
                                :key="_index"
                            >
                                {{ el.fileName }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <!-- 导入每项数量 -->
                        <h3 class="import-title">
                            <span class="succ-num">
                                {{ item.totalNumber }}
                                {{ $t("message.SIS.nItemImportSuccess") }}:
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.account") }}
                                {{ item.orgNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.user") }}
                                {{ item.userNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.term") }}
                                {{ item.termNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.course") }}
                                {{ item.courseNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.section") }}
                                {{ item.sectionNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.enrollment") }}
                                {{ item.sectionUserNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.group") }}
                                {{ item.studyGroupNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.groupSet") }}
                                {{ item.studyGroupSetNumber }},
                            </span>
                            <span class="succ-num">
                                {{ $t("message.SIS.groupUser") }}
                                {{ item.studyGroupUserNumber }}
                            </span>
                        </h3>
                        <h4 class="import-prompt">
                            {{ item.errors.length }}
                            {{ $t("message.erro_and_warn") }}
                            <!--<a class='view-erro' @click="getErroList(item, index)">-->

                            <a
                                v-if="item.errors.length > 0"
                                class="view-erro"
                                @click="item.showErro = !item.showErro"
                            >
                                <i v-show="item.showErro">
                                    {{ $t("message.click_to_view") }}
                                </i>
                                <i v-show="!item.showErro">
                                    {{ $t("message.click_to_hide") }}
                                </i>
                                <!-- {{item.showErro ? $t('message.click_to_view') : $t('message.click_to_hide')}}  -->
                            </a>
                        </h4>
                        <ul v-show="!item.showErro" class="warn-list">
                            <li
                                v-for="(err, eindex) in item.errors"
                                v-show="index < 50"
                                :key="eindex"
                            >
                                {{ err.fileName }} - {{ erroInfoByCode(err) }}
                            </li>
                        </ul>
                        <div
                            v-show="!item.showErro"
                            v-if="item.errors.length >= 50"
                            class="more-errors-hide"
                        >
                            ......
                        </div>
                        <a
                            v-if="item.errors.length > 0"
                            class="complete-warn"
                            @click="downloadErrorCsvFile(item.batchCode)"
                        >
                            {{ $t("message.SIS.downloadCompleteErrorsTip") }}
                            <i
                                class="iconfont icon-clouddownloadyunxiazai"
                                style="font-size: 20px; color: #34c29d"
                            />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalPage"
            @current-change="changePage"
        />
    </div>
</template>

<script>
/*eslint-disable*/
import utilMethods from "@/utils/utilMethods";
export default {
    data() {
        return {
            importList: [],
            utilMethods,
            pageIndex: 1,
            pageSize: 5,
            totalPage: 1,
            erroList: []
        };
    },
    created() {
        this.getImportList();
    },
    methods: {
        downloadErrorCsvFile(batchCode) {
            const url = `${
                process.env.NODE_ENV
            }/sisImportError/download/direct?batchCode=${encodeURIComponent(
                batchCode
            )}`;
            utilMethods.downloadFile(url, "errors.csv");
        },

        // downloadFile(url, filename) {
        //   function handleFile(data) {
        //     filename = filename || url.split("/").pop();
        //     //if `a` element has `download` property
        //     let a = document.createElement('a');
        //     if ("download" in a) {
        //       let file = URL.createObjectURL(this.response || data);
        //       document.body.appendChild(a);
        //       a.style = "display: none";
        //       a.href = file;
        //       a.download = filename;
        //       a.click();
        //       URL.revokeObjectURL(file)
        //       $(a).remove();
        //     } else {
        //       if (navigator.msSaveBlob) {
        //         navigator.msSaveBlob(this.response, filename);
        //       }
        //     }
        //   }
        //
        //   let request = new XMLHttpRequest();
        //   request.onload = handleFile;
        //   request.open("GET", url);
        //   request.responseType = "blob";
        //   // request.setRequestHeader('Access-Token', window.getCookie('Access-Token'));
        //   // dictWin[filename] = $.ligerDialog.waitting('正在下载文件: ' + filename);
        //   request.send();
        // },

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
                    // errMsg = err.fieldName + "" + this.$t("message.SIS.fieldValueIsEmptySuf");
                    errMsg = `No value given for ${err.fieldName} at ${err.rowNumber} rows`;
                    // "No XX given for XXX  at XXXX rows"
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

        async getImportList() {
            const params = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            };
            const res = await this.$getData(
                "/sisImport/pageList",
                params,
                "get"
            );
            if (res.data.code == 200) {
                this.totalPage = Number(res.data.entity.total);
                this.importList = res.data.entity.list;
                for (let i = 0; i < this.importList.length; i++) {
                    // this.importList[i].showErro = true;
                    this.$set(this.importList[i], "showErro", true);
                }
            }
        },
        // 获取错误信息列表
        async getErroList(item, index) {
            // this.$set(this.importList[index], 'showErro', !this.importList[index].showErro)

            if (item.showErro) {
                const params = { batchCode: item.batchCode };
                const res = await this.$getData(
                    "/sisImportError/list",
                    params,
                    "get"
                );
                if (res.data.code == 200) {
                    const errorData = res.data.entity;

                    this.erroList = res.data.entity;

                    this.$set(this.importList[index], "showErro", false);
                    this.$set(this.importList[index], "erros", this.erroList);
                }
            } else {
                this.$set(this.importList[index], "showErro", true);
            }
        },
        // 切换页码
        changePage(curPage) {
            this.pageIndex = curPage;
            this.getImportList();
        }
    }
};
/*eslint-disable*/
</script>

<style lang="less" scoped>
@import "./sis.less";
</style>
