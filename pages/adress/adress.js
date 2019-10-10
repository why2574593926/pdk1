const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 3,
    userInfo: {},
    // 皮豆显示隐藏控制
    pd_display: 'none',
    // 默认地址勾选判断
    img_gou:true
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
  // 默认地址
  img_gou:function(){
    this.setData({
      img_gou:!this.data.img_gou
    })
  },
  // 添加
  add:function(){
    wx.navigateTo({
      url: '../adress_add/adress_add'
    })
  },
  // 修改
  gai:function(){
    wx.navigateTo({
      url: '../adress_gai/adress_gai'
    })
  },
  // 删除
  delete1:function(){
    
  }
})
