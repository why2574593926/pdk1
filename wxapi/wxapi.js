const API_BASE_URL = 'https://pptq.online/ppcard/'
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
    var res = request('/user/pd/getAll', 'post', data)
    console.log(res)
    return res
  },
  // 商品获取
  shop: (data) => {
    console.log(data)
    var res = request('/goods/list', 'post', data)
    console.log(res)
    return res
  },
  // 收货地址获取
  adress: (data) => {
    console.log(data)
    var res = request('/user/address/list', 'post', data)
    console.log(res)
    return res
  },
  // 添加收货地址
  adress_add: (data) => {
    console.log(data)
    var res = request('/user/address/add', 'post', data)
    console.log(res)
    return res
  },
  // 地址修改
  adress_isDefault: (data) => {
    console.log(data)
    var res = request('/user/address/update', 'post', data)
    console.log(res)
    return res
  },
// 删除收货地址
adress_delete: (data) => {
  console.log(data)
  var res = request('/user/address/delete', 'post', data)
  console.log(res)
  return res
}
}