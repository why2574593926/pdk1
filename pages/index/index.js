const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav:0,
    userInfo: {},
    // 测试
    ceshi:'',
    tequan1:[
      {
        'tag':'tag1',
        'url':'../img/icon1.png',
        'content':'皮皮互助',
        'reservedata1': '',
        'reservedata2':'1',
        "url2":'HOT'
      },
      {
        'tag': 'tag2',
        'url': '../img/icon2.png',
        'content': '高速积分',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '货车专用'
      },{
        'tag':'tag3',
        'url':'../img/icon3.png',
        'content':'结伴而行',
        'reservedata1': '',
        'reservedata2':'1',
        "url2":'NEW'
      },
      {
        'tag': 'tag4',
        'url': '../img/icon4.png',
        'content': '定制旅游',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": 'NEW'
      },
      {
        'tag': 'tag5',
        'url': '../img/icon5.png',
        'content': '货车加油',
        'reservedata1': '笔笔返现',
        'reservedata2': '1',
        "url2": 'NEW'
      },
      {
        'tag': 'tag6',
        'url': '../img/icon6.png',
        'content': '违章举报',
        'reservedata1': '有奖举报',
        'reservedata2': '1',
        "url2": '有奖'
      },
      {
        'tag': 'tag7',
        'url': '../img/icon7.png',
        'content': '加油打折',
        'reservedata1': '92折优惠',
        'reservedata2': '1',
        "url2": '全国五万家'
      },
      {
        'tag': 'tag8',
        'url': '../img/icon8.png',
        'content': '办理ETC',
        'reservedata1': '返现20元',
        'reservedata2': '1',
        "url2": '免费'
      },
      {
        'tag': 'tag9',
        'url': '../img/icon9.png',
        'content': '道路救援',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': 'tag10',
        'url': '../img/icon10.png',
        'content': '机车改装',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      },
      {
        'tag': 'tag11',
        'url': '../img/icon11.png',
        'content': '酒店住宿',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": '7折起'
      },
      {
        'tag': 'tag12',
        'url': '../img/icon12.png',
        'content': '更多服务',
        'reservedata1': '',
        'reservedata2': '1',
        "url2": ''
      }
    ],
    //商品
    shop:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    // 导航判断
    app.globalData.nav=that.data.nav;
    this.selectComponent("#mpnav").navbh();
    // 商品获取
    let aa = {'page': 1,'pageSize': 10}
    WXAPI.shop(aa).then(function (res) {
      if (res.code == 0) {
        console.log(res.data.list)
        let bb=[];
        for(let i=0;i<res.data.list.length;i++){
          if (res.data.list[i].category==1){
            bb.push(res.data.list[i])
          }
        }
        that.setData({
          shop:bb
        })
        console.log(that.data.shop)
      }
    })
  },
  onReady:function(){
    
    
  },
  // 特权跳转
  tequantiaozhuan:function(e){
      let that = this;
    if (e.currentTarget.id=='tag3') {
        wx.navigateTo({
          url: '../friends/friends'
        })
      }
    else if (e.currentTarget.id == 'tag2') {
      wx.navigateTo({
        url: '../truck/truck'
      })
    }else{
      wx.showModal({
        title: '暂未开通',
        content: '敬请期待',
      })
    }
  },
  // 滑块跳转
  huakuai_tiao:function(e){
    if(e.currentTarget.id=='img1'){
      app.globalData.index_tiao ='cars_yong'
    } else if (e.currentTarget.id == 'img2') {
      app.globalData.index_tiao = 'cars_gaizhuang'
    }else{
      app.globalData.index_tiao = 'index'
    }
    wx.reLaunch({
      url: '../shop/shop'
    })
  }
})
