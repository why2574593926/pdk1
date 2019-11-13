const app = getApp();
var WXAPI = require("../../wxapi/wxapi.js");
var timer = 0;
var h = 0, m = 0, s = 0, h1, m1, s1;
Page({
  data: {
    //底部导航标识
    nav: 0,
    userInfo: {},
    // 皮豆显示隐藏控制
    pd_display: false,
    qiandao: [
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '1', 'day': '第1天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '2', 'day': '第2天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '3', 'day': '第3天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '4', 'day': '第4天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '5', 'day': '第5天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '6', 'day': '第6天' },
      { 'img1': '../img/pd.png', 'img2': '../img/qiandaogou.png', 'pd': '7', 'day': '第7天' }
    ],
    // 省市区三级联动初始化
    region: ["出发地", "", ""],
    region1: ["目的地", "", ""],
    // 控制车辆隐藏
    car_show: 0,
    // 行驶时间
    car_time: '00:00:00',
    // 皮豆计算时的动画
    jinbi: [
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' },
      { left_top: '68%', left_left: '-50rpx', w: '50rpx', h: '50rpx' }
    ],
    jinbi1: [],
    // 地区是否选择判断
    adress1: 0,
    adress2: 0,
    // 皮豆数量
    pd_num: '',
    // 行车时间
    pd_time: '',
    pd_time2: '',
    // 时间差的秒数
    second: '',
    // 是否禁用地址选择判断
    disabled_pd:'',
    // 滚动判断
    scroll_pd:false,
    // 是否结束隐藏显示判断
    end_pd:false,
    end_pd_pd:0,
    // 键盘
    provinceArr: ["粤", "京", "津", "渝", "沪", "冀", "晋", "辽", "吉", "黑", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "琼", "川", "贵", "云", "陕", "甘", "青", "蒙", "桂", "宁", "新", "藏", "使", "领", "警", "学", "港", "澳"],
    strArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
    hiddenPro: false,// 省份键盘
    hiddenStr: true,// 数字字母键盘
    carnum: '川',
    province: '',
    // 省左图
    img_p: true,
    img1: '../img/sx2.png',
    // 控制显示
    max: 0,
    key_top: '-450rpx',
    // 隐藏的电话号
    phone_yc: '',
    // 载重量等，下拉列表
    range1:['0-9t','10-30t','31t以上'],
    value1:0,
    range2: ['清洁货物', '液体货物', '污秽货物','危险货物','易腐冷藏货物','贵重货物','有生动植物货物','长大笨重货物','邮件货物','其他'],
    value2: 0,
    // 资料填写显示隐藏
    information_xy:true,
    information_img1:'',
    information_img2: '',
    information_img_pd:''
  },
  //添加上传图片
  chooseImageTap: function (e) {
    var that = this;
    that.setData({
      information_img_pd:e.currentTarget.id
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
        if (that.data.information_img_pd =='information1'){
          that.setData({
            information_img1: res.tempFilePaths[0]
          })
        }else{
          that.setData({
            information_img2: res.tempFilePaths[0]
          })
        }
        
      }
    })
  },
  // 资料填写显示隐藏
  information_to:function(){
    let that = this;
    let chepai = that.data.carnum + that.data.province;
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    if (chepai == '') {
      wx.showModal({
        title: '车牌号不能为空',
        content: '请输入车牌号',
      })
    } else if (!re.test(chepai)) {
      wx.showModal({
        title: '车牌号格式错误',
        content: '请填写正确车牌号',
      })
    } else {
      that.setData({
        information_xy: false
      })
    }
    
  },
  // 载重量等，下拉列表
  bindViewEvent:function(e){
    let that=this;
    console.log(e.detail.value)
    that.setData({
      value1: e.detail.value
    })
  },
  bindViewEvent2: function (e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      value2: e.detail.value
    })
  },
  // 省选择
  shen_xuan: function () {
    let that = this;
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
          key_top: '-450rpx'
        })
      }
      that.setData({
        img_p: !that.data.img_p
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
    carnum += province;
    this.setData({
      province: carnum
    })
  },
  backSpace() {//退格
    let that = this;
    let province = this.data.province;
    console.log(province.substring(0, province.length - 1))
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
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
    this.setData({
      adress1: 1
    })
    // 保存地址
    wx.setStorageSync('region', e.detail.value)
    wx.setStorageSync('adress1', 1)
  },
  changeRegin1(e) {
    this.setData({ region1: e.detail.value });
    this.setData({
      adress2: 1
    })
    // 保存地址
    wx.setStorageSync('region1', e.detail.value)
    wx.setStorageSync('adress2', 1)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onUnload:function(){
    clearInterval(timer);
  },
  onLoad: function () {
    let that = this;


    // 

    that.setData({
      jinbi1: that.data.jinbi
    })
    // 获取皮豆
    let aa = { 'id': app.globalData.userInfo.id }
    WXAPI.hqpd(aa).then(function (res) {
      console.log(res.data)
      that.setData({
        pd_num: res.data
      })
    })

    // 状态
    that.setData({
      car_show: wx.getStorageSync('zhuangtai')
    })
    if (wx.getStorageSync('zhuangtai')) {
      // 地址赋值
      that.adress_fuzhi();
    } else {
      wx.setStorageSync('zhuangtai', 0)
    }
    if (wx.getStorageSync('zhuangtai') == 1) {
      // 计时器
      that.time_jishi();
    }
    if (wx.getStorageSync('zhuangtai') == 0) {
      // 资料填写
      that.setData({
        information_xy:true
      })
    }else{
      that.setData({
        information_xy: false
      })
    }
    // 禁用地址选择
    if (wx.getStorageSync('zhuangtai') == 1 || wx.getStorageSync('zhuangtai') == 2) {
      that.setData({
        disabled_pd: 'disabled',
        scroll_pd:true
      })
    }

    // 时间
    that.sjc_time();
    // 初始时
    that.cs_time();
  },
  adress_fuzhi: function () {
    this.setData({ region: wx.getStorageSync('region') });
    this.setData({ region1: wx.getStorageSync('region1') });
    this.setData({
      adress1: wx.getStorageSync('adress1'),
      adress2: wx.getStorageSync('adress2')
    })
  },
  // 缓存时间差获取
  sjc_time: function () {
    let that = this;
    if (wx.getStorageSync('seconds')) {
      console.log(parseInt(Date.parse(new Date()) / 1000) - wx.getStorageSync('seconds'))
      that.setData({
        second: parseInt(Date.parse(new Date()) / 1000) - wx.getStorageSync('seconds')
      })
    } else {
      wx.setStorageSync('seconds', 0)
      that.setData({
        second: 0
      })
      console.log('成功')
    }
  },
  // 初试时间设置
  cs_time: function () {
    let that = this;
    console.log(11111)
    h = 0, m = 0, s = 0, h1 = '', m1 = '', s1 = '';
    for (let i = 0; i < that.data.second; i++) {
      if (s == 59) {
        if (m == 59) {
          if (h == 6) {
            // 最大时长
            clearInterval(timer);
            return;
          } else {
            h++;
          }

          m = 0;
        } else {
          m++;
        }
        s = 0;
      } else {
        s++;
      }
      if (h < 10) {
        h1 = '0' + h;
      } else {
        h1 = h;
      }
      if (m < 10) {
        m1 = '0' + m;
      } else {
        m1 = m;
      }
      if (s < 10) {
        s1 = '0' + s;
      } else {
        s1 = s;
      }
      let t = h1 + ':' + m1 + ':' + s1;
    }
  },
  // 计时器
  time_jishi: function () {
    let that = this;
    timer = setInterval(function () {
      if (s == 59) {
        if (m == 59) {
          if (h == 6) {
            // 最大时长
            clearInterval(timer);
            return;
          } else {
            h++;
          }

          m = 0;
        } else {
          m++;
        }
        s = 0;
      } else {
        s++;
      }
      if (h < 10) {
        h1 = '0' + h;
      } else {
        h1 = h;
      }
      if (m < 10) {
        m1 = '0' + m;
      } else {
        m1 = m;
      }
      if (s < 10) {
        s1 = '0' + s;
      } else {
        s1 = s;
      }
      let t = h1 + ':' + m1 + ':' + s1;
      that.setData({
        car_time: t
      })
      that.setData({
        pd_time: h
      })
      that.setData({
        pd_time2: m
      })
      // console.log(s)
    }, 1000)
  },
  // 皮豆说明判断
  pd_display: function () {
    this.setData({
      pd_display: !this.data.pd_display
    })
  },
  // 是否结束显示隐藏
  end_xy:function(){
    let that=this;
    if (that.data.pd_time == 0 && that.data.pd_time2 < 30) {
     that.setData({
       end_pd_pd:'还没满30分钟哦'
     })
    }else{
      if (that.data.pd_time <= 0) {
        end_pd_pd = 38+'皮豆';
      } else if (that.data.pd_time <= 6 && that.data.pd_time > 0) {
        end_pd_pd = that.data.pd_time * 38 + '皮豆'
      } else {
        end_pd_pd = 6 * 38 + '皮豆';
      }
    }
   
    that.setData({
      end_pd: !that.data.end_pd
    })
  },
  // 车辆交替，时间计分
  car_s: function () {
    let that = this;
    // 开始
    if (that.data.car_show == 0) {
      if (that.data.adress1 == 1 && that.data.adress2 == 1) {
        that.setData({
          car_show: 1,
          car_time: '00:00:00',
          disabled_pd:'disabled',
          scroll_pd: true
        })
        wx.setStorageSync('zhuangtai', 1)
        wx.setStorageSync('seconds', parseInt(Date.parse(new Date()) / 1000))
        // 计时器
        that.time_jishi();
      } else {
        wx.showModal({
          title: '未选择地区',
          content: '或者未选完地区',
        })
      }

    }
    // 结束
    else if (that.data.car_show == 1) {
      clearInterval(timer);
      wx.setStorageSync('seconds', 0)
      // 初始时间差
      that.sjc_time();
      // 初始时间
      that.cs_time();
      // 隐藏结束判断
      that.setData({
        end_pd: !that.data.end_pd
      })
      // 判断是否满三十分钟
      if (that.data.pd_time == 0 && that.data.pd_time2<30){
        wx.showModal({
          title: '皮豆赚取失败',
          content: '行程不满30分钟',
        })
        that.setData({
          car_show: 2,
          scroll_pd: false
        })
      }else{
        var i = -1;
        var t = setInterval(function () {
          if (i < 8) {
            i++;
          } else {
            clearInterval(t);
          }
          let index = "jinbi[" + i + "].left_left";
          let index1 = "jinbi[" + i + "].left_top";
          let w1 = "jinbi[" + i + "].w";
          let h1 = "jinbi[" + i + "].h";
          that.setData({
            [index]: '265rpx;',
            [index1]: '55rpx',
            [w1]: '10rpx',
            [h1]: '10rpx'
          })


        }, 100);
        that.setData({
          car_show: 2,
          scroll_pd: false
        })

        // 皮豆计算
        let aa = { 'id': app.globalData.uid, 'pd': '', 'info': JSON.stringify({ 'gaosujifen': '' }) }
        if (that.data.pd_time <= 0) {
          aa.pd = 38;
          aa.info = JSON.stringify({ 'gaosujifen': '+' + aa.pd + '' });
        } else if (that.data.pd_time <= 6 && that.data.pd_time > 0) {
          aa.pd = that.data.pd_time * 38
          aa.info = JSON.stringify({ 'gaosujifen': '+' + aa.pd + '' });
        } else {
          aa.pd = 6 * 38;
          aa.info = JSON.stringify({ 'gaosujifen': '+' + aa.pd + '' });
        }
        wx.setStorageSync('zhuangtai', 2)
        // 保存高速积分皮豆限定数量

        WXAPI.gxpd(aa).then(function (res) {
          console.log(res.data)
          if (res.code == -1) {
            wx.showModal({
              title: '皮豆增加失败',
              content: res.msg,
            })
          } else {
            that.setData({
              pd_num: res.data.pd
            })
          }

        })
      }
      


    }
    // 再次选择地区
    else if (that.data.car_show == 2) {
      that.setData({
        car_show: 0,
        jinbi: that.data.jinbi1,
        adress1: 0,
        adress1: 0,
        region: ["出发地", "", ""],
        region1: ["目的地", "", ""],
        disabled_pd: '',
        information_xy: true
      })
      // 保存地址1
      wx.setStorageSync('region', ["出发地", "", ""])
      wx.setStorageSync('adress1', 0)
      // 保存地址2
      wx.setStorageSync('region1', ["目的地", "", ""])
      wx.setStorageSync('adress2', 0)
      that.adress_fuzhi();
      // 
      wx.setStorageSync('zhuangtai', 0)
      var i = -1;
      var t = setInterval(function () {
        if (i < 8) {
          i++;
        } else {
          clearInterval(t);
        }
        let index = "jinbi[" + i + "].left_left";
        let index1 = "jinbi[" + i + "].left_top";
        let w1 = "jinbi[" + i + "].w";
        let h1 = "jinbi[" + i + "].h";
        that.setData({
          [index]: '-50rpx',
          [index1]: '68%',
          [w1]: '50rpx',
          [h1]: '50rpx'
        })


      }, 100);
    }
  }
})
