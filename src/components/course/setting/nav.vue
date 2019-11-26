<template>
  <div class="navigation">
    <div>
      <p>
        {{$t('message.Drag_and_drop')}}
      </p>
    </div>
    <div class="navigation_list">
      <ul>
        <li>
          <span>{{$t('message.Home')}}</span>
          <!--<img src="../../../static/images/spread.png" alt="" style="float: right">-->
        </li>
        <li>
          <span>{{$t('message.Announcements')}}</span>
          <img src="../../../../static/images/spread.png" alt="">
        </li>
        <li>
          <span>{{$t('message.Assignments')}}</span>
          <img src="../../../../static/images/spread.png" alt="">
        </li>
        <li>
          <span>{{$t('message.Discussions')}}</span>
          <img src="../../../../static/images/spread.png" alt="" >
        </li>
        <li>
          <span>{{$t('message.Grades')}}</span>
          <img src="../../../../static/images/spread.png" alt="" >
        </li>
        <li>
          <span>{{$t('message.People')}}</span>
          <img src="../../../../static/images/spread.png" >
        </li>
        <li>
          <span>{{$t('message.Pages')}}</span>
          <img src="../../../../static/images/spread.png" alt="" >
        </li>
        <li>
          <span>{{$t('message.Files')}}</span>
          <img src="../../../../static/images/spread.png" alt="">
        </li>
        <li>
          <span>{{$t('message.Syllabus')}}</span>
          <img src="../../../../static/images/spread.png" alt="" >
        </li>
        <li>
          <span>{{$t('message.Outcomes')}}</span>
          <img src="../../../../static/images/spread.png" alt="" >
        </li>
        <li>
          <span>{{$t('message.Quizzes')}}</span>
          <img src="../../../../static/images/spread.png" alt="">
        </li>
        <li>
          <span>{{$t('message.Modules')}}</span>
          <el-row class="block-col-2">
            <el-col :span="12">
              <el-dropdown trigger="click">
                <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                <img src="../../../../static/images/spread.png" alt="">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="editSetting">
                    <i class="el-icon-close"></i>
                    {{$t('message.Disable')}}
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-sort"></i>
                    {{$t('message.Move')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </li>
        <li>
          <span>{{$t('message.Conferences')}}</span>
          <el-row class="block-col-2">
            <el-col :span="12">
              <el-dropdown trigger="click">
                <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                <img src="../../../../static/images/spread.png" alt="">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="editSetting">
                    <i class="el-icon-close"></i>
                    {{$t('message.Disable')}}
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-sort"></i>
                    {{$t('message.Move')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </li>
        <li>
          <span>{{$t('message.Collaborations')}}</span>
          <el-row class="block-col-2" >
            <el-col :span="12">
              <el-dropdown trigger="click">
                <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                <img src="../../../../static/images/spread.png" alt="">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="editSetting">
                    <i class="el-icon-close"></i>
                    {{$t('message.Disable')}}
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-sort"></i>
                    {{$t('message.Move')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>

          <!--<img src="../../../static/images/spread.png" alt="" style="float: right">-->
        </li>
        <li>
          <span>{{$t('message.Attendance')}}</span>
          <el-row class="block-col-2">
            <el-col :span="12">
              <el-dropdown trigger="click">
                <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                <img src="../../../../static/images/spread.png" alt="">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="editSetting">
                    <i class="el-icon-close"></i>
                    {{$t('message.Disable')}}
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-sort"></i>
                    {{$t('message.Move')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </li>
      </ul>

    </div>
    <p>
      {{$t('message.Drag_items_here_to_hide_them_from_students')}}
    </p>
    <p>
      {{$t('message.Disabling_most_pages')}}
    </p>
    <div class="analytics-beta">
      <ul>
        <li>
          <span>{{$t('message.Analytics_Beta')}}</span>
          <img src="../../../../static/images/spread.png" alt="" style="float: right">
          <i style="display: block">
            {{$t('message.Page_disabled')}}
          </i>
        </li>
      </ul>
    </div>
    <el-button type="primary">{{$t('message.Save')}}</el-button>
  </div>
</template>
<script>
  import utilMethods from '@/utils/utilMethods'
  import {formatDate} from '@/utils/date'
  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    data () {
      return {

      };
    },

    mounted () {

    },

    methods: {
      editSetting: function () {
        console.log(123);
      },
    }
  }
</script>
<style scoped>
  .navigation {
    width: 70%;
    margin-bottom: 4%;
  }

  .navigation_list {

    border: 1px solid #ccc;
    border-bottom: none;
    margin: 4% 0;

  }

  .navigation_list ul li {
    border-bottom: 1px solid #ccc;
    padding: 2% 4% 2%;
  }
  .navigation_list ul li:hover {
    background-color: #ccc;
    cursor: pointer;
  }
  .navigation_list ul li img {
    float: right;
  }

  .analytics-beta {
    margin-bottom: 2%;
  }
  .analytics-beta ul li {
    border: 1px solid #ccc;
    padding: 2% 4% 2%;
  }
  .analytics-beta ul li:hover {
    background-color: #ccc;
    cursor: pointer;
  }


  .block-col-2 {
    display: inline-block;
    float: right;
  }

  .el-icon-close,.el-icon-sort {
    font-weight: 700;
    font-size: 16px;
  }
</style>
