<template>
    <!--eslint-disable-->
    <div id="all">
        <div class="right-top">
            <top />
        </div>
        <div :class="{ left: true, 'collapse-left': !sCollapse }">
            <left />
        </div>
        <div :class="{ right: true, 'collapse-right': !sCollapse }">
            <div class="right-main">
                <router-view />
            </div>
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import left from "./studentLeft.vue";
import top from "../top.vue";
import { mapState } from "vuex";
export default {
    name: "StudentHomePage",
    components: {
        left,
        top
    },
    data() {
        return {
            msg: "欢迎"
        };
    },
    computed: {
        ...mapState(["sCollapse"])
    },
    methods: {}
};
/*eslint-disable no-new*/
</script>
<style scoped>
#all {
    width: 100%;
    height: 100%;
    /* background-color: #ccc;*/
}
.right-top {
    width: 100%;
    position: fixed;
    z-index: 999;
    top: 0%;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
}
.left {
    width: 10%;
    height: 93%;
    position: fixed;
    top: 7%;
    color: #c3c7d5;
    z-index: 2;
    background-color: #0e38b1;
}
.left.collapse-left {
    width: auto;
}
.right {
    width: 90%;
    height: 92%;
    /*background-color: #4aff1d;*/
    /*float: left;*/
    position: absolute;
    left: 10%;
    top: 7%;
}
.right.collapse-right {
    width: 100%;
    box-sizing: border-box;
    left: 0px;
    padding-left: 57px;
    top: 52px;
}
.right-main {
    height: 98%;
    margin-top: 1%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background-color: #fff;
}
</style>
