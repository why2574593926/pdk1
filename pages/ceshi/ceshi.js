// pages/ceshi/ceshi.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jinbi:[
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' },
      { left_top: '400rpx', left_left: '0rpx' }
    ]
  },
  money:function(e){
    let that = this;
    var i=-1;
    if (e.currentTarget.id=='b1'){
      var t = setInterval(function () {
        if (i < 8) {
          i++;
        } else {
          clearInterval(t);
        }
        let index = "jinbi[" + i + "].left_left";
        that.setData({
          [index]: '400rpx'
        })


      }, 100);
    } else {
      var t = setInterval(function () {
        if (i < 8) {
          i++;
        } else {
          clearInterval(t);
        }
        let index = "jinbi[" + i + "].left_left";
        that.setData({
          [index]: '0rpx'
        })


      }, 100)
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