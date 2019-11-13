//app.js
var WXAPI = require("wxapi/wxapi.js");
App({
  onLaunch: function() {
    let that = this;
    
    // 登录授权
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res)
          //发起网络请求
          let aa = {
            'js_code': res.code
          }
          that.globalData.code=res.code;
            WXAPI.log(aa).then(function (res) {
              
              if (res.code == 0) {
                that.dg(res.data);
                
              }
            })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
        
      }
    })
    // 邮费获取
    // 商品详情获取
    let cc= { "id":3 }
    WXAPI.shop_content(cc).then(function (res) {
      if (res.code == 0) {
        
        that.globalData.postpay_qg = res.data.price;
        console.log(that.globalData.postpay_qg)
      }
    })
  },
  dg: function (e){
    let that=this;
    if(e){
      that.globalData.userInfo = e
      that.globalData.uid = e.id
      console.log(that.globalData.uid)
      that.globalData.oppid = e.uid;
    }else{
      //发起网络请求
      let aa = {
        'js_code': that.globalData.code
      }
      WXAPI.log(aa).then(function (res) {

        if (res.code == 0) {
          that.dg(res.data);
        }
      })
    }
  },
  globalData: {
    code:'',
    // 用户信息,uid在这里获取
    userInfo: null,
    // 用户id
    uid: null,
    // oppid
    oppid: '',
    // 导航标识
    nav: 1,
    // 我的钱包订单跳转判断
    dingdan: {},
    // 跳转指定位置的选择器
    index_tiao: 'index',
    // 修改地址传值用
    address_gai: '',
    // 商品id
    shop_id: 1,
    // 商品规格和数量
    guige_number: {
      guige: '',
      number: ''
    },
    // 商品地址选择更给用
    adress_xz: '',
    // 判断是否从支付页面跳进地址页面
    address_pay: 0,
    // 订单页面跳转的订单号
    orderid: '',
    // 订单类型判断
    wait_pay: '',
    // 邮费
    postpay_qg:0,
    // shop页面选显卡判断
    shop_xxk:0,
    // 皮友圈动态详情
    pyq_content:{}
  }
})