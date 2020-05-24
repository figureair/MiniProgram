// pages/amendActInfor/amendActInfor.js
//author: zzn
//submit()函数待补充

var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseEnd: false,//是否选择结束。页面数据，不需保存
    status: '进行中',//活动状态，‘进行中’或‘已结束’
    poster: '',//海报链接
    actname: '',//活动名
    startDate: '',//开始年月日,格式yyyy-mm-dd
    startTime: '',//开始时分,格式hh:mm
    endDate: '',
    endTime: '',
    target: '',//目标人群
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

  //选择结束
  cancel: function(e){
    this.setData({
      chooseEnd: ! this.data.chooseEnd,
    })
  },

  //获取用户输入的活动名称
  actnameInput: function(e){
    this.data.actname = e.detail.value 
  },

  //获取用户输入的活动面向对象
  targetInput: function(e){
    this.data.target = e.detail.value 
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
        that.setData({
          poster: img[0]
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

  //点击保存修改，提交
  submit : function(e){
    var that = this
    //是否结束活动
    if(this.data.chooseEnd == true){
      wx.showModal({
        title: '确认结束活动？',
        content: '结束的活动将不在活动公布栏中展示，且本次修改的其他信息不生效',
        cancelText: '再想想',
        cancelColor: '#6E6E6E',
        confirmText: '是的！',
        confirmColor: '#71CD63',
        success : function(res){
          if(res.confirm){
            wx.showLoading({title: '结束中'})
            that.setData({status: '已结束'})
            //此处待补充，将结束信息发送给服务器
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({title: '结束成功',icon: 'success',duration: 1000})
            }, 2000)
          }
        }
      })
    }
    //不结束活动
    else{
      //检查是否遗漏输入
      if(this.data.poster == ''){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '忘了上传海报哦~'
        })
        return
      }
      else if(this.data.actname == ''){
        console.log(this.data.actname);
        
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '忘了输入活动名称哦~'
        })
        return
      }
      else if(this.data.target == ''){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '忘了输入活动面向对象哦~'
        })
        return
      }
      //检查时间正确性
      var systime = util.formatTime(new Date())
      var sdt = this.data.startDate+' '+this.data.startTime
      var edt = this.data.endDate+' '+this.data.endTime
      if(! this.isCorrectTime(systime,sdt)){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '活动时间选择错误哦，请确保开始时间不早于当前时间~'
        })
        return
      }
      else if(! this.isCorrectTime(systime,edt)){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '活动时间选择错误哦，请确保结束时间不早于当前时间~'
        })
        return
      }
      else if(! this.isCorrectTime(sdt,edt)){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '活动时间选择错误哦，请确保结束时间不早于开始时间~'
        })
        return
      }
      
      //询问是否确认提交并做处理
      wx.showModal({
        title: '确认',
        content: '确认修改活动信息？',
        cancelText: '再想想',
        cancelColor: '#6E6E6E',
        confirmText: '是的！',
        confirmColor: '#71CD63',
        success (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '修改中'
            })
            //此处待补充，将报名者信息发送给服务器
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1000
              })
            }, 2000)
          }
        }
      })
    }
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