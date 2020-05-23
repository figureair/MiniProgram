// pages/releaseActivities/releaseActivities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: '',
    actname: '',
    time: '',
    target: '',
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

  //获取用户输入的活动名称
  actnameInput: function(e){
    this.data.actname = e.detail.value 
  },

  //获取用户输入的活动面向对象
  actnameInput: function(e){
    this.data.target = e.detail.value 
  }
})