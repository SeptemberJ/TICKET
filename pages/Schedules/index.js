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
    CanPre:null,
    ScheduleList:[
      { 'id': 0, 'departureTime': '09:30', 'departure': '海门','destination':'上海','carKind':'途径|公交型9','price':52,'amount':42},
      { 'id': 1, 'departureTime': '10:00', 'departure': '海门', 'destination': '上海', 'carKind': '途径|公交型9', 'price': 52, 'amount': 32 }
    ]
  },
  onLoad(){
    app.globalData.selfEmit.on('globalData changed', () => {
      console.log('globalData triggled')
      this.setData({
        CanPre: app.globalData.CanPre,
        DateStart: app.globalData.CurDate,
        departureDate: app.globalData.departureDate,
      })
    });
  },
  onShow() {
    this.setData({
      CanPre: app.globalData.CanPre,
      DateStart: app.globalData.CurDate,
      departureDate: app.globalData.departureDate,
    })
  },
  bindDateChange(e){
    this.setData({
      departureDate: e.detail.value
    })
  },
  //前一天
  Pre(){
    if (this.data.CanPre && util.CompareDate(this.data.departureDate, this.data.DateStart)){  //出发日期大于当前日期
      let tepmArray = this.data.departureDate.split("-");
      let dt = new Date(tepmArray[0], tepmArray[1]-1, tepmArray[2]);
      this.TriggerGlobal(util.formatTime(new Date(dt.getTime() - 24 * 60 * 60 * 1000)));
    }else{
      return false
    }
  },
  //后一天
  Next() {
    let tepmArray = this.data.departureDate.split("-");
    let dt = new Date(tepmArray[0], tepmArray[1] - 1, tepmArray[2]);
    this.TriggerGlobal(util.formatTime(new Date(dt.getTime() + 24 * 60 * 60 * 1000)));
  },
  //
  TriggerGlobal(NewDate) {
    console.log(NewDate)
    app.globalData.departureDate = NewDate
    app.globalData.selfEmit.trigger('departureDate changed', function(){
    });
  },
  //填写订单
  ToAddOrder(){
    wx.navigateTo({
      url: '../AddOrder/index',
    })
  }
})
