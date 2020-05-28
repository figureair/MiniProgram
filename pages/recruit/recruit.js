// pages/recruit/recruit.js
//author: zzn
//有待补充代码:signUp()
Page({

  /* 页面的初始数据 */
  data: {
    is_official : true, 
    official_recruits:[
      {
        state: 3,//加急
        user_face : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4064142245,3232604835&fm=26&gp=0.jpg",
        user_name : "很神奇的凑字数的南大团委",
        activity_name : "新年音乐会场务",
        starttime:0,
        endtime:0,
        place : "仙林校区大活",
        reward : "20元饭票",
        phone : "12345677899",
        other : "搬搬道具，听现场指挥就行"
      },
      {
        state: 3,
        user_face : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3085317021,500690793&fm=26&gp=0.jpg",
        user_name : "街舞社",
        activity_name : "找人录像",
        starttime:0,
        endtime:0,
        place : "四五六食堂门前空地",
        reward : "没有",
        phone : "12345677899",
        other : "帮忙录个像，很简单的！"
      },
      {
        state: 1,//正在进行
        user_face : "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=253073685,3587850098&fm=15&gp=0.jpg",
        user_name : "南京大学学生会",
        activity_name : "音乐作品征集比赛海报设计",
        starttime:0,
        endtime:0,
        place : "无",
        reward : "100-200元",
        phone : "12345677899",
        other : "我们会在报名者中筛选合适的设计师，请报名者尽快将个人作品发送至邮箱181250001@smail.nju.edu.cn，我们明天会以短信形式通知入选者"
      },
    ],
    non_official_recruits:[
      {
        state: 3,
        user_face : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588314029275&di=763dff5ec910ce77155cf285e9da125f&imgtype=0&\src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg",
        user_name : "一位大佬",
        activity_name : "找人做栋梁奖学金答辩视频",
        starttime:0,
        endtime:0,
        place : "仙林校区",
        reward : "800-1000元",
        phone : "12345677899",
        other : "需要有点技术，把个人作品发到181250006@smail.nju.edu.cn我看看吧"
      },
      {
        state: 1,
        user_face : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588321392410&di=808f39e737ae40b465d6203f649d56bd&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F7405829970%2F0",
        user_name : "一位渣渣",
        activity_name : "找人教我数据科学",
        starttime:0,
        endtime:0,
        place : "我家",
        reward : "每节课100元",
        phone : "12345677899",
        other : "救救我吧，真学不会！"
      },
    ]
  },

  onLoad: function(options){
    var that=this

    wx.showModal({
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
        console.log(res.data)
        if(res.data.error_code != 0){
          wx.showModal({
            title: '提示！',
            content: res.data.msg,
            success: function(res){
              if(res.confirm){console.log('用户点击确定')}
              else{console.log('用户点击取消')}
            }
          })
        }else{
          that.setData({
            official_recruits: res.data.data
          })
          console.log(that.data.official_recruits)
        }
      },
      fail: function(res){
        wx.showModal({
          title: '欸~',
          content: '你这网不行啊~',
          success: function(res){
            if(res.confirm){console.log('用户点击确定')}
            else{console.log('用户点击取消')}
          }
        })
      },
      complete: function(res){
        wx.hideLoading()
      }
    }),
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  //转化为官方栏
  toOfficial : function(e){
    console.log('触发1');
    
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    animation.translate(0, 0).step()
    this.setData({
      is_official : true,
      ani : animation.export()
    })
  },

  //转化为非官方栏信息
  toNotOfficial : function(e){
    console.log('触发2');
    
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    var systemInfo = wx.getSystemInfoSync(); //下面转化为rpx用
    animation.translate(375 / 750 * systemInfo.windowWidth, 0).step()
    this.setData({
      is_official : false,
      ani: animation.export()
    })
  },

  //发布招募
  toRelease : function(e){
    wx.navigateTo({
      url: '/pages/releaseRecruits/releaseRecruits',
    })
  },

  //马上报名
  signUp : function(e){
    wx.showModal({
      content: '是否确认报名？',
      cancelText: '再想想',
      cancelColor: '#6E6E6E',
      confirmText: '是的！',
      confirmColor: '#71CD63',
      success : function(res){
        if(res.confirm){
          wx.showLoading({
            title: '报名中'
          })
          //此处待补充，将报名者信息发送给服务器
          setTimeout(function () {
            wx.hideLoading()
            wx.showToast({
              title: '报名成功',
              icon: 'success',
              duration: 1000
            })
          }, 2000)
        }
      }
    })
  },

})