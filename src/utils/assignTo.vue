<template>
    <div>
        <el-form-item
            v-for="(assign, index) in assignList"
            :key="index"
            :label="$t('message.Assign')"
        >
            <div class="multiple-assign">
                <div class="addto">
                    <p>
                        {{ $t("message.Assign_to")
                        }}<!--v-if="assignList.length - 1 == index && index != 0"-->
                        <i
                            v-if="assignList.length - 1 == index && index != 0"
                            class="el-icon-error"
                            style="float: right;cursor: pointer;"
                            @click.prevent="removeAssignForm(index)"
                        />
                    </p>
                    <el-select
                        v-model="assign.defaultSelect"
                        :multiple="true"
                        placeholder=""
                        style="width: 100%"
                        @change="selectAssignChange"
                        @remove-tag="removeAssignTag"
                    >
                        <el-option-group
                            v-for="sectionUser in sectionUserList"
                            :key="sectionUser.id"
                            :label="sectionUser.label"
                        >
                            <el-option
                                v-for="item in sectionUser.options"
                                v-show="!item.isSelected"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id + '_' + item.type + '_' + index"
                            />
                        </el-option-group>
                    </el-select>
                    <p>{{ $t("message.ASSIGNMENT.due") }}</p>
                    <el-date-picker
                        v-model="assign.limitTime"
                        type="datetime"
                        value-format="timestamp"
                        :picker-options="pickerOptions"
                        :placeholder="$t('message.Common_please_select')"
                        style="width: 100%"
                    />
                    <p>{{ $t("message.ASSIGNMENT.available") }}</p>
                    <el-date-picker
                        v-model="value[index]"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        value-format="timestamp"
                        :start-placeholder="
                            $t('message.ASSIGNMENT.availableFrom')
                        "
                        :end-placeholder="
                            $t('message.ASSIGNMENT.availableUntil')
                        "
                        style="width: 100%"
                        @change="changeTime(value[index], index)"
                    />
                    <!--<div class="available-until">-->
                    <!--<p>{{$t('message.ASSIGNMENT.availableFrom')}}</p>-->
                    <!--<el-date-picker-->
                    <!--v-model="assign.startTime"-->
                    <!--type="datetime"-->
                    <!--value-format="timestamp"-->
                    <!--:picker-options="startOptions"-->
                    <!--:placeholder="$t('message.Common_please_select')" style="width: 100%">-->
                    <!--</el-date-picker>-->
                    <!--</div>-->
                    <!--<div class="available-until">-->
                    <!--<p>{{$t('message.ASSIGNMENT.availableUntil')}}</p>-->
                    <!--<el-date-picker-->
                    <!--v-model="assign.endTime"-->
                    <!--type="datetime"-->
                    <!--value-format="timestamp"-->
                    <!--:picker-options="endOptions"-->
                    <!--:placeholder="$t('message.Common_please_select')" style="width: 100%">-->
                    <!--</el-date-picker>-->
                    <!--</div>-->
                </div>
                <div class="assign-add">
                    <el-button
                        icon="el-icon-circle-plus-outline"
                        @click="addAssignForm"
                    >
                        {{ $t("message.Add") }}
                    </el-button>
                </div>
            </div>
        </el-form-item>
    </div>
</template>

<script>
/* eslint-disable */
import { debuglog } from "util";

