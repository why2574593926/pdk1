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
    con1:'',
    // 匹配判断
    s: 0,
    pp_text: '开始',
    // 选择
    dx1:1,
    dx2:0
  },
  onLoad: function () {
    let that = this;
    let aa = {
      'id': app.globalData.uid
    }
    WXAPI.travel_list(aa).then(function (res) {

      if (res.code == 0) {
        for(let i=0;i<res.data.length;i++){
          res.data[i].json = JSON.parse(res.data[i].json)
          res.data[i].time = parseInt(Date.parse(new Date()) / 3600000) - parseInt(res.data[i].time / 3600)
        }
        
        that.setData({
          con: res.data,
          con1: res.data
        })
        console.log(that.data.con)
      }
    })
  },
  // 选择
  pp_xuanze:function(e){
   let that=this;
    if (e.currentTarget.id=='pp1'){
      that.setData({
        dx1:1,
        dx2:0,
        con: that.data.con1
      }) 
      }else{
      that.setData({
        dx1: 0,
        dx2: 1,
        con: ''
      }) 
   }
   
  },
  delete1:function(e){
    let that=this;
    let aa = {
      'id': e.currentTarget.id
    }
    WXAPI.travel_delete(aa).then(function (res) {

      if (res.code == 0) {
        let aa = {
          'id': app.globalData.uid
        }
        WXAPI.travel_list(aa).then(function (res) {

          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].json = JSON.parse(res.data[i].json)
              res.data[i].time = parseInt(Date.parse(new Date()) / 3600000) - parseInt(res.data[i].time / 3600)
            }
            that.setData({
              con: res.data,
              con1: res.data
            })
            console.log(that.data.con)
          }
        })
      }
    })
  }
})
