<template>
  <div class="permission">
    <div class="btn-group" flex="main:left cross:center">
      <el-button type="success" size="small" @click="changeRole('管理员')">管理员</el-button>
      <el-button type="warning" size="small" @click="changeRole('编辑者')">编辑者</el-button>
      <el-button type="info" size="small" @click="changeRole('审核者')">审核者</el-button>
    </div>
    <div class="role">当前角色：{{Role}}</div>
    <div class="permission-table">
      <div class="box" v-for="(actions,key) in actionMap" flex="main:left cross:top">
        <div class="box-left" :class="key|verify(Role,'forbidden')">{{key}}</div>
        <div class="box-right">
          <div class="sub-item" :class="(key+'.'+action)|verify(Role,'forbidden','')" v-for="action in actions">{{action}}</div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import ActionMap from '../store/ActionMap.js'
import { mapState } from 'vuex'
export default {
  name: 'permission',
  created: function() {
    let vm = this;
  },
  data() {
    return {
      actionMap:ActionMap
    }
  },
  methods: {
    changeRole(role){
      let vm = this
      vm.$store.dispatch('setRole',role)
    },
  },
  computed: mapState({
    Lang: state => state.Lang,
    Role: state => state.Role,
  }),
  components: {
  }
}
</script>
<style lang="sass" scoped>
@import "../lib/global";
.permission {
  .forbidden{
    color:$sec2;
  }
  .btn-group{
    width: 100%;
    padding:30px;
  }
  .role{
    padding:30px;
    font-size: 24px;
  }
  .permission-table{
    padding:50px;
    font-size: 20px;
    .box{
      margin:20px 0;
      .box-left{
        margin:0 10px;
        font-weight: bold;
      }
      .box-right{
        margin:0 10px;
        .sub-item{
          font-size: 18px;
          margin:5px 0;
        }
      }
    }
  }
}
</style>