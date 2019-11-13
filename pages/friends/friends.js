const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
var timer = 0;
Page({
  data: {
    //底部导航标识
    nav: 0,
    userInfo: {},
    // 省市区三级联动初始化
    region: ["出发地", "", ""],
    region1: ["目的地", "", ""],
    // 地区是否选择判断
    adress1: 0,
    adress2: 0,
    // 时间初始化
    time: "出发时间",
    time1: "返回时间",
    // 时间是否选择判断
    time_pd: 0,
    time1_pd: 0
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
    this.setData({
      adress1: 1
    })
  },
  changeRegin1(e) {
    this.setData({ region1: e.detail.value });
    this.setData({
      adress2: 1
    })
  },
  // 选择时间函数
  time(e) {
    this.setData({ time: e.detail.value });
    console.log(e)
    this.setData({
      time_pd: 1
    })
  },
  time1(e) {
    this.setData({ time1: e.detail.value });
    this.setData({
      time1_pd: 1
    })
  },
  // 跳转
  fb:function(){
    let that=this;
    // 将内容保存到缓存
    let aa = { 'c1': that.data.time + '到' + that.data.time1, 'c2': that.data.region1[0], 'c3': that.data.region[0], 'c4': that.data.time + '从' + that.data.region[0]+'出发'}
    wx.setStorageSync('content',aa)
    if (that.data.adress1 == 1 && that.data.adress2 == 1 && that.data.time1_pd == 1 && that.data.time_pd == 1){
      wx.navigateTo({
        url: '../friends/pd'
      })
    }else{
      wx.showModal({
        title: '请填写信息',
        content: '请完整填写信息',
      })
    }
  },
  onLoad:function(){
    // 查看是否授权
    console.log(44444)
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.setStorageSync('user1', res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    wx.setStorageSync('user1', e.detail.userInfo)
  },
  // 跳过
  tiaoguo:function(){
    wx.navigateTo({ url: 'pp_content'})
  }
})
