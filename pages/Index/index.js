import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var MD5 = require('../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    departureDate:null,
    DateStart: null,
    departure:'海门',
    destination:'上海'
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow(){
    this.setData({
      DateStart: util.formatTime(new Date()),
      departureDate: util.formatTime(new Date()),
    })
  },
  //出发地
  ChangeDeparture(e){
    this.setData({
      departure: e.detail.value
    })
  },
  //目的地
  ChangeDestination(e) {
    this.setData({
      destination: e.detail.value
    })
  },
  //起始地址互换
  ExchangePlace(){
    const placeS = this.data.departure
    const placeE = this.data.destination
    this.setData({
      departure: placeE,
      destination: placeS
    })
  },
  //出发日期
  bindDateChange(e){
    this.setData({
      departureDate: e.detail.value
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
    }else{
      wx.navigateTo({
        url: '../Schedules/index',
      })
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
