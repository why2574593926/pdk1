const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 3,
    userInfo: {},
    // 皮豆显示隐藏控制
    pd_display:'none',
    qiandao:[
      { 'img1': '../img/pd.png', 'img2':'../img/qiandaogou.png','pd':'1','day':'第1天'},
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '2', 'day': '第2天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '3', 'day': '第3天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '4', 'day': '第4天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '5', 'day': '第5天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '6', 'day': '第6天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '7', 'day': '第7天' }
    ],
    // 签到天数
    // -1为已签到，其他为已签到天数+1
    qiandao_day_pd:4,
    // 固定签到天数+1
    qiandao_day_gou: 4,
    // 签到显示隐藏控制
    qiandao_display:false,
    // 客服显示隐藏控制
    service_display: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    // 导航判断
    app.globalData.nav = 3;
    this.selectComponent("#mpnav").navbh();
    // 签到
    // let day_number = that.data.qiandao_day-1;
    // let day_img1 = 'qiandao[' + day_number + '].img1'
    // that.setData({
    //   [day_img1]: '../img/qiandaoliwu.png'
    // })
    // let day_img2 = 'qiandao[' + day_number+ '].img2'
    // that.setData({
    //   [day_img2]:'../img/qiandaotuoyuan.png'
    // })
  },
  // 皮豆
  pd:function(e){
    let that=this;
    if (e.currentTarget.id=='pd1'){
      that.setData({
        pd_display:'block'
      })
    }else{
      that.setData({
        pd_display: 'none'
      })
    }
  },
  // 签到
  qiandao:function(){
    var time = new Date();
    var hour=time.getHours();
    var minutes=time.getMinutes();
    console.log(minutes)
    if(hour==0&&minutes<=30){
      wx.showModal({
        title: '0点~0:30无法签到',
        content: '请在0：30之后再来签到',
      })
    }else{
      this.setData({
        qiandao_day_pd: -1
      })
    }
   
  },
  // 签到显示隐藏控制
  qiandao_xy:function(){
    this.setData({
      qiandao_display: !this.data.qiandao_display
    })
  },
  // 设置跳转
  set:function(){
    wx.navigateTo({
      url: '../set/set'
    })
  },
  // 客服显示隐藏控制
  service:function(){
    this.setData({
      service_display:!this.data.service_display
    })
  }
})
