// pages/changeInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      nickname: '蓝小鲸',
      avatarUrl: '/images/defaultAvatar.png',
      description: '本人尚未添加描述哦~',
      phoneNumber: 12312341234,
      emailAddress: '123@mail.com'
    },
  },

  // 修改头像
  changeAvatar: function (e) {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var img = res.tempFilePaths
        that.setData({
          'user.avatarUrl': img[0]
        })
      }
    })
  },

  // 修改昵称
  bindChangeNickname: function (e) {
    this.setData({
      'user.nickname': e.detail.value
    })

  },

  // 修改性别，依据返回的索引
  bindPickerChange: function (e) {
    this.setData({
      'user.gender': e.detail.value
    })
  },

  // 修改简介
  bindDescriptionChange: function (e) {
    this.setData({
      'user.description': e.detail.value
    })
  },

  // 修改绑定的手机号
  bindChangePhoneNumber: function (e) {
    this.setData({
      'user.phoneNumber': e.detail.value
    })
  },

  // 修改绑定的邮箱
  bindChangeEmailAddress: function (e) {
    this.setData({
      'user.emailAddress': e.detail.value
    })
  },

  // 保存修改
  saveChanges: function () {
    wx.setStorage({
      data: this.data.user,
      key: 'newInf',
    })
    wx.switchTab({
      url: '/pages/information/information',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inf = wx.getStorageSync('rawInf');
    if (inf) {
      this.setData({
        'user.nickname': inf.nickname,
        'user.avatarUrl': inf.avatarUrl,
        'user.description': inf.description,
        'user.phoneNumber': inf.phoneNumber,
        'user.emailAddress': inf.emailAddress
      })
    }
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