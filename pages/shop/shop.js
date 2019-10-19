const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 1,
    userInfo: {},
    // 测试
    ceshi: '',
    //商品
    shop1: {},
    shop2: {}
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
    app.globalData.nav = that.data.nav;
    this.selectComponent("#mpnav").navbh();
    // 商品获取
    let aa = { 'page': 1, 'pageSize': 1000 }
    WXAPI.shop(aa).then(function (res) {
      if (res.code == 0) {
        console.log(res.data.list)
        let bb = [];
        let cc = [];
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].category == 2) {
            bb.push(res.data.list[i])
          }
          if (res.data.list[i].category == 3) {
            cc.push(res.data.list[i])
          }
        }
        that.setData({
          shop1: bb,
          shop2: cc
        })
        console.log(that.data.shop)
      }
    })
  },
  onReady: function () {
    // 页面指定位置跳转
    wx.pageScrollTo({
      selector: '.' + app.globalData.index_tiao
    })
    app.globalData.index_tiao='index'
  }
})
