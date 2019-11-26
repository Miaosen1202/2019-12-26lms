<template>
  <div>
      <h1 class='importing-text'>  {{$t('message.Processing')}} </h1>
      <p class='importing-text'> {{$t('message.may_take_bit')}} </p>
      <div class='progress-bar'></div>
      <p class='importing-text'>
        {{$t('message.process_prompt')}}
      </p>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              
            }
        },
        created(){
     
        },
        methods: {
         

        }
    }
</script>
<style lang="less" scoped>
  @import "./sis.less";
</style>
