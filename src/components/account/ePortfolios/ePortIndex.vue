<template>
    <div>
        <header class="eIndexHeader">
            <el-button type="primary" @click="ePortCreate = true">
                <i class="iconfont icon-add1" />
                {{ $t("message.eport.Create_eport") }}
            </el-button>
        </header>
        <section class="eport-list">
            <el-table
                v-loading="createLoading"
                class="eportTable"
                :data="eportData"
                style="width: 100%"
            >
                <el-table-column width="240">
                    <template slot-scope="scope">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="scope.row.name"
                            placement="top-start"
                        >
                            <span
                                class="textOverflow"
                                style="display: inline-block; width: 100%"
                            >
                                <i class="iconfont icon-dangan item-icon" />
                                <a
                                    class="item-name"
                                    @click="toEport(scope.row)"
                                >
                                    {{ scope.row.name }}
                                </a>
                            </span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span style="display: inline-block">
                            {{ scope.row.columnCount }}
                            <i v-if="Number(scope.row.columnCount) > 1">
                                {{ $t("message.eport.pages") }}
                            </i>
                            <i v-else>{{ $t("message.eport.page") }}</i>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span style="display: inline-block">
                            {{ $t("message.eport.Last_updated") }}
                            {{
                                (new Date(scope.row.updateTime).getMonth() + 1)
                                    | month
                            }}
                            {{ new Date(scope.row.updateTime).getDate() }} at
                            {{
                                new Date(scope.row.updateTime).getHours()
                                    | hours
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <a style="cursor: pointer">
                                    <i class="iconfont icon-morevert" />
                                </a>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    @click.native="
                                        handleEport(scope.row, 'rename')
                                    "
                                >
                                    <i class="iconfont icon-edit" />
                                    {{ $t("message.eport.Rename") }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click.native="
                                        handleEport(scope.row, 'delete')
                                    "
                                >
                                    <i class="iconfont icon-delete" />
                                    {{ $t("message.eport.Delete") }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <el-dialog
            :title="$t('message.eport.Create_new_eport')"
            :visible.sync="ePortCreate"
            :before-close="cancelEport"
            width="30%"
        >
            <el-form
                ref="createEportForm"
                :model="createEportForm"
                :rules="createEportRules"
            >
                <el-form-item
                    :label="$t('message.eport.Name')"
                    label-width="68px"
                    prop="name"
                >
                    <el-input v-model="createEportForm.name" maxlength="200" />
                    <span class="limt-text">
                        {{ createEportForm.name.length }} / 200</span
                    >
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="cancelEport">
                        {{ $t("message.eport.Cancel") }}
                    </el-button>
                    <el-button
                        type="primary"
                        @click="saveEport('createEportForm')"
                    >
                        {{ $t("message.eport.Save") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="Rename the ePortfolios"
            :visible.sync="isRename"
            width="30%"
            :before-close="closeRename"
        >
            <el-form
                ref="renameForm"
                :model="renameForm"
                :rules="renameRules"
                label-width="100px"
            >
                <el-form-item :label="$t('message.eport.Rename')" prop="name">
                    <el-input v-model="renameForm.name" maxlength="200" />
                    <span class="limt-text">
                        {{ renameForm.name.length }} / 200</span
                    >
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="cancelRename('renameForm')">
                        {{ $t("message.eport.Cancel") }}
                    </el-button>
                    <el-button type="primary" @click="saveRename('renameForm')">
                        {{ $t("message.eport.Rename") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            class="no-title"
            :title="$t('message.eport.Delete_ePortfolio')"
            :visible.sync="eportDel"
            width="30%"
            :before-close="cancelDel"
        >
            <span> {{ $t("message.eport.Sure_del_ePortfolio") }} </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="eportDel = false">{{
                    $t("message.eport.No")
                }}</el-button>
                <el-button type="primary" @click="delEport">{{
                    $t("message.eport.Yes")
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import {
    addEport,
    eportList,
    renameEport,
    deleteEport
} from "@/api/ePortRequest";
import { dateFormdate } from "@/utils/date";
export default {
    data() {
        return {
            eportDel: false,
            createLoading: false,
            ePortCreate: false,
            eportData: [],
            createEportForm: { name: "" },
            createEportRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.eport.Name_required"),
                        trigger: "blur"
                    }
                ]
            },
            isRename: false,
            renameForm: {
                name: ""
            },
            renameRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("message.eport.Name_required"),
                        trigger: "blur"
                    }
                ]
            },
            curEportId: ""
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
        this.eportList();
    },
    methods: {
        dateFormdate: dateFormdate,
        async eportList() {
            this.createLoading = true;
            let res = await eportList();
            if (Number(res.data.code) === 200) {
                this.eportData = res.data.entity;
                this.createLoading = false;
            }
        },
        cancelEport() {
            this.$refs.createEportForm.resetFields();
            this.ePortCreate = false;
        },
        saveEport(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let params = { name: this.createEportForm.name };
                    let res = await addEport(params);
                    if (Number(res.data.code) === 200) {
                        this.$message.success(
                            this.$t("message.eport.Add_ePortfolio_success")
                        );
                        this.eportList();
                        this.ePortCreate = false;
                    }
                }
            });
        },
        toEport(data) {
            let tempId = data.id;
            if (this.roleType == 2 || this.roleType == 3) {
                this.$router.push({
                    path: "/homePage/personalHomepage/ePortfolios/ePortList",
                    query: { eportId: data.id, eportName: data.name }
                });
            } else if (this.roleType == 4) {
                this.$router.push({
                    path:
                        "/studentHomePage/studentPersonal/ePortfolios/ePortList",
                    query: { eportId: data.id, eportName: data.name }
                });
            } else if (this.roleType == 1) {
                this.$router.push({
                    path: "/adminHomePage/account/ePortfolios/ePortList",
                    query: { eportId: data.id, eportName: data.name }
                });
            }
        },
        handleEport(data, operate) {
            this.renameForm.name = data.name;
            this.curEportId = data.id;
            if (operate === "rename") {
                this.isRename = true;
            } else if (operate === "delete") {
                this.eportDel = true;
            }
        },
        cancelDel() {
            this.eportDel = false;
        },
        closeRename() {
            this.isRename = false;
        },
        cancelRename(formName) {
            this.$refs[formName].resetFields();
            this.isRename = false;
        },
        async delEport() {
            let param = this.curEportId;
            let res = await deleteEport(param);
            if (Number(res.data.code) === 200) {
                this.$message.success(
                    this.$t("message.eport.Del_ePortfolio_success")
                );
                let deIndex = this.eportData.findIndex(item => {
                    return Number(item.id) === Number(this.curEportId);
                });
                this.eportData.splice(deIndex, 1);
                this.eportDel = false;
            }
        },
        saveRename(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let params = {
                        id: this.curEportId,
                        name: this.renameForm.name
                    };
                    let res = await renameEport(params);
                    if (Number(res.data.code) === 200) {
                        let tempIndex = this.eportData.findIndex(el => {
                            return Number(el.id) === Number(this.curEportId);
                        });
                        this.$set(
                            this.eportData[tempIndex],
                            "name",
                            this.renameForm.name
                        );
                        this.isRename = false;
                    }
                } else {
                }
            });
        }
    }
};
/* eslint-disable */
</script>

<style lang="less" scoped>
@import "./eport.less";
</style>
