<template>
	<div class="blmMap">
		饱了么大地图
		<baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
			
			<bm-marker @click="infoWindowOpen" :position="markerPoint" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}">
				  <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">饱了么:东北大学浑南校区第二学生宿舍B区</bm-info-window>
			</bm-marker>
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
		</baidu-map>
	</div>
</template>

<script>
	export default{
		name:"blmMap",
		data(){
			return{
				show: true,
				markerPoint:{lng:123.426003,lat:41.656796},
				center: {lng:123.426003,lat:41.656796},
				zoom: 17
			}
		},
		methods:{
			infoWindowClose () {
				this.show = false;
			},
			infoWindowOpen () {
				this.show = true;
			},
			handler ({BMap, map}) {
				//123.423346,41.658328
				this.center.lng = 123.423346;
				this.center.lat = 41.658328;
				this.zoom = 17;
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.blmMap{
		.bm-view {
		  width: 100%;
		  height: 300px;
		}
	}
</style>
