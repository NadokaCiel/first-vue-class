<template>
  <div id="app">
    <div class="main-content">
      <nav-bar></nav-bar>
      <router-view class="app-view"></router-view>
    </div>
  </div>
</template>

<script>
import nav from './components/nav.vue'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created: function() {
    let vm = this;
    let fontSize = (document.body.clientWidth / 16) + 'px';
    document.getElementsByTagName("html")[0].style.setProperty('font-size', fontSize);
    document.body.style.setProperty('font-size', '.6rem');
    window.onresize = function() {
      let fontSize = (document.body.clientWidth / 16) + 'px';
      document.getElementsByTagName("html")[0].style.setProperty('font-size', fontSize);
      document.body.style.setProperty('font-size', '.6rem');
    }
  },
  computed: mapState([]),
  components: {
    navBar:nav
  }
}
</script>

<style lang="sass">
@import "./lib/global";
html,body{
  height: 100%;
  background-color: $lighterwhite;
}
#app {
  font-family: "Microsoft YaHei","Verdana",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100%;
  width: 100%;
}
.main-content {
}
a {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  white-space: nowrap;
}
.clearfix:after{
   content: " "; 
   display: block; 
   height: 0; 
   clear: both; 
   visibility: hidden;  
} 
</style>