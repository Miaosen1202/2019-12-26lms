<template>
    <!--eslint-disable-->
    <div v-show="annnouncementStepThree" class="annnouncementStepThree">
        <el-row>
            <el-col :span="13">
                <div style="">
                    <el-form
                        ref="form"
                        :model="searchForm"
                        style="display: inline-block"
                    >
                        <el-form-item
                            label=""
                            style="width: 35%;display: inline-block"
                        >
                            <el-input
                                v-model="searchForm.name"
                                :placeholder="$t('message.Search')"
                                prefix-icon="el-icon-search"
                                @input="announceListSearch()"
                            />
                        </el-form-item>
                        <el-form-item
                            label=""
                            style="display: inline-block;width: 35%;margin-left: 18px"
                        >
                            <el-select
                                v-model="searchForm.isRead"
                                :placeholder="$t('message.All')"
                                @change="announceListSearch()"
                            >
                                <el-option
                                    v-for="item in isReadOptions"
                                    :key="item.isRead"
                                    :label="item.name"
                                    :value="item.isRead"
                                />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="11">
                <div style="float: right;margin-right: 18%">
                    <el-button
                        type="primary"
                        style="display: inline-block;vertical-align: -3px;padding: 8px 13px;"
                        @click="addAnnoucement"
                    >
                        <i
                            class="iconfont icon-add"
                            style="font-size: 22px;margin-top: 5px"
                        />
                        <span
                            style="float: right;font-size: 17px;margin-top: 3px"
                            >{{ $t("message.ANNOUNCE.ANNOUNCEMENT") }}</span
                        >
                    </el-button>
                    <!--<el-button icon="el-icon-setting" @click="centerDialogVisible = true"></el-button>-->
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22" style="margin-top: -20px">
                <div class="disMain">
                    <div v-if="announceListVO.length" class="disMainImg">
                        <div
                            v-for="(item, index) in announceListVO"
                            class="announceList"
                        >
                            <p
                                class="announceListP1"
                                style="cursor: pointer"
                                @click="reply(item.id, item.topic)"
                            >
                                {{ item.topic }}
                            </p>
                            <div v-if="item.readCountDTO" class="read-unread">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="
                                        String(
                                            item.readCountDTO.replyNotReadTotal
                                        ) + ' unread replies'
                                    "
                                    placement="top"
                                >
                                    <div class="read">
                                        {{
                                            item.readCountDTO.replyNotReadTotal
                                        }}
                                    </div>
                                </el-tooltip>
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="
                                        String(item.readCountDTO.replyTotal) +
                                            ' replies'
                                    "
                                    placement="top"
                                >
                                    <div class="unread">
                                        {{ item.readCountDTO.replyTotal }}
                                    </div>
                                </el-tooltip>
                            </div>
                            <el-dropdown style="float: right">
                                <span class="el-dropdown-link">
                                    <i style="float: right;cursor: pointer"
                                        ><img
                                            src="../../../../static/images/spread.png"
                                    /></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <div
                                        v-if="item.allowComment == 0"
                                        @click="
                                            switchComment(
                                                [item.id],
                                                1,
                                                item.allowComment
                                            )
                                        "
                                    >
                                        <el-dropdown-item>
                                            <i
                                                class="iconfont icon-password"
                                                style="font-size: 20px;cursor: pointer"
                                            >
                                                <span
                                                    class="iconzi"
                                                    style="font-size: 16px"
                                                >
                                                    {{
                                                        $t(
                                                            "message.Open_for_comments"
                                                        )
                                                    }}
                                                </span>
                                            </i>
                                        </el-dropdown-item>
                                    </div>
                                    <div
                                        v-else-if="item.allowComment == 1"
                                        @click="
                                            switchComment(
                                                [item.id],
                                                0,
                                                item.allowComment
                                            )
                                        "
                                    >
                                        <el-dropdown-item>
                                            <i
                                                class="iconfont icon-suoding"
                                                style="font-size: 20px"
                                            >
                                                <span style="font-size: 16px">
                                                    {{
                                                        $t(
                                                            "message.Close_for_comments"
                                                        )
                                                    }}
                                                </span>
                                            </i>
                                        </el-dropdown-item>
                                    </div>
                                    <div @click="deleteOpen(item.id)">
                                        <el-dropdown-item>
                                            <i
                                                class="iconfont icon-delete"
                                                style="font-size: 20px"
                                            >
                                                <span style="font-size: 16px">
                                                    {{ $t("message.Deletes") }}
                                                </span>
                                            </i>
                                        </el-dropdown-item>
                                    </div>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <div style="margin-top: 10px">
                                <!--<el-checkbox v-model="item.checked"></el-checkbox>-->
                                <!--<img :src="getAbsolutePath(item.createUserAvatar,40,40)" style="position: absolute">-->
                                <p
                                    class="announceListP2"
                                    v-html="item.content"
                                />
                            </div>
                            <div class="bottomDetail">
                                <span
                                    >{{ $t("message.ANNOUNCE.POST_ON") }}
                                    {{ formatDate(item.publishTime) }}
                                    {{ $t("message.ANNOUNCE.BY") }}
                                    {{ item.createUserNickname }}
                                </span>
                                <div
                                    v-if="item.allowComment == 1"
                                    style="cursor: pointer;display: inline-block;margin-left: 10px"
                                >
                                    <!--<img  src="../../../../static/images/reply.png">-->
                                    <i
                                        class="iconfont icon-hf"
                                        style="font-size: 20px;color: #666666;float: left"
                                    />

                                    <span
                                        style="margin-left: 5px"
                                        @click="reply(item.id)"
                                    >
                                        {{ $t("message.ANNOUNCE.REPLY") }}</span
                                    >
                                </div>
                            </div>
                            <div
                                v-if="item.userCount"
                                style="color: #0e38b1;text-decoration: underline"
                            >
                                <el-popover
                                    v-if="item.userCount != 0"
                                    trigger="hover"
                                    placement="top"
                                >
                                    <div>
                                        <span
                                            >{{ item.userCount }}
                                            <span v-if="item.userCount == 1">{{
                                                $t("message.user")
                                            }}</span>
                                            <span
                                                v-else-if="item.userCount > 1"
                                                >{{ $t("message.users") }}</span
                                            >
                                        </span>
                                    </div>
                                    <div slot="reference" class="section-list">
                                        {{
                                            $t("message.ANNOUNCE.ALL_SECTIONS")
                                        }}
                                    </div>
                                </el-popover>
                            </div>
                            <div v-else-if="item.sectionList">
                                <el-popover
                                    v-if="item.sectionList.length != 0"
                                    trigger="hover"
                                    placement="top"
                                >
                                    <div
                                        v-for="(items,
                                        key,
                                        index) in item.sectionList"
                                    >
                                        <span
                                            >{{
                                                items.sectionName
                                            }}&nbsp;&nbsp;&nbsp;{{
                                                items.userCount
                                            }}
                                            <span v-if="items.userCount == 1">{{
                                                $t("message.user")
                                            }}</span>
                                            <span
                                                v-else-if="items.userCount > 1"
                                                >{{ $t("message.users") }}</span
                                            >
                                        </span>
                                    </div>

                                    <div slot="reference" class="section-list">
                                        {{ item.sectionList.length }}
                                        <span
                                            v-if="item.sectionList.length == 1"
                                            >{{
                                                $t("message.People_section")
                                            }}</span
                                        >
                                        <span
                                            v-else-if="
                                                item.sectionList.length > 1
                                            "
                                            >{{ $t("message.Sections") }}</span
                                        >
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                    <div v-else class="emptyData">
                        <span style="color: rgb(144, 147, 153);">{{
                            $t("message.ANNOUNCE.No_Data")
                        }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div>
            <el-dialog
                :title="$t('message.Certification.Confirm_Delete')"
                :visible.sync="deleteDialogVisible"
                width="30%"
            >
                <span>{{
                    $t("message.ANNOUNCE.You_are_about_to_delete")
                }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">{{
                        $t("message.Cancel")
                    }}</el-button>
                    <el-button type="primary" @click="deleteAnnounce">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import defaultHead from "../../../../static/images/touxiang1.png";
