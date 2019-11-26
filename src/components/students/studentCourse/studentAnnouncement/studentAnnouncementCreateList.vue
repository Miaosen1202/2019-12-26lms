<template>
    <!--eslint-disable-->
    <div>
        <div v-show="annnouncementStepOne" class="annnouncementStepOne">
            <el-row>
                <el-col :span="12">
                    <div style="">
                        <el-form
                            ref="form"
                            :model="form"
                            style="display: inline-block"
                        >
                            <el-form-item
                                label=""
                                style="width: 35%;display: inline-block"
                            >
                                <el-input
                                    v-model="form.name"
                                    :placeholder="$t('message.Search')"
                                    prefix-icon="el-icon-search"
                                    disabled="disabled"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item
                                label=""
                                style="display: inline-block;width: 35%;margin-left: 18px"
                            >
                                <el-select
                                    v-model="form.region"
                                    :placeholder="$t('message.All')"
                                    disabled="disabled"
                                >
                                    <el-option label="全部" value="2"
                                        >2</el-option
                                    >
                                    <el-option label="未读" value="0"
                                        >0</el-option
                                    >
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" style="margin-top: -20px">
                    <div class="disMain">
                        <div class="disMainImg">
                            <img
                                src="../../../../../static/images/stu_announce.png"
                                alt=""
                            />
                            <p>
                                {{
                                    $t(
                                        "message.ANNOUNCE.There_are_no_announcements_to_show_in_this_section"
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
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
                                    @input="announceListSearch()"
                                    v-model="searchForm.name"
                                    :placeholder="$t('message.Search')"
                                    prefix-icon="el-icon-search"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item
                                label=""
                                style="display: inline-block;width: 35%;margin-left: 18px"
                            >
                                <el-select
                                    @change="announceListSearch()"
                                    v-model="searchForm.isRead"
                                    :placeholder="$t('message.All')"
                                >
                                    <el-option
                                        v-for="item in isReadOptions"
                                        :label="item.name"
                                        :value="item.isRead"
                                        :key="item.isRead"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" style="margin-top: -20px">
                    <div class="disMain">
                        <div class="disMainImg" v-if="announceListVO.length">
                            <div
                                class="announceList"
                                v-for="(item, index) in announceListVO"
                            >
                                <p
                                    class="announceListP1"
                                    style="cursor: pointer"
                                    @click="reply(item.id, item.topic)"
                                >
                                    {{ item.topic }}
                                </p>
                                <div
                                    class="read-unread"
                                    v-if="item.readCountDTO"
                                >
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="
                                            String(
                                                item.readCountDTO
                                                    .replyNotReadTotal
                                            ) + ' unread replies'
                                        "
                                        placement="top"
                                    >
                                        <div class="read">
                                            {{
                                                item.readCountDTO
                                                    .replyNotReadTotal
                                            }}
                                        </div>
                                    </el-tooltip>
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="
                                            String(
                                                item.readCountDTO.replyTotal
                                            ) + ' replies'
                                        "
                                        placement="top"
                                    >
                                        <div class="unread">
                                            {{ item.readCountDTO.replyTotal }}
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div style="margin-top: 10px">
                                    <p
                                        class="announceListP2"
                                        v-html="item.content"
                                    ></p>
                                </div>
                                <div class="bottomDetail">
                                    <span
                                        >{{ $t("message.ANNOUNCE.POST_ON") }}
                                        {{ formatDate(item.publishTime) }}
                                        {{ $t("message.ANNOUNCE.BY") }}
                                        {{ item.createUserNickname }}</span
                                    >
                                    <div
                                        v-if="item.allowComment == 1"
                                        style="cursor: pointer;display: inline-block;margin-left: 10px"
                                    >
                                        <i
                                            class="iconfont icon-hf"
                                            style="font-size: 20px;color: #666666;float: left"
                                        ></i>

                                        <span
                                            @click="reply(item.id, item.topic)"
                                            style="margin-left: 5px"
                                        >
                                            {{
                                                $t("message.ANNOUNCE.REPLY")
                                            }}</span
                                        >
                                    </div>
                                </div>
                                <div
                                    style="color: #0e38b1;text-decoration: underline"
                                    v-if="item.userCount"
                                >
                                    <el-popover
                                        trigger="hover"
                                        placement="top"
                                        v-if="item.userCount != 0"
                                    >
                                        <div>
                                            <span
                                                >{{ item.userCount }}
                                                <span
                                                    v-if="item.userCount == 1"
                                                    >{{
                                                        $t("message.user")
                                                    }}</span
                                                >
                                                <span
                                                    v-else-if="
                                                        item.userCount > 1
                                                    "
                                                    >{{
                                                        $t("message.users")
                                                    }}</span
                                                >
                                            </span>
                                        </div>
                                        <div
                                            class="section-list"
                                            slot="reference"
                                        >
                                            {{
                                                $t(
                                                    "message.ANNOUNCE.ALL_SECTIONS"
                                                )
                                            }}
                                        </div>
                                    </el-popover>
                                </div>
                                <div v-else-if="item.sectionList">
                                    <el-popover
                                        trigger="hover"
                                        placement="top"
                                        v-if="item.sectionList.length != 0"
                                    >
                                        <div
                                            v-for="(items,
                                            key,
                                            index) in item.sectionList"
                                        >
                                            <span
                                                >{{
                                                    items.sectionName
                                                }}&nbsp;&nbsp;{{
                                                    items.userCount
                                                }}
                                                <span
                                                    v-if="items.userCount == 1"
                                                    >{{
                                                        $t("message.user")
                                                    }}</span
                                                >
                                                <span
                                                    v-else-if="
                                                        items.userCount > 1
                                                    "
                                                    >{{
                                                        $t("message.users")
                                                    }}</span
                                                >
                                            </span>
                                        </div>

                                        <div
                                            class="section-list"
                                            slot="reference"
                                        >
                                            {{ item.sectionList.length }}
                                            <span
                                                v-if="
                                                    item.sectionList.length == 1
                                                "
                                                >{{
                                                    $t("message.People_section")
                                                }}</span
                                            >
                                            <span
                                                v-else-if="
                                                    item.sectionList.length > 1
                                                "
                                                >{{
                                                    $t("message.Sections")
                                                }}</span
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
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/

import defaultHead from "../../../../../static/images/touxiang1.png";
import { formatDate } from "@/utils/date";
export default {
    name: "studentAnnouncementCreateList",
    data() {
        return {
            isReadOptions: [
                { name: this.$t("message.ANNOUNCE.ALL"), isRead: 2 },
                { name: this.$t("message.ANNOUNCE.Unread"), isRead: 0 }
            ],
            courseId: this.$route.query.courseId,
            announceIds: [],
            defaultHead: defaultHead,
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
            announceListVO: [],
            courseId: this.$route.query.courseId,
            activeName: "first",
            form: {
                name: "",
                region: ""
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
            }
        };
    },
    mounted() {
        this.announceList();
    },
    methods: {
        async announceListSearch() {
            var params = {
                courseId: this.courseId,
                isRead: this.searchForm.isRead,
                topic: this.searchForm.name,
                studyGroupId: null
            };
            let result = await this.$getData("/announce/list", params, "get");
            if (result.data.code == 200) {
                this.announceListVO = result.data.entity;
            } else {
                this.$message.error(result.data.message);
            }
        },
        async announceList() {
            var paramsJson = {
                courseId: this.courseId,
                isRead: 2,
                studyGroupId: null
            };
            let result = await this.$getData(
                "/announce/list",
                paramsJson,
                "get"
            );
            if (result.data.code == 200) {
                this.announceListVO = result.data.entity;
                console.log(result.data.entity);
                if (this.announceListVO.length == 0) {
                    this.annnouncementStepOne = true;
                    this.annnouncementStepThree = false;
                } else {
                    this.annnouncementStepOne = false;
                    this.annnouncementStepThree = true;
                }
            } else {
                this.$message.error(result.data.message);
            }
        },
        addAnnoucement() {
            this.$router.push({
                path: "/homePage/allCourse/announcementAdmit",
                query: { courseId: this.$route.query.courseId }
            });
        },
        formatDate(time) {
            return formatDate(new Date(time), "yyyy-MM-dd hh:mm:ss");
        },
        getAbsolutePath(relativePath, width, height) {
            if (width == undefined && height == undefined) {
                return this.GlobalUrl + relativePath;
            } else {
                return (
                    this.GlobalUrl +
                    relativePath +
                    "?s=thumb&a=" +
                    width +
                    "x" +
                    height
                );
            }
        },
        gotolist() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = true;
        },
        reply(announceId, topic) {
            console.log(topic);
            var params = {
                courseId: this.courseId,
                announceId: announceId,
                name: topic
            };
            this.$router.push({
                path:
                    "/studentHomePage/studentAllCourse/studentAnnouncementDeatil",
                query: params
            });
        },
        onSubmit() {
            this.annnouncementStepOne = false;
            this.annnouncementStepTwo = false;
            this.annnouncementStepThree = true;
        },
        /*  switchComment(ids,allowComment){
        var params={
          ids:ids,
          allowComment:allowComment
        }
        this.$http.post(`${process.env.NODE_ENV}/announce/statusToggle/edit`, params)
          .then((res) => {
            if (res.data.code == 200) {
              this.announceList();
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      deleteAnnounce(announceIds){
        var params = announceIds;
        this.$http.post(`${process.env.NODE_ENV}/announce/deletes`, params)
          .then((res) => {
            if (res.data.code == 200) {
              this.announceList();
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      batchDeleteAnnounce(){
        let tempList = this.announceListVO;
        var announceIds = [];
        tempList.forEach(vo=>{
          if(vo.checked){
            announceIds.push(vo.id);
          }
        });
        if (announceIds.length>0){
          this.deleteAnnounce(announceIds);
        }
      },*/
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
.annnouncementStepOne {
    .disMain {
        margin-top: 25px;
        /*height: 650px;*/
        border: 1px solid #e7ebf7;
        padding-top: 16%;
        padding-bottom: 30%;

        .disMainImg {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .disMainImg img {
            width: 190px;
            height: 200px;
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .disMainImg p {
            /*font-size: 18px;*/
            /*color: gray;*/
            /*position: absolute;*/
            /*top: 57%;*/
            /*left: 50%;*/
            /*transform: translate(-50%, -50%);*/
            font-size: 18px;
            color: gray;
            position: absolute;
            margin-top: 15%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
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
            display: inline-block;
            font-size: 20px;
            font-weight: bold;
            /*margin-left: 61px*/
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 93%;
            height: 26px;
        }
        .announceListP2 {
            display: inline-block;
            /*margin-top: -22px;*/
            width: 90%;
            /*margin-left: 65px*/
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
                margin-left: 20px;
            }
            span:nth-of-type(2) {
                color: #6b7080;
                margin-left: 50px;
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
            height: 22px;
            float: left;
        }
        .unread {
            display: inline-block;
            background: #e6ebf7;
            border: 2px solid #0e38b1;
            border-radius: 1px 15px 15px 1px;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 11px;
            height: 22px;
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
