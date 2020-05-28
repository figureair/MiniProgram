// pages/actInfor/actInfor.js
//author: zzn
//choose(),cancel()待实现
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    totalchosen: 0,
    people: [
      {
        record_id: 0,
        user_name : '刘峰',
        phone: '13318566749',
        mailbox: '181250001@smail.nju.edu.cn',
        chosen: 1,
      },
      {
        record_id: 0,
        user_name : '特朗普',
        phone: '18918566749',
        mailbox: '181250002@smail.nju.edu.cn',
        chosen: 1,
      },
      {
        record_id: 0,
        user_name : 'Taylor Swift',
        phone: '13318566520',
        mailbox: '1989@gmail.com',
        chosen: 2,
      },
      {
        record_id: 0,
        user_name : '无名',
        phone: '13318566749',
        mailbox: '181250001@smail.nju.edu.cn',
        chosen: 1,
      },
      {
        record_id: 0,
        user_name : '无名',
        phone: '13318566749',
        mailbox: '181250001@smail.nju.edu.cn',
        chosen: 1,
      },
      {
        record_id: 0,
        user_name : '无名',
        phone: '13318566749',
        mailbox: '181250001@smail.nju.edu.cn',
        chosen: 1,
      },
      {
        record_id: 0,
        user_name : '无名',
        phone: '13318566749',
        mailbox: '181250001@smail.nju.edu.cn',
        chosen: 1,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从history传来的活动id
    console.log(options.id);
    
    this.setData({
      activity_id: options.id,
    })
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Record/activity_signup', //接口地址
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
          this.setData({
            data:res.data.data
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var sum=0
    var totalcho = 0
    for(var i =0;i<this.data.people.length;i++){
      sum++
      if(this.data.people[i].chosen==2){
        totalcho+=1
      }
    }
    this.setData({
      total : sum,
      totalchosen : totalcho
    })
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

  },

  //被选定
  choose:function(e){
    var that=this
    var idx = e.currentTarget.dataset.idx
    var chosen = 'people[' + idx + '].chosen'
    //与后端交互
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Record/choose', //接口地址
      data: {
        record_id:that.data.people[idx].record_id
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
          this.setData({
            [chosen] : 2,
            totalchosen : this.data.totalchosen + 1
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

  //取消选定
  cancel: function(e){
    var idx = e.currentTarget.dataset.idx
    var chosen = 'people[' + idx + '].chosen'
    //与后端交互
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Record/choose', //接口地址
      data: {
        record_id:that.data[idx].record_id
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
          this.setData({
            [chosen] : 1,
            totalchosen : this.data.totalchosen - 1
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
  }
})