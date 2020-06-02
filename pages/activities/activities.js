// pages/activities/activities.js
//author: zzn
// toDeail()和signUp()待实现

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uprefresh: false,
    activities: [
      // {
      //   state: 1,//该活动正在进行
      //   poster: 'https://mmbiz.qpic.cn/mmbiz_jpg/j9L86C5IO69wBEy2vsflQwoyPadSqr0NKhU6s6ahASBichUtvyfT4OmgjP1Xp4IxcgbjUXehchyYJ59jybjSW1A/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1',
      //   head : "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=253073685,3587850098&fm=15&gp=0.jpg",
      //   name : "南京大学学生会",
      //   actname : "十大歌手总决赛",
      //   time : "5月28日",
      //   target : "全体在校本科生",
      //   detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw',
      // },
    ]
  },

  /*
  页面加载函数
  */
  onLoad: function(options){
    var that=this

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/get_all_activities',
      data: {},
      method: "POST",
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success(res){
        wx.hideLoading();
        console.log(res.data)
        if(res.data.error_code != 0){
          wx.showModal({
            title: '提示！',
            showCancel:false,
            content: res.data.msg,
            success: function(res){
              if(res.confirm){console.log('用户点击确定')}
            }
          })
        }else{
          var activity=[];
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].activity_type==1){
              activity.push(res.data.data[i])
            }
          }
          that.setData({
            activities: activity
          })
          
          for(var i = 0; i <that.data.activities.length; i++){
            var starttime = 'activities[' + i + '].starttime'
            var endtime = 'activities[' + i + '].endtime'
            that.setData({
              [starttime] : that.data.activities[i].starttime.substr(0,16) ,
              [endtime] : that.data.activities[i].endtime.substr(0,16)
            })
          }
        }
      },
      fail: function(res){
        wx.hideLoading();
        wx.showModal({
          title: '提示！',
          showCancel:false,
          content: '亲，网络不好哦',
          success: function(res){
            if(res.confirm){console.log('用户点击确定')}
          }
        })
      }
    })
    wx.stopPullDownRefresh()
  },

  //下拉刷新
  onPullDownRefresh: function(){
    if(this.data.uprefresh == false){
      this.setData({
        uprefresh: true
      })
    }
    console.log("下拉刷新");
    this.onLoad()
    if(this.data.uprefresh == true){
      this.setData({
        uprefresh: false
      })
    }
  },

  //点击海报跳转到推文，待实现，暂不使用
  toDetail: function(e){
    var idx = e.currentTarget.dataset.idx
    var url = this.data.activities[idx].detail
    console.log(url);
    wx.showModal({
      title: '提示',
      content: '由于开发者的权限问题，该部分功能尚未开放，敬请期待~',
      confirmText: '好的',
      confirmColor: '#71CD63',
      showCancel: false
    })
  },

  //点击海报查看大图
  zoomIn : function(e){
    var idx = e.currentTarget.dataset.idx
    var url = this.data.activities[idx].picture
    var cur = this.data.activities[idx].picture;
    var lis = [ this.data.activities[idx].picture ] ;
    wx.previewImage({
      current: cur, //当前图片地址
      urls: lis,  //所有要预览的图片的地址集合数组形式
    })
  },

  //发布活动
  toRelease : function(e){
    wx.navigateTo({
      url: '/pages/releaseActivities/releaseActivities',
    })
  },

  //马上报名
  signUp : function(e){
    var idx = e.currentTarget.dataset.idx//活动idx
    wx.showModal({
      content: '是否确认报名？',
      cancelText: '再想想',
      cancelColor: '#6E6E6E',
      confirmText: '是的！',
      confirmColor: '#71CD63',
      success :(res)=>{
        if(res.confirm){
          wx.showLoading({
            title: '报名中'
          })
          //此处待补充，将报名者信息发送给服务器
          var that=this
          wx.request({
            url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Record/user_signup', //接口地址
            data: {
              activity_id:that.data.activities[idx].id,
              user_id:getApp().globalData.user.user_id,
              state:1
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
                wx.showModal({
                  title: '提示！',
                  content: '报名成功',
                  showCancel:false,
                  success: function(res){
                    if(res.confirm) console.log('用户选择确定')
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
            }
          })
        }
      }
    })
  }
})