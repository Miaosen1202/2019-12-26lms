<template>
    <div>
        <div>
            <el-container>
                <el-aside width="220px" class="side-content">
                    <div class="side-tree">
                        <el-tree
                            ref="fileTree"
                            node-key="treeId"
                            :highlight-current="true"
                            :check-on-click-node="true"
                            :expand-on-click-node="true"
                            :props="props1"
                            :load="loadNode1"
                            :default-expanded-keys="treeExpandeKeys"
                            :render-content="renderContent"
                            lazy
                            @node-click="nodeClick"
                        />
                    </div>
                </el-aside>
                <el-main class="main-content">
                    <div class="button-box" style="border: 1px solid #fff">
                        <div class="button-left">
                            <div v-show="buttonShow">
                                <el-button
                                    type="plain"
                                    icon="el-icon-view"
                                    :disabled="!canView"
                                    @click="goPreview"
                                >
                                    {{ $t("message.View_File") }}
                                </el-button>
                                <el-button
                                    v-show="isSystem && studentLimit"
                                    type="plain"
                                    icon="iconfont icon-zuzhiguanli-"
                                    @click="openPermisson"
                                >
                                    {{ $t("message.Manage_Access") }}
                                </el-button>
                                <el-button
                                    type="plain"
                                    icon="iconfont icon-clouddownloadyunxiazai"
                                    @click="downFile"
                                >
                                    {{ $t("message.Download") }}
                                </el-button>
                                <el-button
                                    v-show="isSystem && studentLimit"
                                    type="plain"
                                    icon="el-icon-rank"
                                    @click="openMove"
                                >
                                    {{ $t("message.Move") }}
                                </el-button>
                                <el-button
                                    v-show="isSystem && studentLimit"
                                    type="plain"
                                    icon="el-icon-delete"
                                    @click="isDel = true"
                                >
                                    {{ $t("message.Delete") }}
                                </el-button>
                            </div>
                        </div>
                        <div class="button-right">
                            <el-button
                                v-show="canAddFolder && canUpload"
                                type="plain"
                                icon="el-icon-circle-plus-outline"
                                @click="isAddFolder = true"
                            >
                                {{ $t("message.Folder") }}
                            </el-button>
                            <el-button
                                v-show="canUpload"
                                type="primary"
                                @click="handleUp"
                            >
                                <i
                                    class="iconfont icon-Upload"
                                    style="font-size: 12px"
                                />
                                {{ $t("message.Upload") }}
                            </el-button>
                        </div>
                    </div>
                    <div>
                        <el-upload
                            ref="fileUpload"
                            :style="{ opacity: btnOpacoty }"
                            class="upload-demo"
                            :action="uploadUrl"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :on-progress="fileProgress"
                            :on-change="beforeFileUpload"
                            :limit="1"
                            :on-error="handleErro"
                            :auto-upload="false"
                            :file-list="fileList"
                        >
                            <el-button
                                id="uploadBtn"
                                size="small"
                                type="primary"
                                style="opacity: 0"
                            >
                                {{ $t("message.Upload") }}
                            </el-button>
                            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
                    </div>
                    <el-progress
                        v-if="uploadFlag"
                        :percentage="UploadPercent"
                        style="margin-top:10px;"
                    />
                    <div class="syllabus_list">
                        <el-table
                            id="fileTable"
                            ref="fileTable"
                            v-loading="loading"
                            class="folder-table"
                            :data="tableData"
                            highlight-current-row
                            :default-sort="{
                                prop: 'createTime',
                                order: 'descending'
                            }"
                            style="width: 100%;border: 1px solid #fff"
                            @current-change="handleCurrentChange"
                        >
                            <el-table-column
                                width="160"
                                sortable
                                prop="fileName"
                                :label="$t('message.Name')"
                            >
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isInput">
                                        <span
                                            v-if="!scope.row.fileType"
                                            class="fileIcon"
                                        >
                                            <i
                                                class="iconfont icon-wenjianjia1"
                                            />
                                        </span>
                                        <span
                                            v-if="
                                                fileTypeData.imgList.indexOf(
                                                    scope.row.fileType
                                                ) > -1
                                            "
                                            class="fileIcon"
                                        >
                                            <img
                                                :src="
                                                    fileUrl +
                                                        scope.row.fileUrl +
                                                        '?s=thumb&a=18x18'
                                                "
                                        /></span>

                                        <span
                                            v-if="
                                                fileTypeData.docList.indexOf(
                                                    scope.row.fileType
                                                ) > -1
                                            "
                                            class="fileIcon"
                                        >
                                            <i class="iconfont icon-doctext" />
                                        </span>
                                        <span
                                            v-if="
                                                fileTypeData.excelList.indexOf(
                                                    scope.row.fileType
                                                ) > -1
                                            "
                                            class="fileIcon"
                                        >
                                            <i class="iconfont icon-Excel" />
                                        </span>
                                        <span
                                            v-if="
                                                fileTypeData.mp4List.indexOf(
                                                    scope.row.fileType
                                                ) > -1
                                            "
                                            class="fileIcon"
                                        >
                                            <i class="iconfont icon-MP" />
                                        </span>
                                        <span
                                            v-if="
                                                fileTypeData.pdfList.indexOf(
                                                    scope.row.fileType
                                                ) > -1
                                            "
                                            class="fileIcon"
                                        >
                                            <i class="iconfont icon-pdf1" />
                                        </span>
                                        <span
                                            v-if="
                                                fileTypeData.pptList.indexOf(
                                                    scope.row.fileType
                                                ) > -1
                                            "
                                            class="fileIcon"
                                        >
                                            <i class="iconfont icon-PPT" />
                                        </span>
                                        <span
                                            v-if="
                                                scope.row.fileType &&
                                                    fileTypeData.imgList.indexOf(
                                                        scope.row.fileType
                                                    ) <= -1 &&
                                                    fileTypeData.docList.indexOf(
                                                        scope.row.fileType
                                                    ) <= -1 &&
                                                    fileTypeData.excelList.indexOf(
                                                        scope.row.fileType
                                                    ) <= -1 &&
                                                    fileTypeData.mp4List.indexOf(
                                                        scope.row.fileType
                                                    ) <= -1 &&
                                                    fileTypeData.pdfList.indexOf(
                                                        scope.row.fileType
                                                    ) <= -1 &&
                                                    fileTypeData.pptList.indexOf(
                                                        scope.row.fileType
                                                    ) <= -1
                                            "
                                            class="fileIcon"
                                        >
                                            <i class="iconfont icon-file" />
                                        </span>
                                        <span class="fileName">{{
                                            scope.row.fileName
                                        }}</span>
                                    </div>
                                    <div v-else>
                                        <el-input
                                            v-model="scope.row.fileName"
                                            style="width:140px"
                                            maxlength="200"
                                        />
                                        <a
                                            class="reNameTag"
                                            @click="cancelReName(scope.row)"
                                            ><i class="el-icon-close"
                                        /></a>
                                        <a
                                            class="reNameTag"
                                            @click="reName(scope.row)"
                                            ><i class="el-icon-check"
                                        /></a>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                sortable
                                prop="createTime"
                                :label="$t('message.Date_Created')"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.createTime | formatDate }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                sortable
                                prop="updateTime"
                                :label="$t('message.Date_Modified')"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.updateTime | formatDate }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                sortable
                                prop="updateUserName"
                                :label="$t('message.Modified_By')"
                            >
                                <template slot-scope="scope">
                                    {{ scope.row.updateUserName }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('message.Size')"
                                width="90"
                                prop="fileSize"
                                sortable
                            >
                                <template slot-scope="scope">
                                    <!-- {{scope.row.fileSize}} -->
                                    {{
                                        utilMethods.formatFileSize(
                                            scope.row.fileSize
                                        )
                                    }}
                                </template>
                            </el-table-column>
                            <el-table-column label=" " width="60">
                                <template slot-scope="scope">
                                    <i
                                        v-show="scope.row.status === 1"
                                        class="iconfont icon-duigou"
                                        style="color:#74c34c"
                                    />
                                    <i
                                        v-show="scope.row.status === 2"
                                        class="iconfont icon-Group-"
                                        style="color:#999"
                                    />
                                    <i
                                        v-show="scope.row.status === 3"
                                        class="iconfont icon-Group--copy"
                                        style="color:#999"
                                    />
                                    <el-popover
                                        placement="bottom-end"
                                        trigger="click"
                                    >
                                        <ul class="operate-list">
                                            <li>
                                                <a @click="downFile"
                                                    ><i
                                                        class="iconfont icon-clouddownloadyunxiazai"
                                                    />{{
                                                        $t("message.Download")
                                                    }}</a
                                                >
                                            </li>
                                            <li
                                                v-show="
                                                    scope.row.isSystemLevel ===
                                                        0 &&
                                                        scope.row.spaceType !==
                                                            1
                                                "
                                            >
                                                <a @click="toReName(scope.row)"
                                                    ><i
                                                        class="iconfont icon-edit"
                                                    />{{
                                                        $t("message.Rename")
                                                    }}</a
                                                >
                                            </li>
                                            <li
                                                v-show="
                                                    scope.row.isSystemLevel ===
                                                        0 &&
                                                        scope.row.spaceType !==
                                                            1
                                                "
                                            >
                                                <a @click="openMove"
                                                    ><i
                                                        class="iconfont icon-move"
                                                    />{{
                                                        $t("message.Move")
                                                    }}</a
                                                >
                                            </li>
                                            <li
                                                v-show="
                                                    scope.row.isSystemLevel ===
                                                        0 &&
                                                        scope.row.spaceType !==
                                                            1
                                                "
                                            >
                                                <a @click="openDelFile"
                                                    ><i
                                                        class="iconfont icon-delete"
                                                    />{{
                                                        $t("message.Delete")
                                                    }}</a
                                                >
                                            </li>
                                        </ul>
                                        <i
                                            slot="reference"
                                            class="iconfont icon-morevert"
                                            style="cursor: pointer"
                                        />
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <div
                                slot="empty"
                                style="text-align: center; color:#333;line-height:30px;"
                            >
                                <p>{{ $t("message.folder_empty") }}</p>
                            </div>
                        </el-table>
                    </div>
                </el-main>
            </el-container>
        </div>
        <!-- 预览查看页面 -->
        <el-dialog
            :visible.sync="isPreview"
            :title="selectedCurData.fileName"
            width="70%"
            :before-close="handleClose"
        >
            <div style="height: 450px; overflow-y:scroll">
                <previewFile :prop-obj="propObj" />
            </div>
        </el-dialog>
        <!--start: 添加文件弹窗-->
        <el-dialog :visible.sync="isAddFolder" width="30%" center>
            <div slot="title" class="dialog-title">
                <h1>{{ $t("message.add_title") }}</h1>
            </div>
            <div style="text-align: center">
                <el-form
                    ref="addFolderForm"
                    :model="addFolderForm"
                    :rules="addFolderRules"
                    label-width="120px"
                >
                    <el-form-item
                        :label="$t('message.CALENDAR.Folder_name')"
                        prop="addFolderName"
                    >
                        <el-input
                            v-model="addFolderForm.addFolderName"
                            maxlength="200"
                            :placeholder="$t('message.enter_file')"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="isAddFolder = false">
                            {{ $t("message.Cancel") }}
                        </el-button>
                        <el-button
                            type="primary"
                            @click="addFolder('addFolderForm')"
                        >
                            {{ $t("message.OK") }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--end: 添加文件弹窗-->
        <!--start: edit permisson 弹窗-->
        <el-dialog :visible.sync="isPermisson" width="40%" center>
            <div slot="title" class="dialog-title">
                <h1>{{ $t("message.Editing_permissions") }}</h1>
            </div>
            <div>
                <el-radio-group v-model="permissonRadio">
                    <el-radio :label="1" class="radioItem">
                        {{ $t("message.Published") }}
                    </el-radio>
                    <el-radio :label="2" class="radioItem">
                        {{ $t("message.UnPublished") }}
                    </el-radio>
                    <el-radio :label="3" class="radioItem">
                        {{ $t("message.Restricted_Access") }}
                    </el-radio>
                </el-radio-group>

                <div v-show="permissonRadio === 3" style="padding-left: 20px">
                    <el-radio-group v-model="accessRadio" class="access-box">
                        <el-radio :label="2" class="radioItem">
                            {{ $t("message.hidden_Files_Text") }}
                        </el-radio>
                        <el-radio :label="3" class="radioItem">
                            {{ $t("message.Schedule_student_availability") }}
                        </el-radio>
                        <div v-show="accessRadio === 3" class="date-box">
                            <div class="date-group">
                                <span class="demonstration">
                                    {{ $t("message.Available_From") }}
                                    &nbsp;</span
                                >
                                <el-date-picker
                                    v-model="startDate"
                                    type="date"
                                    :placeholder="$t('message.select_Date')"
                                />
                            </div>
                            <div class="date-group">
                                <span class="demonstration"
                                    >{{
                                        $t("message.Available_Until")
                                    }}
                                    &nbsp;&nbsp;</span
                                >
                                <el-date-picker
                                    v-model="endDate"
                                    type="date"
                                    :placeholder="$t('message.select_Date')"
                                />
                            </div>
                            <h2 v-show="isPrompt" class="prompText">
                                {{ $t("message.start_no_end") }}
                            </h2>
                        </div>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isPermisson = false">
                    {{ $t("message.Cancel") }}</el-button
                >
                <el-button type="primary" @click="editStatus">{{
                    $t("message.OK")
                }}</el-button>
            </span>
        </el-dialog>
        <!--end: permisson 弹窗-->
        <!--start: Move 弹窗-->
        <el-dialog :visible.sync="isMove" width="30%" center>
            <div slot="title" class="dialog-title">
                <h1>{{ $t("message.move_Title") }}</h1>
            </div>
            <div>
                <el-tree
                    :props="props1"
                    :load="loadNode2"
                    :render-content="renderContent"
                    lazy
                    @node-click="moveNodeClick"
                />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isMove = false">{{
                    $t("message.Cancel")
                }}</el-button>
                <el-button v-show="canMove" type="primary" @click="moveFile">{{
                    $t("message.Move")
                }}</el-button>
                <el-button
                    v-show="!hasCourseId && canCopy"
                    type="primary"
                    @click="copyFile"
                    >{{ $t("message.copy_folder") }}</el-button
                >
            </span>
        </el-dialog>
        <!--end: Move弹窗-->
        <!--start: 删除弹窗-->
        <el-dialog :visible.sync="isDel" width="30%" center>
            <div slot="title" class="dialog-title">
                <h1>{{ $t("message.Delete_Alarm") }}</h1>
            </div>
            <p>{{ $t("message.Delete_Text") }} {{ delFileName }}?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDel = false">{{
                    $t("message.Cancel")
                }}</el-button>
                <el-button type="primary" @click="delTableFile">{{
                    $t("message.OK")
                }}</el-button>
            </span>
        </el-dialog>
        <!--end: 删除弹窗-->
        <!-- start: 提示重命弹窗 -->
        <el-dialog :visible.sync="isNuptial" width="30%" center title="Copy">
            <p>
                {{ $t("message.CALENDAR.Item_named") }} " {{ nuptialName }} "
                {{ $t("message.CALENDAR.Exits_text") }}
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeName">
                    {{ $t("message.CALENDAR.Change_name") }}
                </el-button>
                <el-button type="primary" @click="changeAddFile('replace')">
                    {{ $t("message.CALENDAR.Replace") }}
                </el-button>
            </span>
        </el-dialog>
        <!-- end: 提示重命弹窗 -->
        <!-- start: 重命名弹窗 -->
        <el-dialog :visible.sync="toNuptial" width="30%" center title="Copy">
            <div>
                <p>
                    {{ $t("message.CALENDAR.Change") }} "{{ nuptialName }}"
                    {{ $t("message.CALENDAR.to") }}
                </p>
                <p>
                    {{ $t("message.CALENDAR.name") }}:
                    <el-input v-model="newNuptialName" placeholder="" />
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="backNuptial">
                    {{ $t("message.RESOURCE.Back") }}
                </el-button>
                <el-button
                    type="primary"
                    :disabled="newNuptialName === nuptialName"
                    @click="changeAddFile('change')"
                >
                    {{ $t("message.RESOURCE.Change") }}
                </el-button>
            </span>
        </el-dialog>
        <!-- end: 重命名弹窗 -->
    </div>
