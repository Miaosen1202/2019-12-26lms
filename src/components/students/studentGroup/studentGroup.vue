<template>
    <!--eslint-disable-->
    <div>
        <ul class="grouList">
            <li v-for="(item, index) in groupList" :key="index">
                <a @click="toGroupHome(item)"> {{ item.name }} </a>
            </li>
        </ul>
    </div>
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
export default {
    name: "StudentGroup",
    components: {},
    data() {
        return {
            groupList: []
        };
    },
    created() {
        this.getGroupList();
    },
    methods: {
        async getGroupList() {
            const res = await this.$getData("/studyGroup/joined/query", "get");
            if (res.data.code == 200) {
                this.groupList = res.data.entity;
            }
        },
        toGroupHome(item) {
            const tempObj = item;
            // console.log('toGroup', item)
            this.$router.push({
                path: "studentMain",
                query: { groupId: item.id, courseId: item.courseId }
            });
        }
    }
};
/*eslint-disable no-new*/
</script>
<style scoped lang="less">
.grouList {
    li {
        height: 40px;
        line-height: 40px;
        a {
            font-size: 18px;
            text-decoration: underline;
            cursor: pointer;
            color: #0e38b1;
        }
    }
}
</style>
