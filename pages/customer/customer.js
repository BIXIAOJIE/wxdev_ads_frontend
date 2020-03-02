const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api


Page({
  data: {
    listData:[]
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: App.config.baseApi + Api.getSimpleData,
      data: {
        openId: store.getItem("openId")
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          listData: result.data
        });
      },
      fail: function (result) {
        console.log(result.data)
      },
      complete: function (result) {
        console.log('完成了')
      }
    })
  },
  


})
