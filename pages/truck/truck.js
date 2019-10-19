const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
var timer = 0;
Page({
  data: {
    //底部导航标识
    nav: 0,
    userInfo: {},
    // 皮豆显示隐藏控制
    pd_display: false,
    qiandao: [
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '1', 'day': '第1天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '2', 'day': '第2天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '3', 'day': '第3天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '4', 'day': '第4天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '5', 'day': '第5天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '6', 'day': '第6天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '7', 'day': '第7天' }
    ],
    // 省市区三级联动初始化
    region: ["出发地", "", ""],
    region1: ["目的地", "", ""],
    // 控制车辆隐藏
    car_show:0,
    // 行驶时间
    car_time:'00:00:00',
    // 皮豆计算时的动画
    jinbi: [
      { left_top: '68%', left_left: '-50rpx',w:'50rpx',h:'50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx'},
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx'},
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx'},
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx'},
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx'},
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx'}
    ],
    jinbi1:[],
    // 地区是否选择判断
    adress1:0,
    adress2:0,
    // 皮豆数量
    pd_num:'',
    // 行车时间
    pd_time:''
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
    this.setData({
      adress1:1
    })
  },
  changeRegin1(e) {
    this.setData({ region1: e.detail.value });
    this.setData({
      adress2: 1
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    that.setData({
      jinbi1:that.data.jinbi
    })
    // 获取皮豆
    let aa = { 'id': app.globalData.uid}
    WXAPI.hqpd(aa).then(function (res) {
      console.log(res.data)
      that.setData({
        pd_num:res.data
      })
    })
  },
// 皮豆说明判断
  pd_display:function(){
    this.setData({
      pd_display: !this.data.pd_display
    })
  },
  // 车辆交替，时间计分
  car_s:function(){
    let that=this;
    // 开始
    if (that.data.car_show==0){
      if (that.data.adress1 == 1 && that.data.adress2 == 1){
        that.setData({
          car_show: 1,
          car_time: '00:00:00'
        })
        var h = 0, m = 0, s = 0, h1, m1, s1;
        timer = setInterval(function () {
          if (s == 59) {
            if (m == 59) {
              if (h == 6) {
                // 最大时长
                clearInterval(timer);
                return;
              } else {
                h++;
              }

              m = 0;
            } else {
              m++;
            }
            s = 0;
          } else {
            s++;
          }
          if (h < 10) {
            h1 = '0' + h;
          } else {
            h1 = h;
          }
          if (m < 10) {
            m1 = '0' + m;
          } else {
            m1 = m;
          }
          if (s < 10) {
            s1 = '0' + s;
          } else {
            s1 = s;
          }
          let t = h1 + ':' + m1 + ':' + s1;
          that.setData({
            car_time: t
          })
          that.setData({
            pd_time:h
          })
        }, 1000)
      }else{
        wx.showModal({
          title: '未选择地区',
          content: '或者未选完地区',
        })
      }
      
    }
    // 结束
    else if (that.data.car_show == 1) {
      clearInterval(timer);
      var i = -1;
        var t = setInterval(function () {
          if (i < 8) {
            i++;
          } else {
            clearInterval(t);
          }
          let index = "jinbi[" + i + "].left_left";
          let index1 = "jinbi[" + i + "].left_top";
          let w1 = "jinbi[" + i + "].w";
          let h1 = "jinbi[" + i + "].h";
          that.setData({
            [index]: '265rpx;',
            [index1]:'55rpx',
            [w1]:'10rpx',
            [h1]:'10rpx'
          })


        }, 100);
      that.setData({
        car_show: 2
      })
      // 皮豆计算
      let aa = { 'id': app.globalData.uid ,'pd':''}
      if(that.data.pd_time<=0){
        aa.pd=1;
      } else if (that.data.pd_time <= 6 && that.data.pd_time>0){
        aa.pd = that.data.pd_time
      }else{
        aa.pd=6;
      }
      WXAPI.gxpd(aa).then(function (res) {
        console.log(res.data)
        that.setData({
          pd_num: res.data.pd
        })
      })
    }
    // 再次选择地区
    else if (that.data.car_show == 2) {
      that.setData({
        car_show: 0,
        jinbi:that.data.jinbi1,
        adress1:0,
        adress1: 0,
        region: ["出发地", "", ""],
        region1: ["目的地", "", ""]
      })
      var i = -1;
        var t = setInterval(function () {
          if (i < 8) {
            i++;
          } else {
            clearInterval(t);
          }
          let index = "jinbi[" + i + "].left_left";
          let index1 = "jinbi[" + i + "].left_top";
          let w1 = "jinbi[" + i + "].w";
          let h1 = "jinbi[" + i + "].h";
          that.setData({
            [index]: '-50rpx',
            [index1]: '68%',
            [w1]: '50rpx',
            [h1]: '50rpx'
          })


        }, 100);
    }
  }
})
