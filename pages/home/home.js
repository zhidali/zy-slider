// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  lowValueChangeAction: function (e) {},

  heighValueChangeAction: function (e) {},

  lowValueChangeAction1: function (e) {},

  heighValueChangeAction1: function (e) {},

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

  },
  clickView() {
    // app.dialogMapData('set', 'home-nocity');
    // app.dialogMapData('dialog')

    // app.dialogMapData('set', 'home-ground');

    // console.log('home-nocity', app.dialogMapData('get', 'home-nocity'), 'city_id:' + app.commonData.city.city_id);

    // console.log('home-ground', app.dialogMapData('get', 'home-ground'), 'city_id:' + app.commonData.city.city_id);
  },
  tabCity() {
    console.log('status:' + app.dialogMapData('status'));
    console.log('dialog:' + app.dialogMapData('dialog'));
    app.commonData.city.city_id = app.commonData.city.city_id == '2' ? '3' : '2'
  },
  closeDialog() {
    app.dialogMapData('close');
  }
})