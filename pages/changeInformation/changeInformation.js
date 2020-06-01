// pages/changeInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    user_sno:'',
    user_name: '',
    face_url: '',
    description: '',
    phone: '',
    mailbox: '',
    password:''
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
        //上传到阿里云，文件名为“时间戳.png”
        var timestamp = (new Date()).valueOf();
        wx.uploadFile({
          url: 'http://miniprogram-pics.oss-cn-shenzhen.aliyuncs.com', 
          filePath: img[0],
          name: 'file',
          formData: {
            name: img[0],
            key: 'user_face/' + that.data.user_id + ':' + timestamp + '.png',
            policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0xMC0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
            OSSAccessKeyId: 'LTAI4G5zrEQzsX5M4fYT6Da9',
            signature: '+DV768i89SMU2elNB5+uyDp0gNI=',
            success_action_status: "200"
          },
          success: function (res) {
            console.log("上传成功")
            that.setData({
              face_url: 'https://miniprogram-pics.oss-cn-shenzhen.aliyuncs.com/user_face/'+ that.data.user_id + ':' + timestamp + '.png'
            })
            wx.hideLoading()
          }
        })
      }
    })
  },

  // 修改昵称
  bindChangeNickname: function (e) {
    this.setData({
      user_name: e.detail.value
    })

  },

  // 修改简介
  bindDescriptionChange: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  // 修改绑定的手机号
  bindChangePhoneNumber: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 修改绑定的邮箱
  bindChangeEmailAddress: function (e) {
    this.setData({
      mailbox: e.detail.value
    })
  },

  // 保存修改
  saveChanges: function () {
    var that=this
    console.log(that.data)
    wx.showLoading({title: '保存中'})
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/User/update_user', //接口地址
      data: {
        user_sno:that.data.user_sno,
        user_id:that.data.user_id,
        user_name:that.data.user_name,
        phone:that.data.phone,
        face_url:that.data.face_url,
        mailbox:that.data.mailbox,
        description:that.data.description,
        password:that.data.password
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
          getApp().globalData.user=res.data.data
          console.log(res.data.data)
          wx.showModal({
            title: '提示！',
            content: '保存成功',
            showCancel:false,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
             
            },
            complete:function(res){
              wx.switchTab({
                url: '/pages/information/information',
              })
            }
          })
        }
      },
      fail:function(res){
        wx.hideLoading();
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inf = getApp().globalData.user;
    if (inf) {
      this.setData({
        user_id: inf.user_id,
        user_sno: inf.user_sno,
        user_name: inf.user_name,
        face_url: inf.face_url,
        description: inf.description,
        phone: inf.phone,
        mailbox: inf.mailbox,
        password: inf.password,
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