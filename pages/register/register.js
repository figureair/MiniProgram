Page({

  /**
   * 页面的初始数据
   */
  data: {
    sno:'',
    phone:'',
    password:'',
    confirm:''
  },
  snoinput(e){
    this.data.sno=e.detail.value;
  },
  phoneinput(e){
    this.data.phone=e.detail.value;
  },
  passwordinput(e){
    this.data.password=e.detail.value;
  },
  confirminput(e){
    this.data.confirm=e.detail.value;
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
  submit: function(e){
    if(this.data.sno.length!=9||this.data.sno[0]!=1){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '学号格式不对哦~'
      })
      return
    }
    if(this.data.phone.length!=11||this.data.phone[0]!=1){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '电话号码格式不对哦~'
      })
      return
    }
    if(this.data.password!=this.data.confirm){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '两次输入密码不一致哦~'
      })
      return
    }

    wx.showLoading({
      title: '注册中...',
    })
    console.log(e);
    this.setData({ disabled: true});console.log(this.data.phone);
    wx.request({
      url: '', //接口地址
      data: {
        sno: this.data.sno,
        phone:this.data.phone,
        password: this.data.password,
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {//request success 
          if (res.data.error == true) {
            wx.showToast({//信息错误 
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.setStorageSync('student', res.data.data);
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(res){
            wx.redirectTo({
         url: '/pages/login/login',
    })
      }
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

  }
})