<template>
    <div>
        <!-- <div class="popStyle" ref='popDiv' v-show = "isPop">
      <p> {{popTime}} </p>
      <p> {{popTitle}}</p>
      <div class='popCalendar'> Calendar: {{popCalendarName}} </div>
    </div> -->
        <div class="calender-contain">
            <div class="calender-contain-left">
                <!-- @event-mouseover = "eventMouseover"
          @event-mouseout = "eventMouseout" -->
                <div class="schedule-table">
                    <full-calendar
                        ref="calendar"
                        v-loading="eventLoading"
                        :events="events"
                        :config="config"
                        :header="headerConfig"
                        @event-selected="eventClick"
                        @day-click="dayClick"
                        @view-render="viewRender"
                    />
                </div>
            </div>
            <div class="calender-contain-right">
                <div style="padding: 0 5px">
                    <date-picker
                        v-model="value1"
                        :language="language"
                        :class="{
                            picker: !event_date.range,
                            'picker-range': event_date.range
                        }"
                        @input="updateEventDate"
                    />
                </div>
                <div class="calender-cours-box">
                    <h1 class="calender-cours-box-title">
                        {{ $t("message.calendars") }}
                    </h1>
                    <div
                        style="paddig-right: 10px;max-height: 200px;overflow-y:scroll"
                    >
                        <ul class="calender-cours-list">
                            <li
                                v-for="(item, index) in courseList"
                                :key="index"
                            >
                                <div class="canler-list-left">
                                    <a
                                        :style="{
                                            background: item.isCheck
                                                ? item.coverColor
                                                : '#e6e7e9'
                                        }"
                                        @click="getCanlender(item, index)"
                                    />
                                    &nbsp;&nbsp;
                                    <span> {{ item.title }}</span>
                                </div>
                                <div class="color-box">
                                    <el-color-picker
                                        v-model="item.coverColor"
                                        :popper-class="popColor"
                                        style="vertical-align: middle"
                                        @change="changeColor(item, index)"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="calender-cours-box">
                    <!-- <h1 class="calender-cours-box-title">
            <a> {{$t('message.undated')}}</a>
          </h1> -->
                    <div>
                        <h2 class="calendar-infinite" @click="changeUpdate">
                            <i
                                class="iconfont icon-sanjiaoyou arrow-icon"
                                :style="styleIcon"
                            />
                            <span>{{ $t("message.undated") }}</span>
                        </h2>
                        <div class="update-box">
                            <ul
                                v-show="updateOpen"
                                v-loading="updateLoading"
                                class="update-list"
                            >
                                <div v-if="infiniteList.length > 0">
                                    <li
                                        v-for="(item, index) in infiniteList"
                                        :key="index"
                                    >
                                        <a @click="infiniteToDetail(item)">
                                            <span
                                                class="color-square"
                                                :style="{
                                                    background: item.textColor
                                                }"
                                            />
                                            <em
                                                :style="{
                                                    color: item.textColor
                                                }"
                                            >
                                                {{ item.title }}
                                            </em>
                                        </a>
                                    </li>
                                </div>
                                <div v-else>
                                    <p>
                                        {{ $t("message.Temporarily_no_data") }}
                                    </p>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--start: 创建对话框-->
            <el-dialog
                :title="$t('message.create_new_event')"
                :visible.sync="createDialog"
                width="520px"
                @close="closeCreateDailog"
            >
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="$t('message.event')" name="first">
                        <el-form
                            ref="eventForm"
                            :model="eventForm"
                            :rules="eventFormRules"
                        >
                            <el-form-item
                                :label="$t('message.Title')"
                                :label-width="formLabelWidth"
                                prop="title"
                            >
                                <el-input
                                    v-model="eventForm.title"
                                    autocomplete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.datea')"
                                :label-width="formLabelWidth"
                                prop="date"
                            >
                                <el-date-picker
                                    v-model="eventForm.date"
                                    style="width: 100%"
                                    type="date"
                                    :placeholder="$t('message.unlock_at')"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.available_from')"
                                :label-width="formLabelWidth"
                                prop="eventTimeVal"
                            >
                                <el-time-picker
                                    v-model="eventForm.eventTimeVal"
                                    style="width: 100%"
                                    :clearable="false"
                                    :disabled="!eventForm.date"
                                    format="HH:mm"
                                    is-range
                                    arrow-control
                                    :range-separator="$t('message.untila')"
                                    :start-placeholder="
                                        $t('message.start_time')
                                    "
                                    :end-placeholder="$t('message.end_time')"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.location')"
                                :label-width="formLabelWidth"
                                prop="location"
                            >
                                <el-input
                                    v-model="eventForm.location"
                                    autocomplete="off"
                                    minlength="0"
                                    maxlength="100"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.calendar')"
                                :label-width="formLabelWidth"
                                prop="calendarVal"
                            >
                                <el-select
                                    v-model="eventForm.calendarVal"
                                    style="width: 100%"
                                    :placeholder="
                                        $t('message.select_area_text')
                                    "
                                    @change="selectEventCalendar"
                                >
                                    <el-option
                                        v-for="(item, index) in checkedItemList"
                                        :key="index"
                                        :label="item.title"
                                        :value="
                                            item.id + '_' + item.calendarType
                                        "
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                style="padding-left: 120px; text-align:center"
                            >
                                <el-button @click="toNewCalendar('eventForm')">
                                    {{ $t("message.more_options") }}
                                </el-button>
                                <el-button
                                    type="primary"
                                    @click="toCreateCalendar('eventForm')"
                                >
                                    {{ $t("message.submit") }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane
                        :label="$t('message.assignment')"
                        name="second"
                    >
                        <!-- 创建作业 -->
                        <el-form
                            ref="assginForm"
                            :model="assginForm"
                            :rules="assginFormRules"
                        >
                            <el-form-item
                                :label="$t('message.Title')"
                                :label-width="formLabelWidth"
                                prop="title"
                            >
                                <el-input
                                    v-model="assginForm.title"
                                    autocomplete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.calendar')"
                                :label-width="formLabelWidth"
                                prop="courseId"
                            >
                                <el-select
                                    v-model="assginForm.courseId"
                                    style="width: 100%"
                                    :placeholder="
                                        $t('message.select_area_text')
                                    "
                                    @change="selectAssignCalendar"
                                >
                                    <el-option
                                        v-for="(item,
                                        index) in checkedAssignItemList"
                                        :key="index"
                                        :label="item.title"
                                        :value="item.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.Due')"
                                :label-width="formLabelWidth"
                                prop="assign"
                            >
                                <el-date-picker
                                    v-model="assginForm.assign.limitTime"
                                    style="width: 100%"
                                    :picker-options="pickerOptions"
                                    type="datetime"
                                    :placeholder="$t('message.Due')"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.group')"
                                :label-width="formLabelWidth"
                                prop="assignmentGroupId"
                            >
                                <el-select
                                    v-model="assginForm.assignmentGroupId"
                                    style="width: 100%"
                                    :placeholder="
                                        $t('message.select_area_text')
                                    "
                                >
                                    <el-option
                                        v-for="(item,
                                        index) in assginForm.assignGroup"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.publish')"
                                :label-width="formLabelWidth"
                                prop="status"
                            >
                                <el-switch v-model="assginForm.status" />
                            </el-form-item>
                            <el-form-item
                                style="padding-left: 120px; text-align:center"
                            >
                                <el-button @click="toMoreAssign('assginForm')">
                                    {{ $t("message.more_options") }}
                                </el-button>
                                <el-button
                                    type="primary"
                                    @click="createAssign('assginForm')"
                                >
                                    {{ $t("message.submit") }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('message.my_to_do')" name="third">
                        <el-form
                            ref="todoForm"
                            :model="todoForm"
                            :rules="todoFormRules"
                        >
                            <el-form-item
                                :label="$t('message.Title')"
                                :label-width="formLabelWidth"
                                prop="title"
                            >
                                <el-input
                                    v-model="todoForm.title"
                                    autocomplete="off"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.datea')"
                                :label-width="formLabelWidth"
                                prop="date"
                            >
                                <el-date-picker
                                    v-model="todoForm.date"
                                    style="width: 100%"
                                    type="datetime"
                                    :placeholder="$t('message.unlock_at')"
                                />
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.calendar')"
                                :label-width="formLabelWidth"
                                prop="calendarVal"
                            >
                                <el-select
                                    v-model="todoForm.calendarVal"
                                    style="width: 100%"
                                    :placeholder="
                                        $t('message.select_area_text')
                                    "
                                    @change="selectTodoCalendar"
                                >
                                    <el-option
                                        v-for="(item,
                                        index) in checkedTodoItemList"
                                        :key="index"
                                        :label="item.title"
                                        :value="
                                            item.id + '_' + item.calendarType
                                        "
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                :label="$t('message.Details')"
                                :label-width="formLabelWidth"
                                prop="content"
                            >
                                <el-input
                                    v-model="todoForm.content"
                                    type="textarea"
                                    :rows="2"
                                    :placeholder="
                                        $t('message.pls_enter_content')
                                    "
                                />
                            </el-form-item>
                            <el-form-item
                                style="padding-left: 120px; text-align:center"
                            >
                                <!-- <el-button > {{$t('message.more_options')}} </el-button> -->
                                <el-button
                                    type="primary"
                                    @click="createTodo('todoForm')"
                                >
                                    {{ $t("message.submit") }}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
            <!--end: 创建对话框-->
            <!--start: 点击事件对话框-->
            <el-dialog :visible.sync="eventDetail" width="400px">
                <span slot="title" class="el-dialog__title">
                    <a style="cursor:pointer" @click="goEventDetail">
                        Event：{{ eventDetailData.title }}
                    </a>
                </span>
                <p>{{ eventDetailDate }}</p>
                <p>
                    {{ $t("message.calendar") }}:
                    <em>
                        {{
                            eventDetailData.courseName
                                ? eventDetailData.courseName
                                : eventDetailData.userName
                        }}</em
                    >
                </p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="eventDelete = true">
                        {{ $t("message.Delete") }}
                    </el-button>
                    <el-button
                        type="primary"
                        @click="
                            eventDetail = false;
                            editEventVisible = true;
                        "
                    >
                        {{ $t("message.Edit") }}
                    </el-button>
                </span>
            </el-dialog>
            <!--end: 点击事件对话框-->
            <!--start: 删除事件-->
            <el-dialog
                :title="$t('message.confirm_delection')"
                :visible.sync="eventDelete"
                width="400px"
                @close="
                    eventDelete = false;
                    eventDetail = false;
                "
            >
                <p>{{ $t("message.sure_to_delete") }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        @click="
                            eventDelete = false;
                            eventDetail = false;
                        "
                    >
                        {{ $t("message.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="delEvent">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
            <!--end: 删除事件-->
            <!--start: 编辑事件对话框-->
            <el-dialog
                :title="$t('message.edit_event')"
                :visible.sync="editEventVisible"
                width="520px"
            >
                <el-form
                    ref="editEventForm"
                    :model="editEventForm"
                    :rules="editEventFormRules"
                >
                    <el-form-item
                        :label="$t('message.Title')"
                        :label-width="formLabelWidth"
                        prop="title"
                    >
                        <el-input
                            v-model="editEventForm.title"
                            autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.datea')"
                        :label-width="formLabelWidth"
                    >
                        <el-date-picker
                            v-model="editEventData"
                            type="date"
                            style="width: 100%"
                            :placeholder="$t('message.unlock_at')"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.available_from')"
                        :label-width="formLabelWidth"
                    >
                        <el-time-picker
                            v-model="editEventTimeVal"
                            style="width: 100%"
                            :clearable="false"
                            :disabled="!editEventForm.date"
                            format="HH:mm"
                            is-range
                            arrow-control
                            :range-separator="$t('message.untila')"
                            :start-placeholder="$t('message.start_time')"
                            :end-placeholder="$t('message.end_time')"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.location')"
                        :label-width="formLabelWidth"
                        prop="location"
                    >
                        <el-input
                            v-model="editEventForm.location"
                            autocomplete="off"
                            minlength="0"
                            maxlength="100"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.calendar')"
                        :label-width="formLabelWidth"
                        class="eventCalendar"
                    >
                        <el-select
                            v-model="editEventCalendarVal"
                            style="width: 100%"
                            :placeholder="$t('message.select_area_text')"
                        >
                            <el-option
                                v-for="(item, index) in checkedItemList"
                                :key="index"
                                :label="item.title"
                                :value="item.id + '_' + item.calendarType"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        style="padding-left: 120px; text-align:center"
                    >
                        <el-button @click="toMoreCalendar('editEventForm')">
                            {{ $t("message.more_options") }}
                        </el-button>
                        <el-button
                            type="primary"
                            @click="toEditCalendar('editEventForm')"
                        >
                            {{ $t("message.submit") }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--end: 编辑事件对话框-->
            <!--start: 点击作业对话框-->
            <el-dialog
                :title="$t('message.assignment')"
                :visible.sync="assigmentDetail"
                width="400px"
            >
                <span slot="title" class="el-dialog__title">
                    <a style="cursor:pointer" @click="toAssign">
                        {{ $t("message.assignment") }}:
                        {{ assignDetailData.title }}
                    </a>
                </span>
                <p>{{ assigntDetailDate }}</p>
                <p>
                    {{ $t("message.calendar") }}:
                    <em> {{ assignCanlendarName }} </em>
                </p>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="assignDelete=true">{{$t('message.Delete')}}</el-button> -->
                    <el-button type="primary" @click="toAssign">{{
                        $t("message.Edit")
                    }}</el-button>
                    <!-- toAssign -->
                </span>
            </el-dialog>
            <!--end: 点击作业对话框-->
            <!--start: 删除作业对话框-->
            <el-dialog
                :title="$t('message.confirm_delection')"
                :visible.sync="assignDelete"
                width="400px"
            >
                <p>{{ $t("message.sure_del_assignment") }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        @click="
                            assigmentDetail = false;
                            assignDelete = false;
                        "
                        >{{ $t("message.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="delAssign">
                        {{ $t("message.Delete") }}
                    </el-button>
                </span>
            </el-dialog>
            <!--end: 删除作业对话框-->
            <!--start: 点击待办对话框-->
            <el-dialog
                :title="$t('message.to_do')"
                :visible.sync="todoDetail"
                width="400px"
            >
                <span slot="title" class="el-dialog__title">
                    <a style="cursor:pointer">
                        {{ $t("message.CALENDAR.Todo") }}:
                        {{ todoDetailData.title }}
                    </a>
                    <!-- @click='goTodoDetail'  -->
                </span>
                <p>{{ todoDetailDate }}</p>
                <p>
                    {{ $t("message.calendar") }}:
                    <em> {{ todoDetailData.userName }} </em>
                </p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="todoDelete = true">{{
                        $t("message.Delete")
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="
                            todoDetail = false;
                            editTodoVisible = true;
                        "
                        >{{ $t("message.Edit") }}</el-button
                    >
                </span>
            </el-dialog>
            <!--end: 点击待办对话框-->
            <!--start: 删除待办对话框-->
            <el-dialog
                :title="$t('message.confirm_delection')"
                :visible.sync="todoDelete"
                width="400px"
            >
                <p>{{ $t("message.CALENDAR.Sure_del_todo") }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="todoDelete = false">
                        {{ $t("message.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="delTodo">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
            <!--end: 删除对话框对话框-->
            <!--start:编辑待办对话框-->
            <el-dialog
                :title="$t('message.edit_todo')"
                :visible.sync="editTodoVisible"
                width="520px"
            >
                <el-form
                    ref="editTodoForm"
                    :model="editTodoForm"
                    :rules="editTodoFormRules"
                >
                    <el-form-item
                        :label="$t('message.Title')"
                        :label-width="formLabelWidth"
                        prop="title"
                    >
                        <el-input
                            v-model="editTodoForm.title"
                            autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.datea')"
                        :label-width="formLabelWidth"
                        prop="date"
                    >
                        <el-date-picker
                            v-model="editTodoForm.date"
                            type="datetime"
                            style="width: 100%"
                            :placeholder="$t('message.CALENDAR.Unlock_at')"
                            @change="changeTodoTime"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.calendar')"
                        :label-width="formLabelWidth"
                        prop="calendarVal"
                    >
                        <el-select
                            v-model="editTodoCalendarVal"
                            style="width: 100%"
                            :placeholder="$t('message.select_area_text')"
                        >
                            <el-option
                                v-for="(item, index) in checkedTodoItemList"
                                :key="index"
                                :label="item.title"
                                :value="item.id + '_' + item.calendarType"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        :label="$t('message.Details')"
                        :label-width="formLabelWidth"
                        prop="content"
                    >
                        <el-input
                            v-model="editTodoForm.content"
                            type="textarea"
                            :rows="2"
                            :placeholder="$t('message.pls_enter_content')"
                        />
                    </el-form-item>
                    <el-form-item style="padding-left: 120px; text-align:right">
                        <el-button
                            type="primary"
                            @click="toEditTodo('editTodoForm')"
                        >
                            {{ $t("message.submit") }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--end:编辑待办对话框-->
            <!-- start: 点击讨论弹出对话框 -->
            <el-dialog :visible.sync="discussDetail" width="400px">
                <span slot="title" class="el-dialog__title">
                    <a style="cursor:pointer" @click="toDiscuss">
                        {{ $t("message.CALENDAR.Discuss") }}:
                        {{ discussDetailData.title }}
                    </a>
                </span>
                <p>{{ discussDetailDate }}</p>
                <p>
                    {{ $t("message.calendar") }}:
                    <em> {{ discussDetailData.courseName }} </em>
                </p>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="discussDelete=true">{{$t('message.Delete')}}</el-button> -->
                    <el-button type="primary" @click="toDiscuss">{{
                        $t("message.Edit")
                    }}</el-button>
                </span>
            </el-dialog>
            <!-- end: 点击讨论弹出对话框 -->
            <!-- start: 删除讨论对话框 -->
            <el-dialog
                :title="$t('message.confirm_delection')"
                :visible.sync="discussDelete"
                width="400px"
            >
                <p>{{ $t("message.CALENDAR.Sure_del_discuss") }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        @click="
                            discussDelete = false;
                            discussDetail = false;
                        "
                    >
                        {{ $t("message.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="delDiscuss">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
            <!-- end: 删除讨论对话框 -->
            <!-- start: 点击测验弹出对话框 -->
            <el-dialog :visible.sync="quizeDetail" width="400px">
                <span slot="title" class="el-dialog__title">
                    <a style="cursor:pointer" @click="toQuize">
                        Quiz: {{ quizeDetailData.title }}
                    </a>
                </span>
                <p>{{ quizeDetailDate }}</p>
                <p>
                    {{ $t("message.calendar") }}:
                    <em> {{ quizeDetailData.courseName }} </em>
                </p>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="quizeDelete=true">{{$t('message.Delete')}}</el-button> -->
                    <el-button type="primary" @click="toQuize">{{
                        $t("message.Edit")
                    }}</el-button>
                </span>
            </el-dialog>
            <!-- end: 点击测验弹出对话框 -->
            <!-- start: 删除测验对话框 -->
            <el-dialog
                :title="$t('message.confirm_delection')"
                :visible.sync="quizeDelete"
                width="400px"
            >
                <p>{{ $t("message.CALENDAR.Sure_del_quiz") }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        @click="
                            quizeDetail = false;
                            quizeDelete = false;
                        "
                    >
                        {{ $t("message.Cancel") }}</el-button
                    >
                    <el-button type="primary" @click="delQuize">{{
                        $t("message.Delete")
                    }}</el-button>
                </span>
            </el-dialog>
            <!-- end: 删除测验对话框 -->
            <!--start: calendFeed对话框-->
            <el-dialog
                :title="$t('message.calendar_feed')"
                :visible.sync="calendFeed"
                width="520px"
            >
                <p class="feed-text">
                    {{ $t("message.calendar_feed_intro") }}
                </p>
                <el-input
                    v-model="feedInput"
                    :placeholder="$t('message.pls_enter_content')"
                    class="feed-input"
                />
                <a class="feed-down">{{ $t("message.download_feed") }} </a>
            </el-dialog>
            <!--end: calendFeed对话框-->
        </div>
    </div>
</template>
<script>
import { FullCalendar } from "vue-full-calendar";
import datePicker from "@/utils/datePicker.vue";
import utilMethods from "@/utils/utilMethods";
/* eslint-disable */
export default {
    components: {
        datePicker,
        FullCalendar
    },
    data() {
        return {
            color1: "#409EFF",
            popColor: "popColor",
            isPop: false,
            popTime: "",
            popTitle: "",
            popCalendarName: "",
            changeInfinte: false,
            styleIcon: "",
            value4: [
                new Date(2000, 10, 10, 10, 10),
                new Date(2000, 10, 11, 10, 10)
            ],
            createEventTitle: "",
            value1: "",
            language: "en",
            event_date: {
                date: "",
                range: false
            },
            courseList: [],
            createDialog: false,
            activeName: "first",
            formLabelWidth: "120px",
            // 事件数据
            eventForm: {
                title: "",
                date: "",
                eventTimeVal: [
                    new Date(),
                    new Date(new Date().getTime() + 1000 * 60 * 60)
                ],
                location: "",
                calendarVal: "",
                calendarValObj: null,
                startTime: "",
                endTime: ""
            },
            eventFormRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.len_bettwen_1_100"),
                        trigger: "blur"
                    }
                ],
                calendarVal: [
                    {
                        required: true,
                        message: this.$t("message.select_calendar_type"),
                        trigger: "blur"
                    }
                ]
            },
            editEventForm: {
                title: "",
                date: "",
                eventTimeVal: [
                    new Date(),
                    new Date(new Date().getTime() + 1000 * 60 * 60)
                ],
                location: "",
                calendarVal: "",
                calendarValObj: null,
                startTime: "",
                endTime: ""
            },
            editEventFormRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.len_bettwen_1_100"),
                        trigger: "blur"
                    }
                ],
                calendarVal: [
                    {
                        required: true,
                        message: this.$t("message.select_calendar_type"),
                        trigger: "blur"
                    }
                ]
            },
            eventDetail: false,
            eventDetailData: {},
            eventDelete: false,
            eventId: "",
            editEventVisible: false,
            editEventData: "",
            editEventTimeVal: [],
            editEventCalendarVal: "",
            eventDetailDate: "",
            // 待办数据
            editTodoCalendarVal: "",
            checkedTodoItemList: [],
            todoForm: {
                title: "",
                date: "",
                calendarVal: "",
                content: "",
                calendarValObj: null,
                doTime: ""
            },
            todoFormRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 200,
                        message: this.$t("message.length_bettween_20"),
                        trigger: "blur"
                    }
                ],
                calendarVal: [
                    {
                        required: true,
                        message: this.$t("message.select_calendar_type"),
                        trigger: "blur"
                    }
                ],
                date: [
                    {
                        required: true,
                        message: "Date is required",
                        trigger: "blur"
                    }
                ]
            },
            editTodoForm: {
                title: "",
                date: "",
                calendarVal: "",
                content: "",
                calendarValObj: null,
                doTime: ""
            },
            editTodoFormRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t("message.len_bettwen_1_100"),
                        trigger: "blur"
                    }
                ],
                calendarVal: [
                    {
                        required: true,
                        message: this.$t("message.select_calendar_type"),
                        trigger: "blur"
                    }
                ],
                date: [
                    {
                        required: true,
                        message: "Date is required.",
                        trigger: "blur"
                    }
                ]
            },
            todoDetail: false,
            editTodoVisible: false,
            todoDetailData: {},
            todoId: "",
            todoDelete: false,
            editTodoDate: "",
            todoDetailDate: "",
            // 作业数据
            assignStartOption: "",
            assignEndOption: "",
            pickerOptions: {
                disabledDate: time => {
                    if (this.assignStartOption && this.assignEndOption) {
                        return (
                            time.getTime() < this.assignStartOption ||
                            time.getTime() > this.assignEndOption
                        );
                    }
                    if (this.assignStartOption) {
                        return time.getTime() < this.assignStartOption;
                    }
                    if (this.assignEndOption) {
                        return time.getTime() > this.assignEndOption;
                    } else {
                        return false;
                    }
                }
            }, // 创建作业时设置禁止的时间段
            assignDetailData: {},
            assginForm: {
                title: "",
                due: "",
                courseId: "",
                calendarValObj: null,
                assignmentGroupId: "",
                status: 1,
                assign: {
                    assignType: 1,
                    limitTime: ""
                },
                assignGroup: [],
                score: 0
            },
            assginFormRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: this.$t("message.len_bettwen_1_50"),
                        trigger: "blur"
                    }
                ],
                courseId: [
                    {
                        required: true,
                        message: this.$t("message.select_calendar_type"),
                        trigger: "blur"
                    }
                ],
                assignmentGroupId: [
                    {
                        required: true,
                        message: this.$t("message.CALENDAR.groupId_required"),
                        trigger: "blur"
                    }
                ]
            },
            editAssignForm: {
                title: "",
                due: "",
                courseId: "",
                calendarValObj: null,
                assignmentGroupId: "",
                status: 1,
                assign: {
                    assignType: 1,
                    limitTime: ""
                },
                dueTime: "",
                assignGroup: [],
                score: 0
            },
            editAssignGroupId: "",
            editAssignGroup: [],
            editAssignFormRules: {
                title: [
                    {
                        required: true,
                        message: this.$t("message.enter_active_name"),
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: this.$t("message.len_bettwen_1_50"),
                        trigger: "blur"
                    }
                ],
                courseId: [
                    {
                        required: true,
                        message: this.$t("message.select_calendar_type"),
                        trigger: "blur"
                    }
                ],
                assignmentGroupId: [
                    {
                        required: true,
                        message: this.$t("message.CALENDAR.groupId_required"),
                        trigger: "blur"
                    }
                ]
            },
            editAssginVisible: false,
            assigmentDetail: false,
            assignDelete: false,
            assignCanlendarName: "",
            assigntDetailDate: "",
            // 讨论
            discussDetailData: {},
            discussDetailDate: "",
            discussDetail: false,
            discussDelete: false,
            // 测验
            quizeDetailData: {},
            quizeDetailDate: "",
            quizeDetail: false,
            quizeDelete: false,
            calendFeed: false,
            feedInput: "",
            events: [],
            headerConfig: {
                left: "today, prev, next",
                center: "title",
                right: "agendaWeek,month,listWeek,createEventBtn"
            },
            config: {
                // themeSystem: 'iconfont',
                // locale: 'zn-ch',
                allDaySlot: false,
                slotEventOverlap: false,
                editable: false,
                locale: "en",
                buttonText: {
                    today: this.$t("message.CALENDAR.Today"),
                    agendaWeek: this.$t("message.CALENDAR.Week"),
                    month: this.$t("message.CALENDAR.Month"),
                    listWeek: this.$t("message.CALENDAR.Agenda")
                },
                customButtons: {
                    createEventBtn: {
                        // themeSystem: 'iconfont',
                        // text: 'Create New Event',
                        icon: "el-icon-circle-plus-outline",
                        click: () => {
                            this.createDialog = true;
                        }
                    }
                }
            },
            startTime: utilMethods.get_firstDaySecond_ofMonth(),
            endTime: Number(
                new Date()
                    .getTime()
                    .toString()
                    .substr(0, 10)
            ),
            contextCodes: "", // 日历项目
            checkedItemList: [],
            checkedAssignItemList: [],
            itemColorObj: {},
            updateOpen: false,
            infiniteEventList: [],
            infiniteAssignList: [],
            infiniteDiscussList: [],
            innfiniteTodoList: [],
            infiniteQuizeList: [],
            infiniteList: [],
            updateLoading: false,
            eventLoading: false
        };
    },
    computed: {
        colorMap() {
            const map = {};
            this.courseList.forEach(item => {
                if (item.isCheck) {
                    const key = `${item.calendarType}_${item.id}`;
                    map[key] = item;
                }
            });
            return map;
        }
    },
    watch: {
        value1(newVal) {
            this.value1 = newVal;
        },
        contextCodes() {
            // 获取事件选中的日历类型列表
            const tempList = [];
            this.courseList.map(val => {
                if (val.isCheck && Number(val.calendarType) !== 3) {
                    tempList.push(val);
                }
            });
            this.checkedItemList = tempList;
            // 获取作业选中的日历类型列表
            const tempCourseList = [];
            this.courseList.map(item => {
                if (Number(item.calendarType) === 2 && item.isCheck) {
                    tempCourseList.push(item);
                }
            });

            this.checkedAssignItemList = tempCourseList;

            // 获取待办的选中的日历类型列表
            const tempTodoList = [];
            this.courseList.map(item => {
                if (Number(item.calendarType) === 1 && item.isCheck) {
                    tempTodoList.push(item);
                }
            });
            this.checkedTodoItemList = tempTodoList;
        },
        editEventData(val) {
            this.editEventForm.date = val;
        },
        editEventTimeVal(arr) {
            this.editEventForm.eventTimeVal = arr;
        },
        editEventCalendarVal(val) {
            this.editEventForm.calendarVal = val;
            this.selectEditEventCalendar(val);
        },
        editTodoCalendarVal(val) {
            this.editTodoForm.calendarVal = val;
            this.selectEditTodoCalendar(val);
        },
        // editTodoDate(val){
        //   this.editTodoForm.date = val
        // },
        editAssignGroup(val) {
            this.editAssignForm.assignGroup = val;
        },
        editAssignGroupId(val) {
            this.editAssignForm.assignmentGroupId = val;
        }
    },
    created() {
        // 获取项目列表
        // console.log('created1111')
        this.getItemList().then(() => this.getAllList());
    },
    mounted() {
        // this.getLan()
    },
    methods: {
        changeTodoTime(time) {
            // console.log('changeTodoTime', time)
        },
        // 清空创建表单数据
        clearFormData() {
            this.$refs.eventForm.resetFields();
            this.eventForm.calendarValObj = null;
            this.$refs.assginForm.resetFields();
            this.assginForm.assign.limitTime = "";
            this.$refs.todoForm.resetFields();
            this.todoForm.calendarValObj = null;
        },
        async getAllList() {
            if (this.contextCodes.length > 0) {
                this.eventLoading = true;
                const eventList = await this.getEventList();
                const todoList = await this.getTodoList();
                const assignList = await this.getAssignList();
                const discussList = await this.getDiscussList();
                const quizeList = await this.getQuizeList();
                const anotherEvents = [];
                this.events = anotherEvents
                    .concat(eventList)
                    .concat(todoList)
                    .concat(assignList)
                    .concat(discussList)
                    .concat(quizeList);
                this.eventLoading = false;
            } else {
                this.eventLoading = true;
                this.events = [];
                this.eventLoading = false;
            }
        },
        // 事件
        selectEventCalendar(item) {
            const tempList = item.split("_");
            const tempId = tempList[0];
            const tempCalendarType = tempList[1];
            const tempObj = this.checkedItemList.find(val => {
                return (
                    Number(val.id) == Number(tempId) &&
                    val.calendarType.toString() == tempCalendarType.toString()
                );
            });
            this.eventForm.calendarValObj = Object.assign({}, tempObj);
        },
        selectEditEventCalendar(item) {
            const tempList = item.split("_");
            const tempId = tempList[0];
            const tempCalendarType = tempList[1];
            const tempObj = this.checkedItemList.find(val => {
                Number(val.id) === Number(tempId) &&
                    val.calendarType.toString() === tempCalendarType.toString();
            });
            this.editEventForm.calendarValObj = Object.assign({}, tempObj);
        },
        // getLan(){
        //   let tempInitLan;
        //   if(this.curLanguage == 'en'){
        //     tempInitLan = 'en'
        //   }else if(this.curLanguage == 'zh'){
        //     tempInitLan = 'zh-cn'
        //   }
        //   this.language = tempInitLan;
        //   this.$refs.calendar.fireMethod('option', 'locale',tempInitLan)
        // },
        async viewRender(view) {
            const tempType = view.type;
            const tempMoment = this.$refs.calendar
                .fireMethod("getDate")
                .format();
            const tempDate = new Date(tempMoment);
            const tempYear = tempDate.getFullYear();
            let tempMonth = tempDate.getMonth() + 1;
            tempMonth = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
            let tempDay = tempDate.getDate();
            tempDay = tempDay < 10 ? `0${tempDay}` : tempDay;
            const tempValue1 = `${tempYear}-${tempMonth}-${tempDay}`;
            this.value1 = tempValue1;
            if (tempType === "month") {
                const tempStartTime = utilMethods.get_particu_monthSecond(
                    tempYear,
                    tempMonth,
                    1
                );
                const tempEndMonth = Number(tempMonth) + 1;
                const tempEndTime = utilMethods.get_particu_monthSecond(
                    tempYear,
                    tempEndMonth,
                    0
                );
                this.startTime = tempStartTime;
                this.endTime = tempEndTime;
            } else {
                const viewStartDate = new Date(view.start);
                const tempViewSartYear = viewStartDate.getFullYear();
                const tempViewStartMonth = viewStartDate.getMonth() + 1;
                const tempViewStartDay = viewStartDate.getDate();
                const tempViewStartTime = utilMethods.get_particu_monthSecond(
                    tempViewSartYear,
                    tempViewStartMonth,
                    tempViewStartDay
                );
                const viewEndDate = new Date(view.end);
                const tempViewEndYear = viewEndDate.getFullYear();
                const tempViewEndMonth = viewEndDate.getMonth() + 1;
                const tempViewEndDay = viewEndDate.getDate();
                const tempViewEndTime = utilMethods.get_particu_monthSecond(
                    tempViewEndYear,
                    tempViewEndMonth,
                    tempViewEndDay
                );
                this.startTime = tempViewStartTime;
                this.endTime = tempViewEndTime;
            }
            this.getAllList();
        },
        dayClick() {
            this.createDialog = true;
        },
        eventClick(calEvent) {
            const eventType = calEvent.type;
            if (eventType === "event") {
                this.eventDetail = true;
                this.eventDetailData = calEvent;
                this.eventId = this.eventDetailData.id;
                this.eventDetailDate = utilMethods.formDetialDate(
                    this.eventDetailData.startTime
                );
                this.initEventEditData();
            } else if (eventType === "assignment") {
                this.assigmentDetail = true;
                this.assignDetailData = calEvent;
                const tempId = this.assignDetailData.courseId;
                const tempCanlerObj = this.checkedAssignItemList.find(
                    val => Number(val.id) === Number(tempId)
                );
                this.assignCanlendarName = tempCanlerObj.title;
                this.assigntDetailDate = utilMethods.formDetialDate(
                    this.assignDetailData.dueTime
                );
                this.editAssignForm = this.assignDetailData;
                this.editAssignGroup = this.editAssignForm.assignGroup;
                this.editAssignGroupId = this.editAssignForm.assignmentGroupId;
                this.selectEditAssignCalendar(this.editAssignForm.courseId);
            } else if (eventType === "todo") {
                this.todoDetail = true;
                this.todoDetailData = calEvent;
                this.todoId = this.todoDetailData.id;
                this.todoDetailDate = utilMethods.formDetialDate(
                    this.todoDetailData.doTime
                );
                this.initTodoData();
            } else if (eventType === "discuss") {
                // 讨论
                this.discussDetailData = calEvent;
                // console.log('discuss', this.discussDetailData)
                this.discussDetailDate = utilMethods.formDetialDate(
                    this.discussDetailData.dueTime
                );
                const tempKey = `2_${this.discussDetailData.courseId}`;
                this.discussDetailData.courseName = this.colorMap[
                    tempKey
                ].title;
                this.discussDetail = true;
            } else if (eventType === "quize") {
                // 测验
                this.quizeDetailData = calEvent;
                // console.log('quize', this.quizeDetailData)
                this.quizeDetailDate = utilMethods.formDetialDate(
                    this.quizeDetailData.dueTime
                );
                const tempKey = `2_${this.quizeDetailData.courseId}`;
                this.quizeDetailData.courseName = this.colorMap[tempKey].title;
                this.quizeDetail = true;
            }
        },
        // 鼠标移入显示信息
        eventMouseover(calEvent) {
            setTimeout(() => {
                let scrollTop = 0;
                if (
                    document.documentElement &&
                    document.documentElement.scrollTop
                ) {
                    scrollTop = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                if (calEvent.type === "event") {
                    this.popTime = utilMethods.formDetialDate(
                        calEvent.startTime
                    );
                } else if (
                    calEvent.type === "assignment" ||
                    calEvent.type === "quize"
                ) {
                    this.popTime = utilMethods.formDetialDate(calEvent.dueTime);
                } else {
                    this.popTime = utilMethods.formDetialDate(calEvent.doTime);
                }
                this.popTitle = calEvent.title;
                this.popCalendarName = calEvent.courseName
                    ? calEvent.courseName
                    : calEvent.userName;
                this.$refs.popDiv.style.left = `${jsEvent.pageX - scrollTop}px`;
                this.$refs.popDiv.style.top = `${jsEvent.pageY - scrollTop}px`;
                this.isPop = true;
            }, 500);
        },
        // 鼠标移出信息消失
        eventMouseout() {
            this.isPop = false;
        },

        initTodoData() {
            this.editTodoForm = Object.assign({}, this.todoDetailData);
            const tempType = this.editTodoForm.calendarType;
            let tempIdName = "";
            if (Number(tempType) === 2) {
                this.editTodoForm.calendarVal = `${this.editTodoForm.courseId}_${this.editTodoForm.calendarType}`;
                tempIdName = "courseId";
            } else if (Number(tempType) === 1) {
                this.editTodoForm.calendarVal = `${this.editTodoForm.userId}_${this.editTodoForm.calendarType}`;
                tempIdName = "userId";
            }
            this.editTodoCalendarVal = this.editTodoForm.calendarVal;
            const tempObj = this.checkedTodoItemList.find(
                val =>
                    val.id.toString() ===
                        this.editTodoForm[tempIdName].toString() &&
                    val.calendarType.toString() ===
                        this.editTodoForm.calendarType.toString()
            );
            this.editTodoForm.calendarValObj = Object.assign({}, tempObj);
            // console.log('editTodoForm', this.editTodoFo new Date(this.editTodoForm.doTime)rm)
            this.$set(
                this.editTodoForm,
                "date",
                new Date(this.editTodoForm.doTime)
            );
            // this.editTodoForm.date = new Date(this.editTodoForm.doTime);
            // this.editTodoDate = this.editTodoForm.date
        },
        initEventEditData() {
            this.editEventForm = Object.assign({}, this.eventDetailData);
            if (this.editEventForm.startTime) {
                this.editEventForm.eventTimeVal = [
                    new Date(this.editEventForm.startTime),
                    new Date(this.editEventForm.endTime)
                ];
                this.editEventForm.date = new Date(
                    this.editEventForm.startTime
                );
                this.editEventData = this.editEventForm.date;
                this.editEventTimeVal = this.editEventForm.eventTimeVal;
            } else {
                this.editEventForm.eventTimeVal = [
                    new Date(),
                    new Date(new Date().getTime() + 1000 * 60 * 30)
                ];
                this.editEventForm.date = "";
                this.editEventData = "";
                this.editEventTimeVal = this.editEventForm.eventTimeVal;
            }
            const tempType = this.editEventForm.calendarType;
            let tempIdName = "";
            if (Number(tempType) === 2) {
                this.editEventForm.calendarVal = `${this.editEventForm.courseId}_${this.editEventForm.calendarType}`;
                tempIdName = "courseId";
            } else if (Number(tempType) === 3) {
                this.editEventForm.calendarVal = `${this.editEventForm.studyGroupId}_${this.editEventForm.calendarType}`;
                tempIdName = "studyGroupId";
            } else if (Number(tempType) === 1) {
                this.editEventForm.calendarVal = `${this.editEventForm.userId}_${this.editEventForm.calendarType}`;
                tempIdName = "userId";
            }
            this.editEventCalendarVal = this.editEventForm.calendarVal;
            const tempObj = this.checkedItemList.find(
                val =>
                    val.id.toString() ===
                        this.editEventForm[tempIdName].toString() &&
                    val.calendarType.toString() ===
                        this.editEventForm.calendarType.toString()
            );
            this.editEventForm.calendarValObj = Object.assign({}, tempObj);
        },
        // 关闭弹窗
        closeCreateDailog() {
            this.clearFormData();
        },
        initTime(formName) {
            let startTime;
            let endTime;
            if (this[formName].date) {
                const tempYear = this[formName].date.getFullYear();
                const tempMonth = this[formName].date.getMonth();
                const tempDay = this[formName].date.getDate();
                const tempStartHours = this[
                    formName
                ].eventTimeVal[0].getHours();
                const tempStartMinutes = this[
                    formName
                ].eventTimeVal[0].getMinutes();
                const tempEndHours = this[formName].eventTimeVal[1].getHours();
                const tempEndMinutes = this[
                    formName
                ].eventTimeVal[1].getMinutes();
                const tempStartDate = new Date(
                    tempYear,
                    tempMonth,
                    tempDay,
                    tempStartHours,
                    tempStartMinutes
                );
                startTime = Number(tempStartDate.getTime());
                const tempEndDate = new Date(
                    tempYear,
                    tempMonth,
                    tempDay,
                    tempEndHours,
                    tempEndMinutes
                );
                endTime = Number(tempEndDate.getTime());
            } else {
                startTime = "";
                endTime = "";
            }
            return {
                startTime,
                endTime
            };
        },
        // 创建新事件
        async toCreateCalendar(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const tempCalendarType = this.eventForm.calendarValObj
                        .calendarType;
                    let tempIdObj;
                    const tempIdName =
                        Number(tempCalendarType) === 2
                            ? "courseId"
                            : Number(tempCalendarType) === 3
                            ? "studyGroupId"
                            : "noName";
                    if (tempIdName !== "noName") {
                        const str = `{${tempIdName}:${this.eventForm.calendarValObj.id}}`;
                        tempIdObj = eval(`(${str})`);
                    } else {
                        tempIdObj = {};
                    }
                    this.eventForm.startTime = this.initTime(
                        "eventForm"
                    ).startTime;
                    this.eventForm.endTime = this.initTime("eventForm").endTime;
                    let params = {
                        calendarType: this.eventForm.calendarValObj
                            .calendarType,
                        title: this.eventForm.title,
                        location: this.eventForm.location,
                        isDuplicate: 0,
                        startTime: this.eventForm.startTime,
                        endTime: this.eventForm.endTime
                    };
                    params = Object.assign(params, tempIdObj);
                    const result = await this.$getData(
                        "/calendarEvent/add",
                        params,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.createDialog = false;
                        this.$message({
                            message: this.$t("message.add_event_success"),
                            type: "success"
                        });
                        this.$refs.eventForm.resetFields();
                        this.eventForm.calendarValObj = null;
                        this.closeUpdate();
                        this.getAllList();
                    }
                } else {
                    return false;
                }
            });
        },
        // 创建事件的更多选项
        toNewCalendar(formName) {
            // 日期日期日期
            this.$refs[formName].validate(async valid => {
                const tempCalendarType = this.eventForm.calendarValObj
                    .calendarType;
                let tempIdObj;
                const tempIdName =
                    Number(tempCalendarType) === 2
                        ? "courseId"
                        : Number(tempCalendarType) === 3
                        ? "studyGroupId"
                        : "noName";
                if (tempIdName !== "noName") {
                    const str = `{${tempIdName}:${this.eventForm.calendarValObj.id}}`;
                    tempIdObj = eval(`(${str})`);
                } else {
                    tempIdObj = {};
                }
                this.eventForm.startTime = this.initTime("eventForm").startTime;
                this.eventForm.endTime = this.initTime("eventForm").endTime;
                const curCalendarTitle = this.eventForm.calendarValObj.title;
                const params = {
                    calendarType: this.eventForm.calendarValObj.calendarType,
                    title: this.eventForm.title,
                    location: this.eventForm.location,
                    isDuplicate: 0,
                    startTime: this.eventForm.startTime,
                    endTime: this.eventForm.endTime,
                    eventTimeVal: this.eventForm.eventTimeVal
                };
                Object.assign(params, tempIdObj);
                if (valid) {
                    localStorage.setItem(
                        "createEventObj",
                        JSON.stringify(params)
                    );
                    this.$router.push({
                        path: "calanederEvent",
                        query: { type: "create", title: curCalendarTitle }
                    });
                    this.createDialog = false;
                } else {
                    return false;
                }
            });
        },
        // 编辑事件
        async toEditCalendar(formName) {
            this.$refs[formName].validate(async valid => {
                const tempCalendarType = this.editEventForm.calendarValObj
                    .calendarType;
                let tempIdObj;
                const tempIdName =
                    Number(tempCalendarType) === 2
                        ? "courseId"
                        : Number(tempCalendarType) === 3
                        ? "studyGroupId"
                        : "noName";
                if (tempIdName !== "noName") {
                    const str = `{${tempIdName}:${this.editEventForm.calendarValObj.id}}`;
                    tempIdObj = eval(`(${str})`);
                } else {
                    tempIdObj = {};
                }
                this.editEventForm.startTime = this.initTime(
                    "editEventForm"
                ).startTime;
                this.editEventForm.endTime = this.initTime(
                    "editEventForm"
                ).endTime;
                let params = {
                    id: this.editEventForm.id,
                    calendarType: this.editEventForm.calendarValObj
                        .calendarType,
                    title: this.editEventForm.title,
                    location: this.editEventForm.location,
                    startTime: this.editEventForm.startTime,
                    endTime: this.editEventForm.endTime
                };
                params = Object.assign(params, tempIdObj);
                const result = await this.$getData(
                    "/calendarEvent/modify",
                    params,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.createDialog = false;
                    this.$message({
                        message: this.$t("message.edit_event_success"),
                        type: "success"
                    });
                    this.$refs[formName].resetFields();
                    this.editEventForm.calendarValObj = null;
                    this.editEventVisible = false;
                    this.closeUpdate();
                    this.getAllList();
                }
            });
        },
        // 编辑事件的更多选项
        toMoreCalendar(formName) {
            this.$refs[formName].validate(async valid => {
                const tempCalendarType = this.editEventForm.calendarValObj
                    .calendarType;
                let tempIdObj;
                const tempIdName =
                    Number(tempCalendarType) === 2
                        ? "courseId"
                        : Number(tempCalendarType) === 3
                        ? "studyGroupId"
                        : "noName";
                if (tempIdName !== "noName") {
                    const str = `{${tempIdName}:${this.editEventForm.calendarValObj.id}}`;
                    tempIdObj = eval(`(${str})`);
                } else {
                    tempIdObj = {};
                }
                this.editEventForm.startTime = this.initTime(
                    "editEventForm"
                ).startTime;
                this.editEventForm.endTime = this.initTime(
                    "editEventForm"
                ).endTime;
                const curCalendarTitle = this.editEventForm.calendarValObj
                    .title;
                let params = {
                    id: this.editEventForm.id,
                    calendarType: this.editEventForm.calendarValObj
                        .calendarType,
                    title: this.editEventForm.title,
                    location: this.editEventForm.location,
                    startTime: this.editEventForm.startTime,
                    endTime: this.editEventForm.endTime,
                    eventTimeVal: this.editEventForm.eventTimeVal,
                    address: this.editEventForm.address,
                    description: this.eventDetailData.description
                };
                params = Object.assign(params, tempIdObj);
                if (valid) {
                    localStorage.setItem(
                        "editEventObj",
                        JSON.stringify(params)
                    );
                    this.$router.push({
                        path: "calanederEvent",
                        query: { type: "edit", title: curCalendarTitle }
                    });
                    this.editEventVisible = false;
                } else {
                    return false;
                }
            });
        },
        // 删除事件
        async delEvent() {
            const tempId = [];
            tempId.push(this.eventId);
            const result = await this.$getData(
                "/calendarEvent/deletes",
                tempId,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.eventDetail = false;
                this.eventDelete = false;
                this.$message({
                    message: this.$t("message.del_event"),
                    type: "success"
                });
                this.closeUpdate();
                this.getAllList();
            }
        },
        updateEventDate(val) {
            this.$refs.calendar.fireMethod("gotoDate", val);
        },
        // 删除待办
        async delTodo() {
            const tempId = [];
            tempId.push(this.todoId);
            const result = await this.$getData(
                "/calendarTodo/deletes",
                tempId,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.todoDelete = false;
                this.todoDetail = false;
                this.$message({
                    message: this.$t("message.del_todo_success"),
                    type: "success"
                });
                this.closeUpdate();
                this.getAllList();
            }
        },
        selectTodoCalendar(item) {
            const tempList = item.split("_");
            const tempId = tempList[0];
            const tempCalendarType = tempList[1];
            const tempObj = this.checkedTodoItemList.find(
                val =>
                    Number(val.id) === Number(tempId) &&
                    val.calendarType.toString() === tempCalendarType.toString()
            );
            this.todoForm.calendarValObj = Object.assign({}, tempObj);
        },
        selectEditTodoCalendar(item) {
            const tempList = item.split("_");
            const tempId = tempList[0];
            const tempCalendarType = tempList[1];
            const tempObj = this.checkedTodoItemList.find(
                val =>
                    Number(val.id) === Number(tempId) &&
                    val.calendarType.toString() === tempCalendarType.toString()
            );
            this.editTodoForm.calendarValObj = Object.assign({}, tempObj);
        },
        // 创建新待办
        createTodo(formName) {
            this.$refs[formName].validate(async valid => {
                const tempCalendarType = this.todoForm.calendarValObj
                    .calendarType;
                let tempIdObj;
                if (tempCalendarType == 2) {
                    tempIdObj = { courseId: this.todoForm.calendarValObj.id };
                } else {
                    tempIdObj = {};
                }
                const doTime = Number(new Date(this.todoForm.date.getTime()));
                const params = {
                    calendarType: this.todoForm.calendarValObj.calendarType,
                    title: this.todoForm.title,
                    content: this.todoForm.content,
                    doTime
                };
                Object.assign(params, tempIdObj);
                const result = await this.$getData(
                    "/calendarTodo/add",
                    params,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.createDialog = false;
                    this.$message({
                        message: this.$t("message.add_todo_success"),
                        type: "success"
                    });
                    this.$refs[formName].resetFields();
                    this.todoForm.calendarValObj = null;
                    this.closeUpdate();
                    this.getAllList();
                }
            });
        },
        // 编辑待办
        async toEditTodo(formName) {
            this.$refs[formName].validate(async valid => {
                const doTime = Number(
                    new Date(this.editTodoForm.date.getTime())
                );
                const params = {
                    id: this.todoId,
                    calendarType: 1,
                    courseId: this.editTodoForm.calendarValObj.id,
                    title: this.editTodoForm.title,
                    content: this.editTodoForm.content,
                    doTime
                };
                const result = await this.$getData(
                    "/calendarTodo/modify",
                    params,
                    "post"
                );
                if (Number(result.data.code) === 200) {
                    this.$message({
                        message: this.$t("message.edit_todo_success"),
                        type: "success"
                    });
                    this.$refs[formName].resetFields();
                    this.editTodoForm.calendarValObj = null;
                    this.editTodoVisible = false;
                    this.closeUpdate();
                    this.getAllList();
                }
            });
        },
        // 获取项目列表
        async getItemList() {
            const result = await this.$getData("/calendarItem/list", "get");
            if (Number(result.data.code) === 200) {
                this.courseList = result.data.entity;
                // console.log('获取项目列表', this.courseList)
                for (let i = 0; i < this.courseList.length; i += 1) {
                    if (!this.courseList[i].coverColor) {
                        this.$set(this.courseList[i], "coverColor", "#4168D7");
                        // this.courseList[i].coverColor = '#0e38b1'
                    }
                }

                const tempCheckList = [];
                const tempCourseList = utilMethods.deepClone(this.courseList);
                // console.log('tempCourseList', tempCourseList)
                const tempColorObj = {};
                Object.keys(tempCourseList).map((key, item) => {
                    let tempType = "";
                    if (tempCourseList[key].isCheck) {
                        tempType = `${tempCourseList[key].calendarType}_${tempCourseList[key].id}`;
                        tempColorObj[tempType] = tempCourseList[key];
                        tempCheckList.push(tempType);
                    }
                });

                this.itemColorObj = tempColorObj;
                this.contextCodes = tempCheckList.join(",");
            }
        },
        // 改变列表选中状态
        async getCanlender(item, index) {
            this.$set(
                this.courseList[index],
                "isCheck",
                !this.courseList[index].isCheck
            );

            const parmaList = [];
            this.courseList.map((val, index) => {
                let tempType = "";
                if (val.isCheck) {
                    tempType = `${val.calendarType}_${val.id}`;
                    parmaList.push(tempType);
                }
            });

            const result = await this.$getData(
                "/calendarItemCheck/add",
                parmaList,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.contextCodes = parmaList.join(",");
                // console.log('选中状态', this.contextCodes)
                this.getAllList();
            }
        },
        // 日历项目前景色修改
        async changeColor(item, index) {
            const params = {
                calendarType: item.calendarType,
                id: item.id,
                coverColor: item.coverColor
            };
            const result = await this.$getData(
                "/calendarItem/modify",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.$set(
                    this.courseList[index],
                    "coverColor",
                    item.coverColor
                );
                // console.log('aaclist', this.courseList)
                const tempCourseList = Object.assign({}, this.courseList);
                const tempColorObj = {};
                Object.keys(tempCourseList).map((key, item) => {
                    let tempType = "";
                    if (tempCourseList[key].isCheck) {
                        tempType = `${tempCourseList[key].calendarType}_${tempCourseList[key].id}`;
                        tempColorObj[tempType] = tempCourseList[key];
                    }
                });
                this.itemColorObj = tempColorObj;
            }
            this.events.forEach(val => this.setEventColor(val));
        },

        generateKey(value, type) {
            type = type || value.type;
            if (value.type === "event") {
                return `${value.calendarType}_${
                    Number(value.calendarType) === 1
                        ? value.userId
                        : value.courseId
                }`;
            }
            if (value.type === "todo") {
                if (value.userId) {
                    return `${value.calendarType}_${value.userId}`;
                }
            } else {
                return `2_${value.courseId}`;
            }
        },
        setEventColor(item, type) {
            const colorKey = this.generateKey(item, type);
            item.color = "#fff";
            if (typeof colorKey !== "undefined") {
                item.borderColor = this.colorMap[colorKey].coverColor
                    ? this.colorMap[colorKey].coverColor
                    : "#4168D7";
                item.textColor = item.borderColor;
            } else {
                item.textColor = "#4168D7";
                item.borderColor = "#4168D7";
            }
        },

        // 获取事件列表
        async getEventList() {
            const params = {
                startDate: this.startTime,
                endDate: this.endTime,
                contextCodes: this.contextCodes
            };
            const result = await this.$getData(
                "/calendarEvent/list",
                params,
                "get"
            );
            let tempEventList = [];
            if (Number(result.data.code) === 200) {
                tempEventList = result.data.entity;
                tempEventList = tempEventList.map(value => {
                    const tempValue = value;
                    tempValue.type = "event";
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.startTime
                    );
                    tempValue.end = utilMethods.calenderFormate(
                        tempValue.endTime
                    );
                    this.setEventColor(tempValue);
                    return tempValue;
                });
            }
            return tempEventList;
        },
        // 获取没有起止时间的事件列表
        async getInfiniteEvent() {
            const params = { contextCodes: this.contextCodes };
            const result = await this.$getData(
                "/calendarEvent/list",
                params,
                "get"
            );
            let tempInfinteEventList = [];
            if (Number(result.data.code) === 200) {
                tempInfinteEventList = result.data.entity;
                tempInfinteEventList = tempInfinteEventList.map(
                    (value, index) => {
                        const tempValue = value;
                        tempValue.type = "event";
                        this.setEventColor(tempValue);
                        return tempValue;
                    }
                );
            }
            return tempInfinteEventList;
        },
        // 去事件详情页面
        goEventDetail() {
            const curCalendarName = this.eventDetailData.courseName
                ? this.eventDetailData.courseName
                : this.eventDetailData.userName;
            // console.log('curCalendarName', curCalendarName)
            this.$router.push({
                path: "calanederDetail",
                query: { eventId: this.eventId, title: curCalendarName }
            });
        },
        // 获取待办列表
        async getTodoList() {
            const params = {
                startDate: this.startTime,
                endDate: this.endTime,
                contextCodes: this.contextCodes
            };
            const result = await this.$getData(
                "/calendarTodo/list",
                params,
                "get"
            );
            let tempTodoList = [];
            if (Number(result.data.code) === 200) {
                tempTodoList = result.data.entity;
                tempTodoList = tempTodoList.map(value => {
                    const tempValue = value;
                    tempValue.type = "todo";
                    this.setEventColor(tempValue);
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.doTime
                    );
                    return tempValue;
                });
            }
            // console.log('tempTodoList', tempTodoList)
            return tempTodoList;
        },
        // 获取没有起止时间的待办列表
        async getInfiniteTodoList() {
            const params = {
                contextCodes: this.contextCodes
            };
            const result = await this.$getData(
                "/calendarTodo/list",
                params,
                "get"
            );
            let tempInfiniteTodoList = [];
            if (Number(result.data.code) === 200) {
                tempInfiniteTodoList = result.data.entity;
                tempInfiniteTodoList = tempInfiniteTodoList.map(
                    (value, index) => {
                        const tempValue = value;
                        tempValue.type = "todo";
                        this.setEventColor(tempValue);
                        return tempValue;
                    }
                );
            }
            return tempInfiniteTodoList;
        },
        // 获取作业列表
        async getAssignList() {
            const params = {
                startDate: this.startTime,
                endDate: this.endTime,
                contextCodes: this.contextCodes
            };
            // console.log('params', params)
            const result = await this.$getData(
                "/calendarRes/list",
                params,
                "get"
            );
            let AssignList = [];
            let tempAssignList = [];
            if (Number(result.data.code) === 200) {
                AssignList = result.data.entity;
                // console.log('作业列表', tempAssignList)
                tempAssignList = AssignList.map((value, index) => {
                    const tempValue = value;
                    tempValue.type = "assignment";
                    this.setEventColor(tempValue);
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.dueTime
                    );
                    return tempValue;
                });
            }
            return tempAssignList;
        },
        // 获取没有起止时间的作业列表
        async getInfiniteAssignList() {
            const params = { contextCodes: this.contextCodes };
            const result = await this.$getData(
                "/calendarRes/list",
                params,
                "get"
            );
            let tempInfiniteAssignList = [];
            if (Number(result.data.code) === 200) {
                tempInfiniteAssignList = result.data.entity;
                tempInfiniteAssignList = tempInfiniteAssignList.map(
                    (value, index) => {
                        const tempValue = value;
                        tempValue.type = "assignment";
                        // const tempKey = `2_${value.courseId}`;
                        this.setEventColor(tempValue);
                        tempValue.start = utilMethods.calenderFormate(
                            tempValue.dueTime
                        );
                        return tempValue;
                    }
                );
            }
            return tempInfiniteAssignList;
        },
        // 创建作业
        async createAssign(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const assignList = [];
                    assignList.push({
                        assignType: 1,
                        limitTime: Number(
                            new Date(this.assginForm.assign.limitTime).getTime()
                        )
                    });
                    const params = {
                        title: this.assginForm.title,
                        courseId: this.assginForm.courseId,
                        assignmentGroupId: this.assginForm.assignmentGroupId,
                        status: Number(this.assginForm.status),
                        assign: assignList
                    };
                    const result = await this.$getData(
                        "/assignment/add",
                        params,
                        "post"
                    );
                    if (Number(result.data.code) === 200) {
                        this.createDialog = false;
                        this.$message({
                            message: this.$t("message.add_asign_success"),
                            type: "success"
                        });
                        this.$refs.assginForm.resetFields();
                        this.assginForm.assign.limitTime = "";
                        this.closeUpdate();
                        this.getAllList();
                    }
                }
            });
        },
        // 创建更多作业
        toMoreAssign() {
            const { title } = this.assginForm;
            const { assignmentGroupId } = this.assginForm;
            const limitTime = this.assginForm.assign.limitTime
                ? Number(new Date(this.assginForm.assign.limitTime).getTime())
                : "";
            this.$router.push({
                path: "allCourse/assignmentdetail",
                query: {
                    courseId: this.assginForm.courseId,
                    title,
                    assignmentGroupId,
                    limitTime
                }
            });
        },
        async selectAssignCalendar(item) {
            // 获取相应课程下的作业组
            const params = { courseId: Number(item) };
            const result = await this.$getData(
                "/assignmentGroup/list",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.assginForm.assignGroup = result.data.entity;
            }
            this.getCourseTime(item);
        },
        async getCourseTime(courseId) {
            const params = { courseId: Number(courseId) };
            const res = await this.$getData(
                "/course/date/query",
                params,
                "get"
            );
            if (Number(res.data.code) === 200) {
                const resData = res.data.entity;
                let startTime;
                let endTime;
                if (resData.startTime) startTime = resData.startTime;
                if (resData.endTime) endTime = resData.endTime;
                this.assignStartOption = startTime;
                this.assignEndOption = endTime;
            }
        },

        async selectEditAssignCalendar(item) {
            // 获取相应课程下的作业组
            const params = { courseId: Number(item) };
            const result = await this.$getData(
                "/assignmentGroup/list",
                params,
                "get"
            );
            if (Number(result.data.code) === 200) {
                this.editAssignGroup = result.data.entity;

                if (this.editAssignGroup.length > 0) {
                    this.editAssignGroupId = this.editAssignGroup[0].id;
                } else {
                    this.editAssignGroupId = "";
                }
            }
        },
        // 删除作业
        async delAssign() {
            const { assignTableId } = this.assignDetailData;
            const params = {
                assignTableId,
                originType: 1
            };
            const result = await this.$getData(
                "/calendarRes/deletes",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.assigmentDetail = false;
                this.assignDelete = false;
                this.$message({
                    message: this.$t("message.del_assign_success"),
                    type: "success"
                });
                this.closeUpdate();
                this.getAllList();
            }
        },
        async delDiscuss() {
            const parmas = {
                assignTableId: Number(this.discussDetailData.assignTableId),
                originType: 2
            };
            const result = await this.$getData(
                "/calendarRes/deletes",
                parmas,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.discussDelete = false;
                this.discussDetail = false;
                this.$message({
                    message: this.$t("message.del_discuss_success"),
                    type: "success"
                });
                this.closeUpdate();
                this.getAllList();
            }
        },
        // 讨论列表
        async getDiscussList() {
            const params = {
                startDate: this.startTime,
                endDate: this.endTime,
                contextCodes: this.contextCodes
            };
            const result = await this.$getData(
                "/calendarDiscussion/list",
                params,
                "get"
            );
            let tempDiscussList = [];
            if (Number(result.data.code) === 200) {
                tempDiscussList = result.data.entity;
                tempDiscussList = tempDiscussList.map(value => {
                    const tempValue = value;
                    tempValue.type = "discuss";
                    this.setEventColor(tempValue);
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.dueTime
                    );
                    return tempValue;
                });
            }
            return tempDiscussList;
        },
        // 获取没有起止时间的讨论列表
        async getInfiniteDisscussList() {
            const params = { contextCodes: this.contextCodes };
            const result = await this.$getData(
                "/calendarDiscussion/list",
                params,
                "get"
            );
            let tempInfiniteDiscussList = [];
            if (Number(result.data.code) === 200) {
                tempInfiniteDiscussList = result.data.entity;
                tempInfiniteDiscussList = tempInfiniteDiscussList.map(value => {
                    const tempValue = value;
                    tempValue.type = "discuss";
                    // const tempKey = `2_${tempValue.courseId}`;
                    this.setEventColor(tempValue);
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.dueTime
                    );
                    return tempValue;
                });
            }
            return tempInfiniteDiscussList;
        },
        // 测验列表
        async getQuizeList() {
            const params = {
                startDate: this.startTime,
                endDate: this.endTime,
                contextCodes: this.contextCodes
            };
            const result = await this.$getData(
                "/calendarQuiz/list",
                params,
                "get"
            );
            let tempTempQuizeList = [];
            if (Number(result.data.code) === 200) {
                tempTempQuizeList = result.data.entity;
                tempTempQuizeList = tempTempQuizeList.map(value => {
                    const tempValue = value;
                    tempValue.type = "quize";
                    this.setEventColor(tempValue);
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.dueTime
                    );
                    return tempValue;
                });
            }
            return tempTempQuizeList;
        },
        // 获取没有起止时间的测验列表
        async getInfiniteQuizeList() {
            const params = { contextCodes: this.contextCodes };
            const result = await this.$getData(
                "/calendarQuiz/list",
                params,
                "get"
            );
            let tempInfiniteQuizeList = [];
            if (Number(result.data.code) === 200) {
                tempInfiniteQuizeList = result.data.entity;
                tempInfiniteQuizeList = tempInfiniteQuizeList.map(value => {
                    const tempValue = value;
                    tempValue.type = "quize";
                    this.setEventColor(value);
                    tempValue.start = utilMethods.calenderFormate(
                        tempValue.dueTime
                    );
                    return tempValue;
                });
            }
            return tempInfiniteQuizeList;
        },
        // 删除测验
        async delQuize() {
            const params = {
                assignTableId: Number(this.quizeDetailData.assignTableId),
                originType: 3
            };
            const result = await this.$getData(
                "/calendarRes/deletes",
                params,
                "post"
            );
            if (Number(result.data.code) === 200) {
                this.quizeDelete = false;
                this.quizeDetail = false;
                this.$message({
                    message: this.$t("message.del_quize_success"),
                    type: "success"
                });
                this.closeUpdate();
                this.getAllList();
            }
        },
        // 获取所有没有起止时间的列表
        async getAllInfiniteList() {
            const infiniteEventList = await this.getInfiniteEvent();
            const infiniteAssignList = await this.getInfiniteAssignList();
            const infiniteDiscussList = await this.getInfiniteDisscussList();
            const infiniteQuizeList = await this.getInfiniteQuizeList();
            this.infiniteList = [];
            this.infiniteList = this.infiniteList
                .concat(infiniteEventList)
                .concat(infiniteAssignList)
                .concat(infiniteDiscussList)
                .concat(infiniteQuizeList);
            this.updateLoading = false;
        },
        closeUpdate() {
            this.updateOpen = false;
            this.styleIcon = { transform: "rotate(0deg)" };
        },
        changeUpdate() {
            this.updateOpen = !this.updateOpen;
            if (this.updateOpen) {
                this.updateLoading = true;
                this.styleIcon = { transform: "rotate(90deg)" };
                this.getAllInfiniteList();
            } else {
                this.styleIcon = { transform: "rotate(0deg)" };
            }
        },
        infiniteToDetail(item) {
            if (item.type === "event") {
                this.eventDetail = true;
                this.eventDetailData = item;
                this.eventId = this.eventDetailData.id;
                this.eventDetailDate = this.$t("message.without_date");
                this.initEventEditData();
            } else if (item.type === "assignment") {
                this.assigmentDetail = true;
                this.assignDetailData = item;
                const tempId = this.assignDetailData.courseId;
                const tempCanlerObj = this.checkedAssignItemList.find(
                    val => Number(val.id) === Number(tempId)
                );
                this.assignCanlendarName = tempCanlerObj.title;
                this.assigntDetailDate = this.$t("message.without_date");
                this.editAssignForm = this.assignDetailData;
                this.editAssignGroup = this.editAssignForm.assignGroup;
                this.editAssignGroupId = this.editAssignForm.assignmentGroupId;
                this.selectEditAssignCalendar(this.editAssignForm.courseId);
            } else if (item.type === "discuss") {
                this.discussDetailData = item;
                this.discussDetailDate = this.$t("message.without_date");
                const tempKey = `2_${this.discussDetailData.courseId}`;
                this.discussDetailData.courseName = this.itemColorObj[
                    tempKey
                ].title;
                this.discussDetail = true;
            } else if (item.type === "quize") {
                this.quizeDetailData = item;
                this.quizeDetailDate = this.$t("message.without_date");
                const tempKey = `2_${this.quizeDetailData.courseId}`;
                this.quizeDetailData.courseName = this.itemColorObj[
                    tempKey
                ].title;
                this.quizeDetail = true;
            }
        },
        toDiscuss() {
            const currentDiscuss = this.discussDetailData;
            this.$router.push({
                path: "allCourse/discussionDeatilCourse",
                query: {
                    discussionId: currentDiscuss.id,
                    courseId: currentDiscuss.courseId,
                    name: currentDiscuss.title
                }
            });
        },
        toQuize() {
            const currentQuize = this.quizeDetailData;
            this.$router.push({
                path: "allCourse/courseQuizz",
                query: {
                    data: currentQuize.id,
                    courseId: currentQuize.courseId,
                    name: currentQuize.title
                }
            });
        },
        // 编辑更多跳转
        async toAssign() {
            this.editAssginVisible = false;
            const curAsignData = this.assignDetailData;
            const targetId = curAsignData.id;
            const params = { data: targetId };
            const res = await this.$getData(
                "/assignmentGroupItem/get",
                params,
                "get"
            );
            if (Number(res.data.code) === 200) {
                this.$router.push({
                    path: "allCourse/assignmentDetail",
                    query: {
                        courseId: curAsignData.courseId,
                        assignmentId: curAsignData.id,
                        assignmentGroupId: res.data.entity.assignmentGroupId,
                        assignmentGroupItemId: res.data.entity.id,
                        name: curAsignData.title
                    }
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import "./calender.less";
</style>
