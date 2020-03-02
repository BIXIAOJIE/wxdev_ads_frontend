import WxValidate from '../../utils/WxValidate.js'
const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api
Page({
  onLoad:function(){
    this.initValidate()
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    if(!this.WxValidate.checkForm(params)){
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg:'提交成功'
    })
    params.openId = store.getItem("openId"),

    wx.request({
      url: App.config.baseApi +"/api/mp/customerPost",
      method:"post",
      data:params,
      success:(data)=>{
        console.log(data)
      },
      complete:()=>{
        console.log('complete')
      }
    },
    wx.reLaunch({
      url: '/pages/customer',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    )


  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  initValidate(){
    const rules = {
      name:{
        required:true,
        rangelength: [1, 4]
      },
      gestation: {
        required: true,
        rangelength: [1, 5]      
      },
      age: {
        required: true,
        rangelength: [1, 3] 
      },
      phone: {
        required: true,
        tel:true
      },
      address: {
        required: true,
        minlength: 1
      },
      channel: {
        required: true,
        rangelength: [1, 5] 
      },
      assistant_manager: {
        required: true,
        minlength: 1
      }
    }
    const messages = {
      name:{
        required:"请填写姓名"
      }
    }
    this.WxValidate = new WxValidate(rules,messages)
  },
  showModal(error){
    wx.showModal({
      content: error.msg,
    })
  },          
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  jumpToIndex(){
    router.push('customer')
  }
})