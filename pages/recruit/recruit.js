// pages/recruit/recruit.js
//author: zzn
//有待补充代码:signUp()
Page({

  /* 页面的初始数据 */
  data: {
    uprefresh: false,
    is_official : true, 
    official_recruits:[
      // {
      //   state: 3,//加急
      //   head : "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4064142245,3232604835&fm=26&gp=0.jpg",
      //   name : "很神奇的凑字数的南大团委",
      //   work : "新年音乐会场务",
      //   time : "12月30日 19：00 - 22：00",
      //   place : "仙林校区大活",
      //   reword : "20元饭票",
      //   tel : "12345677899",
      //   more : "搬搬道具，听现场指挥就行"
      // },
    ],
    non_official_recruits:[
      // {
      //   state: 3,
      //   head : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588314029275&di=763dff5ec910ce77155cf285e9da125f&imgtype=0&\src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg",
      //   name : "一位大佬",
      //   work : "找人做栋梁奖学金答辩视频",
      //   time : "6月1日前",
      //   place : "仙林校区",
      //   reword : "800-1000元",
      //   tel : "12345677899",
      //   more : "需要有点技术，把个人作品发到181250006@smail.nju.edu.cn我看看吧"
      // }
    ]
  },

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
          var official=[];
          var unofficial=[];
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].official==1&&res.data.data[i].activity_type==2){
              official.push(res.data.data[i])
            }
            else if(res.data.data[i].official==2&&res.data.data[i].activity_type==2)
            {
              unofficial.push(res.data.data[i])
            }
          }
          that.setData({
            official_recruits:official,
            non_official_recruits:unofficial
          })
        }
        console.log(that.data);
        //去掉时间中的秒
        for(var i = 0; i <that.data.official_recruits.length; i++){
          var starttime = 'official_recruits[' + i + '].starttime'
          var endtime = 'official_recruits[' + i + '].endtime'
          that.setData({
            [starttime] : that.data.official_recruits[i].starttime.substr(0,16) ,
            [endtime] : that.data.official_recruits[i].endtime.substr(0,16)
          })
        }
        //去掉时间中的秒
        for(var i = 0; i <that.data.non_official_recruits.length; i++){
          var starttime = 'non_official_recruits[' + i + '].starttime'
          var endtime = 'non_official_recruits[' + i + '].endtime'
          that.setData({
            [starttime] : that.data.non_official_recruits[i].starttime.substr(0,16) ,
            [endtime] : that.data.non_official_recruits[i].endtime.substr(0,16)
          })
        }
      },
      fail: function(res){
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '亲，网络不好哦',
          success: function(res){
            if(res.confirm){console.log('用户点击确定')}
          }
        })
      }
    })
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

  //转化为官方栏
  toOfficial : function(e){
    console.log('触发1')
    
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
    var idx = e.currentTarget.dataset.idx//活动idx
    wx.showModal({
      content: '是否确认报名？',
      cancelText: '再想想',
      cancelColor: '#6E6E6E',
      confirmText: '是的！',
      confirmColor: '#71CD63',
      success:(res)=>{
        if(res.confirm){
          wx.showLoading({
            title: '报名中'
          })
          //此处待补充，将报名者信息发送给服务器
          var that=this
          if(that.data.is_official){
          wx.request({
            url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Record/user_signup', //接口地址
            data:{
              activity_id:that.data.official_recruits[idx].id,
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
          else{
            wx.request({
              url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Record/user_signup', //接口地址
              data: {
                activity_id:that.data.non_official_recruits[idx].id,
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
      }
    })
  },

})