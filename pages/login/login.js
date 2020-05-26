wx.getUserInfo({
  success: function(res) {
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country
  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {

    disabled:false,
    sno:'',
    password:'',
    stunoinput:false,
    passwordinput:false,
    school:'',
    schoolno:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.app = getApp()
  },
  onShow: function () {
    this.app.sliderightshow(this, 'slide_up1', -200, 1)

    setTimeout(function () {
      this.app.sliderightshow(this, 'slide_up2', -200, 1)
    }.bind(this), 200);
  },
//页面隐藏时，触发渐出动画
 onHide: function () {
     //你可以看到，动画参数的200,0与渐入时的-200,1刚好是相反的，其实也就做到了页面还原的作用，使页面重新打开时重新展示动画
    this.app.slideupshow(this, 'slide_up1', 200, 0)
    //延时展现容器2，做到瀑布流的效果，见上面预览图
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', 200, 0)
    }.bind(this), 200);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gotoinformation: function(e){
    console.log(this.data.stuno)
    wx.switchTab({
      url: '/pages/information/information',
    })
  },
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
    console.log(e);
    wx.request({   
      url: 'http://njuboard.applinzi.com/NJUboard/index.php/Home/User/login', //接口地址
      data: {//数据为stuno password
        stuno: this.data.stuno,
        password: this.data.password
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        if(res.data.error_code != 0){
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
          getApp().globalData.userInfo=res.data.data
          console.log(getApp().globalData.user)
          wx.showModal({
            title: '恭喜！',
            content: '登录成功',
            showCancel: false,
            success(res){},
            complete: function(res){
              wx.reLaunch({
                url: 'pages/activities/activities',
              })
            }
          })
        }
       },
      fail:function(res){
        console.log(res);
        wx.showModal({
          title: '欸~',
          content: '你这网不行啊~',
          success: function(res){
            if(res.confirm) console.log('用户选择确定')
            else console.log('用户选择取消')
          },
        })
      },
    })

      wx.switchTab({
        url: '/pages/recruit/recruit',
      })      
      if(this.data.schoolno==125){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: 'Welcome~   NJUSER'
        })
        return
      }
      if(this.data.schoolno==103){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '欢迎~  法学er'
        })
        return
      }
      if(this.data.schoolno==104){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '欢迎~  哲学er'
        })
        return
      }
      if(this.data.schoolno==105){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '欢迎~  新传er'
        })
        return
      }
      if(this.data.schoolno==106){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '欢迎~  政管er'
        })
        return
      }
      if(this.data.schoolno==107){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '欢迎~  信管er'
        })
        return
      }
      if(this.data.schoolno==108){
        wx.showModal({
          showCancel: false,
          title: '提示',
          content: '欢迎~  社会er'
        })
        return
      }

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
  
})