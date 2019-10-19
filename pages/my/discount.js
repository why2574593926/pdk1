// pages/my/discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选项卡颜色
    style_x1: ['#FF7721','#FF7319'],
    style_x2: ['#9C9C9C', '#E1DADB'],
    style_x3: ['#9C9C9C', '#E1DADB']
  },
  // 选项卡
  xxk:function(e){
    if (e.currentTarget.id == 'x1'){
      this.setData({
        style_x1: ['#FF7721', '#FF7319'],
        style_x2: ['#9C9C9C', '#E1DADB'],
        style_x3: ['#9C9C9C', '#E1DADB']
      })
    }else if (e.currentTarget.id=='x2'){
      this.setData({
        style_x1: ['#9C9C9C', '#E1DADB'],
        style_x2: ['#FF7721', '#FF7319'],
        style_x3: ['#9C9C9C', '#E1DADB']
      })
    }else{
      this.setData({
        style_x1: ['#9C9C9C', '#E1DADB'],
        style_x2: ['#9C9C9C', '#E1DADB'],
        style_x3: ['#FF7721', '#FF7319']
      })
    }
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