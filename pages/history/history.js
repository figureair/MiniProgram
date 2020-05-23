// pages/history/history.js
//toDetail(),cancel()待完成
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_MyParticipation : true, 
    participations:[
      {
        status: "进行中", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "招募", //种类，包括“活动”和“招募”
        name : "很神奇的凑字数的南大团委",
        work : "新年音乐会场务",
        time : "12月30日 19：00 - 22：00",
        place : "仙林校区大活",
        reword : "20元饭票",
        tel : "12345677899",
        more : "搬搬道具，听现场指挥就行"
      },
      {
        status: "已退出", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "活动", //种类，包括“活动”和“招募”
        name : "南京大学学生会",
        actname : "十大歌手总决赛",
        time : "5月28日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
      {
        status: "已完成", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "活动", //种类，包括“活动”和“招募”
        name : "南大团委",
        actname : "十大歌手总决赛",
        time : "5月28日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw'
      },
    ],
    releases:[
      {
        status: "已完成", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "招募", //种类，包括“活动”和“招募”
        name : "南大团委",
        work : "海报制作招募",
        time : "5月30日 22：00前完成",
        place : "无",
        reword : "100元",
        tel : "12345677899",
        more : "听我指挥"
      },
      {
        status: "已完成", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "活动", //种类，包括“活动”和“招募”
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
        status: "已完成", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "活动", //种类，包括“活动”和“招募”
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
    ]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  //转化为我参加的
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

  //转化为我发布的
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
    console.log(idx);
    //跳转到活动的微信推文，待实现
  },

  //点击"退出"按钮退出该活动
  cancel:function(e){
    var idx = e.currentTarget.dataset.idx
    if(this.data.participations[idx].status=="已退出"){
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

          var participations = 'participations[' + idx + '].status';
          that.setData({
            [participations] : '已退出'
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
    var idx = e.currentTarget.dataset.idx
    wx.redirectTo({
      url: '/pages/amendActInfor/amendActInfor',
    })
  },

  //我发布的 点击报名情况 进入报名情况页面
  showSituation: function(e){
    var idx = e.currentTarget.dataset.idx
    wx.redirectTo({
      url: '/pages/situation/situation',
    })
  }
})