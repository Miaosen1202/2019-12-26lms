<template>
    <div style="padding-bottom: 20px">
        <h1 v-show="!canEdit" style="font-size: 18px; margin: 20px">
            {{ eportName }}
        </h1>
        <div ref="headerBox" class="collect-header">
            <el-button v-show="canEdit" style="height: 40px" @click="openShare">
                <i class="iconfont icon-iconset0355" /> Share
            </el-button>
        </div>
        <div>
            <draggable
                :list="layout"
                class="layout-group"
                ghost-class="ghost"
                :move="onMove"
                :sort="canEdit"
                @start="dragging = true"
                @end="onEnd"
            >
                <div
                    v-for="(item, eIndex) in layout"
                    :key="eIndex"
                    :itemId="item.id"
                >
                    <div v-if="item.id == 'add'">
                        <div class="gride-add">
                            <div class="add-box">
                                <a class="add-icon" @click="addCollection">
                                    <i
                                        class="iconfont icon-chuangjian"
                                        style="font-size: 60px; color: #0E38B1"
                                    />
                                </a>
                                <a class="add-text" @click="addCollection">
                                    {{
                                        $t("message.eport.New_page_collection")
                                    }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-else class="gride-item">
                        <div
                            class="item-top"
                            :style="{
                                background: colorFilter(
                                    item.coverColor,
                                    'topColor'
                                )
                            }"
                        >
                            <div v-show="canEdit">
                                <el-color-picker
                                    v-model="item.coverColor"
                                    class="eport-picker"
                                    popper-class="eportColor"
                                    :predefine="predefineColors"
                                    @change="changeColor(item)"
                                />
                            </div>
                            <el-dropdown
                                v-show="canEdit"
                                trigger="click"
                                @command="handleGride"
                            >
                                <span class="el-dropdown-link">
                                    <a style="cursor: pointer">
                                        <i class="iconfont icon-morevert" />
                                    </a>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                        :command="
                                            JSON.stringify(item) + '_rename'
                                        "
                                    >
                                        <i class="iconfont icon-edit" /> &nbsp;
                                        {{ $t("message.eport.Rename") }}
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                        :command="
                                            JSON.stringify(item) + '_delete'
                                        "
                                    >
                                        <i class="iconfont icon-delete" />
                                        &nbsp; {{ $t("message.eport.Delete") }}
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                        :command="
                                            JSON.stringify(item) + '_duplicate'
                                        "
                                    >
                                        <i
                                            class="iconfont icon-ICAtubiao_wendangzhongxin"
                                        />
                                        &nbsp;
                                        {{ $t("message.eport.Duplicate") }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div
                            class="item-bottom"
                            :style="{
                                background: colorFilter(
                                    item.coverColor,
                                    'bottomColor'
                                )
                            }"
                        >
                            <h1 class="item-title textOverflow">
                                <a
                                    style="text-decoration: underline; cursor:pointer"
                                    @click="toEportPage(item)"
                                >
                                    {{ item.name }}
                                </a>
                            </h1>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
        <el-dialog
            :title="
                isCreate
                    ? $t('message.eport.Create_new_collection')
                    : $t('message.eport.Rename_this_collection')
            "
            :visible.sync="collectCreate"
            :before-close="cancelCollect"
            width="30%"
        >
            <el-form
                ref="createCollect"
                :model="createCollect"
                :rules="createCollectRules"
            >
                <el-form-item
                    :label="$t('message.eport.Name')"
                    label-width="68px"
                    prop="name"
                >
                    <el-input v-model="createCollect.name" maxlength="200" />
                    <span class="limt-text">
                        {{ createCollect.name.length }} / 200
                    </span>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="cancelCollect">
                        {{ $t("message.eport.Cancel") }}
                    </el-button>
                    <el-button
                        type="primary"
                        @click="saveCollect('createCollect')"
                    >
                        {{ $t("message.eport.Save") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            class="no-title"
            title=" "
            :visible.sync="collectDel"
            width="30%"
            :before-close="cancelDel"
        >
            <span>{{ $t("message.eport.Sure_del_collection") }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="collectDel = false">{{
                    $t("message.eport.No")
                }}</el-button>
                <el-button type="primary" @click="deleteCollect">{{
                    $t("message.eport.Yes")
                }}</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="URL Management"
            :visible.sync="isShare"
            width="30%"
            :before-close="CloseShare"
        >
            <el-form
                ref="shareForm"
                :model="shareForm"
                :rules="shareRule"
                :inline="true"
            >
                <el-form-item
                    :label="$t('message.eport.URL')"
                    label-width="52px"
                    prop="url"
                >
                    <el-input
                        v-model="shareForm.url"
                        :data-clipboard-text="shareForm.url"
                        disabled
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="copyBtn" @click="copyUrl">
                        {{ $t("message.eport.Copy") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import {
    getCollections,
    addCollection,
    modifyEport,
    delCollect,
    copyCollect,
    shareEport,
    movePageCollect
} from "@/api/ePortRequest";
import draggable from "vuedraggable";
import Clipboard from "clipboard";
export default {
    components: {
        draggable
    },
    data() {
        return {
            canEdit: true,
            grideWidth: "",
            grideHeight: "",
            predefineColors: [
                "#0E38B1",
                "#55C21F",
                "#F13026",
                "#26BE96",
                "#F17E26",
                "#AF26F1",
                "#FBFF4E"
            ],
            isShare: false,
            index: 0,
            curCollectId: "",
            curCollectName: "",
            eportId: "",
            collectList: [],
            layout: [],
            newX: 0,
            newY: 0,
            collectCreate: false,
            collectDel: false,
            isCreate: false,
            createCollect: { name: "" },
            createCollectRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.eport.Name_required"),
                        trigger: "blur"
                    }
                ]
            },
            shareForm: { url: "" },
            shareRule: {
                url: [
                    {
                        required: true,
                        message: this.$t("message.eport.Url_required"),
                        trigger: "blur"
                    }
                ]
            },
            eportName: "",
            draggedItem: "",
            canMove: false
        };
    },

    watch: {
        $route: {
            handler(val) {},
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
    computed: {
        ...mapGetters(["userInfoData"]),
        roleType() {
            return this.userInfoData.type;
        }
    },
    created() {
        let routeName = this.$route.name;
        let tempIndex = routeName.indexOf("_");
        let tempStr = routeName.slice(tempIndex + 1);
        if (tempStr == "ePortfolios_t2") {
            this.canEdit = true;
        } else this.canEdit = false;
        this.eportId = this.$route.query.eportId;
        this.eportName = this.$route.query.eportName;
        this.getCollections();
    },
    mounted() {
        this.index = this.layout.length;
    },
    updated() {
        this.$nextTick(() => {
            let grideBoxList = this.$refs.grideBox;
            if (typeof grideBoxList == "undefined") {
                this.grideWidth = 296 + "px";
                this.grideHeight = 230 + "px";
            } else {
                let addGrideBox = grideBoxList[0];
                let gridHeight = addGrideBox.offsetHeight;
                let grideWidth = addGrideBox.offsetWidth;
                this.grideWidth = grideWidth + "px";
                this.grideHeight = gridHeight + "px";
            }
        });
    },
    methods: {
        onMove(e) {
            this.draggedItem = e.draggedContext.element.id;
            if (
                e.draggedContext.element.id === "add" ||
                e.relatedContext.element.id === "add"
            ) {
                this.canMove = false;
                return false;
            } else {
                this.canMove = true;
                return true;
            }
        },
        async onEnd(evt) {
            if (this.canMove) {
                let tempId = Number(this.draggedItem);
                let tempSeq = evt.newIndex;
                let param = { id: tempId, seq: Number(tempSeq) };
                let res = await movePageCollect(param);
                if (Number(res.data.code) === 200) {
                    this.$message({
                        message: this.$t("message.eport.Move_sucess"),
                        showClose: true,
                        type: "success"
                    });
                }
            } else {
                return false;
            }
        },
        async copyUrl() {
            let copySuccess = false;
            let tempUrl = this.shareForm.url;
            let clipboard = new Clipboard(".copyBtn", {
                text: function() {
                    return tempUrl;
                }
            });
            clipboard.on("success", e => {
                // 释放内存
                clipboard.destroy();
                this.isShare = false;
                copySuccess = true;
            });
            clipboard.on("error", e => {
                this.$message({
                    message: this.$t("message.eport.Copy_failed"),
                    showClose: true,
                    type: "error"
                });
                clipboard.destroy();
                this.isShare = false;
                copySuccess = false;
            });
            let param = { id: Number(this.eportId), visibility: 3 };
            let res = await shareEport(param);
            if (Number(res.data.code) === 200) {
                if (copySuccess) {
                    this.$message({
                        message: this.$t("message.eport.Copy_success"),
                        showClose: true,
                        type: "success"
                    });
                }
            }
        },
        openShare() {
            this.shareForm.url =
                "http://welms.wdcloud.cc/#/ePortfolio/ePortList?eportId=" +
                this.eportId;
            this.isShare = true;
        },
        CloseShare() {
            this.$refs.shareForm.resetFields();
            this.isShare = false;
        },
        async changeColor(item) {
            let tempColor = item.coverColor;
            let paramas = { id: item.id, coverColor: tempColor };
            let res = await modifyEport(paramas);
            if (tempColor === "#0E38B1" || tempColor === "#0e38b1") {
                item.coverColor = "rgba(14,56,177, 1)";
            } else if (tempColor === "#55C21F" || tempColor === "#55c21f") {
                item.coverColor = "rgba(85,194,31, 1)";
            } else if (tempColor === "#F13026" || tempColor === "#f13026") {
                item.coverColor = "rgba(241,48,38, 1)";
            } else if (tempColor === "#26BE96" || tempColor === "#26be96") {
                item.coverColor = "rgba(38,190,150, 1)";
            } else if (tempColor === "#F17E26" || tempColor === "#f17e26") {
                item.coverColor = "rgba(241,126,38, 1)";
            } else if (tempColor === "#AF26F1" || tempColor === "#af26f1") {
                item.coverColor = "rgba(175,38,241, 1)";
            } else if (tempColor === "#FBFF4E" || tempColor === "#fbff4e") {
                item.coverColor = "rgba(251,255,78, 1)";
            }
        },
        colorFilter(acolor, pos) {
            let color = this.transColor(acolor);
            let obj = { topColor: "", bottomColor: "" };
            if (color === "#0E38B1" || color === "#0e38b1") {
                obj = {
                    topColor: "rgba(14,56,177, 1)",
                    bottomColor: "rgba(14,56,177,0.5)"
                };
            } else if (color === "#55C21F" || color === "#55c21f") {
                obj = {
                    topColor: "rgba(85,194,31, 1)",
                    bottomColor: "rgba(85,194,31, 0.5)"
                };
            } else if (color === "#F13026" || color === "#f13026") {
                obj = {
                    topColor: "rgba(241,48,38, 1)",
                    bottomColor: "rgba(241,48,38,0.5)"
                };
            } else if (color === "#26BE96" || color === "#26be96") {
                obj = {
                    topColor: "rgba(38,190,150, 1)",
                    bottomColor: "rgba(38,190,150,0.5)"
                };
            } else if (color === "#F17E26" || color === "#f17e26") {
                obj = {
                    topColor: "rgba(241,126,38, 1)",
                    bottomColor: "rgba(241,126,38,0.5)"
                };
            } else if (color === "#AF26F1" || color === "#af26f1") {
                obj = {
                    topColor: "rgba(175,38,241, 1)",
                    bottomColor: "rgba(175,38,241,0.5)"
                };
            } else if (color === "#FBFF4E" || color === "#fbff4e") {
                obj = {
                    topColor: "rgba(251,255,78, 1)",
                    bottomColor: "rgba(251,255, 78, 0.5)"
                };
            }
            return obj[pos];
        },
        transColor(value) {
            if (/rgba?/.test(value)) {
                var tempArr = value.split(",");
                let array = tempArr.slice(0, 3);
                if (array.length > 3) return "";
                value = "#";
                for (var i = 0, color; (color = array[i++]); ) {
                    color = parseInt(color.replace(/[^\d]/gi, ""), 10).toString(
                        16
                    );
                    value += color.length == 1 ? "0" + color : color;
                }
                value = value.toUpperCase();
            }
            return value;
        },
        handleGride(command) {
            let tempList = command.split("_");
            let tempItem = JSON.parse(tempList[0]);
            this.curCollectId = tempItem.id;
            this.curCollectName = tempItem.name;
            let tempOperate = tempList[1];
            if (tempOperate === "rename") {
                this.isCreate = false;
                this.collectCreate = true;
                this.createCollect.name = tempItem.name;
            } else if (tempOperate === "delete") {
                this.collectDel = true;
            } else if (tempOperate === "duplicate") {
                this.copyCollect();
            }
        },
        async copyCollect() {
            let param = { id: Number(this.curCollectId) };
            let res = await copyCollect(param);
            if (Number(res.data.code) === 200) {
                this.$message.success(
                    this.$t("message.eport.Duplicate_collection_success")
                );
                this.getCollections();
            } else {
                this.$message.error(
                    this.$t("message.eport.Duplicate_collection_failed")
                );
            }
        },
        async deleteCollect() {
            let params = this.curCollectId;
            let res = await delCollect(params);
            if (Number(res.data.code) === 200) {
                this.$message.success(
                    this.$t("message.eport.Del_collection_success")
                );
                this.collectDel = false;
                let tempIndex = this.layout.findIndex(el => {
                    return Number(el.id) === Number(this.curCollectId);
                });
                this.layout.splice(tempIndex, 1);
            }
        },
        async getCollections() {
            let param = { data: Number(this.eportId) };
            let res = await getCollections(param);
            if (Number(res.data.code) === 200) {
                let tempDataList = res.data.entity.columns;
                // console.log('tempDataList', tempDataList)
                tempDataList = tempDataList.map((val, index, arr) => {
                    let tempLen = "";
                    let tempColor = val.coverColor ? val.coverColor : "#0E38B1";
                    let tempObj = {
                        coverColor: tempColor,
                        id: val.id,
                        name: val.name,
                        seq: val.seq ? val.seq : index + 1,
                        order: val.seq ? val.seq : index + 1
                    };
                    // let tempVal = Object.assign(val, tempObj);
                    return tempObj;
                });
                let addItem = [{ id: "add", seq: 0, order: 0 }];
                if (this.canEdit) {
                    this.layout = addItem.concat(tempDataList);
                } else {
                    this.layout = tempDataList;
                }
            }
        },
        async movedEvent(i, newX, newY, e) {
            let param = { id: i, x: newX, y: newY };
            let res = await movePageCollect(param);
            if (Number(res.data.code) === 200) {
            }
        },
        addCollection() {
            this.collectCreate = true;
            this.createCollect.name = "";
            this.isCreate = true;
        },
        cancelCollect() {
            this.$refs.createCollect.resetFields();
            this.collectCreate = false;
        },
        cancelDel() {
            this.collectDel = false;
        },
        saveCollect(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    if (this.isCreate) {
                        let param = {
                            ePortfolioId: this.eportId,
                            name: this.createCollect.name
                        };
                        let res = await addCollection(param);
                        if (Number(res.data.code) === 200) {
                            this.$message.success(
                                this.$t("message.eport.Add_collection_success")
                            );
                            this.collectCreate = false;
                            this.getCollections();
                        }
                    } else {
                        let param = {
                            id: Number(this.curCollectId),
                            name: this.createCollect.name
                        };
                        let res = await modifyEport(param);
                        if (Number(res.data.code) === 200) {
                            let tempIndex = this.layout.findIndex(item => {
                                return (
                                    Number(item.id) ===
                                    Number(this.curCollectId)
                                );
                            });
                            this.$set(
                                this.layout[tempIndex],
                                "name",
                                this.createCollect.name
                            );
                            this.collectCreate = false;
                        }
                    }
                }
            });
        },
        toEportPage(data) {
            // 去创建页面集
            if (this.canEdit) {
                if (this.roleType == 2 || this.roleType == 3) {
                    this.$router.push({
                        path:
                            "/homePage/personalHomepage/ePortfolios/ePortPages",
                        query: {
                            collectId: data.id,
                            collectName: data.name,
                            eportId: this.eportId,
                            eportName: this.eportName
                        }
                    });
                } else if (this.roleType == 4) {
                    this.$router.push({
                        path:
                            "/studentHomePage/studentPersonal/ePortfolios/ePortPages",
                        query: {
                            collectId: data.id,
                            collectName: data.name,
                            eportId: this.eportId,
                            eportName: this.eportName
                        }
                    });
                } else if (this.roleType == 1) {
                    this.$router.push({
                        path: "/adminHomePage/account/ePortfolios/ePortPages",
                        query: {
                            collectId: data.id,
                            collectName: data.name,
                            eportId: this.eportId,
                            eportName: this.eportName
                        }
                    });
                }
            } else {
                this.$router.push({
                    path: "/ePortfolio/ePortPages",
                    query: {
                        collectId: data.id,
                        collectName: data.name,
                        eportId: this.eportId,
                        eportName: this.eportName
                    }
                });
            }
        }
    }
};
/* eslint-disable */
</script>
<style lang="less" scoped>
@import "./eport.less";
</style>
