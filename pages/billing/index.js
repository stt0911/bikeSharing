// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0,
    hour: 0,
    min: 0,
    sec: 0,
    actionText: '正在计费',
    endflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      number: options.number
    });
    //设置计时器
    this.renderTime();
  },

  renderTime: function(){
    let h = 0, m = 0, s = 0;
    this.timer = setInterval(() => {      
      this.setData({
        sec: ++s
      });
      if(m == 60){
        m = 0;
        h++;
        this.setData({
          hour: h,
          min: m
        })
      }
      if (s == 60){
        s = 0;
        m++;
        this.setData({
          min: m,
          sec: s
        })
      }
    }, 1000);
  },

  endRide: function(){
    clearInterval(this.timer);
    this.timer = null;
    this.setData({
      endflag: true,
      actionText: '结束骑行'
    });
  },

  backtoMap: function(){
    if(this.timer){
      wx.navigateTo({
        url:'../index/index?timer=' + this.timer
      })
    }else{
      wx.redirectTo({
        url: '../index/index'
      })
    }
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