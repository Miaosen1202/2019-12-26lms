<template>
    <!--eslint-disable-->
    <div class="date-picker">
        <!-- <div class="input-wrapper" @mouseenter="showCancel = true" @mouseleave="showCancel = false">
            <div class="input" @click="togglePanel" v-text="range ? value[0] + ' -- ' + value[1] : value"></div>
            <transition name="fade">
                <img class="cancel-btn" src="./cancel.png" v-show="showCancel" @click="clear">
            </transition>
        </div> -->
        <transition name="toggle">
            <div v-show="panelState" class="date-panel" :style="coordinates">
                <div v-show="panelType !== 'year'" class="panel-header">
                    <div class="arrow-left" @click="prevMonthPreview()">
                        &lt;
                    </div>
                    <div class="year-month-box">
                        <div style="display:flex; width: 120px">
                            <div class="year-box" v-text="tmpYear" />
                            <div class="month-box">
                                {{ (tmpMonth + 1) | month(language) }}
                            </div>
                        </div>
                    </div>
                    <div class="arrow-right" @click="nextMonthPreview()">
                        &gt;
                    </div>
                </div>
                <div v-show="panelType === 'date'" class="type-date">
                    <ul class="weeks">
                        <li v-for="item in weekList" :key="item">
                            {{ item | week(language) }}
                        </li>
                    </ul>
                    <ul class="date-list">
                        <li
                            v-for="(item, index) in dateList"
                            :key="index"
                            :class="{
                                preMonth: item.previousMonth,
                                nextMonth: item.nextMonth,
                                invalid: validateDate(item),
                                firstItem: index % 7 === 0
                            }"
                            @click="selectDate(item)"
                        >
                            <div
                                class="message"
                                :class="{ selected: isSelected('date', item) }"
                            >
                                <div class="bg" />
                                <span v-text="item.value" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
