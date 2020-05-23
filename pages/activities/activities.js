// pages/activities/activities.js
// toDeail()和signUp()待实现

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: [
      {
        goingon: true,//该活动正在进行
        poster: 'https://mmbiz.qpic.cn/mmbiz_jpg/j9L86C5IO69wBEy2vsflQwoyPadSqr0NKhU6s6ahASBichUtvyfT4OmgjP1Xp4IxcgbjUXehchyYJ59jybjSW1A/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1',
        head : "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=253073685,3587850098&fm=15&gp=0.jpg",
        name : "南京大学学生会",
        actname : "十大歌手总决赛",
        time : "5月28日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw',
      },
      {
        goingon: true,//该活动正在进行
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589972393115&di=9498157ada15fcdd5cabd376af9fead0&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F337%2F25500.jpg',
        head : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3881515574,3022954722&fm=26&gp=0.jpg",
        name : "书法社",
        actname : "中国梦主题书法大赛",
        time : "5月30日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw',
      },
      {
        goingon: true,//该活动正在进行
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589972908409&di=ed7e877f7be1e6d1aa0d605dcdfa78cc&imgtype=0&src=http%3A%2F%2Fpicd57.huitu.com%2Fpic%2F20161026%2F20161026202903601800_0.jpg',
        head : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589973004547&di=b022505e0d63833bfd4aaaa252cb90db&imgtype=0&src=http%3A%2F%2Fwww.16buzhi.com%2Fuploads%2Fallimg%2F170809%2F1-1FP9161912.jpg",
        name : "乒乓球社",
        actname : "寻找校园乒乓高手",
        time : "5月1日",
        target : "全体在校本科生",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw',
      },
      {
        goingon: true,//该活动正在进行
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589972908409&di=ed7e877f7be1e6d1aa0d605dcdfa78cc&imgtype=0&src=http%3A%2F%2Fpicd57.huitu.com%2Fpic%2F20161026%2F20161026202903601800_0.jpg',
        head : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589973004547&di=b022505e0d63833bfd4aaaa252cb90db&imgtype=0&src=http%3A%2F%2Fwww.16buzhi.com%2Fuploads%2Fallimg%2F170809%2F1-1FP9161912.jpg",
        name : "乒乓球社",
        actname : "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈终于凑满二五个字了",
        time : "5月1日",
        target : "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈终于凑满二五个字了",
        detail: 'https://mp.weixin.qq.com/s/VeBQtkb7rvgEaKpKuZEBSw',
      },
    ]
  },

  //点击海报查看推文，尚未实现，有待商量
  toDetail: function(e){
    var idx = e.currentTarget.dataset.idx
    var url = this.data.activities[idx].detail
    console.log(url);
    
    wx.navigateTo({
      url: url,
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