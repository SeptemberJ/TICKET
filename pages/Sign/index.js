import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var MD5 = require('../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()
var Timer
Page({
  data: {
    User_Phone: null,
    User_Psd: null,
    User_Psd_Again: null,
    IfGetCode: true,
    RealCode: '',
    CountDown: 60
  },
  onLoad: (options)=> {
    
  },
  //手机号
  ChangePhone(e) {
    this.setData({
      User_Phone: e.detail.value
    })
  },
  //密码
  ChangePsd(e) {
    this.setData({
      User_Psd: e.detail.value
    })
  },
  //注册
  SignIn() {
    wx.navigateTo({
      url: '../Login/index',
    })
  },
  //获取验证码
  GetCode() {
    if (!(/^1[34578]\d{9}$/).test(this.data.User_Phone)) {
      wx.showToast({
        image: '../../images/icon/attention.png',
        title: '手机号格式！',
        duration: 2000,
      });
      return false
    }
    if (this.data.IfGetCode) {
      this.setData({
        IfGetCode: false
      })
      // requestPromisified({
      //   url: h.main + '/smsSend',
      //   data: {
      //     fmobile: this.data.User_Phone
      //   },
      //   method: 'GET',
      // }).then((res) => {
      //   switch (res.data.result) {
      //     case 1:
      //       wx.hideLoading()
      //       this.setData({
      //         RealCode: res.data.code
      //       })
      //       break
      //     case 0:
      //       wx.hideLoading()
      //       wx.showToast({
      //         image: '../../images/icon/attention.png',
      //         title: '获取失败!',
      //       });
      //       break
      //     default:
      //       wx.hideLoading()
      //       wx.showToast({
      //         image: '../../images/icon/attention.png',
      //         title: '服务器繁忙！',
      //       });
      //   }
      // }).catch((res) => {
      //   console.log(res)
      //   wx.hideLoading()
      //   wx.showToast({
      //     image: '../../images/icon/attention.png',
      //     title: '服务器繁忙！',
      //   });
      // })
      this.CountDown()
    } else {
      return false
    }
  },
  CountDown() {
    let num = this.data.CountDown
    if (num == 0) {
      clearTimeout(Timer)
      this.setData({
        CountDown: 60,
        IfGetCode: true
      })
      return false
    } else {
      this.setData({
        CountDown: num - 1
      })
    }
    Timer = setTimeout(() => {
      this.CountDown()
    }, 1000)
  },
  GetLogin() {
    requestPromisified({
      url: h.main + '/updateweight',
      data: {
        weights: DATA
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded',
      //   'Accept': 'application/json'
      // }, // 设置请求的 header
    }).then((res) => {
      switch (res.data.result) {
        case 1:
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1500
          })
          if (this.data.Type == '0') {
            wx.navigateTo({
              url: '../weight/index/index'
            })
          } else {
            wx.navigateTo({
              url: '../diet/index/index'
            })
          }
          break
        case 0:
          wx.showToast({
            image: '../../images/icon/attention.png',
            title: '提交失败!'
          });
          break
        default:
          wx.showToast({
            image: '../../images/icon/attention.png',
            title: '服务器繁忙！'
          });
      }
    }).catch((res) => {
      wx.showToast({
        image: '../../images/icon/attention.png',
        title: '服务器繁忙！'
      });
    })
  }
})

