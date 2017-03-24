<template>
  <div class="my-map" flex="main:center cross:center">
    <div class="amap-wrapper">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :center="mapCenter"></el-amap-search-box>
      <el-amap :vid="'amap-vue'" :center="mapCenter" :plugin="plugin" :lang="Lang | mapLang">
        <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
      </el-amap>
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
      mapCenter:[121.59996, 31.197646],
      markers:[],
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o);
          }
        }
      }],
      searchOption:{
        city:'全国',
        citylimit:false
      }
    }
  },
  methods: {
    onSearchResult(pois) {
      this.marker=[]
      if(pois.length<=0){return}
      let latSum = 0;
      let lngSum = 0;
      pois.forEach(poi => {
        let {
          lng,
          lat
        } = poi;
        lngSum += lng;
        latSum += lat;
        this.markers.push([poi.lng, poi.lat]);
      });
      let center = {
        lng: lngSum / pois.length,
        lat: latSum / pois.length
      };
      this.mapCenter = [center.lng, center.lat];
    }
  },
  watch: {},
  computed: mapState({
    Lang: state => state.Lang,
  }),
  components: {}
}
</script>

<style lang="sass">
.my-map {
  width: 100%;
  height: 800px;

  .amap-wrapper {
    width: 12rem;
    height: 600px;
  }
  .search-box{
    .search-btn,.search-tips{
      font-size: .2rem;
    }
  }
}
</style>