import { formatDate } from "@/utils/date";

export default {
    name: "Announcementlist",
    data() {
        return {
            deleteDialogVisible: false,
            isReadOptions: [
                { name: this.$t("message.ANNOUNCE.ALL"), isRead: 2 },
                { name: this.$t("message.ANNOUNCE.Unread"), isRead: 0 }
            ],
            courseId: this.$route.query.courseId,
            announceIds: [],
            defaultHead,
            annnouncementStepOne: true,
            annnouncementStepTwo: false,
            annnouncementStepThree: true,
            annnouncementStepFour: false,
            activeName: "first",
            searchForm: {
                name: null,
                isRead: null
            },
            ruleform: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            announceListVO: []
        };
    },
    mounted() {
        this.announceList();
    },
    methods: {
        deleteOpen(id) {
            this.deleteDialogVisible = true;
            if (id == undefined) {
                const tempList = this.announceListVO;
                tempList.forEach(vo => {
                    if (vo.checked) {
                        this.announceIds.push(vo.id);
                    }
                });
            } else {
                this.announceIds = [id];
            }
        },
        formatDate(time) {
            return formatDate(new Date(time), "yyyy-MM-dd hh:mm:ss");
        },
        getAbsolutePath(relativePath, width, height) {
            if (relativePath == undefined) return defaultHead;
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            }
            return `${this.GlobalUrl +
                relativePath}?s=thumb&a=${width}x${height}`;
        },
        async announceListSearch() {
            const params = {
                courseId: this.courseId,
                isRead: this.searchForm.isRead,
                topic: this.searchForm.name,
                studyGroupId: null
            };
            const result = await this.$getData("/announce/list", params, "get");
            if (result.data.code == 200) {
                this.announceListVO = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async announceList() {
            const params = {
                courseId: this.courseId,
                isRead: 2,
                topic: this.searchForm.name,
                studyGroupId: null
            };
            const result = await this.$getData("/announce/list", params, "get");
            if (result.data.code == 200) {
                this.announceListVO = result.data.entity;
                if (this.announceListVO.length == 0) {
                    this.$router.push({
                        path: "/homePage/allCourse/announcementCreate",
                        query: { courseId: this.courseId }
                    });
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        gotolist() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        addAnnoucement() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
            this.$router.push({
                path: "/homePage/allCourse/announcementAdmit",
                query: { courseId: this.courseId }
            });
        },
        editorcancel() {},
        reply(announceId, topic) {
            const params = {
                courseId: this.courseId,
                announceId,
                name: topic
            };
            this.$router.push({
                path: "/homePage/allCourse/announcementDetail",
                query: params
            });
        },
        onSubmit() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = true;
        },
        switchComment(ids, allowComment, s) {
            const params = {
                ids,
                allowComment
            };
            this.$http
                .post(
                    `${process.env.NODE_ENV}/announce/statusToggle/edit`,
                    params
                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceList();
                        if (s == 0) {
                            this.$message.success(
                                this.$t(
                                    "message.ANNOUNCE.Comments_are_available"
                                )
                            );
                        } else {
                            this.$message.success(
                                this.$t(
                                    "message.ANNOUNCE.Comments_are_unavailable"
                                )
                            );
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteAnnounce() {
            const params = this.announceIds;
            this.$http
                .post(`${process.env.NODE_ENV}/announce/deletes`, params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.announceList();
                        this.deleteDialogVisible = false;
                        this.announceIds = [];
                        this.$message.success(
                            this.$t(
                                "message.ANNOUNCE.Announcement_deleted_successfully"
                            )
                        );
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        centerDialogVisible() {}
    }
};
/*eslint-disable no-new*/
</script>
<style>
.announceListP2 p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

<style scoped lang="less">
.annnouncementStepThree {
    .emptyData {
        min-height: 60px;
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }
    .disMain {
        margin-top: 25px;
        /*height: 720px;*/
        border: 1px solid #e7ebf7;

        .disMainImg {
            width: 100%;
            height: 100%;
            position: relative;
        }
        .announceList {
            border-bottom: 1px solid #e7ebf7;
            padding: 2%;
        }
        .announceList:last-child {
            border-bottom: none;
        }
        .announceListP1 {
            /*display: inline-block;*/
            font-size: 20px;
            font-weight: bold;
            /*margin-left: 61px;*/
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 93%;
            height: 26px;
        }
        .announceListP2 {
            margin-top: -22px;
            /*margin-left: 65px;*/
            width: 90%;
            margin-top: 15px;
            /deep/ img {
                width: 95%;
            }
        }
        .bottomDetail {
            margin-top: 10px;
            position: relative;
            span:nth-of-type(1) {
                color: #6b7080;
                /*margin-left:65px;*/
            }
            img {
                position: absolute;
                margin-left: 30px;
            }
            span:nth-of-type(2) {
                color: #6b7080;
                /*margin-left: 50px*/
            }
        }
        .read-unread {
            display: inline-block;
            position: absolute;
            right: 50px;
        }
        .read {
            display: inline-block;
            background: #0e38b1;
            border: 2px solid #0e38b1;
            border-radius: 15px 1px 1px 15px;
            /*height: 20px;*/
            color: white;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 10px;
        }
        .unread {
            display: inline-block;
            background: #e6ebf7;
            border: 2px solid #0e38b1;
            border-radius: 1px 15px 15px 1px;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 11px;
            position: relative;
            right: 5px;
        }
        .section-list {
            text-decoration: underline;
            color: #0e38b1;
            font-size: 13px;
            /*margin-left: 65px;*/
            width: 100px;
        }
    }
}
</style>
