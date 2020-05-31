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
    that.setData({ disabled: true});
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
        wx.hideLoading();
        if(res.data.error_code != 0){
          console.log(res.data)
          wx.showModal({
            title: '提示！',
            showCancel:false,
            content: res.data.msg,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
            },
          })
        }
        else{
          getApp().globalData.user=res.data.data
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
        wx.hideLoading();
        wx.showModal({
          title: '提示！',
          showCancel:false,
          content: '亲，网络不好哦',
          success: function(res){
            if(res.confirm) console.log('用户选择确定')
          },
        })
      }
    })
  }
})