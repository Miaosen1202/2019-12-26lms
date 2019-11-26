<template>
  <div>
    <div v-show="isyincang">
      <div class="summary-Quizzes">
        <div class="quizzes-search">
          <el-input
            :placeholder="$t('message.Search_for_Quiz')"
            prefix-icon="el-icon-search"
            v-model="watchTitle" @input="searchTitle">
          </el-input>
        </div>
        <!-- <div class="module">
            <el-button>Manage Question Banks</el-button>
            <el-button style="background-color: #0138b1;color: white" @click.native="showQuize">Quiz</el-button>
          </div>-->
        <div class="modules-list">
          <div class="modules-group">
            <div class="module-heard">
                  <span class="drag">
                    <img src="../../../../static/images/drag.png"
                         title="拖动以重新排序单元"
                         alt="" @click="QQpracticeQuizList">
                  </span>
              <h3 style="display: inline-block">测验测试</h3>
            </div>
            <div class="content" v-for="(quizz,index) in practiceQuizList" v-show="TeacherQuizList" :key="index">
              <ul>
                <li>
                  <div class="modules-row">
                           <span class="drag">
                            <img src="../../../../static/images/drag.png"
                                 alt="" title="拖动可重新排序或移动项目至其它单元"
                                 style="vertical-align: baseline">
                           </span>
                    <h4 style="display: inline-block;cursor: pointer" @click="showQuize(quizz.id)">{{quizz.title}}</h4>

                    <div class="quizzes-time">
                      <ul>
                        <li>已关闭 |</li>

                        <li v-show="quizz.score">{{quizz.score}}分 |</li>
                        <li>{{quizz.totalQuestions}}个问题</li>

                        <li v-if="quizz.assignUsers.limitTime">| {{quizz.assignUsers.limitTime | formatDate(time) }}
                        </li>
                        <li v-if="quizz.assignUsers.endTime">| {{quizz.assignUsers.endTime | formatDate(time) }}</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="modules-group">
            <div class="module-heard">
                  <span class="drag">
                    <img src="../../../../static/images/drag.png"
                         title="拖动以重新排序单元"
                         alt="" @click="QQsurveyQuizList">
                  </span>
              <h3 style="display: inline-block">测验测试</h3>
            </div>
            <div class="content" v-for="(quizz,index) in surveyList" v-show="TeachersurveyList" :key="index">

              <ul>
                <li>
                  <div class="modules-row">
                           <span class="drag">
                            <img src="../../../../static/images/drag.png"
                                 alt="" title="拖动可重新排序或移动项目至其它单元"
                                 style="vertical-align: baseline">
                           </span>
                    <h4 style="display: inline-block;cursor: pointer" @click="showQuize(quizz.id)">{{quizz.title}}</h4>

                    <div class="quizzes-time">
                      <ul>
                        <li>已关闭 |</li>

                        <li v-show="quizz.score">{{quizz.score}}分 |</li>
                        <li>{{quizz.totalQuestions}}个问题</li>

                        <li v-if="quizz.assignUsers.limitTime">| {{quizz.assignUsers.limitTime | formatDate(time) }}
                        </li>
                        <li v-if="quizz.assignUsers.endTime">| {{quizz.assignUsers.endTime | formatDate(time) }}</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="modules-group">
            <div class="module-heard">
                  <span class="drag">
                    <img src="../../../../static/images/drag.png"
                         title="拖动以重新排序单元"
                         alt="" @click="QQgradedQuizList">
                  </span>
              <h3 style="display: inline-block">测验测试</h3>
            </div>
            <div class="content" v-for="(quizz,index) in gradedQuizList" v-show="TeachergradedQuizList" :key="index">

              <ul>
                <li>
                  <div class="modules-row">
                           <span class="drag">
                            <img src="../../../../static/images/drag.png"
                                 alt="" title="拖动可重新排序或移动项目至其它单元"
                                 style="vertical-align: baseline">
                           </span>
                    <h4 style="display: inline-block;cursor: pointer" @click="showQuize(quizz.id)">{{quizz.title}}</h4>

                    <div class="quizzes-time">
                      <ul>
                        <li>已关闭 |</li>

                        <li v-show="quizz.score">{{quizz.score}}分 |</li>
                        <li>{{quizz.totalQuestions}}个问题</li>

                        <li v-if="quizz.assignUsers.limitTime">| {{quizz.assignUsers.limitTime | formatDate(time) }}
                        </li>
                        <li v-if="quizz.assignUsers.endTime">| {{quizz.assignUsers.endTime | formatDate(time) }}</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="xianshi">
      <div style="width: 70%;" class="quizeLeft">
        <div class="question_unit">
          <h3>{{quizInfoGetList.title}}</h3>
          <div class="unit_again">
            <ul v-for="studentquizInfoGetTaba in quizInfoGetTaba">
              <li>
                <h4>{{$t('message.Due')}}</h4><span>{{quizInfoGetList.createTime | formatDate(time)}}</span>
              </li>
              <li>
                <h4>{{$t('message.Points')}}</h4><span>12</span>
              </li>
              <li>
                <h4>{{$t('message.Questions')}}</h4><span>{{quizInfoGetList.totalQuestions}}</span>
              </li>
              <li>
                <h4>{{$t('message.Time_Limit')}}</h4><span>{{studentquizInfoGetTaba.limitTime}}</span>
              </li>
              <li>
                <h4>{{$t('message.Allowed_Attempts')}}</h4><span
                v-if="quizInfoGetList.allowMultiAttempt=='1'">Yes</span>
                <span v-if="quizInfoGetList.allowMultiAttempt=='0'">No </span>
              </li>
              <li>
                <h4>Available</h4><span>{{studentquizInfoGetTaba.startTime}}</span>- <span>Nov</span>
                <span>{{studentquizInfoGetTaba.endTime}}</span>
              </li>
            </ul>
            <div class="quizeLeft_init">
              <p>{{quizInfoGetList.title}}</p>
            </div>
          </div>
          <div class="quizeLeft_button">
            <el-button @click="startedQuizzes" style="background-color: #0138b1;color: white">
              {{$t('message.Take_the_Quiz_Again')}}
            </el-button>
          </div>
          <div class="quizeLeft_attempt">
            <span>{{$t('message.Attempt_History')}}</span>
            <el-table
              :data="quizRecordlist"
              style="width: 100%"
              @selection-change="handleSelectionChange(scope.row)"
            >
              <el-table-column
                label=""
                prop="dueTime"
                align="center"
                data-placement="auto"
                :show-overflow-tooltip="true"
                min-width="24%">
              </el-table-column>
              <el-table-column
                :label="$t('message.Attempt')"

                prop="id"
                align="center"
                data-placement="auto"
                :show-overflow-tooltip="true"
                min-width="24%">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="goReply(scope.$index, scope.row)">尝试{{scope.$index+1}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('message.Time')"
                prop="startTime"
                align="center"
                data-placement="auto"
                :show-overflow-tooltip="true"
                min-width="24%">
              </el-table-column>
              <el-table-column
                :label="$t('message.Score')"
                prop="submitTime"
                align="center"
                data-placement="auto"
                :show-overflow-tooltip="true"
                min-width="24%">
              </el-table-column>
            </el-table>
            <p>* Some questions not yet graded </p>
            <p>
              Quiz results are protected for this quiz and are not visible to students until they have submitted their
              last attempt</p>
            <div class="caution" v-if="studentShowQuizz==1"><!--警示-->
              <img src="../../../../static/images/jingshi.png" alt="">
              {{$t('message.Allow_questions_to_be_answered')}}
            </div>
            <p>Score for this attempt : 0 out of 15 *</p>
          </div>
          <div class="caution" v-if="studentShowQuizz==2"><!--警示-->
            <img src="../../../../static/images/jingshi.png" alt="">
            {{$t('message.Indicates_that_it_is_locked')}}
          </div>
          <div class="caution" v-if="studentShowQuizz==3"><!--警示-->
            <img src="../../../../static/images/jingshi.png" alt="">

            {{$t('message.Indicates_an_access_code_error')}}
          </div>
          <div class="caution" v-if="studentShowQuizz==4"><!--警示-->
            <img src="../../../../static/images/jingshi.png" alt="">
            {{$t('message.Indicates_that_the_number')}}

          </div>
          <div class="caution" v-if="studentShowQuizz==5"><!--警示-->
            <img src="../../../../static/images/jingshi.png" alt="">
            {{$t('message.IP_address_is_not_in_the_set_range')}}

          </div>
          <div class="caution" v-if="studentShowQuizz==6"><!--警示-->
            <img src="../../../../static/images/jingshi.png" alt="">
            {{$t('message.Reference_module_in_unlocked_state')}}
          </div>
          <div class="caution" v-if="studentShowQuizz==7"><!--警示-->
            <img src="../../../../static/images/jingshi.png" alt="">
            {{$t('message.The_current_time_is_not_within')}}

          </div>
        </div>
      </div>
      <div style="width: 26%;" class="quizeRight">
        <div>
          <div>
            <h4 style="display: inline-block;padding: 4% 0">{{$t('message.Last_Attempt_Details')}}:</h4>
          </div>
          <div class="submissionDtails">
            <ul>
              <li>
                <p style="width: 50%;display: inline-block">{{$t('message.time')}}:</p>
                <span> 11</span>{{$t('message.minutes')}}
              </li>
              <li>
                <p style="width: 50%;display: inline-block">{{$t('message.Current_Score')}}:</p> <span>1</span>
                out of <span>7*</span>
              </li>
              <li>
                <p style="width: 50%;display: inline-block">{{$t('message.Kept_Score')}}:</p> <span>1</span>
                out of <span>7</span>
              </li>
              <li><span class="some">*Some questions not yet graded</span></li>
              <li>
                <p class="preview" @click="startedQuizzes">Take the Quiz Again</p>
                <p class="preview" @click="startedQuizzesNext">Take the Quiz Again Next</p>
              </li>
              <li>
                <span>(Will keep the highest of all your scores)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-show="quizzesPublish">
      <div class="quizzesPublish-left">
        <div>
          <div style="float: right;padding-top: 4px;cursor: pointer;padding-right: 1%">
            <el-row class="block-col-2">
              <el-col :span="12">
                <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                          <!--<i style="font-size: 34px" class="el-icon-menu"></i>-->
                          <img src="../../../../static/images/spread-big.png" alt="" style="vertical-align: baseline">
                        </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <!--<img src="../../../../tatic/images/Lock.png" alt="">-->
                      Lock this Quiz Now
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <img src="../../../../static/images/delete.png" alt="">
                      Delete
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <img src="../../../../static/images/share.png" alt="">
                      Share to Commons
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
          <!--<img src="../../../static/images/spread-big.png" alt=""
               style="float: right;padding-top: 4px;cursor: pointer">-->

          <el-button icon="el-icon-edit" style="float: right;margin: 0 2%">Edit</el-button>
          <el-button style="float: right" @click="startedQuizzes">Preview</el-button>
          <el-button type="success" icon="el-icon-circle-check" style="float: right">Published</el-button>
        </div>
        <div class="quizzesPreview">
          <h4 style="padding:2% 0 0 2%">单元一测试</h4>
          <div class="quizzes-info">
            <p style="padding: 1% 2%;border-bottom: 1px solid #ccc">This is quiz of unit 1</p>
            <div class="quizInfo">
              <ul style="text-align: center">
                <li><h5>Quiz Type</h5>
                  <span>Graded Quiz </span>
                </li>
                <li><h5>Points</h5>
                  <span>12 </span>
                </li>
                <li><h5>Assignment Group</h5>
                  <span>assignment </span>
                </li>
                <li><h5>Shuffle Answers</h5>
                  <span>No</span>
                </li>
                <li><h5>Time Limit</h5>
                  <span> No Time Limit</span>
                </li>
                <li><h5>Multiple Attempts</h5>
                  <span>No </span>
                </li>
                <li><h5>View Responses</h5>
                  <span>Always</span>
                </li>
                <li><h5>Show Correct Answers</h5>
                  <span>Immediately</span>
                </li>
                <li><h5>Quiz Type</h5>
                  <span>No</span>
                </li>
              </ul>
            </div>
            <div>
              <el-table
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column
                  label="Due"
                  prop="due"
                  align="center"
                  data-placement="auto"
                  :show-overflow-tooltip="true"
                  min-width="24%">
                </el-table-column>
                <el-table-column
                  label="For"
                  prop="every"
                  align="center"
                  data-placement="auto"
                  :show-overflow-tooltip="true"
                  min-width="24%">
                </el-table-column>
                <el-table-column
                  label="Auailable from"
                  prop="auailable"
                  align="center"
                  data-placement="auto"
                  :show-overflow-tooltip="true"
                  min-width="24%">
                </el-table-column>
                <el-table-column
                  label="Until"
                  prop="until"
                  align="center"
                  data-placement="auto"
                  :show-overflow-tooltip="true"
                  min-width="24%">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div style="text-align: center;padding: 0 2% 2%;border-bottom: 1px solid #ccc">
            <el-button @click="startedQuizzes" style="background-color: #0138b1;color: #fff">Preview</el-button>
          </div>
          <v-goTop></v-goTop>
        </div>
      </div>
      <div class="quizzesPublish-right">
        <div>
          <p> Related items</p>
          <div class="importIntoCourse">
            <el-button plain class="quizzes-right">
              <img src="../../../../static/images/shezhi.png" alt="">
              Moderate This Quiz
            </el-button>
          </div>
          <div class="importIntoCourse">
            <el-button class="quizzes-right" style="color: #00eb00;border: 1px solid #00eb00;">
              <img src="../../../../static/images/UPLOAD.png" alt="">
              Download All Files
            </el-button>
          </div>
          <div class="importIntoCourse">
            <el-button plain class="quizzes-right">
              <img src="../../../../static/images/jifen.png" alt="">
              speedGrade
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="quizzesStarted">
      <div class="quizzesPreviewStarted">
        <h4>{{quizInfoGetList.title}}</h4>
        <div class="quizzesStartTime">
          <h4>{{$t('message.Started')}}</h4><span>{{quizInfoGetList.createTime | formatDate(time)}}</span>
        </div>
        <div class="quizzesStartTime">
          <h4>{{$t('message.Quizzes_Instructions')}}</h4><span>this is quiz of unit 1</span>
        </div>
        <div class="quizzesQuestion">

          <div v-show="takeTheQuizAgain">
            <div class="quizzes-started" v-for="(domain,index) in quizItemList"
                 :key="index">
              <div class="biaoji">
                <img src="../../../../static/images/biaoji.png" alt="">
              </div>
              <h5>{{domain.title}} {{index+1}}</h5> <span>{{domain.score}}pts</span>
              <ul>
                <div v-html="domain.content"></div>
                <li v-if="domain.type==1" v-for="item in domain.options">
                  <el-radio v-model="item.isCorrect" label="item.isCorrect">{{item.content}}</el-radio>
                </li>
                <li v-if="domain.type==2" v-for="item in domain.options">
                  <el-checkbox v-model="item.isCorrect" label="item.isCorrect">{{item.content}}</el-checkbox>
                </li>
                <li v-if="domain.type==3" v-for="item in domain.options">
                  <el-radio v-model="item.isCorrect" label="item.isCorrect">{{item.content}}</el-radio>
                </li>
                <li v-if="domain.type==6">
                  <el-input type="textarea" v-model="domain.generalComment">{{domain.generalComment}}
                  </el-input>
                </li>
              </ul>
            </div>
            <div class="quizzesQuestion">
              <div class="quizzes-started">
                <div class="biaoji">
                  <img src="../../../../static/images/biaoji.png" alt="">
                </div>
                <h5>Question 2</h5> <span>1pts</span>
                <ul>以下哪些是中国省会城市?
                  <li>
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="checked1">备选项</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="checked2">备选项</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="checked3">备选项</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="checked4">备选项</el-checkbox>
                  </li>
                </ul>
              </div>
            </div>
            <div class="quizzesQuestion">

              <div class="quizzes-started">
                <div class="biaoji">
                  <img src="../../../../static/images/biaoji.png" alt="">
                </div>
                <h5>Question 2</h5> <span>1pts</span>
                <ul>以下哪些是中国省会城市?
                  <li>

                    <el-radio v-model="radio" label="1">True</el-radio>
                  </li>
                  <li>
                    <el-radio v-model="radio" label="2">False</el-radio>
                  </li>
                </ul>
              </div>
            </div>
            <div class="quizzesQuestion">

              <div class="quizzes-started">
                <div class="biaoji">
                  <img src="../../../../static/images/biaoji.png" alt="">
                </div>
                <h5>Question 2</h5> <span>1pts</span>
                <ul>
                  <li>
                    <div class="question-select">
                      <span>河南的省会城市是？ </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Select]"
                                 style="margin-bottom: 2%;">
                        <el-option label="郑州" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                    <div class="question-select">
                      <span>河南的省会城市是？ </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Select]"
                                 style="margin-bottom: 2%;">
                        <el-option label="郑州" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                    <div class="question-select">
                      <span>河南的省会城市是？ </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Select]"
                                 style="margin-bottom: 2%;">
                        <el-option label="郑州" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                    <div class="question-select">
                      <span>河南的省会城市是？ </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Select]"
                                 style="margin-bottom: 2%;">
                        <el-option label="郑州" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </li>
                  <li>

                  </li>
                </ul>
              </div>
            </div>
            <div class="quizzesQuestion">

              <div class="quizzes-started">
                <div class="biaoji">
                  <img src="../../../../static/images/biaoji.png" alt="">
                </div>
                <h5>Question 2</h5> <span>1pts</span>
                <ul>请上传你的作品图片或者视频？
                  <li>
                    <el-upload
                      class="upload-demo"
                      action="action"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="fileList">
                      <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                  </li>

                </ul>
              </div>
            </div>
            <div class="quizzesQuestion">

              <div class="quizzes-started">
                <div class="biaoji">
                  <img src="../../../../static/images/biaoji.png" alt="">
                </div>
                <h5>Question 2</h5> <span>1pts</span>
                <ul>请对下面的省会城市进行匹配?
                  <li>
                    <span>A</span> <span>北京</span>
                    <div style="padding-left: 60%">
                      <span>A </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Choose]"
                                 style="margin-bottom: 2%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>

                  </li>
                  <li>
                    <span>A</span>
                    <el-tooltip class="item" effect="light" content="北京 北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京"
                                placement="top">
                          <span class="started-choose">
                            北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京
                          </span>
                    </el-tooltip>
                    <div style="padding-left: 60%">
                      <span>A </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Choose]"
                                 style="margin-bottom: 2%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </li>
                  <li>
                    <span>A</span> <span>北京</span>
                    <div style="padding-left: 60%">
                      <span>A </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Choose]"
                                 style="margin-bottom: 2%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </li>
                  <li>
                    <span>A</span> <span>北京</span>
                    <div style="padding-left: 60%">
                      <span>A </span>
                      <el-select v-model="formLabelAlign.region" placeholder="[Choose]"
                                 style="margin-bottom: 2%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-show="takeTheQuizNext">
            <div class="quizzes-started">
              <h5>Question 2</h5> <span>1pts</span>
              <ul>以下哪些是中国省会城市?
                <li>A
                  <el-checkbox v-model="checked">备选项</el-checkbox>
                </li>
                <li>B
                  <el-checkbox v-model="checked1">备选项</el-checkbox>
                </li>
                <li>C
                  <el-checkbox v-model="checked2">备选项</el-checkbox>
                </li>
                <li>D
                  <el-checkbox v-model="checked3">备选项</el-checkbox>
                </li>
                <li>E
                  <el-checkbox v-model="checked4">备选项</el-checkbox>
                </li>
              </ul>
            </div>
            <div style="float: right">
              <el-button icon="el-icon-caret-left">{{$t('message.Previous')}}</el-button>
              <el-button>{{$t('message.Next')}}<i class="el-icon-caret-right"></i></el-button>
            </div>
          </div>
        </div>
        <div style="float: right;margin-top: 1%; clear: both;">
          <span style="color:#666666">Quiz saved at 11:26am</span>
          <el-button style="background-color: #0138b1;color: #fff" @click="submitQuizzes">
            {{$t('message.Submit_Quiz')}}
          </el-button>
        </div>
        <v-goTop></v-goTop>
      </div>
      <div class="quizzesStarted-right">
        <div>
          <div class="importIntoCourse">
            <div class="keepQuestions">
              <ul>
                <h4>{{$t('message.Question')}}</h4>
                <li><span>Questions 1</span></li>
                <li><span>Questions 1</span></li>
                <li><span>Questions 1</span></li>
                <li><span>Questions 1</span></li>
              </ul>
            </div>
            <div>
              <h4 style="display: inline-block;padding: 4% 0">{{$t('message.Time_Elapsed')}}:</h4>
              <span style="color:#0138b1;font-weight: 600">{{$t('message.Hide')}}</span>
            </div>
            <div>
              <h4 style="display: inline-block;padding: 4% 0">{{$t('message.Attempt_due')}}:</h4>
              <span style="color:#0138b1;font-weight: 600">Nov 29 at 15:13pm</span>
            </div>
            <div style="color: #999999">
              <span>12 </span><span>{{$t('message.Minutes')}},</span><span>10</span><span>{{$t('message.Seconds')}} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="quizzesSubmit">
      <div class="quizzesPublish-left">
        <div class="quizzesPreviewSubmit">
          <div>
            <div>
              <h3>this is quiz of unit 1</h3>
              <div class="unit_again">
                <ul v-for="studentquizInfoGetTaba in quizInfoGetTaba">
                  <li>
                    <h4>{{$t('message.Due')}}</h4><span>{{quizInfoGetList.createTime | formatDate(time)}}</span>
                  </li>
                  <li>
                    <h4>{{$t('message.Points')}}</h4><span>12</span>
                  </li>
                  <li>
                    <h4>{{$t('message.Questions')}}</h4><span>{{quizInfoGetList.totalQuestions}}</span>
                  </li>
                  <li>
                    <h4>{{$t('message.Time_Limit')}}</h4><span>{{studentquizInfoGetTaba.limitTime}}</span>
                  </li>
                  <li>
                    <h4>{{$t('message.Allowed_Attempts')}}</h4><span
                    v-if="quizInfoGetList.allowMultiAttempt=='1'">Yes</span>
                    <span v-if="quizInfoGetList.allowMultiAttempt=='0'">No </span>
                  </li>
                  <li>
                    <h4>Available</h4><span>{{studentquizInfoGetTaba.startTime}}</span>- <span>Nov</span>
                    <span>{{studentquizInfoGetTaba.endTime}}</span>
                  </li>
                </ul>
                <div class="quizeLeft_init">
                  <p>Instructions...</p>
                </div>
              </div>
              <div class="quizeLeft_button">
                <el-button @click="startedQuizzes" style="background-color: #0138b1;color: white">
                  {{$t('message.Take_the_Quiz_Agains')}}
                </el-button>
              </div>
              <div class="quizeLeft_attempt">
                <span>{{$t('message.Attempt_History')}}</span>
                <el-table
                  :data="quizRecordlist"
                  style="width: 100%"
                  @selection-change="handleSelectionChange(scope.row)"
                >
                  <el-table-column
                    label=""
                    prop="dueTime"
                    align="center"
                    data-placement="auto"
                    :show-overflow-tooltip="true"
                    min-width="24%">
                  </el-table-column>
                  <el-table-column
                    :label="$t('message.Attempt')"

                    prop="id"
                    align="center"
                    data-placement="auto"
                    :show-overflow-tooltip="true"
                    min-width="24%">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="goReply(scope.$index, scope.row)">尝试{{scope.$index+1}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('message.Time')"
                    prop="startTime"
                    align="center"
                    data-placement="auto"
                    :show-overflow-tooltip="true"
                    min-width="24%">
                  </el-table-column>
                  <el-table-column
                    :label="$t('message.Score')"
                    prop="submitTime"
                    align="center"
                    data-placement="auto"
                    :show-overflow-tooltip="true"
                    min-width="24%">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="quizzes-score">
            <ul>
              <li>{{$t('message.Score_for_this_quiz')}} : <span>1 out of 10*</span></li>
              <li>{{$t('message.submitted_Dec')}} 25 at 14.44pm</li>
              <li>{{$t('message.This_attempt_took')}} 12 {{$t('message.minutes')}}</li>
            </ul>
            <div class="caution" v-if="displayError==1"><!--警示-->
              <img src="../../../../static/images/jingshi.png" alt="">
              {{$t('message.To_allow')}}
            </div>
            <div class="caution" v-if="displayError==2"><!--警示-->
              <img src="../../../../static/images/jingshi.png" alt="">
              {{$t('message.Allowed_to')}}
            </div>
            <div class="caution" v-if="displayError==3"><!--警示-->
              <img src="../../../../static/images/jingshi.png" alt="">
              {{$t('message.Indicates_that')}}
            </div>
          </div>
          <div >
            <div class="quizzes-question" v-if="displayError==1">
              <h5>Question 2</h5> <span>1pts</span>
              <ul>message 1
                <li>
                  <img src="../../../../static/images/correctanswer.png" alt="">
                  <el-checkbox v-model="checked">备选项</el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="checked1">备选项</el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="checked2">备选项</el-checkbox>
                </li>
                <li>
                  <img src="../../../../static/images/correctanswer.png" alt="">
                  <el-checkbox v-model="checked3">备选项</el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="checked4">备选项</el-checkbox>
                </li>
              </ul>
            </div>
            <div class="quizzes-question" v-if="displayError==2">
              <h5>Question 3</h5> <span>1pts</span>

              <ul>message 2
                <li>
                  <img src="../../../../static/images/youranswer.png" alt="">
                  <el-radio v-model="radio" label="1">True</el-radio>
                </li>
                <li>
                  <el-radio v-model="radio" label="2">False</el-radio>
                </li>
              </ul>
            </div>
            <div class="quizzes-question" v-if="displayError==3">
              <h5>Question 3</h5> <span>1pts</span>

              <ul>message 3
                <li>
                  <img src="../../../../static/images/youranswer.png" alt="">
                  <el-radio v-model="radio" label="1">True</el-radio>
                </li>
                <li>
                  <el-radio v-model="radio" label="2">False</el-radio>
                </li>
              </ul>
            </div>
          </div>
          <v-goTop></v-goTop>
        </div>
      </div>
      <div class="quizzesPublish-right">
        <div>
          <div>
            <h4 style="display: inline-block;padding: 4% 0">{{$t('message.Last_Attempt_Details')}}:</h4>
          </div>
          <div class="submissionDtails">
            <ul>
              <li>
                <p style="width: 50%;display: inline-block">{{$t('message.time')}}:</p>
                <span> 11</span>{{$t('message.minutes')}}
              </li>
              <li>
                <p style="width: 50%;display: inline-block"> {{$t('message.Current_Score')}}:</p> <span>1</span>
                out of <span>7*</span>
              </li>
              <li>
                <p style="width: 50%;display: inline-block">{{$t('message.Kept_Score')}} :</p> <span>1</span>
                out of <span>7</span>
              </li>
              <li><span class="some">*Some questions not yet graded</span></li>
              <li>
                <h4>2 Attempts So far</h4>
                <p class="preview" @click="startedQuizzes">{{$t('message.Preview_thie_Quiz_Agains')}}</p>
              </li>
              <li>
                <h4>66 More Attempts available</h4>
                <p class="preview" @click="startedQuizzes">{{$t('message.Take_the_Quiz_Agains')}}</p>
              </li>
              <li>
                ({{$t('message.Will_keep_the_highest_of_all_your_scores')}})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import goTop from "@/utils/goTop.vue";
  import eventBus from '@/eventBus';
  import {formatDate} from '@/utils/date';
  import {mapGetters} from 'vuex'

  export default {
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
    },
    data() {
      return {
        /***
         * *测验列表
         * */
        courseId: this.$route.query.courseId,
        practiceQuizList: [],
        showQuizInforList: [],
        gradedQuizList: [],
        surveyList: [],
        TeacherQuizList: true,
        TeachersurveyList: true,
        TeachergradedQuizList: true,
        datas: '',
        time: '',
        quizInfoGetTaba: [],
        quizInfoGetList: [],
        assign: [{
          assignType: '1',
          limitTime: '',
          startTime: '',
          endTime: ''
        }],
        quizItemList: [],
        watchTitle: '',
        quizRecordId: '',
        quizRecordlist: [],
        studentShowQuizz:'',
        displayError:'',
        // isOpen: false,
        fileList: [],
        action: process.env.NODE_ENV,
        value1time: '',
        showQuizzes: false,
        isShow: false,
        isyincang: true,
        xianshi: false,
        quizzesPublish: false,
        quizzesStarted: false,
        moduleSpread: false,
        quizzesSubmit: false,
        takeTheQuizAgain: false,
        takeTheQuizNext: false,
        submitCourse: 1000,
        tabPosition: 'left',
        checked: false,
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        input: '',
        input21: '',
        activeName: 'first',
        quizeRight: 'first',
        value2: '',
        tableData: [{
          due: 'Dec1',
          every: 'Everyone',
          auailable: 'Dec 22 at 14:44pm',
          until: 'Dec 22 at 14:44pm',

        }, {
          due: 'Dec1',
          every: 'Everyone',
          auailable: 'Dec 22 at 14:44pm',
          until: 'Dec 22 at 14:44pm',
        }, {
          due: 'Dec1',
          every: 'Everyone',
          auailable: 'Dec 22 at 14:44pm',
          until: 'Dec 22 at 14:44pm',
        }],
        multipleSelection: [],
        value1: null,
        tableData3: [{
          date: '2016-05-0-032016-05-032016-05-03016-05-03',
          pts: '2pts'
        }, {
          date: '2016-05-02',
          pts: '2pts'
        }, {
          date: '2016-05-04',
          pts: '2pts'
        }, {
          date: '2016-05-01',
          pts: '2pts'
        }, {
          date: '2016-05-08',
          pts: '2pts'
        }, {
          date: '2016-05-06',
          pts: '2pts'
        }, {
          date: '2016-05-07',
          pts: '2pts'
        }],
        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        radio: '1',
        formLabelWidth: '28%',
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
        },
        editDynamicValidateForm: {
          domains: [{
            value: ''
          }],
        },
        dialogVisibleOutline: false,
        options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '3'
        }, {
          value: '选项4',
          label: '4'
        }, {
          value: '选项5',
          label: '5'
        }],
        value: '',
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        value5: [],

        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

      }

    },
    components: {
      'v-goTop': goTop,
    },
    watch: {
      watchTitle(newName, oldName) {
        let param = {
          courseId: this.courseId,
          pageSize: 1000
        };
        this.$http.get(`${process.env.NODE_ENV}/quiz/pageList`, {params: param})
          .then((res) => {
            if (res.data.code == 200) {
              this.practiceQuizList = [];
              this.gradedQuizList = [];
              this.surveyList = [];
              this.showQuizInforList = res.data.entity.list;
              this.showQuizInforList.forEach((e) => {
                if (e.type == 1) {
                  this.practiceQuizList.push(e);
                } else if (e.type == 2) {
                  this.gradedQuizList.push(e);
                } else if (e.type == 3) {
                  this.surveyList.push(e);
                }
              })
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      }
    },
    computed: {
      ...mapGetters(['userInfoData']),
    },
    mounted() {
      this.quizInforList();
    },
    methods: {
      /*showQuize: function () {
        this.isyincang = false;
        this.xianshi = true;
        this.quizzesPublish = false;
        this.quizzesStarted = false;
        this.quizzesSubmit = false;
      },*/
      originalPage: function () {
        this.isyincang = true;
        this.xianshi = false;
        this.quizzesPublish = false;
        this.quizzesStarted = false;
        this.quizzesSubmit = false;
        eventBus.$emit('originalPage');
      },
      startedQuizzes: function () {
        this.isyincang = false;
        this.xianshi = false;
        this.quizzesPublish = false;
        this.quizzesStarted = true;
        this.quizzesSubmit = false;
        this.takeTheQuizNext = false;
        this.takeTheQuizAgain = true;
      },
      startedQuizzesNext: function () {
        this.isyincang = false;
        this.xianshi = false;
        this.quizzesPublish = false;
        this.quizzesStarted = true;
        this.quizzesSubmit = false;
        this.takeTheQuizNext = true;
        this.takeTheQuizAgain = false;
      },
      submitQuizzes: function () {
        this.isyincang = false;
        this.xianshi = false;
        this.quizzesPublish = false;
        this.quizzesStarted = false;
        this.quizzesSubmit = true;
      },
      removeDomain(item) {

        var index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      editRemoveDomain(item) {
        var index = this.editDynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.editDynamicValidateForm.domains.splice(index, 1)
        }
      },
      editAddDomain() {
        this.editDynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      outline() {

      },
      handleNodeClick(data) {
        console.log(data);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      quizInforList: function () {
        let param = {
          courseId: this.courseId,
          pageSize: 1000
        };
        this.$http.get(`${process.env.NODE_ENV}/quiz/pageList`, {params: param})
          .then((res) => {
            if (res.data.code == 200) {
              this.practiceQuizList = [];
              this.gradedQuizList = [];
              this.surveyList = [];
              this.showQuizInforList = res.data.entity.list;
              this.showQuizInforList.forEach((e) => {
                if (e.type == 1) {
                  this.practiceQuizList.push(e);
                } else if (e.type == 2) {
                  this.gradedQuizList.push(e);
                } else if (e.type == 3) {
                  this.surveyList.push(e);
                }
              })
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      },
      /**
       * search搜索
       */
      searchTitle() {
        let that = this;
        this.t
        clearTimeout(that.t)
        this.t = setTimeout(() => {
          that.$http.get(`${process.env.NODE_ENV}/quiz/pageList`,
            {params: {'courseId':that.courseId, 'pageSize': 1000, 'title': that.watchTitle}})
            .then((res) => {
              that.practiceQuizList = [];
              that.gradedQuizList = [];
              that.surveyList = [];
              that.showQuizInforList = res.data.entity.list;
              that.showQuizInforList.forEach((e) => {
                if (e.type == 1) {
                  that.practiceQuizList.push(e);
                } else if (e.type == 2) {
                  that.gradedQuizList.push(e);
                } else if (e.type == 3) {
                  that.surveyList.push(e);
                }
              })
            })
        }, 100)
      },
      QQpracticeQuizList() {
        this.TeacherQuizList = !this.TeacherQuizList;
      },
      QQsurveyQuizList() {
        this.TeachersurveyList = !this.TeachersurveyList;
      },
      QQgradedQuizList() {
        this.TeachergradedQuizList = !this.TeachergradedQuizList;
      },


      showQuize: function (id) {
        this.$http.get(`${process.env.NODE_ENV}/quizInfor/get?data=${id}`,)
          .then((res) => {
            if (res.data.code == 200) {
              this.datas = res.data.entity.id;
              this.isyincang = false;
              this.xianshi = true;
              this.quizzesPublish = false;
              this.quizzesStarted = false;
              this.quizzesSubmit = false;
              this.quizInfoGetList = res.data.entity;
              this.HistoryQuery();
              this.quizItemOpen();
              // this.minutes=res.data.entity.limitTime;
              this.quizInfoGetTaba = res.data.entity.assigns;
              this.quizInfoGetTaba = this.quizInfoGetTaba.map(el => {
                if (el.assignType == 1) {
                  el.typeName = 'everyone'
                } else if (el.assignType == 2) {
                  el.typeName = '班级'
                } else if (el.assignType == 3) {
                  el.typeName = '班级'
                }
                let tempObj = {
                  limitTime: '',
                  endTime: '',
                  startTime: ''
                };
                el = Object.assign(tempObj, el)
                return el
              });
              for (let i = 0; i < this.quizInfoGetTaba.length; i++) {
                let tempItem = this.quizInfoGetTaba[i];
                tempItem.limitTime = tempItem.limitTime.length == 0 ? '— —' : formatDate(new Date(tempItem.limitTime), 'yyyy-MM-dd hh:mm:ss');
                tempItem.startTime = tempItem.startTime.length == 0 ? '— —' : formatDate(new Date(tempItem.startTime), 'yyyy-MM-dd hh:mm:ss');
                tempItem.endTime = tempItem.endTime.length == 0 ? '— —' : formatDate(new Date(tempItem.endTime), 'yyyy-MM-dd hh:mm:ss');
              }
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      },

      /**
       * 点击测验题触发，查看学生能否答题
       **/
      quizItemOpen: function () {
        let studentRights = {
          id: this.datas
        };
        this.$http.post(`${process.env.NODE_ENV}/quizItem/open/edit`, studentRights)
          .then((res) => {
            if (res.data.code == 200) {
              this.studentShowQuizz = res.data.message;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      },

      /**
       * 点击Take the Quiz Again按钮触发
       * 触发此事件，添加一条答题记录
       * 测验答题记录添加
       **/
      startedQuizzes: function () {
        let myDate = new Date();
        let quizRecord = {
          quizId: this.datas,
          quizVersion: 1,
          isSubmit: 0,
          isLastTime: 0,
          startTime: myDate,
          submitTime: myDate,
          dueTime: myDate,
          testerId: this.userInfoData.id,
        };
        this.$http.post(`${process.env.NODE_ENV}/quizRecord/add`, quizRecord)
          .then((res) => {
            if (res.data.code == 200) {
              this.quizRecordId = res.data.message;
              this.isyincang = false;
              this.xianshi = false;
              this.quizzesPublish = false;
              this.quizzesStarted = true;
              this.quizzesSubmit = false;
              this.takeTheQuizNext = false;
              this.takeTheQuizAgain = true;
              this.quizItem();
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      },
      /**
       * 点击Take the Quiz Again按钮触发，展示每一道题
       * 测验问题项列表
       **/
      quizItem() {
        let param = {
          quizRecordId: this.quizRecordId,
        };
        this.$http.get(`${process.env.NODE_ENV}/quizQuestionTestRecord/list`, {params: param})
          .then((res) => {
            if (res.data.code == 200) {
              this.quizItemList = res.data.entity;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      }
      ,
      /**
       * 答题历史记录 表格
       * **/
      HistoryQuery() {
        let param = {
          quizId: this.datas,
        };
        this.$http.get(`${process.env.NODE_ENV}/quizRecord/list`, {params: param})
          .then((res) => {
            if (res.data.code == 200) {
              this.quizRecordlist = res.data.entity;
              this.quizRecordlist = this.quizRecordlist.map(el => {
                if (el.assignType == 1) {
                  el.typeName = 'everyone'
                } else if (el.assignType == 2) {
                  el.typeName = '班级'
                } else if (el.assignType == 3) {
                  el.typeName = '班级'
                }
                let tempObj = {
                  dueTime: '',
                  submitTime: '',
                  startTime: ''
                };
                el = Object.assign(tempObj, el)
                return el
              });
              for (let i = 0; i < this.quizRecordlist.length; i++) {
                let tempItem = this.quizRecordlist[i];
                tempItem.dueTime = tempItem.dueTime.length == 0 ? '— —' : formatDate(new Date(tempItem.dueTime), 'yyyy-MM-dd hh:mm:ss');
                tempItem.startTime = tempItem.startTime.length == 0 ? '— —' : formatDate(new Date(tempItem.startTime), 'yyyy-MM-dd hh:mm:ss');
                tempItem.submitTime = tempItem.submitTime.length == 0 ? '— —' : formatDate(new Date(tempItem.submitTime), 'yyyy-MM-dd hh:mm:ss');
              }
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      },
      /**
       * 显示正误
       * **/
      goReply: function () {
        let studentRights = {
          id: this.datas
        };
        this.$http.post(`${process.env.NODE_ENV}/quizItem/show/edit`, studentRights)
          .then((res) => {
            if (res.data.code == 200) {
              this.displayError = res.data.message;
              this.isyincang = false;
              this.xianshi = false;
              this.quizzesPublish = false;
              this.quizzesStarted = false;
              this.quizzesSubmit = true;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped="">

  .importIntoCourse {
    margin-top: 4%;
  }

  .el-button el-button--info {
    width: 50%;
  }

  .el-button-group .el-button--primary:last-child, .el-button-group .el-button--info:first-child {
    width: 50%;
  }

  .elradio-select .el-radio {
    width: 70%;
    margin: 2% 0;
  }

  .studentRequirements .el-radio {
    width: 70%;
    margin: 2% 0;
  }

  .modules-list {
    border: 1px solid #ccc;
    clear: both;
    /*margin-left: 2%;*/
  }

  .modules-group {
    border-bottom: 1px dashed #a5afb5;
    padding: 2%;
  }

  .module-heard {
    border-bottom: none;
    margin-bottom: 3%;
    position: relative;
  }

  .modules-row {
    position: relative;
    /*padding: 2%;*/
    padding: 1% 2% 1% 2%;
    box-sizing: border-box;
    border-radius: 3px;
    color: #394b58;
    border: 1px solid #c7cdd1;
    border-top: none;
    border-bottom: none;
  }

  .content {
    border-radius: 3px;
    border-top: 1px solid #c7cdd1;
  }

  h6 {
    width: 50%;
    padding-left: 140px;
    color: #999999
  }

  .moduleSpread ul li {
    width: 180px;
    margin-top: 8px;
  }

  img {
    vertical-align: middle;
    padding-right: 1%;
  }

  .drag {
    cursor: move;
  }

  /*summary-Quizzes*/
  .summary-Quizzes {
    width: 1000px;
    display: inline-block;

  }

  .quizzes-search {
    display: inline-block;
    padding-left: 2%;
    margin-bottom: 1%;
  }

  .quizeLeft {
    display: inline-block;
    width: 70%;
  }

  /*students*/
  .question_unit {
    border: 1px solid #ccc;
    padding: 2%;
    margin-bottom: 4%;
  }

  .unit_again {
    border: 1px solid #ccc;
    border-radius: 4px;

  }

  .quizeLeft_button {
    text-align: center;
    padding-top: 2%;
  }

  .unit_again ul {
    border-bottom: 1px solid #ccc;
  }

  .unit_again ul li h4 {
    display: inline-block;
    padding-right: 4px;
  }

  .unit_again ul li span {
    padding-right: 2px;
  }

  .unit_again ul li {
    padding: 1% 0% 1% 2%;
    display: inline-block;
  }

  .question_unit .caution {
    border: 1px solid #f13026;
    color: #f13026;
    padding: 1%;
    margin: 1%;
    border-radius: 4px;
    background-color: #fef7f6;
    font-family: 'Microsoft Yahei', sans-serif, arial;
  }

  .quizeLeft_init {
    height: 50px;
    margin-bottom: 2%;
    padding: 2%;
  }

  .quizzesPublish-left {
    display: inline-block;
    width: 70%;
  }

  .quizzesPublish-right {
    float: right;
    padding-right: 2%;
    height: 100%;
    width: 26%;
  }

  .quizeRight {
    float: right;
    padding-right: 1%;
    height: 100%;
    width: 26%;
  }

  .quizeRight p {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4%;
  }

  /*----------quizzes-select------------*/

  .quizzes-install {
    color: #606266;
    margin: 0 2%;
  }

  .multiple-attempts .attempts-keep {
    padding: 2%;
  }

  .quizzesTest p {
    margin: 2% 0 3% 0;
  }

  /*quizzesPreview*/
  .quizzesPreview {
    clear: both;
    /*padding: 2%;*/
    margin: 7% 1% 1% 1%;
    border-radius: 4px;
    box-shadow: 0 0 6px -1px #00000075;
  }

  .quizzes-time {
    padding-left: 3%;
  }

  .quizzes-time ul li {
    display: inline-block;
    padding: 0 1%;
  }

  .quizInfo ul {
    padding-bottom: 2%;
    border-bottom: 1px solid #ccc;
  }

  .quizInfo ul li h5 {
    display: inline-block;
    text-align: right;
    width: 30%;
  }

  .quizInfo ul li span {
    display: inline-block;
    width: 30%;
    text-align: left;
    margin-left: 4%;
    margin-top: 2%;
  }

  .quizzes-info {
    border: 1px solid #ccc;
    border-radius: 4px;
    /*margin: 4%;*/
    margin: 2% 4%;
  }

  .quizzes-right {
    text-align: left;
    padding-left: 24%;
  }

  .quizzes-score {
    padding: 2% 2% 0 2%;
  }

  .quizzes-question {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 4%;
    position: relative;
  }

  .quizzes-question h5 {
    display: inline-block;
    padding: 1% 0 1% 2%;
  }

  .quizzes-question span {
    float: right;
    padding: 1%;
    color: #999999;
  }

  .quizzes-question ul {
    font-weight: 600;
    padding-left: 6%;
    padding-top: 1%;
    padding-bottom: 2%;
    border-top: 1px solid #ccc;
  }

  .quizzes-question ul li {
    padding-top: 1%;
  }

  .quizzes-question ul li img {
    position: absolute;
    left: -7%;
  }

  /*开始测试*/
  .quizzesPreviewStarted {
    display: inline-block;
    width: 68%;
    clear: both;
    padding: 2%;
    margin: 1%;
    border-radius: 4px;
    box-shadow: 0 0 6px -1px #00000075;
  }

  .quizzesStarted-right {
    float: right;
    padding-right: 2%;
    height: 100%;
    width: 22%;
  }

  .quizzesPreviewStarted .caution {
    border: 1px solid #f13026;
    color: #f13026;
    padding: 1%;
    border-radius: 4px;
    background-color: #fef7f6;
    font-family: 'Microsoft Yahei', sans-serif, arial;
  }

  .quizzesStartTime {
    padding: 1% 0;
  }

  .quizzesStartTime h4 {
    display: inline-block;
    width: 22%;
    text-align: right;
  }

  .quizzesStartTime span {
    display: inline-block;
    padding-left: 2%;
    color: #666666;
    text-align: left;
  }

  .quizzes-started {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 2% 1%;;
    position: relative;
  }

  .quizzes-started h5 {
    display: inline-block;
    padding: 1% 0 1% 4%;
  }

  .quizzes-started span {
    float: right;
    padding: 1%;
    color: #999999;
  }

  .quizzes-started ul {
    font-weight: 600;
    padding-left: 6%;
    padding-top: 1%;
    padding-bottom: 2%;
    border-top: 1px solid #ccc;
  }

  .quizzes-started ul li {
    padding-top: 1%;
  }

  .quizzes-started ul li span {
    float: left;
  }

  .biaoji {
    display: inline-block;
    position: absolute;
    left: 14px;
    padding-top: 6px;
  }

  /* .keepQuestions {
     padding-top: 6%;
   }*/

  .keepQuestions ul li span {
    margin-left: 8%;
    display: inline-block;
    margin-top: 4%;
    color: #0138b1;
    cursor: pointer;
    border-bottom: 1px solid #0138b1;
  }

  .started-choose {
    display: inline-block;
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .question-select {
    display: inline-block;
    width: 48%;
    margin-bottom: 2%;
  }

  .quizzesPreviewSubmit .caution {
    border: 1px solid #f13026;
    color: #f13026;
    padding: 1%;
    border-radius: 4px;
    background-color: #fef7f6;
    font-family: 'Microsoft Yahei', sans-serif, arial;
  }

  .quizzesPreviewSubmit {
    clear: both;
    padding: 2%;
    margin: 1%;
    border-radius: 4px;
    box-shadow: 0 0 6px -1px #00000075;
  }

  .submissionDtails ul li {
    padding-bottom: 2%;
  }

  .submissionDtails ul li .some {
    color: #f17e26;
  }

  .submissionDtails ul li .preview {
    color: #0138b1;
    display: inline-block;
    border-bottom: 1px solid #0138b1;
    cursor: pointer;
  }
</style>
