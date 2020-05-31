// pages/releaseActivities/releaseActivities.js
//author: zzn-lbh
//submit()函数待补充√

var util = require('../../utils/util.js');

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //注：已取消target数据项！！！
    picture: '',
    activity_name: '',
    startDate: '',//开始年月日,格式yyyy-mm-dd
    startTime: '',//开始时分秒,格式hh:mm:ss
    endDate: '',
    endTime: '',
    state: 0,
    startTimeStamp: '',
    endTimeStamp: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var systime = util.formatTime(new Date());//yyyy/mm/dd hh:mm:ss
    //设置默认开始,结束年月日
    var sd = systime.substr(0,4)+'-'+systime.substr(5,2)+'-'+systime.substr(8,2)
    var st = systime.substr(11,2)+':'+systime.substr(14,2)
    var ed = sd
    var et = "23:59"
    this.setData({
      startDate: sd,
      startTime: st,
      endDate: ed,
      endTime: et,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  //获取用户输入的活动名称
  actnameInput: function(e){
    var that=this
    that.setData({
      activity_name: e.detail.value 
    })
  },

  //上传图片
  addPoster: function(e){
    console.log("click");
    
    var that = this
    wx.chooseImage({
      count : 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res){
        var img = res.tempFilePaths//上传图片的url，数组形式
        that.setData({
          picture: img[0]
        })
      }
    })
  },

  //获得输入的开始日期
  bindStartDateChange: function(e){
    var sd = e.detail.value
    this.setData({startDate: sd})
  },
  //获得输入的开始时间
  bindStartTimeChange: function(e){
    var st = e.detail.value
    this.setData({startTime: st})
  },
  //获得输入的结束日期
  bindEndDateChange: function(e){
    var ed = e.detail.value
    this.setData({endDate: ed})
  },
  //获得输入的结束时间
  bindEndTimeChange: function(e){
    var et = e.detail.value
    this.setData({endTime: et})
  },

  //点击飞机，提交并返回
  submit : function(e){
    var that = this
    //检查是否遗漏输入
    if(that.data.picture == ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了上传海报哦~'
      })
      return
    }
    else if(that.data.activity_name == ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入活动名称哦~'
      })
      return
    }

    //检查时间正确性
    var systime = util.formatTime(new Date())
    var sdt = that.data.startDate+' '+that.data.startTime
    var edt = that.data.endDate+' '+that.data.endTime
    if(! that.isCorrectTime(systime,sdt)){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '活动时间选择错误哦，请确保开始时间不早于当前时间~'
      })
      return
    }
    else if(! that.isCorrectTime(systime,edt)){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '活动时间选择错误哦，请确保结束时间不早于当前时间~'
      })
      return
    }
    else if(! that.isCorrectTime(sdt,edt)){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '活动时间选择错误哦，请确保结束时间不早于开始时间~'
      })
      
      if(that.isCorrectTime(that.systime, that.sdt)) that.state=0;//未开始
      else if(that.isCorrectTime(that.systime, that.edt)) that.state=1;//已开始
      else that.state=2;//已结束
      return
    }

    
    var year = this.data.startDate.substr(0, 4);
    var month = this.data.startDate.substr(5,2);
    var day = this.data.startDate.substr(8,2);
    var hour = this.data.startTime.substr(0,2);
    var minute = this.data.startTime.substr(3,2);
    var seconds =this.data.startTime.substr(6,2);
    this.setData({
      startTimeStamp: [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, seconds].map(formatNumber).join(':')
    })
    console.log('startTimeStamp:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(that.data.startTimeStamp)
    var timeTamp = Date.parse(that.data.startTimeStamp);
    console.log('var timeTamp = Date.parse(repTime);')
    console.log(timeTamp)
    that.setData({
      startTimeStamp: timeTamp/1000
    })
        
    var year = this.data.endDate.substr(0, 4);
    var month = this.data.endDate.substr(5,2);
    var day = this.data.endDate.substr(8,2);
    var hour = this.data.endTime.substr(0,2);
    var minute = this.data.endTime.substr(3,2);
    var seconds =this.data.endTime.substr(6,2);
    this.setData({
      endTimeStamp: [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, seconds].map(formatNumber).join(':')
    })
    console.log('endTimeStamp:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(that.data.endTimeStamp)
    var timeTamp = Date.parse(that.data.endTimeStamp);
    console.log('var timeTamp = Date.parse(repTime);')
    console.log(timeTamp)
    that.setData({
      endTimeStamp: timeTamp/1000
    })
    


    that.data['state']=that.state
    //询问是否确认提交并做处理
    wx.showModal({
      title: '确认',
      content: '确认发布活动？',
      cancelText: '再想想',
      cancelColor: '#6E6E6E',
      confirmText: '是的！',
      confirmColor: '#71CD63',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '发布中'
          })
          //console.log(that.data.state)
          //此处待补充，将报名者信息发送给服务器
          wx.request({
            url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/publish_new_activity',
            data: {
              user_id: getApp().globalData.user.user_id,
              activity_name: that.data.activity_name,
              activity_type: 1,
              state: that.data.state,
              starttime: that.data.startTimeStamp,
              endtime: that.data.endTimeStamp,
              place: '',
              reward: '',
              phone: '',
              picture: that.data.picture,
              audience: '',
              other: '',
              user_face: getApp().globalData.user.face_url,
              user_name: getApp().globalData.user.user_name,
            },
            method: "POST",
            header: {
              'content-type': "application/x-www-form-urlencoded"
            },
            success: (res) => {
              if(res.data.error_code != 0){
                wx.showModal({
                  title: '提示！',
                  showCancel:false,
                  content: res.data.msg,
                  success: function(res){
                    if(res.confirm){console.log('用户点击确定')}
                  }
                })
              }else{
                wx.showModal({
                  title: '恭喜',
                  content: '发布成功！',
                  showCancel: false,
                  success(res){},
                  complete: function(res){
                    wx.reLaunch({
                      url: '/pages/activities/activities',
                    })
                  }
                })
              }
            },
            fail: function(res){
              wx.showModal({
                title: '提示！',
                showCancel:false,
                content: '亲，你的网络不好哦',
                success: function(res){
                  if(res.confirm){console.log('用户点击确定')}
                }
              })
            }
          })
        }
      }
    })
  },
  
  //辅助函数，给定两个时间t1,t2，若t1在t2之后，返回false ,时间格式为yyyy-mm-dd hh:mm
  isCorrectTime: function(t1, t2){
    var year1 = t1.substr(0,4)
    var month1 = t1.substr(5,2)
    var day1 = t1.substr(8,2)
    var hour1 = t1.substr(11,2)
    var min1 = t1.substr(14,2)
    var year2 = t2.substr(0,4)
    var month2 = t2.substr(5,2)
    var day2 = t2.substr(8,2)
    var hour2 = t2.substr(11,2)
    var min2 = t2.substr(14,2)
    var isFault = (year1 > year2 
      || year1 == year2 && month1 > month2
      || (year1 == year2 && month1 == month2) && day1 > day2
      || (year1 == year2 && month1 == month2 && day1 == day2) && hour1 > hour2
      || (year1 == year2 && month1 == month2 && day1 == day2 && hour1 == hour2) && min1 > min2)
    return !isFault
  }
})