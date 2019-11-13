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
    img_gou:true,
    // 收货地址
    adress1:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    // 地址获取
    let aa = { 'id': app.globalData.uid};
    WXAPI.adress(aa).then(function (res) {
      console.log(res.data)
      that.setData({
        adress1:res.data
      })
    })
  },
  onShow: function () {
    let that = this;
    // 地址获取
    let aa = { 'id': app.globalData.uid };
    WXAPI.adress(aa).then(function (res) {
      console.log(res.data)
      that.setData({
        adress1: res.data
      })
    })

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
  img_gou:function(e){
    let that=this;
    for (let i = 0; i < that.data.adress1.length;i++){
      if(e.currentTarget.id==that.data.adress1[i].id){
        if (that.data.adress1[i].isDefault==0){
          let aa = that.data.adress1;
          aa[i].isDefault=1;
          let bb = aa[i];
          WXAPI.adress_isDefault(bb).then(function (res) {
            console.log(res)
            let cc = { 'id': app.globalData.uid };
            WXAPI.adress(cc).then(function (res) {
              console.log(res.data)
              that.setData({
                adress1: res.data
              })
            })
          })
        }else{
          let aa = that.data.adress1;
          aa[i].isDefault = 0;
          let bb = aa[i];
          WXAPI.adress_isDefault(bb).then(function (res) {
            console.log(res)
            let cc = { 'id': app.globalData.uid };
            WXAPI.adress(cc).then(function (res) {
              console.log(res.data)
              that.setData({
                adress1: res.data
              })
            })
          })
        }
        
      }
    }
    
  },
  // 添加
  add:function(){
    wx.navigateTo({
      url: '../adress_add/adress_add'
    })
  },
  // 修改
  gai:function(e){
    let that = this;
    for (let i = 0; i < that.data.adress1.length; i++) {
      if (e.currentTarget.id == that.data.adress1[i].id) {
        app.globalData.adress_gai=that.data.adress1[i];
        wx.navigateTo({
          url: '../adress_gai/adress_gai'
        })
      }
    }
  },
  // 删除
  delete1:function(e){
    let that=this;
    wx.showModal({
      title: '删除收货地址',
      content: '确地删除该地址？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          let aa = { 'id': e.currentTarget.id };
          WXAPI.adress_delete(aa).then(function (res) {
            console.log(res.data)
            let cc = { 'id': app.globalData.uid };
            WXAPI.adress(cc).then(function (res) {
              console.log(res.data)
              that.setData({
                adress1: res.data
              })
            })
          })
        }
      }
    })
    
  },
  // 商品跳进来的地址选择
  adress_x:function(e){
    let that=this;
    if (app.globalData.address_pay==1){
      for (let i = 0; i < that.data.adress1.length; i++) {
        if (that.data.adress1[i].id == e.currentTarget.id) {
          app.globalData.adress_xz = that.data.adress1[i]
          app.globalData.address_pay=0;
          wx.navigateBack({
            url: '../shop_pay/shop_pay',
          })
        }
      }

    }
    
  }
})
