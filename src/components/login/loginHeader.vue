<template>
    <header class="topHeader" :style="{ background: bgColor }">
        <a class="logoBox" v-if="bgColor == '#fff'">
            <img src="../../../static/images/logo_name.png" />
        </a>
        <a class="logoBox" v-else>
            <img src="../../../static/images/logo_name_white.png" />
        </a>
        <!-- <div class="select" style="float: right;margin-right: 2%;width:110px;margin-top: 0.4%">
      <el-select v-show="true" v-model="selectValue" @change="langChange">
        <el-option
          style="border: none"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "login",
    data() {
        return {
            selectValue: "en",
            options: [
                // {
                //   value: 'zh',
                //   label: '中文'
                // },
                {
                    value: "en",
                    label: "English"
                }
            ]
        };
    },
    props: ["bgColor"],
    created() {
        this.selectValue =
            localStorage.lang == undefined ? "en" : localStorage.lang;
    },
    computed: {
        ...mapState(["curLanguage"])
    },
    methods: {
        ...mapMutations(["changeLanguage"]),
        //语言切换
        langChange(e) {
            // console.log('语言装换', e)
            localStorage.setItem("lang", e);
            this.$i18n.locale = e;
            this.changeLanguage(e);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.topHeader {
    padding: 0 10%;
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logoBox {
        display: inline-block;
        line-height: 80px;
        width: 160px;
        img {
            width: 100%;
            // line-height: 80px;
            vertical-align: middle;
            display: inline-block;
        }
    }
}
</style>
