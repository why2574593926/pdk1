const API_BASE_URL = 'http://120.24.183.24:8080/ppcard/'
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
    var res = request('user/login', 'post', data)
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
  }
}