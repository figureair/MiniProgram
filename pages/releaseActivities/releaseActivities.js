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
    startTime: '',//开始时分秒,格式hh:mm
    endDate: '',
    endTime: '',
    state: 0
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


  //获取用户输入的活动名称
  actnameInput: function(e){
    var that=this
    that.setData({
      activity_name: e.detail.value 
    })
  },

  //上传图片
  addPoster: function(e){
    var that = this
    wx.chooseImage({
      count : 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res){
        var img = res.tempFilePaths//上传图片的url，数组形式
        wx.showLoading({
          title: '上传中',
        })
        //上传到阿里云，文件名为“时间戳.png”
        var timestamp = (new Date()).valueOf();
        wx.uploadFile({
          url: 'http://miniprogram-pics.oss-cn-shenzhen.aliyuncs.com', 
          filePath: img[0],
          name: 'file',
          formData: {
            name: img[0],
            key: 'poster/' + timestamp + '.png',
            policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0xMC0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
            OSSAccessKeyId: 'LTAI4G5zrEQzsX5M4fYT6Da9',
            signature: '+DV768i89SMU2elNB5+uyDp0gNI=',
            success_action_status: "200"
          },
          success: function (res) {
            console.log("上传成功")
            that.setData({
              picture: 'https://miniprogram-pics.oss-cn-shenzhen.aliyuncs.com/poster/' + timestamp + '.png'
            })
            wx.hideLoading()
          }
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
    console.log(that.data)
    var tmpstartDate=that.data.startDate.replace(/-/g,'/')
    var tmpendDate=that.data.endDate.replace(/-/g,'/')
    var startdate=new Date(tmpstartDate+' '+that.data.startTime+':00')
    var enddate=new Date(tmpendDate+' '+that.data.endTime+':00')
    var starttime=startdate.valueOf()/1000
    var endtime=enddate.valueOf()/1000
    console.log(starttime)
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
              state: 1,
              starttime: starttime,
              endtime: endtime,
              picture: that.data.picture,
              user_face: getApp().globalData.user.face_url,
              user_name: getApp().globalData.user.user_name
            },
            method: "POST",
            header: {
              'content-type': "application/x-www-form-urlencoded"
            },
            success: (res) => {
              wx.hideLoading();
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
              wx.hideLoading();
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