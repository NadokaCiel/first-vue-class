<template>
  <div class="circular">
    <div flex="main:center cross:center">
      <el-input-number v-model="percent" :controls="false"></el-input-number>
    </div>
    <div class="show" flex="main:center cross:center">
      <div class="box" flex="main:center cross:center">
        <div class="box-half">
          <div class="circle-progress left-circle run-bottom-left"></div>
        </div>
        <div class="box-half">
          <div class="circle-progress right-circle run-bottom-right"></div>
        </div>
      </div>
      <div class="box" flex="main:center cross:center">
        <div class="box-half">
          <div class="circle-progress left-circle" :style="config.leftTransform"></div>
        </div>
        <div class="box-half">
          <div class="circle-progress right-circle" :style="config.rightTransform"></div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { mapState } from 'vuex'
export default {
  name: 'circular',
  created: function() {
    let vm = this;
    vm.getPercent()
  },
  data() {
    return {
      percent:85,
      config:{
        leftTransform:'',
        rightTransform:''
      }
    }
  },
  methods: {
    getPercent() {
      let vm = this
      let percent = vm.percent > 100 ? 100 : vm.percent
      percent = percent < 0 ? 0 : percent
      vm.config.leftTransform = `-webkit-transform: rotate(${percent>50 ? 225 : percent/100*360+45}deg);`
      vm.config.rightTransform = `-webkit-transform: rotate(${percent<50 ? 45 : (percent-50)/100*360+45}deg);`
    }
  },
  watch: {
    'percent': 'getPercent',
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
.circular {
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
  font-size: 1rem;
  .box {
    border: 1px solid $lightgray;
    width: 3rem;
    height: 3rem;
    margin: .5rem;

    .box-half {
      width: 50%;
      height: 100%;
      overflow: hidden;

      .circle-progress {
        margin-right: 50%;
        position: relative;
        top: 0;
        width: 2.8rem;
        height: 2.8rem;
        border: .1rem solid transparent;
        border-radius: 50%;
        -webkit-transform: rotate(225deg);
      }
      .right-circle {
        border-bottom: .1rem solid $main;
        border-left: .1rem solid $main;
        right: calc(100% + 1px);
      }
      .left-circle {
        border-top: .1rem solid $main;
        border-right: .1rem solid $main;
        left: 1px;
      }
      .run-bottom-right {
        -webkit-animation: circleProgressLoad_right 4s linear infinite;
      }
      .run-bottom-left {
        -webkit-animation: circleProgressLoad_left 4s linear infinite;
      }
    }
  }
}
@-webkit-keyframes circleProgressLoad_left {
  0%{
    -webkit-transform: rotate(45deg);
  }
  50%, 100% {
    -webkit-transform: rotate(225deg);
  }
}
@-webkit-keyframes circleProgressLoad_right {
  0%,50%, {
    -webkit-transform: rotate(45deg);
  }
  100% {
    -webkit-transform: rotate(225deg);
  }
}
</style>