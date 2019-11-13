// 上线
// const API_BASE_URL = 'https://pptq.online/ppcard/'
// 测试
const API_BASE_URL = 'http://pptq.online:1000/ppcard/'
// const API_BASE_URL = 'http://192.168.0.116:8082/ppcard/'
const request = (url, method, data) => {
  let _url = API_BASE_URL + url 
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}
module.exports = {
  request,
  // 测试
  // ceshi: (data) => {
  //   console.log(data)
  //   var res = request('ppcard/file/images/list', 'post', data)
  //   console.log(res)
  //   return res
  // }
  // 登录
  log: (data) => {
    console.log(data)
    var res = request('user/login/1', 'post', data)
    console.log(res)
    return res
  },
  // 激活
  active: (data) => {
    console.log(data)
    var res = request('user/activate', 'post', data)
    console.log(res)
    return res
  },
  // 图标获取
  icon: (data) => {
    console.log(data)
    var res = request('file/images/list', 'post', data)
    console.log(res)
    return res
  },
  // 获取用户信息
  users: (data) => {
    console.log(data)
    var res = request('user/getUserInfo', 'post', data)
    console.log(res)
    return res
  },
  // 获取用户信息
  sign: (data) => {
    console.log(data)
    var res = request('user/sign', 'post', data)
    console.log(res)
    return res
  },
  // 更新皮豆
  gxpd: (data) => {
    console.log(data)
    var res = request('user/pd/update', 'post', data)
    console.log(res)
    return res
  },
  // 获取皮豆数量
  hqpd: (data) => {
    console.log(data)
    var res = request('user/pd/getAll', 'post', data)
    console.log(res)
    return res
  },
  // 获取用户流水
  logo_list: (data) => {
    console.log(data)
    var res = request('user/log/list', 'post', data)
    console.log(res)
    return res
  },
  // 商品获取
  shop: (data) => {
    console.log(data)
    var res = request('goods/list', 'post', data)
    console.log(res)
    return res
  },
  // 商品详情获取
  shop_content: (data) => {
    console.log(data)
    var res = request('goods/detail', 'post', data)
    console.log(res)
    return res
  },
  // 点赞状态获取
  praise_is: (data) => {
    console.log(data)
    var res = request('goods/praise/is', 'post', data)
    console.log(res)
    return res
  },
  // 点赞商品
  praise_do: (data) => {
    console.log(data)
    var res = request('/goods/praise/do', 'post', data)
    console.log(res)
    return res
  },
  // 取消点赞
  praise_no: (data) => {
    console.log(data)
    var res = request('goods/praise/no', 'post', data)
    console.log(res)
    return res
  },
  // 收货地址获取
  adress: (data) => {
    console.log(data)
    var res = request('user/address/list', 'post', data)
    console.log(res)
    return res
  },
  // 添加收货地址
  adress_add: (data) => {
    console.log(data)
    var res = request('user/address/add', 'post', data)
    console.log(res)
    return res
  },
  // 地址修改
  adress_isDefault: (data) => {
    console.log(data)
    var res = request('user/address/update', 'post', data)
    console.log(res)
    return res
  },
// 删除收货地址
adress_delete: (data) => {
  console.log(data)
  var res = request('user/address/delete', 'post', data)
  console.log(res)
  return res
},
// 创建订单
  create_order: (data) => {
    console.log(data)
    var res = request('order/wx/create', 'post', data)
    console.log(res)
    return res
  },
  // 获取订单列表
  get_order: (data) => {
    console.log(data)
    var res = request('order/wx/list', 'post', data)
    console.log(res)
    return res
  },
  // 取消订单
  delete_order: (data) => {
    console.log(data)
    var res = request('order/close', 'post', data)
    console.log(res)
    return res
  },
  // 确认收货
  update_order: (data) => {
    console.log(data)
    var res = request('order/update', 'post', data)
    console.log(res)
    return res
  },
  // 获取订单详情 
  content_order: (data) => {
    console.log(data)
    var res = request('order/wx/detail', 'post', data)
    console.log(res)
    return res
  },
  // 支付
  pay: (data) => {
    console.log(data)
    var res = request('pay/wxpay/create/1', 'post', data)
    console.log(res)
    return res
  },
  // 获取不同类型订单的数量
  dingdan_num: (data) => {
    console.log(data)
    var res = request('order/count', 'post', data)
    console.log(res)
    return res
  }
}