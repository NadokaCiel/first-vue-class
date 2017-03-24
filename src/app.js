import Vue from 'vue'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import AMap from 'vue-amap'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import data from './store'

import 'normalize.css'
import 'flex.css'


Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '5d3160bc7237e2ef2931c7423950e4ce',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(ElementUI)


Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

const store = new Vuex.Store({
	state: data.state,
	getters: data.getters,
	mutations: data.mutations,
	actions: data.actions
})

const app = new Vue({
	store,
	router,
	el: '#app',
	render: h => h(App)
})