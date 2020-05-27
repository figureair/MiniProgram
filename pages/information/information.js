// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "蓝小鲸",
    user_id: "181250000",
    face_url: "/images/defaultAvatar.png",
    description: "本人尚未添加描述哦~",
    phone: "12312341234",
    mailbox: "123@mail.com",
  },

  changeInformation: function (e) {
    wx.setStorage({
      data: this.data,
      key: 'rawInf',
    })
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
    var inf = wx.getStorageSync('newInf');
    if (inf) {
      this.setData({
        user_name: inf.user_name,
        face_url: inf.face_url,
        description: inf.description,
        phone: inf.phone,
        mailbox: inf.mailbox
      })
    }
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