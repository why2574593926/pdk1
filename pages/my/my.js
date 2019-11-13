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
    qiandao_day: 1,
    // -1为已签到，其他为已签到天数+1
    qiandao_day_pd:1,
    // 固定签到天数+1
    qiandao_day_gou: 1,
    // 签到显示隐藏控制
    qiandao_display:false,
    // 客服显示隐藏控制
    service_display: false,
    // 用户信息
    users:'',
    // 订单数量
    dingdan_number1:'',
    dingdan_number2: '',
    dingdan_number3: '',
    dingdan_number4: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    app.globalData.address_pay = 0;
    // 导航判断
    console.log(app.globalData.userInfo)
    //获取用户信息，id，卡号等
    let aa = { 'id': app.globalData.uid }
    WXAPI.users(aa).then(function (res) {
      console.log(res.data)
      if (res.code == 0) {
        that.setData({
          users: res.data,
          qiandao_day: res.data.signCount
        })
        if (res.data.isSign == 0) {
          that.setData({
            qiandao_day_gou: res.data.signCount + 1,
            qiandao_day_pd: res.data.signCount + 1
          })
        } else {
          that.setData({
            qiandao_day_gou: res.data.signCount,
            qiandao_day_pd: res.data.signCount
          })
        }
        console.log(that.data.users)
        // 获取订单数量
        // 获取订单数量
        that.dingdan_f(-1)
        that.dingdan_f(0)
        that.dingdan_f(1)
        that.dingdan_f(2)
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  onLoad: function () {
    let that = this;
    app.globalData.address_pay = 0;
    // 导航判断
    app.globalData.nav = 3;
    this.selectComponent("#mpnav").navbh();
    console.log(app.globalData.userInfo)
    //获取用户信息，id，卡号等
    let aa = { 'id': app.globalData.uid }
    WXAPI.users(aa).then(function (res) {
      console.log(res.data)
      if (res.code == 0) {
        that.setData({
          users: res.data,
          qiandao_day: res.data.signCount
        })
        if (res.data.isSign==0){
          that.setData({
            qiandao_day_gou: res.data.signCount + 1,
            qiandao_day_pd: res.data.signCount + 1
          })
        }else{
          that.setData({
            qiandao_day_gou: res.data.signCount,
            qiandao_day_pd: res.data.signCount
          })
        }
        console.log(that.data.users)
      }
    })
    // 获取订单数量
    that.dingdan_f(-1)
    that.dingdan_f(0)
    that.dingdan_f(1)
    that.dingdan_f(2)
  },
  onShow:function(){
    let that = this;
    app.globalData.address_pay = 0;
    // 导航判断
    app.globalData.nav = 3;
    this.selectComponent("#mpnav").navbh();
    console.log(app.globalData.userInfo)
    //获取用户信息，id，卡号等
    let aa = { 'id': app.globalData.uid }
    WXAPI.users(aa).then(function (res) {
      console.log(res.data)
      if (res.code == 0) {
        that.setData({
          users: res.data,
          qiandao_day: res.data.signCount
        })
        if (res.data.isSign == 0) {
          that.setData({
            qiandao_day_gou: res.data.signCount + 1,
            qiandao_day_pd: res.data.signCount + 1
          })
        } else {
          that.setData({
            qiandao_day_gou: res.data.signCount,
            qiandao_day_pd: res.data.signCount
          })
        }
        console.log(that.data.users)
      }
    })
    // 获取订单数量
    that.dingdan_f(-1)
    that.dingdan_f(0)
    that.dingdan_f(1)
    that.dingdan_f(2)
  },
  // 获取订单类型数量
  dingdan_f:function(a){
    let that=this;
    let ff = { 'uid': app.globalData.userInfo.uid, 'status': parseInt(a)}
    WXAPI.dingdan_num(ff).then(function (res) {
      console.log(res.data)
      if (res.code == 0) {
        if(a==-1){
          that.setData({
            dingdan_number1:res.data
          })
        } else if (a == 0) {
          that.setData({
            dingdan_number2: res.data
          })
        } else if (a == 1) {
          that.setData({
            dingdan_number3: res.data
          })
        } else if (a == 2) {
          that.setData({
            dingdan_number4: res.data
          })
        }
      }
    })
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
    let that=this;
    // 根据获得的cardId和cardStr判断用户是否激活
    if (!app.globalData.userInfo.cardId && !app.globalData.userInfo.cardStr) {
      wx.showModal({
        title: '您还未激活,不能享受此服务',
        content: '是否进入激活页面',
        showCancel: true,//是否显示取消按钮
        cancelText: "否",//默认是“取消”
        confirmText: "是",//默认是“确定”
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            wx.navigateTo({
              url: '../active/active',
            })
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })

    }else{
      var time = new Date();
      var hour = time.getHours();
      var minutes = time.getMinutes();
      if (hour == 0 && minutes <= 30) {
        wx.showModal({
          title: '0点~0:30无法签到',
          content: '请在0：30之后再来签到',
        })
      } else {
        //签到
        let aa = { 'id': app.globalData.uid }
        WXAPI.sign(aa).then(function (res) {
          if (res.code == 0) {
            that.setData({
              users: res.data,
              qiandao_day: res.data.signCount
            })
            console.log(that.data.users)
            let bb = {
              'id': app.globalData.uid, 'pd': that.data.qiandao_day_gou, 'info': JSON.stringify({'qiandao':'+' + that.data.qiandao_day_gou+''}) }
            WXAPI.gxpd(bb).then(function (res) {
              if (res.code == 0) {
                that.setData({
                  users: res.data,
                  qiandao_day: res.data.signCount
                })
                console.log(that.data.users)

              }
            })
          }
        })
        that.setData({
          qiandao_day_pd: -1
        })
      }
    }
    
   
  },
  // 签到显示隐藏控制
  qiandao_xy:function(){
    let that=this;
    that.setData({
      qiandao_display: !that.data.qiandao_display
    })
    if (that.data.users.isSign==1){
      that.setData({
        qiandao_day_pd: -1
      })
    }
  },
  // 设置跳转
  set:function(){
    wx.navigateTo({
      url: '../set/set'
    })
  },
  // 我的钱包-皮豆跳转
  pd_tiao:function(){
    wx.navigateTo({
      url: 'pd_number'
    })
  },
  // 优惠券跳转
  discount_tiao: function () {
    wx.navigateTo({
      url: 'discount'
    })
  },
  // 订单跳转
  order_tiao: function (e) {
    console.log(e)
    app.globalData.dingdan = e;
    wx.navigateTo({
      url: 'order'
    })
  },
  // 客服显示隐藏控制
  service:function(){
    this.setData({
      service_display:!this.data.service_display
    })
  }
})
