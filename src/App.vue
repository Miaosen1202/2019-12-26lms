<template>
    <div id="app">
        <router-view :key="key" />
    </div>
</template>

<script>
import "@/assets/third-party/iconfont.css";
import "@/common/style.css";

export default {
    name: "App",
    components: {},
    data() {
        return {};
    },
    methods: {
        /* eslint-disable */
        ToFixed: function(data, val) {
            var numbers = "";
            for (var i = 0; i < val; i++) {
                numbers += "0";
            }
            var s = 1 + numbers;
            var spot = "." + numbers;
            var value = Math.round(parseFloat(data) * s) / s;
            var d = value.toString().split(".");
            if (d.length == 1) {
                value = value.toString() + spot;
                return value;
            }
            if (d.length > 1) {
                if (d[1].length < 2) {
                    value = value.toString() + "0";
                }
                return value;
            }
        }
    },
    /* eslint-disable */
    computed: {
        key() {
            return this.$route.path + Math.random();
        }
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}
/*img{
    vertical-align:top;
    border:none
  }*/
#app {
    width: 100%;
    height: 100%;
    /*background-color: #2a58ad;*/
}
</style>
