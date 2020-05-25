// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      nickname: "蓝小鲸",
      studentID: "181250000",
      gender: 0, // 未知为0，男为1，女为2
      avatarUrl: "/images/defaultAvatar.png",
      description: "本人尚未添加描述哦~",
      phoneNumber: "12312341234",
      emailAddress: "123@mail.com",
    }
  },

  changeInformation: function (e) {
    wx.setStorage({
      data: this.data.user,
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
        'user.nickname': inf.nickname,
        'user.gender': inf.gender,
        'user.avatarUrl': inf.avatarUrl,
        'user.description': inf.description,
        'user.phoneNumber': inf.phoneNumber,
        'user.emailAddress': inf.emailAddress
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