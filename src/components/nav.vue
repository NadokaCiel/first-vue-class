<template>
  <div class="nav" flex="main:left cross:center">
    <div class="nav-item" flex="main:left cross:center" v-for="route in routes">
      <router-link class="nav-route" flex="main:left cross:center" :to="route.url" v-if="!route.subList">
        <div class="menu-icon" :class="route.icon" :title="route.name|translator(Lang)"></div>
        <div class="menu-name text-ellipsis" :title="route.name|translator(Lang)">{{route.name|translator(Lang)}}</div>
      </router-link>
      <el-dropdown class="nav-dropdown-main" trigger="click" menu-align="start" flex="main:left cross:center" v-if="route.subList">
        <div class="nav-route" flex="main:left cross:center">
          <div class="menu-icon" :class="route.icon" :title="route.name|translator(Lang)"></div>
          <div class="menu-name text-ellipsis" :title="route.name|translator(Lang)">{{route.name|translator(Lang)}}</div>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </div>
        </span>
        <el-dropdown-menu class="nav-dropdown" slot="dropdown">
          <el-dropdown-item class="sub-route" v-for="sub in route.subList" :disabled="sub.disabled">
            <router-link class="nav-route" flex="main:left cross:center" :to="sub.url" v-if="!sub.subList">
              <div class="menu-icon" :class="sub.icon" :title="sub.name|translator(Lang)"></div>
              <div class="menu-name text-ellipsis" :title="sub.name|translator(Lang)">{{sub.name|translator(Lang)}}</div>
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="nav-nowlabel" flex="main:justify cross:center" v-if="nowRoute.name">
      <div class="now-icon" :class="nowRoute.icon" :title="nowRoute.name|translator(Lang)"></div>
      <div class="text-ellipsis" :title="nowRoute.name|translator(Lang)">{{nowRoute.name|translator(Lang)}}</div>
    </div>
    <div class="btn-group" flex-box="1" flex="main:right cross:center">
      <el-button type="success" size="mini" @click="changeLang('cn')">简体中文</el-button>
      <el-button type="warning" size="mini" @click="changeLang('en')">English</el-button>
      <el-button type="danger" size="mini" @click="changeLang('fr')">Français</el-button>
      <el-button type="info" size="mini" @click="changeLang('de')">Deutsch</el-button>
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex'
export default {
  name: 'nav',
  created: function() {
    let vm = this
  },
  data() {
    return {
      nowRoute:{},
      routes: [
        // 路由配置示例
        // {
        //   url: "demo",    //路由名字串，或route对象
        //   name: "测试",   //菜单显示名
        //   icon: "fa fa-flag" //菜单图标的类名
        // }, 
        {
          url: "/home",
          name: "HOME",
          icon: "fa fa-home"
        }, {
          url: "/lab",
          name: "MYLAB",
          subList: [{
            url: {name:'Dice'},
            name: "DICE",
            icon: "fa fa-th"
          },{
            url: {name:'Translator'},
            name: "TRANSLATOR",
            icon: "fa fa-globe"
          },{
            url: {name:'Map'},
            name: "MYMAP",
            icon: "fa fa-map"
          },{
            url: {name:'Gene'},
            name: "GA",
            icon: "fa fa-random"
          },{
            url: {name:'Circular'},
            name: "CIRCULAR",
            icon: "fa fa-circle-o",
          },{
            url: {name:'Permission'},
            name: "PERMISSION",
            icon: "fa fa-vcard"
          },{
            url: {name:'Gesture'},
            name: "MYGESTURE",
            icon: "fa fa-hand-o-up",
            disabled:true
          }]
        }
      ]
    }
  },
  methods: {
    changeLang(lang){
      let vm = this
      vm.$store.dispatch('setLang',lang)
    },
    routeChange(){
      let vm = this
      if(!vm.$route.name){
        vm.nowRoute = {}
        return
      }
      let list = vm.routes[1].subList
      for (let i = 0; i < list.length; i++) {
        if(list[i].url.name == vm.$route.name){
          vm.nowRoute = list[i]
          return
        }
      }
    }
  },
  watch: {
    '$route':'routeChange'
  },
  computed: mapState({
    Lang: state => state.Lang,
  }),
  components: {}
}
</script>
<style lang="sass" scoped>
@import "../lib/global";
.nav {
  width: 100%;
  height: .5rem;
  min-height: 40px;
  font-weight: bold;
  color: $navtext;
  background-color: $nav;

  .nav-nowlabel{
    height: .5rem;
    min-height: 40px;
    min-width: 80px;
    padding:0 .2rem;
    font-size: .25rem;
    .now-icon{
      margin-right:.1rem;
    }
  }
  .nav-item {
    height: .5rem;
    min-height: 40px;
    max-width: 150px;
    padding:0 .2rem;
    font-size: .25rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.35);
    }
    .menu-name {
      margin-left:.1rem;
      font-size: .2rem;
    }
  }
  .nav-route {
    height: .5rem;
    min-height: 40px;
    text-align: center;
    text-decoration: none;
  }
  .nav-dropdown-main{
    color: $navtext;
    cursor: pointer;
    width: 100%;
    height: .5rem;
    min-height: 40px;
  }
  .btn-group{
    padding-right:.2rem;
  }
}
</style>
<style lang="sass">
@import "../lib/global";
.nav-dropdown {
  font-weight: bold;
  padding: 2px 0;
  background-color: lighten($nav, 10%);

  .sub-route {
    font-size: .20rem;
    color: $navtext;

    &:not(.is-disabled):hover {
      color: $lighterwhite;
      background-color: lighten($nav, 20%);
    }
    &.is-disabled{
      color:$gray;
      background-color: lighten($gray, 20%);
    }
    .menu-name {
      margin-left: .1rem;
      font-size: .15rem;
    }
  }
}
</style>