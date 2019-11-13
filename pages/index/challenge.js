// pages/index/challenge.js
const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 省左图
    img_p:true,
    img1:'../img/sx2.png',
    // 控制显示
    max:0,
    key_top:'-100%',
    // 隐藏的电话号
    phone_yc:'',
    // 键盘
    provinceArr: ["粤", "京", "津", "渝", "沪", "冀", "晋", "辽", "吉", "黑", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "琼", "川", "贵", "云", "陕", "甘", "青", "蒙", "桂", "宁", "新", "藏", "使", "领", "警", "学", "港", "澳"],
    strArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
    hiddenPro: false,// 省份键盘
    hiddenStr: true,// 数字字母键盘
    carnum: '川',
    province:'',
    // 支付显示隐藏等
    pay_xs:false,
    gougou_xuanze:0,
    pay_max:0,
    // 用户信息
    user_cp:'',
    // 支付方式
    pay_ff:0
  },
  // 隐藏电话号码
  geTel:function (tel){
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, "$1****$2");
  },
  // 省选择
  shen_xuan:function(){
    let that=this;
    if (that.data.user_cp.challengeStatus == 0){
      if (that.data.img_p) {
        that.setData({
          img1: '../img/sx1.png',
          max: 1,
          key_top: '0rpx'
        })
      } else {
        that.setData({
          img1: '../img/sx2.png',
          max: 0,
          key_top: '-100%'
        })
      }
      that.setData({
        img_p: !that.data.img_p
      })
    }else{

    }
    
  },
//测试
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    // 用户信息
    let aa = {
      'id': app.globalData.uid
    }
    WXAPI.users(aa).then(function (res) {

      if (res.code == 0) {
        console.log(res)
        that.setData({
          user_cp:res.data
        })
      }
    })
    // 隐藏的电话号
    that.setData({
      phone_yc: that.geTel('18384071545')
    })
  },
  proTap(e) {//点击省份
    let province = e.currentTarget.dataset.province;
    // let carnum = this.data.carnum;
    this.setData({
      carnum: province,
      hiddenPro: true,
      hiddenStr: false
    })
  },
  strTap(e) {//点击字母数字
    let province = e.currentTarget.dataset.str;
    let carnum = this.data.province;
    if (carnum.length > 5) return;// 车牌长度
    carnum+= province;
    this.setData({
      province: carnum
    })
  },
  backSpace() {//退格
  let that=this;
    let province = this.data.province;
    console.log(province.substring(0,province.length-1))
    that.setData({
      province: province.substring(0, province.length - 1)
    })
    if (province == '') {
      this.setData({
        hiddenPro: false,
        hiddenStr: true
      })
    }
    // this.setData({
    //   carnum: str
    // })
  },
  backKeyboard() {//返回省份键盘
    this.setData({
      hiddenPro: false,
      hiddenStr: true
    })
  },
  // 加入挑战
  pay_xianshi:function(){
    let that=this;
    let chepai = that.data.carnum + that.data.province;
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    if (chepai==''){
      wx.showModal({
        title: '车牌号不能为空',
        content: '请输入车牌号',
      })
    } else if (!re.test(chepai)){
      wx.showModal({
        title: '车牌号格式错误',
        content: '请填写正确车牌号',
      })
    }else{
      that.setData({
        pay_xs: !that.data.pay_xs
      })
    }
    
  },
  // 支付勾勾选择
  gougou_xz:function(e){
    let that=this;
    if(e.currentTarget.id=='gou1'){
      that.setData({
        gougou_xuanze:0,
        pay_ff:0
      })
    }else{
      that.setData({
        gougou_xuanze: 1,
        pay_ff:1
      })
    }
  },
  // 立即支付
  payto:function(){
    let that=this;
    if (that.data.pay_ff==0){
      let pp = {
        'id': app.globalData.uid, 'pd': -20, 'info': JSON.stringify({ 'challenge': '-20'})
      }
      WXAPI.gxpd(pp).then(function (res) {
        console.log(res.data)
        if (res.code == -1) {
          wx.showModal({
            title: '皮豆增加失败',
            content: res.msg,
          })
        } else {
          let up = that.data.user_cp;
          up.challengeStatus=1;
          up.pd=res.data.pd;
          up.carId = that.data.carnum + that.data.province;
          WXAPI.users_update(up).then(function (res) {
            console.log(res.data)
            that.setData({
              user_cp:up
            })
          })
        }

      })
    }else{
      that.pay();
    }
  },
  // 支付
  pay: function (e) {
    let that = this;
    let ndata = new Date()//获取当前时间戳
    let year1 = ndata.getFullYear();
    let month1 = ndata.getMonth() + 1;
    let day1 = ndata.getDate();
    let h1 = ndata.getHours();
    let minute1 = ndata.getMinutes();
    let second1 = ndata.getSeconds();
    let ddh = '' + year1 + month1 + day1 + h1 + minute1 + second1 + 'P' + parseInt(Math.random() * 10000);
    let pp = {
      "body": '百日不违规',
      "out_trade_no": ddh,
      "total_fee": 20 * 100,
      "uid": app.globalData.oppid,
      'goodsPrice': 20,
      'postPay': 0,
    }
    WXAPI.pay_others(pp).then(function (res) {
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
          let up = that.data.user_cp;
          up.challengeStatus = 1;
          up.carId = that.data.carnum + that.data.province;
          WXAPI.users_update(up).then(function (res) {
            console.log(res.data)
            that.setData({
              user_cp: up
            })
          })
        },
        fail(res) {
          console.log("支付失败")
          console.log(res)
        }

      })
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