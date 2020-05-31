// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "",
    user_id: "",
    user_sno: "",
    face_url: "",
    description: "",
    phone: "",
    mailbox: "",
  },

  changeInformation: function (e) {
    wx.navigateTo({
      url: '/pages/changeInformation/changeInformation',
    })
  },

  checkHistory: function (e) {
    wx.switchTab({
      url: '/pages/history/history',
    })
  },
  logout:function(){
      wx.redirectTo({
        url: '/pages/login/login',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var inf = getApp().globalData.user;
    if (inf) {
      this.setData({
        user_name: inf.user_name,
        user_sno: inf.user_sno,
        face_url: inf.face_url,
        description: inf.description,
        phone: inf.phone,
        mailbox: inf.mailbox
      })
    }
  }
})