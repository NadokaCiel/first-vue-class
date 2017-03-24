<template>
  <div class="gene">
    <div class="gene-str">{{result}}</div>
    <div class="gene-str" @click="showGene()" v-html="geneStr"></div>
  </div>
</template>


<script>
import runGene from '../lib/gene/gen'
import { mapState } from 'vuex'
export default {
  name: 'gene',
  created: function() {
    let vm = this

    // vm.tread(1,500)
    // vm.tread(2,1000)
    let promises = [1,2].map(function(id) {
      return vm.tread(id,id*500);
    });

    Promise.all(promises).then(function(posts) {
      console.log(posts)
    }).catch(function(reason) {
      console.log('reason: '+reason)
    });
  },
  data() {
    return {
      result:'',
      isRunning: false,
      original: 'Genetic algorithm is widely used in optimization for its fine global search capability.',
      geneStr: 'Too young, too simple. Sometimes, naive.',
    }
  },
  methods: {
    async tread(id,ms) {
      let vm = this
      for (let i = 1; i <= 10; i++) {
        console.log(`线程${id}的第${i}次调用`)
        await vm.sleep(ms);
      }
      return id
    },
    sleep(ms=5000){
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    showGene() {
      let vm = this
      const history = runGene(vm.original).history
      vm.geneStr = 'Too young, too simple. Sometimes, naive.'
      vm.isRunning = true;
      vm.result = '';
      let i = 0;
      history.forEach((text, i) => {
        setTimeout(function() {
          if(i % 5 == 0 || i === history.length - 1){
            vm.geneStr += '<p>' + text + '</p>'
            vm.result = text
          }
          if (++i === history.length) vm.isRunning = false;
        }, i * 10)
      })
      console.log(history.length)
    }
  },
  computed: mapState({
    Lang: state => state.Lang,
  }),
  components: {}
}
</script>
<style lang="sass" scoped>
@import "../lib/global";
.gene {
  font-size: 1rem;
  .gene-str{
    margin:.5rem;
    text-align: center;
    font-size: .2rem;
  }
}
</style>