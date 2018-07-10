import h from '../../../utils/url.js'
var util = require('../../../utils/util.js')
var MD5 = require('../../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '',
    identification: '',
    phone: ''
  },
  onLoad(options){
    if (options.type == 1){  //编辑
      wx.getStorage({
        key: 'PassengerInfo',
        success: (res)=> {
          this.setData({
            name: res.data.name,
            identification: res.data.identification,
            phone: res.data.phone,
          })
        },
      })
    }
  },
  onShow() {

  }
})