// pages/active/active.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 表单提交
  formSubmit: function (e) {
    console.log(e.detail.value.number)
    let rg = /^1[3456789]\d{9}$/;
    if (rg.test(e.detail.value.number)){
      let that = this;
      let aa = {
        uid: app.globalData.userInfo.uid,
        cardId: e.detail.value.ppcard,
        username: e.detail.value.user,
        phone: e.detail.value.number
      }
      console.log(e.detail.value)
      WXAPI.active(aa).then(function (res) {
        if (res.code == 0) {
          //发起网络请求
              app.globalData.userInfo = res.data;
              app.globalData.uid = res.data.id;
          wx.showModal({
            title: '激活成功',
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../index/index',
                })
              } else {
                wx.reLaunch({
                  url: '../index/index',
                })
              }

            }
          })
        } else {
          wx.showModal({
            title: '激活失败',
            content: res.msg,
          })
        }
      })
    }else{
      wx.showModal({
        title: '手机号输入错误'
      })
    
    }
  },
  // 卖卡小程序跳转
  xcx_tiao:function(){
    wx.navigateToMiniProgram({
      appId: 'wx03fedf147c324919',//要打开的小程序 appId
      path: 'pages/index/index',//打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'bar'//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'release',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
        console.log('成功')
      }
    })
  },
  // 跳过激活
  tiaoguo:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})