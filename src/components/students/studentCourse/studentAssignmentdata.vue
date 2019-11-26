<template>
    <div>
        <!--eslint-disable-->
        <div
            class="modulesrows"
            v-if="!dueassignmentGroup"
            style="text-align: center;"
        >
            <span>{{
                $t("message.ASSIGNMENT.There_is_not_any_assignment_right_now")
            }}</span>
        </div>
        <div v-if="dueassignmentGroup">
            <div class="modules-list">
                <div class="modules-group">
                    <div class="module-heard">
                        <h3
                            style="display: inline-block;cursor: pointer"
                            @click="collapseAssignmentGroup(listone)"
                        >
                            <i
                                v-show="listone.isOpen"
                                class="iconfont icon-sanjiao_xia"
                            />
                            <i
                                v-show="!listone.isOpen"
                                class="iconfont icon-sanjiaoyou"
                            />
                            {{ $t("message.ASSIGNMENT.overdue_Assignments") }}
                        </h3>
                        <div class="content">
                            <div
                                class="modules-row"
                                v-for="(dueassignmentGroupItem,
                                index) in dueassignmentGroup.overdue"
                                v-show="listone.isShow"
                                :key="index"
                            >
                                <i
                                    v-if="
                                        dueassignmentGroupItem.originType == 1
                                    "
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 2
                                    "
                                    class="iconfont icon-liaotian i_edit"
                                    height="20"
                                    width="20"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 3
                                    "
                                    class="iconfont icon--xiugaineirong i_edit"
                                    style="font-size: 22px;"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 4
                                    "
                                    class="iconfont icon-doctext"
                                />
                                <a
                                    style="cursor: pointer"
                                    class="shenglue"
                                    @click="
                                        goTo(
                                            dueassignmentGroup,
                                            dueassignmentGroupItem
                                        )
                                    "
                                    >{{ dueassignmentGroupItem.title }}</a
                                >
                                <div class="quizzes-time">
                                    <ul>
                                        <v-module
                                            :modules="
                                                dueassignmentGroupItem.modules
                                            "
                                        />
                                        <v-due-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <v-available-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <li
                                            v-if="
                                                dueassignmentGroupItem.score > 0
                                            "
                                        >
                                            {{
                                                dueassignmentGroupItem.score /
                                                    100
                                            }}
                                            {{ $t("message.pts") }}
                                        </li>
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modules-group">
                    <div class="module-heard">
                        <h3
                            style="display: inline-block;cursor: pointer"
                            @click="collapseAssignmentGroup(listtwo)"
                        >
                            <i
                                v-show="listtwo.isOpen"
                                class="iconfont icon-sanjiao_xia"
                            />
                            <i
                                v-show="!listtwo.isOpen"
                                class="iconfont icon-sanjiaoyou"
                            />
                            {{ $t("message.ASSIGNMENT.Upcoming_Assignments") }}
                        </h3>
                        <div class="content">
                            <div
                                class="modules-row"
                                v-for="(dueassignmentGroupItem,
                                index) in dueassignmentGroup.upcoming"
                                v-show="listtwo.isShow"
                                :key="index"
                            >
                                <i
                                    v-if="
                                        dueassignmentGroupItem.originType == 1
                                    "
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 2
                                    "
                                    class="iconfont icon-liaotian i_edit"
                                    height="20"
                                    width="20"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 3
                                    "
                                    class="iconfont icon--xiugaineirong i_edit"
                                    style="font-size: 22px;"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 4
                                    "
                                    class="iconfont icon-doctext"
                                />
                                <a
                                    style="cursor: pointer"
                                    class="shenglue"
                                    @click="
                                        goTo(
                                            dueassignmentGroup,
                                            dueassignmentGroupItem
                                        )
                                    "
                                    >{{ dueassignmentGroupItem.title }}</a
                                >
                                <div class="quizzes-time">
                                    <ul>
                                        <v-module
                                            :modules="
                                                dueassignmentGroupItem.modules
                                            "
                                        />
                                        <v-due-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <v-available-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <li
                                            v-if="
                                                dueassignmentGroupItem.score > 0
                                            "
                                        >
                                            {{
                                                dueassignmentGroupItem.score /
                                                    100
                                            }}
                                            {{ $t("message.pts") }}
                                        </li>
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modules-group">
                    <div class="module-heard">
                        <h3
                            style="display: inline-block;cursor: pointer"
                            @click="collapseAssignmentGroup(listthree)"
                        >
                            <i
                                v-show="listthree.isOpen"
                                class="iconfont icon-sanjiao_xia"
                            />
                            <i
                                v-show="!listthree.isOpen"
                                class="iconfont icon-sanjiaoyou"
                            />
                            {{ $t("message.ASSIGNMENT.Undated_Assignments") }}
                        </h3>
                        <div class="content">
                            <div
                                class="modules-row"
                                v-for="(dueassignmentGroupItem,
                                index) in dueassignmentGroup.undated"
                                v-show="listthree.isShow"
                                :key="index"
                            >
                                <i
                                    v-if="
                                        dueassignmentGroupItem.originType == 1
                                    "
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 2
                                    "
                                    class="iconfont icon-liaotian i_edit"
                                    height="20"
                                    width="20"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 3
                                    "
                                    class="iconfont icon--xiugaineirong i_edit"
                                    style="font-size: 22px;"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 4
                                    "
                                    class="iconfont icon-doctext"
                                />
                                <a
                                    style="cursor: pointer"
                                    class="shenglue"
                                    @click="
                                        goTo(
                                            dueassignmentGroup,
                                            dueassignmentGroupItem
                                        )
                                    "
                                    >{{ dueassignmentGroupItem.title }}</a
                                >
                                <div class="quizzes-time">
                                    <ul>
                                        <v-module
                                            :modules="
                                                dueassignmentGroupItem.modules
                                            "
                                        />
                                        <v-due-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <v-available-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <li
                                            v-if="
                                                dueassignmentGroupItem.score > 0
                                            "
                                        >
                                            {{
                                                dueassignmentGroupItem.score /
                                                    100
                                            }}
                                            {{ $t("message.pts") }}
                                        </li>
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modules-group">
                    <div class="module-heard">
                        <h3
                            style="display: inline-block;cursor: pointer"
                            @click="collapseAssignmentGroup(listfore)"
                        >
                            <i
                                v-show="listfore.isOpen"
                                class="iconfont icon-sanjiao_xia"
                            />
                            <i
                                v-show="!listfore.isOpen"
                                class="iconfont icon-sanjiaoyou"
                            />
                            {{ $t("message.ASSIGNMENT.Past_Assignments") }}
                        </h3>
                        <div class="content">
                            <div
                                class="modules-row"
                                v-for="(dueassignmentGroupItem,
                                index) in dueassignmentGroup.past"
                                v-show="listfore.isShow"
                                :key="index"
                            >
                                <i
                                    v-if="
                                        dueassignmentGroupItem.originType == 1
                                    "
                                    class="iconfont icon-icon-edit"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 2
                                    "
                                    class="iconfont icon-liaotian i_edit"
                                    height="20"
                                    width="20"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 3
                                    "
                                    class="iconfont icon--xiugaineirong i_edit"
                                    style="font-size: 22px;"
                                />
                                <i
                                    v-else-if="
                                        dueassignmentGroupItem.originType == 4
                                    "
                                    class="iconfont icon-doctext"
                                />
                                <a
                                    style="cursor: pointer"
                                    class="shenglue"
                                    @click="
                                        goTo(
                                            dueassignmentGroup,
                                            dueassignmentGroupItem
                                        )
                                    "
                                    >{{ dueassignmentGroupItem.title }}</a
                                >
                                <div class="quizzes-time">
                                    <ul>
                                        <v-module
                                            :modules="
                                                dueassignmentGroupItem.modules
                                            "
                                        />
                                        <v-due-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <v-available-time
                                            :assigns="
                                                dueassignmentGroupItem.assigns
                                            "
                                        />
                                        <li
                                            v-if="
                                                dueassignmentGroupItem.score > 0
                                            "
                                        >
                                            {{
                                                dueassignmentGroupItem.score /
                                                    100
                                            }}
                                            {{ $t("message.pts") }}
                                        </li>
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--eslint-disable no-new-->
    </div>
