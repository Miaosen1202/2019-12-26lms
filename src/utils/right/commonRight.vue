<template>
   <div class="calender-contain-right">
        <el-tabs v-model="eventRight" class="quizeRight" :stretch="true">
          <!-- start: 链接 -->
          <el-tab-pane :label="$t('message.Links')" name="first">
            <p>
                {{$t('message.link_to_other_content_in_the_course')}}

            </p>
            <div class="quizeLinks" v-if="courseId==''">
              <p>{{$t('message.no_link')}}</p>
            </div>
            <div class="quizeLinks" v-else>
              <el-collapse accordion>
                <div class="left-quize">
                  <el-collapse-item :title="$t('message.Assignments')" class="assignBox">
                    <div v-for="(item,index) in assignList" :key='index' class="assignList">
                      <a @click="sendAssignToParent(item)"> {{item.name}} </a>
                    </div>
                  </el-collapse-item>
                </div>
                <div class="left-quize">
                  <el-collapse-item :title="$t('message.Quizzes')" class="assignBox">
                     <div v-for="(item,index) in quizeList" :key='index' class="assignList">
                       <a @click="sendQuizeToParent(item)"> {{item.name}} </a>
                     </div>
                  </el-collapse-item>
                </div>
                <div class="left-quize">
                  <el-collapse-item :title="$t('message.Announcements')" class="assignBox">
                    <div v-for="(item,index) in annouceList" :key='index' class="assignList">
                      <a @click="sendAnnouseToParent(item)"> {{item.name}} </a>
                     </div>
                  </el-collapse-item>
                </div>
                <div class="left-quize">
                  <el-collapse-item :title="$t('message.Discussions')" class="assignBox">
                    <div v-for="(item,index) in discussList" :key='index' class="assignList">
                      <a @click="sendDiscussToParent(item)"> {{item.name}} </a>
                    </div>
                  </el-collapse-item>
                </div>
                <div class="left-quize">
                  <el-collapse-item :title="$t('message.Modules')" class="assignBox">
                    <div v-for="(item,index) in moduleList" :key="index" class="assignList">
                      <a @click="sendModuleToParent(item)">{{item.name}}</a>
                    </div>
                  </el-collapse-item>
                </div>
              </el-collapse>
            </div>
          </el-tab-pane>
          <!-- end: 链接 -->
          <!-- start: 文件 -->
          <el-tab-pane :label="$t('message.Files')" name="second">
            <div class="files-right">
              <p>
                {{$t('message.link_to_other_content_in_the_course')}}
              </p>
              <div class="filesRight">
                <el-scrollbar style="height: 100%;">
                  <el-tree :props="treeProp" :load="loadFile" lazy @node-click='nodeClick'>
                  </el-tree>
                </el-scrollbar>
              </div>
              <el-button :class = "{ 'uploadBtn':upFile, 'cancelUpBtn':!upFile}" @click="switchFile">
                <span v-if='upFile'> <i class="el-icon-circle-plus-outline"></i> {{$t('message.Upload_a_new_file')}} </span>
                <span v-else> <i class="el-icon-remove-outline"></i> {{$t('message.Cancel_file_upload')}}</span>
              </el-button>
              <div class="upfile-box" v-if='!upFile'>
                <el-upload
                  ref='fileUpload'
                  class="upload-demo"
                  :action="uploadUrl"
                  :auto-upload="false"
                  :on-success = 'upFileSuccess'
                  :limit = "1"
                  :file-list="fileList">
                  <el-button slot="trigger" size="small" type="primary">{{$t('message.Select_files')}}</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitFileUpload">{{$t('message.Upload')}}</el-button>
                </el-upload>
              </div>
              <div v-if='!upFile' class='select-folder'>
                <h1> {{$t('message.Folder')}} 文件夹</h1>
                 <el-select v-model="folderId" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in folderList"
                    :key="index"
                    :label="item.fileName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-tab-pane>
          <!-- end: 文件 -->
          <!-- start: 图像 -->
          <el-tab-pane :label="$t('message.Images')" name="third">
            <div class="files-right">
              <p>
                {{$t('message.link_to_other_content_in_the_course')}}
              </p>
              <el-button class="search-btn" @click='changeSearchFileVisble'>
                <i class="el-icon-search" v-if='searchFileVsible'></i>
                <i class="el-icon-remove-outline" v-else></i>
                {{$t('message.Search_Flickr')}}
              </el-button>
              <div v-if="!searchFileVsible" style="margin-bottom:20px">
                <p>Flickr:Creative Commons Search</p>
                <el-input v-model="searchFileName" :placeholder="$t('message.Enter_search_terms')"></el-input>
                <div style="text-align:right;margin-top:20px">
                    <el-button style="width: 30%" @click='searchImg'>
                          {{$t('message.Search')}}
                    </el-button>
                </div>
                <ul v-loading="loading">
                  <li v-for="(item, index) in searchImgList" :key="index" class="imgList">
                    <span> <img :src='item.imgUrl'> </span>
                    <a @click="getFileName(item.fileName)"> {{item.fileName}} </a>
                  </li>
                </ul>

              </div>
              <el-button :class = "{ 'uploadBtn':upFile, 'cancelUpBtn':!upFile}" @click="switchImg">
                <span v-if='upImg'> <i class="el-icon-circle-plus-outline"></i> {{$t('message.Upload_a_new_file')}} </span>
                <span v-else> <i class="el-icon-remove-outline"></i> {{$t('message.Cancel_file_upload')}}</span>
              </el-button>
              <div v-if='!upImg' class='select-folder'>
                <h1> {{$t('message.Folder')}} </h1>
                 <el-select v-model="imgfolderId" :placeholder="$t('message.pls_select')">
                  <el-option
                    v-for="(item,index) in folderList"
                    :key="index"
                    :label="item.fileName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="upfile-box" v-if='!upImg'>
                <el-upload
                  ref='ImgUpload'
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-success = 'upImgSuccess'
                  accept="image/*"
                  :limit = "1"
                  :auto-upload="false"
                  :file-list="imgList">
                  <el-button slot="trigger" size="small" type="primary">{{$t('message.Select_files')}}</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitImgUpload">{{$t('message.Upload')}}</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </div>
            </div>
          </el-tab-pane>
          <!-- end: 图像 -->
        </el-tabs>
      </div>
