<template>
  <div style="background: #0e38b1; width:100%; height:100%">
    <loginHeader bgColor='#0e38b1'></loginHeader>
    <div class="signUp-box" style="width:480px">
      <div class="sign-header">
        <h1>{{ $t('message.COURSE.course_enrollment_title' )}}</h1>
        <p>
          {{ $t('message.COURSE.course_enrollment_course_name') }}
          <em>:</em>
          {{ enrollmentInfo.name }}
        </p>
      </div>
      <div class="signForm">
        <div v-if="!canEnroll" style="text-align: center;padding: 2em;color: red;">
          * {{ cannotEnrollErrorMessage }}
        </div>
        <el-form :model="enrollForm" :rules='enrollRules' ref='enrollForm'
                 label-width="120px">
          <el-form-item :label="$t('message.COURSE.course_enrollment_login_id')" prop="username">
            <el-input v-model="enrollForm.username" :placeholder="$t('message.email_user')" clearable minlength='4' maxlength ='50'></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.COURSE.course_enrollment_password')" prop="password">
            <el-input v-model="enrollForm.password" type="password" clearable minlength='6' maxlength ='30'></el-input>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" :disabled="!canEnroll" @click="enrollCourse('enrollForm')" style="width: 200px;">
               {{ $t('message.COURSE.course_enrollment_submit') }}
             </el-button>
          </el-form-item>          
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import loginHeader from './loginHeader.vue'
import baseValidater from '@/utils/baseValidater'
export default {
  name: 'login',
  data () {

    return {
      enrollmentInfo: {},
      canEnroll: false,
      cannotEnrollErrorMessage: "",
      code: "",
      orgnazList: [],
      enrollForm: {
        username: '',
        password: '',
      },
      enrollRules: {
        username: [
          { required: true, message: this.$t('message.pls_enter_username'), trigger: 'blur' },
          { min: 4, max: 50, message: this.$t('message.limit_4_50'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('message.pls_enter_pwd'), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('message.limt_6_20'), trigger: 'blur' }
        ],
      },
      
    }
  },
  created(){
    this.code = this.$route.query.code;
    console.log(this.$route.query)
    if (!this.code) {
      this.$message.error("code is empty");
    } else {
      this.loadCourseInfo();
    }
  },
  methods:{

    goLogin(){
      this.$router.push({path: '/login'})
    },

    async loadCourseInfo () {
      let result = await this.$getData("/course/enrollmentInfo/query", {code: this.code});
      if (result.data.code == 200) {
        this.enrollmentInfo = result.data.entity;
        if (this.enrollmentInfo.publicStatus == 0) {
          // 未发布
          this.cannotEnrollErrorMessage = "Course is not public";
        } else if (this.enrollmentInfo.isConclude == 1) {
          // 已结束
          this.cannotEnrollErrorMessage = "Course is conclude";
        } else if (this.enrollmentInfo.isDeleted == 1) {
          // 已删除
          this.cannotEnrollErrorMessage = "Course is not found";
        } else {
          this.canEnroll = true;
        }
      } else {
        this.$message.error(result.data.message);
      }
    },

    enrollCourse(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {code: this.code, username: this.enrollForm.username, password: this.enrollForm.password};
          this.$http.post(`${process.env.NODE_ENV}/course/enroll/edit`, data)
            .then(res => {
              if (res.data.code == 200) {
                this.$alert('Enroll course success, please login to view', 'Tip', {
                  confirmButtonText: 'Go Login',
                  callback: action => {
                    this.$router.push({path: "/login"});
                  }
                });
              } else {
                this.$message.error(res.data.message);
              }
            }).catch(err => {
              this.$message.error(err);
          });
        }
      });
    }
  },
  components:{
    loginHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "./login.less";
</style>
