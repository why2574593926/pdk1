// pages/shop_content/shop_content.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情
    shop_con: {},
    // 地址详情
    adress_con:{},
    // 订单号
    orderId: 1,
    // 商品编号
    goods:'',
    // 商品价格，皮豆，邮费，数量
    s_price:'',
    s_pd:0,
    s_number:'',
    xs_s_price:'',
    // 规格
    gg:'',
    // 最高优惠
    price_zuigai:0,
    //邮费
    yf: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 邮费
    that.setData({
      yf: app.globalData.postpay_qg
    })
    app.globalData.address_pay = 1;
    // 规格
    that.setData({
      gg: app.globalData.guige_number.guige
    })
    // 商品详情获取
    let aa = { 'id': app.globalData.shop_id }
    WXAPI.shop_content(aa).then(function (res) {
      if (res.code == 0) {

        that.setData({
          shop_con: res.data
        })
        console.log(that.data.shop_con)
        // 商品编号
        let ids = [];
        ids.push(that.data.shop_con.id)
        that.setData({
          goods: ids.join('-')
        })
        // 价格皮豆邮费显示
        if (that.data.shop_con.category != 1){
          that.setData({
            s_price: (that.data.shop_con.price - that.data.shop_con.pd) * app.globalData.guige_number.number,
            xs_s_price: (that.data.shop_con.price - that.data.shop_con.pd) * app.globalData.guige_number.number,
            s_pd: that.data.shop_con.pd * app.globalData.guige_number.number,
            s_number: app.globalData.guige_number.number
          })
        }else{
          that.setData({
            s_price: that.data.shop_con.price * app.globalData.guige_number.number,
            xs_s_price:that.data.shop_con.price * app.globalData.guige_number.number,
            s_pd: that.data.shop_con.pd * app.globalData.guige_number.number,
            s_number: app.globalData.guige_number.number
          })
        }
        that.setData({
          price_zuigai:that.data.s_pd
        })
        console.log(that.data.goods)
      }
    })
    // 地址获取
    let bb = { 'id': app.globalData.uid }
    console.log(app.globalData.uid)
    WXAPI.adress(bb).then(function (res) {
      if (res.code == 0) {
        app.globalData.adress_xz=res.data[0]
        for(let i=0;i<res.data.length;i++){
          if (res.data[i].isDefault==1) {
            app.globalData.adress_xz = res.data[i]
          }
        }
        that.setData({
          adress_con: app.globalData.adress_xz
        })
        console.log(res)
        console.log(app.globalData.adress_xz)
      }
    })
    
  },
  // 地址选择
  adress_tiao:function(){
    wx.navigateTo({
      url: '../adress/adress',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {
    let that=this;
    
    // 地址获取
      let bb = { 'id': app.globalData.uid }
      console.log(app.globalData.uid)
      WXAPI.adress(bb).then(function (res) {
        if (res.code == 0) {
          console.log(app.globalData.adress_xz)
          console.log(res.data)
          if (res.data[0]==''){
            app.globalData.adress_xz = res.data[0]
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].isDefault == 1) {
                app.globalData.adress_xz = res.data[i]
              }
            }
            that.setData({
              adress_con: app.globalData.adress_xz
            })
          }else{
            if (app.globalData.adress_xz){
              let j = 0;
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id == app.globalData.adress_xz.id) {
                  that.setData({
                    adress_con: app.globalData.adress_xz
                  })
                  j = 1;
                }
              }
              if (j == 0) {
                app.globalData.adress_xz = res.data[0]
                for (let i = 0; i < res.data.length; i++) {
                  if (res.data[i].isDefault == 1) {
                    app.globalData.adress_xz = res.data[i]
                  }
                }
                that.setData({
                  adress_con: app.globalData.adress_xz
                })
              }
            }else{
              
              app.globalData.adress_xz = res.data[0]
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].isDefault == 1) {
                  app.globalData.adress_xz = res.data[i]
                }
              }
              that.setData({
                adress_con: app.globalData.adress_xz
              })
            }
          }
          
        }
      })

      app.globalData.address_pay = 1;
      
    
    
  },
  // 判断皮豆够不够
  pdpd:function(){
    let that = this;
    if (that.data.orderId != 1) {
      that.pay()
    } else{
      if (that.data.adress_con) {
        if (that.data.shop_con.category != 1) {
          // 判断皮豆够不够
          // 获取皮豆
          let aa = { 'id': app.globalData.uid }
          WXAPI.hqpd(aa).then(function (res) {

            let userpd = res.data;
            console.log(userpd)
            if (that.data.s_pd == 0) {
              that.create_order();
            } else {


              if (userpd < that.data.s_pd) {
                wx.showModal({
                  title: '您能使用' + userpd + '皮豆抵扣现金',
                  content: '是否使用优惠',
                  showCancel: true,//是否显示取消按钮
                  cancelText: "否",//默认是“取消”
                  confirmText: "是",//默认是“确定”
                  success: function (res) {
                    if (res.cancel) {
                      //点击取消
                      that.setData({
                        s_pd: 0,
                        xs_s_price: that.data.xs_s_price
                      })
                      that.create_order();
                    } else {
                      //点击确定
                      console.log(that.data.xs_s_price)
                      that.setData({
                        s_pd: userpd,
                        xs_s_price: that.data.xs_s_price - userpd
                      })
                      console.log(that.data.xs_s_price)
                      that.create_order();
                    }
                  },
                  fail: function (res) { },//接口调用失败的回调函数
                  complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
                })
              } else {
                wx.showModal({
                  title: '您能使用' + (that.data.s_pd) + '皮豆抵扣现金',
                  content: '是否使用优惠',
                  showCancel: true,//是否显示取消按钮
                  cancelText: "否",//默认是“取消”
                  confirmText: "是",//默认是“确定”
                  success: function (res) {
                    if (res.cancel) {
                      //点击取消
                      //点击确定
                      that.setData({
                        s_pd: 0,
                        xs_s_price: that.data.xs_s_price
                      })
                      that.create_order();
                    } else {
                      //点击确定
                      that.setData({
                        xs_s_price: that.data.xs_s_price - that.data.s_pd
                      })
                      that.create_order();
                    }
                  },
                  fail: function (res) { },//接口调用失败的回调函数
                  complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
                })
              }
            }
          })
        } else {
          that.setData({
            s_pd: 0,
            price_zuigai:0
          })
          that.create_order();
        }

      } else {
        console.log(that.data.adress_con)
        wx.showModal({
          title: '地址为空',
          content: '请填写收货地址',
        })
      }
    }
    
  },
  // 创建订单
  create_order:function(){
    let that = this;
    console.log(that.data.orderId)
    
      console.log(that.data.s_pd)
      let bb = [
        {
          'goodsId': parseInt(app.globalData.shop_id),
          'number': app.globalData.guige_number.number,
          'guige': app.globalData.guige_number.guige,
          'postPay': app.globalData.postpay_qg
        }
      ]
      let aa = {
        'goodsJsonStr': JSON.stringify(bb),
        'uid': app.globalData.userInfo.uid,
        'addressId': app.globalData.adress_xz.id,
        'postPay': app.globalData.postpay_qg,
        'pd': that.data.s_pd
      }
      WXAPI.create_order(aa).then(function (res) {

        console.log(res.data.orderId)
        that.setData({
          orderId: res.data.orderId
        })
        that.pay()
      })
    
  },
  // 支付
  pay:function(e){
    let that = this;
    let pp = {
      "body": that.data.shop_con.name,
      "out_trade_no": that.data.orderId,
      "total_fee": (that.data.xs_s_price + that.data.price_zuigai + app.globalData.postpay_qg) * 100,
      "uid": app.globalData.oppid,
      "username": that.data.adress_con.username,
      "phone": that.data.adress_con.mobile,
      "address": that.data.adress_con.address,
      "addressM": that.data.adress_con.addressM,
      'goods': that.data.goods,
      'goodsPrice': that.data.xs_s_price,
      'postPay': app.globalData.postpay_qg,
      'specs': JSON.stringify(app.globalData.guige_number)
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
          if (that.data.shop_con.category != 1) {
            // 皮豆计算
            let pp = {
              'id': app.globalData.uid, 'pd': -that.data.s_pd, 'info': JSON.stringify({'shop':'-' + that.data.s_pd + ''})}
            WXAPI.gxpd(pp).then(function (res) {
              console.log(res.data)
              wx.navigateBack({ url: '../shop_content/shop_content' })
            })
          } else {
            wx.navigateBack({ url: '../shop_content/shop_content' })
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