</template>

<script>
import utilMethods from "@/utils/utilMethods";
import previewFile from "@/utils/previewFile.vue";

export default {
    filters: {
        formatDate(value) {
            let tempMonth;
            let tempDay;
            const tempDate = new Date(value);
            const tempYear = tempDate.getFullYear();
            tempMonth = tempDate.getMonth() + 1;
            tempMonth = tempMonth > 9 ? tempMonth : `0${tempMonth}`;
            tempDay = tempDate.getDate();
            tempDay = tempDay > 9 ? tempDay : `0${tempDay}`;
            const result = `${tempYear}-${tempMonth}-${tempDay}`;
            return result;
        }
    },
    components: {
        previewFile
    },
    data() {
        return {
            tempName: "",
            nowCopy: false,
            isCovered: 0,
            upParentDirectoryId: "",
            toNuptial: false,
            newNuptialName: "",
            nuptialName: "",
            isNuptial: false,
            uploadFlag: false,
            UploadPercent: 0,
            studentLimit: true,
            canUpload: false,
            canAddFolder: true,
            isSystem: false,
            currentKey: "",
            currentData: {},
            treeExpandeKeys: [],
            testUrl: "",
            testType: "",
            propObj: {},
            utilMethods,
            canMove: false,
            fileUrl: process.env.FILE_PRE_SERVER,
            searchFile: "",
            props1: {
                label: "fileName",
                children: "zones",
                isLeaf: "leaf"
            },
            tableData: [],
            buttonShow: false,
            loading: false,
            isAddFolder: false,
            fileList: [],
            fileList2: [],
            btnOpacoty: 0,
            isPermisson: false,
            permissonRadio: 3,
            isMove: false,
            accessRadio: 2,
            startDate: "",
            endDate: "",
            isDel: false,
            courseId: "",
            folderData: [],
            curFolderId: "",
            addFolderForm: { addFolderName: "" },
            addFolderRules: {
                addFolderName: [
                    {
                        required: true,
                        message: this.$t("message.folder_no_empty"),
                        trigger: "blur"
                    }
                ]
            },
            uploadUrl: `${process.env.NODE_ENV}/upload`,
            fileTypeData: utilMethods.fileTypeData,
            selectTableFileId: "",
            isFirst: true,
            isPopFirst: true,
            node: "",
            resolve: "",
            selectedCurData: {},
            clickCurData: {},
            popNode: "",
            popResolve: "",
            isAccessRadio: 1,
            isPrompt: false,
            isPreview: false,
            hasCourseId: false,
            hasGroupId: false,
            canCopy: false,
            groupId: "",
            delFileName: "",
            canView: false,
            curFolderType: ""
        };
    },
    created() {
        if (
            typeof this.$route.query.courseId === "undefined" &&
            typeof this.$route.query.groupId === "undefined"
        ) {
            this.hasCourseId = false;
            this.hasGroupId = false;
        } else if (
            typeof this.$route.query.courseId !== "undefined" &&
            typeof this.$route.query.groupId === "undefined"
        ) {
            this.hasGroupId = false;
            this.hasCourseId = true;
            this.courseId = this.$route.query.courseId;
        } else if (typeof this.$route.query.groupId !== "undefined") {
            this.hasGroupId = true;
            this.hasCourseId = false;
            this.groupId = this.$route.query.groupId;
        }
    },
    mounted() {},
    methods: {
        renderContent(h, { node }) {
            return h(
                "el-tooltip",
                {
                    style: {
                        display: "inline-block",
                        width: "156px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    },
                    props: {
                        effect: "dark",
                        content: node.label,
                        placement: "right"
                    }
                },
                [h("span", {}, node.label)]
            );
        },
        changeAddFile(type) {
            if (!this.nowCopy) {
                // 上传图片
                if (type === "change") {
                    this.isCovered = 0;
                    this.$refs.fileUpload.submit();
                    this.toNuptial = false;
                } else if (type === "replace") {
                    this.isCovered = 1;
                    this.$refs.fileUpload.submit();
                    this.isNuptial = false;
                }
            } else if (this.nowCopy) {
                // 复制图片
                if (type === "change") {
                    const tempName = this.newNuptialName;
                    this.handleCopyFile(tempName);
                    this.toNuptial = false;
                } else if (type === "replace") {
                    const tempName = this.nuptialName;
                    this.handleCopyFile(tempName, 1);
                    this.isNuptial = false;
                }
            }
        },
        backNuptial() {
            this.isNuptial = true;
            this.toNuptial = false;
        },
        changeName() {
            this.isNuptial = false;
            this.toNuptial = true;
        },
        // 点击节点
        nodeClick(data) {
            // console.log('nodeClickData', data)
            this.canUpload = !!(data.allowUpload === 1 && data.spaceType !== 1);
            const tempTreeIdLen = data.treeId.length;
            if (tempTreeIdLen >= 20) {
                this.canAddFolder = false;
            } else {
                this.canAddFolder = true;
            }
            // const tempTreeId = data.treeId;
            this.treeExpandeKeys = [];
            let tempTreeList = [];
            tempTreeList = utilMethods.dealTreeList(data.treeId);
            this.treeExpandeKeys = tempTreeList;
            this.currentKey = data.treeId;
            this.currentData = data;
            this.curFolderId = data.id;
            this.curFolderType = data.spaceType;
            this.getInitTableData();
            this.buttonShow = false;
        },
        async loadNode1(node, resolve) {
            if (this.isFirst) {
                this.node = node;
                this.resolve = resolve;
                this.isFirst = false;
            }
            if (node.level === 0) {
                await this.getFolderData();
                this.$nextTick(() => {
                    if (this.currentKey === "") {
                        const tempCurrentKey = this.folderData[0].treeId;
                        this.canUpload = !!(
                            this.folderData[0].allowUpload === 1 &&
                            this.folderData[0].spaceType !== 1
                        );
                        this.$refs.fileTree.setCurrentKey(tempCurrentKey);
                    } else {
                        this.canUpload = !!(
                            this.currentData.allowUpload === 1 &&
                            this.currentData.spaceType !== 1
                        );
                        this.$refs.fileTree.setCurrentKey(this.currentKey);
                    }
                });
                return resolve(this.folderData);
            }
            const tempId = node.data.id;
            const leafData = await this.getLeafData(tempId);
            this.$nextTick(() => {
                this.$refs.fileTree.setCurrentKey(this.currentKey);
            });
            return resolve(leafData);
        },
        // 获取文件夹列表
        async getFolderData() {
            this.folderData = [];
            let params = {};
            if (this.hasCourseId) {
                params = {
                    spaceType: 1,
                    courseId: this.courseId
                };
            } else if (this.hasGroupId) {
                params = {
                    spaceType: 2,
                    studyGroupId: this.groupId
                };
            } else {
                params = {};
            }

            const res = await this.$getData("/userFile/list", params, "get");
            if (Number(res.data.code) === 200) {
                const folderList = res.data.entity;
                const tempFolderData = utilMethods.deepClone(folderList);
                if (tempFolderData.length > 0) {
                    if (this.curFolderId === "" || this.curFolderType === "") {
                        this.curFolderType = tempFolderData[0].spaceType;
                        this.curFolderId = tempFolderData[0].id;
                    }
                    // const tempCurId = this.curFolderId;
                    this.getInitTableData();
                    this.folderData = tempFolderData;
                    this.folderData.forEach(el => {
                        Object.assign(el, { leaf: !el.isDirectory });
                    });
                }
            }
        },
        async getInitTableData() {
            const params = { parentId: this.curFolderId };
            const res = await this.$getData("/userFile/list", params, "get");
            let tempTableData = [];
            if (Number(res.data.code) === 200) {
                this.loading = false;
                tempTableData = res.data.entity;
                tempTableData.forEach(el => {
                    Object.assign(el, { leaf: !el.isDirectory });
                });
                for (let i = 0; i < tempTableData.length; i += 1) {
                    this.$set(tempTableData[i], "isInput", false);
                    if (!tempTableData[i].updateUserName) {
                        tempTableData[i].updateUserName = "";
                    }
                }

                this.tableData = tempTableData;
                this.buttonShow = false;
            }
        },
        // 获取指定文件夹下的文件夹列表
        async getLeafData(tempId) {
            const params = { parentId: tempId };
            const res = await this.$getData("/userFile/list", params, "get");
            let tempList = [];
            let tempTreeList = [];
            if (Number(res.data.code) === 200) {
                tempList = res.data.entity;
                tempList.forEach(el => {
                    Object.assign(el, { leaf: !el.isDirectory });
                });
                this.tableData = tempList;
                tempTreeList = tempList.filter(el => el.isDirectory === 1);
                return tempTreeList;
            }
            return [];
        },
        // 选中行
        handleCurrentChange(val) {
            if (val) {
                this.studentLimit = val.spaceType !== 1;
                this.isSystem = val.isSystemLevel === 0;
                this.canUpload = !!(
                    val.allowUpload === 1 && val.spaceType !== 1
                );
                // console.log('选中行', val, val.allowUpload, this.canUpload)
                this.selectTableFileId = val.id;
                this.buttonShow = true;
                this.selectedCurData = val;
                if (!this.selectedCurData.fileType) {
                    this.canView = false;
                } else {
                    const tempFileType = this.selectedCurData.fileType;
                    this.canView = utilMethods.getIsView(tempFileType);
                }
            }
        },
        // 移动文件
        async moveFile() {
            const params = {
                source: this.selectedCurData.id,
                target: this.clickCurData.id
            };
            const res = await this.$getData(
                "/userFile/move/edit",
                params,
                "post"
            );
            if (Number(res.data.code) === 200) {
                this.$message({
                    message: this.$t("message.file_move_success"),
                    type: "success"
                });
                this.changeNode();
                this.isMove = false;
                this.canMove = false;
            }
        },
        // 复制文件
        async copyFile() {
            const [source, isDirectory, operateType, parentDirectoryId] = [
                this.selectedCurData.id,
                this.selectedCurData.isDirectory,
                2,
                this.clickCurData.id
            ];
            const res = await this.isFileRepeat(
                parentDirectoryId,
                isDirectory,
                operateType,
                "",
                source
            );
            const isRepeat = Boolean(res === "true");
            const lastRepeat = Boolean(isRepeat);
            if (lastRepeat) {
                this.isNuptial = true;
                this.nuptialName = this.selectedCurData.fileName;
                this.newNuptialName = this.selectedCurData.fileName;
                this.nowCopy = true;
            } else {
                this.isNuptial = false;
                const tempName = this.selectedCurData.fileName;
                this.handleCopyFile(tempName);
            }
        },
        async handleCopyFile(name, isCovered) {
            const coverObj = isCovered ? { isCovered: Number(isCovered) } : {};
            const params = {
                source: this.selectedCurData.id,
                target: this.clickCurData.id,
                newName: name
            };
            const lastParams = Object.assign(params, coverObj);
            const res = await this.$getData(
                "/userFile/copy/edit",
                lastParams,
                "post"
            );
            if (Number(res.data.code) === 200) {
                this.$message({
                    message: this.$t("message.file_copy_success"),
                    type: "success"
                });
                this.changeNode();
                this.isMove = false;
                this.canCopy = false;
            }
        },
        // 添加文件夹
        addFolder(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const params = {
                        isDirectory: 1,
                        name: this.addFolderForm.addFolderName,
                        parentDirectoryId: this.curFolderId
                    };
                    const res = await this.$getData(
                        "/userFile/add",
                        params,
                        "post"
                    );
                    if (Number(res.data.code) === 200) {
                        this.$message({
                            message: this.$t("message.file_add_succee"),
                            type: "success"
                        });
                        this.isAddFolder = false;
                        this.addFolderForm.addFolderName = "";
                        this.getInitTableData();
                        this.changeNode();
                    }
                }
            });
        },
        // 删除文件
        openDelFile() {
            this.delFileName = this.selectedCurData.fileName;
            this.isDel = true;
        },
        async delTableFile() {
            const tempIds = [];
            tempIds.push(String(this.selectTableFileId));
            // const params = { ids: tempIds };
            const res = await this.$getData(
                "/userFile/deletes",
                tempIds,
                "post"
            );
            if (Number(res.data.code) === 200) {
                this.$message({
                    message: this.$t("message.del_file_success"),
                    type: "success"
                });
                this.isDel = false;
                this.getInitTableData();
                this.changeNode();
            }
        },
        changeNode() {
            this.node.childNodes = [];
            const tempNode = this.node;
            const tempResolve = this.resolve;
            if (this.popNode) {
                this.popNode.childNodes = [];
            }
            this.loadNode1(tempNode, tempResolve);
        },
        openMove() {
            this.isMove = true;
            if (!this.isPopFirst) {
                this.changePopNode();
            }
        },
        changePopNode() {
            this.popNode.childNodes = [];
            const tempPopNode = this.popNode;
            const tempPopResolve = this.popResolve;
            this.loadNode2(tempPopNode, tempPopResolve);
        },
        handleRemove() {
            this.$refs.fileUpload.abort();
            this.uploadFlag = false;
            this.UploadPercent = 0;
        },

        // 文件上传成功
        async handleSuccess(res) {
            if (Number(res.code) === 200) {
                console.log("res5555", res);
                this.UploadPercent = 100;
                const upFileData = res.entity[0];
                const fileName = this.newNuptialName || upFileData.originName;
                const { fileId } = upFileData;
                const parentDirectoryId = this.curFolderId;
                this.upParentDirectoryId = this.curFolderId;
                this.upFileId = upFileData.fileId;
                this.loading = true;
                await this.addFile(0, fileName, fileId, parentDirectoryId);
                this.uploadFlag = false;
                await this.getInitTableData();
                this.fileList = [];
            } else if (Number(res.code) === 500) {
                this.$message.error(this.$t("message.CALENDAR.Upload_timeout"));
                this.fileList = [];
                this.uploadFlag = false;
            }
        },
        // 文件上传失败
        handleErro() {
            this.$message.error(this.$t("message.CALENDAR.Upload_timeout"));
            this.fileList = [];
            this.uploadFlag = false;
        },
        // 添加文件
        async addFile(isDirectory, name, fileId, parentDirectoryId) {
            const params = {
                isDirectory: 0,
                name,
                fileId,
                parentDirectoryId,
                isCovered: this.isCovered
            };
            const result = await this.$getData("/userFile/add", params, "post");
            if (Number(result.data.code) === 200) {
                this.$message({
                    message: this.$t("message.add_file_success"),
                    type: "success"
                });
            }
        },
        handleUp() {
            const btnId = document.getElementById("uploadBtn");
            const fileInput = btnId.nextSibling;
            fileInput.click();
            this.btnOpacoty = 1;
            this.nowCopy = false;
        },
        cancelReName(row) {
            const tempFileName = this.tempName;
            const tempId = row.id;
            const bIndex = this.tableData.findIndex(
                el => Number(el.id) === Number(tempId)
            );
            this.$set(this.tableData[bIndex], "isInput", false);
            this.$set(this.tableData[bIndex], "fileName", tempFileName);
        },
        // 去重命名
        toReName(row) {
            this.tempName = row.fileName;
            const tempId = row.id;
            const aIndex = this.tableData.findIndex(
                el => Number(el.id) === Number(tempId)
            );
            this.$set(this.tableData[aIndex], "isInput", true);
        },
        // 点击重命名
        async reName(row) {
            const tempId = row.id;
            const tempFileName = this.tempName;
            const cIndex = this.tableData.findIndex(
                el => Number(el.id) === Number(tempId)
            );
            let tempUrlObj = {};
            if (row.fileUrl) {
                tempUrlObj = { fileUrl: row.fileUrl };
            }
            if (!row.fileName.trim()) {
                this.$message({
                    message: this.$t("message.CALENDAR.File_cannot_empty"),
                    type: "warning"
                });
                this.$set(this.tableData[cIndex], "isInput", false);
                this.$set(this.tableData[cIndex], "fileName", tempFileName);
                return;
            }
            if (row.fileName.length > 200) {
                this.$message({
                    message: this.$t("message.CALENDAR.FileName_nolonger_200"),
                    type: "warning"
                });
                this.$set(this.tableData[cIndex], "isInput", false);
                this.$set(this.tableData[cIndex], "fileName", tempFileName);
                return;
            }
            let params = {
                id: Number(row.id),
                courseId: Number(this.courseId),
                isDirectory: Number(row.isDirectory),
                name: row.fileName,
                parentId: Number(row.parentId)
            };
            params = Object.assign(params, tempUrlObj);
            const res = await this.$getData("/userFile/modify", params, "post");
            if (Number(res.data.code) === 200) {
                this.$message({
                    message: this.$t("message.file_rename_success"),
                    type: "success"
                });
                this.$set(this.tableData[cIndex], "isInput", false);
                this.changeNode();
            } else if (Number(res.data.code) === 500) {
                this.$set(this.tableData[cIndex], "isInput", false);
                this.changeNode();
            }
        },
        async loadNode2(node, resolve) {
            if (this.isPopFirst) {
                this.popNode = node;
                this.popResolve = resolve;
                this.isPopFirst = false;
            }
            if (node.level === 0) {
                let tempPopFolderData = await this.getPopFolderData();
                tempPopFolderData = tempPopFolderData.filter(
                    el => el.spaceType !== 1
                );
                // console.log('tempPopFolderData', tempPopFolderData)
                return resolve(tempPopFolderData);
            }
            const tempId = node.data.id;
            const leafData = await this.getPopLeafData(tempId);
            return resolve(leafData);
        },

        // 弹窗树形控件点击事件
        moveNodeClick(data) {
            this.clickCurData = data;
            const clickTreeId = data.treeId;
            // const clickId = data.id;
            const selectTreeId = this.selectedCurData.treeId;
            const selectId = this.selectedCurData.parentId;
            if (
                clickTreeId.startsWith(selectTreeId) ||
                Number() === Number(selectId)
            ) {
                this.canMove = false;
                this.canCopy = false;
            } else {
                this.canMove = true;
                this.canCopy = false;
            }

            const moveBeforeEight = this.clickCurData.treeId.substring(0, 8);
            const curBeforeEight = this.selectedCurData.treeId.substring(0, 8);

            if (
                moveBeforeEight !== curBeforeEight &&
                this.clickCurData.spaceType !== 1
            ) {
                this.canMove = false;
                this.canCopy = true;
            } else if (
                moveBeforeEight !== curBeforeEight &&
                this.clickCurData.spaceType === 1
            ) {
                this.canMove = false;
                this.canCopy = false;
            }
        },
        // 获取列表
        async getPopFolderData() {
            let tempData = [];
            let params = {};
            if (this.hasCourseId) {
                params = {
                    spaceType: 1,
                    courseId: this.courseId
                };
            } else if (this.hasGroupId) {
                params = {
                    spaceType: 2,
                    studyGroupId: this.groupId
                };
            } else {
                params = {};
            }
            const res = await this.$getData("/userFile/list", params, "get");
            if (Number(res.data.code) === 200) {
                const folderList = res.data.entity;
                tempData = utilMethods.deepClone(folderList);
                tempData.forEach(el => {
                    Object.assign(el, { leaf: !el.isDirectory });
                });
                return tempData;
            }
            return [];
        },
        // 获取子级文件列表
        async getPopLeafData(tempId) {
            const params = { parentId: tempId };
            const res = await this.$getData("/userFile/list", params, "get");
            let tempList = [];
            let tempTreeList = [];
            if (Number(res.data.code) === 200) {
                tempList = res.data.entity;
                tempList.forEach(el => {
                    Object.assign(el, { leaf: !el.isDirectory });
                });
                tempTreeList = tempList.filter(
                    el => Number(el.isDirectory) === 1
                );
                return tempTreeList;
            }
            return [];
        },
        // 下载文件
        downFile() {
            const url = `${process.env.NODE_ENV}/userFile/download/direct?id=${this.selectedCurData.id}`;
            let { fileName } = this.selectedCurData;
            if (Number(this.selectedCurData.isDirectory) === 1)
                fileName = `${fileName}.zip`;
            utilMethods.downloadFile(url, fileName);
        },
        openPermisson() {
            this.isPermisson = true;
            this.permissonRadio = this.selectedCurData.status;
            if (Number(this.selectedCurData.status) === 3) {
                // this.isAccessRadio = 1;
                this.accessRadio = this.selectedCurData.accessStrategy;
                if (Number(this.accessRadio) === 3) {
                    this.startDate = new Date(this.selectedCurData.startTime);
                    this.endDate = new Date(this.selectedCurData.endTime);
                }
            }
        },
        // 更改文件状态
        async editStatus() {
            const baseObj = {
                id: this.selectedCurData.id,
                status: this.permissonRadio
            };
            let limitObj = {};
            let timeObj = {};
            if (Number(this.permissonRadio) === 3) {
                // 状态为已发布
                limitObj = { accessStrategy: this.accessRadio };
                if (this.accessRadio === 3) {
                    // 限制访问类型为 安排学生可用性
                    let tempStartTime = "";
                    let tempEndTime = null;
                    if (this.startDate) {
                        tempStartTime = Number(
                            new Date(this.startDate).getTime()
                        );
                    } else {
                        tempStartTime = Number(new Date().getTime());
                    }
                    if (this.endDate) {
                        tempEndTime = Number(new Date(this.endDate).getTime());
                    }
                    if (this.startDate && this.endDate) {
                        if (tempStartTime > tempEndTime) {
                            this.isPrompt = true;
                            return;
                        }
                    } else {
                        this.isPrompt = false;
                    }
                    timeObj = {
                        startTime: tempStartTime,
                        endTime: tempEndTime
                    };
                }
            } else {
                limitObj = {};
                timeObj = {};
            }
            const params = Object.assign(baseObj, limitObj, timeObj);
            const res = await this.$getData(
                "/userFile/status/edit",
                params,
                "post"
            );
            if (Number(res.data.code) === 200) {
                this.$message({
                    message: this.$t("message.status_change_success"),
                    type: "success"
                });
                this.isPermisson = false;
                this.getInitTableData();
            }
        },
        // 预览文件
        goPreview() {
            this.testUrl = this.selectedCurData.fileUrl;
            this.testType = this.selectedCurData.fileType;
            this.propObj = {
                testUrl: this.selectedCurData.fileUrl,
                testType: this.selectedCurData.fileType
            };
            this.isPreview = true;
        },
        handleClose() {
            this.isPreview = false;
        },
        // 文件上传时的钩子
        fileProgress(event) {
            this.uploadFlag = true;
            const tempPercent = Number(Number(event.percent).toFixed(0));
            this.UploadPercent = tempPercent < 90 ? tempPercent : 90;
        },
        // 上传文件之前的钩子
        async beforeFileUpload(file) {
            if (file.status !== "ready") {
                return;
            }
            this.newNuptialName = "";
            this.nuptialName = file.name;
            const [parentDirectoryId, isDirectory, operateType, name] = [
                this.curFolderId,
                0,
                1,
                this.nuptialName
            ];
            const isLitSize = file.size / 1024 / 1024 < 400;
            if (!isLitSize) {
                const msg = this.$t("message.CALENDAR.File_exceeds");
                this.$message({
                    message: msg,
                    type: "warning"
                });
                /* eslint-disable consistent-return */
                return Promise.reject(new Error(msg));
                /* eslint-disable consistent-return */
            }
            const res = await this.isFileRepeat(
                parentDirectoryId,
                isDirectory,
                operateType,
                name
            );
            const isRepeat = Boolean(res === "true");
            if (isRepeat) {
                // todo 打开弹窗
                this.isNuptial = true;
                this.newNuptialName = this.nuptialName;
                /* eslint-disable consistent-return */
                return Promise.reject(
                    new Error(this.$t("message.CALENDAR.FileName_repeat"))
                );
                /* eslint-disable consistent-return */
            }
            this.$refs.fileUpload.submit();
        },
        // 判断文件是否重名
        async isFileRepeat(
            parentDirectoryId,
            isDirectory,
            operateType,
            name = "",
            source = ""
        ) {
            let initObj = {
                parentDirectoryId: Number(parentDirectoryId),
                isDirectory: Number(isDirectory),
                operateType: Number(operateType)
            };
            let tempObj = {};
            if (name !== "") {
                tempObj = { name };
            } else if (source !== "") {
                tempObj = { source: Number(source) };
            }
            initObj = Object.assign(initObj, tempObj);
            const res = await this.$getData(
                "/userFile/name/edit",
                initObj,
                "post"
            );
            if (Number(res.data.code) === 200) {
                return res.data.message;
            }
            return res.data.message;
        }
    }
};
</script>

<style lang="less" scoped>
@import "./files.less";
</style>
