<template>
    <div id="all">
        <div class="right-top">
            <top />
        </div>
        <div :class="{ left: true, 'collapse-left': !aCollapse }">
            <left />
        </div>
        <div :class="{ right: true, 'collapse-right': !aCollapse }">
            <div class="right-main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import left from "./adminLeft.vue";
import top from "../top.vue";

export default {
    name: "AdminHomePage",
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
        ...mapState(["aCollapse"])
    },
    methods: {}
};
</script>
<style scoped>
#all {
    width: 100%;
    height: 100%;
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
