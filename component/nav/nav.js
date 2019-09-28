// component/nav/nav.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[
      { 'name': '首页', 'color': '#AEAEAE', 'url': '../img/nav11.png', 'url2':'../index/index'},
      { 'name': '皮皮商城', 'color': '#AEAEAE', 'url': '../img/nav22.png', 'url2': '../shop/shop' },
      { 'name': '尊享特权', 'color': '#AEAEAE', 'url': '../img/nav33.png', 'url2': '../privilege/privilege' },
      { 'name': '我的', 'color': '#AEAEAE', 'url': '../img/nav44.png', 'url2': '../index/index' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  navbh: function (options) {
    let that = this;
    let app_nav = app.globalData.nav;
    let app_nav2 = app_nav+1;
    let color = "nav[" + app_nav + "].color";
    let url = "nav[" + app_nav + "].url";
    that.setData({
      [color]: '#FF6D10',
      [url]: "../img/nav" + app_nav2 + ".png",
    })
  },
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