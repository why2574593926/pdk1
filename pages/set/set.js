const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 3,
    userInfo: {},
    // 皮豆显示隐藏控制
    pd_display: 'none'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
  },
  onReady: function () {


  },
  // 皮豆
  pd: function (e) {
    let that = this;
    if (e.currentTarget.id == 'pd1') {
      that.setData({
        pd_display: 'block'
      })
    } else {
      that.setData({
        pd_display: 'none'
      })
    }
  },
  // 地址跳转
  adress: function () {
    wx.navigateTo({
      url: '../adress/adress'
    })
  }
})
