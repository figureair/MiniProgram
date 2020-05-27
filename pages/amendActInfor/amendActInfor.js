// pages/amendActInfor/amendActInfor.js
//author: zzn
//submit(),end(),cancel(),handlesubmit()函数待补充

var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'1',
    chooseEnd: false,//是否选择结束。页面数据，不需保存
    chooseCancel: false,//是否选择取消活动。页面数据，不需保存
    state: 1,//活动状态，1 为进行中，2 为已完成，3为加急，4为取消
    poster: '',//海报链接
    actname: '123',//活动名
    startDate: '2020-05-29',//开始年月日,格式yyyy-mm-dd
    startTime: '23:00',//开始时分,格式hh:mm
    endDate: '2020-06-16',
    endTime: '23:00',
    target: '所有本科生',//目标人群
    user_id:'1',
    user_face:'',
    user_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/find_activity', //接口地址
      data: {
        activity_id: that.activity_id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        if(res.data.error_code != 0){
          wx.showModal({
            title: '提示！',
            content: res.data.msg,
            showCancel:false,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
            },
          })
        }
        else{
          console.log(res.data)
          that.setData({
            activity_id:res.data.data.activity_id,
            actname:res.data.data.activity_name,
            state:res.data.data.state,
            poster:res.data.data.picture,
            startDate:res.data.data.starttime.substr(0,10),
            startTime:res.data.data.starttime.substr(11,5),
            endDate:res.data.data.endtime.substr(0,10),
            endTime:res.data.data.endtime.substr(11,5),
            target:res.data.data.audience,
            user_name:res.data.data.user_name,
            user_id:res.data.data.user_id,
            user_face:res.data.data.user_face
          })
        }
      },
      fail:function(res){
        wx.showModal({
          title: '提示！',
          content: '亲，网络不好哦',
          showCancel:false,
          success: function(res){
            if(res.confirm) console.log('用户选择确定')
          },
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  //选择状态，注:此处不改变活动的state，只改变选中的按钮，在提交修改submit()中才修改活动state
  changeState: function(e){
    var totype = e.currentTarget.dataset.totype
    if(totype == 'end'){
      this.setData({ 
        chooseEnd: true,
        chooseCancel: false,
        chooseUrgent: false
      })
    }
    else if(totype == 'cancel'){
      this.setData({ 
        chooseEnd: false,
        chooseCancel: true,
        chooseUrgent: false
      })
    }
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

  //获取用户输入的活动名称
  actnameInput: function(e){
    this.data.actname = e.detail.value 
  },

  //获取用户输入的活动面向对象
  targetInput: function(e){
    this.data.target = e.detail.value 
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

  //点击保存修改
  clickSubmit : function(e){
    var that = this
    if(this.data.chooseEnd == true){
      this.end()
    }
    else if(this.data.chooseCancel == true){
      this.cancel()
    }
    else {
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
      //用户输入正确，则询问是否确认提交并做处理
      this.handleSubmit()
    }

  },
  
  //submit()的辅助函数，当选中完结（活动状态改为结束）时执行
  end: function(){
    var that = this
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
          that.setData({state: 2})
          //将结束信息发送给服务器
          var startdate=new Date(that.data.startDate+' '+that.data.startTime+':00:000')
          var enddate=new Date(that.data.endDate+' '+that.data.endTime+':00:000')
          var starttime=startdate.valueOf()
          var endtime=enddate.valueOf()
          wx.request({
            url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/update_activity', //接口地址
            data: {
              activity_id:that.data.activity_id,
              activity_name:that.data.actname,
              activity_type:1,
              state:that.data.state,
              starttime:starttime,
              endtime:endtime,
              user_id:that.data.user_id,
              user_face:that.data.user_face,
              user_name:that.data.user_name,
              audience:that.data.target
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' 
            },
            success: function (res) {
              wx.hideLoading();
              if(res.data.error_code != 0){
                wx.showModal({
                  title: '提示！',
                  content: res.data.msg,
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
                  },
                })
              }
              else{
                wx.showModal({
                  title: '提示！',
                  content: '完结成功',
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
                  },
                  complete:function(res){
                    wx.navigateBack()
                  }
                })
              }
            },
            fail:function(res){
              wx.showModal({
                title: '提示！',
                content: '亲，网络不好哦',
                showCancel:false,
                success: function(res){
                  if(res.confirm) console.log('用户选择确定')
                },
              })
            },
            // complete:function(res){
            //   wx.hideLoading(),
            //   wx.navigateBack()
            // }
          })
        }
      }
    })
  },

  //submit()的辅助函数，当选中取消时执行
  cancel: function(){
    var that = this
    wx.showModal({
      title: '确认取消活动？',
      content: '取消的活动将不在活动公布栏中展示，且本次修改的其他信息不生效',
      cancelText: '再想想',
      cancelColor: '#6E6E6E',
      confirmText: '是的！',
      confirmColor: '#71CD63',
      success : function(res){
        if(res.confirm){
          wx.showLoading({title: '取消中'})
          that.setData({state: 4})
          //将取消信息发送给服务器
          var startdate=new Date(that.data.startDate+' '+that.data.startTime+':00:000')
          var enddate=new Date(that.data.endDate+' '+that.data.endTime+':00:000')
          var starttime=startdate.valueOf()
          var endtime=enddate.valueOf()
          wx.request({
            url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/update_activity', //接口地址
            data: {
              activity_id:that.data.activity_id,
              activity_name:that.data.actname,
              activity_type:1,
              state:that.data.state,
              starttime:starttime,
              endtime:endtime,
              user_id:that.data.user_id,
              user_face:that.data.user_face,
              user_name:that.data.user_name,
              audience:that.data.target
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' 
            },
            success: function (res) {
              wx.hideLoading();
              if(res.data.error_code != 0){
                wx.showModal({
                  title: '提示！',
                  content: res.data.msg,
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
                  },
                })
              }
              else{
                wx.showModal({
                  title: '提示！',
                  content: '取消成功',
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
                  },
                  complete:function(res){
                    wx.navigateBack()
                  }
                })
              }
            },
            fail:function(res){
              wx.showModal({
                title: '提示！',
                content: '亲，网络不好哦',
                showCancel:false,
                success: function(res){
                  if(res.confirm) console.log('用户选择确定')
                },
              })
            },
            // complete:function(res){
            //   wx.hideLoading(),
            //   wx.navigateBack()
            // }
          })
        }
      }
    })
  },

  //submit()的辅助函数，当用户确定修改信息时执行
  handleSubmit(){
    var that = this
    wx.showModal({
      title: '确认',
      content: '确认修改活动信息？',
      cancelText: '再想想',
      cancelColor: '#6E6E6E',
      confirmText: '是的！',
      confirmColor: '#71CD63',
      success (res) {
        if (res.confirm) {
          wx.showLoading({title: '修改中'})
          //是否加急
          if(that.data.chooseUrgent){ that.setData({ state: 3 }) }
          //将报名者信息发送给服务器
          var startdate=new Date(that.data.startDate+' '+that.data.startTime+':00:000')
          var enddate=new Date(that.data.endDate+' '+that.data.endTime+':00:000')
          var starttime=startdate.valueOf()
          var endtime=enddate.valueOf()
          wx.request({
            url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/update_activity', //接口地址
            data: {
              activity_id:that.data.activity_id,
              activity_name:that.data.actname,
              activity_type:1,
              state:that.data.state,
              starttime:starttime,
              endtime:endtime,
              user_id:that.data.user_id,
              user_face:that.data.user_face,
              user_name:that.data.user_name,
              audience:that.data.target
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' 
            },
            success: function (res) {
              wx.hideLoading();
              if(res.data.error_code != 0){
                wx.showModal({
                  title: '提示！',
                  content: res.data.msg,
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
                  },
                })
              }
              else{
                wx.showModal({
                  title: '提示！',
                  content: '修改成功',
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
                  },
                  complete:function(res){
                    wx.navigateBack()
                  }
                })
              }
            },
            fail:function(res){
              wx.showModal({
                title: '提示！',
                content: '亲，网络不好哦',
                showCancel:false,
                success: function(res){
                  if(res.confirm) console.log('用户选择确定')
                },
              })
            },
            // complete:function(res){
            //   wx.hideLoading(),
            //   wx.navigateBack()
            // }
          })
        }
      }
    })
  },

  //submit()的辅助函数，给定两个时间t1,t2，若t1在t2之后，返回false ,时间格式为yyyy-mm-dd hh:mm
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