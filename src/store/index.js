import Vue from 'vue'
import * as Fetch from '../lib/common/ajax.js'
import Config from '../store/Config.js'
export default {
  state: {
    Fetch,
    Config,
    Lang:'cn',
    Role: '管理员',
    eventHub: new Vue(),
    common() {
      Date.prototype.format = function(format) {
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          "S": this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return format;
      };
    },
    isLogin: true,
  },

  getters: {
    Fetch: state => state.Fetch,
    common: state => state.common,
    isLogin: state => state.isLogin,
    eventHub: state => state.eventHub,
  },
  mutations: {
    SWITCHLOGIN(state, n) {
      if (typeof(n) == "undefined") {
        state.isLogin = !state.isLogin;
      } else {
        state.isLogin = n;
      }
    },
    SET_LANG(state, n) {
      state.Lang = n;
    },
    SET_ROLE(state, n) {
      state.Role = n;
    },
  },
  actions: {
    switchLogin({
      commit
    }, n) {
      commit('SWITCHLOGIN', n)
    },
    setLang({
      commit
    }, n) {
      commit('SET_LANG', n)
    },
    setRole({
      commit
    }, n) {
      commit('SET_ROLE', n)
    },
  }
}