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
    var that=this
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
    that.setData({ disabled: true});console.log(that.data.phone);
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/User/signup', //接口地址
      data: {
        user_sno: that.data.sno,
        phone:that.data.phone,
        password: that.data.password,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        if(res.data.error_code != 0){
          console.log(res.data)
          wx.showModal({
            title: '提示！',
            content: res.data.msg,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
              else console.log('用户选择取消')
            },
          })
        }
        else{
          getApp().globalData.user=res.data.data
          console.log(getApp().globalData.user)
          wx.showModal({
            title: '恭喜！',
            content: '注册成功',
            showCancel: false,
            success(res){},
            complete: function(res){
              wx.reLaunch({
                url: '/pages/history/history',
              })
            }
          })
        }
      },
      fail:function(res){
        wx.showModal({
          title: '欸~',
          content: '你这网不行啊~',
          success: function(res){
            if(res.confirm) console.log('用户选择确定')
            else console.log('用户选择取消')
          },
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