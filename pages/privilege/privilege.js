const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 2,
    userInfo: {},
    // 测试
    ceshi: '',
    tequan1: [
      {
        'tag': '',
        'url': '../img/icon1.png',
        'content': '皮皮互助',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '../img/hot.png'
      },
      {
        'tag': '',
        'url': '../img/icon2.png',
        'content': '高速积分',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '../img/huochezhuanyong.png'
      }, {
        'tag': '',
        'url': '../img/icon3.png',
        'content': '结伴而行',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '../img/new.png'
      },
      {
        'tag': '',
        'url': '../img/icon4.png',
        'content': '定制旅游',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '../img/new.png'
      },
      {
        'tag': '',
        'url': '../img/icon5.png',
        'content': '货车加油',
        'reservedata1': '笔笔返现',
        'reservedata2': '1',
        "url2": '../img/new.png'
      },
      {
        'tag': '',
        'url': '../img/icon6.png',
        'content': '违章举报',
        'reservedata1': '有奖举报',
        'reservedata2': '1',
        "url2": '../img/youjiang.png'
      },
      {
        'tag': '',
        'url': '../img/icon7.png',
        'content': '加油打折',
        'reservedata1': '92折优惠',
        'reservedata2': '1',
        "url2": '../img/quanguowuwanjia.png'
      },
      {
        'tag': '',
        'url': '../img/icon8.png',
        'content': '办理ETC',
        'reservedata1': '返现20元',
        'reservedata2': '1',
        "url2": '../img/mianfei.png'
      },
      {
        'tag': '',
        'url': '../img/icon9.png',
        'content': '道路救援',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': '',
        'url': '../img/icon10.png',
        'content': '机车改装',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': '',
        'url': '../img/icon11.png',
        'content': '酒店住宿',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '../img/7zheqi.png'
      },
      {
        'tag': '',
        'url': '../img/icon12.png',
        'content': '更多服务',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      }
    ],
    cars:{},
    kache:{},
    jiche:{},
    lvxing:{},
    reservedata1:{}
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
    // 小图标获取
    let aa = { type: 'reservedata1' }
    WXAPI.icon(aa).then(function (res) {
        that.setData({
          reservedata1: res.data
        })
    })
    // 汽车服务图片内容获取
    let bb = { type: 'cars' }
    WXAPI.icon(bb).then(function (res) {
      that.setData({
        cars: res.data
      })
    })
    // 货车服务图片内容获取
    let cc = { type: 'kache' }
    WXAPI.icon(cc).then(function (res) {
      let a = {};
      a = res.data[7];
      res.data[7] = res.data[6];
      res.data[6] = a;
      a = res.data[1];
      res.data[1] = res.data[6];
      res.data[6] = a;
      that.setData({
        kache: res.data
      })
    })
    // 机车服务图片内容获取
    let dd = { type: 'jiche' }
    WXAPI.icon(dd).then(function (res) {
      that.setData({
        jiche: res.data
      })
    })
    // 旅行服务图片内容获取
    let ee = { type: 'lvxing' }
    WXAPI.icon(ee).then(function (res) {
      that.setData({
        lvxing: res.data
      })
    })
  },
  onReady: function () {


  }
})
