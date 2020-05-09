// pages/avatar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginText: "登录",
    user: {
      avatarUrl: '',
      nickName: '未登录'
    },
    btnclass: 'loginbtn',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  bindGetUserInfo(e) {
    var user = e.detail.userInfo;
    if (this.data.loginText == '登录') {
      this.loginRender(user);
    } else {
      this.signOut();
    }    
  },
  
  loginRender: function(user){
    this.setData({
      user: {
        avatarUrl: user.avatarUrl,
        nickName: user.nickName
      },
      loginText: '退出登录',
      btnclass: 'outbtn',
    });
    //存入缓存
    wx.setStorage({
      key: 'userInfo',
      data: {
        avatarUrl: user.avatarUrl,
        nickName: user.nickName,
        loginText: '退出登录',
        btnclass: 'outbtn'
      },
    });
  },

  signOut: function(){
    this.setData({
      user: {
        avatarUrl: "",
        nickName: "未登录"
      },
      loginText: '登录',
      btnclass: 'loginbtn',
    });
    //存入缓存
    wx.removeStorage({
      key: 'userInfo'
    })
  },

  toWallet: function(){
    wx.navigateTo({
      url: '../wallet/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        var userInfo = res.data;
        this.setData({
          user: {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName
          },
          loginText: userInfo.loginText,
          btnclass: userInfo.btnclass,
        })
      }
    })
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