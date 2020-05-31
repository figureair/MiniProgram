// pages/releaseRecruits/releaseRecruits.js

var util = require('../../utils/util.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

    checks: [
      { name: "普通", value: '0', checked: true},

      { name: "加急", value: '1', checked: false },

    ],
    catename:'',
    cateid:'',
    openid:null,
    display: false,
    show: false,
    show1: false,
    show2: false,
    
    currentDate: new Date().getTime(),//初始日期//时间戳补3位
    currentDate1: new Date().getTime(),//初始日期//时间戳补3位
    //时间-显示赋值
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      else if (type === 'hour') {
        return `${value}时`;
      }
      else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },

    activity_name:'',
    activity_type:'',
    state:'',
    place:'',
    reward:'',
    phone:'',
    other:'',
    startDate: '',//开始年月日,格式yyyy-mm-dd
    startTime: '',//开始时分秒,格式hh:mm:ss
    endDate: '',
    endTime: '',
    startTimeStamp: '',
    endTimeStamp: ''
  },
  //时间-当值变化时触发的事件start
  onInput(event) {
    var newTime = new Date(event.detail);
    if(this.data.show==0){
      newTime =null;
    }else{
      //console.log(event.detail);
      newTime = formatTime(newTime);
    }
    this.setData({
      currentDate: event.detail,
      start_date: newTime,
    });
  },
  
 //状态选择
    clicks: function (e) {
      let index = e.currentTarget.dataset.index;
      let arrs = this.data.checks;
      for (var i=0;i<2;i++)
      { 
        arrs[i].checked=false;
      }
      arrs[index].checked = true;
      if(index==0){
        this.data.state=1;
      }
      if(index==1){
        this.data.state=3;
      }

      this.setData({
        checks: arrs
      })
     
      // console.log(e)
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
  //输入框
  nameinput(e){
    this.data.activity_name=e.detail.value;
  },
  telinput(e){
    this.data.phone=e.detail.value;
  },
  moreinput(e){
    this.data.other=e.detail.value;
  },
  placeinput(e){
    this.data.place=e.detail.value;
  },
  rewordinput(e){
    this.data.reward=e.detail.value;
  },

  /**
   * 提交函数
   */ 
  submit(){  
    var that=this  
    that.data.activity_type=2;
    if(that.data.activity_name==''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入招募名称哦~'
      })
      return
    }
    else if(that.data.place == ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入工作地点哦~'
      })
      return
    }
    else if(that.data.reward== ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入工作报酬哦~'
      })
      return
    }
    else if(that.data.phone == ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入工作联系方式哦~'
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
      return
    }
    var is_urgent=false;
    if(that.status=="加急") var is_urgent=true;

    var toreleaserecruit={
      state : that.data.state,
      activity_name : that.data.activity_name,
      activity_type:that.data.activity_type,
      startDate:that.data.startDate,
      endDate:that.data.endDate,
      startTime:that.data.startTime,
      endTime:that.data.endTime,
      place : that.data.place,
      reward : that.data.reward,
      phone : that.data.phone,
      other : that.data.other,
    
    }
   
    console.log(toreleaserecruit);
    //{toreleaserecruit}传到后端  与后端交互
    wx.showLoading({
    title: '发布中...',
    })


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
    

    console.log('that.data------------------------')
    getApp().globalData.activity_data={}
    getApp().globalData.activity_data=toreleaserecruit
    console.log(getApp().globalData.activity_data)

    console.log('sdt, edt')
    console.log(sdt)
    console.log(edt)

    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/publish_new_activity',
      data: {
        user_id: getApp().globalData.userInfo.user_id,
        activity_name: getApp().globalData.activity_data.activity_name,
        activity_type: 2,
        state: getApp().globalData.activity_data.state,
        starttime: that.data.startTimeStamp,
        endtime: that.data.endTimeStamp,
        place: getApp().globalData.activity_data.place,
        reward: getApp().globalData.activity_data.reward,
        phone: getApp().globalData.activity_data.phone,
        picture: '',
        audience: '',
        other: getApp().globalData.activity_data.other,
        user_name: getApp().globalData.user.user_name,
        user_face: getApp().globalData.user.face_url,
      },
      method: "POST",
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log('res.data*************************************')
        console.log(res.data)
        if(res.data.error_code != 0){
          wx.showModal({
            title: '提示！',
            content: res.data.msg,
            success: function(res){
              if(res.confirm){console.log('用户点击确定')}
              else{console.log('用户点击取消')}
            }
          })
        }else{
          getApp.globalData.user=res.data.data,
          wx.showModal({
            title: '恭喜',
            content: '发布成功！',
            showCancel: false,
            success(res){},
            complete: function(res){
              wx.reLaunch({
                url: '/pages/recruit/recruit',
              })
            }
          })
        }
      },
      fail: (res) =>{
        wx.showModal({
          title: '欸~',
          content: '网络不在状态',
          success: function(res){
            if(res.confirm){console.log('用户点击确定')}
            else{console.log('用户点击取消')}
          }
        })
      },
      complete: (res) => {
        wx.hideLoading()
      }
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1000
      })
    }, 2000)

    try {
      wx.setStorageSync('toreleaserecuit1',toreleaserecruit);
    } 
    catch (e) { console.log("what")}
    wx.switchTab({
      url: '/pages/recruit/recruit'
    })
    wx.hideLoading({
      complete: (res) => {'发布中...'},
    })
  },
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})