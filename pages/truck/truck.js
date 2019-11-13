const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
var timer = 0;
var h = 0, m = 0, s = 0, h1, m1, s1;
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
    car_show: 0,
    // 行驶时间
    car_time: '00:00:00',
    // 皮豆计算时的动画
    jinbi: [
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' }
    ],
    jinbi1: [],
    // 地区是否选择判断
    adress1: 0,
    adress2: 0,
    // 皮豆数量
    pd_num: '',
    // 行车时间
    pd_time: '',
    pd_time2: '',
    // 时间差的秒数
    second: '',
    // 是否禁用地址选择判断
    disabled_pd:'',
    // 滚动判断
    scroll_pd:false
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
    this.setData({
      adress1: 1
    })
    // 保存地址
    wx.setStorageSync('region', e.detail.value)
    wx.setStorageSync('adress1', 1)
  },
  changeRegin1(e) {
    this.setData({ region1: e.detail.value });
    this.setData({
      adress2: 1
    })
    // 保存地址
    wx.setStorageSync('region1', e.detail.value)
    wx.setStorageSync('adress2', 1)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onUnload:function(){
    clearInterval(timer);
  },
  onLoad: function () {
    let that = this;


    // 

    that.setData({
      jinbi1: that.data.jinbi
    })
    // 获取皮豆
    let aa = { 'id': app.globalData.userInfo.id }
    WXAPI.hqpd(aa).then(function (res) {
      console.log(res.data)
      that.setData({
        pd_num: res.data
      })
    })

    // 状态
    that.setData({
      car_show: wx.getStorageSync('zhuangtai')
    })
    if (wx.getStorageSync('zhuangtai')) {
      // 地址赋值
      that.adress_fuzhi();
    } else {
      wx.setStorageSync('zhuangtai', 0)
    }
    if (wx.getStorageSync('zhuangtai') == 1) {
      // 计时器
      that.time_jishi();
    }
    // 禁用地址选择
    if (wx.getStorageSync('zhuangtai') == 1 || wx.getStorageSync('zhuangtai') == 2) {
      that.setData({
        disabled_pd: 'disabled',
        scroll_pd:true
      })
    }

    // 时间
    that.sjc_time();
    // 初始时
    that.cs_time();
  },
  adress_fuzhi: function () {
    this.setData({ region: wx.getStorageSync('region') });
    this.setData({ region1: wx.getStorageSync('region1') });
    this.setData({
      adress1: wx.getStorageSync('adress1'),
      adress2: wx.getStorageSync('adress2')
    })
  },
  // 缓存时间差获取
  sjc_time: function () {
    let that = this;
    if (wx.getStorageSync('seconds')) {
      console.log(parseInt(Date.parse(new Date()) / 1000) - wx.getStorageSync('seconds'))
      that.setData({
        second: parseInt(Date.parse(new Date()) / 1000) - wx.getStorageSync('seconds')
      })
    } else {
      wx.setStorageSync('seconds', 0)
      that.setData({
        second: 0
      })
      console.log('成功')
    }
  },
  // 初试时间设置
  cs_time: function () {
    let that = this;
    console.log(11111)
    h = 0, m = 0, s = 0, h1 = '', m1 = '', s1 = '';
    for (let i = 0; i < that.data.second; i++) {
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
    }
  },
  // 计时器
  time_jishi: function () {
    let that = this;
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
        pd_time: h
      })
      that.setData({
        pd_time2: m
      })
      console.log(s)
    }, 1000)
  },
  // 皮豆说明判断
  pd_display: function () {
    this.setData({
      pd_display: !this.data.pd_display
    })
  },
  // 车辆交替，时间计分
  car_s: function () {
    let that = this;
    // 开始
    if (that.data.car_show == 0) {
      if (that.data.adress1 == 1 && that.data.adress2 == 1) {
        that.setData({
          car_show: 1,
          car_time: '00:00:00',
          disabled_pd:'disabled',
          scroll_pd: true
        })
        wx.setStorageSync('zhuangtai', 1)
        wx.setStorageSync('seconds', parseInt(Date.parse(new Date()) / 1000))
        // 计时器
        that.time_jishi();
      } else {
        wx.showModal({
          title: '未选择地区',
          content: '或者未选完地区',
        })
      }

    }
    // 结束
    else if (that.data.car_show == 1) {
      clearInterval(timer);
      wx.setStorageSync('seconds', 0)
      // 初始时间差
      that.sjc_time();
      // 初始时间
      that.cs_time();

      // 判断是否满三十分钟
      if (that.data.pd_time == 0 && that.data.pd_time2<30){
        wx.showModal({
          title: '皮豆赚取失败',
          content: '行程不满30分钟',
        })
        that.setData({
          car_show: 2,
          scroll_pd: false
        })
      }else{
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
            [index1]: '55rpx',
            [w1]: '10rpx',
            [h1]: '10rpx'
          })


        }, 100);
        that.setData({
          car_show: 2,
          scroll_pd: false
        })

        // 皮豆计算
        let aa = { 'id': app.globalData.uid, 'pd': '', 'info': JSON.stringify({ 'gaosujifen': '' }) }
        if (that.data.pd_time <= 0) {
          aa.pd = 38;
          aa.info = JSON.stringify({ 'gaosujifen': '+' + aa.pd + '' });
        } else if (that.data.pd_time <= 6 && that.data.pd_time > 0) {
          aa.pd = that.data.pd_time * 38
          aa.info = JSON.stringify({ 'gaosujifen': '+' + aa.pd + '' });
        } else {
          aa.pd = 6 * 38;
          aa.info = JSON.stringify({ 'gaosujifen': '+' + aa.pd + '' });
        }
        wx.setStorageSync('zhuangtai', 2)
        // 保存高速积分皮豆限定数量

        WXAPI.gxpd(aa).then(function (res) {
          console.log(res.data)
          if (res.code == -1) {
            wx.showModal({
              title: '皮豆增加失败',
              content: res.msg,
            })
          } else {
            that.setData({
              pd_num: res.data.pd
            })
          }

        })
      }
      


    }
    // 再次选择地区
    else if (that.data.car_show == 2) {
      that.setData({
        car_show: 0,
        jinbi: that.data.jinbi1,
        adress1: 0,
        adress1: 0,
        region: ["出发地", "", ""],
        region1: ["目的地", "", ""],
        disabled_pd: ''
      })
      // 保存地址1
      wx.setStorageSync('region', ["出发地", "", ""])
      wx.setStorageSync('adress1', 0)
      // 保存地址2
      wx.setStorageSync('region1', ["目的地", "", ""])
      wx.setStorageSync('adress2', 0)
      that.adress_fuzhi();
      // 
      wx.setStorageSync('zhuangtai', 0)
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
