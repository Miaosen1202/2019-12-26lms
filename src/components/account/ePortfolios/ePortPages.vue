<template>
    <div>
        <div class="pageHeader">
            <a class="pageTitle" @click="toEportHome">
                <i class="iconfont icon-ai207" style="font-size: 30px" />
                {{ $t("message.RESOURCE.Back") }}
            </a>
        </div>
        <div class="pageMain clearfix">
            <div class="tree-box">
                <el-tree
                    ref="pageTree"
                    :draggable="canEdit"
                    :data="treeData"
                    node-key="id"
                    :highlight-current="true"
                    default-expand-all
                    :allow-drop="allowDrop"
                    @node-drop="handleDrop"
                    @node-click="nodeClick"
                >
                    <span
                        slot-scope="{ node, data }"
                        class="custom-tree-node clearfix"
                    >
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="node.label"
                            placement="top-end"
                        >
                            <span class="labelBox textOverflow">
                                {{ node.label }}
                            </span>
                        </el-tooltip>
                        <span v-show="canEdit" style="float: right">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <i class="iconfont icon-morevert" />
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <a @click="rePageName(data)">
                                            <i class="iconfont icon-edit" />
                                            {{ $t("message.eport.Rename") }}
                                        </a>
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                        v-show="treeData.length > 1"
                                    >
                                        <a @click="delPage(data)">
                                            <i class="iconfont icon-delete" />
                                            {{ $t("message.eport.Delete") }}
                                        </a>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <a @click="dupliPage(data)">
                                            <i
                                                class="iconfont icon-ICAtubiao_wendangzhongxin"
                                            />
                                            {{ $t("message.eport.Duplicate") }}
                                        </a>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </span>
                </el-tree>
                <h2
                    v-show="!isAddPage && canAddPage && canEdit"
                    class="addTitle"
                >
                    <a class="addPage" @click="toAddPage">
                        <i
                            class="iconfont icon-plus"
                            style="display: inline-block"
                        />
                        &nbsp;
                        <i style="text-decoration: underline">
                            {{ $t("message.eport.New_page") }}</i
                        >
                    </a>
                </h2>
                <div v-show="isAddPage" class="addPageBox">
                    <el-input
                        v-model="newPageName"
                        class="addInput"
                        maxlength="200"
                    />
                    <a
                        class="pageOperate"
                        style="border-left:none; border-right:none"
                        @click="addPage"
                    >
                        <i
                            style="font-size: 10px; color: #55C21F"
                            class="iconfont icon-dui"
                        />
                    </a>
                    <a class="pageOperate" @click="cancelAddPage">
                        <i
                            style="font-size: 10px; color: #666"
                            class="iconfont icon-close"
                        />
                    </a>
                </div>
            </div>

            <div class="page-container">
                <div class="page-header">
                    <el-button
                        v-show="isEdit && canEdit && fenyeNum > 0"
                        @click="cancelContent"
                    >
                        {{ $t("message.eport.Cancel") }}
                    </el-button>
                    <el-button
                        v-show="isEdit && canEdit && fenyeNum > 0"
                        type="primary"
                        @click="saveContent"
                    >
                        {{ $t("message.eport.Save") }}
                    </el-button>
                    <el-button
                        v-show="!isEdit && canEdit"
                        type="primary"
                        @click="editContent"
                    >
                        {{ $t("message.eport.Edit") }}
                    </el-button>
                </div>
                <div class="page-content">
                    <draggable
                        :list="list"
                        class="list-group"
                        ghost-class="ghost"
                        :move="onMove"
                        @start="dragging = true"
                        @end="onEnd"
                    >
                        <div
                            v-for="(el, eIndex) in list"
                            :key="eIndex"
                            class="list-group-item"
                        >
                            <div v-if="el.type === 'T'" class="list-item">
                                <!-- 文字信息 -->
                                <div class="dragItem-top">
                                    <a
                                        v-show="isEdit"
                                        class="deleteBtn"
                                        @click="delItem(el)"
                                    >
                                        <i class="iconfont icon-sahnchu" />
                                    </a>
                                    <a
                                        v-show="!el.isEdit && isEdit"
                                        class="editBtn"
                                        @click="editText(el)"
                                    >
                                        <i class="iconfont icon-edit" />
                                    </a>
                                    <a
                                        v-show="el.isEdit"
                                        class="editBtn"
                                        @click="saveText(el)"
                                    >
                                        <i
                                            class="iconfont icon-Re-activateUser"
                                        />
                                    </a>
                                    <h1 v-show="!el.isEdit" class="drag-title">
                                        {{ el.inputVal }}
                                    </h1>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.inputVal"
                                        class="drag-input"
                                        :placeholder="
                                            $t('message.eport.Page_title')
                                        "
                                    />
                                </div>
                                <div class="dragItem-bottom">
                                    <p v-show="!el.isEdit" class="drag-descipt">
                                        {{ el.textVal }}
                                    </p>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.textVal"
                                        style="margin-top: 10px"
                                        class="drag-input"
                                        type="textarea"
                                        :rows="2"
                                        :placeholder="
                                            $t('message.eport.Description')
                                        "
                                    />
                                </div>
                            </div>
                            <div v-if="el.type === 'image'" class="list-item">
                                <!-- 图片信息 -->
                                <div class="dragItem-top">
                                    <a
                                        v-show="isEdit"
                                        class="deleteBtn"
                                        @click="delItem(el)"
                                    >
                                        <i class="iconfont icon-sahnchu" />
                                    </a>
                                    <a
                                        v-show="!el.isEdit && isEdit"
                                        class="editBtn"
                                        @click="editMediaItem(el)"
                                    >
                                        <i class="iconfont icon-edit" />
                                    </a>
                                    <a
                                        v-show="el.isEdit"
                                        class="editBtn"
                                        @click="saveMediaItem(el)"
                                    >
                                        <i
                                            class="iconfont icon-Re-activateUser"
                                        />
                                    </a>
                                    <p v-show="!el.isEdit" class="drag-descipt">
                                        {{ el.imageText }}
                                    </p>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.imageText"
                                        class="drag-input"
                                        :placeholder="
                                            $t('message.eport.Description')
                                        "
                                    />
                                </div>
                                <div class="dragItem-bottom">
                                    <img
                                        v-show="!el.isEdit"
                                        :src="el.imageUrl"
                                        class="avatarImg"
                                    />
                                    <el-upload
                                        v-show="el.isEdit"
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :show-file-list="false"
                                        :on-success="handlePhotoSuccess"
                                        :before-upload="beforeAvatarUpload"
                                    >
                                        <img
                                            :src="el.imageUrl"
                                            class="avatarImg"
                                        />
                                        <el-button round class="select-btn">
                                            {{
                                                $t("message.eport.Select_photo")
                                            }}
                                        </el-button>
                                    </el-upload>
                                </div>
                            </div>
                            <div v-if="el.type === 'video'" class="list-item">
                                <!-- video信息 -->
                                <div class="dragItem-top">
                                    <a
                                        v-show="isEdit"
                                        class="deleteBtn"
                                        @click="delItem(el)"
                                    >
                                        <i class="iconfont icon-sahnchu" />
                                    </a>
                                    <a
                                        v-show="!el.isEdit && isEdit"
                                        class="editBtn"
                                        @click="editMediaItem(el)"
                                    >
                                        <i class="iconfont icon-edit" />
                                    </a>
                                    <a
                                        v-show="el.isEdit"
                                        class="editBtn"
                                        @click="saveMediaItem(el)"
                                    >
                                        <i
                                            class="iconfont icon-Re-activateUser"
                                        />
                                    </a>
                                    <p v-show="!el.isEdit" class="drag-descipt">
                                        {{ el.videoText }}
                                    </p>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.videoText"
                                        class="drag-input"
                                        :placeholder="
                                            $t('message.eport.Description')
                                        "
                                    />
                                </div>
                                <div
                                    class="dragItem-bottom"
                                    style="margin-top: 10px"
                                >
                                    <video
                                        v-show="!el.isEdit"
                                        :src="el.videoUrl"
                                        class="avatarImg"
                                        controls="controls"
                                    />
                                    <el-upload
                                        v-show="el.isEdit"
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :show-file-list="false"
                                        :on-success="videoSuccess"
                                        :before-upload="beforeVideoUpload"
                                    >
                                        <video
                                            :src="el.videoUrl"
                                            class="avatarImg"
                                            controls="controls"
                                        />
                                        <el-button round class="select-btn">
                                            {{
                                                $t("message.eport.Select_video")
                                            }}
                                        </el-button>
                                    </el-upload>
                                </div>
                            </div>
                            <div v-if="el.type === 'wenjian'" class="list-item">
                                <!-- 文件信息 -->
                                <div class="dragItem-top">
                                    <a
                                        v-show="isEdit"
                                        class="deleteBtn"
                                        @click="delItem(el)"
                                    >
                                        <i class="iconfont icon-sahnchu" />
                                    </a>
                                    <a
                                        v-show="!el.isEdit && isEdit"
                                        class="editBtn"
                                        @click="editMediaItem(el)"
                                    >
                                        <i class="iconfont icon-edit" />
                                    </a>
                                    <a
                                        v-show="el.isEdit"
                                        class="editBtn"
                                        @click="saveMediaItem(el)"
                                    >
                                        <i
                                            class="iconfont icon-Re-activateUser"
                                        />
                                    </a>
                                    <p v-show="!el.isEdit" class="drag-descipt">
                                        {{ el.fileText }}
                                    </p>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.fileText"
                                        class="drag-input"
                                        :placeholder="
                                            $t('message.eport.Description')
                                        "
                                    />
                                </div>
                                <div
                                    class="dragItem-bottom"
                                    style="margin-top: 10px"
                                >
                                    <span v-show="!el.isEdit" class="file-box">
                                        <i
                                            class="iconfont icon-attach"
                                            style="display: inline-block"
                                        />
                                        <a
                                            class="file-box-name"
                                            :download="el.fileName"
                                            :href="
                                                'http://192.168.9.31' +
                                                    el.fileUrl
                                            "
                                        >
                                            {{ el.fileName }}
                                        </a>
                                    </span>
                                    <div v-show="el.isEdit">
                                        <el-upload
                                            class="upload-file"
                                            :action="uploadUrl"
                                            :on-success="fileSuccess"
                                            :before-upload="beforeFileUpload"
                                            :show-file-list="false"
                                        >
                                            <el-button
                                                size="small"
                                                type="primary"
                                            >
                                                Upload
                                            </el-button>
                                        </el-upload>
                                        <span> {{ el.fileName }} </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="el.type === 'fenye'"
                                class="list-item chapter-box"
                                :class="{
                                    'chapter-border':
                                        el.type === 'fenye' && isEdit
                                }"
                            >
                                <!-- Chapter信息 -->
                                <div class="dragItem-top">
                                    <a
                                        v-show="isEdit && eIndex != 0"
                                        class="deleteBtn"
                                        @click="delItem(el)"
                                    >
                                        <i class="iconfont icon-sahnchu" />
                                    </a>
                                    <a
                                        v-show="!el.isEdit && isEdit"
                                        class="editBtn"
                                        @click="editText(el)"
                                    >
                                        <i class="iconfont icon-edit" />
                                    </a>
                                    <a
                                        v-show="el.isEdit"
                                        class="editBtn"
                                        @click="saveText(el)"
                                    >
                                        <i
                                            class="iconfont icon-Re-activateUser"
                                        />
                                    </a>
                                    <h1
                                        v-show="!el.isEdit"
                                        class="drag-title chapter-title"
                                    >
                                        {{ el.chapterName }}
                                    </h1>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.chapterName"
                                        class="drag-input"
                                        :placeholder="
                                            $t('message.eport.Page_title')
                                        "
                                    />
                                </div>
                                <div class="dragItem-bottom">
                                    <p v-show="!el.isEdit" class="drag-descipt">
                                        {{ el.chapterText }}
                                    </p>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.chapterText"
                                        style="margin-top: 10px"
                                        class="drag-input"
                                        type="textarea"
                                        :rows="2"
                                        :placeholder="
                                            $t('message.eport.Description')
                                        "
                                    />
                                </div>
                            </div>
                            <div v-if="el.type === 'lianjie'" class="list-item">
                                <!-- 链接信息 -->
                                <div class="dragItem-top">
                                    <a
                                        v-show="isEdit"
                                        class="deleteBtn"
                                        @click="delItem(el)"
                                    >
                                        <i class="iconfont icon-sahnchu" />
                                    </a>
                                    <a
                                        v-show="!el.isEdit && isEdit"
                                        class="editBtn"
                                        @click="editText(el)"
                                    >
                                        <i class="iconfont icon-edit" />
                                    </a>
                                    <a
                                        v-show="el.isEdit"
                                        class="editBtn"
                                        @click="saveText(el)"
                                    >
                                        <i
                                            class="iconfont icon-Re-activateUser"
                                        />
                                    </a>
                                    <!--eslint-disable -->
                                    <!-- v-html="el.linkText" -->
                                    <p v-show="!el.isEdit" class="drag-link">
                                        <a :href="el.linkText" target="_blank">
                                            {{ el.linkText }}
                                        </a>
                                    </p>
                                    <el-input
                                        v-show="el.isEdit"
                                        v-model="el.linkText"
                                        class="drag-input"
                                        :placeholder="
                                            $t('message.eport.HTML_content')
                                        "
                                    />
                                    <!--eslint-disable no-new-->
                                </div>
                            </div>
                        </div>
                    </draggable>
                    <!-- 增加内容动作部分 -->
                    <div
                        v-if="curLabel === 'T' && isText && isEdit && canEdit"
                        class="input-box"
                    >
                        <!-- 增加文字描述 -->
                        <el-input
                            v-model="inputVal"
                            :placeholder="$t('message.eport.Paragraph_name')"
                        />
                        <el-input
                            v-model="textVal"
                            type="textarea"
                            :rows="2"
                            style="margin-top: 10px"
                            :placeholder="$t('message.eport.Description')"
                        />
                        <el-button
                            type="primary"
                            style="float: right; margin-top: 5px"
                            @click="addVal"
                        >
                            {{ $t("message.eport.Add") }}
                        </el-button>
                    </div>
                    <div
                        v-if="
                            curLabel === 'image' && isImage && isEdit && canEdit
                        "
                        class="input-box"
                    >
                        <!-- 添加图片内容 -->
                        <h1 class="drag-title">
                            {{ $t("message.eport.Add_photo") }}
                        </h1>
                        <el-input
                            v-model="imageText"
                            :placeholder="$t('message.eport.Description')"
                        />
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="imageUrl"
                                :src="imageUrl"
                                class="avatarImg"
                            />
                            <el-button round class="select-btn">
                                {{ $t("message.eport.Select_photo") }}
                            </el-button>
                        </el-upload>
                        <el-button
                            type="primary"
                            style="float: right; margin-top: 5px"
                            @click="addImg"
                        >
                            {{ $t("message.eport.Add") }}
                        </el-button>
                    </div>
                    <div
                        v-if="
                            curLabel === 'video' && isVideo && isEdit && canEdit
                        "
                        class="input-box"
                    >
                        <!-- 添加视频内容 -->
                        <h1 class="drag-title">
                            {{ $t("message.eport.Add_video") }}
                        </h1>
                        <el-input
                            v-model="videoText"
                            :placeholder="$t('message.eport.Description')"
                        />
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleVideoSuccess"
                            :before-upload="beforeVideoUpload"
                        >
                            <video
                                v-if="videoUrl"
                                :src="videoUrl"
                                class="avatarImg"
                                controls="controls"
                            />
                            <el-button round class="select-btn">
                                {{ $t("message.eport.Select_video") }}
                            </el-button>
                        </el-upload>
                        <el-button
                            type="primary"
                            style="float: right; margin-top: 5px"
                            @click="addVideo"
                        >
                            {{ $t("message.eport.Add") }}
                        </el-button>
                    </div>
                    <div
                        v-if="
                            curLabel === 'wenjian' &&
                                isFile &&
                                isEdit &&
                                canEdit
                        "
                        class="input-box"
                    >
                        <!-- 添加文件内容 -->
                        <h1 class="drag-title">
                            {{ $t("message.eport.Add_file") }}
                        </h1>
                        <el-input
                            v-model="fileText"
                            :placeholder="$t('message.eport.Description')"
                        />
                        <div style="margin-top: 10px">
                            <el-upload
                                class="upload-file"
                                :action="uploadUrl"
                                :on-success="handleFileSuccess"
                                :before-upload="beforeFileUpload"
                                :show-file-list="false"
                            >
                                <el-button size="small" type="primary">
                                    {{ $t("message.eport.Upload") }}
                                </el-button>
                            </el-upload>
                            <span> {{ fileName }} </span>
                            <el-button
                                type="primary"
                                style="float: right; margin-top: 5px"
                                @click="addFile"
                            >
                                {{ $t("message.eport.Add") }}
                            </el-button>
                        </div>
                    </div>
                    <div
                        v-if="
                            curLabel === 'fenye' &&
                                isPaging &&
                                isEdit &&
                                canEdit
                        "
                        class="input-box"
                    >
                        <!-- 添加分页 -->
                        <el-input
                            v-model="chapterName"
                            placeholder="Chapter name"
                        />
                        <el-input
                            v-model="chapterText"
                            type="textarea"
                            :rows="2"
                            style="margin-top: 10px"
                            :placeholder="$t('message.eport.Description')"
                        />
                        <el-button
                            type="primary"
                            style="float: right; margin-top: 5px"
                            @click="addChapter"
                        >
                            {{ $t("message.eport.Add") }}
                        </el-button>
                    </div>
                    <div
                        v-if="
                            curLabel === 'lianjie' &&
                                isLink &&
                                isEdit &&
                                canEdit
                        "
                        class="input-box"
                    >
                        <!-- 添加网页链接 -->
                        <el-input
                            v-model="linkText"
                            placeholder="HTML/Embedded Content"
                        />
                        <el-button
                            type="primary"
                            style="float: right; margin-top: 5px"
                            @click="addLink"
                        >
                            {{ $t("message.eport.Add") }}
                        </el-button>
                    </div>
                    <div v-show="!isEdit" class="page-box">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-count="totalPage"
                            @current-change="changePage"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-show="isEdit && canEdit" class="label-group">
            <ul>
                <li
                    v-for="item in labelList"
                    :key="item.type"
                    :class="{ active: item.type == curLabel }"
                >
                    <a @click="getLabel(item)">
                        <i class="iconfont" :class="item.icon" />
                    </a>
                </li>
            </ul>
        </div>
        <!-- 删除页面弹窗 -->
        <el-dialog
            :title="$t('message.eport.Del_page')"
            :visible.sync="delVisible"
            width="30%"
            :before-close="delClose"
        >
            <span> {{ $t("message.eport.Sure_delete_page") }} </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">{{
                    $t("message.eport.No")
                }}</el-button>
                <el-button type="primary" @click="deletePage">{{
                    $t("message.eport.Yes")
                }}</el-button>
            </span>
        </el-dialog>
        <!-- 重命名页面弹窗 -->
        <el-dialog
            :title="$t('message.eport.Rename_page_name')"
            :visible.sync="reVisible"
            width="30%"
            :before-close="reNameClose"
        >
            <el-form
                ref="reNameForm"
                :model="reNameForm"
                :rules="reNameRules"
                label-width="100px"
            >
                <el-form-item :label="$t('message.eport.Rename')" prop="name">
                    <el-input v-model="reNameForm.name" />
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="cancelRename('reNameForm')">
                        {{ $t("message.eport.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="saveRename('reNameForm')">
                        {{ $t("message.eport.Rename") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 复制页面弹窗 -->
        <el-dialog
            :title="$t('message.eport.Duplicate_page')"
            :visible.sync="dupVisible"
            width="30%"
            :before-close="dupPageClose"
        >
            <span> {{ $t("message.eport.Sure_delete_page") }} </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dupVisible = false">
                    {{ $t("message.eport.No") }}
                </el-button>
                <el-button type="primary" @click="duplicatePage">
                    {{ $t("message.eport.Yes") }}
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import {
    getCollect,
    savePageContent,
    addEportPage,
    getEportContent,
    delEportPage,
    modifyEportPage,
    copyEportPage,
    moveEportPage
} from "@/api/ePortRequest";
import draggable from "vuedraggable";
import utilMethods from "@/utils/utilMethods.js";
export default {
    name: "simple",
    display: "Simple",
    order: 0,
    components: {
        draggable
    },
    data() {
        return {
            firstChapterIndex: "",
            copyList: [],
            canAdd: true,
            canEdit: true,
            currentNodeId: "",
            delVisible: false,
            reVisible: false,
            dupVisible: false,
            ePortfolioPageId: "",
            baseUrl: process.env.FILE_PRE_SERVER,
            uploadUrl: `${process.env.NODE_ENV}/upload`,
            isText: false,
            isImage: false,
            isVideo: false,
            isFile: false,
            isPaging: false,
            isLink: false,
            inputVal: "",
            textVal: "",
            curMediaItem: "",
            imageText: "",
            imageUrl: "",
            orginImageUrl: "",
            videoText: "",
            videoUrl: "",
            originVideoUrl: "",
            fileText: "",
            fileName: "",
            fileUrl: "",
            originFileUrl: "",
            linkText: "",
            chapterName: "",
            chapterText: "",
            list: [],
            collectId: "",
            labelList: [
                { icon: "icon-T", type: "T" },
                { icon: "icon-image", type: "image" },
                { icon: "icon-video", type: "video" },
                { icon: "icon-wenjian", type: "wenjian" },
                { icon: "icon-fenye", type: "fenye" },
                { icon: "icon-lianjie", type: "lianjie" }
            ],
            curLabel: "fenye",
            treeData: [],
            isAddPage: false,
            canAddPage: true,
            newPageName: "",
            curPageData: "",
            reNameForm: { name: "" },
            reNameRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.eport.Name_required"),
                        trigger: "blur"
                    }
                ]
            },
            totalPage: 0,
            total: 3,
            fenyeList: [],
            dataList: [],
            isEdit: false,
            eportId: "",
            eportName: ""
        };
    },
    watch: {
        $route: {
            handler(val) {},
            // 深度观察监听
            deep: true,
            immediate: true
        },
        treeData(val) {
            let treeDataLen = val.length;
            if (treeDataLen >= 20) {
                this.canAddPage = false;
            } else {
                this.canAddPage = true;
            }
        }
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type;
        },
        fenyeNum() {
            let tempList = this.list.filter(el => {
                return el.type == "fenye";
            });
            return tempList.length;
        }
    },
    created() {
        let routeName = this.$route.name;
        let tempIndex = routeName.indexOf("_");
        let tempStr = routeName.slice(tempIndex + 1);
        if (tempStr == "ePortfolios_t3") {
            this.canEdit = true;
        } else this.canEdit = false;
        this.collectId = this.$route.query.collectId;
        this.eportId = this.$route.query.eportId;
        this.eportName = this.$route.query.eportName;
        this.getCollect();
    },
    methods: {
        beforeAvatarUpload(file) {
            const tempFileType = file.type;
            const tempFileSize = file.size / 1024 / 1024;
            if (
                tempFileType !== "image/jpeg" &&
                tempFileType !== "image/png" &&
                tempFileType !== "image/bmp" &&
                tempFileType !== "image/ppm"
            ) {
                // let hintMessage = this.$t("message.eport.File_type_jpg");
                this.$message.error(this.$t("message.eport.File_type_jpg"));
                return false;
            }
            if (tempFileSize > 5) {
                this.$message.error(this.$t("message.eport.Photo_less_5"));
                return false;
            }
            return true;
        },
        handleAvatarSuccess(res) {
            if (Number(res.code) === 200) {
                this.imageUrl = this.baseUrl + res.entity[0].fileId;
                this.orginImageUrl = res.entity[0].fileId;
            }
        },
        handlePhotoSuccess(res) {
            if (Number(res.code) === 200) {
                let tempIndex = this.list.findIndex(item => {
                    return item._index == this.curMediaItem._index;
                });
                this.list[tempIndex].imageUrl =
                    this.baseUrl + res.entity[0].fileId;
                this.list[tempIndex].orginImageUrl = res.entity[0].fileId;
            }
        },
        delItem(el) {
            let tempIndex = this.list.findIndex(item => {
                return Number(item._index) == Number(el._index);
            });
            this.list.splice(tempIndex, 1);
        },
        getEditPages() {
            if (this.list.length > 0) {
                this.fenyeList = this.list.filter(el => {
                    return el.type == "fenye";
                });

                this.firstChapterIndex = this.fenyeList[0]._index;
            }
        },
        addVal() {
            let _index = parseInt(Math.random() * 10000);
            while (this.list.indexOf(_index) > -1) {
                _index = parseInt(Math.random() * 10000);
            }
            let tempObj = {
                inputVal: this.inputVal,
                textVal: this.textVal,
                type: "T",
                isEdit: false,
                _index: _index
            };
            this.list.push(tempObj);
            this.inputVal = "";
            this.textVal = "";
            this.isText = false;
            this.getEditPages();
        },
        addImg() {
            let _index = parseInt(Math.random() * 10000);
            while (this.list.indexOf(_index) > -1) {
                _index = parseInt(Math.random() * 10000);
            }
            let tempObj = {
                imageText: this.imageText,
                imageUrl: this.imageUrl,
                orginImageUrl: this.orginImageUrl,
                type: "image",
                isEdit: false,
                _index: _index
            };
            this.list.push(tempObj);
            this.imageText = "";
            this.imageUrl = "";
            this.orginImageUrl = "";
            this.isImage = false;
            this.getEditPages();
        },
        addVideo() {
            let _index = parseInt(Math.random() * 10000);
            while (this.list.indexOf(_index) > -1) {
                _index = parseInt(Math.random() * 10000);
            }
            let tempObj = {
                videoText: this.videoText,
                videoUrl: this.videoUrl,
                originVideoUrl: this.originVideoUrl,
                type: "video",
                isEdit: false,
                _index: _index
            };
            this.list.push(tempObj);
            this.videoText = "";
            this.videoUrl = "";
            this.originVideoUrl = "";
            this.isVideo = false;
            this.getEditPages();
        },
        onEnd(evt) {
            this.dragging = false;
            // return false
        },
        onMove(evt, originalEvent) {
            let toIndex = evt.relatedContext.element._index;
            let formIndex = evt.draggedContext.element._index;
            if (
                toIndex == this.firstChapterIndex ||
                formIndex == this.firstChapterIndex
            ) {
                return false;
            } else {
                return true;
            }
        },
        async getCollect() {
            let tempId = Number(this.collectId);
            let param = { data: tempId };
            let res = await getCollect(param);
            if (Number(res.data.code) === 200) {
                let pageDataList = res.data.entity.pages;
                pageDataList.forEach(el => {
                    el.label = el.name;
                });
                this.treeData = pageDataList;
                let tempId = this.currentNodeId
                    ? this.currentNodeId
                    : this.treeData[0].id;
                this.ePortfolioPageId = tempId;
                this.getEportContent(tempId);
                this.$nextTick(() => {
                    this.$refs.pageTree.setCurrentKey(tempId);
                });
            }
        },
        async handleDrop(draggingNode, dropNode, dropType, ev) {
            let dragingId = draggingNode.data.id;
            let dragSeq = dropNode.data.seq;
            let dragingSeq = "";
            if (dropType === "after") {
                dragingSeq = dragSeq + 1;
            } else if (dropType === "before") {
                dragingSeq = dragSeq;
            }
            let param = { id: dragingId, seq: dragingSeq };
            let res = await moveEportPage(param);
            if (Number(res.data.code) === 200) {
                this.$message.success("Move success");
                this.getCollect();
            }
        },
        allowDrop(draggingNode, dropNode, type) {
            return type !== "inner";
        },
        getLabel(data) {
            let tempFenyeList = this.list.filter(el => {
                return el.type == "fenye";
            });
            if (tempFenyeList.length == 0) {
                return;
            }

            this.curLabel = data.type;
            if (this.curLabel == "T") {
                this.isText = true;
            } else if (this.curLabel == "image") {
                this.isImage = true;
            } else if (this.curLabel == "video") {
                this.isVideo = true;
            } else if (this.curLabel == "wenjian") {
                this.isFile = true;
            } else if (this.curLabel == "fenye") {
                this.isPaging = true;
            } else if (this.curLabel == "lianjie") {
                this.isLink = true;
            }
        },
        editText(el) {
            el.isEdit = true;
        },
        saveText(el) {
            el.isEdit = false;
        },
        editMediaItem(el) {
            el.isEdit = true;
            this.curMediaItem = el;
        },
        saveMediaItem(el) {
            el.isEdit = false;
        },
        handleVideoSuccess(res) {
            if (Number(res.code) === 200) {
                this.videoUrl = this.baseUrl + res.entity[0].fileId;
                this.originVideoUrl = res.entity[0].fileId;
            }
        },
        beforeVideoUpload(file) {
            const tempFileType = file.type;
            const tempFileSize = file.size / 1024 / 1024;
            if (tempFileType !== "video/mp4") {
                this.$message.error(this.$t("message.eport.File_type_mp4"));
                return false;
            }
            if (tempFileSize > 400) {
                this.$message.error(this.$t("message.eport.Photo_less_400"));
                return false;
            }
            return true;
        },
        videoSuccess(res) {
            if (Number(res.code) === 200) {
                let tempIndex = this.list.findIndex(item => {
                    return item._index == this.curMediaItem._index;
                });

                this.list[tempIndex].videoUrl =
                    this.baseUrl + res.entity[0].fileId;
                this.list[tempIndex].originVideoUrl = res.entity[0].fileId;
            }
        },
        beforeFileUpload(file) {
            const tempFileSize = file.size / 1024 / 1024;
            if (tempFileSize > 400) {
                this.$message.error(this.$t("message.eport.Photo_less_400"));
                return false;
            }
            this.fileName = file.name;
            return true;
        },
        handleFileSuccess(res) {
            if (Number(res.code) === 200) {
                this.fileUrl = this.baseUrl + res.entity[0].fileId;
                this.originFileUrl = res.entity[0].fileId;
            }
        },
        fileSuccess(res) {
            if (Number(res.code) === 200) {
                let tempIndex = this.list.findIndex(item => {
                    return item._index == this.curMediaItem._index;
                });
                this.list[tempIndex].fileUrl =
                    this.baseUrl + res.entity[0].fileId;
                this.list[tempIndex].originFileUrl = res.entity[0].fileId;
                this.list[tempIndex].fileName = res.entity[0].originName;
            }
        },
        addFile() {
            let _index = parseInt(Math.random() * 10000);
            while (this.list.indexOf(_index) > -1) {
                _index = parseInt(Math.random() * 10000);
            }
            let tempObj = {
                fileText: this.fileText,
                fileUrl: this.fileUrl,
                originFileUrl: this.originFileUrl,
                fileName: this.fileName,
                type: "wenjian",
                isEdit: false,
                _index: _index
            };
            this.list.push(tempObj);
            this.fileText = "";
            this.fileUrl = "";
            this.originFileUrl = "";
            this.isFile = false;
            this.fileName = "";
            this.getEditPages();
        },
        addLink() {
            let _index = parseInt(Math.random() * 10000);
            while (this.list.indexOf(_index) > -1) {
                _index = parseInt(Math.random() * 10000);
            }
            let tempObj = {
                linkText: this.linkText,
                type: "lianjie",
                isEdit: false,
                _index: _index
            };
            this.list.push(tempObj);
            this.linkText = "";
            this.isLink = false;
            this.getEditPages();
        },
        addChapter() {
            let _index = parseInt(Math.random() * 10000);
            while (this.list.indexOf(_index) > -1) {
                _index = parseInt(Math.random() * 10000);
            }
            let tempObj = {
                chapterName: this.chapterName,
                chapterText: this.chapterText,
                type: "fenye",
                isEdit: false,
                _index: _index
            };
            this.list.push(tempObj);
            this.chapterName = "";
            this.chapterText = "";
            this.isPaging = false;
            this.getEditPages();
        },
        async saveContent() {
            let tempUrlStr = this.baseUrl;
            let _this = this;
            let tempList = utilMethods.deepClone(_this.list);
            tempList.forEach(item => {
                item.isEdit = false;
            });
            let pageContent = JSON.stringify(tempList);
            let tempFileUrls = [];
            tempList.forEach(el => {
                if (el.type == "image") {
                    tempFileUrls.push(el.orginImageUrl);
                } else if (el.type == "video") {
                    tempFileUrls.push(el.originVideoUrl);
                } else if (el.type == "wenjian") {
                    tempFileUrls.push(el.originFileUrl);
                }
            });
            let params = {
                saveFileUrls: tempFileUrls,
                deleteFileUrls: [],
                content: pageContent,
                ePortfolioPageId: this.ePortfolioPageId
            };
            let res = await savePageContent(params);
            if (Number(res.data.code) === 200) {
                this.$message.success("Save success");
                this.isEdit = false;
                let tempId = this.currentNodeId
                    ? this.currentNodeId
                    : this.treeData[0].id;
                this.getEportContent(tempId);
            }
        },
        toAddPage() {
            this.isAddPage = true;
        },
        async addPage() {
            if (!this.newPageName) {
                this.$message.error(this.$t("message.eport.Page_name_empty"));
            } else {
                let param = {
                    ePortfolioColumnId: this.collectId,
                    name: this.newPageName
                };
                let res = await addEportPage(param);
                if (Number(res.data.code) === 200) {
                    this.newPageName = "";
                    this.isAddPage = false;
                    this.getCollect();
                }
            }
        },
        nodeClick(data, node, el) {
            // 点击节点
            this.ePortfolioPageId = data.id;
            this.currentNodeId = data.id;
            this.inputVal = "";
            this.textVal = "";
            this.imageText = "";
            this.videoText = "";
            this.fileName = "";
            this.fileText = "";
            this.linkText = "";
            this.chapterName = "";
            this.chapterText = "";
            this.getEportContent(data.id);
        },
        async getEportContent(id) {
            let param = { data: Number(id) };
            let res = await getEportContent(param);
            let tempObj;
            if (Number(res.data.code) === 200) {
                if (res.data.entity.content) {
                    let tempContent = res.data.entity.content;
                    tempObj = JSON.parse(tempContent);
                    this.list = utilMethods.deepClone(tempObj);
                    this.dataList = utilMethods.deepClone(tempObj);
                    this.isEdit = false;
                    this.isPaging = false;
                } else {
                    this.list = [];
                    this.dataList = [];
                    this.isEdit = true;
                    this.isPaging = true;
                    this.curLabel = "fenye";
                }
                this.getPages();
                this.changePage(1);
            }
        },
        getPages() {
            if (this.dataList.length > 0) {
                this.fenyeList = this.dataList.filter(el => {
                    return el.type == "fenye";
                });
                this.firstChapterIndex = this.fenyeList[0]._index;
                this.totalPage = this.fenyeList.length;
            } else {
                this.totalPage = 0;
            }
        },
        changePage(currentPage) {
            let fenyeTotal = this.fenyeList.length;
            let curPage = currentPage;
            if (fenyeTotal == 0) {
                this.list = this.dataList;
            } else {
                let fenyeItem = this.fenyeList[curPage - 1];
                let fenyeIndex = this.dataList.findIndex(el => {
                    return el._index == fenyeItem._index;
                });
                if (curPage < fenyeTotal) {
                    let nextFenItem = this.fenyeList[curPage];
                    let nextFenIndex = this.dataList.findIndex(item => {
                        return item._index == nextFenItem._index;
                    });
                    this.list = this.dataList.slice(fenyeIndex, nextFenIndex);
                } else {
                    this.list = this.dataList.slice(fenyeIndex);
                }
            }
        },
        cancelAddPage() {
            this.newPageName = "";
            this.isAddPage = false;
        },
        toEportHome() {
            if (this.canEdit) {
                if (this.roleType == 2 || this.roleType == 3) {
                    this.$router.push({
                        path:
                            "/homePage/personalHomepage/ePortfolios/ePortList",
                        query: {
                            eportId: this.eportId,
                            eportName: this.eportName
                        }
                    });
                } else if (this.roleType == 4) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentPersonal/ePortfolios/ePortList",
                        query: {
                            eportId: this.eportId,
                            eportName: this.eportName
                        }
                    });
                } else if (this.roleType == 1) {
                    this.$router.push({
                        path: "/adminHomePage/account/ePortfolios/ePortList",
                        query: {
                            eportId: this.eportId,
                            eportName: this.eportName
                        }
                    });
                }
            } else {
                this.$router.push({
                    path: "/ePortfolio/ePortList",
                    query: {
                        eportId: this.eportId,
                        eportName: this.eportName
                    }
                });
            }
        },
        rePageName(data) {
            this.curPageData = data;
            this.reVisible = true;
            this.reNameForm.name = data.name;
        },
        delClose() {
            this.delVisible = false;
        },
        delPage(data) {
            this.curPageData = data;
            this.delVisible = true;
        },
        async deletePage() {
            let tempCurId = this.curPageData.id;
            let res = await delEportPage(tempCurId);
            let _index = this.treeData.findIndex(el => {
                return Number(el.id) === Number(tempCurId);
            });
            this.treeData.splice(_index, 1);
            this.delVisible = false;
        },
        reNameClose() {
            this.$refs["reNameForm"].resetFields();
            this.reVisible = false;
        },
        cancelRename(formName) {
            this.$refs[formName].resetFields();
            this.reVisible = false;
        },
        saveRename(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let curId = Number(this.curPageData.id);
                    let param = {
                        id: curId,
                        name: this.reNameForm.name
                    };
                    let res = await modifyEportPage(param);
                    if (Number(res.data.code) === 200) {
                        let _index = this.treeData.findIndex(el => {
                            return Number(el.id) === curId;
                        });
                        let curFormName = this.reNameForm.name;
                        this.$set(this.treeData[_index], "name", curFormName);
                        this.$set(this.treeData[_index], "label", curFormName);
                        this.reVisible = false;
                    }
                }
            });
        },
        dupliPage(data) {
            this.curPageData = data;
            this.dupVisible = true;
        },
        dupPageClose() {
            this.dupVisible = false;
        },
        async duplicatePage() {
            let param = { id: this.curPageData.id };
            let res = await copyEportPage(param);
            if (Number(res.data.code) === 200) {
                this.$message.success(
                    this.$t("message.eport.Duplicate_page_success")
                );
                this.dupVisible = false;
                this.getCollect();
            }
        },
        editContent() {
            this.isEdit = true;
            this.list = utilMethods.deepClone(this.dataList);
            this.copyList = utilMethods.deepClone(this.dataList);
        },
        cancelContent() {
            this.isEdit = false;
            this.list = this.copyList;
            if (this.list.length > 0) {
                this.fenyeList = this.list.filter(el => {
                    return el.type == "fenye";
                });
                this.firstChapterIndex = this.fenyeList[0]._index;
                this.totalPage = this.fenyeList.length;
            } else {
                this.totalPage = 0;
            }
        }
    }
};
/* eslint-disable */
</script>

<style lang="less" scoped>
@import "./eport.less";
</style>
