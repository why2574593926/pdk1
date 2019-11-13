const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 2,
    userInfo: {},
    // 点赞控制
    dianzan:[],
    // 图片显示
    img1: ['../img/tiaozhan.png', '../img/tiaozhan.png', '../img/tiaozhan.png', '../img/tiaozhan.png'],
    // 动态数组
    dongtai:[],
    page:1,
    // 已点赞评论数组
    y_zan:[],
    // 获取头像界面显示隐藏
    pyq_xy:true,
    // m
    m:true
  },
  onGotUserInfo:function(e){
    let that=this;
    console.log(e.detail.userInfo);
    wx.setStorageSync('pyq_name', e.detail.userInfo);
    that.setData({
      pyq_xy: !that.data.pyq_xy
    })
  },
  onLoad: function () {
    // let that = this;
    // if (wx.getStorageSync('pyq_name')){
    //   that.setData({
    //     pyq_xy: !that.data.pyq_xy
    //   })
    // }
    // // 导航判断
    // console.log(app.globalData.userInfo)
    // that.setData({
    //   y_zan:app.globalData.userInfo.praiseMessages.split('-')
    // })
    // app.globalData.nav = that.data.nav;
    // this.selectComponent("#mpnav").navbh();
    // that.jiazai();
  },
  onShow:function(){
    let that = this;
    that.setData({
      page:1,
      dongtai: [],
      m:true
    })
    if (wx.getStorageSync('pyq_name')) {
      that.setData({
        pyq_xy: false
      })
    }
    // 导航判断
    console.log(app.globalData.userInfo)
    that.setData({
      y_zan: app.globalData.userInfo.praiseMessages.split('-')
    })
    app.globalData.nav = that.data.nav;
    this.selectComponent("#mpnav").navbh();
    that.jiazai();
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    let that = this;
    that.setData({
      page: 1,
      dongtai: [],
      m:true
    })
    if (wx.getStorageSync('pyq_name')) {
      that.setData({
        pyq_xy: false
      })
    }
    // 导航判断
    console.log(app.globalData.userInfo)
    that.setData({
      y_zan: app.globalData.userInfo.praiseMessages.split('-')
    })
    app.globalData.nav = that.data.nav;
    this.selectComponent("#mpnav").navbh();
    that.jiazai();
  },
  // 加载更多
  jiazai:function(){
    let that=this;
    
    if(that.data.m){
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
      let aa = {
        "page": that.data.page,
        "pageSize": 4,
      }
      WXAPI.pyq_list_all(aa).then(function (res) {
        if (res.code == 0) {
          if (res.data.list.length==0){
            that.setData({
              m:false
            })
          }
          let zs = that.data.dongtai;
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].pics = JSON.parse(res.data.list[i].pics)
            res.data.list[i].time = parseInt(Date.parse(new Date()) / 3600000) - parseInt(res.data.list[i].time / 3600)
            zs.push(res.data.list[i])
          }
          that.setData({
            dongtai: zs
          })
          console.log(that.data.dongtai)
          // 隐藏加载框
          wx.hideLoading();
        }
      })
    }
    
  },
  // 点赞
  dianzan:function(e){
    console.log(e)
    let that=this;
    let is=0;
    for (let i = 0; i < that.data.y_zan.length;i++){
      if (that.data.y_zan[i]==e.currentTarget.id){
        is=1;
        wx.showToast({
          icon:'none',
          title: '已经点过赞了',
        })
      }
    }
    if(is==0){
      if (that.data.dianzan) {
        let aa = {
          'id': app.globalData.uid,
          'goodId': parseInt(e.currentTarget.id),
          'type': '1'
        }
        WXAPI.pyq_zan(aa).then(function (res) {
          if (res.code == 0) {
            for(let i=0;i<that.data.dongtai.length;i++){
              if(that.data.dongtai[i].id==e.currentTarget.id){
                let dongtai_ls = that.data.dongtai;
                dongtai_ls[i].zan+=1;
                that.setData({
                  dongtai:dongtai_ls
                })
              }
            }
            that.setData({
              dianzan:!that.data.dianzan
            })
            wx.showToast({
              icon: 'none',
              title: '点赞成功',
            })
            that.start_yz();
          }
        })

      } else {
        let aa = {
          'id': app.globalData.uid,
          'goodId': parseInt(e.currentTarget.id),
          'type': '0'
        }
        WXAPI.pyq_zan(aa).then(function (res) {
          if (res.code == 0) {
            for (let i = 0; i < that.data.dongtai.length; i++) {
              if (that.data.dongtai[i].id == e.currentTarget.id) {
                let dongtai_ls = that.data.dongtai;
                dongtai_ls[i].zan -= 1;
                that.setData({
                  dongtai: dongtai_ls
                })
              }
            }
            that.setData({
              dianzan: !that.data.dianzan
            })
            wx.showToast({
              icon: 'none',
              title: '已取消点赞',
            })
            that.start_yz();
          }
        })

      }
    }
    
  },
  // 添加动态跳转
  add_dynamic_tiao:function(){
    wx.navigateTo({
      url: 'add_dynamic'
    })
  },
  reply_tiao: function (e) {
    let that=this;
    for(let i=0;i<that.data.dongtai.length;i++){
      if (that.data.dongtai[i].id == e.currentTarget.id){
        app.globalData.pyq_content = that.data.dongtai[i]
        wx.navigateTo({
          url: 'reply'
        })
      }
    }
    
  },
  // 上拉触底加载事件
  onReachBottom: function () {
    let that = this;
    
    // 页数+1
    that.setData({
      page:that.data.page+1
    })
    that.jiazai();
  },
  start_yz: function () {
    let that = this;
    // 登录授权
    wx.login({
      success(res) {
        if (res.code) {

          //发起网络请求
          let aa = { 'js_code': res.code }
          WXAPI.log(aa).then(function (res) {
            console.log(res)
            if (res.code == 0) {
              that.setData({
                userInfo: res.data,
              })
              app.globalData.uid = res.data.id
              console.log(app.globalData.uid)
              app.globalData.oppid = res.data.uid;
              app.globalData.userInfo = that.data.userInfo;
              console.log(app.globalData.userInfo)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
