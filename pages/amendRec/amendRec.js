// pages/releaseRecruits/releaseRecruits.js

var util = require('../../utils/util.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

    checks: [
      { name: "进行中", value: '0', checked: false},
      { name: "已完成", value: '1', checked: false },
      { name: "加急", value: '2', checked: false },
      { name: "取消", value: '3', checked: false },
    ],
    catename:'',
    cateid:'',
    openid:null,
    display: false,
    show: false,
    show1: false,
    show2: false,
    
    currentDate: new Date().getTime(),//初始日期//时间戳补3位
    currentDate1: new Date().getTime(),//初始日期//时间戳补3位
    //时间-显示赋值
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      else if (type === 'hour') {
        return `${value}时`;
      }
      else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    activity_id:'',
    activity_name:'',
    activity_type:'2',
    state:'',
    place:123,
    reward:'',
    phone:'',
    other:'',
    startDate: '',//开始年月日,格式yyyy-mm-dd
    startTime: '',//开始时分秒,格式hh:mm:ss
    endDate: '',
    endTime: '',
    user_id:'',
    user_face:'',
    user_name:'',
    other:'',
    official:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activity_id: options.id,//url传入的活动id，int
    })
    var that = this
    var systime = util.formatTime(new Date());//yyyy/mm/dd hh:mm:ss
    //设置默认开始,结束年月日
    var sd = systime.substr(0,4)+'-'+systime.substr(5,2)+'-'+systime.substr(8,2)
    var st = systime.substr(11,2)+':'+systime.substr(14,2)
    var ed = sd
    var et = "23:59"
    this.setData({
      startDate: sd,
      startTime: st,
      endDate: ed,
      endTime: et,
    })
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/find_activity', //接口地址
      data: {
        activity_id: that.data.activity_id
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
            showCancel:false,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
            },
          })
        }
        else{
          // console.log(res.data)
          that.setData({
            activity_name:res.data.data.activity_name,
            state:res.data.data.state,
            reward:res.data.data.reward,
            startDate:res.data.data.starttime.substr(0,10),
            startTime:res.data.data.starttime.substr(11,5),
            endDate:res.data.data.endtime.substr(0,10),
            endTime:res.data.data.endtime.substr(11,5),
            user_name:res.data.data.user_name,
            user_id:res.data.data.user_id,
            user_face:res.data.data.user_face,
            other:res.data.data.other,
            phone:res.data.data.phone,
            place:res.data.data.place,
            official:res.data.data.official
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
      },
    })
    console.log(this.data)
    if(that.data.state==3){
      this.data.checks[2].checked=true
  }
  else{
    this.data.checks[0].checked=true;
  }
  },

  //时间-当值变化时触发的事件start
  onInput(event) {
    var newTime = new Date(event.detail);
    if(this.data.show==0){
      newTime =null;
    }else{
      //console.log(event.detail);
      newTime = formatTime(newTime);
    }
    this.setData({
      currentDate: event.detail,
      start_date: newTime,
    });
  },
  
 //状态选择
    clicks: function (e) {
      let index = e.currentTarget.dataset.index;
      let arrs = this.data.checks;
      for (var i=0;i<4;i++)
      { 
        arrs[i].checked=false;
      }
      arrs[index].checked = true;
      if(index==0){
        this.data.state=1;
      }
      if(index==1){
        this.data.state=2;
      }
      if(index==2){
        this.data.state=3;
      }
      if(index==3){
        this.data.state=4;
      }
      this.setData({
        checks: arrs
      })
     
      // console.log(e)
    },
  //获得输入的开始日期
  bindStartDateChange: function(e){
    var sd = e.detail.value
    this.setData({startDate: sd})
  },
  //获得输入的开始时间
  bindStartTimeChange: function(e){
    var st = e.detail.value
    this.setData({startTime: st})
  },
  //获得输入的结束日期
  bindEndDateChange: function(e){
    var ed = e.detail.value
    this.setData({endDate: ed})
  },
  //获得输入的结束时间
  bindEndTimeChange: function(e){
    var et = e.detail.value
    this.setData({endTime: et})
  },
  //输入框
  nameinput(e){
    this.data.activity_name=e.detail.value;
  },
  telinput(e){
    this.data.phone=e.detail.value;
  },
  moreinput(e){
    this.data.other=e.detail.value;
  },
  placeinput(e){
    this.data.place=e.detail.value;
  },
  rewordinput(e){
    this.data.reward=e.detail.value;
  },

  /**
   * 提交函数
   */ 
  clickSubmit(){    
    this.data.activity_type=2;
    if(this.data.activity_name==''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入招募名称哦~'
      })
      return
    }
    else if(this.data.place == ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入工作地点哦~'
      })
      return
    }
    else if(this.data.reward== ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入工作报酬哦~'
      })
      return
    }
    else if(this.data.phone == ''){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '忘了输入工作联系方式哦~'
      })
      return
    }
    //检查时间正确性
    var systime = util.formatTime(new Date())
    var sdt = this.data.startDate+' '+this.data.startTime
    var edt = this.data.endDate+' '+this.data.endTime
    if(! this.isCorrectTime(systime,edt)){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '活动时间选择错误哦，请确保结束时间不早于当前时间~'
      })
      return
    }
    else if(! this.isCorrectTime(sdt,edt)){
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '活动时间选择错误哦，请确保结束时间不早于开始时间~'
      })
      return
    }
    var is_urgent=false;
    if(this.status=="加急") var is_urgent=true;
    //传到后端  与后端交互
    var that=this
    var tmpstartDate=that.data.startDate.replace(/-/g,'/')
    var tmpendDate=that.data.endDate.replace(/-/g,'/')
    var startdate=new Date(tmpstartDate+' '+that.data.startTime+':00')
    var enddate=new Date(tmpendDate+' '+that.data.endTime+':00')
    var starttime=startdate.valueOf()/1000
    var endtime=enddate.valueOf()/1000
    wx.showLoading({title: '修改中'})
    wx.request({
      url: 'https://njuboard.applinzi.com/NJUboard/index.php/Home/Activity/update_activity', //接口地址
      data: {
        activity_id:that.data.activity_id,
        activity_name:that.data.activity_name,
        activity_type:2,
        state:that.data.state,
        starttime:starttime,
        endtime:endtime,
        place:that.data.place,
        reward:that.data.reward,
        phone:that.data.phone,
        other:that.data.other,
        user_id:that.data.user_id,
        user_face:that.data.user_face,
        user_name:that.data.user_name,
        official:that.data.official
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
            content: '修改成功',
            showCancel:false,
            success: function(res){
              if(res.confirm) console.log('用户选择确定')
            },
            complete:function(res){
              wx.navigateBack()
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
  },

  isCorrectTime: function(t1, t2){
    var year1 = t1.substr(0,4)
    var month1 = t1.substr(5,2)
    var day1 = t1.substr(8,2)
    var hour1 = t1.substr(11,2)
    var min1 = t1.substr(14,2)
    var year2 = t2.substr(0,4)
    var month2 = t2.substr(5,2)
    var day2 = t2.substr(8,2)
    var hour2 = t2.substr(11,2)
    var min2 = t2.substr(14,2)
    var isFault = (year1 > year2 
      || year1 == year2 && month1 > month2
      || (year1 == year2 && month1 == month2) && day1 > day2
      || (year1 == year2 && month1 == month2 && day1 == day2) && hour1 > hour2
      || (year1 == year2 && month1 == month2 && day1 == day2 && hour1 == hour2) && min1 > min2)
    return !isFault
  }
})