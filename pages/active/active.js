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
        uid: app.globalData.uid,
        cardId: e.detail.value.ppcard,
        username: e.detail.value.user,
        phone: e.detail.value.number
      }
      console.log(e.detail.value)
      WXAPI.active(aa).then(function (res) {
        // 根据获得的cardId和cardStr判断用户是否激活
        if (res.code == 0) {
          wx.showModal({
            title: '激活成功',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../index/index',
                })
              } else {
                wx.redirectTo({
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