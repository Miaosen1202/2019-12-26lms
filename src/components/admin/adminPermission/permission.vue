<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Course Roles" name="first">
        <!--<p class="search_people_ps">
          <el-input class="search_people_input1" placeholder="Search People"></el-input>
          <el-input class="search_people_input2" placeholder="All Roles"></el-input>
          <el-button class="search_people_ps_button"><i class="iconfont icon-add"></i>Add Role</el-button>
        </p>-->
        <div class="permission_table">
          <div class="permission_left">
            <ul>
              <li class="nome_bottom nome_bottom_first"><span>Permission</span><span>Student</span><span>TA</span><span>Teacher</span></li>
              <li class="nome_bottom"><span>Analytics - view pages</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Announcements - view</span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes</span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes - add</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes - edit</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes - delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course Calendar - manage events</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course Calendar - edit events</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course Content - add/edit/delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course File - add/edit/delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li><span>Course Sections - add/edit/delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
            </ul>
          </div>
          <div class="permission_right">
            <ul>
              <li class="permission_right_first"><span>Student</span><span><i class="iconfont icon-close"></i></span></li>
              <li>Permission setting for course roles is not supported in this version of the systerm.</li>
              <li class="permission_right_li">Assigned Permissions</li>
              <li class="permission_right_li"><span>Announcements - view</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Discussions - creat</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Discussions - post</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Announcements - view</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Users - view list</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li">Unassigned Permissions</li>
              <li class="permission_right_li"><span>Analytics - view pages</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
              <li class="permission_right_li"><span>Assignments and Quizzes</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
              <li class="permission_right_li"><span>Assignments and Quizzes - add</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
              <li class="permission_right_li"><span>Assignments and Quizzes - edit</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Account Roles" name="second">
       <!-- <p class="search_people_ps">
          <el-input class="search_people_input1"></el-input>
          <el-input class="search_people_input2"></el-input>
          <el-button class="search_people_ps_button"><i class="iconfont icon-add"></i>Add Role</el-button>
        </p>-->
        <div class="permission_table">
          <div class="permission_left">
            <ul>
              <li class="nome_bottom"><span>Permission</span><span>Student</span><span>TA</span><span>Teacher</span></li>
              <li class="nome_bottom"><span>Analytics - view pages</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Announcements - view</span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes</span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes - add</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes - edit</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Assignments and Quizzes - delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course Calendar - manage events</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course Calendar - edit events</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course Content - add/edit/delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li class="nome_bottom"><span>Course File - add/edit/delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
              <li><span>Course Sections - add/edit/delete</span><span><i class="iconfont icon-shanchu2"></i></span><span><i class="iconfont icon-duigou"></i></span><span><i class="iconfont icon-duigou"></i></span></li>
            </ul>
          </div>
          <div class="permission_right">
            <ul>
              <li class="permission_right_first"><span>Course Admin</span><span class="permission_right_span"><i class="iconfont icon-edit"></i><i class="iconfont icon-delete"></i><i class="iconfont icon-close"></i></span></li>
              <li>Parent Role:sub-Account Admin Last changed:Nov,11 at 11:28pm</li>
              <li class="permission_right_li">Assigned Permissions</li>
              <li class="permission_right_li"><span>Announcements - view</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Discussions - creat</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Discussions - post</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Announcements - view</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li"><span>Users - view list</span><span class="green_duigou"><i class="iconfont icon-duigou"></i></span></li>
              <li class="permission_right_li">Unassigned Permissions</li>
              <li class="permission_right_li"><span>Analytics - view pages</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
              <li class="permission_right_li"><span>Assignments and Quizzes</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
              <li class="permission_right_li"><span>Assignments and Quizzes - add</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
              <li class="permission_right_li"><span>Assignments and Quizzes - edit</span><span class="green_duigou"><i class="iconfont icon-shanchu2"></i></span></li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              activeName: 'second'
            }
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        }
    }
</script>

<style scoped="">
 .permission_alert h3{
   width: 100%;
   position: relative;
   height: 30px;
 }
 .permission_alert h3 span{
   position: absolute;
   right: 0;
   top:0;
 }
.search_people_input1{
  width: 200px;
  margin-right: 10px;
}
.search_people_input2{
  width: 200px;
  }
  .permission_table{
    display: flex;
    width: 100%;

  }
  .permission_left{
    width: 80%;

  }
.permission_left ul li{
  border: 1px solid #ccc;
  line-height: 30px;
}
.permission_left ul li span{
  display: inline-block;
  width: 23%;
  text-align: center;
}
.permission_left ul li span .icon-shanchu2{
  color: #dd6161;
}
.permission_left ul li span .icon-duigou{
  color: #5daf34;
}
.permission_right{
   width: 300px;
  margin-left: 50px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 3px;

}
.permission_right ul li{
  line-height: 27px;
}
.permission_left ul .nome_bottom{
  border-bottom: none;
}
  .permission_table{
    margin-top: 30px;
  }
.permission_right_li{
  border-bottom: 1px solid #ccc;
  position: relative;
}
  .green_duigou{
    position: absolute;
    right:0;
    top:1px;

  }
  .permission_right_first{
    position: relative;
  }
  .permission_right_span{
    position: absolute;
    right: 0;
    top:1px;
  }
.permission_right_span i{
  margin-right: 10px;
}
.search_people_ps{
  width: 1600px;
  position: relative;
}
  .search_people_ps_button{
    position: absolute;
    right: 0;
    top:0;
  }
  .permission_alert{
    width: 350px;
    height: 300px;
  }
.permission_alert h3{

}

</style>