</template>

<script>
  export default {
    name: 'commonRight',
    props: {
      courseId:{
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        // courseId: '',
        uploadUrl: process.env.NODE_ENV + '/upload',
        treeProp:{
          label: 'fileName',
          isLeaf: 'leaf',
          children: 'zones',
        },
        rootFileList: [],
        searchFileName: '',
        searchFileVsible: true,
        searchImgList: [],
        fileList: [],
        imgList:[],
        upFile: true,
        upImg: true,
        folderList: [],
        folderId: '',
        imgfolderId: '',
        eventRight: 'first',
        node:'',
        resolve: '',
        isFirst: true,
        assignList: [],
        quizeList:[],
        annouceList: [],
        discussList: [],
        moduleList: []
      }
    },
    mounted(){
      if(this.courseId != ''){
        this.getAssignList();
        this.getQuizeList();
        this.getAnnouseList();
        this.getDiscussList();
        this.getModuleList();
        let tempId = this.courseId;
        this.getFolderList(tempId)
      }else{
         this.getFolderList()
      }

    },
    methods: {
     // 以下为右侧部分的方法
      async getRootData(){
        let result = await this.$getData('/userFile/list', 'get');
        if(result.data.code == 200){
          this.rootFileList = result.data.entity;
          // let _index = this.rootFileList.indexOf(null);
          // if(_index>-1) this.rootFileList.splice(_index,1)
          this.rootFileList.forEach(el=>{
            el.leaf = !Boolean(el.isDirectory)
          })
        }
      },
      async getLeafData(tempId){
        let params = { parentId: tempId }
        let result = await this.$getData('/userFile/list', params, 'get');
        let tempList = [];
        if(result.data.code == 200){
          tempList = result.data.entity
        }
        return tempList
      },
      async loadFile(node, resolve){
        if (this.isFirst) {
            this.node = node
            this.resolve = resolve
            this.isFirst = false
        }
        if(node.level == 0){
          await this.getRootData()
          return resolve(this.rootFileList);
        }else {
          let tempId = node.data.id
          let leafFileData = await this.getLeafData(tempId);
          leafFileData.forEach(el=>{
            el.leaf = !Boolean(el.isDirectory)
          })
          return resolve(leafFileData);
        }
      },
      submitFileUpload(){
        this.$refs.fileUpload.submit();
      },
      addNode(){
        this.node.childNodes = [] // 这里把子节点清空，是因为再次调用 loadNode 的时候会往 childNodes 里 push 节点，所以会有节点重复的情况。
        let tempNode = this.node;
        let tempResolve = this.resolve
        this.loadFile(tempNode, tempResolve)
      },
      // 上传文件成功
       upFileSuccess(res, file, fileList){
        if(res.code == 200){
          let upFileObj = res.entity[0]
          let fileName = upFileObj.originName;
          let fileId = upFileObj.fileId;
          let parentDirectoryId = this.folderId;
          this.addFile(fileName, fileId, parentDirectoryId)
          this.$emit('fileSucess', fileName)
        }
      },
      //添加文件
      async addFile(name, fileId, parentDirectoryId){
        let params = {
          isDirectory: 0,
          name: name,
          fileId: fileId,
          parentDirectoryId: parentDirectoryId,
        }
        let result = await this.$getData('/userFile/add', params, 'post');
        if(result.data.code == 200){
         this.$message({
                message: this.$t('message.add_file_success'),
                type: 'success'
              });
          this.addNode()
        }
      },

      // 获取文件夹列表
      async getFolderList(tempCourseId){
        this.folderList = [];
        let params = {};
        if(tempCourseId){
          params = {courseId:  tempCourseId, queryImage: 0  }
        }else {
          params = { queryImage: 0 }
        }
        let result = await this.$getData('/userFile/courseFile/query', params, 'get')
        if(result.data.code == 200){
          this.folderList = result.data.entity
          if(this.folderList.length>0){
            this.folderId = this.folderList[0].id
            this.imgfolderId = this.folderList[0].id
          }
        }
      },
      nodeClick(data1,data2,data3){
        let tempFileName = '';
        if(data1.leaf){
          tempFileName = data1.fileName;
        }
        this.$emit('node-click', tempFileName)
      },
      // 搜索图片
      async searchImg(){
        this.loading = true;
        let params = {};
        if(this.courseId !=''){
          params = {
            courseId: this.courseId,
            queryImage: 1,
            name: this.searchFileName,
          }
        }else {
          params = {
            queryImage: 1,
            name: this.searchFileName,
          }
        }

        let result = await this.$getData('/userFile/courseFile/query', params, 'get')
        if(result.data.code == 200){
          this.searchImgList = result.data.entity;
          this.loading = false;
          this.searchImgList.forEach(el=>{
            el.imgUrl = this.GlobalUrl + el.fileUrl
          })
        }
      },
      submitImgUpload(){
        this.$refs.ImgUpload.submit();
      },
      // 上传图片成功
      upImgSuccess(res, file, fileList){
        if(res.code == 200){
          let upFileObj = res.entity[0];
          let fileName = upFileObj.originName;
          let fileId = upFileObj.fileId;
          let parentDirectoryId = this.imgfolderId;
          this.addFile(fileName, fileId, parentDirectoryId)
        }
      },
      getFileName(fileName){
       this.$emit('getFile-name', fileName)
      },
      changeSearchFileVisble(){
        this.searchFileVsible = !this.searchFileVsible
      },
      switchFile(){
        this.upFile = !this.upFile
      },
      switchImg(){
        this.upImg = !this.upImg
      },
      // 获取作业列表
      async getAssignList(){
        let params = { courseId: this.courseId };
        let result = await this.$getData('/assignment/linkInfo/query', params, 'get');
        if(result.data.code == 200){
          this.assignList = result.data.entity
        }
      },
      // 获取点击作业的信息
      sendAssignToParent(item){
        this.$emit('getAssignItem', item)
      },
      // 获取测验列表信息
      async getQuizeList(){
        let params = { courseId: this.courseId };
        let result = await this.$getData('/quiz/linkInfo/query', params, 'get');
        if(result.data.code == 200){
          this.quizeList = result.data.entity
        }
      },
      // 获取测验信息
      sendQuizeToParent(item){
        this.$emit('getQuizeItem', item)
      },
      // 获取公告列表信息
      async getAnnouseList(){
        let params = { courseId: this.courseId };
        let result = await this.$getData('/announce/linkInfo/query', params, 'get');
        if(result.data.code == 200){
          this.annouceList = result.data.entity
        }
      },
      // 获取点击的公告信息
      sendAnnouseToParent(item){
        this.$emit('getAnnouseItem', item)
      },
      // 获取讨论列表
      async getDiscussList(){
        let params = { courseId: this.courseId };
        let result = await this.$getData('/discussion/linkInfo/query', params, 'get');
        if(result.data.code == 200){
          this.discussList = result.data.entity
        }
      },
      // 获取点击的讨论信息
      sendDiscussToParent(item){
        this.$emit('getDiscussItem', item)
      },
      // 获取单元列表
      async getModuleList(){
        let params = { courseId: this.courseId };
        let result = await this.$getData('/module/linkInfo/query', params, 'get');
        if(result.data.code == 200){
          this.moduleList = result.data.entity
        }
      },
      //获取点击的单元列表的信息
      sendModuleToParent(item){
        this.$emit('getModuleItem', item)
      },
    },

  }

</script>

<style lang="less" scoped>
  @import "./right.less";
</style>