</template>
<script>
/*eslint-disable*/
import dueDraw from "@/utils/dueDraw.vue";
import availableDraw from "@/utils/availableDraw.vue";
import moduleDraw from "@/utils/moduleDraw.vue";

export default {
    directives: {
        trigger: {
            inserted(el) {
                el.click();
            }
        }
    },
    components: {
        "v-due-time": dueDraw,
        "v-available-time": availableDraw,
        "v-module": moduleDraw
    },
    data() {
        return {
            dueassignmentGroup: null,
            assignmentGroupDataList: [
                { itemlist: "overdue Assignments" },
                { itemlist: "past Assignments" },
                { itemlist: "undated Assignments" },
                { itemlist: "upcoming Assignments" }
            ],
            listone: { isShow: true, isOpen: true },
            listtwo: { isShow: true, isOpen: true },
            listthree: { isShow: true, isOpen: true },
            listfore: { isShow: true, isOpen: true },
            courseId: this.$route.query.courseId
        };
    },
    mounted() {
        this.getAssignDataList();
    },
    methods: {
        async getAssignDataList() {
            this.courseId = this.$route.query.courseId;
            const result = await this.$getData(
                `/assignmentGroupItemByDate/list?courseId=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                console.log(result.data.entity[0]);
                const foo = result.data.entity[0];
                this.dueassignmentGroup = foo;
                console.log(this.dueassignmentGroup);
                this.dueassignmentGroup.overdue.forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(v);
                });
                this.dueassignmentGroup.past.forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(v);
                });
                this.dueassignmentGroup.undated.forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(v);
                });
                this.dueassignmentGroup.upcoming.forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(v);
                });
                /* for (const key in this.dueassignmentGroup) {
                        this.dueassignmentGroup[key].forEach((v) => {
                            this.getAssignmentGroupItemAssignDataList(v);
                        });
                    } */
                /* this.dueassignmentGroup = result.data.entity[0].toString();
                    console.log(this.dueassignmentGroup);
                    this.dueassignmentGroup = this.dueassignmentGroup.split('');
                    console.log(this.dueassignmentGroup);
                    Object.keys(this.dueassignmentGroup).forEach((key) => {
                        if (
                            Object.prototype.hasOwnProperty.call(
                                this.dueassignmentGroup,
                                key,
                            )
                        ) {
                            console.log("sdkfhvd",this.dueassignmentGroup[key]);
                            this.dueassignmentGroup[key].forEach((v) => {
                                this.getAssignmentGroupItemAssignDataList(v);
                            });
                        }
                    }); */

                /* this.dueassignmentGroup.overdue.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });
                this.dueassignmentGroup.past.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });
                this.dueassignmentGroup.undated.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });
                this.dueassignmentGroup.upcoming.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                }); */
            } else {
                this.$message.error(result.data.message);
            }
        },
        async getAssignmentGroupItemAssignDataList(assignmentGroupItem) {
            const data = `${assignmentGroupItem.originType}_${assignmentGroupItem.originId}`;
            const result = await this.$getData(
                `/assignStudent/get?data=${data}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const assign = result.data.entity;
                const assigns = [];
                assigns.push(assign);
                this.$set(assignmentGroupItem, "assigns", assigns);
            } else {
                this.$message.error(result.data.message);
            }
        },
        // 去指定页面
        goTo(group, item) {
            //console.log(item, "dsjkfzhbjkdshbfj");
            const { courseId } = this;
            const targetId = item.originId;
            switch (item.originType) {
                case 1:
                    this.$router.push({
                        path: "studentAssignmentSubmit",
                        query: {
                            courseId: this.courseId,
                            assignmentId: targetId
                        }
                    });
                    break;
                case 2:
                    this.$router.push({
                        path:
                            "/studentHomePage/studentAllCourse/studentCourseDiscussionDetail",
                        query: {
                            discussionId: targetId,
                            courseId,
                            allowStudentEditDiscussion: 0
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        path: "/studentHomePage/studentAllCourse/quizzDetail",
                        query: { quizDetailId: targetId, courseId }
                    });
                    break;
                case 4:
                    this.$alert("文件预览");
                    break;
                default:
            }
        },
        /* collapseAssignmentGroup(itemone) {

              if (itemone.isShow) {//关闭或再次展开就不需要刷新了
                this.$set(itemone, 'isShow', !itemone.isShow);
                itemone.isOpen = !itemone.isOpen;
                return;
              }

             /!* if(assignmentGroup.assignmentGroupItems.length>0){
                this.$set(assignmentGroup, 'isShow', !assignmentGroup.isShow);
                assignmentGroup.isOpen = !assignmentGroup.isOpen;
                return;
              }*!/
             /!* this.$http.get(`${process.env.NODE_ENV}/assignmentGroupItem/list?assignmentGroupId=` + assignmentGroup.id)
                .then((res) => {
                  if (res.data.code == 200) {
                    itemone.isOpen = !itemone.isOpen;
                    let assignmentGroupItems = res.data.entity;
                    this.$set(assignmentGroup, 'isShow', !assignmentGroup.isShow);
                    this.$set(assignmentGroup, 'assignmentGroupItems', assignmentGroupItems);
                    //查询分配记录
                    assignmentGroup.assignmentGroupItems.forEach(v => {
                      this.getAssignmentGroupItemAssignDataList(assignmentGroup, v)
                    })
                  } else {
                    this.$message.error(res.data.message);
                  }
                }).catch((err) => {
                console.log(err);
              })*!/
              this.courseId = this.$route.query.courseId;
              let result = this.$getData("/assignmentGroupItemByDate/list?courseId=" + this.courseId, null, "get");
              if (result.data.code == 200) {
                itemone.isOpen = !itemone.isOpen;
                this.$set(itemone, 'isShow', !itemone.isShow);
                console.log(result.data.entity[0]);
                this.dueassignmentGroup = result.data.entity[0];
                for(let key  in this.dueassignmentGroup){
                  console.log(key + '---' + this.dueassignmentGroup[key])
                  this.dueassignmentGroup[key].forEach(v => {
                    this.getAssignmentGroupItemAssignDataList(v)
                  });
                }
                /!*this.dueassignmentGroup.overdue.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });
                this.dueassignmentGroup.past.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });
                this.dueassignmentGroup.undated.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });
                this.dueassignmentGroup.upcoming.forEach(v => {
                  this.getAssignmentGroupItemAssignDataList(v)
                });*!/
              } else {
                this.$message.error(result.data.message);
              }

            } */
        collapseAssignmentGroup(listtab) {
            const baz = listtab;
            baz.isOpen = !baz.isOpen;
            baz.isShow = !baz.isShow;
            /* this.getAssignDataList(); */
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped>
.className {
    width: 90%;
    display: inline-block;
}

.el-button el-button--info {
    width: 50%;
}

.el-button-group .el-button--primary:last-child {
    width: 50%;
}

.elradio-select .el-radio {
    width: 70%;
    margin: 2% 0;
}

.studentRequirements .el-radio {
    width: 70%;
    margin: 2% 0;
}

.bottomHint {
    color: red;
    display: inline-block;
    width: 70%;
    margin-top: 6%;
}

.module {
    float: right;
    margin-bottom: 2%;
}

.el-icon-error {
    color: #999999;
    cursor: pointer;
    font-size: 16px;
}

.modules-list {
    border: 1px solid #ccc;
    clear: both;
    margin-left: 2%;
}

.modules-group {
    border-bottom: 1px dashed #a5afb5;
    padding: 2%;
}

.module-heard {
    border-bottom: none;
    margin-bottom: 2%;
    position: relative;
}

.modules-row {
    position: relative;
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    /*border-radius: 3px;*/
    color: #394b58;
    border: 1px solid #c7cdd1;
    border-top: none;
}

.modules-row i {
    color: #666666;
}

.content {
    border-top: 1px solid #c7cdd1;
    border-radius: 3px;
}

.modules-success {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    color: green;
    display: inline-block;
    position: absolute;
    left: 83%;
}

.modules-successList {
    line-height: 34px;
    padding-left: 1%;
    font-size: 24px;
    color: green;
    display: inline-block;
    position: absolute;
    left: 88%;
    top: 24%;
}

.modules-outline {
    line-height: 34px;
    padding-left: 1%;
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 88%;
    cursor: pointer;
}

.modules-menu {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 94%;
    cursor: pointer;
}

.modules-menuList {
    line-height: 34px;
    padding-left: 1%;
    /*padding-right: 1%;*/
    color: #999999;
    font-size: 34px;
    display: inline-block;
    position: absolute;
    left: 94%;
    top: 20%;
}

h6 {
    width: 50%;
    padding-left: 140px;
    color: #999999;
}

.moduleSpread {
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    padding: 8px 0;
    border-color: #c7cdd1;
    text-align: left;
    z-index: 9999;
    left: 76%;
    top: 40%;
}

.triangle {
    position: absolute;
    top: -10%;
    z-index: 9999;
    left: 66%;
}

.moduleSpread ul li {
    width: 180px;
    margin-top: 8px;
}

.el-dropdown-menu {
    width: 16%;
}

img {
    vertical-align: middle;
    padding-right: 1%;
}

.quizzes-time {
    padding-left: 3%;
}

.quizzes-time ul li {
    display: inline-block;
    padding: 0 1%;
}

.drag {
    cursor: move;
}

i {
    font-size: 20px !important;
}

.modules-menu i:hover {
    color: #0138b1;
}

.shenglue {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
    display: inline-block;
}

.className_select {
    text-align: right;
}

.modules-list {
    margin-top: 20px;
}

.modulesrows {
    position: relative;
    /*padding: 2%;*/
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    /*border-radius: 3px;*/
    color: #394b58;
    /*border: 1px solid #c7cdd1;*/
    border: 1px solid #c7cdd1;
    margin-top: 20px;
}
</style>
