//app.js
var WXAPI = require("wxapi/wxapi.js");
App({
  onLaunch: function () {
    let that = this;
    // 登录授权
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          let aa = { 'js_code': res.code }
          WXAPI.log(aa).then(function (res) {
            if (res.code == 0) {
              that.globalData.userInfo=res.data
              that.globalData.uid = res.data.id
              console.log(that.globalData.uid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    uid:null,
    // 导航标识
    nav:1,
    // 我的钱包订单跳转判断
    dingdan:{},
    // 跳转指定位置的选择器
    index_tiao:'index',
    // 修改地址传值用
    address_gai:''
  }
})