<template>
    <!--eslint-disable-->
    <div style="margin-top: 50px" class="subaccount_box">
        <el-tree
            ref="tree"
            :key="treeKey"
            class="el_tree_father"
            node-key="id"
            :data="data"
            :props="defaultProps"
            :default-expanded-keys="treeExpandedKeys"
            :expand-on-click-node="true"
            :lazy="true"
            :load="loadTreeNode"
            @node-expand="treeExpand"
            @node-collapse="treeCollapse"
        >
            <!--eslint-disable-->
            <span slot-scope="{ node, data }" class="el_tree_list">
                <span>{{ node.label }}</span
                ><br />
                <!--eslint-disable no-new-->
                <span>
                    <span v-if="data.subCount != 0"> {{ data.subCount }}</span
                    >&nbsp;
                    <span v-if="data.subCount != 0 && data.subCount == 1">
                        {{ $t("message.Sub_agency") }}
                    </span>
                    <span v-else-if="data.subCount != 0 && data.subCount > 1">
                        {{ $t("message.Sub_agencys") }}
                    </span>
                    <span v-else />
                    <span v-if="data.coursesCount != 0">
                        {{ data.coursesCount }} </span
                    >&nbsp;
                    <span
                        v-if="data.coursesCount != 0 && data.coursesCount > 1"
                    >
                        {{ $t("message.Course_number") }}
                    </span>
                    <span
                        v-else-if="
                            data.coursesCount != 0 && data.coursesCount == 1
                        "
                    >
                        {{ $t("message.Course_numbers") }}
                    </span>
                    <span v-else />
                    <el-tag v-if="data.type == 1" size="mini" type="success">
                        {{ $t("message.ADMIN.rootAccount") }}
                    </el-tag>
                </span>
                <span class="iconfont_right">
                    <i
                        class="iconfont icon-add"
                        @click.stop="() => append(data)"
                    />
                    <i
                        class="iconfont icon-edit"
                        @click.stop="() => edit(node, data)"
                    />
                    <i
                        v-show="node.level != 1"
                        class="iconfont icon-delete"
                        @click.stop="() => remove(node, data)"
                    />
                </span>
            </span>
        </el-tree>

        <el-dialog
            :title="$t('message.ADMIN.title')"
            :visible.sync="isShowDlg"
            width="500px"
            @close="treeEditClose"
        >
            <el-form
                ref="nodeQuery"
                :inline="true"
                label-width="164px"
                :model="nodeQuery"
                size="small"
                class="demo-form-inline"
                :rules="rules"
            >
                <el-form-item
                    :label="$t('message.ADMIN.accountName')"
                    prop="name"
                >
                    <el-input
                        v-model="nodeQuery.name"
                        minlength="1"
                        maxlength="100"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="medium" @click="reset">
                    {{ $t("message.Common_cancel") }}
                </el-button>
                <el-button size="medium" type="primary" @click="sure">
                    {{ $t("message.Common_submit") }}
                </el-button>
            </div>
        </el-dialog>
    </div>
    <!--eslint-disable-->
</template>

