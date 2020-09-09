// component/zyslider/zyslider.js
var util = require('../utils/util');
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },


  /**
   * 组件的初始数据
   */
  data: {
    a: 0
  },
  attached() {
    app.makeWatcher('a', (n) => {
      console.log('zdl a', n)
      this.setData({
        a: n
      })
    })

    app.makeWatcher('b.c', (n) => {
      console.log('zdl b.c', n)
    })

    app.makeWatcher('b', (n) => {
      console.log('zdl b', n)
    })

    // app.makeWatcher('b.d', (n) => {
    //   console.log('zdl b', n)
    // })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },

  ready(){

  }
})