export default {
    filters: {
        week: (item, lang) => {
            switch (lang) {
                case "en":
                    return {
                        0: "Su",
                        1: "Mo",
                        2: "Tu",
                        3: "We",
                        4: "Th",
                        5: "Fr",
                        6: "Sa"
                    }[item];
                case "zh-cn":
                    return {
                        0: "日",
                        1: "一",
                        2: "二",
                        3: "三",
                        4: "四",
                        5: "五",
                        6: "六"
                    }[item];
                case "uk":
                    return {
                        0: "Пн",
                        1: "Вт",
                        2: "Ср",
                        3: "Чт",
                        4: "Пт",
                        5: "Сб",
                        6: "Нд"
                    }[item];
                case "es":
                    return {
                        0: "Do",
                        1: "Lu",
                        2: "Ma",
                        3: "Mi",
                        4: "Ju",
                        5: "Vi",
                        6: "Sa"
                    }[item];
                case "fr":
                    return {
                        0: "Dim",
                        1: "Lun",
                        2: "Mar",
                        3: "Mer",
                        4: "Jeu",
                        5: "Ven",
                        6: "Sam"
                    }[item];
                default:
                    return item;
            }
        },
        month: (item, lang) => {
            switch (lang) {
                case "en":
                    return {
                        1: "Jan",
                        2: "Feb",
                        3: "Mar",
                        4: "Apr",
                        5: "May",
                        6: "Jun",
                        7: "Jul",
                        8: "Aug",
                        9: "Sep",
                        10: "Oct",
                        11: "Nov",
                        12: "Dec"
                    }[item];
                case "zh-cn":
                    return {
                        1: "一月",
                        2: "二月",
                        3: "三月",
                        4: "四月",
                        5: "五月",
                        6: "六月",
                        7: "七月",
                        8: "八月",
                        9: "九月",
                        10: "十月",
                        11: "十一月",
                        12: "十二月"
                    }[item];
                case "uk":
                    return {
                        1: "Січень",
                        2: "Лютий",
                        3: "Березень",
                        4: "Квітень",
                        5: "Травень",
                        6: "Червень",
                        7: "Липень",
                        8: "Серпень",
                        9: "Вересень",
                        10: "Жовтень",
                        11: "Листопад",
                        12: "Грудень"
                    }[item];
                case "es":
                    return {
                        1: "Ene",
                        2: "Feb",
                        3: "Mar",
                        4: "Abr",
                        5: "May",
                        6: "Jun",
                        7: "Jul",
                        8: "Ago",
                        9: "Sep",
                        10: "Oct",
                        11: "Nov",
                        12: "Dic"
                    }[item];
                case "fr":
                    return {
                        1: "Jan",
                        2: "Fév",
                        3: "Mar",
                        4: "Avr",
                        5: "Mai",
                        6: "Juin",
                        7: "Juil",
                        8: "Août",
                        9: "Sep",
                        10: "Oct",
                        11: "Nov",
                        12: "Déc"
                    }[item];
                default:
                    return item;
            }
        }
    },
    props: {
        language: { default: "zh" },
        min: { default: "1970-01-01" },
        max: { default: "3016-01-01" },
        value: {
            type: [String, Array],
            default: ""
        },
        range: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const now = new Date();
        let startDate;
        let endDate;
        let year;
        let month;
        let date;
        let tmpYear;
        let tmpMonth;
        let tmpStartYear;
        let tmpStartMonth;
        let tmpStartDate;
        let tmpEndYear;
        let tmpEndMonth;
        let tmpEndDate;
        if (!this.range) {
            startDate = endDate = this.value ? new Date(this.value) : now;
            // console.log('endDate', endDate)
            year = endDate.getUTCFullYear();
            month = endDate.getUTCMonth();
            date = endDate.getUTCDate();

            tmpYear = endDate.getUTCFullYear();
            tmpMonth = endDate.getUTCMonth();

            tmpStartYear = startDate.getUTCFullYear();
            tmpStartMonth = startDate.getUTCMonth();
            tmpStartDate = startDate.getUTCDate();

            tmpEndYear = endDate.getUTCFullYear();
            tmpEndMonth = endDate.getUTCMonth();
            tmpEndDate = endDate.getUTCDate();
        }

        return {
            showCancel: false,
            panelState: true,
            panelType: "date",
            coordinates: {},
            year,
            month,
            date,
            tmpYear,
            tmpMonth,
            tmpStartYear,
            tmpStartMonth,
            tmpStartDate,
            tmpEndYear,
            tmpEndMonth,
            tmpEndDate,
            minYear: Number,
            minMonth: Number,
            minDate: Number,
            maxYear: Number,
            maxMonth: Number,
            maxDate: Number,
            yearList: Array.from(
                { length: 12 },
                (value, index) => new Date().getFullYear() + index
            ),
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            weekList: [0, 1, 2, 3, 4, 5, 6],
            rangeStart: false
        };
    },
    computed: {
        dateList() {
            const currentMonthLength = new Date(
                this.tmpYear,
                this.tmpMonth + 1,
                0
            ).getDate();
            let dateList = Array.from(
                { length: currentMonthLength },
                (val, index) => ({
                    currentMonth: true,
                    value: index + 1
                })
            );
            const startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay();
            const previousMongthLength = new Date(
                this.tmpYear,
                this.tmpMonth,
                0
            ).getDate();

            for (let i = 0, len = startDay; i < len; i++) {
                dateList = [
                    { previousMonth: true, value: previousMongthLength - i }
                ].concat(dateList);
            }
            for (let i = dateList.length, item = 1; i < 42; i++, item++) {
                dateList[dateList.length] = { nextMonth: true, value: item };
            }
            return dateList;
        }
    },
    watch: {
        min(v) {
            const minArr = v.split("-");
            this.minYear = Number(minArr[0]);
            this.minMonth = Number(minArr[1]);
            this.minDate = Number(minArr[2]);
        },
        max(v) {
            const maxArr = v.split("-");
            this.maxYear = Number(maxArr[0]);
            this.maxMonth = Number(maxArr[1]);
            this.maxDate = Number(maxArr[2]);
        },
        range(newVal, oldVal) {
            if (newVal === oldVal) return;
            if (
                newVal &&
                Object.prototype.toString.call(this.value).slice(8, -1) ===
                    "String"
            ) {
                this.$emit("input", ["", ""]);
            }
            if (
                !newVal &&
                Object.prototype.toString.call(this.value).slice(8, -1) ===
                    "Array"
            ) {
                this.$emit("input", "");
            }
        },
        value(newVal, oldVal) {
            this.value = newVal;
            this.startDate = this.endDate = this.value
                ? new Date(this.value)
                : now;
            this.year = this.endDate.getUTCFullYear();
            this.month = this.endDate.getUTCMonth();
            this.date = this.endDate.getUTCDate();
            this.tmpYear = this.endDate.getUTCFullYear();
            this.tmpMonth = this.endDate.getUTCMonth();
            this.tmpStartYear = this.startDate.getUTCFullYear();
            this.tmpStartMonth = this.startDate.getUTCMonth();
            this.tmpStartDate = this.startDate.getUTCDate();
            this.tmpEndYear = this.endDate.getUTCFullYear();
            this.tmpEndMonth = this.endDate.getUTCMonth();
            this.tmpEndDate = this.endDate.getUTCDate();
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (
                this.$el.parentNode.offsetWidth +
                    this.$el.parentNode.offsetLeft -
                    this.$el.offsetLeft <=
                300
            ) {
                this.coordinates = {
                    right: "0",
                    top: `${window.getComputedStyle(this.$el.children[0])
                        .offsetHeight + 4}px`
                };
            } else {
                this.coordinates = {
                    left: "0",
                    top: `${window.getComputedStyle(this.$el.children[0])
                        .offsetHeight + 4}px`
                };
            }
            const minArr = this.min.split("-");
            this.minYear = Number(minArr[0]);
            this.minMonth = Number(minArr[1]);
            this.minDate = Number(minArr[2]);

            const maxArr = this.max.split("-");
            this.maxYear = Number(maxArr[0]);
            this.maxMonth = Number(maxArr[1]);
            this.maxDate = Number(maxArr[2]);

            if (this.range) {
                if (
                    Object.prototype.toString.call(this.value).slice(8, -1) !==
                    "Array"
                ) {
                    throw new Error(
                        "Binding value must be an array in range mode."
                    );
                }
                if (this.value.length) {
                    const rangeStart = this.value[0].split("-");
                    const rangeEnd = this.value[1].split("-");
                    this.tmpStartYear = Number(rangeStart[0]);
                    this.tmpStartMonth = Number(rangeStart[1]) - 1;
                    this.tmpStartDate = Number(rangeStart[2]);

                    this.tmpEndYear = Number(rangeEnd[0]);
                    this.tmpEndMonth = Number(rangeEnd[1]) - 1;
                    this.tmpEndDate = Number(rangeEnd[2]);
                } else {
                    this.$emit("input", ["", ""]);
                }
            }
            if (!this.value) {
                this.$emit("input", "");
            }
            // window.addEventListener('click', this.close)
        });
    },
    beforeDestroy() {
        // window.removeEventListener('click', this.close)
    },
    methods: {
        togglePanel() {
            // this.panelState = !this.panelState
            // this.rangeStart = false
        },
        isSelected(type, item) {
            switch (type) {
                case "date":
                    if (!this.range) {
                        return (
                            this.date === item.value &&
                            this.month === this.tmpMonth &&
                            item.currentMonth
                        );
                    }
                    let month = this.tmpMonth;
                    item.previousMonth && month--;
                    item.nextMonth && month++;
                    return (
                        new Date(this.tmpYear, month, item.value).getTime() >=
                            new Date(
                                this.tmpStartYear,
                                this.tmpStartMonth,
                                this.tmpStartDate
                            ).getTime() &&
                        new Date(this.tmpYear, month, item.value).getTime() <=
                            new Date(
                                this.tmpEndYear,
                                this.tmpEndMonth,
                                this.tmpEndDate
                            ).getTime()
                    );
            }
        },
        prevMonthPreview() {
            // this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1

            // this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1
            if (this.tmpMonth === 0) {
                this.tmpMonth = 11;
                this.tmpYear = this.tmpYear - 1;
            } else {
                this.tmpMonth = this.tmpMonth - 1;
            }
            console.log("end", this.tmpMonth);
        },
        nextMonthPreview() {
            // this.tmpMonth = this.tmpMonth === 11 ? 11 : this.tmpMonth + 1
            if (this.tmpMonth === 11) {
                this.tmpMonth = 0;
                this.tmpYear = this.tmpYear + 1;
            } else {
                this.tmpMonth = this.tmpMonth + 1;
            }
        },
        selectDate(date) {
            setTimeout(() => {
                if (this.validateDate(date)) return;
                if (date.previousMonth) {
                    if (this.tmpMonth === 0) {
                        this.year -= 1;
                        this.tmpYear -= 1;
                        this.month = this.tmpMonth = 11;
                    } else {
                        this.month = this.tmpMonth - 1;
                        this.tmpMonth -= 1;
                    }
                } else if (date.nextMonth) {
                    if (this.tmpMonth === 11) {
                        this.year += 1;
                        this.tmpYear += 1;
                        this.month = this.tmpMonth = 0;
                    } else {
                        this.month = this.tmpMonth + 1;
                        this.tmpMonth += 1;
                    }
                }
                if (!this.range) {
                    this.year = this.tmpYear;
                    this.month = this.tmpMonth;
                    this.date = date.value;
                    const value = `${this.tmpYear}-${`0${this.month + 1}`.slice(
                        -2
                    )}-${`0${this.date}`.slice(-2)}`;
                    // let value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}`
                    this.$emit("input", value);
                    // this.panelState = false
                } else if (this.range && !this.rangeStart) {
                    this.tmpEndYear = this.tmpStartYear = this.tmpYear;
                    this.tmpEndMonth = this.tmpStartMonth = this.tmpMonth;
                    this.tmpEndDate = this.tmpStartDate = date.value;

                    this.rangeStart = true;
                } else if (this.range && this.rangeStart) {
                    this.tmpEndYear = this.tmpYear;
                    this.tmpEndMonth = this.tmpMonth;
                    this.tmpEndDate = date.value;

                    const d1 = new Date(
                        this.tmpStartYear,
                        this.tmpStartMonth,
                        this.tmpStartDate
                    ).getTime();
                    const d2 = new Date(
                        this.tmpEndYear,
                        this.tmpEndMonth,
                        this.tmpEndDate
                    ).getTime();
                    if (d1 > d2) {
                        let tmpY;
                        let tmpM;
                        let tmpD;
                        tmpY = this.tmpEndYear;
                        tmpM = this.tmpEndMonth;
                        tmpD = this.tmpEndDate;

                        this.tmpEndYear = this.tmpStartYear;
                        this.tmpEndMonth = this.tmpStartMonth;
                        this.tmpEndDate = this.tmpStartDate;

                        this.tmpStartYear = tmpY;
                        this.tmpStartMonth = tmpM;
                        this.tmpStartDate = tmpD;
                    }
                    const RangeStart = `${this.tmpStartYear}-${`0${this
                        .tmpStartMonth + 1}`.slice(
                        -2
                    )}-${`0${this.tmpStartDate}`.slice(-2)}`;
                    const RangeEnd = `${this.tmpEndYear}-${`0${this
                        .tmpEndMonth + 1}`.slice(
                        -2
                    )}-${`0${this.tmpEndDate}`.slice(-2)}`;

                    const value = [RangeStart, RangeEnd];
                    this.$emit("input", value);

                    // this.rangeStart = false
                    // this.panelState = false
                }
            }, 0);
        },
        validateDate(date) {
            let mon = this.tmpMonth;
            if (date.previousMonth) {
                mon -= 1;
            } else if (date.nextMonth) {
                mon += 1;
            }
            if (
                new Date(this.tmpYear, mon, date.value).getTime() >=
                    new Date(
                        this.minYear,
                        this.minMonth - 1,
                        this.minDate
                    ).getTime() &&
                new Date(this.tmpYear, mon, date.value).getTime() <=
                    new Date(
                        this.maxYear,
                        this.maxMonth - 1,
                        this.maxDate
                    ).getTime()
            ) {
                return false;
            }
            return true;
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.panelState = false;
                this.rangeStart = false;
            }
        },
        clear() {
            this.$emit("input", this.range ? ["", ""] : "");
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped lang="less">
ul {
    padding: 0;
    margin: 0;
    list-style: none;
}
.date-picker {
    // position: relative;
    // height: 32px;
}
.input-wrapper {
    border: 1px solid #ccc;
    border-radius: 2px;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;
    padding: 6px 10px 6px 4px;
    height: 32px;
    box-sizing: border-box;
}
.input {
    height: 100%;
    width: 100%;
    font-size: inherit;
    padding-left: 4px;
    box-sizing: border-box;
    outline: none;
}
.cancel-btn {
    height: 14px;
    width: 14px;
}
.date-panel {
    // position: absolute;
    z-index: 2000;
    border: 1px solid #eee;
    box-sizing: border-box;
    width: 320px;
    padding: 5px 10px 10px;
    box-sizing: border-box;
    background-color: #fff;
    transform: translateY(4px);
}
.panel-header {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
}
.arrow-left,
.arrow-right {
    flex: 1;
    font-size: 20px;
    line-height: 2;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
}
.year-range {
    font-size: 20px;
    line-height: 2;
    flex: 3;
    display: flex;
    justify-content: center;
}
.year-month-box {
    flex: 3;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
.type-year,
.type-month,
.date-list {
    background-color: #fff;
}

.year-box,
.month-box {
    transition: all ease 0.1s;
    font-family: Roboto, sans-serif;
    flex: 1;
    text-align: center;
    font-size: 20px;
    line-height: 2;
    // cursor: pointer;
    background-color: #fff;
}
.year-list,
.month-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    li {
        font-family: Roboto, sans-serif;
        transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
        cursor: pointer;
        text-align: center;
        font-size: 20px;
        width: 33%;
        padding: 10px 0;
        &:hover {
            // background-color: #6ac1c9;
            background-color: #0e38b1;
            color: #fff;
        }
        &.selected {
            background-color: #0e38b1;
            color: #fff;
        }
        &.invalid {
            cursor: not-allowed;
            color: #ccc;
        }
    }
}
.date-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .valid:hover {
        background-color: #eee;
    }
    li {
        transition: all ease 0.1s;
        cursor: pointer;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        position: relative;
        margin: 2px;
        &:not(.firstItem) {
            margin-left: 10px;
        }
        .message {
            font-family: Roboto, sans-serif;
            font-weight: 300;
            font-size: 14px;
            position: relative;
            height: 30px;
            &.selected {
                .bg {
                    // background-color: rgb(0, 151, 167);
                    background: #0e38b1;
                }
                span {
                    color: #fff;
                }
            }
            &:not(.selected) {
                .bg {
                    transform: scale(0);
                    opacity: 0;
                }
                &:hover {
                    .bg {
                        // background-color: rgb(0, 151, 167);
                        background: #0e38b1;
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    span {
                        color: #fff;
                    }
                }
            }
            .bg {
                height: 30px;
                width: 100%;
                transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
                border-radius: 50%;
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
            }
            span {
                position: absolute;
                z-index: 20;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
            }
        }
        &.invalid {
            cursor: not-allowed;
            color: #ccc;
        }
    }
}
.weeks {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    li {
        font-weight: 600;
    }
}
.weeks,
.date-list {
    width: 100%;
    text-align: center;
    .preMonth,
    .nextMonth {
        color: #ccc;
    }
    li {
        font-family: Roboto;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }
}
.toggle-enter,
.toggle-leave-active {
    opacity: 0;
    transform: translateY(-10px);
}
.toggle-enter-active,
.toggle-leave-active {
    transition: all ease 0.2s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
    transform: scale3d(0, 0, 0);
}
.fade-enter-active,
.fade-leave-active {
    transition: all ease 0.1s;
}
</style>
