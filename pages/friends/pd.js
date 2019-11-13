const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
var timer = 0;
Page({
  data: {
    //底部导航标识
    nav: 0,
    userInfo: {},
    // 表单内容
    con:'',
    // 用户信息
    user2:'',
    // 匹配判断
    s:0,
    pp_text:'开始'
  },
  onLoad:function(){
    let that=this;
    wx.getStorage({
      key: 'user1',
      success(res) {
        that.setData({
          user2: res.data
        })
      }
    })
    // 将内容从缓存取出
    wx.getStorage({
      key: 'content',
      success(res) {
        console.log(res.data)
        that.setData({
          con: res.data
        })
      }
    })
  },
  // 开始匹配
  start_yz:function(e){
    let that=this;
    that.setData({
      s: 1,
      pp_text: '正在匹配'
    })
    let aa = {
      'id': app.globalData.uid,
      'json':JSON.stringify({ 'name': that.data.user2.nickName, 'img': that.data.user2.avatarUrl, 'content1': that.data.con.c1, 'content2': that.data.con.c2,'content3': that.data.con.c3,'content4': that.data.con.c4})
    }
    WXAPI.travel_add(aa).then(function (res) {

      if (res.code == 0) {
        console.log(res)
        that.setData({
          s: 0,
          pp_text: '开始'
        })
        wx.navigateTo({ url: 'pp_content' })
      }
    })
    
  }
})
