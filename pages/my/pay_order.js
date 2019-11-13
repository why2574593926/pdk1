// pages/shop_content/shop_content.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情,订单详情
    sh_content:'',
    or_content:'',
    // 订单规格数量等
    goods:'',
    // 地址
    adres:'',
    // 皮豆
    s_pd:'',
    // 规格
    gnumber:{guige:'',number:''},
    // 能够付款判断
    w_pay:'',
    // 用户皮豆
    userpd:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      w_pay: app.globalData.wait_pay
    })
    // 商品详情获取
    let aa = { 'orderId': app.globalData.orderid }
    WXAPI.content_order(aa).then(function (res) {
      that.setData({
        sh_content: res.data.goods,
        or_content: res.data.orderInfo ,
        goods: JSON.parse(res.data.orderInfo.goods),
        adres: JSON.parse(res.data.orderInfo.address)
      })
      console.log(that.data.sh_content[0])
      console.log(that.data.or_content)
      console.log(that.data.goods)
      that.setData({
        gnumber: { guige: that.data.goods[0].guige, number: that.data.goods[0].number }
      })
      console.log(that.data.adres)
        that.setData({
          s_pd: that.data.sh_content[0].price * that.data.sh_content[0].number + that.data.goods[0].postPay-that.data.or_content.total 
        })
      console.log(that.data.s_pd)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {
  },
  // 判断皮豆够不够
  pdpd: function () {
    let that = this;
    
      if (that.data.sh_content[0].category != 1) {
        // 判断皮豆够不够
        // 获取皮豆
        let aa = { 'id': app.globalData.uid }
        WXAPI.hqpd(aa).then(function (res) {
          console.log(res.data)
          that.setData({
            userpd: res.data
          })
          if(that.data.s_pd==0){
            that.pay();
          }else{
            if (res.data.toFixed(2) < that.data.s_pd.toFixed(2)) {
              wx.showModal({
                title:'皮豆不足',
                content: '支付失败',
                showCancel: true,//是否显示取消按钮
                cancelText: "否",//默认是“取消”
                confirmText: "是",//默认是“确定”
                success: function (res) {
                  if (res.cancel) {
                    //点击取消
                    // let o = that.data.or_content;
                    // o.total = that.data.or_content.total + that.data.s_pd
                    // that.setData({
                    //   or_content: o,
                    //   s_pd: 0
                    // })
                    // that.pay();
                  } else {
                    //点击确定
                    // let o = that.data.or_content;
                    // o.total = that.data.or_content.total + that.data.s_pd- that.data.userpd
                    // that.setData({
                    //   or_content: o,
                    //   s_pd: that.data.userpd
                    // })
                    // that.pay();
                  }
                },
                fail: function (res) { },//接口调用失败的回调函数
                complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
              })
            } else {
              that.pay();
            }
          }
          
        })
      } else {
        that.pay();
      }    
    
  },
  // 支付
  pay: function (e) {
    let that = this;
    let pp = { 
      "body": that.data.sh_content[0].name,
      "out_trade_no": app.globalData.orderid,
      // "total_fee": (that.data.or_content.total * that.data.or_content.goodsNumber + that.data.goods.postPay) * 100,
      "total_fee": that.data.or_content.total * 100,
      "uid": app.globalData.oppid,
      "username": that.data.adres.username,
      "phone": that.data.adres.mobile,
      "address": that.data.adres.address,
      "addressM": that.data.adres.addressM,
      'goods': JSON.stringify(that.data.goods),
      'goodsPrice': that.data.or_content.goodsPrice,
      'postPay': that.data.goods.postPay,
      'specs': JSON.stringify(that.data.gnumber)
     }
    WXAPI.pay(pp).then(function (res) {
      let data = res.data
      console.log(res.data)
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': 'MD5',
        'paySign': data.paySign,
        success: function (res) {
          console.log("支付成功")
          console.log(res)
          if (that.data.sh_content[0].category != 1) {
            // 皮豆计算
            let pp = {
              'id': app.globalData.uid, 'pd': -that.data.s_pd, 'info': JSON.stringify({'shop':'-' + that.data.s_pd+''})}
            WXAPI.gxpd(pp).then(function (res) {
              console.log(res.data)
              wx.navigateBack({ url: 'order' })
            })
          } else {
            wx.navigateBack({ url: 'order' })
          }

        },
        fail(res) {
          console.log("支付失败")
          console.log(res)
        }

      })
    })
    
  }
})