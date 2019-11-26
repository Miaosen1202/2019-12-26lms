<template>
  <li v-if="modules.length>0">
    <b>{{$t('message.Modules')}}</b>
    <span
      v-if="modules.length==1">
      {{modules[0].name}}
    </span>
    <span v-else-if="modules.length>1">
      <el-tooltip placement="top">
        <div slot="content">
          <div v-for="module in modules">
             {{module.name}}
          </div>
        </div>
        <span style="color: blue">{{$t('message.ASSIGNMENT.multiple_module')}}</span>
      </el-tooltip>
    </span>
  </li>
</template>

<script>
  import utilMethods from '@/utils/utilMethods'

  export default {
    // name: 'assignTo',
    props: ["modules"],
    data() {
      return {
        sectionUserList: [],
      }
    },
    created() {
      // this.assignDataList();
    },
    filters: {
      formatterDate(val) {
        return utilMethods.formatDate(val);
      },
    },
    methods: {
      getType(assign) {
        let data = '';
        //1: 所有， 2：section(班级), 3: 用户
        switch (assign.assignType) {
          case 2:
            data = this.$t('message.Sections');
            break;
          case 3:
            data = this.$t('message.students');
            break;
          default:
            data = this.$t('message.All');
        }
        return data;
      },
    }
  }
</script>

<style scoped>
  .assign-addto {
    border-top: 1px dashed #ccc;
  }

  .assign-add {
    padding-left: 90%;
    padding-bottom: 2%;
  }

  .available-until {
    display: inline-block;
    width: 48%;
    margin-left: 1%;
  }

  .assign-style {
    padding: 2%;
    margin-bottom: 2%;
  }
</style>
