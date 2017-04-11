<template>
  <div class="translator">
    <div class="width-test">{{'WIDTH_TEST'|translator(Lang)}}</div>
    <div class="lang-test">{{'HELLO'|translator(Lang)}}</div>
    <div class="lang-test">{{'THANKS'|translator(Lang)}}</div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'translator',
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
.translator {
  font-size: 1rem;
  .btn-group,.width-test{
    text-align: center;
  }
  .lang-test{
    margin:.3rem 0;
    text-align: center;
    font-size: .5rem;
  }
}
</style>