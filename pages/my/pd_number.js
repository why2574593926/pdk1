// pages/my/pd_number.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 皮豆数量
    pd_num:'',
    // 皮豆明细
    pd_list:0,
    // 高速积分
    list1:0,
    // 签到积分
    list2: 0,
    // 商品积分
    list3: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    // 获取皮豆
    let aa = { 'id': app.globalData.uid }
    WXAPI.hqpd(aa).then(function (res) {
      console.log(res.data)
      that.setData({
        pd_num: res.data
      })
    })
    // 获取皮豆收支明细
    let bb = { 'id': app.globalData.uid }
    WXAPI.logo_list(bb).then(function (res) {
      console.log(res.data)
      let pd=[];
      for(let i=0;i<res.data.length;i++){
        if (res.data[i].content){
          pd.push(JSON.parse(res.data[i].content));
        }
      }
      that.setData({
        pd_list:pd
      })
      for(let i=0;i<that.data.pd_list.length;i++){
        for (var a in that.data.pd_list[i]){
          if(a=='gaosujifen'){
            that.setData({
              list1: that.data.list1+ parseInt(that.data.pd_list[i][a])
            })
          }else if(a=='qiandao'){
            that.setData({
              list2: that.data.list2 + parseInt(that.data.pd_list[i][a])
            })
          } else if (a == 'shop') {
            that.setData({
              list3: that.data.list3 + parseInt(that.data.pd_list[i][a])
            })
          } else if (a == 'challenge') {
            that.setData({
              list4: that.data.list3 + parseInt(that.data.pd_list[i][a])
            })
          }
        }
      }
      console.log(that.data.pd_list)
    })
  },
  // 去使用跳转商城页面
  pdn_tiao:function(){
    wx.reLaunch({
      url: '../shop/shop',
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