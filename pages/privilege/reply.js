const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({
  data: {
    //底部导航标识
    nav: 2,
    userInfo: {},
    // 点赞控制
    dianzan: false,
    // 图片显示
    img1: ['../img/tiaozhan.png', '../img/tiaozhan.png', '../img/tiaozhan.png', '../img/tiaozhan.png'],
    // 点赞控制
    dianzan: true,
    dianzan_img: '../img/dianzan1.png',
    // 收起展开回复判断
    hufu_zs_pd:true,
    // 内容渲染
    content1:{},
    content2:{},
    // 评论内容
    review1:'',
    // 已点赞评论数组
    y_zan: []
  },
  onLoad: function () {
    let that = this;
    that.setData({
      y_zan: app.globalData.userInfo.praiseMessages.split('-')
    })
    // 获取头像昵称
    that.setData({
      pyq_name: wx.getStorageSync('pyq_name')
    })
    console.log(that.data.pyq_name)
    // 导航判断
    that.setData({
      content1: app.globalData.pyq_content
    })
    console.log(that.data.content1)
    // 回复消息查看
    let aa = {
      'id': that.data.content1.id
    }
    WXAPI.pyq_list_child(aa).then(function (res) {
      if (res.code == 0) {
        that.setData({
          content2: res.data
        })
      }
    })
    app.globalData.nav = that.data.nav;
  },
  // 收起展开回复判断
  hufu_zs:function(){
    let that=this;
      that.setData({
        hufu_zs_pd:!that.data.hufu_zs_pd
      })
  },
  // 点赞
  // 点赞
  dianzan: function (e) {
    console.log(e)
    let that = this;
    let is = 0;
    for (let i = 0; i < that.data.y_zan.length; i++) {
      if (that.data.y_zan[i] == e.currentTarget.id) {
        is = 1;
        wx.showToast({
          icon: 'none',
          title: '已经点过赞了',
        })
      }
    }
    if (is == 0) {
      if (that.data.dianzan) {
        let aa = {
          'id': app.globalData.uid,
          'goodId': parseInt(e.currentTarget.id),
          'type': '1'
        }
        WXAPI.pyq_zan(aa).then(function (res) {
          if (res.code == 0) {
              let dongtai_ls = that.data.content1;
                dongtai_ls.zan+= 1;
                that.setData({
                  content1: dongtai_ls
                })
            that.setData({
              dianzan: !that.data.dianzan
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
              let dongtai_ls = that.data.content1;
                dongtai_ls.zan -= 1;
                that.setData({
                  content1: dongtai_ls
                })
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
  // 监听评论input
  review_jt:function(e){
    let that = this;
    that.setData({
      review1: e.detail.value
    })
  },
  // 评论
  review:function(){
    let that=this;
    if (that.data.review1){
      // 评论
      let aa = {
        'userId':app.globalData.uid,
        'pid': that.data.content1.id,
        'content': that.data.review1,
        'username': that.data.pyq_name.nickName,
        'img': that.data.pyq_name.avatarUrl
      }
      WXAPI.pyq_list_review(aa).then(function (res) {
        if (res.code == 0) {
          // 回复消息查看
          let aa = {
            'id': that.data.content1.id
          }
          WXAPI.pyq_list_child(aa).then(function (res) {
            if (res.code == 0) {
              let zs = that.data.content1;
              zs.review+=1;
              that.setData({
                content1:zs,
                content2: res.data
              })
            }
          })
          console.log(res)
          wx.showToast({
            title: '评论成功',
          })
          that.setData({
            review1: ''
          })
        }else{
          wx.showModal({
            title: '发布失败',
            content: res.msg,
          })
        }
      })
    }else{
      wx.showModal({
        title: '内容不能为空',
        content: '请输入',
      })
    }
    
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
