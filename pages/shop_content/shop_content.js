// pages/shop_content/shop_content.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点赞
    aid_img:'../img/dianzan1.png',
    aid_number:0,
    // 规格数量移动等
    con_color_max_dis:'none',
    con_color_dis:'-80%;',
    con_color_number:1,
    // 商品详情
    shop_con:{},
    // 点赞状态
    praise:'',
    // 规格
    // 颜色
    item1: [
      { value: 'item1', color1: '', color2: '' }
    ],
    // 大小
    item2: [
      { value: 'item2', color1: '', color2: '' }
    ],
    // 品牌
    item3: [
      { value: 'item3', color1: '', color2: '' }
    ],
    // 型号
    item4: [
      { value: 'item4', color1: '', color2: '' }
    ],
    // 已选规格
    guige:'',
    guige1: '',
    guige2: '',
    guige3: '',
    guige4: '',
    //邮费
    yf:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      yf: app.globalData.postpay_qg
    })
    // 商品详情获取
    let aa = { 'id': app.globalData.shop_id}
    WXAPI.shop_content(aa).then(function (res) {
      if (res.code == 0) {
        if (res.data.sells==null){
          res.data.sells=0;
        }
        that.setData({
          shop_con:res.data
        })
        app.globalData.guige_number.guige=that.data.guige;
        app.globalData.guige_number.number = that.data.con_color_number;
        console.log(that.data.shop_con)
        console.log(app.globalData.guige_number)
        // 规格获取
        let gg = JSON.parse(that.data.shop_con.specs)
        console.log(gg.color[0])
        that.item(gg.color,'item1');
        that.item(gg.size, 'item2');
        that.item(gg.pp, 'item3');
        that.item(gg.xh, 'item4');
        that.setData({
          guige1: that.data.item1[1].value,
          guige2: that.data.item2[1].value,
          guige3: that.data.item3[1].value,
          guige4: that.data.item4[1].value,
          guige: that.data.item1[1].value + that.data.item2[1].value+that.data.item3[1].value+that.data.item4[1].value
        })
        app.globalData.guige_number.guige = that.data.guige;
        app.globalData.guige_number.number = that.data.con_color_number;
      }
    })
    // 获取点赞状态
    that.aid1();
  },
  // 规格获取
  item:function(a,b){
    let that=this;
    for (let i = 0; i < a.length; i++) {
      let it = that.data[b];
      let it1 = { value: '复古红', color1: '#FF6D10', color2: '#FF6D10' };
      it1.value = a[i];
      if(i==0){
        it1.color1 = '#FF6D10';
        it1.color2 = '#FF6D10';
      }else{
        it1.color1 = '#9A9A9A';
        it1.color2 = '#9A9A9A';
      }
      
      it.push(it1);
      if (b =='item1'){
        that.setData({
          item1: it
        })
      } else if (b =='item2'){
        that.setData({
          item2: it
        })
      } else if (b =='item3'){
        that.setData({
          item3: it
        })
      } else if (b =='item4'){
        that.setData({
          item4: it
        })
      }
      
    }
  },
  // 点赞
  aid:function(){
    let that=this;
    if (that.data.praise==0){
      // 点赞商品
      let cc = { 'uid': app.globalData.userInfo.uid, 'goodId': app.globalData.shop_id }
      WXAPI.praise_do(cc).then(function (res) {
        that.setData({
          aid_img: '../img/dianzan2.png',
          aid_number: 1,
          praise:7
        })
        console.log(res)
      })
      
    }else{
      // 取消点赞
      let dd = { 'uid': app.globalData.userInfo.uid, 'goodId': app.globalData.shop_id }
      WXAPI.praise_no(dd).then(function (res) {
        that.setData({
          aid_img: '../img/dianzan1.png',
          aid_number: 0,
          praise: 0
        })
        console.log(res)
      })
     
    }
    
  },
  // 点赞状态判断
  aid1:function(){
    let that=this;
    // 获取点赞状态
    let ee = { 'uid': app.globalData.userInfo.uid, 'goodId': app.globalData.shop_id }
    WXAPI.praise_is(ee).then(function (res) {
      if (res.code == 0) {

        that.setData({
          praise: 0,
          aid_img: '../img/dianzan1.png',
          aid_number: 0
        })
        console.log(res)
        console.log(that.data.praise)
      }
      else {

        that.setData({
          praise: 7,
          aid_img: '../img/dianzan2.png',
          aid_number: 1
        })
        console.log(res)
        console.log(that.data.praise)
      }
    })
  },
  // 规格和数量弹出框
  buy:function(){
    let that=this;
    if(that.data.con_color_max_dis=='none'){
      that.setData({
        con_color_max_dis:'block',
        con_color_dis:'0rpx'
      })
    }else{
      that.setData({
        con_color_max_dis: 'none',
        con_color_dis: '-80%'
      })
    }
  },
  // 数量加减
  numberjj:function(e){
    let that=this;
    if (e.currentTarget.id==0){
      if (that.data.con_color_number > 0) {
        that.setData({
          con_color_number: that.data.con_color_number-1
        })
        app.globalData.guige_number.number = that.data.con_color_number;
      }
    }else{
      that.setData({
        con_color_number: that.data.con_color_number + 1
      })
      app.globalData.guige_number.number = that.data.con_color_number;
    }
    
  },
  //跳转付款界面
  queding:function(){
    wx:wx.navigateTo({
      url: 'shop_pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 规格选择
  radioChange1: function (e) {
    let that = this;
    for (let i = 1; i < that.data.item1.length; i++) {
      if (e.currentTarget.id == i) {
        let iit = that.data.item1;
        iit[i].color1 = '#FF6D10';
        iit[i].color2 = '#FF6D10';
        that.setData({
          item1: iit,
          guige1: iit[i].value
        })
      } else {
        let iit = that.data.item1;
        iit[i].color1 = '#9A9A9A';
        iit[i].color2 = '#9A9A9A';
        that.setData({
          item1: iit
        })
      }
    }
    that.setData({
      guige: that.data.guige1 + that.data.guige2 + that.data.guige3 + that.data.guige4
    })
    app.globalData.guige_number.guige = that.data.guige;
    app.globalData.guige_number.number = that.data.con_color_number;
    console.log(app.globalData.guige_number)
  },
  radioChange2: function (e) {
    let that = this;
    for (let i = 1; i < that.data.item2.length; i++) {
      if (e.currentTarget.id == i) {
        let iit = that.data.item2;
        iit[i].color1 = '#FF6D10';
        iit[i].color2 = '#FF6D10';
        that.setData({
          item2: iit,
          guige2: iit[i].value
        })
      } else {
        let iit = that.data.item2;
        iit[i].color1 = '#9A9A9A';
        iit[i].color2 = '#9A9A9A';
        that.setData({
          item2: iit
        })
      }
    }
    app.globalData.guige_number.guige = that.data.guige1;
    app.globalData.guige_number.number = that.data.con_color_number;
    console.log(app.globalData.guige_number)
  },
  radioChange3: function (e) {
    let that = this;
    for (let i = 1; i < that.data.item3.length; i++) {
      if (e.currentTarget.id == i) {
        let iit = that.data.item3;
        iit[i].color1 = '#FF6D10';
        iit[i].color2 = '#FF6D10';
        that.setData({
          item3: iit,
          guige3: iit[i].value
        })
      } else {
        let iit = that.data.item3;
        iit[i].color1 = '#9A9A9A';
        iit[i].color2 = '#9A9A9A';
        that.setData({
          item3: iit
        })
      }
    }
    that.setData({
      guige: that.data.guige1 + that.data.guige2 + that.data.guige3 + that.data.guige4
    })
    app.globalData.guige_number.guige = that.data.guige;
    app.globalData.guige_number.number = that.data.con_color_number;
    console.log(app.globalData.guige_number)
  },
  radioChange4: function (e) {
    let that = this;
    for (let i = 1; i < that.data.item4.length; i++) {
      if (e.currentTarget.id == i) {
        let iit = that.data.item4;
        iit[i].color1 = '#FF6D10';
        iit[i].color2 = '#FF6D10';
        that.setData({
          item4: iit,
          guige4: iit[i].value
        })
      } else {
        let iit = that.data.item4;
        iit[i].color1 = '#9A9A9A';
        iit[i].color2 = '#9A9A9A';
        that.setData({
          item4: iit
        })
      }
    }
    that.setData({
      guige: that.data.guige1 + that.data.guige2 + that.data.guige3 + that.data.guige4
    })
    app.globalData.guige_number.guige = that.data.guige;
    app.globalData.guige_number.number = that.data.con_color_number;
    console.log(app.globalData.guige_number)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})