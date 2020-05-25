// pages/history/history.js
//author: zzn
//toDetail(),cancel()，amend(),showSituation()待完成
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paStatus: ['','进行中','已完结','已退出','已取消'],  //参加的项目的状态
    reStatus: ['','进行中','已完结','加急','已取消'],  //发布的项目的状态 
    statecolor: ['','orange','green','red','red'],
    acttype: ['','活动','招募'],
    is_MyParticipation : true, 
    participations:[ //我参加的
      {
        state: 1, // 1为进行中，2为已完成，3为已退出，4为已取消
        activity_type: 2, //种类，1:活动 2:招募
        name : "很神奇的凑字数的南大团委",
        work : "新年音乐会场务",
        time : "12月30日 19：00 - 22：00",
        place : "仙林校区大活",
        reword : "20元饭票",
        tel : "12345677899",
        more : "搬搬道具，听现场指挥就行"
      },
      {
        state: 2, //已完成
        activity_type: 1,
        name : "南京大学学生会",
        actname : "十大歌手总决赛",
        time : "5月28日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
      {
        state: 3, //已退出
        activity_type: 1, 
        name : "南大团委",
        actname : "十大歌手总决赛",
        time : "5月28日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
      {
        state: 4, //已取消
        activity_type: 1, 
        name : "南大团委",
        actname : "十大歌手总决赛",
        time : "5月28日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
    ],
    releases:[
      {
        state: 3, // 1 为进行中，2 为已完成，3为加急，4为取消
        activity_type: 2, //种类，包括“活动”和“招募”
        //以下为招募专属信息
        name : "南大团委",
        work : "海报制作招募",
        time : "5月30日 22：00前完成",
        place : "无",
        reword : "100元",
        tel : "12345677899",
        more : "听我指挥",
        //以下为活动信息
        actname : "",
        target : "",
        detail: "",
      },
      {
        state: 2, // 已完成
        activity_type: 1, //种类，包括“活动”和“招募”
        name : "南大团委",
        time : "5月30日 22：00前完成",
        //以下为招募专属信息
        work : "",
        place : "",
        reword : "",
        tel : "",
        more : "",
        //以下为活动信息
        actname : "十大歌手总决赛",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
      {
        state: 1, // 加急
        activity_type: 1, //种类，包括“活动”和“招募”
        name : "南大团委",
        time : "5月30日 22：00前完成",
        //以下为招募专属信息
        work : "",
        place : "",
        reword : "",
        tel : "",
        more : "",
        //以下为活动信息
        actname : "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈终于凑满二五个字了",
        target : "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈终于凑满二五个字了",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
      {
        state: 4, // 已取消
        activity_type: 1, //种类，包括“活动”和“招募”
        name : "南大团委",
        time : "5月30日 22：00前完成",
        //以下为招募专属信息
        work : "",
        place : "",
        reword : "",
        tel : "",
        more : "",
        //以下为活动信息
        actname : "十大歌手总决赛",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  //转为我参加的
  toMyParticipation : function(e){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    animation.translate(0, 0).step()
    this.setData({
      is_MyParticipation : true,
      ani : animation.export()
    })
  },

  //转为我发布的
  toMyRelease : function(e){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    var systemInfo = wx.getSystemInfoSync(); //下面转化为rpx用
    animation.translate(375 / 750 * systemInfo.windowWidth, 0).step()
    this.setData({
      is_MyParticipation : false,
      ani: animation.export()
    })
  },

  //点击详情按钮跳转到活动对应的微信推文
  toDetail : function(e){
    var idx = e.currentTarget.dataset.idx
    //跳转到活动的微信推文，暂不实现
    wx.showModal({
      title: '提示',
      content: '由于开发者的权限问题，该部分功能尚未开放，敬请期待~',
      confirmText: '好的',
      confirmColor: '#71CD63',
      showCancel: false
    })
  },

  //点击"退出"按钮退出该活动
  cancel:function(e){
    var idx = e.currentTarget.dataset.idx
    if(this.data.participations[idx].state==3){
      wx.showToast({
        icon: 'none',
        duration: 1000,
        title: '您已经退出了哟~',
      })
      return
    }
    var that = this
    wx.showModal({
      content: '确认退出该活动吗？',
      cancelText: '暂不退出',
      cancelColor: '#6E6E6E',
      confirmText: '确认',
      confirmColor: '#71CD63',
      success : function(res){
        if(res.confirm){
          wx.showLoading({
            title: '退出中'
          })
          //此处待补充，将退出信息发送给服务器

          var participations = 'participations[' + idx + '].state';
          that.setData({
            [participations] : 3
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.showToast({
              title: '退出成功',
              icon: 'success',
              duration: 1000
            })
          }, 2000)
        }
      }
    })
    
  },

  //我发布的 点击修改按钮 进入修改页面
  amend: function(e){
    //此处还需要活动/招募ID来定位是哪个活动/招募的报名情况，并作为参数传给URL
    var idx = e.currentTarget.dataset.idx
    var list = this.data.is_MyParticipation ? this.data.participations : this.data.releases
    if(list[idx].state == 2 || list[idx].state == 4){
      wx.showModal({
        title: '提示',
        content: '已完结/已取消的活动不能修改信息哦！',
        showCancel: false,
        confirmText: "我知道了",
      })
    }
    else{
      if(list[idx].activity_type==1){
        wx.navigateTo({
          url: '/pages/amendActInfor/amendActInfor',
        })
      }
      else if(list[idx].activity_type==2){
        wx.navigateTo({
          url: '/pages/amendRec/amendRec',
        })
      }
    }
  },

  //我发布的 点击报名情况 进入报名情况页面
  showSituation: function(e){
    //此处还需要活动/招募ID来定位是哪个活动/招募的报名情况，并作为参数传给URL
    var idx = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '/pages/situation/situation',
    })
  }
})