const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 0,
    userInfo: {},
    // 未开通
    notkt_dis: 'none',
    // 测试
    ceshi: '',
    tequan1: [
      {
        'tag': 'tag1',
        'url': '../img/icon1.png',
        'content': '高速积分',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '货车专用'
      }, {
        'tag': 'tag2',
        'url': '../img/icon2.png',
        'content': '结伴而行',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": 'NEW'
      },
      {
        'tag': 'tag3',
        'url': '../img/icon3.png',
        'content': '违章查询',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': 'tag4',
        'url': '../img/icon4.png',
        'content': '道路救援',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': 'tag5',
        'url': '../img/icon5.png',
        'content': '违章缴费',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '有奖'
      },
      {
        'tag': 'tag6',
        'url': '../img/icon6.png',
        'content': '车辆年检',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': 'tag7',
        'url': '../img/icon7.png',
        'content': '举报有奖',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '有奖'
      },
      {
        'tag': 'tag8',
        'url': '../img/icon8.png',
        'content': '豪车租赁',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '5折起'
      }
    ],
    //商品
    shop: {},
    // 模糊查询
    cx0:0,
    cx:{}
  },
  watchPassWord: function(e) {
    let that=this;
    that.setData({
      cx0:1
    })
    console.log(e.detail.value)
    // 商品获取
    if (e.detail.value==''){
      that.setData({
        cx:{}
      })
    }else{
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    let that = this;
    // 导航判断
    app.globalData.nav = that.data.nav;
    this.selectComponent("#mpnav").navbh();
    // 商品获取
    let aa = {
      'page': 1,
      'pageSize': 10
    }
    WXAPI.shop(aa).then(function(res) {
      if (res.code == 0) {
        console.log(res.data.list)
        let bb = [];
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].category == 1) {
            bb.push(res.data.list[i])
          }
        }
        that.setData({
          shop: bb
        })
        console.log(that.data.shop)
      }
    })
  },
  onReady: function() {
    let that=this;
    that.setData({
      cx0: 0
    })

  },
  // 特权跳转
  tequantiaozhuan: function(e) {
    let that = this;
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

    } else {
      if (e.currentTarget.id == 'tag2') {
        wx.navigateTo({
          url: '../friends/friends'
        })
      } else if (e.currentTarget.id == 'tag1') {
        wx.navigateTo({
          url: '../truck/truck'
        })
      } else if (e.currentTarget.id == 'tag4') {
        wx.navigateToMiniProgram({
          appId: 'wx694af04f8681686f',//要打开的小程序 appId
          path: 'pages/home/home',//打开的页面路径，如果为空则打开首页
          extraData: {
            foo: 'bar'//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
          },
          envVersion: 'release',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
          success(res) {
            // 打开成功
            console.log('成功')
          }
        })
      } else {
        this.setData({
          notkt_dis: 'block'
        })
      }
    }
    
  },
  // 滑块跳转
  huakuai_tiao: function(e) {
    if (e.currentTarget.id == 'img1') {
      app.globalData.index_tiao = 'cars_yong'
    } else if (e.currentTarget.id == 'img2') {
      app.globalData.index_tiao = 'cars_gaizhuang'
    } else {
      app.globalData.index_tiao = 'index'
    }
    wx.reLaunch({
      url: '../shop/shop'
    })
  },
  // 跳转商品详情页
  xiangqing_tiao: function(e) {
    // 根据获得的cardId和cardStr判断用户是否激活
    if (!app.globalData.userInfo.cardId && !app.globalData.userInfo.cardStr) {
      wx.showModal({
        title: '您还未激活，不能享受此服务',
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
      app.globalData.shop_id = e.currentTarget.id;
      wx: wx.navigateTo({
        url: '../shop_content/shop_content'
      })
    }
    
  },
  // 未开通弹窗
  no_kt: function() {
    this.setData({
      notkt_dis: 'none'
    })
  },
  // 优惠返现
  youhuifanxian:function(){
    wx.navigateTo({
      url: '../youhui/youhui',
    })
  }
})