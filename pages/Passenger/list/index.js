import h from '../../../utils/url.js'
var util = require('../../../utils/util.js')
var MD5 = require('../../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    PassengerList: [
      { 'id': 0, 'name': '王五', 'phone': '18234567890', 'identification': '320626198912126789', 'checked': false },
      { 'id': 0, 'name': '张三', 'phone': '18234567890', 'identification': '320626198912126789', 'checked': false },
      { 'id': 0, 'name': '李四', 'phone': '18234567890', 'identification': '320626198912126789', 'checked': false },
    ],
    PassengerListCopy:[]
  },
  onShow(){
    //var [...PassengerList] = this.data.PassengerList
    let PassengerList = util.objDeepCopy(this.data.PassengerList)
    PassengerList.map((item,idx)=>{
      let partOfID = item.identification.replace(/(\w)/g, function (a, b, c) {
        return (c < (item.identification.length - 3) && c >= 6) ? '*' : a
      });
      item.identification = partOfID
    })
    this.setData({
      PassengerListCopy: PassengerList
    })
  },
  //ToggleChecked
  ToggleChecked(e){
    let Idx = e.currentTarget.dataset.index
    let temp = util.objDeepCopy(this.data.PassengerList)
    let tempCopy = util.objDeepCopy(this.data.PassengerListCopy)
    temp[Idx].checked = !temp[Idx].checked
    tempCopy[Idx].checked = !tempCopy[Idx].checked
    this.setData({
      PassengerList: temp,
      PassengerListCopy: tempCopy
    })
  },
  //edit
  EditPassenger(e){
    let Idx = e.currentTarget.dataset.index
    wx.setStorage({
      key: 'PassengerInfo',
      data: this.data.PassengerList[Idx],
      success: (res)=> {
        wx.navigateTo({
          url: '../add/index?type=1',
        })
      },
    })

  },
  //AddNewPassenger
  AddNewPassenger(){
    wx.navigateTo({
      url: '../add/index?type=0',
    })
  },
  //SureChecked
  SureChecked(){
    let ChoosedList = []
    this.data.PassengerList.map((item,idx)=>{
      if(item.checked){
        ChoosedList.push(item)
      }
    })
    //返回填充乘客信息
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2];
      prePage.backPassengerInfo(ChoosedList)
    }
    wx.navigateBack()
  }
})