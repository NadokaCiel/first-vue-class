import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../components/Home.vue'
// const MyMap = r => require.ensure([], () => System.import('../components/MyMap.vue'), 'lab')
// const Dice = r => require.ensure([], () => System.import('../components/Dice.vue'), 'lab')
// const Gene = r => require.ensure([], () => System.import('../components/Gene.vue'), 'lab')
// const Gesture = r => require.ensure([], () => System.import('../components/Gesture.vue'), 'lab')
// const Translator = r => require.ensure([], () => System.import('../components/Translator.vue'), 'lab')
// const Circular = r => require.ensure([], () => System.import('../components/Circular.vue'), 'lab')
// const Permission = r => require.ensure([], () => System.import('../components/Permission.vue'), 'lab')

// const Lab = r => require.ensure([
// 	'../components/MyMap.vue',
// 	'../components/Dice.vue',
// 	'../components/Translator.vue',
// 	'../components/Gesture.vue',
// 	'../components/Gene.vue',
// 	'../components/Circular.vue',
// 	'../components/Permission.vue',
// ], () => {}, 'lab')

const MyMap = r => require.ensure(['../components/MyMap.vue'], () => {r(require('../components/MyMap.vue'))}, 'lab')
const Dice = r => require.ensure(['../components/Dice.vue'], () => {r(require('../components/Dice.vue'))}, 'lab')
const Gene = r => require.ensure(['../components/Gene.vue'], () => {r(require('../components/Gene.vue'))}, 'lab')
const Gesture = r => require.ensure(['../components/Gesture.vue'], () => {r(require('../components/Gesture.vue'))}, 'lab')
const Translator = r => require.ensure(['../components/Translator.vue'], () => {r(require('../components/Translator.vue'))}, 'lab')
const Circular = r => require.ensure(['../components/Circular.vue'], () => {r(require('../components/Circular.vue'))}, 'lab')
const Permission = r => require.ensure(['../components/Permission.vue'], () => {r(require('../components/Permission.vue'))}, 'lab')

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/lab/dice', name:"Dice",component: Dice },
    { path: '/lab/translator', name:"Translator",component: Translator },
    { path: '/lab/gesture', name:"Gesture",component: Gesture },
    { path: '/lab/map', name:"Map",component: MyMap },
    { path: '/lab/gene', name:"Gene",component: Gene },
    { path: '/lab/circular', name:"Circular",component: Circular },
    { path: '/lab/permission', name:"Permission",component: Permission },
    { path: '*', redirect: '/home' },
  ]
})
router.beforeEach((to, from, next) => {
	let vm=this.a.app;
	if(!vm.$store || to.path=="/login"){
		next();
		return;
	}
	let isLogin = vm.$store.getters.isLogin;
	if(!isLogin){
		next('/login');
	}else{
		next();
	}
})

export default router