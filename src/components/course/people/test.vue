<template>
    <div>
        <div id="show">
            {{ listData }}
        </div>
    </div>
</template>

<script>
// import goTop from "../../utils/goTop.vue";
export default {
    props: {
        listData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            activeName: "second"
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style scoped=""></style>
