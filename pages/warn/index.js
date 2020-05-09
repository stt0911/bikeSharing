// pages/warn/index.js
var serverData = require('../../data/data.js'); //模拟本地假数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bikeInfo: {
      number: 0,
      desc: ''
    },
    actionText: '拍照/相册',
    faultList: [],
    arrList: [{
      id: 1,
      value: "私锁所用",
      checked: false,
    }, {
        id: 2,
        value: "车牌缺损",
        checked: false,
      }, {
        id: 3,
        value: "轮胎坏了",
        checked: false,
      }, {
        id: 4,
        value: "车锁坏了",
        checked: false,
      }, {
        id: 5,
        value: "违规乱停",
        checked: false,
      }, {
        id: 6,
        value: "密码不对",
        checked: false,
      }, {
        id: 7,
        value: "刹车坏了",
        checked: false,
      }, {
        id: 1,
        value: "其他故障",
        checked: false,
      }],
      imgList: [],
      bgColor: '#f2f2f2'
  },

  changeCheck: function(e){
    var value = e.detail.value;
    this.setData({
      faultList: value
    });
    var len = this.data.faultList.length;
    if(len > 0){
      this.setData({
        bgColor: '#b9dd08'
      })
    }else{
      this.setData({
        bgColor: '#f2f2f2'
      })
    }
  },

  addPhoto: function(){
    wx.chooseImage({
      success: res => {
        var filePaths = res.tempFilePaths;
        var _imgList = this.data.imgList;
        for(let item of filePaths){
          _imgList.push(item);
        }
        this.setData({
          imgList: _imgList
        });
        this.changeActionText(_imgList.length);
      },
    })
  },

  changeActionText: function(len){
    if(len > 0){
      this.setData({
        actionText: '+'
      });
    }else{
      this.setData({
        actionText: '拍照/相册'
      })
    }
  },

  deletePhoto: function(e){
    var index = e.target.dataset.index;
    var _imgList = this.data.imgList;
    _imgList.splice(index, 1);//删除一张选中的图片
    this.setData({
      imgList: _imgList
    });
    
    this.changeActionText(_imgList.length);
  },

  changeNumber: function(e){
    var num = e.detail.value;
    this.setData({
      bikeInfo: {
        number: num,
        desc: this.data.bikeInfo.desc
      }
    })
  },
  changeDesc: function(e){
    var _desc = e.detail.value;
    this.setData({
      bikeInfo: {
        number: this.data.bikeInfo.number,
        desc: _desc
      }
    })
  },
  submitMsg: function(){
    if(this.data.imgList.length > 0 && this.data.faultList.length > 0){
      wx.showLoading({
        title: '正在提交'
      });
      /*
      发送Ajax进行数据提交
      wx.request({
        url: 'https://www.easy-mock.com/mock/5e6610348e711c50e7d3324f/demo/submitSuc#!method=get',
        // method: 'POST',
        //data: {checkList: this.data.faultList}
        success: res => {  
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: '1'
            });
          }, 500);
        },
        fail: res => {
          wx.hideLoading();
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      });
      */

      setTimeout(() => {
        wx.showToast({
          title: serverData.submitMsg.msg,
          icon: 'success'
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: '1'
          });
        }, 500);
      }, 2000);
    }else{
      wx.showModal({
        title: '请填写必要信息',
        content: '选择故障类型并上传图片',
        confirmText: '我填写',
        cancelText: '本宫不填',
        success: res => {
          if(res.cancel){
            wx.navigateBack({
              delta: '1'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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