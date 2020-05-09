// pages/index/index.js
var serverData = require('../../data/data.js'); //模拟本地假数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0
  },

  bindcontroltap: function(e){
    switch(e.controlId){
      case 1: //定位
        this.movetoCenter();
        break;
      case 2: 
        wx.navigateTo({
          url: '../avatar/index',
        });
        break;
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        })
        break; 
      case 4://扫码
        this.scanDode();
      break;     
    }
  },

  //扫码函数
  scanDode: function(){
    if(this.timer){
      wx.navigateBack({
        url: '../billing/index'
      })
    }else{
      wx.scanCode({
        success: function () {
          wx.showLoading({
            title: '正在获取密码',
          })
          // 本来应该向后台请求数据的
          // wx.request({
          //   url: 'https://www.easy-mock.com/mock/5e6610348e711c50e7d3324f/demo/password#!method=get',
          //   success: res => {
          //     wx.hideLoading();
          //     //注意不用添加后缀
          //     wx.redirectTo({
          //       url: '../scanResult/index?password=' + res.data.data.password + '&num=' + res.data.data.number,
          //       success: () => {
          //         wx.showToast({
          //           title: '获取密码成功',
          //           icon: 'success',
          //           duration: 1000
          //         })
          //       }
          //     })
          //   },
          //   fail: res => {
          //     wx.hideLoading();
          //     wx.showToast({
          //       title: '网络超时',
          //       icon: 'none'
          //     })
          //   }
          // })
          //这里使用本地假数据进行模拟
          setTimeout(() => {
            wx.hideLoading();
            //注意不用添加后缀
            wx.redirectTo({
              url: '../scanResult/index?password=' + serverData.code.password + '&num=' + serverData.code.number,
              success: () => {
                wx.showToast({
                  title: '获取密码成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            })
          }, 2000);
        }
      })
    }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.timer = options.timer;
    wx.getLocation({
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
      },
    });
    //获取设备信息
    wx.getSystemInfo({
      success: res => {
        this.setData({
          controls:[
            {
              id: 1,
              iconPath: '/images/location.png',
              position: {
                left: 20,
                top: res.windowHeight - 80,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id:2,
              iconPath: '/images/avatar.png',
              position: {
                left: res.windowWidth - 70,
                top: res.windowHeight - 180,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: '/images/warn.png',
              position: {
                left: res.windowWidth - 70,
                top: res.windowHeight - 80,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: '/images/use.png',
              position: {
                left: res.windowWidth / 2 - 40,
                top: res.windowHeight - 100,
                width: 80,
                height: 80
              },
              clickable: true
            },
            {
              id: 5,
              iconPath: '/images/mark.png',
              position: {
                left: res.windowWidth / 2 - 25,
                top: res.windowHeight / 2 - 50,
                width: 50,
                height: 50
              }
            }
          ]
        })
      },
    })
  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    //创建地图上下文
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter();
  },

  movetoCenter: function(){
    this.mapctx.moveToLocation(); //定位在定位点
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})