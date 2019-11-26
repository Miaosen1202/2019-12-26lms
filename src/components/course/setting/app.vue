<template>
  <div>
    <div class="seiting_external">
      <h4>{{$t('message.External_Apps')}}</h4>
      <el-button>查看应用程序配置</el-button>
    </div>
    <div style="padding-bottom: 4%">
      <p>
        应用程序是向Canvas添加新功能的简单方式。这些功能可添加到账户中的各个课程或所有课程。配置完毕后，你可以通过课程单元与其连接
        ，并为测试测试工具创建作业。
      </p>
      <p style="margin-bottom: 4%">
        查看可与Canvas一起使用的工具。
      </p>
      <el-button> {{$t('message.All')}}</el-button>
      <el-button>{{$t('message.Not_Installed')}}</el-button>
      <el-button>{{$t('message.Installed')}}</el-button>
      <el-input v-model="input" :placeholder="$t('message.Filter_by_name')" style="width: 30%;float: right"></el-input>
    </div>
    <div class="sharedBoxShadow">
      <a>
        <div class="img">
          <img src="../../../../static/images/ceshi2.jpg" alt="">
        </div>
        <div class="close">
          123456789
        </div>
      </a>
    </div>
  </div>
</template>


<script>
  export default {

  }
</script>
<style scoped>


  .seiting_external {
    border-bottom: 1px solid #ccc;
    padding-bottom: 2%;
    margin-bottom: 4%;
  }
  .seiting_external h4 {
    padding-top: 2%;
    display: inline-block;
  }
  .seiting_external .el-button {
    float: right;
  }


  .sharedBoxShadow {
    position: relative;
    width: 270px;
    height: 180px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden ;
    background-color: #000;
  }
  .sharedBoxShadow .img img{
    position: relative;
    width: 270px;
    height: 180px;
    max-width: 100%;
  }
  .sharedBoxShadow .close {
    font-size: 30px;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    text-align: center;
    line-height: 180px;
    -webkit-backface-visibility: hidden;
    -webkit-transition: all 0.35s ease-in-out;
    backface-visibility: hidden;
    transition: all 0.5s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    border-radius: 4px;
  }
  .sharedBoxShadow a:hover .close {
    opacity: 1;
  }
</style>
