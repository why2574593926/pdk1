// pages/loading/loading.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    uid:''
  },
  // 点击开始登陆授权判断激活状态并跳转页面
  start_yz:function(){
    let that = this;
    // 登录授权
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          let aa = { 'js_code': res.code }
          WXAPI.log(aa).then(function (res) {
            if (res.code == 0) {
              that.setData({
                userInfo:res.data,
                uid: res.data.uid
              })
              
            }
            app.globalData.userInfo = that.data.userInfo;
            app.globalData.uid = that.data.uid; 
            // 根据获得的cardId和cardStr判断用户是否激活
            if (!that.data.userInfo.cardId && !that.data.userInfo.cardStr){
              wx.redirectTo({
                url: '../active/active',
              })
            }else{
              wx.redirectTo({
                url: '../index/index',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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