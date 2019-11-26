var lastid = "";
var recordIndex = 0;

const quizAnswer = {
  quizQuestionRecordList: [], //问题记录列表对象

  /**
   * 功能：组装学生答题信息
   *
   * @param id   问题id
   * @param optionid  选项id 【只有单选题、匹配题、多选题、是非题需要该项id；注：匹配题需要传2个id，一个题干的id和选择项的id】
   * @param reply     回答内容 【只有简单题需要传入该项值】
   */
  quizQuestionRecordAnswerDto(id, optionids, reply) {
    var result = null;
    if (lastid != id)//说明是新题
    {
      if (lastid != "") {
        //把数据更新到后台，对应更新答题记录的id是lastid
        result = quizAnswer.quizQuestionRecordList[recordIndex];
      }
      lastid = id;
      //获取当前需要更新问题的全部信息
      recordIndex = quizAnswer.getQuestionRecord(id);
      if (recordIndex == null) {
        lastid = "";
        return result;
      }

    }
    if(id==0)
    {
      return result;
    }

    if (quizAnswer.quizQuestionRecordList[recordIndex].type == 1 || quizAnswer.quizQuestionRecordList[recordIndex].type == 3)//单选、判断题，这两种题属于同一类型题
    {
      var optionIndex = quizAnswer.getOptionRecord(quizAnswer.quizQuestionRecordList[recordIndex].options, optionids[0]);
      quizAnswer.quizQuestionRecordList[recordIndex].options[optionIndex].isChoice = 1;
    }
    else if (quizAnswer.quizQuestionRecordList[recordIndex].type == 2)//多选题

    {
      var len = optionids.length;
      for (var i = 0; i < len; i++) {
        var optionIndex = quizAnswer.getOptionRecord(quizAnswer.quizQuestionRecordList[recordIndex].options, optionids[i]);
        quizAnswer.quizQuestionRecordList[recordIndex].options[optionIndex].isChoice = 1;
      }

    }
    else if (quizAnswer.quizQuestionRecordList[recordIndex].type == 5)//匹配题
    {

    }
    else if (quizAnswer.quizQuestionRecordList[recordIndex].type == 6)//简答题
    {
      quizAnswer.quizQuestionRecordList[recordIndex].reply.reply = reply;
    }

    return result;
  },
  /**
   * 功能：查找当前答题的问题对象
   * @param quizQuestionRecordList
   * @param id
   * @returns {*}
   */
  getQuestionRecord(id) {
    var totalquizQuestionRecord = quizAnswer.quizQuestionRecordList.length;
    for (var i = 0; i < totalquizQuestionRecord; i++) {
      if (id == quizAnswer.quizQuestionRecordList[i].id) {
        return i;
      }
    }
    return null;
  },
  /**
   * 功能：获取要更新的选项信息
   * @param OptionRecordList
   * @param id
   */
  getOptionRecord(OptionRecordList, id) {
    var totalOptionRecord = OptionRecordList.length;
    for (var i = 0; i < totalOptionRecord; i++) {
      if (id == OptionRecordList[i].id) {
        return i;
      }
    }
    return null;
  }


}
export default quizAnswer
