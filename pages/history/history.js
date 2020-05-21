// pages/history/history.js
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
        sort: "活动", //种类，包括“活动”和“招募”
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
        name : "南大团委",
        work : "新年音乐会场务",
        time : "12月30日 19：00 - 22：00",
        place : "仙林校区大活",
        reword : "20元饭票",
        tel : "12345677899",
        more : "搬搬道具，听现场指挥就行"
      },
      {
        status: "已完成", // 已退出，已完成，进行中
        urgent : true,//加急状态
        sort: "活动", //种类，包括“活动”和“招募”
        name : "南大团委",
        work : "新年音乐会场务",
        time : "12月30日 19：00 - 22：00",
        place : "仙林校区大活",
        reword : "20元饭票",
        tel : "12345677899",
        more : "搬搬道具，听现场指挥就行"
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
        sort: "招募", //种类，包括“活动”和“招募”
        name : "南大团委",
        work : "海报制作招募",
        time : "5月30日 22：00前完成",
        place : "无",
        reword : "100元",
        tel : "12345677899",
        more : "听我指挥"
      },
    ]
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
  }
})