<script>
/* eslint-disable */
export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (value.trim() === "") {
                callback(this.$t("message.Sub-Account_tit"));
            } else {
                callback();
            }
        };
        return {
            accountName: "",
            title: "",
            data: [], // tree数据源
            defaultProps: {
                // 树相关属性设置
                id: "",
                children: "childList",
                label: "name",
                isLeaf: "leaf"
            },
            activeData: null, // 当前操作数据
            treeExpandedKeys: [], // 记录打开节点的数组
            treeKey: "", // 控制tree渲染的key
            nodeQuery: {
                name: "" // 编辑树节点表单的model
            },
            isShowDlg: false, // 是否显示编辑节点弹框
            rules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.Sub-Account_tit"),
                        trigger: "blur"
                    },
                    { validator: validateName, trigger: "blur" }
                ]
            }
        };
    },

    methods: {
        treeEditClose() {
            this.$refs.nodeQuery.resetFields();
        },
        // 加载树
        loadTreeNode(node, resolve) {
            const parentId = node.level == 0 ? "" : node.key;
            this.$http
                .get(`${process.env.NODE_ENV}/org/list?parentId=${parentId}`)
                .then(re => {
                    const treeData = re.data.entity;
                    if (node.level == 0) {
                        // 如果是第一次加载数据，直接返回数据
                        this.treeExpandedKeys.push(treeData[0].id);
                        resolve(treeData);
                    } else {
                        // 如果非第一次加载数据，将返回数据拼接到操作节点的childList属性中
                        node.data.childList = treeData;
                        resolve(treeData);
                    }
                });
        },
        // 新增节点
        append(data) {
            this.nodeQuery = {
                name: "",
                parentId: ""
            };
            this.title = this.$t("message.Add_New_Sub-Account");
            this.accountName = this.$t("message.Sub_Account_Name");
            this.editType = "ADD";
            this.isShowDlg = true;
            // 记录当前节点数据，供新增弹框关闭后回调用
            this.activeData = data;
            var ev = ev || window.event;
            ev.stop; // 阻止冒泡（原声方法）
        },

        // 移除节点
        remove(node, data) {
            const ev = window.event;
            if (data.coursesCount > 0) {
                //console.log("hai有多少课程", data.coursesCount);
                this.$message({
                    type: "warning",
                    message: this.$t("message.ADMIN.removeOrgTip")
                });
                return;
            }
            this.$confirm(this.$t("message.admin_org_remove"), "", {
                confirmButtonText: this.$t("message.Common_confirm"),
                cancelButtonText: this.$t("message.Common_cancel"),
                type: "warning"
            })
                .then(() => {
                    this.$http
                        .post(`${process.env.NODE_ENV}/org/deletes`, data.id)
                        .then(re => {
                            if (re.data.code == 200) {
                                // 重新渲染tree
                                this.renderTree();
                                this.$message({
                                    type: "success",
                                    message: this.$t("message.Delete_succeeded")
                                });
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: this.$t("message.undelete")
                    });
                });
            ev.stop; // 阻止冒泡（原声方法）
        },

        // 编辑节点
        edit(node, data) {
            let isRoot = false;
            if (data.parentId == -1) {
                isRoot = true;
                this.title = this.$t("message.ADMIN.Edit_Root_Account");
                this.accountName = this.$t("message.ADMIN.Root_Account_Name");
            } else {
                isRoot = false;
                this.title = this.$t("message.ADMIN.Edit_Sub_Account");
                this.accountName = this.$t("message.ADMIN.Sub_Account_Name");
            }
            // this.$refs.nodeQuery.resetFields();       // this.$refs.adduserform.resetFields();+
            // this.title = this.$t('message.Edit_school-Account');
            this.nodeQuery.name = data.name;
            // 记录当前操作数据
            this.activeData = data;
            this.editType = "EDIT";
            this.isShowDlg = true;
            var ev = ev || window.event;
            ev.stop; // 阻止冒泡（原声方法）
        },

        // 新增节点回调函数
        appendCallback() {
            const data = this.activeData;
            // const { nodeQuery } = this;
            this.nodeQuery.parentId = data.id;
            console.log("nodeQuery", this.nodeQuery);
            // 将新节点名称和父节点id传递到后台
            this.$http
                .post(`${process.env.NODE_ENV}/org/add`, this.nodeQuery)
                .then(re => {
                    if (re.data.code == 200) {
                        this.renderTree();
                        this.reset();
                    }
                });
        },

        // 编辑节点回调函数
        editCallback() {
            const data = this.activeData;
            const { nodeQuery } = this;
            data.name = nodeQuery.name;
            // 将节点新名称和节点id传递到后台
            this.$http
                .post(`${process.env.NODE_ENV}/org/modify`, data)
                .then(re => {
                    if (re.data.code == 200) {
                        this.renderTree();
                        this.$message({
                            type: "success",
                            message: this.$t("message.ADMIN.success")
                        });
                        this.reset();
                    }
                });
        },

        // 刷新key值，重新渲染tree
        renderTree() {
            this.treeKey = +new Date();
        },

        // 当节点打开时，记录下打开节点的id
        treeExpand(data, node, self) {
            this.treeExpandedKeys.push(data.id);
        },

        // 当节点关闭时，移除节点的id
        treeCollapse(data) {
            console.log(data.childList, "data");
            const index = this.treeExpandedKeys.indexOf(data.id);
            if (index > -1) {
                this.treeExpandedKeys.splice(index);
                data.childList.forEach(item => {
                    this.treeExpandedKeys.splice(item.id);
                });
            }
        },

        // tree noed 新增/编辑确定事件
        sure() {
            const { editType } = this;
            this.$refs.nodeQuery.validate(async valid => {
                // console.log('valid', valid)
                if (valid) {
                    // console.log('editType', editType)
                    editType === "ADD"
                        ? this.appendCallback()
                        : this.editCallback();
                    // this.reset();
                } else {
                    return false;
                }
            });
        },

        // tree node 弹框取消事件
        reset() {
            this.activeData = null;
            this.isShowDlg = false;
            this.nodeQuery = {
                name: "",
                parentId: ""
            };
            // this.editType = "ADD";
            /*  this.$nextTick(() => {
          this.$refs["nodeQuery"].resetFields();       // this.$refs.adduserform.resetFields();
        }); */
        }
    }
};
</script>
<style scoped>
/deep/ .el-tree-node__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 60px;
    cursor: pointer;
    border: 1px #cccccc solid;
    border-bottom: none;
}
/deep/ .el-tree {
    position: relative;
    cursor: default;
    background: #fff;
    color: #606266;
    border-bottom: 1px solid #cccccc;
}
/deep/ .el-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 119px;
}
.el_tree_list {
    display: inline-block;
    width: 100%;
}
.iconfont_right {
    float: right;
    margin-right: 20px;
}
.iconfont_right i {
    margin-right: 20px;
    font-size: 24px;
    color: #666666;
}
.subaccount_box {
    padding-right: 30px;
}
</style>
