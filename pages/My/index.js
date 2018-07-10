import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var MD5 = require('../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    OrderList:[
      { 'id': 0, 'departure': '海门', 'destination':'上海','price':52,'date':'2018-07-09','status':'出票成功'},
      { 'id': 0, 'departure': '海门', 'destination': '南京', 'price': 98, 'date': '2018-07-29', 'status': '出票成功' }
    ]
  },
  onLoad: function () {

  },
  onShow(){
    
  },
  GoOrderDetail(){
    wx.navigateTo({
      url: '../OrderDetail/index'
    })
  },
  //查询
  ToSearch(){
    if (this.data.departure == '请选择' || this.data.destination == '请选择'){
      wx.showToast({
        image: '../../images/attention.png',
        title: '请选择出发地和目的地!'
      });
      return false
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
