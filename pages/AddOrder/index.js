import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var MD5 = require('../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    phone:'18234567890',
    ScheduleInfo:{
      departure: '海门',
      departureStation: '海门汽车站',
      destination: '临江',
      destinationStation: '临江',
      date:'2018-07-09',
      time:'09:30',
      carInfo:'车次FSK308【过路车】,行驶31公里',
      price:2
    },
    PassengerList:[],
    PassengerList2:[
      { 'id': 0, 'name': '张三', 'identification': '320612198912123456', 'kind': '0' },
      { 'id': 0, 'name': '张三爸爸', 'identification': '320612198912123456', 'kind': '1' },
    ],
    childrenAmount:0,
    Passengers:{
      'adult': [
          { 'id': 0, 'name': '张三', 'identification': '320612198912123456', 'kind': '0' },
          { 'id': 0, 'name': '张三爸爸', 'identification': '320612198912123456', 'kind': '1' }
      ],
      'children':0
    },
  },
  //免费无座申请
  AddChildren(){
    if (this.data.PassengerList.length>0){
      this.setData({
        childrenAmount: 1
      })
    }
  },
  //携童票增加
  AddChildren_min(){
    if (this.data.childrenAmount > 1){
      this.setData({
        childrenAmount: this.data.childrenAmount - 1
      })
    }else{
      this.setData({
        childrenAmount: 0
      })
    }
  },
  //携童票减少
  AddChildren_add() {
    if (this.data.childrenAmount < this.data.PassengerList.length){
      this.setData({
        childrenAmount: this.data.childrenAmount + 1
      })
    }else{
      wx.showToast({
        image: '../../images/attention.png',
        title: '每人仅一名！'
      });
    }
  },
  ChangePhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  DeleteThisChoosed(e){
    let Idx = e.currentTarget.dataset.index
    let temp = util.objDeepCopy(this.data.PassengerList)
    temp.splice(Idx, 1)
    this.setData({
      PassengerList: temp
    })
  },
  AddPassenger(){
    wx.navigateTo({
      url: '../Passenger/list/index',
    })
  },
  //填充乘客信息
  backPassengerInfo(ChoosedList){
    this.setData({
      PassengerList: ChoosedList
    })
  },
  SubmitOrder(){
    if (this.data.PassengerList.length<1){
      wx.showToast({
        image: '../../images/attention.png',
        title: '请添加乘客！'
      });
      return false
    }
    if (!(/^1[34578]\d{9}$/).test(this.data.phone)) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '手机号格式！',
      });
      return false
    }
    if (!this.data.phone){
      wx.showToast({
        image: '../../images/attention.png',
        title: '手机号为空！'
      });
      return false
    }
  }
})