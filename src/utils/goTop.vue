<template>
    <!--eslint-disable-->
    <div id="goTop">
        <div v-show="goTopShow" class="goTop" @click="goTop">
            <i class="goTopIcon" />
        </div>
    </div>
    <!--eslint-disable no-new-->
</template>
<script>
/*eslint-disable*/
export default {
    name: "GoTop",
    data() {
        return {
            scrollTop: "",
            goTopShow: false
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            } else {
                this.goTopShow = false;
            }
        },
        goTop() {
            let timer = null;
            const _that = this;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                if (_that.scrollTop > 0) {
                    _that.scrollTop -= 50;
                    document.body.scrollTop = document.documentElement.scrollTop =
                        _that.scrollTop;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                    _that.goTopShow = false;
                }
            });
        }
    }
};
/*eslint-disable no-new*/
</script>

<style scoped>
.goTop {
    position: fixed;
    right: 20px;
    bottom: 50px;
    width: 40px;
    height: 40px;
    opacity: 1;
}
.goTop:hover {
    opacity: 0.5;
}
.goTopIcon {
    cursor: pointer;
    display: block;
    width: 40px;
    height: 40px;
    background-image: url("../../static/images/top.png");
    background-repeat: no-repeat;
    background-position: center center;
}
</style>
