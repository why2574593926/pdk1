const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
var timer = 0;
Page({
  data: {
    //底部导航标识
    nav: 0,
    userInfo: {},
    // 省市区三级
    region: ["出发地", "", ""],
    region1: ["目的地", "", ""],
    // 时间
    time: "出发时间",
    time1: "返回时间",
    // 滚动
    left1:'0rpx',
    left2:'480rpx'
  },
  onLoad:function(){
    let that=this;
    setInterval(function(){
      that.setData({
        left1:'-480rpx',
        left2:'0'
      })
    },4000)
  }
})
