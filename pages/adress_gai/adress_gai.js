const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 3,
    userInfo: {},
    // 皮豆显示隐藏控制
    pd_display: 'none',
    // 默认地址勾选判断
    img_gou: true,
    // 省市区三级联动初始化
    region: ["省", "市", "区"],
    form: {},
    // 是否为默认地址
    isDefault: 0,
    // 错误提示
    mssage: ''
  },                
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },
  onLoad: function () {
    let that = this;
    // 导航判断
    app.globalData.nav = 3;
    this.selectComponent("#mpnav").navbh();
    // 初始值
    that.setData({
      form: app.globalData.adress_gai
    })
  },
  onReady: function () {


  },
  // 皮豆
  pd: function (e) {
    let that = this;
    if (e.currentTarget.id == 'pd1') {
      that.setData({
        pd_display: 'block'
      })
    } else {
      that.setData({
        pd_display: 'none'
      })
    }
  },
  // 默认地址
  img_gou: function () {
    this.setData({
      img_gou: !this.data.img_gou
    })
    if (this.data.img_gou) {
      this.setData({
        isDefault: 0
      })
    } else {
      this.setData({
        isDefault: 1
      })
    }
    console.log(this.data.isDefault)
  },
  // 修改
  add: function (e) {
    let that = this;
    console.log(e)
    let f = that.data.form;
    f.address = e.detail.value.addressA + e.detail.value.addressM;
    f.addressA = e.detail.value.addressA;
    f.addressM = e.detail.value.addressM;
    f.isDefault = that.data.isDefault;
    f.mobile = e.detail.value.phone;
    f.userId = 11;
    f.username = e.detail.value.name
    that.setData({
      form: f
    })
    console.log(that.data.form)
    let flag = that.check(that.data.form);
    // 添加地址
    if (!flag) {
      wx.showModal({
        title: '添加失败',
        content: this.data.mssage,
      })
    } else {
      WXAPI.adress_isDefault(that.data.form).then(function (res) {
        console.log(res)
        wx.reLaunch({
          url: '../adress/adress',
        })
      })
    }

  },
  //表单验证 
  check(e) {
    var that = this;
    if (e.username == "") {
      that.setData({
        mssage: "用户名不能为空"
      })
      return false;
    }
    if (e.mobile == "") {
      that.setData({
        mssage: "手机号码不能为空"
      })
      return false
    }
    if (!/^1[0-9]{10}$/.test(e.mobile)) {
      that.setData({
        mssage: "手机号码格式错误"
      })
      return false
    }
    if (e.addressA.length < 7) {
      that.setData({
        mssage: "收件地址不能为空"
      })
      return false;
    }
    if (e.addressM == "") {
      that.setData({
        mssage: "详细地址不能为空"
      })
      return false;

    }
    return true;
  },
  // 删除
  delete1: function () {

  }
})