export default {
    // name: 'assignTo',
    props: ["assignList", "courseId"],
    data() {
        return {
            value: [],
            startTime: "",
            endTime: "",
            sectionUserList: [],
            /* eslint-disable */
            pickerOptions: {
                disabledDate: time => {
                    if (this.startTime && this.endTime) {
                        return (
                            time.getTime() < this.startTime ||
                            time.getTime() > this.endTime
                        );
                    }
                    if (this.startTime) {
                        return time.getTime() < this.startTime;
                    }
                    if (this.endTime) {
                        return time.getTime() > this.endTime;
                    }
                }
            }
            /* eslint-disable no-new */
        };
    },
    computed: {
        everyOneText() {
            return this.assignList.some(assign =>
                assign.defaultSelect.some(value => {
                    const type = value.split("_")[1];
                    return Number(type) === 2 || Number(type) === 3;
                })
            )
                ? this.$t("message.Everyone_Else")
                : this.$t("message.Everyone");
        }
    },
    watch: {
        everyOneText(value) {
            if (this.sectionUserList[0]) {
                this.sectionUserList[0].label = value;
                this.sectionUserList[0].options[0].name = value;
            }
        },
        assignList: {
            handler(assignList) {
                const selectedAssignIds = assignList.map(assign =>
                    assign.defaultSelect.map(selected => selected.split("_")[0])
                );
                this.selectedAssignIds = Array.prototype.concat.apply(
                    [],
                    selectedAssignIds
                );
                this.setSelectedItem();
                this.initTime();
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        this.assignDataList();
        this.courseTime();
        this.initTime();
    },
    methods: {
        initTime() {
            this.assignList.forEach((v, i) => {
                this.value[i] = [];
                this.value[i][0] =
                    typeof v.startTime === "number" ? v.startTime : undefined;
                this.value[i][1] =
                    typeof v.startTime === "number" ? v.endTime : undefined;
            });
        },
        changeTime(val, index) {
            if (val) {
                this.assignList[index].startTime = val[0];
                this.assignList[index].endTime = val[1];
            } else {
                this.assignList[index].startTime = null;
                this.assignList[index].endTime = null;
            }
        },
        async courseTime() {
            const result = await this.$getData(
                `/course/date/query?courseId=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                const data = result.data.entity;
                if (data.startTime) {
                    this.startTime = data.startTime;
                }
                if (data.endTime) {
                    this.endTime = data.endTime;
                }
            }
        },

        async assignDataList() {
            const result = await this.$getData(
                `/assign/get?data=${this.courseId}`,
                null,
                "get"
            );
            if (Number(result.data.code) === 200) {
                // 刷新子项
                const data = result.data.entity;
                const arr = [];
                arr.push({
                    type: 1,
                    label: this.everyOneText,
                    options: [
                        {
                            id: "",
                            name: this.everyOneText,
                            type: 1
                        }
                    ]
                });
                if (data.sections.length > 0) {
                    data.sections.forEach(v => {
                        v.isSelected = false;
                    });
                    arr.push({
                        type: 2,
                        label: this.$t("message.Sections"),
                        options: data.sections
                    });
                }
                if (data.users.length > 0) {
                    data.users.forEach(v => {
                        v.isSelected = false;
                    });
                    arr.push({
                        type: 3,
                        label: this.$t("message.Students"),
                        options: data.users
                    });
                }
                this.sectionUserList = arr;
                this.setSelectedItem();
            } else {
                this.$message.error(result.data.message);
            }
        },

        setSelectedItem() {
            this.sectionUserList.forEach(section => {
                section.options.forEach(option => {
                    option.isSelected =
                        this.selectedAssignIds.findIndex(
                            id => String(id) === String(option.id)
                        ) > -1;
                });
            });
        },
        selectAssignChange(arr) {
            arr.forEach(v => {
                this.setVal(v, true);
            });
            // id_type_index
            this.$emit("sendToSelect", arr);
        },
        removeAssignTag(v) {
            this.setVal(v, false);
        },
        setVal(v, b) {
            const data = v.split("_"); // id type
            const id = data[0];
            const type = data[1];
            switch (type) {
                case "1": {
                    this.$set(
                        this.sectionUserList[0].options[0],
                        "isSelected",
                        b
                    );
                    break;
                }
                case "2": {
                    // 如果是班级
                    const sections = this.sectionUserList[1].options;
                    for (let i = 0; i < sections.length; i += 1) {
                        if (Number(sections[i].id) === id) {
                            this.$set(sections[i], "isSelected", b);
                        }
                    }
                    break;
                }
                case "3": {
                    // 如果是用户
                    const users = this.sectionUserList[2].options;
                    for (let i = 0; i < users.length; i += 1) {
                        if (Number(users[i].id) === id) {
                            this.$set(users[i], "isSelected", b);
                        }
                    }
                    break;
                }
                default:
            }
        },
        // 删除分配列表
        removeAssignForm(index) {
            const { assignList } = this;
            for (let k = 0; k < assignList.length; k += 1) {
                const select = assignList[k].defaultSelect;
                for (let i = 0; i < select.length; i += 1) {
                    this.removeAssignTag(select[i]);
                }
            }
            this.$emit("removeAssignForm", index);
        },
        // 增加分配列表
        addAssignForm() {
            this.$emit("addAssignForm");
        }
    }
};
/* eslint-disable */
</script>

<style scoped>
.assign-addto {
    border-top: 1px dashed #ccc;
}

/*.assign-add {*/
/*padding-left: 90%;*/
/*padding-bottom: 2%;*/
/*}*/

.available-until {
    display: inline-block;
    width: 48%;
    margin-left: 1%;
}

.assign-style {
    padding: 2%;
    margin-bottom: 2%;
}

/*----------quizzes-select------------*/

.quizzes-install {
    color: #606266;
    margin: 0 2%;
}

/*multiple-attempts多次尝试*/
.multiple-attempts {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 82%;
    padding: 2%;
    margin-bottom: 2%;
    word-break: break-all;
    word-wrap: break-word;
}

.multiple-assign {
    /*border: 1px solid #ccc;*/
    /*border-radius: 4px;*/
    width: 86%;
    word-break: break-all;
    word-wrap: break-word;
}

.addto {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2% 2% 4% 2%;
}

.multiple-attempts .attempts-keep {
    padding: 2%;
}

.attempt-third {
    padding-left: 4%;
}

.quizzes-student {
    color: rgb(153, 153, 153);
    display: inline-block;
    width: 80%;
    word-wrap: break-word;
    line-height: 20px;
}

.assign-addto {
    border-top: 1px dashed #ccc;
}

.assign-style {
    padding: 2%;
    margin-bottom: 2%;
}

.assign-add {
    /*padding-left: 78%;*/
    /*padding-bottom: 2%;*/
    float: right;
    margin-top: 2%;
}
</style>
