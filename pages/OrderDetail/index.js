import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var MD5 = require('../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    phone: '18234567890',
    orderNumber: 'OR12345667890',
    ScheduleInfo: {
      departure: '海门',
      departureStation: '海门汽车站',
      destination: '临江',
      destinationStation: '临江',
      date: '2018-07-09',
      time: '09:30',
      carInfo: '车次FSK308【过路车】,行驶31公里',
      price: 2
    },
    showPassenger:false,
    PassengerList: [
      { 'id': 0, 'name': '张三', 'identification': '320612198912123456', 'phone': '18234567890' },
      { 'id': 0, 'name': '张三爸爸', 'identification': '320612198912123456', 'phone': '18234567890' },
    ],
  },
  TogggleList(){
    this.setData({
      showPassenger: !this.data.showPassenger
    })
  }
})