const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
    // 选择后显示
    img1:[],
    // 上传后返回的网络地址
    img2:[],
    // 发布内容
    fb_content:'',
    xspd:0,
    // 头像昵称
    pyq_name:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    // 获取头像昵称
    that.setData({
      pyq_name:wx.getStorageSync('pyq_name')
    })
    console.log(that.data.pyq_name)
  },
  // 内容获取
  teatarea1:function(e){
    let that=this;
    that.setData({
      fb_content: e.detail.value
    })
  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    that.setData({
      img2:[]
    })
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths) //调用上传方法
        that.setData({
          img1: res.tempFilePaths
        })
      }
    })
  },
  //上传服务器
  upImgs: function (img) {
    let that = this;
    let zs=[];
    for (let i = 0; i < img.length;i++){
      wx.uploadFile({
        url: 'https://pptq.online/ppcard/user/upload',
        filePath: img[i],
        name: 'filedatas',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: null,
        success: function (res) {
          console.log(JSON.parse(res.data).data[0])
          zs.push(JSON.parse(res.data).data[0])
          that.setData({
            img2: zs
          })
        }
      })
    }
  },
  // 发布
  fb:function(){
    let that=this;
    that.setData({
      xspd: 1
    })
    let aa = {
      'content': that.data.fb_content,
      'pics': JSON.stringify(that.data.img2),
      'userId': app.globalData.uid,
      'username': that.data.pyq_name.nickName,
      'img': that.data.pyq_name.avatarUrl
    }
    WXAPI.pyq_add(aa).then(function (res) {
      if (res.code == 0) {
        that.setData({
          xspd: 0
        })
        wx.showModal({
          title: '发布成功',
          content: '是否继续发布',
          showCancel: true,//是否显示取消按钮
          cancelText: "否",//默认是“取消”
          confirmText: "是",//默认是“确定”
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
              wx.reLaunch({
                url: 'privilege',
              })
            } else {
              //点击确定
              wx.reLaunch({
                url: 'add_dynamic',
              })
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }else{
        wx.showModal({
          title: '发布失败',
          content: res.msg,
        })
      }
    })
  }
})