// pages/my/order.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style_x1: ['#FF7721', '#FF7319'],
    style_x2: ['#9C9C9C', '#F9F9F9'],
    style_x3: ['#9C9C9C', '#F9F9F9'],
    style_x4: ['#9C9C9C', '#F9F9F9'],
    style_x5: ['#9C9C9C', '#F9F9F9']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选项卡
  xxk: function (e) {
    if (e.currentTarget.id == 'x1') {
      this.setData({
        style_x1: ['#FF7721', '#FF7319'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
    } else if (e.currentTarget.id == 'x2') {
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#FF7721', '#FF7319'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
    } else if (e.currentTarget.id == 'x3') {
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#FF7721', '#FF7319'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
    } else if (e.currentTarget.id == 'x4') {
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#FF7721', '#FF7319'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
    } else{
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#FF7721', '#FF7319']
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function () {
    let that=this;
    that.xxk(app.globalData.dingdan);
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