//app.js
let Observer = require('./utils/watch/index');
let observer = new Observer()
App({
  onLaunch: function () {
    // 设置监听
    observer.Observe(this.globalData)

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    a: 0,
    b: {
      c: 100,
      e: 0
    },
    dialogMap: new Map()
  },
  commonData: {
    city: {
      city_id: '2'
    }
  },
  // 页面调用 弹出时必须使用次方法 用于记录弹出状态 当前名字 app.dialogMapData('set', wx-login')
  // 判断使用  app.dialogMapData('get', ''wx-login'), 返回0 表示未弹出过
  // app.dialogMapData('status') 获取当前项目有无其他弹层在弹出状态
  // app.dialogMapData('dialog') 获取当前弹出名
  // app.dialogMapData('close') 关闭弹窗时 使用， 用于清空弹出状态

  /**
   * @description: 设置当前城市弹窗 弹出
   * @param {String} type  set get status close dialog
   * @param {String} dialogKey 弹窗对应标示
   */
  dialogMapData(type, dialogKey = 'none') {
    // home-subscribe   首页订阅弹窗
    // home-ground  首页cms配置落地页面弹窗
    // home-orderSuccess 首页留电成功弹窗
    // home-findHouse 首页查找房源弹出
    // home-filter 首页filter弹出

    // list-findhouse  列表页面帮我找房
    // list-service 列表升级服务
    // list-orderSuccess 列表页面留电成功弹窗
    // list-ground 列表页面 cms配置弹窗

    // wx-login 微信授权弹窗

    // 设置 获取 状态
    let typeStatus = ['set', 'get', 'status', 'close', 'dialog'];
    // 弹窗标示符 有城市区分数组
    let hasCityDialog = ['home-subscribe', 'home-ground', 'home-findHouse', 'home-filter', 'list-findhouse', 'list-service', 'list-ground'];

    // 无城市区分数组
    let noCityDialog = ['wx-login', 'list-orderSuccess', 'home-orderSuccess'];
    let dialogMap = this.globalData.dialogMap;

    if (
      (hasCityDialog.indexOf(dialogKey) != -1 && noCityDialog.indexOf(dialogKey) != -1) &&
      dialogKey != 'none' &&
      type != 'dialog'
    ) {
      return;
    }
    if (typeStatus.indexOf(type) == -1) {
      return;
    }
    // 如果是无城市区分的弹窗查找 noCityDialog  ， key为 common

    let key = '';
    if (noCityDialog.indexOf(dialogKey) != -1) {
      key = 'common';
    } else {
      key = `city_${this.commonData.city.city_id}`;
    }

    let dialogMapValue = dialogMap.get(key);
    
    if (dialogMap.has(key)) {
      if (type == 'set' && (hasCityDialog.indexOf(dialogKey) != -1 || noCityDialog.indexOf(dialogKey) != -1)) {
        dialogMapValue[dialogKey]++;

        dialogMap.currentStatus = true;
        dialogMap.currentDialog = dialogKey;

        dialogMap.set(key, dialogMapValue);
      }

      if (type == 'get') {
        return dialogMapValue[dialogKey]
      }

      if (type == 'status') {
        return dialogMap.currentStatus
      }

      if (type == 'close') {
        dialogMap.currentStatus = false;
        dialogMap.currentDialog = '';
      }
      if (type == 'dialog') {
        return dialogMap.currentDialog;
      }
    } else {
      
      let obj = { }

      dialogMap.currentDialog = type == 'set' ? dialogKey : dialogMap.currentDialog;
      // 记录弹窗名字 状态

      if(!dialogMap.currentStatus){
        dialogMap.currentStatus = type == 'set' ? true : false;
      }
      // 获取为0
      if (type == 'get') {
        return 0
      }
      if (type == 'status') {
        return dialogMap.currentStatus
      }
      if (type == 'close') {
        dialogMap.currentStatus = false;
        dialogMap.currentDialog = '';
      }
      if (type == 'dialog') {
        return dialogMap.currentDialog
      }
      if (noCityDialog.indexOf(dialogKey) != -1) {
        noCityDialog.forEach((item) => {
          // 如果为set 表示弹出1
          if (type == 'set' && item == dialogKey) {
            obj[item] = 1;
          } else {
            obj[item] = 0;
          }
        })
      } else {
        hasCityDialog.forEach((item) => {
          // 如果为set 表示弹出1
          if (type == 'set' && item == dialogKey) {
            obj[item] = 1;
          } else {
            obj[item] = 0;
          }
        })
      }
      dialogMap.set(key, obj);
    }
  },
  makeWatcher(key, fn) {
    observer.makeWatcher(key, this.globalData, fn)
  }
})