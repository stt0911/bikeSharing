// pages/recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  inputHandle: function(e){
    var money = e.detail.value;
    this.setData({
      money: money
    });
  },

  chargeHandle: function(){
    var _money = this.data.money;
    var reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
    if(!reg.test(_money)){
      wx.showModal({
        title: '请输入合法金额',
        content: '哈哈哈',
        success: res => {
          if(res.cancel){
            wx.navigateBack({
              delta: 1,
            });
          }
        }
      })
    }else{
      //充值金额存入我的账户
      wx.getStorage({
        key: 'money',
        success: (res) => {
          _money = parseInt(res.data) + parseInt(_money);
          wx.setStorage({
            key: 'money',
            data: _money
          });
        },
        fail: res => {
          wx.setStorage({
            key: 'money',
            data: _money
          });
        },
        complete: function(){
          wx.navigateBack({
            delta: 1
          });
        }
      });     
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