<template>
  <div class="home" flex="main:center cross:center">
    <div class="my-title">
      <div class="main-title">Ciel's Lab</div>
      <div class="sub-title">嘉道信息技术（上海）有限公司</div>
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  created: function() {
    let vm = this;
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: mapState({
    Lang: state => state.Lang,
  }),
  components: {
  }
}
</script>
<style lang="sass" scoped>
@import "../lib/global";
.home {
  position: fixed;
  left:0;
  right:0;
  top:40px;
  bottom:0;
  font-size: 1rem;
  .main-title{
    text-align: center;
    color:$sec1;
    font-size: 2rem;
  }
  .sub-title{
    text-align: center;
    color:$lightgray;
    font-size: .5rem;
  }
}
</style>