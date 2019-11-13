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
    style_x5: ['#9C9C9C', '#F9F9F9'],
    // 订单
    goodsMap:{},
    goodsMap1:{},
    orderList:{},
    // 无订单提示
    yw_order:'',
    // 订单类型
    order_lei:-1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选项卡
  xxk: function (e) {
    let that=this;
    if (e.currentTarget.id == 'x1') {
      this.setData({
        style_x1: ['#FF7721', '#FF7319'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
      that.wait_pay(1000);
      that.setData({
        order_lei: 1000
      })
      
    } else if (e.currentTarget.id == 'x2') {
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#FF7721', '#FF7319'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
      that.wait_pay(-1);
      that.setData({
        order_lei:-1
      })
    } else if (e.currentTarget.id == 'x3') {
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#FF7721', '#FF7319'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
      that.wait_pay(0);
      that.setData({
        order_lei: 0
      })
    } else if (e.currentTarget.id == 'x4') {
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#FF7721', '#FF7319'],
        style_x5: ['#9C9C9C', '#F9F9F9']
      })
      that.wait_pay(1);
      that.setData({
        order_lei: 1
      })
    } else{
      this.setData({
        style_x1: ['#9C9C9C', '#F9F9F9'],
        style_x2: ['#9C9C9C', '#F9F9F9'],
        style_x3: ['#9C9C9C', '#F9F9F9'],
        style_x4: ['#9C9C9C', '#F9F9F9'],
        style_x5: ['#FF7721', '#FF7319']
      })
      that.wait_pay(2);
      that.setData({
        order_lei: 2
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
  // 订单所有
  wait_pay:function(e){
    let that=this;
    let aa = {'uid': app.globalData.userInfo.uid,'status':e}
    WXAPI.get_order(aa).then(function (res) {
      if (res.data){
        that.setData({
          goodsMap: res.data.goodsMap,
          orderList: res.data.orderList,
          yw_order:1
        })
        let it = [];
        for (let key in that.data.goodsMap){
          
          it.push(that.data.goodsMap[key]);

        }
        that.setData({
          goodsMap1: it
        })
        console.log(that.data.goodsMap1)
        console.log(that.data.orderList)
      }else{
        that.setData({
          goodsMap: {},
          goodsMap1:{},
          orderList: {},
          yw_order:0
        })
        console.log(res.data)
      }
    })
  },
  // 查看详情与付款
  delete_tiao_order1: function (e) {
    let that = this;
    console.log(e.currentTarget.dataset.wait)
    app.globalData.orderid = e.currentTarget.id;
    app.globalData.wait_pay = e.currentTarget.dataset.wait;
    wx.navigateTo({
      url: 'pay_order',
    })
  },
  // 取消订单
  delete_tiao_order2: function (e) {
    let that = this;
    console.log(e.currentTarget.id)
    let aa = { 'orderId': e.currentTarget.id }
    WXAPI.delete_order(aa).then(function (res) {
      console.log(res)
      that.wait_pay(that.data.order_lei);
    })
  },
  // 确认收货
  shouhuo_tiao_order2: function (e) {
    let that = this;
    console.log(e.currentTarget.id)
    let ss = { 'orderId': e.currentTarget.id }
    WXAPI.content_order(ss).then(function (res) {
      console.log(res.data.orderInfo)
      res.data.orderInfo.status=2;
      let aa = res.data.orderInfo;
      WXAPI.update_order(aa).then(function (res) {
        console.log(res)
        that.wait_pay(that.data.order_lei);
      })
    })
    
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