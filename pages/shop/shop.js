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
    shop2: {},
    // 价格，皮豆
    shop_price:'',
    shop_pd: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  watchPassWord: function (e) {
    let that = this;
    that.setData({
      cx0: 1
    })
    console.log(e.detail.value)
    // 商品获取
    if (e.detail.value == '') {
      that.setData({
        cx: {}
      })
    } else {
      let aa = {
        'nameLike': e.detail.value
      }
      WXAPI.shop(aa).then(function (res) {
        console.log(res.data.list)
        that.setData({
          cx: res.data.list
        })
      })
    }

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
  toFix: function (value) {
    return value.toFixed(2)//此处2为保留两位小数，保留几位小数，这里写几
  },
  onReady: function () {
    // 页面指定位置跳转
    wx.pageScrollTo({
      selector: '.' + app.globalData.index_tiao
    })
    app.globalData.index_tiao='index'
  },
  // 跳转商品详情页
  xiangqing_tiao: function (e) {
      app.globalData.shop_id = e.currentTarget.id;
      wx: wx.navigateTo({
        url: '../shop_content/shop_content'
      })
    
  }
})
