Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    sno:'',
    password:'',
    stunoinput:false,
    passwordinput:false
  },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     this.app = getApp()
//   },
//   onShow: function () {
//     this.app.sliderightshow(this, 'slide_up1', -200, 1)

//     setTimeout(function () {
//       this.app.sliderightshow(this, 'slide_up2', -200, 1)
//     }.bind(this), 200);
//   },
// //页面隐藏时，触发渐出动画
//  onHide: function () {
//      //你可以看到，动画参数的200,0与渐入时的-200,1刚好是相反的，其实也就做到了页面还原的作用，使页面重新打开时重新展示动画
//     this.app.slideupshow(this, 'slide_up1', 200, 0)
//     //延时展现容器2，做到瀑布流的效果，见上面预览图
//     setTimeout(function () {
//       this.app.slideupshow(this, 'slide_up2', 200, 0)
//     }.bind(this), 200);
//   },
  gotoregister: function(e){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  //登录
  submit: function(e){
    var that =this
    if(this.data.sno.length==0){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入学号'
      })
      return
    }
    
    if(this.data.sno.length!=9){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '您输入的学号格式有误~'
      })
      return
    }
    if(this.data.sno.password==0){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入密码'
      })
      return
    }
    wx.showLoading({
      title: '登录中...'
    })
    wx.request({   
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/User/login', //接口地址
      data: {//数据为stuno password
        user_sno: that.data.sno,
        password: that.data.password
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
            showCancel:false,
            content: res.data.msg,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
            },
          })
        }
        else{
          getApp().globalData.user=res.data.data
          wx.reLaunch({
            url: '/pages/recruit/recruit',
          }) 
        }
       },
      fail:function(res){
        console.log(res);
        wx.showModal({
          title: '提示！',
          showCancel:false,
          content: '亲，网络不好哦',
          success: function(res){
            if(res.confirm) console.log('用户选择确定')
          },
        })
      },
    })
  },

  stunoinput:function(e){
    this.setData({sno:e.detail.value});
    this.setData({schoolno:e.detail.value.slice(2,5)})
    this.setData({stunoinput:true});
    if(this.data.stunoinput==true && this.data.passwordinput==true){
      this.setData({ disabled: false });
    }
  },

  passwordinput: function (e) {
    this.setData({ password: e.detail.value });
    this.setData({passwordinput: true });
    if (this.data.stunoinput == true && this.data.passwordinput == true) {
      this.setData({ disabled: false });
    }
  }
})